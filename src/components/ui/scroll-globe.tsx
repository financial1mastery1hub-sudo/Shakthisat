import { useEffect, useRef, useState, useMemo } from "react";
import Globe from "@/components/ui/globe";

interface ScrollGlobeProps {
  sectionIds: string[];
  globeConfig?: {
    positions: {
      top: string;
      left: string;
      scale: number;
    }[];
  };
  className?: string;
}

const defaultGlobeConfig = {
  positions: [
    { top: "50%", left: "75%", scale: 1 },     // mission-hero - centered in mission
    { top: "50%", left: "75%", scale: 1.1 },   // mission-poster 
    { top: "40%", left: "25%", scale: 0.85 },  // what-shakthisat
    { top: "50%", left: "75%", scale: 1.1 },   // why-girls
    { top: "35%", left: "20%", scale: 0.9 },   // why-108
  ]
};

const parsePercent = (str: string): number => parseFloat(str.replace('%', ''));

function ScrollGlobe({ sectionIds, globeConfig = defaultGlobeConfig }: ScrollGlobeProps) {
  const [activeSection, setActiveSection] = useState(-1);  // Start hidden
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const observersRef = useRef<Map<string, IntersectionObserver>>(new Map());
  const sectionVisibilityRef = useRef<Map<string, boolean>>(new Map());
  
  const calculatedPositions = useMemo(() => {
    return globeConfig.positions.map(pos => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale
    }));
  }, [globeConfig.positions]);

  // Update scroll progress - throttled calculation
  useEffect(() => {
    let throttleTimer: NodeJS.Timeout;
    
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);
    };

    const handleScroll = () => {
      clearTimeout(throttleTimer);
      throttleTimer = setTimeout(updateProgress, 16); // ~60fps throttle
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(throttleTimer);
    };
  }, []);

  // Use IntersectionObserver for efficient section tracking
  useEffect(() => {
    const handleIntersection = (index: number) => (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries.some(entry => entry.isIntersecting);
      const sectionId = sectionIds[index];
      
      sectionVisibilityRef.current.set(sectionId, isIntersecting);
      
      // Find the most visible section
      let mostVisibleIndex = -1;
      let maxVisibility = 0;

      sectionVisibilityRef.current.forEach((isVisible, id) => {
        if (isVisible) {
          const idx = sectionIds.indexOf(id);
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const visibility = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisibleIndex = idx;
            }
          }
        }
      });

      setActiveSection(mostVisibleIndex);
      setIsVisible(mostVisibleIndex >= 0);
    };

    sectionIds.forEach((sectionId, index) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          handleIntersection(index),
          {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '0px'
          }
        );
        observer.observe(element);
        observersRef.current.set(sectionId, observer);
      }
    });

    return () => {
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current.clear();
    };
  }, [sectionIds]);

  // Get current position or default to mission overview center
  const currentPosition = activeSection >= 0 
    ? calculatedPositions[Math.min(activeSection, calculatedPositions.length - 1)]
    : calculatedPositions[0];  // Default to mission overview position

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-purple-500/20 z-50 pointer-events-none">
        <div 
          className="h-full bg-purple-500 will-change-transform"
          style={{ 
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left center',
            transition: 'transform 0.15s ease-out'
          }}
        />
      </div>

      {/* Globe - Background Positioning */}
      <div
        className="fixed pointer-events-none -z-10 will-change-transform transition-all ease-smooth"
        style={{
          top: `${currentPosition.top}%`,
          left: `${currentPosition.left}%`,
          transform: `translate(-50%, -50%) scale(${currentPosition.scale})`,
          transitionDuration: '1400ms',
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          pointerEvents: 'none',
        }}
      >
        <Globe />
      </div>
    </>
  );
}

export default ScrollGlobe;
