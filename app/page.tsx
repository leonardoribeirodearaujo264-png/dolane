import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SignatureTouches from '@/components/home/SignatureTouches';
import BeforeAfter from '@/components/home/BeforeAfter';
import Gallery from '@/components/home/Gallery';
import Reviews from '@/components/home/Reviews';
import ServiceArea from '@/components/home/ServiceArea';
import CTASection from '@/components/home/CTASection';
import QuoteSection from '@/components/home/QuoteSection';
import FAQ from '@/components/home/FAQ';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <SignatureTouches />
      <BeforeAfter />
      <Gallery />
      <Reviews />
      <ServiceArea />
      <CTASection />
      <QuoteSection />
      <FAQ />
      <ContactSection />
    </>
  );
}
