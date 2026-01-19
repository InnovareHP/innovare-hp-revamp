import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * Gets the current authenticated session
 * @returns The session object if authenticated, null otherwise
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Requires authentication - throws error if not authenticated
 * @returns The authenticated user
 * @throws Error if user is not authenticated
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return session.user;
}

/**
 * Checks if user is authenticated
 * @returns true if authenticated, false otherwise
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Gets the authenticated user ID
 * @returns User ID if authenticated, null otherwise
 */
export async function getCurrentUserId() {
  const session = await getSession();
  return session?.user?.id ?? null;
}

/**
 * Requires admin role - throws error if not admin
 * You can extend this based on your role implementation
 */
export async function requireAdmin() {
  const user = await requireAuth();

  // Add your admin check logic here
  // Example: if (!user.isAdmin) throw new Error("Forbidden: Admin access required");

  return user;
}
