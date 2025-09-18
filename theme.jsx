// theme.js
const theme = {
  colors: {
    primary: '#FF7A00',      // CitiSolve orange (main accent)
    accent: '#4E9BDE',       // blue secondary
    success: '#34C759',
    danger: '#FF3B30',
    background: '#F3F6F9',   // app background
    card: '#FFFFFF',
    muted: '#9CA3AF',        // gray for secondary text
    text: '#111827',         // main text
    white: '#FFFFFF',
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 36,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  fontSize: {
    h1: 26,
    h2: 20,
    body: 16,
    small: 13,
  },
  shadow: {
    subtle: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};

export default theme;
