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
    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-[#e9e7d5] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300 px-4 py-4">
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
      <div className="overflow-x-hidden overflow-y-auto bg-[#d9d7c8] p-4">
        <div
          className="relative mx-auto shrink-0 overflow-hidden rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.08)] w-[calc(210mm*0.62)] h-[calc(297mm*0.62)] sm:w-[calc(210mm*0.72)] sm:h-[calc(297mm*0.72)] lg:w-[calc(210mm*0.82)] lg:h-[calc(297mm*0.82)] xl:w-[calc(210mm*0.72)] xl:h-[calc(297mm*0.72)] 2xl:w-[calc(210mm*0.84)] 2xl:h-[calc(297mm*0.84)]"
        >
          <div
            ref={printRef}
            className="resume-sheet resume-sheet--screen absolute left-0 top-0 m-0 h-[297mm] min-h-[297mm] w-[210mm] min-w-[210mm] origin-top-left scale-[0.62] overflow-hidden bg-white p-0 sm:scale-[0.72] lg:scale-[0.82] xl:scale-[0.72] 2xl:scale-[0.84]"
          >
            <SelectedTemplate data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
