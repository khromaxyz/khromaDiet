# DietForge - Metodologia de Cálculo
*Versão 1.0.0 · Data de geração automática: 2026-02-27 · Gerado a partir do estado atual do código (commit `d59230b`, 2026-02-25)*

Este documento descreve, em linguagem técnico-científica, o motor de cálculo do DietForge exatamente como implementado no código em `src/lib/engine/`. O objetivo é fornecer um artefato auditável por especialistas em fisiologia do exercício e nutrição, apto a revisão crítica, rastreio de premissas, identificação de incertezas e planejamento de melhorias iterativas do modelo.

---

## 1. Visão Geral do Pipeline

Fluxo implementado (ordem real de execução):

```text
FormData
  -> Resolução de BF (declarado/fotos/navy) ou BF estimado (Deurenberg)
  -> BMR
  -> NEAT + EAT (treino + cardio estruturado + passos residuais + ocupação)
  -> splitMacros (seed)
  -> TEF (seed)
  -> Modificadores (seed)
  -> Adaptação metabólica (kcal aditivo)
  -> splitMacros (intermediário)
  -> TEF (intermediário)
  -> Modificadores (final)
  -> TDEE estimado
  -> Substituição opcional por TDEE calibrado
  -> Meta calórica
  -> splitMacros (final)
  -> Distribuição por refeição
  -> Projeção de progresso
  -> Validações clínicas/lógicas
  -> Módulo de precisão/incerteza
```

No estado atual, o TDEE final não é calculado em uma única passagem linear. Há duas passagens internas de TEF/modificadores para estabilizar meta e macros antes do resultado final. Em termos algébricos simplificados:

\[
TDEE_{base}=BMR\times PAL + EAT_{treino}+EAT_{cardio}+EAT_{passos\_resid}+NEAT_{ocup}
\]
\[
TDEE_{raw}=TDEE_{base}+TEF
\]
\[
TDEE_{estimado}=TDEE_{raw}\times \mu_{total}+adaptacao_{kcal}
\]
\[
TDEE_{final}=
\begin{cases}
TDEE_{calibrado}, & \text{se informado e > 0}\\
TDEE_{estimado}, & \text{caso contrário}
\end{cases}
\]

### 1.1 Meta calórica (implementação atual)

Após definição do `TDEE` de referência, a meta calórica é calculada por:

\[
goalCalories = round(max(caloriesFloor,\;TDEE_{ref}\cdot (1+goalDeltaPct)))
\]

com:
- `caloriesFloor = 1200` (feminino) e `1500` (masculino).
- `goalDeltaPct` por objetivo (`GOAL_DELTA_PCT`):
  - `hard_cut`: `-0.25`
  - `mini_cut`: `-0.15`
  - `recomp`: `-0.08`
  - `maintenance`: `0`
  - `lean_bulk`: `+0.10`
  - `dirty_bulk`: `+0.18`

Regra adicional de segurança:
- se houver `eating_disorder_history` e o delta cru for menor que `-0.20`, o motor limita para `-0.20` antes da meta final.

**⚠️ Fonte não documentada — requer revisão:** tabela de `GOAL_DELTA_PCT` não possui referência bibliográfica explícita no repositório.

### 1.2 Regras de validação com impacto direto na aplicabilidade

O módulo `validateInputs` gera `issues` com severidade e `blocking`. Regras implementadas:
- erro bloqueante se `goalCalories` abaixo do piso por sexo (`1200` feminino, `1500` masculino);
- alerta se BF efetivo abaixo de limiar crítico (`<4%` masculino, `<10%` feminino);
- erro bloqueante para `hard_cut` em masculino com `BF < 8%`;
- alerta para combinação `semaglutide + dirty_bulk`;
- alerta para treino `>=7x/semana` sem hormônios ativos;
- info se diferença `>5 pp` entre BF declarado e BF Navy;
- erro bloqueante em `eating_disorder_history` quando déficit calculado excede 20%;
- alerta de baixa precisão de equações para `idade < 18`;
- erro bloqueante se projeção classificada como `inviavel` (exibe `weeksMin`);
- info quando `goalMode='weight'` (meta pode incluir variação de massa magra);
- alerta para objetivos de cut com `targetWeeks < 2`;
- info quando há `cardioMode='both'` (deduplicação aplicada).

Essas regras não reescrevem fórmulas-base, mas condicionam uso e segurança do resultado final.

---

## 2. Cálculo do BMR

### 2.1 Mifflin-St Jeor (fallback sem BF válido)

- **Equação:** Mifflin-St Jeor para REE/BMR.
- **Referência original:** Mifflin et al., 1990, *American Journal of Clinical Nutrition*.
- **Fórmula implementada:**
\[
BMR = 10\cdot peso_{kg} + 6.25\cdot altura_{cm} - 5\cdot idade + c_{sexo}
\]
onde \(c_{sexo}=5\) (masculino) e \(c_{sexo}=-161\) (feminino).
- **Condição de uso no sistema:** quando BF não é válido e não se aplica Henry.
- **População de desenvolvimento:** adultos saudáveis, incluindo não obesos e obesos.
- **Erro médio documentado:** frequentemente reportada como uma das mais robustas entre equações generalistas; validações mostram acurácia clínica limitada em nível individual.
- **Limitações conhecidas:** menor precisão em extremos de composição corporal, idades avançadas e algumas populações étnicas.
- **Decisão de implementação:** utilizada como fallback padrão por ampla adoção clínica.
- **Fidelidade ao original:** alta, com constante de sexo convertida para forma padrão moderna.

