import type { Locale } from "@/i18n/config";

type AppDictionary = {
  brand: string;
  brandTagline: string;
  localeLabel: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryAction: string;
    secondaryAction: string;
    caption: string;
    focusLabel: string;
    focusTitle: string;
    focusBody: string;
    metrics: Array<{
      label: string;
      value: string;
    }>;
    previewLabel: string;
    previewTitle: string;
    previewBody: string;
    systemLabel: string;
    systemTitle: string;
    systemBody: string;
  };
  domains: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
  };
  focusLoop: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{
      step: string;
      title: string;
      body: string;
    }>;
  };
  catalog: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
  };
  auth: {
    backLink: string;
    signInEyebrow: string;
    signInTitle: string;
    signInBody: string;
    signUpEyebrow: string;
    signUpTitle: string;
    signUpBody: string;
    emailLabel: string;
    passwordLabel: string;
    nameLabel: string;
    signInAction: string;
    signUpAction: string;
    signOutAction: string;
    noAccount: string;
    hasAccount: string;
    createAccount: string;
    returnToSignIn: string;
    registeredNotice: string;
    errors: Record<string, string>;
  };
  studyHub: {
    backLink: string;
    eyebrow: string;
    title: string;
    body: string;
    domainLabel: string;
    domainCountLabel: string;
    summaryLabel: string;
    programLabel: string;
    resumeEyebrow: string;
    resumeTitle: string;
    resumeAction: string;
    resumePaused: string;
    resumeActive: string;
    launchAction: string;
    continueAction: string;
    completedLabel: string;
    inProgressLabel: string;
    readyLabel: string;
    domainsEyebrow: string;
    domainsTitle: string;
    domainsBody: string;
    lastStepLabel: string;
  };
  studyLaunch: {
    backLink: string;
    eyebrow: string;
    title: string;
    objectiveLabel: string;
    lessonLabel: string;
    estimatedTimeLabel: string;
    keyAreasEyebrow: string;
    keyAreasTitle: string;
    keyAreasBody: string;
    keyAreaLabel: string;
    recommendedLabel: string;
    currentLabel: string;
    selectedLabel: string;
    launchAreaAction: string;
    startAction: string;
    resumeAction: string;
    startSupport: string;
  };
  studySession: {
    backLink: string;
    stepLabel: string;
    pauseAction: string;
    resumeAction: string;
    pausedEyebrow: string;
    pausedTitle: string;
    pausedBody: string;
    missionEyebrow: string;
    missionAction: string;
    missionSupport: string[];
    learnEyebrow: string;
    learnAction: string;
    cardCounter: string;
    prevCard: string;
    nextCard: string;
    allCardsRead: string;
    tryQuestionAction: string;
    movieCueLabel: string;
    listenCardAction: string;
    stopCardAudioAction: string;
    audioUnavailableLabel: string;
    questionEyebrow: string;
    questionCounter: string;
    questionAction: string;
    reviewEyebrow: string;
    reviewAction: string;
    nextQuestionAction: string;
    correctLabel: string;
    incorrectLabel: string;
    chosenAnswerLabel: string;
    correctAnswerLabel: string;
    rationaleLabel: string;
    misconceptionLabel: string;
    memoryCueLabel: string;
    nextReviewLabel: string;
    objectiveLabel: string;
    domainLabel: string;
    lessonLabel: string;
    aiExplainAction: string;
    aiExplainClose: string;
    aiExplainLoading: string;
    aiExplainError: string;
    aiQuestions: {
      daily_use: string;
      simple_explain: string;
      cissp_context: string;
      real_example: string;
      exam_tip: string;
    };
  };
};

