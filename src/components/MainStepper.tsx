import { useEffect, useMemo, useState } from "react";
import type { ComponentType, RefObject } from "react";
import type { Resume, ResumeStepId, StepComponentProps } from "../domain/resume.types";
import { STEP_ORDER, getStepIndex } from "../domain/resume.factory";
import { getVisibleSteps } from "../domain/template-visibility";
import { ContactForm } from "./forms/ContactForm";
import { EducationForm } from "./forms/EducationForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { ExtrasForm } from "./forms/ExtrasForm";
import { FinalizeStep } from "./forms/FinalizeStep";
import { ObjectiveForm } from "./forms/ObjectiveForm";
import { SkillsForm } from "./forms/SkillsForm";
import { PreviewPane } from "./PreviewPane";
import type { ResumeData, TemplateDefinition } from "../types/resume";

interface MainStepperProps {
  resume: Resume;
  template: TemplateDefinition<any>;
  previewData: ResumeData;
  onResumeChange: (updater: (resume: Resume) => Resume) => void;
  onPrint: () => void;
  onExportPdf: () => void;
  onBackToCatalog: () => void;
  printRef: RefObject<HTMLDivElement | null>;
}

const STEP_COMPONENTS: Record<Exclude<ResumeStepId, "FINALIZE">, ComponentType<StepComponentProps>> = {
  CONTACT: ContactForm,
  EXPERIENCE: ExperienceForm,
  EDUCATION: EducationForm,
  SKILLS: SkillsForm,
  OBJECTIVE: ObjectiveForm,
  EXTRAS: ExtrasForm,
};

export function MainStepper({
  resume,
  template,
  previewData,
  onResumeChange,
  onPrint,
  onExportPdf,
  onBackToCatalog,
  printRef,
}: MainStepperProps) {
  const [currentStep, setCurrentStep] = useState<ResumeStepId>("CONTACT");
  const [focusArea, setFocusArea] = useState<"SKILLS" | "OBJECTIVE" | null>(null);

  const visibleSteps = useMemo(() => getVisibleSteps(resume.templateId), [resume.templateId]);

  useEffect(() => {
    if (!visibleSteps.includes(currentStep)) {
      setCurrentStep(visibleSteps[0] ?? "CONTACT");
    }
  }, [currentStep, visibleSteps]);

  const currentIndex = visibleSteps.indexOf(currentStep);
  const progress = useMemo(
    () => Math.round(((Math.max(currentIndex, 0) + 1) / visibleSteps.length) * 100),
    [currentIndex, visibleSteps.length],
  );

  const nextStep = visibleSteps[Math.min(Math.max(currentIndex, 0) + 1, visibleSteps.length - 1)]!;
  const previousStep = visibleSteps[Math.max(Math.max(currentIndex, 0) - 1, 0)]!;

  return (
    <section className="mt-8 space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Editor</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {template.name} <span className="font-normal text-slate-500">em modo de edicao</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={onExportPdf}
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Baixar PDF
            </button>
            <button
              type="button"
              disabled
              className="rounded-lg bg-indigo-600/80 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Baixar Word
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              Imprimir
            </button>
            <span className="self-center text-sm text-slate-400">Salvo</span>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,44%)]">
        <div className="space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {progress}% concluido • {STEP_ORDER.find((step) => step.id === currentStep)!.title}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {visibleSteps.map((stepId, index) => {
                const step = STEP_ORDER.find((entry) => entry.id === stepId)!;
                const active = step.id === currentStep;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStep(step.id)}
                    className={`rounded-md px-3 py-2 text-sm transition ${
                      active
                        ? "bg-slate-950 font-semibold text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {index + 1}. {step.shortTitle}
                  </button>
                );
              })}
            </div>
          </section>

          {currentStep === "FINALIZE" ? (
            <FinalizeStep resume={resume} onChange={onResumeChange} onPrint={onExportPdf} />
          ) : (
            (() => {
              const CurrentStepComponent = STEP_COMPONENTS[currentStep];
              return (
                <CurrentStepComponent
                  resume={resume}
                  onChange={onResumeChange}
                  onFocusAreaChange={setFocusArea}
                />
              );
            })()
          )}

          <footer className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={() => setCurrentStep(previousStep)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => (currentStep === "FINALIZE" ? onExportPdf() : setCurrentStep(nextStep))}
              className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              {currentStep === "FINALIZE" ? "Baixar PDF" : `Proxima`}
            </button>
          </footer>
        </div>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <PreviewPane data={previewData} template={template} printRef={printRef} />
        </div>
      </div>
    </section>
  );
}
