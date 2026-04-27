# CISSP Domain Depth Backlog

> **Purpose:** This backlog defines the full conceptual expansion of each CISSP domain beyond the starter seed. Each item represents one domain grown to maximum depth — enough to support 3 structured lessons (Foundations → Controls & Mechanisms → Applied Judgment), spaced repetition drills, and scenario-based exam practice.
>
> **Lesson key:** L1 = Foundations | L2 = Controls & Mechanisms | L3 = Applied Judgment
>
> **Format per node:** `- **ConceptName** — [what it is and why it matters in one plain sentence]`

---

## B1. Security and Risk Management — Finalizado

Status: Finalizado em 2026-04-23.

**Description:** Domain 1 is the conceptual spine of the entire CISSP exam. It covers how organizations align security direction with business goals, manage risk methodically, satisfy legal and ethical obligations, and structure the policies and human factors that make security sustainable. No other domain makes sense without a working model of governance and risk.

---

### L1 — Foundations: Governance, Ethics, and the Risk Vocabulary

- **Governance** — the organizational system through which leaders set direction, approve policy, and hold security accountable to business goals
  - **Board and Senior Leadership** — the people at the top who own strategic risk decisions and must sponsor security programs
  - **Security Function Role** — security advises and measures; it does not set business direction or own the risk it manages
  - **Policy Hierarchy** — a layered structure of rules from strategic policy at the top down to specific procedures
    - **Policy** — a high-level statement of management intent that creates the "why" and "what" of security behavior
    - **Standard** — a mandatory specification that tells teams exactly what they must implement to satisfy policy
    - **Guideline** — a non-mandatory recommendation that provides helpful direction when standards leave room for judgment
    - **Procedure** — a step-by-step operational instruction for carrying out a standard or policy requirement
  - **Governance Frameworks** — recognized structures organizations adopt to organize security programs
    - **COBIT** — a governance model that maps IT activities to business goals and accountability structures
    - **ISO 27001** — an international standard that defines requirements for an information security management system
    - **NIST CSF** — a voluntary framework of five functions (Identify, Protect, Detect, Respond, Recover) used widely in the US
    - **ITIL** — a service management framework that integrates change and incident management into governance
- **Risk Management** — a disciplined process for identifying, analyzing, responding to, and monitoring threats to organizational objectives
  - **Risk Vocabulary**
    - **Asset** — anything with value to the organization that security is trying to protect
    - **Threat** — any potential event or actor that could cause harm to an asset
    - **Vulnerability** — a weakness that a threat can exploit to cause harm
    - **Likelihood** — how probable it is that a threat will successfully exploit a vulnerability
    - **Impact** — the degree of harm that would result if a threat were realized
    - **Risk** — the combination of likelihood and impact; it is never fully eliminated, only managed
    - **Residual Risk** — the risk that remains after controls have been applied; it is accepted by the business owner
    - **Risk Appetite** — how much risk leadership is willing to accept in pursuit of its objectives
    - **Risk Tolerance** — the acceptable variation around the risk appetite; a narrower band than appetite
  - **Risk Assessment Methods**
    - **Qualitative** — ranks risk using descriptive labels (high/medium/low) based on expert judgment rather than numbers
    - **Quantitative** — calculates risk using financial figures and statistics to produce monetary loss estimates
      - **AV (Asset Value)** — the monetary value of an asset before any loss event
      - **EF (Exposure Factor)** — the percentage of asset value that would be lost in one incident
      - **SLE (Single Loss Expectancy)** — the expected financial loss from one occurrence: AV × EF
      - **ARO (Annualized Rate of Occurrence)** — how many times a specific threat is expected to happen in a year
      - **ALE (Annualized Loss Expectancy)** — the expected yearly financial loss from a threat: SLE × ARO
    - **Semi-Quantitative** — combines numeric scales with qualitative labels to make estimates easier to compare without full financial data
  - **Risk Response Strategies**
    - **Avoidance** — stopping or redesigning an activity so the risk no longer applies
    - **Mitigation** — implementing controls that reduce likelihood, impact, or both
    - **Transfer** — shifting financial consequence to a third party, typically through insurance or contracts
    - **Acceptance** — acknowledging residual risk and choosing not to act further; must be documented and owned by the correct authority
  - **Risk Frameworks**
    - **NIST SP 800-30** — a US government guide for conducting risk assessments across information systems
    - **ISO 31000** — an international standard for enterprise risk management principles and processes
    - **FAIR (Factor Analysis of Information Risk)** — a quantitative model for expressing cyber risk in financial terms
- **Ethics** — the behavioral standards CISSP candidates and practitioners are expected to uphold when authority could be abused
  - **(ISC)² Code of Ethics** — four mandatory canons that every CISSP must follow as conditions of certification
    - **Protect Society** — obligation to act in the interest of the public and the broader community first
    - **Act Honorably** — behave with integrity, truthfulness, and responsibility in all professional activities
    - **Provide Diligent Service** — deliver competent, professional work to principals who are authorized to receive it
    - **Advance the Profession** — contribute to the growth and credibility of the information security field
  - **Ethics Conflicts** — when obligations to employer, client, or society appear to conflict, society comes first

---

### L2 — Controls & Mechanisms: Legal Compliance, BCP, and Personnel Security

- **Legal and Regulatory Compliance** — the requirement for organizations to understand and satisfy the laws, regulations, and contracts that govern their data and operations
  - **Data Privacy Regulations**
    - **GDPR** — EU regulation requiring lawful data processing, consent, rights for data subjects, and breach notification within 72 hours
    - **CCPA** — California law giving consumers rights to know, delete, and opt out of the sale of their personal data
    - **HIPAA** — US law requiring confidentiality, integrity, and availability of protected health information
    - **PCI DSS** — a payment card industry standard requiring specific controls around cardholder data environments
  - **Intellectual Property**
    - **Copyright** — legal protection for original creative works that prevents unauthorized copying or distribution
    - **Trademark** — protection for brand identifiers such as names, logos, and slogans
    - **Patent** — exclusive rights granted for a novel invention for a defined period
    - **Trade Secret** — confidential business information protected by keeping it secret rather than by registration
  - **Computer Crime Laws** — statutes that make unauthorized computer access or data manipulation criminal offenses
    - **CFAA (Computer Fraud and Abuse Act)** — US federal law criminalizing unauthorized access to protected computers
    - **Electronic Communications Privacy Act** — US law restricting interception of electronic communications
  - **Import/Export Controls** — laws that restrict the movement of cryptographic products and sensitive technology across borders
  - **Data Breach Notification Laws** — state and national laws that define when, how, and to whom data breaches must be disclosed
  - **Jurisdiction** — the legal territory whose laws apply; complex for global organizations because data crosses borders
- **Business Continuity Planning (BCP)** — the structured process of ensuring critical business functions can continue during and after a disruptive event
  - **BCP vs DRP** — BCP keeps the business operating; DRP restores IT systems; both are required and they overlap at their boundaries
  - **Business Impact Analysis (BIA)** — a structured assessment that identifies which processes are critical and quantifies the impact of their loss
    - **MTD (Maximum Tolerable Downtime)** — the longest an operation can be unavailable before causing unacceptable harm to the organization
    - **RTO (Recovery Time Objective)** — the target time to restore a function after an interruption; must be less than or equal to MTD
    - **RPO (Recovery Point Objective)** — how far back in time recovery must go; defines how much data loss the business can tolerate
    - **MTBF (Mean Time Between Failures)** — average time a system runs before failing; used for reliability planning
    - **MTTR (Mean Time to Repair)** — average time to restore a system after failure; used to plan maintenance capacity
  - **BCP Development Phases**
    - **Project Scope and Initiation** — defining what is in scope, securing executive sponsorship, and forming a BCP team
    - **BIA** — mapping dependencies, identifying critical resources, and quantifying recovery targets
    - **Plan Development** — writing the procedures, declaring authorities, and identifying recovery alternatives
    - **Testing and Drills** — validating the plan works before it is needed in a real event
      - **Tabletop Exercise** — a discussion-based test where team members walk through a scenario without activating real resources
      - **Walkthrough** — a step-by-step rehearsal where participants review their specific responsibilities in the plan
      - **Simulation** — a partial activation that mimics conditions without disrupting production systems
      - **Full Interruption Test** — a live activation of the plan including actual failover to alternate systems; highest fidelity and highest cost
      - **Parallel Test** — running recovery systems alongside production to confirm they work without cutting over
    - **Maintenance** — keeping the plan current after changes to people, systems, or business processes
- **Personnel Security** — controls applied to the human elements of security throughout the employment lifecycle
  - **Pre-Employment**
    - **Background Checks** — verifying criminal history, employment history, and credentials before hiring
    - **Reference Checks** — speaking to prior employers or contacts to confirm character and competence
    - **Employment Agreements** — legally binding documents that define security responsibilities, confidentiality, and acceptable use from day one
  - **During Employment**
    - **Security Awareness Training** — ensuring all staff understand threats, responsibilities, and how to report problems
    - **Role-Based Training** — deeper training tailored to the specific security duties of a particular job function
    - **Separation of Duties** — dividing tasks so no single person can commit and conceal fraud alone
    - **Job Rotation** — moving employees across roles to prevent entrenchment and expose undisclosed wrongdoing
    - **Mandatory Vacations** — forcing time away from a role so hidden problems surface in the absent employee's absence
    - **Least Privilege** — giving employees only the access they need for their current role, nothing more
    - **Need to Know** — further restricting access so people only see information relevant to their specific task
  - **Termination and Off-boarding**
    - **Access Revocation** — immediately disabling accounts and recovering credentials when employment ends
    - **Exit Interview** — a structured conversation about security obligations, non-disclosure, and pending matters
    - **Return of Assets** — recovering devices, tokens, badges, and any other organizational property at separation

---

### L3 — Applied Judgment: Risk Scenarios, Vendor Risk, and Policy Conflicts

- **Third-Party and Supply Chain Risk** — recognizing that organizational risk extends to every vendor, contractor, and partner with access to data or systems
  - **Due Diligence** — investigating a vendor's security posture before contracting to confirm they can meet your requirements
  - **Due Care** — maintaining ongoing oversight of vendor performance and security standards throughout the relationship
  - **Vendor Risk Assessment** — a structured review of a supplier's policies, controls, and past incidents before engagement
  - **Right to Audit** — a contract clause that preserves your organization's ability to assess a vendor's security posture
  - **SLA (Service Level Agreement)** — contractual terms defining expected performance, availability, and security obligations
  - **MSA (Master Service Agreement)** — a framework contract that governs the overall relationship and applies to all work orders under it
  - **Data Processing Agreement (DPA)** — a contract required by GDPR and similar laws when a processor handles personal data on behalf of a controller
  - **Fourth-Party Risk** — risk created by your vendor's own vendors; it flows upstream to you even without a direct contract
