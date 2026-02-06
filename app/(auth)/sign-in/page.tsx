import type { Metadata } from "next";
import SignInForm from "@/components/Auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Innovare HP",
  description: "Sign in to your Innovare HP account",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return <SignInForm />;
}
