# Fase 02 — Refinamento visual

## Problemas identificados (capturas `capturas/antes`)
- Hero: título e CTA empurrados para o fundo, espaço vazio, CTA desalinhado, retrato como mancha sem composição, lista de palavras flutuante.
- Títulos de secção todos gigantes e iguais — ritmo monótono.
- Espaços de fotografia sem intenção (manchas castanhas), repetidos.
- Notas de protótipo em maiúsculas a competir com o conteúdo.
- Grelha do Instagram com 4 cartões iguais.
- Dashboard do cliente: cartões com o mesmo peso, sem hierarquia; “Registos” vazio e grande.
- Painel: atalhos duplicando a navegação, informação redundante (“Sessão acompanhada / Sessão acompanhada”), cartão de vídeos quase vazio.
- Calendário: etiquetas truncadas (“18:30 Sessão…”), dia selecionado vazio por defeito.
- Vocabulário ambíguo: “Sessão A” (treino) vs “Sessão acompanhada”.

## Alterações
- Paleta refinada (grafite/betão/bronze/aço/sinal) com base na observação direta das fotografias — ver `DIRECAO-VISUAL.md`.
- Escala tipográfica `text-hero/d1/d2/d3`, raios `--radius-card/media`, sombra `--shadow-lift`, textura `plate`, revelação `reveal` sem JS.
- Landing: hero assimétrico com CTA acima da dobra e cartão de identificação; faixa de vocabulário; “O treinador” editorial; “Abordagem” em lista; processo em linha temporal; grelha assimétrica do Instagram; CTA final em duas colunas.
- `MediaFrame`: espaço reservado com formato, *brief* e marcas de corte.
- Área de cliente: dashboard “a seguir → plano → acessos → vídeos do próximo treino”; cartões de treino com letra grande; séries visuais; miniaturas com grupo muscular; leitor ilustrativo; calendário legível.
- Painel: estado no cabeçalho, “Hoje” como bloco principal, atividade + configuração, conteúdos numa linha; navegação lateral agrupada.
- Logins e 404 com a nova linguagem (continuam apenas visuais).

## Verificação
- `tsc`, `eslint`, `next build` (55 páginas): sem erros.
- 45 capturas a 1440/1024/768/390 px: sem overflow horizontal nem erros de consola.
- 17 testes automáticos de interação (logins, formulário demo, calendário, menus, separadores, interruptor): todos passam; nada guardado no navegador.

## Dependente do cliente
Fotografias autorizadas (Tiago + @ricardodoalmeida.media), número de WhatsApp, modalidades/local, formação, profissional de nutrição, validação dos textos propostos.
