# Dashboard Municipal — Passo Fundo/RS

> Painel interativo premium de gestão pública com dados oficiais, comparações regionais e design institucional.

---

## Visão Geral do Projeto

Este dashboard foi construído inteiramente por meio de prompts estruturados em linguagem natural, sem escrita manual de código. O documento abaixo registra a **arquitetura de prompting** utilizada em cada etapa, servindo como referência para replicar ou adaptar o projeto a outros municípios.

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Estilização | Tailwind CSS 4 + shadcn/ui |
| Gráficos | Recharts (Bar, Line, Pie, Composed) |
| Roteamento | Wouter |
| Tipografia | Sora (display) + Inter (corpo) + JetBrains Mono (timestamps) |
| Hospedagem | Manus WebDev (Autoscale) |

---

## Estrutura de Arquivos

```
dashboard-pf-final/
├── client/
│   ├── index.html                        # Fontes Google CDN
│   └── src/
│       ├── App.tsx                       # Roteamento (4 rotas)
│       ├── index.css                     # Paleta municipal + animações
│       ├── components/
│       │   ├── DashboardLayout.tsx       # Sidebar + Header + Footer
│       │   └── DashboardWidgets.tsx      # KpiCard, AlertCard, ExecucaoBar…
│       ├── hooks/
│       │   └── useRealtimeStatus.ts      # Horário Brasília + status conexão
│       ├── lib/
│       │   └── dadosMunicipais.ts        # Todos os dados centralizados
│       └── pages/
│           ├── Home.tsx                  # Visão Geral
│           ├── Contratos.tsx             # Contratos e Convênios
│           ├── Indicadores.tsx           # Indicadores Municipais
│           └── CAGED.tsx                 # Emprego Formal
└── push_to_github.sh                     # Script de automação GitHub
```

---

## Arquitetura de Prompting

A construção do projeto seguiu uma sequência de prompts organizados em **seis camadas progressivas**, do planejamento até a entrega. Cada camada é descrita abaixo com o prompt-modelo utilizado.

---

### Camada 1 — Definição de Escopo e Requisitos

**Objetivo:** Estabelecer com precisão o que deve ser construído antes de qualquer geração de código.

**Estrutura do prompt:**

```
Construa um dashboard interativo premium para a [ENTIDADE PÚBLICA].

Requisitos obrigatórios:
- Exatamente [N] páginas funcionais: [lista de páginas]
- Fontes de dados EXPLÍCITAS em cada visualização
- Dados de [fonte A] exclusivamente da planilha fornecida
- Dados públicos ([fonte B], [fonte C]) podem ser atualizados periodicamente
- Comparações entre [município] e top [N] cidades do [estado]
- Sistema de alertas para [critério A] e [critério B]
- Status de conexão em tempo real, botão de atualização manual,
  timestamp de última sincronização em horário de [timezone]
- Design premium com branding de [entidade]
- Interface responsiva para desktop, mobile e monitores de exibição
- Deploy permanente com link único para acesso externo
- NÃO usar schedulers automáticos
- Dados da planilha atualizados somente quando nova planilha for submetida
```

**Princípio:** Separar explicitamente o que é dado estático (planilha), dado público (IBGE/CAGED) e dado em tempo real (timestamp/conexão). Isso evita que o modelo misture fontes ou invente dados.

---

### Camada 2 — Design System e Identidade Visual

**Objetivo:** Definir a linguagem visual antes de qualquer componente, garantindo consistência.

**Estrutura do prompt:**

```
Configure o design system do projeto com:

Paleta de cores (formato oklch para Tailwind 4):
- Cor primária institucional: oklch([L] [C] [H])  → hex equivalente: #[HEX]
- Cor de sucesso: oklch([L] [C] [H])
- Cor de alerta: oklch([L] [C] [H])
- Background: oklch([L] [C] [H])
- Sidebar: oklch([L] [C] [H])

Tipografia:
- Display/títulos: [fonte] (Google Fonts)
- Corpo: [fonte] (Google Fonts)
- Monospace/timestamps: [fonte] (Google Fonts)

Componentes de animação:
- KPI cards: fadeSlideUp com stagger de [N]ms por card
- Alertas críticos: pulse contínuo
- Status online: ping radial

Assets institucionais:
- Logo: [URL ou descrição para geração]
- Hero background: [URL ou descrição para geração]
```

**Princípio:** Usar oklch em vez de hex diretamente no Tailwind 4 evita erros de conversão. Definir animações no CSS global (não inline) garante consistência e performance.

