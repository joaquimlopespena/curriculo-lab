import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelTextarea, FormSectionShell, PillButton } from "./shared";

const CERT_SUGGESTIONS = [
  "Habilitacao em [Area] pela [Instituicao]",
  "Treinamento em [Area]",
  "Certificacao em [Area] pela [Instituicao]",
  "Certificacao Cisco",
  "Certificacao em Gestao de Riscos - ISO 31000",
];

export function ExtrasForm({ resume, onChange }: StepComponentProps) {
  return (
    <FormSectionShell
      title="Quais certificacoes voce gostaria de compartilhar?"
      subtitle="Adicione certificacoes, idiomas e secoes extras sem poluir o fluxo principal."
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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

        <aside className="rounded-[24px] border border-[#91a0b9] bg-white/50 p-5">
          <p className="text-base font-bold text-[#20376a]">Pesquisar certificacoes</p>
          <input
            className="mt-3 w-full border border-[#91a0b9] bg-transparent px-4 py-3 text-base text-[#20376a]"
            placeholder="Pesquise por setor ou palavra-chave"
          />
          <p className="mt-4 text-sm text-[#20376a]">Mostrando certificacoes para <strong>Motorista lubrificador / Mecanico</strong></p>
          <div className="mt-4 space-y-3">
            {CERT_SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  onChange((current) => ({
                    ...current,
                    extras: {
                      ...current.extras,
                      certifications: current.extras.certifications.some((cert) => cert.name === item)
                        ? current.extras.certifications
                        : [
                            ...current.extras.certifications,
                            {
                              id: `cert-${current.extras.certifications.length + 1}`,
                              name: item,
                              issuer: "Instituicao",
                              year: "2025",
                            },
                          ],
                    },
                  }))
                }
                className="flex w-full items-center gap-3 rounded-2xl border border-[#91a0b9] bg-white px-4 py-3 text-left text-[#20376a]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3d63b8] text-3xl text-white">+</span>
                {item}
              </button>
            ))}
          </div>
        </aside>
      </div>
      <div className="mt-6">
        <PillButton type="button">Adicionar mais informacoes</PillButton>
      </div>
    </FormSectionShell>
  );
}
