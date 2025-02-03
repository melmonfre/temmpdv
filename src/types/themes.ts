export type Theme = "light" | "dark";
export type PrimaryColor = "blue" | "purple" | "green" | "orange";

export const themes = {
  light: {
    button: {
      blue: "bg-blue-500 hover:bg-blue-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      green: "bg-green-500 hover:bg-green-600",
      orange: "bg-orange-500 hover:bg-orange-600",
    },
  },
  dark: {
    button: {
      blue: "bg-blue-700 hover:bg-blue-800",
      purple: "bg-purple-700 hover:bg-purple-800",
      green: "bg-green-700 hover:bg-green-800",
      orange: "bg-orange-700 hover:bg-orange-800",
    },
  },
};
