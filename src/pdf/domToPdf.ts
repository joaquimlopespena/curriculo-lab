import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ExportDomToPdfOptions {
  element: HTMLElement;
  fileName: string;
  scale?: number;
}

/**
 * Exporta um elemento HTML para PDF usando html2canvas + jsPDF.
 * Captura o DOM renderizado e converte para imagem, mantendo fidelidade visual.
 */
export async function exportDomToPdf({
  element,
  fileName,
  scale = 2,
}: ExportDomToPdfOptions): Promise<void> {
  // Dimensões A4 em mm
  const a4Width = 210;
  const a4Height = 297;

  // Captura o elemento como canvas com configurações otimizadas
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    // Desativa a remoção de transformações para manter a renderização do navegador
    removeContainer: true,
    onclone: (clonedDoc) => {
      const clonedElement = clonedDoc.body.querySelector(".resume-sheet");
      if (clonedElement instanceof HTMLElement) {
        // Remove apenas transformação de escala do preview
        clonedElement.style.transform = "none";
        clonedElement.style.setProperty("-webkit-print-color-adjust", "exact");
        clonedElement.style.setProperty("print-color-adjust", "exact");
        // Garante word-spacing correto
        clonedElement.style.wordSpacing = "normal";
      }
    },
  });

  // Cria PDF em formato A4
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Converte canvas para imagem JPEG para melhor compatibilidade
  const imgData = canvas.toDataURL("image/jpeg", 0.95);

  // Adiciona imagem ao PDF ocupando página inteira
  pdf.addImage(imgData, "JPEG", 0, 0, a4Width, a4Height);

  // Salva o PDF
  pdf.save(`${fileName}.pdf`);
}
