import { templates } from "../data/templates";
import type { ResumeStepId } from "./resume.types";
import type { FormField, TemplateId } from "../types/resume";

function getTemplateFields(templateId: TemplateId): FormField[] {
  return templates[templateId].sections.flatMap((section) => section.fields);
}

export function templateHasField(templateId: TemplateId, key: string) {
  return getTemplateFields(templateId).some((field) => field.key === key);
}

function templateHasFieldType(templateId: TemplateId, type: FormField["type"]) {
  return getTemplateFields(templateId).some((field) => field.type === type);
}

export function getVisibleSteps(templateId: TemplateId): ResumeStepId[] {
  const steps: ResumeStepId[] = ["CONTACT"];

  if (templateHasFieldType(templateId, "experience-list")) {
    steps.push("EXPERIENCE");
  }

  if (templateHasFieldType(templateId, "education-list")) {
    steps.push("EDUCATION");
  }

  if (
    templateHasField(templateId, "skills") ||
    templateHasField(templateId, "qualifications") ||
    templateHasField(templateId, "researchLines")
  ) {
    steps.push("SKILLS");
  }

  if (templateHasField(templateId, "summary")) {
    steps.push("OBJECTIVE");
  }

  if (
    templateHasField(templateId, "languages") ||
    templateHasField(templateId, "featuredProjects") ||
    templateHasField(templateId, "publications") ||
    templateHasField(templateId, "awards")
  ) {
    steps.push("EXTRAS");
  }

  steps.push("FINALIZE");
  return steps;
}
