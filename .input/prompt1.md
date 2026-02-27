

Crie um arquivo `METHODOLOGY.md` em .output documentando **todo o motor de cálculo do DietForge** com profundidade científica. Este documento será enviado para revisão por um pesquisador especialista em fisiologia do exercício e nutrição, que irá criticar cada decisão metodológica e sugerir melhorias. Por isso, o documento deve ser honesto sobre limitações, incertezas e simplificações — não é material de marketing, é documentação técnico-científica.

---

**ESTRUTURA OBRIGATÓRIA DO DOCUMENTO**

---

**# DietForge — Metodologia de Cálculo**
*Versão X.X · Data de geração automática · Gerado a partir do estado atual do código*

Parágrafo de abertura explicando o objetivo do documento: ser um artefato vivo que acompanha o motor de cálculo, auditável por qualquer especialista, e usado como base para ciclos de melhoria contínua.

---

**## 1. Visão Geral do Pipeline**

Diagrama em texto (ASCII ou Mermaid) mostrando o fluxo completo:

```
FormData → BMR → NEAT → EAT (treino + cardio) → TEF → Modificadores → TDEE → Meta Calórica → Split de Macros → Distribuição por Refeição
```

Breve parágrafo explicando que cada componente é calculado sequencialmente e que o TDEE final é a soma de todos os componentes multiplicada pelos modificadores.

---

**## 2. Cálculo do BMR**

Para cada fórmula implementada, documentar:

- **Nome completo da equação** e referência original (autor, ano, journal)
- **Fórmula matemática** em notação clara com todas as variáveis definidas
- **Condição de uso** — quando o sistema seleciona essa fórmula em vez das outras
- **População de desenvolvimento** — em quem a equação foi validada originalmente
- **Erro médio documentado** — RMSE ou MAE vs. calorimetria indireta, se disponível
- **Limitações conhecidas** — subpopulações onde a fórmula performa pior
- **Decisão de implementação** — por que foi escolhida para esse caso de uso específico

Cobrir: Mifflin-St Jeor, Katch-McArdle, Cunningham, Henry. Para cada uma, ser explícito se a implementação atual segue exatamente a fórmula original ou se há adaptações.

---

**## 3. Cálculo do NEAT**

Documentar o método de multiplicadores PAL usado:

- Tabela com cada nível de atividade, seu multiplicador, a fonte científica e o PAL médio real documentado para aquele perfil
- Explicar o componente de NEAT ocupacional adicionado (se implementado) com fonte
- **Limitações honestas:** erro documentado do método PAL vs. DLW (água duplamente marcada), que é o padrão-ouro. Incluir o número: questionários de auto-relato têm 30–50% de erro
- Qual é a variabilidade intra-individual do NEAT e por que isso torna qualquer estimativa imprecisa

---

**## 4. Cálculo do EAT — Exercício**

**4.1 EAT de Treino**
- Fórmula usada: `MET × peso × duração_horas / 7`
- Tabela de valores MET por modalidade de treino com fonte (Compendium of Physical Activities ou equivalente)
- Limitações: MET é uma média populacional, o gasto real varia 20–40% por condicionamento individual

**4.2 EAT de Cardio e Passos**
- Fórmula para cardio estruturado
- Fórmula para conversão de passos em kcal (`steps × 0.000762 × peso × 0.9` ou equivalente atual)
- **Lógica de deduplicação** — explicar por que e como passos e cardio estruturado são deduplicados, com o raciocínio fisiológico

---

**## 5. Cálculo do TEF**

Documentar a fórmula de TEF dinâmico implementada:

- Fórmula completa com coeficientes por macronutriente
- Fonte de cada coeficiente (TEF de proteína: 20–30%, carboidrato: 5–10%, gordura: 0–3%)
- Comparação entre o TEF flat de 10% anterior e o TEF dinâmico atual — em que cenários a diferença é maior
- Limitações: fatores individuais que afetam TEF (resistência à insulina, frequência de refeições, tamanho das refeições) que não são capturados

---

**## 6. Modificadores**

Para **cada modificador implementado**, documentar em tabela:

| Modificador | Valor aplicado | Fonte científica | Qualidade da evidência | Limitações |
|---|---|---|---|---|
| Testosterona exógena | +X% | Autor, ano | RCT / Observacional / Consenso | ... |
| Oxandrolona | +X% | ... | ... | ... |
| ... | ... | ... | ... | ... |
| Hipotireoidismo | ×0.90 | ... | ... | ... |
| Cafeína | +4% | ... | ... | ... |
| Adaptação metabólica (déficit leve, 1-3 meses) | -75 kcal | Heinitz 2020 | RCT | ... |
| ... | ... | ... | ... | ... |

