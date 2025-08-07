import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ✨ Enhanced Glass Card with Hover Effects
const LightGlassCard = ({ children, className = '' }) => (
     <motion.div
          className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/15 ${className}`}
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
     >
          {children}
     </motion.div>
);

// 🌟 Professional Journey Data with Icons
const professionalJourney = [
     {
          role: "Senior Frontend Developer",
          company: "Tech Innovators Inc.",
          period: "2022 - Present",
          description: "Leading the development of a new design system and migrating legacy applications to a modern Next.js stack. Mentoring junior developers and improving frontend performance by 30%.",
          icon: "🚀",
          color: "from-indigo-500 to-purple-500"
     },
     {
          role: "Mid-Level React Developer",
          company: "Creative Solutions LLC",
          period: "2020 - 2022",
          description: "Developed and maintained several large-scale React applications for enterprise clients. Collaborated with UI/UX designers to implement pixel-perfect interfaces.",
          icon: "💡",
          color: "from-cyan-500 to-blue-500"
     },
     {
          role: "Junior Web Developer",
          company: "Digital Start Co.",
          period: "2019 - 2020",
          description: "Assisted in building and maintaining client websites using HTML, CSS, and JavaScript. Gained foundational experience in version control and web accessibility.",
          icon: "🌱",
          color: "from-emerald-500 to-teal-500"
     }
];

// 🌈 Gradient Background Component
const GradientBackground = () => (
     <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] animate-spin-slow">
               <div className="absolute top-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-indigo-300/70 blur-3xl"></div>
               <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-cyan-300/70 blur-3xl"></div>
          </div>
     </div>
);

// 🎯 The Enhanced Journey Section
const JourneySectionLight = () => {
     const ref = useRef(null);
     const { scrollYProgress } = useScroll({
          target: ref,
          offset: ["start end", "end start"]
     });

     // Dynamic transformations based on scroll
     const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
     const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.05]);
     const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -10]);

     return (
          <section
               id="journey-light"
               className="py-28 relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 overflow-hidden"
               ref={ref}
          >
               <GradientBackground />

               <div className="container mx-auto px-6 relative z-10">
                    {/* ✨ Enhanced Animated Title */}
                    <motion.div
                         initial={{ opacity: 0, y: 40 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                         viewport={{ once: true, margin: "-100px" }}
                         className="text-center mb-20"
                         style={{ scale: titleScale, y: titleY }}
                    >
                         <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-600">
                              My Professional Journey
                         </h2>
                         <motion.p
                              className="text-gray-600 text-lg max-w-3xl mx-auto"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.8 }}
                              viewport={{ once: true }}
                         >
                              From my first lines of code to leading complex projects, here's a timeline of my growth and experience.
                         </motion.p>
                    </motion.div>

                    <div className="relative max-w-2xl mx-auto">
                         {/* 🌟 Animated Timeline Line with Glow */}
                         <motion.div
                              className="absolute left-4 top-0 w-1.5 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-full shadow-lg shadow-indigo-400/30"
                              style={{ height: lineHeight }}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                         />

                         <div className="space-y-16">
                              {professionalJourney.map((item, index) => {
                                   const delay = index * 0.15;

                                   return (
                                        <motion.div
                                             key={index}
                                             className="pl-12 relative group"
                                             initial={{ opacity: 0, x: -20 }}
                                             whileInView={{ opacity: 1, x: 0 }}
                                             transition={{
                                                  duration: 0.7,
                                                  delay,
                                                  ease: [0.16, 1, 0.3, 1]
                                             }}
                                             viewport={{ once: true, margin: "-50px" }}
                                        >
                                             {/* ✨ Enhanced Timeline Marker with Icon */}
                                             <motion.div
                                                  className={`absolute left-4 top-2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 ${item.color.replace('from-', 'bg-gradient-to-br from-')}`}
                                                  whileHover={{ rotate: 15 }}
                                             >
                                                  <span className="text-sm">{item.icon}</span>
                                             </motion.div>

                                             <LightGlassCard className="p-8 hover:border-white/30">
                                                  <div className="flex justify-between items-start mb-3">
                                                       <motion.h3
                                                            className="font-bold text-2xl text-gray-900"
                                                            whileHover={{ x: 5 }}
                                                       >
                                                            {item.role}
                                                       </motion.h3>
                                                       <motion.span
                                                            className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/80 text-gray-700 border border-gray-200"
                                                            whileHover={{ scale: 1.05 }}
                                                       >
                                                            {item.period}
                                                       </motion.span>
                                                  </div>

                                                  <motion.p
                                                       className={`text-lg font-medium mb-4 bg-clip-text text-transparent ${item.color.replace('from-', 'bg-gradient-to-r from-')}`}
                                                       whileHover={{ x: 3 }}
                                                  >
                                                       {item.company}
                                                  </motion.p>

                                                  <motion.p
                                                       className="text-gray-700 leading-relaxed"
                                                       initial={{ opacity: 0 }}
                                                       whileInView={{ opacity: 1 }}
                                                       transition={{ delay: delay + 0.2 }}
                                                       viewport={{ once: true }}
                                                  >
                                                       {item.description}
                                                  </motion.p>
                                             </LightGlassCard>
                                        </motion.div>
                                   );
                              })}
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default JourneySectionLight;