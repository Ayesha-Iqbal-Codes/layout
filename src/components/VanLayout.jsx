import { useState, useRef, useEffect } from "react";
import FeatureCard from "./FeatureCard";
import VanModelCanvas from "./VanModelCanvas";
import { ChevronRight, Expand, X } from "lucide-react";

import swivelImg from "../assets/images/swivel.png";
import dinetteImg from "../assets/images/dinette.png";
import electricImg from "../assets/images/electric.png";
import heaterImg from "../assets/images/heater.png";
import storageImg from "../assets/images/storage.png";
import partitionImg from "../assets/images/partition.png";
import logo from "../assets/images/logobbv.jpg";

const features = [
  {
    id: "swivel",
    title: "Swivel Seat & Bed",
    desc: "Swivel double van seat with recline and bed conversion.",
    image: swivelImg,
    modelPath: "/models/swivel.glb",
    scale: 0.03,
    cameraPosition: [0, 1.4, 16],
  },
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
    desc: "600 amp hrs, 2000W inverter, DC to DC charger, and 12V fridge chest.",
    image: electricImg,
    modelPath: "/models/electric.glb",
    scale: 0.6,
    cameraPosition: [0, 1.6, 10],
  },
  {
    id: "heating",
    title: "Heating System",
    desc: "Glycol heater system under the passenger seat.",
    image: heaterImg,
    modelPath: "/models/electric.glb",
    scale: 0.5,
    cameraPosition: [0, 1.6, 8],
  },
  {
    id: "storage",
    title: "Storage",
    desc: "CNC-cut cabinets on driver's side.",
    image: storageImg,
    modelPath: "/models/storage.glb",
    scale: 0.1,
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
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isBuyNowVisible, setIsBuyNowVisible] = useState(true);

  const desktopScrollRef = useRef(null);
  const desktopBuyNowRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const mobileCardRefs = useRef([]);
  const buyNowRef = useRef(null);

 useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsBuyNowVisible(entry.isIntersecting),
    { threshold: 0.1 }
  );

  if (buyNowRef.current) observer.observe(buyNowRef.current);
  if (desktopBuyNowRef.current) observer.observe(desktopBuyNowRef.current);

  return () => {
    if (buyNowRef.current) observer.unobserve(buyNowRef.current);
    if (desktopBuyNowRef.current) observer.unobserve(desktopBuyNowRef.current);
  };
}, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white w-full border-b border-black/10 px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Big Bear Vans Logo" className="h-8 w-auto" />
          <div className="hidden lg:block text-2xl font-light tracking-wider">
            BIG BEAR<span className="font-bold"> VANS</span>
          </div>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-neutral-800 transition-colors">
          Contact Now
        </button>
      </header>

      <main className="relative min-h-screen">
        {/* Desktop View */}
        {!showFullscreen && (
          <>
            <div className="hidden lg:flex flex-col fixed top-[104px] left-6 w-[61%] h-[calc(100vh-124px)] z-10">
              <h1 className="text-2xl font-bold text-center mb-4">Van Layout Model Viewer</h1>
              <div className="flex-1 p-6 bg-gradient-to-br from-white to-neutral-100 rounded-xl overflow-hidden border border-black/10 relative">
                <button
                  onClick={() => {
                    setShowFullscreen(true);
                    setTimeout(() => setIsFullscreen(true), 10);
                  }}
                  className="absolute bottom-6 left-6 z-20 bg-white shadow-lg rounded-full p-2 hover:scale-105 transition"
                >
                  <Expand size={20} className="text-black" />
                </button>

                <div className="h-full w-full overflow-hidden rounded-lg">
                  <VanModelCanvas
                    key={selectedFeature?.id}
                    modelPath={selectedFeature?.modelPath}
                    scale={selectedFeature?.scale}
                    cameraPosition={selectedFeature?.cameraPosition}
                  />
                </div>

                <div className="absolute bottom-6 right-6 max-w-[300px] bg-black/10 backdrop-blur-sm p-4 rounded-xl border border-black/10">
                  <h3 className="text-xl font-medium mb-1">{selectedFeature?.title}</h3>
                  <p className="text-neutral-700 text-sm">{selectedFeature?.desc}</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block fixed top-[72px] right-0 w-[36%] h-[32px] bg-white z-40"></div>

            <div className="hidden lg:flex flex-col ml-[64%] px-6 pt-0">
              <div className="sticky top-[96px] z-50 bg-white py-2 mb-4">
                <h1 className="text-2xl font-bold text-center text-black">Layout Features</h1>
              </div>

              <div ref={desktopScrollRef} className="flex flex-col items-center gap-4">
                {features.map((feat, index) => (
                  <FeatureCard
                    key={index}
                    {...feat}
                    active={selectedFeature?.id === feat.id}
                    onClick={() =>
                      setSelectedFeature((prev) => (prev?.id === feat.id ? null : feat))
                    }
                  />
                ))}
              </div>

              <div className="flex flex-col items-center gap-3 px-4 py-8 border-t border-black/10 bg-black/5 mt-6" ref={desktopBuyNowRef}>

                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="text-2xl font-bold">$39,000</div>
                  <div className="flex flex-col items-center gap-3">
                    <button
                      className="relative overflow-hidden bg-black text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
                      style={{ animation: "pulseZoom 2s infinite" }}
                    >
                      <span className="relative z-10">BUY NOW</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                    </button>
                    <button className="flex items-center gap-1 text-neutral-700 font-bold hover:text-black">
                      More Layouts <span className="text-lg">››</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Fullscreen Canvas */}
        {showFullscreen && (
          <div
            className={`fixed inset-0 z-[999] bg-white flex items-center justify-center transition-opacity duration-500 ${
              isFullscreen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => {
                setIsFullscreen(false);
                setTimeout(() => setShowFullscreen(false), 500);
              }}
              className="absolute top-4 right-4 z-[1000] bg-white text-black hover:bg-neutral-200 p-2 rounded-full shadow"
            >
              <X size={20} />
            </button>
            <div className="w-full h-full">
              <VanModelCanvas
                key={selectedFeature?.id}
                modelPath={selectedFeature?.modelPath}
                scale={selectedFeature?.scale}
                cameraPosition={selectedFeature?.cameraPosition}
              />
            </div>
          </div>
        )}

        {/* Mobile View */}
        <div className="lg:hidden w-full mt-8 px-4">
          <div className="mb-4 rounded-xl overflow-hidden border border-black/10 bg-gradient-to-br from-white to-neutral-100">
            <div className="w-full h-[300px] rounded-lg overflow-hidden">
              <VanModelCanvas
                key={selectedFeature?.id}
                modelPath={selectedFeature?.modelPath}
                scale={selectedFeature?.scale}
                cameraPosition={selectedFeature?.cameraPosition}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-medium mb-1">{selectedFeature?.title}</h3>
              <p className="text-neutral-700 text-sm">{selectedFeature?.desc}</p>
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              onClick={() => console.log("More Layouts clicked")}
              className="flex items-center gap-1 text-neutral-700 font-bold hover:text-black"
            >
              More Layouts <span className="text-lg">»</span>
            </button>
          </div>

          <div
            className="flex overflow-x-auto gap-4 pb-2 px-1 -mx-1 no-scrollbar scroll-smooth"
            ref={mobileScrollRef}
          >
            {features.map((feat, index) => (
              <div key={index} ref={(el) => (mobileCardRefs.current[index] = el)}>
                <FeatureCard
                  {...feat}
                  horizontal
                  active={selectedFeature?.id === feat.id}
                  onClick={() =>
                    setSelectedFeature((prev) => (prev?.id === feat.id ? null : feat))
                  }
                />
              </div>
            ))}
          </div>

          {/* Mobile Bottom Info */}
          <div className="mt-8 flex justify-between items-center" ref={buyNowRef}>
            <div>
              <div className="text-2xl font-bold">$39,000</div>
            </div>
            <button className="relative overflow-hidden bg-black text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform">
              <span className="relative z-10">BUY NOW</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

       {/* Floating BUY NOW button (shows for mobile & desktop when main button is not visible) */}
{!isBuyNowVisible && (
  <div className="fixed bottom-4 right-4 z-50">
    <button
      onClick={() => {
        const isDesktop = window.innerWidth >= 1024;
        const targetRef = isDesktop ? desktopBuyNowRef : buyNowRef;
        targetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className="relative overflow-hidden bg-black text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform"
    >
      <span className="relative z-10">BUY NOW</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
    </button>
  </div>
)}


      </main>
    </div>
  );
};

export default VanLayout;
