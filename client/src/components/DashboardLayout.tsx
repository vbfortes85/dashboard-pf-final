import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, FileText, BarChart3, Users,
  RefreshCw, Wifi, WifiOff, Menu, X, Bell, ChevronRight
} from "lucide-react";
import { useBrasiliaTime, useConnectionStatus } from "@/hooks/useRealtimeStatus";
import { ALERTAS } from "@/lib/dadosMunicipais";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/",            label: "Visão Geral",       icon: LayoutDashboard, color: "text-blue-400" },
  { href: "/contratos",   label: "Contratos",          icon: FileText,        color: "text-emerald-400" },
  { href: "/indicadores", label: "Indicadores",        icon: BarChart3,       color: "text-amber-400" },
  { href: "/caged",       label: "CAGED — Emprego",    icon: Users,           color: "text-purple-400" },
];

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031383179/LgxFLVRbbuGeSTAaqmEysm/logo-pf-dashboard-Vxbm4kyQzyshrVEGravAFL.webp";

interface Props { children: React.ReactNode }

export default function DashboardLayout({ children }: Props) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { timestamp } = useBrasiliaTime();
  const { isOnline, lastSyncFormatted, isSyncing, manualSync } = useConnectionStatus();
  const alertasCriticos = ALERTAS.filter(a => a.tipo === "critico").length;

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={cn(
        "flex flex-col h-full",
        mobile ? "w-72" : "w-64 hidden lg:flex"
      )}
      style={{ background: "oklch(0.17 0.04 250)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "oklch(0.28 0.05 250)" }}>
        <img src={LOGO_URL} alt="Passo Fundo" className="w-10 h-10 rounded-lg object-contain" />
        <div>
          <p className="text-white font-display font-bold text-sm leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
            Passo Fundo
          </p>
          <p className="text-xs leading-tight" style={{ color: "oklch(0.65 0.06 250)", fontFamily: "Inter, sans-serif" }}>
            Painel de Gestão
          </p>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, color }) => {
          const active = location === href;
          return (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer group",
                active
                  ? "sidebar-item-active text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}>
                <Icon size={18} className={cn(active ? "text-blue-300" : color, "shrink-0")} />
                <span className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{label}</span>
                {active && <ChevronRight size={14} className="ml-auto text-blue-300" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Alertas */}
      {alertasCriticos > 0 && (
        <div className="mx-3 mb-3 p-3 rounded-lg" style={{ background: "oklch(0.25 0.08 25 / 0.3)", border: "1px solid oklch(0.5 0.15 25 / 0.4)" }}>
          <div className="flex items-center gap-2">
            <Bell size={14} className="text-red-400 alert-critical shrink-0" />
            <span className="text-xs text-red-300 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
              {alertasCriticos} alerta{alertasCriticos > 1 ? "s" : ""} crítico{alertasCriticos > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="px-4 py-4 border-t text-xs space-y-1" style={{ borderColor: "oklch(0.28 0.05 250)", fontFamily: "JetBrains Mono, monospace" }}>
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full shrink-0", isOnline ? "bg-emerald-400" : "bg-red-400")}>
            {isOnline && <span className="block w-2 h-2 rounded-full bg-emerald-400 status-ping" />}
          </span>
          <span style={{ color: "oklch(0.6 0.04 250)" }}>
            {isOnline ? "Conectado" : "Sem conexão"}
          </span>
        </div>
        <p style={{ color: "oklch(0.5 0.03 250)" }} className="truncate">
          {timestamp.split(" ")[0]} {timestamp.split(" ")[1]}
        </p>
        <p style={{ color: "oklch(0.45 0.03 250)" }}>Horário de Brasília</p>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "oklch(0.975 0.003 240)" }}>
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="shrink-0 bg-white border-b px-4 lg:px-6 py-3 flex items-center gap-3" style={{ borderColor: "oklch(0.9 0.005 240)" }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
          >
            <Menu size={20} />
          </button>

          {/* Page title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-gray-800 truncate" style={{ fontFamily: "Sora, sans-serif" }}>
              {NAV_ITEMS.find(n => n.href === location)?.label ?? "Dashboard"}
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Atualizado: {timestamp} (Brasília)
            </p>
          </div>

          {/* Status + Sync */}
          <div className="flex items-center gap-2 shrink-0">
            <div className={cn(
              "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
              isOnline
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            )} style={{ fontFamily: "Inter, sans-serif" }}>
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isOnline ? "Online" : "Offline"}
            </div>

            <button
              onClick={manualSync}
              disabled={isSyncing}
              title={`Última sincronização: ${lastSyncFormatted}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-60"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} />
              <span className="hidden sm:inline">{isSyncing ? "Atualizando..." : "Atualizar"}</span>
            </button>

            {alertasCriticos > 0 && (
              <div className="relative">
                <Bell size={18} className="text-red-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {alertasCriticos}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="shrink-0 bg-white border-t px-4 lg:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400" style={{ borderColor: "oklch(0.9 0.005 240)", fontFamily: "Inter, sans-serif" }}>
          <span>© 2025 Prefeitura Municipal de Passo Fundo/RS</span>
          <span className="hidden sm:block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Última sincronização: {lastSyncFormatted} (Horário de Brasília)
          </span>
        </footer>
      </div>
    </div>
  );
}
