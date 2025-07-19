import { useState, useRef, useEffect } from "react";
import FeatureCard from "../components/FeatureCard";
import VanModelCanvas from "../components/VanModelCanvas";
import { Expand, X } from "lucide-react";
import { ChevronsLeft, ChevronsRight, Car, RotateCw } from "lucide-react";

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
    modelPath: "/models/van.glb",
    scale: 1.5,
    cameraPosition: [0, 1.6, 11],
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
  const [isConfigureNowVisible, setIsConfigureNowVisible] = useState(true);

  const desktopScrollRef = useRef(null);
  const desktopConfigureNowRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const mobileCardRefs = useRef([]);
  const configureNowRef = useRef(null);

  // ✅ NEW STATE for orientation
  const [showRotateMessage, setShowRotateMessage] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  // ✅ Detect orientation change
 useEffect(() => {
  const handleOrientationChange = () => {
    const isLandscape = window.innerWidth > window.innerHeight;
    setIsLandscape(isLandscape);

    // Show "rotate your device" message only when in fullscreen and still in portrait mode
    if (showFullscreen) {
      setShowRotateMessage(!isLandscape);
    }
  };

  // Listen for screen resize or orientation change
  window.addEventListener("resize", handleOrientationChange);
  window.addEventListener("orientationchange", handleOrientationChange);

  // Run on initial load
  handleOrientationChange();

  // Cleanup on unmount
  return () => {
    window.removeEventListener("resize", handleOrientationChange);
    window.removeEventListener("orientationchange", handleOrientationChange);
  };
}, [showFullscreen]);


  // ✅ Observer for "Configure Now" visibility
 useEffect(() => {
  const timeoutId = setTimeout(() => {
    const mobileTarget = configureNowRef.current;
    const desktopTarget = desktopConfigureNowRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsConfigureNowVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (window.innerWidth >= 1024 && desktopTarget) {
      observer.observe(desktopTarget);
    } else if (mobileTarget) {
      observer.observe(mobileTarget);
    }

    const handleResize = () => {
      observer.disconnect();
      if (window.innerWidth >= 1024 && desktopTarget) {
        observer.observe(desktopTarget);
      } else if (mobileTarget) {
        observer.observe(mobileTarget);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, 100);

  return () => clearTimeout(timeoutId);
}, [showFullscreen]); // ✅ Add showFullscreen as a dependency


  // ✅ Blur effect logic for mobile scroll
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setShowLeftBlur(scrollLeft > 10);
      setShowRightBlur(scrollLeft + clientWidth < scrollWidth - 10);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // ✅ Fullscreen trigger with scroll + message
  const handleFullscreen = () => {
    setShowFullscreen(true);
    setTimeout(() => {
      setIsFullscreen(true);

      // Show rotate message if in portrait
      if (window.innerHeight > window.innerWidth) {
        setShowRotateMessage(true);
      }

      // Auto scroll to top (or horizontal)
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }, 10);
  };
  
  return (
    <div className="min-h-screen bg-white text-black">
    {/* Header */}
<header className="sticky top-0 z-50 bg-white w-full border-b border-black/10 px-6 py-6 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <img src={logo} alt="Big Bear Vans Logo" className="h-8 w-auto" />
    <div className="hidden lg:block logo-text">
      BIG BEAR <span>VANS</span>
    </div>
  </div>

  {/* Centered Navigation */}
  <nav className="hidden lg:flex gap-10 text-base font-bold text-gray-950 justify-center flex-1">
    <a href="#overview" className="hover:underline">Overview</a>
    <a href="#vans" className="hover:underline">Vans for Sale</a>
    <a href="#layout" className="hover:underline">Layout</a>
    <a href="#builder" className="hover:underline">3D Van Builder</a>
  </nav>

  <button className="bg-[#08175e] text-white px-6 py-2 rounded-full font-medium hover:bg-neutral-800 transition-colors">
    Book Now
  </button>
</header>
      <main className="relative min-h-[100dvh]">
{/* Desktop View */}
{!showFullscreen && (
  <>
    <div className="hidden lg:flex flex-col fixed top-[104px] left-6 w-[61%] h-[calc(100vh-124px)] z-10">
     <h1 className="metallic-black-heading text-2xl font-bold text-center mb-4">
  Van Layout Model Viewer
</h1>
      <div className="flex-1 p-6 bg-gradient-to-br from-white to-neutral-100 rounded-xl overflow-hidden border border-black/10 relative">
      
        <div className="absolute inset-0 pointer-events-none rounded-xl z-10 bg-gradient-to-t from-[rgba(123,123,123,0.18)] to-[rgba(228,228,228,0)]" />

        <button
          onClick={() => {
            setShowFullscreen(true);
            setTimeout(() => setIsFullscreen(true), 10);
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
            cameraPosition={selectedFeature?.cameraPosition}
          />
        </div>

        <div className="absolute bottom-6 right-6 max-w-[300px] bg-black/10 backdrop-blur-sm p-4 rounded-xl border border-black/10 z-20">
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
                                             
      <div
        className="flex flex-col items-center gap-3 px-4 py-8 border-t border-black/10 bg-black/5 mt-6"
        ref={desktopConfigureNowRef}
      >                                      
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-2xl font-bold">$39,000</div>
          <div className="flex flex-col items-center gap-3">
            <button
              className="relative overflow-hidden bg-[#08175e] text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors duration-300"
                   style={{ animation: "pulseZoom 2s infinite" }}
            >
              <span className="relative z-10">Configure Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </button>
                                          
           <button className="flex items-center gap-2 text-neutral-700 font-bold text-lg hover:text-black">
            More Layouts
            <Car size={22} strokeWidth={2.2} className="ml-1" />
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
    {/* Close button */}
    <button
      onClick={() => {
        setIsFullscreen(false);
        setTimeout(() => setShowFullscreen(false), 500);
      }}
      className="absolute top-4 right-4 z-[1000] bg-white text-black hover:bg-neutral-200 p-2 rounded-full shadow"
    >
      <X size={20} />
    </button>
    
       
{/* 🔁 Rotate Message */}

{showRotateMessage && !isLandscape && (
  <div className="absolute top-22 left-1/2 transform -translate-x-1/2 z-[1000] flex items-center justify-center text-base font-medium text-black text-center max-w-md w-full px-4">
    <RotateCw className="w-16 h-8 animate-spin-slow -mr-4 -mt-1 shrink-0" />
    <span className="leading-tight">
      Please rotate your device for a better viewing experience
    </span>
  </div>
)}

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
<div className="lg:hidden w-full min-h-screen flex flex-col justify-between px-0 pt-6 pb-4 overflow-hidden">
  {/* Heading for Mobile */}
  <h1 className="text-[1.80rem] font-bold text-center text-black -mb-20">
    Van Layout Model Viewer
  </h1>

  {/* Top Content Area */}
  <div>
    {/* Canvas and Description */}
    <div className="mb-4 mt-24 rounded-xl overflow-hidden border border-black/10 bg-gradient-to-br from-white to-neutral-100 relative mx-4">
      <div className="absolute inset-0 pointer-events-none z-10 rounded-xl bg-gradient-to-t from-[rgba(123,123,123,0.12)] to-[rgba(228,228,228,0)]" />
     <div className="w-full h-[300px] rounded-lg overflow-hidden relative z-0">
  {/* Fullscreen Button (Mobile) */}
  <button
    onClick={() => {
      setShowFullscreen(true);
      setTimeout(() => setIsFullscreen(true), 10);
    }}
    className="absolute bottom-3 right-3 z-20 bg-white shadow-md rounded-full p-2 hover:scale-105 transition"
  >
    <Expand size={20} className="text-black" />
  </button>

  {/* Model Canvas */}
  <VanModelCanvas
    key={selectedFeature?.id}
    modelPath={selectedFeature?.modelPath}
    scale={selectedFeature?.scale}
    cameraPosition={selectedFeature?.cameraPosition}
  />
</div>

      <div className="p-4 relative z-20">
        <h3 className="text-xl font-medium mb-1">{selectedFeature?.title}</h3>
        <p className="text-neutral-700 text-sm">{selectedFeature?.desc}</p>
        
      </div>
    </div>

    {/* More Layouts Button */}
    <div className="mb-2 flex justify-end px-4">
      <button
        onClick={() => console.log("More Layouts clicked")}
        className="flex items-center gap-2 text-neutral-950 font-bold text-lg lg:text-xl hover:text-black"
      >
        More Layouts
        <Car size={24} strokeWidth={2.5} className="ml-1" />
      </button>
    </div>

    {/* Layout Features Heading */}
    <div className="mb-2 px-4">
      <h2 className="text-2xl font-bold text-gray-950">Layout Features</h2>
    </div>

{/* Horizontal Snap Scroll Cards with Fade Overlay */}
<div className="relative">
  {/* Scrollable Features */}
  <div
    className="flex snap-x snap-mandatory overflow-x-auto pb-2 no-scrollbar scroll-smooth"
    ref={mobileScrollRef}
  >
    {features.map((feat, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-full snap-center px-4 pt-3"
        ref={(el) => (mobileCardRefs.current[index] = el)}
      >
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

 {/* Left Fade Overlay */}
{!isScrolling && showLeftBlur && (
  <div className="pointer-events-none absolute top-[4%] left-0 h-[94%] w-8 rounded-tl-xl rounded-bl-xl bg-gradient-to-r from-zinc-200/80 via-white/80 to-transparent backdrop-blur-sm z-10" />
)}

{/* Right Fade Overlay */}
{!isScrolling && showRightBlur && (
  <div className="pointer-events-none absolute top-[4%] right-0 h-[94%] w-8 rounded-tr-xl rounded-br-xl bg-gradient-to-l from-zinc-200/80 via-white/80 to-transparent backdrop-blur-sm z-10" />
)}

</div>
</div>

  {/* Swipe hint arrows */}
  <div className="flex items-center text-xl justify-center gap-2 text-sm text-neutral-900 mb-1 animate-pulse">
    <ChevronsLeft size={28} className="relative top-[3px]" />
    <span className="[font-family:'Dancing_Script',cursive] text-lg">
      Swipe to see more
    </span>
    <ChevronsRight size={28} className="relative top-[2px]" />
  </div>

  {/* Bottom Configure Now Section */}
  <div
    className="mt-4 bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center mx-4"
    ref={configureNowRef}
  >
    <div className="text-2xl font-bold">$39,000</div>
    <button
      className="relative overflow-hidden bg-[#08175e] text-white font-bold px-6 py-2 rounded-full hover:bg-black transition-colors duration-300"
      style={{ animation: "pulseZoom 2s infinite" }}
    >
      <span className="relative z-10">Configure Now</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
    </button>
  </div>
</div>

{/* Floating Configure Now Button */}
{!isConfigureNowVisible && (
  <div className="fixed bottom-4 right-4 z-50">
    <button
      onClick={() => {
        const isDesktop = window.innerWidth >= 1024;
        const targetRef = isDesktop ? desktopConfigureNowRef : configureNowRef;
        targetRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }}
      className="relative overflow-hidden bg-[#08175e] text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-black transition-colors duration-300"
      style={{ animation: "pulseZoom 2s infinite" }}
    >
      <span className="relative z-10">Configure Now</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
    </button>
  </div>
)}

      </main>
    </div>
  );
};

export default VanLayout;
