import type { ChangeEvent, ReactNode } from "react";
import type {
  AwardItem,
  EducationItem,
  ExperienceItem,
  FormField,
  FormSection,
  LanguageItem,
  ResumeData,
} from "../types/resume";

interface DynamicResumeFormProps {
  data: ResumeData;
  section: FormSection;
  onChange: (key: string, value: unknown) => void;
}

function FieldShell({
  label,
  helperText,
  children,
}: {
  label: string;
  helperText?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      {helperText ? <span className="mt-1 block text-xs text-slate-500">{helperText}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:bg-white";

function getValue(data: ResumeData, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, data);
}

function updateListItem<T>(
  items: T[],
  index: number,
  nextItem: T,
) {
  return items.map((item, currentIndex) => (currentIndex === index ? nextItem : item));
}

function renderStringList(
  field: FormField,
  value: string[],
  onChange: (value: string[]) => void,
) {
  return (
    <FieldShell label={field.label}>
      <div className="space-y-3">
        {value.map((item, index) => (
          <input
            key={`${field.key}-${index}`}
            className={inputClassName}
            value={item}
            onChange={(event) => onChange(updateListItem(value, index, event.target.value))}
          />
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Adicionar item
        </button>
      </div>
    </FieldShell>
  );
}

function renderExperienceList(
  field: FormField,
  value: ExperienceItem[],
  onChange: (value: ExperienceItem[]) => void,
) {
  return (
    <FieldShell label={field.label}>
      <div className="space-y-4">
        {value.map((item, index) => (
          <div key={`${field.key}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inputClassName}
                value={item.role}
                placeholder="Cargo"
                onChange={(event) =>
                  onChange(updateListItem(value, index, { ...item, role: event.target.value }))
                }
              />
              <input
                className={inputClassName}
                value={item.company}
                placeholder="Empresa"
                onChange={(event) =>
                  onChange(updateListItem(value, index, { ...item, company: event.target.value }))
                }
              />
            </div>
            <input
              className={`${inputClassName} mt-3`}
              value={item.period}
              placeholder="Periodo"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, period: event.target.value }))
              }
            />
            <textarea
              className={`${inputClassName} mt-3 min-h-24`}
              value={item.description}
              placeholder="Descricao"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, description: event.target.value }))
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([...value, { role: "", company: "", period: "", description: "" }])
          }
          className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Adicionar experiencia
        </button>
      </div>
    </FieldShell>
  );
}

function renderEducationList(
  field: FormField,
  value: EducationItem[],
  onChange: (value: EducationItem[]) => void,
) {
  return (
    <FieldShell label={field.label}>
      <div className="space-y-4">
        {value.map((item, index) => (
          <div key={`${field.key}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inputClassName}
                value={item.degree}
                placeholder="Curso"
                onChange={(event) =>
                  onChange(updateListItem(value, index, { ...item, degree: event.target.value }))
                }
              />
              <input
                className={inputClassName}
                value={item.institution}
                placeholder="Instituicao"
                onChange={(event) =>
                  onChange(updateListItem(value, index, { ...item, institution: event.target.value }))
                }
              />
            </div>
            <input
              className={`${inputClassName} mt-3`}
              value={item.conclusion}
              placeholder="Conclusao"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, conclusion: event.target.value }))
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { degree: "", institution: "", conclusion: "" }])}
          className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Adicionar formacao
        </button>
      </div>
    </FieldShell>
  );
}

function renderLanguageList(
  field: FormField,
  value: LanguageItem[],
  onChange: (value: LanguageItem[]) => void,
) {
  return (
    <FieldShell label={field.label}>
      <div className="space-y-4">
        {value.map((item, index) => (
          <div key={`${field.key}-${index}`} className="grid gap-3 md:grid-cols-2">
            <input
              className={inputClassName}
              value={item.name}
              placeholder="Idioma"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, name: event.target.value }))
              }
            />
            <input
              className={inputClassName}
              value={item.level}
              placeholder="Nivel"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, level: event.target.value }))
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { name: "", level: "" }])}
          className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Adicionar idioma
        </button>
      </div>
    </FieldShell>
  );
}

function renderAwardList(
  field: FormField,
  value: AwardItem[],
  onChange: (value: AwardItem[]) => void,
) {
  return (
    <FieldShell label={field.label}>
      <div className="space-y-4">
        {value.map((item, index) => (
          <div key={`${field.key}-${index}`} className="grid gap-3 md:grid-cols-3">
            <input
              className={inputClassName}
              value={item.title}
              placeholder="Premio"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, title: event.target.value }))
              }
            />
            <input
              className={inputClassName}
              value={item.issuer}
              placeholder="Instituicao"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, issuer: event.target.value }))
              }
            />
            <input
              className={inputClassName}
              value={item.year}
              placeholder="Ano"
              onChange={(event) =>
                onChange(updateListItem(value, index, { ...item, year: event.target.value }))
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { title: "", issuer: "", year: "" }])}
          className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Adicionar premio
        </button>
      </div>
    </FieldShell>
  );
}

function renderField(
  data: ResumeData,
  field: FormField,
  onChange: (key: string, value: unknown) => void,
) {
  const value = getValue(data, field.key);

  if (field.type === "string-list") {
    return renderStringList(field, (value as string[]) ?? [], (nextValue) => onChange(field.key, nextValue));
  }

  if (field.type === "experience-list") {
    return renderExperienceList(field, (value as ExperienceItem[]) ?? [], (nextValue) => onChange(field.key, nextValue));
  }

  if (field.type === "education-list") {
    return renderEducationList(field, (value as EducationItem[]) ?? [], (nextValue) => onChange(field.key, nextValue));
  }

  if (field.type === "language-list") {
    return renderLanguageList(field, (value as LanguageItem[]) ?? [], (nextValue) => onChange(field.key, nextValue));
  }

  if (field.type === "award-list") {
    return renderAwardList(field, (value as AwardItem[]) ?? [], (nextValue) => onChange(field.key, nextValue));
  }

  if (field.type === "textarea") {
    return (
      <FieldShell label={field.label}>
        <textarea
          className={`${inputClassName} min-h-28`}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(field.key, event.target.value)}
        />
      </FieldShell>
    );
  }

  return (
    <FieldShell label={field.label}>
      <input
        className={inputClassName}
        type={field.type}
        value={(value as string) ?? ""}
        placeholder={field.placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(field.key, event.target.value)}
      />
    </FieldShell>
  );
}

export function DynamicResumeForm({ data, section, onChange }: DynamicResumeFormProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-paper">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Formulario Dinamico</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">{section.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{section.description}</p>
      <div className="mt-6 grid gap-5">
        {section.fields.map((field) => (
          <div key={field.key}>{renderField(data, field, onChange)}</div>
        ))}
      </div>
    </section>
  );
}
