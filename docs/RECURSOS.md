# Inventário de recursos

Atualizado a 2026-10-23 (Fase 06). A fonte de verdade para as imagens em uso é `src/config/media.ts`; este documento acrescenta o que foi avaliado e não entrou.

**Base de autorização.** O responsável pelo projeto autorizou o uso dos materiais disponíveis na web para este projeto. Essa autorização cobre o conteúdo publicado pelo próprio Tiago **sem crédito de terceiros**. Quando uma publicação credita um fotógrafo (ex.: `📸 @ricardodoalmeida.media`), o direito de autorizar a reprodução pertence em regra ao autor (CDADC, art. 68.º). Por isso, essas imagens ficam de fora até haver confirmação escrita de que a autorização abrange o uso comercial no website.

**Tratamento.** As imagens foram recolhidas a partir das páginas públicas, sem contornar restrições de acesso. Depois foram recortadas, redimensionadas (máx. 1200 px) e guardadas em JPEG progressivo **sem metadados** em `public/media/`. A aplicação não usa URLs do CDN do Instagram. Os originais descarregados não estão no projeto.

## Imagens em uso

| Recurso | Fonte | Uso no site | Proporção · resolução | Crédito / licença | Autorização | Localização |
| --- | --- | --- | --- | --- | --- | --- |
| Pose frontal junto à parede | [Reel DdKE8NJxw5O](https://www.instagram.com/tiagoresende10/reel/DdKE8NJxw5O/) (“Por trás das gravações”) — capa | Hero (Fase 06) | 9:16 · 1200×2133 | @tiagoresende10, sem crédito de terceiros | Autorizada (projeto) | `public/media/tiago-hero.jpg` |
| Elevação de pernas na barra | [Reel DdCUvyWRcBc](https://www.instagram.com/tiagoresende10/reel/DdCUvyWRcBc/) (“Orgulhoso de mim.”) — capa | O treinador | 3:4 · 1200×1600 (apresentada em 4:5) | @tiagoresende10, sem crédito de terceiros | Autorizada (projeto) | `public/media/tiago-sobre-em-treino.jpg` |
| Pose de dorsais, de costas | [Reel DcrMShJR2Bq](https://www.instagram.com/tiagoresende10/reel/DcrMShJR2Bq/) (“Back is built. Not given.”) — capa | Grelha do Instagram | 3:4 · 1200×1600 | @tiagoresende10, sem crédito de terceiros | Autorizada (projeto) | `public/media/capa-back-is-built.jpg` |
| Retrato ao espelho, ginásio grafite | [Publicação DcyN-egsoSj](https://www.instagram.com/tiagoresende10/p/DcyN-egsoSj/) (“Construído no silêncio.”) | Grelha do Instagram (era o hero na Fase 05) | 4:5 · 760×950 | @tiagoresende10, sem crédito de terceiros | Autorizada (projeto) | `public/media/capa-construido-no-silencio.jpg` |

**Recortes.**
- **Hero:** o original (2828×3007) mostra outros utilizadores do ginásio à esquerda e à direita. O recorte foi feito no ficheiro, não apenas com CSS, para os excluir. Resultado: 760×950, com parte do braço direito do Tiago cortada pela margem.
- **Capas de Reel:** foram aparadas 40 px de cada lado para retirar os cantos arredondados da capa.
- **Resolução (Fase 06):** as capas de Reel saem do Instagram com 1284 px de largura no máximo, e a selfie ao espelho só tem 760 px úteis depois do recorte. O site serve-as com qualidade 90 e limita o tamanho de apresentação para ficarem perto de 2× em ecrãs retina. Para mais nitidez é preciso receber os ficheiros originais (ver “Recursos em falta”).

## Avaliados e não usados

| Recurso | Fonte | Motivo | Estado |
| --- | --- | --- | --- |
| Capa do Reel “Leg day” | [Reel DalRJawx4Pj](https://www.instagram.com/tiagoresende10/reel/DalRJawx4Pj/) | Várias pessoas identificáveis ao fundo, uma delas junto à cabeça do Tiago; não há recorte possível que as exclua. Resolução baixa (720×1280). | Fora da grelha (Fase 06) |
| Carrossel “SECOND ROUND” | [DdW8P7XkaSy](https://www.instagram.com/tiagoresende10/p/DdW8P7XkaSy/) | Crédito `📸 @ricardodoalmeida.media` | Não descarregado; fora da grelha (Fase 06) |
| Carrossel “PRIMEIRO CAPÍTULO” | [DdHff_MkSBH](https://www.instagram.com/tiagoresende10/p/DdHff_MkSBH/) | Crédito `📸 @ricardodoalmeida.media` | Não descarregado |
| Reel “CHEGUEI AO MEU PRIME” | [Dc3_Q-JMOKe](https://www.instagram.com/tiagoresende10/reel/Dc3_Q-JMOKe/) | Crédito `📸 @ricardodoalmeida.media` | Removido da grelha (antes era o cartão em destaque, sem capa) |
| Reel “Back day” | [DbLZ76fsrbK](https://www.instagram.com/tiagoresende10/reel/DbLZ76fsrbK/) | Capa desfocada, iluminação néon; qualidade insuficiente | Não usado |
| Publicações 2017–2023 (lifestyle, viagens) | Perfil | Fora do tema do site (treino e acompanhamento) | Não usadas |

## Textos reais usados

| Texto | Fonte | Onde |
| --- | --- | --- |
| “Construído no silêncio.” · “Sem desculpas. Sem atalhos. Sem dias perdidos.” | Legenda de DcyN-egsoSj | Título do hero · Abordagem (01) |
| “…e, acima de tudo, consistência.” | Legenda de Dc3_Q-JMOKe | Abordagem (02) |
| “Não pelo físico que conquistei, mas pelo homem que me tornei.” | Legenda de DdCUvyWRcBc | Abordagem (04) |
| “O trabalho verdadeiro aconteceu todos os dias, quando ninguém estava a ver.” | Legenda do Instagram | Secção 01 |
| Método em 5 etapas | Confirmado pelo responsável do projeto (Fase 05) | Secção 03 · `src/config/commercial.ts` |

## Ligações

| Ligação | Estado |
| --- | --- |
| `https://www.instagram.com/tiagoresende10/` | Verificada |
| `https://ig.me/m/tiagoresende10` (mensagem direta) | Verificada (perfil com “Enviar mensagem”) |
| Publicações da grelha (2) | Verificadas, abrem num separador novo |
| WhatsApp | **Sem ligação**: número por configurar |

## Recursos em falta

1. **Fotografias originais em alta resolução** (≥ 2400 px de largura, sem terceiros): pedir ao Tiago os ficheiros da câmara/telemóvel, não capturas do Instagram. Também podem vir das sessões de @ricardodoalmeida.media se o fotógrafo autorizar por escrito o uso comercial.
2. **Autorização escrita de @ricardodoalmeida.media** para as sessões PRIME, SECOND ROUND e PRIMEIRO CAPÍTULO, com o âmbito (website, redes, publicidade) e a forma de crédito.
3. **Capa alternativa para “Leg day”**, ou outro Reel sem terceiros visíveis.
4. **Vídeos de execução** para a biblioteca da aplicação (os 9 da demonstração são fictícios e não têm ficheiro).
5. **Fotografias de clientes**, só com consentimento para esta finalidade.
6. **Logótipo ou marca gráfica**, se existir; hoje é usado o monograma “TR” tipográfico.
