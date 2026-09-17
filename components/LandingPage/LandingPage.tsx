import ADABanner from "./ADABanner";
import AboutSection from "./AboutSection/AboutSection";
import ClientReviews from "./ClientReviews/ClientReviews";
import ContactPage from "./ContactSection/ContactPage";
import { EventPromoToast } from "./EventPromoToast";
import EventSection from "./EventSection/EventSection";
import FieldNotesSummary from "./FieldNotes/FieldNotesSummary";
import HeroSection from "./HeroSection/HeroSection";
import LandingAnimations from "./LandingAnimations";
import MissionSection from "./MissionSection/MissionSection";
import MobileNoticeDock from "./MobileNoticeDock";
import Navigation from "./Navigation/Navigation";
import Process from "./Proces/Process";
import ServicesSection from "./ServiceOfferings/ServicesSection";
import TeamSection from "./TeamSection/TeamSection";

const LandingPage = () => (
  <>
    <Navigation />
    <main id="main-content" className="relative overflow-x-clip" tabIndex={-1}>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Process />
      <ClientReviews />
      <MissionSection />
      <TeamSection />
      <EventSection />
      <FieldNotesSummary />
      <span className="sr-only">
        Innovare HP: Healthcare marketing and growth strategy. Primary content.
      </span>
    </main>
    <ContactPage />
    <LandingAnimations />
    <ADABanner />
    <EventPromoToast />
    <MobileNoticeDock />
  </>
);

export default LandingPage;
