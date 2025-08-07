import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

// --- SVG ICONS (Replaced react-icons) ---
const IconExternalLink = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const IconGithub = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconArrowRight = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const IconX = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconPlay = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
     <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);


// Data for the projects
const projects = [
  {
    id: 1,
    title: "Columbia Cosmetics E-Commerce",
    description: "A full-featured online store with payment integration and inventory management.",
    category: "Full Stack",
    featured: true,
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    video: "https://cdn.dribbble.com/users/2361633/screenshots/15486333/media/53b8b2c019a72dff17c5b7468a5317fe.mp4",
    tags: ["React", "Laravel", "MYSQL", "Stripe", "Fedex", "USPS", "UPS", "Custom CRM"],
    accentColor: "#3b82f6",
    liveUrl: "https://example.com",
    codeUrl: "#",
    caseStudy: {
      overview: "Developed a scalable e-commerce solution for a retail client, increasing online sales by 120%.",
      problem: "The client needed a modern platform to replace their outdated system that couldn't handle increased traffic.",
      solution: "Built a performant React frontend with a PHP/Laravel backend and MYSQL for flexible data modeling.",
      results: [
        "120% increase in conversion rate",
        "40% faster page loads",
        "300% more mobile users"
      ],
      technologies: ["React", "Laravel", "MYSQL", "Stripe", "Fedex", "USPS", "UPS", "Custom CRM"],
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1555774698-0b77e0ab232f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          caption: "Product listing page with advanced filtering"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          caption: "Mobile responsive design for seamless shopping"
        }
      ]
    }
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Real-time data visualization for business metrics and KPIs.",
    category: "React",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    video: "https://cdn.dribbble.com/users/383277/screenshots/15233159/media/23c95268c3b7a5e0329c295aker_shot.mp4",
    tags: ["React", "D3.js", "Chart.js"],
    accentColor: "#10b981",
    liveUrl: "https://example.com/dashboard",
    caseStudy: {
      overview: "Interactive dashboard that helped executives make data-driven decisions.",
      problem: "The client needed to consolidate multiple data sources into a single, intuitive view.",
      solution: "Created a responsive dashboard with real-time updates and customizable widgets.",
      results: [
        "50% faster decision making",
        "30% reduction in manual reporting",
        "90% user satisfaction"
      ],
      technologies: ["React", "D3.js", "Chart.js", "REST API"],
      media: []
    }
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "Automated content creation platform using GPT-4 technology.",
    category: "Next.js",
    image: "https://images.unsplash.com/photo-1677442135136-760c813a743a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Next.js", "OpenAI", "Tailwind CSS"],
    accentColor: "#8b5cf6",
    liveUrl: "https://example.com/ai-content",
    caseStudy: {
      overview: "Platform that generates high-quality content in seconds using AI.",
      problem: "Content creation was a major bottleneck, being time-consuming and expensive for the client.",
      solution: "Built an AI-powered platform that generates content in multiple formats and tones.",
      results: [
        "80% reduction in content creation time",
        "60% cost savings",
        "95% content accuracy rate"
      ],
      technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Node.js"],
      media: []
    }
  }
];

// Reusable Glass Morphism Card Component
const GlassCard = ({ children, className = '' }) => (
  <div className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Reusable Video Player with custom play button
const VideoPlayer = ({ src, className, autoPlay = false, loop = false, muted = true }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovering, setIsHovering] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted={muted}
        loop={loop}
        playsInline
        autoPlay={autoPlay}
      />
      {isHovering && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity">
          <motion.div
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <IconPlay size={24} className="text-gray-900 ml-1" />
          </motion.div>
        </div>
      )}
    </div>
  );
};


// 3D Project Model for hover effects
const ProjectModel = ({ project }) => {
  const meshRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.6} color={project.accentColor || "#ffffff"} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color={project.accentColor || "#ffffff"} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshPhysicalMaterial
          color={project.accentColor || "#6366f1"}
          roughness={0.1}
          metalness={0.8}
          transmission={0.5}
          ior={1.5}
          thickness={1.5}
          emissive={project.accentColor || "#6366f1"}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};


