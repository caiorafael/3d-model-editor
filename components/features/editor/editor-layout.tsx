"use client";

import { useJscadRunner } from "@/hooks/use-jscad-runner";
import { CodeEditor } from "./code-editor";
import { EditorToolbar } from "./editor-toolbar";
import { ViewerPanel } from "./viewer-panel";

const layoutClasses = "flex h-full flex-col";

const workspaceClasses = "flex min-h-0 flex-1";

const editorColumnClasses = "w-[45%] shrink-0";

export const EditorLayout = () => {
  useJscadRunner();

  return (
    <div className={layoutClasses}>
      <EditorToolbar />
      <div className={workspaceClasses}>
        <div className={editorColumnClasses}>
          <CodeEditor />
        </div>
        <ViewerPanel />
      </div>
    </div>
  );
};
