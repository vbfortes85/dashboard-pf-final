import DashboardLayout from "@/components/DashboardLayout";
import { KpiCard, AlertCard, SectionHeader, FonteBadge } from "@/components/DashboardWidgets";
import {
  RESUMO_CONTRATOS, DEMOGRAFICOS, SOCIOECONOMICOS,
  EDUCACAO, SAUDE, ISS, CAGED, ALERTAS, CATEGORIAS_CONTRATOS,
  ISS_HISTORICO
} from "@/lib/dadosMunicipais";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import {
  Users, Building2, GraduationCap, HeartPulse,
  TrendingUp, Briefcase, DollarSign, MapPin
} from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031383179/LgxFLVRbbuGeSTAaqmEysm/hero-bg-pf-nCkmS3wPkRPVVEKYFMCFym.webp";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031383179/LgxFLVRbbuGeSTAaqmEysm/logo-pf-dashboard-Vxbm4kyQzyshrVEGravAFL.webp";

const PIE_COLORS = ["#1B4F8A", "#2E7D32", "#F59E0B", "#7C3AED", "#DC2626", "#0891B2", "#BE185D"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" && p.value > 1000
              ? `R$ ${(p.value / 1e6).toFixed(1)}M`
              : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Home() {
  const alertasCriticos = ALERTAS.filter(a => a.tipo === "critico");
  const alertasAtencao = ALERTAS.filter(a => a.tipo === "atencao");

  return (
    <DashboardLayout>
      {/* Hero Banner */}
      <div
        className="relative h-40 sm:h-48 flex items-end overflow-hidden"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,41,82,0.92) 0%, rgba(15,41,82,0.6) 60%, transparent 100%)" }} />
        <div className="relative z-10 px-6 pb-6 flex items-end gap-4">
          <img src={LOGO_URL} alt="Logo" className="w-12 h-12 rounded-xl shadow-lg" />
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Painel de Gestão Municipal
            </h1>
            <p className="text-blue-200 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Passo Fundo / Rio Grande do Sul
            </p>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <MapPin size={12} className="text-blue-200" />
          <span className="text-white text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {DEMOGRAFICOS.populacaoEstimativa}
          </span>
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-8">
        {/* KPIs Principais */}
        <section>
          <SectionHeader titulo="Indicadores Principais" subtitulo="Visão consolidada dos dados municipais" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <KpiCard
              titulo="Contratos Ativos"
              valor={RESUMO_CONTRATOS.total}
              subtitulo={`R$ ${(RESUMO_CONTRATOS.totalEmpenhado / 1e6).toFixed(1)}M empenhados`}
              fonte="Planilha Oficial — PMPF/RS"
              icone={<Building2 size={18} />}
              cor="blue"
              tendencia="neutral"
              tendenciaValor="Julho 2025"
            />
            <KpiCard
              titulo="Execução Média"
              valor={`${RESUMO_CONTRATOS.execucaoMedia}%`}
              subtitulo={`${RESUMO_CONTRATOS.alertasCriticos} alertas críticos`}
              fonte="Planilha Oficial — PMPF/RS"
              icone={<TrendingUp size={18} />}
              cor={RESUMO_CONTRATOS.execucaoMedia >= 80 ? "green" : "amber"}
              tendencia="up"
              tendenciaValor="+2.1% vs mês anterior"
            />
            <KpiCard
              titulo="Emprego Formal"
              valor={CAGED.estoqueAtual.toLocaleString("pt-BR")}
              subtitulo={`Saldo mensal: +${CAGED.saldoMensal}`}
              fonte="CAGED — MTE Jul/2025"
              icone={<Briefcase size={18} />}
              cor="purple"
              tendencia="up"
              tendenciaValor={`+${CAGED.saldoMensal} empregos`}
            />
            <KpiCard
              titulo="ISS Arrecadado"
              valor={`R$ ${(ISS.arrecadacaoAnual2024 / 1e6).toFixed(1)}M`}
              subtitulo={`${ISS.percentualMeta}% da meta anual`}
              fonte="SEFAZ — PMPF/RS 2024"
              icone={<DollarSign size={18} />}
              cor={ISS.percentualMeta >= 100 ? "green" : "amber"}
              tendencia="up"
              tendenciaValor={`+${ISS.crescimentoAnual}% vs 2023`}
            />
          </div>
        </section>

        {/* KPIs Sociais */}
        <section>
          <SectionHeader titulo="Indicadores Sociais e Demográficos" fonte={`${DEMOGRAFICOS.fonte} | ${SOCIOECONOMICOS.fonte}`} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { titulo: "População", valor: "214.811", sub: "Estimativa 2024", icone: <Users size={16} />, cor: "blue" as const },
              { titulo: "PIB per Capita", valor: "R$ 60.906", sub: "IBGE 2022", icone: <TrendingUp size={16} />, cor: "green" as const },
              { titulo: "IDH", valor: "0,756", sub: "Alto Desenvolvimento", icone: <TrendingUp size={16} />, cor: "green" as const },
              { titulo: "Escolas Munic.", valor: EDUCACAO.escolasMunicipais, sub: "Rede Municipal", icone: <GraduationCap size={16} />, cor: "amber" as const },
              { titulo: "Unid. de Saúde", valor: SAUDE.unidadesSaude, sub: "Rede Municipal", icone: <HeartPulse size={16} />, cor: "red" as const },
              { titulo: "Cobertura SUS", valor: `${SAUDE.coberturaSUS}%`, sub: "DATASUS 2024", icone: <HeartPulse size={16} />, cor: "green" as const },
            ].map((k, i) => (
              <KpiCard key={i} titulo={k.titulo} valor={k.valor} subtitulo={k.sub} icone={k.icone} cor={k.cor} />
            ))}
          </div>
        </section>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ISS Histórico */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <SectionHeader titulo="Arrecadação ISS — Histórico" fonte="SEFAZ — Prefeitura Municipal de Passo Fundo/RS" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ISS_HISTORICO} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="ano" tick={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} />
                <YAxis tick={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} tickFormatter={v => `R$${v}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="valor" name="ISS (R$ Milhões)" fill="#1B4F8A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Contratos por Categoria */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <SectionHeader titulo="Contratos por Categoria" fonte="Planilha Oficial — Prefeitura Municipal de Passo Fundo/RS" />
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={CATEGORIAS_CONTRATOS}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="quantidade"
                  nameKey="categoria"
                  label={({ categoria, percent }) => `${categoria.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {CATEGORIAS_CONTRATOS.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertas */}
        {(alertasCriticos.length > 0 || alertasAtencao.length > 0) && (
          <section>
            <SectionHeader titulo="Alertas e Monitoramento" subtitulo="Indicadores que requerem atenção da gestão" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[...alertasCriticos, ...alertasAtencao].map((a, i) => (
                <AlertCard key={i} tipo={a.tipo as any} titulo={a.titulo} descricao={a.descricao} valor={a.valor} meta={a.meta} />
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
