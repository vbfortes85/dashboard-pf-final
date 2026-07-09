import DashboardLayout from "@/components/DashboardLayout";
import { KpiCard, AlertCard, SectionHeader, FonteBadge } from "@/components/DashboardWidgets";
import { CAGED, CAGED_SETORES, CAGED_HISTORICO_2025, COMPARATIVO_RS, ALERTAS } from "@/lib/dadosMunicipais";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ComposedChart, Line, Legend, PieChart, Pie, ReferenceLine
} from "recharts";
import { Users, TrendingUp, TrendingDown, Briefcase, Award, BarChart3 } from "lucide-react";

const HIGHLIGHT_COLOR = "#1B4F8A";
const OTHER_COLOR = "#CBD5E1";
const PIE_COLORS = ["#1B4F8A", "#2563EB", "#2E7D32", "#16A34A", "#F59E0B", "#7C3AED", "#0891B2"];

const FONTE = CAGED.fonte;

const CustomTooltipHistorico = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
        <p className="font-semibold text-gray-700 mb-1">{label}/2025</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: <strong>{p.value > 0 ? "+" : ""}{p.value.toLocaleString("pt-BR")}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomTooltipSetor = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs max-w-48" style={{ fontFamily: "Inter, sans-serif" }}>
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: <strong>{p.value.toLocaleString("pt-BR")}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CAGED_Page() {
  const alertasCAGED = ALERTAS.filter(a => a.pagina === "caged");

  const comparativoCAGED = COMPARATIVO_RS.map(c => ({
    cidade: c.cidade.split(" ")[0],
    estoque: c.estoqueCAGED,
    saldo: c.saldoCAGED,
    destaque: c.destaque ?? false,
  }));

  const setoresAbreviados = CAGED_SETORES.map(s => ({
    ...s,
    setorAbrev: s.setor.length > 20 ? s.setor.substring(0, 18) + "…" : s.setor,
  }));

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-8">
        {/* Cabeçalho */}
        <SectionHeader
          titulo="CAGED — Emprego Formal"
          subtitulo="Cadastro Geral de Empregados e Desempregados — Passo Fundo/RS"
          fonte={FONTE}
        />

        {/* KPIs Principais */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <KpiCard
              titulo="Estoque de Empregos"
              valor={CAGED.estoqueAtual.toLocaleString("pt-BR")}
              subtitulo="Vínculos ativos em Jul/2025"
              fonte={FONTE}
              icone={<Briefcase size={18} />}
              cor="blue"
              tendencia="up"
              tendenciaValor="8º no RS"
            />
            <KpiCard
              titulo="Saldo Mensal"
              valor={`+${CAGED.saldoMensal}`}
              subtitulo={`${CAGED.admissoes.toLocaleString("pt-BR")} admissões`}
              fonte={FONTE}
              icone={<TrendingUp size={18} />}
              cor="green"
              tendencia="up"
              tendenciaValor="Saldo positivo"
            />
            <KpiCard
              titulo="Admissões"
              valor={CAGED.admissoes.toLocaleString("pt-BR")}
              subtitulo={`Desligamentos: ${CAGED.desligamentos.toLocaleString("pt-BR")}`}
              fonte={FONTE}
              icone={<Users size={18} />}
              cor="blue"
            />
            <KpiCard
              titulo="Taxa de Emprego"
              valor={`${CAGED.taxaEmprego}%`}
              subtitulo="Empregos / Pop. total"
              fonte={FONTE}
              icone={<BarChart3 size={18} />}
              cor="purple"
            />
          </div>
        </section>

        {/* KPIs Secundários */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard
              titulo="Ranking RS"
              valor={`${CAGED.rankingRS}º / 497`}
              subtitulo="Posição no Rio Grande do Sul"
              fonte={FONTE}
              icone={<Award size={18} />}
              cor="amber"
              tendencia="up"
              tendenciaValor="Top 2% RS"
            />
            <KpiCard
              titulo="Percentil Nacional"
              valor={`${CAGED.percentilNacional}%`}
              subtitulo="Percentil entre municípios BR"
              fonte={FONTE}
              icone={<TrendingUp size={18} />}
              cor="amber"
            />
            <KpiCard
              titulo="Setor Principal"
              valor="Ind. Transformação"
              subtitulo={`${CAGED.participacaoPrincipal}% do estoque total`}
              fonte={FONTE}
              icone={<Briefcase size={18} />}
              cor="blue"
            />
            <KpiCard
              titulo="Desligamentos"
              valor={CAGED.desligamentos.toLocaleString("pt-BR")}
              subtitulo="Desligamentos em Jul/2025"
              fonte={FONTE}
              icone={<TrendingDown size={18} />}
              cor="red"
            />
          </div>
        </section>

        {/* Gráfico Histórico 2025 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <SectionHeader
            titulo="Evolução Mensal 2025 — Admissões, Desligamentos e Saldo"
            subtitulo="Janeiro a Julho de 2025"
            fonte={FONTE}
          />
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={CAGED_HISTORICO_2025} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} />
              <Tooltip content={<CustomTooltipHistorico />} />
              <Legend
                wrapperStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    admissoes: "Admissões",
                    desligamentos: "Desligamentos",
                    saldo: "Saldo Líquido",
                  };
                  return labels[value] ?? value;
                }}
              />
              <Bar dataKey="admissoes" name="admissoes" fill="#2563EB" radius={[3, 3, 0, 0]} opacity={0.85} />
              <Bar dataKey="desligamentos" name="desligamentos" fill="#EF4444" radius={[3, 3, 0, 0]} opacity={0.85} />
              <Line
                type="monotone"
                dataKey="saldo"
                name="saldo"
                stroke="#16A34A"
                strokeWidth={2.5}
                dot={{ fill: "#16A34A", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Gráficos Setoriais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Estoque por Setor */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <SectionHeader titulo="Estoque por Setor Econômico" fonte={FONTE} />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={setoresAbreviados} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} tickFormatter={v => v.toLocaleString("pt-BR")} />
                <YAxis type="category" dataKey="setorAbrev" tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} width={120} />
                <Tooltip content={<CustomTooltipSetor />} />
                <Bar dataKey="estoque" name="Estoque" radius={[0, 4, 4, 0]}>
                  {setoresAbreviados.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Participação por Setor (Pizza) */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <SectionHeader titulo="Participação Setorial (%)" fonte={FONTE} />
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={CAGED_SETORES}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="participacao"
                  nameKey="setor"
                  label={({ setor, participacao }) => {
                    const abbr = setor.split(" ")[0];
                    return `${abbr} ${participacao}%`;
                  }}
                  labelLine={false}
                >
                  {CAGED_SETORES.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any, n: string) => [`${v}%`, n]}
                  contentStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela Setorial Detalhada */}
        <section>
          <SectionHeader
            titulo="Tabela Setorial Detalhada"
            subtitulo="Estoque, participação e saldo mensal por setor econômico"
            fonte={FONTE}
          />
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Setor Econômico</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estoque</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Participação</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Saldo Jul/25</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tendência</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {CAGED_SETORES.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                          />
                          <span className="text-sm font-medium text-gray-800">{s.setor}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-semibold text-gray-800">
                          {s.estoque.toLocaleString("pt-BR")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${s.participacao}%`,
                                background: PIE_COLORS[i % PIE_COLORS.length],
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-700 w-10 text-right">
                            {s.participacao}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-sm font-bold ${s.saldo > 0 ? "text-emerald-600" : s.saldo < 0 ? "text-red-600" : "text-gray-500"}`}>
                          {s.saldo > 0 ? "+" : ""}{s.saldo.toLocaleString("pt-BR")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.saldo > 100
                            ? "bg-emerald-100 text-emerald-700"
                            : s.saldo > 0
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {s.saldo > 100 ? "↑ Crescendo" : s.saldo > 0 ? "→ Estável" : "↓ Queda"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td className="px-4 py-3 font-bold text-blue-800">Total Passo Fundo</td>
                    <td className="px-4 py-3 text-right font-bold text-blue-800">
                      {CAGED.estoqueAtual.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-blue-800">100%</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700">+{CAGED.saldoMensal}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        ↑ Crescendo
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <FonteBadge fonte={FONTE} />
            </div>
          </div>
        </section>

        {/* Comparativo Regional */}
        <section>
          <SectionHeader
            titulo="Comparativo Regional — Top 10 Cidades RS"
            subtitulo="Estoque de empregos formais e saldo mensal — Julho 2025"
            fonte={`${FONTE} | IBGE 2024`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Estoque Comparativo */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
                Estoque de Empregos Formais
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={comparativoCAGED} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="cidade" tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(v: any) => [Number(v).toLocaleString("pt-BR"), "Estoque"]}
                    contentStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}
                  />
                  <Bar dataKey="estoque" name="Estoque" radius={[4, 4, 0, 0]}>
                    {comparativoCAGED.map((entry, i) => (
                      <Cell key={i} fill={entry.destaque ? HIGHLIGHT_COLOR : OTHER_COLOR} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Saldo Comparativo */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
                Saldo Mensal de Empregos (Jul/2025)
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={comparativoCAGED} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="cidade" tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} />
                  <Tooltip
                    formatter={(v: any) => [`+${Number(v).toLocaleString("pt-BR")}`, "Saldo"]}
                    contentStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}
                  />
                  <ReferenceLine y={0} stroke="#9CA3AF" />
                  <Bar dataKey="saldo" name="Saldo" radius={[4, 4, 0, 0]}>
                    {comparativoCAGED.map((entry, i) => (
                      <Cell key={i} fill={entry.destaque ? "#16A34A" : "#86EFAC"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabela Comparativa */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cidade</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estoque</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Saldo Jul/25</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Taxa Emprego</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ranking RS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {COMPARATIVO_RS.map((c, i) => (
                    <tr key={i} className={c.destaque ? "bg-blue-50" : "hover:bg-gray-50 transition-colors"}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {c.destaque && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                          <span className={`text-sm font-medium ${c.destaque ? "text-blue-800" : "text-gray-700"}`}>
                            {c.cidade}
                          </span>
                          {c.destaque && (
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">PF</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-semibold text-gray-800">
                          {c.estoqueCAGED.toLocaleString("pt-BR")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-bold text-emerald-600">
                          +{c.saldoCAGED.toLocaleString("pt-BR")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell">
                        <span className="text-xs text-gray-600">
                          {((c.estoqueCAGED / c.populacao) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          i < 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
                        }`}>
                          #{i + 1}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <FonteBadge fonte={`${FONTE} | IBGE — Estimativa Populacional 2024`} />
            </div>
          </div>
        </section>

        {/* Alertas CAGED */}
        {alertasCAGED.length > 0 && (
          <section>
            <SectionHeader titulo="Alertas — Emprego Formal" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {alertasCAGED.map((a, i) => (
                <AlertCard key={i} tipo={a.tipo as any} titulo={a.titulo} descricao={a.descricao} valor={a.valor} meta={a.meta} />
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
