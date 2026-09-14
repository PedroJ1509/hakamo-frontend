import type { Metadata } from "next";
import { CvLanding } from "@/app/components/visual-kit/landing/cv-landing";

export const metadata: Metadata = {
  title: "Postúlate aquí — Empleo Hakamo",
  description:
    "Encuentra vacantes y deja tu CV con Hakamo. Crea tu currículum paso a paso o súbelo gratis. Empleo en República Dominicana.",
};

export default function CvPage() {
  return <CvLanding />;
}
