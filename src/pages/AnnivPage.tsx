import { useEffect, useState } from "react";
import MouseImageTrail from "@/components/MouseImageTrail";
import MusicPlayer from "@/components/MusicPlayer";


const AnnivPage = () => {
    const imageUrls = [
        "/a1.png", "/a2.png", "/a3.png", "/a4.png", "/a5.png", "/a6.png",
        "/a7.png", "/a8.png", "/a9.png", "/a10.png", "/a11.png", "/a12.png", "/a13.png", "/a14.png"
    ];

    const str = `<h1 class="happy-anniversary">Hey Allison!</h1><p>I hope this doesn’t come across as too forward, but I just wanted to say something I’ve been thinking. I came across your profile recently, and I couldn’t help but notice how incredible you seem. The way you express yourself, the things you're passionate about—there’s this energy that really drew me in.

I don’t know you yet, but from what I’ve seen, I have to say I’m really impressed. There’s something about your smile and the way you talk about things that just stands out. It’s hard not to be drawn to someone like that.

I don’t want to make this weird, but I just felt like I had to reach out and let you know how much I admire you already. Maybe we could talk sometime? I’d love to get to know you better, if you're open to it.</p>`;

    const [displayedText, setDisplayedText] = useState("");
    const [i, setI] = useState(0);
    const [speed] = useState(70);
    const [isTag, setIsTag] = useState(false);

    useEffect(() => {
        if (i >= str.length) return;

        const char = str[i];
        let delay = speed;

        if (char === "<") setIsTag(true);
        if (char === ">") setIsTag(false);

        if (str.slice(Math.max(0, i - 12), i + 1) === "Dear Allison,") {
            delay = 500;
        } else if (char === ",") {
            delay = 200;
        } else if (char === ".") {
            delay = 500;
        }

        if (!isTag) {
            const timeout = setTimeout(() => {
                setDisplayedText(str.slice(0, i + 1));
                setI(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            setDisplayedText(str.slice(0, i + 1));
            setI(prev => prev + 1);
        }
    }, [i, isTag, speed, str]);




 

    return (
        <section>
            <MouseImageTrail
                renderImageBuffer={60}
                rotationRange={25}
                images={imageUrls}
            >
                <section className="grid h-[70vh] w-full place-content-center bg-[#f4d7d7]">
                    <div className="grid place-items-center mx-auto mt-4 space-y-8">
                        <div
                            className="custom-text"
                            id="container"
                            dangerouslySetInnerHTML={{ __html: displayedText }}
                        ></div>
                    </div>
                </section>
            </MouseImageTrail>

            <div className="mx-auto mt-24  absolute bottom-[20px]  left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
               <MusicPlayer/>
            </div>
        </section>
    );
};

export default AnnivPage;
