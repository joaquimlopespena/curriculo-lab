import type { StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelInput, FloatingLabelTextarea, FormSectionShell, PillButton } from "./shared";

const MONTHS = ["Mes", "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho"];

export function ExperienceForm({ resume, onChange }: StepComponentProps) {
  const job = resume.history[0];

  const updateJob = (key: keyof typeof job, value: unknown) => {
    onChange((current) => ({
      ...current,
      history: current.history.map((item, index) => (index === 0 ? { ...item, [key]: value } : item)),
    }));
  };

  return (
    <FormSectionShell
      title="Adicionar Historico Profissional"
      subtitle="Comece pelo trabalho mais recente e termine com o mais antigo."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FloatingLabelInput
          label="Titulo do cargo"
          placeholder=" "
          value={job.role}
          onChange={(event) => updateJob("role", event.target.value)}
        />
        <FloatingLabelInput
          label="Empregador"
          placeholder=" "
          value={job.employer}
          onChange={(event) => updateJob("employer", event.target.value)}
        />
        <FloatingLabelInput
          label="Cidade"
          placeholder=" "
          value={job.city}
          onChange={(event) => updateJob("city", event.target.value)}
        />
        <FloatingLabelInput
          label="Estado"
          placeholder=" "
          value={job.state}
          onChange={(event) => updateJob("state", event.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-[#20376a]">Data de inicio</span>
            <select
              className="w-full border border-[#91a0b9] bg-transparent px-4 py-4 text-xl text-[#20376a]"
              value={job.startDate.month}
              onChange={(event) => updateJob("startDate", { ...job.startDate, month: event.target.value })}
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
            onChange={(event) => updateJob("startDate", { ...job.startDate, year: event.target.value })}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-[#20376a]">Data de termino</span>
            <select
              disabled={job.current}
              className="w-full border border-[#91a0b9] bg-transparent px-4 py-4 text-xl text-[#20376a] disabled:opacity-40"
              value={job.endDate?.month ?? "Mes"}
              onChange={(event) =>
                updateJob("endDate", { month: event.target.value, year: job.endDate?.year ?? "" })
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
              updateJob("endDate", { month: job.endDate?.month ?? "Mes", year: event.target.value })
            }
          />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-3 text-xl text-[#20376a]">
        <input
          type="checkbox"
          checked={job.current}
          onChange={(event) => updateJob("current", event.target.checked)}
          className="h-6 w-6 border border-[#91a0b9]"
        />
        Atual
      </label>

      <div className="mt-6">
        <FloatingLabelTextarea
          label="Detalhes do emprego"
          placeholder=" "
          value={job.description}
          onChange={(event) => updateJob("description", event.target.value)}
        />
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
          Add More +
        </PillButton>
      </div>
    </FormSectionShell>
  );
}
