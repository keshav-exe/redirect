// Consistent design constants across the app

export const LAYOUT = {
  // Max widths
  maxWidthSm: "28rem",   // 448px - forms, modals, narrow content
  maxWidthMd: "42rem",   // 672px - content pages
  maxWidthLg: "64rem",   // 1024px - main layout, headers, footers
  
  // Padding
  pagePx: "1.5rem",      // 24px - horizontal page padding (px-6)
  headerPy: "1.25rem",   // 20px - header vertical padding (py-5)
  footerPy: "2rem",      // 32px - footer vertical padding (py-8)
  sectionPy: "5rem",     // 80px - section vertical padding (py-20)
} as const;

export const SPACING = {
  // Consistent gap values
  xs: "0.75rem",   // 12px - gap-3
  sm: "1rem",      // 16px - gap-4
  md: "1.5rem",    // 24px - gap-6
  lg: "2rem",      // 32px - gap-8
  xl: "3rem",      // 48px - gap-12
} as const;

export const ANIMATION = {
  // Durations
  fast: "150ms",
  base: "200ms",
  slow: "300ms",
  
  // Easings (from user animation guidelines)
  ease: "ease",
  easeOut: "cubic-bezier(.25, .46, .45, .94)",      // ease-out-quad
  easeOutQuart: "cubic-bezier(.165, .84, .44, 1)",  // ease-out-quart
  easeInOut: "cubic-bezier(.645, .045, .355, 1)",   // ease-in-out-cubic
} as const;

export const BORDER_RADIUS = {
  sm: "0.5rem",   // 8px
  md: "0.75rem",  // 12px
  lg: "1rem",     // 16px
  xl: "1.25rem",  // 20px
} as const;
