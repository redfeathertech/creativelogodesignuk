/** Inline SVG icons. Kept local so no icon font is loaded. */

export const ArrowIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className={className}>
    <path
      d="M1 6h13M9.5 1L14.5 6l-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M11.5 3L5.5 9l6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M6.5 3l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDown = ({ className }: { className?: string }) => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className={className}>
    <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
    <path d="M13 7.13a1 1 0 0 1 0 1.74l-11 6.2A1 1 0 0 1 .5 14.2V1.8A1 1 0 0 1 2 .93l11 6.2Z" />
  </svg>
);

export const CheckIcon = ({ className }: { className?: string } = {}) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path
      d="M4 10.5l4 4 8-9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M6.6 2.2 8.4 5.3a1 1 0 0 1-.2 1.2L6.7 7.9a11 11 0 0 0 5.4 5.4l1.4-1.5a1 1 0 0 1 1.2-.2l3.1 1.8a1 1 0 0 1 .4 1.3l-1 2a1.6 1.6 0 0 1-1.7.9C8.6 16.7 3.3 11.4 2.4 4.5a1.6 1.6 0 0 1 .9-1.7l2-1a1 1 0 0 1 1.3.4Z"
      fill="currentColor"
    />
  </svg>
);

export const MapPinIcon = () => (
  <svg width="15" height="17" viewBox="0 0 16 20" fill="none" aria-hidden="true">
    <path d="M8 1a6 6 0 0 0-6 6c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.2" />
    <path d="M10 4.6V10l3.6 3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const MailIcon = () => (
  <svg width="15" height="12" viewBox="0 0 20 14" fill="none" aria-hidden="true">
    <rect x="0.9" y="0.9" width="18.2" height="12.2" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.4 1.6 10 8.2l8.6-6.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 8.5V6.8c0-.8.2-1.2 1.4-1.2H17V2.6h-2.5c-3 0-4 1.4-4 3.9v2H8.5V11h2v9H14v-9h2.4l.3-2.5H14Z" />
  </svg>
);

export const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6L17.5 3Zm-1 16h1.6L7.6 4.7H5.8L16.5 19Z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </svg>
);

/* The landing page links LinkedIn where the main site links X — the two social
   sets differ, so both icons are needed. */
export const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 9h3.3v11.5H3.3V9Zm5.4 0h3.16v1.57h.05a3.46 3.46 0 0 1 3.12-1.72c3.34 0 3.96 2.2 3.96 5.05v5.6h-3.3v-4.96c0-1.19-.02-2.71-1.65-2.71-1.66 0-1.91 1.29-1.91 2.62v5.05H8.7V9Z" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6.7 12a4.9 4.9 0 0 0 1 2.2 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.5 2.5 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
  </svg>
);

export const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.4"
    aria-hidden="true"
  >
    <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5Z" />
  </svg>
);
