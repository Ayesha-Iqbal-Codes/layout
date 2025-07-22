import React, { Suspense, useMemo, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Center,
  Html,
  Environment,
  ContactShadows,
} from "@react-three/drei";

const Model = ({ path, scale }) => {
  const { scene } = useGLTF(path, true);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    return () => {
      scene?.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material?.dispose) child.material.dispose();
        }
      });
    };
  }, [scene]);

  const model = useMemo(
    () => <primitive ref={modelRef} object={scene} scale={scale || 0.3} />,
    [scene, scale]
  );

  return <Center>{model}</Center>;
};

const VanModelCanvas = ({ modelPath, scale }) => {
  return (
    <Canvas
      className="cursor-grab active:cursor-grabbing"
      camera={{ position: [0, 2, 10], fov: 35, near: 0.1, far: 1000 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ alpha: true }}
      shadows
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <hemisphereLight skyColor="#eaeaea" groundColor="#222222" intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[0, 20, 0]}
        angle={0.2}
        penumbra={1}
        intensity={2}
        castShadow
      />

      {/* HDRI Background */}
      <Environment preset="warehouse" />

      {/* Model */}
      <Suspense
        fallback={
          <Html center>
            <div style={{ fontSize: "1.1rem", color: "#ccc" }}>
              Loading Model...
            </div>
          </Html>
        }
      >
        {modelPath && <Model path={modelPath} scale={scale} />}
      </Suspense>

      {/* Shadows */}
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.35}
        scale={10}
        blur={1.5}
        far={4}
      />

      {/* Orbit Controls with full camera control */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.7}
        autoRotate={false}
      />
    </Canvas>
  );
};

export default VanModelCanvas;
