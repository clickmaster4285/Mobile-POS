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

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar Section */}
      <TrustBarSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Scroll Animation Section - Your Custom Animation */}
      <ScrollAnimationSection />

      {/* About Section */}
      <AboutSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <CTASection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
