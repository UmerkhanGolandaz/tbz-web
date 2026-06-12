export default function Logo({ size = 56 }: { size?: number }) {
  // Native aspect ratio of the tbz png is roughly 1.4:1
  const height = Math.round((size * 90) / 129);
  
  return (
    <img
      src="https://www.tbztheoriginal.com/images/logo.png"
      alt="TBZ · The Original"
      width={size}
      height={height}
      style={{ width: size, height, objectFit: 'contain' }}
      draggable={false}
      className="select-none pointer-events-none"
    />
  );
}
