import { useState, useRef, useEffect } from "react";
import FeatureCard from "../components/FeatureCard";
import VanModelCanvas from "../components/VanModelCanvas";
import {  Expand, X } from "lucide-react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";
import swivelImg from "../assets/images/swivel.png";
import dinetteImg from "../assets/images/dinette.png";
import electricImg from "../assets/images/electric.png";
import heaterImg from "../assets/images/heater.png";
import storageImg from "../assets/images/storage.png";
import partitionImg from "../assets/images/partition.png";
i
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
    desc: "600 amp hrs, 2000W inverter, DC to DC charger, and 12V fridge chest, .",
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
    modelPath: "/models/electri
    title: "Storage",
    desc: "CNC-cut cabinets on driver's side.",
    image: storageImg,
    modelPath: "/models/storage.glb",
    scale: 0.1,
    cameraPosition: [0, 1.7, 11]
  {
    id: "partition",
    title: "Pa partition walls, supports S/N elevator bed.",
    image: par
    cameraPosition: [0, 1.6, 1                                                                                                                                                                                        
  },
];

const VanLayout = () => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isBuyNowVisible, setIsBuyNowVisible] = useState(true);

  const desktopScrollRef = useRef(null);
  const desktopBuyNowRef = useRef(null);
  const mobileCardRefs = useRef([]);
  const buyNowRef = useRef(null);

useEffect(() => {
  const timeoutId = setTimeout(() => {
    const mobileTarget = buyNowRef.current;
    const desktopTarget = desktopBuyNowRef.current;

    const observer = new Inters
    );                       

    if (mobileTarget) observer.observe(mobileTarget);
    if (desktopTarget) observe
      if (currentTarget) {
        observer.disconnect();
        observer.observe(currentTarget);
      }
    };                                            
 
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, 100); 
  return () => clear
    <div className="min-h-screen bg-white text-bla
<header className="sticky top-0 z-50 bg-white w-full border-b border-black/10 px-6 py-6 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <img src={logo} alt="Big Bear Vans Logo" className="h-8 w-auto" />
    <div className="hidden lg:block logo-text">
      BIG BEAR <span>VANS</span>
  {/* Centered Navigation */}
  <nav className="hidden lg:flex gap-10 text-base font-bo
    </div>
  </div>
ld text-[#0a1e7d] justify-center flex-1">
    <a href="#overview" className="ho

      <div className="flex-1 p
          }}
          className="absolute bottom-6 left-6 z-20 bg-white shadow-lg rounded-full p-2 hover:scale-105 transition"
        >
          <Expand size={20} className="text-black" />
        </button>

        <div className="h-full w-full overflow-hidden rounded-lg relative z-0">
          <VanModelCanvas
            key={selectedFeature?.id}
            modelPath={selectedFeature?.modelPath}
            scale={selectedFeature?.scale}
            camera
        <div className="absolute bottght-6 max-w-[300px] bg-black/10 backdrop-blur-sm p-4 rounded-xl border border-black/10 z-20">
          <h3 className="text-xl font-medium mb-1">{selectedFeature?.title}</h3>
          <p className="text-neutral-700 text-sm">{selectedFeature?.desc}</p>
        </div>
      </div>
    </div>                                             
                                                                                          
    <div className="hidden lg:block fixed top-[72px] right-0 w-[36%] h-[32px] bg-white z-40"></div>

    <div className="hidden lg:flex flex-col ml-[64%] px-6 pt-0">
      <div className="sticky top-[96px] z-50 bg-white py-2 mb-4">
        <h1 className="text-2xl font-bold text-center text-black">Layout Featur
            {...feat}
            active={selectedFeature?.id === feat.id}
            onClick={() =>
              setSelectedFeature((prev) => (prev?.id === feat.id ? null : feat))
            }                                                   
          />
        ))}
      </div>
                                                                        
      <div
        className="flex flex-col items-center gap-3 px-4 py-8 border-t border-black/10 bg-black/5 mt-6"
        ref={desktopB
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-2xl font-bold">$39,000</div>
        
            <button
              className="relative overflow-hidden bg-[#08175e] text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors duration-300"
              style={{ animation: "pulseZoom 2s infinite" }}
            >
              <span className="relative z-10">Configure Now</span>
              <div className="absolute inset-0 bg-gent-to-r from-transparent via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </button>radi

            <button className="flex items-center gap-1 text-neutral-700 font-bold hover:text-black">
              More Layouts <span className="text-lg">››</span>
            </button>
          </div>
        </div>
      
  </>
)}

{/* Fullscreen Canvas */}
{showFull
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

    <div className="w-f
        key={selectedFeature?.id}
        modelPath={selectedFeature?.modelPath}
        scale={selectedFeature?.scale}
        cameraPosition={selectedFeature?.camera
    </div>
  </div>                                                                                                                                               
)}

{/* Mobile View */}
<div className="lg:hidden w-full min-h-[100dvh] flex flex-col px-4 pt-8 pb-4">


  <div className="mb-4 rounded-xl overflow-hidden border border-black/10 bg-gradient-to-br from-white to-neutral-100 relative">
    <div className="absolute inset-0 pointer-events-none z-10 rounded-xl bg-gradient-to-t from-[rgba(123,123,123,0.12)]
    <div className="w-full h-[300px] rounded-lg overflow-hidden r
      <VanModelCanvas
        key={selectedFeature?.id}
        modelPath={selectedFeature?.modelPath}
        scale={selectedFeature?.scale}
        cameraPosition={selectedFeature?.cameraPosition}
      />       
    </div>
    <div className="p-4 rele}</h3>
      <p className="text-neutral-700 text-sm">{selectedFeature?.desc}<

  <div className="mb-2 flex justify-en
          onClick={() =>
            setSelectedFeature((prev) => (prev?.id === feat.id ? null : feat))
          }

  </div
      <div className="flex items-center justify-center gap-3 text-sm text-gray-900 mb-1 animate-pulse">
        <ChevronsLeft size={18} />

        <ChevronsRight size={18} />
      </div>

          {/* Mobile Bottom Info */}
          <div className="mt-8 flex justify-between item
              <div className="text-2xl font-bold">$39,000</div>
            </div>
           <button
              className="relative ove] text-white font-bold px-6 py-2 rounded-full hover:bg-black transition-colors duration-300"
              style={{ animation: "pulseZ
              cons
              const t
  );
};

export default VanLayout;
