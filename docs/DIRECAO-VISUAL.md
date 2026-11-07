# Direção visual — “Construído no silêncio” · v2

Fase 02. Revista após a **observação direta** das fotografias (ver `ANALISE-INSTAGRAM.md`). Proposta a validar com o responsável de produto.

## Decisão: refinar, não substituir

| Observação nas fotografias | v1 (Fase 01) | v2 (Fase 02) |
| --- | --- | --- |
| Ginásio grafite e betão, luz natural | Preto acastanhado `#0d0c0b` | **Grafite neutro** `#0e0f11` → `#262a2f` |
| Zonas claras em betão | Papel creme `#ece5da` | **Betão** `#ebe7e1` / `#e3dfd8` |
| Pele dourada = único elemento quente | Bronze `#d38b46` | **Bronze mantido** `#cf8a4f` — agora justificado como “a pele no ginásio frio” |
| Vermelho dos equipamentos | Óxido `#e2694e` | **Sinal** `#e5594b`, só para alertas/erros |
| Azul-marinho / azul-aço do vestuário | Ardósia `#8d9aa6` | **Aço** `#8fa5bb` — categorias secundárias, “outros eventos” |
| Chapa xadrez em várias fotos | — | **Motivo gráfico** `plate` (textura subtil, nunca protagonista) |

Mantém-se a tipografia: as legendas usam títulos curtos em maiúsculas (→ Archivo condensado) e frases reflexivas (→ Instrument Serif itálico); dados em Geist Mono; texto em Geist.

## Sistema (tokens em `src/app/globals.css`)

**Cor** — `ink`, `ink-2…4`, `line`, `line-strong` · `bone`, `concrete`, `bone-dim`, `mute` · `bronze`, `bronze-bright`, `bronze-deep` · `oxide` (sinal), `sage`, `slate` (aço). Contraste AA verificado em todos os pares de texto (mín. 4,58:1).

**Escala display** — `text-hero` (até 188 px), `text-d1` (≈100 px), `text-d2` (≈72 px), `text-d3` (≈44 px), todas com `clamp()`. Uma única escala para os títulos de secção (`SectionTitle`), em vez de títulos gigantes iguais em todas as secções.

**Espaçamento** — secções públicas `py-24` / `lg:py-32`; contentor `max-w-[88rem]` com `px-4 / sm:px-8 / lg:px-12`; áreas privadas `max-w-6xl`.

**Raios e sombras** — `--radius-card` 1,25 rem (todos os cartões), `--radius-media` 1,75 rem (fotografia), botões em pílula; `--shadow-lift` só em elementos que flutuam.

**Imagem** — `MediaFrame`: sem fotografia autorizada mostra um espaço reservado intencional (luz janela fria + foco quente, chapa xadrez, marcas de corte, formato e *brief* para o fotógrafo). Miniaturas de vídeo mostram o grupo muscular em grande.

**Botões** — primário bronze (ação principal: WhatsApp / entrar), secundário contorno, `dark` sobre bronze, `light` sobre escuro. Ligações de texto sublinhadas com acento no hover.

**Estados** — foco visível bronze em todos os controlos; hover por mudança de superfície (`ink-2 → ink-3`) e cor; ativo da navegação com barra lateral (cliente: bronze, treinador: betão).

**Movimento** — entrada do hero (`rise`, `unveil` na fotografia); revelações ao scroll **sem JavaScript** (`animation-timeline: view()`, utilitário `reveal`); microinterações de 200–700 ms. Tudo desligado com `prefers-reduced-motion`.

## Padrões de composição

| Contexto | Padrão |
| --- | --- |
| Hero | Assimétrico 7/5: título dominante + CTA acima da dobra; retrato vertical com cartão de identificação sobreposto |
| Faixa de vocabulário | Palavras da legenda “SECOND ROUND.” sobre chapa xadrez — separador com identidade |
| O treinador | Secção clara (betão), citação como protagonista, fotografia 3:4 |
| Abordagem | Título + introdução agrupados no topo da coluna esquerda; lista editorial numerada à direita, alinhada pelo topo |
| Acompanhamento | Linha temporal de 4 passos + pré-visualização da app |
| Instagram | Grelha assimétrica (1 grande + 3) com ligações às publicações reais |
| Área de cliente | Hierarquia: “a seguir” → plano em curso → acessos → vídeos |
| Painel | Estado em linha no cabeçalho → “Hoje” → atividade/configuração → conteúdos |

