// import PageMeta from "../components/PageMeta";
// import Eyebrow from "../components/Eyebrow";
// import Card from "../components/Card";
// import ArchDiagram from "../components/ArchDiagram";
// import CtaBand from "../components/CtaBand";
// import Wrap from "../components/Wrap";
// import Section from "../components/Section";
// import AnimatedHero from "../components/AnimatedHero";
// import AtomDivider from "../components/AtomDivider";
// import {
//   IconServerOff,
//   IconCodeOff,
//   IconShieldLock,
//   IconRefresh,
//   IconLockCheck,
//   IconAtom,
// } from "@tabler/icons-react";
// import PressRelease from "../components/PressRelease";

// const threatCards = [
//   {
//     icon: "HNDL",
//     title: "Harvest now, decrypt later",
//     body:
//       "Adversaries are recording encrypted API traffic today, archiving it until quantum capability matures. Data with a long confidentiality life is already exposed in transit.",
//   },
//   {
//     icon: "API",
//     title: "The API is the trust boundary",
//     body:
//       "Open Banking, payments, provisioning, and microservices all move through API calls across many parties at machine speed. That boundary is where confidentiality and authenticity must hold.",
//   },
//   {
//     icon: "⏱",
//     title: "Migration can't wait for a flag day",
//     body:
//       "Rip-and-replace migration to new cryptography means new TLS stacks, HSMs, PKI, and rewritten applications — years of cost and risk most institutions cannot absorb.",
//   },
// ];

// const homeArchNodes = [
//   { title: "Application", detail: "client / service" },
//   { title: "QuantZen™ Layer", detail: "intercept · protect · verify", highlight: true },
//   { title: "API Gateway", detail: "Kong · NGINX · Envoy" },
//   { title: "Backend Systems", detail: "unchanged core" },
// ];

// const valueProps = [
//   { icon: <IconServerOff size={18} />, num: "01", title: "No infrastructure replacement", body: "Deploy alongside existing systems. No new PKI, HSM swap, or TLS-stack migration required." },
//   { icon: <IconCodeOff size={18} />, num: "02", title: "Zero application modifications", body: "Protection happens at the boundary. Application code, schemas, and UI logic are untouched." },
//   { icon: <IconShieldLock size={18} />, num: "03", title: "API interception & protection", body: "Requests are intercepted, signed, and encrypted at the payload level — beyond transport security alone." },
//   { icon: <IconRefresh size={18} />, num: "04", title: "Cryptographic agility", body: "Rotate or upgrade algorithms by policy as standards evolve — no re-architecture, no rewrites." },
//   { icon: <IconLockCheck size={18} />, num: "05", title: "Immutable audit logging", body: "Every protected request produces a tamper-evident, cryptographically chained audit record for compliance." },
//   { icon: <IconAtom size={18} />, num: "06", title: "Future-ready by design", body: "Standardized post-quantum algorithms today, with a clear migration path for whatever NIST standardizes next." },
// ];

// export default function Home() {
//   return (
//     <>
//       <PageMeta title="Home" />

//       <AnimatedHero />

//      <AtomDivider from="#ffffff" to="#ffffff" />
     
      
//       <Section className="relative overflow-hidden bg-white">
//         <div
//           className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
//           style={{
//             background:
//               "radial-gradient(closest-side, rgba(99,102,241,0.16), rgba(186,230,253,0.22), transparent)",
//           }}
//         />
//         <Wrap className="relative">
//           <div className="mb-14 flex flex-col items-center text-center">
//              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
//               The quantum clock is already running
//             </span>
//             <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
//               <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
//                  Encrypted
//               </span>{" "}
//                     today. Exposed tomorrow.{" "}
//             </h2>
//             <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
//               The cryptography protecting your APIs — RSA and elliptic-curve —
//               was never designed to withstand a quantum computer. A
//               sufficiently capable machine running Shor&rsquo;s algorithm
//               breaks the public-key foundations of TLS. The threat does not
//               wait for that machine to arrive.
//             </p>
//           </div>

