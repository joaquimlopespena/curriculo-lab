import type { StepComponentProps } from "../../domain/resume.types";
import { templateHasField } from "../../domain/template-visibility";
import { FloatingLabelTextarea, FormSectionShell } from "./shared";

const SUGGESTIONS = [
  "Responsabilidade no transito",
  "Habilidade para dirigir com seguranca",
  "Zelo pela seguranca e qualidade no transporte",
  "Conhecimento das rotas e vias da regiao",
  "Disponibilidade para trabalhar em diferentes horarios",
];

export function SkillsForm({ resume, onChange, onFocusAreaChange }: StepComponentProps) {
  const hasQualifications = templateHasField(resume.templateId, "qualifications");
  const hasResearchLines = templateHasField(resume.templateId, "researchLines");
  const label = hasResearchLines
    ? "Linhas de pesquisa"
    : hasQualifications
      ? "Resumo de qualificacoes"
      : "Competencias";

  return (
    <FormSectionShell
      title={hasResearchLines ? "Defina as linhas de pesquisa em destaque" : "Escolha as qualificacoes que deseja destacar"}
      subtitle="Adicione apenas o que faz sentido para o template selecionado."
    >
      <FloatingLabelTextarea
        label={label}
        placeholder=" "
        value={resume.skills.map((item) => `• ${item.name}`).join("\n")}
        onFocus={() => onFocusAreaChange?.("SKILLS")}
        onBlur={() => onFocusAreaChange?.(null)}
        onChange={(event) =>
          onChange((current) => ({
            ...current,
            skills: event.target.value
              .split("\n")
              .map((line, index) => ({ id: `skill-${index + 1}`, name: line.replace(/^•\s*/, "").trim() }))
              .filter((item) => item.name.length > 0),
          }))
        }
      />
    </FormSectionShell>
  );
}
