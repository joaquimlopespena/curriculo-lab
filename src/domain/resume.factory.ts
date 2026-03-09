import type { Resume, ResumeStepId, StepMeta } from "./resume.types";
import type { TemplateId } from "../types/resume";

const DEFAULT_PROFILE_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0%' stop-color='%23f8fafc'/%3E%3Cstop offset='100%' stop-color='%23dbeafe'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='240' height='240' rx='28' fill='url(%23bg)'/%3E%3Ccircle cx='120' cy='88' r='42' fill='%2364748b'/%3E%3Cpath d='M48 210c14-40 40-60 72-60s58 20 72 60' fill='%23475569'/%3E%3C/svg%3E";

export const STEP_ORDER: StepMeta[] = [
  {
    id: "CONTACT",
    title: "Contato",
    shortTitle: "Contato",
    description: "Nome, endereco, localizacao e contatos principais.",
  },
  {
    id: "EXPERIENCE",
    title: "Historico Profissional",
    shortTitle: "Experiencias",
    description: "Empregos, datas e posicao atual.",
  },
  {
    id: "EDUCATION",
    title: "Formacao Academica",
    shortTitle: "Formacao",
    description: "Cursos, instituicoes e conclusao.",
  },
  {
    id: "SKILLS",
    title: "Competencias",
    shortTitle: "Habilidades",
    description: "Competencias-chave com painel de sugestoes.",
  },
  {
    id: "OBJECTIVE",
    title: "Objetivo Profissional",
    shortTitle: "Objetivo",
    description: "Resumo curto e orientado ao cargo.",
  },
  {
    id: "EXTRAS",
    title: "Ativacao de Secoes Extras",
    shortTitle: "Extras",
    description: "Certificacoes, idiomas e blocos adicionais.",
  },
  {
    id: "FINALIZE",
    title: "Finalizar",
    shortTitle: "Download",
    description: "Revisao final e geracao do PDF.",
  },
];

