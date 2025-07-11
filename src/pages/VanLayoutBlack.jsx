import { useState, useEffect, useRef } from "react";
import FeatureCard from "../components/FeatureCard";
import VanModelCanvas from "../components/VanModelCanvas";
import { ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";
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
    desc: "CNC-cut cabinets on driver's side.",
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
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const featureRefs = useRef([]);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % features.length;
    setActiveIndex(nextIndex);
    setSelectedFeature(features[nextIndex]);
    scrollToFeature(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + features.length) % features.length;
    setActiveIndex(prevIndex);
    setSelectedFeature(features[prevIndex]);
    scrollToFeature(prevIndex);
  };

  const scrollToFeature = (index) => {
    featureRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-light tracking-wider">VAN<span className="font-bold">CONFIG</span></div>
        <nav className="hidden md:flex gap-8">
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">Overview</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">Gallery</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors">Specs</a>
        </nav>
        <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200 transition-colors">
          Contact
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Model Viewer */}
          <div className="lg:w-2/3">
            <div className="relative aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl overflow-hidden border border-neutral-700">
              <VanModelCanvas
                key={selectedFeature?.id}
                modelPath={selectedFeature?.modelPath}
                scale={selectedFeature?.scale}
                cameraPosition={selectedFeature?.cameraPosition}
              />
              
              {/* Model Controls */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <button className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Feature Info Overlay */}
              <div className="absolute bottom-6 right-6 max-w-xs bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-neutral-700">
                <h3 className="text-xl font-medium mb-1">{selectedFeature?.title}</h3>
                <p className="text-neutral-300 text-sm">{selectedFeature?.desc}</p>
              </div>
            </div>
            
            {/* Feature Selector (Mobile) */}
            <div className="mt-6 md:hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Features</h2>
                <div className="flex gap-2">
                  <button onClick={handlePrev} className="p-1 rounded-full bg-neutral-800 hover:bg-neutral-700">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={handleNext} className="p-1 rounded-full bg-neutral-800 hover:bg-neutral-700">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              <div 
                ref={containerRef}
                className="flex overflow-x-auto gap-4 pb-4 scroll-smooth no-scrollbar"
              >
                {features.map((feat, index) => (
                  <div
                    key={feat.id}
                    ref={(el) => (featureRefs.current[index] = el)}
                    onClick={() => {
                      setSelectedFeature(feat);
                      setActiveIndex(index);
                    }}
                    className={`flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedFeature?.id === feat.id ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img 
                      src={feat.image} 
                      alt={feat.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Configuration Panel */}
          <div className="lg:w-1/3">
            <div className="sticky top-6">
              <h1 className="text-3xl font-light mb-2">Premium Van Layout</h1>
              <p className="text-neutral-400 mb-8">Fully customized adventure vehicle with premium amenities</p>
              
              {/* Feature Selector (Desktop) */}
              <div className="hidden md:block mb-8">
                <h2 className="text-xl font-medium mb-4">Select Feature</h2>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feat) => (
                    <button
                      key={feat.id}
                      onClick={() => setSelectedFeature(feat)}
                      className={`p-4 rounded-lg border transition-all ${selectedFeature?.id === feat.id ? 'border-white bg-white/10' : 'border-neutral-700 hover:border-neutral-500'}`}
                    >
                      <h3 className="font-medium text-left">{feat.title}</h3>
                      <p className="text-sm text-neutral-400 text-left">{feat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Pricing */}
              <div className="border-t border-neutral-800 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-2xl font-medium">$39,000</div>
                    <div className="text-sm text-neutral-400">Starting price</div>
                  </div>
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors">
                    Configure <ArrowUpRight size={18} />
                  </button>
                </div>
                
                <div className="text-sm text-neutral-400">
                  <p className="mb-2">• 600 amp hour electrical system</p>
                  <p className="mb-2">• Glycol heating system</p>
                  <p className="mb-2">• Premium CNC-cut cabinetry</p>
                  <p className="mb-2">• Swivel seat with bed conversion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-12 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-light tracking-wider mb-2">VAN<span className="font-bold">CONFIG</span></div>
            <p className="text-neutral-400 text-sm">Premium van conversions since 2018</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Careers</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VanLayout;