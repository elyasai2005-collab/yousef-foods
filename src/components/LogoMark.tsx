interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Simple bowl-and-bite mark, matching the PWA home-screen icon. */
export function LogoMark({ size = 28, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="48" height="48" rx="13" fill="#191C22" />
      <circle cx="24" cy="24" r="10.5" stroke="#FF8A5B" strokeWidth="2.6" />
      <circle cx="24" cy="24" r="3.1" fill="#FF8A5B" />
    </svg>
  );
}
