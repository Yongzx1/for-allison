import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { Slider } from "@/components/ui/slider";
import useAudio from "@/hooks/useAudio";

const AudioPlayer = ({ src,nextTrack,previousTrack}: any) => {
    const {
        playing, paused, loop, duration, volume, seek,
        onPlay, onPause, onLoop, onVolume, onSeek, 
    } = useAudio({ src, preload: true, autoplay: false, volume: 0.1, mute: false, loop: true, rate: 1.0 });

    function formatTime(seconds: any) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    return (
        <div className="audio-card">
            <div className="flex justify-between m-2 w-full">
                <Slider
                    min={0}
                    max={duration || 1}
                    value={[seek]}
                    onValueChange={(value) => onSeek(value[0])}
                    step={0.1}
                    className="w-full"
                />
                <p className="mx-2">{formatTime(seek)}</p>
            </div>

            <div className="flex justify-center gap-2">
                <button onClick={previousTrack} className="cursor-pointer p-2 hover:bg-slate-300 rounded-full">
                    <MdSkipPrevious size={30} />
                </button>
              
                <button onClick={onPause} className={`cursor-pointer p-2 ${paused ? 'bg-slate-300' : ''} hover:bg-slate-300 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                    </svg>
                </button>
                <button onClick={onPlay} className={`cursor-pointer p-2 ${playing ? 'bg-slate-300' : ''} hover:bg-slate-300 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                </button>
                <button onClick={onLoop} className={`cursor-pointer p-2 ${loop ? 'bg-slate-300' : ''} hover:bg-slate-300 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                    </svg>
                </button>
                <button onClick={nextTrack} className="cursor-pointer p-2 hover:bg-slate-300 rounded-full">
                    <MdSkipNext size={30} />
                </button>
            </div>

            <div className="flex justify-between m-2">
                <Slider
                    min={0}
                    max={1}
                    value={[volume]}
                    defaultValue={[0.5]}
                    step={0.1}
                    onValueChange={(value) => onVolume(value[0])}
                    className="w-full mr-4"
                />
                <p>{volume * 100}</p>
            </div>
        </div>
    );
};

export default AudioPlayer;
