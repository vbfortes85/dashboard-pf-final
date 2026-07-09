# Dashboard Municipal — Passo Fundo/RS

> Painel interativo premium de gestão pública com dados oficiais, comparações regionais e design institucional.

**Acesso online:** [passodash-lgxflvrb.manus.space](https://passodash-lgxflvrb.manus.space)

---

## Capturas de Tela

### Visão Geral
Hero banner institucional, KPIs principais, indicadores sociodemográficos, gráfico histórico de ISS, distribuição de contratos por categoria e painel de alertas.

![Visão Geral](https://passodash-lgxflvrb.manus.space/manus-storage/01-visao-geral_3df14263.webp)

---

### Contratos e Convênios
Tabela filtrável com 67 contratos ativos, KPIs financeiros (empenhado, pago, execução média), gráfico de distribuição por categoria e alertas de execução crítica.

![Contratos](https://passodash-lgxflvrb.manus.space/manus-storage/02-contratos_d78289f4.webp)

---

### Indicadores Municipais
Indicadores demográficos, socioeconômicos, educação, saúde e arrecadação fiscal. Inclui comparativo top 10 cidades do RS em PIB per capita e IDH.

![Indicadores](https://passodash-lgxflvrb.manus.space/manus-storage/03-indicadores_1ea02ea8.webp)

---

### CAGED — Emprego Formal
8 KPIs de emprego, gráfico combinado de admissões/desligamentos/saldo (Jan–Jul 2025), análise setorial e comparativo regional top 10 RS.

![CAGED](https://passodash-lgxflvrb.manus.space/manus-storage/04-caged_b0a4dd2b.webp)

---

## Executar Localmente

### Pré-requisitos

| Ferramenta | Versão mínima | Verificar |
|---|---|---|
| Node.js | 18.x ou superior | `node --version` |
| pnpm | 8.x ou superior | `pnpm --version` |
| Git | qualquer | `git --version` |

> **Instalar pnpm** (caso não tenha): `npm install -g pnpm`

### Passo a Passo

**1. Clonar o repositório**

```bash
git clone https://github.com/vbfortes85/dashboard-pf-final.git
cd dashboard-pf-final
```

**2. Instalar as dependências**

```bash
pnpm install
```

> O comando instalará todas as dependências listadas em `package.json`, incluindo React 19, Vite 7, Tailwind CSS 4, Recharts e shadcn/ui.

**3. Iniciar o servidor de desenvolvimento**

```bash
pnpm dev
```

O terminal exibirá:

```
  VITE v7.x.x  ready in ~500ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

**4. Build para produção** (opcional)

```bash
pnpm build
```

Os arquivos estáticos otimizados serão gerados em `client/dist/`. Para servir localmente:

```bash
pnpm preview
```

### Variáveis de Ambiente

Este projeto é **100% estático** — não requer variáveis de ambiente para rodar localmente. Todos os dados estão centralizados em:

```
client/src/lib/dadosMunicipais.ts
```

### Comandos Disponíveis

| Comando | Descrição |
|---|---|
| `pnpm dev` | Inicia o servidor de desenvolvimento com HMR na porta 3000 |
| `pnpm build` | Gera o build de produção em `client/dist/` |
| `pnpm preview` | Serve o build de produção localmente |
| `pnpm lint` | Executa o ESLint em todos os arquivos TypeScript/TSX |

### Solução de Problemas Comuns

**Porta 3000 já em uso**

```bash
# Encerrar o processo na porta 3000
npx kill-port 3000
# Ou iniciar em outra porta
pnpm dev --port 3001
```

**Erro ao instalar dependências com pnpm**

```bash
# Limpar cache e reinstalar
pnpm store prune
rm -rf node_modules
pnpm install
```

**Erro de TypeScript no editor**

```bash
# Verificar erros de tipo sem compilar
pnpm tsc --noEmit
```

**Página em branco no navegador**

Verifique se o Vite está rodando na porta correta e acesse exatamente `http://localhost:3000`. Evite usar `127.0.0.1` — pode causar problemas com o proxy de fontes do Google.

---

## Visão Geral do Projeto

Este dashboard foi construído inteiramente por meio de prompts estruturados em linguagem natural, sem escrita manual de código. O documento abaixo registra a **arquitetura de prompting** utilizada em cada etapa, servindo como referência para replicar ou adaptar o projeto a outros municípios.

---

## Stack Técnica

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | React + TypeScript | 19.x |
| Build | Vite | 7.x |
| Estilização | Tailwind CSS + shadcn/ui | 4.x |
| Gráficos | Recharts (Bar, Line, Pie, Composed) | 2.x |
| Roteamento | Wouter | 3.x |
| Tipografia | Sora + Inter + JetBrains Mono | Google Fonts |
| Hospedagem | Manus WebDev (Autoscale) | — |

---

## Estrutura de Arquivos

```
dashboard-pf-final/
├── client/
│   ├── index.html                        # Fontes Google CDN (Sora, Inter, JetBrains Mono)
│   └── src/
│       ├── App.tsx                       # Roteamento com Wouter (4 rotas)
│       ├── index.css                     # Paleta municipal oklch + animações CSS
│       ├── components/
│       │   ├── DashboardLayout.tsx       # Sidebar + Header + Footer + status conexão
│       │   └── DashboardWidgets.tsx      # KpiCard, AlertCard, ExecucaoBar, FonteBadge
│       ├── hooks/
│       │   └── useRealtimeStatus.ts      # useBrasiliaTime + useConnectionStatus
│       ├── lib/
│       │   └── dadosMunicipais.ts        # Fonte única de todos os dados municipais
│       └── pages/
│           ├── Home.tsx                  # Visão Geral
│           ├── Contratos.tsx             # Contratos e Convênios
│           ├── Indicadores.tsx           # Indicadores Municipais
│           └── CAGED.tsx                 # Emprego Formal
├── docs/
│   └── screenshots/                      # Capturas de tela das 4 páginas
├── push_to_github.sh                     # Script de automação GitHub
├── package.json
├── tsconfig.json
└── vite.config.ts
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

## Fontes de Dados

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
