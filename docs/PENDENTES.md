# Informação a confirmar com o Tiago

Atualizado a 2026-10-21 (Fase 05). Cada item tem **um** sítio de configuração. Os componentes leem daí e tratam o estado vazio sem inventar conteúdo. O painel do treinador mostra o mesmo estado (`/admin` e `/admin/definicoes` → “Estado da configuração”).

## Estado

| # | Item | Estado | Onde se configura | Impacto atual |
| --- | --- | --- | --- | --- |
| 1 | **Número de WhatsApp profissional** | Pendente | `site.whatsapp.number` (`src/config/site.ts`) | Em todos os pontos de contacto, o botão aparece como estado “WhatsApp · por configurar”: sem ligação, sem papel de botão, com o Instagram como alternativa. |
| 2 | Formação e certificações | Pendente | `site.credentials` | Bloco “A confirmar” na secção 01. Nada é afirmado. |
| 3 | Experiência profissional (anos, contextos) | Pendente | Texto da secção 01 (`about.tsx`) | Não é mencionada. |
| 4 | Modalidades: presencial / online, local, disponibilidade e condições | **Por validar** (dependem das necessidades e da localização) | `modalities` (`src/config/commercial.ts`) | Secção 04 e FAQ mostram cada modalidade com a etiqueta “Por validar”. |
| 5 | Planos, preços, periodicidade, o que inclui, condições | Pendente | `plans` (`commercial.ts`) | Secção 04 diz que os valores não estão publicados e convida a pedir informação. Nenhum preço é mostrado. |
| 6 | Testemunhos de clientes | Pendente | `testimonials` (`commercial.ts`) | A secção não é apresentada enquanto a lista estiver vazia. |
| 7 | Resultados de clientes | Pendente | `results` (`commercial.ts`) | Idem. |
| 8 | Qualificações para a componente alimentar | Pendente (responsável **confirmado**: Tiago) | `site.nutrition.qualificationsConfirmed`, `site.nutrition.scope` | O Tiago não é apresentado como nutricionista. Não são anunciadas consultas de nutrição nem dietas individuais. O módulo da aplicação mantém o aviso e usa dados fictícios. |
| 9 | Autorização do fotógrafo @ricardodoalmeida.media | Pendente | `src/config/media.ts` | As imagens creditadas não são usadas (ver `docs/RECURSOS.md`). |
| 10 | Validação da linguagem proposta (apresentação, princípios, descrição das etapas, FAQ) | Pendente | `src/components/landing/` | Notas “validar com o Tiago” visíveis no protótipo. |
| 11 | Email profissional | Pendente | `site.email` | Não apresentado. |
| 12 | Política de privacidade e termos | Pendente | Páginas a criar | O rodapé indica “em preparação”. |

**Confirmado nesta fase:** o método em 5 etapas (`method` em `commercial.ts`), a responsabilidade do Tiago pela componente alimentar, a localização (Porto) e a autorização de uso dos materiais do próprio Tiago publicados sem crédito de terceiros.

## Ativar o WhatsApp — o que é preciso

1. **Número profissional** confirmado pelo Tiago, de preferência uma conta WhatsApp Business. Não usar números encontrados na web sem confirmação explícita.
2. Escrevê-lo em `site.whatsapp.number` **só com dígitos, em formato internacional** (indicativo 351 + 9 dígitos, sem `+`, espaços nem zeros iniciais), por exemplo `"351XXXXXXXXX"`. `getWhatsAppHref()` (`src/lib/whatsapp.ts`) aceita 8–15 dígitos. Se o valor não for válido, o site continua no estado “por configurar”.
3. Opcional: rever `site.whatsapp.defaultMessage`, a mensagem pré-preenchida.
4. Nada mais muda no código. Todos os pontos de contacto (cabeçalho, hero, secção 04, contacto final) passam a abrir `https://wa.me/<número>?text=<mensagem>` num separador novo.
5. Verificar: abrir a ligação num telemóvel e confirmar que chega à conta certa.

## Para publicar

Preencher os itens acima. Desde a Fase 06, `site.prototype.showReviewNotes` está `false`: a página pública já não mostra a faixa “Protótipo”, as notas de revisão nem os blocos “A confirmar”. Os pendentes continuam visíveis aqui e no painel do treinador. As etiquetas “Por validar” das modalidades continuam na página enquanto o estado não for “confirmado”. Para rever os textos propostos no próprio site, voltar a pôr `showReviewNotes: true`.