Ser honesto quando um modificador é baseado em evidência fraca ou em consenso de especialistas sem RCT robusto.

---

**## 7. Split de Macronutrientes**

- Tabela com targets de proteína por objetivo em g/kg LBM, com fonte para cada valor
- Explicar a lógica de escalonamento por magnitude do déficit (se implementado)
- Fórmula de cálculo de gordura e carboidratos como residual
- Floors e ceilings aplicados e justificativa fisiológica para cada um
- Limitações: preferências alimentares, restrições dietéticas e aderência não são capturadas no modelo

---

**## 8. Projeção de Progresso**

- Fórmula de conversão de déficit calórico em perda de peso por semana
- Coeficiente energético usado (kcal/kg de tecido perdido) e como ele varia ao longo do tempo
- Modelo de adaptação metabólica progressiva na projeção — fórmula de `fator_adaptacao(n)`
- Lógica de classificação realista/agressivo/inviável — thresholds e fonte
- Lógica de semanas de refeed — quando são sugeridas e por quê

---

**## 9. Intervalo de Confiança e Incerteza**

Seção dedicada à honestidade científica do modelo:

- Fontes de erro em cada componente do pipeline
- Erro combinado estimado do TDEE final (propagação de erro)
- Comparação com erro real documentado na literatura para métodos similares
- Como o módulo de calibração por retroalimentação de peso reduz essa incerteza após 2–3 semanas

---

**## 10. Variáveis Coletadas e Pesos no Modelo**

Tabela de todas as variáveis do questionário:

| Variável | Obrigatória | Impacto no resultado | Componente afetado | Fonte do peso |
|---|---|---|---|---|
| Sexo biológico | Sim | Alto | BMR, floors de segurança | Mifflin-St Jeor |
| Peso (kg) | Sim | Alto | BMR, EAT, proteína | Múltiplas |
| ... | ... | ... | ... | ... |
| Histórico de déficit | Não | Médio | Adaptação metabólica | Heinitz 2020 |
| Fase do ciclo menstrual | Não | Baixo-Médio | Modificador TDEE | Literatura citada |

---

**## 11. Limitações Gerais e Premissas do Modelo**

Lista numerada de todas as simplificações e premissas feitas, sendo completamente honesto:

1. O modelo assume estado estacionário — não captura flutuações dia a dia
2. Todos os valores de MET são médias populacionais — erro individual pode ser de 20–40%
3. O split de macros não considera timing, apenas totais diários
4. Hormônios exógenos têm evidência de qualidade variável — os modificadores são estimativas
5. O modelo não captura variação genética no metabolismo (ex: polimorfismos de UCP1, ACTN3)
6. Continuar listando cada limitação real identificada no código

---

**## 12. Referências**

Lista completa de todas as fontes científicas citadas no documento, em formato:

> Autor, A.B., Autor, C.D. (Ano). Título do estudo. *Journal*, volume(número), páginas. DOI se disponível.

---

**## 13. Histórico de Versões**

Tabela de versões do motor de cálculo com o que mudou em cada iteração, para rastrear a evolução do modelo ao longo dos ciclos de melhoria.

---

**INSTRUÇÕES DE GERAÇÃO**

Ao criar o arquivo:

1. **Ler o código atual** de todos os arquivos em `src/lib/engine/` antes de escrever qualquer linha — o documento deve refletir o que está implementado, não o que deveria estar
2. **Extrair os valores exatos** usados no código (coeficientes, multiplicadores, thresholds) e documentá-los fielmente
3. **Identificar e documentar explicitamente** qualquer valor no código que não tenha fonte científica clara — marcar com `⚠️ Fonte não documentada — requer revisão`
4. **Identificar discrepâncias** entre o que a literatura recomenda e o que está implementado — marcar com `📋 Divergência da literatura — ver seção de limitações`
5. O tom deve ser de paper científico, não de documentação de software — terceira pessoa, linguagem técnica, honestidade sobre incertezas

O arquivo final deve ser suficientemente detalhado para que um fisiologista do exercício sem acesso ao código consiga entender exatamente como cada número é calculado, questionar cada decisão metodológica e propor melhorias específicas.