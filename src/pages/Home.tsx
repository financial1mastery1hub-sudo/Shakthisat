import { useEffect } from 'react';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import MissionOverview from '../components/sections/MissionOverview';
import WhatIsShakthiSat from '../components/sections/WhatIsShakthiSat';
import WhyGirlsInSpace from '../components/sections/WhyGirlsInSpace';
import Why108Countries from '../components/sections/Why108Countries';

const ShakthiSatContent = () => {
  return (
    <div className='space-y-0'>
      <MissionOverview />
      <WhatIsShakthiSat />
      <WhyGirlsInSpace />
      <Why108Countries />
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen bg-black overflow-x-hidden'>
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc='https://www.youtube.com/watch?v=vU6PDFdgf8k&t=6s'
        bgImageSrc='https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1920&auto=format&fit=crop'
        title='ShakthiSAT Mission'
        date='Global Space Initiative'
        scrollToExpand='Scroll to Expand & Explore'
        textBlend={false}
        useAnimatedShader={true}
        use3DBackground={false}
      >
        <ShakthiSatContent />
      </ScrollExpandMedia>
    </div>
  );
};

export default Home;