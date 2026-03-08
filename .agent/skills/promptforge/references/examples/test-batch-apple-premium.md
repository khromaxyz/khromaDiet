# PromptForge — Batch de Teste A/B: Apple Premium

8 prompts completos. Cada um testa UMA variável isolada pra identificar qual
estrutura de prompt produz melhor design. Copie cada bloco ```markdown``` num
chat novo com a skill html-single-file.

**Estética de todos:** Apple Premium — clean, branco, minimalista com presença,
tipografia SF Pro-like, motion orgânico, glassmorphism sutil, profundidade sem peso.

**Baseline:** test v4-001 = 6.3/10

**Como avaliar:** Abrir o HTML, dar score 1-10, anotar o que funcionou e o que não.
Depois comparar: qual variável produziu maior delta positivo?

---
---

# ══════════════════════════════════════════════════════════════
# P1 — TOM POÉTICO
# Variável testada: linguagem evocativa e sensorial vs. briefing funcional
# Escopo: Landing page de serviço de nutrição personalizada
# Hipótese: tom poético ativa camada mais profunda de criatividade
# ══════════════════════════════════════════════════════════════

```markdown
Imagine uma página que respira. Não no sentido de ter espaço — no sentido de
ter ritmo. Inhalar: o headline aparece. Exhalar: o subtítulo se acomoda. O
espaço entre os elementos não é vazio — é silêncio intencional, como a pausa
entre movimentos de uma sinfonia.

Preciso de uma landing page pra um serviço de nutrição personalizada chamado
Nourish. O produto transforma dados biométricos em planos alimentares calibrados.
Mas a página não deve parecer "saúde e fitness" — deve parecer como a Apple
apresentaria um produto de nutrição. Branco que não é branco. Cinza com alma.
Tipografia que pesa o suficiente pra ter autoridade sem gritar.

A paleta é névoa matinal: brancos com calor sutil, cinzas com profundidade,
um accent que é quase lavanda — não roxo, não azul, algo no limiar entre os
dois. O tipo de cor que você nota na segunda vez que olha, não na primeira.

Motion como água: nada abrupto, nada bouncy. Cada transição é um fluir.
Os elementos não "aparecem" — eles emergem. Os hovers não "mudam" — eles
revelam uma camada que sempre esteve ali. Scroll que parece deslizar, não
rolar. GSAP orquestrando tudo como um maestro que nunca é visto.

A página tem seções: hero com headline e CTA, seção de benefícios (3 cards
com ícones), seção de como funciona (3 steps visuais), seção de depoimentos,
e um CTA final. Mas não estou te dando um wireframe — estou te dando a alma.
A composição é sua.

Quero abrir esse arquivo e sentir que estou olhando pra algo que foi feito por
alguém que entende silêncio. Não por alguém que entende CSS. Faça algo que eu
queira mostrar pra outras pessoas não pelo que diz, mas pelo que faz sentir.
```

---
---

# ══════════════════════════════════════════════════════════════
# P2 — TOM DIRETIVO
# Variável testada: briefing autoritário e curto vs. conversacional
# Escopo: Dashboard de analytics de saúde
# Hipótese: tom de diretor criativo exigente gera output mais ambicioso
# ══════════════════════════════════════════════════════════════

```markdown
Dashboard de analytics de saúde. Nome: Pulse. Mostra métricas do corpo ao longo
do tempo — peso, composição corporal, calorias, macros, sono, hidratação.

Estética Apple. Não "inspirado na Apple" — indistinguível de algo que a Apple
lançaria. Fundo claro com profundidade real. Tipografia SF Pro com hierarquia
cirúrgica. Cards com vidro fosco que existe de verdade. Sombras que são luz,
não escuridão. Motion que parece gravidade, não código.

O layout tem: sidebar de navegação à esquerda (ícones + labels), header com
nome do usuário e período selecionado, grid principal com 6 cards de métrica,
um gráfico de linha grande mostrando peso dos últimos 90 dias, e uma seção de
insights com 3 observações geradas.

Dados fictícios mas realistas. O usuário se chama Marcus, 31 anos. Peso oscilando
entre 82-85kg nos últimos 3 meses. 2.400 kcal/dia média. 7.2h de sono. 2.1L
de água. Tendência: leve cutting, -0.3kg/semana.

Não quero hover states genéricos. Quero hover states que eu pararia pra admirar
isoladamente. Não quero animações de entrada padrão. Quero uma sequência de
revelação que parece que o dashboard está acordando.

O padrão é alto. Não me traga trabalho que eu olharia e pensaria "ok, funciona".
Me traga trabalho que eu olharia e ficaria quieto por 3 segundos antes de
dizer qualquer coisa. Esse é o padrão.
```

