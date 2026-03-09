import { useMemo, type ComponentType } from "react";
import { templateList } from "../../data/templates";
import { toTemplateResumeData } from "../../domain/resume.adapter";
import { createCatalogResume } from "../../domain/resume.factory";
import type { ResumeData, TemplateDefinition, TemplateId } from "../../types/resume";

interface TemplateCatalogProps {
  onSelect: (templateId: TemplateId) => void;
}

const CATEGORY_ACCENTS: Record<string, string> = {
  Compatibilidade: "from-slate-900 via-slate-800 to-slate-700",
  Executivo: "from-blue-900 via-blue-800 to-sky-700",
  Academico: "from-stone-800 via-stone-700 to-stone-600",
  Administrativo: "from-teal-900 via-cyan-800 to-sky-700",
  Branding: "from-orange-700 via-amber-600 to-rose-500",
  Criativo: "from-fuchsia-700 via-rose-600 to-orange-500",
  Essencial: "from-slate-700 via-slate-600 to-slate-500",
  Profissional: "from-indigo-800 via-blue-700 to-cyan-600",
  Servicos: "from-emerald-800 via-emerald-700 to-teal-600",
  Visual: "from-violet-800 via-indigo-700 to-blue-600",
  Foto: "from-rose-800 via-rose-700 to-orange-500",
  Premium: "from-slate-950 via-slate-800 to-slate-700",
  Classico: "from-stone-700 via-stone-600 to-zinc-500",
  Personalizado: "from-amber-800 via-amber-700 to-orange-500",
  Corporativo: "from-sky-900 via-blue-800 to-cyan-700",
  Tradicional: "from-amber-950 via-amber-800 to-stone-700",
  Editorial: "from-zinc-900 via-zinc-800 to-zinc-600",
};

function TemplateThumbnail({ template }: { template: TemplateDefinition<any> }) {
  const SelectedTemplate = template.Preview as ComponentType<{ data: ResumeData }>;
  const previewData = useMemo(() => toTemplateResumeData(createCatalogResume(template.id)), [template.id]);
  const accent = CATEGORY_ACCENTS[template.category] ?? "from-slate-900 via-slate-800 to-slate-600";

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div className={`h-24 bg-gradient-to-r ${accent}`} />
      <div className="absolute inset-x-0 top-5 flex justify-center px-6">
        <div className="relative h-[225px] w-[159px] shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.18)]">
          <div
            className="pointer-events-none absolute left-0 top-0 h-[1123px] w-[794px] origin-top-left"
            style={{ transform: "scale(0.2)" }}
          >
            <SelectedTemplate data={previewData} />
          </div>
        </div>
      </div>

      <div className="relative px-5 pb-5 pt-[192px]">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {template.category}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Preview</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-500">{template.description}</p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
}

function BlankTemplateCard({ onSelect }: { onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex min-h-[380px] flex-col overflow-hidden rounded-[28px] border border-dashed border-slate-300 bg-white text-left transition hover:-translate-y-0.5 hover:border-slate-500"
    >
      <div className="flex h-24 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_65%)]">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 text-4xl text-slate-500 transition group-hover:border-slate-500 group-hover:text-slate-700">
          +
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Em branco
          </span>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-slate-900">
            Comecar um curriculo do zero
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Abra o editor com uma base limpa e preencha cada etapa manualmente.
          </p>
        </div>
        <span className="mt-6 text-sm font-semibold text-slate-700">Usar layout base</span>
      </div>
    </button>
  );
}

export function TemplateCatalog({ onSelect }: TemplateCatalogProps) {
  const filteredTemplates = templateList;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
        <label className="block">
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

        <p className="mt-4 text-sm text-slate-500">{filteredTemplates.length} modelos</p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        <BlankTemplateCard onSelect={() => onSelect("ats-clean")} />

        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className="text-left transition hover:-translate-y-0.5"
          >
            <TemplateThumbnail template={template} />
            <div className="mt-4 px-1">
              <h3 className="text-xl font-semibold text-slate-900">{template.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{template.category}</p>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}
