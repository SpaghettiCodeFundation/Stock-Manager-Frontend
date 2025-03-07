import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="flex items-center justify-between px-4 pt-2">
          <SidebarTrigger className="bg-transparent hover:bg-transparent"/>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
