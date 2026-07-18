import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const UpworkLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M18.571 5.385c-2.316 0-3.921 1.63-4.577 3.424-1.25-1.921-2.148-4.223-2.617-6.26h-2.92v9.336c0 1.643-1.332 2.975-2.974 2.975s-2.974-1.332-2.974-2.975v-9.336h-2.92v9.336c0 3.25 2.643 5.894 5.894 5.894s5.894-2.643 5.894-5.894v-3.003c.365 1.107 1.054 2.144 2.052 2.872l-2.072 6.002h3.045l1.455-4.275c1.171.745 2.607 1.157 4.198 1.157 3.013 0 5.46-2.447 5.46-5.46v-.004c0-3.013-2.447-5.46-5.46-5.46zm0 8.001c-1.398 0-2.541-.884-2.955-2.112l.004-.012c.31-.884.97-1.859 1.83-2.433.344-.23.73-.345 1.121-.345 1.401 0 2.541 1.14 2.541 2.541-.001 1.401-1.141 2.561-2.541 2.561z" />
  </svg>
);

export const FiverrLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 512 512"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M440.3 355.6c0 15.6-5.6 28.5-16.7 38.6c-11.1 10.1-25.9 15.2-44.5 15.2c-15.6 0-30.8-3.4-45.7-10.2l-10.2-4.6l-20.4 61.2c22.3 9.3 49.2 13.9 80.7 13.9c41.3 0 74-12.4 98.3-37.1c24.3-24.7 36.4-58.8 36.4-102V242.4h50.1v-62.1h-50.1V128H440.3v52.3h-44.1v62.1h44.1v113.2zm-222-113.2c-11.7-16-27-24.1-45.9-24.1c-19.1 0-34.6 8.1-46.4 24.3c-11.8 16.2-17.7 38.3-17.7 66.3c0 28 5.9 50.1 17.7 66.3c11.8 16.2 27.3 24.3 46.4 24.3c18.9 0 34.2-8.1 45.9-24.2c11.7-16.1 17.6-38.2 17.6-66.4s-5.9-50.3-17.6-66.5zm102.2 66.5c0 46.8-11.2 83.2-33.5 109.3c-22.3 26.1-53.1 39.1-92.4 39.1c-28.8 0-53.5-7.4-74.2-22.3V496H0V180.3h104.8v22.3c20.2-16.2 44.7-24.3 73.3-24.3c39.3 0 70.1 13 92.4 39.1c22.3 26.1 33.5 62.4 33.5 109.4z" />
  </svg>
);

export const LinkedInLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const GoogleLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const FacebookLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

export const TrustpilotLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
  >
    <path
      fill="#00B67A"
      d="M22.03 9.38l-7.39-.14L12.02 2.5l-2.62 6.74-7.39.14 5.89 4.46-2.13 7.06 6.25-4.22 6.25 4.22-2.13-7.06 5.89-4.46zm-10.01 4.7l-2.34 1.58.8-2.64-2.21-1.68 2.77-.05.98-2.52.98 2.52 2.77.05-2.21 1.68.8 2.64-2.34-1.58z"
    />
  </svg>
);

export const PeoplePerHourLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm-1.5-3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1z" />
  </svg>
);

export const FreelancerLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M12.183 2L1 11.238l3.754 8.788 8.423-4.838zM23 11.238L11.817 2v13.188l8.429 4.838z" />
  </svg>
);

export const CustomLogoPlaceholder: React.FC<LogoProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const VerifiedIcon: React.FC<LogoProps> = ({ className = '', size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

export const PlatformLogoSelector: React.FC<{
  platform: string;
  size?: number;
  className?: string;
  customUrl?: string;
}> = ({ platform, size = 24, className = '', customUrl }) => {
  if (platform === 'custom' && customUrl) {
    return (
      <img
        src={customUrl}
        alt="Custom Platform Logo"
        style={{ width: size, height: size, objectFit: 'contain' }}
        className={className}
        referrerPolicy="no-referrer"
      />
    );
  }

  switch (platform) {
    case 'upwork':
      return <UpworkLogo size={size} className={`text-[#14a800] ${className}`} />;
    case 'fiverr':
      return <FiverrLogo size={size} className={`text-[#1dbf73] ${className}`} />;
    case 'linkedin':
      return <LinkedInLogo size={size} className={`text-[#0a66c2] ${className}`} />;
    case 'google':
      return <GoogleLogo size={size} className={className} />;
    case 'facebook':
      return <FacebookLogo size={size} className={`text-[#1877f2] ${className}`} />;
    case 'trustpilot':
      return <TrustpilotLogo size={size} className={className} />;
    case 'peopleperhour':
      return <PeoplePerHourLogo size={size} className={`text-[#ff5a00] ${className}`} />;
    case 'freelancer':
      return <FreelancerLogo size={size} className={`text-[#29b6f6] ${className}`} />;
    default:
      return <CustomLogoPlaceholder size={size} className={`text-slate-400 ${className}`} />;
  }
};