---
---

# ══════════════════════════════════════════════════════════════
# P3 — ULTRA-CURTO (~150 palavras)
# Variável testada: prompt mínimo — a IA preenche todos os gaps
# Escopo: Página de pricing de SaaS
# Hipótese: menos contexto = mais decisões criativas da IA = melhor resultado
# ══════════════════════════════════════════════════════════════

```markdown
Página de pricing pra um SaaS de produtividade chamado Arc. Três planos:
Free, Pro ($12/mês), Team ($29/mês por pessoa). Cada plano com 5-6 features.

Estética Apple Premium. Fundo claro. Tipografia perfeita. Motion orgânico em tudo.
Glassmorphism real nos cards. O plano Pro deve ser o visualmente dominante.

Toggle anual/mensal com desconto de 20% no anual. FAQ colapsável embaixo.
CTA "Start Free" no free, "Upgrade to Pro" no pro, "Contact Sales" no team.

Faça o melhor trabalho que você já fez. Não jogue seguro. Me surpreenda.
```

---
---

# ══════════════════════════════════════════════════════════════
# P4 — DETALHADO (~1000 palavras)
# Variável testada: prompt longo com direção precisa mas em prosa natural
# Escopo: Onboarding wizard de 4 steps
# Hipótese: detalhe em prosa natural ≠ detalhe em bullet points (pode funcionar)
# ══════════════════════════════════════════════════════════════

```markdown
Quero construir um onboarding wizard pra um app de nutrição chamado Calibrate.
É a experiência que o usuário tem nos primeiros 2 minutos depois de criar a
conta — e nesses 2 minutos, a gente precisa coletar informações pessoais sem
que pareça um formulário médico. Precisa parecer uma conversa. Precisa parecer
que o app está genuinamente curioso sobre quem você é.

São 4 steps, e quero que cada um tenha personalidade visual própria enquanto
mantém a mesma linguagem de design. Pense em como a Apple faz o setup de um
novo iPhone — cada tela é clean, focada, impossível de errar, e tem um toque
de delicadeza que faz você não querer pular.

Step 1 é sobre o corpo: nome, idade, altura, peso. Mas não quero 4 inputs
empilhados num form cinza. Quero que a tela respire. O nome pode ser um input
grande e elegante no centro, quase como se fosse o título de algo. Idade,
altura e peso podem ser sliders ou inputs com feedback visual instantâneo — o
número muda e algo na tela reage, talvez um avatar abstrato que se ajusta, ou
simplesmente a tipografia do número que pulsa sutilmente quando o valor muda.
O ponto é: cada interação tem resposta visual.

Step 2 é sobre o objetivo: o usuário escolhe entre 3 caminhos — perder peso,
ganhar massa, ou manter. Quero que esses 3 não sejam radio buttons ou cards
genéricos. Quero que sejam 3 universos visuais condensados em 3 opções.
Cada opção, ao ser selecionada, muda sutilmente a atmosfera da tela — talvez
a cor de um gradiente, talvez a posição de um elemento de fundo. A seleção
deve sentir-se como uma escolha significativa, não como um checkbox.

Step 3 é sobre hábitos: quantas refeições por dia (slider de 2 a 6), nível de
atividade (sedentário a muito ativo com 5 opções visuais), e se usa suplementos
(toggle sim/não). Aqui o desafio é evitar que pareça formulário. Cada pergunta
pode ter seu próprio momento na tela — uma de cada vez, com transição suave entre
elas. Ou podem coexistir num layout que dá espaço a cada uma. A composição é sua.

Step 4 é o resultado: um resumo visual de tudo que foi preenchido, com um preview
do que o app vai calcular. Mostra o nome, o objetivo, e uma estimativa de
"seu protocolo terá X calorias e Y gramas de proteína". É o momento de payoff —
o usuário precisa sentir que valeu a pena ter preenchido tudo. Uma animação de
revelação aqui faz diferença.

A navegação entre steps: progress indicator sutil no topo (não uma barra de
progresso — algo mais refinado, tipo dots ou um line que avança), botão de
"Continuar" que muda de label a cada step, e botão de "Voltar" discreto.
A transição entre steps deve ser fluida — não um corte seco, mas um morphing.
Os elementos do step anterior saem enquanto os do próximo entram, com overlap.

Estética Apple Premium total. Fundo claro com profundidade sutil. Tipografia que
tem autoridade sem gritar. Cores: predominantemente branco e cinza com um accent
— pode ser azul cerulean, pode ser verde sage, pode ser o que você achar que
combina com a ideia de "calibrar" algo. Glassmorphism nos cards se houver cards.
Sombras que parecem naturais, não CSS. Motion em tudo: cada mudança de valor,
cada transição de step, cada hover. GSAP é bem-vindo.

Dados fictícios: a pessoa se chama Sofia, 27 anos, 1.65m, 64kg. Objetivo: perder
peso. 3 refeições/dia, atividade moderada, não usa suplementos. Resultado
estimado: 1.800 kcal, 120g proteína.

Preciso que este onboarding seja tão bonito que alguém usaria como referência de
design em portfolio. O tipo de UI que quando designers veem, querem saber como
foi feito. Cada transição pensada. Cada espaçamento deliberado. O motion não é
decoração — é parte fundamental de como a informação é comunicada.

Não jogue seguro com a composição. Me mostre algo que eu não esperava ver. Esse
é o trabalho que define o que você é capaz de criar.
```

