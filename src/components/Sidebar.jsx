import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: "home", label: "Home" },
    { path: "#", icon: "analytics", label: "Stats" },
    { path: "#", icon: "format_list_bulleted", label: "Habits" },
    { path: "/profile", icon: "person", label: "Profile" }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-surface-container z-40">
      <div className="p-6 pt-10">
        <h1 className="font-headline-lg text-headline-md font-bold text-primary mb-12">Daily Mindset</h1>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "#" && location.pathname.startsWith(item.path) && item.path !== "/dashboard");
            const isDashboardActive = item.path === "/dashboard" && location.pathname === "/dashboard";
            const trulyActive = item.path === "/dashboard" ? isDashboardActive : isActive;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  trulyActive 
                    ? "bg-primary-container text-on-primary-container font-bold" 
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: trulyActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* User summary at bottom of sidebar could go here if needed, but we have profile page */}
    </aside>
  );
}
