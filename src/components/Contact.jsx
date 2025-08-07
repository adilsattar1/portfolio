import React, { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

// --- Error Boundary for 3D Components ---
class ThreeErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('3D component error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                        <div className="text-4xl mb-2">🎨</div>
                        <div>3D Model Unavailable</div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// --- Reusable Dark Theme GlassCard ---
const DarkGlassCard = ({ children, className = '' }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- 3D Model Component ---
const MailboxModel = () => {
  // Use a local model instead of the remote URL
  const { scene, error } = useGLTF('/models/workstation1.glb');
  
  // Animate the model
  useFrame((state, delta) => {
    if (scene) {
      scene.rotation.y += delta * 0.2;
    }
  });

  // Handle loading errors
  if (error) {
    console.warn('Failed to load 3D model:', error);
    return null;
  }

  return scene ? <primitive object={scene} scale={0.8} position={[0, -1, 0]} /> : null;
};


// --- The Contact Section Component (Dark Theme) ---
const ContactSection = () => {
    const sectionRef = useRef(null);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="contact" className="py-28 relative bg-[#050505] text-white overflow-hidden" ref={sectionRef}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute bottom-0 right-[-10rem] w-96 h-96 bg-gradient-to-tr from-purple-900/50 to-blue-900/20 rounded-full filter blur-3xl animate-pulse [animation-delay:3s]"></div>
                <div className="absolute top-0 left-[-10rem] w-96 h-96 bg-gradient-to-tl from-cyan-900/40 to-indigo-900/20 rounded-full filter blur-3xl animate-pulse"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ once: true }} 
                    className="text-center mb-16">
                    <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Get In Touch
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? I'd love to hear from you.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* 3D Model Viewer */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-[500px] rounded-2xl">
                        <DarkGlassCard className="w-full h-full">
                            <ThreeErrorBoundary>
                                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-400">Loading 3D Model...</div>}>
                                    <Canvas 
                                        shadows 
                                        camera={{ position: [0, 1, 5], fov: 50 }}
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
                                        <Environment preset="night" />
                                        <ambientLight intensity={0.5} />
                                        <directionalLight 
                                            position={[5, 5, 5]} 
                                            intensity={1.5} 
                                            castShadow 
                                            shadow-mapSize-width={1024}
                                            shadow-mapSize-height={1024}
                                        />
                                        <MailboxModel />
                                        <ContactShadows position={[0, -1.05, 0]} opacity={0.7} scale={10} blur={2} far={1.5} />
                                        <OrbitControls 
                                            enableZoom={false} 
                                            enablePan={false}
                                            autoRotate 
                                            autoRotateSpeed={0.5}
                                            minPolarAngle={Math.PI / 2.5}
                                            maxPolarAngle={Math.PI / 2.5}
                                        />
                                    </Canvas>
                                </Suspense>
                            </ThreeErrorBoundary>
                        </DarkGlassCard>
                    </motion.div>
                    
                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true }}
                    >
                        <DarkGlassCard className="p-8">
                            <form className="space-y-6">
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="you@example.com"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                    <textarea 
                                        id="message" 
                                        rows="4"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="Your message here..."
                                    ></textarea>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <motion.button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg"
                                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(100, 100, 255, 0.5)" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Send Message
                                    </motion.button>
                                </motion.div>
                            </form>
                        </DarkGlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
