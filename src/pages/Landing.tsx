
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import DemoSection from "@/components/landing/DemoSection";
import IntegrationSection from "@/components/landing/IntegrationSection";
import PricingSection from "@/components/landing/PricingSection";
import StatsSection from "@/components/landing/StatsSection";
import CTASection from "@/components/landing/CTASection";
import ReviewsWidget from "@/components/landing/ReviewsWidget";
import { useEffect } from "react";

export default function Landing() {
  // Add scroll animations
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe all sections
      document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
      });

      // Cleanup
      return () => {
        document.querySelectorAll('section').forEach((section) => {
          observer.unobserve(section);
        });
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <DemoSection />
      <TestimonialSection />
      <ReviewsWidget />
      <IntegrationSection />
      <PricingSection />
      <CTASection />

      <MainFooter />
    </div>
  );
}
