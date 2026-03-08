import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { TemplateCatalog } from "./components/catalog/TemplateCatalog";
import { MainStepper } from "./components/MainStepper";
import { toTemplateResumeData } from "./domain/resume.adapter";
import { createInitialResume } from "./domain/resume.factory";
import type { Resume } from "./domain/resume.types";
import { templates } from "./data/templates";
import { exportReactPdf, supportsReactPdf } from "./pdf/templates";
import type { TemplateDefinition, TemplateId } from "./types/resume";

export default function App() {
  const [currentTemplateId, setCurrentTemplateId] = useState<TemplateId>("executive-clean");
  const [mode, setMode] = useState<"catalog" | "editor">("catalog");
  const [resume, setResume] = useState<Resume>(() => createInitialResume("executive-clean"));
  const printRef = useRef<HTMLDivElement>(null);

  const selectedTemplate = templates[currentTemplateId] as TemplateDefinition<any>;
  const previewData = toTemplateResumeData(resume);

  const handleTemplateChange = (templateId: TemplateId) => {
    setCurrentTemplateId(templateId);
    setResume(createInitialResume(templateId));
    setMode("editor");
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resume.header.firstName}-${resume.header.lastName}-${currentTemplateId}`,
    pageStyle: "@page { margin: 12mm; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }",
  });

  const handleExportPdf = async () => {
    const fileName = `${resume.header.firstName}-${resume.header.lastName || "curriculo"}`
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    if (!supportsReactPdf(currentTemplateId)) {
      throw new Error(`Template ${currentTemplateId} sem renderer de PDF configurado.`);
    }

    await exportReactPdf(currentTemplateId, previewData, fileName);
  };

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Curriculo Lab</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
          {mode === "catalog"
            ? "Escolha um modelo antes de entrar no editor"
            : "Editor modular com preview fixo e impressao fiel ao template"}
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
          O projeto agora separa descoberta e edicao: a `index` funciona como galeria de modelos e
          o editor abre em workspace proprio, evitando concentrar catalogo, formulario e preview na
          mesma tela.
        </p>
      </header>

      {mode === "catalog" ? (
        <TemplateCatalog onSelect={handleTemplateChange} />
      ) : (
        <MainStepper
          resume={resume}
          template={selectedTemplate}
          previewData={previewData}
          onResumeChange={(updater) => setResume((current) => updater(current))}
          onPrint={handlePrint}
          onExportPdf={handleExportPdf}
          onBackToCatalog={() => setMode("catalog")}
          printRef={printRef}
        />
      )}
    </div>
  );
}
