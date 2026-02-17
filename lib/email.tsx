interface GetInTouchProps {
  FullName: string;
  PhoneNumber: string;
  Email: string;
  OnlinePresence: string;
  ContactMethod: string;
  Message: string;
}

export function GetInTouch({
  FullName,
  PhoneNumber,
  Email,
  OnlinePresence,
  ContactMethod,
  Message,
}: GetInTouchProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f0f8ff", // light sky blue background
        padding: "24px",
        borderRadius: "10px",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #bde0fe",
      }}
    >
      <h2 style={{ color: "skyblue", marginBottom: "16px" }}>
        New Contact Form Submission
      </h2>

      <p>
        Hey, <strong>{FullName}</strong> just submitted a contact form.
        <br />
        You might want to check the details below:
      </p>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #e0f0ff",
        }}
      >
        <p>
          <strong>Full Name:</strong> {FullName}
        </p>
        <p>
          <strong>Phone Number:</strong> {PhoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {Email}
        </p>
        <p>
          <strong>Online Presence:</strong> {OnlinePresence}
        </p>
        <p>
          <strong>Preferred Contact Method:</strong> {ContactMethod}
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        <p
          style={{
            backgroundColor: "#f4faff",
            padding: "12px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {Message}
        </p>
      </div>

      <p style={{ fontSize: "13px", color: "#777", marginTop: "20px" }}>
        This email was sent automatically by your website&apos;s contact form
        system.
      </p>
    </div>
  );
}

interface EventRegistrationConfirmationProps {
  attendeeName: string;
  eventTitle: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate?: string;
  location: string;
  eventId: string;
}

export function EventRegistrationConfirmation({
  attendeeName,
  eventTitle,
  eventDescription,
  eventStartDate,
  eventEndDate,
  location,
  eventId,
}: EventRegistrationConfirmationProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f0f8ff",
        padding: "24px",
        borderRadius: "10px",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #bde0fe",
      }}
    >
      {/* Header with success badge */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e",
            color: "white",
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          ✓ Registration Confirmed
        </div>
        <h1
          style={{
            color: "skyblue",
            marginBottom: "8px",
            fontSize: "28px",
          }}
        >
          You&apos;re All Set!
        </h1>
      </div>

      <p style={{ fontSize: "16px", marginBottom: "24px" }}>
        Hi <strong>{attendeeName}</strong>,
        <br />
        <br />
        Thank you for registering! We&apos;re excited to have you join us for{" "}
        <strong>{eventTitle}</strong>.
      </p>

      {/* Event Details Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #e0f0ff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ color: "skyblue", marginTop: "0", marginBottom: "16px" }}>
          Event Details
        </h3>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Event:</strong>
          <br />
          {eventTitle}
        </p>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Description:</strong>
          <br />
          <span style={{ color: "#666" }}>{eventDescription}</span>
        </p>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>📅 Date & Time:</strong>
          <br />
          {eventStartDate}
          {eventEndDate && (
            <>
              <br />
              <span style={{ color: "#666", fontSize: "14px" }}>
                Ends: {eventEndDate}
              </span>
            </>
          )}
        </p>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>📍 Location:</strong>
          <br />
          {location}
        </p>
      </div>

      {/* What to Bring / Reminders */}

      {/* Call to Action */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a
          href={process.env.NEXT_PUBLIC_APP_URL + `/events/${eventId}`}
          style={{
            display: "inline-block",
            backgroundColor: "skyblue",
            color: "white",
            padding: "12px 32px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          View Event Details
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "32px",
          paddingTop: "20px",
          borderTop: "1px solid #e0e0e0",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px", color: "#777", marginBottom: "8px" }}>
          Need to cancel or modify your registration?
          <br />
          <a
            href={process.env.NEXT_PUBLIC_APP_URL + `/contact`}
            style={{ color: "skyblue", textDecoration: "underline" }}
          >
            Contact Support
          </a>
        </p>
        <p style={{ fontSize: "12px", color: "#999", marginTop: "16px" }}>
          This email was sent automatically by the event management system.
          <br />
          Please do not reply to this email.
        </p>
      </div>
    </div>
  );
}

interface EventRegistrationNotificationProps {
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  eventTitle: string;
  eventStartDate: string;
  totalAttendees: number;
  eventId: string;
}

export function EventRegistrationNotification({
  attendeeName,
  attendeeEmail,
  attendeePhone,
  eventTitle,
  eventStartDate,
  totalAttendees,
  eventId,
}: EventRegistrationNotificationProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f0f8ff",
        padding: "24px",
        borderRadius: "10px",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #bde0fe",
      }}
    >
      <div
        style={{
          backgroundColor: "skyblue",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0", fontSize: "22px" }}>
          🎉 New Event Registration
        </h2>
      </div>

      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        A new attendee has registered for <strong>{eventTitle}</strong>.
      </p>

      {/* Attendee Information */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #e0f0ff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ color: "skyblue", marginTop: "0", marginBottom: "16px" }}>
          Attendee Details
        </h3>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Name:</strong>
          <br />
          {attendeeName}
        </p>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Email:</strong>
          <br />
          <a
            href={`mailto:${attendeeEmail}`}
            style={{ color: "skyblue", textDecoration: "none" }}
          >
            {attendeeEmail}
          </a>
        </p>

        <p style={{ marginBottom: "0" }}>
          <strong style={{ color: "#555" }}>Phone:</strong>
          <br />
          <a
            href={`tel:${attendeePhone}`}
            style={{ color: "skyblue", textDecoration: "none" }}
          >
            {attendeePhone}
          </a>
        </p>
      </div>

      {/* Event Summary */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #e0f0ff",
        }}
      >
        <h3 style={{ color: "skyblue", marginTop: "0", marginBottom: "16px" }}>
          Event Summary
        </h3>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Event:</strong> {eventTitle}
        </p>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Date:</strong> {eventStartDate}
        </p>

        <div style={{ marginTop: "16px" }}>
          <p style={{ marginBottom: "8px" }}>
            <strong style={{ color: "#555" }}>Registration Status:</strong>
          </p>
          <div
            style={{
              backgroundColor: "#f4faff",
              padding: "12px",
              borderRadius: "6px",
            }}
          >
            <p style={{ margin: "0", fontSize: "14px" }}>
              <strong style={{ fontSize: "18px", color: "skyblue" }}>
                {totalAttendees}
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a
          href={process.env.NEXT_PUBLIC_APP_URL + `/admin/events/${eventId}`}
          style={{
            display: "inline-block",
            backgroundColor: "skyblue",
            color: "white",
            padding: "10px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "14px",
            marginRight: "8px",
          }}
        >
          View All Attendees
        </a>
        <a
          href={process.env.NEXT_PUBLIC_APP_URL + `/admin/events/${eventId}`}
          style={{
            display: "inline-block",
            backgroundColor: "#6b7280",
            color: "white",
            padding: "10px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Manage Event
        </a>
      </div>

      {/* Footer */}
      <p
        style={{
          fontSize: "12px",
          color: "#999",
          marginTop: "24px",
          textAlign: "center",
        }}
      >
        This is an automated notification from your event management system.
      </p>
    </div>
  );
}

interface RefundConfirmationProps {
  attendeeName: string;
  eventTitle: string;
  refundAmount: string;
  eventId: string;
  reason?: string;
}

export function RefundConfirmationEmail({
  attendeeName,
  eventTitle,
  refundAmount,
  eventId,
  reason,
}: RefundConfirmationProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f0f8ff",
        padding: "24px",
        borderRadius: "10px",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #bde0fe",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Refund Processed
        </div>
        <h1
          style={{
            color: "skyblue",
            marginBottom: "8px",
            fontSize: "28px",
          }}
        >
          Your Refund Has Been Processed
        </h1>
      </div>

      <p style={{ fontSize: "16px", marginBottom: "24px" }}>
        Hi <strong>{attendeeName}</strong>,
        <br />
        <br />
        We&apos;ve processed a refund for your registration to{" "}
        <strong>{eventTitle}</strong>.
      </p>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #e0f0ff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ color: "skyblue", marginTop: "0", marginBottom: "16px" }}>
          Refund Details
        </h3>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Event:</strong>
          <br />
          {eventTitle}
        </p>

        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#555" }}>Refund Amount:</strong>
          <br />
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "#22c55e" }}
          >
            {refundAmount}
          </span>
        </p>

        {reason && (
          <p style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#555" }}>Reason:</strong>
            <br />
            <span style={{ color: "#666" }}>{reason}</span>
          </p>
        )}

        <p style={{ marginBottom: "0", fontSize: "14px", color: "#666" }}>
          The refund will appear in your account within 5-10 business days,
          depending on your bank or card issuer.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#fffbeb",
          padding: "16px",
          borderRadius: "8px",
          marginTop: "20px",
          border: "1px solid #fef3c7",
        }}
      >
        <p style={{ margin: "0", fontSize: "14px" }}>
          <strong>Have questions about this refund?</strong>
          <br />
          Please contact us at{" "}
          <a
            href="mailto:hello@innovarehp.com"
            style={{ color: "skyblue", textDecoration: "underline" }}
          >
            hello@innovarehp.com
          </a>
        </p>
      </div>

      <div
        style={{
          marginTop: "32px",
          paddingTop: "20px",
          borderTop: "1px solid #e0e0e0",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "12px", color: "#999" }}>
          This email was sent automatically by the event management system.
          <br />
          Please do not reply to this email.
        </p>
      </div>
    </div>
  );
}

