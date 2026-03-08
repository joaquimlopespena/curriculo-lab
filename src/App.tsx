import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { DynamicResumeForm } from "./components/DynamicResumeForm";
import { PreviewPane } from "./components/PreviewPane";
import { SmartStepper } from "./components/SmartStepper";
import { TemplatePicker } from "./components/TemplatePicker";
import { createResumeData, templateList, templates } from "./data/templates";
import type { ResumeData, TemplateId } from "./types/resume";

function setValueByPath<T extends object>(source: T, path: string, value: unknown): T {
  const parts = path.split(".");
  const clone: Record<string, unknown> = { ...(source as Record<string, unknown>) };
  let current: Record<string, unknown> = clone;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index]!;
    current[part] = { ...(current[part] as Record<string, unknown>) };
    current = current[part] as Record<string, unknown>;
  }

  current[parts[parts.length - 1]!] = value;
  return clone as T;
}

export default function App() {
  const [currentTemplateId, setCurrentTemplateId] = useState<TemplateId>("executive-clean");
  const [resumeData, setResumeData] = useState<ResumeData>(() => createResumeData("executive-clean"));
  const [currentStep, setCurrentStep] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

  const selectedTemplate = templates[currentTemplateId];

  const handleTemplateChange = (templateId: TemplateId) => {
    setCurrentTemplateId(templateId);
    setResumeData(createResumeData(templateId));
    setCurrentStep(0);
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setResumeData((currentData) => setValueByPath(currentData, key, value));
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.personal.fullName}-${currentTemplateId}`,
  });

  const activeSection = selectedTemplate.sections[currentStep] ?? selectedTemplate.sections[0];

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Curriculo Lab</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl font-bold leading-tight text-slate-950 sm:text-6xl">
          Gerador de curriculos com formulario reconstruido por template.
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
          A aplicacao deriva seus campos dos modelos em <code>modelos/</code>, troca o schema ao mudar o
          template e injeta apenas os blocos esperados por cada layout. O preview usa factory de
          componentes e o PDF reaproveita o mesmo componente impresso.
        </p>
      </header>

      <TemplatePicker templates={templateList} value={currentTemplateId} onChange={handleTemplateChange} />

      <section className="mt-8 grid gap-8 xl:grid-cols-[340px_minmax(0,1fr)_minmax(0,1.1fr)]">
        <SmartStepper
          sections={selectedTemplate.sections}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />

        <div className="space-y-6">
          <DynamicResumeForm data={resumeData} section={activeSection} onChange={handleFieldChange} />
          <section className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-paper">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Analise dos Modelos</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-200">
              <p>
                Chaves comuns detectadas: <code>personal</code>, <code>summary</code>, <code>experience</code>,
                <code>education</code>, <code>skills</code> e <code>languages</code>.
              </p>
              <p>
                Chaves especificas por familia: <code>qualifications</code> no executivo,
                <code>publications</code> e <code>researchLines</code> no academico,
                <code>photoUrl</code> no layout com foto, <code>awards</code> no minimalista e
                <code>featuredProjects</code> no criativo.
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Gerar PDF / Imprimir
            </button>
            <div className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-600">
              Template ativo: <strong>{selectedTemplate.name}</strong>
            </div>
          </div>

          <PreviewPane data={resumeData} template={selectedTemplate} printRef={printRef} />
        </div>
      </section>
    </div>
  );
}
