import { useMemo, useState } from "react";
import { templateList } from "../../data/templates";
import type { TemplateDefinition, TemplateId } from "../../types/resume";

interface TemplateCatalogProps {
  onSelect: (templateId: TemplateId) => void;
}

const THUMBNAIL_STYLES: Record<
  TemplateId,
  {
    shell: string;
    panel: string;
    accent: string;
    layout: "topbar" | "sidebar" | "split" | "timeline" | "cards";
  }
> = {
  "modelo-1": {
    shell: "bg-white",
    panel: "bg-slate-50",
    accent: "bg-slate-700",
    layout: "topbar",
  },
  "ats-clean": {
    shell: "bg-white",
    panel: "bg-zinc-50",
    accent: "bg-zinc-900",
    layout: "topbar",
  },
  "split-professional": {
    shell: "bg-white",
    panel: "bg-slate-100",
    accent: "bg-slate-700",
    layout: "split",
  },
  "service-classic": {
    shell: "bg-white",
    panel: "bg-emerald-50",
    accent: "bg-emerald-700",
    layout: "split",
  },
  "executive-clean": {
    shell: "bg-white",
    panel: "bg-sky-50",
    accent: "bg-sky-700",
    layout: "topbar",
  },
  "chronological-elegant": {
    shell: "bg-white",
    panel: "bg-stone-50",
    accent: "bg-stone-700",
    layout: "timeline",
  },
  "modelo-executivo-timeline": {
    shell: "bg-white",
    panel: "bg-slate-50",
    accent: "bg-slate-900",
    layout: "timeline",
  },
  "modelo-corporativo-balanceado": {
    shell: "bg-white",
    panel: "bg-blue-50",
    accent: "bg-blue-700",
    layout: "split",
  },
  "modelo-corporativo-wave": {
    shell: "bg-white",
    panel: "bg-cyan-50",
    accent: "bg-cyan-700",
    layout: "topbar",
  },
  "modelo-juridico-classico": {
    shell: "bg-white",
    panel: "bg-stone-100",
    accent: "bg-amber-800",
    layout: "topbar",
  },
  "academico-serif": {
    shell: "bg-white",
    panel: "bg-stone-50",
    accent: "bg-stone-900",
    layout: "topbar",
  },
  "foto-compacto": {
    shell: "bg-white",
    panel: "bg-sky-50",
    accent: "bg-sky-700",
    layout: "sidebar",
  },
  "visual-modern": {
    shell: "bg-white",
    panel: "bg-indigo-50",
    accent: "bg-indigo-700",
    layout: "sidebar",
  },
  "modelo-sidebar-foto": {
    shell: "bg-white",
    panel: "bg-rose-50",
    accent: "bg-rose-700",
    layout: "sidebar",
  },
  "modelo-premium-sidebar": {
    shell: "bg-white",
    panel: "bg-slate-100",
    accent: "bg-slate-900",
    layout: "sidebar",
  },
  "modelo-classico-duas-colunas": {
    shell: "bg-white",
    panel: "bg-violet-50",
    accent: "bg-violet-700",
    layout: "split",
  },
  "curriculo-joao-roberto": {
    shell: "bg-white",
    panel: "bg-amber-50",
    accent: "bg-amber-700",
    layout: "split",
  },
  "minimalista-premios": {
    shell: "bg-zinc-100",
    panel: "bg-zinc-200",
    accent: "bg-orange-500",
    layout: "split",
  },
  "criativo-cards": {
    shell: "bg-white",
    panel: "bg-amber-50",
    accent: "bg-gradient-to-r from-amber-400 to-rose-400",
    layout: "cards",
  },
  "creative-compact": {
    shell: "bg-white",
    panel: "bg-orange-50",
    accent: "bg-gradient-to-r from-orange-400 to-pink-400",
    layout: "cards",
  },
  "modelo-editorial": {
    shell: "bg-white",
    panel: "bg-neutral-100",
    accent: "bg-neutral-900",
    layout: "cards",
  },
};

function TextLines({ count, compact = false }: { count: number; compact?: boolean }) {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`rounded-full bg-slate-300/80 ${compact ? "h-1.5" : "h-2"}`}
          style={{ width: `${88 - index * 10}%` }}
        />
      ))}
    </div>
  );
}