- **Security Metrics and Reporting** — the discipline of measuring security program effectiveness and communicating results to stakeholders
  - **KRI (Key Risk Indicator)** — a forward-looking measure that signals rising risk before an incident occurs
  - **KPI (Key Performance Indicator)** — a measure of how well a security control or process is performing against a target
  - **Dashboard Reporting** — visual summaries of security posture for leadership audiences who need quick situational awareness
  - **Trend Analysis** — comparing metrics over time to identify patterns that point to emerging problems or improving resilience
- **Conflict Resolution in Policy** — the ability to apply the right framework when organizational interests, legal duties, and ethical obligations appear to conflict
  - **Whistleblower Protections** — laws and policies protecting employees who report illegal activity from retaliation
  - **Conflict of Interest** — a situation where personal benefit could compromise professional judgment; must be disclosed and managed
  - **Insider Threat** — risk from current or former employees, contractors, or partners who misuse legitimate access

---

## B2. Asset Security — Finalizado

Status: Finalizado em 2026-04-23.

**Description:** Domain 2 establishes who owns information, how sensitive it is, and what happens to it from the moment it is created until the moment it is irreversibly destroyed. A weak asset security program means controls are misalched to actual data value, producing either over-protection that slows business or under-protection that exposes it.

---

### L1 — Foundations: Classification, Roles, and the Privacy Baseline

- **Information Classification** — the practice of assigning labels to data that describe its sensitivity and the care it requires
  - **Classification Criteria**
    - **Business Value** — how much the data contributes to organizational operations, revenue, or strategy
    - **Legal and Regulatory Requirement** — whether a law or standard mandates specific protection regardless of internal policy
    - **Sensitivity to Disclosure** — how much harm would result if the data were seen by an unauthorized party
    - **Sensitivity to Modification** — how much harm would result if the data were changed without authorization
    - **Sensitivity to Loss of Availability** — how much harm would result if the data became inaccessible
  - **Government Classification Levels**
    - **Top Secret** — unauthorized disclosure would cause exceptionally grave damage to national security
    - **Secret** — unauthorized disclosure would cause serious damage to national security
    - **Confidential** — unauthorized disclosure would cause some damage to national security
    - **Unclassified** — information not determined to require protection; freely shareable
  - **Commercial Classification Levels**
    - **Restricted (or Highly Confidential)** — extremely sensitive; very limited distribution, typically executive or legal only
    - **Confidential** — sensitive internal information; access limited to those with a business need
    - **Internal (or Private)** — general internal use only; not intended for external audiences
    - **Public** — approved for release to anyone; no harm if disclosed externally
  - **Over-Classification** — assigning a higher label than warranted, creating unnecessary friction and access barriers
  - **Under-Classification** — assigning a lower label than warranted, creating exposure because controls are too weak
- **Data Ownership Roles** — the defined responsibilities people hold for data assets throughout their lifecycle
  - **Data Owner** — a senior business person responsible for approving classification, use policy, and access decisions for a dataset
  - **Data Steward** — a designated person who enforces the data owner's decisions day to day, often within a business unit
  - **Data Custodian** — an IT professional who implements and operates the technical controls that protect the data
  - **Data Processor** — an organization or system that processes personal data on behalf of a data controller (GDPR context)
  - **Data Controller** — the organization that determines the purpose and means of processing personal data (GDPR context)
  - **Data User** — any person authorized to access and use the data within the boundaries set by the owner
  - **System Owner** — the person responsible for the information system that stores or processes the data
- **Privacy Foundations** — the principles that govern how personal data is collected, used, and protected
  - **Privacy by Design** — building privacy protections into systems from the design stage rather than bolting them on later
  - **Data Minimization** — collecting and retaining only the personal data actually needed for a stated purpose
  - **Purpose Limitation** — using data only for the specific, stated purpose for which it was collected
  - **Consent** — a freely given, informed, specific, and unambiguous agreement to process personal data
  - **Data Subject Rights** — individual rights that privacy laws grant to people whose data is being processed
    - **Right of Access** — the right to know what personal data an organization holds about you
    - **Right to Rectification** — the right to correct inaccurate personal data
    - **Right to Erasure** — the right to request deletion of personal data under defined conditions
    - **Right to Portability** — the right to receive your data in a machine-readable format for use elsewhere
    - **Right to Object** — the right to oppose processing of personal data for marketing or profiling purposes
  - **Privacy Impact Assessment (PIA)** — a structured review of how a new system or process will affect personal data and privacy rights
  - **Privacy Program** — the organizational structure, policies, and practices that ensure ongoing compliance with privacy obligations

---

### L2 — Controls & Mechanisms: Handling, Retention, Disposal, and Protection

- **Asset Handling Requirements** — the rules that govern how data is stored, moved, processed, and shared based on its classification label
  - **Handling by Classification** — higher-classification data requires stricter controls at each touchpoint in its lifecycle
  - **Marking and Labeling** — applying visible classification indicators to documents, media, and system outputs so handlers know the rules
  - **Transmission Security** — protecting data during movement between systems, such as requiring encryption for confidential transfers
  - **Storage Controls** — matching storage location and encryption strength to the sensitivity of data being stored
  - **Workspace Controls** — physical and procedural rules for handling sensitive material in workspaces (clean desk, screen lock)
  - **Output Controls** — managing printed reports, exports, and downloads so classified data does not leave in uncontrolled form
- **Data Lifecycle** — the six stages every piece of data passes through from creation to destruction
  - **Create/Collect** — data is generated, entered, or received from an external source; classification and ownership must be assigned here
  - **Store** — data is written to a system; encryption, access control, and backup apply from this moment on
  - **Use** — data is accessed, processed, or analyzed; access logging and need-to-know enforcement are critical here
  - **Share/Transfer** — data moves to another party; transmission security, DLP, and agreements come into scope
  - **Archive** — data is moved to long-term storage because it is no longer actively used but still needed for legal or business reasons
  - **Destroy** — data is permanently and irreversibly removed; the method must match the media type and sensitivity level
- **Data Retention** — policies and schedules that define how long data must be kept before it can be destroyed
  - **Legal Hold** — a suspension of normal retention schedules when data may be needed for litigation or investigation
  - **Retention Schedule** — a documented list of data types and their required retention periods, often set by regulation
  - **Regulatory Requirements** — laws like HIPAA, SOX, and GDPR that mandate minimum and maximum retention periods for specific data types
  - **Business Requirements** — operational needs that extend or shorten retention periods beyond legal minimums
- **Data Destruction and Sanitization** — the methods used to ensure data cannot be recovered from retired or decommissioned media
  - **Clearing** — overwriting data so it cannot be recovered with standard tools but may still yield to laboratory forensics
  - **Purging** — using degaussing or more intensive overwriting so data cannot be recovered even with laboratory methods
  - **Destruction** — physically destroying the media so recovery is impossible regardless of technique
    - **Degaussing** — using a strong magnetic field to erase magnetic media; does not work on SSDs or optical media
    - **Shredding** — physically cutting media into pieces too small to reconstruct
    - **Incineration** — burning media at high enough temperatures to destroy all residual data
    - **Cryptographic Erasure** — destroying the encryption key so encrypted data becomes permanently unreadable without destroying the media
  - **Certificate of Destruction** — a formal document confirming that media was destroyed according to policy; important for audits and compliance
- **Data Loss Prevention (DLP)** — technology and processes that detect and prevent unauthorized data leaving organizational control
  - **Network DLP** — monitors and inspects data at network egress points for policy violations
  - **Endpoint DLP** — monitors data on user devices to prevent unauthorized copying, printing, or uploading
  - **Cloud DLP** — extends inspection to data stored in or flowing through cloud services
  - **Content Inspection** — analyzing file content against classification patterns and keywords to trigger DLP policy
  - **Contextual Analysis** — evaluating who is sending, what channel they are using, and where data is going to assess intent

---

### L3 — Applied Judgment: Cloud Copies, Test Data, and Privacy Conflicts

- **Data in Cloud Environments** — the specific asset security challenges that arise when data lives in or moves through cloud services
  - **Shared Responsibility Model** — a framework where cloud providers and customers each own different security obligations
  - **Data Residency** — the requirement that data remain physically within a specific geographic or legal jurisdiction
  - **Data Sovereignty** — the principle that data is subject to the laws of the country where it physically resides
  - **Tenant Isolation** — the cloud provider's obligation to ensure one customer cannot access another's data in a multi-tenant environment
  - **Egress Monitoring** — inspecting data leaving the cloud environment to detect unauthorized transfer or exfiltration
- **De-Identification Techniques** — methods that reduce the privacy risk of data while preserving its usefulness for analysis or testing
  - **Anonymization** — irreversibly removing or transforming identifying information so individuals cannot be re-identified
  - **Pseudonymization** — replacing identifiers with pseudonyms so data can be re-linked under controlled conditions
  - **Data Masking** — substituting realistic but fictitious values in place of real sensitive data for non-production use
  - **Tokenization** — replacing sensitive data with a non-sensitive token that maps back to the real value in a secure vault
  - **Aggregation** — combining individual records into group statistics that cannot be traced back to a single person
  - **Data Perturbation** — adding statistical noise to numerical data to make individual values unrecoverable while preserving overall patterns
- **Third-Party Data Sharing** — the governance challenge of maintaining control over asset security when data leaves the organization
  - **Data Sharing Agreement** — a contract that defines what data is shared, how it is used, and how it must be protected by the recipient
  - **Data Tagging and Tracking** — embedding identifiers in data to monitor where it travels after leaving the source system
  - **Vendor Privacy Reviews** — structured assessments confirming vendors meet your privacy and data protection requirements before sharing

---

## B3. Security Architecture and Engineering — Finalizado

Status: Finalizado em 2026-04-23.

**Description:** Domain 3 covers how to design and build trustworthy systems from first principles. It is the most technically broad domain on the exam, spanning abstract security models, cryptographic mechanisms, hardware trust, physical security, and enterprise architecture — all evaluated through the lens of whether design decisions reduce exposure or create exploitable assumptions.

---

### L1 — Foundations: Secure Design Principles and Security Models

