import AboutSection from "./AboutSection/AboutSection";
import ContactPage from "./ContactSection/ContactPage";
import HeroSection from "./HeroSection/HeroSection";
import Navigation from "./Navigation/Navigation";
import Partners from "./Partners/Partners";
import Process from "./Proces/Process";
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
      <ContactPage />
    </main>
  );
};

export default LandingPage;
