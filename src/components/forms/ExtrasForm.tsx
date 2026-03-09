import type { StepComponentProps } from "../../domain/resume.types";
import { templateHasField } from "../../domain/template-visibility";
import { FloatingLabelTextarea, FormSectionShell, PillButton } from "./shared";

export function ExtrasForm({ resume, onChange }: StepComponentProps) {
  const hasLanguages = templateHasField(resume.templateId, "languages");
  const hasFeaturedProjects = templateHasField(resume.templateId, "featuredProjects");
  const hasPublications = templateHasField(resume.templateId, "publications");
  const hasAwards = templateHasField(resume.templateId, "awards");

  return (
    <FormSectionShell
      title="Informacoes complementares do template"
      subtitle="So aparecem aqui os blocos adicionais usados pelo modelo selecionado."
    >
      <div className="space-y-6">
        {hasLanguages ? (
          <FloatingLabelTextarea
            label="Idiomas"
            placeholder=" "
            value={resume.extras.languages.map((item) => `${item.name} - ${item.level}`).join("\n")}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                extras: {
                  ...current.extras,
                  languages: event.target.value
                    .split("\n")
                    .map((line, index) => {
                      const [name, level] = line.split("-").map((part) => part.trim());
                      return { id: `lang-${index + 1}`, name: name ?? "", level: level ?? "" };
                    })
                    .filter((item) => item.name.length > 0),
                },
              }))
            }
          />
        ) : null}

        {hasPublications || hasAwards ? (
          <FloatingLabelTextarea
            label={hasAwards ? "Premios" : "Publicacoes"}
            placeholder=" "
            value={resume.extras.certifications.map((item) => item.name).join("\n")}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                extras: {
                  ...current.extras,
                  certifications: event.target.value
                    .split("\n")
                    .filter(Boolean)
                    .map((line, index) => ({
                      id: `cert-${index + 1}`,
                      name: line,
                      issuer: "Instituicao",
                      year: "2025",
                    })),
                },
              }))
            }
          />
        ) : null}

        {hasFeaturedProjects ? (
          <FloatingLabelTextarea
            label="Projetos em destaque"
            placeholder=" "
            value={resume.extras.customSections.join("\n")}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                extras: {
                  ...current.extras,
                  customSections: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
                },
              }))
            }
          />
        ) : null}
      </div>

      <div className="mt-6">
        <PillButton type="button">Adicionar mais informacoes</PillButton>
      </div>
    </FormSectionShell>
  );
}
