import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelTextarea, FormSectionShell, PillButton } from "./shared";

export function ExtrasForm({ resume, onChange }: StepComponentProps) {
  return (
    <FormSectionShell
      title="Quais certificacoes voce gostaria de compartilhar?"
      subtitle="Adicione certificacoes, idiomas e secoes extras sem poluir o fluxo principal."
    >
      <FloatingLabelTextarea
        label="Certificacoes"
        placeholder=" "
        value={resume.extras.certifications.map((item) => item.name).join("\n")}
        onChange={(event) =>
          onChange((current) => ({
            ...current,
            extras: {
              ...current.extras,
              certifications: event.target.value
                .split("\n")
                .filter(Boolean)
                .map((line, index) => ({
                  id: `cert-${index + 1}`,
                  name: line,
                  issuer: "Instituicao",
                  year: "2025",
                })),
            },
          }))
        }
      />
      <div className="mt-6">
        <PillButton type="button">Adicionar mais informacoes</PillButton>
      </div>
    </FormSectionShell>
  );
}