### 2.2 Katch-McArdle (rótulo quando BF válido e treino < 4 sessões)

- **Equação no código:**
\[
LBM = peso_{kg}\cdot (1-\frac{BF\%}{100})
\]
\[
BMR = 370 + 21.6\cdot LBM
\]
- **Condição de uso no sistema:** BF válido (`0 < BF < 70`) e `trainingSessions < 4`.
- **População de desenvolvimento (literatura secundária):** aplicada em contextos com massa magra conhecida.
- **Erro médio documentado:** variável por população; sem metadado de erro embutido no código.
- **Limitações conhecidas:** depende da acurácia de BF/LBM; erro de BF propaga para BMR.
- **Decisão de implementação:** favorecer equação baseada em LBM quando BF está disponível.
- **Fidelidade ao original:** a forma `370 + 21.6*LBM` é a forma operacional utilizada no motor.
- **⚠️ Fonte não documentada — requer revisão:** referência primária original da fórmula Katch-McArdle não está explicitada no repositório.

### 2.3 Cunningham (rótulo quando BF válido e treino >= 4 sessões)

- **Equação implementada (mesma da via Katch no código):**
\[
BMR = 370 + 21.6\cdot LBM
\]
- **Condição de uso no sistema:** BF válido e `trainingSessions >= 4`.
- **População de desenvolvimento (Cunningham original):** adultos com dados de massa magra.
- **Erro médio documentado:** dependente da qualidade da estimativa de LBM.
- **Limitações conhecidas:** dependência crítica da qualidade de BF.
- **Decisão de implementação:** diferenciar método exibido para perfis de maior frequência de treino.
- **📋 Divergência da literatura — ver seção de limitações:** a equação original de Cunningham (1980) é amplamente citada como \(BMR \approx 500 + 22\cdot LBM\), enquanto o motor usa \(370 + 21.6\cdot LBM\).

### 2.4 Henry (fallback étnico com BF ausente)

- **Equação:** Henry (2005), sexo e faixa etária.
- **Referência original:** Henry, 2005, *Public Health Nutrition*.
- **Fórmulas implementadas:**
  - Masculino 18-29 anos: \(BMR=15.057\cdot peso+692.2\)
  - Masculino 30-60 anos: \(BMR=11.472\cdot peso+873.1\)
  - Feminino 18-29 anos: \(BMR=14.818\cdot peso+486.6\)
  - Feminino 30-60 anos: \(BMR=8.126\cdot peso+845.6\)
- **Condição de uso no sistema:** BF ausente + etnia `asian|african|latin` + idade entre 18 e 60.
- **População de desenvolvimento:** reavaliação ampla de bases históricas de BMR para suporte FAO/WHO/UNU.
- **Erro médio documentado:** depende da subpopulação; sem RMSE/MAE fixo incorporado no motor.
- **Limitações conhecidas:** fora da faixa etária implementada retorna nulo; não cobre >60 no código atual.
- **Decisão de implementação:** tentativa de melhor aderência fora do eixo ocidental quando BF não foi informado.
- **Fidelidade ao original:** parcial (subset de faixas etárias).

### 2.5 Nota de confiança do módulo BMR

O motor retorna `confidenceNote` textual: **"Estimativa com margem de ±10%"** (string interna), sem cálculo probabilístico explícito.

---

## 3. Cálculo do NEAT

### 3.1 Multiplicadores de atividade (PAL operacional do motor)

| Nível (`ActivityLevel`) | Multiplicador |
|---|---:|
| `sedentary` | 1.20 |
| `light` | 1.375 |
| `moderate` | 1.55 |
| `very_active` | 1.725 |
| `athlete` | 1.90 |

Aplicação:
\[
activityBase = BMR \times activityMultiplier
\]

### 3.2 NEAT ocupacional aditivo

| Ocupação (`OccupationType`) | kcal/dia adicionadas |
|---|---:|
| `sedentary` | 0 |
| `mixed` | 50 |
| `active` | 150 |
| `very_active` | 300 |

Aplicação:
\[
NEAT_{ocup}=OCCUPATION\_NEAT\_KCAL[occupationType]
\]

### 3.3 Observações metodológicas

- O módulo combina um componente multiplicativo (PAL sobre BMR) com um componente aditivo ocupacional.
- `activityBase` já incorpora parcela de gasto habitual global; o termo ocupacional adiciona ajuste discreto.
- **⚠️ Fonte não documentada — requer revisão:** valores exatos de `OCCUPATION_NEAT_KCAL`.
- **📋 Divergência da literatura — ver seção de limitações:** os multiplicadores usados são pragmáticos e não equivalem diretamente às faixas PAL FAO para inferência populacional formal.

### 3.4 Limitações honestas

- Questionários de atividade e autorrelato apresentam erro substancial frente a métodos objetivos (p.ex., DLW/acelerometria), frequentemente em ordens de grandeza de **30-50%** dependendo do instrumento/população.
- A variabilidade intraindividual de NEAT é alta (ocupação, deslocamento, postura, fidgeting, rotina), reduzindo precisão individual diária.

---

## 4. Cálculo do EAT - Exercício

### 4.1 EAT de Treino

Fórmula implementada:
\[
EAT_{treino}=\frac{sessions\cdot MET_{treino}\cdot peso_{kg}\cdot duracao_{h}}{7}
\]

onde \(duracao_h = trainingDurationMin/60\).

METs implementados:

