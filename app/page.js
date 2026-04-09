import ScrollAnimationSection from '../components/ScrollAnimationSection';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustBarSection from '../components/TrustBarSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import ReviewsSection from '../components/ReviewsSection';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

// =============================================================================
// CLICKMASTERS POS LANDING PAGE
// =============================================================================
// Modern, professional, and responsive landing page for Clickmasters POS system.
// Features GSAP scroll animations, smooth transitions, and clean UI/UX.
//
// SECTIONS:
// 1. Navbar - Fixed navigation with mobile menu
// 2. Hero - Full-screen hero with CTA and trust indicators
// 3. Trust Bar - Partner logos and key statistics
// 4. Features - Why Choose Us with animated feature cards
// 5. Scroll Animation - Your custom scroll-controlled animation (CENTER)
// 6. About - Our Story timeline
// 7. Reviews - Client testimonials carousel
// 8. CTA - Bold call-to-action section
// 9. FAQ - Frequently asked questions accordion
// 10. Contact - Contact form with company info
// 11. Footer - Social links, navigation, and branding
// =============================================================================

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Dark Theme */}
      <div data-nav-theme="dark">
        <HeroSection />
      </div>

      {/* Trust Bar Section - Light Theme */}
      <div data-nav-theme="light">
        <TrustBarSection />
      </div>

      {/* Features Section - Light Theme */}
      <div data-nav-theme="light">
        <FeaturesSection />
      </div>

      {/* Scroll Animation Section - Dark Theme */}
      <div data-nav-theme="dark">
        <ScrollAnimationSection />
      </div>

      {/* About Section - Light Theme */}
      <div data-nav-theme="light">
        <AboutSection />
      </div>

      {/* Reviews Section - Light Theme */}
      <div data-nav-theme="light">
        <ReviewsSection />
      </div>

      {/* CTA Section - Light Theme */}
      <div data-nav-theme="light">
        <CTASection />
      </div>

      {/* FAQ Section - Light Theme */}
      <div data-nav-theme="light">
        <FAQSection />
      </div>

      {/* Contact Section - Light Theme */}
      <div data-nav-theme="light">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
