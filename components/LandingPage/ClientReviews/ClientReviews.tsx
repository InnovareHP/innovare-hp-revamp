import Image from "next/image";

const ClientReviews = () => {
  const reviews = [
    {
      quote:
        "Our organization's relationship with Innovare HP is rooted in a clear increase in revenue-driven by their innovative strategies, collaborative approach, and most importantly, the high-quality introductions they've facilitated. While we are technically a client of Innovare HP, the experience feels far more relational than transactional. They take the time to truly understand our goals, tailor their approach accordingly, and continually invest in our success. If you're looking for a marketing partner who shows up as part of your team and not just a vendor, Innovare HP is the one.",
      name: "Brian Caulfield",
      title: "CMO",
      company: "Centerline Billing & Consulting",
      headshot: "/images/client-reviews/headshot-2.png",
      logo: "/images/client-reviews/logo-1.png",
    },
    {
      quote:
        "What comes to mind when I think of Rich, he is amazing at marketing! All kinds of marketing. I have been in business for over 45 years, and he is the most cost-effective creative marketer I have ever worked with. If you need help building your business to higher profits, call Rich! don't waste your time anywhere else.",
      name: "Ken Watts",
      title: "Owner/Founder",
      company: "Helping with Mom's Home",
      headshot: "/images/client-reviews/headshot-1.png",
      logo: "/images/client-reviews/logo-2.png",
    },
    {
      quote:
        "I highly recommend Innovare HP! They made a significant difference in our success!",
      name: "Nadine Carlson",
      title: "Co-owner/Cofounder",
      company: "Care Provider Solutions",
      headshot: "/images/client-reviews/headshot-3.png",
      logo: "/images/client-reviews/logo-3.png",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Header + Brian Caulfield Review */}
        <div className="space-y-6">
          {/* Header Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight mb-6">
              CLIENT REVIEWS
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px] mb-8">
              Taking the lead in implementing brand-specific outreach strategies
              means advocating for and implementing effective methods to connect
              with a specific target audience or community, with the ultimate
              aim of achieving well-defined goals. Whether it&apos;s promoting a
              product or service, advocating for a cause, or cultivating
              relationships with referral partners, successful outreach plays a
              pivotal role in these endeavors. Here are some reviews from
              mission-based organizations that we have helped.
            </p>
          </div>

          {/* Brian Caulfield Review */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Sub-column - Headshot and Logo */}
            <div className="flex flex-row items-start gap-3">
              <Image
                src={reviews[0].headshot}
                alt={reviews[0].name}
                width={120}
                height={120}
                className="rounded-full object-cover shrink-0 w-[120px] h-[120px] mt-[18px]"
              />
              <Image
                src={reviews[0].logo}
                alt={`${reviews[0].company} logo`}
                width={182}
                height={182}
                className="object-contain shrink-0 w-[182px] h-[182px] min-w-[182px] min-h-[182px]"
              />
            </div>
            {/* Right Sub-column - Text Content */}
            <div className="space-y-4">
              <blockquote className="text-gray-700 leading-relaxed text-base lg:text-lg mb-4">
                &ldquo;{reviews[0].quote}&rdquo;
              </blockquote>
              <div className="space-y-0.5">
                <p className="font-bold text-blue-900 text-lg">
                  {reviews[0].name}
                </p>
                <p className="text-gray-700 text-base">{reviews[0].title}</p>
                <p className="text-gray-700 text-base">{reviews[0].company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Ken Watts + Nadine Carlson Reviews */}
        <div className="space-y-10">
          {/* Ken Watts Review */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Sub-column - Headshot and Logo */}
            <div className="flex flex-row items-start gap-3">
              <Image
                src={reviews[1].headshot}
                alt={reviews[1].name}
                width={120}
                height={120}
                className="rounded-full object-cover shrink-0 w-[120px] h-[120px] mt-[18px]"
              />
              <Image
                src={reviews[1].logo}
                alt={`${reviews[1].company} logo`}
                width={182}
                height={182}
                className="object-contain shrink-0 w-[182px] h-[182px] min-w-[182px] min-h-[182px]"
              />
            </div>
            {/* Right Sub-column - Text Content */}
            <div className="space-y-4">
              <blockquote className="text-gray-700 leading-relaxed text-base lg:text-lg mb-4">
                &ldquo;{reviews[1].quote}&rdquo;
              </blockquote>
              <div className="space-y-0.5">
                <p className="font-bold text-blue-900 text-lg">
                  {reviews[1].name}
                </p>
                <p className="text-gray-700 text-base">{reviews[1].title}</p>
                <p className="text-gray-700 text-base">{reviews[1].company}</p>
              </div>
            </div>
          </div>

          {/* Nadine Carlson Review */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Sub-column - Headshot and Logo */}
            <div className="flex flex-row items-start gap-3">
              <Image
                src={reviews[2].headshot}
                alt={reviews[2].name}
                width={120}
                height={120}
                className="rounded-full object-cover shrink-0 w-[120px] h-[120px] mt-[18px]"
              />
              <Image
                src={reviews[2].logo}
                alt={`${reviews[2].company} logo`}
                width={182}
                height={182}
                className="object-contain shrink-0 w-[182px] h-[182px] min-w-[182px] min-h-[182px]"
              />
            </div>
            {/* Right Sub-column - Text Content */}
            <div className="space-y-4">
              <blockquote className="text-gray-700 leading-relaxed text-base lg:text-lg mb-4">
                &ldquo;{reviews[2].quote}&rdquo;
              </blockquote>
              <div className="space-y-0.5">
                <p className="font-bold text-blue-900 text-lg">
                  {reviews[2].name}
                </p>
                <p className="text-gray-700 text-base">{reviews[2].title}</p>
                <p className="text-gray-700 text-base">{reviews[2].company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
