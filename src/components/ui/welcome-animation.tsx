import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Globe, Sparkles, Zap, Star, Satellite } from 'lucide-react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 800);
    const timer2 = setTimeout(() => setCurrentStep(2), 1800);
    const timer3 = setTimeout(() => setCurrentStep(3), 2800);
    const timer4 = setTimeout(() => setCurrentStep(4), 3500);
    const timer5 = setTimeout(() => onComplete(), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-black to-teal-900 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -100, -200],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${20 + i * 10}%`}
                y1={`${30 + i * 5}%`}
                x2={`${30 + i * 8}%`}
                y2={`${40 + i * 7}%`}
                stroke="url(#gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Logo Animation */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0, rotate: -360, y: 100 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              duration: 1.2 
            }}
          >
            <div className="relative">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-purple-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Glow */}
              <motion.div
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 flex items-center justify-center shadow-2xl relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(168, 85, 247, 0.8)",
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Satellite className="w-12 h-12 text-white" />
                </motion.div>
                
                {/* Orbiting Elements */}
                <motion.div
                  className="absolute w-4 h-4 bg-teal-400 rounded-full"
                  animate={{
                    rotate: 360,
                    x: [20, 0, -20, 0, 20],
                    y: [0, -20, 0, 20, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Title Animation */}
          <AnimatePresence mode="wait">
            {currentStep >= 1 && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-teal-300 bg-clip-text mb-2"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  ShakthiSAT
                </motion.h1>
                
                {/* Underline Animation */}
                <motion.div
                  className="w-32 h-1 bg-gradient-to-r from-purple-500 to-teal-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtitle Animation */}
          <AnimatePresence mode="wait">
            {currentStep >= 2 && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.p
                  className="text-xl md:text-3xl text-white/90 font-light"
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "0.1em", opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Empowering Girls in Space
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-purple-200 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  12,000 Girls • 108 Countries • ∞ Possibilities
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icons Animation */}
          <AnimatePresence mode="wait">
            {currentStep >= 3 && (
              <motion.div
                className="flex justify-center space-x-8 mb-12"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {[
                  { Icon: Globe, color: "from-blue-400 to-teal-400", delay: 0 },
                  { Icon: Sparkles, color: "from-purple-400 to-pink-400", delay: 0.2 },
                  { Icon: Rocket, color: "from-orange-400 to-red-400", delay: 0.4 },
                  { Icon: Star, color: "from-yellow-400 to-orange-400", delay: 0.6 },
                  { Icon: Zap, color: "from-green-400 to-teal-400", delay: 0.8 },
                ].map(({ Icon, color, delay }, index) => (
                  <motion.div
                    key={index}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                    initial={{ y: 100, opacity: 0, rotate: -180 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: delay + 1,
                        ease: "easeInOut" 
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mission Statement */}
          <AnimatePresence mode="wait">
            {currentStep >= 4 && (
              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-lg text-white/80 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  "Together, we explore the cosmos, break down barriers, and rise as the next generation of space leaders."
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Indicator */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </div>
            <motion.p
              className="text-white/60 text-sm mt-3 font-light tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing Mission Control...
            </motion.p>
          </motion.div>
        </div>

        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-white to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
              transform: 'rotate(45deg)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: [0, 200],
              y: [0, 200],
            }}
            transition={{
              duration: 1.5,
              delay: 2 + i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;