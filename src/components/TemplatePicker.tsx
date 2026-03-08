import type { TemplateDefinition, TemplateId } from "../types/resume";

interface TemplatePickerProps {
  templates: TemplateDefinition[];
  value: TemplateId;
  onChange: (templateId: TemplateId) => void;
}

export function TemplatePicker({ templates, value, onChange }: TemplatePickerProps) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-paper backdrop-blur">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Templates</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">Factory orientada por modelo</h2>
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          `const SelectedTemplate = templates[currentTemplateId]`
        </div>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {templates.map((template) => {
          const active = template.id === value;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onChange(template.id)}
              className={`rounded-[24px] border p-5 text-left transition ${
                active
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900 hover:-translate-y-0.5 hover:border-slate-300"
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${active ? "text-slate-300" : "text-slate-500"}`}>
                {template.category}
              </p>
              <h3 className="mt-2 text-xl font-bold">{template.name}</h3>
              <p className={`mt-2 text-sm leading-6 ${active ? "text-slate-200" : "text-slate-600"}`}>
                {template.description}
              </p>
              <p className={`mt-4 text-xs ${active ? "text-slate-400" : "text-slate-500"}`}>
                Fonte: {template.sourceModel}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