interface AdminCustomEmailProps {
  recipientName: string;
  subject: string;
  message: string;
  eventTitle?: string;
  eventDate?: string;
  eventLocation?: string;
  eventId?: string;
}

export function AdminCustomEmail({
  recipientName,
  subject,
  message,
  eventTitle,
  eventDate,
  eventLocation,
  eventId,
}: AdminCustomEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f0f8ff",
        padding: "24px",
        borderRadius: "10px",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #bde0fe",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            color: "skyblue",
            marginBottom: "8px",
            fontSize: "28px",
          }}
        >
          {subject}
        </h1>
      </div>

      {/* Greeting */}
      <p style={{ fontSize: "16px", marginBottom: "24px" }}>
        Hi <strong>{recipientName}</strong>,
      </p>

      {/* Message Content */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #e0f0ff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "15px",
            lineHeight: "1.8",
          }}
        >
          {message}
        </div>
      </div>

      {/* Event Details (if provided) */}
      {eventTitle && (
        <div
          style={{
            backgroundColor: "#fffbeb",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "20px",
            border: "1px solid #fef3c7",
          }}
        >
          <p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
            <strong>📅 Event Information:</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Event:</strong> {eventTitle}
          </p>
          {eventDate && (
            <p style={{ margin: "4px 0" }}>
              <strong>Date:</strong> {eventDate}
            </p>
          )}
          {eventLocation && (
            <p style={{ margin: "4px 0" }}>
              <strong>Location:</strong> {eventLocation}
            </p>
          )}
        </div>
      )}

      {/* Call to Action */}
      {eventTitle && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href={process.env.NEXT_PUBLIC_APP_URL + `/events/${eventId}`}
            style={{
              display: "inline-block",
              backgroundColor: "skyblue",
              color: "white",
              padding: "12px 32px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            View Event Details
          </a>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "32px",
          paddingTop: "20px",
          borderTop: "1px solid #e0e0e0",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px", color: "#777", marginBottom: "8px" }}>
          Questions or concerns?
          <br />
          <a
            href={process.env.NEXT_PUBLIC_APP_URL + `#contact`}
            style={{ color: "skyblue", textDecoration: "underline" }}
          >
            Contact Support
          </a>
        </p>
        <p style={{ fontSize: "12px", color: "#999", marginTop: "16px" }}>
          This email was sent by Innovare HP Event Management.
          <br />
          You received this because you registered for our event.
        </p>
      </div>
    </div>
  );
}
