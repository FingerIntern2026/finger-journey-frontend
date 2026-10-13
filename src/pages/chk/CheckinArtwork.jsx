// Keep transparent padding and unrelated screenshot areas out of the layout.
// Coordinates refer to the original asset, so the crop scales with the screen.
export default function CheckinArtwork({ src, title, viewBox, width, height, className }) {
  return <svg className={className} viewBox={viewBox} role="img" aria-label={title}>
    <image href={src} width={width} height={height} />
  </svg>;
}
