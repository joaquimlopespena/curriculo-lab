import { Link } from "react-router-dom";

const LAST_UPDATED = "19 de marco de 2025";

export function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
        Curriculo Lab
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Politica de Privacidade
      </h1>
      <p className="mt-2 text-sm text-slate-500">Ultima atualizacao: {LAST_UPDATED}</p>

      <div className="legal-doc max-w-none">
        <p>
          Esta Politica de Privacidade descreve como o <strong>Curriculo Lab</strong> trata dados
          pessoais no contexto da Lei Geral de Protecao de Dados (Lei nº 13.709/2018 —{" "}
          <strong>LGPD</strong>), em linha com o funcionamento atual da aplicacao (uso majoritariamente
          no seu navegador).
        </p>

        <h2>1. Quem e o controlador</h2>
        <p>
          O controlador dos dados pessoais tratados em relacao ao servico e a pessoa fisica ou
          juridica responsavel pela operacao do site/aplicacao Curriculo Lab. Para exercicio de
          direitos ou duvidas sobre esta politica, utilize o canal indicado na secao{" "}
          <strong>Contato e encarregado</strong> (abaixo), quando disponivel.
        </p>

        <h2>2. Quais dados podem ser tratados</h2>
        <p>Dependendo de como voce utiliza o Curriculo Lab, podem ser inseridos ou processados:</p>
        <ul>
          <li>
            <strong>Dados de identificacao e contato</strong> que voce incluir no curriculo (por
            exemplo: nome, e-mail, telefone, cidade, LinkedIn).
          </li>
          <li>
            <strong>Dados profissionais e academicos</strong> (experiencias, formacao, habilidades,
            objetivo, idiomas, certificacoes e demais campos do editor).
          </li>
          <li>
            <strong>Dados de localizacao parcial</strong> quando voce usa a consulta de CEP: o
            numero do CEP informado e enviado a um servico externo para preenchimento de endereco
            (veja secao 5).
          </li>
        </ul>
        <p>
          O Curriculo Lab nao exige cadastro com senha para montar o curriculo na versao descrita
          nesta politica; os dados que voce digita permanecem, em regra, no seu dispositivo durante
          a sessao de uso.
        </p>

        <h2>3. Finalidades do tratamento</h2>
        <ul>
          <li>Permitir a montagem, visualizacao e exportacao do curriculo (incluindo impressao/PDF).</li>
          <li>Exibir modelos e conteudo editorial escolhido por voce.</li>
          <li>Cumprir obrigacoes legais e responder a solicitacoes legitimas.</li>
        </ul>

        <h2>4. Bases legais (LGPD)</h2>
        <p>
          O tratamento fundamenta-se, conforme o caso, na <strong>execucao de procedimentos
          preliminares ou de contrato a pedido do titular</strong> (uso do editor para elaborar seu
          curriculo), no <strong>legitimo interesse</strong> (seguranca e melhoria tecnica do
          servico, quando aplicavel) e no <strong>cumprimento de obrigacao legal</strong>, quando
          houver.
        </p>

        <h2>5. Compartilhamento e encarregados</h2>
        <p>
          <strong>Consulta de CEP (BrasilAPI):</strong> ao solicitar a busca por CEP, o aplicativo
          pode enviar o CEP digitado para a API publica BrasilAPI (
          <span className="break-all">brasilapi.com.br</span>) apenas para retornar dados de
          logradouro. Esse provedor trata os dados conforme a propria politica de privacidade e
          termos. Recomendamos nao usar a funcao se nao concordar com esse envio.
        </p>
        <p>
          Fora situacoes como a acima, nao vendemos seus dados e nao compartilhamos o conteudo do
          seu curriculo com terceiros por padrao nesta versao do servico.
        </p>

        <h2>6. Armazenamento e prazo</h2>
        <p>
          Na medida em que o processamento ocorre no navegador, os dados podem existir apenas na
          memoria do dispositivo durante o uso. Ao fechar a aba ou em determinadas navegacoes, o
          conteudo pode ser perdido se nao houver recurso de salvamento local implementado. Nao
          ha, nesta arquitetura, promessa de arquivo permanente em servidores do Curriculo Lab,
          salvo se no futuro forem ofertados login ou nuvem — caso em que esta politica sera
          atualizada.
        </p>

        <h2>7. Seguranca</h2>
        <p>
          Adotamos boas praticas razoaveis no desenvolvimento da aplicacao. Nenhum sistema e 100%
          seguro; evite inserir dados sensiveis desnecessarios e mantenha seu navegador atualizado.
        </p>

        <h2>8. Seus direitos como titular (art. 18 da LGPD)</h2>
        <p>Voce pode, entre outros, conforme a lei e regulamentacao:</p>
        <ul>
          <li>Confirmar a existencia de tratamento e acessar dados;</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>Solicitar anonimizacao, bloqueio ou eliminacao de dados desnecessarios;</li>
          <li>Revogar consentimento, quando a base for o consentimento;</li>
          <li>Obter informacoes sobre compartilhamentos;</li>
          <li>Peticao em relacao a decisoes automatizadas, quando couber.</li>
        </ul>
        <p>
          Para exercer direitos, utilize o canal de contato abaixo. Pode ser necessario comprovar sua
          identidade.
        </p>

        <h2>9. Cookies e tecnologias similares</h2>
        <p>
          Se no futuro forem utilizados cookies ou ferramentas de analise, esta politica sera
          atualizada e, quando exigido, sera solicitado consentimento ou oferecido mecanismo de
          gestao.
        </p>

        <h2>10. Alteracoes desta politica</h2>
        <p>
          Podemos atualizar este texto para refletir mudancas no servico ou na legislacao. A data
          no topo indica a ultima revisao relevante.
        </p>

        <h2>11. Contato e encarregado (DPO)</h2>
        <p>
          Para solicitacoes relacionadas a dados pessoais, inclua na mensagem: nome, descricao do
          pedido e, se possivel, dados de contato para resposta.
        </p>
        <p>
          <strong>E-mail (defina o canal oficial do projeto):</strong>{" "}
          <a href="mailto:privacidade@exemplo.com">privacidade@exemplo.com</a>
        </p>
        <p className="text-sm text-slate-500">
          Substitua o endereco acima pelo e-mail real do controlador ou do encarregado de dados
          antes de publicar em producao.
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
