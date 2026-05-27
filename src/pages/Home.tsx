import { useEffect } from 'react';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import MissionOverview from '../components/sections/MissionOverview';
import WhatIsShakthiSat from '../components/sections/WhatIsShakthiSat';
import WhyGirlsInSpace from '../components/sections/WhyGirlsInSpace';
import Why108Countries from '../components/sections/Why108Countries';
import MissionPoster from '../components/sections/MissionPoster';

// SEO-optimized content component
const ShakthiSatContent = () => {
  return (
    <div className='space-y-0' itemScope itemType="https://schema.org/Project">
      <meta itemProp="name" content="Mission ShakthiSat" />
      <meta itemProp="description" content="Global space initiative empowering 12,000 girls from 108 countries through real-time satellite projects and STEM education" />
      <meta itemProp="url" content="https://shakthisat.com" />
      <meta itemProp="image" content="https://shakthisat.com/img/shakthisat.png" />
      
      <MissionOverview />
      <WhatIsShakthiSat />
      <WhyGirlsInSpace />
      <Why108Countries />
      <MissionPoster />
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO: Update page title for global reach
    document.title = "Mission ShakthiSat | Global Space Initiative | Space Tech India Australia | 12,000 Girls 108 Countries";
    
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <main className='min-h-screen bg-black overflow-x-hidden' role="main">
      {/* SEO: Hidden structured data for better indexing */}
      <div style={{ display: 'none' }}>
        <h1>Mission ShakthiSat - Global Premier Space Mission</h1>
        <p>Empowering 12,000 girls from 108 countries including Australia, India, USA, UK through space technology, satellite missions, and STEM education. Leading space research and innovation globally.</p>
        <span>Keywords: Mission ShakthiSat, space mission, ShakthiSat, space tech India, space tech Australia, satellite technology, STEM education, space research, girls in space, aerospace startup, space organizations, international space mission, space collaboration, space innovation, space education Australia, space education India, space program, space agency, space industry, women in space, space leadership, space entrepreneurship, NewSpace, commercial space, space technology development, space research organization, satellite development, aerospace engineering, space science research, space exploration program, global space initiative, space STEM education, space sector, aerospace industry, space companies, space ventures, space projects, space engineering, space manufacturing, space economy, space business, space enterprise, space investment, space innovation hub, space ecosystem, space community, space future, space vision, space mission management, space operations, space systems, space platforms, space vehicles, space exploration mission, space discovery, space science mission, space technology mission</span>
      </div>
      
      <ScrollExpandMedia
        mediaType='video'
        bgImageSrc="/img/shakthisat.png"
        mediaSrc="https://raw.githubusercontent.com/financial1mastery1hub-sudo/Shakthisat/main/src/img/video.mp4"
        date='Global Space Initiative'
        scrollToExpand='Scroll to Expand & Explore'
        useAnimatedShader={true}
        use3DBackground={false}
      >
        <ShakthiSatContent />
      </ScrollExpandMedia>
    </main>
  );
};

export default Home;
