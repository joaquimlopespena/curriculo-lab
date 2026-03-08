import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
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

    const exportWidth = 794;
    const exportHeight = 1123;
    const fileName = `${resume.header.firstName}-${resume.header.lastName || "curriculo"}`
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const sourceNode = (printRef.current.firstElementChild as HTMLElement | null) ?? printRef.current;
    const exportNode = sourceNode.cloneNode(true) as HTMLDivElement;
    const sandbox = document.createElement("div");

    sandbox.style.position = "fixed";
    sandbox.style.left = "-99999px";
    sandbox.style.top = "0";
    sandbox.style.width = `${exportWidth}px`;
    sandbox.style.height = `${exportHeight}px`;
    sandbox.style.background = "#ffffff";
    sandbox.style.padding = "0";
    sandbox.style.margin = "0";
    sandbox.style.overflow = "hidden";

    exportNode.style.width = `${exportWidth}px`;
    exportNode.style.minWidth = `${exportWidth}px`;
    exportNode.style.maxWidth = `${exportWidth}px`;
    exportNode.style.height = `${exportHeight}px`;
    exportNode.style.minHeight = `${exportHeight}px`;
    exportNode.style.background = "#ffffff";
    exportNode.style.margin = "0";
    exportNode.style.padding = "0";
    exportNode.style.overflow = "hidden";
    exportNode.style.borderRadius = "0";
    exportNode.style.boxShadow = "none";

    exportNode.querySelectorAll("*").forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.boxShadow = "none";
      htmlElement.style.filter = "none";
      htmlElement.style.printColorAdjust = "exact";
      htmlElement.style.webkitPrintColorAdjust = "exact";
    });

    const exportRoot = exportNode as HTMLElement;
    exportRoot.style.transform = "none";
    exportRoot.style.maxWidth = "none";

    sandbox.appendChild(exportNode);
    document.body.appendChild(sandbox);

    try {
      const canvas = await html2canvas(exportNode, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: exportWidth,
        height: exportHeight,
        windowWidth: exportWidth,
        windowHeight: exportHeight,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        210,
        297,
        undefined,
        "FAST",
      );
      pdf.save(`${fileName}.pdf`);
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