## Regras de consistência (v2.1 · Fase 04)

**Títulos**
- Site público: `SectionTitle` (condensado, `text-d1`; `size="d2"` em secções de apoio como Perguntas). A segunda linha em serifa itálica bronze (`accent`) é **reservada** às secções em que é assinatura: *Abordagem* (duas citações das legendas) e *CTA final*. *Instagram* usa serifa itálica em betão; *Acompanhamento* só o título condensado com a ideia-chave no parágrafo.
- Áreas privadas: uma única peça display por página — o `h1` (`text-d1` em Início/Painel, `text-d2` nas restantes). Títulos de bloco: `eyebrow` opcional + `h2` `text-lg font-semibold`. Títulos dentro de cartões: `text-base`. Valores-chave (letra do treino, datas, horas) podem usar display/mono — são dados, não títulos.

**Próximo evento e tipos de atividade**
- Tipo = **forma + cor** (`EventMarker`): sessão acompanhada ● círculo cheio bronze; treino autónomo ○ anel betão; outro ◆ losango aço. Usado em calendários, legendas, agenda do dia e listas dos dashboards.
- O item **seguinte/atual** (próximo treino, cartão “Próximo”, dia selecionado) usa contorno ou fundo bronze translúcido.
- No painel do treinador: **quem** (cliente associado ao evento, só via `clientId`) em primeiro, **o quê** (tipo/atividade) em segundo. Treinos autónomos dos clientes ocultos por defeito no calendário geral (filtro visível com contagem).

**Bronze** — apenas: (1) ação principal; (2) próximo/atual/selecionado e item ativo da navegação do cliente; (3) tipo “sessão acompanhada”; (4) no site público: índice das secções, `accent` das secções-assinatura, primeira palavra da faixa, bloco do CTA final. **Não** em ícones decorativos, insígnias de categoria/fase (agora `outline`) nem marcadores de demonstração/protótipo (agora neutros).

**Chapa xadrez (`plate`)** — só em três sítios: espaços reservados de fotografia (`MediaFrame`), faixa de vocabulário e margem do CTA final. Removida do login do treinador e da 404.

**Contacto por WhatsApp sem número** — estado, não ação: contorno bronze (ou tinta sobre bronze), legível a 100 %, “WhatsApp” + etiqueta “por configurar”, sem verbo imperativo, sem `href` nem papel de ligação. Mantém a posição de contacto principal; o Instagram fica como ligação de texto secundária.

**Espaços de fotografia** — indicam sempre o formato (`ratio`): retrato 4:5, “O treinador” 3:4, login 3:4, capas do Instagram 3:4 / 9:16 (rótulo compacto em cartões estreitos), miniaturas de vídeo 16:9. Ponto focal por defeito `50% 30%` para preservar rostos quando houver fotografias reais.

## Fotografia real (v2.2 · Fase 05)

**Origem** — só imagens do inventário `src/config/media.ts`, guardadas em `public/media/`. Nunca URLs do Instagram, nunca imagens com crédito de terceiros sem autorização do autor, nunca fotografias de outras pessoas apresentadas como sendo do Tiago.

**Recorte** — feito no ficheiro, não apenas com CSS, quando é preciso excluir terceiros (utilizadores do ginásio). Se não houver recorte que os exclua, a imagem não é usada. O ponto focal fica em `media.*.focus`, para manter o rosto visível quando o enquadramento corta a imagem (ex.: hero em 1024–1279 px).

**Uma imagem por lugar** — hero (retrato 4:5), “O treinador” (em treino, 3:4) e capas da grelha (formato do perfil) usam fotografias diferentes.

**Cartão sem capa** — mantém o espaço reservado com o motivo em vez de “a fornecer” (“Crédito por autorizar”, “Capa não usada”). A ligação à publicação continua ativa.

**Secções comerciais** — “Modalidades e planos” segue o padrão da Abordagem (título à esquerda, lista editorial com divisórias à direita) em tom betão. Estados não confirmados aparecem como etiqueta tracejada (“Por validar”), nunca como valor.