- **Secure Design Principles** — foundational architectural rules that reduce the attack surface and limit the damage when controls fail
  - **Least Privilege** — every subject receives only the minimum access rights needed for its current task, reducing blast radius
  - **Need to Know** — access is further restricted to the specific information required for a task even if broader access exists
  - **Separation of Duties** — dividing sensitive operations across multiple roles so no single person can complete a harmful action alone
  - **Defense in Depth** — layering multiple independent controls so failure of one does not expose the system
  - **Fail-Safe Defaults** — systems should deny access unless access is explicitly and correctly granted
  - **Economy of Mechanism** — security designs should be as simple as possible; complexity creates hidden vulnerabilities
  - **Complete Mediation** — every access attempt to every resource must be checked against the authorization policy every time
  - **Open Design** — security should not depend on secrecy of the mechanism; only the key or credential should be secret
  - **Least Common Mechanism** — minimize shared pathways between subjects and objects to reduce side-channel exposure
  - **Psychological Acceptability** — security mechanisms should be intuitive enough that users follow them rather than working around them
  - **Trust but Verify** — establish baseline trust and then confirm it continuously rather than assuming permanent trustworthiness
  - **Zero Trust** — an architecture where no network location, device, or identity is automatically trusted; every request is verified
    - **Micro-Segmentation** — dividing networks into very small zones so lateral movement after compromise is extremely limited
    - **Continuous Verification** — re-authenticating and re-authorizing sessions throughout their lifetime rather than only at login
    - **Assume Breach** — designing controls and detection as if attackers are already inside the perimeter
- **Security Models** — formal mathematical or logical frameworks that describe how access, information flow, or integrity is governed in a system
  - **Bell-LaPadula Model** — a confidentiality model that prevents information flowing from higher to lower classification levels
    - **Simple Security Property (no read up)** — a subject cannot read data at a higher classification than its clearance
    - **Star Property (no write down)** — a subject cannot write data to a lower classification level than its current one
    - **Tranquility Principle** — classifications do not change during an active session to prevent exploitation of reclassification
  - **Biba Model** — an integrity model that is the structural mirror of Bell-LaPadula; it prevents untrusted data from corrupting trusted data
    - **Simple Integrity Property (no read down)** — a subject cannot read from a lower integrity level than its own
    - **Star Integrity Property (no write up)** — a subject cannot write to a higher integrity level than its own
  - **Clark-Wilson Model** — an integrity model focused on commercial environments using well-formed transactions and separation of duties
    - **CDI (Constrained Data Item)** — data that must be protected and whose integrity is enforced by the model
    - **UDI (Unconstrained Data Item)** — external input that must be validated before it can become a CDI
    - **IVP (Integrity Verification Procedure)** — a process that confirms CDIs remain in a valid state
    - **TP (Transformation Procedure)** — the only authorized means by which a CDI can be changed
  - **Brewer-Nash (Chinese Wall) Model** — prevents conflicts of interest by restricting which datasets a user can access based on past access
  - **Graham-Denning Model** — defines eight protection rules governing how subjects and objects are created, deleted, and assigned rights
  - **Take-Grant Model** — uses a graph to represent and analyze access rights; subjects can take rights from or grant rights to others
  - **Lattice-Based Access Control** — assigns subjects and objects to lattice positions; access is allowed only when positions satisfy a partial order

---

### L2 — Controls & Mechanisms: Cryptography, Hardware Trust, and Physical Security

- **Cryptography** — the science of transforming data so only authorized parties can read or verify it
  - **Symmetric Encryption** — uses the same key for encryption and decryption; fast and suitable for bulk data
    - **AES (Advanced Encryption Standard)** — the current standard for symmetric encryption, using 128-, 192-, or 256-bit keys
    - **3DES** — applies DES three times to increase its effective key length; considered legacy and being phased out
    - **Key Distribution Problem** — the challenge of securely sharing a symmetric key before the first encrypted communication
  - **Asymmetric Encryption** — uses a key pair (public and private) so encryption and decryption use different keys
    - **RSA** — the most widely used asymmetric algorithm; security depends on the difficulty of factoring large numbers
    - **ECC (Elliptic Curve Cryptography)** — provides equivalent security to RSA with shorter key lengths; preferred on constrained devices
    - **Diffie-Hellman** — a key exchange protocol that lets two parties agree on a shared secret over an untrusted channel
  - **Hashing** — produces a fixed-length digest from any input; used for integrity verification, not encryption
    - **SHA-256 / SHA-3** — current standards for secure hashing; SHA-1 and MD5 are deprecated for security use
    - **Collision Resistance** — the property that makes it computationally infeasible to find two inputs with the same hash output
    - **Salting** — adding random data to a password before hashing to defeat precomputed rainbow table attacks
  - **Digital Signatures** — use asymmetric keys to prove the authenticity and integrity of a message; signed with private, verified with public
  - **PKI (Public Key Infrastructure)** — the systems, policies, and procedures that manage digital certificates and public keys
    - **CA (Certificate Authority)** — the trusted entity that issues and signs digital certificates after verifying identity
    - **RA (Registration Authority)** — handles identity verification on behalf of the CA before certificate issuance
    - **CRL (Certificate Revocation List)** — a list of certificates the CA has revoked before their expiration date
    - **OCSP (Online Certificate Status Protocol)** — a real-time way to check whether a certificate has been revoked
    - **Certificate Pinning** — hardcoding a specific certificate or public key in an application to prevent substitution attacks
  - **Key Management Lifecycle** — the full set of operational steps needed to keep cryptographic keys secure and trustworthy
    - **Generation** — creating keys using a cryptographically strong random number generator
    - **Distribution** — delivering keys to authorized parties without exposing them in transit
    - **Storage** — protecting keys at rest, typically in hardware security modules (HSMs) or key management systems
    - **Rotation** — periodically replacing keys to limit the window of exposure if a key is compromised
    - **Revocation** — immediately invalidating a key when compromise is suspected or a certificate authority flags it
    - **Destruction** — securely deleting key material so it cannot be recovered after it is no longer needed
  - **Cryptographic Attack Types**
    - **Brute Force** — systematically trying all possible key values; countered by sufficient key length
    - **Birthday Attack** — exploits hash collision probability to find two inputs with the same output faster than expected
    - **Rainbow Table Attack** — uses precomputed hash-to-input mappings to crack passwords; defeated by salting
    - **Side-Channel Attack** — extracts key material by analyzing timing, power consumption, or electromagnetic emissions
    - **Man-in-the-Middle** — an attacker intercepts and potentially alters communication between two parties
  - **Steganography** — hiding the existence of a message inside another file (image, audio, video) rather than encrypting it
- **Hardware and Platform Trust** — mechanisms that provide a verified foundation for software and data security
  - **TPM (Trusted Platform Module)** — a hardware chip that stores cryptographic keys, measures system integrity, and supports attestation
  - **HSM (Hardware Security Module)** — a dedicated hardware device for generating, storing, and using cryptographic keys in tamper-resistant form
  - **Secure Boot** — a process that verifies each stage of the startup sequence against a trusted signature before allowing execution
  - **TEE (Trusted Execution Environment)** — an isolated processor region where code executes without being observable or modifiable by the main OS
  - **BIOS/UEFI Security** — firmware-level protections that ensure the boot process has not been altered before the OS loads
- **Physical Security** — the barriers, detection mechanisms, and procedures that protect facilities, equipment, and people from physical threats
  - **Site Selection and Layout**
    - **CPTED (Crime Prevention Through Environmental Design)** — using physical layout, lighting, and landscaping to reduce crime opportunity
    - **Perimeter Security** — the outermost layer of physical protection including fences, bollards, and setback distance
    - **Natural Access Control** — shaping the environment to guide authorized movement and deter unauthorized entry
    - **Territorial Reinforcement** — using physical features to signal ownership and increase the perceived risk for intruders
  - **Physical Access Controls**
    - **Mantraps (Airlocks)** — two-door entry systems that allow only one person at a time; prevent tailgating
    - **Turnstiles and Revolving Doors** — physical barriers that enforce one-person-per-authentication entry
    - **Biometric Access** — using physical characteristics (fingerprint, iris, face) to verify identity before entry
    - **Smart Card / Badge Access** — proximity or contact cards that authenticate employees at controlled access points
    - **Visitor Management** — formal procedures for escorting, logging, and badging guests and contractors
  - **Environmental Controls**
    - **HVAC** — heating, ventilation, and air conditioning required to keep data centers within safe operating temperature and humidity ranges
    - **Fire Suppression** — systems designed to detect and extinguish fires without damaging electronic equipment
      - **Halon / Clean Agent** — gaseous suppression that extinguishes without water; safe for electronics
      - **Wet Pipe Sprinkler** — always-pressurized water system; fast but damaging to electronics
      - **Dry Pipe Sprinkler** — water is released only when a valve activates; slower but reduces accidental discharge risk
    - **Water Intrusion Detection** — sensors that alert when water enters raised-floor or equipment spaces
    - **Power Conditioning** — protecting equipment from surges, sags, and noise using UPS, generators, and line conditioners
      - **UPS (Uninterruptible Power Supply)** — battery backup that provides power during brief outages or while generators start
      - **Generator** — a fuel-powered backup power source for extended outages
      - **Redundant Power Feeds** — drawing power from two separate utility paths to eliminate single points of failure

---

### L3 — Applied Judgment: Virtualization, Cloud, IoT, and Industrial Control Systems

- **Virtualization Security** — the controls needed when multiple virtual machines share physical hardware
  - **Hypervisor** — software that creates and manages virtual machines; Type 1 runs on bare metal, Type 2 runs on an OS
  - **VM Escape** — an attack where malicious code breaks out of a virtual machine and compromises the hypervisor or other VMs
  - **VM Sprawl** — the accumulation of unmanaged, forgotten, or orphaned virtual machines that expand the attack surface
  - **Snapshot Security** — virtual machine snapshots can expose sensitive data and must be protected and managed deliberately
- **Cloud Security Architecture** — the security design concerns specific to services delivered via cloud infrastructure
  - **IaaS (Infrastructure as a Service)** — customer controls OS, applications, and data; provider controls the physical infrastructure
  - **PaaS (Platform as a Service)** — customer controls applications and data; provider controls OS and runtime
  - **SaaS (Software as a Service)** — customer controls data only; provider controls all underlying infrastructure
  - **Cloud Deployment Models**
    - **Public Cloud** — shared multi-tenant infrastructure owned and operated by a provider and available to any customer
    - **Private Cloud** — dedicated infrastructure for a single organization; may be on-premises or provider-hosted
    - **Hybrid Cloud** — a combination of public and private that allows workload movement between them
    - **Community Cloud** — shared infrastructure for a specific group of organizations with common requirements
  - **Cloud Security Controls**
    - **CASB (Cloud Access Security Broker)** — a policy enforcement point between cloud users and cloud services that enforces DLP, authentication, and compliance
    - **Cloud Encryption** — encrypting data before uploading or using provider encryption with customer-managed keys
    - **Serverless Security** — function-level access control, input validation, and dependency management for code without traditional servers
