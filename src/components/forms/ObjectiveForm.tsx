import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelTextarea, FormSectionShell } from "./shared";

const OBJECTIVE_SUGGESTIONS = [
  "Busco atuar em uma funcao operacional com foco em seguranca, organizacao e cumprimento de processos.",
  "Pretendo contribuir com disciplina de execucao, melhoria de rotina e apoio direto aos indicadores da area.",
  "Tenho interesse em integrar uma equipe em que eu possa aplicar experiencia pratica, confiabilidade e ritmo operacional.",
  "Quero desenvolver minha carreira em um ambiente que valorize resultado, colaboracao e responsabilidade tecnica.",
];

export function ObjectiveForm({ resume, onChange, onFocusAreaChange }: StepComponentProps) {
  return (
    <FormSectionShell
      title="Defina seu objetivo profissional"
      subtitle="Mantenha o texto curto, direcionado e coerente com o template selecionado."
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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

        <aside className="rounded-[24px] border border-[#91a0b9] bg-white/50 p-5">
          <p className="text-base font-bold text-[#20376a]">Sugestoes de objetivo</p>
          <p className="mt-2 text-sm text-[#20376a]">
            Clique no <strong>+</strong> para inserir uma frase base e depois ajustar ao cargo.
          </p>
          <div className="mt-4 space-y-3">
            {OBJECTIVE_SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  onChange((current) => ({
                    ...current,
                    objective: {
                      text: current.objective.text.trim().length
                        ? `${current.objective.text.trim()} ${item}`.trim()
                        : item,
                    },
                  }))
                }
                className="flex w-full items-start gap-3 rounded-2xl border border-[#91a0b9] bg-white px-4 py-3 text-left text-[#20376a]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#d9e4f4] text-2xl text-[#314f92]">
                  +
                </span>
                <span className="text-sm leading-6">{item}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </FormSectionShell>
  );
}
