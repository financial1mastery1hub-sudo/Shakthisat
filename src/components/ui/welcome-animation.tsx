import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite } from 'lucide-react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
        />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.1
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(168, 85, 247, 0.4)",
                  "0 0 60px rgba(20, 184, 166, 0.6)",
                  "0 0 30px rgba(168, 85, 247, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Satellite className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              className="absolute -inset-4 rounded-full border border-purple-400/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.3, opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text">
              ShakthiSAT
            </span>
          </h1>

          <motion.div
            className="w-32 h-0.5 bg-gradient-to-r from-purple-500 to-teal-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        <motion.p
          className="mt-6 text-white/70 text-sm tracking-wider font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Empowering Girls in Space
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WelcomeAnimation;