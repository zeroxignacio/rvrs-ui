import { Colors } from "./types";

export const baseColors = {
  failure: "#ED4B9E",
  primary: "#1E2129",
  primaryBright: "#4E607A",
  primaryDark: "#2e45b3",
  secondary: "#1E2129",
  success: "#31D0AA",
  warning: "#FFB237",
};

export const brandColors = {
  binance: "#F0B90B",
};

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: "#FAF9FA",
  backgroundDisabled: "#1A1C2C",
  contrast: "#191326",
  invertedContrast: "#1A1C2C",
  input: "#eeeaf4",
  tertiary: "#EFF4F5",
  text: '#1E2129',
  textDisabled: '#b7c2c9',
  textSubtle: '#729ec2',
  borderColor: "#1A1C2C",
  card: "#1A1C2C",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: "#2e45b3",
  background: "#343135",
  backgroundDisabled: "#3c3742",
  contrast: "#1A1C2C",
  invertedContrast: "#191326",
  input: "#483f5a",
  // primaryDark: "#0098A1",
  tertiary: "#353547",
  text: "#1E2129",
  textDisabled: "#666171",
  textSubtle: "#c9c4d4",
  borderColor: "#524B63",
  card: "#27262c",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
  },
};
