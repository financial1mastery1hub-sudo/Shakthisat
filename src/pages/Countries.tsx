import { lazy, Suspense, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe as GlobeIcon } from 'lucide-react';

const InteractiveGlobe = lazy(() => import('@/components/ui/interactive-globe'));

const COUNTRIES = [
  'India', 'Albania', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Bahamas', 'Benin', 'Bolivia', 'Botswana', 'Brazil', 'UAE', 'Brunei',
  'Burkina Faso', 'Cameroon', 'Canada', 'Central African Republic', 'Chile',
  'Colombia', 'Costa Rica', 'Dominica', 'Egypt', 'Equatorial Guinea',
  'El Salvador', 'Saudi Arabia', 'Eswatini', 'Ethiopia', 'France',
  'Republic of Gabon', 'Gambia', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
  'Haiti', 'Honduras', 'Hungary', 'Qatar', 'Afghanistan', 'Indonesia',
  'Ireland', 'Italy', 'Ivory Coast', 'Jamaica', 'Jordan', 'Kenya',
  'Kyrgyzstan', 'Latvia', 'Lesotho', 'Liberia', 'Oman', 'Luxembourg',
  'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Malta', 'Mexico',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Kuwait',
  'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nigeria',
  'Guyana', 'Palau', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Bahrain', 'Portugal', 'Romania', 'Rwanda', 'Samoa', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovenia', 'South Africa',
  'Vietnam', 'Panama', 'Spain', 'Sri Lanka', 'St Lucia',
  'St Vincent and the Grenadines', 'St Kitts and Nevis', 'Tanzania',
  'Thailand', 'The Solomon Islands', 'Togo', 'Trinidad and Tobago', 'Tunisia',
  'Turkmenistan', 'Myanmar', 'Poland', 'Uganda', 'United Kingdom', 'Uruguay',
  'Uzbekistan', 'Zambia', 'Zimbabwe'
];

const Countries = () => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRIES;
    const searchTerm = search.toLowerCase();
    return COUNTRIES.filter(country =>
      country.toLowerCase().includes(searchTerm)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <GlobeIcon className="w-10 h-10 text-teal-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text">
              108 Countries
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-teal-500 mx-auto mb-6"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            ShakthiSAT Mission spans across 108 countries, empowering 12,000 girls globally
          </p>
        </motion.div>

        {/* Globe Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 bg-gradient-to-br from-purple-900/20 to-teal-900/20 rounded-3xl p-8 border border-purple-500/20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text">
            Interactive Globe
          </h2>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[600px] bg-black/30 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white/60">Loading 3D Globe...</p>
                </div>
              </div>
            }
          >
            <InteractiveGlobe
              width={1000}
              height={600}
              highlightCountries={COUNTRIES}
              className="mx-auto"
            />
          </Suspense>
          <p className="text-center text-white/60 text-sm mt-4">
            Countries highlighted in purple and teal represent ShakthiSAT participating nations
          </p>
        </motion.div>

        {/* Countries List Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-900/30 to-teal-900/30 rounded-3xl p-8 border border-purple-500/20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text">
            All Participating Countries
          </h2>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/60 transition-colors"
              />
            </div>
            {search && (
              <p className="text-center text-white/60 text-sm mt-2">
                Found {filteredCountries.length} of {COUNTRIES.length} countries
              </p>
            )}
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCountries.map((country, index) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.01, 0.5) }}
                className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:border-teal-500/40 transition-all hover:transform hover:scale-105 group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 group-hover:animate-pulse"></div>
                  <p className="text-white/90 text-sm font-medium">{country}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No countries found matching "{search}"</p>
            </div>
          )}

          {/* Summary */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl p-6 border border-purple-500/30">
              <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text mb-2">
                {COUNTRIES.length}
              </p>
              <p className="text-white/80">Countries United</p>
              <p className="text-white/60 text-sm mt-2">12,000 Girls • Infinite Possibilities</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Countries;