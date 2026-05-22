/* eslint-disable @next/next/no-img-element */
export default function Logo({ size = 56 }: { size?: number }) {
  // Native aspect ratio of /public/tbz-logo.png is 129:90
  const height = Math.round((size * 90) / 129);
  return (
    <img
      src="/tbz-logo.png"
      alt="TBZ · The Original"
      width={size}
      height={height}
      style={{ width: size, height }}
      draggable={false}
    />
  );
}
