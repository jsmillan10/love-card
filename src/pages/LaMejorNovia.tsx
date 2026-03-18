import { useState, useEffect, useRef, useCallback } from 'react'
import './LaMejorNovia.scss'

type Phase =
  | 'intro'
  | 'traveling'
  | 'arriving'
  | 'walking'
  | 'meeting'
  | 'hugging'
  | 'letter-deliver'
  | 'letter-view'

// ===== SVG CHARACTER COMPONENTS =====
function BoySVG({ hugging = false, walking = false }: { hugging?: boolean; walking?: boolean }) {
  return (
    <svg viewBox="0 0 120 200" width="100" height="170" className="lmn-svg-char">
      {/* Shadow */}
      <ellipse cx="60" cy="195" rx="30" ry="5" fill="rgba(0,0,0,0.15)" />

      {/* Left leg */}
      <g className={walking ? 'lmn-svg-walk-a' : ''} style={{ transformOrigin: '45px 140px' }}>
        <rect x="40" y="140" width="16" height="38" rx="5" fill="#2c3e50" stroke="#1a252f" strokeWidth="1" />
        <rect x="36" y="174" width="22" height="10" rx="4" fill="#2c3e50" stroke="#1a252f" strokeWidth="1" />
      </g>
      {/* Right leg */}
      <g className={walking ? 'lmn-svg-walk-b' : ''} style={{ transformOrigin: '70px 140px' }}>
        <rect x="64" y="140" width="16" height="38" rx="5" fill="#2c3e50" stroke="#1a252f" strokeWidth="1" />
        <rect x="62" y="174" width="22" height="10" rx="4" fill="#2c3e50" stroke="#1a252f" strokeWidth="1" />
      </g>

      {/* Torso */}
      <rect x="34" y="90" width="52" height="55" rx="10" fill="#4a90d9" stroke="#3070b0" strokeWidth="1.5" />
      {/* Shirt collar */}
      <path d="M 50 90 L 60 102 L 70 90" fill="none" stroke="#3070b0" strokeWidth="1.5" />
      {/* Shirt buttons */}
      <circle cx="60" cy="108" r="2" fill="#3070b0" />
      <circle cx="60" cy="120" r="2" fill="#3070b0" />

      {/* Left arm */}
      <g className={hugging ? 'lmn-svg-hug-left' : ''} style={{ transformOrigin: '34px 95px' }}>
        <rect x="18" y="92" width="16" height="40" rx="7" fill="#4a90d9" stroke="#3070b0" strokeWidth="1" />
        <circle cx="26" cy="134" r="8" fill="#c68642" stroke="#a0693a" strokeWidth="1" />
      </g>
      {/* Right arm */}
      <g className={hugging ? 'lmn-svg-hug-right' : ''} style={{ transformOrigin: '86px 95px' }}>
        <rect x="86" y="92" width="16" height="40" rx="7" fill="#4a90d9" stroke="#3070b0" strokeWidth="1" />
        <circle cx="94" cy="134" r="8" fill="#c68642" stroke="#a0693a" strokeWidth="1" />
      </g>

      {/* Neck */}
      <rect x="52" y="80" width="16" height="14" rx="4" fill="#c68642" />

      {/* Head */}
      <ellipse cx="60" cy="52" rx="30" ry="32" fill="#c68642" stroke="#a0693a" strokeWidth="1.5" />

      {/* Hair - brown, styled */}
      <ellipse cx="60" cy="35" rx="32" ry="22" fill="#5c3a1e" />
      <ellipse cx="60" cy="28" rx="28" ry="16" fill="#6b4423" />
      {/* Quiff */}
      <ellipse cx="48" cy="22" rx="14" ry="10" fill="#5c3a1e" />
      <ellipse cx="52" cy="19" rx="10" ry="8" fill="#6b4423" />
      {/* Side hair */}
      <rect x="28" y="35" width="8" height="18" rx="4" fill="#5c3a1e" />
      <rect x="84" y="35" width="8" height="18" rx="4" fill="#5c3a1e" />

      {/* Ears */}
      <ellipse cx="30" cy="55" rx="5" ry="7" fill="#c68642" stroke="#a0693a" strokeWidth="1" />
      <ellipse cx="90" cy="55" rx="5" ry="7" fill="#c68642" stroke="#a0693a" strokeWidth="1" />

      {/* Eyebrows */}
      <path d="M 42 42 Q 48 38 54 42" fill="none" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 66 42 Q 72 38 78 42" fill="none" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" />

      {/* Eyes - green */}
      <ellipse cx="48" cy="50" rx="8" ry="9" fill="white" stroke="#555" strokeWidth="1" />
      <ellipse cx="72" cy="50" rx="8" ry="9" fill="white" stroke="#555" strokeWidth="1" />
      {/* Iris - green */}
      <circle cx="50" cy="50" r="5" fill="#2e8b57" />
      <circle cx="74" cy="50" r="5" fill="#2e8b57" />
      {/* Pupil */}
      <circle cx="50" cy="50" r="2.5" fill="#1a1a1a" />
      <circle cx="74" cy="50" r="2.5" fill="#1a1a1a" />
      {/* Eye shine */}
      <circle cx="52" cy="48" r="1.5" fill="white" />
      <circle cx="76" cy="48" r="1.5" fill="white" />

      {/* Nose */}
      <path d="M 58 56 Q 60 62 62 56" fill="none" stroke="#a0693a" strokeWidth="1.5" strokeLinecap="round" />

      {/* Smile */}
      <path d="M 48 66 Q 60 76 72 66" fill="#c0392b" stroke="#a93226" strokeWidth="1" />
      <path d="M 52 66 Q 60 72 68 66" fill="#e74c3c" stroke="none" />

      {/* Beard / stubble */}
      <ellipse cx="60" cy="72" rx="18" ry="10" fill="none" stroke="#4a3520" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
      <ellipse cx="60" cy="75" rx="15" ry="8" fill="none" stroke="#4a3520" strokeWidth="0.8" strokeDasharray="1.5 2" opacity="0.4" />
      {/* Chin beard area */}
      <path d="M 42 68 Q 42 80 60 82 Q 78 80 78 68" fill="none" stroke="#4a3520" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.45" />
      {/* Jaw shadow with stubble texture */}
      <rect x="38" y="70" width="3" height="2" rx="1" fill="#4a3520" opacity="0.3" />
      <rect x="44" y="74" width="2" height="2" rx="1" fill="#4a3520" opacity="0.25" />
      <rect x="50" y="76" width="2" height="2" rx="1" fill="#4a3520" opacity="0.3" />
      <rect x="56" y="77" width="2" height="2" rx="1" fill="#4a3520" opacity="0.3" />
      <rect x="62" y="77" width="2" height="2" rx="1" fill="#4a3520" opacity="0.3" />
      <rect x="68" y="76" width="2" height="2" rx="1" fill="#4a3520" opacity="0.3" />
      <rect x="74" y="74" width="2" height="2" rx="1" fill="#4a3520" opacity="0.25" />
      <rect x="79" y="70" width="3" height="2" rx="1" fill="#4a3520" opacity="0.3" />
    </svg>
  )
}

