import Link from 'next/link';
import Icon from './Icons';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#contact' },
    { label: 'Demo', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { label: 'Facebook', href: '#facebook', icon: 'facebook' },
  { label: 'Twitter', href: '#twitter', icon: 'twitter' },
  { label: 'Instagram', href: '#instagram', icon: 'instagram' },
  { label: 'LinkedIn', href: '#linkedin', icon: 'linkedin' },
  { label: 'WhatsApp', href: 'https://wa.me/923325394285', icon: 'whatsapp' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/50 border-t border-border/50 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Clickmasters
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
              The #1 POS solution for mobile shops in Pakistan. Streamline your
              business with our powerful, easy-to-use point-of-sale system.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 bg-card border border-border/50 rounded-lg hover:border-amber/50 transition-all group shadow-sm hover:shadow-md"
                  aria-label={social.label}
                >
                  <div className="w-5 h-5 text-muted-foreground group-hover:text-amber transition-colors">
                    <Icon name={social.icon} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-card-foreground font-semibold mb-4 uppercase tracking-wider text-sm">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-amber transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-card-foreground font-semibold mb-4 uppercase tracking-wider text-sm">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-amber transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-card-foreground font-semibold mb-4 uppercase tracking-wider text-sm">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-amber transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Clickmasters. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>📞 0332-5394285</span>
            <span>✉️ sales.clickmasters.pk</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
