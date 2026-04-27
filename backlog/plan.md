# Plano: Deep Study Cards com Âncoras de Filme

## Problema
O passo LEARN atual mostra 3 blocos planos (intro, cenário, pontos-chave) e imediatamente leva ao QUESTION. O conteúdo é raso demais para preparação real no CISSP.

## Solução Proposta
Transformar o LEARN em um deck de cards navegáveis (um por vez), com profundidade real por tópico, âncoras de filmes/séries como gatilho mnemônico, e o botão "Tentar pergunta" aparecendo SOMENTE no último card.

## Mudanças Técnicas

### 1. Schema (prisma/schema.prisma)
- Adicionar `CONCEPT` e `MOVIE_CUE` ao enum `ContentBlockType`
- Adicionar `movieCue String? @db.Text` e `movieTitle String?` em `ContentBlockTranslation`
- Migração: `add-deep-content-blocks`

### 2. Componente (src/components/study/study-card-deck.tsx)
- `"use client"` — navegação local entre cards (useState)
- Props: `blocks[]`, `sessionId`, `locale`, `advanceAction`
- MOVIE_CUE → card visual diferenciado (cinematic, fundo escuro com Lemon accent)
- Counter: "Conceito 3 de 7"
- Botões: Anterior / Próximo (local, sem round-trip)
- Último card: form submit → avança para QUESTION

### 3. CSS (app/globals.css)
- `.card-deck-shell`, `.card-deck-card`, `.card-deck-nav`
- `.movie-cue-card` (dark/cinematic card)
- `.concept-card`, `.card-deck-counter`
- `.card-dots` (bolinhas de progresso visual)

### 4. i18n (src/i18n/dictionaries.ts)
- `studySession.cardOf`, `studySession.prevCard`, `studySession.nextCard`
- `studySession.allCardsReadyLabel`, `studySession.tryQuestionAction`

### 5. Session Page (app/[locale]/study/session/[sessionId]/page.tsx)
- LEARN step: substituir `lesson-block-grid` por `<StudyCardDeck>`

### 6. Seed (prisma/seed.ts)
- Todos os 8 domínios reescritos com 6-8 cards de profundidade real
- Cada domínio: INTRO + 4-5 CONCEPT + MOVIE_CUE + KEY_POINTS
- Referências de filmes por domínio

## Conteúdo por Domínio

### D1 - Security and Risk Management
Cards: CIA Triad aplicada ao risco, Vocabulário de risco (Threat/Vulnerability/Asset), ALE/SLE/ARO, Risk Treatment (Avoid/Transfer/Mitigate/Accept), NIST RMF/ISO31000, Risco Inerente vs Residual vs Controle Compensatório
Filme: The Big Short (risk acceptance going wrong)

### D2 - Asset Security
Cards: Classificação drives tudo, Níveis (Public/Internal/Confidential/Restricted), Roles (Owner/Custodian/User), Lifecycle (Create→Destroy), DLP types, Handling rules
Filme: Mission Impossible (data in the wrong hands)

### D3 - Security Architecture and Engineering
Cards: Design princípios (Least Privilege/Defense-in-Depth/Fail-Safe), Segmentação e blast radius, Trust Models (Zero Trust vs Perimeter), Secure by Default vs Secure by Design
Filme: Ocean's Eleven (layers of defense)

### D4 - Communication and Network Security
Cards: OSI e onde ataques acontecem, TLS/SSL/VPN, Segmentação (VLAN/DMZ/Air Gap), Management Plane vs Data Plane, Protocolos seguros vs legados
Filme: Enemy of the State (traffic interception)

### D5 - Identity and Access Management
Cards: Fatores de autenticação (MFA), Authorization models (RBAC/ABAC/DAC/MAC), PAM e JIT, Identity Lifecycle, Role drift e provisioning
Filme: The Bourne Identity (identity without boundaries)

### D6 - Security Assessment and Testing
Cards: Assessment Types (Audit/Pentest/Vulnerability Scan), Pentest Phases (Recon→Report), Black/White/Gray Box, CVSS/CVE, Metrics e remediation priority
Filme: Mr. Robot (real reconnaissance methodology)

