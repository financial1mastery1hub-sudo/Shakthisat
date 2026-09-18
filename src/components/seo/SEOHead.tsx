import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({ 
  title = "Mission ShakthiSat | Global Space Initiative Empowering 12,000 Girls from 108 Countries | Space Tech India Australia",
  description = "Mission ShakthiSat: Global space initiative empowering 12,000 girls from 108 countries including Australia, India, USA, UK. Leading space research, satellite missions, STEM education worldwide. Engineered by vectoraslab..com",
  keywords = "Mission ShakthiSat, ShakthiSat space mission, space tech India, space tech Australia, space research India, space research Australia, space organizations, satellite mission, STEM education girls, space exploration, girls in space, international space mission, Space Kidz India, Dr Srimathy Kesan, space technology, orbital satellites, space collaboration, space science education, aerospace startup India, space innovation Australia, space mission Australia, space education Australia, satellite technology, space program, space agency, space industry, aerospace engineering, space science, women in space, space leadership, NewSpace, commercial space",
  image = "https://shakthisat.com/img/shakthisat.png",
  url,
  type = "website",
  author = "Space Kidz India - Dr. Srimathy Kesan",
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const location = useLocation();
  const currentUrl = url || `https://shakthisat.com${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);
      
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Mission ShakthiSat', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@ShakthiSat');
    updateMetaTag('twitter:creator', '@SpaceKidzIndia');

    // Additional SEO meta tags
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('bingbot', 'index, follow');
    
    // Article meta tags (if applicable)
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', currentUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', currentUrl);
      document.head.appendChild(canonical);
    }

    // Add JSON-LD structured data for current page
    const addStructuredData = (data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    // Page-specific structured data
    if (location.pathname === '/') {
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Mission ShakthiSat",
        "alternateName": ["ShakthiSat", "Space Kidz India"],
        "url": "https://shakthisat.com",
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://shakthisat.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "sameAs": [
          "https://www.linkedin.com/company/space-kidz-india",
          "https://twitter.com/SpaceKidzIndia",
          "https://www.facebook.com/SpaceKidzIndia"
        ]
      });
    }

  }, [title, description, keywords, image, currentUrl, type, author, publishedTime, modifiedTime, location.pathname]);

  return null;
};

export default SEOHead;
