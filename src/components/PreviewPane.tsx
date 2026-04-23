import { useLayoutEffect, useRef, useState, type ComponentType, type RefObject } from "react";
import type { ResumeData, TemplateDefinition } from "../types/resume";

/** ~210mm at 96dpi — used to fit scaled sheet to container width */
const SHEET_WIDTH_PX = 794;

interface PreviewPaneProps {
  data: ResumeData;
  template: TemplateDefinition;
  printRef: RefObject<HTMLDivElement | null>;
}

/** Matches former Tailwind breakpoints (sm / lg / xl / 2xl). */
function sheetScaleCap(viewportWidth: number): number {
  if (viewportWidth >= 1536) return 0.84;
  if (viewportWidth >= 1280) return 0.72;
  if (viewportWidth >= 1024) return 0.82;
  if (viewportWidth >= 640) return 0.72;
  return 0.62;
}

function computeSheetScale(containerWidth: number): number {
  if (containerWidth < 1) return 0.62;
  const cap = sheetScaleCap(typeof window !== "undefined" ? window.innerWidth : 1024);
  const fit = containerWidth / SHEET_WIDTH_PX;
  return Math.min(cap, Math.max(0.35, fit));
}

export function PreviewPane({ data, template, printRef }: PreviewPaneProps) {
  const SelectedTemplate = template.Preview as ComponentType<{ data: ResumeData }>;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() =>
    typeof window !== "undefined" ? computeSheetScale(window.innerWidth - 64) : 0.62,
  );

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => setScale(computeSheetScale(el.clientWidth));
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl border border-stone-200 bg-[#e9e7d5] shadow-sm">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-4 border-b border-stone-300 px-4 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">Preview / PDF</p>
          <h2 className="mt-2 break-words text-xl font-semibold text-slate-900">{template.name}</h2>
          <p className="mt-2 break-words text-sm text-slate-600">
            Margens: {template.pageStyle.pageMargin} | Fonte principal: {template.pageStyle.fontFamily}
          </p>
        </div>
        <div className="rounded-lg bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
          Print
        </div>
      </div>
      <div className="min-w-0 overflow-x-hidden overflow-y-auto bg-[#d9d7c8] p-4">
        <div
          ref={wrapRef}
          className="relative mx-auto aspect-[210/297] w-full max-w-[calc(210mm*0.84)] overflow-hidden rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        >
          <div
            ref={printRef}
            className="resume-sheet resume-sheet--screen absolute left-0 top-0 m-0 box-border h-[297mm] w-[210mm] origin-top-left overflow-hidden bg-white p-0"
            style={{ transform: `scale(${scale})` }}
          >
            <SelectedTemplate data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
