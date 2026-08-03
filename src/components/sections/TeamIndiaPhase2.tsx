import { motion } from 'framer-motion';
import { useRef } from 'react';

const TeamIndiaPhase2 = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className='relative min-h-screen py-24 px-4 md:px-8 overflow-hidden'
      id='team-india-phase2'
    >
      {/* ── Ambient Background Effects ── */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Deep space gradient */}
        <div className='absolute inset-0 ' />

        {/* Radial glow - top */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/8 rounded-full blur-[120px]' />

        {/* Radial glow - bottom */}
        <div className='absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-teal-500/6 rounded-full blur-[100px]' />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-purple-400/40 rounded-full'
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 14}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className='relative z-10 max-w-6xl mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className='text-center mb-14'
        >
          {/* Overline badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 backdrop-blur-sm'
          >
            <span className='relative flex h-2.5 w-2.5'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75' />
              <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400' />
            </span>
            <span className='text-sm font-medium tracking-wider text-purple-200 uppercase'>
              Phase 2 — Now Underway
            </span>
          </motion.div>

          {/* Main title */}
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight'>
            <span className='text-transparent font-bold text-transparent bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text'>
              Team India
            </span>
            <br />
            <span className='text-transparent bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-3xl md:text-4xl lg:text-5xl'>
              Representing the Nation
            </span>
          </h2>

          <p className='max-w-2xl mx-auto text-base md:text-lg text-white/60 leading-relaxed'>
            10 extraordinary young women from across India — from Gujarat to Nagaland, Kashmir to Tamil Nadu — 
            chosen to represent the nation at{' '}
            <span className='text-purple-300 font-medium'>Gautam Buddha University, Greater Noida</span>, 
            23<sup>rd</sup> – 31<sup>st</sup> August 2026.
          </p>
        </motion.div>

        {/* ── Image Showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true, margin: '-50px' }}
          className='relative group'
        >
          {/* Outer glow ring */}
          <div className='absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-purple-500/50 via-teal-400/30 to-purple-600/50 opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-sm' />

          {/* Glass card container */}
          <div className='relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10'>
            {/* Top shimmer bar */}
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent' />

            {/* Image with cinematic overlays */}
            <div className='relative'>
              {/* Corner gradient overlays for polish */}
              <div className='absolute inset-0  pointer-events-none' />
              <div className='absolute inset-0  pointer-events-none' />

              <img
                src='src/img/1.png'
                alt='Mission ShakthiSat Team India Phase 2 - 10 young women from across India selected for the national space mission at Gautam Buddha University, Greater Noida, August 23-31, 2026'
                className='w-full h-auto block transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]'
                loading='lazy'
                decoding='async'
              />
            </div>

            {/* Bottom shimmer bar */}
            <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent' />
          </div>
        </motion.div>

        {/* ── Bottom accent text ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-10 text-center'
        >
          <p className='text-white/40 text-sm md:text-base italic tracking-wide'>
            "One Mission. Ten States. A Nation United by the Stars."
          </p>

          {/* Decorative divider */}
          <div className='flex items-center justify-center gap-3 mt-6'>
            <div className='h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50' />
            <div className='w-1.5 h-1.5 rounded-full bg-purple-400/60' />
            <div className='h-px w-12 bg-gradient-to-l from-transparent to-teal-500/50' />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamIndiaPhase2;
