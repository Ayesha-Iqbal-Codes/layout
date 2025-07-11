import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import VanModelCanvas from "../components/VanModelCanvas";

import layout1 from "../assets/images/dinette.png"; 
import layout2 from "../assets/images/electric.png"; 
import logo from "../assets/images/logobbv.jpg";


const layouts = [
  {
    id: "layout1",
    title: "First Layout",
    price: "$39,000",
    image: layout1,
    features: [
      "Convertible Dinette",
      "Swivel Double Seat",
      "12V fridge",
      "2000W inverter",
      "600Ah battery",
    ],
  },
  {
    id: "layout2",
    title: "Second Layout",
    price: "$59,000",
    image: layout2,
    features: [
      "Convertible Dinette",
      "Swivel Double Seat",
      "12V fridge",
      "2000W inverter",
      "600Ah battery",
      "Different Colors",
    ],
  },
];

const VanLayout = () => {
  const [selectedLayout, setSelectedLayout] = useState(layouts[0]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white w-full border-b border-black/10 px-6 py-5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="hidden lg:block text-2xl font-bold tracking-wide">BigBearVans</div>
        </div>
        <nav className="hidden lg:flex gap-6 text-blue-700 font-medium text-sm">
          <a href="#">Home</a>
          <a href="#">Vans For Sale</a>
          <a href="#">Layout</a>
          <a href="#">3D Van Builder</a>
        </nav>
        <button className="bg-blue-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
          Book Us
        </button>
      </header>

      {/* Canvas fixed on left for desktop */}
      <div className="hidden lg:flex flex-col fixed top-[88px] left-6 w-[60%] h-[calc(100vh-96px)] z-10">
        <h1 className="text-2xl font-bold text-indigo-900 text-center mb-3">
          Van Layout Model Viewer
        </h1>
        <div className="flex-1 border-2  rounded-xl overflow-hidden bg-gradient-to-br from-white to-neutral-100 p-3">
          <VanModelCanvas
            modelPath="/models/swivel.glb"
            scale={0.03}
            cameraPosition={[0, 1.4, 16]}
          />
        </div>
      </div>

      {/* Right scrollable layout cards */}
      <div className="lg:ml-[64%] px-6 py-12">
        <div className="text-center mb-6">
          <p className="text-lg italic text-gray-600">
            Choose the setup of your dreams. See what fits your adventure.
          </p>
        </div>

        <div className="flex justify-center mb-3">
          <ChevronUp className="text-gray-400" />
        </div>

        {layouts.map((layout) => (
          <div
            key={layout.id}
            onClick={() => setSelectedLayout(layout)}
            className={`${
              selectedLayout.id === layout.id ? "border-blue-500" : "border-gray-300"
            } border rounded-lg p-4 mb-6 max-w-[480px] mx-auto bg-white shadow hover:shadow-md cursor-pointer transition`}
          >
            <img
              src={layout.image}
              alt={layout.title}
              className="w-full h-28 object-cover rounded mb-2"
            />
            <div className="text-sm font-semibold">{layout.title}</div>
            <div className="text-lg font-bold mb-2">{layout.price}</div>
            <ul className="text-sm text-gray-700 space-y-1 mb-3 leading-snug">
              {layout.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button className="bg-blue-700 text-white px-4 py-2 text-sm rounded-md">
              View Details
            </button>
          </div>
        ))}

        <div className="flex justify-center">
          <ChevronDown className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default VanLayout;
