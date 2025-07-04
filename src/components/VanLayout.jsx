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
  { id: "swivel", title: "Swivel Seat & Bed", desc: "Swivel double van seat with recline and bed conversion.", image: swivelImg },
  { id: "dinette", title: "Dinette Cushion Set", desc: "South/North dinette benches that easily convert to a bed.", image: dinetteImg },
  { id: "electrical", title: "Electrical Setup", desc: "600 amp hrs, inverter, DC to DC, fridge.", image: electricImg },
  { id: "heating", title: "Heating System", desc: "Glycol heater system under the passenger seat.", image: heaterImg },
  { id: "storage", title: "Storage", desc: "CNC-cut cabinets on driver’s side.", image: storageImg },
  { id: "partition", title: "Partition & Bed Option", desc: "Two partition walls, supports S/N elevator bed.", image: partitionImg },
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
        container.scrollLeft += 1;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#55427B] via-[#586584] to-[#597588] text-white p-4 overflow-hidden relative">
      <h1 className="text-4xl font-bold text-center mb-4">Van Layout Model Viewer</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">

        <div className="w-full md:w-2/3 h-[280px] md:h-[360px]">
          <VanModelCanvas selected={selectedFeature} />
        </div>

        {/* === Desktop Vertical Carousel === */}
      <div className="hidden md:block w-[280px] h-[360px] relative bg-transparent ml-10">
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
                active={selectedFeature === feat.id}
                onClick={() => {
                  pauseScrollTemporarily();
                  setSelectedFeature((prev) => (prev === feat.id ? null : feat.id));
                }}
              />
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden mt-6 relative">
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
            <FeatureCard
              key={index}
              {...feat}
              horizontal
              active={selectedFeature === feat.id}
              onClick={() => {
                pauseScrollTemporarily();
                setSelectedFeature((prev) => (prev === feat.id ? null : feat.id));
              }}
            />
          ))}
        </div>
      </div>

      {/* Layout Features heading and button below carousel */}
      <div className="mt-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold mb-3  ml-225">Layout Features</h2>
        <button className="ml-225 bg-white text-black font-semibold py-2 px-6 rounded-full hover:scale-105 transition-transform duration-200">
          More Layouts
        </button>
      </div>

      {/* Price & Buy Now */}
      <div className="flex flex-col items-start -mt-20 px-4 gap-2">
        <div className="text-3xl font-bold animate-pulse ml-4">$39,000</div>
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



