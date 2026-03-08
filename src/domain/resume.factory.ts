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

export function createInitialResume(templateId: TemplateId): Resume {
  return {
    templateId,
    header: {
      firstName: "Joao Roberto",
      lastName: "Ferreira da Luz",
      photoUrl: DEFAULT_PROFILE_PHOTO,
      address: "Rua Padre Anchieta, 245",
      city: "Piraquara",
      state: "PR",
      zipCode: "83301160",
      phone: "(41) 98709-7886",
      email: "joaorobertoluz1960@gmail.com",
      linkedin: "linkedin.com/in/joaoroberto",
      title: "Supervisor Operacional e Logistica",
      optionalFields: {
        birthDate: "14/09/1989",
        nationality: "Brasileiro",
        driverLicense: "CNH AD",
      },
    },
    history: [
      {
        id: "job-1",
        role: "Supervisor Operacional",
        employer: "Sales e Siqueira Transportes",
        city: "Curitiba",
        state: "PR",
        startDate: { month: "Janeiro", year: "2021" },
        current: true,
        description:
          "Coordenacao de equipe operacional com 18 colaboradores, distribuicao de rotas, acompanhamento de indicadores de frota, controle de abastecimento e interface direta com manutencao e expedicao.",
      },
      {
        id: "job-2",
        role: "Motorista Lubrificador / Mecanico",
        employer: "Rodocampo Servicos Integrados",
        city: "Sao Jose dos Pinhais",
        state: "PR",
        startDate: { month: "Marco", year: "2017" },
        endDate: { month: "Dezembro", year: "2020" },
        current: false,
        description:
          "Atuacao em transporte e apoio tecnico de equipamentos, inspeções preventivas, pequenos reparos mecanicos, cumprimento de checklists de seguranca e suporte em operacoes externas.",
      },
      {
        id: "job-3",
        role: "Auxiliar de Patio e Logistica",
        employer: "Parana Cargas e Operacoes",
        city: "Pinhais",
        state: "PR",
        startDate: { month: "Fevereiro", year: "2013" },
        endDate: { month: "Fevereiro", year: "2017" },
        current: false,
        description:
          "Controle de entrada e saida de veiculos, organizacao de patio, conferencia de documentos, apoio em carga e descarga e registro de ocorrencias operacionais.",
      },
    ],
    education: [
      {
        id: "edu-1",
        course: "Tecnico em Logistica",
        institution: "SENAI",
        city: "Curitiba",
        state: "PR",
        conclusionYear: "2018",
        current: false,
        details: "Formacao com enfase em armazenagem, distribuicao, roteirizacao e gestao de processos operacionais.",
      },
      {
        id: "edu-2",
        course: "Tecnico em Mecanica Basica Industrial",
        institution: "Escola Tecnica Estadual do Parana",
        city: "Curitiba",
        state: "PR",
        conclusionYear: "2012",
        current: false,
        details: "Base tecnica para manutencao preventiva, leitura de componentes e apoio operacional de equipamentos.",
      },
    ],
    skills: [
      { id: "skill-1", name: "Responsabilidade no transito" },
      { id: "skill-2", name: "Habilidade para dirigir com seguranca" },
      { id: "skill-3", name: "Conhecimento das rotas e vias da regiao" },
      { id: "skill-4", name: "Coordenacao de equipes operacionais" },
      { id: "skill-5", name: "Controle de frota e checklists" },
      { id: "skill-6", name: "Manutencao preventiva basica" },
      { id: "skill-7", name: "Cumprimento de normas de seguranca" },
      { id: "skill-8", name: "Organizacao de patio e expedicao" },
    ],
    objective: {
      text: "Profissional com mais de 10 anos de experiencia em operacoes, transporte e apoio logistico. Busco contribuir com disciplina de execucao, seguranca, coordenacao de equipe e melhoria de rotinas operacionais em ambientes de alta demanda.",
    },
    extras: {
      certifications: [
        {
          id: "cert-1",
          name: "Movimentacao Operacional de Produtos Perigosos",
          issuer: "SENAI",
          year: "2024",
        },
        {
          id: "cert-2",
          name: "Capacitacao em Gestao de Frota e Roteirizacao",
          issuer: "SEST SENAT",
          year: "2023",
        },
        {
          id: "cert-3",
          name: "NR-11 Transporte, Movimentacao e Armazenagem",
          issuer: "Instituto Tecnologico do Parana",
          year: "2022",
        },
      ],
      languages: [
        { id: "lang-1", name: "Portugues", level: "Fluente" },
        { id: "lang-2", name: "Espanhol", level: "Basico operacional" },
      ],
      customSections: [
        "Disponibilidade para viagens e operacoes externas.",
        "Vivencia com equipes multidisciplinares e controle de ocorrencias.",
        "Atendimento a auditorias internas de seguranca e processos.",
      ],
    },
  };
}

export function getStepIndex(stepId: ResumeStepId) {
  return STEP_ORDER.findIndex((step) => step.id === stepId);
}
