import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Editor — 3D Model System",
  description: "OpenJSCAD editor with real-time 3D preview",
};

interface EditorLayoutProps {
  children: ReactNode;
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  return <div className="h-dvh overflow-hidden">{children}</div>;
}
