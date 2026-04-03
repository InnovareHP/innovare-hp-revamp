import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMonth = (date: Date) => {
  return new Date(date).toLocaleDateString("en-PH", {
    timeZone: "Asia/Manila",
    month: "short",
  });
};

export const formatDay = (date: Date) => {
  return new Date(date).toLocaleDateString("en-PH", {
    timeZone: "Asia/Manila",
    day: "2-digit",
  });
};

export const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("en-PH", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
