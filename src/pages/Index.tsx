
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import DeliverySection from '../components/DeliverySection';
import ReviewsSection from '../components/ReviewsSection';
import CompanySection from '../components/CompanySection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <DeliverySection />
      <ReviewsSection />
      <CompanySection />
      <Footer />
    </div>
  );
};

export default Index;
