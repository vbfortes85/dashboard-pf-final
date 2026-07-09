import DashboardLayout from "@/components/DashboardLayout";
import { KpiCard, AlertCard, SectionHeader, FonteBadge } from "@/components/DashboardWidgets";
import {
  DEMOGRAFICOS, SOCIOECONOMICOS, EDUCACAO, SAUDE,
  ISS, ISS_HISTORICO, ALERTAS, COMPARATIVO_RS
} from "@/lib/dadosMunicipais";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, LineChart, Line, ReferenceLine, Legend
} from "recharts";
import { Users, GraduationCap, HeartPulse, DollarSign, TrendingUp, MapPin } from "lucide-react";

const HIGHLIGHT_COLOR = "#1B4F8A";
const OTHER_COLOR = "#CBD5E1";

export default function Indicadores() {
  const alertasIndicadores = ALERTAS.filter(a => a.pagina === "indicadores");

  const comparativoPIB = COMPARATIVO_RS.map(c => ({
    cidade: c.cidade.split(" ")[0],
    pibPerCapita: c.pibPerCapita,
    destaque: c.destaque,
  }));

  const comparativoIDH = COMPARATIVO_RS.map(c => ({
    cidade: c.cidade.split(" ")[0],
    idh: c.idh,
    destaque: c.destaque,
  }));

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-8">
        <SectionHeader
          titulo="Indicadores Municipais"
          subtitulo="Dados demográficos, socioeconômicos, infraestrutura e arrecadação fiscal"
        />

        {/* Demográficos */}
        <section>
          <SectionHeader titulo="Indicadores Demográficos" fonte={DEMOGRAFICOS.fonte} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard titulo="População Estimada" valor="214.811" subtitulo="Estimativa 2024" fonte={DEMOGRAFICOS.fonte} icone={<Users size={18} />} cor="blue" />
            <KpiCard titulo="Densidade Demográfica" valor={`${DEMOGRAFICOS.densidadeDemografica} hab/km²`} subtitulo={`Área: ${DEMOGRAFICOS.areaKm2} km²`} fonte={DEMOGRAFICOS.fonte} icone={<MapPin size={18} />} cor="blue" />
            <KpiCard titulo="Pop. Urbana" valor={`${DEMOGRAFICOS.populacaoUrbana}%`} subtitulo="Grau de urbanização" fonte={DEMOGRAFICOS.fonte} icone={<Users size={18} />} cor="green" />
            <KpiCard titulo="Crescimento Anual" valor={`${DEMOGRAFICOS.crescimentoAnual}%`} subtitulo="Taxa anual de crescimento" fonte={DEMOGRAFICOS.fonte} icone={<TrendingUp size={18} />} cor="green" tendencia="up" tendenciaValor="Crescimento positivo" />
          </div>
        </section>

        {/* Socioeconômicos */}
        <section>
          <SectionHeader titulo="Indicadores Socioeconômicos" fonte={SOCIOECONOMICOS.fonte} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard titulo="PIB Municipal" valor="R$ 13,2 bi" subtitulo="Produto Interno Bruto" fonte={SOCIOECONOMICOS.fonte} icone={<DollarSign size={18} />} cor="green" />
            <KpiCard titulo="PIB per Capita" valor="R$ 60.906" subtitulo="IBGE 2022" fonte={SOCIOECONOMICOS.fonte} icone={<TrendingUp size={18} />} cor="green" tendencia="up" tendenciaValor="Acima da média RS" />
            <KpiCard titulo="IDH" valor="0,756" subtitulo="Alto Desenvolvimento" fonte="PNUD — IDH 2022" icone={<TrendingUp size={18} />} cor="blue" tendencia="up" tendenciaValor="Meta: ≥ 0,800" />
            <KpiCard titulo="Índice de Gini" valor={SOCIOECONOMICOS.indiceGini} subtitulo="Desigualdade de renda" fonte={SOCIOECONOMICOS.fonte} icone={<Users size={18} />} cor="amber" />
          </div>
        </section>

        {/* Comparativo PIB per Capita */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <SectionHeader titulo="PIB per Capita — Top 10 Cidades RS" subtitulo="Comparação com as maiores cidades do Rio Grande do Sul" fonte="IBGE — PIB Municipal 2022" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={comparativoPIB} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="cidade" tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: any) => [`R$ ${Number(v).toLocaleString("pt-BR")}`, "PIB per Capita"]}
                contentStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}
              />
              <Bar dataKey="pibPerCapita" radius={[4,4,0,0]}>
                {comparativoPIB.map((entry, i) => (
                  <Cell key={i} fill={entry.destaque ? HIGHLIGHT_COLOR : OTHER_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-blue-700 font-medium mt-2 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
            ■ Passo Fundo — Destaque em PIB per capita na região
          </p>
        </div>

        {/* Comparativo IDH */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <SectionHeader titulo="IDH — Top 10 Cidades RS" subtitulo="Índice de Desenvolvimento Humano comparativo" fonte="PNUD — Atlas do Desenvolvimento Humano 2022" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={comparativoIDH} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="cidade" tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 10, fontFamily: "Inter, sans-serif" }} domain={[0.68, 0.85]} tickFormatter={v => v.toFixed(3)} />
              <Tooltip
                formatter={(v: any) => [Number(v).toFixed(3), "IDH"]}
                contentStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}
              />
              <ReferenceLine y={0.800} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: "Meta 0,800", fontSize: 10, fill: "#F59E0B" }} />
              <Bar dataKey="idh" radius={[4,4,0,0]}>
                {comparativoIDH.map((entry, i) => (
                  <Cell key={i} fill={entry.destaque ? HIGHLIGHT_COLOR : OTHER_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Educação */}
        <section>
          <SectionHeader titulo="Infraestrutura — Educação" fonte={EDUCACAO.fonte} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard titulo="Escolas Municipais" valor={EDUCACAO.escolasMunicipais} subtitulo="Rede Municipal" fonte={EDUCACAO.fonte} icone={<GraduationCap size={18} />} cor="amber" />
            <KpiCard titulo="Matrículas Ed. Básica" valor={EDUCACAO.matriculasEducacaoBasica.toLocaleString("pt-BR")} subtitulo="Educação Básica" fonte={EDUCACAO.fonte} icone={<Users size={18} />} cor="amber" />
            <KpiCard titulo="Taxa de Alfabetização" valor={`${EDUCACAO.taxaAlfabetizacao}%`} subtitulo="Acima da média nacional" fonte={EDUCACAO.fonte} icone={<GraduationCap size={18} />} cor="green" />
            <KpiCard
              titulo="IDEB 2023"
              valor={EDUCACAO.ideb2023}
              subtitulo={`Meta: ${EDUCACAO.metaIdeb} — ${EDUCACAO.ideb2023 < EDUCACAO.metaIdeb ? "Abaixo da meta" : "Meta atingida"}`}
              fonte="INEP 2023"
              icone={<GraduationCap size={18} />}
              cor={EDUCACAO.ideb2023 >= EDUCACAO.metaIdeb ? "green" : "amber"}
              tendencia={EDUCACAO.ideb2023 >= EDUCACAO.metaIdeb ? "up" : "down"}
              tendenciaValor={`${(EDUCACAO.metaIdeb - EDUCACAO.ideb2023).toFixed(1)} pts abaixo`}
            />
          </div>
        </section>

        {/* Saúde */}
        <section>
          <SectionHeader titulo="Infraestrutura — Saúde" fonte={SAUDE.fonte} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard titulo="Unidades de Saúde" valor={SAUDE.unidadesSaude} subtitulo="Rede Municipal" fonte={SAUDE.fonte} icone={<HeartPulse size={18} />} cor="red" />
            <KpiCard titulo="Hospitais" valor={SAUDE.hospitais} subtitulo={`${SAUDE.leitos} leitos disponíveis`} fonte={SAUDE.fonte} icone={<HeartPulse size={18} />} cor="red" />
            <KpiCard
              titulo="Cobertura PSF"
              valor={`${SAUDE.coberturaPSF}%`}
              subtitulo={`Meta: ${SAUDE.metaCoberturaPSF}% — ${SAUDE.coberturaPSF < SAUDE.metaCoberturaPSF ? "Abaixo" : "Atingida"}`}
              fonte={SAUDE.fonte}
              icone={<HeartPulse size={18} />}
              cor={SAUDE.coberturaPSF >= SAUDE.metaCoberturaPSF ? "green" : "amber"}
            />
            <KpiCard
              titulo="Mortalidade Infantil"
              valor={`${SAUDE.taxaMortalidadeInfantil}/1.000`}
              subtitulo={`Meta: ${SAUDE.metaMortalidadeInfantil}/1.000`}
              fonte={SAUDE.fonte}
              icone={<HeartPulse size={18} />}
              cor={SAUDE.taxaMortalidadeInfantil <= SAUDE.metaMortalidadeInfantil ? "green" : "red"}
              tendencia={SAUDE.taxaMortalidadeInfantil <= SAUDE.metaMortalidadeInfantil ? "down" : "up"}
              tendenciaValor="Requer monitoramento"
            />
          </div>
        </section>

        {/* ISS */}
        <section>
          <SectionHeader titulo="Arrecadação Fiscal — ISS" fonte={ISS.fonte} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <KpiCard titulo="ISS 2024" valor={`R$ ${(ISS.arrecadacaoAnual2024/1e6).toFixed(1)}M`} subtitulo="Arrecadação anual" fonte={ISS.fonte} icone={<DollarSign size={18} />} cor="green" />
            <KpiCard titulo="Meta 2024" valor={`R$ ${(ISS.metaAnual2024/1e6).toFixed(1)}M`} subtitulo={`${ISS.percentualMeta}% atingido`} fonte={ISS.fonte} icone={<TrendingUp size={18} />} cor={ISS.percentualMeta >= 100 ? "green" : "amber"} />
            <KpiCard titulo="Crescimento Anual" valor={`+${ISS.crescimentoAnual}%`} subtitulo="vs 2023" fonte={ISS.fonte} icone={<TrendingUp size={18} />} cor="green" tendencia="up" tendenciaValor="Crescimento consistente" />
            <KpiCard titulo="Setor Líder" valor="Saúde" subtitulo="Principal arrecadador ISS" fonte={ISS.fonte} icone={<DollarSign size={18} />} cor="blue" />
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <SectionHeader titulo="Evolução ISS 2021–2024 (R$ Milhões)" fonte={ISS.fonte} />
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ISS_HISTORICO} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="ano" tick={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} />
                <YAxis tick={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} tickFormatter={v => `R$${v}M`} />
                <Tooltip formatter={(v: any) => [`R$ ${v}M`, "ISS"]} contentStyle={{ fontFamily: "Inter, sans-serif", fontSize: 12 }} />
                <Line type="monotone" dataKey="valor" stroke={HIGHLIGHT_COLOR} strokeWidth={2.5} dot={{ fill: HIGHLIGHT_COLOR, r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Tabela Comparativa Top 10 RS */}
        <section>
          <SectionHeader titulo="Tabela Comparativa — Top 10 Cidades do RS" subtitulo="Principais indicadores comparados entre as maiores cidades do Rio Grande do Sul" fonte="IBGE 2022/2024 | PNUD 2022 | CAGED Jul/2025" />
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cidade</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">População</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">PIB per Capita</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">IDH</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ISS Anual (R$M)</th>
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
                          {c.destaque && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">PF</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-gray-600">{c.populacao.toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">
                        {c.pibPerCapita.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-xs font-semibold ${c.idh >= 0.780 ? "text-emerald-700" : c.idh >= 0.750 ? "text-amber-700" : "text-gray-600"}`}>
                          {c.idh.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-gray-600">R$ {c.issAnual}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <FonteBadge fonte="IBGE 2022/2024 | PNUD 2022 | SEFAZ Municipal" />
            </div>
          </div>
        </section>

        {/* Alertas */}
        {alertasIndicadores.length > 0 && (
          <section>
            <SectionHeader titulo="Alertas — Indicadores Abaixo da Meta" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {alertasIndicadores.map((a, i) => (
                <AlertCard key={i} tipo={a.tipo as any} titulo={a.titulo} descricao={a.descricao} valor={a.valor} meta={a.meta} />
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
