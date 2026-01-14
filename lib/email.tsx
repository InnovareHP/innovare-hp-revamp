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
  qrCode?: string;
}

export function EventRegistrationConfirmation({
  attendeeName,
  eventTitle,
  eventDescription,
  eventStartDate,
  eventEndDate,
  location,
  qrCode,
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

        {qrCode && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#555" }}>🎫 Your QR Code:</strong>
            </p>
            <div
              style={{
                backgroundColor: "#f9f9f9",
                padding: "16px",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              <p style={{ fontSize: "14px", color: "#666" }}>
                QR Code: {qrCode}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#999",
                  marginTop: "8px",
                  marginBottom: "0",
                }}
              >
                Please present this at the event entrance
              </p>
            </div>
          </div>
        )}
      </div>

      {/* What to Bring / Reminders */}
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
          <strong>📝 Important Reminders:</strong>
        </p>
        <ul
          style={{ marginTop: "8px", marginBottom: "0", paddingLeft: "20px" }}
        >
          <li style={{ marginBottom: "4px" }}>
            Please arrive 15 minutes before the event starts
          </li>
          <li style={{ marginBottom: "4px" }}>
            Bring a valid ID for verification
          </li>
          <li style={{ marginBottom: "4px" }}>
            Save this email for your records
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a
          href="#"
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
          <a href="#" style={{ color: "skyblue", textDecoration: "underline" }}>
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
  maxGuests: number;
}

export function EventRegistrationNotification({
  attendeeName,
  attendeeEmail,
  attendeePhone,
  eventTitle,
  eventStartDate,
  totalAttendees,
  maxGuests,
}: EventRegistrationNotificationProps) {
  const capacityPercentage =
    maxGuests > 0 ? Math.round((totalAttendees / maxGuests) * 100) : 0;

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
              {maxGuests > 0 && (
                <>
                  {" "}
                  / {maxGuests} attendees
                  <br />
                  <span style={{ color: "#666", fontSize: "13px" }}>
                    ({capacityPercentage}% capacity)
                  </span>
                </>
              )}
              {maxGuests === 0 && (
                <span style={{ color: "#666", fontSize: "13px" }}>
                  {" "}
                  registered (unlimited capacity)
                </span>
              )}
            </p>
          </div>
        </div>

        {maxGuests > 0 && totalAttendees >= maxGuests && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              padding: "12px",
              borderRadius: "6px",
              marginTop: "12px",
            }}
          >
            <p style={{ margin: "0", color: "#dc2626", fontSize: "14px" }}>
              <strong>⚠️ Event is now at full capacity!</strong>
            </p>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a
          href="#"
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
          href="#"
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
