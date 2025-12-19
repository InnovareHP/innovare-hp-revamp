import { LinkedInPost } from "@/lib/types";
import AboutSection from "./AboutSection/AboutSection";
import ClientReviews from "./ClientReviews/ClientReviews";
import ContactPage from "./ContactSection/ContactPage";
import HeroSection from "./HeroSection/HeroSection";
import MissionSection from "./MissionSection/MissionSection";
import Navigation from "./Navigation/Navigation";
import OtherService from "./OtherService/OtherService";
import Partners from "./Partners/Partners";
import Process from "./Proces/Process";
import TeamSection from "./TeamSection/TeamSection";
import WhatWeAreTalkingAbout from "./WhatWeAreTalkingAbout/WhatWeAreTalkingAbout";
import WhatWeDo from "./WhatWeDo/WhatWeDo";

const LandingPage = ({ posts }: { posts: LinkedInPost[] }) => {
  return (
    //sequence not yet finalized
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <Partners />
      <Process />
      <WhatWeDo />
      <WhatWeAreTalkingAbout posts={posts} />
      <OtherService />
      <MissionSection />
      <TeamSection />
      <ClientReviews />
      <ContactPage />
    </main>
  );
};

export default LandingPage;
