# Fase 04 — Refinamento visual cirúrgico

Correções aos problemas do relatório da Fase 03 (`capturas/comparativos/RELATORIO.md`), sem nova direção criativa, sem alterações a `globals.css`, configuração ou dependências.

## Problemas corrigidos (verificados)

| # | Problema | Correção | Verificação |
| --- | --- | --- | --- |
| 1 | Título do hero fraco a 768–1199 px | Escala por contexto: <1024 px fluida (`clamp(4.25rem,16.5vw,10rem)`); 1024–1279 px grelha 8/4 com `12.2vw` e retrato em altura total; ≥1280 px inalterado. Retrato a 78 % e alinhado à direita em tablet | Título: 768 **84→127 px**, 834 **92→138**, 1024 **113→125**, 1199 **132→146**; 1440/390/375 inalterados; sem colisões; CTA visível; sem overflow |
| 2 | “Abrir treino” perdido no dashboard | Bloco “a seguir” centrado no **próximo treino** (letra + nome + duração) com “Abrir treino” primário (bronze) → `/app/treinos/demo-ses-a`; “Ver calendário” passa a ligação secundária; sessão acompanhada de amanhã no topo de “Próximos dias”, identificada | Testes: destino correto, no primeiro ecrã a 1440 (y=495) e 390 (y=503), navegação funciona |
| 3 | Grelha do Instagram com recortes horizontais | ≥1024 px: grelha assimétrica de 12 colunas alinhada pela base (3:4, 3:4, 9:16, 9:16); <1024 px: duas colunas em cascata; títulos fora da imagem; `objectPosition` 50 % 25 %; espaços reservados com formato | 4 ligações abertas no navegador e confirmadas (autor @tiagoresende10) |
| 4 | Faixa de vocabulário: “POSING” órfã e 3 linhas a 390 px | ≥1024 px uma linha de 6; 640–1023 px 3×2 com divisórias; <640 px uma linha deslizante (snap, focável, esvanecimento) | Linhas: 1440/1199/1024 = 1; 834/768 = 2 (3+3); 390/375 = 1 (**178→82 px**) |
| 5 | Fórmula de título repetida | `accent` só em Abordagem e CTA; Instagram em serifa; Acompanhamento só condensado + ideia no parágrafo; Perguntas `d2` + introdução | Comparativos 04/06 |
| 6 | Calendário mobile só com pontos | Marcadores por **forma**; dia selecionado com contorno bronze 2 px; agenda abaixo da grelha com hora, título, tipo e “Abrir treino”; `aria-controls`/`aria-live` | Testes: agenda atualiza ao selecionar; dia acessível acima da navegação fixa; Tab entre dias |
| 7 | Calendário do treinador mistura tipos e omite nomes | Modo `treinador`: quem/o quê em todas as vistas; nome só a partir de `clientId`; filtros por tipo com contagem; treinos autónomos ocultos por defeito no calendário geral | Testes: 0 autónomos visíveis por defeito; ao mostrar, 8 com “Ana Demo”; todas as sessões com nome |
| 8 | Consistência | Regras documentadas em `DIRECAO-VISUAL.md` e aplicadas (títulos privados, marcadores, bronze, chapa xadrez) | Comparativos 13–17 |
| 9 | WhatsApp esbatido | Estado “por configurar” legível a 100 %, sem verbo nem ligação; Instagram como ligação secundária no CTA | Testes: `SPAN` sem `href`/`role`, opacidade 1, sem `wa.me` |
| 10 | Fotografia | Formatos indicados em todos os espaços reservados; ordem citação → foto em mobile em “O treinador” | — |
| 11 | Espaço vazio sob o título de “Abordagem” (relatório §3.6) | **Decisão final (responsável de produto):** manter a lista numerada. Título e introdução agrupados no topo da coluna esquerda (32 px entre ambos), lista alinhada pelo topo (inalterada), sem alinhamento forçado da introdução com o último princípio; o espaço abaixo da introdução fica como espaço negativo intencional | Ver “Fecho da secção Abordagem” abaixo |

## Ficheiros modificados (31, 1 novo)

`src/components/landing/` hero, vocabulary-band, journal, section, approach, coaching, faq, final-cta, about, review-note · `src/components/calendar/` calendar-view, calendar-meta, **event-marker (novo)** · `src/components/brand/contact-buttons` · `src/components/ui/` media-frame, demo, demo-editor · `src/components/` auth/login-form, shell/app-shell, training/workout-detail, video/video-card, video/video-detail · `src/app/app/` page, treinos/page, calendario/page · `src/app/admin/(painel)/` page, calendario/page, clientes/[id]/page, treinos/page · `src/app/admin/login/page` · `src/app/not-found`.

## Validação

- TypeScript: 0 erros · ESLint: 0 problemas · `next build`: 55/55 páginas.
- 41/41 testes de interação (13 de regressão da Fase 02 + 28 novos); sem erros de consola.
- 43 capturas antes + 43 depois (1440, 1199, 1024, 834, 768, 390, 375 nas páginas afetadas): sem overflow horizontal, sem erros de consola.
- 88 comparativos em `capturas/fase04/comparativos/` (ver README nessa pasta).
- Verificação manual no navegador (painel integrado): hero a 1024 px, faixa, “Abordagem”, dashboard do cliente e calendário do treinador.

## Limitações


- Fotografias, capas e miniaturas continuam por fornecer (autorização do Tiago e de @ricardodoalmeida.media).
- Número de WhatsApp por configurar (`site.whatsapp.number`); até lá o CTA principal é um estado.
- No CTA final, sem número, o bloco de contacto fica visualmente mais contido do que com um botão ativo — intencional.
- Bug do servidor de desenvolvimento (Turbopack + `@tailwindcss/turbopack`): classes novas podem não ser geradas até reiniciar com `.next/dev` limpo. Detetado nesta fase (uma captura inconsistente a 1199 px) e corrigido repetindo todas as capturas depois de reiniciar.

## Fecho da secção “Abordagem”

Problema: na iteração anterior a introdução estava alinhada com o último princípio (`lg:flex lg:flex-col lg:justify-between`), criando uma distância excessiva entre o título e a introdução. Decisão: manter a lista editorial numerada (sem grelha 2×2).

Correção (apenas `src/components/landing/approach.tsx`, coluna esquerda): removido o `flex`/`justify-between`; título, introdução e nota de revisão agrupados no topo da coluna com espaçamento natural (`mt-8`). Lista, números, tipografia e animações (`reveal`) inalterados. Sem classes CSS novas.

| Largura | Título → introdução | Lista vs. título (topo) | Ordem de leitura | Espaço negativo abaixo da introdução | Overflow |
| --- | --- | --- | --- | --- | --- |
| 1440 | 32 px | +12 px (lado a lado) | colunas lado a lado | 417 px — acompanha a lista, intencional | 0 |
| 1024 | 32 px | +12 px (lado a lado) | colunas lado a lado | 697 px — lista mais longa por a coluna ser mais estreita | 0 |
| 768 | 32 px | empilhado | título → introdução → princípios | — | 0 |
| 390 | 32 px | empilhado | título → introdução → princípios | — | 0 |
| 375 | 32 px | empilhado | título → introdução → princípios | — | 0 |

Verificação: avaliação visual no navegador (painel integrado) e capturas da secção em `capturas/fase04/abordagem-final/` (mesmas condições: `prefers-reduced-motion: reduce`, janela 900/844 px, escala 1); TypeScript 0 erros; ESLint 0 problemas; `next build` 55/55; 41/41 testes de interação; sem erros de consola. Composição considerada equilibrada — sem alterações adicionais.