//           <div className="relative mt-10 grid grid-cols-3 gap-5 max-[860px]:grid-cols-1">
//             {threatCards.map((c) => (
//               <Card
//                 key={c.title}
//                 title={c.title}
//                 className="border-slate-200/80 bg-white bg-none shadow-[0_4px_18px_rgba(99,102,241,0.08)] transition-shadow hover:shadow-[0_8px_28px_rgba(99,102,241,0.14)] [&_h3]:text-[#16181d] [&_p]:!text-slate-600"
//               >
//                 <div
//                   className="mb-4 inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[11px] tracking-[0.05em] text-indigo-600"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(186,230,253,0.35))",
//                   }}
//                 >
//                   {c.icon}
//                 </div>
//                 <p>{c.body}</p>
//               </Card>
//             ))}
//           </div>
//         </Wrap>
//       </Section>
//        <AtomDivider from="#ffffff" to="#ffffff" />
//        <PressRelease />
//       <section className="relative overflow-hidden bg-white">
//       <div className="relative mx-auto max-w-[700px] px-6 py-20">
//         <div className="mb-14 flex flex-col items-center text-center">
//              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
//               What QuantZen does
//             </span>
//             <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
//               A{" "}
//               <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
//                  security
//               </span>{" "}
//               layer that wraps<br className="hidden sm:block" /> what you already run.
//             </h2>
//             <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
//                QuantZen™ sits at your API boundary and protects requests and
//             responses with post-quantum cryptography in flight. Your
//             applications, API gateways, and backend systems stay exactly as
//             they are.
//             </p>
//           </div>

//         <ArchDiagram nodes={homeArchNodes} />
//       </div>
//     </section>
//      <AtomDivider from="#ffffff" to="#ffffff" />

//      <Section className="bg-white">
//   <Wrap>
//     <div className="mb-14 flex flex-col items-center text-center">
//              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
//                Why teams choose QuantZen
//             </span>
//             <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
//               <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
//                  Post-quantum 
//               </span>{" "}
//               security, without the rebuild.{" "}
//             </h2>
//           </div>

//     {/* Cards */}
//     <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-4 mb-5">
//       {valueProps.map((v) => (
//         <Card key={v.title} icon={v.icon} num={v.num} title={v.title}>
//           <p>{v.body}</p>
//         </Card>
//       ))}
//     </div>

//     {/* CTA */}
//     <CtaBand
//       className="mt-10"
//       heading="See QuantZen protect a live API call."
//       body="Walk through interception, post-quantum signing, verification, and audit against your own request formats."
//       ctaLabel="Request a demo →"
//     />

//   </Wrap>
// </Section>
//     </>
//   );
// }








import PageMeta from "../components/PageMeta";
import Eyebrow from "../components/Eyebrow";
import Card from "../components/Card";
import ArchDiagram from "../components/ArchDiagram";
import CtaBand from "../components/CtaBand";
import Wrap from "../components/Wrap";
import Section from "../components/Section";
import AnimatedHero from "../components/AnimatedHero";
import AtomDivider from "../components/AtomDivider";
import QtoZSection from "../components/QtoZSection";
import {
  IconServerOff,
  IconCodeOff,
  IconShieldLock,
  IconRefresh,
  IconLockCheck,
  IconAtom,
} from "@tabler/icons-react";
import PressRelease from "../components/PressRelease";
import { Lock, ShieldAlert, Database, Landmark, ShieldCheck, Radio, Server, Fingerprint, Building2 } from "lucide-react";
import { RefreshCw, Plug, TimerReset } from "lucide-react";
import QuantZenSection from "../components/QuantZenSection";
import QuantZenSDKSection from "../components/QuantZenSDKSection";
import NewsletterSection from "../components/NewsletterSection";
import QDayCountdownSection from "../components/QDayCountdownSection";
import CustomerJourney from "../components/ CustomerJourney";
import ActivePilots from "../components/ActivePilots";

const threatCards = [
  {
    icon: "HNDL",
    title: "Harvest now, decrypt later",
    body:
      "Adversaries are recording encrypted API traffic today, archiving it until quantum capability matures. Data with a long confidentiality life is already exposed in transit.",
  },
  {
    icon: "API",
    title: "The API is the trust boundary",
    body:
      "Open Banking, payments, provisioning, and microservices all move through API calls across many parties at machine speed. That boundary is where confidentiality and authenticity must hold.",
  },
  {
    icon: "⏱",
    title: "Migration can't wait for a flag day",
    body:
      "Rip-and-replace migration to new cryptography means new TLS stacks, HSMs, PKI, and rewritten applications — years of cost and risk most institutions cannot absorb.",
  },
];

