const FeatureCard = ({ title, desc, image, onClick, active, horizontal }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer 
        text-black 
        p-4 
        rounded-xl 
        border 
        transition-all 
        duration-300 
        flex 
        ${horizontal ? "flex-row" : "flex-col"} 
        gap-3
        hover:shadow-lg
        overflow-hidden
        relative

        ${
          horizontal
            ? "min-w-[280px] h-[160px]" 
            : "w-full max-w-[400px] h-[180px]"
        }

        ${
          active
            ? "bg-neutral-100 border-black/30 shadow-lg scale-[1.02]"
            : "bg-white/80 border-black/20 hover:bg-white hover:border-black/30"
        }
      `}
    >
      {/* Active state indicator */}
      {active && (
        <div className="absolute inset-0 border-2 border-black/10 rounded-xl pointer-events-none" />
      )}

      {/* Image container */}
      <div className={`
        ${horizontal ? "w-[100px] h-full" : "w-full h-[100px]"} 
        flex-shrink-0 
        overflow-hidden 
        rounded-lg
        bg-transparent
        flex items-center justify-center
      `}>
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-contain p-2 ${active ? "scale-105" : ""}`}
          style={{ filter: "none", WebkitFilter: "none" }}
        />
      </div>

      {/* Text content */}
      <div className={`flex flex-col ${horizontal ? "flex-1" : ""}`}>
        <h3 className="font-medium text-lg leading-tight mb-1.5">
          {title}
        </h3>
        <p className="text-neutral-700 text-sm leading-snug">
          {desc}
        </p>

        {/* Active indicator bar */}
        {active && (
          <div className="mt-auto pt-2 border-t border-black/20">
            <div className="w-4 h-1 bg-black rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
