# PromptForge — Princípios de Prompt Engineering pra Design

Destilado de testes e iterações. Estes princípios guiam como o PromptForge
monta prompts e devem ser consultados sempre que a skill for atualizada.

---

## Princípio 1: A IA espelha o tom do input

Se o prompt é burocrático (bullet points, headers, MUST/NEVER), o output é
burocrático. Se o prompt é criativo e entusiasmado, o output é criativo.

**Na prática:** Escrever prompts como se estivesse descrevendo o projeto pra
alguém que você admira e quer impressionar. Entusiasmo é um sinal — diz pro
modelo que o projeto importa e merece atenção.

Ruim: "REQUISITO: Implementar hero screen com headline, subheadline, CTA."
Bom: "Preciso que você crie a hero do meu projeto — é a primeira coisa que
qualquer pessoa vê, e quero que seja inesquecível."

## Princípio 2: Conceito > Spec

Descrever O QUE quer sentir, não COMO implementar. A IA toma melhores decisões
estéticas quando entende a intenção do que quando segue specs rígidas.

Ruim: "border-radius: 14px, box-shadow: 0 4px 12px rgba(0,0,0,0.5)"
Bom: "cards com acabamento vítreo, como vidro fosco espesso ao toque"

A exceção: dados numéricos (TDEE, macros, etc.) devem ser exatos porque são
factuais, não estéticos.

## Princípio 3: Menos instrução = Mais espaço criativo

O contexto window é finito. Cada linha de instrução compete com espaço que a
IA poderia usar pra gerar código de design. Prompts de 300 palavras que descrevem
a vibe produzem resultados melhores que prompts de 3000 palavras que listam regras.

**O sweet spot:** 400-800 palavras. Suficiente pra dar direção, curto o suficiente
pra deixar espaço.

## Princípio 4: Não duplicar layers

Se a skill html-single-file já garante qualidade técnica, o prompt NÃO deve
repetir essas instruções. Duas camadas dizendo a mesma coisa sinalizam pro modelo
que "seguir regras" é prioridade sobre "criar design".

**O que html-single-file já cobre:**
- Arquivo único autocontido
- Anti-preguiça (sem "// ...", sem truncamento)
- Protocolo de continuação
- Responsividade
- Semântica HTML e acessibilidade
- Google Fonts
- Organização de código
- Qualidade de engenharia

**O que o prompt do PromptForge deve cobrir:**
- Contexto do projeto (o que é, pra quem)
- Direção visual (vibe, materialidade, referências)
- Dados e conteúdo (números reais, conceito da copy)
- Motion (nível e estilo de animação)
- Features técnicas específicas (Three.js, GSAP, particles)
- Pressão de qualidade (boost destilado)

Zero overlap.

## Princípio 5: Boost é perfume, não banho

Uma borrifada de pressão de qualidade no final do prompt é mais eficaz que
mergulhar o prompt inteiro em instruções de qualidade. A razão: modelos
respondem a intenção e tom, não a volume. "Me surpreenda" em 2 palavras é
mais potente que 100 linhas de "PROIBIDO: truncamento, abreviação, placeholder..."

**Formato ideal de boost:**
- Boost 1-2: 1-2 frases no final
- Boost 3-4: 1-2 parágrafos no final
- Boost 5: 3 parágrafos com intensidade crescente

Nunca intercalar boost com instruções técnicas. O boost vai no FINAL, como o
acorde final de uma música.

## Princípio 6: Features técnicas como desejo, não spec

Quando pede Three.js, GSAP, ou particles, descrever o EFEITO desejado, não a
implementação. A IA sabe como implementar Three.js — ela precisa saber o que
você quer VER.

Ruim: "Use THREE.OrbitControls com damping 0.05, adicione PointLight com
intensity 1.5 na posição (5, 5, 5), crie IcosahedronGeometry com detail 4..."

Bom: "Quero um orb de esmeralda flutuando — com refração interna que simula
luz atravessando uma gema real. Deve interagir sutilmente com o mouse e a
iluminação deve combinar com a paleta obsidian/esmeralda."

## Princípio 7: Dar permissão pra surpreender

