import React, { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaGithub, FaLinkedin, FaStar } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { motion, useAnimation } from "framer-motion";
import ModelViewer from "./ModelViewer";
import ProfileImage from "../assets/profile.jpg";
import UpworkIcon from "../assets/upwork.png";
import FiverrIcon from "../assets/fiverr.png";
import HomeBg from "../assets/home-bg.jpg";

const slides = [
     {
          heading: "<b>Adil <br />Sahito</b>",
          subheading: "Full Stack Developer & API Integration Specialist",
          description: "I build scalable web applications with seamless payment and shipping integrations. Expert in PHP, React, and complex system integrations with 5+ years delivering enterprise-grade solutions.",
          clientFocus: [
               "✓ 50+ Integrations (PayPal, Stripe, Square)",
               "✓ Shipping API Expert (FedEx, USPS)",
               "✓ Full Stack Development (Frontend + Backend)",
               "✓ Performance Optimization",
               "✓ Secure Payment Solutions"
          ],
          model: "workstation2.glb",
          color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          particles: {
               color: "#FFFFFF",
               count: 80
          }
     }
];


const HeroSection = () => {
     const [currentIndex] = useState(0);
     const [isHovering, setIsHovering] = useState(false);
     const canvasRef = useRef(null);
     const controls = useAnimation();
     const slide = slides[currentIndex];

     // Initialize particles
     useEffect(() => {
          if (!canvasRef.current) return;

          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const particles = Array.from({ length: slide.particles.count }, () => ({
               x: Math.random() * canvas.width,
               y: Math.random() * canvas.height,
               size: Math.random() * 3 + 1,
               speedX: Math.random() * 1 - 0.5,
               speedY: Math.random() * 1 - 0.5,
          }));

          const animateParticles = () => {
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.fillStyle = slide.particles.color;

               particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    // Reset particles that go off screen
                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
               });

               requestAnimationFrame(animateParticles);
          };

          animateParticles();

          const handleResize = () => {
               canvas.width = window.innerWidth;
               canvas.height = window.innerHeight;
          };

          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
     }, [slide.particles]);

     // Start animations immediately since we don't need to wait for video load
     useEffect(() => {
          controls.start({
               opacity: 1,
               y: 0,
               transition: { duration: 0.8, ease: "easeOut" }
          });
     }, [controls]);

     // Text animation variants
     const textVariants = {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
     };

     return (
          <div className="relative min-h-screen w-full overflow-hidden" style={{ background: slide.color }}>
               {/* Image Background - Replaces video */}
               <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                         src={HomeBg}
                         alt="Background"
                         className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    {/* Enhanced overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
               </div>

               {/* Animated Particles Background */}
               <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-10"
               />

               {/* Main Content */}
               <motion.div
                    initial="hidden"
                    animate={controls}
                    className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20"
               >
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                         {/* Left Column - Text Content */}
                         <div className="hero-content text-white space-y-6">
                              {/* Profile Image - Mobile */}
                              <motion.div
                                   variants={textVariants}
                                   className="block md:hidden mb-8 mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500"
                              >
                                   <img
                                        src={ProfileImage}
                                        alt="Adil Sahito"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                   />
                              </motion.div>

                              {/* Client-focused badge */}
                              <motion.div
                                   variants={textVariants}
                                   transition={{ delay: 0.1 }}
                                   className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                              >
                                   <RiVerifiedBadgeFill className="text-blue-300 text-xl" />
                                   <span className="text-sm font-medium">Trusted by 50+ Clients</span>
                              </motion.div>

                              <motion.p
                                   variants={textVariants}
                                   transition={{ delay: 0.2 }}
                                   className="text-lg sm:text-xl font-medium tracking-wider text-white/80"
                              >
                                   {slide.subheading}
                              </motion.p>

                              <motion.h1
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.8 }}
                                   className="special-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                                   dangerouslySetInnerHTML={{ __html: slide.heading }}
                              />

                              <motion.p
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.4, duration: 0.8 }}
                                   className="text-base sm:text-lg text-white/80 max-w-lg leading-relaxed"
                              >
                                   {slide.description}
                              </motion.p>

                              {/* Client Benefits List */}
                              <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.5, duration: 0.8 }}
                                   className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
                              >
                                   {slide.clientFocus.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                             <RiVerifiedBadgeFill className="text-green-300 flex-shrink-0" />
                                             <span className="text-sm sm:text-base text-white/90">{item}</span>
                                        </div>
                                   ))}
                              </motion.div>

                              {/* Rating Stars */}
                              <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.6, duration: 0.8 }}
                                   className="flex items-center gap-2 mt-4"
                              >
                                   <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                             <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                   </div>
                                   <span className="text-sm text-white/80">5.0 (120+ Reviews)</span>
                                   <span className="text-sm text-white/80 ml-2">• Payment System Specialist</span>
                                   <span className="text-sm text-white/80 ml-2">• API Integration Expert</span>
                              </motion.div>

                              {/* Platform Links - Enhanced */}
                              <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.7, duration: 0.8 }}
                                   className="flex flex-wrap gap-4 mt-6"
                              >
                                   <a
                                        href="https://www.upwork.com/freelancers/~01bf0229b72938bbb3"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative bg-[#14a800] hover:bg-[#0d7400] text-white px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl group"
                                        onMouseEnter={() => setIsHovering('upwork')}
                                        onMouseLeave={() => setIsHovering(false)}
                                   >
                                        <img src={UpworkIcon} alt="Upwork" className="w-5 h-5" />
                                        <span className="font-medium">Upwork</span>
                                        {isHovering === 'upwork' && (
                                             <motion.div
                                                  initial={{ opacity: 0, y: 10 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                                             >
                                                  Top Rated Plus
                                             </motion.div>
                                        )}
                                   </a>
                                   <a
                                        href="https://www.fiverr.com/sellers/adilsattar132/edit"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative bg-[#1dbf73] hover:bg-[#169c5e] text-white px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl group"
                                        onMouseEnter={() => setIsHovering('fiverr')}
                                        onMouseLeave={() => setIsHovering(false)}
                                   >
                                        <img src={FiverrIcon} alt="Fiverr" className="w-5 h-5" />
                                        <span className="font-medium">Fiverr</span>
                                        {isHovering === 'fiverr' && (
                                             <motion.div
                                                  initial={{ opacity: 0, y: 10 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                                             >
                                                  Level 2 Seller
                                             </motion.div>
                                        )}
                                   </a>
                                   <a
                                        href="#contact"
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl border border-white/20"
                                   >
                                        <HiOutlineMail className="text-xl" />
                                        <span className="font-medium">Hire Me</span>
                                   </a>
                              </motion.div>
                         </div>

                         {/* Right Column - 3D Model */}
                         <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8, duration: 0.8 }}
                              className="relative hidden md:block"
                         >
                              <div className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden transform transition-transform duration-700 hover:scale-[1.03] group">
                                   <ModelViewer modelPath={slide.model} />
                              </div>

                              {/* Profile Image Overlay - Enhanced */}
                              <motion.div
                                   whileHover={{ scale: 1.1, rotate: 5 }}
                                   className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl z-20 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500"
                              >
                                   <img
                                        src={ProfileImage}
                                        alt="Adil Sahito"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                              </motion.div>
                         </motion.div>
                    </div>
               </motion.div>

               {/* Social Links - Enhanced */}
               <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="fixed left-6 bottom-1/4 hidden lg:flex flex-col gap-6 z-30"
               >
                    <a
                         href="https://github.com/adilsattar1"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="relative group text-gray-200 hover:text-white transition-all duration-300 text-2xl hover:scale-125 transform"
                         aria-label="GitHub"
                    >
                         <FaGithub />
                         <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-black/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              50+ Projects
                         </span>
                    </a>
                    <a
                         href="https://linkedin.com/in/yourprofile"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="relative group text-gray-200 hover:text-white transition-all duration-300 text-2xl hover:scale-125 transform"
                         aria-label="LinkedIn"
                    >
                         <FaLinkedin />
                         <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-black/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Professional Network
                         </span>
                    </a>
                    <a
                         href="https://www.upwork.com/freelancers/~01bf0229b72938bbb3"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="relative group text-gray-200 hover:text-[#14a800] transition-all duration-300 text-2xl hover:scale-125 transform"
                         aria-label="Upwork"
                    >
                         <img src={UpworkIcon} alt="Upwork" className="w-6 h-6" />
                         <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-black/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Top Rated Plus
                         </span>
                    </a>
                    <a
                         href="https://www.fiverr.com/sellers/adilsattar132/edit"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="relative group text-gray-200 hover:text-[#1dbf73] transition-all duration-300 text-2xl hover:scale-125 transform"
                         aria-label="Fiverr"
                    >
                         <img src={FiverrIcon} alt="Fiverr" className="w-5 h-5" />
                         <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-black/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Level 2 Seller
                         </span>
                    </a>
                    <div className="h-16 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent mx-auto"></div>
               </motion.div>

               {/* Scroll Indicator - Enhanced */}
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center"
               >
                    <span className="text-gray-200 text-sm mb-2 tracking-wider">EXPLORE MY WORK</span>
                    <div className="relative h-12 w-12 flex items-center justify-center">
                         <motion.div
                              animate={{ y: [0, 10, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                         >
                              <FaArrowDown className="text-gray-200 text-xl" />
                         </motion.div>
                         <div className="absolute h-12 w-12 border-2 border-gray-200 rounded-full animate-ping opacity-20"></div>
                    </div>
               </motion.div>
          </div>
     );
};

export default HeroSection;