import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/dashboard", icon: "home", label: "Home" },
  { path: "/stats", icon: "analytics", label: "Stats" },
  { path: "/habits", icon: "format_list_bulleted", label: "Habits" },
  { path: "/profile", icon: "person", label: "Profile" },
];

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-50 md:hidden">
      {/* Capsule background */}
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl border border-surface-container shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] rounded-full flex justify-around items-center py-3 px-4 relative">
        {navItems.map((item) => {
          const isActive = path === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center relative"
              style={{ flex: 1 }}
            >
              {/* Floating circle + icon (active state) */}
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out
                  ${isActive
                    ? "bg-primary shadow-[0_4px_16px_0_rgba(0,0,0,0.18)] w-12 h-12 -translate-y-5"
                    : "w-8 h-8 translate-y-0"
                  }`}
              >
                <span
                  className="material-symbols-outlined leading-none"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    fontSize: "22px",
                    color: isActive ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
                    opacity: isActive ? 1 : 0.6,
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </span>
              </div>

              {/* Label */}
              <span
                className={`font-label-sm text-label-sm transition-all duration-300 leading-none
                  ${isActive
                    ? "text-primary font-bold -translate-y-2"
                    : "text-on-surface-variant/60 translate-y-0"
                  }`}
                style={{ fontSize: "10px", marginTop: isActive ? "2px" : "4px" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
