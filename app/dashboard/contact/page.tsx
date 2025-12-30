import ContactPage from "@/components/ContactPage/ContactPage";
import { prisma } from "@/lib/prisma";
import { ContactFormSubmission } from "../../../generated/prisma/client";

const page = async () => {
  const submissions: ContactFormSubmission[] =
    await prisma.contactFormSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  return <ContactPage initialSubmissions={submissions} />;
};

export default page;
