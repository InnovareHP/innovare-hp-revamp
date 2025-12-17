import Navigation from "../Navigation/Navigation";

const FieldNotes = () => {
  const partners = [
    {
      id: 1,
      category: "Hospice That Leads With Humanity",
      organization: "THE MEDICAL TEAM Hospice – Kalamazoo & Grand Rapids",
      links: [
        {
          url: "https://medicalteam.com/hospice",
          label: "medicalteam.com/hospice",
        },
      ],
      content: [
        "Hospice care reveals the truth of an organization very quickly. There is no room for pretense when families are facing loss.",
        "THE MEDICAL TEAM Hospice operates with a level of presence and collaboration that extends far beyond clinical responsibility. Their teams work closely with assisted living communities, adult foster care homes, hospitals, and families—often long before hospice services are officially needed.",
        "What distinguishes them is not just expertise, but consistency. Education without pressure. Support without urgency. Trust built over time. In community healthcare, that approach makes all the difference.",
      ],
      image:
        "https://images.unsplash.com/photo-1706806594967-44e2b31f01d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageCredit: "Unsplash",
    },
    {
      id: 2,
      category: "Behavioral Health Rooted in Stability and Dignity",
      organization: "Three Rivers Behavioral Health",
      links: [{ url: "https://trbhcares.com", label: "trbhcares.com" }],
      content: [
        "Behavioral health care is most effective when it balances structure with compassion. Three Rivers Behavioral Health understands this intersection well.",
        "Serving individuals who require inpatient psychiatric support, their team is intentional about creating an environment where safety, dignity, and continuity of care are prioritized. Equally important is their collaboration with hospitals, referral partners, and community providers—ensuring that care does not stop at discharge.",
        "In a space where transitions are often fragile, Three Rivers plays a stabilizing role, helping patients and partners navigate complex moments with clarity and respect.",
      ],
      image:
        "https://images.unsplash.com/photo-1675179177247-47515757e62e?q=80&w=1183&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageCredit: "Unsplash",
    },
    {
      id: 3,
      category: "Adult Foster Care That Is Intentionally Designed",
      organization: "Grace Communities: Ada Grace & Cascading Grace",
      links: [
        { url: "https://adagraceafc.com", label: "adagraceafc.com" },
        { url: "https://cascadinggrace.com", label: "cascadinggrace.com" },
      ],
      content: [
        "Adult foster care is often misunderstood—reduced to square footage and compliance checklists. Grace Communities offers a different model, one grounded in intention, calm, and dignity.",
        "Through Ada Grace and Cascading Grace, care is delivered in environments that feel personal rather than procedural. These homes emphasize routine, relationship, and familiarity, while maintaining strong collaboration with hospice providers, healthcare partners, and families.",
        "What stands out most is the understanding that home is not defined by structure, but by how safe and respected someone feels inside it.",
      ],
      // Note: No image link was provided in the prompt for this section,
      // so we leave it null or use a placeholder.
      image: null,
    },
    {
      id: 4,
      category: "Pharmacy Support That Strengthens Continuity of Care",
      organization: "Advanced Health Pharmacy",
      links: [
        {
          url: "https://advancedhealthpharmacymi.com/",
          label: "advancedhealthpharmacymi.com",
        },
      ],
      content: [
        "Medication management is one of the most overlooked—but most critical—components of successful care transitions.",
        "Advanced Health Pharmacy supports patients, families, and care teams by ensuring accuracy, accessibility, and clear communication around complex medication regimens. Their role becomes especially vital for individuals navigating behavioral health needs, chronic conditions, or transitions into senior care environments.",
        "By working closely with providers and care settings, Advanced Health Pharmacy helps reduce gaps, prevent errors, and reinforce continuity—quietly strengthening outcomes where precision matters most.",
      ],
      image:
        "https://images.unsplash.com/photo-1664382953518-4a664ab8a8c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageCredit: "Unsplash",
    },
    {
      id: 5,
      category: "Financial Infrastructure That Protects Care Delivery",
      organization: "Centerline Medical Billing",
      links: [
        {
          url: "https://centerlinebilling.com",
          label: "centerlinebilling.com",
        },
      ],
      content: [
        "Few people associate billing with community impact, yet its influence is undeniable.",
        "Centerline Medical Billing supports mental health and substance use treatment providers by strengthening revenue systems that allow care teams to remain focused on patients—not paperwork. Their work stabilizes organizations that often operate under intense reimbursement pressure.",
        "When billing functions properly, access to care expands quietly. When it does not, the consequences ripple quickly. Centerline’s role may be behind the scenes, but its impact is felt across entire care networks.",
      ],
      image: null,
    },
    {
      id: 6,
      category: "When Housing and Healthcare Intersect",
      organization: "Helping with Mom’s Home",
      links: [
        {
          url: "https://helpingwithmomshome.com",
          label: "helpingwithmomshome.com",
        },
      ],
      content: [
        "Care transitions are rarely just clinical—they are logistical, emotional, and deeply personal.",
        "Helping with Mom’s Home addresses one of the most overlooked barriers families face: what to do with a home when care decisions become urgent. By offering an ethical, low-stress way to sell during transition periods, they remove a burden that often delays or complicates care.",
        "It may not be traditionally labeled as healthcare—but it directly impacts access, timing, and peace of mind when families need it most.",
      ],
      image: null,
    },
  ];

  return (
    <section id="field-notes" className="pt-20">
      <Navigation isFieldNotes={true} />
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white font-sans text-gray-800">
        {/* --- HEADER SECTION --- */}

        <header className="mb-12 border-b pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            The Organizations Quietly Rewriting Community Healthcare
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-6">
            By Rich Nollen, BSN, RN
          </p>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700">
            <p>
              After years at the bedside—and now years working alongside
              healthcare organizations in the community—one thing has become
              clear to me: outcomes improve when relationships come first.
            </p>
            <div className="pl-4 border-l-4 border-blue-500 italic text-gray-600 my-4">
              <p>Not protocols alone.</p>
              <p>Not platforms.</p>
              <p>Not perfectly worded mission statements.</p>
            </div>
            <p>
              Healthcare works when people feel supported, understood, and
              connected across every transition point. The partners highlighted
              here understand that healthcare isn’t just delivered—it’s
              experienced. Through hospice, adult foster care, behavioral
              health, billing infrastructure, and transition support, these
              organizations are shaping community care in ways that don’t always
              show up neatly in metrics, but are felt deeply by the people they
              serve.
            </p>
          </div>
        </header>

        {/* --- MAPPED ARTICLES SECTION --- */}
        <div className="space-y-16">
          {partners.map((partner) => (
            <article key={partner.id} className="flex flex-col gap-6">
              {/* Conditional Rendering: Only show image container if image exists */}
              {partner.image && (
                <figure className="w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-md relative group">
                  <img
                    src={partner.image}
                    alt={partner.category}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </figure>
              )}

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-blue-900">
                  {partner.category}
                </h2>

                <div className="mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {partner.organization}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-1">
                    {partner.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map over content paragraphs */}
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {partner.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 mt-4" />
            </article>
          ))}
        </div>

        {/* --- FOOTER / SUMMARY SECTION --- */}
        <footer className="mt-16 bg-gray-50 p-8 rounded-xl border border-gray-100">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What These Partners Share
            </h3>
            <p className="mb-4 text-gray-700">
              These organizations differ in size, service lines, and
              structure—but they share a common approach:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>They prioritize relationships over reach.</li>
              <li>They collaborate rather than compete.</li>
              <li>
                They understand that trust is built long before a referral is
                made.
              </li>
            </ul>
            <p className="mt-4 text-gray-700 font-medium">
              In a system often driven by speed and scale, these partners choose
              consistency and connection.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why This Matters
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Healthcare’s future will not be defined solely by technology or
              efficiency. It will be shaped by organizations willing to invest
              in community—by showing up, staying present, and doing the work
              that rarely gets recognized publicly.
              <br />
              <br />
              The partners highlighted here are doing exactly that. Quietly.
              Thoughtfully. And with lasting impact.
              <br />
              <br />
              <span className="font-semibold text-blue-900">
                That is how community healthcare earns its name—through
                relationships that hold long after the moment of care has
                passed.
              </span>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FieldNotes;
