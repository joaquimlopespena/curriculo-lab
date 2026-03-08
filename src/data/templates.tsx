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
  <div className="mx-auto w-[794px] max-w-full rounded-3xl bg-white p-10 shadow-paper">
    <header className="border-b border-zinc-300 pb-6">
      <h1 className="text-4xl font-extrabold text-zinc-950">{data.personal.fullName}</h1>
      <p className="mt-2 text-lg font-semibold text-zinc-700">{data.personal.title}</p>
      <div className="mt-4 grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
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
            <p className="text-zinc-500">{item.company} | {item.period}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
    <div className="mt-6 grid gap-6 md:grid-cols-2">
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
      <section className="md:col-span-2">
        <SectionTitle>Competencias</SectionTitle>
        <p className="mt-3 text-sm leading-7 text-zinc-700">{data.skills.join(", ")}.</p>
      </section>
    </div>
  </div>
);

const ExecutivePreview = ({ data }: { data: ExecutiveResumeData }) => (
  <div className="mx-auto w-[794px] max-w-full rounded-[30px] bg-white shadow-paper">
    <header className="bg-sky-700 px-8 py-10 text-white">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-100">Perfil Profissional</p>
          <h1 className="mt-3 text-5xl font-black">{data.personal.fullName}</h1>
          <p className="mt-2 text-lg font-semibold text-sky-100">{data.personal.title}</p>
        </div>
        <div className="grid gap-2 text-sm text-sky-50 md:text-right">
          <p>{data.personal.phone}</p>
          <p>{data.personal.email}</p>
          <p>{data.personal.linkedin}</p>
          <p>{data.personal.city}, {data.personal.state}</p>
        </div>
      </div>
    </header>
    <main className="grid gap-8 px-8 py-8 md:grid-cols-[1.15fr_0.85fr]">
      <div>
        <section>
          <SectionTitle>Resumo / Objetivo</SectionTitle>
          <p className="mt-4 text-sm leading-7 text-slate-600">{data.summary}</p>
        </section>
        <section className="mt-8">
          <SectionTitle>Experiencia Profissional</SectionTitle>
          <div className="mt-5 space-y-6">
            {data.experience.map((item) => (
              <article key={`${item.role}-${item.company}`} className="border-l-4 border-sky-700 pl-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                    <p className="text-sm font-semibold text-sky-700">{item.company}</p>
                  </div>
                  <p className="text-sm text-slate-500">{item.period}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <aside className="space-y-6">
        <section className="rounded-3xl bg-slate-50 p-6">
          <SectionTitle>Resumo de Qualificacoes</SectionTitle>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            {data.qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl bg-slate-50 p-6">
          <SectionTitle>Formacao Academica</SectionTitle>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            {data.education.map((item) => (
              <div key={`${item.degree}-${item.institution}`}>
                <h3 className="font-bold text-slate-900">{item.degree}</h3>
                <p>{item.institution}</p>
                <p>Conclusao: {item.conclusion}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-slate-50 p-6">
          <SectionTitle>Competencias</SectionTitle>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {data.skills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </aside>
    </main>
  </div>
);

const AcademicPreview = ({ data }: { data: AcademicResumeData }) => (
  <div className="mx-auto w-[794px] max-w-full rounded-3xl bg-white p-10 shadow-paper">
    <header className="border-b border-stone-300 pb-6">
      <h1 className="font-serif text-5xl text-stone-950">{data.personal.fullName}</h1>
      <p className="mt-2 font-serif text-xl text-stone-700">{data.personal.title}</p>
      <div className="mt-4 space-y-1 text-sm text-stone-600">
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
            <p className="text-stone-500">{item.company} | {item.period}</p>
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
    <div className="mt-8 grid gap-6 md:grid-cols-2">
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
  <div className="mx-auto grid w-[794px] max-w-full overflow-hidden rounded-[22px] bg-white shadow-paper md:grid-cols-[0.3fr_0.7fr]">
    <aside className="bg-sky-700 px-8 py-10 text-white">
      <img
        src={data.photoUrl}
        alt={data.personal.fullName}
        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
      />
      <h1 className="mt-6 text-3xl font-black">{data.personal.fullName}</h1>
      <p className="mt-2 text-sky-100">{data.personal.title}</p>
      <div className="mt-6 space-y-2 text-sm text-sky-50">
        <p>{data.personal.phone}</p>
        <p>{data.personal.email}</p>
        <p>{data.personal.city}, {data.personal.state}</p>
        <p>{data.personal.linkedin}</p>
      </div>
      <section className="mt-8">
        <h2 className="text-xs uppercase tracking-[0.3em] text-sky-100">Competencias</h2>
        <ul className="mt-4 space-y-2 text-sm text-sky-50">
          {data.skills.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-xs uppercase tracking-[0.3em] text-sky-100">Dados Pessoais</h2>
        <p className="mt-4 text-sm leading-7 text-sky-50">{data.sidebarNote}</p>
      </section>
    </aside>
    <main className="px-8 py-10">
      <section>
        <SectionTitle>Resumo / Objetivo</SectionTitle>
        <p className="mt-3 text-sm leading-7 text-slate-700">{data.summary}</p>
      </section>
      <section className="mt-8">
        <SectionTitle>Experiencia Profissional</SectionTitle>
        <div className="mt-4 space-y-6 text-sm leading-7 text-slate-700">
          {data.experience.map((item) => (
            <article key={`${item.role}-${item.company}`}>
              <h3 className="font-bold text-slate-950">{item.role}</h3>
              <p className="text-slate-500">{item.company} | {item.period}</p>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-8">
        <SectionTitle>Formacao Academica</SectionTitle>
        <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
          {data.education.map((item) => (
            <div key={`${item.degree}-${item.institution}`}>
              <p className="font-bold text-slate-950">{item.degree}</p>
              <p>{item.institution}</p>
              <p>Conclusao: {item.conclusion}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

const MinimalAwardsPreview = ({ data }: { data: MinimalAwardsResumeData }) => (
  <div className="mx-auto grid w-[794px] max-w-full gap-10 rounded-[20px] bg-zinc-100 px-10 py-10 shadow-paper md:grid-cols-[0.34fr_0.66fr]">
    <aside>
      <h1 className="text-5xl font-black leading-none text-zinc-950">{data.personal.fullName}</h1>
      <p className="mt-4 text-3xl font-semibold text-orange-500">{data.personal.title}</p>
      <div className="mt-8 space-y-3 text-zinc-700">
        <p>{data.address}</p>
        <p>{data.personal.city}, {data.personal.state}</p>
        <p className="text-orange-500">{data.personal.phone}</p>
        <p className="text-orange-500">{data.personal.email}</p>
      </div>
    </aside>
    <div className="space-y-10">
      <section className="border-t-4 border-zinc-950 pt-4">
        <p className="text-lg leading-8 text-zinc-700">{data.summary}</p>
      </section>
      <section className="border-t-4 border-zinc-950 pt-4">
        {data.experience.map((item) => (
          <article key={`${item.role}-${item.company}`} className="mb-8">
            <h3 className="text-2xl font-semibold text-zinc-950">{item.company} / {item.role}</h3>
            <p className="mt-1 text-sm uppercase tracking-wide text-zinc-500">{item.period}</p>
            <p className="mt-3 text-lg leading-8 text-zinc-700">{item.description}</p>
          </article>
        ))}
      </section>
      <section className="border-t-4 border-zinc-950 pt-4">
        <h2 className="text-2xl font-bold text-zinc-950">Premios</h2>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-zinc-700">
          {data.awards.map((item) => (
            <li key={`${item.title}-${item.year}`}>{item.title} - {item.issuer} - {item.year}</li>
          ))}
        </ul>
      </section>
    </div>
  </div>
);

const CreativeCardsPreview = ({ data }: { data: CreativeCardsResumeData }) => (
  <div className="mx-auto w-[794px] max-w-full rounded-[24px] bg-white p-8 shadow-paper">
    <header className="rounded-[24px] bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-8 text-white">
      <h1 className="text-5xl font-black">{data.personal.fullName}</h1>
      <p className="mt-2 text-xl font-semibold">{data.personal.title}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <p>{data.personal.city}, {data.personal.state}</p>
        <p>{data.personal.phone}</p>
        <p>{data.personal.email}</p>
        <p>{data.personal.linkedin}</p>
      </div>
    </header>
    <section className="mt-8 grid gap-6 md:grid-cols-2">
      <article className="rounded-[24px] bg-rose-50 p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-rose-500">Resumo / Objetivo</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">{data.summary}</p>
      </article>
      <article className="rounded-[24px] bg-amber-50 p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">Competencias</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">{data.skills.join(", ")}.</p>
      </article>
      <article className="rounded-[24px] bg-orange-50 p-6 md:col-span-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Projetos em Destaque</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
          {data.featuredProjects.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article className="rounded-[24px] bg-amber-50 p-6 md:col-span-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">Experiencia Profissional</h2>
        <div className="mt-3 space-y-4 text-sm leading-7 text-slate-700">
          {data.experience.map((item) => (
            <p key={`${item.role}-${item.company}`}>
              <span className="font-bold text-slate-950">{item.role}</span> - {item.company} - {item.period}
            </p>
          ))}
        </div>
      </article>
    </section>
  </div>
);

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

export const templates: { [K in TemplateId]: TemplateDefinition<K> } = {
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
    focusAreas: ["Resumo de qualificacoes", "Experiencia", "Indicadores"],
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
        title: "Qualificacoes",
        description: "Campo especifico inferido a partir do modelo executivo.",
        fields: [
          { key: "summary", label: "Resumo estrategico", type: "textarea" },
          { key: "qualifications", label: "Resumo de qualificacoes", type: "string-list" },
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
};

export const templateList = Object.values(templates);

export const createResumeData = <T extends TemplateId>(templateId: T) =>
  templates[templateId].createInitialData();

export const isTemplateData = <T extends TemplateId>(
  templateId: T,
  data: ResumeData,
): data is ReturnType<(typeof templates)[T]["createInitialData"]> => data.templateId === templateId;
