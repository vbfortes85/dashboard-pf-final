import { TrendingUp, TrendingDown, Minus, AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── KPI Card ─────────────────────────────────────────────────
interface KpiCardProps {
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  fonte?: string;
  icone?: React.ReactNode;
  tendencia?: "up" | "down" | "neutral";
  tendenciaValor?: string;
  cor?: "blue" | "green" | "amber" | "red" | "purple";
  className?: string;
}

const COR_MAP = {
  blue:   { bg: "bg-blue-50",   icon: "bg-blue-100 text-blue-600",   badge: "text-blue-700 bg-blue-100" },
  green:  { bg: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-600", badge: "text-emerald-700 bg-emerald-100" },
  amber:  { bg: "bg-amber-50",  icon: "bg-amber-100 text-amber-600",  badge: "text-amber-700 bg-amber-100" },
  red:    { bg: "bg-red-50",    icon: "bg-red-100 text-red-600",      badge: "text-red-700 bg-red-100" },
  purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", badge: "text-purple-700 bg-purple-100" },
};

export function KpiCard({ titulo, valor, subtitulo, fonte, icone, tendencia, tendenciaValor, cor = "blue", className }: KpiCardProps) {
  const cores = COR_MAP[cor];
  return (
    <div className={cn("kpi-card bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate" style={{ fontFamily: "Inter, sans-serif" }}>
            {titulo}
          </p>
        </div>
        {icone && (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", cores.icon)}>
            {icone}
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900 leading-none" style={{ fontFamily: "Sora, sans-serif" }}>
          {valor}
        </p>
        {subtitulo && (
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{subtitulo}</p>
        )}
      </div>

      {tendencia && tendenciaValor && (
        <div className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit", cores.badge)}>
          {tendencia === "up" && <TrendingUp size={11} />}
          {tendencia === "down" && <TrendingDown size={11} />}
          {tendencia === "neutral" && <Minus size={11} />}
          {tendenciaValor}
        </div>
      )}

      {fonte && (
        <p className="text-[10px] text-gray-400 leading-tight border-t border-gray-50 pt-2" style={{ fontFamily: "Inter, sans-serif" }}>
          Fonte: {fonte}
        </p>
      )}
    </div>
  );
}

// ─── Fonte Badge ──────────────────────────────────────────────
export function FonteBadge({ fonte, className }: { fonte: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-[11px] text-gray-400 mt-1", className)} style={{ fontFamily: "Inter, sans-serif" }}>
      <Info size={11} className="shrink-0 text-gray-300" />
      <span>Fonte: {fonte}</span>
    </div>
  );
}

// ─── Alert Card ───────────────────────────────────────────────
interface AlertCardProps {
  tipo: "critico" | "atencao" | "ok";
  titulo: string;
  descricao: string;
  valor?: string;
  meta?: string;
}

export function AlertCard({ tipo, titulo, descricao, valor, meta }: AlertCardProps) {
  const config = {
    critico: { bg: "bg-red-50 border-red-200", icon: <AlertCircle size={16} className="text-red-500 alert-critical" />, badge: "bg-red-100 text-red-700", label: "Crítico" },
    atencao: { bg: "bg-amber-50 border-amber-200", icon: <AlertTriangle size={16} className="text-amber-500" />, badge: "bg-amber-100 text-amber-700", label: "Atenção" },
    ok:      { bg: "bg-emerald-50 border-emerald-200", icon: <CheckCircle size={16} className="text-emerald-500" />, badge: "bg-emerald-100 text-emerald-700", label: "OK" },
  }[tipo];

  return (
    <div className={cn("rounded-lg p-3.5 border flex gap-3", config.bg)}>
      <div className="shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <p className="text-sm font-semibold text-gray-800 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>{titulo}</p>
          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0", config.badge)}>
            {config.label}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{descricao}</p>
        {valor && meta && (
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs font-mono text-gray-700">Atual: <strong>{valor}</strong></span>
            <span className="text-xs font-mono text-gray-500">Meta: {meta}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────
export function SectionHeader({ titulo, subtitulo, fonte }: { titulo: string; subtitulo?: string; fonte?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>{titulo}</h2>
      {subtitulo && <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{subtitulo}</p>}
      {fonte && <FonteBadge fonte={fonte} />}
    </div>
  );
}

// ─── Execução Progress Bar ────────────────────────────────────
export function ExecucaoBar({ valor, meta = 60 }: { valor: number; meta?: number }) {
  const cor = valor >= 80 ? "bg-emerald-500" : valor >= meta ? "bg-amber-400" : "bg-red-500";
  const label = valor >= 80 ? "ok" : valor >= meta ? "atencao" : "critico";
  const labelCor = valor >= 80 ? "text-emerald-700 bg-emerald-100" : valor >= meta ? "text-amber-700 bg-amber-100" : "text-red-700 bg-red-100";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", cor)} style={{ width: `${Math.min(valor, 100)}%` }} />
      </div>
      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0", labelCor)}>
        {valor.toFixed(1)}%
      </span>
    </div>
  );
}
