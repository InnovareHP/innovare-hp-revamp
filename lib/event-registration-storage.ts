/**
 * Client-side storage utilities for tracking event registrations
 * Allows users to be recognized without authentication
 */

const STORAGE_KEY = "event_registrations";

export interface StoredRegistration {
  eventId: string;
  email: string;
  name: string;
  registeredAt: string;
}

export function getStoredRegistrations(): StoredRegistration[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading event registrations from storage:", error);
    return [];
  }
}

export function isRegisteredForEvent(eventId: string): boolean {
  const registrations = getStoredRegistrations();
  return registrations.some((reg) => reg.eventId === eventId);
}

export function getEventRegistration(
  eventId: string
): StoredRegistration | null {
  const registrations = getStoredRegistrations();
  return registrations.find((reg) => reg.eventId === eventId) || null;
}

export function storeEventRegistration(
  eventId: string,
  email: string,
  name: string
): void {
  if (typeof window === "undefined") return;

  try {
    const registrations = getStoredRegistrations();

    const existingIndex = registrations.findIndex(
      (reg) => reg.eventId === eventId
    );

    const newRegistration: StoredRegistration = {
      eventId,
      email: email.toLowerCase().trim(),
      name,
      registeredAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      registrations[existingIndex] = newRegistration;
    } else {
      registrations.push(newRegistration);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  } catch (error) {
    console.error("Error storing event registration:", error);
  }
}

export function removeEventRegistration(eventId: string): void {
  if (typeof window === "undefined") return;

  try {
    const registrations = getStoredRegistrations();
    const filtered = registrations.filter((reg) => reg.eventId !== eventId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error removing event registration:", error);
  }
}

export function clearAllRegistrations(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing event registrations:", error);
  }
}

export function getStoredUserEmail(): string | null {
  const registrations = getStoredRegistrations();
  return registrations.length > 0 ? registrations[0].email : null;
}

export function getStoredUserName(): string | null {
  const registrations = getStoredRegistrations();
  return registrations.length > 0 ? registrations[0].name : null;
}
