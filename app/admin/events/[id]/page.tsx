import { getEventById } from "@/app/events/action/eventaction";
import AdminEventCard from "@/components/AdminSpecificEventPage/AdminEventCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: EventPageProps) => {
  const { id } = await params;

  const response = getEventById(id);

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        <Link href="/admin/events">
          <Button variant="outline" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Events Table
          </Button>
        </Link>

        <AdminEventCard event={response} />
      </div>
    </div>
  );
};

export default page;
