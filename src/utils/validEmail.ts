const REQUIRED_EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function validEmail(email: string): boolean {
  return REQUIRED_EMAIL_REGEX.test(email);
}