const homeArchNodes = [
  { title: "Application", detail: "client / service" },
  { title: "QuantZen™ Layer", detail: "intercept · protect · verify", highlight: true },
  { title: "API Gateway", detail: "Kong · NGINX · Envoy" },
  { title: "Backend Systems", detail: "unchanged core" },
];

const valueProps = [
  { icon: <IconServerOff size={18} />, num: "01", title: "No infrastructure replacement", body: "Deploy alongside existing systems. No new PKI, HSM swap, or TLS-stack migration required." },
  { icon: <IconCodeOff size={18} />, num: "02", title: "Zero application modifications", body: "Protection happens at the boundary. Application code, schemas, and UI logic are untouched." },
  { icon: <IconShieldLock size={18} />, num: "03", title: "API interception & protection", body: "Requests are intercepted, signed, and encrypted at the payload level — beyond transport security alone." },
  { icon: <IconRefresh size={18} />, num: "04", title: "Cryptographic agility", body: "Rotate or upgrade algorithms by policy as standards evolve — no re-architecture, no rewrites." },
  { icon: <IconLockCheck size={18} />, num: "05", title: "Immutable audit logging", body: "Every protected request produces a tamper-evident, cryptographically chained audit record for compliance." },
  { icon: <IconAtom size={18} />, num: "06", title: "Future-ready by design", body: "Standardized post-quantum algorithms today, with a clear migration path for whatever NIST standardizes next." },
];

const challengePoints = [
  {
    icon: <Lock size={17} />,
    title: "RSA & ECC everywhere",
    body: "Current internet security relies on RSA and Elliptic Curve Cryptography across nearly every system in use today.",
  },
  {
    icon: <ShieldAlert size={17} />,
    title: "Quantum weakens the math",
    body: "Quantum computers will fundamentally weaken these algorithms, undermining the assumptions they were built on.",
  },
  {
    icon: <Database size={17} />,
    title: "Harvest now, decrypt later",
    body: "Sensitive data intercepted today may be stored and decrypted in the future once large scale quantum computers arrive.",
  },
  {
    icon: <Server size={17} />,
    title: "Costly, complex migration",
    body: "Replacing cryptography across large infrastructures is expensive, technically complex, and slow to execute.",
  },
  {
    icon: <ShieldCheck size={17} />,
    title: "The window is now",
    body: "Critical sectors must begin planning for quantum safe migration before the transition becomes urgent.",
  },
];

const whyItMatters = [
  { icon: <Landmark size={16} />, label: "Banking & payment systems" },
  { icon: <Radio size={16} />, label: "Telecommunications infrastructure" },
  { icon: <Server size={16} />, label: "APIs & enterprise applications" },
  { icon: <Fingerprint size={16} />, label: "Digital identity & authentication" },
  { icon: <Building2 size={16} />, label: "Government & critical infrastructure" },
];

