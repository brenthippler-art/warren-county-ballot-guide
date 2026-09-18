export default function EndorsementSeal() {
  return (
    <svg width="17" height="19" viewBox="0 0 26 30" aria-hidden="true">
      <defs>
        <radialGradient id="sealGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f6d888" />
          <stop offset="55%" stopColor="#dba53a" />
          <stop offset="100%" stopColor="#a8730f" />
        </radialGradient>
      </defs>
      <path d="M9 18 L6.4 28.5 L11.3 24.6 Z" fill="#8a5f18" />
      <path d="M17 18 L19.6 28.5 L14.7 24.6 Z" fill="#8a5f18" />
      <path
        d="M13.00,2.00 L15.07,3.93 L17.77,3.09 L18.80,5.73 L21.60,6.14 L21.38,8.96 L23.72,10.55 L22.30,13.00 L23.72,15.45 L21.38,17.04 L21.60,19.86 L18.80,20.27 L17.77,22.91 L15.07,22.07 L13.00,24.00 L10.93,22.07 L8.23,22.91 L7.20,20.27 L4.40,19.86 L4.62,17.04 L2.28,15.45 L3.70,13.00 L2.28,10.55 L4.62,8.96 L4.40,6.14 L7.20,5.73 L8.23,3.09 L10.93,3.93 Z"
        fill="url(#sealGrad)"
        stroke="#8a5f18"
        strokeWidth="0.5"
      />
      <circle cx="13" cy="13" r="7.4" fill="#fff7e4" stroke="#a8730f" strokeWidth="0.75" />
      <path
        d="M9.6 13.2 L12 15.6 L16.6 10.4"
        fill="none"
        stroke="#8a5f18"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
