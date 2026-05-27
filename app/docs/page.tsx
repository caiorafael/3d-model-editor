import type { Metadata } from "next";
import { DocsPage } from "@/components/features/docs/docs-page";

export const metadata: Metadata = {
  title: "Documentação — 3D Model System",
  description:
    "Referência completa da API ModelBuilder, TextStyle, CutPlacement e OpenJSCAD para criação de modelos 3D via código.",
};

export default function DocumentationPage() {
  return <DocsPage />;
}
