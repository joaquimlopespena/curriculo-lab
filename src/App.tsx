import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { TemplateCatalog } from "./components/catalog/TemplateCatalog";
import { MainStepper } from "./components/MainStepper";
import { toTemplateResumeData } from "./domain/resume.adapter";
import { createInitialResume } from "./domain/resume.factory";
import type { Resume } from "./domain/resume.types";
import { templates } from "./data/templates";
import type { TemplateDefinition, TemplateId } from "./types/resume";

const DEFAULT_TEMPLATE_ID: TemplateId = "executive-clean";

function CatalogPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Curriculo Lab</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
          Escolha um modelo antes de entrar no editor
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
          O projeto agora separa descoberta e edicao: a `index` funciona como galeria de modelos e
          o editor abre em workspace proprio, evitando concentrar catalogo, formulario e preview na
          mesma tela.
        </p>
      </header>

      <TemplateCatalog onSelect={(templateId) => navigate(`/editor/${templateId}`)} />
    </div>
  );
}

function EditorPage() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const normalizedTemplateId = templateId as TemplateId | undefined;
  const activeTemplateId =
    normalizedTemplateId && normalizedTemplateId in templates ? normalizedTemplateId : DEFAULT_TEMPLATE_ID;

  const [resume, setResume] = useState<Resume>(() => createInitialResume(activeTemplateId));
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResume(createInitialResume(activeTemplateId));
  }, [activeTemplateId]);

  const selectedTemplate = templates[activeTemplateId] as TemplateDefinition<any>;
  const previewData = toTemplateResumeData(resume);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${[resume.header.firstName, resume.header.lastName].filter(Boolean).join("-") || "curriculo"}-${activeTemplateId}`,
    pageStyle:
      "@page { size: A4; margin: 0; } html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; overflow: hidden; -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #ffffff; }",
  });

  const handleExportPdf = async () => {
    handlePrint();
  };

  if (!(activeTemplateId in templates)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Curriculo Lab</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
          Editor modular com preview fixo e impressao fiel ao template
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
          O projeto agora separa descoberta e edicao: a `index` funciona como galeria de modelos e
          o editor abre em workspace proprio, evitando concentrar catalogo, formulario e preview na
          mesma tela.
        </p>
      </header>

      <MainStepper
        resume={resume}
        template={selectedTemplate}
        previewData={previewData}
        onResumeChange={(updater) => setResume((current) => updater(current))}
        onPrint={handlePrint}
        onExportPdf={handleExportPdf}
        onBackToCatalog={() => navigate("/")}
        printRef={printRef}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/editor/:templateId" element={<EditorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