---

### Camada 3 — Centralização de Dados

**Objetivo:** Criar uma única fonte de verdade para todos os dados, evitando duplicação e facilitando atualizações.

**Estrutura do prompt:**

```
Crie o arquivo `client/src/lib/dadosMunicipais.ts` com todos os dados
do município organizados em módulos exportados separadamente:

export const CONTRATOS = [/* array com os registros da planilha */]
export const RESUMO_CONTRATOS = { total, totalEmpenhado, execucaoMedia, fonte, dataReferencia }
export const CATEGORIAS_CONTRATOS = [/* agrupamento por categoria */]
export const DEMOGRAFICOS = { populacao, densidade, fonte }
export const SOCIOECONOMICOS = { pib, pibPerCapita, idh, fonte }
export const EDUCACAO = { escolas, matriculas, ideb, metaIdeb, fonte }
export const SAUDE = { unidades, hospitais, coberturaPSF, metaCoberturaPSF, fonte }
export const ISS = { arrecadacaoAnual, meta, percentualMeta, crescimento, fonte }
export const ISS_HISTORICO = [{ ano, valor }]
export const CAGED = { estoqueAtual, saldoMensal, admissoes, desligamentos, taxaEmprego, rankingRS, fonte }
export const CAGED_SETORES = [{ setor, estoque, participacao, saldo }]
export const CAGED_HISTORICO_2025 = [{ mes, admissoes, desligamentos, saldo }]
export const COMPARATIVO_RS = [{ cidade, populacao, pibPerCapita, idh, estoqueCAGED, saldoCAGED, issAnual, destaque? }]
export const ALERTAS = [{ tipo, titulo, descricao, valor, meta, pagina }]

Regras:
- Campo `fonte` obrigatório em cada módulo
- Campo `dataReferencia` obrigatório em cada módulo
- Campo `destaque: true` apenas para o município principal no comparativo
- Alertas com campo `pagina` para filtrar por rota
```

**Princípio:** Um único arquivo de dados permite trocar toda a base do dashboard com uma única edição. O campo `fonte` em cada módulo garante rastreabilidade automática em todos os componentes que o consomem.

---

### Camada 4 — Componentes Reutilizáveis

**Objetivo:** Construir os blocos visuais antes das páginas, garantindo consistência entre todas as seções.

**Estrutura do prompt:**

```
Crie `DashboardWidgets.tsx` com os seguintes componentes exportados:

KpiCard:
- Props: titulo, valor, subtitulo?, fonte?, icone?, tendencia?, tendenciaValor?, cor?
- Cores disponíveis: blue | green | amber | red | purple
- Animação: classe CSS `kpi-card` com fadeSlideUp
- Fonte exibida em rodapé do card com ícone Info

AlertCard:
- Props: tipo (critico | atencao | ok), titulo, descricao, valor?, meta?
- Crítico: borda vermelha + ícone pulsante
- Atenção: borda âmbar
- OK: borda verde

SectionHeader:
- Props: titulo, subtitulo?, fonte?
- Fonte exibida com FonteBadge

ExecucaoBar:
- Props: valor (0–100), meta? (padrão 60)
- Verde se ≥ 80%, âmbar se ≥ meta, vermelho se < meta

FonteBadge:
- Props: fonte
- Ícone Info + texto em cinza claro
```

**Princípio:** Construir componentes antes das páginas evita retrabalho. O sistema de cores por nome (`cor="blue"`) é mais semântico do que passar classes Tailwind diretamente, facilitando manutenção.

---

### Camada 5 — Páginas (uma por prompt)

**Objetivo:** Construir cada página de forma independente, referenciando os dados e componentes já criados.

**Estrutura do prompt por página:**

```
Crie a página `[NomePagina].tsx` usando DashboardLayout como wrapper.

Seções obrigatórias:
1. SectionHeader com titulo, subtitulo e fonte
2. Grid de KpiCards com os seguintes indicadores:
   - [indicador 1]: valor de [MODULO.campo], fonte de [MODULO.fonte]
   - [indicador 2]: ...
3. Gráfico [tipo] com dados de [MODULO_HISTORICO]:
   - Eixo X: [campo], Eixo Y: [campo]
   - Tooltip customizado mostrando [formato]
   - Fonte explícita abaixo do gráfico via FonteBadge
4. Tabela com colunas [col1, col2, col3]:
   - Filtrável por [campo]
   - Linha de destaque para [critério]
   - Rodapé com FonteBadge
5. Seção de alertas filtrando ALERTAS onde pagina === "[rota]"
6. Comparativo regional usando COMPARATIVO_RS:
   - Destacar entrada com destaque === true em azul
   - Demais entradas em cinza

Regra de cores nos gráficos:
- Município principal (destaque): #1B4F8A
- Demais municípios: #CBD5E1
```

