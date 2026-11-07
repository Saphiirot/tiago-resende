# Fase 07 — Login de demonstração, WhatsApp, identidade e movimento

2026-11-07.

- **Login de demonstração:** `/app/*` e `/admin/*` exigem sessão (`src/proxy.ts`). Credenciais fictícias partilhadas; o repositório guarda só o email e a verificação (`src/lib/demo-auth.ts`). Cookie `httpOnly`, 12 h; `/sair` termina a sessão. Sem limite de tentativas nem utilizadores: serve só para apresentar o protótipo.
- **WhatsApp:** `site.whatsapp.number` = `351912086476`, indicado pelo responsável do projeto. Falta confirmar com o Tiago que é o número profissional.
- **Identidade (afastar do site do stand):** acento bronze → azul-gelo (tokens `--color-bronze*`, nome mantido); títulos de grotesca condensada em maiúsculas → grotesca larga em minúsculas (`.display`); escala `text-hero`/`d1–d3` reduzida para a nova largura.
- **Movimento (CSS, sem JavaScript, desligado com `prefers-reduced-motion`):** zoom lento (`kenburns`) e parallax no hero; fotografias entram com máscara (`reveal-img`); linha do processo desenha-se (`draw-x`); barra de progresso de scroll (`scroll-progress`). Em navegadores sem `animation-timeline` o conteúdo fica estático.
