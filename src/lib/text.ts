/**
 * Orbitron, the display face, ships only basic Latin glyphs, so ă/â/î/ș/ț fall back to
 * another font and look mismatched in big titles. Strip diacritics for text set in
 * `font-display`; body copy keeps them.
 */
const MAP: Record<string, string> = {
  ă: "a", â: "a", î: "i", ș: "s", ş: "s", ț: "t", ţ: "t",
  Ă: "A", Â: "A", Î: "I", Ș: "S", Ş: "S", Ț: "T", Ţ: "T",
};

export function stripDiacritics(text: string): string {
  return text.replace(/[ăâîșşțţĂÂÎȘŞȚŢ]/g, (c) => MAP[c] ?? c);
}
