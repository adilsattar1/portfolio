import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaStar } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { RiCodeSSlashLine } from 'react-icons/ri';
import UpworkIcon from '../../assets/upwork.png';
import FiverrIcon from '../../assets/fiverr.png';

const Footer = () => {
     const currentYear = new Date().getFullYear();

     return (
          <div className="relative w-full overflow-hidden bg-gradient-to-b from-transparent to-[rgba(10,5,15,0.9)]">
               {/* Particle Background */}
               <div className="absolute inset-0 z-0 opacity-20">
                    {[...Array(30)].map((_, i) => (
                         <motion.div
                              key={i}
                              className="absolute rounded-full bg-purple-400"
                              style={{
                                   width: Math.random() * 5 + 1,
                                   height: Math.random() * 5 + 1,
                                   left: `${Math.random() * 100}%`,
                                   top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                   y: [0, Math.random() * 40 - 20],
                                   x: [0, Math.random() * 40 - 20],
                                   opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                   duration: Math.random() * 10 + 5,
                                   repeat: Infinity,
                                   repeatType: 'reverse',
                              }}
                         />
                    ))}
               </div>

               {/* Main Footer Content */}
               <motion.footer
                    className="relative z-10 backdrop-blur-lg bg-[rgba(10,5,15,0.7)] border-t border-purple-900/20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
               >
                    <div className="container mx-auto px-6 py-12">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                              {/* About Section */}
                              <motion.div
                                   initial={{ y: 20, opacity: 0 }}
                                   whileInView={{ y: 0, opacity: 1 }}
                                   transition={{ delay: 0.1 }}
                                   viewport={{ once: true }}
                                   className="space-y-4"
                              >
                                   <div className="flex items-center gap-2">
                                        <RiCodeSSlashLine className="text-purple-400 text-xl" />
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                                             Adil Sahito
                                        </h3>
                                   </div>
                                   <p className="text-gray-300 text-sm leading-relaxed">
                                        Crafting exceptional digital experiences with modern technologies. Focused on clean code and intuitive interfaces.
                                   </p>
                                   <div className="flex gap-4">
                                        {[...Array(5)].map((_, i) => (
                                             <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                   </div>
                              </motion.div>

                              {/* Quick Links */}
                              <motion.div
                                   initial={{ y: 20, opacity: 0 }}
                                   whileInView={{ y: 0, opacity: 1 }}
                                   transition={{ delay: 0.2 }}
                                   viewport={{ once: true }}
                                   className="space-y-4"
                              >
                                   <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                                   <ul className="space-y-3">
                                        {['Home', 'Work', 'About', 'Skills', 'Contact'].map((item) => (
                                             <li key={item}>
                                                  <a
                                                       href={`#${item.toLowerCase()}`}
                                                       className="text-gray-300 hover:text-purple-300 text-sm transition-colors flex items-center gap-2"
                                                  >
                                                       <span className="w-2 h-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                       {item}
                                                  </a>
                                             </li>
                                        ))}
                                   </ul>
                              </motion.div>

                              {/* Services */}
                              <motion.div
                                   initial={{ y: 20, opacity: 0 }}
                                   whileInView={{ y: 0, opacity: 1 }}
                                   transition={{ delay: 0.3 }}
                                   viewport={{ once: true }}
                                   className="space-y-4"
                              >
                                   <h3 className="text-lg font-semibold text-white">Services</h3>
                                   <ul className="space-y-3">
                                        {[
                                             'Web Development',
                                             'Mobile Apps',
                                             'UI/UX Design',
                                             'API Integration',
                                             'Consulting'
                                        ].map((service) => (
                                             <li key={service}>
                                                  <div className="text-gray-300 text-sm flex items-center gap-2">
                                                       <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                                       {service}
                                                  </div>
                                             </li>
                                        ))}
                                   </ul>
                              </motion.div>

                              {/* Contact & Socials */}
                              <motion.div
                                   initial={{ y: 20, opacity: 0 }}
                                   whileInView={{ y: 0, opacity: 1 }}
                                   transition={{ delay: 0.4 }}
                                   viewport={{ once: true }}
                                   className="space-y-4"
                              >
                                   <h3 className="text-lg font-semibold text-white">Let's Connect</h3>
                                   <div className="space-y-3">
                                        <a
                                             href="mailto:your.email@example.com"
                                             className="flex items-center gap-3 text-gray-300 hover:text-purple-300 text-sm transition-colors"
                                        >
                                             <HiOutlineMail className="text-xl" />
                                             adil@example.com
                                        </a>

                                        <div className="flex gap-4 pt-2">
                                             <a
                                                  href="https://github.com/adilsattar1"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-gray-300 hover:text-white text-xl transition-colors"
                                             >
                                                  <FaGithub />
                                             </a>
                                             <a
                                                  href="https://linkedin.com"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-gray-300 hover:text-blue-400 text-xl transition-colors"
                                             >
                                                  <FaLinkedin />
                                             </a>
                                             <a
                                                  href="https://www.upwork.com"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-gray-300 hover:text-green-500 transition-colors"
                                             >
                                                  <img src={UpworkIcon} alt="Upwork" className="w-5 h-5" />
                                             </a>
                                             <a
                                                  href="https://www.fiverr.com"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-gray-300 hover:text-green-400 transition-colors"
                                             >
                                                  <img src={FiverrIcon} alt="Fiverr" className="w-4 h-4" />
                                             </a>
                                        </div>

                                        <div className="pt-4">
                                             <a
                                                  href="#contact"
                                                  className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                                             >
                                                  Hire Me
                                             </a>
                                        </div>
                                   </div>
                              </motion.div>
                         </div>

                         {/* Copyright */}
                         <motion.div
                              className="border-t border-purple-900/30 mt-12 pt-6 text-center text-gray-400 text-sm"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              viewport={{ once: true }}
                         >
                              <p>© {currentYear} Adil Sahito. All rights reserved.</p>
                              <p className="mt-1">Built with React & Tailwind CSS</p>
                         </motion.div>
                    </div>
               </motion.footer>
          </div>
     );
};

export default Footer;