const dictionaries: Record<Locale, AppDictionary> = {
  "pt-BR": {
    brand: "CISSP Focus Studio",
    brandTagline: "Aprendizado profundo para quem precisa de clareza e ritmo.",
    localeLabel: "Trocar idioma",
    hero: {
      eyebrow: "CISSP para TDHA, com profundidade e foco guiado",
      title: "Estude cada domínio sem perder o fio da meada.",
      body:
        "Uma base SaaS multilíngue para transformar CISSP em sessões curtas, profundas e fáceis de retomar, com visual Clay adaptado para menos ruído e mais tração cognitiva.",
      primaryAction: "Abrir fluxo de estudo",
      secondaryAction: "Explorar domínios",
      caption: "Stack moderna, tokens de design locais e estrutura pronta para evoluir para outros treinamentos.",
      focusLabel: "Sprint de foco",
      focusTitle: "Entenda, pratique, recupere e avance em 18 minutos.",
      focusBody:
        "Cada sessão apresenta um conceito central, um cenário aplicado, uma pergunta de fixação e um próximo passo claro para retomar depois sem fricção.",
      metrics: [
        { label: "domínios", value: "8" },
        { label: "idiomas iniciais", value: "2" },
        { label: "estados por sessão", value: "4" }
      ],
      previewLabel: "Tela de estudo",
      previewTitle: "Linear, respirável e sem excesso de opções.",
      previewBody:
        "O fluxo reduz distrações durante a prática ativa e mantém feedback visível o tempo todo.",
      systemLabel: "Arquitetura",
      systemTitle: "Catálogo reutilizável para CISSP agora e outras certificações depois.",
      systemBody:
        "O conteúdo, a progressão e os exercícios são estruturados para crescer sem reescrever o produto."
    },
    domains: {
      eyebrow: "Aprofundamento por domínio",
      title: "Cada bloco foi pensado para ir além de resumos rasos.",
      body:
        "A landing inicial já organiza o produto em torno de cobertura completa do CISSP, com espaço para exemplos trabalhados, checkpoints de maestria e revisão adaptativa.",
      items: [
        "Security and Risk Management",
        "Asset Security",
        "Security Architecture and Engineering",
        "Communication and Network Security",
        "Identity and Access Management",
        "Security Assessment and Testing",
        "Security Operations",
        "Software Development Security"
      ]
    },
    focusLoop: {
      eyebrow: "Loop de hiperfoco",
      title: "O produto tenta manter ritmo sem virar poluição visual.",
      body:
        "O design editorial fica mais contido nas telas de estudo. A progressão é curta, a ação principal é única e a retomada fica explícita.",
      items: [
        {
          step: "01",
          title: "Entrada imediata",
          body: "A sessão começa com missão clara, tempo curto e objetivo de domínio específico."
        },
        {
          step: "02",
          title: "Fixação ativa",
          body: "Toda explicação caminha rapidamente para exemplo aplicado e recuperação ativa."
        },
        {
          step: "03",
          title: "Retomada fácil",
          body: "Ao interromper, o aluno encontra exatamente onde voltar e o que fechar depois."
        }
      ]
    },
    catalog: {
      eyebrow: "Expansão futura",
      title: "A mesma base serve para outras trilhas e certificações.",
      body:
        "Conteúdo, exercícios, maestria e catálogo já nascem como módulos reaproveitáveis em um monolito modular simples de operar.",
      items: [
        "Programas de treinamento versionados por certificação",
        "Localização por idioma sem hardcode de copy",
        "Componentes de UI compartilhados entre marketing e estudo",
        "Auth, Prisma, retomada persistente e base pronta para produção"
      ]
    },
    auth: {
      backLink: "Voltar para a visão geral",
      signInEyebrow: "Entrar para retomar foco",
      signInTitle: "Entre e volte exatamente para o ponto onde parou.",
      signInBody:
        "A base agora salva progresso, corrige exercícios e reabre o checkpoint com contexto suficiente para reiniciar sem atrito.",
      signUpEyebrow: "Criar acesso",
      signUpTitle: "Crie sua conta e ative o fluxo real de estudo.",
      signUpBody:
        "Auth, sessão persistente e conteúdo estruturado para os 8 domínios do CISSP já entram conectados desde a primeira versão.",
      emailLabel: "Email",
      passwordLabel: "Senha",
      nameLabel: "Nome",
      signInAction: "Entrar",
      signUpAction: "Criar conta",
      signOutAction: "Sair",
      noAccount: "Novo por aqui?",
      hasAccount: "Já tem acesso?",
      createAccount: "Crie sua conta",
      returnToSignIn: "Voltar para login",
      registeredNotice: "Conta criada. Entre para abrir sua primeira sprint.",
      errors: {
        invalid_credentials: "Email ou senha inválidos.",
        email_in_use: "Já existe uma conta com este email.",
        invalid_input: "Preencha todos os campos com dados válidos.",
        invalid_locale: "Idioma inválido para este fluxo.",
        generic: "Não foi possível concluir a ação agora."
      }
    },
    studyHub: {
      backLink: "Voltar para a visão geral",
      eyebrow: "Seu estudo",
      title: "Escolha um domínio e continue de onde parou.",
      body:
        "Cada domínio abre uma sessão curta com progresso salvo, pergunta corrigida e retomada simples.",
      domainLabel: "Domínio",
      domainCountLabel: "domínios ativos",
      summaryLabel: "domínios concluídos",
      programLabel: "programa",
      resumeEyebrow: "Continuar",
      resumeTitle: "Sua sessão está pronta.",
      resumeAction: "Retomar sessão",
      resumePaused: "Você pausou no meio. O próximo passo continua salvo.",
      resumeActive: "Você já tem uma sessão ativa pronta para continuar.",
      launchAction: "Abrir domínio",
      continueAction: "Continuar domínio",
      completedLabel: "Concluído",
      inProgressLabel: "Em progresso",
      readyLabel: "Pronto",
      domainsEyebrow: "Cobertura CISSP",
      domainsTitle: "Os 8 domínios já têm um ponto claro para começar.",
      domainsBody:
        "Cada cartão abre uma lição com explicação, pergunta e correção.",
      lastStepLabel: "Último passo"
    },
    studyLaunch: {
      backLink: "Voltar para os domínios",
      eyebrow: "Antes de começar",
      title: "Próximo checkpoint",
      objectiveLabel: "Objetivo",
      lessonLabel: "Próxima lição",
      estimatedTimeLabel: "Tempo previsto",
      keyAreasEyebrow: "Navegação rápida",
      keyAreasTitle: "Escolha a área que você quer estudar agora.",
      keyAreasBody:
        "Cada card abre uma lição específica. Use isso para revisar só o ponto fraco.",
      keyAreaLabel: "Area-chave",
      recommendedLabel: "Próxima agora",
      currentLabel: "Sessão atual",
      selectedLabel: "Selecionada",
      launchAreaAction: "Ir para esta área",
      startAction: "Começar agora",
      resumeAction: "Continuar agora",
      startSupport: "Você faz um checkpoint por vez. Depois pode seguir para o próximo."
    },
    studySession: {
      backLink: "Voltar para os domínios",
      stepLabel: "Progresso do checkpoint",
      pauseAction: "Pausar aqui",
      resumeAction: "Retomar de onde parei",
      pausedEyebrow: "Retomar",
      pausedTitle: "Seu progresso está salvo.",
      pausedBody:
        "Quando você voltar, o sistema mantém o domínio, a etapa atual e a última resposta registrada.",
      missionEyebrow: "Objetivo",
      missionAction: "Começar",
      missionSupport: [
        "Uma meta clara por vez.",
        "Um exemplo realista para fixar a ideia.",
        "Uma pergunta corrigida antes de encerrar."
      ],
      learnEyebrow: "Aprender",
      learnAction: "Tentar pergunta",
      cardCounter: "Conceito {current} de {total}",
      prevCard: "Anterior",
      nextCard: "Próximo",
      allCardsRead: "Você terminou esta parte. Agora responda a pergunta.",
      tryQuestionAction: "Responder pergunta",
      movieCueLabel: "Âncora de memória",
      listenCardAction: "Ouvir",
      stopCardAudioAction: "Parar",
      audioUnavailableLabel: "Áudio indisponível neste navegador",
      questionEyebrow: "Pergunta",
      questionCounter: "Pergunta {current} de {total}",
      questionAction: "Ver resposta",
      reviewEyebrow: "Resposta",
      reviewAction: "Continuar",
      nextQuestionAction: "Próxima pergunta",
      correctLabel: "Correto",
      incorrectLabel: "Ainda não",
      chosenAnswerLabel: "Sua resposta",
      correctAnswerLabel: "Melhor resposta",
      rationaleLabel: "Por que esta é a melhor opção",
      misconceptionLabel: "O que ajustar",
      memoryCueLabel: "Pista de memória",
      nextReviewLabel: "Revisão sugerida",
      objectiveLabel: "Objetivo atual",
      domainLabel: "Domínio",
      lessonLabel: "Lição",
      aiExplainAction: "✦ Explicar melhor",
      aiExplainClose: "Fechar",
      aiExplainLoading: "Pensando...",
      aiExplainError: "Não foi possível obter resposta. Tente novamente.",
      aiQuestions: {
        daily_use: "Onde isso aparece no trabalho real?",
        simple_explain: "Explique isso com palavras simples.",
        cissp_context: "Por que isso cai no CISSP?",
        real_example: "Dê um exemplo de trabalho.",
        exam_tip: "O que preciso lembrar para a prova?"
      }
    }
  },
  en: {
    brand: "CISSP Focus Studio",
    brandTagline: "Deep learning for people who need clarity, pace, and recovery.",
    localeLabel: "Switch language",
    hero: {
      eyebrow: "CISSP for ADHD learners, with guided focus and real depth",
      title: "Study every domain without losing the thread.",
      body:
        "A multilingual SaaS foundation that turns CISSP into short, deep, easy-to-resume sessions, using a Clay-inspired system tuned for less noise and more cognitive traction.",
      primaryAction: "Open study flow",
      secondaryAction: "Explore domains",
      caption: "Modern stack, local design tokens, and a structure ready to grow into other training programs.",
      focusLabel: "Focus sprint",
      focusTitle: "Understand, practice, recover, and move forward in 18 minutes.",
      focusBody:
        "Each session presents one core concept, one applied scenario, one retention question, and one explicit next step so learners can come back without friction.",
      metrics: [
        { label: "domains", value: "8" },
        { label: "initial locales", value: "2" },
        { label: "session states", value: "4" }
      ],
      previewLabel: "Study screen",
      previewTitle: "Linear, breathable, and low on competing options.",
      previewBody:
        "The flow reduces distraction during active practice while keeping feedback visible at all times.",
      systemLabel: "Architecture",
      systemTitle: "Reusable catalog foundations for CISSP now and other certifications later.",
      systemBody:
        "Content, progression, and exercises are structured to scale without rewriting the product."
    },
    domains: {
      eyebrow: "Domain-level depth",
      title: "Every block is designed to go beyond shallow summaries.",
      body:
        "The initial landing page already frames the product around full CISSP coverage, with room for worked examples, mastery checkpoints, and adaptive review.",
      items: [
        "Security and Risk Management",
        "Asset Security",
        "Security Architecture and Engineering",
        "Communication and Network Security",
        "Identity and Access Management",
        "Security Assessment and Testing",
        "Security Operations",
        "Software Development Security"
      ]
    },
    focusLoop: {
      eyebrow: "Hyperfocus loop",
      title: "The product aims for momentum without turning into visual clutter.",
      body:
        "The editorial language becomes quieter in study views. Progress stays short, the primary action stays singular, and resume cues stay explicit.",
      items: [
        {
          step: "01",
          title: "Immediate start",
          body: "Each study sprint begins with one clear mission, a short time box, and one domain-specific objective."
        },
        {
          step: "02",
          title: "Active retention",
          body: "Every explanation moves quickly into an applied example and an active recall moment."
        },
        {
          step: "03",
          title: "Easy recovery",
          body: "If attention breaks, the learner sees exactly where to resume and what to close next."
        }
      ]
    },
    catalog: {
      eyebrow: "Future-ready catalog",
      title: "The same foundation can support new training programs later.",
      body:
        "Content, exercises, mastery, and catalog structure start as reusable modules inside a simple modular monolith.",
      items: [
        "Versioned training programs per certification",
        "Locale-aware content without hard-coded copy",
        "Shared UI components across marketing and study surfaces",
        "Auth, Prisma, persistent resume, and a clean path to production"
      ]
    },
    auth: {
      backLink: "Back to overview",
      signInEyebrow: "Sign in and recover focus",
      signInTitle: "Sign in and return to the exact checkpoint you left behind.",
      signInBody:
        "The platform now saves progress, corrects answers, and reopens the active checkpoint with enough context to restart quickly.",
      signUpEyebrow: "Create access",
      signUpTitle: "Create your account and unlock the real study flow.",
      signUpBody:
        "Auth, persistent sessions, and structured content for all 8 CISSP domains now ship as one connected foundation.",
      emailLabel: "Email",
      passwordLabel: "Password",
      nameLabel: "Name",
      signInAction: "Sign in",
      signUpAction: "Create account",
      signOutAction: "Sign out",
      noAccount: "New here?",
      hasAccount: "Already have access?",
      createAccount: "Create your account",
      returnToSignIn: "Return to sign in",
      registeredNotice: "Account created. Sign in to open your first sprint.",
      errors: {
        invalid_credentials: "Invalid email or password.",
        email_in_use: "An account with this email already exists.",
        invalid_input: "Fill every field with valid data.",
        invalid_locale: "Invalid locale for this flow.",
        generic: "The action could not be completed right now."
      }
    },
    studyHub: {
      backLink: "Back to overview",
      eyebrow: "Your study",
      title: "Pick a domain and continue where you stopped.",
      body:
        "Each domain opens a short session with saved progress, corrected answers, and an easy way to resume.",
      domainLabel: "Domain",
      domainCountLabel: "active domains",
      summaryLabel: "completed domains",
      programLabel: "program",
      resumeEyebrow: "Continue",
      resumeTitle: "Your session is ready.",
      resumeAction: "Resume session",
      resumePaused: "You paused in the middle. The next step is still saved.",
      resumeActive: "You already have an active session ready to continue.",
      launchAction: "Open domain",
      continueAction: "Continue domain",
      completedLabel: "Completed",
      inProgressLabel: "In progress",
      readyLabel: "Ready",
      domainsEyebrow: "CISSP coverage",
      domainsTitle: "All 8 domains now have a clear place to start.",
      domainsBody:
        "Every card opens a lesson with an explanation, one question, and feedback.",
      lastStepLabel: "Last step"
    },
    studyLaunch: {
      backLink: "Back to domains",
      eyebrow: "Before you start",
      title: "Next checkpoint",
      objectiveLabel: "Objective",
      lessonLabel: "Next lesson",
      estimatedTimeLabel: "Expected time",
      keyAreasEyebrow: "Quick navigation",
      keyAreasTitle: "Choose the area you want to study now.",
      keyAreasBody:
        "Each card opens one specific lesson. Use it to review only the weak point.",
      keyAreaLabel: "Key area",
      recommendedLabel: "Next up",
      currentLabel: "Current session",
      selectedLabel: "Selected",
      launchAreaAction: "Go to this area",
      startAction: "Start now",
      resumeAction: "Continue now",
      startSupport: "You study one checkpoint at a time. Then you can move to the next one."
    },
    studySession: {
      backLink: "Back to domains",
      stepLabel: "Checkpoint progress",
      pauseAction: "Pause here",
      resumeAction: "Resume where I left off",
      pausedEyebrow: "Resume",
      pausedTitle: "Your progress is saved.",
      pausedBody:
        "When you come back, the platform keeps the domain, the current step, and your last recorded answer.",
      missionEyebrow: "Goal",
      missionAction: "Start",
      missionSupport: [
        "One clear goal at a time.",
        "One realistic example to lock in the idea.",
        "One corrected question before you finish."
      ],
      learnEyebrow: "Learn",
      learnAction: "Try question",
      cardCounter: "Concept {current} of {total}",
      prevCard: "Previous",
      nextCard: "Next",
      allCardsRead: "You finished this part. Now answer the question.",
      tryQuestionAction: "Answer question",
      movieCueLabel: "Memory anchor",
      listenCardAction: "Listen",
      stopCardAudioAction: "Stop",
      audioUnavailableLabel: "Audio is unavailable in this browser",
      questionEyebrow: "Question",
      questionCounter: "Question {current} of {total}",
      questionAction: "See answer",
      reviewEyebrow: "Answer",
      reviewAction: "Continue",
      nextQuestionAction: "Next question",
      correctLabel: "Correct",
      incorrectLabel: "Not quite",
      chosenAnswerLabel: "Your answer",
      correctAnswerLabel: "Best answer",
      rationaleLabel: "Why this is the best option",
      misconceptionLabel: "What to adjust",
      memoryCueLabel: "Memory hint",
      nextReviewLabel: "Suggested review",
      objectiveLabel: "Current objective",
      domainLabel: "Domain",
      lessonLabel: "Lesson",
      aiExplainAction: "✦ Explain better",
      aiExplainClose: "Close",
      aiExplainLoading: "Thinking...",
      aiExplainError: "Could not get an answer. Try again.",
      aiQuestions: {
        daily_use: "Where does this show up in real work?",
        simple_explain: "Explain this in simple words.",
        cissp_context: "Why does this appear on the CISSP exam?",
        real_example: "Give me a real work example.",
        exam_tip: "What do I need to remember for the exam?"
      }
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
