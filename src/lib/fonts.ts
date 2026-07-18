/**
 * Font Family dynamic resolver based on selected aesthetic and active language.
 * Ensures that high-quality, readable standard system fonts are loaded and prioritized,
 * such as 'Cairo' for Arabic, 'Noto Sans Bengali' for Bengali, and 'Inter' / 'Poppins' for Latin scripts.
 */
export const getLanguageAgnosticFontFamily = (
  selectedFont: 'inter' | 'poppins' | 'manrope' | 'space' | 'playfair' | 'mono',
  language: string
): string => {
  // Normalize language string
  const lang = (language || 'en').toLowerCase();

  if (lang === 'ar') {
    // Priority: Cairo (primary sans), Noto Sans Arabic, Amiri (for elegant serif)
    if (selectedFont === 'playfair') {
      return '"Amiri", "Cairo", "Noto Sans Arabic", serif';
    }
    if (selectedFont === 'mono') {
      return '"Cairo", "Noto Sans Arabic", ui-monospace, SFMono-Regular, monospace';
    }
    return '"Cairo", "Noto Sans Arabic", sans-serif';
  }

  if (lang === 'bn') {
    // Priority: Noto Sans Bengali, Arial, sans-serif
    if (selectedFont === 'playfair') {
      return '"Noto Sans Bengali", serif';
    }
    if (selectedFont === 'mono') {
      return '"Noto Sans Bengali", ui-monospace, SFMono-Regular, monospace';
    }
    return '"Noto Sans Bengali", sans-serif';
  }

  // Western / Default mapping
  switch (selectedFont) {
    case 'poppins':
      return '"Poppins", "Inter", sans-serif';
    case 'manrope':
      return '"Manrope", "Inter", sans-serif';
    case 'space':
      return '"Space Grotesk", "Inter", sans-serif';
    case 'playfair':
      return '"Playfair Display", "Georgia", serif';
    case 'mono':
      return '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';
    case 'inter':
    default:
      return '"Inter", sans-serif';
  }
};
