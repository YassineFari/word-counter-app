import type { Metadata } from "next";
import PasswordStrengthForm from "./PasswordStrengthForm";

export const metadata: Metadata = {
  title: "Free Password Strength Checker - Test Your Password Security",
  description:
    "Check how strong your password is instantly. Tests length, uppercase, lowercase, numbers, and symbols. 100% local and private — your password never leaves your browser.",
  keywords: [
    "password strength checker",
    "password security",
    "strong password test",
    "password checker",
    "password tester",
    "secure password",
  ],
  openGraph: {
    title: "Password Strength Checker - TextToolsHub",
    description:
      "Check how strong your password is instantly with real-time feedback. 100% local and private.",
    url: "https://texttoolshub.com/password-strength-checker",
    siteName: "TextToolsHub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Strength Checker - TextToolsHub",
    description:
      "Check how strong your password is instantly with real-time feedback. 100% local and private.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://texttoolshub.com/password-strength-checker",
  },
};

export default function PasswordStrengthPage() {
  return <PasswordStrengthForm />;
}