A maioria dos modelos joga seguro por default — escolhe o layout mais previsível,
a fonte mais segura, a animação mais conservadora. Dar permissão explícita pra
tomar riscos criativos muda fundamentalmente o output.

Frases que desbloqueiam criatividade:
- "A composição é sua. Me mostre a SUA visão."
- "Não estou mandando wireframe porque não quero que siga layout pré-definido."
- "Confio no seu julgamento estético."
- "Faça algo que eu nunca vi antes."
- "Não jogue seguro."

## Princípio 8: Referências sensoriais > Referências visuais

"Nível Stripe" é vago — cada pessoa imagina algo diferente. "A sensação de
segurar uma pedra preciosa na mão" é universal e evoca materialidade, peso,
precisão. Referências sensoriais ativam uma camada mais profunda de criatividade
do modelo.

Bom: nomes de sites/produtos (Stripe, Linear, Apple)
Melhor: descrições sensoriais do efeito desejado ("vidro espesso ao toque",
"luz atravessando gema lapidada", "peso e precisão de lapidação")

---

## Princípio 9: Entusiasmo é um sinal

Descoberto no v4: quando o prompt demonstra entusiasmo genuíno pelo projeto
("preciso que isso seja inesquecível", "é a peça central do meu projeto"),
o modelo aloca mais "atenção criativa" ao output. Não é antropomorfismo — é
correlação observada. Prompts neutros ("crie uma hero page") geram outputs
neutros. Prompts apaixonados geram outputs com ambição.

A hipótese: o modelo foi treinado com textos humanos onde entusiasmo correlaciona
com importância. Quando o input sinaliza "isso importa", o modelo trata como
tarefa de alta prioridade internamente.

## Princípio 10: O prompt ensina pelo exemplo, não pela regra

Dizer "faça tipografia boa" não ensina nada. Descrever a tipografia que você
quer sentir ("tipografia que pesa o suficiente pra ter autoridade sem gritar")
ensina muito. A regra abstrata é ignorada; o exemplo sensorial é internalizado.

Isso vale pra tudo: motion ("transições como água, nada bouncy"), composição
("o espaço entre elementos é silêncio intencional"), cor ("branco que não é
branco — tem calor sutil").

## Princípio 11: Dar permissão de decidir é mais poderoso que dar spec

"A composição é sua" em 4 palavras é mais eficaz que 20 linhas de layout spec.
Quando o prompt diz "você decide", o modelo ativa um modo mais criativo — assume
ownership do resultado em vez de executar mecanicamente.

Frases que transferem ownership:
- "A composição é sua."
- "Escolha o que achar mais impactante."
- "Confio no seu julgamento estético."
- "Não estou mandando wireframe porque quero a SUA visão."

## Princípio 12: Formato do prompt → formato do output (mirror effect)

Confirmado com dados: quando o prompt é organizado em bullet points e headers,
o HTML gerado tende a ter layout rígido e grid-based. Quando o prompt flui em
prosa natural, o HTML tende a ter composição mais orgânica e surpreendente.

O modelo não apenas espelha o TOM — espelha a ESTRUTURA. Um prompt que flui
como narrativa gera output que flui como experiência.

---

## Anti-patterns confirmados

### Anti-pattern 1: MUST/NEVER em caps
Não funciona como esperado. A IA não fica mais obediente — fica mais rígida
e menos criativa. Usar linguagem natural assertiva em vez de caps: "quero
profundidade real" > "DEVE TER PROFUNDIDADE".

### Anti-pattern 2: Listas exaustivas de proibições
50 linhas de "NÃO faça X" consomem context que poderia ser usado pra "FAÇA Y".
Proibições devem ser máximo 1-2 frases específicas pra problemas observados,
não preventivas genéricas.

### Anti-pattern 3: Repetir instruções da skill do chat
Se a skill html-single-file já proíbe truncamento, o prompt não precisa proibir
de novo. Duplicação = sinal pro modelo de que compliance > criatividade.

### Anti-pattern 4: Dados de copy como spec
"Headline: O App calcula..." engessa. "O headline deve comunicar precisão
e personalização" liberta. Exceção: dados numéricos (TDEE, kcal, macros).
