# Arquitetura de segurança — recomendada (NÃO implementada)

> **Estado atual (Fase 01):** nenhuma rota está protegida. `/app/*` e `/admin/*` são protótipos navegáveis por qualquer pessoa, com dados fictícios, marcados `noindex`. Os ecrãs de login não autenticam, não enviam e não guardam nada (sem cookies, `localStorage` ou `sessionStorage`).

## Princípios para a fase de autenticação

1. **Sessões validadas no servidor.** Cookie `HttpOnly`, `Secure`, `SameSite=Lax`, identificador opaco; sessão guardada no servidor (ou JWT de curta duração com rotação). Nunca confiar em estado do navegador.
2. **Funções separadas:** `client` e `admin` (treinador). O administrador nunca é deduzido de um campo editável pelo utilizador.
3. **Autorização em cada operação, no servidor.** Uma camada de acesso a dados (`src/server/dal/*`, a criar com `import "server-only"`) com funções como `requireSession()`, `requireAdmin()`, `requireClientAccess(clientId)`.
   - O `proxy.ts` (antigo middleware no Next 16) serve apenas para redirecionamentos otimistas. **Não é** a barreira de segurança.
   - Os layouts também não: cada página, Server Action e Route Handler tem de verificar a sessão.
4. **Isolamento por cliente:** todas as consultas de cliente filtradas por `session.clientId` no servidor; testes automáticos que garantem que o cliente A não acede aos dados do cliente B (IDOR).
5. **Validação de entradas no servidor** (ex.: Zod) em todas as Server Actions/APIs; nunca confiar na validação do formulário.
6. **Segredos:** apenas em variáveis de ambiente (`.env.local` fora do Git — já coberto pelo `.gitignore`); nada de prefixo `NEXT_PUBLIC_` em segredos.
7. **Proteção contra força bruta:** limite de tentativas por IP + conta, atraso progressivo, bloqueio temporário, mensagens de erro genéricas.
8. **2FA para o administrador** (o ecrã `/admin/login` já reserva o campo de código).
9. **Vídeos e ficheiros privados:** armazenamento privado; acesso só por URLs assinados de curta duração, emitidos após verificação de autorização. Nada de URLs públicos permanentes para conteúdos de clientes.
10. **Registos de segurança** (logins, falhas, alterações de permissões) sem dados pessoais desnecessários; sem palavras-passe, tokens ou dados de saúde nos logs.

## Proteção de dados (RGPD)

- Dados de **saúde, alimentação e condição física** são categorias especiais (art. 9.º RGPD): base legal explícita (normalmente consentimento explícito), minimização, acesso restrito, cifra em repouso.
- Registo das atividades de tratamento, política de privacidade, prazos de conservação, direitos de acesso/portabilidade/eliminação (o ecrã `/app/perfil` já tem os botões reservados, desativados).
- Contrato de subcontratação (DPA) com fornecedores de alojamento, base de dados, email e vídeo; preferir alojamento na UE.
- **Plano alimentar:** só ativar com profissional habilitado identificado (ex.: nutricionista com cédula da Ordem dos Nutricionistas) e responsável pelo conteúdo.

## Onde encaixar no código atual

| Necessidade | Local previsto |
| --- | --- |
| Dados reais | Substituir `src/data/demo/*` por `src/server/dal/*` (os componentes já recebem dados por props) |
| Utilizador atual | `AppShell` recebe `user` por props → passar a vir da sessão no layout |
| Verificação de função | Início de cada `page.tsx` em `/admin/(painel)` e em cada Server Action |
| Redirecionamento de não autenticados | `src/proxy.ts` (otimista) + verificação real na DAL |
| Login | Substituir o `onSubmit` de `LoginForm` por uma Server Action com rate limiting |
