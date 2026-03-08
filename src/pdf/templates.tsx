import { pdf } from "@react-pdf/renderer";
import { ExecutivePdfDocument } from "./executivePdf";
import type { ExecutiveResumeData, ResumeData, TemplateId } from "../types/resume";

const EXECUTIVE_PDF_VARIANTS: Partial<
  Record<
    TemplateId,
    {
      accentColor: string;
      sideBackground: string;
      serifName?: boolean;
    }
  >
> = {
  "executive-clean": {
    accentColor: "#3f6ea5",
    sideBackground: "#f8fafc",
  },
  "chronological-elegant": {
    accentColor: "#57534e",
    sideBackground: "#fafaf9",
    serifName: true,
  },
  "modelo-executivo-timeline": {
    accentColor: "#0f172a",
    sideBackground: "#f8fafc",
  },
  "modelo-corporativo-balanceado": {
    accentColor: "#1d4ed8",
    sideBackground: "#eff6ff",
  },
  "modelo-corporativo-wave": {
    accentColor: "#0f766e",
    sideBackground: "#ecfeff",
  },
  "modelo-juridico-classico": {
    accentColor: "#92400e",
    sideBackground: "#fffbeb",
    serifName: true,
  },
};

export function supportsReactPdf(templateId: TemplateId) {
  return templateId in EXECUTIVE_PDF_VARIANTS;
}

export async function exportReactPdf(templateId: TemplateId, data: ResumeData, fileName: string) {
  const variant = EXECUTIVE_PDF_VARIANTS[templateId];
  if (!variant) {
    throw new Error(`No React PDF renderer for template ${templateId}`);
  }

  const blob = await pdf(
    <ExecutivePdfDocument
      data={data as ExecutiveResumeData}
      accentColor={variant.accentColor}
      sideBackground={variant.sideBackground}
      serifName={variant.serifName}
    />,
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
