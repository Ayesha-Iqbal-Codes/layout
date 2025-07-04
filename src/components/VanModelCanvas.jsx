import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const HighlightBox = ({ position, size = [0.5, 0.5, 0.5], color = "hotpink" }) => (
  <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const VanModelCanvas = ({ selected }) => {
  return (
    <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 2, 1.5]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {selected === "swivel" && (
        <HighlightBox position={[-1.2, 1, 0.5]} color="orange" />
      )}
      {selected === "dinette" && (
        <HighlightBox position={[1, 1, -0.6]} size={[1, 0.4, 0.4]} color="teal" />
      )}
      {selected === "electrical" && (
        <HighlightBox position={[-1.5, 0.5, -0.6]} color="yellow" />
      )}
      {selected === "heating" && (
        <HighlightBox position={[0.8, 0.5, 0.6]} color="red" />
      )}
      {selected === "storage" && (
        <HighlightBox position={[1.5, 1.5, 0]} size={[1, 0.3, 0.3]} color="#4ADE80" />
      )}
      {selected === "partition" && (
        <HighlightBox position={[0, 1, -0.75]} size={[3, 1.8, 0.1]} color="#93C5FD" />
      )}

      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default VanModelCanvas;
