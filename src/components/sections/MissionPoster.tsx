import { motion } from 'framer-motion';

const MissionPoster = () => {
  return (
    <section className='min-h-screen py-20 px-4 md:px-8' id='mission-poster'>
      

<div className='w-full'>

        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-10'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text'>
            TWO NATIONS. ONE VISION.
          </h2>
          <p className='text-lg text-white/90'>
            A proud partnership between India & Sri Lanka — inspiring girls, igniting futures.
          </p>
          
        </motion.div>



        <motion.div
            initial={{ opacity: 0 }}              
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className='relative rounded-3xl overflow-hidden w-full  mx-auto py-8'
            >
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none rounded-3xl' />

            <img
                src='src/img/shakthisat-srilanka-launch.jpeg'
                alt='Mission ShakthiSat ...'
                className='w-auto h-auto block mx-auto max-w-full'
                loading='eager'                               
                decoding='sync'                               
            />
       
        </motion.div>

     
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className='text-center text-white/50 text-sm mt-6 italic'
        >
          "Different Roots. One Future. Together, We Rise."
        </motion.p>

      </div>
    </section>
  );
};

export default MissionPoster;