function createFilledResume(templateId: TemplateId): Resume {
  return {
    templateId,
    header: {
      firstName: "Marcos",
      lastName: "Avelar Monteiro",
      photoUrl: DEFAULT_PROFILE_PHOTO,
      address: "Rua das Acacias, 245",
      city: "Joinville",
      state: "SC",
      zipCode: "89203-120",
      phone: "(47) 99124-5508",
      email: "marcos.avelar@exemplo.dev",
      linkedin: "linkedin.com/in/marcos-avelar",
      title: "Coordenador de Operacoes e Logistica",
      optionalFields: {
        birthDate: "22/05/1991",
        nationality: "Brasileiro",
        driverLicense: "CNH AB",
      },
    },
    history: [
      {
        id: "job-1",
        role: "Coordenador de Operacoes",
        employer: "Logistica Horizonte Sul",
        city: "Joinville",
        state: "SC",
        startDate: { month: "Fevereiro", year: "2022" },
        current: true,
        description:
          "Coordenacao de equipe operacional com foco em distribuicao urbana, monitoramento de frota, controle de janelas de entrega e suporte a indicadores de produtividade e nivel de servico.",
      },
      {
        id: "job-2",
        role: "Analista de Operacoes Logisticas",
        employer: "Via Carga Integrada",
        city: "Araquari",
        state: "SC",
        startDate: { month: "Abril", year: "2018" },
        endDate: { month: "Janeiro", year: "2022" },
        current: false,
        description:
          "Planejamento de rotas, acompanhamento de entregas, interface com motoristas e acompanhamento de ocorrencias operacionais para reduzir atrasos e retrabalho na malha regional.",
      },
      {
        id: "job-3",
        role: "Assistente de Expedicao",
        employer: "CentroLog Distribuicao",
        city: "Joinville",
        state: "SC",
        startDate: { month: "Janeiro", year: "2015" },
        endDate: { month: "Marco", year: "2018" },
        current: false,
        description:
          "Apoio em expedicao, conferencia documental, organizacao de carregamentos e atualizacao de controles internos de entrada, saida e ocorrencias de transporte.",
      },
    ],
    education: [
      {
        id: "edu-1",
        course: "Tecnologo em Logistica",
        institution: "Centro Universitario Catarinense",
        city: "Joinville",
        state: "SC",
        conclusionYear: "2020",
        current: false,
        details: "Formacao com enfase em distribuicao, armazenagem, planejamento logistico e melhoria de processos.",
      },
      {
        id: "edu-2",
        course: "Tecnico em Administracao",
        institution: "Escola Tecnica do Norte",
        city: "Joinville",
        state: "SC",
        conclusionYear: "2014",
        current: false,
        details: "Base em rotinas administrativas, controles operacionais e atendimento interno a areas de apoio.",
      },
    ],
    skills: [
      { id: "skill-1", name: "Planejamento de rotas e distribuicao" },
      { id: "skill-2", name: "Coordenacao de equipes operacionais" },
      { id: "skill-3", name: "Controle de indicadores logisticos" },
      { id: "skill-4", name: "Gestao de ocorrencias e prazos" },
      { id: "skill-5", name: "Acompanhamento de frota" },
      { id: "skill-6", name: "Organizacao de expedicao" },
      { id: "skill-7", name: "Padronizacao de processos" },
      { id: "skill-8", name: "Comunicacao com times de campo" },
    ],
    objective: {
      text: "Profissional com experiencia em operacoes logisticas, distribuicao e acompanhamento de desempenho. Busco contribuir com organizacao, leitura de indicadores e melhoria continua em ambientes de ritmo intenso.",
    },
    extras: {
      certifications: [
        {
          id: "cert-1",
          name: "Gestao de Indicadores Logistico-Operacionais",
          issuer: "Instituto Supply Academy",
          year: "2024",
        },
        {
          id: "cert-2",
          name: "Planejamento de Rotas e Last Mile",
          issuer: "Escola Brasileira de Logistica",
          year: "2023",
        },
        {
          id: "cert-3",
          name: "Excel aplicado a Operacoes",
          issuer: "Plataforma Capacita Pro",
          year: "2022",
        },
      ],
      languages: [
        { id: "lang-1", name: "Portugues", level: "Fluente" },
        { id: "lang-2", name: "Ingles", level: "Leitura tecnica" },
      ],
      customSections: [
        "Disponibilidade para viagens curtas e acompanhamento em campo.",
        "Vivencia com times multidisciplinares e rotina de operacao regional.",
        "Facilidade para padronizar processos e apoiar melhoria continua.",
      ],
    },
  };
}

export function createInitialResume(templateId: TemplateId): Resume {
  return {
    ...createFilledResume(templateId),
    header: {
      ...createFilledResume(templateId).header,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      linkedin: "",
      title: "",
      optionalFields: {
        birthDate: undefined,
        nationality: undefined,
        driverLicense: undefined,
      },
    },
    history: [
      {
        id: "job-1",
        role: "",
        employer: "",
        city: "",
        state: "",
        startDate: { month: "Mes", year: "" },
        endDate: { month: "Mes", year: "" },
        current: false,
        description: "",
      },
    ],
    education: [
      {
        id: "edu-1",
        course: "",
        institution: "",
        city: "",
        state: "",
        conclusionYear: "",
        current: false,
        details: "",
      },
    ],
    skills: [],
    objective: {
      text: "",
    },
    extras: {
      certifications: [],
      languages: [],
      customSections: [],
    },
  };
}

