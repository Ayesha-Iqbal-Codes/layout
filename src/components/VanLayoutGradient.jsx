import { useState, useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";
import VanModelCanvas from "./VanModelCanvas";
import { ChevronUp, ChevronDown } from "lucide-react";
import swivelImg from "../assets/images/swivel.png";
import dinetteImg from "../assets/images/dinette.png";
import electricImg from "../assets/images/electric.png";
import heaterImg from "../assets/images/heater.png";
import storageImg from "../assets/images/storage.png";
import partitionImg from "../assets/images/partition.png";

const features = [
  {
  id: "swivel",
  title: "Swivel Seat & Bed",
  desc: "Swivel double van seat with recline and bed conversion.",
  image: swivelImg,
  modelPath: "/models/swivel.glb",
  scale: 0.03, 
  cameraPosition: [0, 1.4, 16],
}
,
  {
    id: "dinette",
    title: "Dinette Cushion Set",
    desc: "South/North dinette benches that easily convert to a bed.",
    image: dinetteImg,
    modelPath: "/models/dinette.glb",
    scale: 0.06, 
  cameraPosition: [0, 1.4, 16],
  },
  {
    id: "electrical",
    title: "Electrical Setup",
    desc: "600 amp hrs, inverter, DC to DC, fridge.",
    image: electricImg,
    modelPath: "/models/electric.glb",
    scale: 0.60,
    cameraPosition: [0, 1.6, 10],
  },
  {
    id: "heating",
    title: "Heating System",
    desc: "Glycol heater system under the passenger seat.",
    image: heaterImg,
    modelPath: "/models/electric.glb",
    scale: 0.50,
    cameraPosition: [0, 1.6, 8],
  },
  {
    id: "storage",
    title: "Storage",
    desc: "CNC-cut cabinets on driver’s side.",
    image: storageImg,
    modelPath: "/models/storage.glb",
    scale: 0.10,
    cameraPosition: [0, 1.7, 11],
  },
  {
    id: "partition",
    title: "Partition & Bed Option",
    desc: "Two partition walls, supports S/N elevator bed.",
    image: partitionImg,
    modelPath: "/models/wall.glb",
    scale: 0.16,
    cameraPosition: [0, 1.6, 10],
  },
];


const VanLayout = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const desktopScrollRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const pauseTimeout = useRef(null);

  const startScroll = () => {
    if (scrollIntervalRef.current) return;
    const isMobile = window.innerWidth < 768;
    const container = isMobile ? mobileScrollRef.current : desktopScrollRef.current;

    scrollIntervalRef.current = setInterval(() => {
      if (!container) return;

      if (isMobile) {
        container.scrollLeft += 2;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      } else {
        container.scrollTop += 1;
        if (container.scrollTop >= container.scrollHeight / 2) {
          container.scrollTop = 0;
        }
      }
    }, 30);
  };

  const stopScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null;
  };

  const pauseScrollTemporarily = () => {
    stopScroll();
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      startScroll();
    }, 3000);
  };

  const handleManualScroll = (direction) => {
    const container = desktopScrollRef.current;
    if (!container) return;
    pauseScrollTemporarily();
    const amount = direction === "up" ? -100 : 100;
    container.scrollBy({ top: amount, behavior: "smooth" });
  };

  const handleMobileManualScroll = (direction) => {
    const container = mobileScrollRef.current;
    if (!container) return;
    pauseScrollTemporarily();
    const amount = direction === "left" ? -100 : 100;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    startScroll();
    return stopScroll;
  }, []);
const mobileCardRefs = useRef([]);