- **IoT Security** — the specific challenges of securing devices with limited processing power, long operational lives, and physical exposure
  - **Firmware Security** — ensuring IoT device firmware is authentic, tamper-resistant, and can be securely updated
  - **Default Credential Risk** — many IoT devices ship with well-known default passwords that are rarely changed after deployment
  - **Network Segmentation for IoT** — isolating IoT devices on dedicated VLANs or segments to limit blast radius if one is compromised
  - **OTA (Over-the-Air) Updates** — the mechanism for patching IoT firmware remotely; must be authenticated and integrity-verified
- **ICS/SCADA Security** — the security requirements for industrial control systems that manage physical processes in critical infrastructure
  - **OT (Operational Technology)** — hardware and software that monitors and controls physical processes; availability is often higher priority than confidentiality
  - **SCADA** — a supervisory control and data acquisition system that monitors and controls dispersed industrial assets
  - **PLC (Programmable Logic Controller)** — a dedicated industrial computer that directly controls physical processes in manufacturing and utilities
  - **Air Gap** — a physical separation between OT networks and corporate/internet networks; increasingly difficult to maintain
  - **Purdue Reference Model** — a hierarchical model that separates industrial control system levels from enterprise IT to assist segmentation

---

## B4. Communication and Network Security — Finalizado

Status: Finalizado em 2026-04-23.

**Description:** Domain 4 covers how data moves across networks and how those movements are made secure. It spans the OSI/TCP-IP model, network segmentation, wireless protocols, VPNs, secure channels, and network-based attacks and defenses — with the CISSP lens always on design decisions that limit lateral movement and exposure rather than on memorizing configuration syntax.

---

### L1 — Foundations: Network Models, Protocols, and Segmentation

- **OSI Model** — a seven-layer reference framework that describes how network communication is organized from physical signaling to application behavior
  - **Layer 7 – Application** — the layer where user-facing protocols like HTTP, DNS, SMTP, and FTP operate
  - **Layer 6 – Presentation** — handles data formatting, translation, compression, and encryption/decryption
  - **Layer 5 – Session** — manages the establishment, maintenance, and termination of communication sessions
  - **Layer 4 – Transport** — provides end-to-end delivery with TCP (reliable, connection-oriented) or UDP (fast, connectionless)
  - **Layer 3 – Network** — handles logical addressing and routing between different networks; where IP lives
  - **Layer 2 – Data Link** — manages communication within a single network segment using MAC addresses and frames
  - **Layer 1 – Physical** — the physical medium and electrical/optical signals that carry bits from one device to another
- **TCP/IP Model** — the practical four-layer model that underlies the real internet and most production networks
  - **Application Layer** — combines OSI layers 5-7; encompasses HTTP, DNS, DHCP, SMTP, FTP, and SNMP
  - **Transport Layer** — TCP and UDP live here; responsible for port-based multiplexing and delivery guarantees
  - **Internet Layer** — IP addressing, routing, ICMP, and ARP belong here
  - **Network Access Layer** — combines OSI layers 1-2; Ethernet, Wi-Fi, and MAC addressing live here
- **Common Protocols and Their Risks**
  - **DNS** — translates domain names to IP addresses; vulnerable to poisoning, hijacking, and amplification attacks
  - **DHCP** — assigns IP addresses dynamically; vulnerable to rogue server attacks that redirect traffic
  - **HTTP/HTTPS** — the web communication protocol; HTTP is plaintext, HTTPS adds TLS encryption and server authentication
  - **SMTP/IMAP/POP3** — email transport and retrieval protocols; historically sent credentials and content in cleartext
  - **SNMP** — a network management protocol; older versions transmit community strings in cleartext
  - **Telnet vs SSH** — Telnet sends all data including credentials in cleartext; SSH encrypts all communication
  - **FTP vs SFTP/FTPS** — FTP sends data and credentials in cleartext; SFTP and FTPS add encryption
- **Network Segmentation** — dividing a network into isolated zones to limit lateral movement and reduce the blast radius of a compromise
  - **VLAN (Virtual Local Area Network)** — a logical grouping of devices on a shared physical switch that behaves like a separate network
  - **DMZ (Demilitarized Zone)** — a buffer network segment between the internet and the internal network where public-facing servers live
  - **Subnetting** — dividing an IP address space into smaller ranges to enforce routing policies and access control boundaries
  - **Micro-Segmentation** — enforcing access control at the individual workload level using software-defined policy rather than physical switches
  - **Zero Trust Network Access (ZTNA)** — granting per-session, identity-verified access to specific resources without broad network access
  - **Air-Gapped Network** — a network physically isolated from all external connections; used in highest-sensitivity environments

---

### L2 — Controls & Mechanisms: Firewalls, IDS/IPS, VPNs, and Wireless Security

- **Firewalls** — devices or software that filter network traffic based on rules, state, or content to enforce access policy
  - **Packet Filtering Firewall** — inspects individual packets based on source/destination IP and port; stateless and easily bypassed
  - **Stateful Inspection Firewall** — tracks connection state so it can distinguish legitimate reply traffic from unsolicited packets
  - **Application-Layer Firewall (Proxy Firewall)** — inspects full application-layer content; breaks the direct connection between client and server
  - **NGFW (Next-Generation Firewall)** — combines stateful inspection with application identification, IPS, and TLS inspection
  - **WAF (Web Application Firewall)** — a specialized firewall that inspects HTTP/HTTPS traffic to protect web applications
  - **Firewall Rule Order** — rules are evaluated top to bottom; the first matching rule wins; misplaced rules create gaps
  - **Default Deny** — a firewall policy that blocks all traffic not explicitly permitted; the safest baseline
- **IDS / IPS** — systems that detect or block anomalous or malicious network and host activity
  - **IDS (Intrusion Detection System)** — passively monitors and alerts on suspicious activity without blocking it
  - **IPS (Intrusion Prevention System)** — actively blocks or drops traffic identified as malicious in real time
  - **NIDS (Network-Based IDS)** — monitors network traffic at a tap or mirror port to detect threats across all devices
  - **HIDS (Host-Based IDS)** — runs on a single device to monitor processes, files, and local logs for signs of compromise
  - **Signature-Based Detection** — compares traffic or activity to a library of known attack patterns; misses novel attacks
  - **Anomaly-Based Detection** — compares current behavior to a learned baseline and alerts on deviations; can detect novel attacks but generates more false positives
  - **False Positive** — an alert triggered by benign activity; too many erode analyst trust and cause alert fatigue
  - **False Negative** — a real attack that the IDS/IPS fails to detect; the more dangerous error
- **VPN (Virtual Private Network)** — creates an encrypted tunnel over an untrusted network so remote traffic is as protected as local traffic
  - **IPsec** — a suite of protocols that authenticates and encrypts IP traffic at the network layer; used for site-to-site and remote access VPNs
    - **Transport Mode** — encrypts only the payload; used for host-to-host communication within a trusted network
    - **Tunnel Mode** — encrypts the entire original IP packet; used for gateway-to-gateway VPNs
    - **AH (Authentication Header)** — provides authentication and integrity without encryption
    - **ESP (Encapsulating Security Payload)** — provides authentication, integrity, and encryption of the payload
    - **IKE (Internet Key Exchange)** — the protocol that negotiates and manages IPsec security associations
  - **SSL/TLS VPN** — uses TLS to create a VPN accessible through a standard web browser; simpler for remote users
  - **Split Tunneling** — sending only organizational traffic through the VPN and routing internet traffic directly; reduces performance impact but increases risk
  - **Full Tunnel VPN** — routes all traffic through the VPN including internet traffic; higher overhead but greater visibility and control
- **Wireless Security** — the controls specific to radio-frequency network communication
  - **Wi-Fi Standards and Security Protocols**
    - **WEP** — the original Wi-Fi security protocol; completely broken and must never be used
    - **WPA** — an improvement over WEP using TKIP; also considered deprecated for security environments
    - **WPA2** — uses AES-CCMP for encryption; still widely deployed; vulnerable to KRACK attacks on older implementations
    - **WPA3** — the current standard; adds SAE handshake, forward secrecy, and improved protection against offline dictionary attacks
  - **802.1X** — a port-based authentication standard that requires devices to authenticate before they receive network access
  - **EAP (Extensible Authentication Protocol)** — a framework for wireless authentication that carries credentials to a RADIUS server
  - **RADIUS** — a centralized authentication, authorization, and accounting server used for network access control
  - **Rogue Access Point** — an unauthorized wireless access point installed on the network; creates an uncontrolled entry point
  - **Evil Twin Attack** — setting up an access point with the same SSID as a legitimate one to intercept user traffic
  - **War Driving** — scanning for Wi-Fi networks from a moving vehicle to map coverage areas or find vulnerable access points
  - **Site Survey** — a systematic assessment of wireless signal coverage, interference, and coverage gaps before or after deployment
- **Secure Communication Channels** — protocols and mechanisms that protect communication for specific use cases
  - **TLS (Transport Layer Security)** — the current standard for encrypting application-layer communications; replaced SSL which is deprecated
    - **TLS Handshake** — the negotiation process where client and server agree on cipher suite, exchange certificates, and establish session keys
    - **Certificate Validation** — verifying the server's certificate is signed by a trusted CA, not expired, and not revoked
    - **Perfect Forward Secrecy (PFS)** — using ephemeral session keys so past sessions cannot be decrypted even if the private key is later compromised
  - **S/MIME** — a standard for encrypting and digitally signing email messages end to end
  - **PGP/GPG** — a decentralized encryption system for email and file encryption using a web of trust instead of a CA hierarchy

---

### L3 — Applied Judgment: Network Attacks, Defense Architecture, and Monitoring

- **Common Network Attacks** — attack techniques that the CISSP candidate must recognize and understand how to mitigate
  - **Denial of Service (DoS)** — flooding a target with traffic or requests until it can no longer serve legitimate users
  - **Distributed Denial of Service (DDoS)** — a DoS attack launched from many systems simultaneously, making source blocking ineffective
  - **SYN Flood** — an attacker sends many TCP SYN packets without completing the handshake, exhausting the server's connection table
  - **Smurf Attack** — sending ICMP broadcast requests with a spoofed source IP so amplified replies overwhelm the victim
  - **DNS Poisoning (Cache Poisoning)** — inserting false DNS records into a resolver's cache to redirect users to malicious sites
  - **ARP Spoofing** — sending fake ARP replies to associate the attacker's MAC address with a legitimate IP, enabling interception
  - **Packet Sniffing** — capturing network traffic in transit to read unencrypted data or harvest credentials
  - **Replay Attack** — capturing and retransmitting a valid authentication message to gain unauthorized access
  - **Man-in-the-Middle (MitM)** — an attacker intercepts communication between two parties, potentially reading or altering it
  - **Session Hijacking** — taking over an active authenticated session by stealing the session token