| Modalidade (`TrainingType`) | MET |
|---|---:|
| `strength` | 5.5 |
| `hiit` | 8.5 |
| `endurance` | 7.0 |

Observação: valores alinhados com ordem de magnitude do Compendium, mas mapeamento é simplificado por apenas 3 categorias.

### 4.2 EAT de Cardio e Passos

Cardio estruturado:
\[
EAT_{cardio\_estruturado}=\left(\frac{cardioMinutesPerDay}{60}\right)\cdot MET_{cardio}\cdot peso_{kg}
\]

METs implementados:

| Intensidade (`CardioIntensity`) | MET |
|---|---:|
| `low` | 4.0 |
| `moderate` | 6.0 |
| `high` | 8.0 |

Passos (residual acima do baseline):
\[
steps_{efetivos}=max(0,stepsPerDay-5000)
\]
\[
EAT_{passos\_residual}=steps_{efetivos}\cdot 0.000762\cdot peso_{kg}\cdot 0.9
\]

### 4.3 Lógica de deduplicação

- Se `cardioMode='both'`, o sistema considera:
  - cardio estruturado informado; e
  - apenas passos residuais acima de `BASELINE_STEPS=5000`.
- Racional fisiológico: reduzir dupla contagem entre deslocamento/locomoção cotidiana e sessão formal.
- Sinalização: `deduplicationApplied=true` quando coexistem cardio estruturado e passos.

### 4.4 Limitações

- MET é média populacional; gasto individual pode variar amplamente por eficiência mecânica, condicionamento, técnica e contexto térmico.
- **⚠️ Fonte não documentada — requer revisão:** coeficiente `0.000762*0.9` da conversão de passos.
- **⚠️ Fonte não documentada — requer revisão:** baseline fixo de 5000 passos para deduplicação.

---

## 5. Cálculo do TEF

Fórmula implementada:
\[
TEF = 0.25\cdot Prot_{kcal} + 0.075\cdot Carb_{kcal} + 0.015\cdot Fat_{kcal}
\]

com breakdown por macro:
- proteína: 25%
- carboidrato: 7.5%
- gordura: 1.5%

### 5.1 Fontes fisiológicas dos coeficientes

- Faixas clássicas de TEF por macro (proteína 20-30%, carboidrato 5-10%, gordura 0-3%) são coerentes com literatura de termogênese induzida pela dieta.
- O motor escolhe valores pontuais dentro dessas faixas.

### 5.2 Comparação com TEF flat 10% (análise conceitual)

Exemplos de TEF percentual resultante (aproximação):

| Cenário de macros (%kcal) | TEF dinâmico estimado | Diferença vs 10% |
|---|---:|---:|
| 35% P / 40% C / 25% G | ~12.1% | +2.1 pp |
| 30% P / 45% C / 25% G | ~11.3% | +1.3 pp |
| 20% P / 35% C / 45% G | ~8.3% | -1.7 pp |

Logo, diferença cresce quando a fração proteica se afasta da média.

### 5.3 Limitações

- O modelo não inclui modulação de TEF por resistência à insulina, frequência/refeição, horário, microbiota, fármacos ou adaptação ao déficit.
- **⚠️ Fonte não documentada — requer revisão:** comentário de código cita "Bellisle (2004)" sem referência bibliográfica completa no repositório.

---

## 6. Modificadores

No motor, modificadores são majoritariamente multiplicativos:

\[
\mu_{total}=\mu_{horm}\cdot\mu_{cond}\cdot\mu_{therm}\cdot\mu_{age}\cdot\mu_{cycle}
\]
\[
TDEE_{final\_mod}=TDEE_{raw}\cdot\mu_{total}
\]

Além disso, há ajuste aditivo separado de adaptação metabólica (kcal/dia).
### 6.1 Modificadores hormonais (quando `hormonesEnabled=true`)

Normalização de dose por composto:
\[
dose_{norm}=clamp\left(\frac{dose}{dose_{ref}},\,0.7,\,1.3\right)
\]
\[
\mu_{horm}\leftarrow\mu_{horm}\cdot\left(1+efeito\cdot dose_{norm}\right)
\]

| Modificador | Valor aplicado no motor | Fonte científica | Qualidade da evidência | Limitações |
|---|---|---|---|---|
| Testosterona exógena | `+8%` escalado por dose (`ref=300`) | Literatura de alteração de composição corporal e gasto energético (heterogênea) | Observacional/ensaios curtos | Magnitude exata do `+8%` não validada no código |
| Oxandrolona | `+5%` (`ref=140`) | Literatura clínica específica (limitada) | Baixa-moderada | Dosagem e contexto clínico variam |
| Deca (nandrolona) | `+10%` (`ref=300`) | Evidência indireta | Baixa | Sem validação de coeficiente único |
| Tren (trembolona) | `+12%` (`ref=250`) | Evidência indireta/consenso informal | Muito baixa | Forte incerteza translacional |
| GH | `+10%` (`ref=20`) | Evidência mista para composição e substrato energético | Baixa-moderada | Resposta dose-dependente e individual |
| Boldenona | sem efeito direto no cálculo (`ref=300` somente) | — | — | Cadastrado, porém não altera `muHorm` |
| Semaglutida | sem efeito direto no cálculo (`ref=3` somente) | — | — | Impacto no apetite não modelado como \(\mu\) |
| Other | sem efeito direto (`ref=100`) | — | — | Placeholder sem dinâmica |

