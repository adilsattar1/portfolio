import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';

const modelConfig = {
  'workstation2.glb': {
    scale: 0.1,
    position: [0, -0.3, 0],
    color: '#9A7EF2',
    camera: {
      position: [0, 0, 1.1],
      fov: 50,
      near: 0.3,
      far: 1000
    }
  },
  'default': {
    scale: 1,
    position: [0, 0, 0],
    color: '#ffffff',
    camera: {
      position: [0, 0, 1],
      fov: 55,
      near: 0.4,
      far: 1000
    }
  }
};

const ModelScene = ({ modelPath }) => {
  const { scene } = useGLTF(`/models/${modelPath}`);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      const config = modelConfig[modelPath] || modelConfig['default'];

      modelRef.current.scale.set(config.scale, config.scale, config.scale);
      modelRef.current.position.set(...config.position);
      modelRef.current.rotation.set(0, 0, 0);

      modelRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set(config.color);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, modelPath]);

  return <primitive object={scene} ref={modelRef} />;
};

const ModelViewer = ({ modelPath }) => {
  const controlsRef = useRef();
  const config = modelConfig[modelPath] || modelConfig['default'];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <Canvas
        camera={config.camera}
        className="w-full h-full"
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
        onError={(error) => {
          console.warn('Canvas error:', error);
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} />
        <Suspense fallback={null}>
          <ModelScene modelPath={modelPath} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.1}
          // Prevent full vertical rotation (up/down)
          minPolarAngle={Math.PI / 6}     // 30° (prevents looking straight down)
          maxPolarAngle={Math.PI * 5 / 6} // 150° (prevents looking straight up)
          // Allow full horizontal rotation (left/right)
          minAzimuthAngle={-Infinity}     // No limit on left rotation
          maxAzimuthAngle={Infinity}      // No limit on right rotation
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;