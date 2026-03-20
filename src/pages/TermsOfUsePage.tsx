import { Link } from "react-router-dom";

const LAST_UPDATED = "19 de marco de 2025";

export function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
        Curriculo Lab
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Termos de uso
      </h1>
      <p className="mt-2 text-sm text-slate-500">Ultima atualizacao: {LAST_UPDATED}</p>

      <div className="legal-doc max-w-none">
        <p>
          Ao acessar e usar o <strong>Curriculo Lab</strong>, voce concorda com estes Termos de uso.
          Se nao concordar, interrompa o uso do servico.
        </p>

        <h2>1. Descricao do servico</h2>
        <p>
          O Curriculo Lab oferece ferramentas para montar curriculos com base em modelos, com
          visualizacao e exportacao (por exemplo, impressao/PDF) conforme disponivel na aplicacao.
          O servico e fornecido no estado em que se encontra (“as is”).
        </p>

        <h2>2. Uso permitido</h2>
        <p>Voce compromete-se a:</p>
        <ul>
          <li>Fornecer informacoes verdadeiras quando optar por inclui-las no curriculo;</li>
          <li>Nao usar o servico de forma ilegal, ofensiva ou que viole direitos de terceiros;</li>
          <li>Nao tentar comprometer a seguranca, desempenho ou disponibilidade da aplicacao.</li>
        </ul>

        <h2>3. Conteudo de sua responsabilidade</h2>
        <p>
          Voce e o unico responsavel pelo texto, dados e arquivos que inserir e pelas consequencias
          do uso do material gerado (envio a empregadores, redes sociais etc.). O Curriculo Lab nao
          valida a veracidade do conteudo.
        </p>

        <h2>4. Propriedade intelectual</h2>
        <p>
          Layouts, codigo, marca e elementos visuais do Curriculo Lab pertencem aos seus titulares.
          O conteudo que voce redigir permanece seu; a voce cabe garantir que possui direito de usar
          textos, imagens e demais materiais incluidos no curriculo.
        </p>

        <h2>5. Privacidade</h2>
        <p>
          O tratamento de dados pessoais segue a <Link to="/privacidade">Politica de Privacidade</Link>
          .
        </p>

        <h2>6. Limitacao de responsabilidade</h2>
        <p>
          Na maxima extensao permitida pela lei aplicavel, o Curriculo Lab e seus responsaveis nao
          serao responsaveis por danos indiretos, lucros cessantes ou perdas de dados decorrentes do
          uso ou da impossibilidade de uso do servico.
        </p>

        <h2>7. Alteracoes</h2>
        <p>
          Estes termos podem ser atualizados. A data no topo indica a ultima revisao. O uso
          continuado apos alteracoes pode significar aceitacao das novas condicoes.
        </p>

        <h2>8. Lei e foro</h2>
        <p>
          Aplica-se a legislacao da Republica Federativa do Brasil. Fica eleito o foro do domicilio
          do usuario, conforme o Codigo de Defesa do Consumidor quando aplicavel, salvo disposicao
          legal em contrario.
        </p>
      </div>

      <p className="mt-12">
        <Link
          to="/"
          className="text-sm font-semibold text-slate-900 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-600"
        >
          Voltar ao inicio
        </Link>
      </p>
    </div>
  );
}
