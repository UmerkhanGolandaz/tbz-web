export default function Logo({ size = 56 }: { size?: number }) {
  // Native aspect ratio roughly 1.4:1
  const height = Math.round((size * 90) / 129);
  
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 129 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height }}
      className="select-none pointer-events-none"
    >
      {/* "tbz" text */}
      <text
        x="64.5"
        y="55"
        fontFamily="Times New Roman, serif"
        fontSize="60"
        fill="#D4AF37"
        textAnchor="middle"
        className="font-serif tracking-tighter"
        style={{ fontVariant: "small-caps" }}
      >
        tbz
      </text>
      
      {/* The golden sweeping underline */}
      <path
        d="M20,60 Q64.5,45 109,60"
        stroke="#D4AF37"
        strokeWidth="1.5"
        fill="transparent"
      />
      <circle cx="20" cy="60" r="1.5" fill="#D4AF37" />
      <circle cx="109" cy="60" r="1.5" fill="#D4AF37" />
      
      {/* "The original since 1864" */}
      <text
        x="64.5"
        y="78"
        fontFamily="sans-serif"
        fontSize="7"
        fontWeight="bold"
        fill="#D4AF37"
        textAnchor="middle"
        letterSpacing="0.1em"
      >
        THE ORIGINAL SINCE 1864
      </text>
    </svg>
  );
}