**⚠️ Fonte não documentada — requer revisão:** tabela de `HORMONE_EFFECTS` e `HORMONE_REFERENCE_DOSES` não possui referência bibliográfica explícita no repositório.

### 6.2 Condições clínicas (`muCond`)

| Modificador | Valor aplicado | Fonte científica | Qualidade da evidência | Limitações |
|---|---|---|---|---|
| Hipotireoidismo | `×0.90` | Estudos de REE reduzido em hipotireoidismo | Moderada | Heterogeneidade por tratamento e estado tireoidiano |
| Resistência à insulina | `×0.96` | Evidência indireta (efeitos metabólicos e TEF) | Baixa-moderada | Relação causal no TDEE é variável |
| Condição inflamatória | `×0.97` | Evidência heterogênea por doença | Baixa | Algumas doenças elevam, outras reduzem gasto |
| PCOS | `×0.97` | Evidência mista para REE | Baixa | Metanálises com resultados inconsistentes |

**⚠️ Fonte não documentada — requer revisão:** coeficientes exatos de `CONDITION_EFFECTS`.

### 6.3 Termogênicos (`muTherm`)

| Modificador | Valor aplicado | Fonte científica | Qualidade da evidência | Limitações |
|---|---|---|---|---|
| Nenhum | `×1.00` | — | — | Referência neutra |
| Cafeína | `×1.04` | Ensaios clínicos de aumento agudo de EE (ordem ~3-4%) | Moderada | Habituação reduz efeito crônico |
| ECA | `×1.09` | Literatura histórica de sinergia efedrina+cafeína | Baixa-moderada | Segurança e aplicabilidade clínica limitadas |

**⚠️ Fonte não documentada — requer revisão:** escolha fixa de `+9%` para ECA no motor.

### 6.4 Idade (`muAge`)

\[
\mu_{age}=
\begin{cases}
1,& idade\leq 40\\
max(0.9,\;1-0.005\cdot(idade-40)),& idade>40
\end{cases}
\]

- Declínio linear até piso de 0.90 (aprox. a partir dos 60 anos).
- **⚠️ Fonte não documentada — requer revisão:** parametrização exata (`0.5%/ano` e piso 0.90).

### 6.5 Fase menstrual (`muCycle`)

- Aplicado apenas para sexo feminino:
  - `luteal`: `×1.03`
  - `follicular`: `×0.98`
  - `unknown`: `×1.00`

- Há suporte para pequenas variações de REE entre fases, porém magnitude é pequena e heterogênea.
- **⚠️ Fonte não documentada — requer revisão:** coeficientes fixos exatos (`+3%` e `-2%`).

### 6.6 Adaptação metabólica (ajuste aditivo em kcal)

Função `calcMetabolicAdaptation(deficitHistory, deficitSeverity)`:

| Histórico de déficit | Leve | Moderado | Agressivo |
|---|---:|---:|---:|
| `none` | 0 | 0 | 0 |
| `lt4weeks` | 0 | 0 | 0 |
| `1to3months` | -50 | -75 | -150 |
| `gt3months` | -75 | -100 | -200 |

Aplicação:
\[
TDEE_{estimado}=round(TDEE_{mod}+adaptacao_{kcal})
\]

**⚠️ Fonte não documentada — requer revisão:** tradução direta de literatura para degraus discretos de kcal não está formalmente justificada no código.

---

## 7. Split de Macronutrientes

### 7.1 Estrutura geral

\[
massBase=
\begin{cases}
LBM,& \text{se disponível}\\
peso,& \text{caso contrário}
\end{cases}
\]
\[
deficitRatio=max\left(0,\frac{tdee-caloriesTarget}{tdee}\right)
\]

Proteína inicial:
\[
proteinG = clamp(massBase\cdot proteinMultiplier,\;proteinFloor,\;proteinCeiling)
\]

Gordura inicial:
\[
fatG = clamp\left(\frac{caloriesTarget\cdot fatPct}{9},\;fatFloor,\;fatCeiling\right)
\]

Carboidrato residual:
\[
carbsG = \frac{caloriesTarget - 4\cdot proteinG - 9\cdot fatG}{4}
\]

### 7.2 Targets de proteína por objetivo (implementação literal)

| Objetivo | Tier leve | Tier moderado | Tier agressivo | Base fixa |
|---|---:|---:|---:|---:|
| `hard_cut` | 2.4 | 2.7 | 3.1 | — |
| `mini_cut` | 2.3 | 2.4 | 2.7 | — |
| `recomp` | — | — | — | 2.5 |
| `maintenance` | — | — | — | 1.8 |
| `lean_bulk` | — | — | — | 2.0 |
| `dirty_bulk` | — | — | — | 1.8 |

Tier de déficit:
- `deficit_aggressive` se `deficitRatio > 0.25`
- `deficit_moderate` se `0.20 <= deficitRatio <= 0.25`
- `deficit_light` caso contrário

### 7.3 Floors e ceilings (exatos do código)

Proteína:
- `proteinFloor = 1.6 * pesoKg`
- `proteinCeiling = 3.2 * pesoKg` para cut (`hard_cut|mini_cut`), senão `2.8 * pesoKg`

Gordura:
- `fatPct`: 0.22 (cut), 0.28 (bulk), 0.25 (outros)
- `fatFloor = max(0.6 * pesoKg, 40)`
- `fatCeiling = max(1.4 * pesoKg, 95)`

Carboidrato:
- `carbFloor = 2.0*pesoKg` se treino >=5; `1.5*pesoKg` se treino >=3; senão `1.0*pesoKg`
- `carbCeiling = 3.2*pesoKg` se resistência à insulina; senão `6.0*pesoKg`

