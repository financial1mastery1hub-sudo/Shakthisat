import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1000);
    const timer2 = setTimeout(() => setCurrentStep(2), 2000);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                                  radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }} 
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Logo Animation */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.3, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              duration: 1.5 
            }}
          >
            <motion.div
              className="relative w-80 h-80 mx-auto"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.img
                src="https://raw.githubusercontent.com/financial1mastery1hub-sudo/Shakthisat/main/src/img/shakthisat1.png"
                alt="ShakthiSAT Logo"
                className="w-full h-full object-contain"
                initial={{ filter: "brightness(0.7)" }}
                animate={{
                  filter: [
                    "brightness(0.7) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
                    "brightness(1) drop-shadow(0 0 40px rgba(255, 255, 255, 0.5))",
                    "brightness(0.7) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
                  ],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Subtitle Animation */}
          <AnimatePresence mode="wait">
            {currentStep >= 1 && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.p
                  className="text-2xl md:text-3xl text-silver font-light tracking-wide"
                  style={{ color: '#C0C0C0' }}
                  initial={{ letterSpacing: "0.3em", opacity: 0 }}
                  animate={{ letterSpacing: "0.1em", opacity: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  Empowering Girls in Space
                </motion.p>
                <motion.div
                  className="w-32 h-0.5 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mt-4"
                  style={{ background: 'linear-gradient(90deg, transparent, #C0C0C0, transparent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.p
                  className="text-lg md:text-xl mt-4"
                  style={{ color: '#A0A0A0' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  12,000 Girls • 108 Countries • ∞ Possibilities
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Section */}
          <AnimatePresence mode="wait">
            {currentStep >= 2 && (
              <motion.div
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Silver Loading Bar */}
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #808080 0%, #C0C0C0 25%, #E8E8E8 50%, #C0C0C0 75%, #808080 100%)",
                      boxShadow: "0 0 10px rgba(192, 192, 192, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)"
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                
                {/* Loading Text */}
                <motion.div
                  className="flex justify-between items-center mt-3 text-xs"
                  style={{ color: '#A0A0A0' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span>0%</span>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-light tracking-wider"
                  >
                    Initializing Mission...
                  </motion.span>
                  <span>100%</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle Glow Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;