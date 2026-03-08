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
      <div className="overflow-auto bg-[#d9d7c8] p-4">
        <div className="flex min-w-fit justify-center">
          <div className="origin-top scale-[0.62] sm:scale-[0.72] lg:scale-[0.82] xl:scale-[0.72] 2xl:scale-[0.84]">
            <div
              ref={printRef}
              className="resume-sheet resume-sheet--screen w-[210mm] h-[297mm] min-w-[210mm] min-h-[297mm] overflow-hidden bg-white p-0 m-0"
            >
              <SelectedTemplate data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
