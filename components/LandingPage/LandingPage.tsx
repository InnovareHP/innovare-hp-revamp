import AboutSection from "./AboutSection/AboutSection";
import ContactPage from "./ContactSection/ContactPage";
import HeroSection from "./HeroSection/HeroSection";
import MissionSection from "./MissionSection/MissionSection";
import Navigation from "./Navigation/Navigation";
import OtherService from "./OtherService/OtherService";
import Partners from "./Partners/Partners";
import Process from "./Proces/Process";
import TeamSection from "./TeamSection/TeamSection";
import WhatWeDo from "./WhatWeDo/WhatWeDo";

const LandingPage = () => {
  return (
    //sequence not yet finalized
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <Partners />
      <Process />
      <WhatWeDo />
      <OtherService />
      <MissionSection />
      <TeamSection />
      <ContactPage />
    </main>
  );
};

export default LandingPage;