function TemplateThumbnail({ template }: { template: TemplateDefinition }) {
  const style = THUMBNAIL_STYLES[template.id];

  return (
    <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-[#dfddd7] p-6">
      <div className={`h-[224px] w-[158px] rounded-md shadow-xl ${style.shell}`}>
        {style.layout === "topbar" ? (
          <div className="h-full p-3">
            <div className={`h-6 rounded-sm ${style.accent}`} />
            <div className={`mt-3 rounded-sm p-2 ${style.panel}`}>
              <div className="h-2 w-20 rounded-full bg-slate-700/70" />
              <div className="mt-1 h-1.5 w-14 rounded-full bg-slate-400/70" />
            </div>
            <div className="mt-3">
              <TextLines count={4} />
            </div>
            <div className="mt-4">
              <div className="mb-2 h-1.5 w-12 rounded-full bg-slate-500" />
              <TextLines count={3} compact />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className={`rounded-sm p-2 ${style.panel}`}>
                <TextLines count={3} compact />
              </div>
              <div className={`rounded-sm p-2 ${style.panel}`}>
                <TextLines count={3} compact />
              </div>
            </div>
          </div>
        ) : null}

        {style.layout === "sidebar" ? (
          <div className="grid h-full grid-cols-[0.34fr_0.66fr]">
            <div className={`${style.accent} p-2.5 text-white`}>
              <div className="mx-auto h-8 w-8 rounded-full bg-white/70" />
              <div className="mt-3 h-2 w-10 rounded-full bg-white/80" />
              <div className="mt-1 h-2 w-8 rounded-full bg-white/60" />
              <div className="mt-3 space-y-1">
                <div className="h-1.5 w-10 rounded-full bg-white/70" />
                <div className="h-1.5 w-8 rounded-full bg-white/60" />
                <div className="h-1.5 w-9 rounded-full bg-white/60" />
              </div>
              <div className="mt-4 space-y-1">
                <div className="h-1.5 w-9 rounded-full bg-white/70" />
                <div className="h-1.5 w-7 rounded-full bg-white/60" />
              </div>
            </div>
            <div className="p-3">
              <div className="h-2 w-20 rounded-full bg-slate-700/70" />
              <div className="mt-1 h-1.5 w-12 rounded-full bg-slate-400/70" />
              <div className="mt-4">
                <TextLines count={4} compact />
              </div>
              <div className="mt-4">
                <div className="mb-2 h-1.5 w-12 rounded-full bg-slate-500" />
                <TextLines count={3} compact />
              </div>
            </div>
          </div>
        ) : null}

        {style.layout === "split" ? (
          <div className="grid h-full grid-cols-2 gap-0">
            <div className={`${style.panel} p-3`}>
              <div className={`h-2 w-16 rounded-full ${style.accent}`} />
              <div className="mt-3">
                <TextLines count={6} compact />
              </div>
            </div>
            <div className="p-3">
              <div className="h-2 w-14 rounded-full bg-slate-700/70" />
              <div className="mt-3">
                <TextLines count={5} compact />
              </div>
              <div className="mt-4">
                <div className={`h-1.5 w-10 rounded-full ${style.accent}`} />
                <div className="mt-2">
                  <TextLines count={3} compact />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {style.layout === "timeline" ? (
          <div className="h-full p-3">
            <div className={`h-5 rounded-sm ${style.accent}`} />
            <div className="mt-3 h-[180px] border-l-2 border-slate-300 pl-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative mb-4">
                  <span className={`absolute -left-[18px] top-1 h-2.5 w-2.5 rounded-full ${style.accent}`} />
                  <div className="h-1.5 w-12 rounded-full bg-slate-600" />
                  <div className="mt-1 h-1.5 w-16 rounded-full bg-slate-300" />
                  <div className="mt-1 h-1.5 w-14 rounded-full bg-slate-300" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {style.layout === "cards" ? (
          <div className="h-full p-3">
            <div className={`rounded-md p-2 text-white ${style.accent}`}>
              <div className="h-2 w-16 rounded-full bg-white/80" />
              <div className="mt-1 h-1.5 w-12 rounded-full bg-white/60" />
            </div>
            <div className="mt-3 grid gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={`rounded-md p-2 ${style.panel}`}>
                  <div className="h-1.5 w-14 rounded-full bg-slate-500" />
                  <div className="mt-2">
                    <TextLines count={2} compact />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
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
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{template.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{template.category}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
