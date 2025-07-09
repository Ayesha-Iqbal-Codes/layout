import React from "react";
import { useNavigate } from "react-router-dom"; 

const vanLayouts = [
  {
    id: 1,
    title: "Adventure Seeker",
    desc: "Built for the explorer with a cozy bed, kitchenette, and solar power.",
    price: "$42,000",
    image: "/images/van1.png",
  },
  {
    id: 2,
    title: "Weekend Warrior",
    desc: "Compact and functional design for quick getaways.",
    price: "$35,000",
    image: "/images/van2.png",
  },
  {
    id: 3,
    title: "Luxury Roamer",
    desc: "High-end finishes, climate control, and full bathroom.",
    price: "$58,000",
    image: "/images/van3.png",
  },
  {
    id: 4,
    title: "Family Explorer",
    desc: "Bunk beds, extra storage, and seating for four.",
    price: "$47,000",
    image: "/images/van4.png",
  },
  {
    id: 5,
    title: "Off-Grid Beast",
    desc: "4x4 conversion, water tanks, and full off-grid capability.",
    price: "$51,000",
    image: "/images/van5.png",
  },
];

const MoreLayoutsPage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#55427B] via-[#586584] to-[#597588] text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Explore More Van Layouts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {vanLayouts.map((van) => (
          <div
            key={van.id}
            className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => {
       
            }}
          >
            <img
              src={van.image}
              alt={van.title}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-2xl font-bold">{van.title}</h2>
            <p className="text-white/80 mt-2 text-sm">{van.desc}</p>
            <p className="mt-4 text-xl font-bold">{van.price}</p>
            <button className="mt-4 bg-white text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition">
              View Layout
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/van-layout")}
          className="bg-white text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform duration-200"
        >
          ⬅ Back to Viewer
        </button>
      </div>
    </div>
  );
};

export default MoreLayoutsPage;