### 7.4 Realocação quando carbo sai dos limites

Se `carbsG < carbFloor`:
1. reduz gordura até `fatFloor` para liberar kcal;
2. se necessário, reduz proteína até `proteinFloor`;
3. recalcula carbo residual.

Se `carbsG > carbCeiling`:
1. aumenta gordura até `fatCeiling` absorvendo excesso;
2. se necessário, aumenta proteína até `proteinCeiling`;
3. recalcula carbo residual.

### 7.5 Pós-processamento

- Arredondamento final (`round`) de macros.
- Recomputação de carbo pelo residual calórico.
- Se carbo final negativo: força carbo a 0 e recalcula gordura residual.

### 7.6 Distribuição por refeição

- Número de refeições: `clamp(round(mealsPerDay), 2, 7)`.
- Distribuição base igualitária com ajustes pré/pós-treino:
  - **Não em jejum:** carbo `+0.12` pré, `+0.20` pós; proteína `+0.06` pré, `+0.14` pós.
  - **Treino em jejum:** carbo `+0.05` pré, `+0.32` pós; proteína `+0.04` pré, `+0.20` pós.
  - Gorduras: `-0.06` pré e `-0.04` pós.
- Shares são normalizados e a última refeição recebe ajuste de fechamento para soma exata.

### 7.7 Limitações

- Targets de proteína, floors e ceilings são heurísticos operacionalizados para decisão automatizada.
- O modelo não captura preferência alimentar, custo, cultura, tolerância gastrointestinal ou adesão real.
- **⚠️ Fonte não documentada — requer revisão:** tabela exata de targets e limites no código.

---

## 8. Projeção de Progresso

### 8.1 Conversão da meta em gordura-alvo

Função `resolveTargetFatKg`:

- `goalMode='weight'`: \(targetFatKg = pesoAtual - targetWeightKg\)
  - `warningTargetWeightIncludesLbm = true`.
- `goalMode='bf'`: \(targetFatKg = peso\cdot (BF_{atual}-BF_{alvo})/100\)
- `goalMode='fat_kg'`: usa `targetFatKg` direto.

Sem `weeks` válido ou sem meta resolvida, projeção retorna `null`.

### 8.2 Fórmulas principais

\[
requiredDailyDelta = \frac{targetFatKg\cdot 7700}{weeks\cdot 7}
\]
\[
actualDailyDelta = tdee - caloriesTarget
\]

Por marco semanal:
\[
adaptationFactor(week)=max(0.85,\;1-0.005\cdot \lfloor week/4 \rfloor)
\]
\[
fatLostKg(week)=\left(\frac{actualDailyDelta\cdot 7\cdot week}{7700}\right)\cdot adaptationFactor
\]
\[
weightAtWeek = weight_{inicial} - fatLostKg
\]

### 8.3 Classificação de viabilidade

Se objetivo é cut (`hard_cut|mini_cut|recomp`):
- `realista`: \(|requiredDailyDelta| <= 500\) (sem hormônios) ou `<=750` (com hormônios)
- `agressivo`: até `750` (sem hormônios) ou `1000` (com hormônios)
- acima disso: `inviavel`

Se objetivo não é cut:
- `realista`: `<=350`
- `agressivo`: `<=500`
- acima: `inviavel`

Para `inviavel`:
\[
weeksMin = \left\lceil\frac{|targetFatKg|\cdot 7700}{aggressiveLimit\cdot 7}\right\rceil
\]

### 8.4 Refeed

- `hard_cut`: semanas 5,10,15,...
- `mini_cut`: semanas 7,14,21,...
- Demais objetivos: sem refeed programado.

**⚠️ Fonte não documentada — requer revisão:** cadências de refeed e thresholds de classificação.

### 8.5 Limitações

- Usa 7700 kcal/kg fixo na projeção principal.
- Assume dinâmica centrada em gordura, não compartimentaliza água/glicogênio.
- Fator de adaptação semanal é simplificação linear por blocos.
- **📋 Divergência da literatura — ver seção de limitações:** modelos dinâmicos contemporâneos indicam densidade energética variável e adaptação não linear mais complexa.

---

## 9. Intervalo de Confiança e Incerteza

### 9.1 Incerteza implementada no motor (heurística)

Com `precisionPct`:

\[
weightedModelTdee = round(tdeeFinal + (100-precisionPct)\cdot 3.2)
\]
\[
difference = |weightedModelTdee - tdeeFinal|
\]
\[
bandSpan = round(max(80,\;(100-precisionPct)\cdot 6))
\]
\[
lower=tdeeFinal-bandSpan,\quad upper=tdeeFinal+bandSpan
\]
\[
showBand = (difference > 150)
\]

Campos ausentes (W01..W19) são listados como `missingFields`.

Além disso, o objeto de resultado expõe `confidenceInterval = tdeeEstimated ± 250 kcal`.

### 9.2 Propagação de erro (análise científica recomendada para auditoria)

O código não implementa propagação formal de incerteza por derivadas parciais. Para auditoria fisiológica, a forma recomendada é:

\[
\sigma_{TDEE}^2 \approx \sum_i \left(\frac{\partial TDEE}{\partial x_i}\right)^2 \sigma_{x_i}^2
\]

com \(x_i\) incluindo BMR, atividade, treino, cardio, passos, TEF e modificadores.

Essa seção é analítica e não executada pelo motor.

