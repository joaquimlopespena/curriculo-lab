import { useMemo, type ComponentType } from "react";
import { templateList } from "../../data/templates";
import { toTemplateResumeData } from "../../domain/resume.adapter";
import { createCatalogResume } from "../../domain/resume.factory";
import type { ResumeData, TemplateDefinition, TemplateId } from "../../types/resume";

interface TemplateCatalogProps {
  onSelect: (templateId: TemplateId) => void;
}

function TemplateThumbnail({ template }: { template: TemplateDefinition<any> }) {
  const SelectedTemplate = template.Preview as ComponentType<{ data: ResumeData }>;
  const previewData = useMemo(() => toTemplateResumeData(createCatalogResume(template.id)), [template.id]);

  return (
    <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-[#dfddd7] p-6">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[#d7d4cc]">
        <div className="relative h-[225px] w-[159px] shrink-0 overflow-hidden rounded-md bg-white shadow-xl">
          <div
            className="pointer-events-none absolute left-0 top-0 h-[1123px] w-[794px] origin-top-left"
            style={{ transform: "scale(0.2)" }}
          >
            <SelectedTemplate data={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateCatalog({ onSelect }: TemplateCatalogProps) {
  const filteredTemplates = templateList;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <label className="flex-1">
            <span className="sr-only">Buscar modelos</span>
            <div className="flex items-center rounded-xl border border-stone-300 bg-stone-50 px-4">
              <span className="text-xl text-stone-500">⌕</span>
              <input
                value=""
                readOnly
                placeholder="Busque entre milhares de modelos"
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-700 outline-none"
              />
            </div>
          </label>

          <div className="flex flex-wrap gap-2">
            {["Todos os filtros", "Formato", "Estilo", "Tema", "Preco", "Cor"].map((filter) => (
              <button
                key={filter}
                type="button"
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-slate-700"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">{filteredTemplates.length} modelos</p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        <button
          type="button"
          onClick={() => onSelect("ats-clean")}
          className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center transition hover:border-slate-500 hover:bg-white"
        >
          <span className="text-5xl text-slate-500">+</span>
          <span className="mt-4 text-2xl font-medium text-slate-700">Criar um design de Curriculo em branco</span>
        </button>

        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className="text-left transition hover:-translate-y-0.5"
          >
            <TemplateThumbnail template={template} />
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{template.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{template.category}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
