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
    <section className="rounded-[28px] border border-slate-200 bg-white/75 p-6 shadow-paper backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Preview / PDF</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">{template.name}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Margens: {template.pageStyle.pageMargin} | Fonte principal: {template.pageStyle.fontFamily}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white">
          Fidelidade guiada por `modelos/`
        </div>
      </div>
      <div className="mt-6 overflow-auto rounded-[28px] bg-stone-200 p-4">
        <div ref={printRef}>
          <SelectedTemplate data={data} />
        </div>
      </div>
    </section>
  );
}
