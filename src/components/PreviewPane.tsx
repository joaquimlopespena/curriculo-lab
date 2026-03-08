import type { ComponentType, RefObject } from "react";
import type { ResumeData, TemplateDefinition } from "../types/resume";

interface PreviewPaneProps {
  data: ResumeData;
  template: TemplateDefinition;
  printRef: RefObject<HTMLDivElement | null>;
}

export function PreviewPane({ data, template, printRef }: PreviewPaneProps) {
  const SelectedTemplate = template.Preview as ComponentType<{ data: ResumeData }>;

  return (
    <section className="rounded-3xl border border-stone-200 bg-[#e9e7d5] p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">Preview / PDF</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{template.name}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Margens: {template.pageStyle.pageMargin} | Fonte principal: {template.pageStyle.fontFamily}
          </p>
        </div>
        <div className="rounded-lg bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
          Print
        </div>
      </div>
      <div className="mt-4 overflow-auto rounded-2xl bg-[#e9e7d5] p-4">
        <div ref={printRef} className="mx-auto min-h-[1123px] w-[794px] bg-white">
          <SelectedTemplate data={data} />
        </div>
      </div>
    </section>
  );
}
