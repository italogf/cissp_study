type Localized<T> = { en: T; "pt-BR": T };

type SeedHelpers = {
  t: <T>(en: T, ptBR: T) => Localized<T>;
  option: (key: string, isCorrect: boolean, text: Localized<string>, feedback: Localized<string>) => unknown;
  lesson: <T>(input: T) => T;
  introBlock: (body: Localized<string>, title?: Localized<string>) => unknown;
  conceptBlock: (key: string, title: Localized<string>, body: Localized<string>) => unknown;
  movieCueBlock: (
    movie: { title: Localized<string>; cue: Localized<string>; body: Localized<string> },
    title?: Localized<string>
  ) => unknown;
  keyPointsBlock: (body: Localized<string>, title?: Localized<string>) => unknown;
};

export function buildDeepDomainSeeds({
  t,
  option,
  lesson,
  introBlock,
  conceptBlock,
  movieCueBlock,
  keyPointsBlock
}: SeedHelpers) {
  return [
    {
      number: 2,
      slug: "asset-security",
      estimatedMinutes: 48,
      title: t("Asset Security", "Segurança de Ativos"),
      summary: t(
        "Learn how to classify, handle, keep, and destroy data with clear rules.",
        "Aprenda como classificar, manusear, guardar e destruir dados com regras claras."
      ),
      objective: t(
        "Practice the decisions that keep data controlled from collection to disposal.",
        "Pratique as decisões que mantêm os dados sob controle da coleta ao descarte."
      ),
      lessons: [
        lesson({
          slug: "classification-and-ownership-decisions",
          estimatedMinutes: 8,
          title: t("Classification and ownership decisions", "Decisões de classificação e propriedade"),
          summary: t(
            "Learn who labels sensitive data, who owns it, and who may approve access.",
            "Aprenda quem rotula dados sensíveis, quem é dono deles e quem pode aprovar o acesso."
          ),
          objective: t(
            "Explain classification, ownership, and formal approval before access is granted.",
            "Explique classificação, propriedade e aprovação formal antes de conceder acesso."
          ),
          blocks: [
            introBlock(
              t(
                "Asset security starts with clear decisions, not storage tools. First decide what is sensitive, who owns it, and why access is allowed. If those answers are vague, later controls will also be weak.",
                "A segurança de ativos começa com decisões claras, não com ferramentas de armazenamento. Primeiro defina o que é sensível, quem é o dono e por que o acesso é permitido. Se essas respostas forem vagas, os controles depois também serão fracos."
              )
            ),
            conceptBlock(
              "classification-by-consequence",
              t("Classify by impact, not habit", "Classifique por impacto, não por hábito"),
              t(
                "The label should match likely harm. Think about business damage, legal risk, privacy impact, and the effect of losing confidentiality, integrity, or availability. A label matters only if it changes how people handle the data.",
                "O rótulo deve combinar com o dano provável. Pense em dano ao negócio, risco legal, impacto na privacidade e no efeito de perder confidencialidade, integridade ou disponibilidade. Um rótulo só importa se muda a forma como as pessoas tratam o dado."
              )
            ),
            conceptBlock(
              "labels-same-problem",
              t("Different label sets solve the same problem", "Conjuntos de rótulos diferentes resolvem o mesmo problema"),
              t(
                "Some organizations use Public, Internal, Confidential, and Restricted. Others use government-style labels. The point is the same: stronger impact needs stronger protection.",
                "Algumas organizações usam Público, Interno, Confidencial e Restrito. Outras usam rótulos no estilo governamental. O ponto é o mesmo: impacto maior pede proteção mais forte."
              )
            ),
            conceptBlock(
              "ownership-roles",
              t("Ownership tells you who decides", "Propriedade mostra quem decide"),
              t(
                "The data owner decides classification, access, and retention. The system owner is accountable for the platform that stores or processes the data. Custodians run storage and protection tasks. Stewards help keep data quality and governance on track.",
                "O dono do dado decide classificação, acesso e retenção. O dono do sistema responde pela plataforma que armazena ou processa o dado. Custodians executam tarefas de armazenamento e proteção. Stewards ajudam a manter qualidade e governança em ordem."
              )
            ),
            conceptBlock(
              "formal-approval-and-clearance",
              t("Sensitive access needs approval and need to know", "Acesso sensível pede aprovação e need to know"),
              t(
                "Technical access alone is not enough. For sensitive data, the right owner should approve access. The user should have need to know and should understand the handling rules before access is granted.",
                "Acesso técnico sozinho não basta. Para dados sensíveis, o dono correto deve aprovar o acesso. O usuário deve ter need to know e entender as regras de manuseio antes de receber o acesso."
              )
            ),
            movieCueBlock({
              title: t("The Post", "The Post"),
              cue: t(
                "Think about how the same document became more dangerous depending on who held it, who could publish it, and what could happen next.",
                "Pense em como o mesmo documento ficou mais perigoso dependendo de quem o tinha, de quem podia publicá-lo e do que poderia acontecer depois."
              ),
              body: t(
                "Use that cue for classification and ownership: the same data needs different controls when impact, audience, and decision rights become clear.",
                "Use essa pista para classificação e propriedade: o mesmo dado precisa de controles diferentes quando impacto, público e direitos de decisão ficam claros."
              )
            }),
            keyPointsBlock(
              t(
                "Classify by impact. Name a clear owner. Approve sensitive access on purpose. Labels should change behavior, not just sit on a file.",
                "Classifique por impacto. Defina um dono claro. Aprove acesso sensível de forma deliberada. Rótulos devem mudar comportamento, não apenas ficar no arquivo."
              )
            )
          ],
          exercise: {
            prompt: t(
              "A department wants to give a contractor access to confidential client data because the manager trusts the contractor. What is the MOST important missing step?",
              "Um departamento quer dar a um contratado acesso a dados confidenciais de clientes porque o gerente confia nele. Qual é a etapa MAIS importante que esta faltando?"
            ),
            supportText: t(
              "Pick ownership and formal approval, not convenience.",
              "Escolha propriedade e aprovação formal, não conveniência."
            ),
            correctRationale: t(
              "Sensitive access needs approval from the right owner and must follow classification and need to know. Trust and skill alone are not enough.",
              "Acesso sensível precisa de aprovação do dono correto e deve seguir classificação e need to know. Confiança e habilidade, sozinhas, não bastam."
            ),
            remediationNote: t(
              "Technical competence helps, but it does not replace owner approval.",
              "Competencia técnica ajuda, mas não substitui a aprovação do dono."
            ),
            options: [
              option(
                "A",
                true,
                t("Obtain formal approval from the data owner based on classification and need to know", "Obter aprovação formal do dono do dado com base na classificação e no need to know"),
                t("Correct. The owner makes the access decision, and that decision should follow classification and need to know.", "Correto. O dono toma a decisão de acesso, e essa decisão deve seguir classificação e need to know.")
              ),
              option(
                "B",
                false,
                t("Grant access immediately because the manager already trusts the contractor", "Conceder acesso imediatamente porque o gerente já confia no contratado"),
                t("Not best. Trust does not replace the owner's formal decision.", "Não é a melhor. Confiança não substitui a decisão formal do dono.")
              ),
              option(
                "C",
                false,
                t("Let the contractor self-classify the data they need", "Permitir que o contratado classifique por conta própria os dados de que precisa"),
                t("Not best. Contractors do not set their own classification or ownership boundaries.", "Não é a melhor. Contratados não definem sozinhos classificação nem limites de propriedade.")
              )
            ]
          }
        }),
        lesson({
          slug: "handling-labeling-and-lifecycle-controls",
          estimatedMinutes: 8,
          title: t("Handling, labeling, and lifecycle controls", "Manuseio, rotulagem e controles de ciclo de vida"),
          summary: t(
            "Learn how labels change storage, sharing, printing, and transport.",
            "Aprenda como os rótulos mudam armazenamento, compartilhamento, impressão e transporte."
          ),
          objective: t(
            "Explain labeling versus marking and apply handling rules through the full lifecycle.",
            "Explique labeling versus marking e aplique regras de manuseio em todo o ciclo de vida."
          ),
          blocks: [
            introBlock(
              t(
                "A classification policy is not enough by itself. Asset security becomes real when the label changes where data may live, who may print it, how it moves, and how copies are tracked.",
                "Uma política de classificação não basta sozinha. A segurança de ativos fica real quando o rótulo muda onde o dado pode ficar, quem pode imprimi-lo, como ele se move e como as cópias são rastreadas."
              )
            ),
            conceptBlock(
              "labeling-vs-marking",
              t("Systems use labels; people use markings", "Sistemas usam labels; pessoas usam markings"),
              t(
                "Labeling stores security attributes in a machine-readable form so systems can enforce policy. Marking shows those same attributes in a human-readable form so people know how to handle paper, files, and exports.",
                "Labeling guarda atributos de segurança em formato legível por máquina para que sistemas apliquem a política. Marking mostra esses mesmos atributos em formato legível por pessoas para orientar papel, arquivos e exportações."
              )
            ),
            conceptBlock(
              "handling-follows-classification",
              t("Handling rules travel with the data", "As regras de manuseio viajam com o dado"),
              t(
                "Storage, transmission, printing, mailing, check-out, and desk behavior should change with sensitivity. If a confidential file goes to the wrong place, that is still an asset-security failure even if the disk was encrypted.",
                "Armazenamento, transmissão, impressão, envio, retirada e comportamento na mesa devem mudar com a sensibilidade. Se um arquivo confidencial vai para o lugar errado, isso continua sendo uma falha de segurança de ativos, mesmo com disco criptografado."
              )
            ),
            conceptBlock(
              "lifecycle-creates-copies",
              t("Lifecycle thinking keeps copies under control", "Pensar em ciclo de vida mantêm as cópias sob controle"),
              t(
                "Creation, use, sharing, archive, and disposal can all create new copies. Governance must follow exports, backups, offline media, and collaboration spaces, not just the main system of record.",
                "Criação, uso, compartilhamento, arquivamento e descarte podem criar novas cópias. A governança precisa acompanhar exportações, backups, mídias offline e espaços de colaboração, não apenas o sistema principal de registro."
              )
            ),
            conceptBlock(
              "movement-needs-accountability",
              t("Asset movement should leave a record", "A movimentação do ativo deve deixar registro"),
              t(
                "When media or sensitive records move, tracking matters. Check-in, check-out, custody, and proof of authorized handling show that policy stayed with the asset.",
                "Quando mídia ou registros sensíveis se movem, rastreamento importa. Registro de retirada e devolução, custódia e prova de manuseio autorizado mostram que a política ficou com o ativo."
              )
            ),
            movieCueBlock({
              title: t("Toy Story 2", "Toy Story 2"),
              cue: t(
                "Think about how ownership, storage location, and careless movement decided whether valuable items stayed protected or got lost.",
                "Pense em como propriedade, local de armazenamento e movimentação descuidada decidiram se itens valiosos ficaram protegidos ou se se perderam."
              ),
              body: t(
                "Use that cue for lifecycle controls: value stays protected only when each move follows the right handling rules.",
                "Use essa pista para controles de ciclo de vida: o valor só fica protegido quando cada movimento segue as regras certas de manuseio."
              )
            }),
            keyPointsBlock(
              t(
                "Labeling lets systems enforce policy. Marking guides people. Handling rules must follow the data through every copy, transfer, and archive step.",
                "Labeling permite que sistemas apliquem a política. Marking orienta pessoas. As regras de manuseio precisam acompanhar o dado ém cada cópia, transferência e etapa de arquivo."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which statement BEST distinguishes labeling from marking?",
              "Qual afirmação MELHOR distingue labeling de marking?"
            ),
            supportText: t(
              "Choose the option that separates system-readable enforcement from human-readable guidance.",
              "Escolha a opção que separa aplicação legível por sistema de orientação legível por pessoas."
            ),
            correctRationale: t(
              "Labeling stores security attributes in a form systems can process. Marking shows those attributes in a form people can read and follow.",
              "Labeling guarda atributos de segurança em uma forma que sistemas conseguem processar. Marking mostra esses atributos em uma forma que pessoas conseguem ler e seguir."
            ),
            remediationNote: t(
              "Both support classification, but one is for systems and the other is for people.",
              "Os dois apoiam a classificação, mas um e para sistemas e o outro e para pessoas."
            ),
            options: [
              option(
                "A",
                true,
                t("Labeling is machine-readable; marking is human-readable", "Labeling e legível por máquina; marking e legível por humanos"),
                t("Correct. That is the main difference the exam expects you to know.", "Correto. Essa é a principal diferença que a prova espera que você saiba.")
              ),
              option(
                "B",
                false,
                t("Labeling is only for paper files, while marking is only for databases", "Labeling e apenas para arquivos em papel, enquanto marking e apenas para bancos de dados"),
                t("Not best. The difference is not paper versus database. It is systems versus people.", "Não é a melhor. A diferença não é papel versus banco de dados. É sistemas versus pessoas.")
              ),
              option(
                "C",
                false,
                t("Labeling and marking are identical terms with no operational difference", "Labeling e marking são termos idênticos sem diferença operacional"),
                t("Not best. They support the same program, but they work in different ways.", "Não é a melhor. Eles apoiam o mesmo programa, mas funcionam de formas diferentes.")
              )
            ]
          }
        }),
        lesson({
          slug: "data-roles-collection-and-location",
          estimatedMinutes: 8,
          title: t("Data roles, collection, and location", "Papéis de dados, coleta e localização"),
          summary: t(
            "Learn who decides about personal data, what to collect, and where it may be stored.",
            "Aprenda quem decide sobre dados pessoais, o que coletar e onde eles podem ficar."
          ),
          objective: t(
            "Differentiate controller, processor, custódian, and DPO. Apply minimization and location rules.",
            "Diferencie controller, processor, custódian e DPO. Aplique regras de minimização e localização."
          ),
          blocks: [
            introBlock(
              t(
                "Privacy risk often starts before any breach. Teams create it when they collect too much data, copy it into the wrong region, or act as if a vendor is fully responsible once the data leaves.",
                "Risco de privacidade muitas vezes começa antes de qualquer vazamento. Equipes criam esse risco quando coletam dados demais, copiam para a regiao errada ou agem como se o fornecedor fosse totalmente responsável depois que o dado sai."
              )
            ),
            conceptBlock(
              "controller-and-processor",
              t("Controllers decide; processors follow instructions", "Controllers decidem; processors seguem instruções"),
              t(
                "The controller decides why and how personal data is processed. The processor handles the data for the controller and must stay within those instructions. This difference matters in privacy law and contracts.",
                "O controller decide por que e como dados pessoais serão processados. O processor trata os dados para o controller e deve ficar dentro dessas instruções. Essa diferença importa em leis e contratos de privacidade."
              )
            ),
            conceptBlock(
              "custódian-and-dpo",
              t("Custodians run protection; DPOs oversee privacy", "Custodians executam a proteção; DPOs supervisionam a privacidade"),
              t(
                "Custodians do daily protection work such as backup, storage, and recovery. A DPO helps oversee privacy compliance, advises the organization, and may work with regulators and leadership when required.",
                "Custodians fazem o trabalho diário de proteção, como backup, armazenamento e recuperação. Um DPO ajuda a supervisionar a conformidade de privacidade, orienta a organização e pode atuar com reguladores e liderança quando necessário."
              )
            ),
            conceptBlock(
              "minimization-at-collection",
              t("Do not collect data just because it may help later", "Não colete dados só porque eles podem ajudar depois"),
              t(
                "Collection limitation and data minimization ask whether the data is needed for a real purpose now. 'It may be useful later' is usually weak privacy design, not a good reason to collect more.",
                "Limitacao de coleta e minimização de dados perguntam se o dado é necessário para uma finalidade real agora. 'Pode ser útil depois' geralmente e design fraco de privacidade, não um bom motivo para coletar mais."
              )
            ),
            conceptBlock(
              "location-and-residency",
              t("Location still matters in the cloud", "Localização ainda importa na nuvem"),
              t(
                "Data location affects jurisdiction, regulatory duties, backup plans, and incident response. On-site, off-site, multi-region, and foreign-country storage each create different risks and obligations.",
                "A localização do dado afeta jurisdição, obrigações regulatórias, planos de backup e resposta a incidentes. Armazenamento on-site, off-site, multirregiao e em país estrangeiro cria riscos e obrigações diferentes."
              )
            ),
            movieCueBlock({
              title: t("Moneyball", "Moneyball"),
              cue: t(
                "Think about choosing only the information that improves the decision instead of bringing every possible statistic into the room.",
                "Pense em escolher apenas a informação que melhora a decisão, em vez de trazer toda estatística possível para a sala."
              ),
              body: t(
                "Use that cue for minimization: good privacy engineering asks for the least identifying data that still lets the work succeed.",
                "Use essa pista para minimização: boa engenharia de privacidade pede o menor conjunto de dados identificaveis que ainda deixa o trabalho funcionar."
              )
            }),
            keyPointsBlock(
              t(
                "Controllers decide purpose. Processors follow instructions. Custodians protect daily operations. Collect only what is justified, and keep location and residency under governance.",
                "Controllers decidem a finalidade. Processors seguem instruções. Custodians protegem a operação diária. Colete apenas o que e justificado e mantenha localização e residência sob governança."
              )
            )
          ],
          exercise: {
            prompt: t(
              "A payroll provider processes employee salary records on behalf of your company under your instructions. In privacy terms, what is that provider?",
              "Um provedor de folha de pagamento processa registros salariais de funcionários em nome da sua empresa seguindo suas instruções. Em termos de privacidade, o que esse provedor e?"
            ),
            supportText: t(
              "Choose the role that acts for the entity that decides purpose and means.",
              "Escolha o papel que atua para a entidade que decide finalidade e meios."
            ),
            correctRationale: t(
              "A processor handles personal data on behalf of a controller. The controller still decides why and how the data should be processed.",
              "Um processor trata dados pessoais em nome de um controller. O controller continua decidindo por que e como os dados devem ser processados."
            ),
            remediationNote: t(
              "The provider may host and protect systems, but in this scenario its privacy-law role is still processor.",
              "O provedor pode hospedar e proteger sistemas, mas nesse cenario seu papel na lei de privacidade continua sendo processor."
            ),
            options: [
              option(
                "A",
                true,
                t("Data processor", "Data processor"),
                t("Correct. It processes the data for the controller.", "Correto. Ele processa os dados para o controller.")
              ),
              option(
                "B",
                false,
                t("Data owner", "Dono do dado"),
                t("Not best. Data owner is an internal accountability role, not the privacy-law role described here.", "Não é a melhor. Dono do dado é um papel interno de responsabilidade, não o papel de privacidade descrito aqui.")
              ),
              option(
                "C",
                false,
                t("Data protection officer", "Data protection officer"),
                t("Not best. A DPO oversees privacy governance, not daily processing under instruction.", "Não é a melhor. Um DPO supervisiona a governança de privacidade, não o processamento diário sob instrução."
                )
              )
            ]
          }
        }),
        lesson({
          slug: "retention-remanence-and-destruction",
          estimatedMinutes: 8,
          title: t("Retention, remanence, and destruction", "Retenção, remanência e destruição"),
          summary: t(
            "Learn how long to keep data and how to destroy it so it cannot come back.",
            "Aprenda por quanto tempo guardar dados e como destruí-los para que não voltem."
          ),
          objective: t(
            "Match retention, legal hold, remanence, and sanitization to the right media and risk.",
            "Relacione retenção, legal hold, remanência e sanitização a mídia e ao risco corretos."
          ),
          blocks: [
            introBlock(
              t(
                "Organizations often talk about keeping data for compliance. The harder discipline is destroying it when the reason to keep it is over. Retention without disposal leaves old data exposed.",
                "Organizações muitas vezes falam em guardar dados por compliance. A parte mais dificil e destruí-los quando termina o motivo para guardá-los. Retenção sem descarte deixa dados antigos expostos."
              )
            ),
            conceptBlock(
              "retention-schedules",
              t("Retention schedules are legal and business commitments", "Tabelas de retenção são compromissos legais e de negócio"),
              t(
                "Retention depends on regulation, contracts, legal discovery needs, privacy duties, and operational value. A legal hold pauses normal destruction. Without that hold, data should not outlive its justified purpose.",
                "A retenção depende de regulação, contratos, necessidades de discovery jurídico, deveres de privacidade e valor operacional. Um legal hold pausa a destruição normal. Sem esse hold, o dado não deve viver além da finalidade justificada."
              )
            ),
            conceptBlock(
              "remanence-is-real",
              t("Delete is not the same as destroy", "Excluir não é o mesmo que destruir"),
              t(
                "Data remanence is what stays behind after a normal delete or reformat. Slack space, unallocated space, and storage behavior can leave sensitive content recoverable long after users think it is gone.",
                "Remanência de dados e o que fica para tras depois de um delete normal ou dé uma reformatação. Slack space, espaço não alocado e o comportamento da mídia podem deixar conteúdo sensível recuperável muito depois de usuários acharem que ele sumiu."
              )
            ),
            conceptBlock(
              "choose-the-right-sanitization",
              t("Clearing, purging, destruction, and crypto erase are different tools", "Clearing, purging, destruição e crypto erase são ferramentas diferentes"),
              t(
                "Clearing protects against ordinary software recovery. Purging aims to resist stronger recovery attempts. Destruction physically ruins the media. Cryptographic erase destroys the keys that make encrypted data readable.",
                "Clearing protege contra recuperação comum por software. Purging busca resistir a tentativas de recuperação mais fortes. Destruição arruina fisicamente a mídia. Crypto erase destroi as chaves que tornam dados criptografados legíveis."
              )
            ),
            conceptBlock(
              "media-matters",
              t("The media type decides what works", "O tipo de mídia decide o que funciona"),
              t(
                "Degaussing helps magnetic media, but not SSDs or optical media. SSDs often need crypto erase or physical destruction. Cloud storage usually depends on strong encryption and key destruction because you do not control the physical media.",
                "Degaussing ajuda em mídia magnética, mas não ém SSDs nem em mídia ótica. SSDs muitas vezes precisam de crypto erase ou destruição física. Armazenamento em nuvem normalmente depende de criptografia forte e destruição de chaves porque você não controla a mídia física."
              )
            ),
            movieCueBlock({
              title: t("WALL-E", "WALL-E"),
              cue: t(
                "Think about the constant sorting decision: what should be kept, what should be compacted, and what should disappear for good.",
                "Pense na decisão constante de triagem: o que deve ser guardado, o que deve ser compactado e o que deve desaparecer de vez."
              ),
              body: t(
                "Use that cue for retention and destruction: keep data only while there is a reason, then remove it with the right level of certainty.",
                "Use essa pista para retenção e destruição: mantenha o dado apenas enquanto houver motivo, depois remova com o nível certo de certeza."
              )
            }),
            keyPointsBlock(
              t(
                "Retention should be intentional. Deletes leave remanence. Sanitization strength must match the media and the sensitivity of what you are retiring.",
                "A retenção deve ser intencional. Deletes deixam remanência. A força da sanitização deve combinar com a mídia e com a sensibilidade do que você está aposentando."
              )
            )
          ],
          exercise: {
            prompt: t(
              "An organization stores sensitive cloud backups in encrypted form and wants the fastest defensible way to retire them. What is the BEST approach?",
              "Uma organização armazena backups sensíveis na nuvem de forma criptografada e quer a maneira defensável mais rápida de aposentá-los. Qual é a MELHOR abordagem?"
            ),
            supportText: t(
              "Choose the option that fits encrypted storage in the cloud.",
              "Escolha a opção que melhor se encaixa em armazenamento criptografado na nuvem."
            ),
            correctRationale: t(
              "Cryptographic erase is often the best fit for encrypted cloud data because destroying the keys makes the protected data unusable without physical access to the provider's storage.",
              "Crypto erase muitas vezes e a melhor opção para dados criptografados na nuvem porque destruir as chaves torna o conteúdo inutilizavel sem acesso físico ao armazenamento do provedor."
            ),
            remediationNote: t(
              "Physical destruction can fit local media, but it is not the control you normally perform directly in cloud infrastructure.",
              "Destruição física pode servir para mídia local, mas não é o controle que você normalmente executa direto em infraestrutura de nuvem."
            ),
            options: [
              option(
                "A",
                true,
                t("Destroy the encryption keys used to protect the backups", "Destruir as chaves de criptografia usadas para proteger os backups"),
                t("Correct. That is the core idea of cryptographic erasure.", "Correto. Essa é a ideia central do apagamento criptográfico.")
              ),
              option(
                "B",
                false,
                t("Delete the backup files through the normal cloud console", "Excluir os arquivos de backup pelo console normal da nuvem"),
                t("Not best. A normal delete does not give the same assurance against remanence or provider-level recovery paths.", "Não é a melhor. Um delete normal não da a mesma garantia contra remanência ou caminhos de recuperação no nível do provedor.")
              ),
              option(
                "C",
                false,
                t("Run degaussing against the provider's storage systems", "Executar degaussing contra os sistemas de armazenamento do provedor"),
                t("Not best. You do not physically control the provider media, and degaussing is not the normal answer for encrypted cloud data.", "Não é a melhor. Você não controla fisicamente a mídia do provedor, e degaussing não é a resposta normal para dados criptografados na nuvem.")
              )
            ]
          }
        }),
        lesson({
          slug: "asset-inventory-provisioning-and-retention",
          estimatedMinutes: 8,
          title: t("Asset inventory, provisioning, and retention readiness", "Inventário de ativos, provisionamento e prontidão de retenção"),
          summary: t(
            "Learn why inventory, support status, and restore readiness are part of asset security.",
            "Aprenda por que inventário, status de suporte e prontidão para restaurar fazem parte da segurança de ativos."
          ),
          objective: t(
            "Track physical and intangible assets through provisioning, use, support end, and retention.",
            "Acompanhe ativos físicos e intangíveis no provisionamento, no uso, no fim do suporte e na retenção."
          ),
          blocks: [
            introBlock(
              t(
                "Inventory is not paperwork for its own sake. It tells the organization what exists, who uses it, whether it is supported, and whether stored information can be safely restored.",
                "Inventário não é papelada por si só. Ele mostra para a organização o que existe, quem usa, se ainda tem suporte e se a informação guardada pode ser restaurada com segurança."
              )
            ),
            conceptBlock(
              "tangible-and-intangible",
              t("Asset inventory includes more than hardware", "Inventário de ativos inclui mais do que hardware"),
              t(
                "Tangible assets include servers, laptops, media, and documents. Intangible assets include software, licenses, patents, brand reputation, and intellectual property. All of them need ownership and tracking.",
                "Ativos tangíveis incluem servidores, laptops, mídias e documentos. Ativos intangíveis incluem software, licenças, patentes, reputação da marca e propriedade intelectual. Todos precisam de dono e rastreamento."
              )
            ),
            conceptBlock(
              "secure-provisioning",
              t("Provisioning should start in a secure state", "Provisionamento deve começar em estado seguro"),
              t(
                "Provisioning is not only handing out equipment. It also means naming the right owner, applying the right baseline, and granting access with need to know and least privilege from day one.",
                "Provisionamento não é apenas entregar equipamento. Também significa definir o dono correto, aplicar o baseline certo e conceder acesso com need to know e least privilege desde o primeiro dia."
              )
            ),
            conceptBlock(
              "license-and-support-tracking",
              t("Support status changes the asset risk", "Status de suporte muda o risco do ativo"),
              t(
                "End of life and end of support create a security problem because unsupported systems still process real data but no longer receive the fixes and assurance that normal operations depend on.",
                "Fim de vida e fim de suporte criam um problema de segurança porque sistemas sem suporte continuam processando dados reais, mas não recebem mais correções nem garantias das quais a operação normal depende."
              )
            ),
            conceptBlock(
              "retention-needs-restorability",
              t("Retention means little without restorability", "Retenção vale pouco sem restaurabilidade"),
              t(
                "Keeping data for seven years means little if no one can still read the media, run the application, or understand the format. Hardware, software, and staff knowledge all affect whether retention is real or only theoretical.",
                "Guardar dados por sete anos vale pouco se ninguém mais consegue ler a mídia, executar a aplicação ou entender o formato. Hardware, software e conhecimento da equipe afetam se a retenção e real ou só teórica."
              )
            ),
            movieCueBlock({
              title: t("The Martian", "Perdido em Marte"),
              cue: t(
                "Think about how survival depended on knowing exactly which resources existed, what still worked, and what could be reused safely.",
                "Pense em como a sobrevivencia dependia de saber exatamente quais recursos existiam, o que ainda funcionava e o que podia ser reutilizado com segurança."
              ),
              body: t(
                "Use that cue for asset inventory: resilience depends on knowing your assets, their support status, and whether they can be restored.",
                "Use essa pista para inventário de ativos: resiliência depende de conhecer os ativos, o status de suporte deles e se podem ser restaurados."
              )
            }),
            keyPointsBlock(
              t(
                "Inventory physical and intangible assets. Provision securely from day one. Track EOL and EOS. Retention counts only if the organization can still restore and use the data.",
                "Inventarie ativos físicos e intangíveis. Provisione com segurança desde o primeiro dia. Rastreie EOL e EOS. A retenção só conta se a organização ainda puder restaurar e usar os dados."
              )
            )
          ],
          exercise: {
            prompt: t(
              "A company keeps archived records for regulatory reasons, but the only software able to read the archive format is now out of support and no one tested restore in years. What is the PRIMARY asset-security concern?",
              "Uma empresa mantêm registros arquivados por exigencia regulatória, mas o único software capaz de ler o formato do arquivo esta fora de suporte e ninguém testa restauração ha anos. Qual é a preocupacao PRIMARIA de segurança de ativos?"
            ),
            supportText: t(
              "Focus on the difference between storing data and being able to use it when needed.",
              "Concentre-se na diferença entre armazenar dados e conseguir usá-los quando preciso."
            ),
            correctRationale: t(
              "Retention requirements are not really met if the organization cannot restore and use the retained data when needed. Unsupported software and untested restore make the retention program unreliable.",
              "Os requisitos de retenção não são realmente atendidos se a organização não consegue restaurar e usar os dados retidos quando necessário. Software sem suporte e restauração não testada tornam o programa de retenção pouco confiável."
            ),
            remediationNote: t(
              "Keeping copies is not enough. Asset security also includes the systems, media, and people needed to recover the information.",
              "Manter cópias não basta. Segurança de ativos também inclui sistemas, mídias e pessoas necessários para recuperar a informação."
            ),
            options: [
              option(
                "A",
                true,
                t("The archives may not be restorable when the business or regulator actually needs them", "Os arquivos podem não ser restauraveis quando o negócio ou o regulador realmente precisar deles"),
                t("Correct. Data that is kept but cannot be restored does not meet the real goal of retention.", "Correto. Dado guardado, mas impossível de restaurar, não atende ao objetivo real da retenção.")
              ),
              option(
                "B",
                false,
                t("The issue is only software licensing cost", "O problema é apenas custo de licenciamento do software"),
                t("Not best. Cost matters, but the main security issue is not being able to restore and use the retained data.", "Não é a melhor. Custo importa, mas o principal problema de segurança é não conseguir restaurar e usar os dados retidos."
                )
              ),
              option(
                "C",
                false,
                t("The archive should be deleted because unsupported software is never allowed", "O arquivo deve ser excluido porque software sem suporte nunca e permitido"),
                t("Not best. The practical issue is to migrate or preserve restorability, not automatically destroy required records.", "Não é a melhor. O problema prático e migrar ou preservar a restaurabilidade, não destruir automaticamente registros obrigatorios.")
              )
            ]
          }
        }),
        lesson({
          slug: "data-states-and-protection-methods",
          estimatedMinutes: 8,
          title: t("Data states and protection methods", "Estados dos dados e métodos de proteção"),
          summary: t(
            "Learn which controls fit data at rest, in transit, and in use.",
            "Aprenda quais controles se encaixam em dados em repouso, em trânsito e em uso."
          ),
          objective: t(
            "Match controls to data state and explain DLP, DRM, CASB, tokenization, pseudonymization, and anonymization.",
            "Relacione controles ao estado do dado é explique DLP, DRM, CASB, tokenização, pseudonimização e anonimização."
          ),
          blocks: [
            introBlock(
              t(
                "Asset programs fail when they use one answer for every kind of data exposure. Start by asking whether the data is at rest, moving, or in use. Then choose the control that fits that state.",
                "Programas de ativos falham quando usam uma única resposta para todo tipo de exposição de dados. Comece perguntando se o dado ésta em repouso, em movimento ou em uso. Depois escolha o controle que se encaixa nesse estado."
              )
            ),
            conceptBlock(
              "data-state-differences",
              t("Each state changes the attack surface", "Cada estado muda a superfície de ataque"),
              t(
                "Data at rest needs strong storage protection such as volume or file encryption. Data in transit needs protected channels like TLS or IPsec. Data in use is harder because applications and memory must handle the live information.",
                "Dados em repouso precisam de forte proteção de armazenamento, como criptografia de volume ou de arquivo. Dados em trânsito precisam de canais protegidos, como TLS ou IPsec. Dados em uso são mais difíceis porque aplicações e memória precisam lidar com a informação ativa."
              )
            ),
            conceptBlock(
              "scoping-and-tailoring",
              t("Baselines are starting points, not blind checklists", "Baselines são pontos de partida, não checklists cegos"),
              t(
                "A baseline is a starting set of controls. Scoping and tailoring adjust it to the real mission, platform, and risk profile. That helps organizations avoid too much control and dangerous gaps.",
                "Um baseline é um conjunto inicial de controles. Scoping e tailoring ajustam esse conjunto para a missão, a plataforma e o perfil de risco reais. Isso ajuda a evitar controle demais e lacunas perigosas."
              )
            ),
            conceptBlock(
              "protection-methods",
              t("DLP, DRM, and CASB protect different moments", "DLP, DRM e CASB protegem momentos diferentes"),
              t(
                "DLP looks for sensitive data movement and can block exfiltration. DRM governs what authorized recipients can do with content after they receive it. CASB adds visibility, policy enforcement, threat detection, and compliance control around cloud data and services.",
                "DLP procura movimento de dados sensíveis e pode bloquear exfiltração. DRM governa o que destinatários autorizados podem fazer com o conteúdo depois de recebê-lo. CASB adiciona visibilidade, aplicação de política, detecção de ameaças e controle de compliance em torno de dados e serviços em nuvem."
              )
            ),
            conceptBlock(
              "identity-reduction-techniques",
              t("Not every privacy technique can be reversed", "Nem toda técnica de privacidade pode ser revertida"),
              t(
                "Tokenization and pseudonymization replace identifiers but can be reversed with the right mapping or key. Anonymization aims to make reidentification impractical or impossible. The need to reverse the data later helps decide which tool fits.",
                "Tokenização e pseudonimização substituem identificadores, mas podem ser revertidas com o mapa ou a chave corretos. Anonimização busca tornar a reidentificação impráticavel ou impossível. A necessidade de reverter o dado depois ajuda a decidir qual ferramenta se encaixa."
              )
            ),
            movieCueBlock({
              title: t("Minority Report", "Minority Report"),
              cue: t(
                "Think about the constant tension between visibility, personalization, and controlling where sensitive identity data flows.",
                "Pense na tensão constante entre visibilidade, personalização e controle sobre para onde dados sensíveis de identidade fluem."
              ),
              body: t(
                "Use that cue for cloud and privacy controls: visibility without policy is not enough, and the data state changes which control works best.",
                "Use essa pista para controles de nuvem e privacidade: visibilidade sem política não basta, e o estado do dado muda qual controle funciona melhor."
              )
            }),
            keyPointsBlock(
              t(
                "Match controls to data state. Tailor baselines to the mission. DLP governs movement, DRM governs use after delivery, and CASB governs cloud visibility and policy enforcement.",
                "Ajuste controles ao estado do dado. Adapte baselines a missão. DLP governa o movimento, DRM governa o uso após a entrega e CASB governa visibilidade e aplicação de política na nuvem."
              )
            )
          ],
          exercise: {
            prompt: t(
              "An organization wants better visibility and policy enforcement over employee use of SaaS applications and cloud-stored data. Which control BEST fits?",
              "Uma organização quer melhor visibilidade e aplicação de política sobre o uso de aplicações SaaS e dados armazenados em nuvem pelos funcionários. Qual controle se encaixa MELHOR?"
            ),
            supportText: t(
              "Choose the cloud-focused control, not the one limited to content rights or simple exfiltration checks.",
              "Escolha o controle focado em nuvem, não o que fica limitado a direitos de conteúdo ou a simples checagem de exfiltração."
            ),
            correctRationale: t(
              "A CASB is designed to sit between users and cloud services and provide visibility, policy enforcement, data security, threat detection, and compliance support.",
              "Um CASB foi feito para ficar entre usuários e serviços em nuvem e oferecer visibilidade, aplicação de política, segurança de dados, detecção de ameaças e suporte a compliance."
            ),
            remediationNote: t(
              "DLP and DRM solve narrower problems, but this question asks for cloud-service visibility and governance as a whole.",
              "DLP e DRM resolvem problemas mais estreitos, mas esta pergunta pede visibilidade e governança de serviços em nuvem como um todo."
            ),
            options: [
              option(
                "A",
                true,
                t("Cloud Access Security Broker (CASB)", "Cloud Access Security Broker (CASB)"),
                t("Correct. CASB is built for cloud visibility and policy enforcement.", "Correto. CASB foi construído para visibilidade e aplicação de política na nuvem.")
              ),
              option(
                "B",
                false,
                t("Digital rights management (DRM)", "Gerenciamento de direitos digitais (DRM)"),
                t("Not best. DRM controls what recipients do with content after receiving it, but it does not broadly govern SaaS use.", "Não é a melhor. DRM controla o que destinatários fazem com o conteúdo depois de recebê-lo, mas não governa de forma ampla o uso de SaaS.")
              ),
              option(
                "C",
                false,
                t("File hashing at upload time", "Hash de arquivos no momento do upload"),
                t("Not best. Hashing can support integrity, but it does not provide cloud visibility or policy enforcement.", "Não é a melhor. Hash pode apoiar integridade, mas não fornece visibilidade nem aplicação de política na nuvem.")
              )
            ]
          }
        })
      ]
    },
    {
      number: 3,
      slug: "security-architecture-and-engineering",
      estimatedMinutes: 64,
      title: t("Security Architecture and Engineering", "Arquitetura e Engenharia de Segurança"),
      summary: t(
        "Learn how design, trust anchors, facilities, and cryptography shape real security.",
        "Aprenda como design, âncoras de confiança, instalações e criptografia moldam a segurança real."
      ),
      objective: t(
        "Understand the design, trust, crypto, and lifecycle choices that keep systems secure.",
        "Entenda as escolhas de design, confiança, criptografia e ciclo de vida que mantêm sistemas seguros."
      ),
      lessons: [
        lesson({
          slug: "secure-design-principles-and-threat-modeling",
          estimatedMinutes: 8,
          title: t("Secure design principles and threat modeling", "Princípios de design seguro e modelagem de ameaças"),
          summary: t(
            "Learn how secure design reduces damage before code goes live.",
            "Aprenda como design seguro reduz dano antes de o código entrar em produção."
          ),
          objective: t(
            "Apply least privilege, defense in depth, zero trust, and threat modeling to architecture choices.",
            "Aplique least privilege, defesa em profundidade, zero trust e modelagem de ameaças a escolhas de arquitetura."
          ),
          blocks: [
            introBlock(
              t(
                "Security architecture makes trust decisions explicit. If teams delay those decisions, operations inherits fragile systems that need constant patching and monitoring just to survive.",
                "Arquitetura de segurança torna explícitas as decisões de confiança. Se as equipes adiam essas decisões, a operação herda sistemas frágeis que precisam de patching e monitoramento constantes só para sobreviver."
              )
            ),
            conceptBlock(
              "principles-as-constraints",
              t("Secure design principles limit the blast radius", "Princípios de design seguro limitam o raio de impacto"),
              t(
                "Least privilege, separation of duties, defense in depth, secure defaults, and fail securely reduce how much damage one mistake can cause. They are design habits, not slogans.",
                "Least privilege, segregacao de funções, defesa em profundidade, padrões seguros e fail securely reduzem quanto dano um erro pode causar. São hábitos de design, não slogans."
              )
            ),
            conceptBlock(
              "zero-trust-and-shared-responsibility",
              t("Zero trust changes the starting assumption", "Zero trust muda a suposicao inicial"),
              t(
                "Zero trust assumes no user, device, or network location should be trusted automatically. Shared responsibility reminds you that security duties are split across users, administrators, vendors, and cloud providers.",
                "Zero trust assume que nenhum usuário, dispositivo ou local de rede deve ser confiável automaticamente. Shared responsibility lembra que deveres de segurança são divididos entre usuários, administradores, fornecedores e provedores de nuvem."
              )
            ),
            conceptBlock(
              "threat-modeling-methods",
              t("Threat modeling makes risk visible early", "Threat modeling torna o risco visível cedo"),
              t(
                "Methods such as STRIDE, DREAD, OCTAVE, and Trike force teams to name assets, entry points, likely abuse paths, and practical mitigations before production.",
                "Métodos como STRIDE, DREAD, OCTAVE e Trike forçam equipes a nomear ativos, pontos de entrada, caminhos prováveis de abuso e mitigações práticas antes da produção."
              )
            ),
            conceptBlock(
              "privacy-by-design",
              t("Privacy by design is built into the system", "Privacy by design e construída no sistema"),
              t(
                "Privacy by design puts minimization, visibility, retention limits, and safer defaults into the product itself. It works best in requirements and architecture, not as paperwork added after launch.",
                "Privacy by design coloca minimização, visibilidade, limites de retenção e padrões mais seguros no próprio produto. Ela funciona melhor em requisitos e arquitetura, não como papelada adicionada depois do lançamento."
              )
            ),
            movieCueBlock({
              title: t("Ocean's Eleven", "Onze Homens e um Segredo"),
              cue: t(
                "Think about how the vault was not protected by one control. It relied on layers, separated roles, and tightly controlled paths.",
                "Pense em como o cofre não éra protegido por um único controle. Ele dependia de camadas, papéis separados e caminhos rigidamente controlados."
              ),
              body: t(
                "Use that cue for secure design: strong architecture makes attackers cross several independent barriers instead of trusting one perfect wall.",
                "Use essa pista para design seguro: uma arquitetura forte faz o atacante cruzar varias barreiras independentes em vez de confiar em um muro perfeito."
              )
            }),
            keyPointsBlock(
              t(
                "Use secure defaults, least privilege, and defense in depth. Model threats early. Treat privacy and zero trust as design choices, not late compliance work.",
                "Use padrões seguros, least privilege e defesa em profundidade. Modele ameaças cedo. Trate privacidade e zero trust como escolhas de design, não como trabalho tardio de compliance."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which action BEST demonstrates the principle of secure defaults?",
              "Qual ação demonstra MELHOR o princípio de secure defaults?"
            ),
            supportText: t(
              "Choose the option where the product starts in the safest practical state.",
              "Escolha a opção em que o produto começa no estado prático mais seguro."
            ),
            correctRationale: t(
              "Secure defaults mean the system starts with the safest practical configuration enabled. It should not rely on users to harden it later.",
              "Secure defaults significam que o sistema começa com a configuração prática mais segura habilitada. Ele não deve depender dé o usuário endurece-lo depois."
            ),
            remediationNote: t(
              "If the system ships open and expects later hardening, it is not secure by default.",
              "Se o sistema sai aberto e espera endurecimento depois, ele não é seguro por padrão."
            ),
            options: [
              option(
                "A",
                true,
                t("Ship the service with unnecessary ports disabled and administrative access denied until explicitly approved", "Entregar o serviço com portas desnecessarias desativadas e acesso administrativo negado até aprovação explícita"),
                t("Correct. That is secure-by-default behavior.", "Correto. Esse e um comportamento seguro por padrão.")
              ),
              option(
                "B",
                false,
                t("Enable every feature by default so deployment is faster", "Habilitar todos os recursos por padrão para tornar o deployment mais rápido"),
                t("Not best. Convenience-first defaults make the attack surface larger.", "Não é a melhor. Padrões guiados por conveniência deixam a superfície de ataque maior.")
              ),
              option(
                "C",
                false,
                t("Trust all internal network traffic until the first incident proves otherwise", "Confiar em todo o tráfego interno até que o primeiro incidente prove o contrario"),
                t("Not best. That conflicts with secure defaults and with zero trust thinking.", "Não é a melhor. Isso conflita com secure defaults e com a lógica de zero trust.")
              )
            ]
          }
        }),
        lesson({
          slug: "security-models-and-control-selection",
          estimatedMinutes: 8,
          title: t("Security models and control selection", "Modelos de segurança e selecao de controles"),
          summary: t(
            "Learn what the main security models protect and when assurance matters.",
            "Aprenda o que os principais modelos de segurança protegem e quando assurance importa."
          ),
          objective: t(
            "Differentiate Bell-LaPadula, Biba, Clark-Wilson, and the basics of Common Criteria.",
            "Diferencie Bell-LaPadula, Biba, Clark-Wilson e o básico de Common Criteria."
          ),
          blocks: [
            introBlock(
              t(
                "Security models turn vague policy into rules a system can enforce. Evaluation frameworks matter because even a good model is useless if the implementation cannot be trusted.",
                "Modelos de segurança transformam política vaga em regras que o sistema consegue aplicar. Frameworks de avaliação importam porque até um bom modelo e inutil se a implementação não puder ser confiada."
              )
            ),
            conceptBlock(
              "bell-lapadula-and-biba",
              t("Bell-LaPadula and Biba protect different things", "Bell-LaPadula e Biba protegem coisas diferentes"),
              t(
                "Bell-LaPadula is about confidentiality, with ideas like no read up and no write down. Biba is about integrity, keeping lower-integrity data from contaminating higher-integrity data and processes.",
                "Bell-LaPadula trata de confidencialidade, com ideias como no read up e no write down. Biba trata de integridade e impede que dados de menor integridade contaminem dados e processos de maior integridade."
              )
            ),
            conceptBlock(
              "clark-wilson-and-conflict-models",
              t("Commercial systems often fit Clark-Wilson better", "Sistemas comerciais muitas vezes combinam mais com Clark-Wilson"),
              t(
                "Clark-Wilson emphasizes well-formed transactions, authorized transformation procedures, and separation of duties. Brewer-Nash, also called the Chinese Wall model, helps prevent conflicts of interest by limiting later access after earlier access choices.",
                "Clark-Wilson enfatiza transações bem formadas, procedimentos de transformacao autorizados e segregacao de funções. Brewer-Nash, também chamado de modelo Chinese Wall, ajuda a evitar conflito de interesse limitando acessos futuros depois de escolhas anteriores."
              )
            ),
            conceptBlock(
              "common-criteria",
              t("Common Criteria evaluates claims, not magic", "Common Criteria avalia alegações, não magia"),
              t(
                "Common Criteria compares the Target of Evaluation with a Protection Profile and Security Target, then assigns an Evaluation Assurance Level based on rigor. It tells you how much confidence to place in specific security claims.",
                "Common Criteria compara o Target of Evaluation com um Protection Profile e um Security Target, depois atribui um Evaluation Assurance Level com base no rigor. Ele mostra quanta confiança colocar em alegações específicas de segurança."
              )
            ),
            conceptBlock(
              "ato-and-assurance",
              t("Authorization to Operate is a risk decision", "Authorization to Operate é uma decisão de risco"),
              t(
                "An ATO means the assessed system may be used for a defined purpose at an accepted level of risk. It is a governance decision based on testing, architecture, and control evidence, not a claim that the system is perfect.",
                "Um ATO significa que o sistema avaliado pode ser usado para um objetivo definido em um nível de risco aceito. É uma decisão de governança baseada em testes, arquitetura e evidências de controle, não uma afirmação de que o sistema é perfeito."
              )
            ),
            movieCueBlock({
              title: t("The Imitation Game", "O Jogo da Imitação"),
              cue: t(
                "Think about how controlling who can see information and who can change it are not the same problem, even in one mission.",
                "Pense em como controlar quem pode ver a informação e quem pode alterá-la não é o mesmo problema, mesmo dentro dé uma única missão."
              ),
              body: t(
                "Use that cue to separate confidentiality models from integrity models. Also remember that assurance is justified confidence, not blind faith.",
                "Use essa pista para separar modelos de confidencialidade e de integridade. Lembre também que assurance é confiança justificada, não fé cega."
              )
            }),
            keyPointsBlock(
              t(
                "Bell-LaPadula protects secrecy. Biba protects integrity. Clark-Wilson fits controlled commercial workflows. Common Criteria and ATO measure confidence and accepted risk.",
                "Bell-LaPadula protege sigilo. Biba protege integridade. Clark-Wilson combina com fluxos comerciais controlados. Common Criteria e ATO medem confiança e risco aceito."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which model is MOST directly focused on preventing low-integrity data from corrupting high-integrity information?",
              "Qual modelo e MAIS diretamente focado em impedir que dados de baixa integridade corrompam informações de alta integridade?"
            ),
            supportText: t(
              "Choose the model focused on integrity, not confidentiality.",
              "Escolha o modelo focado em integridade, não ém confidencialidade."
            ),
            correctRationale: t(
              "Biba is the classic integrity model. It tries to stop lower-integrity subjects or data from contaminating higher-integrity objects.",
              "Biba e o modelo classico de integridade. Ele tenta impedir que sujeitos ou dados de menor integridade contaminem objetos de maior integridade."
            ),
            remediationNote: t(
              "Bell-LaPadula is the confidentiality counterpart, and Clark-Wilson focuses on controlled commercial transactions and separation of duties.",
              "Bell-LaPadula e o correspondente de confidencialidade, e Clark-Wilson foca em transações comerciais controladas e segregacao de funções."
            ),
            options: [
              option(
                "A",
                true,
                t("Biba", "Biba"),
                t("Correct. Biba is the integrity-focused model.", "Correto. Biba e o modelo focado em integridade.")
              ),
              option(
                "B",
                false,
                t("Bell-LaPadula", "Bell-LaPadula"),
                t("Not best. Bell-LaPadula is about confidentiality, not integrity contamination.", "Não é a melhor. Bell-LaPadula trata de confidencialidade, não de contaminacao de integridade."
                )
              ),
              option(
                "C",
                false,
                t("Take-Grant", "Take-Grant"),
                t("Not best. Take-Grant focuses on how rights are passed, not on the integrity problem asked here.", "Não é a melhor. Take-Grant foca em como direitos são transferidos, não no problema de integridade pedido aqui.")
              )
            ]
          }
        }),
        lesson({
          slug: "trust-anchors-and-system-capabilities",
          estimatedMinutes: 8,
          title: t("Trust anchors and system capabilities", "Âncoras de confiança e capacidades do sistema"),
          summary: t(
            "Learn which small trusted parts make bigger security claims believable.",
            "Aprenda quais pequenas partes confiáveis tornam críveis promessas maiores de segurança."
          ),
          objective: t(
            "Explain TCB, reference monitor ideas, TPM, isolation, virtualization, and fault tolerance.",
            "Explique TCB, ideias de reference monitor, TPM, isolamento, virtualização e tolerância a falhas."
          ),
          blocks: [
            introBlock(
              t(
                "Every secure system relies on a small set of components behaving correctly. The smaller and easier to verify that trusted base is, the more believable the security claim becomes.",
                "Todo sistema seguro depende de um pequeno conjunto de componentes funcionando corretamente. Quanto menor e mais fácil de verificar esse trusted base, mais crivel fica a alegação de segurança."
              )
            ),
            conceptBlock(
              "tcb-and-reference-monitor",
              t("The trusted computing base is the system's security bet", "A trusted computing base é a aposta de segurança do sistema"),
              t(
                "The TCB includes the hardware, firmware, and software that must work correctly to enforce security. The reference monitor inside it should be non-bypassable, evaluable, always invoked, and tamper resistant, often remembered as NEAT.",
                "A TCB inclui hardware, firmware e software que precisam funcionar corretamente para aplicar a segurança. O reference monitor dentro dela deve ser non-bypassable, evaluable, always invoked e tamper resistant, muitas vezes lembrado como NEAT."
              )
            ),
            conceptBlock(
              "memory-and-rings",
              t("Isolation keeps one failure from becoming everyone's failure", "Isolamento impede qué uma falha vire problema de todos"),
              t(
                "Process isolation, hardware segmentation, and protection rings keep applications from trampling each other or directly changing privileged functions. Isolation is a core architecture control, not only an operating system feature.",
                "Isolamento de processos, segmentação por hardware e protection rings impedem que aplicações atrapalhem umas as outras ou mudem funções privilegiadas diretamente. Isolamento e um controle central de arquitetura, não apenas um recurso do sistema operacional."
              )
            ),
            conceptBlock(
              "tpm-and-hsm",
              t("TPMs extend trust into hardware-backed secrets", "TPMs levam a confiança para segredos protegidos por hardware"),
              t(
                "A TPM provides hardware-backed cryptographic operations, protected key storage, and features such as secure boot support and remote attestation. It is a specialized trust anchor, not a general substitute for every other hardware security control.",
                "Um TPM fornece operações criptográficas apoiadas por hardware, armazenamento protegido de chaves e recursos como suporte a secure boot e remote attestation. Ele é uma âncora especializada de confiança, não um substituto geral para todo outro controle de segurança em hardware."
              )
            ),
            conceptBlock(
              "virtualization-and-availability",
              t("Virtualization and fault tolerance add value and attack surface", "Virtualização e tolerância a falhas trazem valor e superfície de ataque"),
              t(
                "Virtual machines, virtual software, and fault-tolerant design improve flexibility and availability. They also add new boundaries to protect, such as the hypervisor, shared infrastructure, and failover assumptions.",
                "Máquinas virtuais, software virtual e design tolerante a falhas melhoram flexibilidade e disponibilidade. Eles também adicionam novos limites para proteger, como hipervisor, infraestrutura compartilhada e premissas de failover."
              )
            ),
            movieCueBlock({
              title: t("Iron Man", "Homem de Ferro"),
              cue: t(
                "Think about how the visible suit works only because the hidden core systems and power source behave predictably and stay protected.",
                "Pense em como a armadura visível só funciona porque os sistemas centrais escondidos e a fonte de energia se comportam de forma previsível é contínuam protegidos."
              ),
              body: t(
                "Use that cue for trust anchors: security claims depend on a few protected components that the rest of the system fully relies on.",
                "Use essa pista para âncoras de confiança: alegações de segurança dependem de poucos componentes protegidos dos quais o resto do sistema depende totalmente."
              )
            }),
            keyPointsBlock(
              t(
                "Protect the TCB. Keep the reference monitor small and always invoked. Use isolation and hardware trust anchors carefully. Remember that availability features also expand what must be protected.",
                "Proteja a TCB. Mantenha o reference monitor pequeno e sempre invocado. Use isolamento e âncoras de confiança em hardware com cuidado. Lembre que recursos de disponibilidade também aumentam o que precisa ser protegido."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which capability is MOST directly associated with using a TPM to validate system integrity at startup and during attestation?",
              "Qual capacidade esta MAIS diretamente associada ao uso de um TPM para validar a integridade do sistema na inicialização e durante attestation?"
            ),
            supportText: t(
              "Choose the hardware-backed integrity function, not a general network control.",
              "Escolha a função de integridade apoiada por hardware, não um controle geral de rede."
            ),
            correctRationale: t(
              "Remote attestation uses TPM measurements to show that the system booted and still remains in an expected configuration. That strengthens confidence in system integrity.",
              "Remote attestation usa medições do TPM para mostrar que o sistema inicializou e ainda permanece em uma configuração esperada. Isso fortalece a confiança na integridade do sistema."
            ),
            remediationNote: t(
              "Encryption and access control may also involve the TPM, but the integrity function described here is remote attestation.",
              "Criptografia e controle de acesso também podem envolver TPM, mas a função de integridade descrita aqui e remote attestation."
            ),
            options: [
              option(
                "A",
                true,
                t("Remote attestation", "Remote attestation"),
                t("Correct. That is the TPM capability used to validate the expected configuration state.", "Correto. Essa é a capacidade do TPM usada para validar o estado esperado da configuração.")
              ),
              option(
                "B",
                false,
                t("Packet filtering", "Filtragem de pacotes"),
                t("Not best. Packet filtering is a network control, not a TPM-backed integrity measurement function.", "Não é a melhor. Filtragem de pacotes e um controle de rede, não uma função de medição de integridade apoiada por TPM.")
              ),
              option(
                "C",
                false,
                t("Proxy caching", "Cache de proxy"),
                t("Not best. Proxy caching affects content delivery, not startup integrity trust.", "Não é a melhor. Cache de proxy afeta entrega de conteúdo, não a confiança na integridade da inicialização.")
              )
            ]
          }
        }),
        lesson({
          slug: "platform-architecture-risks",
          estimatedMinutes: 8,
          title: t("Platform architecture risks", "Riscos de arquitetura de plataforma"),
          summary: t(
            "Learn how clients, servers, databases, and crypto systems fail in different ways.",
            "Aprenda como clientes, servidores, bancos de dados e sistemas criptográficos falham de formas diferentes."
          ),
          objective: t(
            "Recognize common weaknesses in each platform and choose fitting mitigations.",
            "Reconheca fraquezas comuns em cada plataforma e escolha mitigações adequadas."
          ),
          blocks: [
            introBlock(
              t(
                "Architecture work does not stay abstract for long. Soon you must decide how to protect endpoints, harden servers, preserve database integrity, and choose cryptography that survives both design mistakes and implementation flaws.",
                "Trabalho de arquitetura não fica abstrato por muito tempo. Logo você precisa decidir como proteger endpoints, endurecer servidores, preservar a integridade do banco de dados e escolher criptografia que sobreviva a erros de design e falhas de implementação."
              )
            ),
            conceptBlock(
              "client-and-server-risks",
              t("Clients and servers are attacked differently", "Clientes e servidores são atacados de formas diferentes"),
              t(
                "Clients are exposed to phishing, browsers, office tools, and direct user action. Servers are prime targets for privilege abuse, persistence, and hosted data. Patching, hardened images, and host controls matter on both, but the attack paths differ.",
                "Clientes ficam expostos a phishing, navegadores, ferramentas de escritório e ação direta do usuário. Servidores são alvos principais para abuso de privilégio, persistência e dados hospedados. Patching, imagens endurecidas e controles no host importam nos dois lados, mas os caminhos de ataque são diferentes."
              )
            ),
            conceptBlock(
              "database-risks",
              t("Database security is about more than confidentiality", "Segurança de banco de dados e mais do que confidencialidade"),
              t(
                "Databases hold critical records and need integrity discipline through keys, referential integrity, and transaction models such as ACID. Attackers can also use aggregation and inference to learn sensitive facts from queries that look harmless by themselves.",
                "Bancos de dados guardam registros críticos e exigem disciplina de integridade por meio de chaves, integridade referencial e modelos de transação como ACID. Atacantes também podem usar agregação e inferência para descobrir fatos sensíveis a partir de consultas que, sozinhas, parecem inócuas."
              )
            ),
            conceptBlock(
              "crypto-system-risks",
              t("Cryptography fails through keys, software, and implementation", "Criptografia falha por chaves, software e implementação"),
              t(
                "A cryptosystem includes algorithms, keys, code, and procedures. Strong algorithms still fail when key management is weak, software is buggy, randomness is poor, or secret material is exposed during use or storage.",
                "Um criptossistema inclui algoritmos, chaves, código e procedimentos. Algoritmos fortes ainda falham quando a gestão de chaves e fraca, o software tem bugs, a aleatoriedade e ruim ou o material secreto fica exposto durante uso ou armazenamento."
              )
            ),
            conceptBlock(
              "management-controls",
              t("Mitigations are often simple on purpose", "Mitigações muitas vezes são simples de propósito"),
              t(
                "Regular patching, secure baselines, encryption, host firewalls, logging, and access control are not glamorous, but they reduce most platform weaknesses seen in real assessments.",
                "Patching regular, baselines seguros, criptografia, firewalls de host, logging e controle de acesso não são glamourosos, mas reduzem a maior parte das fraquezas de plataforma vistas em avaliações reais."
              )
            ),
            movieCueBlock({
              title: t("Jurassic Park", "Jurassic Park"),
              cue: t(
                "Think about how one environment mixed software, physical systems, human shortcuts, and privileged access into one cascading failure.",
                "Pense em como um ambiente misturou software, sistemas físicos, atalhos humanos e acesso privilegiado em uma falha em cascata."
              ),
              body: t(
                "Use that cue for architecture risk: systems often fail where technical weakness meets operational shortcut.",
                "Use essa pista para risco de arquitetura: sistemas muitas vezes falham onde fraqueza técnica encontra atalho operacional."
              )
            }),
            keyPointsBlock(
              t(
                "Clients, servers, databases, and cryptosystems each have their own weakness patterns. Real architecture maturity shows up in tailored hardening and disciplined operations.",
                "Clientes, servidores, bancos e criptossistemas possuem seus próprios padrões de fraqueza. Maturidade real de arquitetura aparece em hardening sob medida e operação disciplinada."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which database concern MOST directly describes learning sensitive facts by combining multiple harmless-looking query results?",
              "Qual preocupacao com banco de dados descreve MAIS diretamente aprender fatos sensíveis combinando varios resultados de consulta aparentemente inocuos?"
            ),
            supportText: t(
              "Pick the term linked to deduction from allowed data, not to transaction failure.",
              "Escolha o termo ligado a dedução a partir de dados permitidos, não a falha de transação."
            ),
            correctRationale: t(
              "Inference happens when an attacker deduces protected information by combining pieces of lower-sensitivity data. Each result may be allowed, but together they reveal too much.",
              "Inferência acontece quando um atacante deduz informação protegida combinando partes de dados de menor sensibilidade. Cada resultado pode ser permitido, mas juntos revelam demais."
            ),
            remediationNote: t(
              "Aggregation is related, but the focus here is on deduction from the combined query output.",
              "Agregação e relacionada, mas o foco aqui esta na dedução a partir da combinacao dos resultados."
            ),
            options: [
              option(
                "A",
                true,
                t("Inference", "Inferência"),
                t("Correct. This is the classic inference problem in database security.", "Correto. Esse e o problema classico de inferência em segurança de banco de dados.")
              ),
              option(
                "B",
                false,
                t("Atomicity", "Atomicidade"),
                t("Not best. Atomicity is an ACID property about all-or-nothing transactions.", "Não é a melhor. Atomicidade é uma propriedade ACID sobre transações tudo-ou-nada.")
              ),
              option(
                "C",
                false,
                t("Process isolation", "Isolamento de processos"),
                t("Not best. Process isolation is a system-memory protection concept, not a database inference issue.", "Não é a melhor. Isolamento de processos é um conceito de proteção de memória do sistema, não um problema de inferência em banco de dados.")
              )
            ]
          }
        }),
        lesson({
          slug: "specialized-and-modern-architectures",
          estimatedMinutes: 8,
          title: t("Specialized and modern architectures", "Arquiteturas especializadas e modernas"),
          summary: t(
            "Learn how cloud, containers, serverless, IoT, and ICS change security boundaries.",
            "Aprenda como nuvem, containers, serverless, IoT e ICS mudam os limites de segurança."
          ),
          objective: t(
            "Compare the main security tradeoffs in cloud, microservices, serverless, industrial, embedded, and edge environments.",
            "Compare os principais tradeoffs de segurança em ambientes de nuvem, microserviços, serverless, industriais, embarcados e de borda."
          ),
          blocks: [
            introBlock(
              t(
                "Modern architecture brings speed and scale by spreading trust across providers, services, workloads, and field devices. The real security question is where the new boundaries and blind spots appear.",
                "Arquitetura moderna traz velocidade e escala ao espalhar confiança entre provedores, serviços, workloads e dispositivos de campo. A pergunta real de segurança e onde aparecem os novos limites e pontos cegos."
              )
            ),
            conceptBlock(
              "cloud-shared-responsibility",
              t("Cloud security starts with clear shared responsibility", "Segurança em nuvem começa com shared responsibility clara"),
              t(
                "IaaS, PaaS, and SaaS move different maintenance and control duties to the provider, but never all of them. Customers still own configuration, identity, data protection, and many response tasks.",
                "IaaS, PaaS e SaaS movem partes diferentes de manutenção e controle para o provedor, mas nunca tudo. Clientes continuam donos de configuração, identidade, proteção de dados e muitas tarefas de resposta."
              )
            ),
            conceptBlock(
              "microservices-containers-serverless",
              t("Smaller services need tighter discipline", "Serviços menores exigem disciplina mais forte"),
              t(
                "Microservices, containers, and serverless reduce coupling and speed delivery, but they also multiply interfaces, identities, dependencies, and configuration points. Secure images, authenticated APIs, signed artifacts, and pipeline controls matter more, not less.",
                "Microserviços, containers e serverless reduzem acoplamento e aceleram a entrega, mas também multiplicam interfaces, identidades, dependências e pontos de configuração. Imagens seguras, APIs autenticadas, artefatos assinados e controles de pipeline importam mais, não menos."
              )
            ),
            conceptBlock(
              "ics-and-embedded",
              t("Industrial and embedded systems put safety and continuity first", "Sistemas industriais e embarcados colocam segurança e continuidade em primeiro lugar"),
              t(
                "ICS, SCADA, PLCs, and embedded platforms often run in static or fragile environments where patching is hard and availability or safety may matter more than usual IT preferences. Segmentation, vendor-approved change control, and physical security become central.",
                "ICS, SCADA, PLCs e plataformas embarcadas muitas vezes operam em ambientes estáticos ou frágeis nos quais patching é difícil e disponibilidade ou segurança podem importar mais do que preferências comuns de TI. Segmentação, controle de mudança aprovado pelo fornecedor e segurança física se tornam centrais."
              )
            ),
            conceptBlock(
              "iot-edge-hpc",
              t("IoT, edge, and HPC push risk outward", "IoT, borda e HPC empurram o risco para fora"),
              t(
                "IoT and edge move processing close to devices and users, which lowers latency but increases management complexity. High-performance computing adds dense shared infrastructure where segmentation, monitoring, and fail-soft design are critical.",
                "IoT e borda levam o processamento para perto de dispositivos e usuários, o que reduz latência, mas aumenta a complexidade de gestão. High-performance computing adiciona infraestrutura compartilhada densa, na qual segmentação, monitoramento e design fail-soft são críticos."
              )
            ),
            movieCueBlock({
              title: t("Apollo 13", "Apollo 13"),
              cue: t(
                "Think about how mission success depended on constrained systems, remote operation, fallback procedures, and a clear division of responsibility.",
                "Pense em como o sucesso da missão dependia de sistemas restritos, operação remota, procedimentos de contingência e divisão clara de responsabilidade."
              ),
              body: t(
                "Use that cue for specialized architectures: distributed capability always increases the need for clarity, monitoring, and controlled failure modes.",
                "Use essa pista para arquiteturas especializadas: capacidade distribuida sempre aumenta a necessidade de clareza, monitoramento e modos de falha controlados."
              )
            }),
            keyPointsBlock(
              t(
                "Cloud changes ownership of infrastructure, not of risk. Microservices multiply trust boundaries. ICS and embedded systems put safety and continuity first. IoT and edge increase distributed control needs.",
                "Nuvem muda a propriedade da infraestrutura, não do risco. Microserviços multiplicam limites de confiança. ICS e sistemas embarcados colocam segurança e continuidade em primeiro lugar. IoT e borda aumentam necessidades de controle distribuído."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which security concern is MOST characteristic of a microservices architecture compared with a monolith?",
              "Qual preocupacao de segurança e MAIS característica dé uma arquitetura de microserviços em comparacao com um monolito?"
            ),
            supportText: t(
              "Focus on what grows when one application becomes many loosely coupled services.",
              "Concentre-se no que aumenta quando uma aplicação vira muitos serviços fracamente acoplados."
            ),
            correctRationale: t(
              "Microservices multiply APIs, identities, dependencies, and communication paths. That means the organization must secure many more trust boundaries than in a monolith.",
              "Microserviços multiplicam APIs, identidades, dependências e caminhos de comunicação. Isso significa que a organização precisa proteger muito mais limites de confiança do que em um monolito."
            ),
            remediationNote: t(
              "Microservices may reduce coupling and speed delivery, but they do not reduce security complexity by default.",
              "Microserviços podem reduzir acoplamento e acelerar a entrega, mas não reduzem complexidade de segurança por padrão."
            ),
            options: [
              option(
                "A",
                true,
                t("The number of service-to-service trust boundaries increases sharply", "O número de limites de confiança entre serviço e serviço aumenta fortemente"),
                t("Correct. More services means more interfaces, identities, and boundaries to secure.", "Correto. Mais serviços significam mais interfaces, identidades e limites para proteger.")
              ),
              option(
                "B",
                false,
                t("Physical facility design becomes irrelevant", "O design da instalação física se torna irrelevante"),
                t("Not best. Physical concerns may move, but they never stop mattering.", "Não é a melhor. Preocupacoes físicas podem mudar de lugar, mas nunca deixam de importar.")
              ),
              option(
                "C",
                false,
                t("Authentication is no longer needed because each service is small", "Autenticação deixa de ser necessária porque cada serviço e pequeno"),
                t("Not best. Smaller services increase the need for disciplined authentication and authorization.", "Não é a melhor. Serviços menores aumentam a necessidade de autenticação e autorização disciplinadas.")
              )
            ]
          }
        }),
        lesson({
          slug: "cryptographic-methods-and-key-management",
          estimatedMinutes: 8,
          title: t("Cryptographic methods and key management", "Métodos criptográficos e gestão de chaves"),
          summary: t(
            "Learn how algorithms, modes, and key management work together.",
            "Aprenda como algoritmos, modos e gestão de chaves funcionam juntos."
          ),
          objective: t(
            "Compare symmetric and asymmetric methods, common modes, and key lifecycle choices.",
            "Compare métodos simetricos e assimetricos, modos comuns e escolhas sobre o ciclo de vida das chaves."
          ),
          blocks: [
            introBlock(
              t(
                "Most cryptography failures are governance failures. Teams focus on algorithm names and ignore key storage, rotation, randomness, lifecycle, and whether the chosen method still fits how long the data must stay secret.",
                "A maior parte das falhas de criptografia e falha de governança. Equipes focam em nomes de algoritmos e ignoram armazenamento de chaves, rotação, aleatoriedade, ciclo de vida e se o metodo escolhido ainda combina com o tempo em que o dado precisa ficar em sigilo."
              )
            ),
            conceptBlock(
              "symmetric-vs-asymmetric",
              t("Symmetric protects bulk data; asymmetric helps with exchange and identity", "Simetrica protege dados em volume; assimetrica ajuda em troca e identidade"),
              t(
                "Symmetric encryption is fast and works well for large amounts of data, but it has shared-secret distribution problems. Asymmetric methods help with key exchange, signatures, and identity, but they cost more in computation.",
                "Criptografia simetrica e rápida e funciona bem para grandes volumes de dados, mas tem problemas para distribuir o segredo compartilhado. Métodos assimetricos ajudam em troca de chaves, assinaturas e identidade, mas custam mais em processamento."
              )
            ),
            conceptBlock(
              "modes-and-integrity",
              t("Modes of operation change real-world strength", "Modos de operação mudam a força no mundo real"),
              t(
                "ECB leaks patterns and is usually unacceptable. CBC, CTR, GCM, and CCM each have tradeoffs around chaining, parallelism, and integrity. Authenticated modes such as GCM matter because encryption without integrity is often incomplete protection.",
                "ECB vaza padrões e normalmente e inaceitavel. CBC, CTR, GCM e CCM tem tradeoffs em encadeamento, paralelismo e integridade. Modos autenticados como GCM importam porque criptografia sem integridade muitas vezes e proteção incompleta."
              )
            ),
            conceptBlock(
              "key-lifecycle",
              t("Keys have a lifecycle, not just a value", "Chaves tem ciclo de vida, não apenas valor"),
              t(
                "Creation, distribution, storage, rotation, escrow, suspension, revocation, expiration, and destruction all matter. The strongest algorithm still fails if secret keys are exposed on disks, desktops, or unprotected channels.",
                "Criação, distribuição, armazenamento, rotação, escrow, suspensão, revogação, expiracao e destruição importam. O algoritmo mais forte ainda falha se chaves secretas ficam expostas em discos, desktops ou canais desprotegidos."
              )
            ),
            conceptBlock(
              "future-proofing",
              t("Cryptography must last longer than the attacker's patience", "A criptografia deve durar mais do que a paciencia do atacante"),
              t(
                "Algorithm and key-length choices should match how long the data must stay protected. That is why organizations track approved, deprecated, legacy, and post-quantum options instead of treating crypto selection as a one-time setup step.",
                "Escolhas de algoritmo e tamanho de chave devem combinar com quanto tempo o dado precisa ficar protegido. Por isso organizações acompanham opções aprovadas, depreciadas, legadas e pos-quanticas em vez de tratar a selecao criptográfica como um passo único de configuração."
              )
            ),
            movieCueBlock({
              title: t("Sneakers", "Sneakers"),
              cue: t(
                "Think about how the hard part was never just having cryptography. The hard part was who controlled the keys, the trust, and the surrounding systems.",
                "Pense em como a parte dificil nunca foi apenas ter criptografia. A parte dificil era quem controlava as chaves, a confiança e os sistemas ao redor delas."
              ),
              body: t(
                "Use that cue for crypto governance: algorithms matter, but key lifecycle and operational discipline decide whether the protection is real.",
                "Use essa pista para governança criptográfica: algoritmos importam, mas o ciclo de vida da chave e a disciplina operacional decidem se a proteção e real."
              )
            }),
            keyPointsBlock(
              t(
                "Use symmetric crypto for bulk data, asymmetric crypto for exchange and signatures, authenticated modes for integrity, and strong lifecycle governance for the keys.",
                "Use criptografia simetrica para volume, criptografia assimetrica para troca e assinaturas, modos autenticados para integridade e governança forte de ciclo de vida para as chaves."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Why is GCM often preferred over basic CTR mode for protecting modern application traffic?",
              "Por que GCM frequentemente e preferido em vez do modo CTR básico para proteger tráfego moderno de aplicações?"
            ),
            supportText: t(
              "Look for the mode that adds authenticity and integrity, not only confidentiality.",
              "Procure o modo que adiciona autenticidade e integridade, não apenas confidencialidade."
            ),
            correctRationale: t(
              "GCM combines counter-mode encryption with authentication, so it can protect confidentiality and integrity in one efficient design.",
              "GCM combina criptografia em counter mode com autenticação, entao consegue proteger confidencialidade e integridade em um único desenho eficiente."
            ),
            remediationNote: t(
              "CTR is fast, but it does not provide integrity by itself. That gap matters in real systems.",
              "CTR e rápido, mas não fornece integridade por conta própria. Essa lacuna importa em sistemas reais."
            ),
            options: [
              option(
                "A",
                true,
                t("Because GCM provides authenticated encryption, not just confidentiality", "Porque GCM fornece criptografia autenticada, e não apenas confidencialidade"),
                t("Correct. That is the practical advantage most teams care about.", "Correto. Essa é a vantagem prática mais importante para a maioria das equipes.")
              ),
              option(
                "B",
                false,
                t("Because GCM eliminates the need for any key management", "Porque GCM elimina a necessidade de qualquer gestão de chaves"),
                t("Not best. No mode removes the need for strong key management.", "Não é a melhor. Nenhum modo elimina a necessidade de gestão forte de chaves.")
              ),
              option(
                "C",
                false,
                t("Because GCM is the only mode that can encrypt network traffic", "Porque GCM e o único modo capaz de criptografar tráfego de rede"),
                t("Not best. Many modes can encrypt traffic. The real difference here is integrated authentication.", "Não é a melhor. Muitos modos podem criptografar tráfego. A diferença real aqui e a autenticação integrada.")
              )
            ]
          }
        }),
        lesson({
          slug: "pki-signatures-and-certificate-governance",
          estimatedMinutes: 8,
          title: t("PKI, signatures, and certificate governance", "PKI, assinaturas e governança de certificados"),
          summary: t(
            "Learn how PKI organizes trust for certificates and signatures.",
            "Aprenda como PKI organiza a confiança para certificados e assinaturas."
          ),
          objective: t(
            "Explain CAs, RAs, revocation, digital signatures, and when PKI is worth the complexity.",
            "Explique CAs, RAs, revogação, assinaturas digitais e quando PKI vale a complexidade."
          ),
          blocks: [
            introBlock(
              t(
                "Public-key cryptography becomes operationally useful only when trust is organized. PKI is how organizations bind identities to keys, issue certificates at scale, and show when trust should end.",
                "Criptografia de chave publica só se torna útil na operação quando a confiança e organizada. PKI e como organizações ligam identidades a chaves, emitem certificados em escala e mostram quando a confiança deve terminar."
              )
            ),
            conceptBlock(
              "pki-components",
              t("CAs issue trust, RAs check identity", "CAs emitem confiança, RAs verificam identidade"),
              t(
                "Certification authorities issue certificates, while registration authorities validate the identity of requesters. Policies, templates, and certificate practice statements define how the trust system should work.",
                "Certification authorities emitem certificados, enquanto registration authorities validam a identidade de quem pede o certificado. Políticas, templates e certificate practice statements definem como esse sistema de confiança deve funcionar."
              )
            ),
            conceptBlock(
              "tiering-and-revocation",
              t("Tiering improves protection but adds complexity", "Camadas melhoram a proteção, mas aumentam a complexidade"),
              t(
                "Offline roots, issuing CAs, and revocation services reduce exposure of the most powerful trust anchors. OCSP and CRLs matter because a certificate that should no longer be trusted must be clearly discoverable as invalid.",
                "Raizes offline, issuing CAs e serviços de revogação reduzem a exposição das âncoras de confiança mais poderosas. OCSP e CRLs importam porque um certificado que não deve mais ser confiado precisa ser claramente detectado como invalido."
              )
            ),
            conceptBlock(
              "digital-signatures",
              t("Digital signatures prove origin and integrity, not secrecy", "Assinaturas digitais provam origem e integridade, não sigilo"),
              t(
                "A signature hashes the message and protects the digest with the sender's private key. Recipients can then validate authenticity and integrity with the public key, but the signature does not hide the content.",
                "Uma assinatura gera hash da mensagem e protege o digest com a chave privada do remetente. Destinatários podem validar autenticidade e integridade com a chave publica, mas a assinatura não ésconde o conteúdo."
              )
            ),
            conceptBlock(
              "qkd-and-practicality",
              t("Exotic key-distribution ideas do not replace governance", "Ideias exóticas de distribuição de chaves não substituem governança"),
              t(
                "Quantum key distribution is conceptually interesting because eavesdropping disturbs the exchange, but practical trust still depends on architecture, cost, distance, and lifecycle governance around the rest of the system.",
                "Quantum key distribution e conceitualmente interessante porque espionagem perturba a troca, mas a confiança prática ainda depende de arquitetura, custo, distância e governança de ciclo de vida do resto do sistema."
              )
            ),
            movieCueBlock({
              title: t("National Treasure", "A Lenda do Tesouro Perdido"),
              cue: t(
                "Think about how a clue mattered only because the chain of trust around maps, signatures, and provenance held together.",
                "Pense em como uma pista só tinha valor porque a cadeia de confiança em torno de mapas, assinaturas e procedencia permanecia coesa."
              ),
              body: t(
                "Use that cue for PKI: certificates are valuable only when the trust chain, validation process, and revocation logic all stay intact.",
                "Use essa pista para PKI: certificados só são valiosos quando a cadeia de confiança, o processo de validação e a lógica de revogação permanecem inteiros."
              )
            }),
            keyPointsBlock(
              t(
                "PKI organizes trust. CAs issue, RAs validate, revocation ends trust, and digital signatures prove integrity and origin but not confidentiality.",
                "PKI organiza a confiança. CAs emitem, RAs validam, revogação encerra a confiança, e assinaturas digitais provam integridade e origem, mas não confidencialidade."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY purpose of a digital signature?",
              "Qual é a finalidade PRIMARIA dé uma assinatura digital?"
            ),
            supportText: t(
              "Pick the answer tied to message origin and integrity, not secrecy.",
              "Escolha a resposta ligada a origem e integridade da mensagem, não a sigilo."
            ),
            correctRationale: t(
              "Digital signatures provide integrity, authentication of origin, and nonrepudiation. By themselves, they do not encrypt or hide the message content.",
              "Assinaturas digitais fornecem integridade, autenticação de origem e não repudio. Sozinhas, elas não criptografam nem escondem o conteúdo da mensagem."
            ),
            remediationNote: t(
              "To get confidentiality, you still need encryption in addition to a signature.",
              "Para ter confidencialidade, você ainda precisa de criptografia além da assinatura."
            ),
            options: [
              option(
                "A",
                true,
                t("Prove message origin and integrity", "Provar origem e integridade da mensagem"),
                t("Correct. That is the core purpose of a digital signature.", "Correto. Essa é a finalidade central dé uma assinatura digital.")
              ),
              option(
                "B",
                false,
                t("Provide confidentiality by itself", "Fornecer confidencialidade por si só"),
                t("Not best. Signatures do not hide the content.", "Não é a melhor. Assinaturas não éscondem o conteúdo.")
              ),
              option(
                "C",
                false,
                t("Replace the need for certificate revocation", "Substituir a necessidade de revogação de certificados"),
                t("Not best. Revocation is still necessary when trust in a certificate ends.", "Não é a melhor. Revogação continua necessária quando a confiança em um certificado termina.")
              )
            ]
          }
        }),
        lesson({
          slug: "facility-design-and-system-lifecycle",
          estimatedMinutes: 8,
          title: t("Facility design and system lifecycle", "Design de instalacoes e ciclo de vida do sistema"),
          summary: t(
            "Learn how buildings, environmental controls, and lifecycle planning affect security.",
            "Aprenda como edificios, controles ambientais e planejamento do ciclo de vida afetam a segurança."
          ),
          objective: t(
            "Apply site and facility security principles and connect them to system lifecycle resilience.",
            "Aplique princípios de segurança de local e instalação e conecte-os à resiliência do ciclo de vida do sistema."
          ),
          blocks: [
            introBlock(
              t(
                "Secure design does not stop at software and network diagrams. Physical placement, wiring closets, data centers, HVAC, fire suppression, and lifecycle planning all help decide whether the system stays trustworthy under stress.",
                "Design seguro não para em diagramas de software e rede. Posicionamento físico, wiring closets, data centers, HVAC, supressão de incêndio e planejamento de ciclo de vida ajudam a decidir se o sistema continua confiável sob estresse."
              )
            ),
            conceptBlock(
              "site-and-facility-principles",
              t("Good site design makes attack harder before guards intervene", "Bom design do local dificulta o ataque antes da intervencao dos guardas"),
              t(
                "Site selection, layered defense, standoff distance, and CPTED principles such as natural surveillance and natural access control reduce risk before any technical control turns on.",
                "Selecao do local, defesa em camadas, distância de afastamento e princípios de CPTED como vigilância natural e controle natural de acesso reduzem risco antes de qualquer controle técnico entrar em ação."
              )
            ),
            conceptBlock(
              "critical-rooms",
              t("Critical rooms need design, not improvisation", "Salas críticas precisam de projeto, não de improviso"),
              t(
                "Wiring closets, server rooms, evidence storage, and media facilities need restricted access, logging, environmental monitoring, and careful placement away from casual traffic and avoidable hazards.",
                "Wiring closets, salas de servidores, armazenamento de evidências e instalacoes de mídia precisam de acesso restrito, logging, monitoramento ambiental e posicionamento cuidadoso longe de tráfego casual e de riscos evitaveis."
              )
            ),
            conceptBlock(
              "environmental-controls",
              t("Power, HVAC, and fire controls are security controls", "Energia, HVAC e controles de incêndio são controles de segurança"),
              t(
                "Surge protection, UPS, generators, separate power circuits, humidity and temperature control, and the right suppression system help decide whether assets survive faults and disasters without preventable secondary damage.",
                "Protetores contra surtos, UPS, geradores, circuitos de energia separados, controle de umidade e temperatura e o sistema certo de supressão ajudam a decidir se ativos sobrevivem a falhas e desastres sem dano secundario evitavel."
              )
            ),
            conceptBlock(
              "system-lifecycle",
              t("Lifecycle thinking keeps security alive after launch", "Pensar em ciclo de vida mantém a segurança viva depois do lançamento"),
              t(
                "Requirements, design, development, testing, deployment, operations, maintenance, and retirement all need security decisions. A system that is secure in design but abandoned in operations is not truly secure.",
                "Requisitos, design, desenvolvimento, testes, implantação, operação, manutenção e aposentadoria todos precisam de decisões de segurança. Um sistema seguro no design, mas abandonado na operação, não é realmente seguro."
              )
            ),
            movieCueBlock({
              title: t("Die Hard", "Duro de Matar"),
              cue: t(
                "Think about how building layout, utilities, access paths, and operational assumptions shaped what held up and what failed under pressure.",
                "Pense em como o layout do edificio, utilidades, caminhos de acesso e premissas operacionais moldaram o que resistiu e o que falhou sob pressão."
              ),
              body: t(
                "Use that cue for facility security: architecture includes the space, the support systems, and the system's life after day one.",
                "Use essa pista para segurança de instalacoes: arquitetura inclui o espaço, os sistemas de suporte e a vida do sistema depois do primeiro dia."
              )
            }),
            keyPointsBlock(
              t(
                "Design the site, the critical rooms, the environment, and the lifecycle together. Security fails when facilities and operations are treated as afterthoughts.",
                "Projete o local, as salas críticas, o ambiente e o ciclo de vida em conjunto. A segurança falha quando instalacoes e operações são tratadas como algo para depois."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which principle is MOST directly associated with using building layout, visibility, and natural boundaries to discourage crime?",
              "Qual princípio esta MAIS diretamente associado ao uso de layout do edificio, visibilidade e limites naturais para desencorajar crime?"
            ),
            supportText: t(
              "Look for the architectural approach that shapes behavior before technical enforcement begins.",
              "Procure a abordagem arquitetural que molda comportamento antes de a aplicação técnica começar."
            ),
            correctRationale: t(
              "Crime Prevention Through Environmental Design uses space design, visibility, and controlled access cues to reduce the chance of crime and unauthorized behavior.",
              "Crime Prevention Through Environmental Design usa design do espaço, visibilidade e pistas de acesso controlado para reduzir a chance de crime e comportamento não autorizado."
            ),
            remediationNote: t(
              "Fire suppression and HVAC are important facility controls, but this question is about architecture that shapes behavior.",
              "Supressão de incêndio e HVAC são controles importantes de instalação, mas esta pergunta trata de arquitetura que molda comportamento."
            ),
            options: [
              option(
                "A",
                true,
                t("Crime Prevention Through Environmental Design (CPTED)", "Crime Prevention Through Environmental Design (CPTED)"),
                t("Correct. CPTED is the architectural approach described.", "Correto. CPTED e a abordagem arquitetural descrita.")
              ),
              option(
                "B",
                false,
                t("Differential backup strategy", "Estratégia de backup diferencial"),
                t("Not best. Backup strategy is unrelated to natural surveillance and physical layout design.", "Não é a melhor. Estratégia de backup não se relaciona com vigilância natural e com design de layout físico.")
              ),
              option(
                "C",
                false,
                t("Output Feedback mode (OFB)", "Modo Output Feedback (OFB)"),
                t("Not best. OFB is a cryptographic mode, not a facility-design principle.", "Não é a melhor. OFB e um modo criptográfico, não um princípio de design de instalacoes.")
              )
            ]
          }
        })
      ]
    },
    {
      number: 4,
      slug: "communication-and-network-security",
      estimatedMinutes: 56,
      title: t("Communication and Network Security", "Segurança em Comunicação e Redes"),
      summary: t(
        "Learn how network design protects data in motion and limits attacker movement.",
        "Aprenda como o design de rede protege dados em movimento e limita o movimento do atacante."
      ),
      objective: t(
        "Learn network basics, secure channels, wireless, segmentation, and partner links while keeping real attack paths in view.",
        "Aprenda conceitos básicos de rede, canais seguros, wireless, segmentação e links com parceiros sem perder de vista os caminhos reais de ataque."
      ),
      lessons: [
        lesson({
          slug: "networking-models-encapsulation-and-ports",
          estimatedMinutes: 8,
          title: t("Networking models, encapsulation, and ports", "Modelos de rede, encapsulamento e portas"),
          summary: t(
            "Learn what each network layer does and where common controls fit.",
            "Aprenda o que cada camada de rede faz e onde os controles mais comuns se encaixam."
          ),
          objective: t(
            "Compare OSI and TCP/IP, explain encapsulation, and map devices and ports to the right layers.",
            "Compare OSI e TCP/IP, explique encapsulamento e relacione dispositivos e portas às camadas corretas."
          ),
          blocks: [
            introBlock(
              t(
                "Many network questions get easier when you stop memorizing isolated facts and ask where the function lives in the stack. Layers explain why some controls inspect content, some route packets, and some only move bits.",
                "Muitas questões de rede ficam mais fáceis quando você para de memorizar fatos soltos e pergunta onde a função vive na pilha. Camadas explicam por que alguns controles inspecionam conteúdo, alguns roteiam pacotes e alguns apenas movem bits."
              )
            ),
            conceptBlock(
              "osi-vs-tcpip",
              t("OSI and TCP/IP are maps, not rivals", "OSI e TCP/IP são mapas, não rivais"),
              t(
                "The OSI model gives seven layers for thinking and teaching, while TCP/IP describes the practical internet stack more compactly. The value is knowing which functions belong together and where a control fits best.",
                "O modelo OSI oferece sete camadas para pensar e ensinar, enquanto TCP/IP descreve a pilha prática da internet de forma mais compacta. O valor esta em saber quais funções ficam juntas e onde um controle se encaixa melhor."
              )
            ),
            conceptBlock(
              "encapsulation",
              t("Encapsulation explains how controls stack together", "Encapsulamento explica como controles se empilham"),
              t(
                "Application data is wrapped by transport, network, and link information as it moves down the stack, then unwrapped on the receiving side. That is why TLS, VPNs, and tunneling can protect or hide traffic at different layers.",
                "Dados de aplicação são envolvidos por informações de transporte, rede e enlace ao descer pela pilha e depois desembrulhados no destino. Por isso TLS, VPNs e tunelamento conseguem proteger ou ocultar tráfego em camadas diferentes."
              )
            ),
            conceptBlock(
              "devices-and-pdus",
              t("Devices see different parts of the conversation", "Dispositivos enxergam partes diferentes da conversa"),
              t(
                "Hubs and repeaters live close to bits, switches work with frames and MAC information, routers move packets based on logical addressing, and application-aware controls inspect deeper content and behavior.",
                "Hubs e repetidores vivem perto dos bits, switches trabalham com frames e informação de MAC, roteadores movem pacotes com base em endereçamento lógico, e controles conscientes de aplicação inspecionam conteúdo e comportamento mais profundos."
              )
            ),
            conceptBlock(
              "well-known-ports",
              t("Port knowledge is context, not trivia", "Conhecimento de portas e contexto, não trivialidade"),
              t(
                "Knowing common ports such as 22 for SSH, 53 for DNS, 443 for HTTPS, 3389 for RDP, and 1812 for RADIUS helps you read firewall rules, troubleshoot flows, and spot suspicious exposure or misuse.",
                "Conhecer portas comuns como 22 para SSH, 53 para DNS, 443 para HTTPS, 3389 para RDP e 1812 para RADIUS ajuda a ler regras de firewall, analisar fluxos e perceber exposição ou uso suspeito."
              )
            ),
            movieCueBlock({
              title: t("Inception", "A Origem"),
              cue: t(
                "Think about layers inside layers, where what looks simple on the surface is wrapped by deeper structure.",
                "Pense em camadas dentro de camadas, em que o que parece simples na superfície esta envolvido por uma estrutura mais profunda."
              ),
              body: t(
                "Use that cue for encapsulation and layered controls: traffic can be understood and protected differently depending on which layer you are looking at.",
                "Use essa pista para encapsulamento e controles em camadas: o tráfego pode ser entendido e protegido de formas diferentes dependendo da camada observada."
              )
            }),
            keyPointsBlock(
              t(
                "Use the stack as a map. Encapsulation explains layered protection. Devices and controls differ because each layer sees different parts of the traffic.",
                "Use a pilha como mapa. Encapsulamento explica a proteção em camadas. Dispositivos e controles diferem porque cada camada enxerga partes diferentes do tráfego."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which device is MOST directly responsible for forwarding traffic based on IP addresses rather than MAC addresses?",
              "Qual dispositivo e MAIS diretamente responsável por encaminhar tráfego com base em endereços IP e não ém endereços MAC?"
            ),
            supportText: t(
              "Choose the device that routes at the network layer.",
              "Escolha o dispositivo que roteia na camada de rede."
            ),
            correctRationale: t(
              "Routers work at the network layer and use IP addresses to move packets between networks.",
              "Roteadores trabalham na camada de rede e usam endereços IP para mover pacotes entre redes."
            ),
            remediationNote: t(
              "Switches mainly forward with MAC data, while hubs only repeat signal.",
              "Switches encaminham principalmente com dados de MAC, enquanto hubs apenas repetem sinal."
            ),
            options: [
              option(
                "A",
                true,
                t("Router", "Roteador"),
                t("Correct. Routing is the IP-based forwarding function.", "Correto. Roteamento é a função de encaminhamento baseada em IP.")
              ),
              option(
                "B",
                false,
                t("Switch", "Switch"),
                t("Not best. A switch mainly forwards at layer 2 using frame and MAC information.", "Não é a melhor. Um switch encaminha principalmente na camada 2 usando informações de frame e MAC.")
              ),
              option(
                "C",
                false,
                t("Repeater", "Repetidor"),
                t("Not best. A repeater regenerates signal and does not make IP routing decisions.", "Não é a melhor. Um repetidor regenera sinal e não toma decisões de roteamento IP.")
              )
            ]
          }
        }),
        lesson({
          slug: "addressing-routing-and-traffic-patterns",
          estimatedMinutes: 8,
          title: t("Addressing, routing, and traffic patterns", "Endereçamento, roteamento e padrões de tráfego"),
          summary: t(
            "Learn how addressing and routing shape segmentation, visibility, and performance.",
            "Aprenda como endereçamento e roteamento moldam segmentação, visibilidade e desempenho."
          ),
          objective: t(
            "Apply IPv4 and IPv6, subnetting, routing, and north-south or east-west traffic ideas to security design.",
            "Aplique IPv4 e IPv6, subnetting, roteamento e ideias de tráfego north-south e east-west ao design de segurança."
          ),
          blocks: [
            introBlock(
              t(
                "Networks do not just connect systems. They create paths and boundaries. Address plans and routing choices directly affect how easily systems talk, how well you segment them, and how visible suspicious movement becomes.",
                "Redes não apenas conectam sistemas. Elas criam caminhos e limites. Planos de endereçamento e escolhas de roteamento afetam diretamente quão fácilmente sistemas conversam, quão bem você os segmenta e quão visível o movimento suspeito se torna."
              )
            ),
            conceptBlock(
              "ipv4-ipv6-basics",
              t("IPv4 and IPv6 do the same job with different scale and features", "IPv4 e IPv6 fazem o mesmo trabalho com escala e recursos diferentes"),
              t(
                "IPv4 is still common, but IPv6 greatly expands address space and changes assumptions around autoconfiguration, multicast behavior, and address planning. Security teams need to understand both.",
                "IPv4 ainda e comum, mas IPv6 amplia muito o espaço de endereços e muda premissas sobre autoconfiguração, comportamento multicast e planejamento de endereços. Equipes de segurança precisam entender os dois."
              )
            ),
            conceptBlock(
              "subnetting-and-cidr",
              t("Subnetting is a security design tool", "Subnetting é uma ferramenta de design de segurança"),
              t(
                "CIDR and subnetting break larger ranges into smaller trust zones. Good subnet design reduces broadcast exposure, limits lateral movement, and makes policy enforcement and incident scoping easier to manage.",
                "CIDR e subnetting quebram faixas maiores em zonas menores de confiança. Um bom design de subnet reduz exposição a broadcast, limita movimento lateral e torna mais fácil gerir política e escopo de incidente."
              )
            ),
            conceptBlock(
              "routing-and-paths",
              t("Routing choices affect resilience and attack paths", "Escolhas de roteamento afetam resiliência e caminhos de ataque"),
              t(
                "Static, distance-vector, link-state, and path-vector routing each trade simplicity, scale, and visibility differently. Security architecture depends on knowing what paths exist, how they change, and which ones should never exist.",
                "Roteamento estático, distance-vector, link-state e path-vector trocam simplicidade, escala e visibilidade de maneiras diferentes. A arquitetura de segurança depende de saber quais caminhos existem, como mudam e quais nunca deveriam existir."
              )
            ),
            conceptBlock(
              "traffic-patterns-and-performance",
              t("Traffic direction shows where controls belong", "A direção do tráfego mostra onde os controles devem ficar"),
              t(
                "North-south traffic describes flows in and out of the environment, while east-west traffic describes lateral movement inside it. Metrics such as bandwidth, throughput, latency, jitter, and signal-to-noise ratio matter because overloaded or unstable networks create both risk and blind spots.",
                "Tráfego north-south descreve fluxos para dentro e para fora do ambiente, enquanto east-west descreve movimento lateral dentro dele. Métricas como largura de banda, throughput, latência, jitter e relação sinal-ruído importam porque redes sobrecarregadas ou instáveis criam risco e pontos cegos."
              )
            ),
            movieCueBlock({
              title: t("Mad Max: Fury Road", "Mad Max: Estrada da Furia"),
              cue: t(
                "Think about how every route option changed exposure, speed, and who could intercept the movement.",
                "Pense em como cada opção de rota mudava exposição, velocidade e quem podia interceptar o movimento."
              ),
              body: t(
                "Use that cue for routing and traffic design: path choice is a security decision, not only a performance decision.",
                "Use essa pista para roteamento e design de tráfego: escolha de caminho é uma decisão de segurança, não apenas de desempenho."
              )
            }),
            keyPointsBlock(
              t(
                "Addressing creates boundaries. Routing creates paths. Traffic direction and performance metrics tell you where to enforce and where to watch for lateral movement.",
                "Endereçamento cria limites. Roteamento cria caminhos. Direção do tráfego e métricas de desempenho mostram onde aplicar controles e onde observar movimento lateral."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which traffic pattern MOST directly describes lateral communication between servers inside the same data center?",
              "Qual padrão de tráfego descreve MAIS diretamente comunicação lateral entre servidores no mesmo data center?"
            ),
            supportText: t(
              "Choose the term for internal lateral movement, not ingress or egress.",
              "Escolha o termo para movimento lateral interno, não para ingresso ou egresso."
            ),
            correctRationale: t(
              "East-west traffic refers to lateral movement inside a data center or between internal workloads. That is why segmentation and internal monitoring focus heavily on it.",
              "Tráfego east-west se refere a movimento lateral dentro de um data center ou entre workloads internos. Por isso segmentação e monitoramento interno se concentram tanto nele."
            ),
            remediationNote: t(
              "North-south traffic is about flows entering or leaving the environment, not the internal lateral case described here.",
              "Tráfego north-south trata de fluxos que entram ou saem do ambiente, não do caso lateral interno descrito aqui."
            ),
            options: [
              option(
                "A",
                true,
                t("East-west traffic", "Tráfego east-west"),
                t("Correct. East-west describes lateral internal flows.", "Correto. East-west descreve fluxos internos laterais.")
              ),
              option(
                "B",
                false,
                t("North-south traffic", "Tráfego north-south"),
                t("Not best. North-south is traffic entering or leaving the environment.", "Não é a melhor. North-south é o tráfego que entra ou sai do ambiente.")
              ),
              option(
                "C",
                false,
                t("Out-of-band management", "Gerenciamento out-of-band"),
                t("Not best. Out-of-band is a management-network concept, not a label for lateral traffic flow.", "Não é a melhor. Out-of-band é um conceito de rede de gerenciamento, não um rótulo para fluxo lateral."
                )
              )
            ]
          }
        }),
        lesson({
          slug: "secure-protocols-vpns-and-tunneling",
          estimatedMinutes: 8,
          title: t("Secure protocols, VPNs, and tunneling", "Protocolos seguros, VPNs e tunelamento"),
          summary: t(
            "Learn how to choose secure channels instead of using one protocol for everything.",
            "Aprenda como escolher canais seguros em vez de usar um único protocolo para tudo."
          ),
          objective: t(
            "Compare TLS, SSH, IPsec, VPN modes, and tunneling tradeoffs.",
            "Compare TLS, SSH, IPsec, modos de VPN e tradeoffs de tunelamento."
          ),
          blocks: [
            introBlock(
              t(
                "Secure communication is not one protocol choice. It is the decision about which layer should protect the traffic, how endpoints prove identity, and what happens if an attacker tries to sit in the middle.",
                "Comunicação segura não é a escolha de um único protocolo. É a decisão sobre qual camada deve proteger o tráfego, como endpoints provam identidade e o que acontece se um atacante tentar ficar no meio."
              )
            ),
            conceptBlock(
              "tls-and-ssh",
              t("TLS and SSH solve different secure-channel problems", "TLS e SSH resolvem problemas diferentes de canal seguro"),
              t(
                "TLS is the main way to protect application traffic such as HTTPS, while SSH is built for remote administration and secure command or file transfer. Both encrypt traffic, but they fit different interaction patterns.",
                "TLS é a principal forma de proteger tráfego de aplicação, como HTTPS, enquanto SSH foi feito para administração remota e comando ou transferência segura de arquivos. Os dois criptografam o tráfego, mas servem a padrões diferentes de interação."
              )
            ),
            conceptBlock(
              "ipsec-and-vpn-modes",
              t("IPsec protects at the network layer", "IPsec protege na camada de rede"),
              t(
                "IPsec uses pieces such as AH, ESP, security associations, and IKE to protect traffic in transport mode or tunnel mode. Tunnel mode is common for gateway-to-gateway protection, while transport mode is common for host-to-host use.",
                "IPsec usa partes como AH, ESP, security associations e IKE para proteger tráfego em transport mode ou tunnel mode. Tunnel mode e comum para proteção gateway-to-gateway, enquanto transport mode e comum para uso host-to-host."
              )
            ),
            conceptBlock(
              "tunneling-and-multilayer-risk",
              t("Encapsulation can help defenders and attackers", "Encapsulamento pode ajudar defensores e atacantes"),
              t(
                "Tunneling and multilayer protocols give flexibility and encrypted transport, but they can also hide malicious traffic, bypass simple filters, or stretch trust farther than intended when controls are weak.",
                "Tunelamento e protocolos em multicamadas oferecem flexibilidade e transporte criptografado, mas também podem ocultar tráfego malicioso, contornar filtros simples ou estender a confiança além do desejado quando os controles são fracos."
              )
            ),
            conceptBlock(
              "modern-vpn-options",
              t("Modern VPN choices still need identity discipline", "Escolhas modernas de VPN ainda precisam de disciplina de identidade"),
              t(
                "WireGuard, IPsec, SSH tunnels, and TLS-based VPNs differ in performance and design, but all still depend on strong key handling, sound authentication, and clear split-tunnel versus full-tunnel decisions.",
                "WireGuard, IPsec, tuneis SSH e VPNs baseadas em TLS diferem em desempenho e design, mas todas ainda dependem de boa gestão de chaves, autenticação sólida e decisões claras entre split tunnel e full tunnel."
              )
            ),
            movieCueBlock({
              title: t("Mission: Impossible", "Missão: Impossível"),
              cue: t(
                "Think about how getting the message through safely depended on the path, the disguise, and whether the endpoints could trust each other at all.",
                "Pense em como fazer a mensagem chegar com segurança dependia do caminho, do disfarce e de os endpoints poderem ou não confiar um no outro."
              ),
              body: t(
                "Use that cue for secure channels: encryption alone is not enough if authentication, identity, and route design are weak.",
                "Use essa pista para canais seguros: criptografia sozinha não basta se autenticação, identidade e design de rota forem fracos."
              )
            }),
            keyPointsBlock(
              t(
                "Match the protocol to the layer and the use case. Use TLS for application traffic, SSH for admin channels, IPsec for network-layer protection, and always manage identity and keys carefully.",
                "Ajuste o protocolo a camada e ao caso de uso. Use TLS para tráfego de aplicação, SSH para canais administrativos, IPsec para proteção na camada de rede e sempre gerencie identidade e chaves com cuidado."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which statement BEST describes IPsec tunnel mode?",
              "Qual afirmação MELHOR descreve o IPsec em tunnel mode?"
            ),
            supportText: t(
              "Choose the mode most associated with protecting the full packet between gateways.",
              "Escolha o modo mais associado a proteger o pacote inteiro entre gateways."
            ),
            correctRationale: t(
              "In tunnel mode, IPsec encapsulates and protects the entire original packet. That makes it well suited to gateway-to-gateway VPN scenarios.",
              "Em tunnel mode, IPsec encapsula e protege o pacote original inteiro. Isso o torna adequado para cenarios de VPN gateway-to-gateway."
            ),
            remediationNote: t(
              "Transport mode protects the payload while leaving the original IP header visible for host-to-host use.",
              "Transport mode protege o payload enquanto deixa o cabecalho IP original visível para uso host-to-host."
            ),
            options: [
              option(
                "A",
                true,
                t("It encrypts the entire original packet and commonly supports gateway-to-gateway VPNs", "Ele criptografa o pacote original inteiro e comumente suporta VPNs gateway-to-gateway"),
                t("Correct. That is the defining operational pattern of tunnel mode.", "Correto. Esse e o padrão operacional que define o tunnel mode.")
              ),
              option(
                "B",
                false,
                t("It only protects the application payload and cannot be used for VPNs", "Ele protege apenas o payload da aplicação e não pode ser usado para VPNs"),
                t("Not best. Tunnel mode is widely used in VPN design.", "Não é a melhor. Tunnel mode e amplamente usado em design de VPN.")
              ),
              option(
                "C",
                false,
                t("It removes the need for IKE and key management", "Ele élimina a necessidade de IKE e de gestão de chaves"),
                t("Not best. IPsec still depends on negotiation and disciplined key management.", "Não é a melhor. IPsec continua dependendo de negociacao e gestão disciplinada de chaves.")
              )
            ]
          }
        }),
        lesson({
          slug: "segmentation-microsegmentation-and-sdn",
          estimatedMinutes: 8,
          title: t("Segmentation, microsegmentation, and SDN", "Segmentação, microsegmentação e SDN"),
          summary: t(
            "Learn how segmentation and SDN limit lateral movement.",
            "Aprenda como segmentação e SDN limitam movimento lateral."
          ),
          objective: t(
            "Apply physical segmentation, VLANs, VRF, VPNs, distributed firewalls, and software-defined controls to reduce lateral movement.",
            "Aplique segmentação física, VLANs, VRF, VPNs, firewalls distribuídos e controles definidos por software para reduzir movimento lateral."
          ),
          blocks: [
            introBlock(
              t(
                "Flat networks are convenient until an attacker gets in. Segmentation is how architecture turns one compromise from an organizational crisis into a localized problem.",
                "Redes planas são convenientes até um atacante entrar. Segmentação e como a arquitetura transforma um comprometimento de crise organizacional em problema localizado."
              )
            ),
            conceptBlock(
              "physical-vs-logical-segmentation",
              t("Physical and logical segmentation solve the same problem with different strength", "Segmentação física e lógica resolvem o mesmo problema com força diferente"),
              t(
                "Physical separation gives the strongest boundary but costs more. Logical controls such as VLANs, VPNs, VRF, and virtual domains are more flexible, but they depend on correct configuration and disciplined management.",
                "Separacao física fornece o limite mais forte, mas custa mais. Controles lógicos como VLANs, VPNs, VRF e dominios virtuais são mais flexiveis, mas dependem de configuração correta e gestão disciplinada."
              )
            ),
            conceptBlock(
              "microsegmentation",
              t("Microsegmentation shrinks the attacker's neighborhood", "Microsegmentação diminui a vizinhanca do atacante"),
              t(
                "Microsegmentation pushes enforcement inward with workload-level rules, distributed firewalls, and smaller trust zones. It is one of the most practical ways to support zero trust and reduce east-west abuse.",
                "Microsegmentação leva a aplicação de regras para dentro com políticas no nível do workload, firewalls distribuídos e zonas menores de confiança. É uma das formas mais práticas de apoiar zero trust e reduzir abuso east-west."
              )
            ),
            conceptBlock(
              "sdn-and-vxlan",
              t("Software-defined networking changes where control lives", "Software-defined networking muda ondé o controle fica"),
              t(
                "SDN separates the control plane from the forwarding plane and lets central policy decisions shape many devices consistently. VXLAN and similar overlays extend segmentation beyond simple layer-2 boundaries.",
                "SDN separa o control plane do forwarding plane e deixa decisões centrais de política moldarem muitos dispositivos de forma consistente. VXLAN e overlays parecidos estendem a segmentação além de limites simples de camada 2."
              )
            ),
            conceptBlock(
              "out-of-band-and-air-gap",
              t("Some functions deserve stronger isolation than production traffic", "Algumas funções merecem isolamento mais forte do que o tráfego de produção"),
              t(
                "Out-of-band management and air-gapped designs exist because some administrative or safety-critical paths should not share trust assumptions with ordinary user traffic. These models are expensive, but sometimes they are the right answer.",
                "Gerenciamento out-of-band e designs air-gapped existem porque alguns caminhos administrativos ou críticos para segurança não devem compartilhar premissas de confiança com o tráfego comum de usuários. Esses modelos são caros, mas as vezes são a resposta certa."
              )
            ),
            movieCueBlock({
              title: t("The Matrix", "Matrix"),
              cue: t(
                "Think about how one environment contained hidden layers and controlled paths that changed who could move where.",
                "Pense em como um ambiente continha camadas ocultas e caminhos controlados que mudavam quem podia se mover para onde."
              ),
              body: t(
                "Use that cue for segmentation: security improves when movement is restricted by design instead of only watched after the fact.",
                "Use essa pista para segmentação: a segurança melhora quando o movimento e restringido por design em vez de apenas observado depois do fato."
              )
            }),
            keyPointsBlock(
              t(
                "Segment physically when you must, logically when you can, and at fine granularity when lateral movement is the real threat. Centralized policy still depends on correct implementation.",
                "Segmente fisicamente quando necessário, lógicamente quando possível e com granularidade fina quando movimento lateral for a ameaca real. Política centralizada ainda depende de implementação correta."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY security advantage of microsegmentation?",
              "Qual é a vantagem de segurança PRIMARIA da microsegmentação?"
            ),
            supportText: t(
              "Choose the benefit most tied to limiting lateral movement between workloads.",
              "Escolha o beneficio mais ligado a limitar movimento lateral entre workloads."
            ),
            correctRationale: t(
              "Microsegmentation limits east-west movement by creating much smaller trust zones and enforcing policy close to the workload itself.",
              "Microsegmentação limita movimento east-west ao criar zonas de confiança muito menores e aplicar política perto do próprio workload."
            ),
            remediationNote: t(
              "Microsegmentation can support visibility and compliance, but its clearest security value is reducing attacker movement after initial compromise.",
              "Microsegmentação pode apoiar visibilidade e compliance, mas seu valor de segurança mais claro e reduzir o movimento do atacante após o comprometimento inicial."
            ),
            options: [
              option(
                "A",
                true,
                t("It reduces lateral movement by enforcing smaller trust zones", "Ela reduz movimento lateral ao aplicar zonas menores de confiança"),
                t("Correct. That is the main design goal.", "Correto. Esse e o principal objetivo do design.")
              ),
              option(
                "B",
                false,
                t("It removes the need for authentication between services", "Ela élimina a necessidade de autenticação entre serviços"),
                t("Not best. Smaller segments increase, not remove, the need for strong identity and policy enforcement.", "Não é a melhor. Segmentos menores aumentam, não removem, a necessidade de forte identidade e aplicação de política.")
              ),
              option(
                "C",
                false,
                t("It guarantees higher bandwidth on every connection", "Ela garante maior largura de banda em toda conexão"),
                t("Not best. Performance may change, but bandwidth guarantee is not the main security goal.", "Não é a melhor. O desempenho pode mudar, mas garantia de largura de banda não é o principal objetivo de segurança.")
              )
            ]
          }
        }),
        lesson({
          slug: "wireless-cellular-and-edge-connectivity",
          estimatedMinutes: 8,
          title: t("Wireless, cellular, and edge connectivity", "Conectividade sem fio, celular e de borda"),
          summary: t(
            "Learn the main wireless and edge risks and the safeguards that fit them.",
            "Aprenda os principais riscos de wireless e borda e as salvaguardas que combinam com eles."
          ),
          objective: t(
            "Compare Wi-Fi, Bluetooth, RFID, NFC, Zigbee, satellite, CDN, and cellular tradeoffs and choose realistic safeguards.",
            "Compare os tradeoffs de Wi-Fi, Bluetooth, RFID, NFC, Zigbee, satélite, CDN e celular e escolha salvaguardas realistas."
          ),
          blocks: [
            introBlock(
              t(
                "Wireless and edge technologies trade physical convenience for a less visible boundary. The signal does not stop at your wall, and the provider does not remove your responsibility.",
                "Tecnologias sem fio e de borda trocam conveniência física por um limite menos visível. O sinal não para na sua parede, e o provedor não tira sua responsabilidade."
              )
            ),
            conceptBlock(
              "wifi-security-evolution",
              t("Wi-Fi security improved because weak defaults were exploited", "Segurança Wi-Fi melhorou porque padrões fracos eram explorados"),
              t(
                "WEP and TKIP are legacy because design weaknesses made attacks practical. WPA2 and WPA3 improve confidentiality and authentication, especially when paired with enterprise 802.1X and strong EAP methods instead of shared passwords.",
                "WEP e TKIP são legados porque fraquezas de design tornaram ataques práticos. WPA2 e WPA3 melhoram confidencialidade e autenticação, especialmente quando combinados com 802.1X empresarial e métodos EAP fortes em vez de senhas compartilhadas."
              )
            ),
            conceptBlock(
              "local-radio-risks",
              t("Short-range wireless still creates real exposure", "Sem fio de curto alcance ainda cria exposição real"),
              t(
                "Bluetooth, RFID, and NFC are useful because they work with proximity, but that same convenience can enable eavesdropping, rogue pairing, device impersonation, and unwanted data collection when discovery and trust settings are weak.",
                "Bluetooth, RFID e NFC são úteis porque funcionam por proximidade, mas essa mesma conveniência pode permitir espionagem, pareamento malicioso, personificacao de dispositivo e coleta indesejada de dados quando descoberta e configurações de confiança são fracas."
              )
            ),
            conceptBlock(
              "zigbee-satellite-cellular",
              t("Not every wireless problem looks like Wi-Fi", "Nem todo problema sem fio parece Wi-Fi"),
              t(
                "Zigbee, satellite, and cellular each bring different limits around latency, coverage, encryption boundaries, and trust in outside infrastructure. A device may be encrypted up to the tower and still expose data later on the provider path if end-to-end protection is missing.",
                "Zigbee, satélite e celular trazem limites diferentes em latência, cobertura, limites de criptografia e confiança em infraestrutura externa. Um dispositivo pode estar criptografado até a torre e ainda expor dados depois no caminho do provedor se faltar proteção ponta a ponta."
              )
            ),
            conceptBlock(
              "edge-and-cdn",
              t("Edge and CDN architecture improve speed by moving trust outward", "Arquitetura de borda e CDN melhora a velocidade ao mover a confiança para fora"),
              t(
                "Content distribution networks and edge services lower latency by placing services closer to users, but they require disciplined ingress, egress, peering, certificate, and caching controls because the boundary is no longer only the central data center.",
                "Content distribution networks e serviços de borda reduzem a latência ao colocar serviços mais perto dos usuários, mas exigem disciplina em controles de ingresso, egresso, peering, certificados e cache porque o limite deixa de ser apenas o data center central."
              )
            ),
            movieCueBlock({
              title: t("Enemy of the State", "Inimigo do Estado"),
              cue: t(
                "Think about how location, signal, and provider-controlled infrastructure created exposure even when the target was always moving.",
                "Pense em como localização, sinal e infraestrutura controlada por provedores criavam exposição mesmo quando o alvo estava sempre se movendo."
              ),
              body: t(
                "Use that cue for mobile and wireless security: convenience and coverage always need to be balanced with trust in the endpoint and the channel.",
                "Use essa pista para segurança movel e sem fio: conveniência e cobertura sempre precisam ser equilibradas com confiança no endpoint e no canal."
              )
            }),
            keyPointsBlock(
              t(
                "Prefer modern Wi-Fi standards, strong EAP methods, and disabled weak onboarding features. Treat short-range and carrier-based links as real trust boundaries that still need end-to-end protection.",
                "Prefira padrões Wi-Fi modernos, métodos EAP fortes e recursos fracos de onboarding desativados. Trate links de curto alcance e baseados em operadora como limites reais de confiança que ainda precisam de proteção ponta a ponta."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the BEST protection against attacks abusing Wi-Fi Protected Setup (WPS)?",
              "Qual é a MELHOR proteção contra ataques que abusam do Wi-Fi Protected Setup (WPS)?"
            ),
            supportText: t(
              "Choose the answer that removes the weak feature instead of working around it.",
              "Escolha a resposta que remove o recurso fraco em vez de tentar contorna-lo."
            ),
            correctRationale: t(
              "The best control is to disable WPS, especially PIN-based onboarding, because the feature itself has well-known brute-force weaknesses.",
              "O melhor controle e desabilitar WPS, especialmente onboarding por PIN, porque o próprio recurso tem fraquezas conhecidas para brute force."
            ),
            remediationNote: t(
              "Changing the SSID or hiding it does not fix the core weakness in the onboarding method.",
              "Mudar o SSID ou oculta-lo não corrige a fraqueza central do metodo de onboarding."
            ),
            options: [
              option(
                "A",
                true,
                t("Disable WPS", "Desabilitar WPS"),
                t("Correct. Removing the weak mechanism is the strongest answer.", "Correto. Remover o mecanismo fraco é a resposta mais forte.")
              ),
              option(
                "B",
                false,
                t("Broadcast the SSID less often", "Transmitir o SSID com menos frequencia"),
                t("Not best. SSID visibility is not the root of the WPS weakness.", "Não é a melhor. Visibilidade do SSID não é a raiz da fraqueza do WPS.")
              ),
              option(
                "C",
                false,
                t("Rely on MAC filtering alone", "Confiar apenas em filtragem por MAC"),
                t("Not best. MAC filtering is easily bypassed and does not fix the onboarding flaw.", "Não é a melhor. Filtragem por MAC é fácilmente contornada e não corrige a falha de onboarding.")
              )
            ]
          }
        }),
        lesson({
          slug: "network-components-media-and-access-control",
          estimatedMinutes: 8,
          title: t("Network components, media, and access control", "Componentes de rede, mídia e controle de acesso"),
          summary: t(
            "Learn what routers, switches, NAC, media, and proxies actually control.",
            "Aprenda o que roteadores, switches, NAC, mídia e proxies realmente controlam."
          ),
          objective: t(
            "Protect core components, transmission media, NAC, proxies, and endpoints based on what each one controls.",
            "Proteja componentes centrais, mídia de transmissão, NAC, proxies e endpoints com base no que cada um controla."
          ),
          blocks: [
            introBlock(
              t(
                "Trust in a network is built from the devices and media that carry traffic. If you misunderstand what each element controls, you place the wrong safeguard in the wrong place and leave the real gap open.",
                "A confiança em uma rede e construída a partir dos dispositivos e da mídia que carregam o tráfego. Se você entende errado o que cada elemento controla, coloca a salvaguarda errada no lugar errado e deixa a lacuna real aberta."
              )
            ),
            conceptBlock(
              "core-components",
              t("Routers, switches, and access points shape trust differently", "Roteadores, switches e access points moldam a confiança de formas diferentes"),
              t(
                "Routers create path choice and boundary exposure, switches define internal connectivity and VLAN enforcement, and access points expose the wired network to wireless clients. Redundant power and resilient configuration matter because these are high-value infrastructure nodes.",
                "Roteadores criam escolha de caminho e exposição de limites, switches definem conectividade interna e aplicação de VLAN, e access points expõem a rede cabeada a clientes sem fio. Energia redundante e configuração resiliente importam porque esses são nós de infraestrutura de alto valor."
              )
            ),
            conceptBlock(
              "transmission-media",
              t("Media security includes quality and physical exposure", "Segurança da mídia inclui qualidade e exposição física"),
              t(
                "Copper, fiber, coaxial, and wireless media differ in distance, throughput, interference risk, and physical tapping risk. Media choices affect both availability and the difficulty of eavesdropping or disruption.",
                "Mídias de cobre, fibra, coaxial e sem fio diferem em distância, throughput, risco de interferência e risco de escuta física. Escolhas de mídia afetam disponibilidade e a dificuldade de espionagem ou interrupção."
              )
            ),
            conceptBlock(
              "nac",
              t("NAC decides who gets to join the network", "NAC decide quem pode entrar na rede"),
              t(
                "Network access control checks device posture and policy alignment before or after connection. Agent-based NAC sees more deeply, while agentless NAC supports unmanaged and diverse devices more easily.",
                "Network access control verifica a postura do dispositivo e o alinhamento com a política antes ou depois da conexão. NAC com agente enxerga mais profundamente, enquanto NAC sem agente suporta com mais fácilidade dispositivos não gerenciados e diversos."
              )
            ),
            conceptBlock(
              "proxies-and-endpoints",
              t("Proxies and endpoint controls complement the network", "Proxies e controles de endpoint complementam a rede"),
              t(
                "Forward proxies shape user access to outside resources, reverse proxies shield internal services, and endpoint security handles the reality that compromise often starts on the host even when perimeter controls exist.",
                "Forward proxies moldam o acesso do usuário a recursos externos, reverse proxies protegem serviços internos e segurança de endpoint lida com a realidade de que o comprometimento muitas vezes começa no host mesmo quando controles de perímetro existem."
              )
            ),
            movieCueBlock({
              title: t("The Italian Job", "Uma Saida de Mestre"),
              cue: t(
                "Think about how movement depended on understanding every vehicle, route, and choke point, not just the final destination.",
                "Pense em como o movimento dependia de entender cada veículo, rota e gargalo, não apenas o destino final."
              ),
              body: t(
                "Use that cue for component security: each network element contributes differently to exposure, resilience, and control.",
                "Use essa pista para segurança de componentes: cada elemento de rede contribui de forma diferente para exposição, resiliência e controle."
              )
            }),
            keyPointsBlock(
              t(
                "Secure the path devices, the transmission media, the admission controls, and the endpoints together. Network trust is a chain, not one appliance.",
                "Proteja juntos os dispositivos de caminho, a mídia de transmissão, os controles de admissão e os endpoints. A confiança de rede é uma corrente, não um único appliance."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which NAC approach generally provides deeper visibility into device posture but requires software on the endpoint?",
              "Qual abordagem de NAC geralmente fornece visibilidade mais profunda da postura do dispositivo, mas exige software no endpoint?"
            ),
            supportText: t(
              "Choose the model that inspects more deeply because it runs on the device.",
              "Escolha o modelo que inspeciona mais profundamente porque roda no próprio dispositivo."
            ),
            correctRationale: t(
              "Agent-based NAC installs software on the endpoint and can therefore examine local security posture in more detail than agentless approaches.",
              "NAC com agente instala software no endpoint e, por isso, consegue examinar a postura local de segurança com mais detalhe do que abordagens sem agente."
            ),
            remediationNote: t(
              "Agentless NAC is easier for unmanaged devices, but it usually sees less than a local agent can see.",
              "NAC sem agente e mais fácil para dispositivos não gerenciados, mas normalmente enxerga menos do que um agente local consegue ver."
            ),
            options: [
              option(
                "A",
                true,
                t("Agent-based NAC", "NAC com agente"),
                t("Correct. Local agents allow deeper posture assessment.", "Correto. Agentes locais permitem avaliação mais profunda de postura.")
              ),
              option(
                "B",
                false,
                t("Agentless NAC", "NAC sem agente"),
                t("Not best. Agentless is easier to deploy broadly but usually provides less detailed endpoint visibility.", "Não é a melhor. Sem agente e mais fácil de implantar amplamente, mas normalmente fornece menos visibilidade detalhada do endpoint.")
              ),
              option(
                "C",
                false,
                t("Passive optical tap", "Tap optico passivo"),
                t("Not best. A tap may help observe traffic, but it is not a NAC admission-control approach.", "Não é a melhor. Um tap pode ajudar a observar tráfego, mas não é uma abordagem de controle de admissão de NAC.")
              )
            ]
          }
        }),
        lesson({
          slug: "secure-channels-remote-and-third-party-links",
          estimatedMinutes: 8,
          title: t("Secure channels, remote access, and third-party links", "Canais seguros, acesso remoto e links de terceiros"),
          summary: t(
            "Learn how to secure remote access and third-party links without overtrust.",
            "Aprenda como proteger acesso remoto e links de terceiros sem confiar demais."
          ),
          objective: t(
            "Protect remote access, voice and collaboration, backhaul, and partner connectivity with encryption, least privilege, and monitoring.",
            "Proteja acesso remoto, voz e colaboração, backhaul e conectividade com parceiros usando criptografia, least privilege e monitoramento."
          ),
          blocks: [
            introBlock(
              t(
                "Boundary problems grow when someone outside the usual office still needs privileged access or reliable communication. The channel may be remote, cloud-hosted, voice-oriented, or partner-owned, but the trust decision is still yours.",
                "Problemas de fronteira crescem quando alguém fora do escritório usual ainda precisa de acesso privilegiado ou comunicação confiável. O canal pode ser remoto, hospedado em nuvem, orientado a voz ou de um parceiro, mas a decisão de confiança continua sendo sua."
              )
            ),
            conceptBlock(
              "voice-video-and-collaboration",
              t("Collaboration traffic needs confidentiality and quality", "Tráfego de colaboração precisa de confidencialidade e qualidade"),
              t(
                "VoIP, conferencing, and collaboration tools depend on bandwidth, low jitter, and protocols such as SIP, SRTP, or secure web channels. If identity, encryption, and QoS are weak, user experience and security both get worse.",
                "VoIP, conferências e ferramentas de colaboração dependem de largura de banda, baixo jitter e protocolos como SIP, SRTP ou canais web seguros. Se identidade, criptografia e QoS são fracos, experiencia do usuário e segurança pioram juntas."
              )
            ),
            conceptBlock(
              "remote-access",
              t("Remote access expands the office into untrusted space", "Acesso remoto expande o escritório para espaço não confiável"),
              t(
                "Remote-node access, remote control, service-specific access, VDI, jump boxes, and cloud desktops all solve remote work differently, but each one needs strong authentication, encrypted channels, restricted permissions, and endpoint discipline.",
                "Acesso remoto de no, controle remoto, acesso específico a serviço, VDI, jump boxes e desktops em nuvem resolvem o trabalho remoto de formas diferentes, mas todos precisam de autenticação forte, canais criptografados, permissões restritas e disciplina de endpoint."
              )
            ),
            conceptBlock(
              "backhaul-and-satellite",
              t("Not every remote path looks like a VPN over broadband", "Nem todo caminho remoto parecé uma VPN sobre banda larga"),
              t(
                "Backhaul networks, MPLS, metro ethernet, VSAT, and low-earth-orbit satellite links bring different tradeoffs in latency, resilience, and provider trust. Encryption and monitoring still matter even when the transport looks specialized or carrier-managed.",
                "Redes de backhaul, MPLS, metro ethernet, VSAT e links por satélite de baixa órbita trazem tradeoffs diferentes em latência, resiliência e confiança no provedor. Criptografia e monitoramento continuam importando mesmo quando o transporte parece especializado ou gerenciado por operadora."
              )
            ),
            conceptBlock(
              "third-party-connectivity",
              t("Partner links should be governed as risk, not friendship", "Links com parceiros devem ser governados como risco, não como amizade"),
              t(
                "MOUs, MOAs, and interconnection security agreements matter because once a third-party network is connected, its weaknesses become part of your threat model. Least privilege, logging, segmentation, and review should shape every partner connection.",
                "MOUs, MOAs e interconnection security agreements importam porque, depois qué uma rede de terceiro e conectada, as fraquezas dela passam a fazer parte do seu threat model. Least privilege, logging, segmentação e revisão devem moldar toda conexão com parceiro."
              )
            ),
            movieCueBlock({
              title: t("The Bourne Ultimatum", "O Ultimato Bourne"),
              cue: t(
                "Think about how communication was useful only when the channel, the endpoints, and the route were trusted enough for the mission.",
                "Pense em como a comunicação só era útil quando canal, endpoints e rota eram confiáveis o bastante para a missão."
              ),
              body: t(
                "Use that cue for boundary channels: remote and third-party links are security architecture decisions, not just networking tasks.",
                "Use essa pista para canais de fronteira: links remotos e de terceiros são decisões de arquitetura de segurança, não apenas tarefas de rede."
              )
            }),
            keyPointsBlock(
              t(
                "Treat remote access and partner connectivity as expanded trust boundaries. Encrypt the path, authenticate the endpoint, limit privilege, and monitor use.",
                "Trate acesso remoto e conectividade de parceiros como limites ampliados de confiança. Criptografe o caminho, autentique o endpoint, limite o privilégio e monitore o uso."
              )
            )
          ],
          exercise: {
            prompt: t(
              "A vendor needs recurring access to a sensitive internal application. What is the MOST important architectural principle to apply first?",
              "Um fornecedor precisa de acesso recorrente a uma aplicação interna sensível. Qual é o princípio arquitetural MAIS importante a aplicar primeiro?"
            ),
            supportText: t(
              "Choose the answer that limits what the third party can reach and do, even after the connection exists.",
              "Escolha a resposta que limita o que o terceiro pode alcancar e fazer, mesmo depois de a conexão existir."
            ),
            correctRationale: t(
              "Least privilege is primary because third-party connectivity should grant only the minimum access needed for the approved task. That reduces abuse, accidental exposure, and blast radius.",
              "Least privilege e primario porque conectividade de terceiros deve conceder apenas o acesso minimo necessário para a tarefa aprovada. Isso reduz abuso, exposição acidental e raio de impacto."
            ),
            remediationNote: t(
              "Encryption and agreements matter, but the first architectural move is to narrow access as much as possible.",
              "Criptografia e acordos importam, mas o primeiro movimento arquitetural e restringir o acesso o maximo possível."
            ),
            options: [
              option(
                "A",
                true,
                t("Apply least privilege and segmented access to the vendor connection", "Aplicar least privilege e acesso segmentado a conexão do fornecedor"),
                t("Correct. Narrow, segmented access is the safest starting point for third-party connectivity.", "Correto. Acesso restrito e segmentado e o ponto de partida mais seguro para conectividade de terceiros.")
              ),
              option(
                "B",
                false,
                t("Give the vendor broad VPN access so troubleshooting is easier", "Dar ao fornecedor amplo acesso por VPN para fácilitar troubleshooting"),
                t("Not best. Convenience-based overaccess is exactly what should be avoided.", "Não é a melhor. Excesso de acesso por conveniência e exatamente o que deve ser evitado.")
              ),
              option(
                "C",
                false,
                t("Hide the application behind a different DNS name and keep the rest unchanged", "Ocultar a aplicação atras de outro nome DNS e manter o resto inalterado"),
                t("Not best. Name changes do not meaningfully reduce third-party privilege or exposure.", "Não é a melhor. Mudanças de nome não reduzem de forma significativa privilégio ou exposição de terceiros.")
              )
            ]
          }
        })
      ]
    },
    {
      number: 5,
      slug: "identity-and-access-management",
      estimatedMinutes: 56,
      title: t("Identity and Access Management", "Gestão de Identidade e Acesso"),
      summary: t(
        "Learn how identities are verified, how access is granted, and how privilege is reviewed and removed over time.",
        "Aprenda como identidades são verificadas, como acesso é concedido e como privilégios são revisados e removidos com o tempo."
      ),
      objective: t(
        "Understand proofing, authentication, authorization, federation, provisioning, and privileged access so trust stays controlled.",
        "Entenda proofing, autenticação, autorização, federação, provisionamento e acesso privilegiado para que a confiança continue sob controle."
      ),
      lessons: [
        lesson({
          slug: "access-control-foundations-and-protected-assets",
          estimatedMinutes: 8,
          title: t("Access-control foundations and protected assets", "Fundamentos de controle de acesso e ativos protegidos"),
          summary: t(
            "Learn who is requesting access, what is being protected, and why that matters.",
            "Aprenda quem pede acesso, o que está sendo protegido e por que isso importa."
          ),
          objective: t(
            "Differentiate physical and logical access, subjects and objects, and what IAM really protects.",
            "Diferencie acesso físico e lógico, sujeitos e objetos, e o que IAM realmente protege."
          ),
          blocks: [
            introBlock(
              t(
                "Identity and access management is not only about logging into applications. It decides who can enter facilities, unlock devices, use services, read records, approve transactions, and administer the systems that hold everything together.",
                "Gestão de identidade e acesso não é apenas sobre entrar em aplicações. Ela decide quem pode entrar em instalações, desbloquear dispositivos, usar serviços, ler registros, aprovar transações e administrar os sistemas que mantêm tudo funcionando."
              )
            ),
            conceptBlock(
              "subjects-and-objects",
              t("Subjects request access; objects are what they want", "Sujeitos pedem acesso; objetos são o que eles querem"),
              t(
                "A subject can be a person, process, service account, device, or workload. An object can be a file, database row, API, network, room, or business function. IAM decisions always connect one to the other.",
                "Um sujeito pode ser uma pessoa, processo, conta de serviço, dispositivo ou workload. Um objeto pode ser um arquivo, linha de banco, API, rede, sala ou função de negócio. Decisões de IAM sempre ligam um ao outro."
              )
            ),
            conceptBlock(
              "physical-and-logical",
              t("Physical and logical access are different paths to the same risk", "Acesso físico e lógico são caminhos diferentes para o mesmo risco"),
              t(
                "A badge that opens a data center and an account that opens a cloud console both express trust. Physical and logical access should follow the same governance mindset even when the technology is different.",
                "Um cracha que abre um data center é uma conta que abre um console de nuvem ambos expressam confiança. Acesso físico e lógico devem seguir a mesma mentalidade de governança, mesmo quando a tecnologia e diferente."
              )
            ),
            conceptBlock(
              "identity-as-perimeter",
              t("Identity became the perimeter because network location is no longer enough", "Identidade virou o perímetro porque localização de rede não basta mais"),
              t(
                "Remote work, SaaS, APIs, mobile devices, and third-party integrations mean network location is no longer a reliable sign of trust. Strong identity and context-aware authorization now carry much of the old perimeter job.",
                "Trabalho remoto, SaaS, APIs, dispositivos móveis e integrações com terceiros significam que localização de rede não é mais um sinal confiável de confiança. Identidade forte e autorização sensível a contexto agora carregam grande parte do antigo trabalho do perímetro."
              )
            ),
            conceptBlock(
              "what-iam-protects",
              t("IAM protects actions, not just screens", "IAM protege ações, não apenas telas"),
              t(
                "The real question is not who can log in, but who can view payroll, approve payments, rotate keys, release code, unlock a lab, or read customer records. Rights should match business impact, not just a visible screen.",
                "A pergunta real não é quem pode fazer login, mas quem pode ver folha de pagamento, aprovar pagamentos, rotacionar chaves, liberar código, abrir um laboratório ou ler registros de clientes. Direitos devem combinar com o impacto no negócio, não apenas com uma tela visível."
              )
            ),
            movieCueBlock({
              title: t("Now You See Me", "Truque de Mestre"),
              cue: t(
                "Think about how the real power was never on the visible stage. It was in backstage access, trust, and who could trigger which action.",
                "Pense em como o poder real nunca esteve no palco visível. Ele éstava no acesso aos bastidores, na confiança e em quem podia disparar cada ação."
              ),
              body: t(
                "Use that cue for IAM scope: the danger is in what a trusted subject can really do to valuable objects, not just in whether a login page exists.",
                "Use essa pista para o escopo de IAM: o perigo esta no que um sujeito confiável pode realmente fazer com objetos valiosos, não apenas no fato de existir uma tela de login."
              )
            }),
            keyPointsBlock(
              t(
                "Define subjects and objects clearly. Govern physical and logical access with the same discipline. Protect business actions and high-impact functions, not just application sign-ins.",
                "Defina sujeitos e objetos com clareza. Governe acesso físico e lógico com a mesma disciplina. Proteja ações de negócio e funções de alto impacto, não apenas logins em aplicações."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which example is the BEST illustration of an object in IAM terms?",
              "Qual éxemplo e a MELHOR ilustracao de um objeto em termos de IAM?"
            ),
            supportText: t(
              "Choose the protected resource, not the requester.",
              "Escolha o recurso protegido, não quem pede acesso."
            ),
            correctRationale: t(
              "An object is the protected resource, such as a payroll database or an API. The user, device, or process asking for access is the subject.",
              "Um objeto e o recurso protegido, como um banco de folha de pagamento ou uma API. O usuário, dispositivo ou processo que pede acesso e o sujeito."
            ),
            remediationNote: t(
              "Do not confuse the requester with the protected resource.",
              "Não confunda o solicitante com o recurso protegido."
            ),
            options: [
              option(
                "A",
                true,
                t("A payroll database", "Um banco de dados de folha de pagamento"),
                t("Correct. The database is the protected object.", "Correto. O banco de dados e o objeto protegido.")
              ),
              option(
                "B",
                false,
                t("An employee requesting access", "Um funcionário solicitando acesso"),
                t("Not best. The employee is a subject, not the object.", "Não é a melhor. O funcionário e um sujeito, não o objeto.")
              ),
              option(
                "C",
                false,
                t("A service account authenticating to an API", "Uma conta de serviço autenticando em uma API"),
                t("Not best. The service account is also a subject asking for access.", "Não é a melhor. A conta de serviço também e um sujeito pedindo acesso.")
              )
            ]
          }
        }),
        lesson({
          slug: "identification-authentication-and-aaa",
          estimatedMinutes: 8,
          title: t("Identification, authentication, and AAA", "Identificação, autenticação e AAA"),
          summary: t(
            "Learn the difference between identification, authentication, authorization, and accounting.",
            "Aprenda a diferença entre identificação, autenticação, autorização e accounting."
          ),
          objective: t(
            "Differentiate the AAA parts and connect factors and assurance to stronger login decisions.",
            "Diferencie as partes do AAA e conecte fatores e assurance a decisões de login mais fortes."
          ),
          blocks: [
            introBlock(
              t(
                "AAA is easy to recite and easy to misuse. Teams often call a login page 'security' even when it only collects a name, performs weak proof, and grants rights without recording what happens next.",
                "AAA é fácil de recitar é fácil de usar mal. Equipes frequentemente chamam uma tela de login de 'segurança' mesmo quando ela apenas coleta um nome, faz prova fraca e concede direitos sem registrar o que acontece depois."
              )
            ),
            conceptBlock(
              "identification-vs-authentication",
              t("Claiming an identity is not proving it", "Afirmar uma identidade não é prová-la"),
              t(
                "Identification is the claim, such as a username or presented badge. Authentication is the proof that the claimant really controls the credential, factor, or trusted trait tied to that identity.",
                "Identificação e a afirmação, como um nome de usuário ou um cracha apresentado. Autenticação e a prova de que o solicitante realmente controla a credencial, o fator ou a característica confiável ligada a essa identidade."
              )
            ),
            conceptBlock(
              "authorization-and-accounting",
              t("A successful login should not imply unlimited action", "Login bem-sucedido não deve significar ação ilimitada"),
              t(
                "Authorization determines what the authenticated subject may do next. Accounting records what really happened so investigators, auditors, and operators can reconstruct behavior and accountability.",
                "Autorização determina o que o sujeito autenticado pode fazer em seguida. Accounting registra o que realmente aconteceu para que investigadores, auditores e operadores consigam reconstruir comportamento e responsabilidade."
              )
            ),
            conceptBlock(
              "factors-and-assurance",
              t("Factor variety matters only when factors are independent", "Variedade de fatores só importa quando os fatores são independentes"),
              t(
                "Something you know, have, are, do, or where you are can all contribute to authentication, but assurance rises only when the factors are truly different and resistant to the same compromise path.",
                "Algo que você sabe, possui, e, faz ou onde você esta pode contribuir para autenticação, mas assurance só sobe quando os fatores são realmente diferentes e resistentes ao mesmo caminho de comprometimento."
              )
            ),
            conceptBlock(
              "unique-identity-and-auditability",
              t("Unique identity is the foundation of accountability", "Identidade única e a base da responsabilidade"),
              t(
                "Shared accounts make investigation and least privilege harder because actions cannot be tied cleanly to one accountable subject. Unique identities are critical for deterrence and for reliable review.",
                "Contas compartilhadas tornam investigacao e least privilege mais difíceis porque ações não podem ser ligadas com clareza a um único sujeito responsável. Identidades únicas são críticas para dissuasão e para revisão confiável."
              )
            ),
            movieCueBlock({
              title: t("Catch Me If You Can", "Prenda-me Se For Capaz"),
              cue: t(
                "Think about how easy it was to claim identities when proof was weak and recordkeeping was inconsistent.",
                "Pense em como era fácil afirmar identidades quando a prova era fraca e o registro era inconsistente."
              ),
              body: t(
                "Use that cue for AAA: the claim, the proof, the granted rights, and the audit trail must all be strong or the whole chain weakens.",
                "Use essa pista para AAA: a afirmação, a prova, os direitos concedidos e a trilha de auditoria precisam ser fortes ou toda a cadeia enfraquece."
              )
            }),
            keyPointsBlock(
              t(
                "Separate claim from proof, proof from authorization, and authorization from audit evidence. Unique identity and independent factors are essential to trustworthy AAA.",
                "Separe afirmação de prova, prova de autorização e autorização de evidência de auditoria. Identidade única e fatores independentes são essenciais para um AAA confiável."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which option is the BEST example of accounting in an AAA system?",
              "Qual opção e o MELHOR exemplo de accounting em um sistema AAA?"
            ),
            supportText: t(
              "Choose the function that records activity after access is granted.",
              "Escolha a função que registra atividade depois que o acesso e concedido."
            ),
            correctRationale: t(
              "Accounting is the logging and reporting function that records what the subject actually did after identification, authentication, and authorization happened.",
              "Accounting é a função de registro e relatório que documenta o que o sujeito realmente fez depois de identificação, autenticação e autorização."
            ),
            remediationNote: t(
              "Authentication proves identity, but accounting preserves the evidence of what happened after that.",
              "Autenticação prova identidade, mas accounting preserva a evidência do que aconteceu depois."
            ),
            options: [
              option(
                "A",
                true,
                t("Recording which records a user viewed and modified", "Registrar quais registros um usuário visualizou e modificou"),
                t("Correct. That is exactly the type of evidence accounting should produce.", "Correto. Esse e exatamente o tipo de evidência que accounting deve produzir.")
              ),
              option(
                "B",
                false,
                t("Prompting for a password and token", "Solicitar senha e token"),
                t("Not best. That is part of authentication, not accounting.", "Não é a melhor. Isso faz parte da autenticação, não de accounting.")
              ),
              option(
                "C",
                false,
                t("Displaying a username entry field", "Exibir um campo para nome de usuário"),
                t("Not best. That supports identification, not accounting.", "Não é a melhor. Isso apoia identificação, não accounting.")
              )
            ]
          }
        }),
        lesson({
          slug: "mfa-passwordless-and-session-discipline",
          estimatedMinutes: 8,
          title: t("MFA, passwordless, and session discipline", "MFA, passwordless e disciplina de sessão"),
          summary: t(
            "Learn why MFA, passwordless, and session controls need to work together.",
            "Aprenda por que MFA, passwordless e controles de sessão precisam funcionar juntos."
          ),
          objective: t(
            "Compare MFA patterns, passwordless approaches, and session controls such as timeout, reauthentication, and step-up prompts.",
            "Compare padrões de MFA, abordagens passwordless e controles de sessão como timeout, reautenticação e prompts de step-up."
          ),
          blocks: [
            introBlock(
              t(
                "Most identity attacks do not stop after login. Attackers steal sessions, abuse prompt fatigue, and capture weak second factors. Authentication strength therefore has to include the initial login and the session that follows.",
                "A maioria dos ataques a identidade não para depois do login. Atacantes roubam sessoes, abusam da fadiga de prompts e capturam segundos fatores fracos. A força da autenticação precisa incluir o login inicial e a sessão que vem depois."
              )
            ),
            conceptBlock(
              "mfa-vs-two-step",
              t("Two steps are not always two factors", "Dois passos nem sempre são dois fatores"),
              t(
                "True multifactor authentication combines independent factor types, such as something you know and something you have. Two-step flows that use two secrets from the same category are not equally strong.",
                "Autenticação multifator verdadeira combina tipos independentes de fatores, como algo que você sabe e algo que você possui. Fluxos em duas etapas que usam dois segredos da mesma categoria não são igualmente fortes."
              )
            ),
            conceptBlock(
              "phishing-resistant-options",
              t("Passwordless can be stronger when it resists replay and phishing", "Passwordless pode ser mais forte quando resiste a replay e phishing"),
              t(
                "FIDO2 and WebAuthn improve security because the authenticator is bound to the relying party and is hard to replay through phishing proxies. That is very different from codes that attackers can capture and reuse in real time.",
                "FIDO2 e WebAuthn melhoram a segurança porque o autenticador fica ligado ao relying party e é difícil de reutilizar por meio de proxies de phishing. Isso é muito diferente de códigos que atacantes podem capturar e reutilizar em tempo real."
              )
            ),
            conceptBlock(
              "weaker-factors",
              t("SMS and email are better than nothing but weaker than modern authenticators", "SMS e e-mail são melhores do que nada, mas mais fracos do que autenticadores modernos"),
              t(
                "SMS, email, and voice-delivered codes can still add friction, but they are more exposed to interception, SIM swap, and social engineering than hardware-backed or app-bound authenticators.",
                "Códigos por SMS, e-mail e voz ainda podem adicionar atrito, mas ficam mais expostos a interceptacao, SIM swap e engenharia social do que autenticadores ligados a hardware ou a aplicativos."
              )
            ),
            conceptBlock(
              "session-controls",
              t("A strong login should lead to a disciplined session", "Um login forte deve levar a uma sessão disciplinada"),
              t(
                "Timeouts, token rotation, device binding, reauthentication for sensitive actions, and step-up prompts limit how long stolen or forgotten trust can be abused. Session management is part of authentication strength, not an afterthought.",
                "Timeouts, rotação de token, vinculacao ao dispositivo, reautenticação para ações sensíveis e prompts de step-up limitam por quanto tempo uma confiança roubada ou esquecida pode ser abusada. Gerenciamento de sessão faz parte da força da autenticação, não é detalhe tardio."
              )
            ),
            movieCueBlock({
              title: t("The Dark Knight", "Batman: O Cavaleiro das Trevas"),
              cue: t(
                "Think about how getting access once was never enough; keeping control depended on how the next move was verified and constrained.",
                "Pense em como obter acesso uma vez nunca era suficiente; manter o controle dependia de como o próximo movimento era verificado e restringido."
              ),
              body: t(
                "Use that cue for session discipline: the value of MFA drops if the session that follows can be hijacked or stretched indefinitely.",
                "Use essa pista para disciplina de sessão: o valor do MFA cai se a sessão que vem depois puder ser sequestrada ou estendida indefinidamente."
              )
            }),
            keyPointsBlock(
              t(
                "Prefer independent factors and phishing-resistant authenticators. Treat session timeout, reauthentication, and token control as part of the authentication design.",
                "Prefira fatores independentes e autenticadores resistentes a phishing. Trate timeout de sessão, reautenticação e controle de token como parte do design de autenticação."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which option provides the STRONGEST resistance to modern phishing proxies?",
              "Qual opção oferece a MAIS FORTE resistencia a proxies modernos de phishing?"
            ),
            supportText: t(
              "Choose the authenticator tied to the legitimate relying party instead of a replayable code.",
              "Escolha o autenticador ligado ao relying party legitimo em vez de um código reutilizavel."
            ),
            correctRationale: t(
              "FIDO2 or WebAuthn authenticators are phishing resistant because the credential is tied to the legitimate site or relying party and is hard for a fake site to replay.",
              "Autenticadores FIDO2 ou WebAuthn são resistentes a phishing porque a credencial fica ligada ao site legitimo ou relying party e é difícil para um site falso reutiliza-la."
            ),
            remediationNote: t(
              "One-time codes can help, but they can still be captured and relayed by real-time phishing attacks.",
              "Códigos de uso único podem ajudar, mas ainda podem ser capturados e retransmitidos por ataques de phishing em tempo real."
            ),
            options: [
              option(
                "A",
                true,
                t("A FIDO2 security key using WebAuthn", "Uma chave de segurança FIDO2 usando WebAuthn"),
                t("Correct. This is the strongest mainstream answer against phishing proxies.", "Correto. Essa é a resposta comum mais forte contra proxies de phishing.")
              ),
              option(
                "B",
                false,
                t("An SMS code sent to the user's phone", "Um código por SMS enviado ao telefone do usuário"),
                t("Not best. SMS is more exposed to interception and relay attacks.", "Não é a melhor. SMS fica mais exposto a interceptacao e a ataques de relay.")
              ),
              option(
                "C",
                false,
                t("A secret question plus a password", "Uma pergunta secreta mais uma senha"),
                t("Not best. This is weak against phishing, guessing, and knowledge-based compromise.", "Não é a melhor. Isso é fraco contra phishing, adivinhacao e comprometimento baseado em conhecimento.")
              )
            ]
          }
        }),
        lesson({
          slug: "proofing-federation-and-single-sign-on",
          estimatedMinutes: 8,
          title: t("Proofing, federation, and single sign-on", "Proofing, federação e single sign-on"),
          summary: t(
            "Learn how proofing, federation, and SSO reduce friction without reducing trust.",
            "Aprenda como proofing, federação e SSO reduzem atrito sem reduzir confiança."
          ),
          objective: t(
            "Connect registration and proofing with SSO, federation, and protocols such as SAML, OAuth, and OpenID Connect.",
            "Conecte cadastro e proofing com SSO, federação e protocolos como SAML, OAuth e OpenID Connect."
          ),
          blocks: [
            introBlock(
              t(
                "SSO is attractive because users hate repetitive login, but putting many services behind one identity provider raises the impact of every proofing error, every weak session, and every stolen token.",
                "SSO e atraente porque usuários odeiam logins repetitivos, mas colocar muitos serviços atras de um único provedor de identidade aumenta o impacto de cada erro de proofing, de cada sessão fraca e de cada token roubado."
              )
            ),
            conceptBlock(
              "proofing-and-registration",
              t("Identity proofing decides how trustworthy the account can be", "Proofing de identidade decide quão confiável a conta pode ser"),
              t(
                "Enrollment and registration set the baseline trust of the identity. If the organization verifies the wrong person or uses weak knowledge-based proof, the rest of the IAM stack is built on a false premise.",
                "Cadastro e registro definem a confiança básica da identidade. Se a organização verifica a pessoa errada ou usa prova fraca baseada em conhecimento, o restante da pilha de IAM fica construído sobré uma premissa falsa."
              )
            ),
            conceptBlock(
              "sso-and-federation",
              t("Federation is delegated trust, not shared magic", "Federação e confiança delegada, não magia compartilhada"),
              t(
                "Single sign-on lets one successful authentication event unlock multiple resources. Federation extends that model across trust domains, where one organization accepts identity assertions from another under agreed rules.",
                "Single sign-on permite que um evento bem-sucedido de autenticação desbloqueie varios recursos. Federação estende esse modelo entre dominios de confiança, nos quais uma organização aceita afirmacoes de identidade de outra segundo regras acordadas."
              )
            ),
            conceptBlock(
              "protocol-choice",
              t("SAML, OAuth, and OpenID Connect are not interchangeable", "SAML, OAuth e OpenID Connect não são intercambiaveis"),
              t(
                "SAML is assertion-driven and common in enterprise SSO. OAuth is about delegated authorization to APIs and resources. OpenID Connect adds identity on top of OAuth. Mixing them up leads to weak designs and bad token handling.",
                "SAML e baseado em assertions e comum em SSO corporativo. OAuth trata de autorização delegada para APIs e recursos. OpenID Connect adiciona identidade sobre OAuth. Confundir esses protocolos leva a designs fracos e ma gestão de tokens."
              )
            ),
            conceptBlock(
              "jit-and-credential-hygiene",
              t("Convenience features still need governance", "Recursos de conveniência ainda precisam de governança"),
              t(
                "Just-in-time provisioning, credential managers, and trusted identity providers can lower friction, but only if provisioning, deprovisioning, token lifetime, revocation, and auditing stay tightly controlled.",
                "Provisionamento just-in-time, gerenciadores de credenciais e provedores de identidade confiáveis podem reduzir atrito, mas apenas se provisionamento, desprovisionamento, tempo de vida de token, revogação e auditoria ficarem sob controle rigido."
              )
            ),
            movieCueBlock({
              title: t("Spider-Man: Far From Home", "Homem-Aranha: Longe de Casa"),
              cue: t(
                "Think about how inherited trust in a powerful system became dangerous when identity proof and delegation assumptions were not fully deserved.",
                "Pense em como a confiança herdada em um sistema poderoso se tornou perigosa quando prova de identidade e premissas de delegacao não éram totalmente merecidas."
              ),
              body: t(
                "Use that cue for federation: delegated trust increases convenience, but it also increases the impact of mistakes.",
                "Use essa pista para federação: confiança delegada aumenta a conveniência, mas também aumenta o impacto dos erros."
              )
            }),
            keyPointsBlock(
              t(
                "Strong proofing comes before SSO value. Know whether you need authentication, delegated authorization, or identity assertions, and govern token life tightly.",
                "Proofing forte vem antes do valor do SSO. Saiba se você precisa de autenticação, autorização delegada ou assertions de identidade e governe rigidamente a vida dos tokens."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which statement BEST describes OAuth 2.0?",
              "Qual afirmação MELHOR descreve OAuth 2.0?"
            ),
            supportText: t(
              "Choose the protocol centered on delegated authorization, not direct user authentication by itself.",
              "Escolha o protocolo centrado em autorização delegada, não ém autenticação direta do usuário por si só."
            ),
            correctRationale: t(
              "OAuth 2.0 is mainly a framework for delegated authorization. It lets one service access resources on behalf of a user or system without exposing the original credentials.",
              "OAuth 2.0 e principalmente um framework de autorização delegada. Ele permite que um serviço acesse recursos em nome de um usuário ou sistema sem expor as credenciais originais."
            ),
            remediationNote: t(
              "OpenID Connect extends OAuth with identity information. OAuth alone should not be treated as a full identity solution.",
              "OpenID Connect estende OAuth com informações de identidade. OAuth sozinho não deve ser tratado como uma solucao completa de identidade."
            ),
            options: [
              option(
                "A",
                true,
                t("A framework for delegated authorization", "Um framework para autorização delegada"),
                t("Correct. That is the core job OAuth was built to do.", "Correto. Esse e o trabalho central para o qual OAuth foi criado.")
              ),
              option(
                "B",
                false,
                t("A digital-signature algorithm", "Um algoritmo de assinatura digital"),
                t("Not best. OAuth is a delegation framework, not a signing algorithm.", "Não é a melhor. OAuth e um framework de delegacao, não um algoritmo de assinatura.")
              ),
              option(
                "C",
                false,
                t("A password hashing standard", "Um padrão de hash de senha"),
                t("Not best. OAuth is unrelated to password hashing standards.", "Não é a melhor. OAuth não tem relacao com padrões de hash de senha.")
              )
            ]
          }
        }),
        lesson({
          slug: "authorization-models-and-policy-enforcement",
          estimatedMinutes: 8,
          title: t("Authorization models and policy enforcement", "Modelos de autorização e aplicação de política"),
          summary: t(
            "Learn how authorization models decide who can do what.",
            "Aprenda como modelos de autorização decidem quem pode fazer o que."
          ),
          objective: t(
            "Choose between DAC, MAC, RBAC, ABAC, rule-based, risk-based, and content-aware enforcement.",
            "Escolha entre DAC, MAC, RBAC, ABAC, rule-based, risk-based e aplicação sensível a conteúdo."
          ),
          blocks: [
            introBlock(
              t(
                "Authentication answers who is present. Authorization answers what that presence means. Strong organizations spend a lot of time on the second question because most overexposure happens after login, not before it.",
                "Autenticação responde quem esta presente. Autorização responde o que essa presenca significa. Organizações fortes gastam muito tempo na segunda pergunta porque a maior parte da superexposição acontece depois do login, não antes dele."
              )
            ),
            conceptBlock(
              "classic-models",
              t("Each access model reflects a different governance philosophy", "Cada modelo de acesso refleté uma filosofia diferente de governança"),
              t(
                "DAC emphasizes owner discretion, MAC emphasizes centrally enforced labels, RBAC maps users to job roles, and ABAC evaluates richer attributes such as department, device state, time, location, or data sensitivity.",
                "DAC enfatiza a discricionariedade do dono, MAC enfatiza rótulos aplicados centralmente, RBAC mapeia usuários a papéis de trabalho e ABAC avalia atributos mais ricos como departamento, estado do dispositivo, horário, localização ou sensibilidade do dado."
              )
            ),
            conceptBlock(
              "rule-risk-and-context",
              t("Modern authorization often needs more than role", "Autorização moderna muitas vezes precisa de mais do que papel"),
              t(
                "Rule-based and risk-based approaches help decide access based on conditions, posture, anomaly, and current threat. This is useful when the same user may be safe in one context and too risky in another.",
                "Abordagens baseadas em regras e risco ajudam a decidir acesso com base em condições, postura, anomalia e ameaça atual. Isso é útil quando o mesmo usuário pode ser seguro em um contexto e arriscado demais em outro."
              )
            ),
            conceptBlock(
              "pep-pdp",
              t("Good policy needs a decision point and an enforcement point", "Boa política precisa de ponto de decisão e de ponto de aplicação"),
              t(
                "A policy decision point evaluates the rules and the context, while a policy enforcement point actually allows, denies, or constrains the action. Splitting those responsibilities improves clarity and consistency at scale.",
                "Um policy decision point avalia regras e contexto, enquanto um policy enforcement point realmente permite, nega ou restringe a ação. Separar essas responsabilidades melhora clareza e consistencia em escala."
              )
            ),
            conceptBlock(
              "content-and-context-aware-control",
              t("Sometimes the decision depends on the data itself", "As vezes a decisão depende do próprio dado"),
              t(
                "Content-aware and context-aware controls can consider data labels, document type, source network, user behavior, or transaction sensitivity. That allows finer decisions than a flat static role table can provide.",
                "Controles sensíveis a conteúdo e contexto podem considerar rótulos do dado, tipo de documento, rede de origem, comportamento do usuário ou sensibilidade da transação. Isso permite decisões mais finas do qué uma tabela éstática de papéis consegue oferecer."
              )
            ),
            movieCueBlock({
              title: t("The Avengers", "Os Vingadores"),
              cue: t(
                "Think about how the same character could be trusted with very different powers depending on role, current context, and what was at stake.",
                "Pense em como o mesmo personagem podia receber poderes muito diferentes dependendo do papel, do contexto atual e do que estava em jogo."
              ),
              body: t(
                "Use that cue for authorization: identity alone is not enough. The decision must fit the role, the risk, and the specific action.",
                "Use essa pista para autorização: identidade sozinha não basta. A decisão precisa combinar com o papel, o risco e a ação específica."
              )
            }),
            keyPointsBlock(
              t(
                "Pick the model that matches the governance need. Roles help, but context, attributes, and enforceable policy points often keep modern access decisions safe.",
                "Escolha o modelo que combina com a necessidade de governança. Papéis ajudam, mas contexto, atributos e pontos de política aplicaveis muitas vezes mantêm decisões modernas de acesso seguras."
              )
            )
          ],
          exercise: {
            prompt: t(
              "A bank wants access decisions to consider a user's role, device health, transaction amount, and physical location. Which model BEST fits?",
              "Um banco quer que decisões de acesso considerem papel do usuário, saúde do dispositivo, valor da transação e localização física. Qual modelo se encaixa MELHOR?"
            ),
            supportText: t(
              "Choose the model built to evaluate multiple changing attributes, not just a static role.",
              "Escolha o modelo feito para avaliar múltiplos atributos que mudam, e não apenas um papel estático."
            ),
            correctRationale: t(
              "ABAC is the best fit because it can evaluate many attributes about the subject, object, environment, and requested action instead of relying only on a predefined role mapping.",
              "ABAC e a melhor opção porque consegue avaliar muitos atributos sobre sujeito, objeto, ambiente e ação solicitada, em vez de depender apenas de um mapeamento predefinido de papel."
            ),
            remediationNote: t(
              "RBAC is useful for coarse job-role mapping, but it is less expressive for rich contextual conditions like device health and transaction sensitivity.",
              "RBAC é útil para mapeamento mais amplo de papéis de trabalho, mas é menos expressivo para condições contextuais ricas como saúde do dispositivo e sensibilidade da transação."
            ),
            options: [
              option(
                "A",
                true,
                t("Attribute-based access control (ABAC)", "Controle de acesso baseado em atributos (ABAC)"),
                t("Correct. ABAC is designed for this richer multi-attribute decision pattern.", "Correto. ABAC foi projetado para esse padrão mais rico de decisão multiatributo.")
              ),
              option(
                "B",
                false,
                t("Discretionary access control (DAC)", "Controle de acesso discricionario (DAC)"),
                t("Not best. DAC is owner-driven and does not naturally solve complex contextual policy evaluation.", "Não é a melhor. DAC e orientado pelo dono e não resolve naturalmente avaliação complexa de política contextual.")
              ),
              option(
                "C",
                false,
                t("Role-based access control (RBAC)", "Controle de acesso baseado em papéis (RBAC)"),
                t("Not best. RBAC is helpful but too limited for the multi-context requirements in the question.", "Não é a melhor. RBAC ajuda, mas e limitado demais para os requisitos multicontexto da pergunta.")
              )
            ]
          }
        }),
        lesson({
          slug: "provisioning-review-and-role-transitions",
          estimatedMinutes: 8,
          title: t("Provisioning, review, and role transitions", "Provisionamento, revisão e transições de papel"),
          summary: t(
            "Learn how provisioning, review, and role changes prevent excess access.",
            "Aprenda como provisionamento, revisão e mudança de papel evitam excesso de acesso."
          ),
          objective: t(
            "Control onboarding, transfers, offboarding, recertification, privilege creep, and service-account hygiene.",
            "Controle onboarding, transferências, offboarding, recertificacao, privilege creep e higiene de contas de serviço."
          ),
          blocks: [
            introBlock(
              t(
                "Many access problems are lifecycle problems. The account was valid once, but the role changed, the project ended, the contractor left, or the service secret stayed active long after anyone remembered why it existed.",
                "Muitos problemas de acesso são problemas de ciclo de vida. A conta foi válida um dia, mas o papel mudou, o projeto acabou, o contratado saiu ou o segredo do serviço continuou ativo muito depois de alguém lembrar por que ele existia."
              )
            ),
            conceptBlock(
              "joiner-mover-leaver",
              t("Joiner, mover, leaver is a security workflow, not only HR hygiene", "Joiner, mover, leaver e um fluxo de segurança, não apenas higiene de RH"),
              t(
                "Onboarding should grant only what the starting role needs. Transfers should remove old rights as new ones are added. Offboarding should quickly disable access, recover tokens, and retire standing privileges before they become back doors.",
                "Onboarding deve conceder apenas o que o papel inicial precisa. Transferências devem remover direitos antigos enquanto os novos são adicionados. Offboarding deve desabilitar rápido o acesso, recuperar tokens e aposentar privilégios permanentes antes que virem portas dos fundos."
              )
            ),
            conceptBlock(
              "recertification",
              t("Access review corrects what time and convenience distort", "Revisão de acesso corrige o que tempo e conveniência distorcem"),
              t(
                "Managers and owners should regularly certify that users, groups, and accounts still need the permissions they hold. Without review, privilege creep builds quietly until no one can explain why access exists.",
                "Gestores e donos devem certificar com regularidade que usuários, grupos e contas ainda precisam das permissões que possuem. Sem revisão, privilege creep cresce em silencio até ninguém conseguir explicar por que o acesso existe."
              )
            ),
            conceptBlock(
              "service-accounts",
              t("Service accounts deserve extra scrutiny because they often bypass human friction", "Contas de serviço merecem escrutinio extra porque muitas vezes contornam o atrito humano"),
              t(
                "Service and application accounts are often privileged, long-lived, and poorly reviewed. They should have a narrow purpose, vault-managed secrets, rotation, and no interactive rights unless explicitly required.",
                "Contas de serviço e de aplicação muitas vezes são privilegiadas, duram muito e passam por pouca revisão. Elas devem ter finalidade estreita, segredos gerenciados em cofre, rotação e nenhum direito interativo, salvo necessidade explícita."
              )
            ),
            conceptBlock(
              "orphaned-and-excessive-privilege",
              t("Unused access is latent attack surface", "Acesso não usado e superfície de ataque latente"),
              t(
                "Dormant accounts, forgotten admin memberships, and entitlements that survive project closure all create easy wins for attackers. Lifecycle governance should treat stale privilege as risk, not as harmless leftovers.",
                "Contas dormentes, membros administrativos esquecidos e direitos que sobrevivem ao fim de projetos criam vitorias fáceis para atacantes. Governança de ciclo de vida deve tratar privilégio obsoleto como risco, não como sobra inocente."
              )
            ),
            movieCueBlock({
              title: t("Monsters, Inc.", "Monstros S.A."),
              cue: t(
                "Think about how every door represented access to a different environment, and how dangerous it became when doors stayed available to the wrong actor at the wrong time.",
                "Pense em como cada porta representava acesso a um ambiente diferente e como isso ficava perigoso quando portas permaneciam disponíveis para o ator errado na hora errada."
              ),
              body: t(
                "Use that cue for lifecycle governance: every account and entitlement is a door that must open, narrow, and close on purpose.",
                "Use essa pista para governança de ciclo de vida: cada conta e direito é uma porta que deve abrir, estreitar e fechar de forma intencional."
              )
            }),
            keyPointsBlock(
              t(
                "Treat onboarding, transfer, review, and offboarding as security controls. Stale privilege, dormant accounts, and poorly governed service identities are high-value weaknesses.",
                "Trate onboarding, transferências, revisão e offboarding como controles de segurança. Privilégios obsoletos, contas dormentes e identidades de serviço mal governadas são fraquezas de alto valor."
              )
            )
          ],
          exercise: {
            prompt: t(
              "An employee moves from finance to marketing, but keeps all finance permissions plus the new marketing access. What is the PRIMARY IAM problem?",
              "Um funcionário sai de financas para marketing, mas mantêm todas as permissões de financas junto com o novo acesso de marketing. Qual é o problema PRIMARIO de IAM?"
            ),
            supportText: t(
              "Choose the lifecycle risk created when old rights are not removed during a role change.",
              "Escolha o risco de ciclo de vida criado quando direitos antigos não são removidos duranté uma mudança de papel."
            ),
            correctRationale: t(
              "This is privilege creep. The employee keeps unnecessary rights over time because access changes were only additive instead of being reviewed and corrected during the role transition.",
              "Isso é privilege creep. O funcionário mantêm direitos desnecessarios ao longo do tempo porque as mudanças de acesso foram apenas aditivas, em vez de revisadas e corrigidas durante a transição de papel."
            ),
            remediationNote: t(
              "Role transitions require both granting the new access and removing the old access that is no longer justified.",
              "Transições de papel exigem tanto a concessão do novo acesso quanto a remocao do acesso antigo que não se justifica mais."
            ),
            options: [
              option(
                "A",
                true,
                t("Privilege creep", "Privilege creep"),
                t("Correct. This is the classic buildup of unnecessary access over time.", "Correto. Esse e o acumulo classico de acesso desnecessario ao longo do tempo.")
              ),
              option(
                "B",
                false,
                t("Nonrepudiation", "Não repudio"),
                t("Not best. Nonrepudiation is about proving a party cannot deny an action, not excess access accumulation.", "Não é a melhor. Não repudio trata de provar qué uma parte não pode negar uma ação, não de acumulo excessivo de acesso."
                )
              ),
              option(
                "C",
                false,
                t("Tokenization", "Tokenização"),
                t("Not best. Tokenization is a data-protection technique, not an IAM lifecycle failure.", "Não é a melhor. Tokenização é uma técnica de proteção de dados, não uma falha de ciclo de vida de IAM.")
              )
            ]
          }
        }),
        lesson({
          slug: "kerberos-protocols-and-privileged-access",
          estimatedMinutes: 8,
          title: t("Kerberos, AAA protocols, and privileged access", "Kerberos, protocolos AAA e acesso privilegiado"),
          summary: t(
            "Learn how protocol flow and just-in-time access protect admin identities.",
            "Aprenda como fluxo de protocolo e acesso just-in-time protegem identidades administrativas."
          ),
          objective: t(
            "Understand Kerberos, RADIUS, TACACS+, Diameter, PAM, and just-in-time privilege.",
            "Entenda Kerberos, RADIUS, TACACS+, Diameter, PAM e privilégio just-in-time."
          ),
          blocks: [
            introBlock(
              t(
                "Administrative identities are prized because they can turn one successful compromise into broad control. That is why protocol design, ticket handling, and privilege-elevation discipline matter so much in mature IAM programs.",
                "Identidades administrativas são cobicadas porque podem transformar um comprometimento bem-sucedido em amplo controle. Por isso design de protocolo, tratamento de tickets e disciplina de elevacao de privilégio importam tanto em programas maduros de IAM."
              )
            ),
            conceptBlock(
              "kerberos-flow",
              t("Kerberos avoids sending reusable passwords to every service", "Kerberos evita enviar senhas reutilizaveis para cada serviço"),
              t(
                "Kerberos uses a key distribution center with an authentication service and ticket-granting service so a user proves identity once, gets tickets, and then reaches services without repeatedly exposing the original secret.",
                "Kerberos usa um key distribution center com authentication service e ticket-granting service para que um usuário prove identidadé uma vez, receba tickets e depois acesse serviços sem expor repetidamente o segredo original."
              )
            ),
            conceptBlock(
              "aaa-protocols",
              t("RADIUS, TACACS+, and Diameter fit different decision points", "RADIUS, TACACS+ e Diameter se encaixam em pontos de decisão diferentes"),
              t(
                "RADIUS is common for network access and central AAA. TACACS+ is popular for administrative control of network devices and gives richer separation of authorization details. Diameter modernizes some AAA patterns at larger scale.",
                "RADIUS e comum para acesso de rede e AAA centralizado. TACACS+ e popular para controle administrativo de dispositivos de rede e oferece separacao mais rica de detalhes de autorização. Diameter moderniza alguns padrões AAA em escala maior."
              )
            ),
            conceptBlock(
              "pam-and-jit",
              t("Privileged access should be granted late and held briefly", "Acesso privilegiado deve ser concedido tarde e mantido por pouco tempo"),
              t(
                "Privileged access management reduces standing admin rights by brokering elevation only when needed, often with approval, recording, and short-lived credentials. Just-in-time privilege reduces the abuse window if an account is compromised.",
                "Privileged access management reduz direitos administrativos permanentes ao intermediar elevacao apenas quando necessário, muitas vezes com aprovação, gravacao e credenciais de curta duracao. Privilégio just-in-time reduz a janela de abuso sé uma conta for comprometida."
              )
            ),
            conceptBlock(
              "admin-attack-paths",
              t("Privileged identity is a favorite path for escalation and lateral movement", "Identidade privilegiada e um caminho favorito para escalacao e movimento lateral"),
              t(
                "Pass-the-hash, ticket theft, service abuse, and reused administrative credentials all show why privileged identities should be segmented, monitored, vaulted, and reviewed more aggressively than ordinary user accounts.",
                "Pass-the-hash, roubo de ticket, abuso de serviço e credenciais administrativas reutilizadas mostram por que identidades privilegiadas devem ser segmentadas, monitoradas, guardadas em cofre e revisadas de forma mais agressiva do que contas comuns de usuário."
              )
            ),
            movieCueBlock({
              title: t("Doctor Strange", "Doutor Estranho"),
              cue: t(
                "Think about how the most dangerous access was not constant power. It was temporary access to highly privileged tools granted at the right moment.",
                "Pense em como o acesso mais perigoso não éra poder constante. Era acesso temporario a ferramentas altamente privilegiadas concedido no momento certo."
              ),
              body: t(
                "Use that cue for privileged access: do not leave powerful rights standing when they can be brokered, time-limited, and observed instead.",
                "Use essa pista para acesso privilegiado: não deixe direitos poderosos permanentes quando eles podem ser intermediados, limitados no tempo e observados."
              )
            }),
            keyPointsBlock(
              t(
                "Kerberos limits secret exposure with tickets. AAA protocols centralize trust. Privileged rights should be short-lived, brokered, monitored, and harder to steal than normal user access.",
                "Kerberos limita exposição de segredos com tickets. Protocolos AAA centralizam a confiança. Direitos privilegiados devem ser temporarios, intermediados, monitorados e mais difíceis de roubar do que o acesso comum de usuário."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY security advantage of just-in-time privileged access?",
              "Qual é a vantagem de segurança PRIMARIA do acesso privilegiado just-in-time?"
            ),
            supportText: t(
              "Choose the benefit that comes from reducing how long powerful rights exist.",
              "Escolha o beneficio que vem de reduzir por quanto tempo direitos poderosos existem."
            ),
            correctRationale: t(
              "Just-in-time privilege reduces standing administrative access, which shrinks the attack window and limits the usefulness of stolen credentials.",
              "Privilégio just-in-time reduz acesso administrativo permanente, o que diminui a janela de ataque e limita a utilidade de credenciais roubadas."
            ),
            remediationNote: t(
              "The goal is not to eliminate administration but to avoid leaving powerful access available all the time without a current need.",
              "O objetivo não é eliminar a administração, mas evitar deixar acesso poderoso disponivel o tempo todo sem necessidade atual."
            ),
            options: [
              option(
                "A",
                true,
                t("It reduces the time privileged rights remain available for misuse", "Ele reduz o tempo em que direitos privilegiados permanecem disponíveis para uso indevido"),
                t("Correct. Shorter standing privilege means less opportunity for abuse.", "Correto. Menos privilégio permanente significa menos oportunidade de abuso.")
              ),
              option(
                "B",
                false,
                t("It removes the need to log administrative activity", "Ele élimina a necessidade de registrar atividade administrativa"),
                t("Not best. Logging remains crucial, especially for privileged access.", "Não é a melhor. Logging continua crucial, especialmente para acesso privilegiado.")
              ),
              option(
                "C",
                false,
                t("It guarantees that privileged accounts can never be compromised", "Ele garante que contas privilegiadas nunca possam ser comprometidas"),
                t("Not best. JIT reduces exposure but does not create perfection.", "Não é a melhor. JIT reduz exposição, mas não cria perfeição.")
              )
            ]
          }
        })
      ]
    },
    {
      number: 6,
      slug: "security-assessment-and-testing",
      estimatedMinutes: 48,
      title: t("Security Assessment and Testing", "Avaliação e Testes de Segurança"),
      summary: t(
        "Learn how audits, scanning, testing, review, and metrics turn security claims into evidence.",
        "Aprenda como auditorias, varredura, testes, revisão e métricas transformam alegações de segurança em evidência."
      ),
      objective: t(
        "Understand how audits, vulnerability assessments, penetration tests, software review, and metrics validate controls and show where controls are weak.",
        "Entenda como auditorias, avaliações de vulnerabilidade, testes de intrusão, revisão de software e métricas validam controles e mostram onde os controles são fracos."
      ),
      lessons: [
        lesson({
          slug: "audit-strategies-and-soc-reporting",
          estimatedMinutes: 8,
          title: t("Audit strategies and SOC reporting", "Estratégias de auditoria e relatórios SOC"),
          summary: t(
            "Learn which audit type and SOC report fit each assurance need.",
            "Aprenda qual tipo de auditoria e qual relatório SOC se encaixam em cada necessidade de assurance."
          ),
          objective: t(
            "Differentiate internal, external, and third-party audits and map SOC reports to the right need.",
            "Diferencie auditorias internas, externas e de terceiros e relacione relatórios SOC à necessidade correta."
          ),
          blocks: [
            introBlock(
              t(
                "Security assessment is not one thing. The right approach depends on whether leadership needs internal assurance, customers need third-party evidence, regulators need a compliance demonstration, or engineers need a finding they can fix this week.",
                "Avaliação de segurança não é uma coisa só. A abordagem correta depende de se a liderança precisa de assurance interno, clientes precisam de evidência de terceiros, reguladores precisam de demonstração de compliance ou engenheiros precisam de um achado que consigam corrigir esta semana."
              )
            ),
            conceptBlock(
              "audit-types",
              t("Audit independence changes the weight of the evidence", "Independencia da auditoria muda o peso da evidência"),
              t(
                "Internal audits help improve the program and prepare for outside scrutiny. External and third-party audits often carry more credibility for customers, regulators, and boards because the evaluator is more independent from the system owner.",
                "Auditorias internas ajudam a melhorar o programa e preparar para escrutinio externo. Auditorias externas e de terceiros geralmente trazem mais credibilidade para clientes, reguladores e conselhos porque o avaliador e mais independente do dono do sistema."
              )
            ),
            conceptBlock(
              "soc-reports",
              t("SOC reports answer different trust questions", "Relatórios SOC respondem perguntas diferentes de confiança"),
              t(
                "SOC 1 focuses on financial-reporting controls, SOC 2 focuses on trust service criteria such as security and availability, and SOC 3 gives a higher-level public summary. Type I evaluates design at one point in time; Type II evaluates operating effectiveness over a period.",
                "SOC 1 foca em controles de relatório financeiro, SOC 2 foca em trust service criteria como segurança e disponibilidade, e SOC 3 entrega um resumo público de nível mais alto. Type I avalia o design em um momento; Type II avalia a eficacia operacional ao longo de um período."
              )
            ),
            conceptBlock(
              "scope-location-and-cloud",
              t("Location still matters even when systems are outsourced", "Localização ainda importa mesmo quando sistemas são terceirizados"),
              t(
                "On-premises, hybrid, and cloud deployments change who owns the evidence and what parts of the stack can be assessed directly. A good strategy respects those boundaries instead of pretending provider-owned controls are fully visible.",
                "Implantacoes on-premises, hibridas e em nuvem mudam quem possui a evidência e quais partes da pilha podem ser avaliadas diretamente. Uma boa estratégia respeita esses limites em vez de fingir que controles do provedor são totalmente visíveis."
              )
            ),
            conceptBlock(
              "authority-and-goals",
              t("Authority and purpose should be explicit before testing starts", "Autoridade e finalidade devem ser explícitas antes do teste começar"),
              t(
                "The most common assessment failure is starting with tools instead of goals. Evidence is useful only when scope, authority, audience, and success criteria were set in advance.",
                "A falha mais comum de assessment e começar por ferramentas em vez de objetivos. Evidência só é útil quando escopo, autoridade, público e critérios de sucesso foram definidos com antecedencia."
              )
            ),
            movieCueBlock({
              title: t("Spotlight", "Spotlight"),
              cue: t(
                "Think about how credibility depended on evidence quality, independence, and knowing exactly what question the investigation had to answer.",
                "Pense em como a credibilidade dependia da qualidade da evidência, da independencia e de saber exatamente qual pergunta a investigacao precisava responder."
              ),
              body: t(
                "Use that cue for audit strategy: the result is strong only when scope, audience, independence, and purpose line up.",
                "Use essa pista para estratégia de auditoria: o resultado só fica forte quando escopo, público, independencia e finalidade estão alinhados."
              )
            }),
            keyPointsBlock(
              t(
                "Pick the right audit type for the audience. Know which SOC report answers which trust question. Define scope and authority before technical testing starts.",
                "Escolha o tipo de auditoria certo para o público. Saiba qual relatório SOC responde a qual pergunta de confiança. Defina escopo e autoridade antes de o teste técnico começar."
              )
            )
          ],
          exercise: {
            prompt: t(
              "A customer wants evidence that a SaaS provider's security controls operated effectively over time. Which report BEST fits?",
              "Um cliente quer evidência de que os controles de segurança de um provedor SaaS operaram efetivamente ao longo do tempo. Qual relatório se encaixa MELHOR?"
            ),
            supportText: t(
              "Choose the report focused on operating effectiveness over time.",
              "Escolha o relatório focado em eficacia operacional ao longo do tempo."
            ),
            correctRationale: t(
              "SOC 2 Type II is the best fit because it shows how relevant trust-service controls worked over time. That is what the customer asked for.",
              "SOC 2 Type II e a melhor opção porque mostra como trust-service controls relevantes funcionaram ao longo do tempo. E isso que o cliente pediu."
            ),
            remediationNote: t(
              "SOC 2 Type I covers design at one moment. SOC 1 focuses on financial-reporting controls.",
              "SOC 2 Type I cobre o design em um momento. SOC 1 foca em controles de relatório financeiro."
            ),
            options: [
              option(
                "A",
                true,
                t("SOC 2 Type II", "SOC 2 Type II"),
                t("Correct. This is the report designed to show operating effectiveness over time.", "Correto. Esse e o relatório feito para mostrar eficacia operacional ao longo do tempo.")
              ),
              option(
                "B",
                false,
                t("SOC 1 Type I", "SOC 1 Type I"),
                t("Not best. This is narrower and point-in-time, centered on financial-reporting controls.", "Não é a melhor. Ele é mais estreito e pontual, centrado em controles de relatório financeiro.")
              ),
              option(
                "C",
                false,
                t("SOC 3 marketing summary", "Resumo de marketing SOC 3"),
                t("Not best. SOC 3 is high-level and not the strongest evidence for detailed customer assurance.", "Não é a melhor. SOC 3 e de alto nível e não é a evidência mais forte para assurance detalhado de cliente.")
              )
            ]
          }
        }),
        lesson({
          slug: "vulnerability-assessment-and-scoring",
          estimatedMinutes: 8,
          title: t("Vulnerability assessment and scoring", "Avaliação de vulnerabilidades e pontuação"),
          summary: t(
            "Learn how to scan, validate, and prioritize vulnerabilities in context.",
            "Aprenda como varrer, validar e priorizar vulnerabilidades dentro do contexto certo."
          ),
          objective: t(
            "Run vulnerability assessments with asset awareness and understand standards such as CVE, CVSS, SCAP, CPE, OVAL, XCCDF, and CCE.",
            "Execute avaliações de vulnerabilidade com consciência de ativos e entenda padrões como CVE, CVSS, SCAP, CPE, OVAL, XCCDF e CCE."
          ),
          blocks: [
            introBlock(
              t(
                "A vulnerability scan is easy to run and easy to misunderstand. Good assessors care less about raw count and more about whether the findings are real, reachable, important to the business, and actionable in the current environment.",
                "Uma varredura de vulnerabilidades é fácil de executar é fácil de interpretar mal. Bons avaliadores se importam menos com a contagem bruta e mais com saber se os achados são reais, alcancaveis, importantes para o negócio e acionáveis no ambiente atual."
              )
            ),
            conceptBlock(
              "assessment-steps",
              t("Assessment moves from discovery to analysis to reporting", "Avaliação vai da descoberta para a análise e o relatório"),
              t(
                "Reconnaissance, enumeration, vulnerability identification, validation, prioritization, and reporting form a practical chain. Skipping validation or business context often produces noise instead of useful remediation work.",
                "Reconhecimento, enumeração, identificação de vulnerabilidade, validação, priorização e relatório formam uma cadeia prática. Pular validação ou contexto de negócio muitas vezes produz ruído em vez de trabalho útil de remediação."
              )
            ),
            conceptBlock(
              "standards-language",
              t("Security content standards make results portable", "Padrões de conteúdo de segurança tornam resultados portaveis"),
              t(
                "CVE identifies vulnerabilities, CVSS scores severity, CPE describes affected products, CCE identifies configuration issues, and SCAP packages machine-readable security content with languages such as OVAL and XCCDF.",
                "CVE identifica vulnerabilidades, CVSS pontua severidade, CPE descreve produtos afetados, CCE identifica problemas de configuração e SCAP empacota conteúdo de segurança legível por máquina com linguagens como OVAL e XCCDF."
              )
            ),
            conceptBlock(
              "authenticated-vs-unauthenticated",
              t("Authenticated scanning sees more because it stops guessing", "Varredura autenticada enxerga mais porque para de adivinhar"),
              t(
                "Authenticated scans can inspect installed packages, local configuration, patch status, and account settings more accurately than external-only unauthenticated scans. Both views matter, but they answer different questions.",
                "Varreduras autenticadas podem inspecionar pacotes instalados, configuração local, status de patch e configurações de conta com mais precisão do que varreduras externas não autenticadas. As duas visoes importam, mas respondem perguntas diferentes."
              )
            ),
            conceptBlock(
              "asset-priority",
              t("A critical flaw on a trivial host may matter less than a moderate flaw on a crown-jewel system", "Uma falha crítica em um host trivial pode importar menos do qué uma falha moderada em um sistema coroa"),
              t(
                "Prioritization should combine severity, exploitability, exposure, asset value, compensating controls, and business impact. Risk-based remediation is better than patching strictly by score rank.",
                "Priorização deve combinar severidade, explorabilidade, exposição, valor do ativo, controles compensatórios e impacto no negócio. Remediação baseada em risco é melhor do que aplicar patch estritamente por ranking de pontuação."
              )
            ),
            movieCueBlock({
              title: t("The Big Short", "A Grande Aposta"),
              cue: t(
                "Think about how raw numbers meant little until someone understood which signals really mattered and where the real exposure was.",
                "Pense em como números brutos significavam pouco até alguém entender quais sinais realmente importavam e onde a exposição real estava."
              ),
              body: t(
                "Use that cue for vulnerability work: severity scores are useful, but business context and asset value decide what deserves attention first.",
                "Use essa pista para trabalho com vulnerabilidades: pontuacoes de severidade são úteis, mas contexto de negócio e valor do ativo decidem o que merece atencao primeiro."
              )
            }),
            keyPointsBlock(
              t(
                "Validate findings, understand the standards language, prefer authenticated visibility when appropriate, and prioritize by real risk instead of raw volume.",
                "Valide achados, entenda a linguagem dos padrões, prefira visibilidade autenticada quando apropriado e priorize por risco real em vez de volume bruto."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY purpose of CVSS?",
              "Qual é a finalidade PRIMARIA do CVSS?"
            ),
            supportText: t(
              "Choose the standard that scores severity, not the one that names products or vulnerabilities.",
              "Escolha o padrão que pontua severidade, não o que nomeia produtos ou vulnerabilidades."
            ),
            correctRationale: t(
              "CVSS provides a standardized way to express the severity and characteristics of a vulnerability. It is not the identifier of the vulnerability itself.",
              "CVSS fornecé uma forma padronizada de expressar severidade e características dé uma vulnerabilidade. Ele não é o identificador da própria vulnerabilidade."
            ),
            remediationNote: t(
              "CVE names the vulnerability, while CVSS helps quantify its severity for prioritization and communication.",
              "CVE nomeia a vulnerabilidade, enquanto CVSS ajuda a quantificar sua severidade para priorização e comunicação."
            ),
            options: [
              option(
                "A",
                true,
                t("To score vulnerability severity in a standardized way", "Pontuar severidade de vulnerabilidades de forma padronizada"),
                t("Correct. CVSS exists to express severity consistently.", "Correto. CVSS existe para expressar severidade de forma consistente.")
              ),
              option(
                "B",
                false,
                t("To identify the vendor and product affected", "Identificar o fornecedor e o produto afetado"),
                t("Not best. That is closer to the job of CPE.", "Não é a melhor. Isso se apróxima mais do papel do CPE.")
              ),
              option(
                "C",
                false,
                t("To define a legal retention period for findings", "Definir um período legal de retenção para achados"),
                t("Not best. CVSS has nothing to do with evidence retention policy.", "Não é a melhor. CVSS não tem relacao com política de retenção de evidências.")
              )
            ]
          }
        }),
        lesson({
          slug: "penetration-testing-and-team-exercises",
          estimatedMinutes: 8,
          title: t("Penetration testing and team exercises", "Teste de intrusão e exercicios de equipe"),
          summary: t(
            "Learn how to plan penetration tests and team exercises safely.",
            "Aprenda como planejar testes de intrusão e exercicios de equipe com segurança."
          ),
          objective: t(
            "Plan scope, box model, rules of engagement, and red-blue-purple goals.",
            "Planeje escopo, modelo de box, regras de engajamento e objetivos de red-blue-purple."
          ),
          blocks: [
            introBlock(
              t(
                "Penetration testing is powerful because it moves from theoretical weakness to a demonstrated path, but that power can cause damage if objectives, authorization, and handling rules are vague.",
                "Teste de intrusão é poderoso porque passa de fraqueza teórica para um caminho demonstrado, mas esse poder pode causar dano se objetivos, autorização e regras de conducao forem vagos."
              )
            ),
            conceptBlock(
              "pentest-phases",
              t("A good pentest is staged, not improvised", "Um bom pentest e faseado, não improvisado"),
              t(
                "Planning, information gathering, attack execution, pivot analysis, evidence collection, and reporting help ensure the test produces useful findings instead of just dramatic screenshots.",
                "Planejamento, coleta de informações, execução de ataque, análise de pivoteamento, coleta de evidências e relatório ajudam a garantir que o teste produza achados úteis em vez de apenas capturas de tela dramaticas."
              )
            ),
            conceptBlock(
              "box-models",
              t("White, gray, and black box answer different questions", "White, gray e black box respondem perguntas diferentes"),
              t(
                "White-box tests favor deep coverage with insider knowledge, black-box tests mimic an outsider starting cold, and gray-box tests split the difference to balance realism and efficiency.",
                "Testes white-box favorecem cobertura profunda com conhecimento interno, black-box imitam um outsider começando do zero e gray-box ficam no meio-termo para equilibrar realismo e eficiencia."
              )
            ),
            conceptBlock(
              "rules-of-engagement",
              t("Authorization and safety boundaries are part of the test", "Autorização e limites de segurança fazem parte do teste"),
              t(
                "Rules of engagement define timing, targets, prohibited actions, evidence handling, communication paths, and stop conditions. Without them, the test may create legal, operational, and ethical problems larger than the vulnerabilities it finds.",
                "Regras de engajamento definem horário, alvos, ações proibidas, tratamento de evidência, caminhos de comunicação e condições de parada. Sem elas, o teste pode criar problemas legais, operacionais e éticos maiores do que as vulnerabilidades que encontra."
              )
            ),
            conceptBlock(
              "team-exercises",
              t("Red, blue, and purple teams learn different lessons", "Red, blue e purple teams aprendem licoes diferentes"),
              t(
                "Red teams focus on emulation and access, blue teams focus on detection and response, and purple teams turn both into a collaborative improvement loop so defenses get measurably better after the exercise.",
                "Red teams focam em emulacao e acesso, blue teams focam em detecção e resposta, e purple teams transformam os dois em um ciclo colaborativo de melhoria para que as defesas fiquem mensuravelmente melhores depois do exercicio."
              )
            ),
            movieCueBlock({
              title: t("Heat", "Fogo Contra Fogo"),
              cue: t(
                "Think about how the outcome depended on planning, reconnaissance, timing, and strict awareness of boundaries, not just bold action.",
                "Pense em como o resultado dependia de planejamento, reconhecimento, tempo e consciência rigorosa de limites, não apenas de ousadia."
              ),
              body: t(
                "Use that cue for penetration testing: disciplined scope and evidence matter as much as exploitation skill.",
                "Use essa pista para teste de intrusão: escopo disciplinado e evidência importam tanto quanto habilidade de exploracao."
              )
            }),
            keyPointsBlock(
              t(
                "Plan the test, define the box model, document the rules, and use red-blue-purple collaboration to turn exploits into better defenses.",
                "Planeje o teste, defina o modelo de box, documente as regras e use colaboração red-blue-purple para transformar exploits em defesas melhores."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY purpose of rules of engagement in a penetration test?",
              "Qual é a finalidade PRIMARIA das regras de engajamento em um teste de intrusão?"
            ),
            supportText: t(
              "Choose the answer focused on authorized boundaries and safe execution.",
              "Escolha a resposta focada em limites autorizados e execução segura."
            ),
            correctRationale: t(
              "Rules of engagement define the authorized scope, timing, methods, contacts, and safety boundaries so the test can proceed legally and safely.",
              "Regras de engajamento definem escopo autorizado, horário, métodos, contatos e limites de segurança para que o teste possa ocorrer de forma legal e segura."
            ),
            remediationNote: t(
              "The goal is not to make the test more realistic at any cost, but to make it controlled, authorized, and useful.",
              "O objetivo não é tornar o teste mais realista a qualquer custo, mas torna-lo controlado, autorizado é útil."
            ),
            options: [
              option(
                "A",
                true,
                t("To define authorized scope and safety boundaries for the test", "Definir escopo autorizado e limites de segurança para o teste"),
                t("Correct. ROE exists to keep the engagement controlled and defensible.", "Correto. ROE existe para manter o engajamento controlado e defensável.")
              ),
              option(
                "B",
                false,
                t("To guarantee that no vulnerabilities will be found", "Garantir que nenhuma vulnerabilidade sera encontrada"),
                t("Not best. ROE manages the engagement; it does not decide the findings.", "Não é a melhor. ROE gerencia o engajamento; não decide os achados.")
              ),
              option(
                "C",
                false,
                t("To replace the need for final reporting", "Substituir a necessidade de relatório final"),
                t("Not best. Reporting is still needed to turn the test into actionable evidence.", "Não é a melhor. Relatório continua necessário para transformar o teste em evidência acionável.")
              )
            ]
          }
        }),
        lesson({
          slug: "log-reviews-and-software-test-techniques",
          estimatedMinutes: 8,
          title: t("Log review and software test techniques", "Revisão de logs e técnicas de teste de software"),
          summary: t(
            "Learn how logs and software tests complement each other.",
            "Aprenda como logs e testes de software se complementam."
          ),
          objective: t(
            "Combine log review, time synchronization, monitoring, code review, SAST, DAST, and IAST.",
            "Combine revisão de logs, sincronizacao de tempo, monitoramento, code review, SAST, DAST e IAST."
          ),
          blocks: [
            introBlock(
              t(
                "A mature assessment program does not choose between operational evidence and software evidence. It uses logs, telemetry, and test results together to understand what is exposed, what is happening, and what broke in the design or code.",
                "Um programa maduro de assessment não éscolhe entre evidência operacional e evidência de software. Ele usa logs, telemetria e resultados de teste juntos para entender o que esta exposto, o que esta acontecendo e o que quebrou no design ou no código."
              )
            ),
            conceptBlock(
              "log-quality",
              t("Logs are useful only when they are trustworthy and correlatable", "Logs só são úteis quando são confiáveis e correlacionaveis"),
              t(
                "Centralized logging, SIEM analysis, NetFlow, and synchronized time sources such as NTP help analysts stitch together events across systems. Without time discipline and enough detail, logs create confusion instead of evidence.",
                "Logging centralizado, análise em SIEM, NetFlow e fontes de tempo sincronizadas como NTP ajudam analistas a juntar eventos entre sistemas. Sem disciplina de tempo e detalhe suficiente, logs criam confusão em vez de evidência."
              )
            ),
            conceptBlock(
              "synthetic-and-real-user",
              t("Monitoring can imitate users or observe them directly", "Monitoramento pode imitar usuários ou observa-los diretamente"),
              t(
                "Synthetic transactions test whether expected user paths still work under controlled conditions. Real user monitoring observes actual experience in production. Together they expose availability and performance failures that pure security tools may miss.",
                "Transações sintéticas testam se caminhos esperados de usuário ainda funcionam sob condições controladas. Real user monitoring observa a experiência real em produção. Juntos eles expõem falhas de disponibilidade e desempenho que ferramentas puras de segurança podem perder."
              )
            ),
            conceptBlock(
              "review-techniques",
              t("Manual review still finds issues automation misses", "Revisão manual ainda encontra problemas que a automacao perde"),
              t(
                "Peer review, walkthroughs, and structured methods such as Fagan inspection help teams catch logic errors, trust-boundary mistakes, and insecure assumptions that tools may not understand well.",
                "Peer review, walkthroughs e métodos estruturados como Fagan inspection ajudam equipes a capturar erros de lógica, erros de limite de confiança e premissas inseguras que ferramentas podem não éntender bem."
              )
            ),
            conceptBlock(
              "sast-dast-iast",
              t("Different test modes see different failure surfaces", "Modos diferentes de teste enxergam superfícies de falha diferentes"),
              t(
                "SAST inspects source or binaries without running the app, DAST tests the running app from the outside, and IAST instruments the application during execution to combine internal and external visibility. None of them is enough alone.",
                "SAST inspeciona código-fonte ou binarios sem executar a aplicação, DAST testa a aplicação em execução de fora para dentro e IAST instrumenta a aplicação durante a execução para combinar visibilidade interna e externa. Nenhum deles basta sozinho."
              )
            ),
            movieCueBlock({
              title: t("Zodiac", "Zodiaco"),
              cue: t(
                "Think about how solving the case required correlating scattered clues with disciplined review instead of trusting any single fragment alone.",
                "Pense em como resolver o caso exigia correlacionar pistas dispersas com revisão disciplinada em vez de confiar em um único fragmento sozinho."
              ),
              body: t(
                "Use that cue for evidence review: logs, monitoring, and code tests are strongest when combined into one defensible picture.",
                "Use essa pista para revisão de evidências: logs, monitoramento e testes de código ficam mais fortes quando combinados em um quadro defensável."
              )
            }),
            keyPointsBlock(
              t(
                "Trustworthy logging needs time sync and enough detail. Synthetic and real-user monitoring answer different questions. Combine manual review with SAST, DAST, and IAST for fuller software assurance.",
                "Logging confiável precisa de sincronizacao de tempo e detalhe suficiente. Monitoramento sintetico e de usuário real respondem perguntas diferentes. Combine revisão manual com SAST, DAST e IAST para uma assurance mais completa de software."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which statement BEST describes IAST?",
              "Qual afirmação MELHOR descreve IAST?"
            ),
            supportText: t(
              "Choose the testing approach that observes the application from inside while it runs.",
              "Escolha a abordagem de teste que observa a aplicação por dentro enquanto ela éxecuta."
            ),
            correctRationale: t(
              "IAST instruments the running application to observe code behavior, data flow, and vulnerabilities during execution, combining some strengths of static and dynamic approaches.",
              "IAST instrumenta a aplicação em execução para observar comportamento do código, fluxo de dados e vulnerabilidades durante a execução, combinando algumas forças de abordagens estáticas e dinamicas."
            ),
            remediationNote: t(
              "SAST does not run the application, and DAST tests from the outside without internal instrumentation.",
              "SAST não éxecuta a aplicação, e DAST testa de fora sem instrumentacao interna."
            ),
            options: [
              option(
                "A",
                true,
                t("It instruments a running application to identify issues during execution", "Ele instrumenta uma aplicação em execução para identificar problemas durante a execução"),
                t("Correct. That is the defining feature of IAST.", "Correto. Essa é a característica definidora do IAST.")
              ),
              option(
                "B",
                false,
                t("It reviews source code without executing the application", "Ele revisa código-fonte sem executar a aplicação"),
                t("Not best. That describes SAST.", "Não é a melhor. Isso descreve SAST.")
              ),
              option(
                "C",
                false,
                t("It is only a SIEM correlation rule set", "Ele é apenas um conjunto de regras de correlacao de SIEM"),
                t("Not best. IAST is an application testing technique, not a SIEM feature.", "Não é a melhor. IAST é uma técnica de teste de aplicação, não um recurso de SIEM.")
              )
            ]
          }
        }),
        lesson({
          slug: "coverage-interface-bas-and-compliance-testing",
          estimatedMinutes: 8,
          title: t("Coverage, interface, BAS, and compliance testing", "Cobertura, interfaces, BAS e testes de compliance"),
          summary: t(
            "Learn how coverage, interfaces, BAS, and compliance checks show what was really tested.",
            "Aprenda como cobertura, interfaces, BAS e checks de compliance mostram o que foi realmente testado."
          ),
          objective: t(
            "Assess misuse cases, interface coverage, BAS, and compliance checks without confusing activity with assurance.",
            "Avalie misuse cases, cobertura de interfaces, BAS e checks de compliance sem confundir atividade com assurance."
          ),
          blocks: [
            introBlock(
              t(
                "A test program can look busy while still leaving major blind spots. Assurance comes from deliberate coverage choices: which interfaces were exercised, which abusive paths were tried, and which control claims were checked independently.",
                "Um programa de teste pode parecer ocupado e ainda assim deixar grandes pontos cegos. Assurance vem de escolhas deliberadas de cobertura: quais interfaces foram exercitadas, quais caminhos abusivos foram tentados e quais alegações de controle foram verificadas de forma independente."
              )
            ),
            conceptBlock(
              "coverage-thinking",
              t("Coverage should include misuse, not only happy paths", "Cobertura deve incluir abuso, não apenas caminhos felizes"),
              t(
                "Positive testing shows that systems work as intended. Misuse and abuse cases test whether they fail safely when users, attackers, or unexpected inputs push them away from the intended path.",
                "Teste positivo mostra que sistemas funcionam como pretendido. Misuse e abuse cases testam se eles falham com segurança quando usuários, atacantes ou entradas inesperadas os afastam do caminho pretendido."
              )
            ),
            conceptBlock(
              "interfaces",
              t("Every interface is a distinct test surface", "Cada interface é uma superfície distinta de teste"),
              t(
                "APIs, graphical interfaces, command-line tools, mobile front ends, and even physical ports or maintenance channels expose different trust boundaries. They should not be treated as equivalent test surfaces.",
                "APIs, interfaces gráficas, ferramentas de linha de comando, front ends móveis e até portas físicas ou canais de manutenção expõem limites diferentes de confiança. Eles não devem ser tratados como superfícies de teste equivalentes."
              )
            ),
            conceptBlock(
              "bas",
              t("Breach and attack simulation validates detection and response assumptions", "Breach and attack simulation válida premissas de detecção e resposta"),
              t(
                "BAS platforms replay known attack behaviors in controlled ways so teams can verify that alerts, controls, and response workflows behave as expected. It is not the same as free-form penetration testing, but it is very useful for operational assurance.",
                "Plataformas de BAS reproduzem comportamentos de ataque conhecidos de forma controlada para que equipes verifiquem se alertas, controles e fluxos de resposta se comportam como esperado. Não é o mesmo que teste de intrusão livre, mas e muito útil para assurance operacional."
              )
            ),
            conceptBlock(
              "compliance-checks",
              t("Compliance testing proves alignment to a requirement, not absolute safety", "Teste de compliance prova alinhamento a requisito, não segurança absoluta"),
              t(
                "Configuration checks, benchmarks, and requirement mapping are essential, but a system can pass compliance checks and still be weak against creative abuse. Compliance evidence and security evidence overlap, but they are not the same thing.",
                "Verificações de configuração, benchmarks e mapeamento de requisitos são essenciais, mas um sistema pode passar em checks de compliance e ainda assim ser fraco contra abuso criativo. Evidência de compliance e evidência de segurança se sobrepõem, mas não são a mesma coisa."
              )
            ),
            movieCueBlock({
              title: t("Edge of Tomorrow", "No Limite do Amanha"),
              cue: t(
                "Think about the value of repeating scenarios under controlled conditions until you know exactly which actions produce a better defensive outcome.",
                "Pense no valor de repetir cenários sob condições controladas até saber exatamente quais ações produzem um resultado defensivo melhor."
              ),
              body: t(
                "Use that cue for BAS and coverage: structured repetition can reveal whether the defense really reacts the way the team believes it will.",
                "Use essa pista para BAS e cobertura: repeticao estruturada pode revelar se a defesa realmente reage da forma que a equipe acredita."
              )
            }),
            keyPointsBlock(
              t(
                "Test misuse as well as normal use. Cover each interface intentionally. Use BAS for operational validation, and do not mistake compliance alignment for complete security assurance.",
                "Teste abuso além do uso normal. Cubra cada interface de forma intencional. Use BAS para validação operacional e não confunda alinhamento de compliance com assurance completo de segurança."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY value of breach and attack simulation (BAS)?",
              "Qual é o valor PRIMARIO de breach and attack simulation (BAS)?"
            ),
            supportText: t(
              "Choose the answer focused on repeatable validation of detection and response behavior.",
              "Escolha a resposta focada em validação repetível de comportamento de detecção e resposta."
            ),
            correctRationale: t(
              "BAS repeatedly simulates known attack behaviors so teams can verify whether controls, detections, and response workflows actually trigger as expected in production-like conditions.",
              "BAS simula repetidamente comportamentos conhecidos de ataque para que equipes verifiquem se controles, detecções e fluxos de resposta realmente disparam como esperado em condições parecidas com produção."
            ),
            remediationNote: t(
              "BAS is not primarily a source-code review or legal compliance mechanism; it validates operational defensive behavior.",
              "BAS não é principalmente revisão de código-fonte nem mecanismo de compliance jurídico; ele válida comportamento operacional defensivo."
            ),
            options: [
              option(
                "A",
                true,
                t("To validate whether security controls and detections respond as expected to known attack behaviors", "Validar se controles e detecções de segurança respondem como esperado a comportamentos conhecidos de ataque"),
                t("Correct. That is the core purpose of BAS.", "Correto. Esse e o propósito central do BAS.")
              ),
              option(
                "B",
                false,
                t("To replace all manual penetration testing", "Substituir todo teste manual de intrusão"),
                t("Not best. BAS complements but does not replace human-led penetration testing.", "Não é a melhor. BAS complementa, mas não substitui teste de intrusão conduzido por humanos.")
              ),
              option(
                "C",
                false,
                t("To assign CVSS scores to new vulnerabilities", "Atribuir pontuacoes CVSS a novas vulnerabilidades"),
                t("Not best. BAS validates defensive behavior, not vulnerability scoring standards.", "Não é a melhor. BAS valida comportamento defensivo, não padrões de pontuação de vulnerabilidade.")
              )
            ]
          }
        }),
        lesson({
          slug: "program-metrics-reporting-and-remediation",
          estimatedMinutes: 8,
          title: t("Program metrics, reporting, and remediation", "Métricas de programa, relatório e remediação"),
          summary: t(
            "Learn how metrics and reporting turn findings into verified improvement.",
            "Aprenda como métricas e relatórios transformam achados em melhoria verificada."
          ),
          objective: t(
            "Use KPIs, KRIs, remediation tracking, compensating controls, and responsible reporting to improve the program.",
            "Use KPIs, KRIs, rastreamento de remediação, controles compensatórios e relatório responsável para melhorar o programa."
          ),
          blocks: [
            introBlock(
              t(
                "Too many assessment programs stop at discovery. Mature programs keep going until findings are explained clearly, tied to business impact, assigned, remediated, retested, and fed back into the next planning cycle.",
                "Muitos programas de assessment param na descoberta. Programas maduros continuam até que achados sejam explicados com clareza, ligados ao impacto no negócio, atribuidos, remediados, retestados e devolvidos ao próximo ciclo de planejamento."
              )
            ),
            conceptBlock(
              "kpi-vs-kri",
              t("Metrics should distinguish performance from risk", "Métricas devem distinguir desempenho de risco"),
              t(
                "KPIs show whether a process is meeting target performance, while KRIs indicate growing exposure or instability. A healthy program tracks both because fast activity is not the same thing as lower risk.",
                "KPIs mostram se um processo esta atingindo o desempenho alvo, enquanto KRIs indicam exposição ou instabilidade crescentes. Um programa saudavel acompanha ambos porque atividade rápida não é a mesma coisa que risco menor."
              )
            ),
            conceptBlock(
              "reporting-for-audience",
              t("Executives, engineers, and auditors need different reports from the same evidence", "Executivos, engenheiros e auditores precisam de relatórios diferentes a partir da mesma evidência"),
              t(
                "Leaders need business impact and trend clarity, engineers need technical details and reproduction guidance, and auditors need traceability to controls and objective evidence. One raw output is rarely enough for all three audiences.",
                "Lideres precisam de clareza sobre impacto no negócio e tendência, engenheiros precisam de detalhes técnicos e orientação de reprodução, e auditores precisam de rastreabilidade para controles e evidência objetiva. Um único resultado bruto raramente basta para os tres públicos."
              )
            ),
            conceptBlock(
              "remediation-loop",
              t("Findings should move through ownership, remediation, and retest", "Achados devem passar por responsável, remediação e reteste"),
              t(
                "A finding is not closed because someone promised to fix it. Closure should mean the owner accepted it, remediation was applied or a compensating control was justified, and the issue was revalidated to confirm the risk really changed.",
                "Um achado não está encerrado porque alguém prometeu corrigi-lo. Encerramento deve significar que o responsável o aceitou, a remediação foi aplicada ou um controle compensatório foi justificado, e o problema foi revalidado para confirmar que o risco realmente mudou."
              )
            ),
            conceptBlock(
              "ethical-disclosure",
              t("Assessment communication should be disciplined and ethical", "Comunicação de assessment deve ser disciplinada e etica"),
              t(
                "Evidence handling, need-to-know disclosure, responsible reporting, and awareness of legal boundaries matter because the process of proving a weakness should not create a second incident.",
                "Tratamento de evidências, divulgação por need-to-know, relatório responsável e consciência de limites legais importam porque o processo de provar uma fraqueza não deve criar um segundo incidente."
              )
            ),
            movieCueBlock({
              title: t("Moneyball", "Moneyball"),
              cue: t(
                "Think about how the right metric changed decision quality because it reflected what really mattered, not just what was easy to count.",
                "Pense em como a metrica certa mudou a qualidade da decisão porque refletia o que realmente importava, e não apenas o que era fácil de contar."
              ),
              body: t(
                "Use that cue for assessment reporting: metrics should drive better risk decisions, not create a comforting dashboard disconnected from reality.",
                "Use essa pista para relatório de assessment: métricas devem gerar melhores decisões de risco, não criar um dashboard confortável desconectado da realidade."
              )
            }),
            keyPointsBlock(
              t(
                "Use the right metrics for the right audience. Track findings through verified remediation. Treat disclosure and evidence handling as part of the security work, not as administrative leftovers.",
                "Use as métricas certas para o público certo. Rastreie achados até a remediação verificada. Trate divulgação e tratamento de evidências como parte do trabalho de segurança, não como sobras administrativas."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which metric is MOST likely to be a KRI rather than a KPI?",
              "Qual metrica tem MAIS chance de ser um KRI em vez de um KPI?"
            ),
            supportText: t(
              "Choose the measure that signals increasing exposure rather than process productivity.",
              "Escolha a medida que sinaliza exposição crescente e não produtividade de processo."
            ),
            correctRationale: t(
              "A rising number of critical internet-facing vulnerabilities is a key risk indicator because it reflects increasing exposure. A KPI would more likely focus on process performance such as closure speed or review completion.",
              "Um número crescente de vulnerabilidades críticas voltadas para a internet é um key risk indicator porque reflete exposição crescente. Um KPI tenderia mais a focar desempenho do processo, como velocidade de fechamento ou conclusão de revisões."
            ),
            remediationNote: t(
              "Risk indicators point toward danger or instability; performance indicators point toward whether the process is meeting its operational target.",
              "Indicadores de risco apontam para perigo ou instabilidade; indicadores de desempenho apontam se o processo esta atingindo sua meta operacional."
            ),
            options: [
              option(
                "A",
                true,
                t("The trend in unremediated critical internet-facing findings", "A tendência de achados críticos voltados para a internet ainda sem remediação"),
                t("Correct. That metric signals rising exposure and therefore fits a risk indicator.", "Correto. Essa metrica sinaliza exposição crescente e portanto se encaixa como indicador de risco.")
              ),
              option(
                "B",
                false,
                t("The percentage of scheduled reviews completed on time", "A porcentagem de revisões agendadas concluidas no prazo"),
                t("Not best. That is more naturally a performance indicator for the process itself.", "Não é a melhor. Isso é mais naturalmente um indicador de desempenho do próprio processo.")
              ),
              option(
                "C",
                false,
                t("The number of analysts who attended training", "O número de analistas que participaram de treinamento"),
                t("Not best. Training attendance may matter operationally, but it is not the strongest example of a risk indicator here.", "Não é a melhor. Participacao em treinamento pode importar operacionalmente, mas não é o exemplo mais forte de indicador de risco aqui.")
              )
            ]
          }
        })
      ]
    },
    {
      number: 7,
      slug: "security-operations",
      estimatedMinutes: 58,
      title: t("Security Operations", "Operações de Segurança"),
      summary: t(
        "Learn how daily security operations, incident response, evidence, resilience, and people safety fit together.",
        "Aprenda como operações diárias de segurança, resposta a incidentes, evidências, resiliência e segurança das pessoas se encaixam."
      ),
      objective: t(
        "Understand investigations, monitoring, change control, resilience, and human-safety practices before, during, and after disruption.",
        "Entenda investigações, monitoramento, controle de mudança, resiliência e práticas de segurança humana antes, durante e depois de interrupções."
      ),
      lessons: [
        lesson({
          slug: "investigations-and-legal-readiness",
          estimatedMinutes: 8,
          title: t("Investigations and legal readiness", "Investigações e prontidão legal"),
          summary: t(
            "Learn when an event becomes an investigation and how to preserve evidence early.",
            "Aprenda quando um evento vira investigação e como preservar evidências desde o início."
          ),
          objective: t(
            "Differentiate administrative, civil, criminal, and regulatory investigations and preserve scenes and evidence correctly.",
            "Diferencie investigações administrativas, civis, criminais e regulatórias e preserve cenas e evidências do jeito certo."
          ),
          blocks: [
            introBlock(
              t(
                "An event becomes an investigation as soon as the organization may need to defend what happened, who touched what, and how it knows. That is why legal readiness starts long before a crisis begins.",
                "Um evento se torna investigação assim que a organização pode precisar defender o que aconteceu, quem tocou em quê e como ela sabe disso. Por isso a prontidão legal começa muito antes de a crise começar."
              )
            ),
            conceptBlock(
              "investigation-types",
              t("Different investigations optimize for different outcomes", "Investigacoes diferentes buscam resultados diferentes"),
              t(
                "Administrative and internal investigations often focus on policy and employment consequences. Civil investigations support disputes and liability questions. Criminal investigations pursue violations of law. Regulatory investigations examine compliance obligations and governance failures.",
                "Investigacoes administrativas e internas geralmente focam em política e consequencias trabalhistas. Investigacoes civis apoiam disputas e questoes de responsabilidade. Investigacoes criminais tratam de violacoes da lei. Investigacoes regulatórias examinam obrigações de compliance e falhas de governança."
              )
            ),
            conceptBlock(
              "scene-preservation",
              t("Preserving the scene protects later truth", "Preservar a cena protege a verdade depois"),
              t(
                "The first responder's job is usually to stabilize, contain, and document, not to experiment. Premature cleanup, rebooting, or uncontrolled curiosity can destroy volatile evidence investigators may need later.",
                "O trabalho do primeiro respondente geralmente e estabilizar, conter e documentar, não éxperimentar. Limpeza prematura, reinicializacao ou curiosidade descontrolada podem destruir evidência volatil de que investigadores podem precisar depois."
              )
            ),
            conceptBlock(
              "locard-and-attribution",
              t("Every interaction leaves a trace, but only if you preserve it", "Toda interação deixa rastro, mas apenas se você o preservar"),
              t(
                "Locard's exchange principle reminds us that activity leaves residue in systems, spaces, media, and people. Operations teams support attribution by protecting those traces from accidental destruction or undocumented access.",
                "O princípio de troca de Locard nos lembra que atividade deixa residuos em sistemas, espaços, mídias e pessoas. Equipes de operações apoiam atribuição ao proteger esses rastros contra destruição acidental ou acesso não documentado."
              )
            ),
            conceptBlock(
              "policy-and-authority",
              t("Legal readiness depends on authority, training, and procedure", "Prontidão legal depende de autoridade, treinamento e procedimento"),
              t(
                "Organizations need predefined authority, escalation paths, retention rules, and coordination with legal counsel and HR. Improvised investigations create evidentiary gaps and governance risk exactly when credibility matters most.",
                "Organizações precisam de autoridade predefinida, caminhos de escalacao, regras de retenção e coordenacao com jurídico e RH. Investigacoes improvisadas criam lacunas de evidência e risco de governança justamente quando a credibilidade mais importa."
              )
            ),
            movieCueBlock({
              title: t("A Few Good Men", "Questao de Honra"),
              cue: t(
                "Think about how the outcome depended on what could be established credibly, what evidence held up, and which chain of authority governed the response.",
                "Pense em como o resultado dependia do que podia ser estabelecido com credibilidade, de qual évidência se sustentava e de qual cadeia de autoridade governava a resposta."
              ),
              body: t(
                "Use that cue for legal readiness: operational discipline is what keeps an incident from becoming an evidentiary mess.",
                "Use essa pista para prontidão legal: disciplina operacional e o que impede um incidente de virar um caos probatório."
              )
            }),
            keyPointsBlock(
              t(
                "Know what kind of investigation you are supporting. Preserve the scene before curiosity destroys it. Train responders so authority and evidence handling stay clear under pressure.",
                "Saiba que tipo de investigacao você esta apoiando. Preserve a cena antes que a curiosidade a destrua. Treine respondentes para que autoridade e tratamento de evidências continuem claros sob pressão."
              )
            )
          ],
          exercise: {
            prompt: t(
              "During a suspected insider incident, what should the first responder do FIRST if there is no immediate safety risk?",
              "Durante um suspeito incidente interno, o que o primeiro respondente deve fazer PRIMEIRO se não houver risco imediato a segurança física?"
            ),
            supportText: t(
              "Choose the action that preserves evidence first.",
              "Escolha a ação que preserva a evidência primeiro."
            ),
            correctRationale: t(
              "The first responder should stabilize and document the situation while preserving evidence. Unplanned actions, such as rebooting or exploring the system, can destroy volatile data.",
              "O primeiro respondente deve estabilizar e documentar a situacao enquanto preserva a evidência. Ações não planejadas, como reiniciar ou explorar o sistema, podem destruir dados voláteis."
            ),
            remediationNote: t(
              "Investigation quality often depends on what was preserved in the first few minutes.",
              "A qualidade da investigacao muitas vezes depende do que foi preservado nos primeiros minutos."
            ),
            options: [
              option(
                "A",
                true,
                t("Preserve and document the scene before making unnecessary changes", "Preservar e documentar a cena antes de fazer mudanças desnecessarias"),
                t("Correct. Preservation comes first when safety is not at risk.", "Correto. Preservação vem primeiro quando segurança física não está em risco.")
              ),
              option(
                "B",
                false,
                t("Immediately reboot the system to stop suspicious processes", "Reiniciar imediatamente o sistema para parar processos suspeitos"),
                t("Not best. Rebooting may destroy volatile evidence and should not be the reflex action.", "Não é a melhor. Reiniciar pode destruir evidência volatil e não deve ser a ação reflexa.")
              ),
              option(
                "C",
                false,
                t("Let any nearby administrator inspect the system informally", "Permitir que qualquer administrador próximo inspecione o sistema informalmente"),
                t("Not best. Informal, undocumented access damages evidentiary reliability.", "Não é a melhor. Acesso informal e sem documentacao prejudica a confiabilidade da evidência.")
              )
            ]
          }
        }),
        lesson({
          slug: "evidence-handling-forensics-and-artifacts",
          estimatedMinutes: 8,
          title: t("Evidence handling, forensics, and artifacts", "Tratamento de evidências, forense e artefatos"),
          summary: t(
            "Learn how evidence stays defensible from collection to analysis.",
            "Aprenda como a evidência continua defensável da coleta até a análise."
          ),
          objective: t(
            "Apply chain of custody, admissibility thinking, live versus dead acquisition, and artifact analysis.",
            "Aplique cadeia de custódia, pensamento de admissibilidade, aquisição viva ou morta e análise de artefatos."
          ),
          blocks: [
            introBlock(
              t(
                "Digital evidence is fragile because it is easy to copy and easy to question. Investigators need technical skill, but they also need procedures strong enough to show that the evidence stayed trustworthy from collection through presentation.",
                "Evidência digital e frágil porque é fácil de copiar é fácil de questionar. Investigadores precisam de habilidade técnica, mas também de procedimentos fortes o bastante para mostrar que a evidência permaneceu confiável da coleta até a apresentacao."
              )
            ),
            conceptBlock(
              "chain-of-custody",
              t("Chain of custody proves who had the evidence and when", "Cadeia de custódia prova quem teve a evidência e quando"),
              t(
                "A chain of custody records collection, transfer, storage, access, and analysis so the organization can show that the evidence was not altered or mishandled in undocumented ways.",
                "Uma cadeia de custódia registra coleta, transferência, armazenamento, acesso e análise para que a organização possa mostrar que a evidência não foi alterada nem tratada de formas não documentadas."
              )
            ),
            conceptBlock(
              "live-vs-dead",
              t("Live acquisition preserves volatility; dead acquisition preserves stability", "Aquisição viva preserva volatilidade; aquisição morta preserva estabilidade"),
              t(
                "Live response can capture memory, active connections, and running state, but it also touches the system and may alter it. Dead analysis from an image is safer for preservation, but it loses volatile context. Operations must choose on purpose.",
                "Resposta ao vivo pode capturar memória, conexões ativas e estado em execução, mas também toca o sistema é pode altera-lo. Análise morta a partir dé uma imagem e mais segura para preservação, mas perde contexto volatil. Operações devem escolher de forma intencional."
              )
            ),
            conceptBlock(
              "artifacts-and-ediscovery",
              t("Artifacts tell stories when you know where to look", "Artefatos contam historias quando você sabe onde procurar"),
              t(
                "Logs, browser data, email, registry entries, metadata, swap files, application traces, and cloud records each preserve fragments of user and system activity. eDiscovery adds legal search and preservation duties over electronically stored information.",
                "Logs, dados de navegador, email, entradas de registro, metadados, arquivos de swap, rastros de aplicação e registros em nuvem preservam fragmentos de atividade de usuário e sistema. eDiscovery adiciona deveres legais de busca e preservação sobre informações armazenadas eletronicamente."
              )
            ),
            conceptBlock(
              "standards-and-integrity",
              t("Forensic standards support repeatability and credibility", "Padrões forenses apoiam repetibilidade e credibilidade"),
              t(
                "Standards such as ISO 27037 help teams handle identification, collection, acquisition, and preservation in a repeatable way. Repeatability matters because credibility falls when each responder improvises differently.",
                "Padrões como ISO 27037 ajudam equipes a tratar identificação, coleta, aquisição e preservação de forma repetível. Repetibilidade importa porque a credibilidade cai quando cada respondente improvisa de forma diferente."
              )
            ),
            movieCueBlock({
              title: t("Knives Out", "Entre Facas e Segredos"),
              cue: t(
                "Think about how small details mattered only because they were preserved, connected, and interpreted without contaminating the story.",
                "Pense em como pequenos detalhes importavam apenas porque foram preservados, conectados e interpretados sem contaminar a historia."
              ),
              body: t(
                "Use that cue for evidence handling: a single artifact is useful only when custody and interpretation remain credible.",
                "Use essa pista para tratamento de evidência: um único artefato só é útil quando custódia e interpretação permanecem críveis."
              )
            }),
            keyPointsBlock(
              t(
                "Document custody continuously. Choose live or dead acquisition based on what matters most. Preserve artifacts systematically so later analysis can stand up to challenge.",
                "Documente a custódia continuamente. Escolha aquisição viva ou morta com base no que mais importa. Preserve artefatos de forma sistematica para que a análise posterior resista a contestacao."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY purpose of chain of custody documentation?",
              "Qual é a finalidade PRIMARIA da documentacao da cadeia de custódia?"
            ),
            supportText: t(
              "Choose the answer that proves how evidence was controlled over time.",
              "Escolha a resposta que prova como a evidência foi controlada ao longo do tempo."
            ),
            correctRationale: t(
              "Chain of custody proves who collected, accessed, transferred, stored, and analyzed the evidence so its integrity and handling can be defended later.",
              "Cadeia de custódia prova quem coletou, acessou, transferiu, armazenou e analisou a evidência para que sua integridade e tratamento possam ser defendidos depois."
            ),
            remediationNote: t(
              "It is about trust in handling, not just about creating an inventory list or technical hash alone.",
              "Ela trata de confiança no tratamento, não apenas de criar um inventário ou um hash técnico isolado."
            ),
            options: [
              option(
                "A",
                true,
                t("To show that the evidence was handled in a documented and trustworthy way", "Mostrar que a evidência foi tratada de forma documentada e confiável"),
                t("Correct. That is why chain of custody exists.", "Correto. E por isso que a cadeia de custódia existe.")
              ),
              option(
                "B",
                false,
                t("To replace the need for evidence hashing", "Substituir a necessidade de hash da evidência"),
                t("Not best. Hashing can support integrity, but chain of custody serves a broader handling and accountability role.", "Não é a melhor. Hash pode apoiar integridade, mas cadeia de custódia cumpre papel mais amplo de tratamento e responsabilizacao.")
              ),
              option(
                "C",
                false,
                t("To guarantee the evidence will be admitted automatically", "Garantir que a evidência sera admitida automaticamente"),
                t("Not best. Good custody supports admissibility, but it does not guarantee it automatically.", "Não é a melhor. Boa custódia apoia admissibilidade, mas não a garante automaticamente.")
              )
            ]
          }
        }),
        lesson({
          slug: "logging-monitoring-and-detection-platforms",
          estimatedMinutes: 8,
          title: t("Logging, monitoring, and detection platforms", "Logging, monitoramento e plataformas de detecção"),
          summary: t(
            "Learn how logging and detection platforms help teams act in time.",
            "Aprenda como logging e plataformas de detecção ajudam equipes a agir a tempo."
          ),
          objective: t(
            "Use IDS, IPS, SIEM, SOAR, continuous monitoring, and egress visibility to detect and respond in time.",
            "Use IDS, IPS, SIEM, SOAR, monitoramento contínuo e visibilidade de egresso para detectar e responder a tempo."
          ),
          blocks: [
            introBlock(
              t(
                "Operations is the practice of noticing in time. If logs are scattered, alerts are noisy, and egress is invisible, the team learns about compromise too late to do much beyond documenting it.",
                "Operações são a prática de perceber a tempo. Se logs estão dispersos, alertas são ruidosos e egresso é invisível, a equipe descobre o comprometimento tarde demais para fazer muito além de documentá-lo."
              )
            ),
            conceptBlock(
              "ids-ips-idps",
              t("Detection and prevention are related but not identical", "Detecção e prevencao são relacionadas, mas não identicas"),
              t(
                "IDS observes and alerts, while IPS sits inline and can block or modify traffic. Hybrid IDPS approaches combine both ideas, but tuning and placement decide whether they help or just create operational drag.",
                "IDS observa e alerta, enquanto IPS fica inline e pode bloquear ou modificar tráfego. Abordagens hibridas de IDPS combinam as duas ideias, mas ajuste fino e posicionamento decidem se elas ajudam ou apenas criam atrito operacional."
              )
            ),
            conceptBlock(
              "siem-soar",
              t("SIEM correlates; SOAR orchestrates", "SIEM correlaciona; SOAR orquestra"),
              t(
                "A SIEM aggregates and correlates telemetry across systems. SOAR platforms add response workflow automation, enrichment, and playbook execution so common actions happen faster and more consistently.",
                "Um SIEM agrega e correlaciona telemetria entre sistemas. Plataformas SOAR adicionam automacao de fluxo de resposta, enriquecimento e execução de playbooks para que ações comuns ocorram mais rápido e com mais consistencia."
              )
            ),
            conceptBlock(
              "continuous-monitoring",
              t("Continuous monitoring is a process, not just a dashboard", "Monitoramento contínuo é um processo, não apenas dashboard"),
              t(
                "Continuous monitoring means collecting relevant signals, validating coverage, reviewing alerts, tuning false positives and negatives, and checking whether the program still sees what it needs to see as the environment changes.",
                "Monitoramento contínuo significa coletar sinais relevantes, validar cobertura, revisar alertas, ajustar falsos positivos e negativos e verificar se o programa ainda ve o que precisa ver conforme o ambiente muda."
              )
            ),
            conceptBlock(
              "egress-and-flow",
              t("Watching what leaves is as important as watching what arrives", "Observar o que sai e tao importante quanto observar o que chega"),
              t(
                "Flow records, egress filtering, DNS visibility, and transfer monitoring help catch exfiltration and command-and-control behavior that perimeter ingress controls may never see clearly.",
                "Registros de fluxo, filtragem de egresso, visibilidade de DNS e monitoramento de transferência ajudam a capturar exfiltração e comportamento de comando e controle que controles de ingresso no perímetro podem nunca enxergar com clareza."
              )
            ),
            movieCueBlock({
              title: t("The Martian", "Perdido em Marte"),
              cue: t(
                "Think about how survival depended on reading weak signals correctly and responding before the next failure made the problem worse.",
                "Pense em como a sobrevivencia dependia de ler sinais fracos corretamente e responder antes que a falha seguinte piorasse o problema."
              ),
              body: t(
                "Use that cue for detection operations: telemetry matters only if the team can interpret it and act while time still matters.",
                "Use essa pista para operações de detecção: telemetria só importa se a equipe consegue interpreta-la e agir enquanto o tempo ainda importa."
              )
            }),
            keyPointsBlock(
              t(
                "Place sensors deliberately, tune continuously, correlate centrally, automate carefully, and watch egress as closely as ingress.",
                "Posicione sensores deliberadamente, ajuste continuamente, correlacione centralmente, automatize com cuidado e observe egresso tao de perto quanto ingresso."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY difference between a SIEM and a SOAR platform?",
              "Qual é a diferença PRIMARIA entré uma plataforma SIEM é uma SOAR?"
            ),
            supportText: t(
              "Choose the answer that separates correlation from automated response orchestration.",
              "Escolha a resposta que separa correlacao de orquestracao automatizada de resposta."
            ),
            correctRationale: t(
              "A SIEM primarily aggregates and correlates security data, while a SOAR platform focuses on workflow automation, case handling, and orchestrated response actions based on that data.",
              "Um SIEM agrega e correlaciona dados de segurança, enquanto uma plataforma SOAR foca em automacao de fluxo, tratamento de casos e ações de resposta orquestradas com base nesses dados."
            ),
            remediationNote: t(
              "Many products blur the line, but the conceptual distinction on the exam remains correlation versus orchestrated action.",
              "Muitos produtos misturam as fronteiras, mas a distincao conceitual na prova continua sendo correlacao versus ação orquestrada."
            ),
            options: [
              option(
                "A",
                true,
                t("SIEM correlates security events; SOAR automates and orchestrates response workflows", "SIEM correlaciona eventos de segurança; SOAR automatiza e orquestra fluxos de resposta"),
                t("Correct. That is the primary conceptual difference.", "Correto. Essa é a diferença conceitual principal.")
              ),
              option(
                "B",
                false,
                t("SIEM is for physical security only; SOAR is for network security only", "SIEM e apenas para segurança física; SOAR e apenas para segurança de rede"),
                t("Not best. The distinction is not based on physical versus network security.", "Não é a melhor. A distincao não se baseia em segurança física versus segurança de rede.")
              ),
              option(
                "C",
                false,
                t("SOAR replaces the need for any human analyst", "SOAR substitui a necessidade de qualquer analista humano"),
                t("Not best. SOAR accelerates and structures response but does not eliminate human judgment.", "Não é a melhor. SOAR acelera e estrutura resposta, mas não élimina julgamento humano.")
              )
            ]
          }
        }),
        lesson({
          slug: "threat-intelligence-hunting-and-ueba",
          estimatedMinutes: 8,
          title: t("Threat intelligence, hunting, and UEBA", "Inteligencia de ameaças, hunting e UEBA"),
          summary: t(
            "Learn how threat intelligence, hunting, and UEBA help find what alerts miss.",
            "Aprenda como inteligencia de ameaças, hunting e UEBA ajudam a encontrar o que os alertas não viram."
          ),
          objective: t(
            "Use threat intelligence, STIX and TAXII, kill-chain thinking, hunting, and UEBA to improve priorities.",
            "Use inteligencia de ameaças, STIX e TAXII, pensamento em kill chain, hunting e UEBA para melhorar prioridades."
          ),
          blocks: [
            introBlock(
              t(
                "Reactive operations wait for the system to complain. Strong operations also look for what the system failed to notice, using outside intelligence and internal behavioral anomalies as clues.",
                "Operações reativas esperam o sistema reclamar. Operações fortes também procuram o que o sistema falhou em notar, usando inteligencia externa e anomalias comportamentais internas como pistas."
              )
            ),
            conceptBlock(
              "intelligence-sharing",
              t("Threat intelligence is useful only when it becomes action", "Inteligencia de ameaças só é útil quando vira ação"),
              t(
                "Indicators, adversary behavior, TTPs, and sharing standards such as STIX and TAXII help teams consume outside knowledge faster, but the value appears only when detections, blocks, and hunting hypotheses actually change.",
                "Indicadores, comportamento de adversário, TTPs e padrões de compartilhamento como STIX e TAXII ajudam equipes a consumir conhecimento externo mais rápido, mas o valor só aparece quando detecções, bloqueios e hipóteses de hunting realmente mudam."
              )
            ),
            conceptBlock(
              "kill-chain-and-hunting",
              t("Hunting works better when you know the adversary workflow", "Hunting funciona melhor quando você conhece o fluxo do adversário"),
              t(
                "Kill-chain and ATT&CK-style thinking help teams ask where an adversary would reconnoiter, establish persistence, move laterally, or exfiltrate. Hunting is hypothesis-driven, not random searching.",
                "Pensamento em kill chain e ATT&CK ajuda equipes a perguntar onde um adversário faria reconhecimento, estabeleceria persistência, se moveria lateralmente ou exfiltraria dados. Hunting é guiado por hipótese, não por busca aleatória."
              )
            ),
            conceptBlock(
              "ueba",
              t("Behavior analytics looks for what is unusual for this subject here and now", "Análise comportamental procura o que e incomum para este sujeito aqui e agora"),
              t(
                "UEBA compares users and entities against expected behavioral baselines. It can reveal subtle credential abuse, insider activity, and compromised accounts that signature-only tools might miss.",
                "UEBA compara usuários e entidades com baselines comportamentais esperados. Ele pode revelar abuso sutil de credenciais, atividade interna e contas comprometidas que ferramentas baseadas apenas em assinaturas podem perder."
              )
            ),
            conceptBlock(
              "signal-quality",
              t("Behavior tools still need tuning and context", "Ferramentas comportamentais ainda precisam de ajuste e contexto"),
              t(
                "Behavior-based detections are powerful, but false positives increase when baselines are weak, labels are poor, or seasonal and business-context changes are ignored. Human interpretation still matters.",
                "Detecções baseadas em comportamento são poderosas, mas falsos positivos aumentam quando baselines são fracos, a rotulagem é ruim ou mudanças sazonais e de contexto de negócio são ignoradas. Interpretação humana continua importando."
              )
            ),
            movieCueBlock({
              title: t("Minority Report", "Minority Report"),
              cue: t(
                "Think about how prediction had value only when patterns were interpreted in context instead of treated as self-explanatory truth.",
                "Pense em como previsão só tinha valor quando padrões eram interpretados em contexto em vez de tratados como verdade autoexplicativa."
              ),
              body: t(
                "Use that cue for hunting and UEBA: intelligence and anomaly are clues, not verdicts, until the team validates them against reality.",
                "Use essa pista para hunting e UEBA: inteligencia e anomalia são pistas, não veredictos, até que a equipe as valide contra a realidade."
              )
            }),
            keyPointsBlock(
              t(
                "Convert threat intelligence into detections and hunts. Use behavior analytics to spot subtle misuse. Keep human context in the loop so anomaly does not become noise.",
                "Converta inteligência de ameaças em detecções e hunts. Use análise comportamental para identificar uso indevido sutil. Mantenha contexto humano no loop para que anomalia não vire ruído."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY value of UEBA in security operations?",
              "Qual é o valor PRIMARIO do UEBA em operações de segurança?"
            ),
            supportText: t(
              "Choose the answer focused on detecting suspicious deviations from expected user or entity behavior.",
              "Escolha a resposta focada em detectar desvios suspeitos do comportamento esperado de usuários ou entidades."
            ),
            correctRationale: t(
              "UEBA helps identify abnormal behavior compared with expected baselines, which is useful for spotting compromised accounts, insider misuse, and subtle anomalies that signature rules may miss.",
              "UEBA ajuda a identificar comportamento anormal comparado com baselines esperados, o que é útil para detectar contas comprometidas, uso indevido interno e anomalias sutis que regras de assinatura podem perder."
            ),
            remediationNote: t(
              "UEBA does not replace all other detections; it adds another lens centered on behavior rather than only indicators or signatures.",
              "UEBA não substitui todas as outras detecções; ele adiciona outra lente centrada em comportamento em vez de apenas indicadores ou assinaturas."
            ),
            options: [
              option(
                "A",
                true,
                t("Detecting deviations from expected user and entity behavior", "Detectar desvios do comportamento esperado de usuários e entidades"),
                t("Correct. That is UEBA's defining operational value.", "Correto. Esse e o valor operacional definidor do UEBA.")
              ),
              option(
                "B",
                false,
                t("Replacing the need for log collection", "Substituir a necessidade de coleta de logs"),
                t("Not best. UEBA depends on telemetry; it does not replace it.", "Não é a melhor. UEBA depende de telemetria; não a substitui.")
              ),
              option(
                "C",
                false,
                t("Generating PKI certificate revocation lists", "Gerar listas de revogação de certificados PKI"),
                t("Not best. UEBA is unrelated to certificate revocation management.", "Não é a melhor. UEBA não se relaciona a gestão de revogação de certificados.")
              )
            ]
          }
        }),
        lesson({
          slug: "configuration-change-and-privilege-control",
          estimatedMinutes: 8,
          title: t("Configuration, change, and privilege control", "Configuração, mudança e controle de privilégio"),
          summary: t(
            "Learn how baselines, change control, and privilege discipline keep operations stable.",
            "Aprenda como baselines, controle de mudança e disciplina de privilégio mantêm operações estaveis."
          ),
          objective: t(
            "Apply baseline management, hardening, change control, separation of duties, and privileged access constraints.",
            "Aplique gestão de baseline, hardening, controle de mudança, segregacao de funções e restricoes de acesso privilegiado."
          ),
          blocks: [
            introBlock(
              t(
                "Operations become fragile when change is invisible and privilege is casual. Many large incidents exploit the gap between what the team thinks the environment looks like and what actually drifted into production.",
                "Operações se tornam frágeis quando mudança e invisível e privilégio e casual. Muitos grandes incidentes exploram a lacuna entre o que a equipe pensa que o ambiente parece e o que de fato desviou para a produção."
              )
            ),
            conceptBlock(
              "baseline-and-hardening",
              t("A baseline is the reference state you are willing to defend", "Um baseline e o estado de referência que você esta disposto a defender"),
              t(
                "Configuration baselines and hardening standards help teams know what normal means for servers, endpoints, cloud workloads, and network devices. Without a baseline, drift is hard to see and harder to reverse safely.",
                "Baselines de configuração e padrões de hardening ajudam equipes a saber o que normal significa para servidores, endpoints, workloads em nuvem e dispositivos de rede. Sem baseline, desvio é difícil de ver e mais dificil ainda de reverter com segurança."
              )
            ),
            conceptBlock(
              "change-control",
              t("Change management is a security control because most outages and exposures are self-inflicted", "Gestão de mudança e controle de segurança porque a maioria das indisponibilidades e exposicoes e autoinfligida"),
              t(
                "Standard, normal, and emergency changes should follow documented approval, testing, rollback, and communication paths. Speed matters, but ungoverned change often causes the very outages and weaknesses the team is trying to prevent.",
                "Mudanças padrão, normais e de emergencia devem seguir caminhos documentados de aprovação, teste, rollback e comunicação. Velocidade importa, mas mudança sem governança frequentemente causa as indisponibilidades e fraquezas que a equipe esta tentando evitar."
              )
            ),
            conceptBlock(
              "sod-split-knowledge-job-rotation",
              t("Human controls reduce the damage one trusted insider can cause", "Controles humanos reduzem o dano que um insider confiável pode causar"),
              t(
                "Separation of duties, split knowledge, dual control, mandatory vacations, and job rotation all reduce opportunities for concealed abuse and long-running fraud or sabotage. They are operations controls, not just governance slogans.",
                "Segregação de funções, conhecimento dividido, controle dual, férias obrigatórias e rotação de função reduzem oportunidades de abuso oculto e fraude ou sabotagem duradouras. São controles operacionais, não apenas slogans de governança."
              )
            ),
            conceptBlock(
              "service-level-commitments",
              t("Operational agreements define expected behavior under pressure", "Acordos operacionais definem comportamento esperado sob pressão"),
              t(
                "SLAs, OLAs, and MOUs help teams align expectations about recovery time, support responsibility, escalation, and dependency performance. Good operations is partly technical and partly contractual clarity.",
                "SLAs, OLAs e MOUs ajudam equipes a alinhar expectativas sobre tempo de recuperação, responsabilidade de suporte, escalacao e desempenho de dependências. Boas operações são parte técnica e parte clareza contratual."
              )
            ),
            movieCueBlock({
              title: t("Apollo 13", "Apollo 13"),
              cue: t(
                "Think about how survival depended on known baselines, carefully controlled changes, and disciplined roles under extreme pressure.",
                "Pense em como a sobrevivencia dependia de baselines conhecidos, mudanças cuidadosamente controladas e papéis disciplinados sob extrema pressão."
              ),
              body: t(
                "Use that cue for operations control: disciplined change and constrained privilege keep stress from becoming catastrophe.",
                "Use essa pista para controle operacional: mudança disciplinada e privilégio restrito impedem estresse de virar catástrofe."
              )
            }),
            keyPointsBlock(
              t(
                "Know the baseline, govern the change, narrow the privilege, and use human process controls to reduce concealed misuse and fragile operations.",
                "Conheca o baseline, governe a mudança, estreite o privilégio e use controles humanos de processo para reduzir uso indevido oculto e operações frágeis."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY security benefit of separation of duties?",
              "Qual é o beneficio de segurança PRIMARIO da segregacao de funções?"
            ),
            supportText: t(
              "Choose the answer focused on preventing one person from controlling an entire sensitive process alone.",
              "Escolha a resposta focada em impedir qué uma pessoa controle sozinha um processo sensível inteiro."
            ),
            correctRationale: t(
              "Separation of duties reduces fraud, abuse, and error by ensuring that no single person can complete all parts of a sensitive action without oversight or collaboration.",
              "Segregação de funções reduz fraude, abuso e erro ao garantir que nenhuma pessoa possa completar todas as partes dé uma ação sensível sem supervisão ou colaboração."
            ),
            remediationNote: t(
              "It is not mainly about speeding work up; it is about reducing concentrated unchecked power.",
              "Ela não trata principalmente de acelerar o trabalho; trata de reduzir poder concentrado sem controle."
            ),
            options: [
              option(
                "A",
                true,
                t("It prevents one person from having unchecked end-to-end control over sensitive actions", "Ela impede qué uma pessoa tenha controle ponta a ponta sem fiscalizacao sobre ações sensíveis"),
                t("Correct. That is the core purpose of separation of duties.", "Correto. Esse e o propósito central da segregacao de funções.")
              ),
              option(
                "B",
                false,
                t("It guarantees that emergency changes never need approval", "Ela garante que mudanças de emergencia nunca precisem de aprovação"),
                t("Not best. Emergency changes still require governance, even if the path is modified.", "Não é a melhor. Mudanças de emergencia ainda exigem governança, mesmo que o caminho seja adaptado.")
              ),
              option(
                "C",
                false,
                t("It replaces the need for access reviews", "Ela substitui a necessidade de revisões de acesso"),
                t("Not best. Reviews are still necessary; these are complementary controls.", "Não é a melhor. Revisões continuam necessárias; esses controles se complementam.")
              )
            ]
          }
        }),
        lesson({
          slug: "incident-management-and-operational-response",
          estimatedMinutes: 9,
          title: t("Incident management and operational response", "Gestão de incidentes e resposta operacional"),
          summary: t(
            "Learn how incident response moves from detection to recovery and lessons learned.",
            "Aprenda como resposta a incidentes vai da detecção a recuperação e licoes aprendidas."
          ),
          objective: t(
            "Run incident response from preparation through lessons learned while preserving evidence and coordinating stakeholders.",
            "Conduza resposta a incidentes da preparacao até as licoes aprendidas preservando evidências e coordenando stakeholders."
          ),
          blocks: [
            introBlock(
              t(
                "Incident response is not one heroic moment. It is a practiced sequence of roles, decisions, communications, and technical actions that keeps the organization from making a bad situation worse.",
                "Resposta a incidentes não é um único momento heroico. É uma sequencia práticada de papéis, decisões, comúnicacoes e ações técnicas que impede a organização de piorar uma situacao ruim."
              )
            ),
            conceptBlock(
              "response-cycle",
              t("Every mature response model includes preparation, action, and learning", "Todo modelo maduro de resposta inclui preparacao, ação e aprendizado"),
              t(
                "Whether you remember preparation, detection, analysis, containment, eradication, recovery, and lessons learned or another model such as DRMRRRL, the core idea is the same: response is a lifecycle, not a single command.",
                "Se você lembrar de preparacao, detecção, análise, contencao, erradicacao, recuperação e licoes aprendidas ou de outro modelo como DRMRRRL, a ideia central e a mesma: resposta e um ciclo de vida, não um comando único."
              )
            ),
            conceptBlock(
              "containment-vs-eradication",
              t("Containment is not eradication, and confusion here is costly", "Contencao não é erradicacao, e confusão aqui custa caro"),
              t(
                "Containment limits spread and buys time. Eradication removes the cause. Recovery restores normal service. Skipping or collapsing those phases creates repeat compromise and unstable restoration.",
                "Contencao limita propagacao e compra tempo. Erradicacao remove a causa. Recuperação restaura serviço normal. Pular ou misturar essas fases cria comprometimento recorrente e restauração instavel."
              )
            ),
            conceptBlock(
              "stakeholders-and-reporting",
              t("Incident communication is part of response, not paperwork after the fact", "Comunicação de incidente faz parte da resposta, não é papelada posterior"),
              t(
                "Legal counsel, executive leadership, communications, regulators, customers, and responders all need different information at different times. The plan should define who communicates, when, and with what authority.",
                "Jurídico, liderança executiva, comunicação, reguladores, clientes e respondentes precisam de informações diferentes em momentos diferentes. O plano deve definir quem comúnica, quando e com qual autoridade."
              )
            ),
            conceptBlock(
              "lessons-learned",
              t("A resolved incident still has value left in it", "Um incidente resolvido ainda tem valor a extrair"),
              t(
                "Post-incident review should examine what detection worked, what slowed response, what controls failed, what decisions were delayed, and what the organization will change before the next event. Otherwise the same pain repeats.",
                "Revisão pós-incidente deve examinar que detecção funcionou, o que atrasou a resposta, quais controles falharam, quais decisões demoraram e o que a organização mudará antes do próximo evento. Caso contrário, a mesma dor se repete."
              )
            ),
            movieCueBlock({
              title: t("Contagion", "Contagio"),
              cue: t(
                "Think about how response required clear phases, controlled communication, and deliberate action instead of panic-driven improvisation.",
                "Pense em como a resposta exigia fases claras, comunicação controlada e ação deliberada em vez de improvisacao guiada pelo panico."
              ),
              body: t(
                "Use that cue for incident management: success depends on process discipline before technical brilliance.",
                "Use essa pista para gestão de incidentes: sucesso depende de disciplina de processo antes de brilho técnico."
              )
            }),
            keyPointsBlock(
              t(
                "Prepare before the incident. Distinguish containment, eradication, and recovery. Coordinate communication deliberately, and turn every major event into improved readiness.",
                "Prepare-se antes do incidente. Diferencie contencao, erradicacao e recuperação. Coordene a comunicação de forma deliberada e transforme cada grande evento em prontidão melhorada."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which response phase is focused on limiting the spread and impact of an incident while the team prepares deeper corrective action?",
              "Qual fase da resposta e focada em limitar propagacao e impacto de um incidente enquanto a equipe prepara ação corretiva mais profunda?"
            ),
            supportText: t(
              "Choose the phase that buys time and reduces further damage, not the phase that permanently removes the cause.",
              "Escolha a fase que compra tempo e reduz mais danos, não a fase que remove permanentemente a causa."
            ),
            correctRationale: t(
              "Containment is about limiting spread and impact. It is distinct from eradication, which removes the root cause, and from recovery, which restores normal service.",
              "Contencao trata de limitar propagacao e impacto. Ela é distinta de erradicacao, que remove a causa raiz, e de recuperação, que restaura serviço normal."
            ),
            remediationNote: t(
              "Teams often confuse containment with eradication, but the exam expects you to separate their purposes clearly.",
              "Equipes frequentemente confundem contencao com erradicacao, mas a prova espera que você separe claramente seus objetivos."
            ),
            options: [
              option(
                "A",
                true,
                t("Containment", "Contencao"),
                t("Correct. Containment limits spread and buys time.", "Correto. Contencao limita propagacao e compra tempo.")
              ),
              option(
                "B",
                false,
                t("Eradication", "Erradicacao"),
                t("Not best. Eradication removes the cause, which usually comes after immediate containment.", "Não é a melhor. Erradicacao remove a causa, o que geralmente vem depois da contencao imediata.")
              ),
              option(
                "C",
                false,
                t("Lessons learned", "Licoes aprendidas"),
                t("Not best. Lessons learned happens after the operational response has stabilized.", "Não é a melhor. Licoes aprendidas acontecem depois qué a resposta operacional se estabiliza.")
              )
            ]
          }
        }),
        lesson({
          slug: "preventive-and-detective-measures",
          estimatedMinutes: 8,
          title: t("Preventive and detective measures", "Medidas preventivas e de detecção"),
          summary: t(
            "Learn how layered preventive, detective, and deception controls work together.",
            "Aprenda como controles preventivos, de detecção e de deception funcionam juntos em camadas."
          ),
          objective: t(
            "Place preventive, detective, and deception controls so they reinforce each other.",
            "Posicione controles preventivos, de detecção e de deception para que se reforcem."
          ),
          blocks: [
            introBlock(
              t(
                "No single product stops attacks. Real operations slow adversaries, detect deviations, and gather evidence across multiple layers so one missed control does not become one full compromise.",
                "Nenhum produto isolado para ataques. Operações reais desaceleram adversários, detectam desvios e coletam evidência em múltiplas camadas para que um controle perdido não vire um comprometimento completo."
              )
            ),
            conceptBlock(
              "network-controls",
              t("Firewalls and IDS or IPS still matter when they are placed with purpose", "Firewalls e IDS ou IPS ainda importam quando são posicionados com propósito"),
              t(
                "Packet filters, stateful firewalls, application-aware filters, IDS, and IPS each have strengths and blind spots. Placement at boundaries, between zones, and near sensitive services determines their real value.",
                "Filtros de pacotes, firewalls stateful, filtros conscientes de aplicação, IDS e IPS possuem forças e pontos cegos. O posicionamento em fronteiras, entre zonas e perto de serviços sensíveis determina seu valor real."
              )
            ),
            conceptBlock(
              "malware-and-sandboxing",
              t("Endpoint and content controls matter because many attacks arrive as files or processes", "Controles de endpoint e conteúdo importam porque muitos ataques chegam como arquivos ou processos"),
              t(
                "Anti-malware, allowlists, behavioral controls, and sandboxing help catch malicious code before or during execution. Sandboxes are especially useful for analyzing suspicious content in isolation before it can affect production assets.",
                "Anti-malware, allowlists, controles comportamentais e sandboxing ajudam a capturar código malicioso antes ou durante a execução. Sandboxes são especialmente úteis para analisar conteúdo suspeito em isolamento antes que afete ativos de produção."
              )
            ),
            conceptBlock(
              "deception",
              t("Deception controls create signal out of adversary curiosity", "Controles de deception criam sinal a partir da curiosidade do adversário"),
              t(
                "Honeypots, honeynets, canary tokens, and decoy resources are valuable because legitimate users should rarely touch them. That turns interaction itself into a strong detection signal.",
                "Honeypots, honeynets, canary tokens e recursos isca são valiosos porque usuários legitimos raramente deveriam toca-los. Isso transforma a própria interação em forte sinal de detecção."
              )
            ),
            conceptBlock(
              "layering-and-tuning",
              t("Prevention without tuning becomes denial of service against yourself", "Prevencao sem ajuste vira negacao de serviço contra você mesmo"),
              t(
                "Operations has to tune thresholds, exceptions, and placement carefully. Overaggressive controls create outages and analyst fatigue; underaggressive controls create silent compromise. Security operations lives in that balance.",
                "Operações precisam ajustar cuidadosamente limites, excecoes e posicionamento. Controles agressivos demais criam indisponibilidades e fadiga de analistas; controles pouco agressivos criam comprometimento silencioso. Operações de segurança vivem nesse equilibrio."
              )
            ),
            movieCueBlock({
              title: t("Home Alone", "Esqueceram de Mim"),
              cue: t(
                "Think about how the defense worked through layered obstacles, early signals, and traps that revealed intent before the attackers reached the most valuable target.",
                "Pense em como a defesa funcionava por obstaculos em camadas, sinais antecipados e armadilhas que revelavam intencao antes que os atacantes alcancassem o alvo mais valioso."
              ),
              body: t(
                "Use that cue for preventive and detective controls: value comes from layered friction and timely signal, not from one perfect barrier.",
                "Use essa pista para controles preventivos e de detecção: o valor vem de atrito em camadas e sinal oportuno, não dé uma barreira perfeita."
              )
            }),
            keyPointsBlock(
              t(
                "Layer preventive and detective controls. Place them where trust boundaries matter. Tune them so they slow attackers without crippling normal operations.",
                "Coloque em camadas controles preventivos e de detecção. Posicione-os onde limites de confiança importam. Ajuste-os para desacelerar atacantes sem paralisar operações normais."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Why are honeypots and canary resources useful in operations?",
              "Por que honeypots e recursos canario são úteis em operações?"
            ),
            supportText: t(
              "Choose the answer that focuses on high-signal detection rather than primary business use.",
              "Escolha a resposta que foca em detecção de alto sinal em vez de uso principal de negócio."
            ),
            correctRationale: t(
              "They are useful because legitimate users rarely interact with them, so any contact becomes a strong suspicious signal that can trigger investigation or automated response.",
              "Eles são úteis porque usuários legitimos raramente interagem com eles, entao qualquer contato se torna forte sinal suspeito que pode acionar investigacao ou resposta automatizada."
            ),
            remediationNote: t(
              "These resources are not meant to carry business-critical work; their value is in attracting or exposing malicious activity.",
              "Esses recursos não éxistem para carregar trabalho crítico de negócio; seu valor esta em atrair ou expor atividade maliciosa."
            ),
            options: [
              option(
                "A",
                true,
                t("Because interaction with them is unusual and therefore high-value as a detection signal", "Porque interação com eles e incomum e portanto de alto valor como sinal de detecção"),
                t("Correct. Their strength is the quality of the signal they create.", "Correto. A força deles esta na qualidade do sinal que criam.")
              ),
              option(
                "B",
                false,
                t("Because they replace the need for endpoint security", "Porque substituem a necessidade de segurança de endpoint"),
                t("Not best. They are complementary detection tools, not replacements for endpoint protection.", "Não é a melhor. Eles são ferramentas complementares de detecção, não substitutos da proteção de endpoint.")
              ),
              option(
                "C",
                false,
                t("Because they increase application performance", "Porque aumentam o desempenho da aplicação"),
                t("Not best. Their purpose is security signal, not performance optimization.", "Não é a melhor. O propósito deles e sinal de segurança, não otimização de desempenho.")
              )
            ]
          }
        }),
        lesson({
          slug: "resilience-backups-dr-bc-and-people-safety",
          estimatedMinutes: 9,
          title: t("Resilience, backups, continuity, and people safety", "Resiliência, backups, continuidade e segurança das pessoas"),
          summary: t(
            "Learn how backups, recovery, continuity, and people safety support resilience.",
            "Aprenda como backups, recuperação, continuidade e segurança das pessoas apoiam a resiliência."
          ),
          objective: t(
            "Design backups, disaster recovery, business continuity, recovery-site strategy, and people-safety practices that keep the mission running.",
            "Desenhe backups, recuperação de desastre, continuidade de negócio, estratégia de sites de recuperação e práticas de segurança das pessoas que mantenham a missão funcionando."
          ),
          blocks: [
            introBlock(
              t(
                "Security operations is not only about stopping bad events. It is also about continuing essential work when bad events happen anyway. Resilience is where technical recovery, business priorities, and human safety finally meet.",
                "Operações de segurança não são apenas sobre impedir eventos ruins. Elas também tratam de continuar trabalho essencial quando eventos ruins acontecem de qualquer forma. Resiliência é onde recuperação técnica, prioridades de negócio e segurança humana finalmente se encontram."
              )
            ),
            conceptBlock(
              "backup-discipline",
              t("Backups matter only when recovery is tested", "Backups só importam quando a recuperação e testada"),
              t(
                "Full, differential, incremental, snapshot, continuous, and immutable backups each solve different recovery goals. The 3-2-1 mindset and routine restore testing matter because existence alone does not equal recoverability.",
                "Backups full, differential, incremental, snapshot, contínuo e imutável resolvem objetivos de recuperação diferentes. A mentalidade 3-2-1 e testes rotineiros de restauração importam porque mera existência não équivale a recuperabilidade."
              )
            ),
            conceptBlock(
              "dr-and-bc",
              t("Disaster recovery restores systems; business continuity preserves mission", "Recuperação de desastre restaura sistemas; continuidade de negócio preserva a missão"),
              t(
                "Disaster recovery focuses on restoring technology and data. Business continuity focuses on maintaining essential business capability through workarounds, alternative processes, and prioritized service restoration.",
                "Recuperação de desastre foca em restaurar tecnologia e dados. Continuidade de negócio foca em manter capacidade essencial do negócio por meio de contornos, processos alternativos e restauração priorizada de serviços."
              )
            ),
            conceptBlock(
              "sites-and-ha",
              t("Warm, hot, cold, and redundant strategies trade cost for recovery speed", "Estratégias warm, hot, cold e redundantes trocam custo por velocidade de recuperação"),
              t(
                "Cold, warm, hot, and fully redundant sites each shorten recovery differently and cost differently. High availability, clustering, RAID, and failover help reduce service interruption, but they should align with business recovery objectives rather than wishful engineering.",
                "Sites cold, warm, hot e totalmente redundantes encurtam a recuperação de modos diferentes e custam de modos diferentes. Alta disponibilidade, clusterizacao, RAID e failover ajudam a reduzir interrupção de serviço, mas devem se alinhar a objetivos de recuperação do negócio e não a engenharia idealizada."
              )
            ),
            conceptBlock(
              "people-and-physical-safety",
              t("Human safety and resilience practices are part of operations security", "Segurança humana e práticas de resiliência fazem parte da segurança operacional"),
              t(
                "Travel risk, insider stress, duress signals, social engineering, workplace violence, evacuation, and physical access during crisis all affect operational security. An available system is not success if people are left unsafe or unsupported.",
                "Risco de viagem, estresse interno, sinais de coercao, engenharia social, violencia no trabalho, evacuacao e acesso físico durante crise afetam segurança operacional. Um sistema disponivel não é sucesso se pessoas forem deixadas inseguras ou sem suporte."
              )
            ),
            movieCueBlock({
              title: t("The Impossible", "O Impossível"),
              cue: t(
                "Think about how surviving disruption required not only infrastructure recovery, but also prioritizing people, communication, and staged restoration under chaos.",
                "Pense em como sobreviver a interrupção exigiu não apenas recuperação de infraestrutura, mas também priorizar pessoas, comunicação e restauração em fases sob caos."
              ),
              body: t(
                "Use that cue for resilience: recovery plans fail when they restore systems but ignore people, priorities, and realistic operating conditions.",
                "Use essa pista para resiliência: planos de recuperação falham quando restauram sistemas, mas ignoram pessoas, prioridades e condições operacionais realistas."
              )
            }),
            keyPointsBlock(
              t(
                "Test restore, not just backup. Distinguish DR from BC. Match recovery-site strategy to real business objectives, and treat people safety as part of operational resilience.",
                "Teste restauração, não apenas backup. Diferencie DR de BC. Ajuste a estratégia de site de recuperação aos objetivos reais do negócio e trate segurança das pessoas como parte da resiliência operacional."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which statement BEST distinguishes disaster recovery from business continuity?",
              "Qual afirmação MELHOR distingue recuperação de desastre de continuidade de negócio?"
            ),
            supportText: t(
              "Choose the answer that separates restoring technology from maintaining mission operations.",
              "Escolha a resposta que separa restaurar tecnologia de manter operações da missão."
            ),
            correctRationale: t(
              "Disaster recovery focuses on restoring systems and data after a disruption, while business continuity focuses on keeping essential business functions operating or recoverable through alternative means during and after the disruption.",
              "Recuperação de desastre foca em restaurar sistemas e dados após uma interrupção, enquanto continuidade de negócio foca em manter funções essenciais do negócio operando ou recuperáveis por meios alternativos durante e depois da interrupção."
            ),
            remediationNote: t(
              "They are related, but they are not synonyms. One is technology restoration; the other is mission continuity.",
              "Eles são relacionados, mas não sinônimos. Um trata de restauração tecnológica; o outro, de continuidade da missão."
            ),
            options: [
              option(
                "A",
                true,
                t("Disaster recovery restores technology; business continuity preserves essential operations", "Recuperação de desastre restaura tecnologia; continuidade de negócio preserva operações essenciais"),
                t("Correct. That is the key distinction the exam expects.", "Correto. Essa é a distincao-chave que a prova espera.")
              ),
              option(
                "B",
                false,
                t("Business continuity only applies to physical security, while disaster recovery only applies to cloud systems", "Continuidade de negócio só se aplica a segurança física, enquanto recuperação de desastre só se aplica a sistemas em nuvem"),
                t("Not best. Both concepts apply broadly across business and technology environments.", "Não é a melhor. Ambos os conceitos se aplicam amplamente a ambientes de negócio e tecnologia.")
              ),
              option(
                "C",
                false,
                t("They are two names for the same operational process", "São dois nomes para o mesmo processo operacional"),
                t("Not best. They are tightly related, but they focus on different recovery questions.", "Não é a melhor. Eles são intimamente relacionados, mas focam em perguntas de recuperação diferentes.")
              )
            ]
          }
        })
      ]
    },
    {
      number: 8,
      slug: "software-development-security",
      estimatedMinutes: 56,
      title: t("Software Development Security", "Segurança no Desenvolvimento de Software"),
      summary: t(
        "Learn how to build security into software from requirements to retirement.",
        "Aprenda como colocar segurança no software desde os requisitos até a aposentadoria."
      ),
      objective: t(
        "Understand how SDLC, architecture, testing, data handling, supply chain, and secure coding shape software risk.",
        "Entenda como SDLC, arquitetura, testes, tratamento de dados, supply chain e codificação segura moldam o risco de software."
      ),
      lessons: [
        lesson({
          slug: "secure-sdlc-and-development-methodologies",
          estimatedMinutes: 8,
          title: t("Secure SDLC and development methodologies", "SDLC seguro e metodologias de desenvolvimento"),
          summary: t(
            "Learn how to put security into every stage of the SDLC.",
            "Aprenda como colocar segurança em cada etapa do SDLC."
          ),
          objective: t(
            "Compare lifecycle models and embed security without slowing delivery blindly.",
            "Compare modelos de ciclo de vida e incorpore segurança sem travar a entrega sem necessidade."
          ),
          blocks: [
            introBlock(
              t(
                "Software security begins before code exists. It starts with how the organization defines requirements, revisits risk, learns from feedback, and decides who owns security decisions at each stage of delivery.",
                "Segurança de software começa antes de o código existir. Ela começa na forma como a organização define requisitos, revisita risco, aprende com feedback e decide quem possui as decisões de segurança em cada etapa da entrega."
              )
            ),
            conceptBlock(
              "methodology-tradeoffs",
              t("Methodology changes timing, not responsibility", "Metodologia muda o timing, não a responsabilidade"),
              t(
                "Waterfall, spiral, agile, and V-model organize feedback and verification differently, but all still require security requirements, design review, testing, and change control. DevSecOps moves those controls earlier and makes them continuous.",
                "Waterfall, spiral, agile e V-model organizam feedback e verificacao de formas diferentes, mas todos ainda exigem requisitos de segurança, revisão de design, testes e controle de mudança. DevSecOps move esses controles para mais cedo e os torna contínuos."
              )
            ),
            conceptBlock(
              "abuse-cases-and-requirements",
              t("Security requirements should describe how the system fails, not only how it succeeds", "Requisitos de segurança devem descrever como o sistema falha, não apenas como tem sucesso"),
              t(
                "Abuse cases, misuse stories, trust boundaries, and privacy expectations help teams design against adversarial behavior early. If the only requirements cover happy-path business features, major risks arrive late and expensively.",
                "Abuse cases, historias de misuse, limites de confiança e expectativas de privacidade ajudam equipes a projetar contra comportamento adversarial cedo. Se os únicos requisitos cobrem funcionalidades felizes de negócio, grandes riscos chegam tarde e de forma cara."
              )
            ),
            conceptBlock(
              "devsecops",
              t("DevSecOps is continuous integration of security work, not a new team name", "DevSecOps é integração contínua do trabalho de segurança, não um novo nome de equipe"),
              t(
                "DevSecOps means policies, scans, reviews, secrets handling, dependency checks, and deployment gates are embedded in the pipeline and development workflow instead of waiting for a final security handoff.",
                "DevSecOps significa que políticas, scans, revisões, tratamento de segredos, verificações de dependências e gates de deploy estão embutidos no pipeline e no fluxo de desenvolvimento em vez de esperar uma entrega final para segurança."
              )
            ),
            conceptBlock(
              "change-and-traceability",
              t("Secure delivery needs traceability from requirement to release", "Entrega segura precisa de rastreabilidade do requisito ao release"),
              t(
                "Traceability links security requirements, design decisions, test evidence, defect records, and release approvals. That link helps prove not only that work was done, but why the release deserves trust.",
                "Rastreabilidade liga requisitos de segurança, decisões de design, evidência de teste, registros de defeito e aprovacoes de release. Esse encadeamento ajuda a provar não apenas que o trabalho foi feito, mas por que o release merece confiança."
              )
            ),
            movieCueBlock({
              title: t("Ford v Ferrari", "Ford vs Ferrari"),
              cue: t(
                "Think about how performance became reliable only when design, testing, iteration, and operational feedback were part of one disciplined system.",
                "Pense em como o desempenho só se tornou confiável quando design, teste, iteracao e feedback operacional fizeram parte de um sistema disciplinado único."
              ),
              body: t(
                "Use that cue for SDLC security: software quality and software security both depend on integrating feedback early and continuously.",
                "Use essa pista para segurança no SDLC: qualidade e segurança de software dependem de integrar feedback cedo é contínuamente."
              )
            }),
            keyPointsBlock(
              t(
                "Put security requirements and abuse thinking into the lifecycle early. Choose a methodology that still preserves traceability, review, and continuous security evidence.",
                "Coloque requisitos de segurança e pensamento de abuso cedo no ciclo de vida. Escolha uma metodologia que ainda preserve rastreabilidade, revisão e evidência contínua de segurança."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY goal of DevSecOps?",
              "Qual é o objetivo PRIMARIO de DevSecOps?"
            ),
            supportText: t(
              "Choose the answer that puts security inside the delivery flow.",
              "Escolha a resposta que coloca segurança dentro do fluxo de entrega."
            ),
            correctRationale: t(
              "DevSecOps embeds security controls, testing, and decisions throughout development and deployment. Security becomes part of normal delivery, not a late checkpoint.",
              "DevSecOps embute controles, testes e decisões de segurança ao longo de desenvolvimento e implantação. Segurança vira parte da entrega normal, não um checkpoint tardio."
            ),
            remediationNote: t(
              "The goal is not a new silo. The goal is security feedback inside the work itself.",
              "O objetivo não é um novo silo. O objetivo é feedback de segurança dentro do próprio trabalho."
            ),
            options: [
              option(
                "A",
                true,
                t("To integrate security activities continuously into development and deployment", "Integrar atividades de segurança continuamente a desenvolvimento e implantação"),
                t("Correct. That is the essence of DevSecOps.", "Correto. Essa é a essência de DevSecOps.")
              ),
              option(
                "B",
                false,
                t("To remove developers from security decisions", "Remover desenvolvedores das decisões de segurança"),
                t("Not best. DevSecOps spreads security responsibility rather than removing developers from it.", "Não é a melhor. DevSecOps espalha responsabilidade de segurança em vez de remover desenvolvedores dela.")
              ),
              option(
                "C",
                false,
                t("To delay testing until the end of the release cycle", "Adiar testes até o fim do ciclo de release"),
                t("Not best. DevSecOps moves testing earlier and makes it more continuous.", "Não é a melhor. DevSecOps move testes para mais cedo e os torna mais contínuos.")
              )
            ]
          }
        }),
        lesson({
          slug: "maturity-models-operations-and-change-control",
          estimatedMinutes: 8,
          title: t("Maturity models, operations, and change control", "Modelos de maturidade, operações e controle de mudança"),
          summary: t(
            "Learn how maturity models show whether secure development is repeatable.",
            "Aprenda como modelos de maturidade mostram se desenvolvimento seguro e repetível."
          ),
          objective: t(
            "Use CMM, SAMM, IDEAL, and operational governance to improve delivery discipline over time.",
            "Use CMM, SAMM, IDEAL e governança operacional para melhorar a disciplina de entrega ao longo do tempo."
          ),
          blocks: [
            introBlock(
              t(
                "Teams often ask how secure a product is, but a better question is how repeatably the organization produces secure products. Maturity models answer that process question.",
                "Equipes frequentemente perguntam quão seguro um produto é, mas uma pergunta melhor é quão repetivelmente a organização produz produtos seguros. Modelos de maturidade respondem essa pergunta de processo."
              )
            ),
            conceptBlock(
              "cmm-and-samm",
              t("Maturity models describe capability growth, not perfection", "Modelos de maturidade descrevem crescimento de capacidade, não perfeição"),
              t(
                "Models such as SW-CMM and OWASP SAMM help teams understand whether development practices are ad hoc, defined, measured, and optimized. The point is to see improvement paths, not memorize a badge.",
                "Modelos como SW-CMM e OWASP SAMM ajudam equipes a entender se práticas de desenvolvimento são ad hoc, definidas, medidas e otimizadas. O ponto e enxergar caminhos de melhoria, não memorizar um selo."
              )
            ),
            conceptBlock(
              "ideal-cycle",
              t("Improvement should be cyclical and evidence-based", "Melhoria deve ser cíclica e baseada em evidência"),
              t(
                "IDEAL frames improvement as initiating, diagnosing, establishing, acting, and learning. That pattern matters because secure development is not a one-time project; it is a repeated refinement loop.",
                "IDEAL enquadra melhoria como iniciar, diagnosticar, estabelecer, agir e aprender. Esse padrão importa porque desenvolvimento seguro não é projeto dé uma vez só; e um ciclo repetido de refinamento."
              )
            ),
            conceptBlock(
              "operations-and-release",
              t("Operational discipline keeps secure software secure after release", "Disciplina operacional mantêm software seguro depois do release"),
              t(
                "Maintenance, version control, release management, configuration standards, and change approval all affect whether a secure build remains secure in production. Secure development and secure operations are inseparable.",
                "Manutenção, controle de versão, gestão de release, padrões de configuração e aprovação de mudança afetam se um build seguro permanece seguro em produção. Desenvolvimento seguro e operação segura são inseparáveis."
              )
            ),
            conceptBlock(
              "improvement-governance",
              t("Metrics and retrospectives turn maturity into movement", "Métricas e retrospectivas transformam maturidade em movimento"),
              t(
                "If the team cannot measure defect escape, time to remediate, test coverage, dependency lag, or review quality, maturity becomes a story instead of managed progress.",
                "Se a equipe não consegue medir escape de defeitos, tempo para remediar, cobertura de testes, atraso de dependências ou qualidade de revisão, maturidade vira narrativa em vez de progresso gerenciado."
              )
            ),
            movieCueBlock({
              title: t("Whiplash", "Whiplash"),
              cue: t(
                "Think about how skill improved not through vague ambition, but through disciplined repetition, review, and standards that could be measured against performance.",
                "Pense em como a habilidade melhorou não por ambicao vaga, mas por repeticao disciplinada, revisão e padrões que podiam ser medidos contra desempenho."
              ),
              body: t(
                "Use that cue for maturity: process capability improves when expectations are explicit, reviewed, and refined with evidence.",
                "Use essa pista para maturidade: capacidade de processo melhora quando expectativas são explícitas, revisadas e refinadas com evidência."
              )
            }),
            keyPointsBlock(
              t(
                "Use maturity models to improve repeatability, not to chase labels. Tie development maturity to operations, release discipline, and measurable feedback loops.",
                "Use modelos de maturidade para melhorar repetibilidade, não para perseguir rótulos. Vincule maturidade de desenvolvimento a operações, disciplina de release e ciclos mensuráveis de feedback."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY purpose of a software maturity model such as SAMM or CMM?",
              "Qual é a finalidade PRIMARIA de um modelo de maturidade de software como SAMM ou CMM?"
            ),
            supportText: t(
              "Choose the answer focused on measuring and improving process capability over time.",
              "Escolha a resposta focada em medir e melhorar capacidade de processo ao longo do tempo."
            ),
            correctRationale: t(
              "These models help an organization assess how repeatable and mature its development and security practices are, then identify structured ways to improve them over time.",
              "Esses modelos ajudam uma organização a avaliar quão repetíveis e maduros são seus processos de desenvolvimento e segurança e, entao, identificar formas estruturadas de melhorá-los ao longo do tempo."
            ),
            remediationNote: t(
              "The purpose is capability improvement, not proving that no vulnerabilities will ever exist.",
              "A finalidade e melhorar capacidade, não provar que nenhuma vulnerabilidade jamais existira."
            ),
            options: [
              option(
                "A",
                true,
                t("To assess and improve the repeatability and maturity of development practices", "Avaliar e melhorar a repetibilidade e a maturidade das práticas de desenvolvimento"),
                t("Correct. That is what maturity models are designed to do.", "Correto. E para isso que modelos de maturidade são feitos.")
              ),
              option(
                "B",
                false,
                t("To replace source control and change management", "Substituir controle de versão e gestão de mudança"),
                t("Not best. Those remain essential operational disciplines.", "Não é a melhor. Eles continuam sendo disciplinas operacionais essenciais.")
              ),
              option(
                "C",
                false,
                t("To enforce a specific programming language", "Forçar uma linguagem de programação específica"),
                t("Not best. Maturity models are language-agnostic process frameworks.", "Não é a melhor. Modelos de maturidade são frameworks de processo agnósticos a linguagem.")
              )
            ]
          }
        }),
        lesson({
          slug: "languages-libraries-and-development-ecosystem-controls",
          estimatedMinutes: 8,
          title: t("Languages, libraries, and development ecosystem controls", "Linguagens, bibliotecas e controles do ecossistema de desenvolvimento"),
          summary: t(
            "Learn how languages, libraries, tools, and pipelines affect software risk.",
            "Aprenda como linguagens, bibliotecas, ferramentas e pipelines afetam o risco de software."
          ),
          objective: t(
            "Choose languages, runtimes, dependencies, repositories, and CI/CD controls that reduce common risk.",
            "Escolha linguagens, runtimes, dependências, repositórios e controles de CI/CD que reduzam risco comum."
          ),
          blocks: [
            introBlock(
              t(
                "Secure software is built inside an ecosystem. A brilliant code review means little if the runtime is mismanaged, dependencies are untrusted, or the build pipeline can be tampered with silently.",
                "Software seguro e construído dentro de um ecossistema. Uma revisão de código brilhante significa pouco se o runtime e mal gerenciado, dependências não são confiáveis ou o pipeline de build pode ser adulterado silenciosamente."
              )
            ),
            conceptBlock(
              "language-properties",
              t("Language choices influence the kinds of bugs you fight", "Escolhas de linguagem influenciam os tipos de bugs que você combate"),
              t(
                "Memory-safe languages, managed runtimes, strong type systems, and modern standard libraries can reduce whole classes of defects. Lower-level languages may offer performance and control, but they bring more direct memory and concurrency risk.",
                "Linguagens seguras em memória, runtimes gerenciados, sistemas de tipos fortes e bibliotecas padrão modernas podem reduzir classes inteiras de defeitos. Linguagens de nível mais baixo podem oferecer desempenho e controle, mas trazem mais risco direto de memória e concorrência."
              )
            ),
            conceptBlock(
              "dependencies-and-repositories",
              t("Libraries accelerate delivery but multiply trust decisions", "Bibliotecas aceleram entrega, mas multiplicam decisões de confiança"),
              t(
                "Third-party packages, repositories, and build plugins add capability and risk at the same time. Version pinning, provenance checks, signed artifacts, and dependency review reduce the chance that convenience turns into compromise.",
                "Pacotes de terceiros, repositórios e plugins de build adicionam capacidade e risco ao mesmo tempo. Fixacao de versão, verificações de procedencia, artefatos assinados e revisão de dependências reduzem a chance de que conveniência vire comprometimento."
              )
            ),
            conceptBlock(
              "ide-and-toolchain",
              t("The development toolchain is part of the trusted computing base for software delivery", "A toolchain de desenvolvimento faz parte da base confiável de entrega de software"),
              t(
                "IDEs, build servers, secrets stores, container registries, test frameworks, and deployment tools influence what code gets shipped and how trustworthy it is. Secure delivery means governing those tools, not just the source repository.",
                "IDEs, servidores de build, cofres de segredos, registries de containers, frameworks de teste e ferramentas de deploy influenciam qual código e enviado e quão confiável ele é. Entrega segura significa governar essas ferramentas, não apenas o repositorio fonte."
              )
            ),
            conceptBlock(
              "ci-cd-controls",
              t("CI and CD speed only help when integrity is preserved", "Velocidade de CI e CD só ajuda quando integridade e preservada"),
              t(
                "Branch protections, signed commits or artifacts, pipeline approvals, secret scanning, and environment separation help ensure that automation does not become a high-speed path for malicious or unreviewed code.",
                "Protecoes de branch, commits ou artefatos assinados, aprovacoes de pipeline, varredura de segredos e separacao de ambientes ajudam a garantir que automacao não se torne um caminho de alta velocidade para código malicioso ou não revisado."
              )
            ),
            movieCueBlock({
              title: t("Chef", "Chef"),
              cue: t(
                "Think about how the quality of the final dish depended not only on the chef, but on the ingredients, tools, preparation flow, and discipline of the kitchen around them.",
                "Pense em como a qualidade do prato final dependia não apenas do chef, mas dos ingredientes, ferramentas, fluxo de preparo e disciplina da cozinha ao redor."
              ),
              body: t(
                "Use that cue for software ecosystems: code quality depends on the full supply chain of tools, libraries, and delivery practices around the code itself.",
                "Use essa pista para ecossistemas de software: qualidade do código depende de toda a cadeia de suprimento de ferramentas, bibliotecas e práticas de entrega ao redor do próprio código."
              )
            }),
            keyPointsBlock(
              t(
                "Choose languages and runtimes intentionally. Govern dependencies, repositories, and pipelines as part of software trust, not as background infrastructure.",
                "Escolha linguagens e runtimes intencionalmente. Governe dependências, repositórios e pipelines como parte da confiança do software, não como infraestrutura de fundo."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Why is dependency management a security concern in software development?",
              "Por que gestão de dependências é uma preocupacao de segurança no desenvolvimento de software?"
            ),
            supportText: t(
              "Choose the answer that recognizes third-party code as part of your software's trust boundary.",
              "Escolha a resposta que reconhece código de terceiros como parte do limite de confiança do seu software."
            ),
            correctRationale: t(
              "Dependencies are security concerns because they introduce third-party code, update behavior, and supply-chain trust decisions into the application, potentially adding vulnerabilities or malicious content outside the team's own source code.",
              "Dependências são preocupacoes de segurança porque introduzem código de terceiros, comportamento de atualizacao e decisões de confiança de supply chain na aplicação, potencialmente adicionando vulnerabilidades ou conteúdo malicioso fora do código-fonte da própria equipe."
            ),
            remediationNote: t(
              "A secure application is not defined only by first-party code. The package and build ecosystem matters too.",
              "Uma aplicação segura não é definida apenas pelo código de primeira parte. O ecossistema de pacotes e build também importa."
            ),
            options: [
              option(
                "A",
                true,
                t("Because third-party packages can introduce vulnerabilities and supply-chain risk into the application", "Porque pacotes de terceiros podem introduzir vulnerabilidades e risco de supply chain na aplicação"),
                t("Correct. Dependencies extend your trust boundary and therefore your risk.", "Correto. Dependências estendem seu limite de confiança e, portanto, seu risco.")
              ),
              option(
                "B",
                false,
                t("Because dependencies make code compile faster", "Porque dependências fazem o código compilar mais rápido"),
                t("Not best. Performance is not the central security concern here.", "Não é a melhor. Desempenho não é a preocupacao central de segurança aqui.")
              ),
              option(
                "C",
                false,
                t("Because dependencies eliminate the need for code review", "Porque dependências eliminam a necessidade de revisão de código"),
                t("Not best. Dependencies increase the need for disciplined review and governance.", "Não é a melhor. Dependências aumentam a necessidade de revisão e governança disciplinadas.")
              )
            ]
          }
        }),
        lesson({
          slug: "software-security-testing-and-assurance",
          estimatedMinutes: 8,
          title: t("Software security testing and assurance", "Teste de segurança de software e assurance"),
          summary: t(
            "Learn why software assurance needs more than one kind of test.",
            "Aprenda por que assurance de software precisa de mais de um tipo de teste."
          ),
          objective: t(
            "Combine code review, SAST, DAST, IAST, SCA, fuzzing, regression, and UAT in one program.",
            "Combine code review, SAST, DAST, IAST, SCA, fuzzing, regressão e UAT em um único programa."
          ),
          blocks: [
            introBlock(
              t(
                "Security testing is strongest when each method answers a different question. Teams lose assurance when they mistake one kind of visibility for total visibility.",
                "Teste de segurança e mais forte quando cada metodo respondé uma pergunta diferente. Equipes perdem assurance quando confundem um tipo de visibilidade com visibilidade total."
              )
            ),
            conceptBlock(
              "multiple-test-lenses",
              t("Static, dynamic, interactive, and composition analysis are complementary", "Análise estática, dinamica, interativa e de composicao são complementares"),
              t(
                "SAST looks at code structure, DAST observes running behavior from outside, IAST instruments the running application, and SCA focuses on third-party components and dependency risk. Together they provide a wider picture than any one of them alone.",
                "SAST olha para a estrutura do código, DAST observa comportamento em execução por fora, IAST instrumenta a aplicação em execução e SCA foca em componentes de terceiros e risco de dependências. Juntos eles oferecem um quadro mais amplo do que qualquer um sozinho."
              )
            ),
            conceptBlock(
              "fuzzing-and-regression",
              t("Good testing looks for both unknown breakage and repeated breakage", "Bom teste procura tanto quebra desconhecida quanto quebra repetida"),
              t(
                "Fuzzing explores unexpected input combinations to find crashes and logic flaws. Regression testing verifies that previously fixed issues stay fixed. Mature assurance needs both discovery and memory.",
                "Fuzzing explora combinacoes inesperadas de entrada para encontrar crashes e falhas de lógica. Teste de regressão verifica que problemas antes corrigidos permanecem corrigidos. Assurance maduro precisa de descoberta e memória."
              )
            ),
            conceptBlock(
              "uat-and-risk",
              t("User acceptance without security acceptance is incomplete release evidence", "Aceitacao do usuário sem aceitacao de segurança e evidência incompleta de release"),
              t(
                "A build should not be considered ready simply because the feature works for the business. Release confidence also depends on whether security requirements, abuse cases, and known risks were reviewed and accepted deliberately.",
                "Um build não deve ser considerado pronto apenas porque a funcionalidade funciona para o negócio. Confiança no release também depende de se requisitos de segurança, abuse cases e riscos conhecidos foram revisados e aceitos de forma deliberada."
              )
            ),
            conceptBlock(
              "test-feedback-loops",
              t("Assurance improves when test findings reshape earlier phases", "Assurance melhora quando achados de teste remodelam fases anteriores"),
              t(
                "Every defect should feed design guidance, coding standards, lint rules, test coverage, and developer education. Otherwise the organization keeps paying to rediscover the same class of mistake.",
                "Todo defeito deve alimentar orientação de design, padrões de codificação, regras de lint, cobertura de testes e educação de desenvolvedores. Caso contrário, a organização continua pagando para redescobrir a mesma classe de erro."
              )
            ),
            movieCueBlock({
              title: t("Groundhog Day", "Feitiço do Tempo"),
              cue: t(
                "Think about how improvement came from repeating the cycle while learning something useful each time instead of making the same mistake again blindly.",
                "Pense em como a melhoria veio de repetir o ciclo enquanto se aprendia algo útil a cada vez em vez de cometer o mesmo erro cegamente de novo."
              ),
              body: t(
                "Use that cue for software assurance: testing has value when findings feed future prevention and not just current bug lists.",
                "Use essa pista para assurance de software: teste tem valor quando achados alimentam prevencao futura e não apenas listas atuais de bugs."
              )
            }),
            keyPointsBlock(
              t(
                "Use multiple testing lenses. Preserve regression memory. Tie release confidence to security acceptance as well as business functionality.",
                "Use múltiplas lentes de teste. Preserve memória de regressão. Vincule confiança no release a aceitacao de segurança além da funcionalidade de negócio."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY value of software composition analysis (SCA)?",
              "Qual é o valor PRIMARIO de software composition analysis (SCA)?"
            ),
            supportText: t(
              "Choose the testing capability focused on third-party components and dependencies.",
              "Escolha a capacidade de teste focada em componentes de terceiros e dependências."
            ),
            correctRationale: t(
              "SCA helps identify vulnerable, outdated, or risky third-party components and dependencies in the application's software supply chain.",
              "SCA ajuda a identificar componentes e dependências de terceiros vulneraveis, desatualizados ou arriscados na supply chain de software da aplicação."
            ),
            remediationNote: t(
              "SCA is not a replacement for code review or runtime testing; it focuses on the dependency layer.",
              "SCA não substitui revisão de código nem teste em execução; ele foca na camada de dependências."
            ),
            options: [
              option(
                "A",
                true,
                t("Identifying vulnerable or risky third-party components and dependencies", "Identificar componentes e dependências de terceiros vulneraveis ou arriscados"),
                t("Correct. That is the core purpose of SCA.", "Correto. Esse e o propósito central do SCA.")
              ),
              option(
                "B",
                false,
                t("Measuring network throughput under load", "Medir throughput de rede sob carga"),
                t("Not best. That is a performance testing concern, not SCA.", "Não é a melhor. Isso é uma preocupacao de teste de desempenho, não SCA.")
              ),
              option(
                "C",
                false,
                t("Generating Kerberos service tickets", "Gerar tickets de serviço Kerberos"),
                t("Not best. That is unrelated to software composition analysis.", "Não é a melhor. Isso não se relaciona a software composition analysis.")
              )
            ]
          }
        }),
        lesson({
          slug: "data-database-and-application-design-risks",
          estimatedMinutes: 8,
          title: t("Data, database, and application design risks", "Riscos de design de dados, banco e aplicação"),
          summary: t(
            "Learn how data design, input handling, and transaction logic create application risk.",
            "Aprenda como design de dados, tratamento de entrada e lógica transacional criam risco na aplicação."
          ),
          objective: t(
            "Apply secure design to data models, databases, input handling, memory use, and transaction logic.",
            "Aplique design seguro a modelos de dados, bancos, tratamento de entrada, uso de memória e lógica transacional."
          ),
          blocks: [
            introBlock(
              t(
                "Software design flaws often begin in data decisions: what is trusted, what is validated, what is persisted, what is exposed indirectly, and what assumptions the system makes about sequence, state, and authority.",
                "Falhas de design de software frequentemente começam em decisões sobre dados: o que e confiado, o que e validado, o que e persistido, o que e exposto indiretamente e quais premissas o sistema faz sobre sequencia, estado e autoridade."
              )
            ),
            conceptBlock(
              "database-integrity",
              t("Data integrity is about more than preventing tamper", "Integridade de dados e mais do que impedir adulteracao"),
              t(
                "ACID properties, referential integrity, locking, and transaction control help databases preserve consistent state. When these controls are weak, race conditions, lost updates, and inconsistent reads become both correctness and security problems.",
                "Propriedades ACID, integridade referencial, locking e controle de transação ajudam bancos a preservar estado consistente. Quando esses controles são fracos, condições de corrida, atualizações perdidas e leituras inconsistentes se tornam problemas de corretude e de segurança."
              )
            ),
            conceptBlock(
              "input-and-memory-flaws",
              t("Applications fail where trust in input is unjustified", "Aplicações falham onde a confiança na entrada não se justifica"),
              t(
                "Injection, deserialization abuse, malformed input, unsafe object reuse, and memory errors such as buffer overflows all exploit the same pattern: the application trusted data or state more than it should have.",
                "Injecao, abuso de desserializacao, entrada malformada, reutilizacao insegura de objetos e erros de memória como buffer overflow exploram o mesmo padrão: a aplicação confiou em dados ou estado mais do que deveria."
              )
            ),
            conceptBlock(
              "aggregation-and-inference",
              t("Sensitive meaning can emerge from harmless-looking data combinations", "Significado sensível pode surgir de combinacoes de dados aparentemente inócuas"),
              t(
                "Aggregation and inference matter in applications as well as databases. Separate low-sensitivity data elements can reveal something high sensitivity when combined through reports, APIs, or analytics features.",
                "Agregação e inferência importam em aplicações assim como em bancos. Elementos de dados separados de baixa sensibilidade podem revelar algo de alta sensibilidade quando combinados por relatórios, APIs ou recursos analíticos."
              )
            ),
            conceptBlock(
              "data-centric-design",
              t("Threat model the data flow, not only the code path", "Modele ameaças do fluxo de dados, não apenas do caminho de código"),
              t(
                "A data-centric threat model asks where data enters, how it is transformed, where it is stored, who can observe it, and what secondary exposures appear through logs, caches, analytics, or backups.",
                "Um threat model centrado em dados pergunta onde os dados entram, como são transformados, onde são armazenados, quem pode observa-los e que exposicoes secundarias aparecem por logs, caches, analíticos ou backups."
              )
            ),
            movieCueBlock({
              title: t("The Social Network", "A Rede Social"),
              cue: t(
                "Think about how the real value and risk sat in data relationships, not just in isolated records viewed one by one.",
                "Pense em como o valor e o risco reais estavam nas relacoes entre dados, e não apenas em registros isolados vistos um a um."
              ),
              body: t(
                "Use that cue for application design risk: sensitive exposure often comes from how data is combined, trusted, and reused across features.",
                "Use essa pista para risco de design de aplicação: exposição sensível frequentemente vem de como dados são combinados, confiados e reutilizados entre funcionalidades."
              )
            }),
            keyPointsBlock(
              t(
                "Protect transactional integrity, distrust input by default, watch for indirect exposure through aggregation and inference, and model how data really moves through the application.",
                "Proteja integridade transacional, desconfie de entradas por padrão, observe exposicoes indiretas por agregação e inferência e modele como os dados realmente se movem pela aplicação."
              )
            )
          ],
          exercise: {
            prompt: t(
              "Which issue MOST directly describes deriving sensitive information by combining multiple lower-sensitivity data elements?",
              "Qual problema descreve MAIS diretamente derivar informação sensível ao combinar varios elementos de dados de menor sensibilidade?"
            ),
            supportText: t(
              "Choose the concept centered on deriving hidden meaning from allowed data.",
              "Escolha o conceito centrado em derivar significado oculto a partir de dados permitidos."
            ),
            correctRationale: t(
              "Inference is the classic issue where an attacker deduces sensitive information by combining other available data. Aggregation is closely related, but the emphasis here is on the deduction of hidden meaning.",
              "Inferência e o problema classico em que um atacante deduz informação sensível combinando outros dados disponíveis. Agregação e relacionada, mas a enfase aqui esta na dedução de significado oculto."
            ),
            remediationNote: t(
              "Input validation and ACID are important, but they do not name the specific indirect-disclosure problem asked here.",
              "Validação de entrada e ACID são importantes, mas não nomeiam o problema específico de divulgação indireta perguntado aqui."
            ),
            options: [
              option(
                "A",
                true,
                t("Inference", "Inferência"),
                t("Correct. This is the indirect-disclosure concept described.", "Correto. Esse é o conceito de divulgação indireta descrito.")
              ),
              option(
                "B",
                false,
                t("Atomicity", "Atomicidade"),
                t("Not best. Atomicity is about transaction behavior, not deduction of sensitive meaning.", "Não é a melhor. Atomicidade trata de comportamento transacional, não de dedução de significado sensível.")
              ),
              option(
                "C",
                false,
                t("Load balancing", "Balanceamento de carga"),
                t("Not best. Load balancing is unrelated to inference disclosure risk.", "Não é a melhor. Balanceamento de carga não se relaciona ao risco de divulgação por inferência.")
              )
            ]
          }
        }),
        lesson({
          slug: "acquired-software-and-supply-chain-risk",
          estimatedMinutes: 8,
          title: t("Acquired software and supply-chain risk", "Software adquirido e risco de supply chain"),
          summary: t(
            "Learn how acquired software and suppliers add supply-chain risk.",
            "Aprenda como software adquirido e fornecedores adicionam risco de supply chain."
          ),
          objective: t(
            "Assess COTS, open source, SaaS, managed services, and vendor software using provenance, support, SBOM, and operational trust.",
            "Avalie COTS, open source, SaaS, serviços gerenciados e software de fornecedores usando procedencia, suporte, SBOM e confiança operacional."
          ),
          blocks: [
            introBlock(
              t(
                "Acquired software is never free from security responsibility. The organization may not write the code, but it still owns the risk created by integrating that code into its processes and data flows.",
                "Software adquirido nunca esta livre de responsabilidade de segurança. A organização pode não éscrever o código, mas ainda possui o risco criado ao integrar esse código em seus processos e fluxos de dados."
              )
            ),
            conceptBlock(
              "buy-vs-build-vs-subscribe",
              t("Different acquisition models shift responsibility differently, not completely", "Modelos diferentes de aquisição deslocam responsabilidade de formas diferentes, não totalmente"),
              t(
                "COTS, open-source packages, SaaS, and managed services each move maintenance and visibility in different ways. None of them removes the need for vendor assessment, contract review, security architecture review, and ongoing monitoring.",
                "COTS, pacotes open source, SaaS e serviços gerenciados deslocam manutenção e visibilidade de formas diferentes. Nenhum deles remove a necessidade de avaliação de fornecedor, revisão contratual, revisão de arquitetura de segurança e monitoramento contínuo."
              )
            ),
            conceptBlock(
              "sbom-and-provenance",
              t("You cannot govern what you cannot enumerate", "Você não governa o que não consegue enumerar"),
              t(
                "Software bills of materials, artifact signing, provenance records, and repository controls help organizations understand what components are present and whether update paths can be trusted.",
                "Software bills of materials, assinatura de artefatos, registros de procedencia e controles de repositorio ajudam organizações a entender que componentes estão presentes e se caminhos de atualizacao podem ser confiáveis."
              )
            ),
            conceptBlock(
              "vendor-risk",
              t("Vendor assessment should ask about support, response, and operational fit", "Avaliação de fornecedor deve perguntar sobre suporte, resposta e adequacao operacional"),
              t(
                "A product may be feature-rich and still be a bad choice if patching is slow, support is weak, security disclosure is opaque, or integration assumptions break your architecture and compliance model.",
                "Um produto pode ser rico em recursos e ainda ser má escolha se patching é lento, suporte é fraco, divulgação de segurança é opaca ou premissas de integração quebram sua arquitetura e modelo de compliance."
              )
            ),
            conceptBlock(
              "lifecycle-after-purchase",
              t("Acquisition is the beginning of governance, not the end", "Aquisição é o começo da governança, não o fim"),
              t(
                "Once software is adopted, the organization still needs onboarding standards, configuration hardening, update management, entitlement review, and retirement planning. Otherwise approved software quietly becomes legacy risk.",
                "Depois que software é adotado, a organização ainda precisa de padrões de onboarding, hardening de configuração, gestão de atualizações, revisão de direitos e planejamento de aposentadoria. Caso contrário, software aprovado silenciosamente vira risco legado."
              )
            ),
            movieCueBlock({
              title: t("The Founder", "Fome de Poder"),
              cue: t(
                "Think about how scaling through outside systems and partners increased reach only because process control and standardization kept the whole chain coherent.",
                "Pense em como escalar por sistemas e parceiros externos aumentou alcance apenas porque controle de processo e padronizacao mantiveram toda a cadeia coerente."
              ),
              body: t(
                "Use that cue for acquisition risk: third-party software adds leverage only when governance around it is as disciplined as the purchase decision itself.",
                "Use essa pista para risco de aquisição: software de terceiros só adiciona alavancagem quando a governança ao redor dele é tao disciplinada quanto a própria decisão de compra."
              )
            }),
            keyPointsBlock(
              t(
                "Assess vendors before adoption and govern software after adoption. Use SBOM, provenance, support posture, and lifecycle planning to keep acquired software from becoming inherited insecurity.",
                "Avalie fornecedores antes da adocao e governe software depois da adocao. Use SBOM, procedencia, postura de suporte e planejamento de ciclo de vida para impedir que software adquirido se torne insegurança herdada."
              )
            )
          ],
          exercise: {
            prompt: t(
              "What is the PRIMARY value of an SBOM when evaluating or operating software?",
              "Qual é o valor PRIMARIO de um SBOM ao avaliar ou operar software?"
            ),
            supportText: t(
              "Choose the answer focused on knowing what components are inside the software and therefore what you must govern.",
              "Escolha a resposta focada em saber quais componentes estão dentro do software e, portanto, o que você precisa governar."
            ),
            correctRationale: t(
              "An SBOM provides a structured inventory of software components and dependencies, which helps organizations assess exposure, support incident response, and manage supply-chain risk more effectively.",
              "Um SBOM fornece um inventário estruturado de componentes e dependências de software, o que ajuda organizações a avaliar exposição, apoiar resposta a incidentes e gerenciar risco de supply chain com mais eficacia."
            ),
            remediationNote: t(
              "It does not remove risk by itself, but it makes risk visible enough to govern.",
              "Ele não remove risco por si só, mas o torna visível o bastante para ser governado."
            ),
            options: [
              option(
                "A",
                true,
                t("It inventories the software components and dependencies that must be governed", "Ele inventaria os componentes e dependências de software que precisam ser governados"),
                t("Correct. Visibility into components is the key SBOM value.", "Correto. Visibilidade sobre componentes e o valor central do SBOM.")
              ),
              option(
                "B",
                false,
                t("It guarantees all dependencies are secure", "Ele garante que todas as dependências são seguras"),
                t("Not best. An SBOM improves visibility, not automatic trust.", "Não é a melhor. Um SBOM melhora visibilidade, não gera confiança automatica.")
              ),
              option(
                "C",
                false,
                t("It replaces the need for patch management", "Ele substitui a necessidade de gestão de patches"),
                t("Not best. Patch and vulnerability management remain necessary after visibility is established.", "Não é a melhor. Gestão de patches e vulnerabilidades continua necessária depois que a visibilidade e estabelecida.")
              )
            ]
          }
        }),
        lesson({
          slug: "secure-coding-standards-and-api-security",
          estimatedMinutes: 8,
          title: t("Secure coding standards and API security", "Padrões de codificação segura e segurança de APIs"),
          summary: t(
            "Learn how secure coding habits and API design reduce common flaws.",
            "Aprenda como hábitos de codificação segura e design de API reduzem falhas comuns."
          ),
          objective: t(
            "Apply secure coding standards to validation, error handling, API authorization, secret handling, and common web flaws.",
            "Aplique padrões de codificação segura a validação, tratamento de erros, autorização de API, tratamento de segredos e falhas web comuns."
          ),
          blocks: [
            introBlock(
              t(
                "Secure coding standards matter because they turn security from memory into routine. The best developers still make mistakes under deadline pressure, and standards and reviews make those mistakes less likely to ship.",
                "Padrões de codificação segura importam porque transformam segurança de memória em rotina. Os melhores desenvolvedores ainda cometem erros sob pressão de prazo, e padrões e revisões tornam esses erros menos propensos a chegar a produção."
              )
            ),
            conceptBlock(
              "validation-and-errors",
              t("Validate input and fail safely", "Valide entrada e falhe com segurança"),
              t(
                "Input validation, output encoding, allowlists, robust parsing, and safe error handling reduce injection, deserialization abuse, and information leakage. Error messages should help operators without giving attackers a blueprint.",
                "Validação de entrada, codificação de saida, allowlists, parsing robusto e tratamento seguro de erros reduzem injecao, abuso de desserializacao e vazamento de informação. Mensagens de erro devem ajudar operadores sem entregar aos atacantes um mapa do sistema."
              )
            ),
            conceptBlock(
              "api-security",
              t("APIs need authorization as carefully as they need authentication", "APIs precisam de autorização com tanto cuidado quanto autenticação"),
              t(
                "API security failures often come from broken object-level authorization, excessive data exposure, weak rate limits, poor input handling, and secret sprawl. A token that proves identity is not enough if each requested object is not reauthorized correctly.",
                "Falhas de segurança em APIs frequentemente surgem de autorização quebrada no nível do objeto, exposição excessiva de dados, limites de taxa fracos, tratamento ruim de entrada e espalhamento de segredos. Um token que prova identidade não basta se cada objeto solicitado não for reautorizado corretamente."
              )
            ),
            conceptBlock(
              "secrets-and-standards",
              t("Secrets and standards should live outside developer improvisation", "Segredos e padrões devem viver fora da improvisacao do desenvolvedor"),
              t(
                "Secrets management, approved crypto libraries, shared coding standards, lint rules, peer review, and secure framework defaults all help reduce the chance that one rushed implementation introduces systemic weakness.",
                "Gestão de segredos, bibliotecas criptográficas aprovadas, padrões compartilhados de codificação, regras de lint, peer review e padrões seguros de frameworks ajudam a reduzir a chance de qué uma implementação apressada introduza fraqueza sistemica."
              )
            ),
            conceptBlock(
              "owasp-and-defensive-coding",
              t("Common bug classes should become design reflexes", "Classes comuns de bugs devem virar reflexos de design"),
              t(
                "OWASP-style patterns such as injection, broken access control, security misconfiguration, sensitive data exposure, and insecure deserialization should be treated as design concerns and code-review checklists, not as after-the-fact surprises.",
                "Padrões no estilo OWASP como injecao, controle de acesso quebrado, configuração insegura, exposição de dados sensíveis e desserializacao insegura devem ser tratados como preocupacoes de design e checklists de revisão, não como surpresas posteriores."
              )
            ),
            movieCueBlock({
              title: t("The Social Dilemma", "O Dilema das Redes"),
              cue: t(
                "Think about how small interface and implementation choices can scale into systemic risk when they are repeated across millions of interactions.",
                "Pense em como pequenas escolhas de interface e implementação podem escalar para risco sistemico quando se repetem em milhoes de interações."
              ),
              body: t(
                "Use that cue for secure coding: routine habits in APIs and code paths determine whether the system scales safety or scales exposure.",
                "Use essa pista para codificação segura: hábitos rotineiros em APIs e caminhos de código determinam se o sistema éscala segurança ou escala exposição."
              )
            }),
            keyPointsBlock(
              t(
                "Validate aggressively, authorize every sensitive action, externalize secrets, use secure defaults, and treat common vulnerability classes as design-time concerns.",
                "Valide agressivamente, autorize toda ação sensível, externalize segredos, use padrões seguros e trate classes comuns de vulnerabilidade como preocupacoes de design."
              )
            )
          ],
          exercise: {
            prompt: t(
              "An API correctly authenticates users but lets them change the record ID in the URL to access other users' data. What is the PRIMARY security failure?",
              "Uma API autentica corretamente usuários, mas permite que eles mudem o ID do registro na URL para acessar dados de outros usuários. Qual é a falha de segurança PRIMARIA?"
            ),
            supportText: t(
              "Choose the failure where object-level access is not re-checked after authentication.",
              "Escolha a falha em que o acesso em nível de objeto não é rechecado após a autenticação."
            ),
            correctRationale: t(
              "This is a broken object-level authorization problem. The API verified who the user is, but failed to verify whether that user is allowed to access the specific object requested.",
              "Esse e um problema de autorização quebrada em nível de objeto. A API verificou quem o usuário e, mas falhou em verificar se esse usuário pode acessar o objeto específico solicitado."
            ),
            remediationNote: t(
              "Authentication is not enough. Every sensitive object request still requires authorization against the current user and context.",
              "Autenticação não basta. Cada solicitacao sensível de objeto ainda exige autorização contra o usuário e contexto atuais."
            ),
            options: [
              option(
                "A",
                true,
                t("Broken object-level authorization", "Autorização quebrada em nível de objeto"),
                t("Correct. The API authenticates identity but fails to enforce per-object authorization.", "Correto. A API autentica a identidade, mas falha em aplicar autorização por objeto.")
              ),
              option(
                "B",
                false,
                t("Weak password storage", "Armazenamento fraco de senha"),
                t("Not best. The scenario is about post-auth access control, not password hashing.", "Não é a melhor. O cenario trata de controle de acesso pos-autenticação, não de hash de senha.")
              ),
              option(
                "C",
                false,
                t("Insufficient bandwidth", "Largura de banda insuficiente"),
                t("Not best. Bandwidth is unrelated to the authorization flaw described.", "Não é a melhor. Largura de banda não se relaciona a falha de autorização descrita.")
              )
            ]
          }
        })
      ]
    }
  ];
}