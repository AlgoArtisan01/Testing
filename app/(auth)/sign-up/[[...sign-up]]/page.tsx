import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | GreedyPI",
};

export default function Page() {
  return <SignUp />;
}