- **Network Defense Architecture Principles** — higher-level design decisions that make a network resilient to these attacks
  - **Egress Filtering** — controlling what traffic is allowed to leave the network to prevent data exfiltration and stop spoofed traffic
  - **Ingress Filtering** — controlling inbound traffic to block packets with spoofed source addresses
  - **BCP38 / BCP84** — internet best practices for ingress filtering that prevent source address spoofing
  - **Honeypots and Honeynets** — decoy systems or networks designed to attract attackers, detect intrusion, and gather intelligence
  - **Darknet Monitoring** — watching unused IP ranges that should never receive legitimate traffic to detect scanning and unauthorized activity
  - **Out-of-Band Management** — managing network devices through a separate, dedicated channel so attackers cannot use the production network to manipulate security controls
- **Network Monitoring and Analysis** — the operational practice of watching network behavior to detect threats in progress
  - **NetFlow/IPFIX** — a protocol that exports summary records of network flows without capturing full packet content; used for baseline and anomaly detection
  - **Full Packet Capture** — recording complete packet content for forensic analysis; high storage cost but maximum detail
  - **SIEM** — a platform that collects, normalizes, correlates, and alerts on log and event data from across the environment
  - **Baseline Establishment** — measuring normal network behavior so deviations trigger meaningful alerts rather than noise
  - **Traffic Analysis** — studying patterns in network communication even without reading content to infer behavior and detect threats

---

## B5. Identity and Access Management (IAM) — Finalizado

Status: Finalizado em 2026-04-23.

**Description:** Domain 5 governs how systems and people prove who they are, how that identity is verified, and how access to resources is granted, limited, and monitored based on that identity. It covers the full spectrum from individual authentication factors through enterprise directory services to federated identity across organizational boundaries.

---

### L1 — Foundations: Identity, Authentication, and the Authorization Vocabulary

- **Identification** — the process of claiming an identity, typically by presenting a username, email, or ID number — no proof yet
- **Authentication** — the process of proving the claimed identity is genuine using something you know, have, are, or where you are
  - **Authentication Factors**
    - **Something You Know** — a password, PIN, or passphrase; vulnerable to guessing, phishing, and credential theft
    - **Something You Have** — a hardware token, smart card, phone, or OTP device; requires physical possession
    - **Something You Are** — biometrics such as fingerprint, iris, voice, or face; cannot be forgotten but difficult to revoke
    - **Somewhere You Are** — location-based restrictions such as IP geolocation or GPS; used as a supporting factor
    - **Something You Do** — behavioral patterns such as typing rhythm or mouse movement; emerging and usually supplementary
  - **Multi-Factor Authentication (MFA)** — requiring two or more distinct authentication factors to significantly raise the cost of account compromise
  - **Single-Factor Authentication** — relying on only one factor; acceptable only for low-risk resources
  - **Authentication Strength** — measured by the difficulty of forging, stealing, or bypassing the factor; higher strength for higher sensitivity
  - **Biometric Performance Metrics**
    - **FRR (False Rejection Rate)** — how often a legitimate user is incorrectly denied; higher FRR frustrates users
    - **FAR (False Acceptance Rate)** — how often an impostor is incorrectly granted access; higher FAR creates security risk
    - **CER (Crossover Error Rate / Equal Error Rate)** — the threshold point where FRR equals FAR; lower CER means better overall accuracy
- **Authorization** — the process of determining what an authenticated identity is permitted to do or access
  - **Access Control Policy** — the set of rules defining which subjects can access which objects and under what conditions
  - **Subject** — the active entity requesting access (a user, process, or service)
  - **Object** — the passive resource being accessed (a file, database, network service)
  - **Reference Monitor** — the conceptual enforcer of access control policy that mediates every access request
    - **Must be Tamper-Proof** — the reference monitor must be protected from modification by any subject
    - **Must be Always Invoked** — it must be consulted for every access; no bypass paths
    - **Must be Verifiable** — it must be small and simple enough to be fully analyzed for correctness
  - **Security Kernel** — the hardware and software combination that implements the reference monitor in a real system
- **Access Control Models** — formal models that define how authorization decisions are made and who can change them
  - **DAC (Discretionary Access Control)** — the resource owner decides who gets access; flexible but vulnerable to Trojan horse attacks
  - **MAC (Mandatory Access Control)** — a central policy assigns labels; users cannot override it; used in high-security environments
  - **RBAC (Role-Based Access Control)** — access is granted to roles, not individuals; users inherit access by being assigned to a role
  - **ABAC (Attribute-Based Access Control)** — access decisions consider multiple attributes (user, resource, environment) dynamically
  - **Rule-Based Access Control** — access is governed by a fixed set of rules (firewall ACLs are an example) that apply to all subjects
  - **PBAC (Policy-Based Access Control)** — similar to ABAC but emphasizes combining multiple policies into a unified decision engine
  - **Risk-Adaptive Access Control** — adjusts access rights dynamically based on real-time risk signals from user behavior or context

---

### L2 — Controls & Mechanisms: Identity Management, Provisioning, and Privileged Access

- **Identity Lifecycle Management** — the processes that govern an identity from creation through modification to deactivation and deletion
  - **Provisioning** — creating an account and granting the appropriate access rights when someone joins or changes roles
  - **Modification** — updating access rights when a person changes role, location, or responsibilities
  - **De-Provisioning** — promptly removing or disabling access when someone leaves the organization or changes to a role with different access needs
  - **Orphan Accounts** — accounts that still exist and are active after the user has left; a significant insider threat risk
  - **Dormant Accounts** — accounts that have not been used for an extended period; should be reviewed and disabled
  - **Access Recertification (Access Review)** — a periodic process where managers confirm that each person's current access rights are still appropriate
- **Directory Services** — centralized repositories of identity and access information that other systems query for authentication and authorization
  - **LDAP (Lightweight Directory Access Protocol)** — the standard protocol for querying and modifying directory information
  - **Active Directory** — Microsoft's directory service that manages users, computers, and policies across a Windows environment
  - **Group Policy** — a mechanism in Active Directory that enforces configuration and security settings across managed devices
  - **LDAPS** — LDAP over TLS; protects directory queries from interception; plain LDAP should not be used
- **Federated Identity** — extending identity trust across organizational boundaries so users can authenticate once and access resources in multiple domains
  - **SSO (Single Sign-On)** — a user authenticates once and receives a session that grants access to multiple applications without re-authentication
  - **SAML (Security Assertion Markup Language)** — an XML-based standard for exchanging authentication and authorization data between an identity provider and service provider
    - **Identity Provider (IdP)** — the trusted system that authenticates the user and issues an assertion
    - **Service Provider (SP)** — the application or service that trusts the IdP's assertion and grants access based on it
    - **SAML Assertion** — the digitally signed XML token the IdP issues that contains the authentication result and attributes
  - **OAuth 2.0** — an authorization framework that lets users grant limited access to their resources to a third-party application without sharing credentials
  - **OpenID Connect (OIDC)** — an identity layer built on top of OAuth 2.0 that adds authentication and user profile data
  - **SCIM (System for Cross-domain Identity Management)** — a protocol for automating user provisioning and deprovisioning across systems
  - **Trust Models**
    - **Cross-Certification** — two PKIs mutually certify each other's CAs, extending trust between two organizations directly
    - **Bridge CA** — a central CA that all participating organizations trust, enabling multilateral federation without direct pairings
    - **Web of Trust** — a decentralized trust model (used by PGP) where individuals vouch for each other's public keys
- **Privileged Access Management (PAM)** — the controls and systems that govern identities with elevated access rights
  - **Privileged Accounts** — accounts with administrative or root-level access; pose the highest risk if compromised
  - **Principle of Least Privilege** — privileged access should be granted only for the specific task and duration required, then removed
  - **Just-In-Time (JIT) Access** — elevating privileges only when needed and automatically removing them after the task or time window expires
  - **Privileged Access Workstation (PAW)** — a dedicated, hardened device used exclusively for privileged administrative tasks
  - **Credential Vaulting** — storing privileged credentials in a secure, audited vault rather than allowing direct knowledge of passwords
  - **Session Recording** — capturing and storing all privileged session activity for audit, forensic, and accountability purposes
  - **Break-Glass Account** — an emergency privileged account used only when normal access paths fail; access must trigger immediate alert and review

---

### L3 — Applied Judgment: Authentication Attacks, Kerberos, and Zero Trust IAM

- **Authentication and Identity Attacks** — common attack techniques targeting identity systems that CISSP candidates must recognize and counter
  - **Phishing** — deceiving users into providing credentials through fraudulent emails or websites
  - **Spear Phishing** — highly targeted phishing that uses personal details to appear more credible
  - **Credential Stuffing** — automating login attempts with credential pairs obtained from previous breaches
  - **Password Spraying** — trying a small set of common passwords against many accounts to avoid lockout thresholds
  - **Brute Force** — systematically trying all password combinations; defeated by lockout, long passwords, and MFA
  - **Pass the Hash** — using a captured password hash to authenticate without knowing the plaintext password
  - **Pass the Ticket** — stealing a Kerberos ticket and using it to authenticate to services the original user was authorized to access
  - **Kerberoasting** — requesting service tickets for service accounts and cracking them offline to recover plaintext passwords
  - **Token Theft** — stealing session tokens or OAuth tokens to impersonate a user without their credentials
- **Kerberos** — the default authentication protocol for Windows Active Directory; uses tickets to grant access without re-sending passwords
  - **KDC (Key Distribution Center)** — the central server that issues tickets; contains both the Authentication Service and Ticket Granting Service
  - **TGT (Ticket Granting Ticket)** — the initial ticket a user receives after successful authentication; used to request service tickets
  - **Service Ticket** — a ticket issued by the TGS that grants access to a specific service; short-lived to limit exposure
  - **AS Exchange** — the initial phase where the user authenticates to the KDC and receives a TGT
  - **TGS Exchange** — the second phase where the user presents the TGT to get a service ticket for a specific resource
  - **Kerberos Delegation** — a capability that allows a service to request tickets on behalf of a user; a high-risk configuration if unconstrained
- **Zero Trust IAM Architecture** — applying zero trust principles specifically to identity and access decisions
  - **Continuous Authentication** — validating identity and context throughout a session rather than only at login
  - **Device Trust** — verifying the security posture of the device before granting access regardless of credential strength
  - **Identity-as-Perimeter** — treating the authenticated, authorized identity as the security boundary rather than the network

---

## B6. Security Assessment and Testing — Finalizado

Status: Finalizado em 2026-04-23.

**Description:** Domain 6 covers how organizations verify that their security controls work as intended — through structured assessments, penetration testing, audits, continuous monitoring, and code-level review. The CISSP lens is on oversight design and professional judgment about what to test, how to test it, and what results mean for decision-making.