### 9.3 Comparação com literatura

- DLW é padrão-ouro para TEE em vida livre, com precisão típica reportada na faixa de poucos pontos percentuais em protocolos adequados.
- Autorrelatos (atividade e ingestão) exibem viés substancial, com discrepâncias frequentemente relevantes em validações contra métodos objetivos.
- Portanto, a banda heurística do app deve ser interpretada como alerta operacional, não intervalo de confiança estatístico rigoroso.

### 9.4 Calibração por retroalimentação de peso

Módulo `calcRealTDEE`:

\[
TDEE_{real}= intake_{medio} + \frac{\Delta peso_{kg}\cdot coeff}{weeks\cdot 7}
\]

com:
- `coeff=4750` se `weeks<=4`
- `coeff=6000` se `4<weeks<=12`
- `coeff=7000` se `weeks>12`

Na interface, a calibração é habilitada após ~14 dias (`daysSinceStart >= 14`), visando reduzir incerteza após observação longitudinal.

**⚠️ Fonte não documentada — requer revisão:** racional exato dos coeficientes 4750/6000/7000 no código.

---

## 10. Variáveis Coletadas e Pesos no Modelo

### 10.1 Variáveis do questionário (`FormData`)

| Variável | Obrigatória | Impacto no resultado | Componente afetado | Fonte do peso |
|---|---|---|---|---|
| `goal` | Sim | Alto | Meta calórica, macros, projeção | `W01` |
| `sex` | Sim | Alto | BMR, pisos de segurança, ciclo | `W02` |
| `age` | Sim | Médio-Alto | BMR, `muAge` | `W03` |
| `weightKg` | Sim | Alto | BMR, EAT, macros, projeção | `W04` |
| `heightCm` | Sim | Médio-Alto | BMR, Navy, Deurenberg | `W05` |
| `bodyFatMode` | Sim | Médio | Seleção da fonte de BF | `W06` |
| `bodyFatDeclaredPct` | Condicional | Alto (quando presente) | BMR LBM, projeção | `W06` |
| `bodyFatPhotoPresetPct` | Condicional | Médio | BF efetivo | `W06` |
| `navyNeckCm` | Condicional | Médio | BF Navy | `W06` |
| `navyWaistCm` | Condicional | Médio | BF Navy | `W06` |
| `navyHipCm` | Condicional (feminino) | Médio | BF Navy | `W06` |
| `bfDecision` | Não | Baixo-Médio | Conciliação declarado vs Navy | `W06` |
| `activityLevel` | Sim | Alto | `activityBase` | `W07` |
| `trainingSessions` | Sim | Alto | EAT treino, macro floors, método BMR rotulado | `W08` |
| `trainingType` | Sim | Médio | MET treino | `W08` |
| `trainingDurationMin` | Sim | Alto | EAT treino | `W08` |
| `cardioMode` | Sim | Médio-Alto | EAT cardio e deduplicação | `W09` |
| `stepsPerDay` | Condicional | Médio-Alto | EAT passos residual | `W09` |
| `cardioMinutesPerDay` | Condicional | Médio-Alto | EAT cardio estruturado | `W09` |
| `cardioModality` | Sim | Baixo (no motor atual) | UI/rotulagem | — |
| `cardioIntensity` | Sim | Médio | MET cardio | `W09` |
| `hormonesEnabled` | Sim | Médio-Alto | ativação de `muHorm` | `W10` |
| `hormones[]` | Condicional | Médio-Alto | `muHorm` e validações | `W10` |
| `cyclePhase` | Sim | Baixo (no motor atual) | não impacta cálculo energético | — |
| `occupationType` | Não | Médio | NEAT ocupacional | `W15` |
| `deficitHistory` | Não | Médio | adaptação metabólica | `W16` |
| `deficitSeverity` | Condicional | Médio | adaptação metabólica | `W17` |
| `menstrualPhase` | Não/condicional | Baixo-Médio | `muCycle` | `W18` |
| `ethnicity` | Não | Baixo-Médio | gate para Henry | `W19` |
| `calibratedTdeeKcal` | Não | Alto (quando usado) | substitui `tdeeEstimated` | — |
| `healthConditions[]` | Sim | Médio-Alto | `muCond`, validações, carb ceiling IR | `W11` |
| `thermogenic` | Sim | Médio | `muTherm` | `W12` |
| `mealsPerDay` | Sim | Médio | distribuição por refeição | `W13` |
| `fastedTraining` | Sim | Baixo-Médio | distribuição refeição pré/pós | `W13` |
| `plantBasedStrict` | Sim | Baixo (energia), médio (suplementação) | sugestões de suplementos | `W13` |
| `goalMode` | Sim | Médio-Alto | resolução da meta de projeção | `W14` |
| `targetWeightKg` | Condicional | Médio-Alto | projeção (`goalMode=weight`) | `W14` |
| `targetBodyFatPct` | Condicional | Médio-Alto | projeção (`goalMode=bf`) | `W14` |
| `targetFatKg` | Condicional | Médio-Alto | projeção (`goalMode=fat_kg`) | `W14` |
| `targetWeeks` | Condicional | Alto | projeção/viabilidade | `W14` |

### 10.2 Pesos-base de precisão (`BASE_PRECISION_WEIGHTS`)

