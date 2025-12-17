import ContactInfoCard from "./ContactInfoCard";
import ContactSection from "./ContactSection";

const ContactPage = () => {
  return (
    <div id="contact" className="container mx-auto p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 max-w-6xl mx-auto">
        <div className="lg:sticky lg:top-8 self-start">
          <ContactInfoCard />
        </div>

        <div>
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
