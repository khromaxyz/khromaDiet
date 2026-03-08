# PromptForge — Método Científico para Otimização de Prompts

Como pensar sobre testes de prompt como um pesquisador, não como um artista.

---

## O problema epistemológico

Quando testamos prompts de design, estamos lidando com um sistema que tem:

- **Input variável** (o prompt) que controlamos
- **Processo opaco** (o modelo de linguagem) que não controlamos
- **Output subjetivo** (o HTML gerado) que avaliamos com bias humano
- **Ruído alto** (o mesmo prompt pode gerar resultados diferentes a cada execução)

Isso é fundamentalmente diferente de testar código, onde o output é determinístico.
Estamos mais perto de pesquisa em psicologia experimental do que de engenharia de
software. E precisamos tratar como tal.

---

## Framework de teste

### 1. Formulação de hipótese

Antes de qualquer teste, formular uma hipótese falsificável:

**Formato:** "Se eu mudar [variável X] de [valor A] para [valor B], mantendo tudo
mais constante, o resultado visual será [previsão específica]."

**Exemplos bons:**
- "Se eu reduzir o prompt de 1000 para 150 palavras, a criatividade do layout vai
  aumentar porque a IA tem mais espaço de contexto pra gerar código."
- "Se eu usar tom poético em vez de tom diretivo, os gradientes e transições vão
  ter mais personalidade porque a IA espelha o tom."

**Exemplos ruins (não falsificáveis):**
- "Vou testar se prompt curto é melhor" (melhor em quê?)
- "Quero ver se funciona" (funcionar = ?)

### 2. Isolamento de variáveis

**Regra de ouro: mude UMA variável por teste.**

Se você muda o tom, o tamanho, e o escopo ao mesmo tempo, não sabe qual causou
a diferença no resultado. O batch de teste deve ter:

- **Constantes:** estética (Apple Premium), skill usada (html-single-file),
  modelo (o mesmo pra todos), instrução de formato (HTML single-file)
- **Variável testada:** UMA por prompt (tom, tamanho, abertura, etc.)
- **Controle:** o prompt baseline (v4-001 com score 6.3) serve como referência

Na prática perfeita, testaríamos cada prompt 3 vezes pra medir variância. Mas
como cada teste demanda um chat e avaliação manual, vamos com N=1 por prompt
e compensamos com mais variações de variável.

### 3. Medição

**Escala de scoring (calibrada):**

| Score | Definição operacional |
|---|---|
| 1-2 | Quebrado. Não renderiza, layout destruído, ou completamente genérico. |
| 3 | Funcional mas medíocre. Parece template Bootstrap com skin. |
| 4 | OK. Cumpre o pedido mas não impressiona. Design "limpo mas esquecível". |
| 5 | Acima da média. Tem 1-2 elementos bons, mas o conjunto não coesa. |
| 6 | Bom. Direção visual clara, coesão boa. Precisa de polish pra ser final. |
| 7 | Muito bom. Impressiona na primeira abertura. 1-2 detalhes pra ajustar. |
| 8 | Excelente. Pronto pra produção com ajustes mínimos. Mostraria pra pessoas. |
| 9 | Excepcional. Melhor que 95% do que existe no Dribbble pra essa categoria. |
| 10 | Transcendente. Reação "como isso foi feito?". Portfolio piece. |

**Além do score numérico, registrar:**
- O que funcionou (específico: "a sequência de animação dos cards", não "ficou bom")
- O que não funcionou (específico: "a tipografia do headline ficou genérica")
- Surpresas (algo que não pediu mas que a IA fez e ficou bom/ruim)
- Correlação percebida com a variável testada

### 4. Análise

Após rodar o batch, organizar os dados:

```
| Prompt | Variável        | Valor testado    | Score | Delta vs baseline |
|--------|-----------------|------------------|-------|-------------------|
| P1     | Tom             | Poético          | ?     | ?                 |
| P2     | Tom             | Diretivo         | ?     | ?                 |
| P3     | Tamanho         | Ultra-curto      | ?     | ?                 |
| ...    | ...             | ...              | ?     | ?                 |
```

