import SeoDashboardPage from "@/components/SeoDashboardPage/SeoDashboardPage";
import { requireAdmin } from "@/lib/auth-utils";

const page = async () => {
  await requireAdmin();
  return <SeoDashboardPage />;
};

export default page;