---

### L1 — Foundations: Assessment Strategy, Audit Types, and Testing Goals

- **Assessment vs Audit vs Test** — three related but distinct activities with different purposes, authority, and outputs
  - **Security Assessment** — a broad review of security posture against a defined standard or framework; advisory in nature
  - **Security Audit** — a formal, structured examination of compliance against a defined requirement; produces an official finding
  - **Security Test** — an active technical probe that checks whether a control actually works as designed
- **Assessment Strategy Design** — decisions that determine what is tested, by whom, and how findings are used
  - **Scope** — the boundary of what is included in the assessment; must be explicitly defined before work begins
  - **Rules of Engagement** — the agreed terms governing how testing is conducted, what is off-limits, and how incidents are handled
  - **Authorization** — written approval from an appropriate authority before any testing begins; essential for legal protection
  - **Independence** — whether the assessment team is internal or external; external testing provides more objective findings
  - **Risk-Based Prioritization** — directing assessment effort toward the highest-risk systems and processes first
- **Audit Types** — the different formal review activities organizations conduct to verify security and compliance
  - **Internal Audit** — conducted by the organization's own audit team; provides ongoing assurance to management
  - **External Audit** — conducted by an independent third party; provides credible assurance to regulators, customers, and boards
  - **Second-Party Audit** — a customer auditing a supplier based on contractual right-to-audit provisions
  - **Compliance Audit** — confirms adherence to a specific regulation or standard such as PCI DSS or SOX
  - **Operational Audit** — reviews the effectiveness and efficiency of business processes and controls
  - **IT Audit** — focuses specifically on IT controls, system configurations, and technology governance
  - **Log Review and Analysis** — systematic examination of log data to confirm controls are operating correctly and detect anomalies

---

### L2 — Controls & Mechanisms: Vulnerability Management, Penetration Testing, and Code Review

- **Vulnerability Assessment** — the process of systematically identifying, classifying, and prioritizing known weaknesses in systems and software
  - **Scanning Types**
    - **Network Vulnerability Scan** — automated scanning of networked systems to detect open ports, outdated software, and misconfigurations
    - **Web Application Scan** — automated crawling and analysis of web applications to find injection flaws, misconfigurations, and known vulnerabilities
    - **Host-Based Scan** — scanning individual systems from within, providing deeper visibility into installed software and configuration
  - **Authenticated vs Unauthenticated Scanning** — authenticated scans have credentials and see far more vulnerabilities; unauthenticated scans reflect an external attacker's view
  - **CVE (Common Vulnerabilities and Exposures)** — a standardized naming system for publicly known vulnerabilities used across tools and advisories
  - **CVSS (Common Vulnerability Scoring System)** — a numeric scoring system (0–10) that rates vulnerability severity based on exploitability and impact
  - **Vulnerability Management Lifecycle**
    - **Discovery** — finding vulnerabilities through scanning, threat intelligence, or vendor advisories
    - **Prioritization** — ranking vulnerabilities by severity, exploitability, and asset criticality to focus remediation effort
    - **Remediation** — patching, reconfiguring, or applying compensating controls to address the vulnerability
    - **Verification** — rescanning or retesting to confirm the fix was effective and introduced no new issues
    - **Reporting** — communicating findings and trends to stakeholders to support risk decisions
- **Penetration Testing** — an authorized simulated attack conducted by skilled testers to identify vulnerabilities that automated tools and checklists miss
  - **Test Types by Knowledge Level**
    - **Black Box** — testers have no prior knowledge of the target; simulates an external attacker; most realistic but slowest
    - **White Box** — testers have full knowledge of the target including architecture, source code, and credentials; most thorough
    - **Grey Box** — testers have partial knowledge; simulates a partially informed attacker or insider; common compromise
  - **Penetration Testing Phases**
    - **Planning and Reconnaissance** — defining scope, obtaining authorization, and gathering information about the target without active probing
    - **Scanning and Enumeration** — actively probing the target to map services, versions, and potential entry points
    - **Exploitation** — attempting to exploit identified vulnerabilities to gain unauthorized access or escalate privileges
    - **Post-Exploitation** — assessing what can be achieved from the compromised position; lateral movement and persistence
    - **Reporting** — documenting findings, evidence, business impact, and recommended remediations
  - **Red Team vs Blue Team vs Purple Team**
    - **Red Team** — adversarial testers who simulate sophisticated, goal-oriented attacks over an extended period
    - **Blue Team** — the defensive security operations team that detects, responds to, and learns from attacks
    - **Purple Team** — a collaborative engagement where red and blue teams work together explicitly to improve defensive coverage
  - **Bug Bounty Program** — a program where organizations invite external researchers to find and responsibly disclose vulnerabilities in exchange for rewards
- **Application Security Testing** — the methods used to evaluate whether software is free from exploitable security flaws
  - **SAST (Static Application Security Testing)** — analyzing source code or binaries for vulnerabilities without executing the program
  - **DAST (Dynamic Application Security Testing)** — testing a running application by sending inputs and observing responses to find exploitable flaws
  - **IAST (Interactive Application Security Testing)** — agents embedded in the running application observe real-time execution for vulnerabilities
  - **SCA (Software Composition Analysis)** — scanning third-party libraries and dependencies for known vulnerabilities
  - **Fuzzing** — sending malformed, random, or unexpected inputs to an application to find crashes, memory corruption, and input validation flaws
  - **Code Review** — manual or automated inspection of source code for security weaknesses before deployment
    - **Peer Review** — another developer reviews code for security issues as part of the development workflow
    - **Formal Inspection** — a structured, documented review with defined roles and checklists; more rigorous than peer review
- **Security Monitoring and Continuous Assurance** — ongoing visibility into whether controls remain effective between formal assessments
  - **SIEM (Security Information and Event Management)** — collects, normalizes, and correlates security events from across the environment to enable detection and investigation
  - **SOC (Security Operations Center)** — the team and facility responsible for continuous monitoring, detection, and initial response
  - **SOAR (Security Orchestration, Automation, and Response)** — platforms that automate repetitive SOC tasks and coordinate response across multiple tools
  - **UBA/UEBA (User and Entity Behavior Analytics)** — machine learning models that establish behavioral baselines and alert on anomalous deviations
  - **Continuous Control Monitoring** — automated, ongoing checks that verify controls are configured and operating correctly between audits
  - **Threat Intelligence Integration** — feeding current threat intelligence into monitoring tools to improve detection relevance and speed

---

### L3 — Applied Judgment: Reporting, Metrics, and Assessment Governance

- **Findings Classification and Reporting** — turning raw assessment output into actionable business intelligence
  - **Critical / High / Medium / Low / Informational** — standard severity tiers for communicating finding priority to remediation teams and leadership
  - **Risk Rating vs Severity Rating** — severity measures the technical potential of a finding; risk rating also factors in asset criticality and business context
  - **Executive Summary** — a non-technical overview of findings, overall risk posture, and recommended priorities for leadership audiences
  - **Technical Report** — the detailed documentation of vulnerabilities, evidence, reproduction steps, and remediation guidance for technical teams
  - **Remediation Validation** — retesting after fixes to confirm findings were addressed; essential for assessment closure
- **Security Metrics and KPIs** — the measurements that communicate security program effectiveness
  - **Mean Time to Detect (MTTD)** — the average time between an event occurring and the organization becoming aware of it
  - **Mean Time to Respond (MTTR)** — the average time from detection to containment or resolution
  - **Patch Cadence** — the speed at which critical and high vulnerabilities are remediated after disclosure
  - **Control Coverage** — the percentage of assets or processes covered by a given security control
  - **Risk Closure Rate** — the rate at which identified risks are formally remediated or accepted over time
- **Audit Trail and Evidence Management** — the discipline of collecting and preserving evidence in a form that supports audit, legal, and compliance requirements
  - **Chain of Custody** — a documented, unbroken record of who handled evidence, when, and how, to preserve legal admissibility
  - **Non-Repudiation** — the property that prevents a party from denying an action because cryptographic or logged evidence proves it occurred
  - **Log Integrity** — protecting log files from tampering using write-once storage, centralization, or cryptographic chaining

---

## B7. Security Operations — Finalizado

Status: Finalizado em 2026-04-24.

**Description:** Domain 7 is the largest and operationally richest domain. It covers how organizations run security day to day — managing incidents, conducting forensic investigations, controlling change, recovering from disasters, protecting physical facilities, and coordinating across the full operational lifecycle. The CISSP lens is always on process discipline, appropriate escalation, and preserving business continuity while maintaining evidence integrity.

---

### L1 — Foundations: Operations Concepts, Change Management, and Configuration Management

- **Operational Security Principles** — the day-to-day disciplines that prevent mistakes and reduce insider risk in running environments
  - **Separation of Duties** — no single operator should be able to initiate and approve the same critical action
  - **Dual Control** — two authorized people must both act for a sensitive operation to proceed; prevents unilateral action
  - **Split Knowledge** — dividing a secret across two or more people so neither alone has the complete value
  - **Job Rotation** — periodically moving people through roles to expose fraud and prevent entrenchment
  - **Mandatory Vacations** — forcing time away to surface irregularities that an incumbent may be concealing
  - **Least Privilege** — operators have access only to what their current task requires
  - **Need to Know** — access is further restricted to information relevant to the specific task at hand
- **Change Management** — the formal process for controlling modifications to systems to prevent accidental disruption or unauthorized changes
  - **Change Request** — a formal submission documenting the proposed change, reason, risk assessment, and rollback plan
  - **Change Advisory Board (CAB)** — the body that reviews, approves, and schedules changes; includes stakeholders from operations, security, and business
  - **Standard Change** — a pre-approved, low-risk change that follows a documented procedure and does not require individual CAB review
  - **Emergency Change** — an urgent change needed to address a critical outage or security incident; expedited approval with full retrospective documentation
  - **Change Freeze** — a period where non-critical changes are prohibited, typically around major business events or holidays
  - **Rollback Plan** — a documented procedure for reversing a change if it causes unexpected problems
  - **Configuration Baseline** — a documented, approved state of a system that becomes the reference point for change management
- **Configuration Management** — maintaining accurate, controlled records of system configurations to enable consistent, auditable operations
  - **CMDB (Configuration Management Database)** — a repository that records all IT assets and their configuration items and relationships
  - **Configuration Item (CI)** — any component under change management control: hardware, software, network device, or documentation
  - **Baseline Configuration** — an approved snapshot of how a system is configured; deviations must be authorized
  - **Hardening** — the process of removing unnecessary services, applying security settings, and reducing attack surface to meet a security standard
  - **CIS Benchmarks** — industry-recognized hardening guides for specific operating systems, applications, and network devices
  - **STIG (Security Technical Implementation Guide)** — US government hardening specifications for defense information systems