### D7 - Security Operations
Cards: Incident Response Lifecycle (Prepare→Lessons Learned), Evidence Handling (Chain of Custody/Order of Volatility), SIEM e SOC, BCP/DRP (RTO/RPO/MTTR/MTBF)
Filme: Zero Days (incident response under pressure)

### D8 - Software Development Security
Cards: SDLC e DevSecOps, OWASP Top 10, SAST vs DAST, Code Review, Supply Chain Security
Filme: The Social Network (code vulnerabilities with real consequences)

## Fluxo Final
MISSION → LEARN (cards 1…N, nav local) → QUESTION (só no último card) → REVIEW → close sprint

## Checklist
- [x] Migracao Prisma aplicada
- [x] Seed reescrito e aplicado
- [x] StudyCardDeck component criado
- [x] CSS adicionado
- [x] i18n atualizado
- [x] Session page atualizada
- [x] Lint, typecheck, testes e build executados

## Entregue neste ciclo (2026-04-23)
- [x] Cada card de conceito tem breadcrumb pill "Domínio · Lição" no topo
- [x] Botão "✦ Ask AI" em cada card abre painel inline com 5 chips de perguntas pré-definidas
- [x] API route /api/study/ai-explain com proteção contra prompt injection (slugs, sem texto livre)
- [x] Streaming de resposta via ReadableStream + TextDecoder
- [x] Build limpo, lint e typecheck passando

## Backlog de Profundidade de Domínio
Arquivo completo salvo em: files/cissp-domain-depth-backlog.md

Ordem de prioridade para expandir o seed:

### B1 — Gestão de Segurança e Risco (D1) — Finalizado
Status: Finalizado em 2026-04-23.

Expandir para cobrir: CIA Triad completa (Confidentiality→Data Classification→Levels/Roles/Lifecycle/DLP/Encryption; Integrity→Hashing/Digital Signatures/HMAC/Non-Repudiation; Availability→Redundancy/HA Metrics/DoS Protection); AAA; Privacy; Safety; ALE/SLE/ARO; Risk Treatment; NIST RMF.

### B2 — Segurança de Ativos (D2) — Finalizado
Status: Finalizado em 2026-04-23.

Expandir: Data Classification depth; DRM; Retenção e destruição; Privacy Engineering; Data ownership lifecycle.

### B3 — Arquitetura e Engenharia de Segurança (D3) — Finalizado
Status: Finalizado em 2026-04-23.

Expandir: Secure design principles; Trusted Computing Base; Security models (Bell-LaPadula, Biba, Clark-Wilson); Cryptography depth (symmetric/asymmetric/PKI); Physical security.

### B4 — Comunicação e Segurança de Rede (D4) — Finalizado
Status: Finalizado em 2026-04-23.

Expandir: OSI layer threats; Protocols (TLS/SSL/SSH/IPSEC); Network segmentation (VLAN/DMZ/Zero Trust); Wireless security; Content delivery attacks.

### B5 — IAM (D5) — Finalizado
Status: Finalizado em 2026-04-23.

Expandir: Authentication factors depth; Authorization models (RBAC/ABAC/MAC/DAC); PAM; Identity governance; Federation (SAML/OAuth/OIDC).

### B6 — Avaliação e Teste de Segurança (D6) — Finalizado
Status: Finalizado em 2026-04-23.

Expandir: Assessment types taxonomy; Pentest phases; CVSS scoring; Audit types; Metrics and KPIs.

### B7 — Operações de Segurança (D7) — Finalizado
Status: Finalizado em 2026-04-24.

Expandir: IR lifecycle (NIST/SANS); Digital forensics; Chain of custody; BCP/DRP (RTO/RPO/MTTR/MTBF); SOC operations; Threat hunting.

### B8 — Segurança no Desenvolvimento de Software (D8) — Finalizado
Status: Finalizado em 2026-04-24.

Expandir: SDLC models; DevSecOps; OWASP Top 10 depth; SAST/DAST/IAST; Supply chain security; Code review techniques.
