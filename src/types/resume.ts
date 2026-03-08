import type { ComponentType } from "react";

export type TemplateId =
  | "ats-clean"
  | "executive-clean"
  | "academico-serif"
  | "foto-compacto"
  | "minimalista-premios"
  | "criativo-cards";

export interface PersonalInfo {
  fullName: string;
  title: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  conclusion: string;
  details?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface AwardItem {
  title: string;
  issuer: string;
  year: string;
}

export interface BaseResumeData {
  templateId: TemplateId;
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: LanguageItem[];
}

export interface AtsResumeData extends BaseResumeData {
  templateId: "ats-clean";
}

export interface ExecutiveResumeData extends BaseResumeData {
  templateId: "executive-clean";
  qualifications: string[];
}

export interface AcademicResumeData extends BaseResumeData {
  templateId: "academico-serif";
  publications: string[];
  researchLines: string[];
}

export interface PhotoResumeData extends BaseResumeData {
  templateId: "foto-compacto";
  photoUrl: string;
  sidebarNote: string;
}

export interface MinimalAwardsResumeData extends BaseResumeData {
  templateId: "minimalista-premios";
  address: string;
  awards: AwardItem[];
}

export interface CreativeCardsResumeData extends BaseResumeData {
  templateId: "criativo-cards";
  featuredProjects: string[];
}

export type ResumeData =
  | AtsResumeData
  | ExecutiveResumeData
  | AcademicResumeData
  | PhotoResumeData
  | MinimalAwardsResumeData
  | CreativeCardsResumeData;

export type ResumeDataByTemplate = {
  "ats-clean": AtsResumeData;
  "executive-clean": ExecutiveResumeData;
  "academico-serif": AcademicResumeData;
  "foto-compacto": PhotoResumeData;
  "minimalista-premios": MinimalAwardsResumeData;
  "criativo-cards": CreativeCardsResumeData;
};

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "string-list"
  | "experience-list"
  | "education-list"
  | "language-list"
  | "award-list";

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
}

export interface FormSection {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface TemplateDefinition<T extends TemplateId = TemplateId> {
  id: T;
  name: string;
  category: string;
  description: string;
  sourceModel: string;
  pageStyle: {
    pageMargin: string;
    fontFamily: string;
  };
  focusAreas: string[];
  sections: FormSection[];
  createInitialData: () => ResumeDataByTemplate[T];
  Preview: ComponentType<{ data: ResumeDataByTemplate[T] }>;
}
