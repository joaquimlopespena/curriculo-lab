import { HTMLAttributes } from "react";

interface AdBannerProps extends HTMLAttributes<HTMLDivElement> {
  format?: "horizontal" | "vertical" | "square";
}

/**
 * Componente de Placeholder para Anúncios (ex: Google AdSense).
 * Quando a conta do AdSense for aprovada, substitua o conteúdo deste componente
 * pelo script e a tag <ins> fornecidos pelo Google.
 */
export function AdBanner({ format = "horizontal", className = "", ...props }: AdBannerProps) {
  // Define dimensões baseadas no formato para o placeholder
  const formatClasses = {
    horizontal: "w-full h-[90px] md:h-[120px]", // Formato Leaderboard
    vertical: "w-[160px] md:w-[300px] h-[600px]", // Formato Skyscraper
    square: "w-[250px] h-[250px] md:w-[300px] md:h-[250px]", // Formato Box
  };

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 ${formatClasses[format]} ${className}`}
      {...props}
    >
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-slate-400">
          Publicidade
        </span>
        <span className="mt-1 text-xs text-slate-300">
          Espaço reservado para anúncio
        </span>
      </div>
    </div>
  );
}
