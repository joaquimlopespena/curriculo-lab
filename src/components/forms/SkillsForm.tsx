import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelTextarea, FormSectionShell, PillButton } from "./shared";

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
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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

        <aside className="rounded-[24px] border border-[#91a0b9] bg-white/50 p-5">
          <p className="text-base font-bold text-[#20376a]">Pesquisar habilidades e competencias</p>
          <input
            className="mt-3 w-full border border-[#91a0b9] bg-transparent px-4 py-3 text-base text-[#20376a]"
            placeholder="Pesquise por setor ou palavra-chave"
          />
          <p className="mt-4 text-sm text-[#20376a]">Mostrando habilidades para <strong>Motorista lubrificador / Mecanico</strong></p>
          <div className="mt-4 space-y-3">
            {SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  onChange((current) => ({
                    ...current,
                    skills: current.skills.some((skill) => skill.name === item)
                      ? current.skills
                      : [...current.skills, { id: `skill-${current.skills.length + 1}`, name: item }],
                  }))
                }
                className="flex w-full items-center gap-3 rounded-2xl border border-[#91a0b9] bg-[#e7edf3] px-4 py-3 text-left text-[#20376a]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#cfd8e6] text-xl text-[#314f92]">✓</span>
                {item}
              </button>
            ))}
          </div>
        </aside>
      </div>
      <div className="mt-6">
        <PillButton type="button">Dicas</PillButton>
      </div>
    </FormSectionShell>
  );
}
