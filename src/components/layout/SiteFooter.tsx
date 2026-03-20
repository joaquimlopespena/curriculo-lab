import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/90 py-8 text-sm text-slate-600 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-medium text-slate-700">Curriculo Lab</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Informacoes legais">
          <Link
            to="/privacidade"
            className="text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-500"
          >
            Politica de Privacidade
          </Link>
          <Link
            to="/termos"
            className="text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-500"
          >
            Termos de uso
          </Link>
        </nav>
      </div>
    </footer>
  );
}
