"use client";

import {
  deleteEvent,
  refundAttendee,
  sendEventEmail,
} from "@/app/admin/events/action";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Media, Prisma } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";
import {
  AlertCircle,
  Clock,
  DollarSign,
  Download,
  Mail,
  MapPin,
  MoreVertical,
  Printer,
  QrCode,
  RotateCcw,
  Send,
  Users,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";
import AddEventButton from "../AdminEventsPage/AddEventButton";
import RemoveEvent from "../AdminEventsPage/RemoveEvent";

interface AdminEventDetailClientProps {
  event: Prisma.EventGetPayload<{
    include: { media: true; attendees: true; guests: true };
  }>;
}

type EventFormValues = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  maxGuests: number;
  date: Date;
  eventStartDate: Date;
  media: Media;
};

type EmailDialogState = {
  isOpen: boolean;
  type: "single" | "all";
  attendee?: { name: string; email: string };
};

const getPaymentStatusBadge = (status: string | null) => {
  switch (status) {
    case "PAID":
      return (
        <Badge
          className="bg-green-500/10 text-green-600 border-green-200"
          variant="outline"
        >
          Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          className="bg-yellow-500/10 text-yellow-600 border-yellow-200"
          variant="outline"
        >
          Pending
        </Badge>
      );
    case "REFUNDED":
      return (
        <Badge
          className="bg-blue-500/10 text-blue-600 border-blue-200"
          variant="outline"
        >
          Refunded
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          className="bg-red-500/10 text-red-600 border-red-200"
          variant="outline"
        >
          Failed
        </Badge>
      );
    default:
      return <Badge variant="outline">Free</Badge>;
  }
};

