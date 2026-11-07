# Fase 07 — Login de demonstração, WhatsApp, identidade e movimento

2026-11-07.

- **Login de demonstração:** `/app/*` e `/admin/*` exigem sessão (`src/proxy.ts`). Credenciais fictícias partilhadas; o repositório guarda só o email e a verificação (`src/lib/demo-auth.ts`). Cookie `httpOnly`, 12 h; `/sair` termina a sessão. Sem limite de tentativas nem utilizadores: serve só para apresentar o protótipo.
- **WhatsApp:** `site.whatsapp.number` = `351912086476`, indicado pelo responsável do projeto. Falta confirmar com o Tiago que é o número profissional.
- **Identidade:** testada uma versão azul-gelo + grotesca larga em minúsculas e **revertida a pedido** (voltam o bronze e a condensada em maiúsculas, mais ligadas a treino e ginásio). O afastamento em relação ao site do stand fica no movimento, no layout de ecrã inteiro e nas secções simplificadas.
- **Movimento (CSS, sem JavaScript, desligado com `prefers-reduced-motion`):** zoom lento (`kenburns`) e parallax no hero; fotografias entram com máscara (`reveal-img`); linha do processo desenha-se (`draw-x`); barra de progresso de scroll (`scroll-progress`). Em navegadores sem `animation-timeline` o conteúdo fica estático.
- **PWA:** `src/app/manifest.ts` (standalone, `start_url` `/app`), ícones em `public/icons/`, `public/offline.html` e `public/sw.js` (registado só em produção por `src/components/pwa-register.tsx`). O service worker guarda só ficheiros estáticos (`/_next/static`, `/media`, `/icons`); páginas vêm sempre da rede e `/app` e `/admin` nunca ficam em cache. Instalar: Android/Chrome "Instalar app"; iPhone, Safari → Partilhar → "Adicionar ao ecrã principal". Sem notificações push nem uso offline dos dados.
