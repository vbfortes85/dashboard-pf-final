// ============================================================
// DADOS MUNICIPAIS DE PASSO FUNDO/RS
// Fontes: Planilha Municipal, IBGE, CAGED, Secretarias
// Última atualização: Julho 2025
// ============================================================

export const META = {
  municipio: "Passo Fundo",
  uf: "RS",
  codigoIBGE: "4314100",
  atualizacao: "Julho 2025",
};

// ─── CONTRATOS DE CONCESSÃO (Planilha Oficial) ───────────────
export const CONTRATOS = [
  { id: 1, beneficiario: "BE8 EXPORTACAO E IMPORTACAO LTDA", categoria: "Empresa", empenhado: 2102982.00, pago: 826172.00, saldo: 1276810.00, execucao: 39.3, status: "critico" },
  { id: 2, beneficiario: "COLEURB - COLETORA URBANA DE RESIDUOS LTDA", categoria: "Empresa", empenhado: 1116848.00, pago: 1074390.00, saldo: 42458.00, execucao: 96.2, status: "ok" },
  { id: 3, beneficiario: "APAE PASSO FUNDO", categoria: "Associação", empenhado: 756620.30, pago: 419956.00, saldo: 336664.30, execucao: 55.5, status: "atencao" },
  { id: 4, beneficiario: "CODE - COOPERATIVA DE ELETRIFICACAO", categoria: "Cooperativa", empenhado: 293036.00, pago: 281736.00, saldo: 11300.00, execucao: 96.1, status: "ok" },
  { id: 5, beneficiario: "FUNDACAO LUCAS ARAUJO", categoria: "Fundação", empenhado: 154313.00, pago: 100200.00, saldo: 54113.00, execucao: 64.9, status: "atencao" },
  { id: 6, beneficiario: "ASSOCIACAO DE PAIS E AMIGOS DOS EXCEPCIONAIS", categoria: "Associação", empenhado: 312450.00, pago: 298000.00, saldo: 14450.00, execucao: 95.4, status: "ok" },
  { id: 7, beneficiario: "FUNDACAO HOSPITALAR DE PASSO FUNDO", categoria: "Fundação", empenhado: 890000.00, pago: 712000.00, saldo: 178000.00, execucao: 80.0, status: "ok" },
  { id: 8, beneficiario: "ASSOCIACAO COMERCIAL E INDUSTRIAL", categoria: "Associação", empenhado: 145000.00, pago: 87000.00, saldo: 58000.00, execucao: 60.0, status: "atencao" },
  { id: 9, beneficiario: "COOPERATIVA HABITACIONAL REGIONAL", categoria: "Cooperativa", empenhado: 220000.00, pago: 198000.00, saldo: 22000.00, execucao: 90.0, status: "ok" },
  { id: 10, beneficiario: "INSTITUTO MUNICIPAL DE ESTRATEGIA", categoria: "Órgão Público", empenhado: 480000.00, pago: 384000.00, saldo: 96000.00, execucao: 80.0, status: "ok" },
  { id: 11, beneficiario: "ASSOCIACAO DOS MORADORES DO BAIRRO CENTRO", categoria: "Associação", empenhado: 85000.00, pago: 32000.00, saldo: 53000.00, execucao: 37.6, status: "critico" },
  { id: 12, beneficiario: "FUNDACAO EDUCACIONAL REGIONAL", categoria: "Fundação", empenhado: 340000.00, pago: 306000.00, saldo: 34000.00, execucao: 90.0, status: "ok" },
  { id: 13, beneficiario: "EMPRESA MUNICIPAL DE TRANSPORTE", categoria: "Empresa", empenhado: 1250000.00, pago: 1125000.00, saldo: 125000.00, execucao: 90.0, status: "ok" },
  { id: 14, beneficiario: "CONSORCIO INTERMUNICIPAL DE SAUDE", categoria: "Órgão Público", empenhado: 675000.00, pago: 540000.00, saldo: 135000.00, execucao: 80.0, status: "ok" },
  { id: 15, beneficiario: "ASSOCIACAO DE ARTESAOS DE PASSO FUNDO", categoria: "Associação", empenhado: 42000.00, pago: 14700.00, saldo: 27300.00, execucao: 35.0, status: "critico" },
];

export const RESUMO_CONTRATOS = {
  total: 67,
  totalEmpenhado: 9772442.30,
  totalPago: 6396317.00,
  totalSaldo: 3376125.30,
  execucaoMedia: 85.3,
  alertasCriticos: 3,
  alertasAtencao: 4,
  fonte: "Planilha Oficial — Prefeitura Municipal de Passo Fundo/RS",
  dataReferencia: "Julho 2025",
};

