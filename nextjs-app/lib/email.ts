import nodemailer, { type Transporter } from "nodemailer";
import { query } from "./db";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
  return cachedTransporter;
}

export type ApplicationEmailPayload = {
  position: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredLoc: string | null;
  dateOfBirth: string | null;
  availableStartDate: string | null;
  gender: string | null;
  pronouns: string | null;
  retailExperience: boolean;
  schedulePreference: string | null;
  hearAboutUs: string | null;
  whyWorkHere: string | null;
  videoLink: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  resume: { filename: string; content: Buffer; contentType: string } | null;
  video: { filename: string; content: Buffer; contentType: string } | null;
};

async function getAdminEmails(): Promise<string[]> {
  const rows = await query<{ email: string }>(
    `SELECT email FROM admin_users ORDER BY id`
  );
  return rows.map((r) => r.email);
}

function row(label: string, value: string | null | undefined): string {
  const v = value && value.trim() ? value : "—";
  return `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;vertical-align:top;"><b>${label}</b></td><td style="padding:4px 0;color:#111827;">${v}</td></tr>`;
}

export async function sendApplicationEmail(p: ApplicationEmailPayload) {
  const transporter = getTransporter();
  const recipients = await getAdminEmails();
  if (!transporter || recipients.length === 0) {
    console.warn("[email] skipping send — transporter or recipients missing", {
      hasTransporter: Boolean(transporter),
      recipientCount: recipients.length,
    });
    return;
  }

  const fullName = `${p.firstName} ${p.lastName}`;
  const subject = `New Application — ${fullName}${p.position ? ` (${p.position})` : ""}`;
  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;color:#111827;max-width:640px;">
      <h2 style="margin:0 0 8px;">New job application</h2>
      <p style="color:#6b7280;margin:0 0 16px;">Submitted via toyrepublicusa.com</p>
      <table style="border-collapse:collapse;font-size:14px;">
        ${row("Position", p.position)}
        ${row("Name", fullName)}
        ${row("Email", p.email)}
        ${row("Phone", p.phone)}
        ${row("Preferred Location", p.preferredLoc)}
        ${row("Date of Birth", p.dateOfBirth)}
        ${row("Available Start Date", p.availableStartDate)}
        ${row("Gender", p.gender)}
        ${row("Pronouns", p.pronouns)}
        ${row("Retail Experience", p.retailExperience ? "Yes" : "No")}
        ${row("Schedule Preference", p.schedulePreference)}
        ${row("Heard About Us", p.hearAboutUs)}
        ${row("Video Link", p.videoLink)}
        ${row("Emergency Contact", p.emergencyContactName)}
        ${row("Emergency Phone", p.emergencyContactPhone)}
      </table>
      ${
        p.whyWorkHere
          ? `<h3 style="margin:20px 0 6px;">Why do you want to work at Toy Republic?</h3><p style="white-space:pre-wrap;margin:0;">${p.whyWorkHere}</p>`
          : ""
      }
      ${p.resume ? `<p style="margin-top:16px;color:#6b7280;">Resume attached: <b>${p.resume.filename}</b></p>` : ""}
    </div>`;

  const attachments: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[] = [];
  if (p.resume) attachments.push(p.resume);
  if (p.video) attachments.push(p.video);

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: recipients.join(", "),
    replyTo: p.email,
    subject,
    html,
    attachments,
  });
}
