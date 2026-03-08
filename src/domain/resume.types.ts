import type { TemplateId } from "../types/resume";

export type ResumeStepId =
  | "CONTACT"
  | "EXPERIENCE"
  | "EDUCATION"
  | "SKILLS"
  | "OBJECTIVE"
  | "EXTRAS"
  | "FINALIZE";

export interface IResumeHeader {
  firstName: string;
  lastName: string;
  photoUrl?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  linkedin: string;
  title: string;
  optionalFields: {
    birthDate?: string;
    nationality?: string;
    maritalStatus?: string;
    driverLicense?: string;
  };
}

export interface IPeriod {
  month: string;
  year: string;
}

export interface IJob {
  id: string;
  role: string;
  employer: string;
  city: string;
  state: string;
  startDate: IPeriod;
  endDate?: IPeriod;
  current: boolean;
  description: string;
}

export interface IEducation {
  id: string;
  course: string;
  institution: string;
  city: string;
  state: string;
  conclusionYear: string;
  current: boolean;
  details?: string;
}

export interface ISkill {
  id: string;
  name: string;
}

export interface ILanguage {
  id: string;
  name: string;
  level: string;
}

export interface ICertification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface IResumeExtras {
  certifications: ICertification[];
  languages: ILanguage[];
  customSections: string[];
}

export interface IResumeObjective {
  text: string;
}

export interface Resume {
  templateId: TemplateId;
  header: IResumeHeader;
  history: IJob[];
  education: IEducation[];
  skills: ISkill[];
  objective: IResumeObjective;
  extras: IResumeExtras;
}

export interface StepMeta {
  id: ResumeStepId;
  title: string;
  shortTitle: string;
  description: string;
}

export interface StepComponentProps {
  resume: Resume;
  onChange: (updater: (resume: Resume) => Resume) => void;
  onFocusAreaChange?: (area: "SKILLS" | "OBJECTIVE" | null) => void;
}
