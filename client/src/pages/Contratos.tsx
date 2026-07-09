import DashboardLayout from "@/components/DashboardLayout";
import { KpiCard, AlertCard, SectionHeader, ExecucaoBar, FonteBadge } from "@/components/DashboardWidgets";
import { CONTRATOS, RESUMO_CONTRATOS, CATEGORIAS_CONTRATOS, ALERTAS } from "@/lib/dadosMunicipais";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { Building2, TrendingUp, DollarSign, AlertCircle, Search } from "lucide-react";
import { useState } from "react";

const STATUS_CONFIG = {
  ok:      { label: "Regular",  className: "bg-emerald-100 text-emerald-700" },
  atencao: { label: "Atenção",  className: "bg-amber-100 text-amber-700" },
  critico: { label: "Crítico",  className: "bg-red-100 text-red-700" },
};

const BAR_COLORS = ["#1B4F8A","#2563EB","#2E7D32","#16A34A","#F59E0B","#D97706","#7C3AED"];

export default function Contratos() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");

  const contratosFiltrados = CONTRATOS.filter(c => {
    const matchBusca = c.beneficiario.toLowerCase().includes(busca.toLowerCase()) ||
                       c.categoria.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const alertasContratos = ALERTAS.filter(a => a.pagina === "contratos");

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-8">
        {/* KPIs */}
        <section>
          <SectionHeader
            titulo="Contratos e Convênios Municipais"
            subtitulo="Dados extraídos da planilha oficial da Prefeitura Municipal de Passo Fundo/RS"
            fonte={RESUMO_CONTRATOS.fonte}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <KpiCard
              titulo="Total de Contratos"
              valor={RESUMO_CONTRATOS.total}
              subtitulo="Contratos ativos"
              fonte="Planilha Oficial — PMPF/RS"
              icone={<Building2 size={18} />}
              cor="blue"
            />
            <KpiCard
              titulo="Total Empenhado"
              valor={`R$ ${(RESUMO_CONTRATOS.totalEmpenhado / 1e6).toFixed(2)}M`}
              subtitulo="Valor total empenhado"
              fonte="Planilha Oficial — PMPF/RS"
              icone={<DollarSign size={18} />}
              cor="blue"
            />
            <KpiCard
              titulo="Total Pago"
              valor={`R$ ${(RESUMO_CONTRATOS.totalPago / 1e6).toFixed(2)}M`}
              subtitulo={`${((RESUMO_CONTRATOS.totalPago / RESUMO_CONTRATOS.totalEmpenhado) * 100).toFixed(1)}% do empenhado`}
              fonte="Planilha Oficial — PMPF/RS"
              icone={<TrendingUp size={18} />}
              cor="green"
            />
            <KpiCard
              titulo="Execução Média"
              valor={`${RESUMO_CONTRATOS.execucaoMedia}%`}
              subtitulo={`${RESUMO_CONTRATOS.alertasCriticos} críticos | ${RESUMO_CONTRATOS.alertasAtencao} atenção`}
              fonte="Planilha Oficial — PMPF/RS"
              icone={<AlertCircle size={18} />}
              cor={RESUMO_CONTRATOS.execucaoMedia >= 80 ? "green" : "amber"}
            />
          </div>
        </section>

        {/* Gráfico por Categoria */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <SectionHeader titulo="Distribuição por Categoria" fonte={RESUMO_CONTRATOS.fonte} />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CATEGORIAS_CONTRATOS} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="categoria" tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} />
              <Tooltip
                formatter={(v: any, n: string) => [n === "quantidade" ? `${v} contratos` : `R$ ${(Number(v)/1e6).toFixed(2)}M`, n === "quantidade" ? "Quantidade" : "Valor"]}
                contentStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}
              />
              <Bar dataKey="quantidade" name="Quantidade" radius={[4,4,0,0]}>
                {CATEGORIAS_CONTRATOS.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alertas */}
        {alertasContratos.length > 0 && (
          <section>
            <SectionHeader titulo="Alertas de Execução" subtitulo="Contratos com execução abaixo da meta mínima de 60%" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {alertasContratos.map((a, i) => (
                <AlertCard key={i} tipo={a.tipo as any} titulo={a.titulo} descricao={a.descricao} valor={a.valor} meta={a.meta} />
              ))}
            </div>
          </section>
        )}

        {/* Tabela de Contratos */}
        <section>
          <SectionHeader titulo="Lista de Contratos" subtitulo={`Exibindo ${contratosFiltrados.length} de ${CONTRATOS.length} contratos`} />

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar beneficiário ou categoria..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <div className="flex gap-2">
              {["todos", "ok", "atencao", "critico"].map(s => (
                <button
                  key={s}
                  onClick={() => setFiltroStatus(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    filtroStatus === s
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {s === "todos" ? "Todos" : STATUS_CONFIG[s as keyof typeof STATUS_CONFIG].label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Beneficiário</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Categoria</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Empenhado</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Pago</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-40">Execução</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contratosFiltrados.map((c) => {
                    const sc = STATUS_CONFIG[c.status as keyof typeof STATUS_CONFIG];
                    return (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800 text-xs leading-tight">{c.beneficiario}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-xs text-gray-500">{c.categoria}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-xs font-semibold text-gray-800">
                            {c.empenhado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right hidden md:table-cell">
                          <span className="text-xs text-gray-600">
                            {c.pago.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </span>
                        </td>
                        <td className="px-4 py-3 w-40">
                          <ExecucaoBar valor={c.execucao} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.className}`}>
                            {sc.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <FonteBadge fonte={RESUMO_CONTRATOS.fonte} />
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
