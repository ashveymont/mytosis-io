'use client'

import Vapi from '@vapi-ai/web'
import { useEffect, useRef, useState } from 'react'

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_KEY!
const ASSISTANT_ID = '77cdae2a-a6b7-4b5f-8a74-45ff16ec6cde'

type Status = 'idle' | 'connecting' | 'in-call' | 'ended' | 'error'
type TranscriptEntry = { speaker: 'Amara' | 'You'; text: string }

export function AmaraWidget() {
  const [status, setStatus] = useState<Status>('idle')
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const vapiRef = useRef<Vapi | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => {
      vapiRef.current?.stop()
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  async function startCall() {
    setStatus('connecting')
    setErrorMessage('')

    const vapi = new Vapi(VAPI_PUBLIC_KEY)
    vapiRef.current = vapi

    vapi.on('call-start', () => setStatus('in-call'))
    vapi.on('call-end', () => setStatus('ended'))
    vapi.on('error', (e: { message?: string }) => {
      setStatus('error')
      setErrorMessage(e?.message || 'Something went wrong.')
    })
    vapi.on(
      'message',
      (msg: { type?: string; role?: string; transcript?: string; transcriptType?: string }) => {
        if (msg.type === 'transcript' && msg.transcriptType === 'final' && msg.transcript) {
          setTranscript((prev) => [
            ...prev,
            {
              speaker: msg.role === 'assistant' ? 'Amara' : 'You',
              text: msg.transcript!,
            },
          ])
        }
      }
    )
    vapi.on('speech-start', () => {})
    vapi.on('speech-end', () => {})

    try {
      await vapi.start(ASSISTANT_ID)
    } catch (e) {
      setStatus('error')
      setErrorMessage(e instanceof Error ? e.message : 'Microphone access denied.')
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
    idle: { color: 'bg-[#E5E5E5]', label: 'Ready' },
    connecting: { color: 'bg-yellow-400', label: 'Connecting...', pulse: true },
    'in-call': { color: 'bg-green-500', label: 'In call with Amara', pulse: true },
    ended: { color: 'bg-[#0C0D0E]', label: 'Call ended' },
    error: { color: 'bg-red-500', label: 'Error' },
  }

  const currentStatus = statusConfig[status]

  return (
    <div className="max-w-md w-full mx-auto border border-[#E5E5E5] flex flex-col">
      {/* Status bar */}
      <div className="border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${currentStatus.color} ${currentStatus.pulse ? 'animate-pulse' : ''}`}
          />
          <span className="text-xs text-[#555555] tracking-wide">{currentStatus.label}</span>
        </div>
        {status === 'in-call' && (
          <button
            type="button"
            onClick={toggleMute}
            className="text-xs text-[#999999] hover:text-[#0C0D0E] transition-colors"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        )}
      </div>

      {/* Transcript area */}
      <div
        className="overflow-y-auto flex flex-col gap-3 p-6 bg-[#FAFAFA]"
        style={{ minHeight: 240, maxHeight: 320 }}
      >
        {(status === 'idle' || status === 'connecting') && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <p className="text-2xl mb-2">🎙️</p>
            <p className="text-sm text-[#999999]">
              {status === 'idle' ? 'Press "Call Amara" to begin.' : 'Connecting to Amara...'}
            </p>
          </div>
        )}

        {status === 'error' && (
          <p className="text-sm text-red-500 text-center py-8">{errorMessage}</p>
        )}

        {(status === 'in-call' || status === 'ended') && (
          <>
            {transcript.length === 0 && status === 'ended' && (
              <p className="text-sm text-[#999999] text-center py-8">No transcript captured.</p>
            )}
            {transcript.map((entry, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className={`text-[10px] uppercase tracking-widest font-semibold ${
                    entry.speaker === 'Amara' ? 'text-[#0C0D0E]' : 'text-[#999999]'
                  }`}
                >
                  {entry.speaker}
                </span>
                <p
                  className={`text-sm leading-relaxed ${
                    entry.speaker === 'Amara' ? 'text-[#0C0D0E]' : 'text-[#555555] pl-4'
                  }`}
                >
                  {entry.text}
                </p>
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Call controls */}
      <div className="border-t border-[#E5E5E5] px-6 py-5 flex gap-3">
        {status === 'idle' && (
          <button
            type="button"
            onClick={startCall}
            className="bg-[#0C0D0E] text-white py-3 text-sm font-medium w-full hover:bg-[#333] transition-all"
          >
            Call Amara →
          </button>
        )}

        {status === 'connecting' && (
          <button
            type="button"
            disabled
            className="bg-[#E5E5E5] text-[#999999] py-3 text-sm w-full cursor-not-allowed"
          >
            Connecting...
          </button>
        )}

        {status === 'in-call' && (
          <button
            type="button"
            onClick={endCall}
            className="flex-1 border border-[#0C0D0E] text-[#0C0D0E] py-3 text-sm font-medium hover:bg-[#0C0D0E] hover:text-white transition-all"
          >
            End Call
          </button>
        )}

        {(status === 'ended' || status === 'error') && (
          <button
            type="button"
            onClick={resetDemo}
            className="border border-[#E5E5E5] text-[#555555] py-3 text-sm w-full hover:border-[#0C0D0E] hover:text-[#0C0D0E] transition-all"
          >
            Start New Demo
          </button>
        )}
      </div>
    </div>
  )
}