function GirlSVG({ hugging = false }: { hugging?: boolean }) {
  return (
    <svg viewBox="0 0 120 200" width="95" height="165" className="lmn-svg-char">
      {/* Shadow */}
      <ellipse cx="60" cy="195" rx="28" ry="5" fill="rgba(0,0,0,0.15)" />

      {/* Left leg */}
      <rect x="42" y="148" width="14" height="32" rx="5" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
      <rect x="38" y="176" width="20" height="8" rx="3" fill="#ff1493" stroke="#d4127a" strokeWidth="1" />
      {/* Right leg */}
      <rect x="64" y="148" width="14" height="32" rx="5" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
      <rect x="62" y="176" width="20" height="8" rx="3" fill="#ff1493" stroke="#d4127a" strokeWidth="1" />

      {/* Dress */}
      <path d="M 34 105 L 28 155 Q 60 162 92 155 L 86 105 Z" fill="#ff69b4" stroke="#e0559e" strokeWidth="1.5" />
      {/* Dress folds */}
      <path d="M 45 115 Q 48 140 42 155" fill="none" stroke="#e0559e" strokeWidth="1" opacity="0.5" />
      <path d="M 75 115 Q 72 140 78 155" fill="none" stroke="#e0559e" strokeWidth="1" opacity="0.5" />
      {/* Dress decoration - lace trim */}
      <path d="M 30 153 Q 35 148 40 153 Q 45 148 50 153 Q 55 148 60 153 Q 65 148 70 153 Q 75 148 80 153 Q 85 148 90 153" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Belt */}
      <rect x="34" y="108" width="52" height="6" rx="3" fill="#e0559e" />
      <circle cx="60" cy="111" r="3" fill="#ffd700" />

      {/* Torso */}
      <rect x="36" y="88" width="48" height="22" rx="8" fill="#ff69b4" stroke="#e0559e" strokeWidth="1.5" />

      {/* Left arm */}
      <g className={hugging ? 'lmn-svg-hug-left-girl' : ''} style={{ transformOrigin: '36px 92px' }}>
        <rect x="18" y="90" width="14" height="36" rx="6" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
        <circle cx="25" cy="128" r="7" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
      </g>
      {/* Right arm */}
      <g className={hugging ? 'lmn-svg-hug-right-girl' : ''} style={{ transformOrigin: '84px 92px' }}>
        <rect x="88" y="90" width="14" height="36" rx="6" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
        <circle cx="95" cy="128" r="7" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
      </g>

      {/* Neck */}
      <rect x="52" y="78" width="16" height="14" rx="4" fill="#f5c6a0" />
      {/* Necklace */}
      <path d="M 48 88 Q 60 94 72 88" fill="none" stroke="#ffd700" strokeWidth="1.5" />
      <circle cx="60" cy="93" r="2.5" fill="#ffd700" />

      {/* Hair back (behind head) */}
      <ellipse cx="60" cy="50" rx="36" ry="35" fill="#d4a017" />
      {/* Long flowing hair */}
      <path d="M 24 50 Q 20 80 22 108" fill="none" stroke="#c49510" strokeWidth="12" strokeLinecap="round" />
      <path d="M 96 50 Q 100 80 98 108" fill="none" stroke="#c49510" strokeWidth="12" strokeLinecap="round" />
      <path d="M 26 50 Q 22 78 24 105" fill="none" stroke="#d4a017" strokeWidth="8" strokeLinecap="round" />
      <path d="M 94 50 Q 98 78 96 105" fill="none" stroke="#d4a017" strokeWidth="8" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="60" cy="50" rx="28" ry="30" fill="#f5c6a0" stroke="#daa882" strokeWidth="1.5" />

      {/* Hair top */}
      <ellipse cx="60" cy="32" rx="30" ry="20" fill="#d4a017" />
      <ellipse cx="60" cy="27" rx="26" ry="15" fill="#dbb030" />
      {/* Hair wave/part */}
      <path d="M 35 30 Q 45 22 60 25 Q 75 22 85 30" fill="#c49510" />
      {/* Side bangs */}
      <path d="M 32 35 Q 34 45 36 50" fill="none" stroke="#c49510" strokeWidth="6" strokeLinecap="round" />
      <path d="M 88 35 Q 86 45 84 50" fill="none" stroke="#c49510" strokeWidth="6" strokeLinecap="round" />

      {/* Ears */}
      <ellipse cx="32" cy="52" rx="4" ry="6" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
      <ellipse cx="88" cy="52" rx="4" ry="6" fill="#f5c6a0" stroke="#daa882" strokeWidth="1" />
      {/* Earrings */}
      <circle cx="32" cy="60" r="2.5" fill="#ffd700" />
      <circle cx="88" cy="60" r="2.5" fill="#ffd700" />

      {/* Eyebrows - thin, arched */}
      <path d="M 40 40 Q 47 36 54 40" fill="none" stroke="#8b6914" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 66 40 Q 73 36 80 40" fill="none" stroke="#8b6914" strokeWidth="1.8" strokeLinecap="round" />

      {/* Eyes - blue, big */}
      <ellipse cx="47" cy="49" rx="9" ry="10" fill="white" stroke="#666" strokeWidth="1" />
      <ellipse cx="73" cy="49" rx="9" ry="10" fill="white" stroke="#666" strokeWidth="1" />
      {/* Eyelashes - top */}
      <path d="M 38 44 Q 42 39 46 42" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 48 41 Q 50 38 52 42" fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 56 44 Q 52 39 48 42" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 64 44 Q 68 39 72 42" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 74 41 Q 76 38 78 42" fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 82 44 Q 78 39 74 42" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      {/* Iris - blue */}
      <circle cx="49" cy="49" r="6" fill="#4a90d9" />
      <circle cx="75" cy="49" r="6" fill="#4a90d9" />
      {/* Inner iris detail */}
      <circle cx="49" cy="49" r="4" fill="#357abd" />
      <circle cx="75" cy="49" r="4" fill="#357abd" />
      {/* Pupil */}
      <circle cx="49" cy="49" r="2.5" fill="#1a1a1a" />
      <circle cx="75" cy="49" r="2.5" fill="#1a1a1a" />
      {/* Eye shine */}
      <circle cx="51" cy="47" r="2" fill="white" />
      <circle cx="77" cy="47" r="2" fill="white" />
      <circle cx="47" cy="51" r="1" fill="rgba(255,255,255,0.5)" />
      <circle cx="73" cy="51" r="1" fill="rgba(255,255,255,0.5)" />

      {/* Blush */}
      <ellipse cx="37" cy="58" rx="7" ry="4" fill="rgba(255,150,150,0.4)" />
      <ellipse cx="83" cy="58" rx="7" ry="4" fill="rgba(255,150,150,0.4)" />

      {/* Nose */}
      <path d="M 58 54 Q 60 60 62 54" fill="none" stroke="#daa882" strokeWidth="1.5" strokeLinecap="round" />

      {/* Lips */}
      <path d="M 50 65 Q 55 62 60 65 Q 65 62 70 65" fill="#e74c3c" stroke="#c0392b" strokeWidth="0.8" />
      <path d="M 50 65 Q 60 72 70 65" fill="#ff6b6b" stroke="#e74c3c" strokeWidth="0.8" />
    </svg>
  )
}

