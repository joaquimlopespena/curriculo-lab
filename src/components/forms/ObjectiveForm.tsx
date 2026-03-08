import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelTextarea, FormSectionShell } from "./shared";

export function ObjectiveForm({ resume, onChange, onFocusAreaChange }: StepComponentProps) {
  return (
    <FormSectionShell
      title="Defina seu objetivo profissional"
      subtitle="Mantenha o texto curto, direcionado e coerente com o template selecionado."
    >
      <FloatingLabelTextarea
        label="Objetivo"
        placeholder=" "
        value={resume.objective.text}
        onFocus={() => onFocusAreaChange?.("OBJECTIVE")}
        onBlur={() => onFocusAreaChange?.(null)}
        onChange={(event) =>
          onChange((current) => ({
            ...current,
            objective: { text: event.target.value },
          }))
        }
      />
    </FormSectionShell>
  );
}