---

### L2 — Controls & Mechanisms: Incident Management, Forensics, and Disaster Recovery

- **Incident Management** — the structured process for detecting, containing, investigating, and recovering from security incidents
  - **Incident Definition** — an adverse event that threatens or breaches the confidentiality, integrity, or availability of organizational assets
  - **Event vs Incident** — an event is any observable occurrence; an incident is one that has or could have a negative security impact
  - **Incident Response Lifecycle**
    - **Preparation** — establishing policies, team roles, tools, and training before incidents occur
    - **Identification** — detecting and confirming that an incident has occurred; triaging severity and priority
    - **Containment** — stopping the spread of impact by isolating affected systems while preserving evidence
      - **Short-Term Containment** — immediate isolation without waiting for a full investigation
      - **Long-Term Containment** — implementing more durable controls while the full response proceeds
    - **Eradication** — removing the root cause including malware, unauthorized accounts, and exploited vulnerabilities
    - **Recovery** — restoring affected systems to normal operation from known-good backups or rebuilt configurations
    - **Lessons Learned (Post-Incident Review)** — structured review to capture what worked, what did not, and what to improve for future incidents
  - **Incident Categories**
    - **Malware Incident** — compromise by malicious software including ransomware, trojans, worms, and spyware
    - **Data Breach** — unauthorized access to or exfiltration of sensitive data
    - **Denial of Service** — disruption of availability through resource exhaustion
    - **Insider Threat Incident** — malicious or negligent action by an authorized user causing harm
    - **Social Engineering Incident** — a human manipulation attack that deceived an employee into a security violation
  - **Computer Security Incident Response Team (CSIRT)** — a designated team with defined roles and authority to lead incident response across the organization
  - **IR Playbooks** — pre-documented response procedures for specific incident types that guide responders without requiring improvisation under pressure
- **Digital Forensics** — the science of collecting, preserving, analyzing, and presenting digital evidence in a legally admissible way
  - **Forensic Readiness** — designing systems and processes in advance so evidence collection is possible and reliable when needed
  - **Order of Volatility** — evidence must be collected from most volatile to least volatile to capture what disappears fastest first
    - **CPU Registers and Cache** — most volatile; disappears when power is removed
    - **RAM (Memory)** — volatile; contains running processes, encryption keys, and network connections
    - **Swap Space / Page File** — semi-volatile; may contain fragments of recently active memory
    - **Running Processes and Network State** — volatile; lost when a process ends or connection closes
    - **Disk Storage** — persistent but can be overwritten; capture before system reuse
    - **Remote Logs and Backup** — off-system; most durable but potentially less granular
  - **Chain of Custody** — a documented, unbroken record of every person who handled the evidence from collection through presentation
  - **Forensic Image** — a bit-for-bit copy of storage media created with write blockers so the original is never modified during analysis
  - **Write Blocker** — a hardware or software device that prevents any writes to source media during imaging
  - **Hash Verification** — computing a hash of evidence at collection and again during analysis to confirm nothing changed
  - **Memory Forensics** — acquiring and analyzing the contents of RAM to find encryption keys, malware, credentials, and network connections
  - **Log Analysis** — systematic examination of system, application, and network logs to reconstruct the timeline of an incident
  - **Timeline Analysis** — building a chronological sequence of events from multiple evidence sources to understand attack progression
  - **Legal Admissibility** — evidence must be authentic, accurate, complete, convincing, and admissible in the relevant legal jurisdiction
  - **E-Discovery** — the process of identifying, preserving, collecting, reviewing, and producing electronically stored information for legal proceedings
- **Disaster Recovery** — the IT-focused subset of BCP that restores systems and data after a disruptive event
  - **Recovery Site Strategies**
    - **Hot Site** — a fully equipped, immediately available alternate facility; highest cost, shortest RTO
    - **Warm Site** — a partially equipped facility that requires some setup time before becoming operational
    - **Cold Site** — a basic facility with power and connectivity but no pre-installed equipment; lowest cost, longest RTO
    - **Mobile Site** — a trailer or portable facility that can be deployed to different locations as needed
    - **Cloud-Based Recovery** — using cloud infrastructure as a DR target; can achieve near-hot capability at lower cost
  - **Backup Strategies**
    - **Full Backup** — a complete copy of all data; longest to create, fastest to restore
    - **Incremental Backup** — copies only data changed since the last backup of any type; fast to create, slower to restore
    - **Differential Backup** — copies all data changed since the last full backup; moderate speed in both directions
    - **Continuous Data Protection (CDP)** — captures every write in near-real time to minimize RPO to seconds or minutes
  - **DR Testing** — validating that recovery procedures and systems actually work before they are needed
    - **Read-Through (Checklist)** — team members read the DR plan to confirm it is current and understood
    - **Structured Walkthrough** — representatives from each team walk through their steps in a group discussion
    - **Simulation** — a scenario is presented and teams respond verbally without touching production systems
    - **Parallel Test** — recovery systems are activated alongside production to confirm they work without a full cutover
    - **Full Interruption Test** — actual failover to the DR site; highest fidelity and highest risk; requires careful planning

---

### L3 — Applied Judgment: Threat Intelligence, Investigations, and Physical Operations Security

- **Threat Intelligence** — structured knowledge about adversaries, their capabilities, and their likely actions used to inform defensive decisions
  - **Strategic Intelligence** — high-level analysis of adversary trends and motivations for executive and governance audiences
  - **Operational Intelligence** — information about specific planned or ongoing campaigns useful for current defensive posture
  - **Tactical Intelligence** — specific adversary techniques (TTPs) mapped to the MITRE ATT&CK framework for use in detection and hunting
  - **Technical Intelligence** — specific indicators of compromise (IOCs) such as IPs, domains, file hashes, and signatures
  - **MITRE ATT&CK Framework** — a comprehensive, adversary-behavior knowledge base organized by tactic and technique used for detection engineering and red team planning
  - **Threat Hunting** — a proactive search through data looking for adversary activity that automated tools have not flagged
  - **IOC (Indicator of Compromise)** — an artifact observed in evidence of a possible intrusion (IP address, hash, domain, registry key)
  - **IOA (Indicator of Attack)** — behavioral evidence of ongoing attack activity even before malicious files or code are identified
  - **ISAC (Information Sharing and Analysis Center)** — sector-specific organizations that facilitate the sharing of threat intelligence between peer organizations
- **Investigations** — the structured process for examining potential security violations internally or in support of legal proceedings
  - **Types of Investigations**
    - **Criminal Investigation** — involves potential law violations; requires law enforcement involvement and highest evidence standards
    - **Civil Investigation** — involves disputes between parties; supports litigation and must meet civil evidence standards
    - **Administrative Investigation** — internal to the organization; determines policy violations and appropriate disciplinary response
    - **Regulatory Investigation** — triggered by a regulator examining compliance with legal or industry requirements
  - **Interview Considerations** — gathering testimony in a way that is fair, documented, and legally appropriate
  - **Evidence Types**
    - **Direct Evidence** — evidence that directly proves a fact without inference (a confession, a witness observation)
    - **Circumstantial Evidence** — evidence that supports an inference but does not directly prove the fact
    - **Documentary Evidence** — written records such as logs, contracts, and emails
    - **Physical Evidence** — tangible objects such as devices, cables, and printed materials
    - **Best Evidence Rule** — original documents are preferred; copies must be authenticated if originals are unavailable
  - **Enticement vs Entrapment** — enticement creates an opportunity for someone already inclined to commit an act; entrapment induces someone to commit a crime they would not otherwise commit; only entrapment is legally problematic
- **Security Operations for Physical and Environmental Threats**
  - **Visitor and Contractor Management** — ensuring people who are not employees are properly identified, escorted, and logged
  - **Media Handling in Operations** — controlling how portable storage is used and disposed of in operational environments
  - **Sensitive Area Access** — ensuring data center, communication rooms, and control rooms are accessible only to specifically authorized personnel with logged entry
  - **Surveillance** — using CCTV and motion detection as both deterrent and detective controls
  - **Environmental Monitoring** — continuous monitoring of temperature, humidity, power quality, and water intrusion to detect conditions that threaten system availability

---

## B8. Software Development Security — Finalizado

Status: Finalizado em 2026-04-24.

**Description:** Domain 8 addresses how security is integrated into the creation of software — from requirements and design through coding, testing, and deployment. The CISSP perspective is governance-level: understanding the secure software development lifecycle, recognizing common vulnerability classes, and ensuring security is not deferred to a final audit but built into every stage of production.

---

### L1 — Foundations: SDLC, Security Requirements, and Software Governance

- **SDLC (Software Development Lifecycle)** — the structured set of phases through which software is conceived, built, tested, deployed, and retired
  - **Requirements Phase** — security requirements must be defined here, alongside functional requirements, so they are never optional later
  - **Design Phase** — security architecture, threat modeling, and trust boundary design happen before a single line of code is written
  - **Development Phase** — secure coding practices, peer review, and SAST tools are applied as code is written
  - **Testing Phase** — DAST, penetration testing, and SCA are applied to running code before release
  - **Deployment Phase** — configuration baselines, deployment checklists, and secrets management are enforced during release
  - **Maintenance Phase** — patch management, re-assessment, and monitoring continue throughout the operational life of the software
  - **Disposal Phase** — secure retirement of software including data migration, access revocation, and dependency cleanup
- **SDLC Models and Their Security Implications**
  - **Waterfall** — sequential phases with formal gates; security reviews are clear but late discovery is expensive
  - **Agile** — iterative sprints with continuous delivery; security must be embedded in each sprint rather than deferred
  - **DevOps** — merging development and operations with rapid deployment pipelines; security must be automated or it becomes a bottleneck
  - **DevSecOps** — explicitly integrating security into every stage of the DevOps pipeline from commit to production
  - **Spiral Model** — iterative development that incorporates formal risk assessment at each cycle; well-suited to high-risk systems
  - **RAD (Rapid Application Development)** — prioritizes speed and prototyping; security governance must compensate for reduced documentation
- **Software Security Governance** — the policies, roles, and oversight mechanisms that ensure software development follows security standards
  - **Security Development Lifecycle (SDL)** — Microsoft's formal process that embeds security at every SDLC stage
  - **Application Security Policy** — an organizational policy defining what security requirements apply to all software
  - **Secure Coding Standards** — specific, enforceable rules governing how developers must write code (e.g., OWASP Secure Coding Practices)
  - **Change Control for Software** — applying formal change management to software releases to prevent unauthorized or unreviewed deployments
  - **Software Bill of Materials (SBOM)** — a complete, machine-readable inventory of all components and dependencies in a software product

---

### L2 — Controls & Mechanisms: Secure Coding, Testing, and Database Security

