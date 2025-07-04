const FeatureCard = ({ title, desc, image, onClick, active, horizontal }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer 
        text-white 
        p-4 
        rounded-md 
        shadow-md 
        transition-transform duration-200 
        flex flex-col gap-1
        ${horizontal ? "min-w-[220px]" : "w-[160%] max-w-[260px] mx-auto"} 
        ${
          active
            ? "bg-gradient-to-br from-[#7468a4] via-[#8a9ab8] to-[#9aaac2]"
            : "bg-gradient-to-br from-[#3c2e5a] via-[#3e4e5d] to-[#435868] hover:scale-105"
        }
      `}
    >
      {/* Title */}
      <h3 className="font-bold text-lg text-center leading-tight">{title}</h3>

      {/* Image + Description */}
      <div className="flex gap-4 items-center">
        <div className="w-[80px] h-[60px] flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-sm opacity-90">{desc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
