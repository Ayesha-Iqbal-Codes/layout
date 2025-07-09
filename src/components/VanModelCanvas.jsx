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

const VanModelCanvas = ({ modelPath, scale, cameraPosition }) => {
  return (
    <Canvas
      camera={{ position: cameraPosition || [0, 1.5, 10], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <hemisphereLight skyColor="#ffffff" groundColor="#888888" intensity={1} />
      <pointLight position={[0, -2, 0]} intensity={0.6} />
      <Environment preset="city" />

      <Suspense
        fallback={
          <Html center>
            <div style={{ fontSize: "1.1rem", color: "#ccc" }}>Loading Model...</div>
          </Html>
        }
      >
        {modelPath && <Model path={modelPath} scale={scale} />}
      </Suspense>

      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      <OrbitControls enableZoom enablePan={false} />
    </Canvas>
  );
};

export default VanModelCanvas;
