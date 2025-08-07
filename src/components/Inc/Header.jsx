import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
     FiHome,
     FiBriefcase,
     FiUser,
     FiTool,
     FiMail,
     FiMenu,
     FiX
} from 'react-icons/fi';

const Header = () => {
     const [activeSection, setActiveSection] = useState('home');
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

     const { scrollY } = useScroll();
     const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
     const borderWidth = useTransform(scrollY, [0, 100], [0, 1]);

     useEffect(() => {
          const unsubscribe = scrollY.on("change", () => {
               // This effect is just for setting up the scroll listener
               // The actual scroll values are handled by useTransform
          });
          return () => unsubscribe();
     }, [scrollY]);

     const navItems = [
          { id: 'home', label: 'Home', icon: <FiHome size={18} /> },
          { id: 'work', label: 'Work', icon: <FiBriefcase size={18} /> },
          { id: 'about', label: 'About', icon: <FiUser size={18} /> },
          { id: 'skills', label: 'Skills', icon: <FiTool size={18} /> },
          { id: 'contact', label: 'Contact', icon: <FiMail size={18} /> }
     ];

     const handleNavClick = (section) => {
          setActiveSection(section);
          setIsMobileMenuOpen(false);
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
     };

     return (
          <>
               {/* Minimal Desktop Header */}
               <motion.header
                    className="hidden md:block fixed top-0 left-0 w-full z-50 bg-[rgba(10,5,15,0.3)] backdrop-blur-lg"
                    style={{
                         opacity: headerOpacity,
                         borderBottomWidth: borderWidth,
                         borderColor: 'rgba(168, 85, 247, 0.1)',
                         position: 'fixed'
                    }}
               >
                    <div className="container mx-auto px-6 py-4">
                         <div className="flex justify-between items-center">
                              <motion.div
                                   className="text-xl font-medium"
                                   whileHover={{ scale: 1.05 }}
                              >
                                   <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                                        PORTFOLIO
                                   </span>
                              </motion.div>

                              <nav>
                                   <ul className="flex space-x-1">
                                        {navItems.map((item) => (
                                             <li key={item.id}>
                                                  <motion.button
                                                       onClick={() => handleNavClick(item.id)}
                                                       className={`px-4 py-2 text-sm flex items-center gap-2 relative
                        ${activeSection === item.id ? 'text-purple-300' : 'text-gray-400 hover:text-gray-200'}
                      `}
                                                       whileHover={{ y: -2 }}
                                                       whileTap={{ scale: 0.95 }}
                                                  >
                                                       <span className={`transition-colors ${activeSection === item.id ? 'text-purple-400' : ''}`}>
                                                            {item.icon}
                                                       </span>
                                                       <span>{item.label}</span>
                                                       {activeSection === item.id && (
                                                            <motion.span
                                                                 className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 rounded-full"
                                                                 layoutId="navUnderline"
                                                                 transition={{ type: 'spring', stiffness: 500 }}
                                                            />
                                                       )}
                                                  </motion.button>
                                             </li>
                                        ))}
                                   </ul>
                              </nav>
                         </div>
                    </div>
               </motion.header>

               {/* Mobile Bottom Navigation */}
               <motion.nav
                    className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-[rgba(20,10,30,0.7)] backdrop-blur-xl rounded-xl shadow-lg border border-purple-900 border-opacity-50 z-50"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
               >
                    <ul className="flex justify-around p-2">
                         {navItems.map((item) => (
                              <motion.li
                                   key={item.id}
                                   className="flex-1"
                                   whileTap={{ scale: 0.9 }}
                              >
                                   <button
                                        onClick={() => handleNavClick(item.id)}
                                        className={`w-full py-3 flex flex-col items-center text-xs relative ${activeSection === item.id ? 'text-purple-300' : 'text-gray-400'
                                             }`}
                                   >
                                        <div className="relative">
                                             {activeSection === item.id && (
                                                  <motion.div
                                                       className="absolute inset-0 bg-purple-800 rounded-full blur-md opacity-30"
                                                       layoutId="mobileActiveBg"
                                                       transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                  />
                                             )}
                                             <span className="relative z-10 block">
                                                  {item.icon}
                                             </span>
                                        </div>
                                        <motion.span
                                             className="mt-1 relative z-10"
                                             animate={{
                                                  opacity: activeSection === item.id ? 1 : 0.7,
                                             }}
                                        >
                                             {item.label}
                                        </motion.span>
                                        {activeSection === item.id && (
                                             <motion.div
                                                  className="absolute -top-2 left-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                                                  layoutId="mobileActiveDot"
                                                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                             />
                                        )}
                                   </button>
                              </motion.li>
                         ))}
                    </ul>
               </motion.nav>

               {/* Mobile Menu Overlay */}
               <AnimatePresence>
                    {isMobileMenuOpen && (
                         <motion.div
                              className="md:hidden fixed inset-0 z-50 bg-[rgba(5,0,15,0.8)] backdrop-blur-lg"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                         >
                              <button
                                   className="absolute top-6 right-6 z-50 p-2 rounded-full bg-purple-900 bg-opacity-50 border border-purple-800"
                                   onClick={() => setIsMobileMenuOpen(false)}
                                   whileHover={{ scale: 1.1 }}
                                   whileTap={{ scale: 0.9 }}
                              >
                                   <FiX className="text-purple-300 text-xl" />
                              </button>

                              <div className="relative z-10 h-full flex flex-col justify-center px-8">
                                   <ul className="space-y-6">
                                        {navItems.map((item) => (
                                             <motion.li
                                                  key={item.id}
                                                  initial={{ x: -40, opacity: 0 }}
                                                  animate={{ x: 0, opacity: 1 }}
                                                  transition={{ delay: 0.1 * navItems.indexOf(item), type: 'spring' }}
                                             >
                                                  <button
                                                       className={`w-full text-left text-2xl font-medium py-4 flex items-center gap-4 ${activeSection === item.id ? 'text-purple-300' : 'text-gray-400 hover:text-purple-200'
                                                            }`}
                                                       onClick={() => handleNavClick(item.id)}
                                                  >
                                                       <span className={`p-2 rounded-full ${activeSection === item.id
                                                            ? 'bg-purple-900 bg-opacity-50'
                                                            : 'bg-[rgba(30,20,40,0.5)]'
                                                            }`}>
                                                            {item.icon}
                                                       </span>
                                                       <span>{item.label}</span>
                                                       {activeSection === item.id && (
                                                            <motion.div
                                                                 className="absolute right-0 w-1 h-8 bg-purple-500 rounded-l-full"
                                                                 layoutId="mobileMenuActive"
                                                                 transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                            />
                                                       )}
                                                  </button>
                                             </motion.li>
                                        ))}
                                   </ul>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               {/* Mobile Menu Trigger */}
               <motion.button
                    className="md:hidden fixed top-4 right-4 w-14 h-14 rounded-full z-40 flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-600 to-purple-800"
                    onClick={() => setIsMobileMenuOpen(true)}
                    whileHover={{
                         scale: 1.1,
                         boxShadow: '0 0 20px rgba(192, 132, 252, 0.5)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
               >
                    <FiMenu className="text-purple-100 text-xl" />
               </motion.button>
          </>
     );
};

export default Header;