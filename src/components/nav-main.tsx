"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { LayoutDashboard, PencilLine, SquareTerminal } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Modules",
    url: "#",
    icon: PencilLine,
    items: [
      {
        title: "Power to X",
        url: "#",
        items: [
          {
            title: "Power to Amonia",
            url: "/modules/ptx",
          },
        ],
        // url: "/modules/ptx",
      },
      {
        title: "Wind Farm",
        url: "/modules/wind-farm",
      },
      {
        title: "Electrolyser",
        url: "#",
        icon: SquareTerminal,
        items: [
          {
            title: "Manage Models",
            url: "/electrolyser/manage-modules",
          },
          {
            title: "Advanced Analysis",
            url: "#",
          },
        ],
      },
    ],
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Collapsible
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <div>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {!item?.items ? (
                      <>
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon className="text-primary w-4 h-4" />
                          )}
                        </Link>
                        <Link href={item.url} className="w-full">
                          <span>{item.title}</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        {item.icon && (
                          <item.icon className="text-primary w-4 h-4" />
                        )}
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        {!subItem.items ? (
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        ) : (
                          <Collapsible asChild>
                            <div>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton asChild>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{subItem.title}</span>
                                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                  </div>
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {subItem.items.map((nestedItem) => (
                                    <SidebarMenuSubItem key={nestedItem.title}>
                                      <SidebarMenuSubButton asChild>
                                        <Link href={nestedItem.url}>
                                          <span>{nestedItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </div>
                          </Collapsible>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
