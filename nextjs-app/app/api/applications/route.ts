import { NextRequest } from "next/server";
import { query, queryOne } from "@/lib/db";
import { sendApplicationEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
const MIN_AGE = 18;

function ageFromIso(dob: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const [y, m, d] = dob.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  const beforeBirthday =
    today.getMonth() + 1 < m ||
    (today.getMonth() + 1 === m && today.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}

function str(form: FormData, key: string): string | null {
  const v = form.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

function dateOrNull(form: FormData, key: string): string | null {
  const v = str(form, key);
  return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const firstName = str(form, "first_name");
    const lastName = str(form, "last_name");
    const email = str(form, "email");
    const phone = str(form, "phone");
    const preferredLoc = str(form, "preferred_loc");
    const position = str(form, "position");

    if (!firstName || !lastName || !email || !phone || !preferredLoc) {
      return Response.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;
    const dateOfBirth = dateOrNull(form, "date_of_birth");
    if (!dateOfBirth) {
      return Response.json(
        { error: "Date of birth is required." },
        { status: 400 }
      );
    }
    const age = ageFromIso(dateOfBirth);
    if (age === null || age < MIN_AGE) {
      return Response.json(
        {
          error: `You must be at least ${MIN_AGE} years old to work at our NJ and NY locations.`,
        },
        { status: 400 }
      );
    }
    const availableStartDate = dateOrNull(form, "available_start_date");
    const gender = str(form, "gender");
    const pronouns = str(form, "pronouns");
    const retailExperience = form.get("retail_experience") === "true";
    const schedulePreference = str(form, "schedule_preference");
    const hearAboutUs = str(form, "hear_about_us");
    const whyWorkHere = str(form, "why_work_here");
    const videoLink = str(form, "video_link");
    const emergencyContactName = str(form, "emergency_contact_name");
    const emergencyContactPhone = str(form, "emergency_contact_phone");

    const resume = form.get("resume");
    let resumeBytes: Buffer | null = null;
    let resumeName: string | null = null;
    let resumeMime: string | null = null;
    if (resume instanceof File && resume.size > 0) {
      if (resume.size > MAX_RESUME_BYTES) {
        return Response.json(
          { error: "Resume must be under 5 MB." },
          { status: 400 }
        );
      }
      resumeBytes = Buffer.from(await resume.arrayBuffer());
      resumeName = resume.name;
      resumeMime = resume.type || "application/octet-stream";
    }

    const video = form.get("video_file");
    let videoBytes: Buffer | null = null;
    let videoName: string | null = null;
    let videoMime: string | null = null;
    if (video instanceof File && video.size > 0) {
      if (video.size > MAX_VIDEO_BYTES) {
        return Response.json(
          { error: "Video must be under 25 MB." },
          { status: 400 }
        );
      }
      videoBytes = Buffer.from(await video.arrayBuffer());
      videoName = video.name;
      videoMime = video.type || "application/octet-stream";
    }

    await query(
      `INSERT INTO job_applications
         (full_name, first_name, last_name, email, phone, preferred_loc,
          position, date_of_birth, available_start_date, gender, pronouns,
          retail_experience, schedule_preference, hear_about_us, why_work_here,
          video_link, video_filename, video_mime, video_data,
          emergency_contact_name, emergency_contact_phone,
          resume_filename, resume_data, resume_mime)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)`,
      [
        fullName,
        firstName,
        lastName,
        email,
        phone,
        Number(preferredLoc),
        position,
        dateOfBirth,
        availableStartDate,
        gender,
        pronouns,
        retailExperience,
        schedulePreference,
        hearAboutUs,
        whyWorkHere,
        videoLink,
        videoName,
        videoMime,
        videoBytes,
        emergencyContactName,
        emergencyContactPhone,
        resumeName,
        resumeBytes,
        resumeMime,
      ]
    );

    const loc = await queryOne<{ label: string }>(
      `SELECT name || ' — ' || city || ', ' || state AS label
         FROM locations WHERE id = $1`,
      [Number(preferredLoc)]
    );

    try {
      await sendApplicationEmail({
        position,
        firstName,
        lastName,
        email,
        phone,
        preferredLoc: loc?.label ?? null,
        dateOfBirth,
        availableStartDate,
        gender,
        pronouns,
        retailExperience,
        schedulePreference,
        hearAboutUs,
        whyWorkHere,
        videoLink,
        emergencyContactName,
        emergencyContactPhone,
        resume:
          resumeBytes && resumeName
            ? {
                filename: resumeName,
                content: resumeBytes,
                contentType: resumeMime ?? "application/octet-stream",
              }
            : null,
        video:
          videoBytes && videoName
            ? {
                filename: videoName,
                content: videoBytes,
                contentType: videoMime ?? "application/octet-stream",
              }
            : null,
      });
    } catch (mailErr) {
      console.error("application email failed", mailErr);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("application submit failed", err);
    return Response.json(
      { error: "Could not save your application." },
      { status: 500 }
    );
  }
}
