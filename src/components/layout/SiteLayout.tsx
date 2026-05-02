import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { AdBanner } from "../ads/AdBanner";

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      
      {/* Banner de Anúncio Global acima do Footer */}
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6">
        <AdBanner format="horizontal" />
      </div>

      <SiteFooter />
    </div>
  );
}