| Código | Campo | Peso base |
|---|---|---:|
| W01 | objetivo | 0.07 |
| W02 | sexo biológico | 0.04 |
| W03 | idade | 0.05 |
| W04 | peso | 0.08 |
| W05 | altura | 0.05 |
| W06 | body fat | 0.13 |
| W07 | atividade | 0.07 |
| W08 | treino | 0.07 |
| W09 | cardio/passos | 0.07 |
| W10 | hormônios | 0.06 |
| W11 | saúde | 0.08 |
| W12 | termogênicos | 0.04 |
| W13 | refeições | 0.04 |
| W14 | meta e prazo | 0.05 |
| W15 | ocupação profissional | 0.02 |
| W16 | histórico de déficit | 0.02 |
| W17 | severidade do déficit | 0.02 |
| W18 | fase menstrual | 0.02 |
| W19 | origem étnica | 0.02 |

### 10.3 Renormalização quando há ausência de dados

Com conjunto de variáveis presentes \(P\):

\[
presentWeights = \sum_{i\in P} w_i
\]
\[
normalizedWeight_i =
\begin{cases}
\frac{w_i}{presentWeights}, & i\in P\\
0, & i\notin P
\end{cases}
\]
\[
precisionPct = round(100\cdot presentWeights)
\]

Esse módulo afeta exibição de precisão e banda heurística de incerteza; não reparametriza fórmulas fisiológicas internas.

---

## 11. Limitações Gerais e Premissas do Modelo

1. O motor assume estado quase-estacionário e não modela flutuações diárias de água/glicogênio.
2. METs são médias populacionais; resposta individual pode divergir materialmente.
3. O modelo usa autorrelato de atividade e ingestão em partes do fluxo, com viés conhecido.
4. A deduplicação de passos/cardio usa baseline fixo de 5000 passos (heurístico).
5. Vários coeficientes críticos (hormônios, condições, termogênicos, idade, ciclo) são parametrizações de engenharia e não metanálises formais.
6. O rótulo `cunningham` utiliza a mesma equação numérica da via `katch_mcardle`.
7. A seleção de Henry por etnia é simplificada e categórica, não probabilística.
8. A projeção usa 7700 kcal/kg fixo, apesar de literatura dinâmica sugerir variabilidade temporal/composicional.
9. A classificação realista/agressivo/inviável é baseada em limiares discretos internos.
10. Cadência de refeed (5/7 semanas) é regra fixa, não protocolo personalizado por resposta.
11. O split de macros não incorpora micronutrientes, fibra, sódio, palatabilidade, custo ou cultura alimentar.
12. O timing nutricional é simplificado para distribuição percentual de refeições.
13. O módulo de incerteza principal é heurístico; não representa intervalo bayesiano/frequentista formal.
14. A calibração depende de aderência estimada, que também é autorreferida.
15. O modelo não incorpora genética metabólica (p.ex., UCP1/ACTN3), microbioma ou cronobiologia de alto detalhe.
16. Em condições clínicas complexas, os multiplicadores podem subestimar ou superestimar gasto real.
17. A heterogeneidade de respostas a cafeína/ECA e hormônios exógenos não é modelada.
18. Dados ausentes podem elevar incerteza mesmo com aparência de precisão operacional.
19. Algumas mensagens de validação bloqueiam metas por regras de segurança fixas, não por avaliação clínica completa.
20. O motor é uma ferramenta de estimativa e priorização, não substitui calorimetria indireta e acompanhamento clínico.

---

## 12. Referências

Mifflin, M.D., St Jeor, S.T., Hill, L.A., Scott, B.J., Daugherty, S.A., Koh, Y.O. (1990). A new predictive equation for resting energy expenditure in healthy individuals. *American Journal of Clinical Nutrition*, 51(2), 241-247. https://doi.org/10.1093/ajcn/51.2.241

Cunningham, J.J. (1980). A reanalysis of the factors influencing basal metabolic rate in normal adults. *American Journal of Clinical Nutrition*, 33(11), 2372-2374. https://doi.org/10.1093/ajcn/33.11.2372

Henry, C.J.K. (2005). Basal metabolic rate studies in humans: measurement and development of new equations. *Public Health Nutrition*, 8(7A), 1133-1152. https://doi.org/10.1079/PHN2005801

Frankenfield, D., Roth-Yousey, L., Compher, C. (2005). Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review. *Journal of the American Dietetic Association*, 105(5), 775-789. https://doi.org/10.1016/j.jada.2005.02.005

Deurenberg, P., Weststrate, J.A., Seidell, J.C. (1991). Body mass index as a measure of body fatness: age- and sex-specific prediction formulas. *British Journal of Nutrition*, 65(2), 105-114. https://doi.org/10.1079/BJN19910073

Hodgdon, J.A., Beckett, M.B. (1984). Prediction of percent body fat for U.S. Navy men from body circumferences and height. *Naval Health Research Center Report* 84-11.

Ainsworth, B.E., Haskell, W.L., Herrmann, S.D., et al. (2011). 2011 Compendium of Physical Activities: a second update of codes and MET values. *Medicine & Science in Sports & Exercise*, 43(8), 1575-1581. https://doi.org/10.1249/MSS.0b013e31821ece12

Westerterp, K.R. (2004). Diet induced thermogenesis. *Nutrition & Metabolism*, 1, 5. https://doi.org/10.1186/1743-7075-1-5

Tappy, L. (1996). Thermic effect of food and sympathetic nervous system activity in humans. *Reproduction Nutrition Development*, 36(4), 391-397. https://doi.org/10.1051/rnd:19960405

