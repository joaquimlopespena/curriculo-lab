import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelInput, FormSectionShell, PillButton } from "./shared";

export function EducationForm({ resume, onChange }: StepComponentProps) {
  const item = resume.education[0];

  const update = (key: keyof typeof item, value: unknown) => {
    onChange((current) => ({
      ...current,
      education: current.education.map((entry, index) => (index === 0 ? { ...entry, [key]: value } : entry)),
    }));
  };

  return (
    <FormSectionShell
      title="Informe sua formacao academica"
      subtitle="Priorize o curso mais relevante para o modelo selecionado."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FloatingLabelInput label="Curso" placeholder=" " value={item.course} onChange={(e) => update("course", e.target.value)} />
        <FloatingLabelInput
          label="Instituicao"
          placeholder=" "
          value={item.institution}
          onChange={(e) => update("institution", e.target.value)}
        />
        <FloatingLabelInput label="Cidade" placeholder=" " value={item.city} onChange={(e) => update("city", e.target.value)} />
        <FloatingLabelInput label="Estado" placeholder=" " value={item.state} onChange={(e) => update("state", e.target.value)} />
        <FloatingLabelInput
          label="Conclusao"
          placeholder=" "
          value={item.conclusionYear}
          onChange={(e) => update("conclusionYear", e.target.value)}
        />
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
          Add More +
        </PillButton>
      </div>
    </FormSectionShell>
  );
}
