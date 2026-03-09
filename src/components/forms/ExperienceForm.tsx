import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelInput, FloatingLabelTextarea, FormSectionShell, PillButton } from "./shared";

const MONTHS = ["Mes", "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho"];

function formatState(value: string) {
  return value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
}

function formatYear(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function ExperienceForm({ resume, onChange }: StepComponentProps) {
  const updateJob = (jobId: string, key: keyof (typeof resume.history)[number], value: unknown) => {
    onChange((current) => ({
      ...current,
      history: current.history.map((item) => (item.id === jobId ? { ...item, [key]: value } : item)),
    }));
  };

  return (
    <FormSectionShell
      title="Adicionar Historico Profissional"
      subtitle="Comece pelo trabalho mais recente e termine com o mais antigo."
    >
      <div className="space-y-8">
        {resume.history.map((job, index) => (
          <div key={job.id} className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Experiencia {index + 1}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FloatingLabelInput
                label="Titulo do cargo"
                placeholder=" "
                value={job.role}
                onChange={(event) => updateJob(job.id, "role", event.target.value)}
              />
              <FloatingLabelInput
                label="Empregador"
                placeholder=" "
                value={job.employer}
                onChange={(event) => updateJob(job.id, "employer", event.target.value)}
              />
              <FloatingLabelInput
                label="Cidade"
                placeholder=" "
                value={job.city}
                onChange={(event) => updateJob(job.id, "city", event.target.value)}
              />
              <FloatingLabelInput
                label="Estado"
                placeholder=" "
                value={job.state}
                onChange={(event) => updateJob(job.id, "state", formatState(event.target.value))}
              />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-[#20376a]">
                    Data de inicio
                  </span>
                  <select
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none"
                    value={job.startDate.month}
                    onChange={(event) =>
                      updateJob(job.id, "startDate", { ...job.startDate, month: event.target.value })
                    }
                  >
                    {MONTHS.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </label>
                <FloatingLabelInput
                  label="Ano"
                  placeholder=" "
                  value={job.startDate.year}
                  onChange={(event) =>
                    updateJob(job.id, "startDate", { ...job.startDate, year: formatYear(event.target.value) })
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-[#20376a]">
                    Data de termino
                  </span>
                  <select
                    disabled={job.current}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none disabled:opacity-40"
                    value={job.endDate?.month ?? "Mes"}
                    onChange={(event) =>
                      updateJob(job.id, "endDate", { month: event.target.value, year: job.endDate?.year ?? "" })
                    }
                  >
                    {MONTHS.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </label>
                <FloatingLabelInput
                  label="Ano"
                  placeholder=" "
                  disabled={job.current}
                  value={job.endDate?.year ?? ""}
                  onChange={(event) =>
                    updateJob(job.id, "endDate", {
                      month: job.endDate?.month ?? "Mes",
                      year: formatYear(event.target.value),
                    })
                  }
                />
              </div>
            </div>

            <label className="mt-4 flex items-center gap-3 text-base text-[#20376a]">
              <input
                type="checkbox"
                checked={job.current}
                onChange={(event) => updateJob(job.id, "current", event.target.checked)}
                className="h-5 w-5 rounded border border-slate-300"
              />
              Trabalho atual
            </label>

            <div className="mt-6">
              <FloatingLabelTextarea
                label="Detalhes do emprego"
                placeholder=" "
                value={job.description}
                onChange={(event) => updateJob(job.id, "description", event.target.value)}
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
              history: [
                ...current.history,
                {
                  id: `job-${current.history.length + 1}`,
                  role: "",
                  employer: "",
                  city: "",
                  state: "",
                  startDate: { month: "Mes", year: "" },
                  current: false,
                  description: "",
                },
              ],
            }))
          }
        >
          Add Experiencia
        </PillButton>
      </div>
    </FormSectionShell>
  );
}
