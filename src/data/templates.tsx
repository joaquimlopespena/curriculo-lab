import type { ReactNode } from "react";
import type {
  AcademicResumeData,
  AtsResumeData,
  CreativeCardsResumeData,
  ExecutiveResumeData,
  MinimalAwardsResumeData,
  PhotoResumeData,
  ResumeData,
  TemplateDefinition,
  TemplateId,
} from "../types/resume";

const makePersonal = (name: string, title: string, city: string, state: string) => ({
  fullName: name,
  title,
  city,
  state,
  phone: "(11) 99999-0000",
  email: "contato@curriculolab.dev",
  linkedin: "linkedin.com/in/perfil",
});

const SectionTitle = ({ children, muted = false }: { children: ReactNode; muted?: boolean }) => (
  <h2 className={muted ? "text-sm font-bold uppercase tracking-[0.25em] text-slate-400" : "text-sm font-bold uppercase tracking-[0.25em] text-slate-500"}>
    {children}
  </h2>
);

const AtsPreview = ({ data }: { data: AtsResumeData }) => (
  <div className="mx-auto flex min-h-[1123px] w-[794px] max-w-full flex-col rounded-3xl bg-white p-10 shadow-paper">
    <header className="border-b border-zinc-300 pb-6">
      <h1 className="text-4xl font-extrabold text-zinc-950">{data.personal.fullName}</h1>
      <p className="mt-2 text-lg font-semibold text-zinc-700">{data.personal.title}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-600">
        <p>{data.personal.address}</p>
        <p>{data.personal.city}, {data.personal.state}</p>
        <p>{data.personal.phone}</p>
        <p>{data.personal.email}</p>
        <p>{data.personal.linkedin}</p>
      </div>
    </header>
    <section className="mt-6">
      <SectionTitle>Resumo / Objetivo</SectionTitle>
      <p className="mt-3 text-sm leading-7 text-zinc-700">{data.summary}</p>
    </section>
    <section className="mt-6">
      <SectionTitle>Experiencia Profissional</SectionTitle>
      <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-700">
        {data.experience.map((item) => (
          <article key={`${item.role}-${item.company}`}>
            <h3 className="font-bold text-zinc-950">{item.role}</h3>
            <p className="text-zinc-500">
              {item.company}
              {item.location ? ` - ${item.location}` : ""}
              {" | "}
              {item.period}
            </p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
    <div className="mt-6 grid grid-cols-2 gap-6">
      <section>
        <SectionTitle>Formacao Academica</SectionTitle>
        <div className="mt-3 space-y-3 text-sm leading-7 text-zinc-700">
          {data.education.map((item) => (
            <div key={`${item.degree}-${item.institution}`}>
              <p className="font-bold text-zinc-950">{item.degree}</p>
              <p>{item.institution}</p>
              <p>Conclusao: {item.conclusion}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <SectionTitle>Idiomas</SectionTitle>
        <div className="mt-3 space-y-1 text-sm leading-7 text-zinc-700">
          {data.languages.map((item) => (
            <p key={`${item.name}-${item.level}`}>{item.name} - {item.level}</p>
          ))}
        </div>
      </section>
      <section className="col-span-2">
        <SectionTitle>Competencias</SectionTitle>
        <p className="mt-3 text-sm leading-7 text-zinc-700">{data.skills.join(", ")}.</p>
      </section>
    </div>
  </div>
);

const ExecutivePreview = ({ data }: { data: ExecutiveResumeData }) => (
  <div className="mx-auto flex min-h-[1123px] w-[794px] max-w-full flex-col bg-[#f7f8fc] shadow-paper">
    <header className="grid grid-cols-[0.92fr_1.08fr] border-b border-slate-200">
      <div className="bg-slate-950 px-8 py-9 text-white">
        <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">Direcao profissional</p>
        <h1 className="mt-4 text-[42px] font-black leading-[0.94]">{data.personal.fullName}</h1>
        <p className="mt-4 text-base font-medium text-slate-200">{data.personal.title}</p>
      </div>
      <div className="grid content-between bg-white px-8 py-9">
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <p>{data.personal.address}</p>
          <p className="text-right">{data.personal.phone}</p>
          <p>{data.personal.email}</p>
          <p className="text-right">{data.personal.linkedin}</p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Base</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{data.personal.city}, {data.personal.state}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Foco</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Operacao</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Perfil</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Lideranca</p>
          </div>
        </div>
      </div>
    </header>
    <main className="grid flex-1 grid-cols-[1.05fr_0.95fr] gap-7 px-8 py-8">
      <div className="space-y-7">
        <section className="rounded-[26px] bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <SectionTitle>Resumo / Objetivo</SectionTitle>
          <p className="mt-4 text-sm leading-7 text-slate-600">{data.summary}</p>
        </section>
        <section className="rounded-[26px] bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <SectionTitle>Experiencia Profissional</SectionTitle>
          <div className="mt-5 space-y-6">
            {data.experience.map((item) => (
              <article
                key={`${item.role}-${item.company}`}
                className="grid grid-cols-[16px_1fr] gap-4 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0"
              >
                <div className="pt-1">
                  <div className="h-3 w-3 rounded-full bg-sky-700" />
                  <div className="ml-[5px] mt-2 h-full min-h-[56px] w-px bg-slate-200" />
                </div>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                      <p className="mt-1 text-sm font-medium text-sky-700">
                        {item.company}
                        {item.location ? ` - ${item.location}` : ""}
                      </p>
                    </div>
                    <p className="text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <aside className="grid auto-rows-min gap-7">
        <section className="rounded-[28px] border border-slate-200 bg-[#eef4ff] px-6 py-6">
          <SectionTitle>Frentes de Atuação</SectionTitle>
          <ul className="mt-4 grid gap-3">
            {data.qualifications.map((item) => (
              <li key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6">
          <SectionTitle>Formacao Academica</SectionTitle>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            {data.education.map((item) => (
              <div key={`${item.degree}-${item.institution}`} className="rounded-2xl bg-slate-50 px-4 py-4">
                <h3 className="font-bold text-slate-900">{item.degree}</h3>
                <p className="mt-1">{item.institution}</p>
                <p className="mt-1 text-slate-500">Conclusao: {item.conclusion}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6">
          <SectionTitle>Competencias-chave</SectionTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.skills.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </section>
      </aside>
    </main>
  </div>
);

const AcademicPreview = ({ data }: { data: AcademicResumeData }) => (
  <div className="mx-auto flex min-h-[1123px] w-[794px] max-w-full flex-col rounded-3xl bg-white p-10 shadow-paper">
    <header className="border-b border-stone-300 pb-6">
      <h1 className="font-serif text-5xl text-stone-950">{data.personal.fullName}</h1>
      <p className="mt-2 font-serif text-xl text-stone-700">{data.personal.title}</p>
      <div className="mt-4 space-y-1 text-sm text-stone-600">
        <p>{data.personal.address}</p>
        <p>{data.personal.city}, {data.personal.state} | {data.personal.phone}</p>
        <p>{data.personal.email} | {data.personal.linkedin}</p>
      </div>
    </header>
    <section className="mt-6">
      <h2 className="font-serif text-2xl text-stone-950">Resumo / Objetivo</h2>
      <p className="mt-3 text-sm leading-7 text-stone-700">{data.summary}</p>
    </section>
    <section className="mt-8">
      <h2 className="font-serif text-2xl text-stone-950">Experiencia Profissional</h2>
      <div className="mt-4 space-y-5 text-sm leading-7 text-stone-700">
        {data.experience.map((item) => (
          <article key={`${item.role}-${item.company}`}>
            <h3 className="font-semibold text-stone-950">{item.role}</h3>
            <p className="text-stone-500">
              {item.company}
              {item.location ? ` - ${item.location}` : ""}
              {" | "}
              {item.period}
            </p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
    <section className="mt-8">
      <h2 className="font-serif text-2xl text-stone-950">Formacao Academica</h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
        {data.education.map((item) => (
          <p key={`${item.degree}-${item.institution}`}>
            <span className="font-semibold text-stone-950">{item.degree}</span> - {item.institution} - {item.conclusion}
          </p>
        ))}
      </div>
    </section>
    <div className="mt-8 grid grid-cols-2 gap-6">
      <section>
        <h2 className="font-serif text-2xl text-stone-950">Linhas de Pesquisa</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">{data.researchLines.join(", ")}.</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-stone-950">Publicacoes</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-700">
          {data.publications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  </div>
);

const PhotoPreview = ({ data }: { data: PhotoResumeData }) => (
  <div className="grid h-full w-full grid-rows-[auto_1fr] overflow-hidden bg-[#fbfaf7] p-0 m-0">
    <header className="grid grid-cols-[160px_1fr] gap-6 bg-[#16324f] px-8 py-8 text-white">
      <div className="flex items-center justify-center">
        <img
          src={data.photoUrl}
          alt={data.personal.fullName}
          className="h-28 w-28 rounded-[28px] border border-white/30 object-cover shadow-[0_14px_35px_rgba(0,0,0,0.22)]"
        />
      </div>
      <div className="grid gap-5">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">Apresentacao</p>
            <h1 className="mt-3 text-[38px] font-black leading-[0.95]">{data.personal.fullName}</h1>
            <p className="mt-3 text-base font-medium text-white/80">{data.personal.title}</p>
          </div>
          <div className="grid gap-2 text-right text-sm text-white/80">
            <p>{data.personal.phone}</p>
            <p>{data.personal.email}</p>
            <p>{data.personal.linkedin}</p>
            <p>{data.personal.city}, {data.personal.state}</p>
          </div>
        </div>
        <div className="rounded-[22px] bg-white/8 px-5 py-4 text-sm leading-7 text-white/80">
          {data.sidebarNote}
        </div>
      </div>
    </header>
    <main className="grid flex-1 grid-cols-[0.92fr_1.08fr] gap-7 px-8 py-8">
      <aside className="grid auto-rows-min gap-6">
        <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
          <SectionTitle>Contato</SectionTitle>
          <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            <p>{data.personal.address}</p>
            <p>{data.personal.city}, {data.personal.state}</p>
          </div>
        </section>
        <section className="rounded-[26px] border border-slate-200 bg-[#eaf3ff] px-6 py-6">
          <SectionTitle>Competencias</SectionTitle>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700">
            {data.skills.map((item) => (
              <li key={item} className="rounded-2xl bg-white px-4 py-3">{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
          <SectionTitle>Idiomas</SectionTitle>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            {data.languages.map((item) => (
              <p key={`${item.name}-${item.level}`}>{item.name} - {item.level}</p>
            ))}
          </div>
        </section>
      </aside>
      <div className="space-y-6">
        <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
          <SectionTitle>Resumo / Objetivo</SectionTitle>
          <p className="mt-4 text-sm leading-7 text-slate-700">{data.summary}</p>
        </section>
        <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
          <SectionTitle>Experiencia Profissional</SectionTitle>
          <div className="mt-4 space-y-6 text-sm leading-7 text-slate-700">
            {data.experience.map((item) => (
              <article key={`${item.role}-${item.company}`} className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.period}</p>
                <h3 className="mt-2 font-bold text-slate-950">{item.role}</h3>
                <p className="text-slate-500">
                  {item.company}
                  {item.location ? ` - ${item.location}` : ""}
                </p>
                <p className="mt-2">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-6">
          <div className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
            <SectionTitle>Formacao Academica</SectionTitle>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {data.education.map((item) => (
                <div key={`${item.degree}-${item.institution}`}>
                  <p className="font-bold text-slate-950">{item.degree}</p>
                  <p>{item.institution}</p>
                  <p>Conclusao: {item.conclusion}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[26px] border border-slate-200 bg-[#fff8ec] px-6 py-6">
            <SectionTitle>Destaques</SectionTitle>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <p>Operacao em campo e rotina administrativa integrada.</p>
              <p>Organizacao de processos, agenda e interface com clientes.</p>
              <p>Leitura clara de prioridades e apoio a times internos.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
);

const MinimalAwardsPreview = ({ data }: { data: MinimalAwardsResumeData }) => (
  <div className="mx-auto flex min-h-[1123px] w-[794px] max-w-full flex-col bg-[#faf8f3] px-9 py-9 shadow-paper">
    <header className="border-b border-zinc-300 pb-7">
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-[430px]">
          <p className="text-[11px] uppercase tracking-[0.34em] text-zinc-400">Perfil autoral</p>
          <h1 className="mt-4 text-[52px] font-black leading-[0.92] text-zinc-950">{data.personal.fullName}</h1>
          <p className="mt-4 text-[28px] font-medium text-orange-600">{data.personal.title}</p>
        </div>
        <div className="min-w-[220px] space-y-2 text-right text-sm text-zinc-600">
          <p>{data.address}</p>
          <p>{data.personal.city}, {data.personal.state}</p>
          <p className="text-orange-600">{data.personal.phone}</p>
          <p className="text-orange-600">{data.personal.email}</p>
        </div>
      </div>
    </header>
    <main className="grid flex-1 grid-cols-[1.08fr_0.92fr] gap-9 pt-8">
      <div className="space-y-8">
        <section className="rounded-[28px] bg-white px-6 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
          <SectionTitle>Resumo / Objetivo</SectionTitle>
          <p className="mt-4 text-base leading-8 text-zinc-700">{data.summary}</p>
        </section>
        <section className="rounded-[28px] bg-white px-6 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
          <SectionTitle>Experiencia Profissional</SectionTitle>
          <div className="mt-5 space-y-6">
            {data.experience.map((item) => (
              <article key={`${item.role}-${item.company}`} className="border-b border-zinc-100 pb-5 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[28px] font-semibold leading-[1.05] text-zinc-950">
                    {item.role}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">{item.period}</p>
                </div>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-orange-600">{item.company}</p>
                <p className="mt-3 text-base leading-8 text-zinc-700">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <aside className="space-y-8">
        <section className="rounded-[28px] border border-orange-100 bg-[#fff4ea] px-6 py-6">
          <SectionTitle>Reconhecimentos</SectionTitle>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-zinc-700">
            {data.awards.map((item) => (
              <li key={`${item.title}-${item.year}`} className="border-b border-orange-100 pb-4 last:border-b-0 last:pb-0">
                <p className="font-semibold text-zinc-950">{item.title}</p>
                <p>{item.issuer}</p>
                <p className="text-zinc-500">{item.year}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[28px] bg-white px-6 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
          <SectionTitle>Sintese</SectionTitle>
          <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-700">
            <p>Perfil voltado a narrativa, reposicionamento e leitura de marca.</p>
            <p>Experiencia em apresentacao executiva, articulacao e consistencia visual.</p>
          </div>
        </section>
      </aside>
    </main>
  </div>
);

const CreativeCardsPreview = ({ data }: { data: CreativeCardsResumeData }) => (
  <div className="mx-auto min-h-[1123px] w-[794px] max-w-full bg-[#fffdf8] p-8 shadow-paper">
    <header className="grid grid-cols-[1.1fr_0.9fr] gap-6 border-b border-slate-200 pb-7">
      <div>
        <p className="text-[11px] uppercase tracking-[0.34em] text-slate-400">Perfil criativo</p>
        <h1 className="mt-4 text-[48px] font-black leading-[0.94] text-slate-950">{data.personal.fullName}</h1>
        <p className="mt-3 text-xl font-medium text-orange-600">{data.personal.title}</p>
      </div>
      <div className="grid content-between">
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
          <p>{data.personal.address}</p>
          <p>{data.personal.city}, {data.personal.state}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.email}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {data.skills.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
    <section className="mt-8 grid grid-cols-[0.9fr_1.1fr] gap-6">
      <article className="rounded-[26px] bg-[#fff0e5] p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Resumo / Objetivo</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">{data.summary}</p>
      </article>
      <article className="rounded-[26px] bg-[#f3f4ff] p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">Projetos em Destaque</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          {data.featuredProjects.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article className="col-span-2 rounded-[26px] border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">Experiencia Profissional</h2>
        <div className="mt-4 grid grid-cols-2 gap-5">
          {data.experience.map((item) => (
            <div key={`${item.role}-${item.company}`} className="rounded-[22px] bg-slate-50 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{item.period}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">{item.role}</h3>
              <p className="mt-1 text-sm font-medium text-orange-600">{item.company}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  </div>
);

function createAtsVariantPreview(config: {
  headerAccent: string;
  surface: string;
  sectionTone: string;
}) {
  return function AtsVariantPreview({ data }: { data: AtsResumeData }) {
    return (
      <div className={`mx-auto flex min-h-[1123px] w-[794px] max-w-full flex-col ${config.surface} p-10`}>
        <header className={`border-b pb-6 ${config.sectionTone}`}>
          <div className={`h-2 w-28 rounded-full ${config.headerAccent}`} />
          <h1 className="mt-5 text-4xl font-extrabold text-zinc-950">{data.personal.fullName}</h1>
          <p className="mt-2 text-lg font-semibold text-zinc-700">{data.personal.title}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-600">
            <p>{data.personal.address}</p>
            <p>{data.personal.city}, {data.personal.state}</p>
            <p>{data.personal.phone}</p>
            <p>{data.personal.email}</p>
            <p>{data.personal.linkedin}</p>
          </div>
        </header>
        <div className="mt-8 grid grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-8">
            <section>
              <SectionTitle>Resumo / Objetivo</SectionTitle>
              <p className="mt-3 text-sm leading-7 text-zinc-700">{data.summary}</p>
            </section>
            <section>
              <SectionTitle>Experiencia Profissional</SectionTitle>
              <div className="mt-4 space-y-5 text-sm leading-7 text-zinc-700">
                {data.experience.map((item) => (
                  <article key={`${item.role}-${item.company}`}>
                    <h3 className="font-bold text-zinc-950">{item.role}</h3>
                    <p className="text-zinc-500">
                      {item.company}
                      {item.location ? ` - ${item.location}` : ""}
                      {" | "}
                      {item.period}
                    </p>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <aside className="space-y-6">
            <section className={`rounded-3xl p-5 ${config.sectionTone}`}>
              <SectionTitle>Formacao Academica</SectionTitle>
              <div className="mt-3 space-y-3 text-sm leading-7 text-zinc-700">
                {data.education.map((item) => (
                  <div key={`${item.degree}-${item.institution}`}>
                    <p className="font-bold text-zinc-950">{item.degree}</p>
                    <p>{item.institution}</p>
                    <p>Conclusao: {item.conclusion}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className={`rounded-3xl p-5 ${config.sectionTone}`}>
              <SectionTitle>Competencias</SectionTitle>
              <p className="mt-3 text-sm leading-7 text-zinc-700">{data.skills.join(", ")}.</p>
            </section>
          </aside>
        </div>
      </div>
    );
  };
}

function createExecutiveVariantPreview(config: {
  headerClass: string;
  accentClass: string;
  sideSurfaceClass: string;
  titleClass?: string;
}) {
  return function ExecutiveVariantPreview({ data }: { data: ExecutiveResumeData }) {
    return (
      <div className="mx-auto flex min-h-[1123px] w-[794px] max-w-full flex-col bg-[#f7f8fc]">
        <header className="grid grid-cols-[0.92fr_1.08fr] border-b border-slate-200">
          <div className={`px-8 py-9 text-white ${config.headerClass}`}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">Direcao profissional</p>
            <h1 className={`mt-4 text-[42px] font-black leading-[0.94] ${config.titleClass ?? ""}`}>{data.personal.fullName}</h1>
            <p className="mt-4 text-base font-medium text-white/80">{data.personal.title}</p>
          </div>
          <div className="grid content-between bg-white px-8 py-9">
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
              <p>{data.personal.address}</p>
              <p className="text-right">{data.personal.phone}</p>
              <p>{data.personal.email}</p>
              <p className="text-right">{data.personal.linkedin}</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5">
              <div className={`rounded-2xl px-4 py-3 ${config.sideSurfaceClass}`}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Base</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{data.personal.city}, {data.personal.state}</p>
              </div>
              <div className={`rounded-2xl px-4 py-3 ${config.sideSurfaceClass}`}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Foco</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Gestao</p>
              </div>
              <div className={`rounded-2xl px-4 py-3 ${config.sideSurfaceClass}`}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Perfil</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Execucao</p>
              </div>
            </div>
          </div>
        </header>
        <main className="grid flex-1 grid-cols-[1.05fr_0.95fr] gap-7 px-8 py-8">
          <div className="space-y-7">
            <section className="rounded-[26px] bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <SectionTitle>Resumo / Objetivo</SectionTitle>
              <p className="mt-4 text-sm leading-7 text-slate-600">{data.summary}</p>
            </section>
            <section className="rounded-[26px] bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <SectionTitle>Experiencia Profissional</SectionTitle>
              <div className="mt-5 space-y-6">
                {data.experience.map((item) => (
                  <article
                    key={`${item.role}-${item.company}`}
                    className="grid grid-cols-[16px_1fr] gap-4 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="pt-1">
                      <div className={`h-3 w-3 rounded-full ${config.accentClass.replace("border-", "bg-")}`} />
                      <div className="ml-[5px] mt-2 h-full min-h-[56px] w-px bg-slate-200" />
                    </div>
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                          <p className={`mt-1 text-sm font-medium ${config.accentClass.replace("border-", "text-")}`}>
                            {item.company}
                            {item.location ? ` - ${item.location}` : ""}
                          </p>
                        </div>
                        <p className="text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {item.period}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <aside className="grid auto-rows-min gap-7">
            <section className={`rounded-[28px] border border-slate-200 px-6 py-6 ${config.sideSurfaceClass}`}>
              <SectionTitle>Frentes de Atuação</SectionTitle>
              <ul className="mt-4 grid gap-3">
                {data.qualifications.map((item) => (
                  <li key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6">
              <SectionTitle>Formacao Academica</SectionTitle>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {data.education.map((item) => (
                  <div key={`${item.degree}-${item.institution}`} className={`rounded-2xl px-4 py-4 ${config.sideSurfaceClass}`}>
                    <h3 className="font-bold text-slate-900">{item.degree}</h3>
                    <p className="mt-1">{item.institution}</p>
                    <p className="mt-1 text-slate-500">Conclusao: {item.conclusion}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </main>
      </div>
    );
  };
}

function createPhotoVariantPreview(config: {
  asideClass: string;
  bodyClass: string;
  pillClass?: string;
}) {
  return function PhotoVariantPreview({ data }: { data: PhotoResumeData }) {
    return (
      <div className="grid h-full w-full grid-rows-[auto_1fr] overflow-hidden bg-[#fbfaf7] p-0 m-0">
        <header className={`grid grid-cols-[160px_1fr] gap-6 px-8 py-8 text-white ${config.asideClass}`}>
          <div className="flex items-center justify-center">
            <div className={`inline-flex rounded-[32px] p-2 ${config.pillClass ?? "bg-white/12"}`}>
              <img
                src={data.photoUrl}
                alt={data.personal.fullName}
                className="h-28 w-28 rounded-[24px] border border-white/30 object-cover"
              />
            </div>
          </div>
          <div className="grid gap-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">Apresentacao</p>
                <h1 className="mt-3 text-[38px] font-black leading-[0.95]">{data.personal.fullName}</h1>
                <p className="mt-3 text-base font-medium text-white/80">{data.personal.title}</p>
              </div>
              <div className="grid gap-2 text-right text-sm text-white/80">
                <p>{data.personal.phone}</p>
                <p>{data.personal.email}</p>
                <p>{data.personal.linkedin}</p>
                <p>{data.personal.city}, {data.personal.state}</p>
              </div>
            </div>
            <div className="rounded-[22px] bg-white/8 px-5 py-4 text-sm leading-7 text-white/80">
              {data.sidebarNote}
            </div>
          </div>
        </header>
        <main className={`grid flex-1 grid-cols-[0.92fr_1.08fr] gap-7 px-8 py-8 ${config.bodyClass}`}>
          <aside className="grid auto-rows-min gap-6">
            <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
              <SectionTitle>Contato</SectionTitle>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                <p>{data.personal.address}</p>
                <p>{data.personal.city}, {data.personal.state}</p>
              </div>
            </section>
            <section className="rounded-[26px] border border-slate-200 bg-[#eaf3ff] px-6 py-6">
              <SectionTitle>Competencias</SectionTitle>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                {data.skills.slice(0, 6).map((item) => (
                  <li key={item} className="rounded-2xl bg-white px-4 py-3">{item}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
              <SectionTitle>Idiomas</SectionTitle>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                {data.languages.map((item) => (
                  <p key={`${item.name}-${item.level}`}>{item.name} - {item.level}</p>
                ))}
              </div>
            </section>
          </aside>
          <div className="space-y-6">
            <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
              <SectionTitle>Resumo / Objetivo</SectionTitle>
              <p className="mt-4 text-sm leading-7 text-slate-700">{data.summary}</p>
            </section>
            <section className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
              <SectionTitle>Experiencia Profissional</SectionTitle>
              <div className="mt-4 space-y-6 text-sm leading-7 text-slate-700">
                {data.experience.slice(0, 2).map((item) => (
                  <article key={`${item.role}-${item.company}`} className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.period}</p>
                    <h3 className="mt-2 font-bold text-slate-950">{item.role}</h3>
                    <p className="text-slate-500">
                      {item.company}
                      {item.location ? ` - ${item.location}` : ""}
                    </p>
                    <p className="mt-2">{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="grid gap-6">
              <div className="rounded-[26px] border border-slate-200 bg-white px-6 py-6">
                <SectionTitle>Formacao Academica</SectionTitle>
                <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                  {data.education.slice(0, 2).map((item) => (
                    <div key={`${item.degree}-${item.institution}`}>
                      <p className="font-bold text-slate-950">{item.degree}</p>
                      <p>{item.institution}</p>
                      <p>Conclusao: {item.conclusion}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[26px] border border-slate-200 bg-[#fff8ec] px-6 py-6">
                <SectionTitle>Destaques</SectionTitle>
                <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                  <p>Operacao em campo e rotina administrativa integrada.</p>
                  <p>Organizacao de processos, agenda e interface com clientes.</p>
                  <p>Leitura clara de prioridades e apoio a times internos.</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  };
}

function createCreativeVariantPreview(config: {
  headerClass: string;
  blockA: string;
  blockB: string;
  blockC: string;
}) {
  return function CreativeVariantPreview({ data }: { data: CreativeCardsResumeData }) {
    return (
      <div className="mx-auto min-h-[1123px] w-[794px] max-w-full bg-[#fffdf8] p-8">
        <header className="grid grid-cols-[1.1fr_0.9fr] gap-6 border-b border-slate-200 pb-7">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-slate-400">Perfil criativo</p>
            <h1 className="mt-4 text-[48px] font-black leading-[0.94] text-slate-950">{data.personal.fullName}</h1>
            <p className="mt-3 text-xl font-medium text-orange-600">{data.personal.title}</p>
          </div>
          <div className="grid content-between">
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
              <p>{data.personal.address}</p>
              <p>{data.personal.city}, {data.personal.state}</p>
              <p>{data.personal.phone}</p>
              <p>{data.personal.email}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {data.skills.map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </header>
        <section className="mt-8 grid grid-cols-[0.9fr_1.1fr] gap-6">
          <article className={`rounded-[26px] p-6 ${config.blockA}`}>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Resumo / Objetivo</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">{data.summary}</p>
          </article>
          <article className={`rounded-[26px] p-6 ${config.blockB}`}>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">Projetos em Destaque</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {data.featuredProjects.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className={`col-span-2 rounded-[26px] border border-slate-200 p-6 ${config.blockC}`}>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">Experiencia Profissional</h2>
            <div className="mt-4 grid grid-cols-2 gap-5">
              {data.experience.map((item) => (
                <div key={`${item.role}-${item.company}`} className="rounded-[22px] bg-white/80 p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{item.period}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-orange-600">{item.company}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    );
  };
}

const atsInitialData = (): AtsResumeData => ({
  templateId: "ats-clean",
  personal: makePersonal("Patricia Monteiro Lima", "Analista Financeira Senior", "Sao Paulo", "SP"),
  summary:
    "Profissional com experiencia em planejamento financeiro, fechamento, analise de indicadores, controle orcamentario e suporte a decisao executiva.",
  experience: [
    {
      role: "Analista Financeira Senior",
      company: "Grupo Vesper",
      period: "2022 - Atual",
      description: "Fluxo de caixa, orcamento, DRE gerencial e relatorios de performance para diretorias.",
    },
    {
      role: "Analista de Controladoria",
      company: "Orbe Servicos",
      period: "2018 - 2022",
      description: "Consolidacao de indicadores, previsoes mensais e apoio ao fechamento.",
    },
  ],
  education: [
    {
      degree: "Administracao de Empresas",
      institution: "Mackenzie",
      conclusion: "2017",
    },
  ],
  skills: ["FP&A", "Orcamento", "Fluxo de caixa", "Power BI", "Excel avancado"],
  languages: [
    { name: "Portugues", level: "Fluente" },
    { name: "Ingles", level: "Avancado" },
  ],
});

const executiveInitialData = (): ExecutiveResumeData => ({
  templateId: "executive-clean",
  personal: makePersonal("Fernanda Nogueira", "Supervisora Comercial", "Curitiba", "PR"),
  summary:
    "Profissional comercial com experiencia em expansao de carteira, negociacao B2B, treinamento de equipes e acompanhamento de metas.",
  experience: [
    {
      role: "Supervisora Comercial",
      company: "Distribuidora SulPrime",
      period: "Mai 2022 - Atual",
      description: "Supervisao de equipe, expansao da carteira ativa e implantacao de acompanhamento semanal de indicadores.",
    },
    {
      role: "Executiva de Contas",
      company: "BioOffice Solucoes",
      period: "Jul 2018 - Abr 2022",
      description: "Negociacao, manutencao de contratos corporativos e recuperacao de contas inativas.",
    },
  ],
  education: [
    {
      degree: "Tecnologo em Gestao Comercial",
      institution: "Universidade Positivo",
      conclusion: "2016",
    },
  ],
  skills: ["Negociacao", "CRM", "Funil comercial", "Treinamento de equipe"],
  languages: [
    { name: "Portugues", level: "Fluente" },
    { name: "Ingles", level: "Intermediario" },
  ],
  qualifications: [
    "Gestao de carteira e relacionamento B2B",
    "Lideranca de equipe externa",
    "Leitura de indicadores e forecast comercial",
  ],
});

const academicInitialData = (): AcademicResumeData => ({
  templateId: "academico-serif",
  personal: makePersonal("Prof. Dra. Helena Duarte", "Coordenadora Academica e Pesquisadora", "Rio de Janeiro", "RJ"),
  summary:
    "Trajetoria em coordenacao pedagogica, pesquisa aplicada, formacao docente, desenvolvimento curricular e producao academica.",
  experience: [
    {
      role: "Coordenadora Academica",
      company: "Instituto Saber",
      period: "2019 - Atual",
      description: "Planejamento academico, supervisao docente e avaliacoes institucionais.",
    },
    {
      role: "Professora Universitaria",
      company: "Centro Universitario Delta",
      period: "2013 - 2019",
      description: "Docencia em metodologia da pesquisa, orientacao de trabalhos e comissoes academicas.",
    },
  ],
  education: [
    { degree: "Doutorado em Educacao", institution: "UERJ", conclusion: "2018" },
    { degree: "Mestrado em Letras", institution: "UFRJ", conclusion: "2011" },
  ],
  skills: ["Coordenacao", "Curriculo", "Pesquisa", "Formacao docente"],
  languages: [
    { name: "Portugues", level: "Fluente" },
    { name: "Ingles", level: "Avancado" },
  ],
  publications: [
    "Artigo sobre avaliacao institucional publicado em revista Qualis A4.",
    "Capitulo em livro sobre formacao de docentes no ensino superior.",
  ],
  researchLines: ["Gestao educacional", "Curriculo", "Formacao docente"],
});

const photoInitialData = (): PhotoResumeData => ({
  templateId: "foto-compacto",
  personal: makePersonal("Raissa Barros Ferreira", "Assistente Administrativa", "Fortaleza", "CE"),
  summary:
    "Profissional organizada, com experiencia em suporte administrativo, atendimento, controle de documentos e apoio a equipes internas.",
  experience: [
    {
      role: "Assistente Administrativa",
      company: "Clinica Nova Vida",
      period: "2021 - Atual",
      description: "Controle de agenda, recepcao, prontuarios e rotinas de faturamento.",
    },
    {
      role: "Auxiliar de Escritorio",
      company: "Grupo Fortaleza Servicos",
      period: "2018 - 2021",
      description: "Cadastro de documentos, apoio a compras e elaboracao de relatorios simples.",
    },
  ],
  education: [
    { degree: "Tecnico em Administracao", institution: "ETE Fortaleza", conclusion: "2017" },
  ],
  skills: ["Rotinas administrativas", "Atendimento", "Agendamento", "Relatorios"],
  languages: [
    { name: "Portugues", level: "Fluente" },
    { name: "Ingles", level: "Basico" },
  ],
  photoUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23e0f2fe'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%2364748b'/%3E%3Cpath d='M34 136c7-24 28-36 46-36s39 12 46 36' fill='%2364748b'/%3E%3C/svg%3E",
  sidebarNote: "Contato e localizacao destacados na coluna lateral com leitura imediata.",
});

const minimalInitialData = (): MinimalAwardsResumeData => ({
  templateId: "minimalista-premios",
  personal: makePersonal("Helena Martines", "Diretora de Branding", "Belo Horizonte", "MG"),
  summary:
    "Estrategia de marca, posicionamento, direcao criativa, lideranca multidisciplinar e campanhas 360 para varejo, educacao e servicos.",
  experience: [
    {
      role: "Diretora de Branding",
      company: "Estudio Aurora",
      period: "Desde janeiro de 2021, Belo Horizonte",
      description: "Lidera projetos de posicionamento, campanhas institucionais e rebranding para empresas de medio porte.",
    },
    {
      role: "Gerente de Conteudo e Marca",
      company: "Casa Viva Comunicacao",
      period: "Marco de 2017 - dezembro de 2020, Sao Paulo",
      description: "Planejou campanhas sazonais e integrou times de conteudo, design e atendimento.",
    },
  ],
  education: [
    { degree: "Publicidade e Propaganda", institution: "PUC Minas", conclusion: "2012" },
  ],
  skills: ["Branding", "Direcao criativa", "Narrativa", "Lideranca"],
  languages: [{ name: "Portugues", level: "Fluente" }],
  address: "Alameda das Acacias, 123",
  awards: [
    { title: "Premio Aberje Regional", issuer: "Aberje", year: "2022" },
    { title: "Destaque em Direcao de Arte", issuer: "Festival Colunistas", year: "2021" },
  ],
});

const creativeInitialData = (): CreativeCardsResumeData => ({
  templateId: "criativo-cards",
  personal: makePersonal("Camila Freitas", "Planejamento de Conteudo", "Recife", "PE"),
  summary:
    "Profissional focada em conteudo, campanhas sazonais, redes sociais, relacionamento com comunidade e storytelling para marcas de consumo.",
  experience: [
    {
      role: "Analista de Conteudo",
      company: "Grupo Solar Turismo",
      period: "2022 - Atual",
      description: "Planejamento editorial, campanhas e governanca de conteudo.",
    },
    {
      role: "Assistente de Marketing Digital",
      company: "Revista Nordeste Viva",
      period: "2019 - 2022",
      description: "Redes sociais, pauta, cobertura de eventos e relacionamento com comunidade.",
    },
  ],
  education: [{ degree: "Jornalismo", institution: "UNICAP", conclusion: "2018" }],
  skills: ["Redacao", "Planejamento editorial", "Campanhas", "Social media"],
  languages: [
    { name: "Portugues", level: "Fluente" },
    { name: "Ingles", level: "Intermediario" },
  ],
  featuredProjects: [
    "Calendario editorial integrado para 4 frentes de produto.",
    "Campanha de lancamento com creators regionais e cobertura em tempo real.",
  ],
});

const coreTemplates = {
  "ats-clean": {
    id: "ats-clean",
    name: "ATS Clean",
    category: "Compatibilidade",
    description: "Modelo enxuto, linear e com foco em leitura por recrutadores e ATS.",
    sourceModel: "modelos/modelo-ats-clean.html",
    pageStyle: { pageMargin: "12mm", fontFamily: "Plus Jakarta Sans" },
    focusAreas: ["Resumo", "Experiencia", "Formacao", "Competencias"],
    createInitialData: atsInitialData,
    Preview: AtsPreview,
    sections: [
      {
        id: "identificacao",
        title: "Identificacao",
        description: "Campos comuns encontrados em quase todos os HTMLs analisados.",
        fields: [
          { key: "personal.fullName", label: "Nome completo", type: "text" },
          { key: "personal.title", label: "Cargo alvo", type: "text" },
          { key: "personal.city", label: "Cidade", type: "text" },
          { key: "personal.state", label: "UF", type: "text" },
          { key: "personal.phone", label: "Telefone", type: "tel" },
          { key: "personal.email", label: "Email", type: "email" },
          { key: "personal.linkedin", label: "LinkedIn", type: "text" },
        ],
      },
      {
        id: "conteudo",
        title: "Conteudo principal",
        description: "Blocos-base do template ATS.",
        fields: [
          { key: "summary", label: "Resumo", type: "textarea" },
          { key: "experience", label: "Experiencias", type: "experience-list" },
          { key: "education", label: "Formacao", type: "education-list" },
          { key: "skills", label: "Competencias", type: "string-list" },
          { key: "languages", label: "Idiomas", type: "language-list" },
        ],
      },
    ],
  },
  "executive-clean": {
    id: "executive-clean",
    name: "Executive Clean",
    category: "Executivo",
    description: "Estrutura corporativa com area lateral para qualificacoes e sinais de lideranca.",
    sourceModel: "modelos/executive-clean.html",
    pageStyle: { pageMargin: "14mm", fontFamily: "Plus Jakarta Sans" },
    focusAreas: ["Frentes de atuacao", "Experiencia", "Indicadores"],
    createInitialData: executiveInitialData,
    Preview: ExecutivePreview,
    sections: [
      {
        id: "identificacao",
        title: "Identificacao",
        description: "Dados do topo executivo.",
        fields: [
          { key: "personal.fullName", label: "Nome completo", type: "text" },
          { key: "personal.title", label: "Cargo atual", type: "text" },
          { key: "personal.city", label: "Cidade", type: "text" },
          { key: "personal.state", label: "UF", type: "text" },
          { key: "personal.phone", label: "Telefone", type: "tel" },
          { key: "personal.email", label: "Email", type: "email" },
          { key: "personal.linkedin", label: "LinkedIn", type: "text" },
        ],
      },
      {
        id: "qualificacoes",
        title: "Frentes de atuacao",
        description: "Campo especifico inferido a partir do modelo executivo.",
        fields: [
          { key: "summary", label: "Resumo estrategico", type: "textarea" },
          { key: "qualifications", label: "Frentes de atuacao", type: "string-list" },
          { key: "experience", label: "Experiencias", type: "experience-list" },
          { key: "education", label: "Formacao", type: "education-list" },
          { key: "skills", label: "Competencias", type: "string-list" },
        ],
      },
    ],
  },
  "academico-serif": {
    id: "academico-serif",
    name: "Academico Serif",
    category: "Academico",
    description: "Visual formal com blocos de pesquisa, publicacoes e trajetoria docente.",
    sourceModel: "modelos/modelo-academico-serif.html",
    pageStyle: { pageMargin: "12mm", fontFamily: "Cormorant Garamond" },
    focusAreas: ["Formacao", "Publicacoes", "Pesquisa"],
    createInitialData: academicInitialData,
    Preview: AcademicPreview,
    sections: [
      {
        id: "identificacao",
        title: "Identificacao",
        description: "Topo formal do curriculo academico.",
        fields: [
          { key: "personal.fullName", label: "Nome completo", type: "text" },
          { key: "personal.title", label: "Titulo profissional", type: "text" },
          { key: "personal.city", label: "Cidade", type: "text" },
          { key: "personal.state", label: "UF", type: "text" },
          { key: "personal.phone", label: "Telefone", type: "tel" },
          { key: "personal.email", label: "Email", type: "email" },
          { key: "personal.linkedin", label: "LinkedIn", type: "text" },
        ],
      },
      {
        id: "academico",
        title: "Producao academica",
        description: "Campos extras que nao aparecem no ATS ou no modelo criativo.",
        fields: [
          { key: "summary", label: "Resumo academico", type: "textarea" },
          { key: "experience", label: "Experiencias", type: "experience-list" },
          { key: "education", label: "Formacao", type: "education-list" },
          { key: "researchLines", label: "Linhas de pesquisa", type: "string-list" },
          { key: "publications", label: "Publicacoes", type: "string-list" },
        ],
      },
    ],
  },
  "foto-compacto": {
    id: "foto-compacto",
    name: "Foto Compacto",
    category: "Administrativo",
    description: "Template com foto e dados laterais destacados para leitura rapida.",
    sourceModel: "modelos/modelo-foto-compacto.html",
    pageStyle: { pageMargin: "12mm", fontFamily: "Plus Jakarta Sans" },
    focusAreas: ["Foto", "Sidebar", "Experiencia objetiva"],
    createInitialData: photoInitialData,
    Preview: PhotoPreview,
    sections: [
      {
        id: "identificacao",
        title: "Identificacao",
        description: "Topo lateral com foto e contatos.",
        fields: [
          { key: "personal.fullName", label: "Nome completo", type: "text" },
          { key: "personal.title", label: "Cargo alvo", type: "text" },
          { key: "personal.city", label: "Cidade", type: "text" },
          { key: "personal.state", label: "UF", type: "text" },
          { key: "personal.phone", label: "Telefone", type: "tel" },
          { key: "personal.email", label: "Email", type: "email" },
          { key: "personal.linkedin", label: "LinkedIn", type: "text" },
          { key: "photoUrl", label: "URL da foto", type: "text" },
          { key: "sidebarNote", label: "Nota lateral", type: "textarea" },
        ],
      },
      {
        id: "conteudo",
        title: "Conteudo principal",
        description: "Blocos de perfil administrativo.",
        fields: [
          { key: "summary", label: "Resumo", type: "textarea" },
          { key: "experience", label: "Experiencias", type: "experience-list" },
          { key: "education", label: "Formacao", type: "education-list" },
          { key: "skills", label: "Competencias", type: "string-list" },
          { key: "languages", label: "Idiomas", type: "language-list" },
        ],
      },
    ],
  },
  "minimalista-premios": {
    id: "minimalista-premios",
    name: "Minimalista Premios",
    category: "Branding",
    description: "Layout editorial com grande area de respiro e secao dedicada a premios.",
    sourceModel: "modelos/modelo-minimalista-premios.html",
    pageStyle: { pageMargin: "12mm", fontFamily: "Space Grotesk" },
    focusAreas: ["Premios", "Endereco", "Narrativa longa"],
    createInitialData: minimalInitialData,
    Preview: MinimalAwardsPreview,
    sections: [
      {
        id: "identificacao",
        title: "Identificacao",
        description: "Informacoes de topo e localizacao detalhada.",
        fields: [
          { key: "personal.fullName", label: "Nome completo", type: "text" },
          { key: "personal.title", label: "Cargo alvo", type: "text" },
          { key: "address", label: "Endereco", type: "text" },
          { key: "personal.city", label: "Cidade", type: "text" },
          { key: "personal.state", label: "UF", type: "text" },
          { key: "personal.phone", label: "Telefone", type: "tel" },
          { key: "personal.email", label: "Email", type: "email" },
        ],
      },
      {
        id: "brand",
        title: "Narrativa e reconhecimento",
        description: "Campos ausentes nos modelos mais objetivos.",
        fields: [
          { key: "summary", label: "Resumo", type: "textarea" },
          { key: "experience", label: "Experiencias", type: "experience-list" },
          { key: "awards", label: "Premios", type: "award-list" },
        ],
      },
    ],
  },
  "criativo-cards": {
    id: "criativo-cards",
    name: "Criativo Cards",
    category: "Criativo",
    description: "Blocos coloridos para conteudo, comunicacao e portfolios autorais.",
    sourceModel: "modelos/modelo-criativo-cards.html",
    pageStyle: { pageMargin: "12mm", fontFamily: "Plus Jakarta Sans" },
    focusAreas: ["Projetos", "Resumo curto", "Cards"],
    createInitialData: creativeInitialData,
    Preview: CreativeCardsPreview,
    sections: [
      {
        id: "identificacao",
        title: "Identificacao",
        description: "Apresentacao direta do perfil criativo.",
        fields: [
          { key: "personal.fullName", label: "Nome completo", type: "text" },
          { key: "personal.title", label: "Especialidade", type: "text" },
          { key: "personal.city", label: "Cidade", type: "text" },
          { key: "personal.state", label: "UF", type: "text" },
          { key: "personal.phone", label: "Telefone", type: "tel" },
          { key: "personal.email", label: "Email", type: "email" },
          { key: "personal.linkedin", label: "LinkedIn", type: "text" },
        ],
      },
      {
        id: "criativo",
        title: "Cards de conteudo",
        description: "Prioriza repertorio e projetos, nao so cargos.",
        fields: [
          { key: "summary", label: "Resumo", type: "textarea" },
          { key: "skills", label: "Competencias", type: "string-list" },
          { key: "featuredProjects", label: "Projetos em destaque", type: "string-list" },
          { key: "experience", label: "Experiencias", type: "experience-list" },
          { key: "education", label: "Formacao", type: "education-list" },
        ],
      },
    ],
  },
} satisfies {
  "ats-clean": TemplateDefinition<"ats-clean">;
  "executive-clean": TemplateDefinition<"executive-clean">;
  "academico-serif": TemplateDefinition<"academico-serif">;
  "foto-compacto": TemplateDefinition<"foto-compacto">;
  "minimalista-premios": TemplateDefinition<"minimalista-premios">;
  "criativo-cards": TemplateDefinition<"criativo-cards">;
};

export const templates: { [K in TemplateId]: TemplateDefinition<K> } = {
  ...coreTemplates,
  "modelo-1": {
    ...coreTemplates["ats-clean"],
    id: "modelo-1",
    name: "Modelo 1",
    category: "Essencial",
    description: "Versao base para curriculos diretos e montagem inicial.",
    sourceModel: "modelos/modelo-1.html",
    Preview: createAtsVariantPreview({
      headerAccent: "bg-slate-700",
      surface: "bg-white",
      sectionTone: "border-slate-200 bg-slate-50",
    }),
  },
  "split-professional": {
    ...coreTemplates["ats-clean"],
    id: "split-professional",
    name: "Split Professional",
    category: "Profissional",
    description: "Estrutura objetiva com leitura clara e ritmo corporativo.",
    sourceModel: "modelos/split-professional.html",
    Preview: createAtsVariantPreview({
      headerAccent: "bg-blue-700",
      surface: "bg-slate-50",
      sectionTone: "border-blue-100 bg-white",
    }),
  },
  "service-classic": {
    ...coreTemplates["ats-clean"],
    id: "service-classic",
    name: "Service Classic",
    category: "Servicos",
    description: "Modelo funcional para atendimento, saude e operacoes.",
    sourceModel: "modelos/service-classic.html",
    Preview: createAtsVariantPreview({
      headerAccent: "bg-emerald-700",
      surface: "bg-emerald-50",
      sectionTone: "border-emerald-100 bg-white",
    }),
  },
  "chronological-elegant": {
    ...coreTemplates["executive-clean"],
    id: "chronological-elegant",
    name: "Chronological Elegant",
    category: "Executivo",
    description: "Linha cronologica refinada para trajetorias longas.",
    sourceModel: "modelos/chronological-elegant.html",
    pageStyle: { pageMargin: "12mm", fontFamily: "Cormorant Garamond" },
    Preview: createExecutiveVariantPreview({
      headerClass: "bg-stone-800",
      accentClass: "border-stone-700",
      sideSurfaceClass: "bg-stone-50",
      titleClass: "font-serif",
    }),
  },
  "modelo-executivo-timeline": {
    ...coreTemplates["executive-clean"],
    id: "modelo-executivo-timeline",
    name: "Executivo Timeline",
    category: "Executivo",
    description: "Timeline para cargos de gestao e progressao de carreira.",
    sourceModel: "modelos/modelo-executivo-timeline.html",
    Preview: createExecutiveVariantPreview({
      headerClass: "bg-slate-900",
      accentClass: "border-slate-900",
      sideSurfaceClass: "bg-slate-50",
    }),
  },
  "modelo-corporativo-balanceado": {
    ...coreTemplates["executive-clean"],
    id: "modelo-corporativo-balanceado",
    name: "Corporativo Balanceado",
    category: "Corporativo",
    description: "Composicao equilibrada para perfis administrativos e executivos.",
    sourceModel: "modelos/modelo-corporativo-balanceado.html",
    Preview: createExecutiveVariantPreview({
      headerClass: "bg-blue-800",
      accentClass: "border-blue-700",
      sideSurfaceClass: "bg-blue-50",
    }),
  },
  "modelo-corporativo-wave": {
    ...coreTemplates["executive-clean"],
    id: "modelo-corporativo-wave",
    name: "Corporativo Wave",
    category: "Corporativo",
    description: "Cabecalho forte e visual formal para perfis de negocios.",
    sourceModel: "modelos/modelo-corporativo-wave.html",
    Preview: createExecutiveVariantPreview({
      headerClass: "bg-cyan-700",
      accentClass: "border-cyan-700",
      sideSurfaceClass: "bg-cyan-50",
    }),
  },
  "modelo-juridico-classico": {
    ...coreTemplates["executive-clean"],
    id: "modelo-juridico-classico",
    name: "Juridico Classico",
    category: "Tradicional",
    description: "Versao formal para advocacia, consultoria e setores conservadores.",
    sourceModel: "modelos/modelo-juridico-classico.html",
    Preview: createExecutiveVariantPreview({
      headerClass: "bg-amber-900",
      accentClass: "border-amber-800",
      sideSurfaceClass: "bg-amber-50",
      titleClass: "font-serif",
    }),
  },
  "visual-modern": {
    ...coreTemplates["foto-compacto"],
    id: "visual-modern",
    name: "Visual Modern",
    category: "Visual",
    description: "Destaque visual com foto e leitura lateral de competencias.",
    sourceModel: "modelos/visual-modern.html",
    Preview: createPhotoVariantPreview({
      asideClass: "bg-indigo-700",
      bodyClass: "bg-white",
      pillClass: "bg-white/15",
    }),
  },
  "modelo-sidebar-foto": {
    ...coreTemplates["foto-compacto"],
    id: "modelo-sidebar-foto",
    name: "Sidebar Foto",
    category: "Foto",
    description: "Sidebar com foto e bloco principal para experiencia.",
    sourceModel: "modelos/modelo-sidebar-foto.html",
    Preview: createPhotoVariantPreview({
      asideClass: "bg-rose-700",
      bodyClass: "bg-rose-50/30",
      pillClass: "bg-white/15",
    }),
  },
  "modelo-premium-sidebar": {
    ...coreTemplates["foto-compacto"],
    id: "modelo-premium-sidebar",
    name: "Premium Sidebar",
    category: "Premium",
    description: "Layout premium com coluna lateral marcante.",
    sourceModel: "modelos/modelo-premium-sidebar.html",
    Preview: createPhotoVariantPreview({
      asideClass: "bg-slate-950",
      bodyClass: "bg-slate-50/60",
      pillClass: "bg-white/10",
    }),
  },
  "modelo-classico-duas-colunas": {
    ...coreTemplates["foto-compacto"],
    id: "modelo-classico-duas-colunas",
    name: "Classico Duas Colunas",
    category: "Classico",
    description: "Composicao em duas colunas com leitura tradicional.",
    sourceModel: "modelos/modelo-classico-duas-colunas.html",
    Preview: createPhotoVariantPreview({
      asideClass: "bg-violet-700",
      bodyClass: "bg-violet-50/20",
      pillClass: "bg-white/15",
    }),
  },
  "curriculo-joao-roberto": {
    ...coreTemplates["foto-compacto"],
    id: "curriculo-joao-roberto",
    name: "Perfil Personalizado",
    category: "Personalizado",
    description: "Modelo personalizado preservado como template selecionavel.",
    sourceModel: "modelos/curriculo_joao_roberto.html",
    Preview: createPhotoVariantPreview({
      asideClass: "bg-amber-700",
      bodyClass: "bg-amber-50/20",
      pillClass: "bg-white/15",
    }),
  },
  "creative-compact": {
    ...coreTemplates["criativo-cards"],
    id: "creative-compact",
    name: "Creative Compact",
    category: "Criativo",
    description: "Versao compacta para conteudo, marca pessoal e portfolio.",
    sourceModel: "modelos/creative-compact.html",
    Preview: createCreativeVariantPreview({
      headerClass: "bg-gradient-to-r from-orange-500 to-pink-500",
      blockA: "bg-orange-50",
      blockB: "bg-pink-50",
      blockC: "bg-amber-50",
    }),
  },
  "modelo-editorial": {
    ...coreTemplates["criativo-cards"],
    id: "modelo-editorial",
    name: "Modelo Editorial",
    category: "Editorial",
    description: "Blocos fortes e composicao inspirada em diagramacao editorial.",
    sourceModel: "modelos/modelo-editorial.html",
    Preview: createCreativeVariantPreview({
      headerClass: "bg-slate-900",
      blockA: "bg-stone-100",
      blockB: "bg-slate-100",
      blockC: "bg-neutral-100",
    }),
  },
};

export const templateList = Object.values(templates);

export const createResumeData = <T extends TemplateId>(templateId: T) =>
  templates[templateId].createInitialData();

export const isTemplateData = <T extends TemplateId>(
  templateId: T,
  data: ResumeData,
): data is ReturnType<(typeof templates)[T]["createInitialData"]> => data.templateId === templateId;
