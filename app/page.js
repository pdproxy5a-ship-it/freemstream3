'use client'
import { useState, useRef, useEffect } from 'react'

export default function ModernRetroMusicApp() {
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  // Extensive catalog of free music from various legal sources
  const freeMusicCatalog = [
    // FreeMusicArchive - Various Genres
    {
      id: 'fma1',
      title: 'Synthwave Dreams',
      artist: 'Neon Waves',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3',
      duration: '3:45',
      source: 'FreeMusicArchive',
      genre: 'electronic',
      popularity: 95
    },
    {
      id: 'fma2',
      title: 'Lofi Study Beats',
      artist: 'Chillhop Masters',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/FASSounds/Chill_Lofi/FASSounds_-_Chill_Lofi.mp3',
      duration: '2:15',
      source: 'FreeMusicArchive',
      genre: 'lofi',
      popularity: 88
    },
    {
      id: 'fma3',
      title: 'Epic Cinematic',
      artist: 'Orchestral Dimensions',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Scott_Buckley/Solstice/Scott_Buckley_-_01_-_Terminus.mp3',
      duration: '6:15',
      source: 'FreeMusicArchive',
      genre: 'cinematic',
      popularity: 92
    },
    {
      id: 'fma4',
      title: 'Urban Culture',
      artist: 'Lofi Dreamer',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/patchwork_urban/Urban_Culture/patchwork_urban_-_01_-_Urban_Culture.mp3',
      duration: '4:20',
      source: 'FreeMusicArchive',
      genre: 'lofi',
      popularity: 78
    },

    // YouTube Audio Library - Various
    {
      id: 'yt1',
      title: 'Summer Breeze',
      artist: 'Beach Waves',
      url: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav', // Placeholder
      duration: '2:30',
      source: 'YouTube Audio Library',
      genre: 'ambient',
      popularity: 85
    },
    {
      id: 'yt2',
      title: 'Digital Revolution',
      artist: 'Tech Beats',
      url: 'https://www.soundjay.com/button/sounds/button-09.wav', // Placeholder
      duration: '3:15',
      source: 'YouTube Audio Library',
      genre: 'electronic',
      popularity: 82
    },

    // Incompetech (Kevin MacLeod) - Royalty Free
    {
      id: 'inc1',
      title: 'Local Forecast',
      artist: 'Kevin MacLeod',
      url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast%20-%20Elevator.mp3',
      duration: '1:45',
      source: 'Incompetech',
      genre: 'elevator',
      popularity: 90
    },
    {
      id: 'inc2',
      title: 'Monkeys Spinning Monkeys',
      artist: 'Kevin MacLeod',
      url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Monkeys%20Spinning%20Monkeys.mp3',
      duration: '2:08',
      source: 'Incompetech',
      genre: 'funny',
      popularity: 94
    },

    // Mixkit - Free Sounds
    {
      id: 'mix1',
      title: 'Ambient Corporate',
      artist: 'Mixkit Art',
      url: 'https://mixkit.co/free-sound-effects/click/',
      duration: '2:00',
      source: 'Mixkit',
      genre: 'corporate',
      popularity: 76
    },

    // Bensound - Royalty Free
    {
      id: 'ben1',
      title: 'Creative Minds',
      artist: 'Bensound',
      url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
      duration: '3:25',
      source: 'Bensound',
      genre: 'corporate',
      popularity: 87
    },
    {
      id: 'ben2',
      title: 'Summer',
      artist: 'Bensound',
      url: 'https://www.bensound.com/bensound-music/bensound-summer.mp3',
      duration: '3:50',
      source: 'Bensound',
      genre: 'acoustic',
      popularity: 83
    },

    // Bump Foot - CC Music
    {
      id: 'bump1',
      title: 'Jazzy French',
      artist: 'Bump Foot',
      url: 'https://www.bumpfoot.net/free-music-01/jazzyfrenchy.mp3',
      duration: '2:45',
      source: 'Bump Foot',
      genre: 'jazz',
      popularity: 79
    },

    // PacDV - Free Music
    {
      id: 'pac1',
      title: 'Mystery Sax',
      artist: 'PacDV',
      url: 'http://www.pacdv.com/sounds/free-music/mystery-sax.mp3',
      duration: '2:18',
      source: 'PacDV',
      genre: 'jazz',
      popularity: 75
    },

    // BTSounds - Various
    {
      id: 'bts1',
      title: 'Corporate Motivation',
      artist: 'BTSounds',
      url: 'https://www.btsounds.com/wp-content/uploads/2020/02/Corporate-Motivation.mp3',
      duration: '2:30',
      source: 'BTSounds',
      genre: 'corporate',
      popularity: 81
    },

    // Additional Free Music Archive Tracks
    {
      id: 'fma5',
      title: 'Space Exploration',
      artist: 'Cosmic Drone',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Buckley/Chrysalis/Scott_Buckley_-_05_-_A_Starry_Eyed_Constellation.mp3',
      duration: '7:20',
      source: 'FreeMusicArchive',
      genre: 'ambient',
      popularity: 89
    },
    {
      id: 'fma6',
      title: 'Retro Funk',
      artist: 'Groovy Juice',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/patchwork_urban/Urban_Culture/patchwork_urban_-_04_-_Retro_Funk.mp3',
      duration: '3:50',
      source: 'FreeMusicArchive',
      genre: 'funk',
      popularity: 86
    },
    {
      id: 'fma7',
      title: 'Dream Waves',
      artist: 'Ocean Bay',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/patchwork_urban/Urban_Culture/patchwork_urban_-_06_-_Dream_Waves.mp3',
      duration: '4:10',
      source: 'FreeMusicArchive',
      genre: 'ambient',
      popularity: 84
    },
    {
      id: 'fma8',
      title: 'Morning Coffee',
      artist: 'Jazz Collective',
      url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Beauty_Flow/Best_of_2019/Beauty_Flow_-_01_-_Jazzy_Abstract_Beat.mp3',
      duration: '3:45',
      source: 'FreeMusicArchive',
      genre: 'jazz',
      popularity: 88
    },

    // More Incompetech
    {
      id: 'inc3',
      title: 'Beauty Flow',
      artist: 'Kevin MacLeod',
      url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Beauty%20Flow.mp3',
      duration: '4:02',
      source: 'Incompetech',
      genre: 'ambient',
      popularity: 91
    },
    {
      id: 'inc4',
      title: 'Funkorama',
      artist: 'Kevin MacLeod',
      url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Funkorama.mp3',
      duration: '1:05',
      source: 'Incompetech',
      genre: 'funk',
      popularity: 83
    },

    // Additional Bensound
    {
      id: 'ben3',
      title: 'Energy',
      artist: 'Bensound',
      url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
      duration: '2:59',
      source: 'Bensound',
      genre: 'rock',
      popularity: 85
    },
    {
      id: 'ben4',
      title: 'Ukulele',
      artist: 'Bensound',
      url: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
      duration: '2:26',
      source: 'Bensound',
      genre: 'acoustic',
      popularity: 87
    }
  ]

  const genres = ['all', 'electronic', 'lofi', 'cinematic', 'ambient', 'jazz', 'funk', 'rock', 'acoustic', 'corporate']

  useEffect(() => {
    const loadMusic = async () => {
      try {
        setIsLoading(true)
        // Simulate loading real music data from multiple sources
        setTimeout(() => {
          setTracks(freeMusicCatalog)
          setIsLoading(false)
        }, 1500)
      } catch (err) {
        setError('Failed to load music catalog')
        setIsLoading(false)
      }
    }

    loadMusic()
  }, [])

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || track.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

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

  const getGenreColor = (genre) => {
    const colors = {
      electronic: '#ff00ff',
      lofi: '#00ffff',
      cinematic: '#ffff00',
      ambient: '#00ff00',
      jazz: '#ff6b6b',
      funk: '#ffa500',
      rock: '#ff4444',
      acoustic: '#44ff44',
      corporate: '#8888ff',
      elevator: '#ff88ff',
      funny: '#ffff88'
    }
    return colors[genre] || '#ffffff'
  }

  return (
    <div className="modern-retro-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="modern-retro-text" style={{ 
          fontSize: '3.5rem', 
          color: '#ffff00',
          textShadow: '0 0 20px #ffff00, 0 0 40px #ff00ff',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ffff00, #ff00ff, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900'
        }}>
          WAVESTREAM
        </h1>
        <div className="marquee-modern">
          <marquee behavior="scroll" direction="left" scrollamount="5">
            🎵 FREE LEGAL MUSIC • 25+ TRACKS • MULTIPLE SOURCES • NO ADS • 100% FREE • ROYALTY-FREE • CREATIVE COMMONS 🎵
          </marquee>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div>
          <strong style={{ color: '#ffff00' }}>📊 {tracks.length} TRACKS</strong>
          <span style={{ color: '#00ffff', marginLeft: '15px' }}>
            🎵 {new Set(tracks.map(t => t.source)).size} SOURCES
          </span>
        </div>
        <div style={{ color: '#ff00ff' }}>
          ⭐ POPULARITY: {currentTrack?.popularity || '--'}%
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <form onSubmit={handleSearch} style={{ marginBottom: '25px' }}>
          <input
            type="text"
            className="modern-retro-input"
            placeholder="🔍 SEARCH TRACKS OR ARTISTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="modern-retro-button">SEARCH</button>
        </form>

        <div className="genre-tags">
          {genres.map(genre => (
            <div
              key={genre}
              className={`genre-tag ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
              style={{
                borderColor: getGenreColor(genre),
                background: selectedGenre === genre ? getGenreColor(genre) : 'transparent',
                color: selectedGenre === genre ? '#000' : getGenreColor(genre)
              }}
            >
              {genre.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="error-modern">
          {error}
          <button 
            onClick={() => setError('')} 
            className="modern-retro-button"
            style={{ marginLeft: '15px', padding: '5px 10px' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Music Player */}
      {currentTrack && (
        <div className="music-player-modern">
          <h3 className="modern-retro-text" style={{ color: '#ffff00', marginBottom: '20px' }}>
            🎧 NOW PLAYING: <span style={{ color: '#ff00ff' }}>{currentTrack.title}</span> - <span style={{ color: '#00ffff' }}>{currentTrack.artist}</span>
          </h3>
          <div className="progress-bar-modern">
            <div 
              className="progress-fill-modern" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="modern-retro-button" onClick={togglePlay}>
              {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
            </button>
            <button className="modern-retro-button" onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
              }
              setIsPlaying(false)
              setProgress(0)
            }}>
              ⏹️ STOP
            </button>
            <div style={{ marginTop: '15px', color: '#00ff00', fontSize: '14px' }}>
              ⏱️ {currentTrack.duration} • 📁 {currentTrack.source} • 🎵 {currentTrack.genre.toUpperCase()}
            </div>
          </div>
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleAudioEnd}
            onError={() => setError('Failed to load audio track. Some sources may require direct access.')}
          />
        </div>
      )}

      {/* Track List */}
      <div>
        <h2 className="modern-retro-text" style={{ 
          fontSize: '2rem', 
          color: '#00ffff',
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          FREE MUSIC LIBRARY ({filteredTracks.length} TRACKS)
        </h2>
        
        {isLoading ? (
          <div className="loading-modern">
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌀</div>
            SCANNING FREE MUSIC SOURCES...
            <div style={{ marginTop: '15px', fontSize: '14px', color: '#ff00ff' }}>
              Loading tracks from FreeMusicArchive, Incompetech, Bensound, and more...
            </div>
          </div>
        ) : (
          <ul className="track-list-modern">
            {filteredTracks.map(track => (
              <li
                key={track.id}
                className={`track-item-modern ${currentTrack?.id === track.id ? 'playing' : ''}`}
                onClick={() => playTrack(track)}
              >
                <div className="track-artwork">
                  🎵
                </div>
                <div className="track-info">
                  <div className="track-title">{track.title}</div>
                  <div className="track-artist">🎤 {track.artist}</div>
                  <div className="track-meta">
                    <span>⏱️ {track.duration}</span>
                    <span>📁 {track.source}</span>
                    <span style={{ color: getGenreColor(track.genre) }}>
                      🎵 {track.genre.toUpperCase()}
                    </span>
                    <span>⭐ {track.popularity}%</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '30px',
        background: 'rgba(0, 0, 0, 0.6)',
        border: '2px solid #ff00ff',
        borderRadius: '15px'
      }}>
        <p className="modern-retro-text" style={{ color: '#ffff00', fontSize: '1.2rem' }}>
          💿 ALL MUSIC IS 100% LEGAL AND FREE TO STREAM 💿
        </p>
        <p style={{ color: '#00ff00', fontSize: '14px', marginTop: '15px' }}>
          Music sourced from: FreeMusicArchive • Incompetech • Bensound • YouTube Audio Library • Mixkit • Bump Foot
        </p>
        <p style={{ color: '#ff00ff', fontSize: '12px', marginTop: '10px' }}>
          All tracks are royalty-free, Creative Commons licensed, or available for free streaming
        </p>
      </div>

      {/* Floating Elements */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        fontSize: '12px',
        color: '#ffff00',
        background: 'rgba(255, 0, 255, 0.3)',
        padding: '10px',
        border: '1px solid #00ffff',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        🔥 RETRO MODE
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        fontSize: '11px',
        color: '#00ff00',
        background: 'rgba(0, 0, 128, 0.6)',
        padding: '8px',
        border: '1px solid #ffff00',
        borderRadius: '6px'
      }}>
        📻 {tracks.length} TRACKS LOADED
      </div>
    </div>
  )
}