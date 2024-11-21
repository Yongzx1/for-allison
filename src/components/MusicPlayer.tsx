import React, { useState, useRef, useEffect } from 'react';

const Player: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [volume, setVolume] = useState(0.2); // Volume ranges from 0 to 1
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const albumImgs = [
        {
            song: "Leonora",
            author: "Sugarcane",
            src: "https://res.cloudinary.com/dupynxkci/video/upload/v1732169469/SUGARCANE_-_Leonora_Official_Lyric_Video_bhrb7f.mp3",
            image: "https://cdn-images.dzcdn.net/images/cover/c8c14eddd87616a1dda62761178f4b6b/1900x1900-000000-80-0-0.jpg",
        },
        {
            song: "Isip",
            author: "Healy After Dark",
            src: "https://res.cloudinary.com/dt0cpdnxy/video/upload/v1732197271/Healy_After_Dark_-_Isip_Lyrics_tnjhix.mp3",
            image: "https://cdn-images.dzcdn.net/images/cover/01a10c2810cb31365d3bd1939a58ce1c/0x1900-000000-80-0-0.jpg",
        },
        {
            song: "Nahuhulog",
            author: "Jed Baruelo",
            src: "https://res.cloudinary.com/dt0cpdnxy/video/upload/v1732204467/Jed_Baruelo_-_Nahuhulog_Official_Audio_g7opnm.mp3",
            image: "https://images.genius.com/8fb4d63996dcd6f4fce110c4f80d3571.1000x1000x1.jpg",
        },
        {
            song: "Mahika",
            author: "Adie",
            src: "https://res.cloudinary.com/dt0cpdnxy/video/upload/v1732204767/Adie_Janine_Berdin_-_Mahika_Lyrics_qkbjao.mp3",
            image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Mahika_%28song%29.png",
        },
    ];

    const currentSong = albumImgs[currentSongIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentSong.src; // Update the audio source
            if (isPlaying) {
                audioRef.current.play().catch((error) => console.error("Audio playback failed:", error));
            }
        }
    }, [currentSongIndex, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // Adjust the audio volume
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((error) => console.error("Audio playback failed:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % albumImgs.length);
    };

    const prevSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + albumImgs.length) % albumImgs.length);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const { currentTime: time, duration: dur } = audioRef.current;
    
            // Avoid updating if duration is NaN or invalid
            if (!isNaN(dur)) {
                setCurrentTime(time);
                setDuration(dur);
            }
        }
    };
    
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const timelineWidth = (e.target as HTMLDivElement).offsetWidth;
    
            if (timelineWidth > 0) {
                const clickX = e.nativeEvent.offsetX;
                const newTime = (clickX / timelineWidth) * audioRef.current.duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
            }
        }
    };
    
    return (
        <div className={`player ${isPlaying ? 'play' : ''}`}>
            <div className="player__bar">
            <div className="player__album">
  <div
    className={`player__albumImg active-song ${isPlaying ? 'playing' : ''}`}
    style={{ backgroundImage: `url(${currentSong.image})` }}
  />
</div>

                <div className="player__controls">
                    <div className="player__prev" onClick={prevSong}>
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M26.695 34.434v31.132L54.5 49.998z"/><path d="M24.07 34.434v31.132c0 2.018 2.222 3.234 3.95 2.267l27.804-15.568c1.706-.955 1.707-3.578 0-4.533L28.02 32.168c-2.957-1.655-5.604 2.88-2.649 4.533l27.805 15.564v-4.533L25.371 63.3l3.95 2.267V34.435c-.001-3.387-5.251-3.387-5.251-.001z"/><g><path d="M55.5 34.434v31.132l27.805-15.568z"/><path d="M52.875 34.434v31.132c0 2.018 2.222 3.234 3.949 2.267 9.27-5.189 18.537-10.379 27.805-15.568 1.705-.955 1.705-3.578 0-4.533L56.824 32.168c-2.957-1.655-5.604 2.88-2.648 4.533l27.803 15.564v-4.533L54.176 63.3l3.949 2.267V34.435c0-3.387-5.25-3.387-5.25-.001z"/></g></svg>
                    </div>
                    <div className="player__play" onClick={togglePlay}>
                        {isPlaying ? <svg className="icon pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M22.537 8.046h17.791c1.104 0 2.003.898 2.003 1.993v79.912a2.005 2.005 0 0 1-2.003 2.003h-17.79a2.005 2.005 0 0 1-2.003-2.003V10.04c0-1.095.898-1.993 2.002-1.993zM59.672 8.046h17.8c1.095 0 1.993.898 1.993 1.993v79.912a2.003 2.003 0 0 1-1.993 2.003h-17.8a1.997 1.997 0 0 1-1.993-2.003V10.04c0-1.095.889-1.993 1.993-1.993z"/></svg> :    <svg className="icon play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M51.109 30.335l-36-24A2 2 0 0 0 12 8v48a2.003 2.003 0 0 0 2 2c.388 0 .775-.113 1.109-.336l36-24a2 2 0 0 0 0-3.329z"/></svg>}
                    </div>
                    <div className="player__next" onClick={nextSong}>
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M26.695 34.434v31.132L54.5 49.998z"/><path d="M24.07 34.434v31.132c0 2.018 2.222 3.234 3.95 2.267l27.804-15.568c1.706-.955 1.707-3.578 0-4.533L28.02 32.168c-2.957-1.655-5.604 2.88-2.649 4.533l27.805 15.564v-4.533L25.371 63.3l3.95 2.267V34.435c-.001-3.387-5.251-3.387-5.251-.001z"/><g><path d="M55.5 34.434v31.132l27.805-15.568z"/><path d="M52.875 34.434v31.132c0 2.018 2.222 3.234 3.949 2.267 9.27-5.189 18.537-10.379 27.805-15.568 1.705-.955 1.705-3.578 0-4.533L56.824 32.168c-2.957-1.655-5.604 2.88-2.648 4.533l27.803 15.564v-4.533L54.176 63.3l3.949 2.267V34.435c0-3.387-5.25-3.387-5.25-.001z"/></g></svg>
                    </div>
                </div>
            </div>

             {/* Volume Slider */}
                <div className="player__volume">
                    <input
                        id="volume-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
                
            <div className="player__timeline" onClick={handleSeek}>
                <p className="player__author">{currentSong.author}</p>
                <p className="player__song">{currentSong.song}</p>
                <div className="player__timelineBar">
                <div
    id="playhead"
    style={{
        width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
    }}
></div>

                </div>
            </div>
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
            />
        </div>
    );
};

export default Player;
