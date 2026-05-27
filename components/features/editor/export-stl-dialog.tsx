"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type {
  StlExportFormat,
  StlExportPreview,
} from "@/interfaces/stl-export.interface";

interface ExportStlDialogProps {
  isOpen: boolean;
  fileName: string;
  format: StlExportFormat;
  exportError: string | null;
  isExporting: boolean;
  canExport: boolean;
  preview: StlExportPreview | null;
  onClose: () => void;
  onFileNameChange: (value: string) => void;
  onFormatChange: (value: StlExportFormat) => void;
  onExport: () => void;
}

const overlayClasses =
  "fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-sm";

const dialogClasses = "w-full max-w-md p-6 shadow-md";

const headerClasses = "mb-6";

const titleClasses = "text-lg font-semibold text-neutral-900 dark:text-neutral-100";

const descriptionClasses = "mt-1 text-sm text-neutral-500 dark:text-neutral-400";

const sectionClasses = "space-y-4";

const formatGroupClasses = "grid grid-cols-2 gap-2";

const formatButtonBase =
  "rounded-lg border px-3 py-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";

const formatButtonActive =
  "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40";

const formatButtonInactive =
  "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800";

const formatTitleClasses = "text-sm font-medium text-neutral-900 dark:text-neutral-100";

const formatHintClasses = "mt-0.5 text-xs text-neutral-500 dark:text-neutral-400";

const statsCardClasses =
  "rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950";

const statsGridClasses = "grid grid-cols-2 gap-3";

const statLabelClasses = "text-xs text-neutral-500 dark:text-neutral-400";

const statValueClasses = "mt-0.5 font-mono text-sm text-neutral-900 dark:text-neutral-100";

const errorClasses =
  "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400";

const footerClasses = "mt-6 flex justify-end gap-2";

const formatOptions: {
  value: StlExportFormat;
  title: string;
  hint: string;
}[] = [
  {
    value: "binary",
    title: "Binary",
    hint: "Recommended for slicers and 3D printing",
  },
  {
    value: "ascii",
    title: "ASCII",
    hint: "Human-readable, larger file size",
  },
];

const formatDimension = (value: number) => `${value.toFixed(1)} mm`;

export const ExportStlDialog = ({
  isOpen,
  fileName,
  format,
  exportError,
  isExporting,
  canExport,
  preview,
  onClose,
  onFileNameChange,
  onFormatChange,
  onExport,
}: ExportStlDialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={overlayClasses}
      role="presentation"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
    >
      <Card
        className={dialogClasses}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="export-stl-title"
        >
          <div className={headerClasses}>
            <h2 id="export-stl-title" className={titleClasses}>
              Export STL
            </h2>
            <p className={descriptionClasses}>
              Download your model for slicing and 3D printing.
            </p>
          </div>

          <div className={sectionClasses}>
          <Input
            label="File name"
            value={fileName}
            onChange={(event) => onFileNameChange(event.target.value)}
            placeholder="model"
            autoFocus
          />

          <div>
            <p className="mb-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Format
            </p>
            <div className={formatGroupClasses}>
              {formatOptions.map((option) => {
                const isActive = format === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`${formatButtonBase} ${
                      isActive ? formatButtonActive : formatButtonInactive
                    }`}
                    onClick={() => onFormatChange(option.value)}
                  >
                    <p className={formatTitleClasses}>{option.title}</p>
                    <p className={formatHintClasses}>{option.hint}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {preview && (
            <div className={statsCardClasses}>
              <div className={statsGridClasses}>
                <div>
                  <p className={statLabelClasses}>Dimensions</p>
                  <p className={statValueClasses}>
                    {preview.dimensions
                      ? `${formatDimension(preview.dimensions.width)} × ${formatDimension(preview.dimensions.depth)} × ${formatDimension(preview.dimensions.height)}`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className={statLabelClasses}>Triangles</p>
                  <p className={statValueClasses}>
                    {preview.triangleCount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className={statLabelClasses}>Parts</p>
                  <p className={statValueClasses}>{preview.partCount}</p>
                </div>
                <div>
                  <p className={statLabelClasses}>Output</p>
                  <p className={statValueClasses}>{preview.fileName}.stl</p>
                </div>
              </div>
            </div>
          )}

          {!canExport && (
            <p className={errorClasses}>
              Run your code and wait for the preview to be ready before exporting.
            </p>
          )}

          {exportError && <p className={errorClasses}>{exportError}</p>}
        </div>

          <div className={footerClasses}>
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button size="sm" onClick={onExport} disabled={!canExport || isExporting}>
              {isExporting ? "Exporting…" : "Export STL"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
