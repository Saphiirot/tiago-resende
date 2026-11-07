# Fase 05 — Conteúdo real, direção fotográfica e preparação comercial

2026-10-21. A estrutura aprovada mantém-se e o modo de demonstração continua ativo. Não foi implementada autenticação, base de dados, pagamentos nem armazenamento de dados pessoais.

## 1. Conteúdo integrado

| Conteúdo | Onde | Fonte / estado |
| --- | --- | --- |
| Método em **5 etapas**: conversa inicial → avaliação inicial → planeamento (treino e componente alimentar) → acompanhamento → plano na aplicação | Secção 03, FAQ, `method` em `src/config/commercial.ts` | Confirmado pelo responsável do projeto. Sem etapas acrescentadas nem resultados prometidos. As descrições de cada etapa são texto proposto. |
| Frase “Treino com direção. Acompanhamento com método.” | Hero, subtítulo | Proposta criativa, a validar |
| Como começa, porquê a avaliação inicial, como se organiza o plano, papel da aplicação | Hero, secção 03, FAQ (6 perguntas) | Texto proposto, a validar |
| Componente alimentar da responsabilidade do Tiago, “no âmbito das qualificações confirmadas” | Secção 03, FAQ, `/app/plano-alimentar`, `/admin/planos-alimentares`, ficha de cliente | Responsável confirmado; qualificações **por confirmar** (`site.nutrition`) |
| Modalidades presencial / online | Nova secção 04, FAQ | **Por validar**, com etiqueta visível |
| Planos e valores | Secção 04 | Sem preços: “Ainda não estão publicados” e pedido de informação |
| Testemunhos e resultados | `Testimonials` (só aparece com dados), `commercial.ts` | Estrutura pronta, listas vazias |
| 4 fotografias reais | Hero, secção 01, grelha do Instagram | Ver `docs/RECURSOS.md` |

## 2. Recursos encontrados e fontes

O inventário completo está em **[RECURSOS.md](RECURSOS.md)**: recurso, fonte, uso, proporção e resolução, crédito, estado de autorização e localização no projeto.

- **Em uso:** 4 imagens publicadas pelo próprio Tiago, sem crédito de terceiros. São elas o retrato da publicação “Construído no silêncio.” (que deu origem ao título do hero) e as capas dos Reels “Orgulhoso de mim”, “Back is built” e “Por trás das gravações”.
- **Não usadas:** as sessões creditadas a @ricardodoalmeida.media (PRIME, SECOND ROUND, PRIMEIRO CAPÍTULO) ficam de fora até haver autorização do autor para uso comercial. A capa de “Leg day” também fica de fora, porque mostra terceiros identificáveis.
- **Imagens:** os ficheiros estão em `public/media/`, recortados no próprio ficheiro, sem metadados e entre 89 e 214 KB. A aplicação não usa URLs do CDN do Instagram.

## 3. Pendentes

A lista completa, com o sítio de configuração de cada item, está em **[PENDENTES.md](PENDENTES.md)**. Em resumo: número de WhatsApp, formação e certificações, experiência, validação das modalidades, preços e condições, testemunhos, resultados, qualificações para a componente alimentar, autorização do fotógrafo, validação dos textos propostos, email e política de privacidade.

O mesmo documento descreve **o que é preciso para ativar o WhatsApp**: o número em `site.whatsapp.number`, só dígitos e com indicativo 351. Não é preciso mudar mais nada.

## 4. Alterações visuais

| Zona | Antes | Depois |
| --- | --- | --- |
| Hero | Espaço reservado 4:5 | Retrato real. O recorte exclui as pessoas ao fundo e o ponto focal (`38% 30%`) mantém o rosto visível na coluna estreita de 1024–1279 px. Título e chamada para ação sem alterações. |
| Secção 01 | Espaço reservado 3:4 | Fotografia em treino, uma imagem diferente da do hero |
| Secção 03 | 4 passos genéricos em 4 colunas | 5 etapas confirmadas em 5 colunas (≥1024 px), com títulos ligeiramente mais pequenos nessa largura. Bloco da aplicação reescrito. Etiqueta “Âmbito por confirmar” na alimentação. |
| **Secção 04 (nova)** | — | “Modalidades e planos”, em tom betão (alterna com as secções escuras vizinhas). Lista editorial igual à da Abordagem, etiquetas “Por validar”, pedido de informação e, no protótipo, um bloco com os campos previstos para os planos. |
| Grelha do Instagram (05) | 4 espaços reservados (PRIME, SECOND ROUND, Back is built, Leg day) | 2 capas reais (Back is built em destaque, Por trás das gravações) e 2 cartões que indicam o motivo de não haver imagem. PRIME saiu (crédito de terceiros). |
| Numeração | 01–06 | 01–07 (Perguntas 06, Contacto 07) |
| Navegação | 4 ligações | + “Planos” (desktop, menu móvel e rodapé) |
| Rodapé | “Fotografia: @ricardodoalmeida.media” | “Fotografias: @tiagoresende10 (Instagram)”, derivado das imagens em uso |
| Contacto final | “Sem compromisso” | Removido (condição não confirmada) |
| Faixa do protótipo | “Fase 01 — conteúdos em validação” | “Protótipo · conteúdos em validação” |

Configuração nova: `src/config/commercial.ts` (método, modalidades, planos, testemunhos, resultados) e `src/config/media.ts` (inventário de imagens). `site.services` foi substituído por `modalities`, e `site.nutrition.responsibleProfessionalConfirmed` por `responsible` + `qualificationsConfirmed` + `scope`.

## 5. Testes e resultados

| Verificação | Resultado |
| --- | --- |
| `tsc --noEmit` | Sem erros |
| `npm run lint` | Sem avisos |
| `npm run build` | Concluída; todas as rotas geradas |
| Imagens (1440, 1199, 1024, 768, 390 px) | 4/4 carregadas em todas as larguras; nenhuma partida, sem pedidos 4xx/5xx |
| Deslocamento horizontal | 0 px em todas as larguras |
| WhatsApp sem número | 5 estados “por configurar”, 0 ligações `wa.me` |
| Preços / “nutricionista” / “garantido” | 0 ocorrências na página |
| CDN do Instagram no HTML | Não |
| Testes de interação (`interact5`) | **16/16**: navegação “Planos” (desktop e móvel), menu móvel fecha, FAQ com 6 perguntas, “Quanto custa?” sem valores, 4 ligações reais em separador novo, testemunhos ausentes sem dados, exatamente 5 etapas, páginas de cliente e painel coerentes e sem erros de consola |

Capturas: `capturas/fase05/depois/`, com 5 larguras × 7 zonas e as 4 páginas privadas afetadas. Comparativos do hero com a Fase 04 em `capturas/fase05/comparativos/`.

**Limitação:** o retrato do hero tem 760 px de largura. A 1440 px, em ecrãs de alta densidade, fica ligeiramente abaixo de 2×. Um original maior está na lista de recursos em falta.