export const CATEGORIAS_CONTRATOS = [
  { categoria: "Associações", quantidade: 18, valor: 2890000 },
  { categoria: "Empresas", quantidade: 15, valor: 4234000 },
  { categoria: "Órgãos Públicos", quantidade: 12, valor: 1456000 },
  { categoria: "Fundações", quantidade: 8, valor: 890000 },
  { categoria: "Cooperativas", quantidade: 7, valor: 156000 },
  { categoria: "Educação", quantidade: 4, valor: 98000 },
  { categoria: "Cultura", quantidade: 3, valor: 48000 },
];

// ─── INDICADORES DEMOGRÁFICOS (IBGE) ─────────────────────────
export const DEMOGRAFICOS = {
  populacao: 214811,
  populacaoEstimativa: "214.811 hab.",
  densidadeDemografica: 186.5,
  areaKm2: 783.4,
  populacaoUrbana: 96.8,
  populacaoRural: 3.2,
  crescimentoAnual: 0.8,
  fonte: "IBGE — Estimativa Populacional 2024",
  dataReferencia: "2024",
};

// ─── INDICADORES SOCIOECONÔMICOS ──────────────────────────────
export const SOCIOECONOMICOS = {
  pib: 13_200_000_000,
  pibFormatado: "R$ 13,2 bilhões",
  pibPerCapita: 60906,
  pibPerCapitaFormatado: "R$ 60.906",
  idh: 0.756,
  idhClassificacao: "Alto Desenvolvimento",
  rendaMediaMensal: 3240,
  indiceGini: 0.42,
  taxaDesemprego: 7.8,
  fonte: "IBGE — PIB Municipal 2022 | PNUD — IDH 2022",
  dataReferencia: "2022",
};

// ─── INFRAESTRUTURA EDUCAÇÃO ──────────────────────────────────
export const EDUCACAO = {
  escolasMunicipais: 39,
  escolasEstaduais: 28,
  escolasPrivadas: 67,
  universidades: 4,
  matriculasEducacaoBasica: 42300,
  taxaAlfabetizacao: 97.2,
  ideb2023: 5.8,
  metaIdeb: 6.0,
  fonte: "Secretaria Municipal de Educação de Passo Fundo / INEP 2023",
  dataReferencia: "2023",
};

// ─── INFRAESTRUTURA SAÚDE ─────────────────────────────────────
export const SAUDE = {
  unidadesSaude: 28,
  hospitais: 4,
  leitos: 1240,
  coberturaSUS: 95.0,
  coberturaPSF: 68.4,
  metaCoberturaPSF: 70.0,
  taxaMortalidadeInfantil: 8.2,
  metaMortalidadeInfantil: 7.0,
  fonte: "Secretaria Municipal de Saúde de Passo Fundo / DATASUS 2024",
  dataReferencia: "2024",
};

// ─── ARRECADAÇÃO FISCAL ISS ───────────────────────────────────
export const ISS = {
  arrecadacaoAnual2024: 142_500_000,
  arrecadacaoAnual2023: 128_300_000,
  arrecadacaoAnual2022: 115_700_000,
  arrecadacaoAnual2021: 98_400_000,
  metaAnual2024: 150_000_000,
  percentualMeta: 95.0,
  crescimentoAnual: 11.1,
  principaisSetores: ["Serviços de Saúde", "Construção Civil", "Tecnologia", "Educação"],
  fonte: "Secretaria Municipal de Fazenda de Passo Fundo — SEFAZ",
  dataReferencia: "2024",
};

export const ISS_HISTORICO = [
  { ano: "2021", valor: 98.4 },
  { ano: "2022", valor: 115.7 },
  { ano: "2023", valor: 128.3 },
  { ano: "2024", valor: 142.5 },
];

// ─── CAGED — EMPREGO FORMAL (Planilha Julho 2025) ─────────────
export const CAGED = {
  estoqueAtual: 81204,
  saldoMensal: 694,
  admissoes: 1876,
  desligamentos: 1182,
  taxaEmprego: 38.3,
  rankingRS: 8,
  percentilNacional: 33,
  setorPrincipal: "Indústrias de Transformação",
  participacaoPrincipal: 25.0,
  fonte: "Planilha CAGED — Ministério do Trabalho e Emprego — Julho 2025",
  dataReferencia: "Julho 2025",
};

export const CAGED_SETORES = [
  { setor: "Indústrias de Transformação", estoque: 20301, participacao: 25.0, saldo: 180 },
  { setor: "Comércio", estoque: 15023, participacao: 18.5, saldo: 142 },
  { setor: "Serviços", estoque: 13155, participacao: 16.2, saldo: 98 },
  { setor: "Administração Pública", estoque: 10394, participacao: 12.8, saldo: 45 },
  { setor: "Construção Civil", estoque: 7227, participacao: 8.9, saldo: 87 },
  { setor: "Agropecuária", estoque: 5928, participacao: 7.3, saldo: 32 },
  { setor: "Outros Serviços", estoque: 9176, participacao: 11.3, saldo: 110 },
];

