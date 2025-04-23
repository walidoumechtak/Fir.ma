"use client";

import { Frame, type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { axiosPrivate } from "@/api/axios";
import { useScenarioStore } from "@/hooks/useScenarioStore";

export function NavProjects() {
  const [projects, setProjects] = useState<
    { name: string; url: string; icon: LucideIcon }[]
  >([]);
  const store = useScenarioStore();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axiosPrivate.get("/projects/list/");
      const formattedProjects = response.data.map((project: any) => ({
        name: project.name,
        url: `/modules/ptx/project/${project.id}/`,
        icon: Frame,
      }));
      setProjects(formattedProjects);
    };
    fetchProjects();
  }, [store.projectName]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Latest projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon className="text-primary" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <DotsHorizontalIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent */}
              {/*   className="w-48 rounded-lg" */}
              {/*   side={isMobile ? "bottom" : "right"} */}
              {/*   align={isMobile ? "end" : "start"} */}
              {/* > */}
              {/*   <DropdownMenuItem> */}
              {/*     <Folder className="text-muted-foreground" /> */}
              {/*     <span>View Project</span> */}
              {/*   </DropdownMenuItem> */}
              {/*   <DropdownMenuItem> */}
              {/*     <Forward className="text-muted-foreground" /> */}
              {/*     <span>Share Project</span> */}
              {/*   </DropdownMenuItem> */}
              {/*   <DropdownMenuSeparator /> */}
              {/*   <DropdownMenuItem> */}
              {/*     <Trash2 className="text-muted-foreground" /> */}
              {/*     <span>Delete Project</span> */}
              {/*   </DropdownMenuItem> */}
              {/* </DropdownMenuContent> */}
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <DotsHorizontalIcon className="text-sidebar-foreground/70 " />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
