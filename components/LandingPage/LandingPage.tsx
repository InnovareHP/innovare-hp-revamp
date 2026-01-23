import { LinkedInPost } from "@/lib/types";
import AboutSection from "./AboutSection/AboutSection";
import ClientReviews from "./ClientReviews/ClientReviews";
import ContactPage from "./ContactSection/ContactPage";
import EventSection from "./EventSection/EventSection";
import HeroSection from "./HeroSection/HeroSection";
import MissionSection from "./MissionSection/MissionSection";
import Navigation from "./Navigation/Navigation";
import Partners from "./Partners/Partners";
import Process from "./Proces/Process";
import TeamSection from "./TeamSection/TeamSection";
import WhatWeAreTalkingAbout from "./WhatWeAreTalkingAbout/WhatWeAreTalkingAbout";
import WhatWeDo from "./WhatWeDo/WhatWeDo";

const LandingPage = async ({ posts }: { posts: Promise<LinkedInPost[]> }) => {
  return (
    <>
      <Navigation />
      {/*sequence not yet finalized*/}
      <main id="main-content" className="relative" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <EventSection />
        <Partners />
        <Process />
        <WhatWeDo />
        <WhatWeAreTalkingAbout initialPosts={posts} />
        {/* <OtherService /> */}
        <MissionSection />
        <TeamSection />
        <ClientReviews />
        <ContactPage />
      </main>
    </>
  );
};

export default LandingPage;
