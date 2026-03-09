import type { StepComponentProps } from "../../domain/resume.types";
import { FormSectionShell } from "./shared";

interface FinalizeStepProps extends StepComponentProps {
  onPrint: () => void;
}

export function FinalizeStep({ resume, onPrint }: FinalizeStepProps) {
  return (
    <FormSectionShell
      title="Finalizar curriculo"
      subtitle="Revise os dados agregados pela entidade Resume e abra a impressao para salvar como PDF."
    >
      <div className="grid gap-4 rounded-[24px] border border-[#91a0b9] bg-white/60 p-6 text-[#20376a]">
        <p><strong>Nome:</strong> {[resume.header.firstName, resume.header.lastName].filter(Boolean).join(" ")}</p>
        <p><strong>Historico:</strong> {resume.history.length} item(ns)</p>
        <p><strong>Formacao:</strong> {resume.education.length} item(ns)</p>
        <p><strong>Competencias:</strong> {resume.skills.length} item(ns)</p>
        <p><strong>Certificacoes:</strong> {resume.extras.certifications.length} item(ns)</p>
      </div>
      <button
        type="button"
        onClick={onPrint}
        className="mt-8 rounded-full bg-[#4f8894] px-8 py-4 text-xl font-semibold text-white"
      >
        Abrir para salvar PDF
      </button>
    </FormSectionShell>
  );
}
