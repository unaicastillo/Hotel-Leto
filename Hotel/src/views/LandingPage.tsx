import { Header } from '../components/layout/Header';
import { Hero } from '../components/landing/Hero';
import RoomsSection from '../components/landing/RoomsSection';
import GastronomySection from '../components/landing/GastronomySection';
import EventsSection from '../components/landing/EventSection';
import HistorySection from '../components/landing/HistorySection';
import NewsletterSection from '../components/landing/NewsletterSection';
import Footer from '../components/layout/Footer';
import "../styles/global.css";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] transition-colors duration-300">
      <Header />

      <Hero />
      
      {/* <BookingWidget /> */}
      <RoomsSection />
      <GastronomySection />
      <EventsSection />
      <HistorySection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default LandingPage;