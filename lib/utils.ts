import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-PH", {
    timeZone: "Asia/Manila", // fixed timezone
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("en-PH", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: "2-digit",
    minute: "2-digit",
  });
};
