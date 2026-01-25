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
        bgImageSrc="/img/shakthisat.png"
        mediaSrc="https://raw.githubusercontent.com/financial1mastery1hub-sudo/Shakthisat/main/src/img/video.mp4"
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
