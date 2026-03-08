import type { Resume } from "./resume.types";
import type { ResumeData } from "../types/resume";

const experience = (resume: Resume) =>
  resume.history.map((job) => ({
    role: job.role,
    company: job.employer,
    period: job.current
      ? `${job.startDate.month} ${job.startDate.year} - Atual`
      : `${job.startDate.month} ${job.startDate.year} - ${job.endDate?.month ?? ""} ${job.endDate?.year ?? ""}`.trim(),
    description: job.description,
  }));

const education = (resume: Resume) =>
  resume.education.map((item) => ({
    degree: item.course,
    institution: item.institution,
    conclusion: item.conclusionYear,
    details: item.details,
  }));

const languages = (resume: Resume) =>
  resume.extras.languages.map((item) => ({
    name: item.name,
    level: item.level,
  }));

export function toTemplateResumeData(resume: Resume): ResumeData {
  const base = {
    templateId: resume.templateId,
    personal: {
      fullName: `${resume.header.firstName} ${resume.header.lastName}`.trim(),
      title: resume.header.title,
      city: resume.header.city,
      state: resume.header.state,
      phone: resume.header.phone,
      email: resume.header.email,
      linkedin: resume.header.linkedin,
    },
    summary: resume.objective.text,
    experience: experience(resume),
    education: education(resume),
    skills: resume.skills.map((item) => item.name),
    languages: languages(resume),
  } as const;

  switch (resume.templateId) {
    case "chronological-elegant":
    case "modelo-executivo-timeline":
    case "modelo-corporativo-balanceado":
    case "modelo-corporativo-wave":
    case "modelo-juridico-classico":
    case "executive-clean":
      return {
        ...base,
        templateId: "executive-clean",
        qualifications: resume.skills.slice(0, 4).map((item) => item.name),
      };
    case "academico-serif":
      return {
        ...base,
        templateId: "academico-serif",
        publications: resume.extras.certifications.map(
          (item) => `${item.name} - ${item.issuer} (${item.year})`,
        ),
        researchLines: resume.skills.slice(0, 3).map((item) => item.name),
      };
    case "visual-modern":
    case "modelo-sidebar-foto":
    case "modelo-premium-sidebar":
    case "modelo-classico-duas-colunas":
    case "curriculo-joao-roberto":
    case "foto-compacto":
      return {
        ...base,
        templateId: "foto-compacto",
        photoUrl:
          resume.header.photoUrl ??
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23e0f2fe'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%2364748b'/%3E%3Cpath d='M34 136c7-24 28-36 46-36s39 12 46 36' fill='%2364748b'/%3E%3C/svg%3E",
        sidebarNote: "Dados adicionais, contato rapido e leitura lateral objetiva.",
      };
    case "minimalista-premios":
      return {
        ...base,
        templateId: "minimalista-premios",
        address: resume.header.address,
        awards: resume.extras.certifications.map((item) => ({
          title: item.name,
          issuer: item.issuer,
          year: item.year,
        })),
      };
    case "creative-compact":
    case "modelo-editorial":
    case "criativo-cards":
      return {
        ...base,
        templateId: "criativo-cards",
        featuredProjects: resume.extras.customSections.length
          ? resume.extras.customSections
          : resume.extras.certifications.map((item) => item.name),
      };
    case "modelo-1":
    case "split-professional":
    case "service-classic":
    case "ats-clean":
    default:
      return {
        ...base,
        templateId: "ats-clean",
      };
  }
}
