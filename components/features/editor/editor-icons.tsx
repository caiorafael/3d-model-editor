interface EditorIconProps {
  className?: string;
}

export const PlayIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4 2.5v11l9-5.5-9-5.5z" />
  </svg>
);

export const DownloadIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M8 2v8M5 7l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 13h10" strokeLinecap="round" />
  </svg>
);

export const UploadIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M8 10V2M5 5l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 13h10" strokeLinecap="round" />
  </svg>
);

export const CubeIcon = ({ className = "h-5 w-5" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      d="M10 3L3 7v6l7 4 7-4V7l-7-4z"
      strokeLinejoin="round"
    />
    <path d="M3 7l7 4 7-4M10 11V7" strokeLinejoin="round" />
  </svg>
);

export const GridIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M2 8h12M8 2v12" strokeLinecap="round" />
    <rect x="2" y="2" width="12" height="12" rx="1" />
  </svg>
);

export const WireframeIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M3 5l5-3 5 3v6l-5 3-5-3V5z" strokeLinejoin="round" />
    <path d="M8 2v12M3 5l5 3 5-3M3 11l5-3 5 3" strokeLinejoin="round" />
  </svg>
);

export const ResetViewIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      d="M2.5 8a5.5 5.5 0 1 0 1.5-3.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 4v4h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SunIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" strokeLinecap="round" />
  </svg>
);

export const MoonIcon = ({ className = "h-4 w-4" }: EditorIconProps) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      d="M6.5 2.5a5.5 5.5 0 1 0 6 6 4.5 4.5 0 0 1-6-6z"
      strokeLinejoin="round"
    />
  </svg>
);
