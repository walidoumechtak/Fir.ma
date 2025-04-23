import type * as React from "react";
import Image from "next/image";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// import { HelpCircle } from "lucide-react"; // Import the Help icon

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent mt-2 data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square min-w-8 bg-muted/50 max-w-16 items-center justify-center rounded-lg ">
                <Image
                  src="/logo.png"
                  width={25}
                  height={25}
                  alt="Vyltec Logo"
                />
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="truncate font-semibold">Vyltec</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      {/* <SidebarFooter> */}
      {/*   <div className="flex items-center space-x-2 p-4"> */}
      {/*     <HelpCircle /> */}
      {/*     <span>Help</span> */}
      {/*   </div> */}
      {/* </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