const AdminEventDetailClient = ({ event }: AdminEventDetailClientProps) => {
  const [emailDialog, setEmailDialog] = useState<EmailDialogState>({
    isOpen: false,
    type: "all",
  });
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [isRefunding, setIsRefunding] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundDialog, setRefundDialog] = useState<{
    isOpen: boolean;
    attendeeId: string;
    attendeeName: string;
    attendeeEmail: string;
    amount: string;
  }>({
    isOpen: false,
    attendeeId: "",
    attendeeName: "",
    attendeeEmail: "",
    amount: "",
  });

  const openRefundDialog = (attendee: any) => {
    const amount = attendee.amountPaid
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(attendee.amountPaid))
      : "Full amount";
    setRefundDialog({
      isOpen: true,
      attendeeId: attendee.id,
      attendeeName: attendee.name,
      attendeeEmail: attendee.email,
      amount,
    });
    setRefundReason("");
  };

  const closeRefundDialog = () => {
    setRefundDialog({
      isOpen: false,
      attendeeId: "",
      attendeeName: "",
      attendeeEmail: "",
      amount: "",
    });
    setRefundReason("");
  };

  const handleRefund = async () => {
    setIsRefunding(refundDialog.attendeeId);
    try {
      const result = await refundAttendee(
        refundDialog.attendeeId,
        refundReason.trim() || undefined
      );
      if (result.success) {
        toast.success(
          "Refund processed successfully. The attendee will receive a confirmation email."
        );
      } else {
        toast.error(result.error || "Failed to process refund");
      }
    } catch (error) {
      console.error("Error refunding attendee:", error);
      toast.error("Failed to process refund");
    } finally {
      setIsRefunding(null);
      closeRefundDialog();
    }
  };

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

  const handleDelete = async (ids: string[]) => {
    try {
      await deleteEvent(ids);
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const openEmailDialog = (
    type: "single" | "all",
    attendee?: { name: string; email: string }
  ) => {
    setEmailDialog({ isOpen: true, type, attendee });
    setEmailData({ subject: "", message: "" });
  };

  const closeEmailDialog = () => {
    setEmailDialog({ isOpen: false, type: "all" });
    setEmailData({ subject: "", message: "" });
  };

  const handleSendEmail = async () => {
    if (!emailData.subject.trim() || !emailData.message.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }

    setIsSending(true);

    try {
      const recipients =
        emailDialog.type === "single" && emailDialog.attendee
          ? [emailDialog.attendee.email]
          : event.attendees.map((a) => a.email);

      const result = await sendEventEmail({
        eventId: event.id,
        recipientEmails: recipients,
        subject: emailData.subject,
        message: emailData.message,
        includeEventDetails: true,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to send email");
        return;
      }

      const { successful, failed } = result.data || {
        successful: 0,
        failed: 0,
      };

      if (successful > 0) {
        toast.success(
          `Email sent successfully to ${successful} ${
            successful === 1 ? "attendee" : "attendees"
          }${failed > 0 ? `. ${failed} failed` : ""}`
        );
        closeEmailDialog();
      } else {
        toast.error("Failed to send emails");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    } finally {
      setIsSending(false);
    }
  };

  const handlePrintQRCode = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Please allow popups to print QR code");
      return;
    }

    const qrCodeUrl = `${window.location.origin}/event/${event.id}`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${event.title}</title>
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 1cm; }
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .container {
              text-align: center;
              max-width: 500px;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 10px;
              color: #1f2937;
            }
            .event-details {
              margin-bottom: 30px;
              color: #6b7280;
              font-size: 14px;
            }
            .qr-container {
              background: white;
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              display: inline-block;
            }
            .instructions {
              margin-top: 20px;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${event.title}</h1>
            <div class="event-details">
              <p><strong>Location:</strong> ${event.location}</p>
              <p><strong>Date:</strong> ${formatDate(event.eventStartDate)}</p>
            </div>
            <div class="qr-container">
              <div id="qr-code"></div>
            </div>
            <div class="instructions">
              <p>Scan this QR code to register or view event details</p>
            </div>
          </div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
          <script>
            new QRCode(document.getElementById("qr-code"), {
              text: "${qrCodeUrl}",
              width: 300,
              height: 300,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.H
            });
            setTimeout(() => window.print(), 500);
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
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
          <AddEventButton
            type="edit"
            event={event as unknown as EventFormValues & { id: string }}
          />
          <RemoveEvent onRemove={() => handleDelete([event.id])} />
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
                      ...(event.isPaid
                        ? [
                            {
                              key: "payment",
                              header: "Payment",
                              cell: (row: any) =>
                                getPaymentStatusBadge(row.paymentStatus),
                            },
                            {
                              key: "note",
                              header: "Note",
                              cell: (row: any) =>
                                row.note ? (
                                  <span
                                    className="text-xs text-muted-foreground max-w-[200px] truncate block"
                                    title={row.note}
                                  >
                                    {row.note}
                                  </span>
                                ) : (
                                  <span className="text-xs text-muted-foreground/50">
                                    —
                                  </span>
                                ),
                            },
                          ]
                        : []),
                      {
                        key: "actions",
                        header: "",
                        align: "right",
                        cell: (attendee: any) => (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  openEmailDialog("single", {
                                    name: attendee.name,
                                    email: attendee.email,
                                  })
                                }
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                Email Attendee
                              </DropdownMenuItem>
                              {attendee.paymentStatus === "PAID" && (
                                <DropdownMenuItem
                                  onClick={() => openRefundDialog(attendee)}
                                >
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Refund Payment
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                  <span className="text-sm text-muted-foreground">Booked</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        (event.attendees.length / (event.maxGuests || 1)) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-amber-700 font-medium">
                  {Math.min(event.attendees.length * 100, 100)}% of capacity
                  reached
                </p>
              </div>
            </CardContent>
          </Card>
          {event.isPaid && (
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" /> Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-black">
                      $
                      {event.attendees
                        .filter((a: any) => a.paymentStatus === "PAID")
                        .reduce(
                          (sum: number, a: any) =>
                            sum + (Number(a.amountPaid) || 0),
                          0
                        )
                        .toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Total Revenue
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Paid</span>
                      <span>
                        {
                          event.attendees.filter(
                            (a: any) => a.paymentStatus === "PAID"
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending</span>
                      <span>
                        {
                          event.attendees.filter(
                            (a: any) => a.paymentStatus === "PENDING"
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refunded</span>
                      <span>
                        {
                          event.attendees.filter(
                            (a: any) => a.paymentStatus === "REFUNDED"
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <QrCode className="w-4 h-4 text-primary" /> Event QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-primary/10">
                  <QRCodeSVG
                    value={`${window.location.origin}/events/${event.id}`}
                    size={160}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Scan to view event details
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={handlePrintQRCode}
              >
                <Printer className="w-4 h-4" />
                Print QR Code
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Guest List</span>
                <span>{event.guests?.length || 0} Invites</span>
              </div>
              <Separator />
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm h-8"
                onClick={() => openEmailDialog("all")}
                disabled={event.attendees.length === 0}
              >
                <Mail className="w-4 h-4" /> Email All Attendees
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Refund Confirmation Dialog */}
      <Dialog
        open={refundDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) closeRefundDialog();
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirm Refund</DialogTitle>
            <DialogDescription>
              Are you sure you want to refund{" "}
              <strong>{refundDialog.attendeeName}</strong>? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-amber-900">
              Refund Details:
            </p>
            <div className="text-sm text-amber-800 space-y-1">
              <p>
                <strong>Attendee:</strong> {refundDialog.attendeeName}
              </p>
              <p>
                <strong>Email:</strong> {refundDialog.attendeeEmail}
              </p>
              <p>
                <strong>Amount:</strong> {refundDialog.amount}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refundReason">Reason / Note (optional)</Label>
            <Textarea
              id="refundReason"
              placeholder="e.g. Event cancelled, duplicate registration, customer request..."
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              This note will be stored on the attendee record and included in
              the refund confirmation email sent to the attendee.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeRefundDialog}
              disabled={isRefunding !== null}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRefund}
              disabled={isRefunding !== null}
            >
              {isRefunding ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Confirm Refund
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailDialog.isOpen} onOpenChange={closeEmailDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {emailDialog.type === "single"
                ? `Email ${emailDialog.attendee?.name}`
                : "Email All Attendees"}
            </DialogTitle>
            <DialogDescription>
              {emailDialog.type === "single"
                ? `Send an email to ${emailDialog.attendee?.email}`
                : `Send an email to all ${event.attendees.length} attendees`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Subject Field */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, subject: e.target.value }))
                }
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                value={emailData.message}
                onChange={(e) =>
                  setEmailData((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={8}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeEmailDialog}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={isSending}>
              {isSending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventDetailClient;
