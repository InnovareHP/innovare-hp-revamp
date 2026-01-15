"use client";

import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prisma } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";
import {
  AlertCircle,
  Clock,
  Download,
  Edit,
  Mail,
  MapPin,
  MoreVertical,
  Trash2,
  Users,
} from "lucide-react";

interface AdminEventDetailClientProps {
  event: Prisma.EventGetPayload<{
    include: { media: true; attendees: true; guests: true };
  }>;
}

const AdminEventDetailClient = ({ event }: AdminEventDetailClientProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "DRAFT":
        return "bg-slate-500/10 text-slate-600 border-slate-200";
      case "CANCELLED":
        return "bg-red-500/10 text-red-600 border-red-200";
      default:
        return "secondary";
    }
  };

  const attendanceRate =
    event.maxGuests > 0
      ? Math.round((event.attendees.length / event.maxGuests) * 100)
      : 100;

  return (
    <div className="space-y-6">
      {/* Admin Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(event.status)} variant="outline">
            {event.status}
          </Badge>
          <span className="text-sm text-muted-foreground font-medium">
            Created on {new Date(event.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none gap-2"
          >
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none gap-2"
          >
            <Edit className="w-4 h-4" /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1 md:flex-none gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="attendees" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="attendees">
                    Attendees ({event.attendees.length})
                  </TabsTrigger>
                  <TabsTrigger value="details">Logistics</TabsTrigger>
                </TabsList>

                <TabsContent value="attendees">
                  <ReusableTable
                    data={event.attendees}
                    itemsPerPage={5}
                    columns={[
                      { key: "name", header: "Name" },
                      { key: "email", header: "Email" },
                      {
                        key: "registeredAt",
                        header: "Registered",
                        cell: (row: any) =>
                          new Date(row.createdAt).toLocaleDateString(),
                      },
                      {
                        key: "actions",
                        header: "",
                        align: "right",
                        cell: () => (
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        ),
                      },
                    ]}
                  />
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <MapPin className="text-primary w-5 h-5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold">
                          Venue
                        </p>
                        <p className="text-sm font-semibold">
                          {event.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Clock className="text-primary w-5 h-5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold">
                          Deadline
                        </p>
                        <p className="text-sm font-semibold">
                          {event.registrationDeadline
                            ? formatDate(event.registrationDeadline)
                            : "No Deadline"}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Analytics Column */}
        <div className="space-y-6">
          <Card className="border-amber-200 bg-amber-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" /> Capacity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-black">
                    {event.attendees.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {event.maxGuests || "∞"} Booked
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(attendanceRate, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-amber-700 font-medium">
                  {attendanceRate}% of capacity reached
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Quick Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">QR Check-in</span>
                <Badge variant={event.qrCode ? "default" : "secondary"}>
                  {event.qrCode ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Guest List</span>
                <span>{event.guests?.length || 0} Invites</span>
              </div>
              <Separator />
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm h-8"
              >
                <Mail className="w-4 h-4" /> Email All Attendees
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetailClient;
