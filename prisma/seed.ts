import {
  ContentBlockType,
  CurriculumNodeKind,
  ExerciseType,
  Prisma,
  PrismaClient
} from "@prisma/client";
import { buildDeepDomainSeeds } from "./deep-domain-seeds";

const prisma = new PrismaClient();

const LOCALES = ["en", "pt-BR"] as const;

type LocaleCode = (typeof LOCALES)[number];
type Localized<T> = Record<LocaleCode, T>;

type MovieAnchorSeed = {
  title: Localized<string>;
  cue: Localized<string>;
  body: Localized<string>;
};

type BlockSeed = {
  key: string;
  type: ContentBlockType;
  title?: Localized<string>;
  body: Localized<string>;
  movieTitle?: Localized<string>;
  movieCue?: Localized<string>;
};

type OptionSeed = {
  key: string;
  isCorrect: boolean;
  text: Localized<string>;
  feedback: Localized<string>;
};

type ExerciseSeed = {
  prompt: Localized<string>;
  supportText?: Localized<string>;
  correctRationale: Localized<string>;
  remediationNote?: Localized<string>;
  options: OptionSeed[];
};

type StructuredLessonSeed = {
  slug: string;
  estimatedMinutes: number;
  title: Localized<string>;
  summary: Localized<string>;
  objective: Localized<string>;
  blocks: BlockSeed[];
  exercise: ExerciseSeed;
};

type LegacyLessonSeed = {
  slug: string;
  estimatedMinutes: number;
  title: Localized<string>;
  summary: Localized<string>;
  objective: Localized<string>;
  intro: Localized<string>;
  conceptOne: Localized<string>;
  conceptTwo: Localized<string>;
  movie: MovieAnchorSeed;
  keyPoints: Localized<string>;
  exercise: ExerciseSeed;
};

type LessonSeed = StructuredLessonSeed | LegacyLessonSeed;

type DomainSeed = {
  number: number;
  slug: string;
  estimatedMinutes: number;
  title: Localized<string>;
  summary: Localized<string>;
  objective: Localized<string>;
  lessons: LessonSeed[];
};

type ProgramTranslationSeed = {
  title: Localized<string>;
  description: Localized<string>;
};

type NodeTranslationSeed = {
  title: Localized<string>;
  shortTitle?: Localized<string>;
  summary?: Localized<string>;
  objective?: Localized<string>;
};

type ProgramSeed = {
  slug: string;
  code: string;
  family: string;
  vendor: string;
  defaultLocale: LocaleCode;
  versionCode: string;
  blueprintLabel: string;
  sourceRef: string;
  translations: ProgramTranslationSeed;
};

type AdaptiveExerciseProfile = {
  codeSuffix: string;
  orderIndex: number;
  estimatedSeconds: number;
  difficulty: number;
  promptLead?: Localized<string>;
  hideSupport?: boolean;
};

type AdaptiveExerciseVariant = ExerciseSeed & {
  codeSuffix: string;
  orderIndex: number;
  estimatedSeconds: number;
  difficulty: number;
};

const defaultBlockTitles = {
  intro: t("Why this matters", "Por que isso importa"),
  conceptOne: t("Core idea", "Ideia central"),
  conceptTwo: t("What to watch", "No que prestar atenção"),
  movieCue: t("Memory cue", "Pista de memória"),
  keyPoints: t("Key points", "Pontos-chave")
};

const adaptiveExerciseProfiles: AdaptiveExerciseProfile[] = [
  {
    codeSuffix: "easy",
    orderIndex: 1,
    estimatedSeconds: 90,
    difficulty: 1,
    promptLead: t("Warm-up: ", "Aquecimento: ")
  },
  {
    codeSuffix: "",
    orderIndex: 2,
    estimatedSeconds: 75,
    difficulty: 2
  },
  {
    codeSuffix: "hard",
    orderIndex: 3,
    estimatedSeconds: 60,
    difficulty: 3,
    promptLead: t("Exam mode: ", "Modo prova: "),
    hideSupport: true
  }
];

const programSeed: ProgramSeed = {
  slug: "cissp",
  code: "CISSP",
  family: "cybersecurity-certification",
  vendor: "ISC2",
  defaultLocale: "en",
  versionCode: "2024.1",
  blueprintLabel: "ISC2 CISSP CBK 2024",
  sourceRef: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
  translations: {
    title: t("CISSP exam prep", "Preparação para o exame CISSP"),
    description: t(
      "Deep CISSP study with short checkpoints, clear decisions, and bilingual scenario practice.",
      "Estudo profundo de CISSP com checkpoints curtos, decisões claras e prática bilíngue baseada em cenários."
    )
  }
};

function mergeLocalizedText(lead: Localized<string> | undefined, body: Localized<string>) {
  if (!lead) {
    return null;
  }

  return {
    en: `${lead.en}${body.en}`,
    "pt-BR": `${lead["pt-BR"]}${body["pt-BR"]}`
  };
}

function buildAdaptiveExerciseVariants(exerciseSeed: ExerciseSeed): AdaptiveExerciseVariant[] {
  return adaptiveExerciseProfiles.map((profile) => ({
    ...exerciseSeed,
    codeSuffix: profile.codeSuffix,
    orderIndex: profile.orderIndex,
    estimatedSeconds: profile.estimatedSeconds,
    difficulty: profile.difficulty,
    prompt: mergeLocalizedText(profile.promptLead, exerciseSeed.prompt) ?? exerciseSeed.prompt,
    supportText: profile.hideSupport ? undefined : exerciseSeed.supportText,
    correctRationale: exerciseSeed.correctRationale,
    remediationNote: exerciseSeed.remediationNote,
    options: exerciseSeed.options
  }));
}