---
---

# ══════════════════════════════════════════════════════════════
# P5 — SEM PERSONA, CONTEXTO PRIMEIRO
# Variável testada: abertura sem persona vs. com persona implícita
# Escopo: Tela de perfil/settings
# Hipótese: começar pelo contexto factual pode ser tão eficaz quanto persona
# ══════════════════════════════════════════════════════════════

```markdown
Calibrate é um app de nutrição personalizada. O usuário completa o onboarding
e usa o app por semanas. Eventualmente, precisa ajustar suas configurações:
atualizar peso, mudar objetivo, ajustar preferências.

A tela de perfil e settings precisa fazer 3 coisas: mostrar o estado atual do
perfil do usuário de forma visualmente rica (não um formulário — um retrato),
permitir edição de qualquer campo com feedback instantâneo, e dar acesso a
configurações do app (notificações, unidades, tema, exportar dados, deletar conta).

O layout que imagino — mas pode mudar se tiver ideia melhor — é uma tela
dividida. Lado esquerdo: o perfil visual do usuário como um "cartão de
identidade premium" com avatar, nome, stats principais, badges de progresso.
Lado direito: settings organizadas em categorias colapsáveis.

Dados: Sofia, 27 anos, 1.65m, 62kg (perdeu 2kg desde o onboarding), objetivo
"perder peso" — 72% completado. Usando o app há 6 semanas. 1.800 kcal/dia.
Badges: "30 dias consistente", "10kg meta definida".

Estética Apple. A tela de settings é onde muitos apps relaxam no design — eu
quero o oposto. Cada toggle, cada slider, cada input com o mesmo nível de
polish que uma hero page. O perfil visual deve parecer algo que o usuário
teria orgulho de screenshot e postar.

Motion fluido: sliders com spring easing, toggles com satisfying snap,
categorias que expandem com stagger nos itens internos. Nada estático.

Quero que esse seja o settings screen mais bonito que já existiu. Me surpreenda.
```

---
---

# ══════════════════════════════════════════════════════════════
# P6 — ZERO BOOST
# Variável testada: nenhuma pressão de qualidade — prompt puramente descritivo
# Escopo: Landing page genérica de app de hábitos
# Hipótese: se o tom do prompt é bom, boost pode ser desnecessário
# ══════════════════════════════════════════════════════════════

