# Tiago Resende — Fitness Coaching Platform

**Protótipo navegável (Fase 06).** Website público com conteúdo e fotografias reais autorizadas; área de cliente e painel do treinador com dados fictícios. **Sem autenticação, base de dados ou persistência.**

## Arrancar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run lint
```

> **Nota de desenvolvimento:** neste projeto, alterações aos tokens `@theme` em `src/app/globals.css` — e, por vezes, classes Tailwind novas — nem sempre são recarregadas pelo `next dev` (cache em disco do Turbopack com `@tailwindcss/turbopack`). Se uma alteração de CSS não aparecer: parar o servidor, apagar `.next/dev` e voltar a arrancar. A build de produção não é afetada.

Stack: Next.js 16.4 (App Router, Cache Components, Turbopack) · React 19.3 · TypeScript · Tailwind CSS 4 · lucide-react.

## Rotas

| Área | Rotas |
| --- | --- |
| Público | `/` · `/login` (cliente) · `/admin/login` (treinador) |
| Cliente | `/app` · `/app/treinos` · `/app/treinos/[id]` · `/app/plano-alimentar` · `/app/videos` · `/app/videos/[id]` · `/app/calendario` · `/app/perfil` |
| Treinador | `/admin` · `/admin/clientes` · `/admin/clientes/[id]` · `/admin/treinos` · `/admin/treinos/[id]` · `/admin/planos-alimentares` · `/admin/videos` · `/admin/videos/[id]` · `/admin/calendario` · `/admin/definicoes` |

IDs de demonstração: `demo-ses-a…d`, `demo-vid-01…09`, `demo-cli-01…05`.

## Estrutura

```
src/
  app/                    rotas (admin/(painel) = grupo com o shell do treinador)
  components/
    ui/                   botões, cartões, badges, formulários, tabela, tabs, toggle, estados vazios, demo
    brand/                wordmark, ícones, botões WhatsApp/Instagram
    shell/                AppShell partilhado (sidebar desktop + navegação inferior mobile)
    landing/              secções da página pública
    calendar/ training/ video/ nutrition/ auth/ admin/
  config/site.ts          marca, contactos, nutrição e campos pendentes
  config/commercial.ts    método, modalidades, planos, testemunhos e resultados
  config/media.ts         inventário das imagens usadas (origem, crédito, autorização)
  data/demo/              ⚠️ dados fictícios, separados dos componentes
  lib/                    tipos de domínio, formatação de datas, WhatsApp
public/media/             imagens recortadas e otimizadas (sem metadados)
docs/                     análise do Instagram, direção visual, segurança, pendentes, recursos
```

## O que funciona / o que não funciona

| Funciona (demonstração) | Não funciona (por desenho) |
| --- | --- |
| Navegação completa entre todos os ecrãs | Autenticação e controlo de acesso |
| Calendário mês/semana, filtros de vídeos, separadores do plano alimentar | Guardar, criar, editar ou eliminar qualquer dado |
| Validação visual e estados de carregamento nos logins e formulários | Upload, armazenamento e streaming de vídeo |
| Responsivo (375 px → desktop), teclado, `prefers-reduced-motion` | Sincronização de calendário, reservas, notificações, emails, pagamentos |

## Documentação

- [Análise do Instagram](docs/ANALISE-INSTAGRAM.md)
- [Direção visual](docs/DIRECAO-VISUAL.md)
- [Arquitetura de segurança (recomendada)](docs/ARQUITETURA-SEGURANCA.md)
- [Informação pendente](docs/PENDENTES.md)
- [Inventário de recursos](docs/RECURSOS.md)
- [Fase 02 — refinamento visual](docs/FASE-02.md)
- [Fase 04 — refinamento cirúrgico](docs/FASE-04.md)
- [Fase 05 — conteúdo real e preparação comercial](docs/FASE-05.md)
- [Fase 06 — direção cinematográfica e simplificação](docs/FASE-06.md)
