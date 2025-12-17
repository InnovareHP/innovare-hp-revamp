import WorkWithUsButton from "@/components/ui/work-with-us-button";

const services = [
  {
    title: "DIGITAL STRATEGY & INTELLIGENT MARKETING EXECUTION",
    description:
      "We build digital systems that don't chase clicks — they build credibility, authority, and patient trust. From SEO and precision ad campaigns to content ecosystems and analytic dashboards, we drive growth rooted in insight, not guesswork. Every action is intentional. Every channel is aligned. Every dollar works harder, smarter, and with clinical-grade precision.",
    large: true,
  },
  {
    title: "COMMUNITY-BASED OUTREACH & REFERRAL DEVELOPMENT",
    description:
      "Healthcare is local, personal, and relational — so our work is too. We cultivate meaningful partnerships with physicians, senior living communities, hospitals, and service providers, ensuring your mission is known, felt, and trusted in the places decisions are made. We are boots-on-the-ground advocates building referral pipelines through relationships that last, not handshakes that fade.",
  },
  {
    title: "PUBLIC RELATIONS, THOUGHT LEADERSHIP & STORY CRAFTING",
    description:
      "Your story deserves more than a post — it deserves positioning. We transform your mission, voice, and expertise into consistent, influential communications that elevate your brand in the eyes of patients, families, and referral partners. From media features and reputation building to executive visibility and narrative strategy, we shape how the market sees you — with honesty, heart, and authority.",
  },
  {
    title: "EVENT PLANNING, PARTNERSHIPS & ACTIVATION",
    description:
      'We don\'t "host events" — we create connection environments. From community workshops and appreciation experiences to collaborative luncheons and professional roundtables, we make your organization a presence, not a billboard. Every event becomes a touchpoint for trust, strengthening relationships, sparking referrals, and planting communities of support.',
  },
  {
    title: "BESPOKE CAMPAIGNS DESIGNED FOR YOUR MARKET & METRICS",
    description:
      "No templates. No recycled ideas. Every campaign is purpose-built for your goals, your audience, your region, and your growth stage. We blend strategy, creativity, and market intelligence to produce campaigns that move the needle. Your mission is unique. Your marketing should be too.",
  },
  {
    title: "MARKETING TRAINING AND COACHING",
    description:
      "We empower your team with the knowledge and tools to sustain and scale your marketing efforts. Through strategic workshops, digital marketing fundamentals, and best practices training, we build internal capabilities and transform your staff into confident marketing champions.",
  },
];

const WhatWeDo = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 lg:px-12 xl:px-16 py-16">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 lg:mb-16 gap-4 sm:gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left text-blue-900">
            What we do
          </h2>
          <WorkWithUsButton />
        </div>

        <div className="space-y-8 lg:space-y-10 mx-0 sm:mx-4 md:mx-6 lg:mx-10">
          {services.map((service, index) => (
            <div key={index} className="space-y-4">
              <h3
                className={
                  "text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-blue-900"
                }
              >
                {service.title}
              </h3>

              <p
                className={
                  "text-base sm:text-lg lg:text-4xl leading-relaxed sm:leading-normal text-black font-sans font-normal"
                }
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