return (
  <div className="min-h-screen bg-gradient-to-br from-[#55427B] via-[#586584] to-[#597588] text-white p-4 overflow-hidden relative">
    <h1 className="text-4xl font-bold text-center mb-4">Van Layout Model Viewer</h1>

    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      <div className="w-full md:w-2/3 h-[280px] md:h-[360px]">
       <VanModelCanvas
  key={selectedFeature?.id} 
  modelPath={selectedFeature?.modelPath}
  scale={selectedFeature?.scale}
  cameraPosition={selectedFeature?.cameraPosition}
/>

</div>

      {/* Desktop Vertical Carousel */}
      <div className="hidden md:block w-[300px] h-[360px] relative bg-transparent ml-10">
        <button
          onClick={() => handleManualScroll("up")}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-black/50 hover:bg-black/70 p-1.5 rounded-full"
        >
          <ChevronUp className="text-white" size={18} />
        </button>
        <button
          onClick={() => handleManualScroll("down")}
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 bg-black/50 hover:bg-black/70 p-1.5 rounded-full"
        >
          <ChevronDown className="text-white" size={18} />
        </button>

        <div ref={desktopScrollRef} className="overflow-hidden h-full pr-1">
          <div className="flex flex-col items-center gap-5 w-full px-3 py-1.5">
            {[...features, ...features].map((feat, index) => (
              <FeatureCard
                key={index}
                {...feat}
                active={selectedFeature?.id === feat.id}
                onClick={() => {
                  pauseScrollTemporarily();
                  setSelectedFeature((prev) => (prev?.id === feat.id ? null : feat));
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Only Section */}
    <div className="md:hidden w-full">
      {/* Layout Features heading at top-left */}
      <div className="flex justify-start mb-2 px-4 -ml-3">
        <h2 className="text-2xl font-bold">Layout Features</h2>
      </div>

     {/* Mobile Horizontal Carousel */}
  <div className="relative">
  <button
    onClick={() => handleMobileManualScroll("left")}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full"
  >
    <ChevronUp className="rotate-[-90deg] text-white" />
  </button>
  <button
    onClick={() => handleMobileManualScroll("right")}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full"
  >
    <ChevronDown className="rotate-[-90deg] text-white" />
  </button>

  <div
    ref={mobileScrollRef}
    className="flex overflow-x-auto gap-6 px-4 pb-2 scroll-smooth no-scrollbar"
  >
    {[...features, ...features].map((feat, index) => (
      <div
        key={index}
        ref={(el) => (mobileCardRefs.current[index] = el)}
        
      >
        <FeatureCard
          {...feat}
          horizontal
          active={selectedFeature?.id === feat.id}
          onClick={() => {
            pauseScrollTemporarily();
            setSelectedFeature((prev) =>
              prev?.id === feat.id ? null : feat
            );

            if (window.innerWidth < 768) {
              setTimeout(() => {
                mobileCardRefs.current[index]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }, 100);
            }
          }}
        />
      </div>
    ))}
  </div>
</div>


     {/* Mobile: Price and Buy Now Section */}
<div className="mt-6 flex flex-col items-start px-4 gap-2">
  <div className="text-3xl font-bold  ml-3">$39,000</div>
  <button
    className="relative overflow-hidden bg-white text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-transform duration-300 hover:scale-105"
    style={{ animation: "pulseZoom 2s infinite" }}
  >
    <span className="relative z-10">BUY NOW 🚐</span>
    <div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      style={{
        backgroundSize: "200% 100%",
        animation: "shine 2s infinite linear",
      }}
    />
  </button>
</div>

{/* More Layouts button at bottom-right */}
<div className="flex justify-end -mt-10 px-4">
  <button className="bg-white text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform duration-200">
    More Layouts &gt;&gt;
  </button>
</div>

    </div>

    {/* Desktop Only: Layout Features & More Layouts below carousel */}
    <div className="hidden md:flex mt-8 flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold ml-225 mb-3">Layout Features</h2>
      <button className="bg-white ml-225 text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform duration-200">
        More Layouts &gt;&gt;

      </button>
    </div>

    {/* Desktop: Price & Buy Now */}
    <div className="hidden md:flex flex-col items-start -mt-22 px-4 gap-2">
      <div className="text-3xl font-bold  ml-4">$39,000</div>
      <button
        className="relative overflow-hidden bg-white text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        style={{ animation: "pulseZoom 2s infinite" }}
      >
        <span className="relative z-10">BUY NOW 🚐</span>
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shine 2s infinite linear",
          }}
        />
      </button>
    </div>
  </div>
);

};

export default VanLayout;