function LaMejorNovia() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [letterOpen, setLetterOpen] = useState(false)
  const [letterWasClosed, setLetterWasClosed] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; duration: number }[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const melodyIntervalRef = useRef<number | null>(null)

  // Generate floating hearts
  useEffect(() => {
    if (phase === 'hugging' || phase === 'letter-deliver' || phase === 'letter-view') {
      const interval = setInterval(() => {
        setHearts((prev) => {
          const newHeart = {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            size: 15 + Math.random() * 25,
            duration: 3 + Math.random() * 4,
          }
          return [...prev.slice(-30), newHeart]
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [phase])

  // Phase transitions
  useEffect(() => {
    const timers: Record<string, number> = {
      traveling: 8000,
      arriving: 3000,
      walking: 3500,
      meeting: 2000,
      hugging: 3000,
      'letter-deliver': 3000,
    }
    const nextPhase: Record<string, Phase> = {
      traveling: 'arriving',
      arriving: 'walking',
      walking: 'meeting',
      meeting: 'hugging',
      hugging: 'letter-deliver',
      'letter-deliver': 'letter-view',
    }
    if (timers[phase]) {
      const t = setTimeout(() => setPhase(nextPhase[phase]), timers[phase])
      return () => clearTimeout(t)
    }
  }, [phase])

  const playRomanticMelody = useCallback(() => {
    if (audioContextRef.current) return
    const ctx = new AudioContext()
    audioContextRef.current = ctx
    const masterGain = ctx.createGain()
    masterGain.gain.value = 0.15
    masterGain.connect(ctx.destination)
    gainNodeRef.current = masterGain

    const melody = [
      { freq: 523.25, dur: 0.6 },  // C5
      { freq: 587.33, dur: 0.3 },  // D5
      { freq: 659.25, dur: 0.6 },  // E5
      { freq: 698.46, dur: 0.3 },  // F5
      { freq: 659.25, dur: 0.6 },  // E5
      { freq: 587.33, dur: 0.3 },  // D5
      { freq: 523.25, dur: 0.9 },  // C5
      { freq: 0, dur: 0.3 },
      { freq: 493.88, dur: 0.6 },  // B4
      { freq: 523.25, dur: 0.3 },  // C5
      { freq: 587.33, dur: 0.6 },  // D5
      { freq: 523.25, dur: 0.3 },  // C5
      { freq: 493.88, dur: 0.3 },  // B4
      { freq: 440.00, dur: 0.9 },  // A4
      { freq: 0, dur: 0.3 },
      { freq: 440.00, dur: 0.6 },  // A4
      { freq: 493.88, dur: 0.3 },  // B4
      { freq: 523.25, dur: 0.6 },  // C5
      { freq: 587.33, dur: 0.6 },  // D5
      { freq: 659.25, dur: 0.6 },  // E5
      { freq: 523.25, dur: 0.9 },  // C5
      { freq: 0, dur: 0.3 },
      { freq: 392.00, dur: 0.6 },  // G4
      { freq: 440.00, dur: 0.3 },  // A4
      { freq: 493.88, dur: 0.6 },  // B4
      { freq: 523.25, dur: 0.6 },  // C5
      { freq: 587.33, dur: 0.3 },  // D5
      { freq: 523.25, dur: 0.9 },  // C5
      { freq: 0, dur: 0.6 },
    ]

    const playSequence = () => {
      let time = ctx.currentTime + 0.1
      melody.forEach((note) => {
        if (note.freq > 0) {
          const osc = ctx.createOscillator()
          const noteGain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.value = note.freq
          noteGain.gain.setValueAtTime(0, time)
          noteGain.gain.linearRampToValueAtTime(0.6, time + 0.05)
          noteGain.gain.exponentialRampToValueAtTime(0.3, time + note.dur * 0.5)
          noteGain.gain.exponentialRampToValueAtTime(0.01, time + note.dur * 0.95)
          osc.connect(noteGain)
          noteGain.connect(masterGain)
          osc.start(time)
          osc.stop(time + note.dur)

          // Soft harmonic
          const osc2 = ctx.createOscillator()
          const noteGain2 = ctx.createGain()
          osc2.type = 'sine'
          osc2.frequency.value = note.freq * 2
          noteGain2.gain.setValueAtTime(0, time)
          noteGain2.gain.linearRampToValueAtTime(0.1, time + 0.05)
          noteGain2.gain.exponentialRampToValueAtTime(0.01, time + note.dur * 0.8)
          osc2.connect(noteGain2)
          noteGain2.connect(masterGain)
          osc2.start(time)
          osc2.stop(time + note.dur)
        }
        time += note.dur
      })
      return time - ctx.currentTime
    }

    const totalDuration = playSequence()
    melodyIntervalRef.current = window.setInterval(() => {
      playSequence()
    }, totalDuration * 1000)
  }, [])

  // Cleanup music on unmount
  useEffect(() => {
    return () => {
      if (melodyIntervalRef.current) clearInterval(melodyIntervalRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [])

  const handleStart = () => {
    playRomanticMelody()
    setPhase('traveling')
  }

  const toggleLetter = () => {
    if (letterOpen) {
      setLetterOpen(false)
      setLetterWasClosed(true)
    } else {
      setLetterOpen(true)
      setLetterWasClosed(false)
    }
  }

  return (
    <div className="lmn-page">
      {/* Background music via Web Audio API - no audio tag needed */}

      {/* Floating hearts */}
      <div className="lmn-hearts-container">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="lmn-floating-heart"
            style={{
              left: `${h.x}%`,
              bottom: '-5%',
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
            }}
          >
            {['❤️', '💖', '💕', '💗', '💘', '💝', '🩷'][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="lmn-sparkles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="lmn-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ====== INTRO ====== */}
      {phase === 'intro' && (
        <div className="lmn-intro">
          <div className="lmn-intro__envelope">💌</div>
          <h1 className="lmn-intro__title">Para la mejor novia del mundo</h1>
          <p className="lmn-intro__subtitle">Una carta especial te espera...</p>
          <button className="lmn-intro__button" onClick={handleStart}>
            <span className="lmn-intro__button-icon">💖</span>
            Toca para comenzar
            <span className="lmn-intro__button-icon">💖</span>
          </button>
        </div>
      )}

      {/* ====== TRAVELING SCENE ====== */}
      {phase === 'traveling' && (
        <div className="lmn-travel">
          <div className="lmn-travel__sky">
            <div className="lmn-moon" />
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="lmn-star"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  top: `${3 + Math.random() * 35}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Airplane with boy */}
          <div className="lmn-travel__airplane">
            <div className="lmn-travel__plane-body">
              <div className="lmn-travel__plane-window">
                {/* Boy face in window */}
                <div className="lmn-mini-face">
                  <div className="lmn-mini-face__hair" />
                  <div className="lmn-mini-face__skin">
                    <div className="lmn-mini-face__eyes">
                      <span />
                      <span />
                    </div>
                    <div className="lmn-mini-face__smile" />
                  </div>
                </div>
              </div>
              <div className="lmn-travel__plane-wing lmn-travel__plane-wing--top" />
              <div className="lmn-travel__plane-wing lmn-travel__plane-wing--bottom" />
              <div className="lmn-travel__plane-tail" />
              <div className="lmn-travel__plane-nose" />
            </div>
            {/* Trail hearts */}
            <div className="lmn-travel__trail">
              {['💕', '💗', '💖', '❤️', '💘'].map((h, i) => (
                <span key={i} className="lmn-travel__trail-heart" style={{ animationDelay: `${i * 0.3}s` }}>
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Scrolling landmarks */}
          <div className="lmn-travel__ground">
            <div className="lmn-travel__landmarks">
              {/* Colombia - Starting point */}
              <div className="lmn-landmark">
                <div className="lmn-landmark__icon">🇨🇴</div>
                <div className="lmn-landmark__name">Colombia</div>
                <div className="lmn-landmark__building lmn-landmark__building--colombia">
                  <div className="lmn-palm">🌴</div>
                </div>
              </div>

              {/* Ocean */}
              <div className="lmn-landmark lmn-landmark--ocean">
                <div className="lmn-landmark__icon">🌊</div>
                <div className="lmn-landmark__name">Atlántico</div>
              </div>

              {/* Spain */}
              <div className="lmn-landmark">
                <div className="lmn-landmark__icon">🇪🇸</div>
                <div className="lmn-landmark__name">España</div>
                <div className="lmn-landmark__building">🏰</div>
              </div>

              {/* France */}
              <div className="lmn-landmark">
                <div className="lmn-landmark__icon">🇫🇷</div>
                <div className="lmn-landmark__name">Francia</div>
                <div className="lmn-landmark__building">🗼</div>
              </div>

              {/* Belgium */}
              <div className="lmn-landmark">
                <div className="lmn-landmark__icon">🇧🇪</div>
                <div className="lmn-landmark__name">Bélgica</div>
                <div className="lmn-landmark__building">🍫</div>
              </div>

              {/* Holland - Destination */}
              <div className="lmn-landmark lmn-landmark--destination">
                <div className="lmn-landmark__icon">🇳🇱</div>
                <div className="lmn-landmark__name">¡Holanda!</div>
                <div className="lmn-landmark__building lmn-landmark__building--holland">
                  <span>🌷</span>
                  <span className="lmn-windmill">🏠</span>
                  <span>🌷</span>
                </div>
                <div className="lmn-landmark__heart">❤️</div>
              </div>
            </div>
          </div>

          {/* Travel text */}
          <div className="lmn-travel__text">
            ✈️ Viajando por el mundo para llegar a ti...
          </div>
        </div>
      )}

      {/* ====== ARRIVING IN HOLLAND ====== */}
      {phase === 'arriving' && (
        <div className="lmn-arriving">
          <div className="lmn-arriving__sky">
            <div className="lmn-moon" />
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="lmn-star"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${5 + Math.random() * 30}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className="lmn-arriving__ground">
            <div className="lmn-arriving__tulips">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="lmn-arriving__tulip" style={{ animationDelay: `${i * 0.15}s` }}>🌷</span>
              ))}
            </div>
          </div>
          <div className="lmn-arriving__plane">✈️</div>
          <div className="lmn-arriving__flag">🇳🇱</div>
          <div className="lmn-arriving__text">
            🌷 ¡Llegué a Holanda por ti, mi amor! 🌷
          </div>
        </div>
      )}

      {/* ====== WALKING + MEETING + HUGGING + LETTER DELIVER ====== */}
      {(phase === 'walking' || phase === 'meeting' || phase === 'hugging' || phase === 'letter-deliver') && (
        <div className="lmn-scene">
          <div className="lmn-sky">
            <div className="lmn-moon" />
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="lmn-star"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${5 + Math.random() * 30}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="lmn-ground">
            {/* Holland tulips on ground */}
            <div className="lmn-ground__tulips">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i}>🌷</span>
              ))}
            </div>
          </div>
          <div className="lmn-path" />

          {/* Holland House with windmill style */}
          <div className="lmn-house">
            <div className="lmn-house__roof">
              <div className="lmn-house__roof-triangle" />
            </div>
            <div className="lmn-house__body">
              <div className="lmn-house__door" />
              <div className="lmn-house__window lmn-house__window--left">
                <div className="lmn-house__window-glow" />
              </div>
              <div className="lmn-house__window lmn-house__window--right">
                <div className="lmn-house__window-glow" />
              </div>
            </div>
            <div className="lmn-house__chimney" />
            <div className="lmn-house__heart">❤️</div>
            <div className="lmn-house__flag">🇳🇱</div>
          </div>

          {/* ===== BOY CHARACTER (SVG) ===== */}
          <div className={`lmn-boy lmn-boy--${phase}`}>
            <BoySVG hugging={phase === 'hugging'} walking={phase === 'walking'} />
            {/* Letter in hand */}
            {(phase === 'walking' || phase === 'meeting') && (
              <div className="lmn-boy__letter">💌</div>
            )}
            {/* Love burst */}
            {(phase === 'hugging' || phase === 'letter-deliver') && (
              <div className="lmn-love-burst">
                {['❤️', '💕', '💖', '💗', '💘'].map((h, i) => (
                  <span key={i} className="lmn-love-burst__heart" style={{ animationDelay: `${i * 0.3}s` }}>{h}</span>
                ))}
              </div>
            )}
          </div>

          {/* ===== GIRL CHARACTER (SVG) ===== */}
          {(phase === 'meeting' || phase === 'hugging' || phase === 'letter-deliver') && (
            <div className={`lmn-girl lmn-girl--${phase}`}>
              <GirlSVG hugging={phase === 'hugging'} />
            </div>
          )}

          {/* Floating letter during delivery */}
          {phase === 'letter-deliver' && (
            <div className="lmn-scene__letter-float">
              <div className="lmn-scene__letter-envelope">💌</div>
              <div className="lmn-scene__letter-text">Para ti, mi amor...</div>
            </div>
          )}

          {/* Scene text */}
          <div className="lmn-scene__text">
            {phase === 'walking' && '🚶 Caminando hacia tu casa...'}
            {phase === 'meeting' && '💫 ¡Te encontré mi amor!'}
            {phase === 'hugging' && '🤗 ¡Por fin juntos!'}
            {phase === 'letter-deliver' && '💌 Tengo algo especial para ti...'}
          </div>
        </div>
      )}

      {/* ====== LETTER VIEW ====== */}
      {phase === 'letter-view' && (
        <div className="lmn-letter-scene">
          <h1 className="lmn-letter-scene__title">
            💝 Para ti, mi amor 💝
          </h1>

          {/* Closed message after reading */}
          {letterWasClosed && !letterOpen && (
            <div className="lmn-closed-message">
              <div className="lmn-closed-message__hearts">💖💕💖</div>
              <h2 className="lmn-closed-message__text">Te amo amor de mi vida</h2>
              <div className="lmn-closed-message__hearts">💖💕💖</div>
              <button className="lmn-closed-message__reopen" onClick={toggleLetter}>
                Volver a leer la carta 💌
              </button>
            </div>
          )}

          {/* Envelope */}
          {(!letterWasClosed || letterOpen) && (
            <div className={`lmn-envelope ${letterOpen ? 'lmn-envelope--open' : ''}`} onClick={!letterOpen ? toggleLetter : undefined}>
              <div className="lmn-envelope__body">
                <div className="lmn-envelope__front">
                  <div className="lmn-envelope__heart-seal">💖</div>
                  {!letterOpen && <p className="lmn-envelope__label">Toca para abrir tu carta</p>}
                </div>
                <div className="lmn-envelope__flap" />
              </div>

              {letterOpen && (
                <div className="lmn-letter" onClick={(e) => e.stopPropagation()}>
                  <div className="lmn-letter__paper">
                    <div className="lmn-letter__decorations">
                      <span className="lmn-letter__deco lmn-letter__deco--tl">🌹</span>
                      <span className="lmn-letter__deco lmn-letter__deco--tr">🌹</span>
                      <span className="lmn-letter__deco lmn-letter__deco--bl">🌷</span>
                      <span className="lmn-letter__deco lmn-letter__deco--br">🌷</span>
                    </div>

                    <div className="lmn-letter__header">
                      <span>💌</span> Carta de amor <span>💌</span>
                    </div>

                    <div className="lmn-letter__content">
                      <p>
                        Para la novia perfecta y la niña más talentosa del mundo 💖:
                        <span className="lmn-break" />
                        Mi vida quería hacerte esta carta para recordarte que yo estoy
                        muy orgulloso de ti, eres increíble, eres súper talentosa, eres
                        demasiado inteligente, eres demasiado bella, y yo solo puedo
                        pensar en que soy el novio más afortunado del mundo por tenerte
                        conmigo.
                        <span className="lmn-break" />
                        Cada día que pasa no hago más que pensar en todos los momentos
                        lindos que hemos pasado juntitos y pienso en todo el amor que nos
                        dabamos, hasta el punto que mi corazón se muere un poquito de
                        tristeza anhelando que pronto pueda volver a estar contigo para
                        soltar todo ese amor que tiene retenido por ti y así pueda volver
                        a ser tan feliz como antes.
                        <span className="lmn-break" />
                        Yo solo te quiero para mi y te quiero ya, no quiero esperar más
                        tiempo, no quiero más obstáculos hacia ti, solo quiero llegar,
                        abrazarte y robarte esos labios hermosos que tienes sin dejarte
                        respirar.
                        <span className="lmn-break" />
                        Linda lamento no poder darte todo el cariño que quieres y te
                        mereces cada día, pero al menos tienes que saber que yo te amo un
                        mundo y todo este esfuerzo lo hago pensando en que algún día podré
                        armar mi hogar contigo donde al fin podremos colgar nuestro cuadro
                        de nuestra casita sabiendo que otra vez estamos juntos y ahora será
                        para siempre. Así que con toda! porque el futuro que nos espera
                        juntos es todo lo que yo quiero en mi vida y lo quiero ya (o ayer
                        si se puede)!!!
                        <span className="lmn-break" />
                        Te amo mucho mi vida, hasta el infinito y más allá, te extraño un
                        montón, estoy feliz de verte avanzar con todo (tus estudios, tu
                        trabajo, el gym, tu dieta, etc) y no olvides que cuentas con todo
                        mi apoyo hoy y siempre para encontrar la manera de que mi solecito
                        brille tan alto y fuerte como se pueda.
                        <span className="lmn-break" />
                        Te extraño un mundo amor, que alguien me devuelva a las pijamadas
                        con mi mamacita cada noche, porque esos momentos se convirtieron
                        en mi lugar feliz.
                        <span className="lmn-break" />
                        Vuelve pronto, te ama y te admira, tu futuro esposo.
                      </p>
                    </div>

                    <div className="lmn-letter__footer">
                      <div className="lmn-letter__signature">
                        Con todo mi amor 💍
                      </div>
                      <div className="lmn-letter__hearts-row">
                        ❤️ 💕 💖 💗 💘 💝 💖 💕 ❤️
                      </div>
                    </div>
                  </div>

                  <button className="lmn-letter__close" onClick={(e) => { e.stopPropagation(); toggleLetter(); }}>
                    Cerrar carta 💌
                  </button>
                </div>
              )}
            </div>
          )}

          {!letterOpen && !letterWasClosed && (
            <div className="lmn-letter-scene__hint">
              ✨ Toca el sobre para leer tu carta ✨
            </div>
          )}

          {/* Music toggle */}
          <button
            className="lmn-music-toggle"
            onClick={() => {
              if (gainNodeRef.current) {
                const current = gainNodeRef.current.gain.value
                gainNodeRef.current.gain.value = current > 0 ? 0 : 0.15
              }
            }}
          >
            🎵
          </button>
        </div>
      )}
    </div>
  )
}

export default LaMejorNovia
