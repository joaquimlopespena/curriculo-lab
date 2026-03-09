import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelTextarea, FormSectionShell } from "./shared";

const SUGGESTIONS = [
  "Responsabilidade no transito",
  "Habilidade para dirigir com seguranca",
  "Zelo pela seguranca e qualidade no transporte",
  "Conhecimento das rotas e vias da regiao",
  "Disponibilidade para trabalhar em diferentes horarios",
];

export function SkillsForm({ resume, onChange, onFocusAreaChange }: StepComponentProps) {
  return (
    <FormSectionShell
      title="Escolha as qualificacoes que deseja destacar"
      subtitle='Se precisar, use as recomendacoes dos nossos especialistas. E so clicar em "Dicas".'
    >
      <FloatingLabelTextarea
        label="Competencias"
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
