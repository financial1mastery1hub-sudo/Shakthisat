import { useEffect, useRef, useState, memo } from 'react';
import * as d3 from 'd3';

interface InteractiveGlobeProps {
  width?: number;
  height?: number;
  className?: string;
  highlightCountries?: string[];
}

const InteractiveGlobe = memo(({
  width = 800,
  height = 600,
  className = '',
  highlightCountries = []
}: InteractiveGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const animationFrameRef = useRef<number>();
  const rotationRef = useRef([0, 0]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const containerWidth = Math.min(width, window.innerWidth - 40);
    const containerHeight = Math.min(height, window.innerHeight - 100);
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    let landFeatures: any = null;
    let highlightedFeatures: any[] = [];
    let autoRotate = true;
    const rotationSpeed = 0.3;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Globe background
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = '#000000';
      context.fill();
      context.strokeStyle = '#4A5568';
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule10();
        context.beginPath();
        path(graticule);
        context.strokeStyle = '#2D3748';
        context.lineWidth = 0.5 * scaleFactor;
        context.globalAlpha = 0.3;
        context.stroke();
        context.globalAlpha = 1;

        // All land masses (base)
        context.beginPath();
        landFeatures.features.forEach((feature: any) => {
          path(feature);
        });
        context.fillStyle = '#1A202C';
        context.fill();
        context.strokeStyle = '#4A5568';
        context.lineWidth = 0.5 * scaleFactor;
        context.stroke();

        // Highlighted countries
        if (highlightedFeatures.length > 0) {
          context.beginPath();
          highlightedFeatures.forEach((feature) => {
            path(feature);
          });
          context.fillStyle = 'rgba(168, 85, 247, 0.6)';
          context.fill();
          context.strokeStyle = '#14b8a6';
          context.lineWidth = 1.2 * scaleFactor;
          context.stroke();
        }
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
        );

        if (!response.ok) throw new Error('Failed to load country data');

        landFeatures = await response.json();

        // Find and store highlighted country features
        if (highlightCountries.length > 0) {
          const countrySet = new Set(highlightCountries.map(c => c.toLowerCase()));
          highlightedFeatures = landFeatures.features.filter((feature: any) => {
            const name = feature.properties?.NAME?.toLowerCase() || '';
            const admin = feature.properties?.ADMIN?.toLowerCase() || '';
            const name_long = feature.properties?.NAME_LONG?.toLowerCase() || '';

            return countrySet.has(name) || countrySet.has(admin) || countrySet.has(name_long);
          });
        }

        render();
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load map data');
        setIsLoading(false);
      }
    };

    const rotate = () => {
      if (autoRotate) {
        rotationRef.current[0] += rotationSpeed;
        projection.rotate([rotationRef.current[0], rotationRef.current[1]]);
        render();
      }
      animationFrameRef.current = requestAnimationFrame(rotate);
    };

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotationRef.current];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotationRef.current[0] = startRotation[0] + dx * sensitivity;
        rotationRef.current[1] = startRotation[1] - dy * sensitivity;
        rotationRef.current[1] = Math.max(-90, Math.min(90, rotationRef.current[1]));

        projection.rotate([rotationRef.current[0], rotationRef.current[1]]);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => {
          autoRotate = true;
        }, 100);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 2.5, projection.scale() * scaleFactor));
      projection.scale(newRadius);
      render();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    loadWorldData();
    animationFrameRef.current = requestAnimationFrame(rotate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [width, height, highlightCountries]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-black/50 rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">Error loading globe</p>
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
          <div className="text-white/80 text-sm">Loading globe...</div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <div className="absolute bottom-4 left-4 text-xs text-white/60 bg-black/70 px-3 py-1.5 rounded-md backdrop-blur-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
});

InteractiveGlobe.displayName = 'InteractiveGlobe';

export default InteractiveGlobe;
