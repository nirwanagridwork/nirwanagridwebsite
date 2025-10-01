import { Mail, Instagram, Facebook, Send, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Footer = ({ activeSection, setActiveSection }: FooterProps) => {
  const quickLinks = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Product', section: 'product' },
    { name: 'Tech', section: 'tech' },
    { name: 'Contact', section: 'contact' }
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:support@nirwanagrid.com',
      label: 'Email'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/nirwanagrid?igsh=azhlMGt1dHBkemMz',
      label: 'Instagram'
    },
    {
      icon: Facebook,
      href: 'https://www.facebook.com/share/1DYicrLHEB/?mibextid=wwXIfr',
      label: 'Facebook'
    },
    {
      icon: Send,
      href: 'https://t.me/NirwanaGrid',
      label: 'Telegram'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/nirwanagrid-private-limited-8a6969381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      label: 'LinkedIn'
    },
    {
      icon: Twitter,
      href: 'https://x.com/nirwanagrid?s=11',
      label: 'X (Twitter)'
    }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              {/* Logo removed */}
              <div>
                <h3 className="text-xl font-bold text-primary">NirwanaGrid Private Limited</h3>
                <p className="text-sm text-muted-foreground">Zero Effort. Peaceful Living.</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transforming homes into smart, efficient living spaces with innovative 
              energy management solutions that prioritize safety, sustainability, and simplicity.
            </p>
            
            {/* Support Email */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-2">Support Email:</p>
              <a 
                href="mailto:support@nirwanagrid.com"
                className="text-primary hover:text-primary-dark transition-colors duration-200"
              >
                support@nirwanagrid.com
              </a>
            </div>

            {/* Social Media Links */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Follow Us:</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 social-link"
                      title={social.label}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.section)}
                    className={`text-left w-full transition-colors duration-200 ${
                      activeSection === link.section 
                        ? 'text-primary font-medium' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Company</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">NirwanaGrid Private Limited</p>
                <p className="text-xs text-muted-foreground">Smart Energy Solutions</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Innovation • Sustainability • Safety
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span className="text-xs text-muted-foreground">Zero Effort Living</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs text-muted-foreground">Smart Automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span className="text-xs text-muted-foreground">Energy Efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} NirwanaGrid Private Limited. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;