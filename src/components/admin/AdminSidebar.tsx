
import { NavLink, useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    User,
    Database,
    Settings
} from "lucide-react";

const AdminSidebar = () => {
    const { state } = useSidebar();
    const location = useLocation();
    const currentPath = location.pathname;
    const collapsed = state === "collapsed";

    const isActive = (path: string) =>
        currentPath === "/admin" + path ||
        (path === "" && currentPath === "/admin");

    const getNavClasses = ({ isActive }: { isActive: boolean }) =>
        isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50";

    return (
        <Sidebar
            variant="sidebar"
            collapsible="icon"
            className={`${collapsed ? "w-14" : "w-64"} mt-[100px]`}
        >
            <SidebarTrigger className="m-2 self-end" />

            <SidebarContent>
                <div className="p-4">
                    <h1 className={`font-bold text-lg ${collapsed ? "hidden" : "block"}`}>
                        Admin Panel
                    </h1>
                </div>

                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {[
                                { path: "", icon: LayoutDashboard, label: "Dashboard" },
                                { path: "/products", icon: ShoppingBag, label: "Products" },
                                { path: "/sellers", icon: Users, label: "Sellers" },
                                { path: "/buyers", icon: User, label: "Buyers" },
                                { path: "/transactions", icon: Database, label: "Transactions" },
                            ].map(item => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.path)}
                                        tooltip={collapsed ? item.label : undefined}
                                    >
                                        <NavLink
                                            to={`/admin${item.path}`}
                                            className={getNavClasses}
                                            end
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {!collapsed && <span>{item.label}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AdminSidebar;