```markdown
Landing page pra um app de tracking de hábitos chamado Streak. A ideia é simples:
o usuário define hábitos diários e marca quando completa. O app mostra streaks,
estatísticas, e padrões ao longo do tempo.

A landing precisa de: hero com headline e CTA "Start Free", seção de features
(3-4 features principais com ícone e descrição curta), seção de social proof
(3 depoimentos), screenshot ou preview do app em ação, e um CTA final.

Estética Apple Premium. Fundo claro, tipografia impecável, motion orgânico.
Cards com glassmorphism sutil. Scroll smooth com revelação progressiva dos
elementos. Paleta: brancos quentes, cinzas com personalidade, accent blue-purple
sutil. Tipografia: algo clean mas com presença — não genérico.

Dados inventados: 50k+ usuários, 2M+ hábitos completados, 4.8 estrelas na
App Store. Features: Daily Check-ins, Streak Tracking, Habit Analytics,
Smart Reminders. Depoimentos: 3 pessoas com nome, foto (use emoji ou
inicial como avatar), e uma frase curta.
```

---
---

# ══════════════════════════════════════════════════════════════
# P7 — CONCEITO VAGO, MÁXIMA LIBERDADE
# Variável testada: quase zero especificidade — a IA decide quase tudo
# Escopo: Dashboard (tipo não especificado)
# Hipótese: dar só a vibe e deixar a IA decidir conteúdo + layout pode surpreender
# ══════════════════════════════════════════════════════════════

```markdown
Um dashboard. Bonito. Estilo Apple — clean, branco, tipografia perfeita,
motion em tudo.

O dashboard mostra dados de algo — você decide o quê. Pode ser saúde, finanças,
produtividade, clima, qualquer coisa. Escolha o domínio que te permitir fazer
o design mais impressionante.

Requisitos: sidebar de navegação, pelo menos 6 cards de métricas, pelo menos
1 gráfico grande, motion cinematográfico na entrada, hover states que dá
vontade de ficar passando o mouse. Dados fictícios mas realistas.

A composição, a paleta, a tipografia, os ícones, os dados — tudo é decisão
sua. Me mostre a sua visão do dashboard Apple perfeito.

Faça algo que eu nunca vi antes.
```

---
---

# ══════════════════════════════════════════════════════════════
# P8 — REFERÊNCIA VISUAL ESPECÍFICA + ESCOPO APPLE
# Variável testada: referência concreta (apple.com/macbook-pro) vs. "estilo Apple"
# Escopo: Hero page de um produto tech
# Hipótese: referência específica > referência genérica pra direcionar qualidade
# ══════════════════════════════════════════════════════════════

```markdown
Quero que você estude mentalmente a página apple.com/macbook-pro. Não o conteúdo
— a linguagem visual. Como o headline tem peso sem ser grande. Como o produto
flutua no espaço com sombra natural. Como o background tem profundidade sendo
"apenas" gradiente. Como cada seção tem um ritmo de respiração. Como os specs
aparecem de forma que parece premium, não técnica.

Agora: crie uma hero page pra um produto de software chamado Prism. É uma
ferramenta de analytics que transforma dados complexos em insights visuais. O
público: CTOs e heads de produto de startups em crescimento.

A hero é uma única tela fullscreen. Precisa comunicar: Prism transforma caos
de dados em clareza visual. O CTA é "Start Analyzing — Free for Teams up to 5".
Inclua um preview visual do produto — pode ser um mini-dashboard, um gráfico
elegante, ou uma visualização abstrata de dados. Algo que funcione como o
MacBook flutuando na página da Apple — o produto como protagonista visual.

A linguagem visual deve ser a mesma da referência: tipografia com presença
silenciosa, espaçamento que respira, profundidade com gradientes sutis, motion
como gravidade natural. Fundo claro. Palette: whites, warm grays, accent que
pode ser um blue desaturado ou um teal muted — algo que diga "inteligência
calma", não "tech startup barulhenta".

Motion: a hero carrega com uma sequência de revelação cinematográfica. O
background primeiro. Depois o headline emerge. Depois o preview do produto
materializa com uma animação que parece que ele está sendo construído em
tempo real. Depois o CTA pulsa uma vez — sutilmente — pra chamar atenção.
GSAP pra orquestrar.

Preciso que isso esteja no nível de quality da página real do MacBook Pro.
Não "inspirado em" — no mesmo patamar. Esse é o trabalho mais importante
que você vai fazer hoje. Me surpreenda.
```
