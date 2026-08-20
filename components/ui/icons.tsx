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

/* The footer's two contact glyphs, supplied by the client as SVG. Heavier and
   more illustrative than the TopBar's PhoneIcon/MailIcon, which are line icons
   sized for 12px text — these sit inside a 28px ring at 15px. Kept inline (not
   in /public) so they inherit `currentColor` on hover. */
export const FooterPhoneIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="15" viewBox="0 0 26 24" fill="none" aria-hidden="true" className={className}>
    <path
      d="M24.0954 4.67079C23.134 3.34789 21.4504 2.15384 19.3546 1.30871C17.2702 0.46818 14.85 0.00338139 12.5397 5.37142e-05C10.2293 -0.00572079 7.80609 0.454282 5.71866 1.28831C3.61928 2.12713 1.93161 3.31599 0.966732 4.63575C0.0399737 5.90336 -0.227121 7.26961 0.19427 8.58683C0.467629 9.44136 1.26505 10.0163 2.17903 10.0176L5.30857 10.0206C5.3096 10.0206 5.31063 10.0206 5.3117 10.0206C5.93574 10.0205 6.52205 9.74736 6.92049 9.27077C7.31472 8.79927 7.47802 8.18306 7.36855 7.58006C7.36537 7.5624 7.36145 7.54478 7.357 7.52731L7.19233 6.88712C8.10421 6.45203 10.1703 5.6114 12.5301 5.62476C14.8881 5.63685 16.9528 6.47699 17.8658 6.91228L17.6985 7.54884C17.6937 7.56685 17.6897 7.58501 17.6863 7.60326C17.5752 8.20591 17.7367 8.82256 18.1295 9.29519C18.5273 9.77379 19.114 10.0487 19.7397 10.0496L22.8692 10.0526C22.8702 10.0526 22.8713 10.0526 22.8724 10.0526C23.7846 10.0525 24.5822 9.48022 24.8577 8.6275C25.283 7.31057 25.0194 5.94236 24.0954 4.67079ZM23.4347 8.16779C23.3605 8.39721 23.1294 8.55723 22.8718 8.55723C22.8716 8.55723 22.8712 8.55723 22.8709 8.55723L19.7414 8.55429C19.5611 8.55405 19.3927 8.4757 19.2794 8.33931C19.2178 8.26517 19.1216 8.11098 19.1531 7.89654L19.4644 6.71213C19.5497 6.38753 19.4083 6.04596 19.1186 5.87654C18.9979 5.80597 16.1202 4.14771 12.5377 4.12926C12.5178 4.12916 12.4985 4.12912 12.4786 4.12912C8.9191 4.12912 6.062 5.78013 5.94146 5.8508C5.65357 6.01963 5.51244 6.35876 5.59558 6.68203L5.90075 7.86835C5.93192 8.08323 5.83517 8.23743 5.77327 8.31152C5.65979 8.44727 5.49154 8.52508 5.31126 8.52508C5.31097 8.52508 5.31067 8.52508 5.31038 8.52508L2.1808 8.52214C1.92324 8.52175 1.69202 8.36094 1.61852 8.13104C1.34486 7.27558 1.5317 6.39644 2.17385 5.51813C3.87963 3.18503 8.22518 1.49521 12.5142 1.49521C12.5219 1.49521 12.53 1.49521 12.5377 1.49521C16.8309 1.50137 21.183 3.20657 22.8859 5.54974C23.5264 6.43143 23.7111 7.31224 23.4347 8.16779Z"
      fill="currentColor"
    />
    <path
      d="M19.6034 13.0829L17.2696 10.6325C17.1284 10.4843 16.9328 10.4004 16.7282 10.4004H15.22V9.38144C15.22 8.96851 14.8853 8.63379 14.4723 8.63379C14.0595 8.63379 13.7247 8.96851 13.7247 9.38144V10.4004H11.3306V9.38144C11.3306 8.96851 10.9959 8.63379 10.583 8.63379C10.1701 8.63379 9.83533 8.96851 9.83533 9.38144V10.4004H8.32715C8.12255 10.4004 7.92685 10.4843 7.78577 10.6325L5.45199 13.0829C3.62216 15.0043 2.61441 17.5236 2.61441 20.1769V23.2527C2.61441 23.6656 2.94914 24.0003 3.36206 24.0003H21.6933C22.1062 24.0003 22.4409 23.6656 22.4409 23.2527V20.1769C22.441 17.5236 21.4333 15.0043 19.6034 13.0829ZM4.10971 22.505V20.1769C4.10971 17.9093 4.97094 15.7562 6.53486 14.1141L8.64764 11.8956H16.4078L18.5206 14.1141C20.0844 15.7561 20.9456 17.9093 20.9456 20.1769V22.505H4.10971Z"
      fill="currentColor"
    />
    <path
      d="M12.5277 13.7715C10.3701 13.7715 8.61481 15.5268 8.61481 17.6844C8.61481 19.842 10.3702 21.5974 12.5277 21.5974C14.6853 21.5974 16.4406 19.842 16.4406 17.6844C16.4406 15.5268 14.6853 13.7715 12.5277 13.7715ZM12.5277 20.102C11.1946 20.102 10.1101 19.0175 10.1101 17.6843C10.1101 16.3513 11.1946 15.2667 12.5277 15.2667C13.8608 15.2667 14.9453 16.3513 14.9453 17.6843C14.9453 19.0175 13.8608 20.102 12.5277 20.102Z"
      fill="currentColor"
    />
  </svg>
);

export const FooterChatIcon = ({ className }: { className?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <path
      d="M0.937296 24C0.816501 24 0.694722 23.9767 0.578709 23.9286C0.228418 23.7835 0 23.4416 0 23.0625L0.000515616 12.1134C-0.0735925 1.39314 12.9721 -4.05739 20.5299 3.54059C28.0075 11.1276 22.6088 24.0094 11.9442 24C10.0551 24 8.25169 23.5763 6.58414 22.7407C4.99074 21.9421 3.06163 22.2642 1.78375 23.542L1.60038 23.7254C1.42104 23.9047 1.18123 24 0.937296 24ZM4.74681 20.4306C5.6572 20.4306 6.57307 20.6378 7.42421 21.0644C8.83119 21.7696 10.3562 22.1265 11.9547 22.125C20.9162 22.1382 25.5086 11.1914 19.1976 4.85986C12.796 -1.54643 1.82903 3.04212 1.87544 12.0999C1.87544 12.1029 1.87548 12.1059 1.87548 12.1089L1.87506 21.1588C2.76342 20.6784 3.75172 20.4306 4.74681 20.4306ZM9.18734 12.0002C9.18734 12.6474 8.66268 13.1721 8.01549 13.1721C6.46104 13.1103 6.46147 10.8898 8.01549 10.8284C8.66268 10.8284 9.18734 11.353 9.18734 12.0002ZM12.0467 10.8284C11.3995 10.8284 10.8748 11.353 10.8748 12.0002C10.9365 13.5546 13.157 13.5542 13.2185 12.0002C13.2185 11.353 12.6939 10.8284 12.0467 10.8284ZM16.0778 10.8284C15.4307 10.8284 14.906 11.353 14.906 12.0002C14.9677 13.5546 17.1882 13.5542 17.2497 12.0002C17.2497 11.353 16.725 10.8284 16.0778 10.8284Z"
      fill="currentColor"
    />
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
