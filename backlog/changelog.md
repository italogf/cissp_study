# Changelog do Backlog

## 2026-04-23

### B1 — Gestão de Segurança e Risco (D1) — Finalizado
- Generalizado o seed para aceitar blocos customizados por lição sem quebrar as lições legadas.
- Expandido o Domínio 1 para 3 lições aprofundadas com cards adicionais cobrindo governança, vocabulário de risco, SLE/ARO/ALE, CIA, AAA, privacidade, safety, tratamento de risco, controles compensatórios e NIST RMF.
- Reescritos os exercícios do D1 para validar cálculo de ALE, integridade com assinatura digital e aceitação formal de risco residual.
- Aplicado o conteúdo no banco local com `pnpm db:seed`.
- Validação executada: `pnpm typecheck` e `pnpm db:seed`.

### B2 — Segurança de Ativos (D2) — Finalizado
- Expandido o Domínio 2 para 3 lições aprofundadas com blocos sobre classificação, níveis de sensibilidade, data ownership lifecycle, privacy by design, retenção, descarte, DLP, DRM, cópias em nuvem e privacy engineering.
- Reescritos os exercícios do D2 para validar minimização de dados, distinção entre DRM e DLP e uso de dados mascarados ou sintéticos em QA na nuvem.
- Aplicado o conteúdo no banco local com `pnpm db:seed`.
- Validação executada: `pnpm typecheck` e `pnpm db:seed`.

### B3 — Arquitetura e Engenharia de Segurança (D3) — Finalizado
- Expandido o Domínio 3 para 3 lições aprofundadas cobrindo princípios de design seguro, trusted computing base, reference monitor, Bell-LaPadula, Biba, Clark-Wilson, PKI, trusted hardware, controles físicos, virtualização, nuvem, IoT e OT/ICS.
- Reescritos os exercícios do D3 para validar escolha do modelo Clark-Wilson, uso de HSM para chaves-raiz de CA e segmentação Purdue-style entre OT, ambiente corporativo e nuvem.
- Aplicado o conteúdo no banco local com `pnpm db:seed`.
- Validação executada: `pnpm typecheck` e `pnpm db:seed`.

### B4 — Comunicação e Segurança de Rede (D4) — Finalizado
- Expandido o Domínio 4 para 3 lições aprofundadas cobrindo OSI/TCP-IP, riscos de protocolo, VLAN/DMZ/ZTNA, firewalls, IDS/IPS, TLS, SSH, IPsec, Wi-Fi corporativo, ataques ao caminho de entrega, anti-spoofing e monitoramento de rede.
- Reescritos os exercícios do D4 para validar uso de DMZ para exposição pública controlada, IPsec em modo túnel para VPN site-to-site e filtragem BCP38 para reduzir spoofing em ataques de reflexão.
- Aplicado o conteúdo no banco local com `pnpm db:seed`.
- Validação executada: `pnpm typecheck` e `pnpm db:seed`.

### B5 — IAM (D5) — Finalizado
- Expandido o Domínio 5 para 3 lições aprofundadas cobrindo fatores de autenticação, métricas biométricas, reference monitor, modelos DAC/MAC/RBAC/ABAC, governança do ciclo de vida da identidade, diretórios, federação, SCIM, PAM, Kerberos e zero trust IAM.
- Reescritos os exercícios do D5 para validar uso de ABAC em contexto clínico, PAM com elevação just-in-time para acesso administrativo temporário e identificação de Kerberoasting.
- Aplicado o conteúdo no banco local com `pnpm db:seed`.
- Validação executada: `pnpm typecheck` e `pnpm db:seed`.

### B6 — Avaliação e Teste de Segurança (D6) — Finalizado
- Expandido o Domínio 6 para 3 lições aprofundadas cobrindo taxonomia de assessment, tipos de auditoria, escopo, rules of engagement, autorização formal, independência, gestão de vulnerabilidades, CVE/CVSS, estilos e fases de pentest, SAST/DAST/IAST/SCA, assurance contínuo, métricas de segurança e governança de evidências.
- Reescritos os exercícios do D6 para validar escolha de auditoria externa de compliance, identificação de teste grey-box e necessidade de reteste para fechar um achado crítico.
- Aplicado o conteúdo no banco local com `pnpm db:seed`.
- Validação executada: `pnpm typecheck` e `pnpm db:seed`.

### B7 — Operações de Segurança (D7) — Finalizado
- Expandido o Domínio 7 para 3 lições aprofundadas cobrindo governança operacional, separation of duties, dual control, split knowledge, change management, baselines, CMDB, hardening, resposta a incidentes, order of volatility, chain of custody, métricas de recuperação, DR sites, SOC, SOAR, UEBA, threat intelligence, threat hunting, investigações e controles físicos de operações.
- Reescritos os exercícios do D7 para validar uso correto de emergency change durante exploração ativa, captura prioritária de memória volátil em resposta forense e threat hunting orientado por inteligência de ISAC antes de um alerta formal do SIEM.
- Aplicado o conteúdo no banco local com `node --env-file=.env --import tsx prisma/seed.ts`.
- Validação executada: `pnpm typecheck` e `node --env-file=.env --import tsx prisma/seed.ts`.

### B8 — Segurança no Desenvolvimento de Software (D8) — Finalizado
- Expandido o Domínio 8 para 3 lições aprofundadas cobrindo SDLC e governança de software, requisitos de segurança, abuse cases, threat modeling, OWASP-style vulnerability classes, secure coding, proteção de banco de dados, segurança de APIs, DevSecOps, CI/CD, SBOM, supply chain security, dependency confusion e controles de release/runtime.
- Reescritos os exercícios do D8 para validar integração de threat modeling no fluxo Agile, correção de falha de object-level authorization em API e mitigação de dependency confusion por controles de namespace/registry e proveniência.
- Atualizada a UX de estudo para mostrar o número do domínio junto do status nos cards, enriquecer a entrada de sprint com uma faixa de navegação por áreas-chave e permitir iniciar a sprint diretamente de uma área específica para revisão rápida.
- Aplicado o conteúdo no banco local com `node --env-file=.env --import tsx prisma/seed.ts`.
- Validação executada: `pnpm exec tsc --noEmit --pretty false`, `pnpm exec eslint app/[locale]/study/page.tsx app/[locale]/study/domain/[domainSlug]/page.tsx src/components/study/domain-launch-panel.tsx src/i18n/dictionaries.ts` e `node --env-file=.env --import tsx prisma/seed.ts`.