import { prisma } from "@/lib/prisma";
import { EventStatus } from "@prisma/client";

async function seedEvents() {
  console.log("🌱 Starting to seed events...");

  try {
    const media1 = await prisma.media.create({
      data: {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        type: "image",
      },
    });

    const media2 = await prisma.media.create({
      data: {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
        type: "image",
      },
    });

    const media3 = await prisma.media.create({
      data: {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
        type: "image",
      },
    });

    const media4 = await prisma.media.create({
      data: {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
        type: "image",
      },
    });

    const media5 = await prisma.media.create({
      data: {
        url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
        type: "image",
      },
    });

    console.log("✅ Media records created");

    // Event 1: Upcoming Tech Conference
    const event1 = await prisma.event.create({
      data: {
        title: "Tech Innovation Summit 2026",
        description:
          "Join us for the biggest technology conference of the year! Connect with industry leaders, explore cutting-edge innovations, and discover the future of technology. This summit features keynote speakers, hands-on workshops, and networking opportunities with professionals from around the globe.",
        location: "San Francisco Convention Center, CA",
        status: EventStatus.PUBLISHED,
        eventStartDate: new Date("2026-03-15T09:00:00"),
        eventEndDate: new Date("2026-03-17T18:00:00"),
        registrationDeadline: new Date("2026-03-10T23:59:59"),
        qrCode: "TECH2026-QR-001",
        mediaId: media1.id,
        slug: "tech-innovation-summit-2026",
      },
    });

    // Add some attendees to event 1
    await prisma.eventAttendee.createMany({
      data: [
        {
          eventId: event1.id,
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1-555-0101",
        },
        {
          eventId: event1.id,
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          phone: "+1-555-0102",
        },
        {
          eventId: event1.id,
          name: "Michael Chen",
          email: "m.chen@example.com",
          phone: "+1-555-0103",
        },
        {
          eventId: event1.id,
          name: "Emily Rodriguez",
          email: "emily.r@example.com",
          phone: "+1-555-0104",
        },
        {
          eventId: event1.id,
          name: "David Park",
          email: "david.park@example.com",
          phone: "+1-555-0105",
        },
      ],
    });

    console.log("✅ Event 1 created: Tech Innovation Summit");

    // Event 2: Workshop - Full capacity
    const event2 = await prisma.event.create({
      data: {
        title: "AI & Machine Learning Workshop",
        description:
          "An intensive hands-on workshop covering the fundamentals of artificial intelligence and machine learning. Learn from experts and work on real-world projects. This workshop is perfect for developers looking to expand their skill set into the exciting world of AI.",
        location: "Innovation Hub, New York, NY",
        status: EventStatus.PUBLISHED,
        eventStartDate: new Date("2026-02-20T10:00:00"),
        eventEndDate: new Date("2026-02-20T17:00:00"),
        registrationDeadline: new Date("2026-02-15T23:59:59"),
        qrCode: "AIML-WORKSHOP-002",
        mediaId: media2.id,
        slug: "ai-machine-learning-workshop",
      },
    });

    // Fill up event 2 to capacity
    const attendees2 = Array.from({ length: 30 }, (_, i) => ({
      eventId: event2.id,
      name: `Attendee ${i + 1}`,
      email: `attendee${i + 1}@example.com`,
      phone: `+1-555-${String(200 + i).padStart(4, "0")}`,
    }));

    await prisma.eventAttendee.createMany({
      data: attendees2,
    });

    console.log("✅ Event 2 created: AI Workshop (Full)");

    // Event 3: Networking Event
    const event3 = await prisma.event.create({
      data: {
        title: "Startup Founders Networking Night",
        description:
          "Connect with fellow entrepreneurs, investors, and innovators in the startup ecosystem. Share ideas, find co-founders, and build valuable relationships. Refreshments will be provided. This is a great opportunity to expand your network and discover potential partnerships.",
        location: "WeWork Downtown, Austin, TX",
        status: EventStatus.PUBLISHED,
        eventStartDate: new Date("2026-02-28T18:00:00"),
        eventEndDate: new Date("2026-02-28T21:00:00"),
        registrationDeadline: new Date("2026-02-26T23:59:59"),
        qrCode: "STARTUP-NET-003",
        mediaId: media3.id,
        slug: "startup-founders-networking-night",
      },
    });

    await prisma.eventAttendee.createMany({
      data: [
        {
          eventId: event3.id,
          name: "Alex Turner",
          email: "alex.turner@startup.io",
          phone: "+1-555-0301",
        },
        {
          eventId: event3.id,
          name: "Lisa Wang",
          email: "lisa.wang@tech.com",
          phone: "+1-555-0302",
        },
      ],
    });

    console.log("✅ Event 3 created: Networking Night");

    // Event 4: Draft Event
    const event4 = await prisma.event.create({
      data: {
        title: "Blockchain & Web3 Conference",
        description:
          "Explore the future of decentralized technology, blockchain applications, and the Web3 ecosystem. This conference will feature industry experts discussing NFTs, DeFi, DAOs, and more. Perfect for anyone interested in the future of the internet.",
        location: "Miami Beach Convention Center, FL",
        status: EventStatus.DRAFT,
        eventStartDate: new Date("2026-04-10T09:00:00"),
        eventEndDate: new Date("2026-04-12T18:00:00"),
        registrationDeadline: new Date("2026-04-05T23:59:59"),
        mediaId: media4.id,
        slug: "blockchain-web3-conference",
      },
    });

    console.log("✅ Event 4 created: Blockchain Conference (Draft)");

    // Event 5: Past Event - Completed
    const event5 = await prisma.event.create({
      data: {
        title: "Annual Developer Meetup 2025",
        description:
          "Our annual gathering of developers, engineers, and tech enthusiasts. This year's meetup featured talks on cloud architecture, DevOps best practices, and modern development workflows. Thank you to all who attended!",
        location: "Tech Park, Seattle, WA",
        status: EventStatus.COMPLETED,
        eventStartDate: new Date("2025-12-15T14:00:00"),
        eventEndDate: new Date("2025-12-15T19:00:00"),
        registrationDeadline: new Date("2025-12-10T23:59:59"),
        qrCode: "DEV-MEETUP-2025",
        mediaId: media5.id,
        slug: "annual-developer-meetup-2025",
      },
    });

    await prisma.eventAttendee.createMany({
      data: [
        {
          eventId: event5.id,
          name: "Robert Brown",
          email: "robert.b@dev.com",
          phone: "+1-555-0501",
        },
        {
          eventId: event5.id,
          name: "Jennifer Lee",
          email: "jennifer.lee@code.io",
          phone: "+1-555-0502",
        },
        {
          eventId: event5.id,
          name: "Thomas Anderson",
          email: "thomas.a@matrix.dev",
          phone: "+1-555-0503",
        },
      ],
    });

    console.log("✅ Event 5 created: Developer Meetup (Completed)");

    // Event 6: Cancelled Event
    const event6 = await prisma.event.create({
      data: {
        title: "Mobile App Development Bootcamp",
        description:
          "A comprehensive bootcamp covering iOS and Android development. Learn to build native mobile applications from scratch. Unfortunately, this event has been cancelled due to unforeseen circumstances. We apologize for any inconvenience.",
        location: "Digital Campus, Boston, MA",
        status: EventStatus.CANCELLED,
        eventStartDate: new Date("2026-03-01T09:00:00"),
        eventEndDate: new Date("2026-03-05T17:00:00"),
        registrationDeadline: new Date("2026-02-25T23:59:59"),
        mediaId: media1.id,
        slug: "mobile-app-development-bootcamp",
      },
    });

    console.log("✅ Event 6 created: Bootcamp (Cancelled)");

    // Event 7: Small Workshop with no max guests
    const event7 = await prisma.event.create({
      data: {
        title: "Open Source Contribution Workshop",
        description:
          "Learn how to contribute to open source projects! This beginner-friendly workshop will guide you through making your first pull request, understanding version control, and becoming part of the open source community. No prior experience required!",
        location: "Community Center, Portland, OR",
        status: EventStatus.PUBLISHED,
        eventStartDate: new Date("2026-02-25T15:00:00"),
        eventEndDate: new Date("2026-02-25T18:00:00"),
        registrationDeadline: new Date("2026-02-23T23:59:59"),
        qrCode: "OPENSOURCE-007",
        mediaId: media3.id,
        slug: "open-source-contribution-workshop",
      },
    });

    await prisma.eventAttendee.createMany({
      data: [
        {
          eventId: event7.id,
          name: "Chris Martinez",
          email: "chris.m@opensource.dev",
          phone: "+1-555-0701",
        },
      ],
    });

    console.log("✅ Event 7 created: Open Source Workshop");

    console.log("\n🎉 Successfully seeded 7 events!");
    console.log(`
📊 Summary:
- Event 1: Tech Summit (Published, 5 attendees, 500 max)
- Event 2: AI Workshop (Published, FULL - 30/30 attendees)
- Event 3: Networking Night (Published, 2 attendees, 100 max)
- Event 4: Blockchain Conference (Draft)
- Event 5: Developer Meetup (Completed, 3 attendees)
- Event 6: Mobile Bootcamp (Cancelled)
- Event 7: Open Source Workshop (Published, 1 attendee, unlimited)
    `);
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedEvents()
  .then(() => {
    console.log("✨ Automation completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Automation failed:", error);
    process.exit(1);
  });
