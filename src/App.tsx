import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { TemplateCatalog } from "./components/catalog/TemplateCatalog";
import { MainStepper } from "./components/MainStepper";
import { toTemplateResumeData } from "./domain/resume.adapter";
import { createInitialResume } from "./domain/resume.factory";
import type { Resume } from "./domain/resume.types";
import { templates } from "./data/templates";
import type { TemplateId } from "./types/resume";

export default function App() {
  const [currentTemplateId, setCurrentTemplateId] = useState<TemplateId>("executive-clean");
  const [mode, setMode] = useState<"catalog" | "editor">("catalog");
  const [resume, setResume] = useState<Resume>(() => createInitialResume("executive-clean"));
  const printRef = useRef<HTMLDivElement>(null);

  const selectedTemplate = templates[currentTemplateId];
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
    if (!printRef.current) {
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;
    const pageWidth = 794;
    const pageHeight = 1122;
    const fileName = `${resume.header.firstName}-${resume.header.lastName || "curriculo"}`
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const sourceNode = printRef.current;
    const exportNode = sourceNode.cloneNode(true) as HTMLDivElement;
    const sandbox = document.createElement("div");

    sandbox.style.position = "fixed";
    sandbox.style.left = "-99999px";
    sandbox.style.top = "0";
    sandbox.style.width = `${pageWidth}px`;
    sandbox.style.height = `${pageHeight}px`;
    sandbox.style.background = "#ffffff";
    sandbox.style.padding = "0";
    sandbox.style.margin = "0";
    sandbox.style.overflow = "hidden";

    exportNode.style.width = `${pageWidth}px`;
    exportNode.style.minHeight = `${pageHeight}px`;
    exportNode.style.height = `${pageHeight}px`;
    exportNode.style.background = "#ffffff";
    exportNode.style.margin = "0";
    exportNode.style.padding = "0";
    exportNode.style.overflow = "hidden";
    exportNode.style.borderRadius = "0";
    exportNode.style.boxShadow = "none";

    const exportRoot = exportNode.firstElementChild as HTMLElement | null;
    if (exportRoot) {
      exportRoot.style.borderRadius = "0";
      exportRoot.style.boxShadow = "none";
      exportRoot.style.margin = "0";
      exportRoot.style.width = `${pageWidth}px`;
      exportRoot.style.minHeight = `${pageHeight}px`;
      exportRoot.style.height = `${pageHeight}px`;
    }

    exportNode.querySelectorAll("*").forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.boxShadow = "none";
      htmlElement.style.filter = "none";
    });

    sandbox.appendChild(exportNode);
    document.body.appendChild(sandbox);

    try {
      await html2pdf()
        .set({
          margin: [0, 0, 0, 0],
          filename: `${fileName}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            width: pageWidth,
            height: pageHeight,
          },
          jsPDF: {
            unit: "px",
            format: [pageWidth, pageHeight],
            orientation: "portrait",
          },
          pagebreak: { mode: ["avoid-all"] },
        })
        .from(exportNode)
        .save();
    } finally {
      document.body.removeChild(sandbox);
    }
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