// Main Project Card component
const ProjectCard = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="group relative h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* 3D Preview floating on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute -top-32 -right-20 w-56 h-56 z-10 pointer-events-none"
          >
            <Canvas 
              shadows
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
              <ProjectModel project={project} />
              <OrbitControls enableZoom={false} autoRotate enablePan={false} />
              <Environment preset="city" />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Card Content with Glass Morphism */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="h-full rounded-xl overflow-hidden cursor-pointer"
      >
        <GlassCard className="h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            {project.video ? (
              <VideoPlayer src={project.video} className="w-full h-full" muted loop />
            ) : (
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-semibold text-white">{project.title}</h4>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm">
                {project.category}
              </span>
            </div>
            <p className="text-white/70 text-sm mb-4 flex-grow">{project.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex gap-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <motion.span
                    key={tag}
                    className="px-2.5 py-1 bg-white/10 text-white/80 rounded-full text-xs font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <motion.div
                whileHover={{ x: 2 }}
                className="text-sm font-medium text-white flex items-center gap-1"
              >
                Case Study <IconArrowRight size={14} />
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};


// Case Study Modal Component
const CaseStudyModal = ({ project, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        <div className="sticky top-0 z-10 bg-gray-900/70 backdrop-blur-lg border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <IconX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <GlassCard className="overflow-hidden">
                {project.video ? (
                  <video controls autoPlay loop muted className="w-full h-full object-cover">
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                )}
              </GlassCard>
            </div>
            <div className="space-y-4">
              <GlassCard className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-300 text-sm">{project.caseStudy.overview}</p>
              </GlassCard>
              <GlassCard className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
              <div className="flex gap-3 pt-2">
                {project.liveUrl && (
                  <motion.a whileHover={{ y: -2 }} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-medium shadow-lg">
                    <IconExternalLink size={14} /> Live Demo
                  </motion.a>
                )}
                {project.codeUrl && (
                  <motion.a whileHover={{ y: -2 }} href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md border border-gray-700 hover:border-gray-600 text-sm font-medium">
                    <IconGithub size={14} /> Code
                  </motion.a>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">The Challenge</h3>
                <p className="text-gray-300">{project.caseStudy.problem}</p>
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Our Solution</h3>
                <p className="text-gray-300">{project.caseStudy.solution}</p>
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.caseStudy.results.map((result, index) => (
                    <motion.div key={index} whileHover={{ y: -4 }} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl p-4 border border-gray-700">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                        {result.match(/\d+%/)?.[0] || `#${index + 1}`}
                      </div>
                      <p className="text-gray-300 text-sm">{result.replace(/\d+%/, '').trim()}</p>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
              {project.caseStudy.media?.length > 0 && (
                 <GlassCard className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Project Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.caseStudy.media.map((item, index) => (
                            <motion.div key={index} className="rounded-lg overflow-hidden border border-gray-700" whileHover={{scale: 1.03}}>
                                <img src={item.url} alt={item.caption} className="w-full h-auto" />
                                {item.caption && <p className="text-xs text-gray-400 p-2 bg-gray-800">{item.caption}</p>}
                            </motion.div>
                        ))}
                    </div>
                 </GlassCard>
              )}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};


// The main section component containing header, filters, and project grid
const WorkSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['All', 'React', 'Next.js', 'Full Stack'];

  const filteredProjects = projects.filter(project =>
    activeFilter === 'All' || project.category === activeFilter
  );

  const openCaseStudy = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="work" className="py-24 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        {/* Decorative background gradients */}
       <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-900/40 to-purple-900/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
       <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-teal-900/30 to-indigo-900/10 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            My Work
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my passion for creating modern, intuitive, and performant web experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <GlassCard className="inline-flex p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  activeFilter === filter ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-md -z-10"
                  />
                )}
              </button>
            ))}
          </GlassCard>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => openCaseStudy(project)}
              />
            ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal project={selectedProject} onClose={closeCaseStudy} />
        )}
      </AnimatePresence>
    </section>
  );
};

// Main App Component to render the portfolio
const App = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans">
      <main>
        <WorkSection />
      </main>
    </div>
  );
};

export default App;
