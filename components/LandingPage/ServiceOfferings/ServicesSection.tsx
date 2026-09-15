"use client";

import PillButton from "@/components/LandingPage/shared/PillButton";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import SectionSeam from "@/components/LandingPage/shared/SectionSeam";
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
    className="relative bg-surface-2 py-16 sm:py-20 lg:py-[49px] lg:pt-[49px] lg:pb-[100px]"
  >
    <SectionSeam from="from-surface-1" />

    {/* From `lg` the intro parks on the left while the service list scrolls
        past it, so the section reads as one continuous idea rather than a
        header followed by a wall of rows. Below `lg` it is a plain stack. */}
    <div className="hp-container grid gap-10 lg:mt-[74px] lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
      <div data-sticky-col className="hp-sticky-col">
        <SectionBadge number="02" className="w-fit">
          Our services
        </SectionBadge>

        <h2
          data-anim="lines"
          className="mt-8 max-w-[446px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink"
        >
          Healthcare Marketing &amp; Growth Strategy
        </h2>

        <p
          data-anim="rise"
          className="mt-5 max-w-[393px] text-base leading-[25px] text-ink sm:text-lg"
        >
          From strategy to execution, we bring marketing, relationships, and
          growth together.{" "}
          <Link
            href="#contact"
            className="font-semibold text-brand hover:text-brand-deep"
          >
            Let&rsquo;s find the right strategy.
          </Link>
        </p>

        {/* Reads out how far through the service list the reader is. */}
        <span
          aria-hidden
          className="relative mt-10 hidden h-[120px] w-[2px] bg-hairline lg:block"
        >
          <span
            data-sticky-progress
            className="absolute inset-0 origin-top scale-y-0 bg-brand"
          />
        </span>
      </div>

      <Accordion.Root
        type="single"
        collapsible
        data-anim="stagger"
        className="border-t border-hairline"
      >
        {services.map((service) => (
          <Accordion.Item
            key={service.id}
            value={service.id}
            className="relative border-b border-hairline"
          >
            {/* Draws in from the left under the hovered / open row. */}
            <span
              aria-hidden
              className="hp-hover-rule absolute inset-x-0 bottom-[-1px] h-[2px] bg-brand"
            />

            <Accordion.Header>
              <Accordion.Trigger
                data-hover-row="14"
                className="hp-hover-row group flex w-full items-center gap-4 py-7 text-left sm:gap-8 lg:py-10"
              >
                <span className="w-[54px] shrink-0 text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-bold text-brand transition-colors duration-300 group-hover:text-brand-bright lg:w-[92px]">
                  {service.number}
                </span>
                <span className="flex-1 text-[clamp(1.25rem,2.6vw,1.875rem)] leading-[1.2] font-medium text-ink transition-colors duration-300 group-hover:text-brand group-data-[state=open]:text-brand">
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
              <div className="pb-10 sm:pl-[86px] lg:pl-[124px]">
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