Perguntas a responder:
- Qual variável teve maior impacto no score?
- Existe correlação entre tamanho do prompt e score?
- O tom afeta mais que o conteúdo?
- Alguma variável não fez diferença? (Se sim, simplificar — remover da skill.)

### 5. Iteração

Baseado na análise:
1. Identificar o(s) prompt(s) com maior score
2. Formular nova hipótese: "o prompt P3 teve score 8 por causa de [variável].
   Se eu combinar [variável de P3] com [variável de P1], o resultado será
   ainda melhor?"
3. Gerar novos prompts testando COMBINAÇÕES das melhores variáveis
4. Repetir

**Critério de parada:** Quando 3 iterações consecutivas não produzem melhoria
>0.5 no score, o prompt está otimizado pra esse escopo.

---

## Armadilhas cognitivas

### Viés de confirmação
Risco: ver qualidade onde não existe porque você QUER que o novo prompt funcione.
Mitigação: definir o score ANTES de olhar os detalhes. Primeira impressão importa.

### Overfitting ao avaliador
Risco: otimizar pro SEU gosto pessoal em vez de qualidade objetiva.
Mitigação: mostrar resultados pra outra pessoa sem contexto e perguntar "qual desses
é melhor?". Se a ordem deles diverge da sua, seu scoring tem bias.

### Atribuição causal errada
Risco: "o prompt P3 foi melhor por causa do tom curto" quando na verdade foi
porque o modelo teve um run particularmente bom.
Mitigação: seria rodar cada prompt 3x, mas como isso é caro, pelo menos anotar
quando um resultado parece "sortudo" vs. "sistemático".

### Efeito halo
Risco: uma animação impressionante mascara problemas no layout e tipografia.
Mitigação: avaliar em dimensões separadas antes de dar score geral:
- Layout/composição: ?/10
- Tipografia: ?/10
- Paleta/cores: ?/10
- Motion/animação: ?/10
- Detalhe/polish: ?/10
- Score geral: média ponderada ou holístico

### Recency bias
Risco: o último prompt testado parece melhor porque ainda está fresco.
Mitigação: depois de testar todos, abrir todos os HTMLs de novo em sequência
e re-ranquear.

---

## Métricas derivadas (futuro)

Conforme o dataset de prompts testados cresce, métricas mais sofisticadas:

**Win rate por variável:** De todos os testes onde "tom poético" foi usado,
qual % teve score ≥ 7?

**Correlação tamanho × score:** Plotar scatter. Se a correlação é negativa
(prompt menor → score maior), isso confirma o princípio "menos é mais" com
dados concretos.

**Feature impact:** Quando Three.js é pedido, o score médio é X. Quando não é,
é Y. Delta = Z. Se Z > 1, Three.js é uma feature de alto impacto.

**Escopo difficulty:** Hero screens têm score médio de X. Dashboards têm Y.
Settings têm Z. Se settings consistentemente scoram mais baixo, é um escopo
que precisa de prompts mais detalhados.

---

## O meta-insight

O que estamos fazendo não é "testar prompts". Estamos fazendo reverse engineering
do espaço latente estético de um modelo de linguagem. Cada teste é uma sonda:
"se eu enviar esse sinal, qual região do espaço latente você ativa?"

Prompts com tom poético ativam representações diferentes de prompts técnicos.
O mesmo conceito ("dashboard bonito") existe em múltiplas regiões do espaço,
e a estrutura do prompt é o mecanismo de endereçamento.

O PromptForge, no limite, é um sistema de navegação pelo espaço estético da IA.
Os parâmetros (tom, boost, liberdade) são coordenadas. O objetivo é encontrar as
coordenadas que consistentemente endereçam a região de "design extraordinário".
