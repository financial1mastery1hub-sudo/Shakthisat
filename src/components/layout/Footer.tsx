import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import DonationButton from '../ui/donation-button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Partners', path: '/partners' },
    { name: 'About Us', path: '/about' },
    { name: 'Advisors', path: '/advisors' },
    { name: 'Countries', path: '/countries' },
    { name: 'Devis', path: '/devis' },
    { name: 'Patrons', path: '/patrons-of-honor' },
  ];

  return (
    <footer className="relative z-10 bg-black/90 border-t border-purple-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className='flex flex-grow justify-center sm:justify-start'>
                <img 
                  src="https://raw.githubusercontent.com/financial1mastery1hub-sudo/Shakthisat/main/src/img/shakthisat.png" 
                  className="w-1/2"
                  alt="Mission ShakthiSat - Space Kidz India Logo"
                  title="Mission ShakthiSat - Empowering 12,000 Girls from 108 Countries"
                />
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-6" itemProp="description">
              Empowering 12,000 girls from 108 countries including Australia, India, USA, UK through real-time satellite projects.
              Building bridges across cultures through STEM and space collaboration worldwide.
            </p>

            <div className="flex items-center space-x-4 text-white/60">
              <div className="flex items-center space-x-2">
                <Globe size={16} />
                <span className="text-sm">Global Initiative</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-sm">108 Countries</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/70 hover:text-purple-300 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section Updated */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <div className="space-y-3">
              
              {/* Address */}
              <div className="flex items-start space-x-2 text-white/70">
                <MapPin size={16} className="mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Shambala Facility, Ispahani Centre,<br />
                  123–124, Nungambakkam High Rd,<br />
                  Thousand Lights West,<br />
                  Chennai, Tamil Nadu 600034
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2 text-white/70">
                <Mail size={16} />
                <span className="text-sm">care@shakthisat.com</span>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-2 text-white/70">
                <Phone size={16} />
                <span className="text-sm">+91 8122412261</span>
              </div>

              {/* Donation Button */}
              <div className='pt-5'>
                <DonationButton />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm" itemProp="copyrightNotice">
            © {currentYear} ShakthiSAT Mission. All rights reserved. Join the mission to inspire the next generation of space leaders
          </p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-white/60 text-sm">Empowering Girls in Space</span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"></div>
            <span className="text-white/60 text-sm">Global STEM Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
