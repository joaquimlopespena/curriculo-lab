import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import { templateList } from "../../data/templates";
import type { ResumeData, TemplateDefinition, TemplateId } from "../../types/resume";

interface TemplateCatalogProps {
  onSelect: (templateId: TemplateId) => void;
}

function TemplateThumbnail({ template }: { template: TemplateDefinition }) {
  const Preview = template.Preview as ComponentType<{ data: ResumeData }>;
  const previewData = template.createInitialData() as ResumeData;

  return (
    <div className="h-[280px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
      <div className="origin-top-left scale-[0.2]">
        <div className="w-[794px]">
          <Preview data={previewData} />
        </div>
      </div>
    </div>
  );
}

export function TemplateCatalog({ onSelect }: TemplateCatalogProps) {
  const [search, setSearch] = useState("");

  const filteredTemplates = useMemo(() => {
    const normalized = search.toLowerCase().trim();
    if (!normalized) {
      return templateList;
    }

    return templateList.filter((template) =>
      [template.name, template.category, template.description].join(" ").toLowerCase().includes(normalized),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <label className="flex-1">
            <span className="sr-only">Buscar modelos</span>
            <div className="flex items-center rounded-xl border border-stone-300 bg-stone-50 px-4">
              <span className="text-xl text-stone-500">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
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
            <h3 className="mt-3 line-clamp-2 text-xl font-semibold text-slate-900">{template.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{template.category}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
