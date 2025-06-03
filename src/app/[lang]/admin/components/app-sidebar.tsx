"use client"

import { NavUser } from '@/app/[lang]/admin/components/nav-user';
import { sidebarData } from '@/app/[lang]/admin/data/sidebar-data';
import { NavGroup } from '@/app/[lang]/admin/components/nav-group';
import { TeamSwitcher } from '@/app/[lang]/admin/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavSecondary } from './nav-secondary';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible='icon' variant='floating'>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
        <NavSecondary items={sidebarData.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
