import { pdf } from "@react-pdf/renderer";
import { AtsPdfDocument } from "./atsPdf";
import { AcademicPdfDocument } from "./academicPdf";
import { CreativePdfDocument } from "./creativePdf";
import { ExecutivePdfDocument } from "./executivePdf";
import { MinimalPdfDocument } from "./minimalPdf";
import { PhotoPdfDocument } from "./photoPdf";
import type {
  AcademicResumeData,
  AtsResumeData,
  CreativeCardsResumeData,
  ExecutiveResumeData,
  MinimalAwardsResumeData,
  PhotoResumeData,
  ResumeData,
  TemplateId,
} from "../types/resume";

const EXECUTIVE_PDF_VARIANTS: Record<
  | "executive-clean"
  | "chronological-elegant"
  | "modelo-executivo-timeline"
  | "modelo-corporativo-balanceado"
  | "modelo-corporativo-wave"
  | "modelo-juridico-classico",
  {
    accentColor: string;
    sideBackground: string;
    serifName?: boolean;
  }
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

const ATS_PDF_VARIANTS: Record<
  "modelo-1" | "ats-clean" | "split-professional" | "service-classic",
  {
    accentColor: string;
    softBackground: string;
  }
> = {
  "modelo-1": {
    accentColor: "#334155",
    softBackground: "#f8fafc",
  },
  "ats-clean": {
    accentColor: "#18181b",
    softBackground: "#fafafa",
  },
  "split-professional": {
    accentColor: "#1d4ed8",
    softBackground: "#ffffff",
  },
  "service-classic": {
    accentColor: "#047857",
    softBackground: "#ffffff",
  },
};

const PHOTO_PDF_VARIANTS: Record<
  | "foto-compacto"
  | "visual-modern"
  | "modelo-sidebar-foto"
  | "modelo-premium-sidebar"
  | "modelo-classico-duas-colunas"
  | "curriculo-joao-roberto",
  {
    asideColor: string;
    bodyBackground: string;
    pillColor: string;
  }
> = {
  "foto-compacto": {
    asideColor: "#3f6ea5",
    bodyBackground: "#ffffff",
    pillColor: "#dbeafe",
  },
  "visual-modern": {
    asideColor: "#4338ca",
    bodyBackground: "#ffffff",
    pillColor: "rgba(255,255,255,0.15)",
  },
  "modelo-sidebar-foto": {
    asideColor: "#be123c",
    bodyBackground: "#fff1f2",
    pillColor: "rgba(255,255,255,0.15)",
  },
  "modelo-premium-sidebar": {
    asideColor: "#0f172a",
    bodyBackground: "#f8fafc",
    pillColor: "rgba(255,255,255,0.10)",
  },
  "modelo-classico-duas-colunas": {
    asideColor: "#6d28d9",
    bodyBackground: "#faf5ff",
    pillColor: "rgba(255,255,255,0.15)",
  },
  "curriculo-joao-roberto": {
    asideColor: "#b45309",
    bodyBackground: "#fffbeb",
    pillColor: "rgba(255,255,255,0.15)",
  },
};

const CREATIVE_PDF_VARIANTS: Record<
  "criativo-cards" | "creative-compact" | "modelo-editorial",
  {
    headerColor: string;
    blockA: string;
    blockB: string;
    blockC: string;
  }
> = {
  "criativo-cards": {
    headerColor: "#fb923c",
    blockA: "#fff1f2",
    blockB: "#fffbeb",
    blockC: "#fff7ed",
  },
  "creative-compact": {
    headerColor: "#f97316",
    blockA: "#fff7ed",
    blockB: "#fff1f2",
    blockC: "#fffbeb",
  },
  "modelo-editorial": {
    headerColor: "#0f172a",
    blockA: "#f5f5f4",
    blockB: "#f1f5f9",
    blockC: "#f5f5f5",
  },
};

const ALL_REACT_PDF_TEMPLATES: Record<TemplateId, true> = {
  "modelo-1": true,
  "ats-clean": true,
  "split-professional": true,
  "service-classic": true,
  "executive-clean": true,
  "chronological-elegant": true,
  "modelo-executivo-timeline": true,
  "modelo-corporativo-balanceado": true,
  "modelo-corporativo-wave": true,
  "modelo-juridico-classico": true,
  "academico-serif": true,
  "foto-compacto": true,
  "visual-modern": true,
  "modelo-sidebar-foto": true,
  "modelo-premium-sidebar": true,
  "modelo-classico-duas-colunas": true,
  "curriculo-joao-roberto": true,
  "minimalista-premios": true,
  "criativo-cards": true,
  "creative-compact": true,
  "modelo-editorial": true,
};

export function supportsReactPdf(templateId: TemplateId) {
  return templateId in ALL_REACT_PDF_TEMPLATES;
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function exportReactPdf(templateId: TemplateId, data: ResumeData, fileName: string) {
  if (templateId in ATS_PDF_VARIANTS) {
    const variant = ATS_PDF_VARIANTS[templateId as keyof typeof ATS_PDF_VARIANTS];
    const blob = await pdf(
      <AtsPdfDocument
        data={data as AtsResumeData}
        accentColor={variant.accentColor}
        softBackground={variant.softBackground}
      />,
    ).toBlob();
    downloadBlob(blob, fileName);
    return;
  }

  if (templateId in EXECUTIVE_PDF_VARIANTS) {
    const variant = EXECUTIVE_PDF_VARIANTS[templateId as keyof typeof EXECUTIVE_PDF_VARIANTS];
    const blob = await pdf(
      <ExecutivePdfDocument
        data={data as ExecutiveResumeData}
        accentColor={variant.accentColor}
        sideBackground={variant.sideBackground}
        serifName={variant.serifName}
      />,
    ).toBlob();
    downloadBlob(blob, fileName);
    return;
  }

  if (templateId === "academico-serif") {
    const blob = await pdf(<AcademicPdfDocument data={data as AcademicResumeData} />).toBlob();
    downloadBlob(blob, fileName);
    return;
  }

  if (templateId in PHOTO_PDF_VARIANTS) {
    const variant = PHOTO_PDF_VARIANTS[templateId as keyof typeof PHOTO_PDF_VARIANTS];
    const blob = await pdf(
      <PhotoPdfDocument
        data={data as PhotoResumeData}
        asideColor={variant.asideColor}
        bodyBackground={variant.bodyBackground}
        pillColor={variant.pillColor}
      />,
    ).toBlob();
    downloadBlob(blob, fileName);
    return;
  }

  if (templateId === "minimalista-premios") {
    const blob = await pdf(<MinimalPdfDocument data={data as MinimalAwardsResumeData} />).toBlob();
    downloadBlob(blob, fileName);
    return;
  }

  if (templateId in CREATIVE_PDF_VARIANTS) {
    const variant = CREATIVE_PDF_VARIANTS[templateId as keyof typeof CREATIVE_PDF_VARIANTS];
    const blob = await pdf(
      <CreativePdfDocument
        data={data as CreativeCardsResumeData}
        headerColor={variant.headerColor}
        blockA={variant.blockA}
        blockB={variant.blockB}
        blockC={variant.blockC}
      />,
    ).toBlob();
    downloadBlob(blob, fileName);
    return;
  }

  throw new Error(`No React PDF renderer for template ${templateId}`);
}