**Princípio:** Especificar cada seção com o campo exato do módulo de dados evita que o modelo invente valores. A regra de cores no comparativo (azul/cinza) cria hierarquia visual automática.

---

### Camada 6 — Infraestrutura e Deploy

**Objetivo:** Configurar roteamento, hooks de estado e preparar para publicação.

**Estrutura do prompt:**

```
Atualize App.tsx adicionando as rotas:
- "/" → Home
- "/contratos" → Contratos
- "/indicadores" → Indicadores
- "/caged" → CAGED
Usando Switch e Route do Wouter.

Crie o hook `useRealtimeStatus.ts` com:
- useBrasiliaTime(): timestamp em tempo real no fuso America/Sao_Paulo,
  atualizado a cada 1 segundo via setInterval
- useConnectionStatus(): isOnline (navigator.onLine + eventos),
  lastSyncFormatted (formatado em pt-BR/Brasília),
  isSyncing (booleano), manualSync (callback com delay de 1.5s)

Para o deploy permanente:
- Criar checkpoint com descrição detalhada
- Orientar o usuário a clicar no botão Publish no painel
```

**Princípio:** Separar o hook de tempo em `useBrasiliaTime` e `useConnectionStatus` permite usar cada um de forma independente. O timestamp de Brasília deve ser calculado no cliente com `toLocaleString` + `timeZone: "America/Sao_Paulo"` para evitar inconsistências de servidor.

---

## Padrões de Qualidade Aplicados

### Rastreabilidade de dados
Cada dado exibido no dashboard possui um campo `fonte` explícito, exibido diretamente na interface via `FonteBadge`. Isso garante que qualquer usuário saiba a origem de cada número sem consultar documentação externa.

### Sistema de alertas por página
Os alertas são centralizados em `ALERTAS[]` com um campo `pagina` que filtra quais alertas aparecem em cada rota. Isso evita duplicação e permite gerenciar todos os alertas em um único lugar.

### Comparativo regional com destaque automático
O array `COMPARATIVO_RS` usa `destaque: true` apenas para o município principal. Todos os gráficos e tabelas de comparação usam essa flag para aplicar cor azul ao município e cinza aos demais, sem lógica condicional espalhada nos componentes.

### Horário de Brasília consistente
O timestamp é calculado uma única vez no hook `useBrasiliaTime` e consumido tanto no header quanto no footer via `DashboardLayout`. Isso elimina a possibilidade de inconsistência entre as duas exibições.

---

## Como Adaptar para Outro Município

1. **Substitua os dados** em `dadosMunicipais.ts` com os dados do novo município
2. **Atualize a paleta** em `index.css` com as cores institucionais do novo município
3. **Troque os assets** (logo e hero background) pelas imagens do novo município
4. **Ajuste os alertas** em `ALERTAS[]` com os critérios relevantes para o novo contexto
5. **Atualize `COMPARATIVO_RS`** com as cidades da região de referência

Nenhuma alteração de lógica ou estrutura de componentes é necessária.

---

## Fontes de Dados Utilizadas

| Dado | Fonte | Referência |
|---|---|---|
| Contratos e convênios | Planilha oficial — Prefeitura Municipal de Passo Fundo/RS | Julho 2025 |
| Emprego formal (CAGED) | Ministério do Trabalho e Emprego | Julho 2025 |
| Dados demográficos | IBGE — Estimativa Populacional | 2024 |
| PIB municipal e per capita | IBGE — PIB dos Municípios | 2022 |
| IDH | PNUD — Atlas do Desenvolvimento Humano | 2022 |
| Arrecadação ISS | Secretaria Municipal de Fazenda — SEFAZ/PMPF | 2024 |
| Educação (IDEB, matrículas) | INEP / Secretaria Municipal de Educação | 2023 |
| Saúde (cobertura, leitos) | DATASUS / Secretaria Municipal de Saúde | 2024 |

---

## Licença

Dados públicos conforme Lei de Acesso à Informação (Lei nº 12.527/2011).
Código-fonte disponível para uso e adaptação por outros municípios.
