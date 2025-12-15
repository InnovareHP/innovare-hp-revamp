import { Button } from "@/components/ui/button";

const WhatWeDo = () => {
  return (
    <section className="w-full bg-white py-12 lg:py-16 xl:py-20">
      <div className="container mx-auto px-8 lg:px-12 xl:px-16">
        {/* Header with title and button */}
        <div className="flex flex-row justify-between items-center mb-12 lg:mb-16 gap-6 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-blue-900 leading-[1.3] font-sans font-bold">
            What we do
          </h2>
          <Button
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-50 hover:text-blue-500 rounded-none px-6 py-3 text-sm font-normal uppercase tracking-wide cursor-pointer"
          >
            WORK WITH US
          </Button>
        </div>

        {/* Services List - Centered */}
        <div className="space-y-8 lg:space-y-10 max-w-5xl mx-auto">
          {/* Service 1 */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-blue-900 font-bold uppercase leading-[1.3] font-sans">
              DIGITAL STRATEGY & INTELLIGENT MARKETING EXECUTION
            </h3>
            <p className="text-lg lg:text-xl leading-[1.9] text-black font-sans font-normal">
              We build digital systems that don&apos;t chase clicks — they build
              credibility, authority, and patient trust. From SEO and precision
              ad campaigns to content ecosystems and analytic dashboards, we drive
              growth rooted in insight, not guesswork. Every action is intentional.
              Every channel is aligned. Every dollar works harder, smarter, and
              with clinical-grade precision.
            </p>
          </div>

          {/* Service 2 */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-blue-900 font-bold uppercase leading-[1.3] font-sans">
              COMMUNITY-BASED OUTREACH & REFERRAL DEVELOPMENT
            </h3>
            <p className="text-lg lg:text-xl leading-[1.9] text-black font-sans font-normal">
              Healthcare is local, personal, and relational — so our work is too.
              We cultivate meaningful partnerships with physicians, senior living
              communities, hospitals, and service providers, ensuring your mission
              is known, felt, and trusted in the places decisions are made. We are
              boots-on-the-ground advocates building referral pipelines through
              relationships that last, not handshakes that fade.
            </p>
          </div>

          {/* Service 3 */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-blue-900 font-bold uppercase leading-[1.3] font-sans">
              PUBLIC RELATIONS, THOUGHT LEADERSHIP & STORY CRAFTING
            </h3>
            <p className="text-lg lg:text-xl leading-[1.9] text-black font-sans font-normal">
              Your story deserves more than a post — it deserves positioning. We
              transform your mission, voice, and expertise into consistent,
              influential communications that elevate your brand in the eyes of
              patients, families, and referral partners. From media features and
              reputation building to executive visibility and narrative strategy, we
              shape how the market sees you — with honesty, heart, and authority.
            </p>
          </div>

          {/* Service 4 */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-blue-900 font-bold uppercase leading-[1.3] font-sans">
              EVENT PLANNING, PARTNERSHIPS & ACTIVATION
            </h3>
            <p className="text-lg lg:text-xl leading-[1.9] text-black font-sans font-normal">
              We don&apos;t &quot;host events&quot; — we create connection
              environments. From community workshops and appreciation experiences
              to collaborative luncheons and professional roundtables, we make your
              organization a presence, not a billboard. Every event becomes a
              touchpoint for trust, strengthening relationships, sparking referrals,
              and planting communities of support.
            </p>
          </div>

          {/* Service 5 */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-blue-900 font-bold uppercase leading-[1.3] font-sans">
              BESPOKE CAMPAIGNS DESIGNED FOR YOUR MARKET & METRICS
            </h3>
            <p className="text-lg lg:text-xl leading-[1.9] text-black font-sans font-normal">
              No templates. No recycled ideas. Every campaign is purpose-built for
              your goals, your audience, your region, and your growth stage. We
              blend strategy, creativity, and market intelligence to produce
              campaigns that move the needle. Your mission is unique. Your marketing
              should be too.
            </p>
          </div>

          {/* Service 6 */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-blue-900 font-bold uppercase leading-[1.3] font-sans">
              MARKETING TRAINING AND COACHING
            </h3>
            <p className="text-lg lg:text-xl leading-[1.9] text-black font-sans font-normal">
              We empower your team with the knowledge and tools to sustain and scale
              your marketing efforts. Through strategic workshops, digital marketing
              fundamentals, and best practices training, we build internal
              capabilities and transform your staff into confident marketing
              champions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;