export function createCatalogResume(templateId: TemplateId): Resume {
  const resume = createFilledResume(templateId);

  const variants: Record<
    TemplateId,
    Partial<Resume["header"]> & {
      objective?: string;
      firstJob?: Partial<Resume["history"][number]>;
      firstEducation?: Partial<Resume["education"][number]>;
      skills?: string[];
    }
  > = {
    "ats-clean": {
      firstName: "Laura",
      lastName: "Moretti",
      title: "Analista Financeira Senior",
      city: "Campinas",
      state: "SP",
      objective:
        "Experiencia em planejamento financeiro, fechamento mensal, analise de indicadores e suporte executivo a decisao.",
      firstJob: {
        role: "Analista Financeira Senior",
        employer: "Grupo Vesper",
      },
      firstEducation: {
        course: "Administracao",
        institution: "Mackenzie",
      },
      skills: ["Planejamento financeiro", "Fechamento mensal", "Indicadores", "Controle orcamentario"],
    },
    "executive-clean": {
      firstName: "Helena",
      lastName: "Pereira",
      title: "Gerente de Operacoes",
      city: "Sao Paulo",
      state: "SP",
      objective:
        "Executiva com foco em eficiencia operacional, gestao de times e melhoria de processos em estruturas de crescimento.",
      firstJob: {
        role: "Gerente de Operacoes",
        employer: "NorteLog Solutions",
      },
      firstEducation: {
        course: "MBA em Gestao de Negocios",
        institution: "Fundacao Dom Cabral",
      },
      skills: ["Lideranca", "Processos", "Indicadores", "Governanca"],
    },
    "academico-serif": {
      firstName: "Thiago",
      lastName: "Souza",
      title: "Tecnologo de Informacao",
      city: "Belo Horizonte",
      state: "MG",
      objective:
        "Atuacao em tecnologia da informacao com experiencia em suporte, documentacao tecnica e melhoria de processos internos.",
      firstJob: {
        role: "Analista de Suporte",
        employer: "Nexus TI",
      },
      firstEducation: {
        course: "Sistemas de Informacao",
        institution: "PUC Minas",
      },
      skills: ["Documentacao", "Suporte", "Treinamento", "Padronizacao"],
    },
    "foto-compacto": {
      firstName: "Olivia",
      lastName: "Vieira",
      title: "Administradora",
      city: "Curitiba",
      state: "PR",
      objective:
        "Profissional com vivencia em rotinas administrativas, organizacao documental e apoio a areas operacionais.",
      firstJob: {
        role: "Assistente Administrativa",
        employer: "Atria Office",
      },
      firstEducation: {
        course: "Gestao Administrativa",
        institution: "Unicesumar",
      },
      skills: ["Organizacao", "Atendimento", "Planilhas", "Comunicacao"],
    },
    "modelo-1": {
      firstName: "Juliana",
      lastName: "Silva",
      title: "Assistente Administrativa",
      city: "Sao Paulo",
      state: "SP",
      objective: "Atuacao em suporte administrativo, atendimento interno e rotinas de controle.",
      firstJob: { role: "Assistente Administrativa", employer: "Office Line" },
      firstEducation: { course: "Gestao Comercial", institution: "Universidade Positivo" },
      skills: ["Atendimento", "Agenda", "Planilhas", "Processos"],
    },
    "split-professional": {
      firstName: "Sandra",
      lastName: "Oliveira",
      title: "Engenheira Mecanica",
      city: "Joinville",
      state: "SC",
      objective: "Experiencia em engenharia aplicada, melhoria de processo e acompanhamento tecnico de producao.",
      firstJob: { role: "Engenheira de Processos", employer: "Metal Norte" },
      firstEducation: { course: "Engenharia Mecanica", institution: "UDESC" },
      skills: ["Processos", "Qualidade", "Lean", "Documentacao tecnica"],
    },
    "service-classic": {
      firstName: "Luana",
      lastName: "Alvarez",
      title: "Atendimento e Vendas",
      city: "Sao Paulo",
      state: "SP",
      objective: "Perfil comercial com foco em relacionamento, vendas consultivas e experiencia do cliente.",
      firstJob: { role: "Consultora Comercial", employer: "Verde Mais" },
      firstEducation: { course: "Marketing", institution: "Anhembi Morumbi" },
      skills: ["Vendas", "Relacionamento", "Pos-venda", "Comunicacao"],
    },
    "chronological-elegant": {
      firstName: "Jonas",
      lastName: "Barbosa",
      title: "Projetista de Sistemas",
      city: "Recife",
      state: "PE",
      objective: "Experiencia em projetos, documentacao funcional e organizacao tecnica de entregas.",
      firstJob: { role: "Projetista de Sistemas", employer: "Arcus Tech" },
      firstEducation: { course: "Analise e Desenvolvimento", institution: "SENAC" },
      skills: ["Projetos", "Analise", "Desenho funcional", "Comunicacao tecnica"],
    },
    "modelo-executivo-timeline": {
      firstName: "Rafael",
      lastName: "Costa",
      title: "Diretor Comercial",
      city: "Fortaleza",
      state: "CE",
      objective: "Executivo com foco em expansao comercial, lideranca de equipes e crescimento sustentado.",
      firstJob: { role: "Diretor Comercial", employer: "Mercato Brasil" },
      firstEducation: { course: "Administracao", institution: "FGV" },
      skills: ["Lideranca", "Estrategia", "Receita", "Expansao"],
    },
    "modelo-corporativo-balanceado": {
      firstName: "Marina",
      lastName: "Campos",
      title: "Coordenadora Administrativa",
      city: "Florianopolis",
      state: "SC",
      objective: "Gestao administrativa com foco em fluxo interno, indicadores e suporte a diretoria.",
      firstJob: { role: "Coordenadora Administrativa", employer: "Vertex Corp" },
      firstEducation: { course: "Processos Gerenciais", institution: "SENAC" },
      skills: ["Fluxos", "Indicadores", "Operacao", "Administracao"],
    },
    "modelo-corporativo-wave": {
      firstName: "Felipe",
      lastName: "Soares",
      title: "Jovem Aprendiz",
      city: "Goiania",
      state: "GO",
      objective: "Inicio de carreira com interesse em aprender rotinas administrativas e suporte operacional.",
      firstJob: { role: "Jovem Aprendiz", employer: "Central Office" },
      firstEducation: { course: "Ensino Medio", institution: "Colegio Estadual" },
      skills: ["Aprendizado rapido", "Organizacao", "Apoio", "Comprometimento"],
    },
    "modelo-juridico-classico": {
      firstName: "Jose",
      lastName: "Pereira",
      title: "Analista Juridico",
      city: "Brasilia",
      state: "DF",
      objective: "Atuacao em analise documental, apoio a contratos e acompanhamento de fluxos juridicos.",
      firstJob: { role: "Analista Juridico", employer: "Pereira e Lima" },
      firstEducation: { course: "Direito", institution: "UDF" },
      skills: ["Contratos", "Analise", "Documentos", "Pesquisa juridica"],
    },
    "visual-modern": {
      firstName: "Juliana",
      lastName: "Silva",
      title: "Administracao",
      city: "Curitiba",
      state: "PR",
      objective: "Profissional com foco em apoio administrativo, organizacao e comunicacao interna.",
      firstJob: { role: "Assistente Administrativa", employer: "Vertice RH" },
      firstEducation: { course: "Administracao", institution: "Unopar" },
      skills: ["Administracao", "Organizacao", "Atendimento", "Apoio interno"],
    },
    "modelo-sidebar-foto": {
      firstName: "Juliana",
      lastName: "Silva",
      title: "Administracao",
      city: "Curitiba",
      state: "PR",
      objective: "Atuacao em suporte administrativo, controle de rotina e atendimento interno.",
      firstJob: { role: "Assistente de Escritorio", employer: "Prime Office" },
      firstEducation: { course: "Administracao", institution: "Uninter" },
      skills: ["Escritorio", "Controle", "Organizacao", "Atendimento"],
    },
    "modelo-premium-sidebar": {
      firstName: "Ana Paula",
      lastName: "Montenegro",
      title: "Coordenadora Academica",
      city: "Recife",
      state: "PE",
      objective: "Experiencia em coordenacao academica, organizacao de rotina e atendimento institucional.",
      firstJob: { role: "Coordenadora Academica", employer: "Instituto Delta" },
      firstEducation: { course: "Pedagogia", institution: "UNICAP" },
      skills: ["Coordenacao", "Educacao", "Planejamento", "Comunicacao"],
    },
    "modelo-classico-duas-colunas": {
      firstName: "Lazaro",
      lastName: "Ribeiro",
      title: "Analista Financeiro",
      city: "Belo Horizonte",
      state: "MG",
      objective: "Atuacao em analise financeira, controle orcamentario e fechamento gerencial.",
      firstJob: { role: "Analista Financeiro", employer: "Lobbe Invest" },
      firstEducation: { course: "Ciencias Contabeis", institution: "Newton Paiva" },
      skills: ["Financeiro", "Fechamento", "Indicadores", "Budget"],
    },
    "curriculo-joao-roberto": {
      firstName: "Lilian",
      lastName: "Siqueira",
      title: "Especialista de Produto",
      city: "Porto Alegre",
      state: "RS",
      objective: "Atuacao em produto com foco em interface entre negocio, cliente e operacao.",
      firstJob: { role: "Especialista de Produto", employer: "Nexa Digital" },
      firstEducation: { course: "Publicidade e Propaganda", institution: "PUCRS" },
      skills: ["Produto", "Cliente", "Negocio", "Comunicacao"],
    },
    "minimalista-premios": {
      firstName: "Francisco",
      lastName: "Andrade",
      title: "Analista de Sistemas Senior",
      city: "Sao Paulo",
      state: "SP",
      objective: "Experiencia em sistemas, suporte tecnico e melhoria de fluxo entre areas de negocio.",
      firstJob: { role: "Analista de Sistemas Senior", employer: "Inova Tech" },
      firstEducation: { course: "Ciencia da Computacao", institution: "FIAP" },
      skills: ["Sistemas", "Suporte", "Analise", "Documentacao"],
    },
    "criativo-cards": {
      firstName: "Camila",
      lastName: "Freitas",
      title: "Planejamento de Conteudo",
      city: "Sao Paulo",
      state: "SP",
      objective: "Criacao e planejamento de conteudo com foco em calendario editorial e narrativa de marca.",
      firstJob: { role: "Planner de Conteudo", employer: "Studio Nexo" },
      firstEducation: { course: "Publicidade", institution: "ESPM" },
      skills: ["Conteudo", "Narrativa", "Planejamento", "Social"],
    },
    "creative-compact": {
      firstName: "Helena",
      lastName: "Pereira",
      title: "Designer de Conteudo",
      city: "Rio de Janeiro",
      state: "RJ",
      objective: "Experiencia em conteudo visual, criacao de campanhas e apoio a identidade de marca.",
      firstJob: { role: "Designer de Conteudo", employer: "Atelie Modo" },
      firstEducation: { course: "Design Grafico", institution: "Senai Cetiqt" },
      skills: ["Design", "Conteudo", "Campanhas", "Branding"],
    },
    "modelo-editorial": {
      firstName: "Sandro",
      lastName: "Oliveira",
      title: "Engenheiro Mecanico",
      city: "Curitiba",
      state: "PR",
      objective: "Atuacao em engenharia aplicada, processos produtivos e documentacao tecnica.",
      firstJob: { role: "Engenheiro Mecanico", employer: "Mecatron Sul" },
      firstEducation: { course: "Engenharia Mecanica", institution: "UTFPR" },
      skills: ["Engenharia", "Processos", "Qualidade", "Tecnica"],
    },
  };

  const variant = variants[templateId];
  if (!variant) {
    return resume;
  }

  return {
    ...resume,
    header: {
      ...resume.header,
      ...Object.fromEntries(
        Object.entries(variant).filter(([key]) =>
          [
            "firstName",
            "lastName",
            "title",
            "city",
            "state",
            "address",
            "zipCode",
            "phone",
            "email",
            "linkedin",
          ].includes(key),
        ),
      ),
    },
    history: variant.firstJob
      ? resume.history.map((job, index) => (index === 0 ? { ...job, ...variant.firstJob } : job))
      : resume.history,
    education: variant.firstEducation
      ? resume.education.map((item, index) => (index === 0 ? { ...item, ...variant.firstEducation } : item))
      : resume.education,
    skills: variant.skills
      ? variant.skills.map((name, index) => ({ id: `skill-${index + 1}`, name }))
      : resume.skills,
    objective: variant.objective ? { text: variant.objective } : resume.objective,
  };
}

export function getStepIndex(stepId: ResumeStepId) {
  return STEP_ORDER.findIndex((step) => step.id === stepId);
}
