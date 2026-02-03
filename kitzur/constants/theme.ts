/**
 * Design System for Kitzur Learning App
 * Navy + Bronze + Teal color palette with comprehensive design tokens
 */

import { Platform } from 'react-native';

type ColorPalette = {
  light: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      light: string;
    };
    accent: {
      main: string;
      light: string;
      bronze: string;
      teal: string;
    };
    background: {
      base: string;
      surface: string;
    };
    surface: {
      card: string;
    };
    text: {
      primary: string;
      secondary: string;
      onPrimary: string;
    };
    border: {
      default: string;
      focus: string;
    };
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  dark: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      light: string;
    };
    accent: {
      main: string;
      light: string;
      bronze: string;
      teal: string;
    };
    background: {
      base: string;
      surface: string;
    };
    surface: {
      card: string;
    };
    text: {
      primary: string;
      secondary: string;
      onPrimary: string;
    };
    border: {
      default: string;
      focus: string;
    };
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
};

export const Colors: ColorPalette = {
  light: {
    primary: {
      main: '#1E3A5F',
      light: '#5A7FAF',
      dark: '#0F1D30',
    },
    secondary: {
      main: '#B08968',
      light: '#D4B89A',
    },
    accent: {
      main: '#2E7D7D',
      light: '#6FB0B0',
      bronze: '#B08968',
      teal: '#2E7D7D',
    },
    background: {
      base: '#FAF7F1',
      surface: '#FFFFFF',
    },
    surface: {
      card: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#4D4D4D',
      onPrimary: '#FFFFFF',
    },
    border: {
      default: '#E6E2DA',
      focus: '#1E3A5F',
    },
    semantic: {
      success: '#2E7D7D',
      warning: '#D97706',
      error: '#DC2626',
      info: '#1E3A5F',
    },
  },
  dark: {
    primary: {
      main: '#AFC4FF',
      light: '#7A9FFF',
      dark: '#5A7FAF',
    },
    secondary: {
      main: '#E0B084',
      light: '#F5D4B5',
    },
    accent: {
      main: '#5FD2C8',
      light: '#8FE0DA',
      bronze: '#E0B084',
      teal: '#5FD2C8',
    },
    background: {
      base: '#0E1220',
      surface: '#171C2A',
    },
    surface: {
      card: '#1F2937',
    },
    text: {
      primary: '#F5F7FA',
      secondary: '#A0A7B3',
      onPrimary: '#0E1220',
    },
    border: {
      default: '#24314A',
      focus: '#AFC4FF',
    },
    semantic: {
      success: '#5FD2C8',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#AFC4FF',
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontSize: {
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 18,
    body: 17,
    bodyLarge: 18,
    bodySmall: 15,
    caption: 13,
    overline: 11,
  },
  lineHeight: {
    tight: 1.2,
    body: 1.6,
    relaxed: 1.8,
  },
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
