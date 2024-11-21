import { useAnimate } from "framer-motion";
import { MouseEventHandler, ReactNode, useRef, useState } from "react";

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}: {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);
  const [zone, setZone] = useState("center");  // Track the current zone

  // Function to determine the zone based on mouse position
  const determineZone = (clientX: number,) => {
    const pageWidth = window.innerWidth;

    // Check horizontal position (left, center, right)
    if (clientX < pageWidth / 3) {
      return "left";
    } else if (clientX > 2 * pageWidth / 3) {
      return "right";
    } else {
      return "center";
    }
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      // Determine the zone based on mouse position
      const newZone = determineZone(clientX, );
      setZone(newZone);

      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector) as HTMLElement;
    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    // Modify the image trail based on the current zone
    let borderColor = "red";  // Default border color
    let borderWidth = "2px";  // Default border width
    let scale = 1;  // Default scale

    switch (zone) {
      case "left":
        borderColor = "#f5dbdb";
        borderWidth = "2px";
        scale = 0.8;
        break;
      case "center":
        borderColor = "#f5bcbc";
        borderWidth = "3px";
        scale = 1;
        break;
      case "right":
        borderColor = "#f28c8c";
        borderWidth = "4px";
        scale = 1.2;
        break;
    }

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${imageIndex % 2
            ? `rotate(${rotation}deg)`
            : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(${scale}) ${imageIndex % 2
            ? `rotate(-${rotation}deg)`
            : `rotate(${rotation}deg)`
          }`,
        ],
        borderColor: borderColor,  // Apply the dynamic border color
        borderWidth: borderWidth,  // Apply the dynamic border width
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative "
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-lg border-2 px-2 pt-2 pb-7 border-red-800 shadow-lg bg-neutral-100 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default MouseImageTrail;
