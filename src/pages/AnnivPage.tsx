import { useEffect, useState } from "react";
import MouseImageTrail from "@/components/MouseImageTrail";
import MusicPlayer from "@/components/MusicPlayer";


const AnnivPage = () => {
    const imageUrls = [
        "/a1.png", "/a2.png", "/a3.png", "/a4.png", "/a5.png", "/a6.png",
        "/a7.png", "/a8.png", "/a9.png", "/a10.png", "/a11.png", "/a12.png", "/a13.png", "/a14.png"
    ];

    const str = `<h1 class="happy-anniversary">Happy First Anniversary Baby!</h1><p>Dear Allison, I realize how lucky I am to have you in my life. Today marks another beautiful chapter in our journey together a journey filled with love, laughter, and countless memories that I hold close to my heart.

From the moment we met, you brought a kind of light into my world that I didn’t even know I needed. You’ve shown me the beauty in the little things—the warmth of your smile, the sound of your laughter, the way your eyes sparkle when you talk about something you love. You’ve made my days brighter, my struggles lighter, and my heart fuller.

This past year has been nothing short of amazing, not because it was perfect, but because I got to share it with you. We've had our share of ups and downs, but each challenge has only made us stronger. You’ve taught me the true meaning of love, patience, and partnership.

I want you to know how deeply I admire you. Your kindness, strength, and unwavering support inspire me every day. You are not only my partner but also my best friend, my confidant, and the person I look forward to seeing every single day.

As we celebrate this special day, I want to make a promise to you: I will always cherish you, support you, and love you unconditionally. I will work to make you laugh when you’re down and hold your hand through the tough times. I will celebrate your successes and stand by your side through every twist and turn life throws our way.

Thank you for being you—for loving me, accepting me, and letting me be a part of your life. I can’t wait to see what the future holds for us. With you, I know it will be nothing short of extraordinary.

Happy anniversary, my love. Here’s to us and to many more years of happiness together.</p>`;

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
