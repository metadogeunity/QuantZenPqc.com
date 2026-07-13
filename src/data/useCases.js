export const useCases = [
  {
    title: "Banking & Financial Services",
    tag: "BFSI",
    problem:
      "Core banking, onboarding, and transaction APIs carry long lived identity and financial records across many parties.",
    whyQuantum:
      "Account and payment data stays sensitive for decades well within reach of harvest now decrypt later.",
    howWeHelp:
      "Payload level signing, encryption, and verification on every banking API call, with immutable audit for examiners no core changes.",
  },
  {
    title: "Payment Networks",
    tag: "PAYMENTS",
    problem:
      "Authorization, clearing, and settlement messages move at scale between processors, networks, and institutions.",
    whyQuantum:
      "A forged or replayed instruction is high value fraud; captured traffic is a future decryption target.",
    howWeHelp:
      "Post quantum authenticity binds each instruction to authorized intent, with replay protection and non repudiable audit.",
  },
  {
    title: "Telecommunications",
    tag: "TELECOM",
    problem:
      "Subscriber identity, provisioning, and network APIs underpin connectivity and trust across the network edge.",
    whyQuantum:
      "Long lived identity and provisioning data is a prime harvest target across cross-border routing.",
    howWeHelp:
      "Quantum safe protection of network and provisioning APIs over even constrained links, without replacing core systems.",
  },
  {
    title: "GSMA Open Gateway APIs",
    tag: "OPEN GATEWAY",
    problem:
      "Standardized network APIs expose identity, verification, and SIM operations to a broad partner ecosystem.",
    whyQuantum:
      "Open, multi party access widens the surface for tampering and future decryption of identity flows.",
    howWeHelp:
      "A drop in layer that protects Open Gateway and SGP.32 traffic while preserving the standard interfaces.",
  },
  {
    title: "Government Infrastructure",
    tag: "GOVERNMENT",
    problem:
      "Citizen services and inter agency systems exchange sensitive records through digital interfaces.",
    whyQuantum:
      "National data carries the longest confidentiality lifetimes, making retroactive decryption especially damaging.",
    howWeHelp:
      "Sovereign, on premise deployment with post-quantum protection and tamper evident audit for accountability.",
  },
  {
    title: "Enterprise APIs",
    tag: "ENTERPRISE",
    problem:
      "Internal and partner APIs and microservices move proprietary data continuously across environments.",
    whyQuantum:
      "Intellectual property and operational data captured today can be exposed within its useful life.",
    howWeHelp:
      "Sidecar based protection across a service mesh, applied by policy with zero changes to service code.",
  },
  {
    title: "Cloud Platforms",
    tag: "CLOUD",
    problem:
      "Microservices communicate within and across clouds and back to on premise systems.",
    whyQuantum:
      "Multi tenant, multi hop paths expand exposure of data in transit to interception and archival.",
    howWeHelp:
      "Consistent post quantum protection across cloud and hybrid boundaries under a single policy.",
  },
  {
    title: "Digital Identity Systems",
    tag: "IDENTITY",
    problem:
      "Authentication, verification, and credential APIs are the gatekeepers of digital trust.",
    whyQuantum:
      "Compromised or forged identity assertions undermine every system that relies on them.",
    howWeHelp:
      "Post quantum signing and verification ensure identity assertions are authentic, untampered, and non repudiable.",
  },
  {
    title: "Web3 & Digital Asset Infrastructure",
    tag: "INFRASTRUCTURE",
    problem:
      "Gateways, custodians, and settlement services expose high-value operations through APIs.",
    whyQuantum:
      "High value, irreversible operations are an acute target for tampering and future decryption.",
    howWeHelp:
      "Payload level authenticity, integrity, and audit on the API operations surrounding digital asset infrastructure.",
  },
];
