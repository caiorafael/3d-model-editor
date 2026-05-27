"use client";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ExportStlDialog } from "@/components/features/editor/export-stl-dialog";
import { useStlExport } from "@/hooks/use-stl-export";
import { useStlUpload } from "@/hooks/use-stl-upload";
import type { EditorStatus } from "@/interfaces/editor.interface";
import { useEditorStore } from "@/store/editor.store";
import {
  CubeIcon,
  DownloadIcon,
  MoonIcon,
  PlayIcon,
  SunIcon,
  UploadIcon,
} from "./editor-icons";

const toolbarClasses =
  "flex h-12 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900";

const logoClasses = "flex items-center gap-2.5";

const logoIconClasses =
  "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white";

const titleClasses = "text-sm font-semibold text-neutral-900 dark:text-neutral-100";

const subtitleClasses = "text-xs text-neutral-500 dark:text-neutral-400";

const actionsClasses = "flex items-center gap-2";

const hiddenInputClasses = "hidden";

const statusClasses =
  "hidden items-center gap-2 rounded-lg bg-neutral-100 px-3 py-1.5 sm:flex dark:bg-neutral-800";

const statusTextClasses = "text-xs text-neutral-500 dark:text-neutral-400";

const statusConfig: Record<
  EditorStatus,
  { label: string; dotClass: string }
> = {
  idle: {
    label: "Idle",
    dotClass: "bg-neutral-400",
  },
  running: {
    label: "Running…",
    dotClass: "bg-amber-500 animate-pulse",
  },
  ready: {
    label: "Ready",
    dotClass: "bg-emerald-500",
  },
  error: {
    label: "Error",
    dotClass: "bg-red-500",
  },
};

export const EditorToolbar = () => {
  const status = useEditorStore((state) => state.status);
  const requestRun = useEditorStore((state) => state.requestRun);
  const { fileInputRef, openFilePicker, handleFileChange } = useStlUpload();
  const stlExport = useStlExport();
  const { label, dotClass } = statusConfig[status];

  return (
    <>
      <header className={toolbarClasses}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".stl"
        className={hiddenInputClasses}
        onChange={handleFileChange}
        aria-hidden
        tabIndex={-1}
      />
      <div className={logoClasses}>
        <div className={logoIconClasses}>
          <CubeIcon />
        </div>
        <div>
          <p className={titleClasses}>3D Model System</p>
          <p className={subtitleClasses}>OpenJSCAD Editor</p>
        </div>
      </div>

      <div className={actionsClasses}>
        <div className={statusClasses}>
          <span className={`h-2 w-2 rounded-full ${dotClass}`} />
          <span className={statusTextClasses}>{label}</span>
        </div>

        <Button variant="secondary" size="sm" onClick={openFilePicker}>
          <UploadIcon />
          Upload STL
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={stlExport.openDialog}
          disabled={!stlExport.canExport}
        >
          <DownloadIcon />
          Export STL
        </Button>

        <Button size="sm" onClick={requestRun}>
          <PlayIcon />
          Run
        </Button>

        <IconButton label="Toggle theme">
          <SunIcon className="h-4 w-4 dark:hidden" />
          <MoonIcon className="hidden h-4 w-4 dark:block" />
        </IconButton>
      </div>
    </header>

      <ExportStlDialog
        isOpen={stlExport.isOpen}
        fileName={stlExport.fileName}
        format={stlExport.format}
        exportError={stlExport.exportError}
        isExporting={stlExport.isExporting}
        canExport={stlExport.canExport}
        preview={stlExport.preview}
        onClose={stlExport.closeDialog}
        onFileNameChange={stlExport.setFileName}
        onFormatChange={stlExport.setFormat}
        onExport={stlExport.handleExport}
      />
    </>
  );
};
