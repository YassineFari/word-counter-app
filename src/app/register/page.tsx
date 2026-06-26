import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a TextToolsHub account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