- **Common Software Vulnerability Classes** — the categories of weakness most commonly exploited in software attacks
  - **Injection Attacks** — flaws where untrusted input is interpreted as commands or code by a back-end system
    - **SQL Injection** — inserting SQL commands into input fields to manipulate or extract database data
    - **Command Injection** — inserting OS commands into application input to execute them on the server
    - **LDAP Injection** — manipulating LDAP queries to bypass authentication or extract directory data
    - **XML Injection / XXE** — exploiting XML parsers to access local files or make server-side requests
  - **Cross-Site Scripting (XSS)** — injecting malicious scripts into web pages that execute in other users' browsers
    - **Reflected XSS** — the malicious script is included in the request and immediately reflected back in the response
    - **Stored XSS** — the malicious script is saved in the application (e.g., a comment) and executes for every visitor
    - **DOM-Based XSS** — the attack modifies the browser's DOM without the server ever processing the payload
  - **Cross-Site Request Forgery (CSRF)** — tricking an authenticated user's browser into sending unwanted requests to a trusted application
  - **Buffer Overflow** — writing more data to a memory buffer than it can hold, overwriting adjacent memory and potentially redirecting execution
    - **Stack Overflow** — overflowing a buffer on the call stack to overwrite return addresses
    - **Heap Overflow** — corrupting dynamically allocated memory to manipulate application behavior
  - **Race Condition (TOCTOU)** — an attacker exploits the time gap between checking a condition and using the result to alter system behavior
  - **Insecure Direct Object Reference (IDOR)** — accessing another user's data by manipulating a reference (ID, filename) in a request without proper authorization check
  - **Security Misconfiguration** — leaving default credentials, debug features, or unnecessary services enabled in production
  - **Broken Authentication** — flaws in session management or authentication that allow attackers to impersonate legitimate users
  - **Insecure Deserialization** — allowing untrusted serialized data to be deserialized, potentially executing arbitrary code
  - **Using Components with Known Vulnerabilities** — deploying libraries or frameworks with unpatched CVEs that attackers can exploit
- **Secure Coding Practices** — specific technical habits developers must follow to prevent the vulnerability classes above
  - **Input Validation** — checking all input against expected type, length, format, and range before processing it
  - **Output Encoding** — encoding output for the target context (HTML, URL, SQL) to prevent injection and XSS
  - **Parameterized Queries (Prepared Statements)** — separating SQL code from data so injected input is treated as data, not commands
  - **Principle of Least Privilege in Code** — database accounts and processes used by the application have only the permissions their function requires
  - **Error Handling** — returning generic error messages to users while logging detailed errors securely server-side to avoid information leakage
  - **Secrets Management** — never hardcoding credentials, keys, or tokens in source code; using vaults or environment injection at runtime
  - **Dependency Management** — keeping third-party libraries current and removing unused dependencies to minimize vulnerability exposure
- **Database Security** — controls specific to protecting databases and the data they store
  - **Database Encryption**
    - **TDE (Transparent Data Encryption)** — encrypts the database file at rest without application changes
    - **Column-Level Encryption** — encrypting specific sensitive columns (e.g., SSN, card number) rather than the entire database
    - **Application-Level Encryption** — the application encrypts data before writing it to the database so the DBMS never sees plaintext
  - **Database Access Control** — granting database users and application accounts only the permissions their function requires, not DBA-level rights
  - **Stored Procedure Security** — using stored procedures to encapsulate data operations and prevent direct table access from the application layer
  - **Database Activity Monitoring (DAM)** — real-time inspection and logging of database queries to detect unauthorized or anomalous access
  - **SQL Server Hardening** — disabling unnecessary features, applying patches, removing sample databases, and auditing privileged user activity
  - **Inference Attack** — deducing sensitive values from non-sensitive query results through aggregation or analysis; especially relevant in multi-level secure databases
  - **Aggregation Attack** — combining multiple individually non-sensitive facts to construct information that would require a higher clearance to access directly
- **API Security** — controls specific to application programming interfaces which are the primary attack surface in modern software architectures
  - **Authentication for APIs** — requiring all API callers to authenticate using API keys, OAuth tokens, or client certificates
  - **Authorization for APIs** — enforcing that authenticated callers can only access the resources and operations their role permits
  - **Rate Limiting** — restricting how many requests a caller can make in a time window to prevent abuse and DoS
  - **Input Validation on APIs** — validating all parameters, headers, and body content before processing, even for internal APIs
  - **API Inventory** — maintaining a complete record of all APIs including undocumented or shadow APIs that are often overlooked in security reviews
  - **OWASP API Security Top 10** — a widely referenced list of the most critical API security risks used to guide API design and testing

---

### L3 — Applied Judgment: DevSecOps, Supply Chain Integrity, and Deployment Security

- **DevSecOps** — the organizational practice and toolchain integration that makes security a continuous, automated part of the development pipeline
  - **Shift Left** — moving security activities earlier in the SDLC so defects are caught when they are cheapest to fix
  - **CI/CD Pipeline Security** — securing the continuous integration and delivery pipeline to prevent supply chain attacks and unauthorized deployments
    - **Code Signing** — digitally signing build artifacts so their integrity and origin can be verified before deployment
    - **Branch Protection** — requiring code review and status checks before code can be merged to protected branches
    - **Secrets Scanning** — automatically scanning commits and repositories for hardcoded credentials before they reach version control
    - **SAST in CI** — running static analysis on every commit so security findings block the pipeline before code ships
    - **Dependency Scanning** — automatically checking new dependencies against vulnerability databases before they are added to the project
    - **Container Image Scanning** — scanning container images for known CVEs and misconfigurations before deployment to production
    - **Infrastructure as Code (IaC) Scanning** — analyzing Terraform, CloudFormation, and Kubernetes manifests for security misconfigurations before provisioning
  - **Immutable Infrastructure** — deploying servers from standardized, version-controlled images and replacing rather than patching them to prevent configuration drift
  - **GitOps** — using version control as the single source of truth for infrastructure and deployment configuration, enabling auditability
- **Software Supply Chain Security** — controlling the trustworthiness of code, components, and systems that flow into your software from external sources
  - **Third-Party Libraries** — external code packages that must be inventoried, licensed, patched, and monitored for vulnerabilities
  - **SBOM (Software Bill of Materials)** — a formal record of all components in a software product enabling rapid impact assessment when new CVEs are published
  - **Typosquatting** — attackers register package names similar to legitimate packages to serve malicious code to developers who mistype the name
  - **Dependency Confusion** — an attack where a malicious public package with the same name as an internal package is substituted during build
  - **Compromised Build Tools** — attackers targeting the build toolchain itself to inject malicious code into legitimate software at build time (supply chain attack, cf. SolarWinds)
  - **Vendor Security Assessment** — evaluating the security practices of software vendors before integrating their components or tools
- **Deployment and Runtime Security** — ensuring that secure software is deployed and operated securely in production
  - **Environment Separation** — maintaining distinct development, testing, staging, and production environments with access controls between them
  - **Production Access Controls** — limiting who can access production systems and ensuring all such access is logged and reviewed
  - **Runtime Application Self-Protection (RASP)** — embedding security agents inside the application to detect and block attacks in real time during execution
  - **Web Application Firewall (WAF) in Context** — a compensating control at the boundary that reduces exposure but does not substitute for secure code
  - **Canary Deployment** — releasing new code to a small fraction of users first to detect security or reliability problems before full rollout
  - **Blue/Green Deployment** — maintaining two identical production environments and switching traffic between them to enable instant rollback
  - **Software Escrow** — depositing source code with a neutral third party so it can be retrieved if the vendor ceases operations

---

## Appendix: Backlog Metadata Reference

The following table summarizes the structural parameters needed for adaptive study planning, analytics, and content versioning across all 8 backlog items.

| Domain | B# | Lessons | Key Frameworks | Primary Exam Difficulty | Typical CISSP Weight |
|---|---|---|---|---|---|
| Security and Risk Management | B1 | L1: Governance & Ethics / L2: Legal, BCP, Personnel / L3: Vendor Risk & Metrics | NIST CSF, ISO 31000, COBIT, FAIR | Conceptual / Judgment | ~15% |
| Asset Security | B2 | L1: Classification & Privacy / L2: Lifecycle & Disposal / L3: Cloud & De-ID | GDPR, ISO 27001, NIST 800-88 | Definitional / Applied | ~10% |
| Security Architecture & Engineering | B3 | L1: Principles & Models / L2: Crypto, Hardware & Physical / L3: Cloud, IoT, ICS | Common Criteria, NIST 800-53, Purdue | Technical / Mixed | ~13% |
| Communication & Network Security | B4 | L1: OSI/TCP-IP & Segmentation / L2: Firewalls, VPN & Wireless / L3: Attacks & Monitoring | OSI, IEEE 802.11, IPsec, TLS | Technical / Applied | ~13% |
| Identity and Access Management | B5 | L1: Identity & Auth Vocabulary / L2: Lifecycle, PAM & Federation / L3: Attacks & ZT IAM | SAML, OAuth/OIDC, NIST 800-63 | Applied / Judgment | ~13% |
| Security Assessment and Testing | B6 | L1: Strategy & Audit Types / L2: Vuln, Pentest & AppSec / L3: Reporting & Metrics | CVSS, OWASP, NIST 800-115 | Applied / Judgment | ~12% |
| Security Operations | B7 | L1: Operations, Change & Config / L2: IR, Forensics & DR / L3: Threat Intel & Investigations | NIST 800-61, NIST 800-86, MITRE ATT&CK | Judgment / Process | ~13% |
| Software Development Security | B8 | L1: SDLC & Governance / L2: Secure Coding, DB & API / L3: DevSecOps & Supply Chain | OWASP Top 10, BSIMM, NIST SSDF | Technical / Applied | ~11% |

---

> **Versioning note:** This backlog targets CISSP CBK 2024. Each domain node carries an implicit `versionCode: "2024.1"` matching the seed. When ISC2 updates the CBK, changed nodes should be tagged with the new version code and the prior version archived rather than deleted, enabling delta reviews for candidates mid-study.
>
> **Localization note:** All concept names above are in English. The bilingual expansion (`pt-BR` and future locales) follows the seed pattern: `t("English term", "Portuguese term")` applied at the `ConceptName` and explanation layers independently. No concept explanation should be a literal translation — each locale's explanation should be re-voiced for natural fluency.
>
> **Extensibility note:** The three-lesson structure (Foundations → Controls & Mechanisms → Applied Judgment) is domain-agnostic. The same scaffold applies to future certifications such as CCSP, CISM, or CompTIA Security+. Only the domain taxonomy and node content changes; the exercise types, mastery signals, and review loop logic remain constant across the platform.
