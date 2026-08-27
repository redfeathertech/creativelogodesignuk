import "server-only";
import nodemailer from "nodemailer";
import { site, contact } from "@/content/site";

/**
 * SMTP delivery. Every submission sends two emails:
 *   1. Notification to the team, with the full submission.
 *   2. Confirmation to the person who submitted it.
 *
 * Configure via .env — see .env.example. If SMTP is not configured the payload
 * is logged instead of thrown, so a misconfiguration never loses a lead or
 * shows the visitor an error.
 */

export interface MailField {
    label: string;
    value: string;
}

let cached: nodemailer.Transporter | null = null;

function transporter(): nodemailer.Transporter | null {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_PORT) return null;

    if (!cached) {
        const port = Number(SMTP_PORT);

        cached = nodemailer.createTransport({
            host: SMTP_HOST,
            port,
            secure: port === 465,
            auth:
                SMTP_USER && SMTP_PASS
                    ? { user: SMTP_USER, pass: SMTP_PASS }
                    : undefined,
        });
    }
    return cached;
}

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const BRAND = "#cc067f";
const INK = "#0d031c";

function shell(heading: string, body: string): string {
    return `<!doctype html>
<html lang="en"><body style="margin:0;padding:24px;background:#f7f6fa;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:${INK}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden">
    <tr><td style="background:${INK};padding:20px 28px">
      <span style="color:#fff;font-size:18px;font-weight:700">${site.name}</span>
    </td></tr>
    <tr><td style="padding:28px">
      <h1 style="margin:0 0 18px;font-size:20px;color:${INK}">${heading}</h1>
      ${body}
    </td></tr>
    <tr><td style="padding:18px 28px;background:#f7f6fa;font-size:12px;color:#55506a">
      ${site.name} · ${contact.phoneDisplay} · ${contact.email}
    </td></tr>
  </table>
</body></html>`;
}

function fieldTable(fields: MailField[]): string {
    const rows = fields
        .filter((f) => f.value.trim() !== "")
        .map(
            (f) => `<tr>
        <td style="padding:8px 0;width:180px;vertical-align:top;color:#55506a;font-size:13px">${escapeHtml(f.label)}</td>
        <td style="padding:8px 0;font-size:14px;color:${INK}">${escapeHtml(f.value).replace(/\n/g, "<br>")}</td>
      </tr>`,
        )
        .join("");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

const fieldText = (fields: MailField[]) =>
    fields
        .filter((f) => f.value.trim() !== "")
        .map((f) => `${f.label}: ${f.value}`)
        .join("\n");

/**
 * Recipient lists are comma- or semicolon-separated in the environment, so the
 * team notification can fan out to several inboxes: `a@x.com, b@x.com`.
 * Blank entries and stray whitespace are dropped.
 */
function recipients(value: string | undefined): string[] {
    return (value ?? "")
        .split(/[,;]/)
        .map((address) => address.trim())
        .filter(Boolean);
}

async function send(options: {
    to: string | string[];
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
}): Promise<void> {
    const tx = transporter();
    const from = process.env.SMTP_FROM ?? `"${site.name}" <${contact.email}>`;

    if (!tx) {
        console.warn(
            `[mail] SMTP not configured — email not sent.\nTo: ${[options.to].flat().join(", ")}\nSubject: ${options.subject}\n${options.text}`,
        );
        return;
    }

    await tx.sendMail({
        from,
        to: options.to,
        // Omitted rather than sent empty: the landing page's callback form collects
        // a phone number and no email, so there is no address to reply to.
        ...(options.replyTo ? { replyTo: options.replyTo } : {}),
        subject: options.subject,
        text: options.text,
        html: options.html,
    });
}

/** Notification to the team. */
export async function sendAdminNotification(params: {
    formName: string;
    fields: MailField[];
    meta: MailField[];
    replyTo?: string;
}): Promise<void> {
    const to = recipients(process.env.LEAD_NOTIFY_TO);
    if (to.length === 0) to.push(contact.email);
    const name =
        params.fields.find((f) => f.label === "Name")?.value ?? "New enquiry";

    await send({
        to,
        replyTo: params.replyTo,
        subject: `${params.formName}: ${name}`,
        text: `${params.formName}\n\n${fieldText(params.fields)}\n\n--\n${fieldText(params.meta)}`,
        html: shell(
            params.formName,
            `${fieldTable(params.fields)}
       <hr style="margin:24px 0;border:none;border-top:1px solid #ecebf1">
       <p style="margin:0 0 8px;font-size:12px;color:#55506a">Submission details</p>
       ${fieldTable(params.meta)}`,
        ),
    });
}

/** Confirmation to the person who submitted the form. */
export async function sendUserConfirmation(params: {
    to: string;
    firstName: string;
}): Promise<void> {
    const greeting = params.firstName ? `Hi ${params.firstName},` : "Hi,";

    const text = `${greeting}

Thanks for getting in touch with ${site.name}.

We've received your enquiry and a member of our team will get back to you as soon as possible — usually within one working day.

If it's urgent, call us on ${contact.phoneDisplay} (${contact.hours}) or reply to this email.

Kind regards,
The ${site.name} team
${site.url}`;

    await send({
        to: params.to,
        subject: `We've received your enquiry — ${site.name}`,
        text,
        html: shell(
            "Thanks for getting in touch",
            `<p style="margin:0 0 14px;font-size:15px;line-height:1.6">${escapeHtml(greeting)}</p>
       <p style="margin:0 0 14px;font-size:15px;line-height:1.6">
         Thanks for contacting <strong>${site.name}</strong>. We've received your enquiry and a member of
         our team will get back to you as soon as possible &mdash; usually within one working day.
       </p>
       <p style="margin:0 0 22px;font-size:15px;line-height:1.6">
         If it's urgent, call us on <a href="tel:${contact.phoneE164}" style="color:${BRAND}">${contact.phoneDisplay}</a>
         (${contact.hours}) or simply reply to this email.
       </p>
       <a href="${site.url}" style="display:inline-block;background:${BRAND};color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:700;font-size:14px">
         Visit our website
       </a>`,
        ),
    });
}
