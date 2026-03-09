import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelInput, FormSectionShell, PillButton } from "./shared";

function formatState(value: string) {
  return value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
}

function formatYear(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function EducationForm({ resume, onChange }: StepComponentProps) {
  const update = (itemId: string, key: keyof (typeof resume.education)[number], value: unknown) => {
    onChange((current) => ({
      ...current,
      education: current.education.map((entry) => (entry.id === itemId ? { ...entry, [key]: value } : entry)),
    }));
  };

  return (
    <FormSectionShell
      title="Informe sua formacao academica"
      subtitle="Priorize o curso mais relevante para o modelo selecionado."
    >
      <div className="space-y-8">
        {resume.education.map((item, index) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Formacao {index + 1}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FloatingLabelInput
                label="Curso"
                placeholder=" "
                value={item.course}
                onChange={(e) => update(item.id, "course", e.target.value)}
              />
              <FloatingLabelInput
                label="Instituicao"
                placeholder=" "
                value={item.institution}
                onChange={(e) => update(item.id, "institution", e.target.value)}
              />
              <FloatingLabelInput
                label="Cidade"
                placeholder=" "
                value={item.city}
                onChange={(e) => update(item.id, "city", e.target.value)}
              />
              <FloatingLabelInput
                label="Estado"
                placeholder=" "
                value={item.state}
                onChange={(e) => update(item.id, "state", formatState(e.target.value))}
              />
              <FloatingLabelInput
                label="Conclusao"
                placeholder=" "
                value={item.conclusionYear}
                onChange={(e) => update(item.id, "conclusionYear", formatYear(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <PillButton
          type="button"
          onClick={() =>
            onChange((current) => ({
              ...current,
              education: [
                ...current.education,
                {
                  id: `edu-${current.education.length + 1}`,
                  course: "",
                  institution: "",
                  city: "",
                  state: "",
                  conclusionYear: "",
                  current: false,
                },
              ],
            }))
          }
        >
          Add Formacao
        </PillButton>
      </div>
    </FormSectionShell>
  );
}
