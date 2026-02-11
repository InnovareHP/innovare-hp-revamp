import ContactPage from "@/components/ContactPage/ContactPage";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { ContactFormSubmission } from "@prisma/client";

const page = async () => {
  await requireAdmin();
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
