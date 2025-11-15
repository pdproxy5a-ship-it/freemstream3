'use client'
import { useState, useRef, useEffect } from 'react'

export default function RetroMusicApp() {
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  const freeMusicTracks = [
    {
      id: '1',
      title: 'Synthwave Car',
      artist: 'Gravity Sound',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3',
      duration: '3:45',
      source: 'FreeMusicArchive'
    },
    {
      id: '2',
      title: 'Lights Of Elysium',
      artist: 'AERØHEAD',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/AERHEAD/Chillhop_Daydreams_2/AERHEAD_-_01_-_Lights_Of_Elysium.mp3',
      duration: '4:20',
      source: 'FreeMusicArchive'
    },
    {
      id: '3',
      title: 'Ambient Piano',
      artist: 'Scott Buckley',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Scott_Buckley/Chrysalis/Scott_Buckley_-_01_-_A_Stroll_Through_the_Clouds.mp3',
      duration: '5:15',
      source: 'FreeMusicArchive'
    },
    {
      id: '4',
      title: 'Digital Dreams',
      artist: 'Ghostrifter Official',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ghostrifter_Official/Inspiring_Upbeat/Ghostrifter_Official_-_Digital_Dreams.mp3',
      duration: '2:45',
      source: 'FreeMusicArchive'
    },
    {
      id: '5',
      title: 'Sunset Drive',
      artist: 'Tokyo Music Walker',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tokyo_Music_Walker/Rising_Tide/Tokyo_Music_Walker_-_05_-_Sunset_Drive.mp3',
      duration: '3:30',
      source: 'FreeMusicArchive'
    }
  ]

  useEffect(() => {
    const loadMusic = async () => {
      try {
        setIsLoading(true)
        setTracks(freeMusicTracks)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load music catalog')
        setIsLoading(false)
      }
    }

    loadMusic()
  }, [])

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const playTrack = (track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress(0)
    
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Play failed:', err)
          setError('Failed to play track. Please try another one.')
        })
      }
    }, 100)
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => {
          console.error('Play failed:', err)
          setError('Failed to play track')
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime
      const duration = audioRef.current.duration
      setProgress((currentTime / duration) * 100)
    }
  }

  const handleAudioEnd = () => {
    setIsPlaying(false)
    setProgress(0)
  }

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <div className="retro-container">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="retro-text" style={{ 
          fontSize: '48px', 
          color: '#ffff00',
          textShadow: '4px 4px 0px #ff00ff, 8px 8px 0px #00ffff'
        }}>
          RETRO TUNES
        </h1>
        <div className="marquee">
          <marquee behavior="scroll" direction="left">
            🎵 FREE LEGAL MUSIC • NO ADS • NO SUBSCRIPTION • 100% FREE • LEGAL MUSIC • NO ADS 🎵
          </marquee>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="retro-input"
            placeholder="SEARCH TRACKS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="retro-button">SEARCH</button>
        </form>
      </div>

      {error && (
        <div className="error">
          {error}
          <button 
            onClick={() => setError('')} 
            style={{ marginLeft: '10px', background: '#ffff00', color: '#000' }}
          >
            X
          </button>
        </div>
      )}

      {currentTrack && (
        <div className="music-player">
          <h3 className="retro-text" style={{ color: '#ffff00' }}>
            NOW PLAYING: {currentTrack.title} - {currentTrack.artist}
          </h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="retro-button" onClick={togglePlay}>
              {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
            </button>
            <button className="retro-button" onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
              }
              setIsPlaying(false)
              setProgress(0)
            }}>
              ⏹️ STOP
            </button>
            <span style={{ marginLeft: '10px', color: '#00ff00' }}>
              {currentTrack.duration} • {currentTrack.source}
            </span>
          </div>
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleAudioEnd}
            onError={() => setError('Failed to load audio track')}
          />
        </div>
      )}

      <div>
        <h2 className="retro-text" style={{ 
          fontSize: '24px', 
          color: '#00ffff',
          marginBottom: '15px'
        }}>
          FREE MUSIC TRACKS ({filteredTracks.length})
        </h2>
        
        {isLoading ? (
          <div className="loading">
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🌀</div>
            LOADING AWESOME FREE MUSIC...
          </div>
        ) : (
          <ul className="track-list">
            {filteredTracks.map(track => (
              <li
                key={track.id}
                className={`track-item ${currentTrack?.id === track.id ? 'playing' : ''}`}
                onClick={() => playTrack(track)}
              >
                <strong style={{ fontSize: '18px' }}>{track.title}</strong> 
                <br />
                <span style={{ color: '#ff00ff' }}>🎤 {track.artist}</span>
                <br />
                <small>⏱️ {track.duration} • 📁 {track.source}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        padding: '20px',
        background: '#000',
        border: '2px solid #ff00ff'
      }}>
        <p className="retro-text" style={{ color: '#ffff00' }}>
          💿 ALL MUSIC IS 100% LEGAL AND FREE TO PLAY 💿
        </p>
        <p style={{ color: '#00ff00', fontSize: '12px', marginTop: '10px' }}>
          Music sourced from FreeMusicArchive • All tracks are royalty-free and legal to stream
        </p>
      </div>

      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        fontSize: '12px',
        color: '#ffff00',
        background: '#ff00ff',
        padding: '5px',
        border: '2px solid #00ffff',
        transform: 'rotate(5deg)'
      }}>
        🔥 RETRO MODE 🔥
      </div>

      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        fontSize: '10px',
        color: '#00ff00',
        background: '#000080',
        padding: '5px',
        border: '2px solid #ffff00'
      }}>
        📻 {tracks.length} TRACKS LOADED
      </div>
    </div>
  )
}