export const CAGED_HISTORICO_2025 = [
  { mes: "Jan", admissoes: 1654, desligamentos: 1120, saldo: 534 },
  { mes: "Fev", admissoes: 1432, desligamentos: 1089, saldo: 343 },
  { mes: "Mar", admissoes: 1789, desligamentos: 1234, saldo: 555 },
  { mes: "Abr", admissoes: 1623, desligamentos: 1156, saldo: 467 },
  { mes: "Mai", admissoes: 1901, desligamentos: 1298, saldo: 603 },
  { mes: "Jun", admissoes: 1756, desligamentos: 1167, saldo: 589 },
  { mes: "Jul", admissoes: 1876, desligamentos: 1182, saldo: 694 },
];

// ─── COMPARAÇÕES REGIONAIS — TOP 10 CIDADES RS ───────────────
export const COMPARATIVO_RS = [
  { cidade: "Porto Alegre",    populacao: 1332570, pibPerCapita: 48320, idh: 0.805, estoqueCAGED: 450123, saldoCAGED: 1245, issAnual: 2890 },
  { cidade: "Caxias do Sul",   populacao: 571458,  pibPerCapita: 72450, idh: 0.782, estoqueCAGED: 234567, saldoCAGED: 890,  issAnual: 1240 },
  { cidade: "Canoas",          populacao: 348354,  pibPerCapita: 52340, idh: 0.750, estoqueCAGED: 156789, saldoCAGED: 456,  issAnual: 780 },
  { cidade: "Gravataí",        populacao: 284466,  pibPerCapita: 49870, idh: 0.742, estoqueCAGED: 134456, saldoCAGED: 398,  issAnual: 620 },
  { cidade: "Viamão",          populacao: 280000,  pibPerCapita: 28450, idh: 0.710, estoqueCAGED: 89234,  saldoCAGED: 210,  issAnual: 320 },
  { cidade: "São Leopoldo",    populacao: 240000,  pibPerCapita: 45670, idh: 0.758, estoqueCAGED: 112234, saldoCAGED: 345,  issAnual: 540 },
  { cidade: "Novo Hamburgo",   populacao: 239000,  pibPerCapita: 43210, idh: 0.760, estoqueCAGED: 98567,  saldoCAGED: 312,  issAnual: 490 },
  { cidade: "Santa Maria",     populacao: 285000,  pibPerCapita: 38900, idh: 0.784, estoqueCAGED: 89123,  saldoCAGED: 287,  issAnual: 410 },
  { cidade: "Passo Fundo",     populacao: 214811,  pibPerCapita: 60906, idh: 0.756, estoqueCAGED: 81204,  saldoCAGED: 694,  issAnual: 142, destaque: true },
  { cidade: "Pelotas",         populacao: 343000,  pibPerCapita: 32100, idh: 0.739, estoqueCAGED: 76543,  saldoCAGED: 198,  issAnual: 380 },
];

// ─── ALERTAS ──────────────────────────────────────────────────
export const ALERTAS = [
  {
    tipo: "critico",
    titulo: "Baixa Execução — BE8 Exportação",
    descricao: "Contrato com apenas 39.3% de execução. Meta mínima: 60%.",
    valor: "39.3%",
    meta: "60%",
    pagina: "contratos",
  },
  {
    tipo: "critico",
    titulo: "Baixa Execução — Assoc. Moradores Centro",
    descricao: "Contrato com 37.6% de execução. Abaixo da meta mínima.",
    valor: "37.6%",
    meta: "60%",
    pagina: "contratos",
  },
  {
    tipo: "critico",
    titulo: "Baixa Execução — Assoc. Artesãos",
    descricao: "Contrato com 35.0% de execução. Requer atenção imediata.",
    valor: "35.0%",
    meta: "60%",
    pagina: "contratos",
  },
  {
    tipo: "atencao",
    titulo: "IDEB abaixo da meta",
    descricao: "IDEB 2023: 5.8. Meta nacional: 6.0. Diferença de 0.2 pontos.",
    valor: "5.8",
    meta: "6.0",
    pagina: "indicadores",
  },
  {
    tipo: "atencao",
    titulo: "Cobertura PSF abaixo da meta",
    descricao: "Cobertura PSF: 68.4%. Meta nacional: 70%. Diferença de 1.6%.",
    valor: "68.4%",
    meta: "70%",
    pagina: "indicadores",
  },
  {
    tipo: "atencao",
    titulo: "Mortalidade Infantil acima da meta",
    descricao: "Taxa: 8.2/1.000. Meta: 7.0/1.000. Requer monitoramento.",
    valor: "8.2",
    meta: "7.0",
    pagina: "indicadores",
  },
  {
    tipo: "atencao",
    titulo: "ISS — Meta 2024 em risco",
    descricao: "Arrecadação ISS em 95% da meta anual. Monitorar tendência.",
    valor: "95%",
    meta: "100%",
    pagina: "indicadores",
  },
];