const baseDomains: DomainSeed[] = [
  {
    number: 1,
    slug: "security-and-risk-management",
    estimatedMinutes: 126,
    title: t("Security and Risk Management", "Segurança e Gestão de Risco"),
    summary: t(
      "Build the judgment for ethics, law, governance, resilience, and risk that anchors the rest of CISSP.",
      "Construa o julgamento sobre ética, direito, governança, resiliência e risco que sustenta o restante do CISSP."
    ),
    objective: t(
      "Practice how leaders classify risk, protect evidence, meet obligations, and make defensible security decisions under pressure.",
      "Pratique como líderes classificam risco, protegem evidências, cumprem obrigações e tomam decisões defensáveis de segurança sob pressão."
    ),
    lessons: [
      lesson({
        slug: "ethics-and-professional-escalation",
        estimatedMinutes: 9,
        title: t("Ethics, duty, and professional escalation", "Ética, dever e escalada profissional"),
        summary: t(
          "Learn what to protect first when loyalty, pressure, and security facts collide.",
          "Aprenda o que proteger primeiro quando lealdade, pressão e fatos de segurança entram em choque."
        ),
        objective: t(
          "Apply the ISC2 Code of Ethics, preserve evidence, and escalate through the right channel.",
          "Aplique o Código de Ética da ISC2, preserve evidências e escale pelo canal correto."
        ),
        blocks: [
          introBlock(
            t(
              "Ethics in Domain 1 is practical. It appears when someone asks you to stay quiet, cut a corner, or hide facts that others need to stay safe.",
              "Ética no Domínio 1 é prática. Ela aparece quando alguém pede silêncio, atalho ou ocultação de fatos que outras pessoas precisam para ficar seguras."
            )
          ),
          conceptBlock(
            "code-of-ethics",
            t("The Code of Ethics sets the priority order", "O Código de Ética define a ordem de prioridade"),
            t(
              "The ISC2 canons start with protecting society, the common good, and infrastructure. Then they ask you to act honorably, give competent service, and advance the profession. When pressure rises, that order matters.",
              "Os cânones da ISC2 começam protegendo a sociedade, o bem comum e a infraestrutura. Depois pedem que você atue com honra, ofereça serviço competente e fortaleça a profissão. Quando a pressão aumenta, essa ordem importa."
            )
          ),
          conceptBlock(
            "ethics-vs-loyalty",
            t("Loyalty never outranks safety and honesty", "Lealdade nunca fica acima de segurança e honestidade"),
            t(
              "Being loyal to a manager, client, or team does not justify hiding material risk. Professional trust grows when facts are handled clearly, documented well, and escalated through the right path.",
              "Ser leal a um gestor, cliente ou equipe não justifica esconder risco relevante. A confiança profissional cresce quando os fatos são tratados com clareza, bem documentados e escalados pelo caminho certo."
            )
          ),
          conceptBlock(
            "preserve-evidence",
            t("Preserve evidence before opinions spread", "Preserve a evidência antes que as opiniões se espalhem"),
            t(
              "If you find signs of misconduct or an unreported incident, preserve what you saw, record context, and avoid altering the evidence. A weak evidence trail can turn a solvable issue into a legal and ethical mess.",
              "Se você encontrar sinais de má conduta ou de um incidente não reportado, preserve o que viu, registre o contexto e evite alterar a evidência. Um rastro fraco de evidências pode transformar um problema tratável em um caos legal e ético."
            )
          ),
          conceptBlock(
            "proper-escalation",
            t("Escalation should be authorized and documented", "A escalada deve ser autorizada e documentada"),
            t(
              "The best next step is usually to use the defined path: manager, legal, compliance, HR, incident response, or another authorized channel. Quiet side deals and informal promises create more risk, not less.",
              "O melhor próximo passo costuma ser usar o caminho definido: gestor, jurídico, compliance, RH, resposta a incidentes ou outro canal autorizado. Acordos silenciosos e promessas informais criam mais risco, não menos."
            )
          ),
          conceptBlock(
            "competence-and-scope",
            t("Act within competence, but do not ignore the signal", "Aja dentro da sua competência, mas não ignore o sinal"),
            t(
              "You do not need to run your own secret investigation to act professionally. You do need to preserve the facts, avoid contamination, and hand the matter to people with the right authority.",
              "Você não precisa conduzir uma investigação secreta por conta própria para agir de forma profissional. Precisa, sim, preservar os fatos, evitar contaminação e entregar o caso a quem tem a autoridade correta."
            )
          ),
          movieCueBlock({
            title: t("Spotlight", "Spotlight"),
            cue: t(
              "Remember how facts only mattered because the team protected evidence, checked the story, and refused quiet shortcuts.",
              "Lembre como os fatos só importaram porque a equipe protegeu a evidência, checou a história e recusou atalhos silenciosos."
            ),
            body: t(
              "Use that cue for professional ethics: preserve the record, escalate cleanly, and do not let convenience outrun duty.",
              "Use essa pista para ética profissional: preserve o registro, escale com clareza e não deixe a conveniência passar na frente do dever."
            )
          }),
          keyPointsBlock(
            t(
              "Protect society first. Preserve evidence. Escalate through the right channel. Loyalty and speed never justify hiding material facts.",
              "Proteja a sociedade primeiro. Preserve evidências. Escale pelo canal correto. Lealdade e velocidade nunca justificam esconder fatos relevantes."
            )
          )
        ],
        exercise: {
          prompt: t(
            "You find evidence that a client executive may be hiding a reportable security incident. What is the BEST first response?",
            "Você encontra evidências de que um executivo do cliente pode estar escondendo um incidente de segurança que precisa ser reportado. Qual é a MELHOR primeira resposta?"
          ),
          supportText: t(
            "Pick the action that protects evidence and follows professional duty.",
            "Escolha a ação que protege a evidência e segue o dever profissional."
          ),
          correctRationale: t(
            "Best answer: preserve the evidence, document it, and use an authorized path. That protects the record and meets ethical, legal, and governance duties.",
            "Melhor resposta: preserve a evidência, documente o caso e use um caminho autorizado. Isso protege o registro e atende aos deveres éticos, legais e de governança."
          ),
          remediationNote: t(
            "Do not hide, delete, or privately bargain over evidence when the issue may affect others.",
            "Não esconda, apague nem negocie evidências em privado quando o problema pode afetar outras pessoas."
          ),
          options: [
            option(
              "A",
              true,
              t(
                "Preserve the evidence, document the context, and escalate through the proper authorized channel",
                "Preservar a evidência, documentar o contexto e escalar pelo canal autorizado correto"
              ),
              t(
                "Correct. This protects the record and hands the matter to the people with the right authority.",
                "Correto. Isso protege o registro e entrega o caso a quem tem a autoridade correta."
              )
            ),
            option(
              "B",
              false,
              t(
                "Wait for the executive's explanation before documenting anything",
                "Esperar a explicação do executivo antes de documentar qualquer coisa"
              ),
              t(
                "Not best. Waiting first can lose evidence and weaken escalation.",
                "Não é a melhor. Esperar primeiro pode perder evidência e enfraquecer a escalada."
              )
            ),
            option(
              "C",
              false,
              t(
                "Delete the evidence from your working files and ask the client to self-report later if needed",
                "Apagar a evidência dos seus arquivos de trabalho e pedir ao cliente que se autodenuncie depois, se necessário"
              ),
              t(
                "Not best. Destroying or hiding evidence makes the ethical and legal problem worse.",
                "Não é a melhor. Destruir ou esconder evidências piora o problema ético e legal."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "governance-and-risk-basics",
        estimatedMinutes: 9,
        title: t("Governance and the risk language", "Governança e a linguagem do risco"),
        summary: t(
          "Learn who makes risk decisions and how to measure loss.",
          "Aprenda quem toma decisões de risco e como medir perda."
        ),
        objective: t(
          "Separate governance from management, understand the main risk terms, and calculate annualized loss.",
          "Separe governança de gestão, entenda os principais termos de risco e calcule a perda anualizada."
        ),
        blocks: [
          introBlock(
            t(
              "Domain 1 is the operating system for CISSP. When you know who owns the decision, what is at risk, and how loss is measured, later choices make more sense.",
              "O Domínio 1 é o sistema operacional do CISSP. Quando você sabe quem decide, o que está em risco e como a perda é medida, as escolhas seguintes fazem mais sentido."
            )
          ),
          conceptBlock(
            "governance-accountability",
            t("Governance sets direction", "Governança define a direção"),
            t(
              "Board and senior leaders approve policy, define risk appetite, and accept residual risk. Security leadership advises and measures. Management and operations execute inside that direction.",
              "Conselho e alta liderança aprovam políticas, definem apetite ao risco e aceitam risco residual. A liderança de segurança orienta e mede. Gestão e operações executam dentro dessa direção."
            )
          ),
          conceptBlock(
            "policy-hierarchy",
            t("Policy hierarchy turns intent into repeatable behavior", "A hierarquia de políticas transforma intenção em comportamento repetível"),
            t(
              "Policy states management intent. Standards are mandatory. Guidelines help when judgment is allowed. Procedures explain the exact steps people follow.",
              "Política expressa a intenção da gestão. Padrões são obrigatórios. Diretrizes ajudam quando há espaço para julgamento. Procedimentos explicam os passos exatos que as pessoas seguem."
            )
          ),
          conceptBlock(
            "risk-vocabulary",
            t("Risk exists when a threat can exploit a vulnerability", "Risco existe quando uma ameaça pode explorar uma vulnerabilidade"),
            t(
              "An asset has value. A threat can cause harm. A vulnerability is the weakness that makes harm possible. Likelihood and impact together describe the risk worth managing.",
              "Um ativo tem valor. Uma ameaça pode causar dano. Uma vulnerabilidade é a fraqueza que torna o dano possível. Probabilidade e impacto juntos descrevem o risco que precisa ser gerenciado."
            )
          ),
          conceptBlock(
            "risk-levels",
            t("Inherent and residual risk are not the same", "Risco inerente e risco residual não são a mesma coisa"),
            t(
              "Inherent risk exists before controls. Residual risk is what remains after controls are applied. Risk appetite and tolerance define how much remaining uncertainty leadership is willing to live with.",
              "Risco inerente existe antes dos controles. Risco residual é o que resta depois da aplicação dos controles. Apetite e tolerância ao risco definem quanta incerteza remanescente a liderança aceita conviver."
            )
          ),
          conceptBlock(
            "quantitative-risk",
            t("SLE, ARO, and ALE connect cyber to money", "SLE, ARO e ALE conectam segurança a dinheiro"),
            t(
              "SLE = asset value × exposure factor. ALE = SLE × ARO. The goal is not perfect math. The goal is a clearer business conversation.",
              "SLE = valor do ativo × fator de exposição. ALE = SLE × ARO. O objetivo não é matemática perfeita. O objetivo é uma conversa mais clara com o negócio."
            )
          ),
          conceptBlock(
            "risk-treatment",
            t("Risk treatment changes the decision, not the past", "Tratar risco muda a decisão, não o passado"),
            t(
              "You avoid risk by stopping the activity, mitigate it with controls, transfer financial impact through contracts or insurance, or accept the residual risk deliberately. Acceptance belongs to the right business owner.",
              "Você evita o risco ao parar a atividade, o mitiga com controles, transfere o impacto financeiro por contrato ou seguro, ou aceita o risco residual deliberadamente. A aceitação pertence ao dono correto do negócio."
            )
          ),
          movieCueBlock({
            title: t("The Big Short", "A Grande Aposta"),
            cue: t(
              "Remember ignored assumptions compounding until losses become impossible to deny.",
              "Lembre de premissas ignoradas se acumulando até que as perdas se tornem impossíveis de negar."
            ),
            body: t(
              "Use that cue to remember why risk language matters: organizations fail when leadership accepts exposure it does not truly understand.",
              "Use essa pista para lembrar por que a linguagem de risco importa: organizações falham quando a liderança aceita uma exposição que não entende de verdade."
            )
          }),
          keyPointsBlock(
            t(
              "Governance owns direction. Risk vocabulary creates shared understanding. ALE gives a financial lens. Treatment choices must be explicit and owned.",
              "Governança é dona da direção. O vocabulário de risco cria entendimento compartilhado. ALE oferece uma lente financeira. Escolhas de tratamento precisam ser explícitas e ter dono."
            )
          )
        ],
        exercise: {
          prompt: t(
            "An application has an asset value of $400,000, an exposure factor of 25%, and an annualized rate of occurrence of 2. What is the ALE?",
            "Uma aplicação tem valor de ativo de US$ 400.000, fator de exposição de 25% e taxa anual de ocorrência igual a 2. Qual é o ALE?"
          ),
          supportText: t("Calculate SLE first, then multiply by ARO.", "Calcule o SLE primeiro e depois multiplique pelo ARO."),
          correctRationale: t(
            "SLE is $100,000. ALE is $200,000.",
            "O SLE é US$ 100.000. O ALE é US$ 200.000."
          ),
          remediationNote: t(
            "Do not skip the middle step. ALE uses the single-loss value after exposure has been applied.",
            "Não pule a etapa intermediária. O ALE usa o valor de perda única depois que a exposição já foi aplicada."
          ),
          options: [
            option(
              "A",
              true,
              t("$200,000", "US$ 200.000"),
              t(
                "Correct. $100,000 times 2 gives an ALE of $200,000.",
                "Correto. US$ 100.000 vezes 2 gera ALE de US$ 200.000."
              )
            ),
            option(
              "B",
              false,
              t("$100,000", "US$ 100.000"),
              t(
                "Not best. That is the SLE, not the annualized loss.",
                "Não é a melhor. Esse é o SLE, não a perda anualizada."
              )
            ),
            option(
              "C",
              false,
              t("$800,000", "US$ 800.000"),
              t(
                "Not best. That multiplies the asset value directly by ARO and ignores the exposure factor.",
                "Não é a melhor. Isso multiplica o valor do ativo diretamente pelo ARO e ignora o fator de exposição."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "controls-and-separation-of-duties",
        estimatedMinutes: 9,
        title: t("CIA, AAA, privacy, and safety", "CIA, AAA, privacidade e segurança física"),
        summary: t(
          "Learn what each security goal protects and which control fits each one.",
          "Aprenda o que cada objetivo de segurança protege e qual controle combina com cada um."
        ),
        objective: t(
          "Differentiate confidentiality, integrity, availability, AAA, privacy, and safety.",
          "Diferencie confidencialidade, integridade, disponibilidade, AAA, privacidade e segurança física."
        ),
        blocks: [
          introBlock(
            t(
              "The exam often asks which protection goal a control serves. The right answer depends on what matters most: secrecy, trusted change, resilience, lawful data handling, or human safety.",
              "A prova muitas vezes pergunta qual objetivo de proteção um controle atende. A resposta certa depende do que mais importa: sigilo, mudança confiável, resiliência, tratamento lícito de dados ou segurança das pessoas."
            )
          ),
          conceptBlock(
            "confidentiality-classification",
            t("Confidentiality begins with classification", "Confidencialidade começa com classificação"),
            t(
              "Confidentiality is not just encryption. It starts with labeling data correctly, assigning an owner, defining handling rules, and enforcing need to know through the entire lifecycle.",
              "Confidencialidade não é apenas criptografia. Ela começa ao classificar corretamente os dados, atribuir um dono, definir regras de manuseio e aplicar necessidade de saber durante todo o ciclo de vida."
            )
          ),
          conceptBlock(
            "confidentiality-controls",
            t("Encryption and DLP support confidentiality differently", "Criptografia e DLP apoiam a confidencialidade de formas diferentes"),
            t(
              "Encryption keeps data unreadable at rest and in transit. DLP watches where sensitive data is going and blocks or warns on policy-breaking movement. One protects content; the other governs flow.",
              "Criptografia mantém os dados ilegíveis em repouso e em trânsito. DLP observa para onde dados sensíveis estão indo e bloqueia ou alerta quando há movimento contra a política. Um protege o conteúdo; o outro governa o fluxo."
            )
          ),
          conceptBlock(
            "integrity-controls",
            t("Integrity means trusted data and trusted change", "Integridade significa dado confiável e mudança confiável"),
            t(
              "Hashes detect change. HMAC adds assurance that a shared secret was involved. Digital signatures provide integrity, source authentication, and non-repudiation when private keys are controlled correctly.",
              "Hashes detectam alteração. HMAC acrescenta garantia de que um segredo compartilhado participou do processo. Assinaturas digitais oferecem integridade, autenticação de origem e não repúdio quando as chaves privadas são controladas corretamente."
            )
          ),
          conceptBlock(
            "availability-controls",
            t("Availability is engineered with resilience", "Disponibilidade é construída com resiliência"),
            t(
              "Availability comes from redundancy, clustering, backups, fault tolerance, capacity planning, and denial-of-service protection. Metrics like MTBF and MTTR help teams see whether resilience is actually improving.",
              "Disponibilidade vem de redundância, clusterização, backups, tolerância a falhas, planejamento de capacidade e proteção contra negação de serviço. Métricas como MTBF e MTTR ajudam a mostrar se a resiliência está realmente melhorando."
            )
          ),
          conceptBlock(
            "aaa",
            t("AAA explains who did what", "AAA explica quem fez o quê"),
            t(
              "Identification claims an identity. Authentication proves it. Authorization grants allowed actions. Accountability records activity so the organization can trace decisions and misuse.",
              "Identificação declara uma identidade. Autenticação a comprova. Autorização concede ações permitidas. A responsabilização registra a atividade para que a organização possa rastrear decisões e abusos."
            )
          ),
          conceptBlock(
            "privacy-safety",
            t("Privacy and safety sit beside the CIA triad", "Privacidade e segurança física ficam ao lado da tríade CIA"),
            t(
              "Privacy asks whether personal data is collected, used, shared, and retained lawfully and minimally. Safety asks whether people can be harmed if systems fail, are misused, or trigger physical consequences.",
              "Privacidade pergunta se dados pessoais são coletados, usados, compartilhados e retidos de forma lícita e mínima. Segurança física pergunta se pessoas podem ser feridas caso sistemas falhem, sejam mal utilizados ou gerem consequências físicas."
            )
          ),
          movieCueBlock({
            title: t("Apollo 13", "Apollo 13"),
            cue: t(
              "Failure is not an option only works when backup paths were designed before the emergency.",
              '"Fracasso não é uma opção" só funciona quando caminhos de contingência foram desenhados antes da emergência.'
            ),
            body: t(
              "Use that scene to remember availability and safety: resilient systems keep operating under stress, and disciplined teams know which trust property they are protecting at each step.",
              "Use essa cena para lembrar de disponibilidade e segurança física: sistemas resilientes continuam operando sob estresse, e equipes disciplinadas sabem qual propriedade de confiança estão protegendo em cada passo."
            )
          }),
          keyPointsBlock(
            t(
              "Confidentiality depends on classification and flow control. Integrity depends on trusted evidence of change. Availability depends on resilient design. AAA, privacy, and safety answer different questions and should stay distinct.",
              "Confidencialidade depende de classificação e controle de fluxo. Integridade depende de evidência confiável de mudança. Disponibilidade depende de design resiliente. AAA, privacidade e segurança física respondem a perguntas diferentes e devem continuar distintos."
            )
          )
        ],
        exercise: {
          prompt: t(
            "Which control most directly provides integrity and non-repudiation for a software release sent to customers?",
            "Qual controle fornece mais diretamente integridade e não repúdio para uma release de software enviada a clientes?"
          ),
          supportText: t(
            "Choose the control that proves integrity and ties the release to the sender.",
            "Escolha o controle que prova a integridade e liga a release ao remetente."
          ),
          correctRationale: t(
            "A digital signature gives integrity and non-repudiation when the sender's private key is trusted and controlled.",
            "Uma assinatura digital fornece integridade e não repúdio quando a chave privada do emissor é confiável e controlada."
          ),
          remediationNote: t(
            "Encryption protects secrecy, and load balancing helps availability. Neither proves who approved the package.",
            "Criptografia protege o sigilo, e balanceamento ajuda a disponibilidade. Nenhum deles prova quem aprovou o pacote."
          ),
          options: [
            option(
              "A",
              true,
              t("Applying a digital signature to the release package", "Aplicar uma assinatura digital ao pacote da release"),
              t(
                "Correct. The signature supports integrity, origin authentication, and non-repudiation.",
                "Correto. A assinatura apoia integridade, autenticação de origem e não repúdio."
              )
            ),
            option(
              "B",
              false,
              t("Encrypting the package with a symmetric key", "Criptografar o pacote com uma chave simétrica"),
              t(
                "Not best. Symmetric encryption protects secrecy but does not provide non-repudiation.",
                "Não é a melhor. Criptografia simétrica protege sigilo, mas não fornece não repúdio."
              )
            ),
            option(
              "C",
              false,
              t("Putting the download behind a load balancer", "Colocar o download atrás de um balanceador de carga"),
              t(
                "Not best. Load balancing can help availability, but it does not prove the package is authentic or unchanged.",
                "Não é a melhor. O balanceador pode ajudar na disponibilidade, mas não prova que o pacote é autêntico nem que permaneceu inalterado."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "risk-judgment-in-real-events",
        estimatedMinutes: 9,
        title: t("Risk treatment and RMF in action", "Tratamento de risco e RMF na prática"),
        summary: t(
          "Learn how to choose accept, avoid, transfer, or mitigate risk.",
          "Aprenda como escolher entre aceitar, evitar, transferir ou mitigar um risco."
        ),
        objective: t(
          "Apply the RMF, choose the right treatment, and identify the residual risk that remains after controls.",
          "Aplique o RMF, escolha o tratamento certo e identifique o risco residual que continua depois dos controles."
        ),
        blocks: [
          introBlock(
            t(
              "The hardest CISSP questions are not vocabulary checks. They ask which decision best reduces business risk under real constraints, sequencing, and ownership rules.",
              "As perguntas mais difíceis do CISSP não são testes de vocabulário. Elas perguntam qual decisão reduz melhor o risco do negócio sob restrições reais, ordem correta e regras de responsabilidade."
            )
          ),
          conceptBlock(
            "rmf-loop",
            t("NIST RMF is a management loop", "NIST RMF é um ciclo de gestão"),
            t(
              "Categorize the system, select controls, implement them, assess whether they work, authorize operation based on residual risk, and monitor continuously. The order matters because authorization comes after evidence.",
              "Categorize o sistema, selecione controles, implemente-os, avalie se funcionam, autorize a operação com base no risco residual e monitore continuamente. A ordem importa porque a autorização vem depois da evidência."
            )
          ),
          conceptBlock(
            "compensating-controls",
            t("Compensating controls buy down risk, not certainty", "Controles compensatórios reduzem risco, não criam certeza"),
            t(
              "When the ideal control is unavailable, teams may use alternate controls that address the same objective partially. The gap must still be documented, and some residual risk remains by definition.",
              "Quando o controle ideal não está disponível, equipes podem usar controles alternativos que atendem parcialmente ao mesmo objetivo. A lacuna ainda precisa ser documentada, e algum risco residual permanece por definição."
            )
          ),
          conceptBlock(
            "cost-benefit",
            t("Control cost should be compared with expected loss", "O custo do controle deve ser comparado com a perda esperada"),
            t(
              "ALE helps compare potential yearly loss with the cost of a safeguard. It is not the only input, because privacy duties, safety impacts, and legal obligations can justify action even when the pure dollar case looks small.",
              "ALE ajuda a comparar a perda anual potencial com o custo de uma salvaguarda. Ele não é o único insumo, porque deveres de privacidade, impactos à segurança física e obrigações legais podem justificar ação mesmo quando o caso puramente financeiro parece pequeno."
            )
          ),
          conceptBlock(
            "risk-acceptance",
            t("Only the right owner can accept residual risk", "Somente o dono correto pode aceitar o risco residual"),
            t(
              "Security teams recommend. Control owners implement. Business owners accept or reject the remaining exposure because they own the mission impact if the risk becomes real.",
              "Equipes de segurança recomendam. Donos do controle implementam. Donos do negócio aceitam ou rejeitam a exposição remanescente porque são eles que possuem o impacto na missão se o risco se concretizar."
            )
          ),
          conceptBlock(
            "privacy-safety-escalation",
            t("Privacy and safety change escalation speed", "Privacidade e segurança física mudam a velocidade da escalada"),
            t(
              "If a control gap can expose regulated personal data or create harm to people, escalation must be faster and evidence trails tighter. Those consequences narrow the room for casual acceptance.",
              "Se uma lacuna de controle pode expor dados pessoais regulados ou gerar dano a pessoas, a escalada precisa ser mais rápida e o rastro de evidências mais rigoroso. Essas consequências reduzem o espaço para aceitação casual."
            )
          ),
          conceptBlock(
            "due-care-due-diligence",
            t("Due care and due diligence prove the program is real", "Due care e due diligence mostram que o programa funciona na prática"),
            t(
              "Due diligence is the investigation and assessment done before a decision. Due care is the ongoing effort to operate, review, and improve controls after that decision is made.",
              "Due diligence é a investigação e a avaliação feitas antes de uma decisão. Due care é o esforço contínuo para operar, revisar e melhorar controles depois que a decisão é tomada."
            )
          ),
          movieCueBlock({
            title: t("Erin Brockovich", "Erin Brockovich"),
            cue: t(
              "Remember binders, repeated fact-checking, and evidence turning suspicion into an action plan.",
              "Lembre dos fichários, da checagem repetida de fatos e da evidência transformando suspeita em plano de ação."
            ),
            body: t(
              "Use that scene to remember RMF discipline: gather evidence, assess the control gap, and make authorization decisions from facts instead of panic.",
              "Use essa cena para lembrar da disciplina do RMF: reúna evidências, avalie a lacuna de controle e tome decisões de autorização a partir de fatos, não de pânico."
            )
          }),
          keyPointsBlock(
            t(
              "RMF gives the order of operations. Compensating controls reduce but do not erase exposure. Residual risk must be documented, owned, and revisited as conditions change.",
              "O RMF fornece a ordem das operações. Controles compensatórios reduzem, mas não apagam a exposição. O risco residual precisa ser documentado, ter dono e ser revisitado quando as condições mudarem."
            )
          )
        ],
        exercise: {
          prompt: t(
            "A legacy internet-facing service cannot support MFA this quarter. Security adds segmentation, session monitoring, and shorter admin windows, and the owner signs an exception. Which statement is BEST?",
            "Um serviço legado exposto à internet não consegue suportar MFA neste trimestre. A segurança adiciona segmentação, monitoramento de sessão e janelas menores de administração, e o dono assina uma exceção. Qual afirmação é a MELHOR?"
          ),
          supportText: t(
            "Focus on what improved, what still remains, and who may accept it.",
            "Foque no que melhorou, no que ainda permanece e em quem pode aceitá-lo."
          ),
          correctRationale: t(
            "The extra controls reduced the risk, but they did not remove the weakness. Residual risk still exists, and the authorized owner accepts it through the exception process.",
            "Os controles extras reduziram o risco, mas não removeram a fraqueza. O risco residual ainda existe, e o dono autorizado o aceita pelo processo de exceção."
          ),
          remediationNote: t(
            "Compensating controls are partial substitutes. They change the exposure level, not the ownership rule or the existence of residual risk.",
            "Controles compensatórios são substitutos parciais. Eles mudam o nível de exposição, não a regra de responsabilidade nem a existência de risco residual."
          ),
          options: [
            option(
              "A",
              true,
              t(
                "Compensating controls reduced the risk, but residual risk remains and is explicitly accepted by the owner",
                "Controles compensatórios reduziram o risco, mas o risco residual permanece e é aceito explicitamente pelo dono"
              ),
              t(
                "Correct. This describes compensating controls and proper ownership of the remaining risk.",
                "Correto. Isso descreve controles compensatórios e a responsabilidade correta pelo risco remanescente."
              )
            ),
            option(
              "B",
              false,
              t(
                "The added controls eliminate the risk, so no exception or acceptance is needed",
                "Os controles adicionados eliminam o risco, então nenhuma exceção ou aceitação é necessária"
              ),
              t(
                "Not best. The original weakness still exists, so some residual risk remains.",
                "Não é a melhor. A fraqueza original ainda existe, então algum risco residual permanece."
              )
            ),
            option(
              "C",
              false,
              t(
                "Security accepted the risk when it selected the compensating controls",
                "A equipe de segurança aceitou o risco quando escolheu os controles compensatórios"
              ),
              t(
                "Not best. Security can recommend controls, but business ownership is required for formal risk acceptance.",
                "Não é a melhor. A segurança pode recomendar controles, mas a aceitação formal do risco exige a responsabilidade do dono do negócio."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "security-governance-strategy-and-roles",
        estimatedMinutes: 9,
        title: t("Governance strategy, roles, and frameworks", "Estratégia de governança, papéis e frameworks"),
        summary: t(
          "Learn who sets direction, who executes, and how frameworks support the program.",
          "Aprenda quem define a direção, quem executa e como os frameworks apoiam o programa."
        ),
        objective: t(
          "Separate governance from management, map the main roles, and connect security to business goals.",
          "Separe governança de gestão, mapeie os papéis principais e conecte segurança aos objetivos do negócio."
        ),
        blocks: [
          introBlock(
            t(
              "Governance is where security stops being a collection of tools and becomes an organizational decision system. The exam expects you to know who owns direction, who executes it, and what structures keep security tied to business reality.",
              "Governança é onde segurança deixa de ser uma coleção de ferramentas e vira um sistema organizacional de decisão. A prova espera que você saiba quem é dono da direção, quem a executa e quais estruturas mantêm a segurança ligada à realidade do negócio."
            )
          ),
          conceptBlock(
            "governance-vs-management",
            t("Governance sets direction; management executes", "Governança define direção; gestão executa"),
            t(
              "Governance establishes strategy, policy, accountability, and acceptable risk. Management turns that direction into plans, budgets, projects, and operations. Exam questions often test whether a decision belongs to the board and senior leadership or to operational teams.",
              "Governança estabelece estratégia, política, responsabilização e risco aceitável. Gestão transforma essa direção em planos, orçamento, projetos e operações. Questões de prova costumam testar se uma decisão pertence ao conselho e à alta liderança ou às equipes operacionais."
            )
          ),
          conceptBlock(
            "plan-hierarchy",
            t("Strategic, tactical, and operational plans answer different time horizons", "Planos estratégicos, táticos e operacionais respondem a horizontes diferentes"),
            t(
              "The strategic plan explains long-range direction and should reflect risk. Tactical plans translate strategy into nearer-term goals. Operational plans describe the detailed, day-to-day steps that make the strategy real. Mission, goals, and objectives should reinforce each other rather than compete.",
              "O plano estratégico explica a direção de longo prazo e deve refletir risco. Planos táticos traduzem a estratégia em metas de prazo mais curto. Planos operacionais descrevem os passos detalhados do dia a dia que tornam a estratégia real. Missão, metas e objetivos devem se reforçar em vez de competir."
            )
          ),
          conceptBlock(
            "roles-and-responsibilities",
            t("Roles matter because ownership changes the correct answer", "Papéis importam porque a responsabilidade muda a resposta correta"),
            t(
              "Senior managers are accountable for organizational security and risk acceptance. Asset owners classify and define protection needs. Custodians implement controls. Users follow policy. Auditors verify that controls and governance are actually working. Security professionals advise, design, and measure across the system.",
              "A alta gestão é responsável pela segurança organizacional e pela aceitação de risco. Donos de ativos classificam e definem necessidades de proteção. Custodians implementam controles. Usuários seguem política. Auditores verificam se controles e governança realmente funcionam. Profissionais de segurança orientam, desenham e medem o sistema como um todo."
            )
          ),
          conceptBlock(
            "governance-processes",
            t("Committees, acquisitions, and divestitures create governance stress tests", "Comitês, aquisições e desinvestimentos criam testes de estresse para a governança"),
            t(
              "Architecture review boards, vendor governance, and project committees exist so difficult decisions are reviewed with broader context. Acquisitions and divestitures are especially risky because identities, infrastructure, contracts, and inherited weaknesses move faster than most teams expect.",
              "Conselhos de arquitetura, governança de fornecedores e comitês de projeto existem para que decisões difíceis sejam revistas com contexto mais amplo. Aquisições e desinvestimentos são especialmente arriscados porque identidades, infraestrutura, contratos e fraquezas herdadas se movem mais rápido do que a maioria das equipes espera."
            )
          ),
          conceptBlock(
            "framework-orientation",
            t("Frameworks give structure, not magic", "Frameworks dão estrutura, não mágica"),
            t(
              "ISO 27001 and 27002 organize an ISMS, NIST CSF and RMF guide risk and control lifecycles, COBIT emphasizes governance and assurance, SABSA links architecture to business drivers, PCI DSS focuses on cardholder data, and FedRAMP standardizes federal cloud assurance. The exam rewards knowing what each framework is for, not memorizing every clause.",
              "ISO 27001 e 27002 organizam um ISMS, NIST CSF e RMF guiam o ciclo de risco e controles, COBIT enfatiza governança e assurance, SABSA conecta arquitetura a direcionadores de negócio, PCI DSS foca em dados de cartão e FedRAMP padroniza assurance de nuvem federal. A prova recompensa saber para que cada framework serve, e não decorar cada cláusula."
            )
          ),
          conceptBlock(
            "due-care-due-diligence-governance",
            t("Due diligence investigates; due care operates and proves follow-through", "Due diligence investiga; due care mantém a proteção em prática"),
            t(
              "Due diligence is the up-front work of discovery, review, and assessment. Due care is the ongoing act of implementing, maintaining, and enforcing reasonable protection. Governance fails when an organization says the right things in policy but cannot prove continuous execution.",
              "Due diligence é o trabalho inicial de descoberta, revisão e avaliação. Due care é o trabalho contínuo de implementar, manter e fazer cumprir uma proteção razoável. A governança falha quando a organização diz as coisas certas na política, mas não consegue provar execução contínua."
            )
          ),
          movieCueBlock({
            title: t("Margin Call", "Margin Call"),
            cue: t(
              "Remember leaders realizing that technical facts become governance decisions the moment the business has to choose what risk it will carry.",
              "Lembre de líderes percebendo que fatos técnicos viram decisões de governança no momento em que o negócio precisa escolher qual risco vai carregar."
            ),
            body: t(
              "Use that cue to remember that Domain 1 cares about ownership and direction as much as controls. The hard question is often not what tool exists, but who must decide and on what evidence.",
              "Use essa pista para lembrar que o Domínio 1 se importa com responsabilidade e direção tanto quanto com controles. A pergunta difícil muitas vezes não é qual ferramenta existe, mas quem deve decidir e com base em qual evidência."
            )
          }),
          keyPointsBlock(
            t(
              "Tie security to business goals, know who owns each role, use frameworks for structure, and prove due diligence and due care through real governance activity.",
              "Conecte segurança a objetivos de negócio, saiba quem é dono de cada papel, use frameworks para dar estrutura e mostre due diligence e due care por meio de atividade real de governança."
            )
          )
        ],
        exercise: {
          prompt: t(
            "Your company plans to acquire a smaller competitor and quickly connect networks for shared operations. What is the BEST security action before integration?",
            "Sua empresa planeja adquirir um concorrente menor e conectar rapidamente as redes para operações compartilhadas. Qual é a MELHOR ação de segurança antes da integração?"
          ),
          supportText: t(
            "Choose due diligence and governance, not raw speed.",
            "Escolha due diligence e governança, não a pressa."
          ),
          correctRationale: t(
            "A structured security review before integration is best because acquisitions bring hidden risk, unknown control gaps, and inherited obligations. Understand them before you extend trust.",
            "Uma revisão estruturada de segurança antes da integração é a melhor opção porque aquisições trazem riscos ocultos, lacunas de controle desconhecidas e obrigações herdadas. Entenda isso antes de estender confiança."
          ),
          remediationNote: t(
            "Rapid connectivity without diligence often turns an acquisition into a fast-moving risk multiplier.",
            "Conectividade rápida sem diligência frequentemente transforma uma aquisição em um multiplicador de risco em movimento rápido."
          ),
          options: [
            option(
              "A",
              true,
              t(
                "Perform a security due-diligence review of the target environment before connecting shared systems",
                "Fazer uma due diligence de segurança no ambiente-alvo antes de conectar os sistemas compartilhados"
              ),
              t(
                "Correct. This is the governance-aligned way to understand inherited risk before integration.",
                "Correto. Esse é o caminho alinhado à governança para entender o risco herdado antes da integração."
              )
            ),
            option(
              "B",
              false,
              t(
                "Connect the environments first so the new team can help discover weaknesses faster",
                "Conectar os ambientes primeiro para que a nova equipe ajude a descobrir fraquezas mais rápido"
              ),
              t(
                "Not best. Shared access before review expands trust before risk is understood.",
                "Não é a melhor. Acesso compartilhado antes da revisão expande confiança antes que o risco seja entendido."
              )
            ),
            option(
              "C",
              false,
              t(
                "Wait until the first annual audit after acquisition to assess inherited control gaps",
                "Esperar até a primeira auditoria anual após a aquisição para avaliar as lacunas de controle herdadas"
              ),
              t(
                "Not best. Governance requires diligence before trust and integration, not long after.",
                "Não é a melhor. Governança exige diligência antes da confiança e da integração, e não muito depois."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "legal-regulatory-and-privacy-obligations",
        estimatedMinutes: 9,
        title: t("Legal, regulatory, and privacy obligations", "Obrigações legais, regulatórias e de privacidade"),
        summary: t(
          "Learn how laws, contracts, privacy rules, and intellectual property affect security decisions.",
          "Aprenda como leis, contratos, regras de privacidade e propriedade intelectual afetam decisões de segurança."
        ),
        objective: t(
          "Identify the main legal and privacy duties in Domain 1 and know when they change the right response.",
          "Identifique os principais deveres legais e de privacidade do Domínio 1 e saiba quando eles mudam a resposta correta."
        ),
        blocks: [
          introBlock(
            t(
              "Domain 1 law is not about becoming a lawyer. It is about recognizing which type of obligation exists, who cares about it, and why the wrong assumption can turn a technical incident into a regulatory failure.",
              "Direito no Domínio 1 não é sobre virar advogado. É sobre reconhecer que tipo de obrigação existe, quem se importa com ela e por que a premissa errada pode transformar um incidente técnico em falha regulatória."
            )
          ),
          conceptBlock(
            "law-categories",
            t("Criminal, civil, administrative, regulatory, and contractual duties are not interchangeable", "Deveres criminais, civis, administrativos, regulatórios e contratuais não são intercambiáveis"),
            t(
              "Criminal law protects society and is enforced by the state. Civil law governs disputes between parties. Administrative law supports agency operations. Regulatory obligations come from sector oversight. Contractual obligations come from agreements such as merchant terms, cloud contracts, and data-processing commitments.",
              "Direito criminal protege a sociedade e é aplicado pelo Estado. Direito civil governa disputas entre partes. Direito administrativo sustenta a atuação de agências. Obrigações regulatórias vêm da supervisão setorial. Obrigações contratuais vêm de acordos como termos de adquirência, contratos de nuvem e compromissos de processamento de dados."
            )
          ),
          conceptBlock(
            "breach-notification",
            t("Breach notification is a patchwork, not one universal timer", "Notificação de violação é um mosaico, não um único cronômetro universal"),
            t(
              "The exam expects you to know that industries and jurisdictions differ. HIPAA and HITECH impose healthcare-specific duties, GDPR uses a 72-hour supervisory authority rule, and many U.S. state laws and sector requirements create additional timelines and audience expectations.",
              "A prova espera que você saiba que setores e jurisdições diferem. HIPAA e HITECH impõem deveres específicos de saúde, o GDPR usa a regra de 72 horas para autoridade supervisora, e muitas leis estaduais dos EUA e requisitos setoriais criam prazos e públicos adicionais."
            )
          ),
          conceptBlock(
            "privacy-regimes",
            t("Privacy law focuses on lawful use, rights, and data handling limits", "Leis de privacidade focam em uso lícito, direitos e limites para tratamento de dados"),
            t(
              "GDPR emphasizes lawfulness, fairness, transparency, minimization, and accountability. CCPA emphasizes consumer rights such as knowing, deleting, correcting, and opting out of certain sharing. PIPL, POPIA, COPPA, FERPA, GLBA, HIPAA, and related laws each target different data types, geographies, and subjects.",
              "O GDPR enfatiza legalidade, justiça, transparência, minimização e responsabilização. A CCPA enfatiza direitos do consumidor, como saber, excluir, corrigir e optar por não compartilhar certos dados. PIPL, POPIA, COPPA, FERPA, GLBA, HIPAA e leis correlatas miram tipos de dados, geografias e públicos diferentes."
            )
          ),
          conceptBlock(
            "intellectual-property",
            t("Intellectual property has multiple protection models", "Propriedade intelectual tem múltiplos modelos de proteção"),
            t(
              "Copyright protects original expression, trademarks protect brand identity, patents protect inventions for a limited period, trade secrets protect valuable confidential know-how, and software licensing defines what the buyer may do with code. The security implication is that copying, disclosure, reverse engineering, and control bypass can all create legal exposure.",
              "Copyright protege expressão original, marcas protegem identidade de marca, patentes protegem invenções por período limitado, segredos de negócio protegem conhecimento confidencial valioso e licenciamento de software define o que o comprador pode fazer com o código. A implicação para segurança é que cópia, divulgação, engenharia reversa e bypass de controle podem gerar exposição legal."
            )
          ),
          conceptBlock(
            "cross-border-data",
            t("Where data moves can matter as much as where it lives", "Para onde os dados se movem pode importar tanto quanto onde vivem"),
            t(
              "Transborder data flow, data residency, and lawful access rules change how cloud, outsourcing, and incident response operate. EAR, ITAR, Wassenaar-style controls, and country-specific privacy laws can restrict what technology or data crosses borders and under what safeguards.",
              "Fluxo transfronteiriço de dados, residência de dados e regras de acesso lícito mudam como nuvem, terceirização e resposta a incidentes operam. EAR, ITAR, controles do tipo Wassenaar e leis nacionais de privacidade podem restringir qual tecnologia ou dado cruza fronteiras e sob quais salvaguardas."
            )
          ),
          conceptBlock(
            "contract-vs-law",
            t("A control can be required by contract even when it is not directly mandated by criminal law", "Um controle pode ser exigido por contrato mesmo quando não é imposto diretamente por lei criminal"),
            t(
              "PCI DSS is a classic example: it is enforced through merchant and payment relationships rather than functioning as a criminal statute itself. Domain 1 questions often test whether you know the source of the obligation, because that shapes enforcement, audit, and penalties.",
              "PCI DSS é um exemplo clássico: ele é imposto por relações entre lojista e adquirência, e não funciona por si só como estatuto criminal. Questões do Domínio 1 frequentemente testam se você sabe a fonte da obrigação, porque isso molda a aplicação, a auditoria e as penalidades."
            )
          ),
          movieCueBlock({
            title: t("Snowden", "Snowden"),
            cue: t(
              "Remember that the same data issue can be technical, legal, political, and reputational at the same time depending on who is affected and under what authority.",
              "Lembre que o mesmo problema de dados pode ser técnico, legal, político e reputacional ao mesmo tempo, dependendo de quem é afetado e sob qual autoridade."
            ),
            body: t(
              "Use that cue for Domain 1 law and privacy: the correct answer usually starts by identifying the governing obligation before choosing the technical response.",
              "Use essa pista para direito e privacidade no Domínio 1: a resposta correta geralmente começa identificando a obrigação que vale no caso antes de escolher a resposta técnica."
            )
          }),
          keyPointsBlock(
            t(
              "Know the source of the obligation, treat privacy as a handling and rights problem, recognize IP categories, and expect cross-border issues to complicate simple technical answers.",
              "Conheça a fonte da obrigação, trate privacidade como problema de tratamento e direitos, reconheça categorias de propriedade intelectual e espere que temas transfronteiriços compliquem respostas técnicas simples."
            )
          )
        ],
        exercise: {
          prompt: t(
            "A retailer is told by its acquiring bank that it must meet PCI DSS controls to continue processing payment cards. What type of obligation is this MOST directly?",
            "Um varejista é informado por seu banco adquirente de que precisa cumprir controles do PCI DSS para continuar processando cartões. Que tipo de obrigação é essa de forma MAIS direta?"
          ),
          supportText: t(
            "Focus on who enforces the requirement.",
            "Foque em quem impõe o requisito."
          ),
          correctRationale: t(
            "PCI DSS is mainly a contractual industry requirement enforced through merchant and payment agreements. Failing it can still create wider legal and business consequences.",
            "PCI DSS é, principalmente, um requisito contratual do setor imposto por acordos entre lojista e adquirência. Ainda assim, falhar nele pode gerar consequências legais e de negócio mais amplas."
          ),
          remediationNote: t(
            "Do not confuse an important industry requirement with a criminal statute just because noncompliance can become expensive.",
            "Não confunda um requisito setorial importante com um estatuto criminal só porque a não conformidade pode sair cara."
          ),
          options: [
            option(
              "A",
              true,
              t("A contractual industry-standard requirement", "Um requisito contratual de padrão setorial"),
              t(
                "Correct. PCI DSS is enforced through agreements and industry mechanisms rather than as a standalone criminal law.",
                "Correto. PCI DSS é imposto por acordos e mecanismos setoriais, e não como uma lei criminal autônoma."
              )
            ),
            option(
              "B",
              false,
              t("A criminal statute automatically enforced by the state", "Um estatuto criminal aplicado automaticamente pelo Estado"),
              t(
                "Not best. PCI DSS is not itself a criminal statute.",
                "Não é a melhor. O PCI DSS não é, por si só, um estatuto criminal."
              )
            ),
            option(
              "C",
              false,
              t("An internal guideline with no external enforcement impact", "Uma diretriz interna sem consequência externa"),
              t("Not best. PCI DSS has real contractual and business consequences.", "Não é a melhor. PCI DSS tem consequências contratuais e de negócio reais.")
            )
          ]
        }
      }),
      lesson({
        slug: "investigation-types-and-evidence-handling",
        estimatedMinutes: 9,
        title: t("Investigation types and evidence handling", "Tipos de investigação e tratamento de evidências"),
        summary: t(
          "Learn which type of investigation applies and how to protect evidence.",
          "Aprenda qual tipo de investigação se aplica e como proteger as evidências."
        ),
        objective: t(
          "Differentiate investigation types and preserve evidence so it stays reliable.",
          "Diferencie os tipos de investigação e preserve a evidência para que ela continue confiável."
        ),
        blocks: [
          introBlock(
            t(
              "The same security event can trigger different investigation models depending on who is asking the question and what outcome is at stake. Domain 1 wants you to notice the context before deciding how formal the process must be.",
              "O mesmo evento de segurança pode disparar modelos de investigação diferentes dependendo de quem faz a pergunta e de qual resultado está em jogo. O Domínio 1 quer que você note o contexto antes de decidir quão formal o processo precisa ser."
            )
          ),
          conceptBlock(
            "investigation-categories",
            t("Investigation type changes the rules of the game", "O tipo de investigação muda as regras do jogo"),
            t(
              "Administrative investigations focus on internal policy or operational issues. Criminal investigations support law enforcement and prosecution. Civil investigations support disputes between parties. Regulatory investigations answer to oversight bodies. Industry-standard investigations often revolve around audits and contractual compliance.",
              "Investigações administrativas focam em política interna ou problemas operacionais. Investigações criminais apoiam a polícia e a acusação criminal. Investigações civis apoiam disputas entre partes. Investigações regulatórias respondem a órgãos supervisores. Investigações ligadas a padrões setoriais geralmente giram em torno de auditorias e conformidade contratual."
            )
          ),
          conceptBlock(
            "burden-of-proof",
            t("Standards of proof are different for a reason", "Padrões de prova são diferentes por um motivo"),
            t(
              "Criminal matters require proof beyond a reasonable doubt. Civil matters often rely on a preponderance of the evidence. Administrative and regulatory cases may focus more on policy, procedure, and documentation quality than on the criminal standard.",
              "Questões criminais exigem prova além de dúvida razoável. Questões civis frequentemente se apoiam em preponderância da evidência. Casos administrativos e regulatórios podem focar mais em política, procedimento e qualidade documental do que no padrão criminal."
            )
          ),
          conceptBlock(
            "evidence-types",
            t("Evidence comes in forms, and each form supports the story differently", "Evidência vem em formas, e cada forma sustenta a história de maneira diferente"),
            t(
              "Investigators may rely on documentary, testimonial, physical, digital, direct, or circumstantial evidence. The exam often cares less about memorizing a legal textbook definition and more about preserving evidence so it remains credible and attributable later.",
              "Investigadores podem se apoiar em evidência documental, testemunhal, física, digital, direta ou circunstancial. A prova costuma se importar menos com decorar definição de manual jurídico e mais com preservar a evidência para que ela permaneça crível e atribuível depois."
            )
          ),
          conceptBlock(
            "chain-of-custody",
            t("Chain of custody proves the evidence was controlled", "A cadeia de custódia prova que a evidência foi controlada"),
            t(
              "A clean chain of custody records who collected, transferred, stored, and examined evidence. If custody cannot be shown, the technical accuracy of the evidence may not matter because confidence in its integrity has already been weakened.",
              "Uma cadeia de custódia bem mantida registra quem coletou, transferiu, armazenou e examinou a evidência. Se a custódia não puder ser demonstrada, a precisão técnica da evidência pode nem importar, porque a confiança em sua integridade já foi enfraquecida."
            )
          ),
          conceptBlock(
            "best-evidence-enticement",
            t("Original records matter, and investigator behavior matters too", "Registros originais importam, e a conduta do investigador também"),
            t(
              "The best evidence rule prefers original records when feasible, and proper forensic handling protects that preference. Investigators must also avoid turning legitimate observation into entrapment; creating a lawful opportunity is different from inducing a crime that would not otherwise occur.",
              "A regra da melhor evidência prefere registros originais quando isso é viável, e o tratamento forense adequado protege essa preferência. Investigadores também devem evitar transformar observação legítima em indução indevida; criar uma oportunidade lícita é diferente de induzir um crime que não ocorreria de outra forma."
            )
          ),
          conceptBlock(
            "legal-counsel",
            t("Early legal coordination keeps the investigation usable", "Coordenação jurídica precoce mantém a investigação utilizável"),
            t(
              "If a matter may become criminal, civil, or regulatory, involving the right legal and compliance stakeholders early helps protect evidence, privilege, communication discipline, and downstream reporting obligations.",
              "Se um caso pode se tornar criminal, civil ou regulatório, envolver cedo os stakeholders jurídicos e de compliance corretos ajuda a proteger evidências, privilégio, disciplina de comunicação e obrigações futuras de reporte."
            )
          ),
          movieCueBlock({
            title: t("My Cousin Vinny", "Meu Primo Vinny"),
            cue: t(
              "Remember how the case turned on details, credibility, and whether the evidence could actually support the claim being made.",
              "Lembre como o caso dependia de detalhes, credibilidade e de a evidência realmente sustentar a alegação feita."
            ),
            body: t(
              "Use that cue for Domain 1 investigations: technical evidence only helps when the handling, context, and standard of proof are strong enough for the forum using it.",
              "Use essa pista para investigações no Domínio 1: evidência técnica só ajuda quando o tratamento, o contexto e o padrão de prova são fortes o bastante para o tipo de processo que vai usá-la."
            )
          }),
          keyPointsBlock(
            t(
              "Identify the investigation type first, preserve chain of custody, respect the applicable proof standard, and keep legal context in view before acting casually.",
              "Identifique primeiro o tipo de investigação, preserve a cadeia de custódia, respeite o padrão de prova aplicável e mantenha o contexto jurídico em vista antes de agir de forma casual."
            )
          )
        ],
        exercise: {
          prompt: t(
            "An employee may have violated acceptable use policy, but no crime has been alleged yet. Which investigation type should start first?",
            "Um colaborador pode ter violado a política de uso aceitável, mas nenhum crime foi alegado ainda. Qual tipo de investigação deve começar primeiro?"
          ),
          supportText: t(
            "Choose the process that fits the facts you have now.",
            "Escolha o processo que combina com os fatos que você tem agora."
          ),
          correctRationale: t(
            "Start with an administrative investigation because the known issue is an internal policy violation. Escalate later if the evidence points to a crime.",
            "Comece com uma investigação administrativa porque o problema conhecido é uma violação de política interna. Escale depois se a evidência apontar para crime."
          ),
          remediationNote: t(
            "Do not class the case too high too early. Use the process that matches the facts in front of you.",
            "Não classifique o caso acima do necessário cedo demais. Use o processo que combina com os fatos à sua frente."
          ),
          options: [
            option(
              "A",
              true,
              t("Administrative investigation", "Investigação administrativa"),
              t(
                "Correct. The current issue is an internal policy matter.",
                "Correto. O problema atual é uma questão interna de política."
              )
            ),
            option(
              "B",
              false,
              t("Criminal investigation", "Investigação criminal"),
              t(
                "Not best. There is not yet evidence that the matter must be handled as a criminal case.",
                "Não é a melhor. Ainda não há evidência de que o caso precise ser tratado como caso criminal."
              )
            ),
            option(
              "C",
              false,
              t("Civil litigation support", "Apoio a litígio civil"),
              t(
                "Not best. A civil dispute between parties is not the known context here.",
                "Não é a melhor. Uma disputa civil entre partes não é o contexto conhecido aqui."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "policy-standards-baselines-and-procedures",
        estimatedMinutes: 9,
        title: t("Policy, standards, baselines, and procedures", "Política, padrões, baselines e procedimentos"),
        summary: t(
          "Learn what each document type does and who should own it.",
          "Aprenda o que cada tipo de documento faz e quem deve ser o dono dele."
        ),
        objective: t(
          "Differentiate policy, standards, baselines, guidelines, procedures, and acceptable use.",
          "Diferencie política, padrões, baselines, diretrizes, procedimentos e uso aceitável."
        ),
        blocks: [
          introBlock(
            t(
              "Many Domain 1 questions look simple until two document types sound similar. The correct answer usually depends on whether the organization is stating intent, setting a mandatory minimum, offering flexible advice, or writing exact operational steps.",
              "Muitas questões do Domínio 1 parecem simples até dois tipos de documento soarem parecidos. A resposta correta normalmente depende de a organização estar declarando intenção, definindo um mínimo obrigatório, oferecendo conselho flexível ou escrevendo passos operacionais exatos."
            )
          ),
          conceptBlock(
            "policy-purpose",
            t("Policy states management intent and authority", "Política declara a intenção e a autoridade da gestão"),
            t(
              "A policy is high level, mandatory, and owned by leadership. It explains what the organization expects and why. It should not read like a build script because its job is to set direction and scope, not to describe keystrokes.",
              "Uma política é de alto nível, obrigatória e pertence à liderança. Ela explica o que a organização espera e por quê. Não deve soar como um passo a passo técnico, porque seu papel é definir direção e escopo, e não descrever cliques ou teclas."
            )
          ),
          conceptBlock(
            "standards-and-baselines",
            t("Standards and baselines make requirements operational", "Padrões e baselines tornam requisitos operacionais"),
            t(
              "Standards define mandatory performance or configuration expectations. Baselines define the minimum approved state that every similar system must meet. A baseline for servers, for example, might require logging, patch levels, and secure default services before production deployment.",
              "Padrões definem expectativas obrigatórias de desempenho ou configuração. Baselines definem o estado mínimo aprovado que todo sistema semelhante precisa cumprir. Um baseline para servidores, por exemplo, pode exigir logging, níveis de patch e serviços padrão seguros antes da entrada em produção."
            )
          ),
          conceptBlock(
            "guidelines",
            t("Guidelines guide judgment where some flexibility is acceptable", "Diretrizes orientam o julgamento onde alguma flexibilidade é aceitável"),
            t(
              "Guidelines are recommended practices that help people make good choices in varied conditions. They matter because not every environment can be reduced to one rigid setting, but the organization still wants outcomes to remain aligned with policy.",
              "Diretrizes são práticas recomendadas que ajudam pessoas a tomar boas decisões em condições variadas. Elas importam porque nem todo ambiente pode ser reduzido a uma configuração rígida, mas a organização ainda quer que os resultados permaneçam alinhados à política."
            )
          ),
          conceptBlock(
            "procedures",
            t("Procedures answer how to do the work", "Procedimentos respondem como fazer o trabalho"),
            t(
              "Procedures are step-by-step instructions for implementation, operation, escalation, or recovery. If a question asks for the document that tells an operator exactly how to onboard a user, revoke access, or restore a backup, procedure is usually the right answer.",
              "Procedimentos são instruções passo a passo para implementação, operação, escalonamento ou recuperação. Se uma questão pede o documento que diz a um operador exatamente como onboardar um usuário, revogar acesso ou restaurar um backup, procedimento costuma ser a resposta certa."
            )
          ),
          conceptBlock(
            "aup-and-enforcement",
            t("Acceptable use and related documents translate policy into behavior", "Uso aceitável e documentos correlatos traduzem política em comportamento"),
            t(
              "An acceptable use policy clarifies what people may and may not do with organizational resources. This matters because Domain 1 treats documentation as a prerequisite for training, compliance, disciplinary action, and predictable enforcement.",
              "Uma política de uso aceitável esclarece o que as pessoas podem e não podem fazer com recursos organizacionais. Isso importa porque o Domínio 1 trata a documentação como pré-requisito para treinamento, conformidade, ação disciplinar e aplicação consistente."
            )
          ),
          conceptBlock(
            "exceptions",
            t("Exceptions should be documented, owned, and time-bound", "Exceções devem ser documentadas, ter dono e prazo"),
            t(
              "Strong documentation programs do not pretend every control fits every system forever. They allow exceptions, but only with justification, approval, expiration, and review so the organization can see the residual risk it is actually choosing to carry.",
              "Programas fortes de documentação não fingem que todo controle cabe em todo sistema para sempre. Eles permitem exceções, mas apenas com justificativa, aprovação, expiração e revisão para que a organização veja o risco residual que realmente está escolhendo carregar."
            )
          ),
          movieCueBlock({
            title: t("Julie & Julia", "Julie & Julia"),
            cue: t(
              "Remember that a recipe, a house rule, and a chef's judgment are different tools even when they all influence the same meal.",
              "Lembre que uma receita, uma regra da casa e o julgamento do chef são ferramentas diferentes mesmo quando todas influenciam a mesma refeição."
            ),
            body: t(
              "Use that cue for Domain 1 documentation: policy sets the house rule, standards and baselines define mandatory expectations, guidelines help with judgment, and procedures tell you exactly how to execute.",
              "Use essa pista para documentação no Domínio 1: a política define a regra da casa, padrões e baselines definem expectativas obrigatórias, diretrizes ajudam no julgamento e procedimentos dizem exatamente como executar."
            )
          }),
          keyPointsBlock(
            t(
              "Policy explains intent, standards and baselines define mandatory minimums, guidelines advise, procedures instruct, and exceptions must be explicit and owned.",
              "Política explica a intenção, padrões e baselines definem mínimos obrigatórios, diretrizes aconselham, procedimentos instruem e exceções precisam ser explícitas e ter dono."
            )
          )
        ],
        exercise: {
          prompt: t(
            "Which document type BEST describes the minimum secure configuration every new Linux server must meet before production use?",
            "Qual tipo de documento MELHOR descreve a configuração mínima segura que todo novo servidor Linux deve cumprir antes do uso em produção?"
          ),
          supportText: t(
            "Focus on minimum mandatory state for similar systems.",
            "Foque no estado mínimo obrigatório para sistemas semelhantes."
          ),
          correctRationale: t(
            "A baseline is best because it defines the minimum approved security state that all similar systems must meet.",
            "Baseline é a melhor resposta porque define o estado mínimo de segurança aprovado que todos os sistemas semelhantes devem cumprir."
          ),
          remediationNote: t(
            "Policy is higher level, and procedure is more step-by-step. The question asks for the minimum required state.",
            "Política é mais alta em nível, e procedimento é mais passo a passo. A pergunta pede o estado mínimo exigido."
          ),
          options: [
            option(
              "A",
              true,
              t("Baseline", "Baseline"),
              t(
                "Correct. A baseline defines the minimum required state for a class of systems.",
                "Correto. Um baseline define o estado mínimo exigido para uma classe de sistemas."
              )
            ),
            option(
              "B",
              false,
              t("Guideline", "Diretriz"),
              t(
                "Not best. Guidelines are recommended, not the mandatory minimum.",
                "Não é a melhor. Diretrizes são recomendadas, não o mínimo obrigatório."
              )
            ),
            option(
              "C",
              false,
              t("Procedure", "Procedimento"),
              t(
                "Not best. A procedure explains how to perform steps, not the minimum approved state itself.",
                "Não é a melhor. Um procedimento explica como executar passos, e não o estado mínimo aprovado em si."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "business-continuity-and-bia",
        estimatedMinutes: 9,
        title: t("Business continuity, BIA, and recovery targets", "Continuidade de negócios, BIA e metas de recuperação"),
        summary: t(
          "Learn what must recover first and how much downtime or data loss the business can accept.",
          "Aprenda o que deve voltar primeiro e quanto de parada ou perda de dados o negócio consegue aceitar."
        ),
        objective: t(
          "Differentiate BCP, DRP, COOP, BIA, RTO, and RPO while keeping dependencies and people in view.",
          "Diferencie BCP, DRP, COOP, BIA, RTO e RPO mantendo em vista dependências e pessoas."
        ),
        blocks: [
          introBlock(
            t(
              "Continuity questions are rarely about the loudest server. They are about what the business cannot afford to lose, how quickly it must recover, and how much data loss or process interruption it can survive before the damage becomes existential.",
              "Questões de continuidade raramente são sobre o servidor mais barulhento. Elas são sobre o que o negócio não pode se dar ao luxo de perder, quão rápido precisa se recuperar e quanto de perda de dados ou interrupção de processo consegue suportar antes que o dano se torne existencial."
            )
          ),
          conceptBlock(
            "bcp-drp-coop",
            t("BCP, DRP, and COOP are related but not identical", "BCP, DRP e COOP são relacionados, mas não idênticos"),
            t(
              "Business continuity planning focuses on sustaining critical operations. Disaster recovery planning focuses more narrowly on restoring technical capabilities and infrastructure. COOP emphasizes how essential functions continue shortly after disruption and through an extended emergency period.",
              "O planejamento de continuidade de negócios foca em sustentar operações críticas. O planejamento de recuperação de desastres foca de forma mais estreita na restauração de capacidades técnicas e infraestrutura. COOP enfatiza como funções essenciais continuam logo após a interrupção e durante um período prolongado de emergência."
            )
          ),
          conceptBlock(
            "bia-priority",
            t("A BIA ranks business pain, not technical popularity", "Uma BIA classifica a dor do negócio, não a popularidade técnica"),
            t(
              "Business impact analysis identifies critical processes, dependencies, and the consequences of interruption. It helps sequence recovery based on revenue, safety, legal exposure, customer commitment, and mission impact instead of on whichever system owner argues the loudest.",
              "A análise de impacto no negócio identifica processos críticos, dependências e consequências da interrupção. Ela ajuda a sequenciar a recuperação com base em receita, segurança das pessoas, exposição legal, compromisso com clientes e impacto na missão, e não em quem grita mais alto pelo próprio sistema."
            )
          ),
          conceptBlock(
            "recovery-metrics-domain1",
            t("RTO, RPO, MTD, MTTR, and MTBF answer different continuity questions", "RTO, RPO, MTD, MTTR e MTBF respondem a perguntas diferentes de continuidade"),
            t(
              "RTO is how fast a service must return. RPO is how much data loss is tolerable, measured in time. MTD is the longest outage the organization can survive. MTTR measures repair speed, and MTBF measures reliability between failures. Mixing them up leads to expensive continuity mistakes.",
              "RTO é quão rápido um serviço precisa voltar. RPO é quanto de perda de dados é tolerável, medido em tempo. MTD é a maior indisponibilidade que a organização consegue sobreviver. MTTR mede velocidade de reparo, e MTBF mede confiabilidade entre falhas. Misturá-los gera erros caros de continuidade."
            )
          ),
          conceptBlock(
            "continuity-planning",
            t("Continuity planning turns BIA output into preventive and recovery strategy", "Planejamento de continuidade transforma a BIA em estratégia preventiva e de recuperação"),
            t(
              "After the BIA, teams design preventive controls, relocation options, recovery sites, backup strategies, communication paths, and recovery procedures. Approval, training, maintenance, and testing matter because a perfect plan on a shelf is not a continuity capability.",
              "Depois da BIA, as equipes desenham controles preventivos, opções de relocação, sites de recuperação, estratégias de backup, caminhos de comunicação e procedimentos de recuperação. Aprovação, treinamento, manutenção e testes importam porque um plano perfeito na estante não é capacidade de continuidade."
            )
          ),
          conceptBlock(
            "external-dependencies",
            t("Vendors and outside services are part of your continuity boundary", "Fornecedores e serviços externos fazem parte do seu limite de continuidade"),
            t(
              "Cloud providers, telecom carriers, payroll processors, legal dependencies, and critical suppliers can become the real bottleneck in recovery. Domain 1 expects continuity planning to account for these dependencies rather than assuming internal teams control the whole timeline.",
              "Provedores de nuvem, operadoras, processadores de folha, dependências legais e fornecedores críticos podem se tornar o gargalo real da recuperação. O Domínio 1 espera que o planejamento de continuidade leve essas dependências em conta, em vez de assumir que equipes internas controlam toda a linha do tempo."
            )
          ),
          conceptBlock(
            "life-safety-first",
            t("People come before systems", "Pessoas vêm antes de sistemas"),
            t(
              "The first priority in continuity and disaster scenarios is life safety. Recovering technology is important, but Domain 1 expects you to protect people first and then restore business operations in the order the BIA justifies.",
              "A primeira prioridade em cenários de continuidade e desastre é a segurança das pessoas. Recuperar tecnologia é importante, mas o Domínio 1 espera que você proteja pessoas primeiro e depois restaure operações de negócio na ordem justificada pela BIA."
            )
          ),
          movieCueBlock({
            title: t("Contagion", "Contágio"),
            cue: t(
              "Remember how continuity depended on prioritization, dependency awareness, communication, and disciplined execution under uncertainty.",
              "Lembre como a continuidade dependia de priorização, consciência de dependências, comunicação e execução disciplinada sob incerteza."
            ),
            body: t(
              "Use that cue for Domain 1 continuity: survival comes from knowing what matters most, what can wait, and what dependencies silently control your recovery path.",
              "Use essa pista para continuidade no Domínio 1: sobrevivência vem de saber o que importa mais, o que pode esperar e quais dependências controlam silenciosamente o caminho de recuperação."
            )
          }),
          keyPointsBlock(
            t(
              "Use the BIA to rank business pain, keep recovery metrics distinct, plan for outside dependencies, test the plan, and never put systems ahead of human safety.",
              "Use a BIA para classificar a dor do negócio, mantenha métricas de recuperação distintas, planeje dependências externas, teste o plano e nunca coloque sistemas acima da segurança das pessoas."
            )
          )
        ],
        exercise: {
          prompt: t(
            "Which metric represents the maximum tolerable amount of data loss measured in time?",
            "Qual métrica representa a quantidade máxima tolerável de perda de dados medida em tempo?"
          ),
          supportText: t(
            "Do not confuse recovery speed with loss tolerance.",
            "Não confunda velocidade de recuperação com tolerância a perda."
          ),
          correctRationale: t(
            "RPO is the correct answer because it defines how much data loss, measured in time, the organization can tolerate.",
            "RPO é a resposta correta porque define quanto de perda de dados, medido em tempo, a organização pode tolerar."
          ),
          remediationNote: t(
            "RTO is how quickly service must return; RPO is about recoverable data freshness.",
            "RTO é quão rápido o serviço precisa voltar; RPO trata do frescor recuperável dos dados."
          ),
          options: [
            option(
              "A",
              true,
              t("RPO", "RPO"),
              t(
                "Correct. RPO measures tolerable data loss in time.",
                "Correto. RPO mede perda de dados tolerável em tempo."
              )
            ),
            option(
              "B",
              false,
              t("RTO", "RTO"),
              t(
                "Not best. RTO is the target for restoring service, not the amount of data loss tolerated.",
                "Não é a melhor. RTO é a meta para restaurar serviço, não a quantidade de perda de dados tolerada."
              )
            ),
            option(
              "C",
              false,
              t("MTBF", "MTBF"),
              t(
                "Not best. MTBF measures reliability between failures.",
                "Não é a melhor. MTBF mede confiabilidade entre falhas."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "personnel-security-and-lifecycle-controls",
        estimatedMinutes: 9,
        title: t("Personnel security and lifecycle controls", "Segurança de pessoal e controles de ciclo de vida"),
        summary: t(
          "Learn how hiring, role changes, and offboarding reduce human risk.",
          "Aprenda como contratação, mudança de função e desligamento reduzem o risco humano."
        ),
        objective: t(
          "Connect screening, agreements, least privilege, separation of duties, and offboarding to real security outcomes.",
          "Conecte triagem, acordos, privilégio mínimo, separação de funções e desligamento a resultados reais de segurança."
        ),
        blocks: [
          introBlock(
            t(
              "People are a major attack surface, but also a major control surface. Domain 1 expects you to know how personnel processes reduce abuse, error, collusion, and lingering access across the full employment lifecycle.",
              "Pessoas são uma grande superfície de ataque, mas também uma grande superfície de controle. O Domínio 1 espera que você saiba como processos de pessoal reduzem abuso, erro, conluio e acesso remanescente em todo o ciclo de emprego."
            )
          ),
          conceptBlock(
            "screening-hiring",
            t("Candidate screening reduces avoidable surprise", "Triagem de candidatos reduz surpresa evitável"),
            t(
              "Background checks, reference review, education validation, certification verification, and role-sensitive screening help align trust with actual risk. The required depth depends on the role, jurisdiction, and type of access the person will receive.",
              "Checagem de antecedentes, revisão de referências, validação de formação, verificação de certificações e triagem sensível ao cargo ajudam a alinhar confiança ao risco real. A profundidade exigida depende do papel, da jurisdição e do tipo de acesso que a pessoa vai receber."
            )
          ),
          conceptBlock(
            "agreements-and-acknowledgment",
            t("Employment agreements and policy acknowledgment reduce ambiguity", "Acordos de trabalho e aceite de políticas reduzem ambiguidade"),
            t(
              "Nondisclosure agreements, acceptable use policies, codes of conduct, privacy notices, and role-specific requirements matter because they define expectations before a dispute or misuse occurs. If the organization never communicated the rule clearly, enforcement becomes weaker and messier.",
              "NDAs, políticas de uso aceitável, códigos de conduta, avisos de privacidade e requisitos específicos por função importam porque definem expectativas antes de ocorrer uma disputa ou abuso. Se a organização nunca comunicou a regra com clareza, a aplicação fica mais fraca e mais confusa."
            )
          ),
          conceptBlock(
            "duty-controls-personnel",
            t("Least privilege, job rotation, and mandatory vacation expose hidden risk", "Privilégio mínimo, rotação de função e férias obrigatórias expõem risco oculto"),
            t(
              "Least privilege and need to know limit blast radius. Separation of duties reduces unilateral abuse. Job rotation and mandatory vacations can expose fraud or undocumented dependencies because someone else must perform the work in the employee's absence.",
              "Privilégio mínimo e need to know limitam o raio de impacto. Separação de funções reduz abuso unilateral. Rotação de função e férias obrigatórias podem expor fraude ou dependências não documentadas porque outra pessoa precisa executar o trabalho na ausência do colaborador."
            )
          ),
          conceptBlock(
            "onboarding-transfer-termination",
            t("Access should change as fast as the person's role changes", "O acesso deve mudar tão rápido quanto o papel da pessoa muda"),
            t(
              "Onboarding grants only what the role needs. Transfers should trigger immediate access review so privilege follows the new job, not the old one. Termination and offboarding must remove access promptly, recover assets, and close the identity path cleanly.",
              "A entrada na função concede apenas o que o papel precisa. Transferências devem disparar revisão imediata de acesso para que o privilégio siga o novo cargo, e não o antigo. Desligamento e encerramento de acesso precisam remover permissões rapidamente, recuperar ativos e fechar o caminho de identidade de forma limpa."
            )
          ),
          conceptBlock(
            "third-party-personnel",
            t("Contractors and vendors need equivalent personnel controls when they touch your environment", "Contratados e fornecedores precisam de controles equivalentes de pessoal quando tocam seu ambiente"),
            t(
              "Consultants, managed service staff, and outsourced administrators may hold powerful access but sit outside normal HR structures. Contracts, screening expectations, access restrictions, supervision, and clear offboarding requirements are necessary so that third-party convenience does not become first-party exposure.",
              "Consultores, equipes de serviços gerenciados e administradores terceirizados podem ter acessos poderosos, mas ficam fora das estruturas normais de RH. Contratos, expectativas de triagem, restrições de acesso, supervisão e requisitos claros de desligamento são necessários para que a conveniência de terceiros não vire risco direto para a organização."
            )
          ),
          conceptBlock(
            "personnel-privacy",
            t("Personnel security includes protecting employee data too", "Segurança de pessoal também inclui proteger dados de colaboradores"),
            t(
              "Background reports, HR records, health data, payroll information, and disciplinary documents are sensitive datasets. Domain 1 expects the same lawful handling, minimization, and role-based access discipline for employee information as for customer data.",
              "Relatórios de antecedentes, registros de RH, dados de saúde, informações de folha e documentos disciplinares são conjuntos sensíveis. O Domínio 1 espera o mesmo tratamento lícito, minimização e disciplina de acesso por papel para informações de colaboradores que para dados de clientes."
            )
          ),
          movieCueBlock({
            title: t("Up in the Air", "Amor Sem Escalas"),
            cue: t(
              "Remember that job changes and exits are emotionally charged moments, which is exactly why access and asset handling must be scripted rather than improvised.",
              "Lembre que mudanças de cargo e desligamentos são momentos emocionalmente carregados, e é exatamente por isso que acesso e tratamento de ativos devem ser roteirizados em vez de improvisados."
            ),
            body: t(
              "Use that cue for Domain 1 personnel security: the cleaner the process, the lower the chance that privilege, resentment, or confusion becomes an incident.",
              "Use essa pista para segurança de pessoal no Domínio 1: quanto mais limpo o processo, menor a chance de privilégio, ressentimento ou confusão virarem incidente."
            )
          }),
          keyPointsBlock(
            t(
              "Screen carefully, document expectations, keep privilege aligned to the current role, remove access fast on exit, and apply personnel controls to third parties too.",
              "Faça boa triagem, documente expectativas, mantenha o privilégio alinhado ao papel atual, remova acesso rápido na saída e aplique controles de pessoal também a terceiros."
            )
          )
        ],
        exercise: {
          prompt: t(
            "A system administrator transfers to a marketing role but keeps legacy admin rights 'just in case.' What is the BEST security response?",
            "Um administrador de sistemas é transferido para uma função de marketing, mas mantém direitos administrativos legados 'por garantia'. Qual é a MELHOR resposta de segurança?"
          ),
          supportText: t(
            "Choose the answer that best applies least privilege and lifecycle control.",
            "Escolha a resposta que melhor aplica privilégio mínimo e controle de ciclo de vida."
          ),
          correctRationale: t(
            "Access should be reviewed and reduced immediately so privileges match the new role. Old rights that no longer support job duties create unnecessary residual risk.",
            "O acesso deve ser revisado e reduzido imediatamente para que os privilégios correspondam ao novo papel. Direitos antigos que não apoiam mais as funções do cargo criam risco residual desnecessário."
          ),
          remediationNote: t(
            "Convenience access is a common cause of privilege creep and post-transfer abuse.",
            "Acesso por conveniência é causa comum de acúmulo indevido de privilégios e abuso após transferência."
          ),
          options: [
            option(
              "A",
              true,
              t(
                "Review and remove the legacy administrative access so the account matches the new role",
                "Revisar e remover o acesso administrativo legado para que a conta corresponda ao novo papel"
              ),
              t(
                "Correct. This applies least privilege and lifecycle-based access management.",
                "Correto. Isso aplica privilégio mínimo e gestão de acesso baseada no ciclo de vida."
              )
            ),
            option(
              "B",
              false,
              t(
                "Leave the access in place until the employee asks for it to be removed",
                "Deixar o acesso como está até que o colaborador peça sua remoção"
              ),
              t(
                "Not best. Users should not own the decision to retain unnecessary privilege.",
                "Não é a melhor. Usuários não devem ser donos da decisão de manter privilégio desnecessário."
              )
            ),
            option(
              "C",
              false,
              t(
                "Create a second admin account and leave the old one active as a backup",
                "Criar uma segunda conta administrativa e deixar a antiga ativa como backup"
              ),
              t(
                "Not best. This increases rather than reduces unnecessary privilege.",
                "Não é a melhor. Isso aumenta, e não reduz, privilégio desnecessário."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "risk-analysis-controls-and-reporting",
        estimatedMinutes: 9,
        title: t("Risk analysis, controls, and reporting", "Análise de risco, controles e reporte"),
        summary: t(
          "Learn how to describe risk, choose controls, and report what still remains.",
          "Aprenda como descrever o risco, escolher controles e reportar o que ainda continua."
        ),
        objective: t(
          "Use threat and vulnerability terms correctly, compare analysis methods, and track residual risk.",
          "Use corretamente os termos de ameaça e vulnerabilidade, compare métodos de análise e acompanhe o risco residual."
        ),
        blocks: [
          introBlock(
            t(
              "Domain 1 risk management is not just the ALE formula. It is the full chain from identifying exposure, to choosing controls, to checking whether they work, to reporting residual risk in a way leaders can actually act on.",
              "Gestão de risco no Domínio 1 não é só a fórmula de ALE. É a cadeia completa de identificar exposição, escolher controles, verificar se funcionam e reportar risco residual de um jeito em que a liderança realmente consiga agir."
            )
          ),
          conceptBlock(
            "threat-vulnerability-language",
            t("Threats, vulnerabilities, assets, exposure, and risk are related but distinct", "Ameaças, vulnerabilidades, ativos, exposição e risco são relacionados, mas distintos"),
            t(
              "An asset has value. A threat can cause harm. A vulnerability is the weakness that makes exploitation possible. Exposure is the condition of being susceptible. Risk is the likelihood and impact of that threat successfully exploiting that vulnerability against the asset.",
              "Um ativo tem valor. Uma ameaça pode causar dano. Uma vulnerabilidade é a fraqueza que torna a exploração possível. Exposição é a condição de estar suscetível. Risco é a probabilidade e o impacto de a ameaça explorar com sucesso essa vulnerabilidade contra o ativo."
            )
          ),
          conceptBlock(
            "analysis-methods",
            t("Qualitative and quantitative analysis answer different decision needs", "Análise qualitativa e quantitativa respondem a necessidades diferentes de decisão"),
            t(
              "Quantitative analysis uses values such as asset value, exposure factor, SLE, ARO, and ALE to estimate loss in financial terms. Qualitative analysis uses ranking and expert judgment where precision is limited. Mature programs often use both because some impacts are measurable and others are strategic, legal, or reputational.",
              "Análise quantitativa usa valores como valor do ativo, exposure factor, SLE, ARO e ALE para estimar perda em termos financeiros. Análise qualitativa usa ranking e julgamento especializado quando a precisão é limitada. Programas maduros costumam usar as duas porque alguns impactos são mensuráveis e outros são estratégicos, legais ou reputacionais."
            )
          ),
          conceptBlock(
            "risk-response-recap",
            t("Risk response options must change the exposure deliberately", "Opções de resposta a risco precisam mudar a exposição de forma deliberada"),
            t(
              "Organizations may avoid, mitigate, transfer, deter, or accept risk. Ignoring risk is not a legitimate treatment. Appetite, tolerance, and capacity help leaders decide how much uncertainty they are willing and able to carry after controls are considered.",
              "Organizações podem evitar, mitigar, transferir, dissuadir ou aceitar risco. Ignorar risco não é tratamento legítimo. Apetite, tolerância e capacidade ajudam a liderança a decidir quanta incerteza está disposta e consegue carregar depois de considerar os controles."
            )
          ),
          conceptBlock(
            "control-taxonomy",
            t("Control categories and control functions are two different axes", "Categorias e funções de controle são dois eixos diferentes"),
            t(
              "Administrative, technical, and physical controls describe implementation style. Preventive, detective, corrective, recovery, deterrent, directive, and compensating controls describe purpose. The same environment often needs layered controls across both axes to reduce a single business risk.",
              "Controles administrativos, técnicos e físicos descrevem o estilo de implementação. Controles preventivos, detectivos, corretivos, de recuperação, dissuasórios, diretivos e compensatórios descrevem a finalidade. O mesmo ambiente frequentemente precisa de controles em camadas nos dois eixos para reduzir um único risco de negócio."
            )
          ),
          conceptBlock(
            "assessment-monitoring-reporting",
            t("Assessment, monitoring, and reporting keep risk management alive", "Avaliação, monitoramento e reporte mantêm a gestão de risco viva"),
            t(
              "Security and privacy control assessments test whether controls are implemented correctly and remain effective. Continuous monitoring looks for drift and emerging threats between formal reviews. Reporting turns findings into a risk register, ownership list, and action plan leaders can track.",
              "Avaliações de controles de segurança e privacidade testam se os controles foram implementados corretamente e continuam eficazes. Monitoramento contínuo busca desvio e ameaças emergentes entre revisões formais. Reporte transforma achados em registro de riscos, lista de responsáveis e plano de ação que a liderança consegue acompanhar."
            )
          ),
          conceptBlock(
            "maturity-models",
            t("Continuous improvement matters because risk programs can mature", "Melhoria contínua importa porque programas de risco podem amadurecer"),
            t(
              "Risk maturity models describe the difference between ad hoc practice and integrated, optimized governance. Domain 1 does not expect perfect frameworks everywhere, but it does expect you to know that mature programs standardize, measure, improve, and feed lessons learned back into decisions.",
              "Modelos de maturidade de risco descrevem a diferença entre prática ad hoc e governança integrada e otimizada. O Domínio 1 não espera frameworks perfeitos em todo lugar, mas espera que você saiba que programas maduros padronizam, medem, melhoram e realimentam decisões com lições aprendidas."
            )
          ),
          movieCueBlock({
            title: t("Chernobyl", "Chernobyl"),
            cue: t(
              "Remember how ignored warnings, poor reporting, and distorted incentives let risk accumulate long before the catastrophe became visible.",
              "Lembre como alertas ignorados, reporte ruim e incentivos distorcidos deixaram o risco se acumular muito antes da catástrofe ficar visível."
            ),
            body: t(
              "Use that cue for Domain 1 risk management: controls only help if they are measured honestly, reported clearly, and improved before the loss forces the lesson.",
              "Use essa pista para gestão de risco no Domínio 1: controles só ajudam se forem medidos com honestidade, reportados com clareza e melhorados antes que a perda imponha a lição."
            )
          }),
          keyPointsBlock(
            t(
              "Use precise risk language, choose analysis methods that fit the decision, layer controls by category and function, and keep the program alive with assessment, monitoring, and reporting.",
              "Use linguagem precisa de risco, escolha métodos de análise que caibam na decisão, faça camadas de controles por categoria e função e mantenha o programa vivo com avaliação, monitoramento e reporte."
            )
          )
        ],
        exercise: {
          prompt: t(
            "Which artifact BEST tracks identified risks, their owners, mitigation status, and follow-up actions over time?",
            "Qual artefato MELHOR acompanha riscos identificados, seus responsáveis, status de mitigação e ações de acompanhamento ao longo do tempo?"
          ),
          supportText: t(
            "Focus on the management record, not the assessment methodology itself.",
            "Foque no registro gerencial, e não na metodologia de avaliação em si."
          ),
          correctRationale: t(
            "A risk register is designed to inventory and track risks, ownership, treatment decisions, and progress over time.",
            "Um registro de riscos foi desenhado para inventariar e acompanhar riscos, responsáveis, decisões de tratamento e progresso ao longo do tempo."
          ),
          remediationNote: t(
            "An assessment identifies and evaluates; the register persists and tracks.",
            "Uma avaliação identifica e avalia; o registro persiste e acompanha."
          ),
          options: [
            option(
              "A",
              true,
              t("Risk register", "Registro de riscos"),
              t(
                "Correct. The risk register is the tracking and governance artifact.",
                "Correto. O registro de riscos é o artefato de acompanhamento e governança."
              )
            ),
            option(
              "B",
              false,
              t("Nondisclosure agreement", "NDA"),
              t(
                "Not best. An NDA is a legal agreement, not a risk tracking artifact.",
                "Não é a melhor. Um NDA é um acordo jurídico, não um artefato de acompanhamento de risco."
              )
            ),
            option(
              "C",
              false,
              t("Business impact analysis", "Análise de impacto no negócio"),
              t(
                "Not best. A BIA informs continuity prioritization but is not the ongoing risk tracking record described here.",
                "Não é a melhor. Uma BIA informa a priorização de continuidade, mas não é o registro contínuo de acompanhamento de risco descrito aqui."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "threat-modeling-and-intelligence-foundations",
        estimatedMinutes: 9,
        title: t("Threat modeling and threat intelligence foundations", "Fundamentos de modelagem de ameaças e inteligência de ameaças"),
        summary: t(
          "Learn how to think like an attacker before the incident happens.",
          "Aprenda a pensar como um atacante antes de o incidente acontecer."
        ),
        objective: t(
          "Recognize common threat-modeling methods and connect attacker behavior to design and detection decisions.",
          "Reconheça métodos comuns de modelagem de ameaças e conecte o comportamento do atacante a decisões de design e detecção."
        ),
        blocks: [
          introBlock(
            t(
              "Threat modeling asks what could go wrong before an attacker teaches the lesson in production. Domain 1 expects you to know enough about the common models to choose the one that fits the problem and to reason from trust boundaries and attacker behavior.",
              "Modelagem de ameaças pergunta o que pode dar errado antes que um atacante ensine a lição em produção. O Domínio 1 espera que você conheça o suficiente dos modelos comuns para escolher o que melhor se encaixa no problema e raciocinar a partir de limites de confiança e comportamento do atacante."
            )
          ),
          conceptBlock(
            "why-threat-modeling",
            t("Threat modeling is cheaper before deployment than after compromise", "Modelagem de ameaças é mais barata antes da entrada em produção do que depois do comprometimento"),
            t(
              "A proactive approach during design helps teams predict likely abuse paths and build defenses early. A reactive approach still has value after deployment, but it usually costs more because systems, users, and dependencies are already live.",
              "Uma abordagem proativa durante o design ajuda equipes a prever caminhos prováveis de abuso e construir defesas cedo. Uma abordagem reativa ainda tem valor depois da entrada em produção, mas geralmente custa mais porque sistemas, usuários e dependências já estão ativos."
            )
          ),
          conceptBlock(
            "stride-dread",
            t("STRIDE identifies classes of abuse, and DREAD helps prioritize them", "STRIDE identifica classes de abuso, e DREAD ajuda a priorizá-las"),
            t(
              "STRIDE covers spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege. DREAD evaluates severity factors such as damage potential and exploitability. Together they help teams identify likely threats and decide which ones deserve attention first.",
              "STRIDE cobre spoofing, tampering, repudiation, information disclosure, denial of service e elevation of privilege. DREAD avalia fatores de severidade como potencial de dano e explorabilidade. Juntos, ajudam equipes a identificar ameaças prováveis e decidir quais merecem atenção primeiro."
            )
          ),
          conceptBlock(
            "pasta-vast-trike",
            t("PASTA, VAST, and Trike bring different modeling styles", "PASTA, VAST e Trike trazem estilos diferentes de modelagem"),
            t(
              "PASTA is a staged, risk-oriented methodology. VAST aims to fit Agile and large-scale environments. Trike emphasizes risk-based repeatability and collaboration. The exam usually tests the general purpose of these methods more than their every sub-step.",
              "PASTA é uma metodologia em estágios orientada a risco. VAST busca se encaixar em ambientes Agile e de grande escala. Trike enfatiza repetibilidade orientada a risco e colaboração. A prova geralmente testa o propósito geral desses métodos mais do que cada subetapa."
            )
          ),
          conceptBlock(
            "decomposition",
            t("Good modeling starts by decomposing the system", "Boa modelagem começa decompondo o sistema"),
            t(
              "Trust boundaries, data flows, input points, privileged operations, and existing controls reveal where the system is most fragile. If you cannot explain how data enters, moves, changes trust zones, and triggers privileged action, you are not modeling the real system yet.",
              "Limites de confiança, fluxos de dados, pontos de entrada, operações privilegiadas e controles existentes revelam onde o sistema é mais frágil. Se você não consegue explicar como os dados entram, se movem, cruzam zonas de confiança e acionam ações privilegiadas, ainda não está modelando o sistema real."
            )
          ),
          conceptBlock(
            "attack-knowledge-bases",
            t("ATT&CK, CAPEC, STIX, and TAXII support shared threat understanding", "ATT&CK, CAPEC, STIX e TAXII apoiam entendimento compartilhado de ameaças"),
            t(
              "MITRE ATT&CK organizes real-world adversary behavior. CAPEC catalogs common attack patterns. STIX provides a language for threat information, and TAXII provides a way to exchange it. These resources help move security from isolated intuition to shared, testable knowledge.",
              "MITRE ATT&CK organiza comportamento adversário do mundo real. CAPEC cataloga padrões comuns de ataque. STIX fornece uma linguagem para informação de ameaças, e TAXII fornece um modo de trocá-la. Esses recursos ajudam a mover a segurança de intuição isolada para conhecimento compartilhado e testável."
            )
          ),
          conceptBlock(
            "attacker-asset-software-focus",
            t("Threat modeling can focus on attackers, assets, or software behavior", "Modelagem de ameaças pode focar em atacantes, ativos ou comportamento do software"),
            t(
              "Some models begin with adversary goals, some with the organization's most valuable assets, and others with application behavior and data flow. The best choice depends on what decision the team needs to make and where uncertainty is currently highest.",
              "Alguns modelos começam pelos objetivos do adversário, outros pelos ativos mais valiosos da organização, e outros pelo comportamento da aplicação e pelo fluxo de dados. A melhor escolha depende da decisão que a equipe precisa tomar e de onde a incerteza está mais alta naquele momento."
            )
          ),
          movieCueBlock({
            title: t("WarGames", "Jogos de Guerra"),
            cue: t(
              "Remember how a system can be abused in ways its creators did not intend when assumptions about access, inputs, and trust are weak.",
              "Lembre como um sistema pode ser abusado de formas que seus criadores não pretendiam quando premissas sobre acesso, entradas e confiança são fracas."
            ),
            body: t(
              "Use that cue for Domain 1 threat modeling: before choosing controls, map where trust can be impersonated, altered, overwhelmed, or escalated.",
              "Use essa pista para modelagem de ameaças no Domínio 1: antes de escolher controles, mapeie onde a confiança pode ser imitada, alterada, sobrecarregada ou elevada indevidamente."
            )
          }),
          keyPointsBlock(
            t(
              "Model early, decompose the system honestly, use STRIDE and related methods to frame risk, and anchor intuition with shared threat knowledge such as ATT&CK and CAPEC.",
              "Modele cedo, decomponha o sistema com honestidade, use STRIDE e métodos relacionados para enquadrar risco e ancore a intuição em conhecimento compartilhado como ATT&CK e CAPEC."
            )
          )
        ],
        exercise: {
          prompt: t(
            "In STRIDE, which category MOST directly covers an attacker pretending to be a legitimate user?",
            "No STRIDE, qual categoria cobre MAIS diretamente um atacante fingindo ser um usuário legítimo?"
          ),
          supportText: t(
            "Choose the threat class tied to false identity.",
            "Escolha a classe de ameaça ligada a identidade falsa."
          ),
          correctRationale: t(
            "Spoofing is correct because it is the STRIDE category focused on impersonating an identity or source.",
            "Spoofing é correto porque é a categoria do STRIDE focada em personificar uma identidade ou origem."
          ),
          remediationNote: t(
            "Tampering is unauthorized change, and elevation of privilege is unauthorized increase in authority after access exists.",
            "Tampering é alteração não autorizada, e elevation of privilege é aumento não autorizado de autoridade depois que o acesso já existe."
          ),
          options: [
            option(
              "A",
              true,
              t("Spoofing", "Spoofing"),
              t(
                "Correct. Spoofing is identity impersonation.",
                "Correto. Spoofing é personificação de identidade."
              )
            ),
            option(
              "B",
              false,
              t("Tampering", "Tampering"),
              t(
                "Not best. Tampering concerns unauthorized change to data or systems.",
                "Não é a melhor. Tampering trata de alteração não autorizada de dados ou sistemas."
              )
            ),
            option(
              "C",
              false,
              t("Repudiation", "Repudiation"),
              t(
                "Not best. Repudiation is denying an action or event after it occurred.",
                "Não é a melhor. Repudiation é negar uma ação ou evento depois que ocorreu."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "supply-chain-and-third-party-risk",
        estimatedMinutes: 9,
        title: t("Supply chain and third-party risk", "Risco de cadeia de suprimentos e terceiros"),
        summary: t(
          "Learn why vendors, software, and hardware from others are part of your risk.",
          "Aprenda por que fornecedores, software e hardware de terceiros fazem parte do seu risco."
        ),
        objective: t(
          "Recognize supply-chain attack paths and reduce dependency risk with due diligence, contracts, monitoring, and SBOMs.",
          "Reconheça caminhos de ataque na cadeia de suprimentos e reduza o risco das dependências com diligência prévia, contratos, monitoramento e SBOMs."
        ),
        blocks: [
          introBlock(
            t(
              "A trusted brand is not the same as a trusted supply chain. Domain 1 treats suppliers, software dependencies, outsourced operations, and hardware provenance as security problems because compromise can enter long before your own controls ever see the system.",
              "Uma marca confiável não é o mesmo que uma cadeia de suprimentos confiável. O Domínio 1 trata fornecedores, dependências de software, operações terceirizadas e procedência de hardware como problemas de segurança porque o comprometimento pode entrar muito antes de seus próprios controles verem o sistema."
            )
          ),
          conceptBlock(
            "scrm-basics",
            t("Supply chain risk management is about trust across every handoff", "Gestão de risco de cadeia de suprimentos trata da confiança em cada transferência"),
            t(
              "Each supplier, provider, integrator, and update path becomes part of your effective environment. A secure supply chain is one where roles, controls, provenance, and accountability are visible enough that one weak link does not silently poison the final service or product.",
              "Cada fornecedor, provedor, integrador e caminho de atualização vira parte do seu ambiente efetivo. Uma cadeia de suprimentos segura é aquela em que papéis, controles, procedência e responsabilidades claras são visíveis o suficiente para que um elo fraco não envenene silenciosamente o serviço ou produto final."
            )
          ),
          conceptBlock(
            "tampering-counterfeits-implants",
            t("Tampering, counterfeits, and implants are classic supply-chain threats", "Adulteração, contrafações e implantes são ameaças clássicas de cadeia de suprimentos"),
            t(
              "Attackers may change hardware, software, firmware, packaging, or update channels before delivery. Because these attacks exploit trust and complexity, they are often harder to notice than direct perimeter attacks.",
              "Atacantes podem alterar hardware, software, firmware, embalagem ou canais de atualização antes da entrega. Como esses ataques exploram confiança e complexidade, costumam ser mais difíceis de perceber do que ataques diretos de perímetro."
            )
          ),
          conceptBlock(
            "third-party-diligence",
            t("Third-party diligence should happen before and after contract signature", "Diligência sobre terceiros deve acontecer antes e depois da assinatura"),
            t(
              "On-site assessments, document reviews, architecture review, audit reports, control questionnaires, and ongoing monitoring help the organization understand how much trust a supplier deserves. This is especially important when vendors host sensitive data, manage updates, or administer critical systems.",
              "Avaliações in loco, revisão documental, revisão de arquitetura, relatórios de auditoria, questionários de controle e monitoramento contínuo ajudam a organização a entender quanta confiança um fornecedor merece. Isso é especialmente importante quando fornecedores hospedam dados sensíveis, gerenciam atualizações ou administram sistemas críticos."
            )
          ),
          conceptBlock(
            "contractual-controls-third-party",
            t("Contracts should carry security requirements, not just delivery promises", "Contratos devem carregar requisitos de segurança, e não só promessas de entrega"),
            t(
              "Security clauses, right-to-audit language, incident notification duties, minimum control expectations, segregation requirements, and service-level commitments help convert trust into enforceable obligations. Without this, supplier risk is often governed by goodwill rather than leverage.",
              "Cláusulas de segurança, linguagem de direito de auditoria, deveres de notificação de incidente, expectativas mínimas de controle, requisitos de segregação e compromissos de nível de serviço ajudam a transformar confiança em obrigações exigíveis. Sem isso, o risco de fornecedor costuma ser governado por boa vontade, e não por alavancagem."
            )
          ),
          conceptBlock(
            "sbom-root-of-trust",
            t("SBOMs and hardware trust anchors reduce opacity", "SBOMs e âncoras de confiança de hardware reduzem opacidade"),
            t(
              "A software bill of materials reveals libraries and components inside an application, making vulnerability tracking and incident triage faster. Silicon root of trust and physically unclonable function technologies strengthen identity and integrity claims at the hardware layer when provenance matters.",
              "Uma lista de materiais de software, ou SBOM, revela bibliotecas e componentes dentro de uma aplicação, acelerando o rastreamento de vulnerabilidades e a triagem de incidentes. Tecnologias de raiz de confiança em hardware e PUF fortalecem afirmações de identidade e integridade quando a procedência importa."
            )
          ),
          conceptBlock(
            "ongoing-vendor-monitoring",
            t("Supplier trust must be reassessed as conditions change", "Confiança em fornecedor precisa ser reavaliada à medida que as condições mudam"),
            t(
              "New subcontractors, product acquisitions, rushed updates, dependency sprawl, and changing geopolitical or legal conditions can all change third-party risk after onboarding. Domain 1 expects continuous reassessment, not one-time optimism.",
              "Novos subcontratados, aquisições de produto, atualizações apressadas, expansão de dependências e mudanças geopolíticas ou legais podem alterar o risco de terceiros depois do início da relação. O Domínio 1 espera reavaliação contínua, e não otimismo de uma única vez."
            )
          ),
          movieCueBlock({
            title: t("Mission: Impossible", "Missão: Impossível"),
            cue: t(
              "Remember that the trusted gadget or trusted delivery path is exactly where the surprise can be hiding if nobody verified provenance and integrity.",
              "Lembre que o gadget confiável ou o caminho de entrega confiável é exatamente onde a surpresa pode estar escondida se ninguém verificou procedência e integridade."
            ),
            body: t(
              "Use that cue for Domain 1 supply-chain risk: the most dangerous dependency is often the one everyone assumed was already safe.",
              "Use essa pista para risco de cadeia de suprimentos no Domínio 1: a dependência mais perigosa muitas vezes é aquela que todos assumiram que já era segura."
            )
          }),
          keyPointsBlock(
            t(
              "Assess suppliers before trust, write security into contracts, monitor continuously, and reduce dependency opacity with SBOMs and hardware trust anchors where appropriate.",
              "Avalie fornecedores antes da confiança, escreva segurança em contratos, monitore continuamente e reduza a opacidade de dependências com SBOMs e âncoras de confiança de hardware quando apropriado."
            )
          )
        ],
        exercise: {
          prompt: t(
            "A vendor provides a critical application but refuses to disclose the libraries and components bundled inside it. Which control would MOST directly reduce this dependency transparency problem?",
            "Um fornecedor entrega uma aplicação crítica, mas se recusa a revelar as bibliotecas e componentes empacotados dentro dela. Qual controle reduziria MAIS diretamente esse problema de transparência da dependência?"
          ),
          supportText: t(
            "Choose the control that exposes software composition.",
            "Escolha o controle que expõe a composição do software."
          ),
          correctRationale: t(
            "An SBOM is the best answer because it provides a structured inventory of software components and dependencies.",
            "Um SBOM é a melhor resposta porque fornece um inventário estruturado de componentes e dependências de software."
          ),
          remediationNote: t(
            "Traditional SLAs and uptime metrics do not reveal software composition by themselves.",
            "SLAs tradicionais e métricas de disponibilidade não revelam, por si só, a composição do software."
          ),
          options: [
            option(
              "A",
              true,
              t("Software bill of materials (SBOM)", "Lista de materiais de software (SBOM)"),
              t(
                "Correct. An SBOM exposes the component inventory needed for transparency and vulnerability tracking.",
                "Correto. Um SBOM expõe o inventário de componentes necessário para transparência e rastreamento de vulnerabilidades."
              )
            ),
            option(
              "B",
              false,
              t("Hot site recovery contract", "Contrato de site de recuperação hot"),
              t(
                "Not best. A recovery contract helps continuity, not dependency transparency.",
                "Não é a melhor. Um contrato de recuperação ajuda continuidade, e não transparência de dependências."
              )
            ),
            option(
              "C",
              false,
              t("Role-based access control matrix", "Matriz de controle de acesso baseado em papéis"),
              t(
                "Not best. RBAC helps internal authorization, not supplier software composition visibility.",
                "Não é a melhor. RBAC ajuda autorização interna, e não visibilidade sobre a composição do software do fornecedor."
              )
            )
          ]
        }
      }),
      lesson({
        slug: "security-awareness-education-and-training",
        estimatedMinutes: 9,
        title: t("Security awareness, education, and training", "Conscientização, educação e treinamento em segurança"),
        summary: t(
          "Learn how to build a program that changes behavior, not just one that checks a box.",
          "Aprenda como criar um programa que muda comportamento, e não apenas cumpre tabela."
        ),
        objective: t(
          "Differentiate awareness, training, and education, and keep the program useful over time.",
          "Diferencie conscientização, treinamento e educação, e mantenha o programa útil ao longo do tempo."
        ),
        blocks: [
          introBlock(
            t(
              "People do not become secure because they clicked through a slideshow once. Domain 1 treats awareness and training as operational controls that should change behavior, improve reporting, and stay relevant as threats and technology evolve.",
              "Pessoas não se tornam seguras porque clicaram em uma apresentação uma vez. O Domínio 1 trata conscientização e treinamento como controles operacionais que devem mudar comportamento, melhorar o reporte e continuar relevantes à medida que ameaças e tecnologia evoluem."
            )
          ),
          conceptBlock(
            "awareness-training-education",
            t("Awareness, training, and education are related but different", "Conscientização, treinamento e educação são relacionados, mas diferentes"),
            t(
              "Awareness tells people what to notice and why it matters. Training teaches them how to perform their specific work securely. Education goes deeper so people understand concepts beyond their immediate role, often for growth into expert responsibilities.",
              "Conscientização diz às pessoas o que perceber e por que isso importa. Treinamento ensina como executar o trabalho específico com segurança. Educação vai mais fundo para que as pessoas entendam conceitos além do papel imediato, muitas vezes para crescimento rumo a responsabilidades de especialista."
            )
          ),
          conceptBlock(
            "program-methods",
            t("Effective programs use multiple methods, not one stale module", "Programas eficazes usam múltiplos métodos, e não um único módulo envelhecido"),
            t(
              "Phishing simulations, role-based scenarios, social engineering drills, internal campaigns, videos, champion networks, and selective gamification keep training closer to real decisions. The goal is usable judgment, not decorative completion rates.",
              "Simulações de phishing, cenários por função, exercícios de engenharia social, campanhas internas, vídeos, redes de multiplicadores e gamificação seletiva mantêm o treinamento mais próximo de decisões reais. O objetivo é um julgamento útil, e não taxas decorativas de conclusão."
            )
          ),
          conceptBlock(
            "social-engineering-patterns",
            t("Social engineering works by exploiting human shortcuts", "Engenharia social funciona explorando atalhos humanos"),
            t(
              "Authority, urgency, scarcity, familiarity, trust, consensus, and intimidation are recurring levers. Phishing, spear phishing, vishing, smishing, tailgating, impersonation, dumpster diving, and business email compromise are different delivery styles built on those same psychological openings.",
              "Autoridade, urgência, escassez, familiaridade, confiança, consenso e intimidação são alavancas recorrentes. Phishing, spear phishing, vishing, smishing, tailgating, impersonation, dumpster diving e fraude de email corporativo são estilos diferentes de ataque construídos sobre essas mesmas aberturas psicológicas."
            )
          ),
          conceptBlock(
            "role-based-refresh",
            t("Role-based and lifecycle-based refresh matters", "Atualização baseada em função e ciclo de vida importa"),
            t(
              "New hires need onboarding content. Developers, help desk staff, executives, and administrators need different examples and risk emphasis. Annual refresh alone is rarely enough if the role changes, the threat changes, or the organization adopts new technologies quickly.",
              "Novas contratações precisam de conteúdo inicial. Desenvolvedores, equipes de suporte, executivos e administradores precisam de exemplos e ênfases de risco diferentes. Atualização anual isolada raramente é suficiente se o papel muda, a ameaça muda ou a organização adota novas tecnologias rapidamente."
            )
          ),
          conceptBlock(
            "content-review",
            t("Training content should evolve with technology and threat trends", "O conteúdo de treinamento deve evoluir com tecnologia e tendências de ameaça"),
            t(
              "AI-generated phishing, cryptocurrency fraud, cloud collaboration abuse, and new collaboration platforms all change how users are targeted. Domain 1 expects periodic review so content, examples, and testing methods do not go stale while the threat landscape keeps moving.",
              "Phishing gerado por IA, fraude com criptomoedas, abuso de colaboração em nuvem e novas plataformas de colaboração mudam a forma como usuários são atacados. O Domínio 1 espera revisão periódica para que conteúdo, exemplos e métodos de teste não envelheçam enquanto o cenário de ameaças continua se movendo."
            )
          ),
          conceptBlock(
            "effectiveness-metrics",
            t("Metrics should show behavior change, not just attendance", "Métricas devem mostrar mudança de comportamento, e não apenas presença"),
            t(
              "Click rate, report rate, repeat failure rate, role-specific improvement, simulated incident response behavior, and champion participation are stronger indicators than completion alone. A program is effective when people notice, avoid, and report threats faster over time.",
              "Taxa de clique, taxa de reporte, reincidência de falha, melhora por função, comportamento em resposta simulada e participação dos multiplicadores são indicadores melhores do que conclusão isolada. Um programa é eficaz quando as pessoas percebem, evitam e reportam ameaças mais rápido ao longo do tempo."
            )
          ),
          movieCueBlock({
            title: t("Catch Me If You Can", "Prenda-me Se For Capaz"),
            cue: t(
              "Remember how confidence, authority, and familiarity manipulated people more effectively than brute force ever could.",
              "Lembre como confiança, autoridade e familiaridade manipularam pessoas com muito mais eficácia do que força bruta conseguiria."
            ),
            body: t(
              "Use that cue for Domain 1 awareness: the program works when people learn to pause, verify, and report before social pressure becomes compromise.",
              "Use essa pista para conscientização no Domínio 1: o programa funciona quando as pessoas aprendem a pausar, verificar e reportar antes que a pressão social vire comprometimento."
            )
          }),
          keyPointsBlock(
            t(
              "Teach awareness, training, and education differently, refresh content as threats evolve, and measure whether people are changing behavior, not just completing modules.",
              "Ensine conscientização, treinamento e educação de formas diferentes, atualize o conteúdo à medida que as ameaças evoluem e meça se as pessoas estão mudando comportamento, e não apenas concluindo módulos."
            )
          )
        ],
        exercise: {
          prompt: t(
            "Which metric BEST shows that a phishing awareness program is improving real behavior over time?",
            "Qual métrica MELHOR mostra que um programa de conscientização sobre phishing está melhorando o comportamento real ao longo do tempo?"
          ),
          supportText: t(
            "Choose the measure that shows safer behavior, not attendance.",
            "Escolha a medida que mostra comportamento mais seguro, não presença."
          ),
          correctRationale: t(
            "The best indicator is more reporting and fewer repeat failures. That shows people are spotting and escalating suspicious messages, not just finishing training.",
            "O melhor indicador é mais reportes e menos falhas repetidas. Isso mostra que as pessoas estão percebendo e escalando mensagens suspeitas, e não apenas concluindo treinamento."
          ),
          remediationNote: t(
            "Completion rate alone says little about whether the behavior changed.",
            "Taxa de conclusão sozinha diz pouco sobre se o comportamento mudou."
          ),
          options: [
            option(
              "A",
              true,
              t(
                "An increase in users reporting suspicious messages and a decrease in repeat phishing failures",
                "Um aumento de usuários reportando mensagens suspeitas e uma queda na reincidência de falhas em phishing"
              ),
              t(
                "Correct. This reflects safer behavior, not just participation.",
                "Correto. Isso reflete comportamento mais seguro, e não apenas participação."
              )
            ),
            option(
              "B",
              false,
              t("A 100% course completion rate", "Uma taxa de conclusão de curso de 100%"),
              t(
                "Not best. Completion alone does not prove better behavior under pressure.",
                "Não é a melhor. Conclusão sozinha não prova comportamento melhor sob pressão."
              )
            ),
            option(
              "C",
              false,
              t("The number of slides in the annual awareness deck", "O número de slides no deck anual de conscientização"),
              t(
                "Not best. Content volume is not an effectiveness metric.",
                "Não é a melhor. Volume de conteúdo não é métrica de eficácia."
              )
            )
          ]
        }
      })
    ]
  }
];

// Domain 1 stays local here; Domains 2-8 are authored in deep-domain-seeds.ts.

const domains: DomainSeed[] = [
  ...baseDomains,
  ...(buildDeepDomainSeeds({
    t,
    option,
    lesson: <T>(input: T) => input,
    introBlock,
    conceptBlock,
    movieCueBlock,
    keyPointsBlock
  }) as DomainSeed[])
];

function t<T>(en: T, ptBR: T): Localized<T> {
  return { en, "pt-BR": ptBR };
}

function option(
  key: string,
  isCorrect: boolean,
  text: Localized<string>,
  feedback: Localized<string>
): OptionSeed {
  return { key, isCorrect, text, feedback };
}

function lesson(input: LessonSeed): LessonSeed {
  return input;
}

function introBlock(body: Localized<string>, title: Localized<string> = defaultBlockTitles.intro): BlockSeed {
  return {
    key: "intro",
    type: ContentBlockType.INTRO,
    title,
    body
  };
}

function conceptBlock(key: string, title: Localized<string>, body: Localized<string>): BlockSeed {
  return {
    key,
    type: ContentBlockType.CONCEPT,
    title,
    body
  };
}

function movieCueBlock(movie: MovieAnchorSeed, title: Localized<string> = defaultBlockTitles.movieCue): BlockSeed {
  return {
    key: "movie-cue",
    type: ContentBlockType.MOVIE_CUE,
    title,
    body: movie.body,
    movieTitle: movie.title,
    movieCue: movie.cue
  };
}

function keyPointsBlock(body: Localized<string>, title: Localized<string> = defaultBlockTitles.keyPoints): BlockSeed {
  return {
    key: "key-points",
    type: ContentBlockType.KEY_POINTS,
    title,
    body
  };
}

function getValue<T>(localized: Localized<T>, locale: LocaleCode): T {
  return localized[locale];
}

function moduleTranslationSeed(domain: DomainSeed): NodeTranslationSeed {
  return {
    title: t(`${domain.title.en} Core`, `${domain.title["pt-BR"]} Essencial`),
    shortTitle: t("Core", "Essencial"),
    summary: t(
      "Focused checkpoints: foundations, controls, and applied judgment.",
      "Checkpoints focados: fundamentos, controles e julgamento aplicado."
    ),
    objective: t(
      "Build calm, exam-ready judgment one checkpoint at a time.",
      "Construa julgamento calmo e pronto para prova, um checkpoint por vez."
    )
  };
}

function checkpointTranslationSeed(lessonSeed: LessonSeed): NodeTranslationSeed {
  return {
    title: t(`Checkpoint: ${lessonSeed.title.en}`, `Checkpoint: ${lessonSeed.title["pt-BR"]}`),
    shortTitle: lessonSeed.title,
    summary: lessonSeed.summary,
    objective: lessonSeed.objective
  };
}

function isStructuredLessonSeed(lessonSeed: LessonSeed): lessonSeed is StructuredLessonSeed {
  return "blocks" in lessonSeed;
}

function buildLessonBlocks(lessonSeed: LessonSeed): BlockSeed[] {
  if (isStructuredLessonSeed(lessonSeed)) {
    return lessonSeed.blocks;
  }

  return [
    {
      key: "intro",
      type: ContentBlockType.INTRO,
      title: defaultBlockTitles.intro,
      body: lessonSeed.intro
    },
    {
      key: "concept-1",
      type: ContentBlockType.CONCEPT,
      title: defaultBlockTitles.conceptOne,
      body: lessonSeed.conceptOne
    },
    {
      key: "concept-2",
      type: ContentBlockType.CONCEPT,
      title: defaultBlockTitles.conceptTwo,
      body: lessonSeed.conceptTwo
    },
    {
      key: "movie-cue",
      type: ContentBlockType.MOVIE_CUE,
      title: defaultBlockTitles.movieCue,
      body: lessonSeed.movie.body,
      movieTitle: lessonSeed.movie.title,
      movieCue: lessonSeed.movie.cue
    },
    {
      key: "key-points",
      type: ContentBlockType.KEY_POINTS,
      title: defaultBlockTitles.keyPoints,
      body: lessonSeed.keyPoints
    }
  ];
}

function domainCode(domainNumber: number) {
  return `CISSP-D${domainNumber}`;
}

function moduleCode(domainNumber: number) {
  return `${domainCode(domainNumber)}-M1`;
}

function lessonCode(domainNumber: number, lessonNumber: number) {
  return `${moduleCode(domainNumber)}-L${lessonNumber}`;
}

function checkpointCode(domainNumber: number, lessonNumber: number) {
  return `${lessonCode(domainNumber, lessonNumber)}-C1`;
}

function exerciseCode(domainNumber: number, lessonNumber: number) {
  return `${checkpointCode(domainNumber, lessonNumber)}-Q1`;
}

async function syncProgramTranslations(programVersionId: string, translations: ProgramTranslationSeed) {
  for (const locale of LOCALES) {
    await prisma.programVersionTranslation.upsert({
      where: {
        programVersionId_locale: {
          programVersionId,
          locale
        }
      },
      update: {
        title: getValue(translations.title, locale),
        description: getValue(translations.description, locale)
      },
      create: {
        programVersionId,
        locale,
        title: getValue(translations.title, locale),
        description: getValue(translations.description, locale)
      }
    });
  }
}

async function syncNodeTranslations(nodeId: string, translations: NodeTranslationSeed) {
  for (const locale of LOCALES) {
    await prisma.curriculumNodeTranslation.upsert({
      where: {
        nodeId_locale: {
          nodeId,
          locale
        }
      },
      update: {
        title: getValue(translations.title, locale),
        shortTitle: translations.shortTitle ? getValue(translations.shortTitle, locale) : null,
        summary: translations.summary ? getValue(translations.summary, locale) : null,
        objective: translations.objective ? getValue(translations.objective, locale) : null
      },
      create: {
        nodeId,
        locale,
        title: getValue(translations.title, locale),
        shortTitle: translations.shortTitle ? getValue(translations.shortTitle, locale) : null,
        summary: translations.summary ? getValue(translations.summary, locale) : null,
        objective: translations.objective ? getValue(translations.objective, locale) : null
      }
    });
  }
}

async function syncBlockTranslations(contentBlockId: string, block: BlockSeed) {
  for (const locale of LOCALES) {
    await prisma.contentBlockTranslation.upsert({
      where: {
        contentBlockId_locale: {
          contentBlockId,
          locale
        }
      },
      update: {
        title: block.title ? getValue(block.title, locale) : null,
        body: getValue(block.body, locale),
        movieTitle: block.movieTitle ? getValue(block.movieTitle, locale) : null,
        movieCue: block.movieCue ? getValue(block.movieCue, locale) : null
      },
      create: {
        contentBlockId,
        locale,
        title: block.title ? getValue(block.title, locale) : null,
        body: getValue(block.body, locale),
        movieTitle: block.movieTitle ? getValue(block.movieTitle, locale) : null,
        movieCue: block.movieCue ? getValue(block.movieCue, locale) : null
      }
    });
  }
}

async function syncExerciseTranslations(exerciseId: string, exercise: ExerciseSeed) {
  for (const locale of LOCALES) {
    await prisma.exerciseTranslation.upsert({
      where: {
        exerciseId_locale: {
          exerciseId,
          locale
        }
      },
      update: {
        prompt: getValue(exercise.prompt, locale),
        supportText: exercise.supportText ? getValue(exercise.supportText, locale) : null,
        correctRationale: getValue(exercise.correctRationale, locale),
        remediationNote: exercise.remediationNote ? getValue(exercise.remediationNote, locale) : null
      },
      create: {
        exerciseId,
        locale,
        prompt: getValue(exercise.prompt, locale),
        supportText: exercise.supportText ? getValue(exercise.supportText, locale) : null,
        correctRationale: getValue(exercise.correctRationale, locale),
        remediationNote: exercise.remediationNote ? getValue(exercise.remediationNote, locale) : null
      }
    });
  }
}

async function syncOptionTranslations(optionId: string, optionSeed: OptionSeed) {
  for (const locale of LOCALES) {
    await prisma.exerciseOptionTranslation.upsert({
      where: {
        optionId_locale: {
          optionId,
          locale
        }
      },
      update: {
        text: getValue(optionSeed.text, locale),
        optionFeedback: getValue(optionSeed.feedback, locale)
      },
      create: {
        optionId,
        locale,
        text: getValue(optionSeed.text, locale),
        optionFeedback: getValue(optionSeed.feedback, locale)
      }
    });
  }
}

async function upsertNode(input: {
  programVersionId: string;
  parentId?: string;
  kind: CurriculumNodeKind;
  code: string;
  slug: string;
  orderIndex: number;
  estimatedMinutes?: number;
  metadata?: Prisma.InputJsonValue;
  translations: NodeTranslationSeed;
}) {
  const node = await prisma.curriculumNode.upsert({
    where: {
      programVersionId_code: {
        programVersionId: input.programVersionId,
        code: input.code
      }
    },
    update: {
      parentId: input.parentId ?? null,
      kind: input.kind,
      slug: input.slug,
      orderIndex: input.orderIndex,
      estimatedMinutes: input.estimatedMinutes ?? null,
      isPublished: true,
      metadata: input.metadata ?? Prisma.DbNull
    },
    create: {
      programVersionId: input.programVersionId,
      parentId: input.parentId ?? null,
      kind: input.kind,
      code: input.code,
      slug: input.slug,
      orderIndex: input.orderIndex,
      estimatedMinutes: input.estimatedMinutes ?? null,
      isPublished: true,
      metadata: input.metadata ?? Prisma.DbNull
    }
  });

  await syncNodeTranslations(node.id, input.translations);

  return node;
}

async function syncLessonBlocks(lessonNodeId: string, blocks: BlockSeed[]) {
  const keepKeys: string[] = [];

  for (const [index, block] of blocks.entries()) {
    keepKeys.push(block.key);

    const contentBlock = await prisma.contentBlock.upsert({
      where: {
        nodeId_blockKey: {
          nodeId: lessonNodeId,
          blockKey: block.key
        }
      },
      update: {
        type: block.type,
        orderIndex: index + 1
      },
      create: {
        nodeId: lessonNodeId,
        type: block.type,
        orderIndex: index + 1,
        blockKey: block.key
      }
    });

    await syncBlockTranslations(contentBlock.id, block);
  }

  await prisma.contentBlock.deleteMany({
    where: {
      nodeId: lessonNodeId,
      blockKey: {
        notIn: keepKeys
      }
    }
  });
}

async function syncCheckpointExercises(checkpointNodeId: string, exerciseCodeValue: string, exerciseSeed: ExerciseSeed) {
  const adaptiveVariants = buildAdaptiveExerciseVariants(exerciseSeed);
  const keepExerciseCodes: string[] = [];

  for (const adaptiveVariant of adaptiveVariants) {
    const currentExerciseCode =
      adaptiveVariant.codeSuffix.length > 0 ? `${exerciseCodeValue}-${adaptiveVariant.codeSuffix}` : exerciseCodeValue;

    keepExerciseCodes.push(currentExerciseCode);

    const exercise = await prisma.exercise.upsert({
      where: {
        nodeId_code: {
          nodeId: checkpointNodeId,
          code: currentExerciseCode
        }
      },
      update: {
        orderIndex: adaptiveVariant.orderIndex,
        type: ExerciseType.SINGLE_CHOICE,
        estimatedSeconds: adaptiveVariant.estimatedSeconds,
        difficulty: adaptiveVariant.difficulty
      },
      create: {
        nodeId: checkpointNodeId,
        code: currentExerciseCode,
        orderIndex: adaptiveVariant.orderIndex,
        type: ExerciseType.SINGLE_CHOICE,
        estimatedSeconds: adaptiveVariant.estimatedSeconds,
        difficulty: adaptiveVariant.difficulty
      }
    });

    await syncExerciseTranslations(exercise.id, adaptiveVariant);

    const keepOptionKeys: string[] = [];

    for (const [index, optionSeed] of adaptiveVariant.options.entries()) {
      keepOptionKeys.push(optionSeed.key);

      const optionRecord = await prisma.exerciseOption.upsert({
        where: {
          exerciseId_optionKey: {
            exerciseId: exercise.id,
            optionKey: optionSeed.key
          }
        },
        update: {
          orderIndex: index + 1,
          isCorrect: optionSeed.isCorrect,
          misconceptionId: null
        },
        create: {
          exerciseId: exercise.id,
          optionKey: optionSeed.key,
          orderIndex: index + 1,
          isCorrect: optionSeed.isCorrect,
          misconceptionId: null
        }
      });

      await syncOptionTranslations(optionRecord.id, optionSeed);
    }

    await bestEffortDelete(`stale options for ${currentExerciseCode}`, async () => {
      await prisma.exerciseOption.deleteMany({
        where: {
          exerciseId: exercise.id,
          optionKey: {
            notIn: keepOptionKeys
          }
        }
      });
    });
  }

  await bestEffortDelete(`stale exercises for checkpoint ${checkpointNodeId}`, async () => {
    await prisma.exercise.deleteMany({
      where: {
        nodeId: checkpointNodeId,
        code: {
          notIn: keepExerciseCodes
        }
      }
    });
  });
}

async function bestEffortDelete(label: string, action: () => Promise<void>) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Skipped ${label}: ${message}`);
  }
}

async function main() {
  console.log("Seeding CISSP catalog...");

  const trainingProgram = await prisma.trainingProgram.upsert({
    where: { slug: programSeed.slug },
    update: {
      code: programSeed.code,
      family: programSeed.family,
      vendor: programSeed.vendor,
      defaultLocale: programSeed.defaultLocale,
      isActive: true
    },
    create: {
      slug: programSeed.slug,
      code: programSeed.code,
      family: programSeed.family,
      vendor: programSeed.vendor,
      defaultLocale: programSeed.defaultLocale,
      isActive: true
    }
  });

  const programVersion = await prisma.programVersion.upsert({
    where: {
      trainingProgramId_versionCode: {
        trainingProgramId: trainingProgram.id,
        versionCode: programSeed.versionCode
      }
    },
    update: {
      blueprintLabel: programSeed.blueprintLabel,
      sourceRef: programSeed.sourceRef,
      isActive: true
    },
    create: {
      trainingProgramId: trainingProgram.id,
      versionCode: programSeed.versionCode,
      blueprintLabel: programSeed.blueprintLabel,
      sourceRef: programSeed.sourceRef,
      isActive: true
    }
  });

  await prisma.programVersion.updateMany({
    where: {
      trainingProgramId: trainingProgram.id,
      id: {
        not: programVersion.id
      }
    },
    data: {
      isActive: false
    }
  });

  await syncProgramTranslations(programVersion.id, programSeed.translations);

  const seededDomainCodes: string[] = [];

  for (const [domainIndex, domain] of domains.entries()) {
    const domainNumber = domain.number;
    const domainNodeCode = domainCode(domainNumber);
    seededDomainCodes.push(domainNodeCode);

    const domainNode = await upsertNode({
      programVersionId: programVersion.id,
      kind: CurriculumNodeKind.DOMAIN,
      code: domainNodeCode,
      slug: domain.slug,
      orderIndex: domainIndex + 1,
      estimatedMinutes: domain.estimatedMinutes,
      metadata: {
        launchLessonCode: lessonCode(domainNumber, 1),
        launchCheckpointCode: checkpointCode(domainNumber, 1)
      },
      translations: {
        title: domain.title,
        shortTitle: t(`D${domainNumber}`, `D${domainNumber}`),
        summary: domain.summary,
        objective: domain.objective
      }
    });

    const moduleNode = await upsertNode({
      programVersionId: programVersion.id,
      parentId: domainNode.id,
      kind: CurriculumNodeKind.MODULE,
      code: moduleCode(domainNumber),
      slug: `${domain.slug}-core`,
      orderIndex: 1,
      estimatedMinutes: domain.estimatedMinutes,
      translations: moduleTranslationSeed(domain)
    });

    const lessonCodesToKeep: string[] = [];

    for (const [lessonIndex, lessonSeed] of domain.lessons.entries()) {
      const lessonNumber = lessonIndex + 1;
      const currentLessonCode = lessonCode(domainNumber, lessonNumber);
      const currentCheckpointCode = checkpointCode(domainNumber, lessonNumber);
      const currentExerciseCode = exerciseCode(domainNumber, lessonNumber);
      const lessonSlug = `${domain.slug}-${lessonSeed.slug}`;
      const checkpointSlug = `${lessonSlug}-checkpoint`;

      lessonCodesToKeep.push(currentLessonCode);

      const lessonNode = await upsertNode({
        programVersionId: programVersion.id,
        parentId: moduleNode.id,
        kind: CurriculumNodeKind.LESSON,
        code: currentLessonCode,
        slug: lessonSlug,
        orderIndex: lessonNumber,
        estimatedMinutes: lessonSeed.estimatedMinutes,
        translations: {
          title: lessonSeed.title,
          shortTitle: lessonSeed.title,
          summary: lessonSeed.summary,
          objective: lessonSeed.objective
        }
      });

      await syncLessonBlocks(lessonNode.id, buildLessonBlocks(lessonSeed));

      const checkpointNode = await upsertNode({
        programVersionId: programVersion.id,
        parentId: lessonNode.id,
        kind: CurriculumNodeKind.CHECKPOINT,
        code: currentCheckpointCode,
        slug: checkpointSlug,
        orderIndex: 1,
        estimatedMinutes: 4,
        translations: checkpointTranslationSeed(lessonSeed)
      });

      await syncCheckpointExercises(checkpointNode.id, currentExerciseCode, lessonSeed.exercise);

      await bestEffortDelete(`stale checkpoints under ${currentLessonCode}`, async () => {
        await prisma.curriculumNode.deleteMany({
          where: {
            parentId: lessonNode.id,
            kind: CurriculumNodeKind.CHECKPOINT,
            code: {
              notIn: [currentCheckpointCode]
            }
          }
        });
      });
    }

    await bestEffortDelete(`stale lessons under ${moduleCode(domainNumber)}`, async () => {
      await prisma.curriculumNode.deleteMany({
        where: {
          parentId: moduleNode.id,
          kind: CurriculumNodeKind.LESSON,
          code: {
            notIn: lessonCodesToKeep
          }
        }
      });
    });

    await bestEffortDelete(`stale modules under ${domainNodeCode}`, async () => {
      await prisma.curriculumNode.deleteMany({
        where: {
          parentId: domainNode.id,
          kind: CurriculumNodeKind.MODULE,
          code: {
            notIn: [moduleCode(domainNumber)]
          }
        }
      });
    });
  }

  await bestEffortDelete("stale CISSP domains", async () => {
    await prisma.curriculumNode.deleteMany({
      where: {
        programVersionId: programVersion.id,
        kind: CurriculumNodeKind.DOMAIN,
        code: {
          notIn: seededDomainCodes
        }
      }
    });
  });

  const totalLessons = domains.reduce((sum, domain) => sum + domain.lessons.length, 0);
  const totalCheckpoints = domains.reduce((sum, domain) => sum + domain.lessons.length, 0);
  const checkpointSummary = domains
    .map((domain) => `D${domain.number}:${domain.lessons.length}`)
    .join(", ");

  console.log(`Seeded ${domains.length} domains, ${totalLessons} lessons, and ${totalCheckpoints} checkpoints.`);
  console.log(`Checkpoints by domain: ${checkpointSummary}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
