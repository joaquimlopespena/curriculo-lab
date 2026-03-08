import type { ChangeEvent } from "react";
import type { Resume, StepComponentProps } from "../../domain/resume.types";
import { FloatingLabelInput, FormSectionShell, PillButton } from "./shared";

const OPTIONAL_FIELD_CONFIG = {
  birthDate: "Data de nascimento",
  nationality: "Nacionalidade",
  maritalStatus: "Estado civil",
  driverLicense: "Carteira Nacional de Habilitacao (CNH)",
} as const;

type OptionalFieldKey = keyof Resume["header"]["optionalFields"];

const PHOTO_TEMPLATE_IDS = new Set<Resume["templateId"]>([
  "foto-compacto",
  "visual-modern",
  "modelo-sidebar-foto",
  "modelo-premium-sidebar",
  "modelo-classico-duas-colunas",
  "curriculo-joao-roberto",
]);

function isFilled(value: string) {
  return value.trim().length > 1;
}

export function ContactForm({ resume, onChange }: StepComponentProps) {
  const { header } = resume;
  const hasPhoto = PHOTO_TEMPLATE_IDS.has(resume.templateId);

  const updateHeader =
    <K extends keyof Resume["header"]>(key: K) =>
    (value: Resume["header"][K]) =>
      onChange((current) => ({
        ...current,
        header: {
          ...current.header,
          [key]: value,
        },
      }));

  const updateOptionalField = (field: OptionalFieldKey, value: string) => {
    onChange((current) => ({
      ...current,
      header: {
        ...current.header,
        optionalFields: {
          ...current.header.optionalFields,
          [field]: value,
        },
      },
    }));
  };

  const enableOptionalField = (field: OptionalFieldKey) => {
    if (header.optionalFields[field] !== undefined) {
      return;
    }

    updateOptionalField(field, "");
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        return;
      }

      updateHeader("photoUrl")(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <FormSectionShell
      title="Forneca suas informacoes de contato"
      subtitle="Sugerimos incluir um e-mail e um numero de telefone."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FloatingLabelInput
          label="Nome"
          placeholder=" "
          value={header.firstName}
          valid={isFilled(header.firstName)}
          onChange={(event) => updateHeader("firstName")(event.target.value)}
        />
        <FloatingLabelInput
          label="Sobrenome"
          placeholder=" "
          value={header.lastName}
          valid={isFilled(header.lastName)}
          onChange={(event) => updateHeader("lastName")(event.target.value)}
        />
      </div>

      <div className="mt-6">
        <FloatingLabelInput
          label="Endereco"
          placeholder=" "
          value={header.address}
          valid={isFilled(header.address)}
          onChange={(event) => updateHeader("address")(event.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.15fr_1.15fr_1fr]">
        <FloatingLabelInput
          label="Cidade"
          placeholder=" "
          value={header.city}
          valid={isFilled(header.city)}
          onChange={(event) => updateHeader("city")(event.target.value)}
        />
        <FloatingLabelInput
          label="Estado"
          placeholder=" "
          value={header.state}
          valid={isFilled(header.state)}
          onChange={(event) => updateHeader("state")(event.target.value)}
        />
        <FloatingLabelInput
          label="CEP"
          placeholder=" "
          value={header.zipCode}
          valid={isFilled(header.zipCode)}
          onChange={(event) => updateHeader("zipCode")(event.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <FloatingLabelInput
          label="Telefone"
          placeholder=" "
          value={header.phone}
          valid={isFilled(header.phone)}
          onChange={(event) => updateHeader("phone")(event.target.value)}
        />
        <FloatingLabelInput
          label="E-mail"
          placeholder=" "
          type="email"
          value={header.email}
          valid={header.email.includes("@")}
          onChange={(event) => updateHeader("email")(event.target.value)}
        />
      </div>

      {hasPhoto ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Foto do curriculo</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
            <img
              src={header.photoUrl}
              alt={`${header.firstName} ${header.lastName}`}
              className="h-28 w-28 rounded-2xl object-cover shadow-sm"
            />
            <div className="space-y-3">
              <label className="inline-flex cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Upload de arquivo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
              <p className="text-sm text-slate-500">
                Use JPG ou PNG. A imagem enviada passa a ser usada no preview e no PDF dos modelos com foto.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-10">
        <p className="text-2xl font-semibold text-[#152a5b]">
          Acrescente informacoes adicionais ao seu curriculo{" "}
          <span className="text-lg font-normal text-[#243a69]">(opcional)</span>
        </p>

        <div className="mt-5 flex flex-wrap gap-4">
          {(
            Object.entries(OPTIONAL_FIELD_CONFIG) as [OptionalFieldKey, string][]
          ).map(([field, label]) => (
            <PillButton key={field} type="button" onClick={() => enableOptionalField(field)}>
              {label} +
            </PillButton>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {(
            Object.entries(header.optionalFields) as [OptionalFieldKey, string | undefined][]
          ).map(([field, value]) =>
            value !== undefined ? (
              <FloatingLabelInput
                key={field}
                label={OPTIONAL_FIELD_CONFIG[field]}
                placeholder=" "
                value={value}
                valid={isFilled(value)}
                onChange={(event) => updateOptionalField(field, event.target.value)}
              />
            ) : null,
          )}
        </div>
      </div>
    </FormSectionShell>
  );
}
