import clsx from "clsx";
import { motion } from "framer-motion";

const Button = ({ id, title, rightIcon, leftIcon, containerClass, onClick }) => {
  return (
    <motion.button
      id={id}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-purple-700 hover:to-indigo-700",
        containerClass
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="relative flex items-center justify-center gap-2">
        {leftIcon}
        <span className="font-general text-sm font-semibold uppercase tracking-wider">
          {title}
        </span>
        {rightIcon}
      </div>
    </motion.button>
  );
};

export default Button;