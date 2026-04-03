const EASTERN_TIMEZONE = "America/New_York";

export const formatEtDate = (date: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: EASTERN_TIMEZONE,
  }).format(new Date(date));

export const formatEtTime = (date: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: EASTERN_TIMEZONE,
  }).format(new Date(date));

export const formatEtMonth = (date: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: EASTERN_TIMEZONE,
  }).format(new Date(date));

export const formatEtDay = (date: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    timeZone: EASTERN_TIMEZONE,
  }).format(new Date(date));