export default function Home() {
  return (
    <>
      <PageMeta title="Home" />

      <AnimatedHero />

     <AtomDivider from="#ffffff" to="#ffffff" />
     
      
     <Section className="relative overflow-hidden bg-white">
  <div
    className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
    style={{
      background:
        "radial-gradient(closest-side, rgba(99,102,241,0.16), rgba(186,230,253,0.22), transparent)",
    }}
  />
  <Wrap className="relative">
    {/* Header */}
    <div className="mb-14 flex flex-col items-center text-center">
      <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
        The quantum clock is already running
      </span>
      <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
        Quantum breaks the{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
            backgroundSize: "200% auto",
            animation: "shimmer 3s linear infinite",
          }}
        >
          cryptography
        </span>{" "}
        the internet runs on
      </h2>
      <p className="mt-4.5 max-w-[680px] text-lg leading-relaxed text-gray-500">
        Modern digital infrastructure depends on public key cryptography 
        RSA and Elliptic Curve Cryptography considered secure against
        today&rsquo;s classical computers. Quantum computing changes that
        assumption. Algorithms like Shor&rsquo;s algorithm could break the
        public key foundations of TLS, compromising signatures,
        authentication, and encrypted communications.
      </p>
    </div>

    {/* The Challenge */}
    <div className="mb-6 flex items-center gap-3 max-[860px]:justify-center">
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-indigo-500">
        The Challenge
      </span>
      <span className="h-px flex-1 bg-slate-200 max-[860px]:hidden" />
    </div>

    <div className="relative grid grid-cols-3 gap-5 max-[860px]:grid-cols-1">
      {challengePoints.slice(0, 3).map((c) => (
        <Card
          key={c.title}
          title={c.title}
          icon={c.icon}
          className="border-slate-200/80 bg-white shadow-[0_4px_18px_rgba(99,102,241,0.08)] transition-shadow hover:shadow-[0_8px_28px_rgba(99,102,241,0.14)]"
        >
          <p>{c.body}</p>
        </Card>
      ))}
    </div>
    <div className="relative mt-5 grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
      {challengePoints.slice(3).map((c) => (
        <Card
          key={c.title}
          title={c.title}
          icon={c.icon}
          className="border-slate-200/80 bg-white shadow-[0_4px_18px_rgba(99,102,241,0.08)] transition-shadow hover:shadow-[0_8px_28px_rgba(99,102,241,0.14)]"
        >
          <p>{c.body}</p>
        </Card>
      ))}
    </div>

    {/* Why It Matters */}
    <div className="mb-6 mt-16 flex items-center gap-3 max-[860px]:justify-center">
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-indigo-500">
        Why It Matters
      </span>
      <span className="h-px flex-1 bg-slate-200 max-[860px]:hidden" />
    </div>

    <div className="flex flex-wrap justify-center gap-3">
      {whyItMatters.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-full border border-[#eaeaf2] bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition-all hover:border-indigo-200 hover:shadow-[0_2px_20px_rgba(99,102,241,.07)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
            {item.icon}
          </span>
          {item.label}
        </div>
      ))}
    </div>

    {/* Closing statement */}
    <p className="mx-auto mt-14 max-w-[680px] text-center text-[15px] leading-relaxed text-slate-500">
      Preparing for post quantum security isn&rsquo;t just about future
      threats  it&rsquo;s about ensuring that today&rsquo;s digital assets,
      communications, and trust remain secure for decades to come.
    </p>
  </Wrap>
      </Section>
       <AtomDivider from="#ffffff" to="#ffffff" />
       <PressRelease />
       <AtomDivider from="#ffffff" to="#ffffff" />
       <CustomerJourney />
       <AtomDivider from="#ffffff" to="#ffffff" />
       <ActivePilots />
        <AtomDivider from="#ffffff" to="#ffffff" />
       <QuantZenSection />
        <AtomDivider from="#ffffff" to="#ffffff" />
      {/* <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-[700px] px-6 py-20">
        <div className="mb-14 flex flex-col items-center text-center">
             <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
              What QuantZen does
            </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
              A{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                 security
              </span>{" "}
              layer that wraps<br className="hidden sm:block" /> what you already run.
            </h2>
            <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
               QuantZen™ sits at your API boundary and protects requests and
            responses with post-quantum cryptography in flight. Your
            applications, API gateways, and backend systems stay exactly as
            they are.
            </p>
          </div>

        <ArchDiagram nodes={homeArchNodes} />
      </div>
    </section> */}
    <QuantZenSDKSection />
     <AtomDivider from="#ffffff" to="#ffffff" />

     <Section className="bg-white">
  <Wrap>
    <QtoZSection />
    <AtomDivider from="#ffffff" to="#ffffff" />
    <NewsletterSection />
     <AtomDivider from="#ffffff" to="#ffffff" />
    {/* <div className="mb-14 flex flex-col items-center text-center">
             <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
               Why teams choose QuantZen
            </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                 Post-quantum 
              </span>{" "}
              security, without the rebuild.{" "}
            </h2>
          </div>

    <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-4 mb-5">
      {valueProps.map((v) => (
        <Card key={v.title} icon={v.icon} num={v.num} title={v.title}>
          <p>{v.body}</p>
        </Card>
      ))}
    </div> */}

    {/* CTA */}
    {/* <CtaBand
      className="mt-10"
      heading="See QuantZen protect a live API call."
      body="Walk through interception, post-quantum signing, verification, and audit against your own request formats."
      ctaLabel="Request a demo →"
    /> */}

  </Wrap>
</Section>
    </>
  );
}