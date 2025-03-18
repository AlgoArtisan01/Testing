import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ",
};

export default function Page() {
  return <SignIn />;
}
