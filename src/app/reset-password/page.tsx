import type { Metadata } from "next";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | TextToolsHub",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
