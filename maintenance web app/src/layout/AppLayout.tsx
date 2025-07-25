import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
<<<<<<< HEAD
        <div className="p-4 mx-auto max-w-(--breakpoint-3xl) md:p-6">
          <Outlet />
=======
        <div className="flex flex-col flex-1 p-4 mx-auto w-full max-w-(--breakpoint-3xl) md:p-4">
          <div className="flex-1">
            <Outlet />
          </div>
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
