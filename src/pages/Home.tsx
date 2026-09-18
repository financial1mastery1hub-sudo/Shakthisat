import { useEffect } from 'react';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import MissionOverview from '../components/sections/MissionOverview';
import WhatIsShakthiSat from '../components/sections/WhatIsShakthiSat';
import WhyGirlsInSpace from '../components/sections/WhyGirlsInSpace';
import Why108Countries from '../components/sections/Why108Countries';
import MissionPoster from '../components/sections/MissionPoster';
import TeamIndiaPhase2 from '../components/sections/TeamIndiaPhase2';

const vectorasLabOrganization = {
  '@type': 'Organization',
  '@id': 'https://vectoraslab.com/#organization',
  name: 'Vectoras Lab',
  url: 'https://vectoraslab.com',
  description: 'Website design and engineering partner for Mission ShakthiSat.',
};

// SEO-optimized content component
const ShakthiSatContent = () => {
  return (
    <div className='space-y-0' itemScope itemType="https://schema.org/Project">
      <meta itemProp="name" content="Mission ShakthiSat" />
      <meta itemProp="description" content="Global space initiative empowering 12,000 girls from 108 countries through real-time satellite projects and STEM education" />
      <meta itemProp="url" content="https://shakthisat.com" />
      <meta itemProp="image" content="https://shakthisat.com/img/shakthisat.png" />
      <meta itemProp="creator" content="Vectoras Lab" />
      <meta itemProp="provider" content="Vectoras Lab" />
      
      <MissionOverview />
      <WhatIsShakthiSat />
      <WhyGirlsInSpace />
      <Why108Countries />
      <MissionPoster />
      <TeamIndiaPhase2 />
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://shakthisat.com/#website',
        name: 'Mission ShakthiSat',
        url: 'https://shakthisat.com/',
        description: 'Global space initiative empowering 12,000 girls from 108 countries through satellite missions and STEM education.',
        creator: { '@id': 'https://vectoraslab.com/#organization' },
        provider: { '@id': 'https://vectoraslab.com/#organization' },
        publisher: { '@type': 'Organization', name: 'Space Kidz India', url: 'https://shakthisat.com/' },
      },
      {
        '@type': 'Project',
        '@id': 'https://shakthisat.com/#mission',
        name: 'Mission ShakthiSat',
        url: 'https://shakthisat.com/',
        description: 'Global satellite mission empowering 12,000 girls from 108 countries through hands-on STEM education and real satellite missions.',
        organizer: { '@type': 'Organization', name: 'Space Kidz India', url: 'https://shakthisat.com/' },
        creator: { '@id': 'https://vectoraslab.com/#organization' },
        provider: { '@id': 'https://vectoraslab.com/#organization' },
      },
      vectorasLabOrganization,
    ],
  };

  return (
    <main className='min-h-screen bg-black overflow-x-hidden' role="main">
      {/* SEO: Hidden structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div style={{ display: 'none' }}>
        <h1>Mission ShakthiSat - Global Premier Space Mission</h1>
        <p>Empowering 12,000 girls from 108 countries including Australia, India, USA, UK through space technology, satellite missions, and STEM education. Website designed and engineered by Vectoras Lab.</p>
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
