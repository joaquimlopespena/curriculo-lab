import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
