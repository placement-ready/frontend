import Hero from '../../components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import CoreFeatures from '@/components/landing/CoreFeatures';
import Audience from '@/components/landing/Audience';
import CtaBanner from '@/components/landing/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CoreFeatures />
      <Audience />
      <CtaBanner />
    </>
  );
}
