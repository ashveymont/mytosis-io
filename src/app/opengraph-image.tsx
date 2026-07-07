import { ImageResponse } from 'next/og'

export const alt = 'Mytosis AI — Hotel AI Infrastructure by Blackcrest Scaling'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #171717 100%)',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#9a9a9a',
            marginBottom: 24,
          }}
        >
          Hotel AI Infrastructure · by Blackcrest Scaling
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 128,
            fontWeight: 700,
            color: '#f5f5f5',
            lineHeight: 1.05,
          }}
        >
          Mytosis AI
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#b5b5b5',
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          AI voice and chat agents that turn missed calls into direct bookings.
        </div>
        <div
          style={{
            display: 'flex',
            gap: 64,
            marginTop: 64,
            paddingTop: 40,
            borderTop: '1px solid #2a2a2a',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#f5f5f5' }}>30–40%</div>
            <div style={{ display: 'flex', fontSize: 18, color: '#8a8a8a', marginTop: 6 }}>Calls go unanswered</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#f5f5f5' }}>15–25%</div>
            <div style={{ display: 'flex', fontSize: 18, color: '#8a8a8a', marginTop: 6 }}>OTA commission rate</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#f5f5f5' }}>$73K+</div>
            <div style={{ display: 'flex', fontSize: 18, color: '#8a8a8a', marginTop: 6 }}>Per property, per year</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
