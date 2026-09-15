"use client";

import PillButton from "@/components/LandingPage/shared/PillButton";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "digital-strategy",
    number: "01",
    title: "Digital Strategy & Intelligent Marketing Execution",
    description:
      "We build data-driven digital strategies that strengthen credibility, build trust, and drive measurable growth. From SEO and targeted campaigns to content and analytics, every channel works smarter and with purpose.",
  },
  {
    id: "community-outreach",
    number: "02",
    title: "Community-Based Outreach & Referral Development",
    description:
      "Healthcare is built on relationships. We develop meaningful connections with physicians, hospitals, senior living communities, and service providers to strengthen your presence and build lasting referral pipelines.",
  },
  {
    id: "public-relations",
    number: "03",
    title: "Public Relations, Thought Leadership & Story Crafting",
    description:
      "We turn your mission and expertise into powerful positioning. Through strategic communications, reputation building, media, and executive visibility, we shape how patients, families, and partners see your organization.",
  },
  {
    id: "event-planning",
    number: "04",
    title: "Event Planning, Partnerships & Activation",
    description:
      "We create meaningful experiences that bring communities and organizations together. Every event is designed to build trust, strengthen relationships, and create opportunities for connection and referrals.",
  },
  {
    id: "bespoke-campaigns",
    number: "05",
    title: "Bespoke Campaigns For Your Market & Goals",
    description:
      "No templates. No recycled ideas. Every campaign is built around your audience, market, goals, and growth stage — combining strategy, creativity, and insight to deliver measurable impact.",
  },
  {
    id: "training-coaching",
    number: "06",
    title: "Marketing Training & Coaching",
    description:
      "We equip your team with the knowledge and tools to sustain growth. Through workshops, training, and practical guidance, we help turn your staff into confident marketing champions.",
  },
];

const ServicesSection = () => (
  <section
    id="services"
    aria-label="Our services"
    className="bg-surface-2 py-16 sm:py-20 lg:py-[49px] lg:pt-[49px] lg:pb-[100px]"
  >
    <div className="hp-container">
      <SectionBadge number="02" className="w-fit">
        Our services
      </SectionBadge>

      <div
        data-anim="stagger"
        className="mt-8 grid gap-6 lg:mt-[74px] lg:grid-cols-2 lg:gap-16"
      >
        <h2
          data-anim="lines"
          className="max-w-[446px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink"
        >
          Healthcare Marketing &amp; Growth Strategy
        </h2>

        <p className="max-w-[393px] self-center text-base leading-[25px] text-ink sm:text-lg lg:justify-self-end">
          From strategy to execution, we bring marketing, relationships, and
          growth together.{" "}
          <Link
            href="#contact"
            className="font-semibold text-brand hover:text-brand-deep"
          >
            Let&rsquo;s find the right strategy.
          </Link>
        </p>
      </div>

      <Accordion.Root
        type="single"
        collapsible
        data-anim="stagger"
        className="mt-10 border-t border-hairline lg:mt-[54px]"
      >
        {services.map((service) => (
          <Accordion.Item
            key={service.id}
            value={service.id}
            className="border-b border-hairline"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center gap-4 py-7 text-left sm:gap-8 lg:py-12">
                <span className="w-[54px] shrink-0 text-[clamp(2.25rem,5vw,4rem)] leading-none font-bold text-brand lg:w-[117px]">
                  {service.number}
                </span>
                <span className="flex-1 text-[clamp(1.25rem,3.2vw,2.25rem)] leading-[1.2] font-medium text-ink">
                  {service.title}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-6 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-data-[state=open]:rotate-90 sm:size-8"
                  strokeWidth={2.4}
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="pb-10 sm:pl-[86px] lg:pl-[149px]">
                <p className="max-w-[650px] text-base leading-[25px] text-ink sm:text-lg">
                  {service.description}
                </p>
                <PillButton
                  href="#contact"
                  title="Work With Us"
                  srHint="(navigate to contact section)"
                  className="mt-6"
                >
                  Work with us
                </PillButton>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  </section>
);

export default ServicesSection;