Dulloo, A.G., Geissler, C.A., Horton, T., Collins, A., Miller, D.S. (1989). Normal caffeine consumption: influence on thermogenesis and daily energy expenditure in lean and postobese human volunteers. *American Journal of Clinical Nutrition*, 49(1), 44-50. https://doi.org/10.1093/ajcn/49.1.44

Daly, P.A., Krieger, D.R., Dulloo, A.G., Young, J.B., Landsberg, L. (1993). Ephedrine, caffeine and aspirin: safety and efficacy for treatment of human obesity. *International Journal of Obesity and Related Metabolic Disorders*, 17(Suppl 1), S73-S78.

Heinitz, S., Hollstein, T., Ando, T., et al. (2020). Early adaptive thermogenesis is a determinant of weight loss after six weeks of caloric restriction in overweight subjects. *Metabolism*, 110, 154303. https://doi.org/10.1016/j.metabol.2020.154303

Nunes, C.L., Jesus, F., Francisco, R., et al. (2022). Effects of a 4-month active weight loss phase followed by weight loss maintenance on adaptive thermogenesis in resting energy expenditure in former elite athletes. *European Journal of Nutrition*, 61(8), 4121-4133. https://doi.org/10.1007/s00394-022-02951-7

Wishnofsky, M. (1958). Caloric equivalents of gained or lost weight. *American Journal of Clinical Nutrition*, 6(5), 542-546. https://doi.org/10.1093/ajcn/6.5.542

Hall, K.D. (2008). What is the required energy deficit per unit weight loss? *International Journal of Obesity*, 32(3), 573-576. https://doi.org/10.1038/sj.ijo.0803720

Hall, K.D., Sacks, G., Chandramohan, D., et al. (2011). Quantification of the effect of energy imbalance on bodyweight. *The Lancet*, 378(9793), 826-837. https://doi.org/10.1016/S0140-6736(11)60812-X

Thomas, D.M., Ivanescu, A.E., Martin, C.K., et al. (2015). Predicting successful long-term weight loss from short-term weight-loss outcomes: new insights from a dynamic energy balance model. *American Journal of Clinical Nutrition*, 101(3), 449-454. https://doi.org/10.3945/ajcn.114.091520

Shook, R.P., Hand, G.A., O'Connor, D.P., et al. (2020). The effect of exercise training on total daily energy expenditure and body composition in weight-stable adults: a randomized, controlled trial. *Journal of Physical Activity and Health*, 17(4), 456-463. https://doi.org/10.1123/jpah.2019-0415

Schoeller, D.A. (1988). Measurement of energy expenditure in free-living humans by using doubly labeled water. *Journal of Nutrition*, 118(11), 1278-1289. https://doi.org/10.1093/jn/118.11.1278

Levine, J.A., Eberhardt, N.L., Jensen, M.D. (1999). Role of nonexercise activity thermogenesis in resistance to fat gain in humans. *Science*, 283(5399), 212-214. https://doi.org/10.1126/science.283.5399.212

Donahoo, W.T., Levine, J.A., Melanson, E.L. (2004). Variability in energy expenditure and its components. *Current Opinion in Clinical Nutrition and Metabolic Care*, 7(6), 599-605. https://doi.org/10.1097/00075197-200411000-00003

Prince, S.A., Adamo, K.B., Hamel, M.E., Hardt, J., Connor Gorber, S., Tremblay, M. (2008). A comparison of direct versus self-report measures for assessing physical activity in adults: a systematic review. *International Journal of Behavioral Nutrition and Physical Activity*, 5, 56. https://doi.org/10.1186/1479-5868-5-56

Subar, A.F., Kipnis, V., Troiano, R.P., et al. (2003). Using intake biomarkers to evaluate the extent of dietary misreporting in a large sample of adults: the OPEN study. *American Journal of Epidemiology*, 158(1), 1-13. https://doi.org/10.1093/aje/kwg092

Solomon, S.J., Kurzer, M.S., Calloway, D.H. (1982). Menstrual cycle and basal metabolic rate in women. *American Journal of Clinical Nutrition*, 36(4), 611-616. https://doi.org/10.1093/ajcn/36.4.611

McNeil, J., Doucet, E. (2020). Effect of menstrual cycle and phase on resting metabolism: a systematic review and meta-analysis. *PLOS ONE*, 15(7), e0236025. https://doi.org/10.1371/journal.pone.0236025

Helms, E.R., Aragon, A.A., Fitschen, P.J. (2014). Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation. *Journal of the International Society of Sports Nutrition*, 11, 20. https://doi.org/10.1186/1550-2783-11-20

Jäger, R., Kerksick, C.M., Campbell, B.I., et al. (2017). International Society of Sports Nutrition Position Stand: protein and exercise. *Journal of the International Society of Sports Nutrition*, 14, 20. https://doi.org/10.1186/s12970-017-0177-8

Longland, T.M., Oikawa, S.Y., Mitchell, C.J., Devries, M.C., Phillips, S.M. (2016). Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. *American Journal of Clinical Nutrition*, 103(3), 738-746. https://doi.org/10.3945/ajcn.115.119339

---

## 13. Histórico de Versões

| Versão | Data | Base de código | Mudanças relevantes no motor |
|---|---|---|---|
| 1.0.0 | 2026-02-27 | `d59230b` (2026-02-25) | Documento inicial; consolidação do pipeline atual (BMR multi-estratégia, NEAT/EAT, TEF dinâmico, modificadores, adaptação metabólica, macros, projeção, incerteza e calibração). |

Observação: não há histórico anterior de versões metodológicas formalizado no repositório atual.
