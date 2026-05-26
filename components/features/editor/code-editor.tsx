"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useEditorStore } from "@/store/editor.store";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const panelClasses =
  "flex h-full min-w-0 flex-col border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950";

const headerClasses =
  "flex h-10 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900";

const tabClasses =
  "flex items-center gap-2 rounded-md bg-neutral-100 px-3 py-1 dark:bg-neutral-800";

const tabDotClasses = "h-2 w-2 rounded-full bg-cyan-400";

const tabNameClasses = "font-mono text-xs text-neutral-700 dark:text-neutral-300";

const metaClasses = "font-mono text-xs text-neutral-400 dark:text-neutral-500";

const editorWrapperClasses = "flex-1 overflow-hidden";

const errorClasses =
  "shrink-0 border-t border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400";

const useEditorTheme = () => {
  const [theme, setTheme] = useState<"vs-dark" | "vs-light">("vs-light");

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.classList.contains("dark") ? "vs-dark" : "vs-light",
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};

export const CodeEditor = () => {
  const code = useEditorStore((state) => state.code);
  const error = useEditorStore((state) => state.error);
  const cursorPosition = useEditorStore((state) => state.cursorPosition);
  const setCode = useEditorStore((state) => state.setCode);
  const setCursorPosition = useEditorStore((state) => state.setCursorPosition);
  const theme = useEditorTheme();

  return (
    <section className={panelClasses} aria-label="Code editor">
      <div className={headerClasses}>
        <div className={tabClasses}>
          <span className={tabDotClasses} />
          <span className={tabNameClasses}>main.jscad</span>
        </div>
        <span className={metaClasses}>
          Ln {cursorPosition.line}, Col {cursorPosition.column}
        </span>
      </div>

      <div className={editorWrapperClasses}>
        <MonacoEditor
          height="100%"
          language="javascript"
          theme={theme}
          value={code}
          onChange={(value) => setCode(value ?? "")}
          onMount={(editor) => {
            editor.onDidChangeCursorPosition((event) => {
              setCursorPosition({
                line: event.position.lineNumber,
                column: event.position.column,
              });
            });
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 12 },
          }}
        />
      </div>

      {error && <p className={errorClasses}>{error}</p>}
    </section>
  );
};
