export type WallpaperColors = {
  [filename: string]: {
    seeds: string[];
    dark: {
      primary: string;
      onPrimary: string;
      secondary: string;
      onSecondary: string;
      tertiary: string;
      onTertiary: string;
      background: string;
      onBackground: string;
      surface: string;
      onSurface: string;
    };
  };
};
