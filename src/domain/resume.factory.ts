import type { Resume, ResumeStepId, StepMeta } from "./resume.types";
import type { TemplateId } from "../types/resume";

export const STEP_ORDER: StepMeta[] = [
  {
    id: "CONTACT",
    title: "Cabecalho",
    shortTitle: "Dados de contato",
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
    title: "Secoes Extras",
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
      address: "Rua Padre Anchieta",
      city: "Piraquara",
      state: "PR",
      zipCode: "83301160",
      phone: "41987097886",
      email: "joaorobertoluz1960@gmail.com",
      linkedin: "linkedin.com/in/joaoroberto",
      title: "Supervisor Operacional",
      optionalFields: {},
    },
    history: [
      {
        id: "job-1",
        role: "Motorista lubrificador / Mecanico",
        employer: "Sales e Siqueira",
        city: "Rio de Janeiro",
        state: "RJ",
        startDate: { month: "Janeiro", year: "2021" },
        current: true,
        description: "Movimentacao operacional, rotas, manutencao basica, seguranca e cumprimento de procedimentos.",
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
      },
    ],
    skills: [
      { id: "skill-1", name: "Responsabilidade no transito" },
      { id: "skill-2", name: "Habilidade para dirigir com seguranca" },
      { id: "skill-3", name: "Conhecimento das rotas e vias da regiao" },
    ],
    objective: {
      text: "Busco uma oportunidade para aplicar minha experiencia operacional, foco em seguranca e disciplina de execucao.",
    },
    extras: {
      certifications: [
        {
          id: "cert-1",
          name: "Movimentacao Operacional de Produtos Perigosos",
          issuer: "SENAI",
          year: "2024",
        },
      ],
      languages: [{ id: "lang-1", name: "Portugues", level: "Fluente" }],
      customSections: [],
    },
  };
}

export function getStepIndex(stepId: ResumeStepId) {
  return STEP_ORDER.findIndex((step) => step.id === stepId);
}
