import type { Metadata } from "next";
import { LandingPage } from "@/components/features/landing/landing-page";

export const metadata: Metadata = {
  title: "3D Model System — Code-first 3D modeling",
  description:
    "Transforme código OpenJSCAD em modelos 3D prontos para impressão. Editor IDE com preview em tempo real, direto no navegador.",
};

export default function Home() {
  return <LandingPage />;
}
