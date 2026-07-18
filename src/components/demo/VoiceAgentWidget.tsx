'use client'

import Vapi from '@vapi-ai/web'
import { useEffect, useRef, useState } from 'react'

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_KEY!

type Status = 'idle' | 'connecting' | 'in-call' | 'ended' | 'error'
type TranscriptEntry = { speaker: 'agent' | 'You'; text: string }

// The SDK nests the real message at e.error.message for most failures (join
// errors, daily errors, validation errors) rather than at the top level.
function extractErrorMessage(e: unknown): string {
  const err = e as
    | { error?: { message?: string; name?: string }; message?: string; errorMsg?: string }
    | undefined
  const raw = err?.error?.message || err?.error?.name || err?.message || err?.errorMsg || ''
  if (/denied|permission|notallowed/i.test(raw)) {
    return 'Microphone access was blocked. Please allow microphone access in your browser and try again.'
  }
  return "We couldn't connect the call. Please try again in a moment."
}

type VoiceAgentWidgetProps = {
  agentName: string
  assistantId: string
}

export function VoiceAgentWidget({ agentName, assistantId }: VoiceAgentWidgetProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const vapiRef = useRef<Vapi | null>(null)
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => {
      vapiRef.current?.stop()
    }
  }, [])

  useEffect(() => {
    const container = transcriptContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [transcript])

  async function startCall() {
    setStatus('connecting')
    setErrorMessage('')

    const vapi = new Vapi(VAPI_PUBLIC_KEY)
    vapiRef.current = vapi

    vapi.on('call-start', () => setStatus('in-call'))
    vapi.on('call-end', () => setStatus('ended'))
    vapi.on('error', (e: unknown) => {
      console.warn(`[${agentName} widget] Vapi error:`, e)
      setStatus('error')
      setErrorMessage(extractErrorMessage(e))
    })
    vapi.on(
      'message',
      (msg: { type?: string; role?: string; transcript?: string; transcriptType?: string }) => {
        if (msg.type === 'transcript' && msg.transcriptType === 'final' && msg.transcript) {
          setTranscript((prev) => [
            ...prev,
            {
              speaker: msg.role === 'assistant' ? 'agent' : 'You',
              text: msg.transcript!,
            },
          ])
        }
      }
    )
    vapi.on('speech-start', () => {})
    vapi.on('speech-end', () => {})

    try {
      await vapi.start(assistantId)
    } catch (e) {
      console.warn(`[${agentName} widget] Vapi start() threw:`, e)
      setStatus('error')
      setErrorMessage(extractErrorMessage(e))
    }
  }

  function endCall() {
    vapiRef.current?.stop()
    setStatus('ended')
  }

  function toggleMute() {
    if (!vapiRef.current) return
    const next = !isMuted
    vapiRef.current.setMuted(next)
    setIsMuted(next)
  }

  function resetDemo() {
    setStatus('idle')
    setTranscript([])
    setIsMuted(false)
    setErrorMessage('')
    vapiRef.current = null
  }

  const statusConfig: Record<Status, { color: string; label: string; pulse?: boolean }> = {
    idle: { color: 'bg-neutral-600', label: 'Ready' },
    connecting: { color: 'bg-yellow-400', label: 'Connecting...', pulse: true },
    'in-call': { color: 'bg-green-500', label: `In call with ${agentName}`, pulse: true },
    ended: { color: 'bg-neutral-400', label: 'Call ended' },
    error: { color: 'bg-red-500', label: 'Error' },
  }

  const currentStatus = statusConfig[status]

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
      {/* Status bar */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${currentStatus.color} ${currentStatus.pulse ? 'animate-pulse' : ''}`}
          />
          <span className="text-xs text-neutral-300 tracking-wide" role="status" aria-live="polite">
            {currentStatus.label}
          </span>
        </div>
        {status === 'in-call' && (
          <button
            type="button"
            onClick={toggleMute}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        )}
      </div>

      {/* Transcript area */}
      <div
        ref={transcriptContainerRef}
        className="overflow-y-auto flex flex-col gap-3 p-6"
        style={{ minHeight: 240, maxHeight: 320 }}
      >
        {(status === 'idle' || status === 'connecting') && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <p className="text-2xl mb-2" aria-hidden="true">🎙️</p>
            <p className="text-sm text-neutral-400">
              {status === 'idle' ? `Press "Call ${agentName}" to begin.` : `Connecting to ${agentName}...`}
            </p>
            {status === 'connecting' && (
              <p className="text-xs text-neutral-500 mt-2">
                Your browser may ask for microphone access — please allow it to continue.
              </p>
            )}
          </div>
        )}

        {status === 'error' && (
          <p className="text-sm text-red-400 text-center py-8">{errorMessage}</p>
        )}

        {(status === 'in-call' || status === 'ended') && (
          <>
            {transcript.length === 0 && status === 'ended' && (
              <p className="text-sm text-neutral-400 text-center py-8">No transcript captured.</p>
            )}
            {transcript.map((entry, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className={`text-[10px] uppercase tracking-widest font-semibold ${
                    entry.speaker === 'agent' ? 'text-white' : 'text-neutral-500'
                  }`}
                >
                  {entry.speaker === 'agent' ? agentName : entry.speaker}
                </span>
                <p
                  className={`text-sm leading-relaxed ${
                    entry.speaker === 'agent' ? 'text-neutral-200' : 'text-neutral-400 pl-4'
                  }`}
                >
                  {entry.text}
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Call controls */}
      <div className="border-t border-white/10 px-6 py-5 flex gap-3">
        {status === 'idle' && (
          <div className="relative w-full">
            <div className="absolute -inset-1 rounded-full bg-blue-500/40 blur-md animate-pulse pointer-events-none" />
            <button
              type="button"
              onClick={startCall}
              className="relative rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-blue-400/40 text-white py-3 text-sm font-semibold w-full shadow-[0_0_25px_rgba(59,130,246,0.55)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] hover:from-white/30 hover:to-white/10 transition-all"
            >
              Call {agentName} →
            </button>
          </div>
        )}

        {status === 'connecting' && (
          <button
            type="button"
            disabled
            className="rounded-full bg-white/5 border border-white/10 text-neutral-500 py-3 text-sm w-full cursor-not-allowed"
          >
            Connecting...
          </button>
        )}

        {status === 'in-call' && (
          <button
            type="button"
            onClick={endCall}
            className="flex-1 rounded-full border border-white/20 text-white py-3 text-sm font-semibold hover:bg-white/10 transition-all"
          >
            End Call
          </button>
        )}

        {(status === 'ended' || status === 'error') && (
          <button
            type="button"
            onClick={resetDemo}
            className="rounded-full border border-white/10 text-neutral-300 py-3 text-sm w-full hover:border-white/20 hover:text-white transition-all"
          >
            Start New Demo
          </button>
        )}
      </div>
    </div>
  )
}
