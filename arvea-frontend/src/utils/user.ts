export function getUserInitial(firstName?: string | null): string {
  if (!firstName) return "?";

  const trimmedFirstName = firstName.trim();

  if (!trimmedFirstName) return "?";

  return trimmedFirstName.charAt(0).toUpperCase();
}