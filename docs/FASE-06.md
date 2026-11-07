# Fase 06 — Direção cinematográfica e simplificação

2026-10-23. Pedido: site mais cinematográfico e bonito, menos informação, sem “cara de IA”, imagens em alta qualidade. Conteúdo confirmado e pendentes inalterados (ver `PENDENTES.md`).

## O que mudou

| Zona | Antes | Depois |
| --- | --- | --- |
| Hero | Grelha texto + moldura 4:5 com cartão “TR” sobreposto | Ecrã inteiro. Fotografia de maior resolução (1200×2133) como fundo em telemóvel e na metade direita em desktop, a fundir-se no preto. Sem cartão sobreposto; subtítulo numa linha. |
| Faixa de vocabulário | 6 palavras em maiúsculas | Removida |
| O treinador | Secção clara, citação, 2 parágrafos, tabela Base/Instagram | Secção escura: fotografia 4:5, citação, 1 parágrafo, ligação ao Instagram |
| Abordagem | Introdução + 4 princípios com explicação | 4 princípios só com palavra e citação real (lista numerada mantida) |
| Acompanhamento | 5 etapas com descrições longas + 4 funcionalidades | 5 etapas com uma linha cada; bloco da aplicação com uma frase e a ilustração |
| Grelha do Instagram | 4 cartões, 2 sem imagem | 2 cartões grandes, só com fotografias reais |
| Perguntas | Introdução + 6 perguntas | 6 perguntas |
| Etiquetas de secção | “01 —— O TREINADOR” | “—— O TREINADOR” (sem numeração) |
| Notas de protótipo | Visíveis na página | Desligadas (`site.prototype.showReviewNotes = false`) |

Texto visível na página principal: cerca de 413 palavras. Alternância de tons: escuro → elevado → escuro → betão → escuro → elevado → bronze.

## Imagens

- `next.config.ts`: `images.qualities: [75, 90]`. Todas as fotografias passam a ser servidas com qualidade 90 (antes 75).
- O grão de película deixou de ser aplicado sobre fotografias reais. Fica só nos espaços reservados.
- Os tamanhos de apresentação foram limitados para os ficheiros ficarem perto de 2× em ecrãs retina: hero até 640 px, “O treinador” em 5/12 colunas, grelha em 6 + 4 colunas. Medido a 1440 px com DPR 2: hero ~1,9×, “O treinador” 2×, “Back is built” ~1,8×, selfie ao espelho ~1,75×.
- **Limite:** os ficheiros vêm das capas do Instagram (máx. 1284 px). Para nitidez real em ecrãs grandes, é preciso receber os originais (ver `RECURSOS.md`, “Recursos em falta”).
- Ficheiros renomeados conforme o novo uso: `tiago-hero.jpg` e `capa-construido-no-silencio.jpg`.

## Verificação

`tsc`, `lint` e `build` sem erros. A 1440, 1024 e 390 px: 4/4 imagens carregadas, sem erros de consola nem deslocamento horizontal. Capturas em `capturas/fase06/depois/`.
