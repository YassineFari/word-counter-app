import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your TextToolsHub account",
};

export default function LoginPage() {
  return <LoginForm />;
}
