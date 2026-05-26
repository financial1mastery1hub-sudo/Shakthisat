import { motion } from 'framer-motion';
import { Rocket, Globe, Users } from 'lucide-react';
import ScrollGlobe from '@/components/ui/scroll-globe';
import { useEffect, useState } from 'react';

const MissionOverview = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && <ScrollGlobe sectionIds={['mission-hero', 'mission-poster', 'what-shakthisat', 'why-girls', 'why-108']} />}
      <section className='min-h-screen py-20 px-4 md:px-8' id='mission-hero' itemScope itemType="https://schema.org/Project">
        <meta itemProp="name" content="Mission ShakthiSat Overview" />
        <meta itemProp="description" content="Global space mission empowering 12,000 girls from 108 countries through satellite technology and STEM education" />
        
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            {/* Content Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='space-y-6'
            >
              {/* Title Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='bg-purple-900/40 rounded-2xl p-8 border border-purple-500/30'
              >
                <h2 className='text-4xl md:text-5xl font-bold text-purple-300 mb-4' itemProp="headline">
                  MISSION OVERVIEW
                </h2>
                <p className='text-lg md:text-xl text-white/90' itemProp="about">
                  ShakthiSAT is a global mission to empower 12,000 girls from 108 countries through real-time satellite projects.
                </p>
              </motion.div>

              {/* Description Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className='bg-purple-900/30 rounded-2xl p-8 border border-purple-500/20'
              >
                <p className='text-base md:text-lg text-white/80 leading-relaxed mb-6' itemProp="description">
                  The mission sets out on a bold journey to spark curiosity, courage, and a lifelong passion for STEM and space exploration in 12,000 brilliant young girls from 108 nations.
                </p>
                <p className='text-base md:text-lg text-white/80 leading-relaxed'>
                  Together, we explore the cosmos, break down barriers, and rise as the next generation of space leaders who will boldly shape the future among the stars.
                </p>
              </motion.div>

              {/* Stats Cards */}
              <div className='grid grid-cols-3 gap-4'>
                {[
                  {
                    icon: Users,
                    number: '12,000',
                    label: 'Girls',
                    color: 'from-purple-400 to-purple-600'
                  },
                  {
                    icon: Globe,
                    number: '108',
                    label: 'Countries',
                    color: 'from-teal-400 to-teal-600'
                  },
                  {
                    icon: Rocket,
                    number: '∞',
                    label: 'Possibilities',
                    color: 'from-purple-400 to-teal-400'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='bg-black/60 rounded-xl p-4 border border-purple-500/20 text-center group hover:border-purple-500/40 transition-all'
                  >
                    <div className='w-10 h-10 mx-auto mb-2 rounded-full bg-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform'>
                      <item.icon className='w-5 h-5 text-white' />
                    </div>
                    <h3 className='text-2xl font-bold text-white'>{item.number}</h3>
                    <p className='text-xs md:text-sm text-purple-200'>{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Globe Animation Space */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='hidden lg:flex items-center justify-center h-screen'
            >
              {/* Empty space for globe animation */}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MissionOverview;