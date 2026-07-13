import PageMeta from "../components/PageMeta";
import Eyebrow from "../components/Eyebrow";
import Wrap from "../components/Wrap";
import Section from "../components/Section";

export default function Press() {
  return (
    <>
      <PageMeta title="Press" />

      <Section className="bg-white">
        <Wrap>
          <div className="mx-auto max-w-[820px] bg-white px-6 py-14 sm:px-10">
            {/* Masthead */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
              Press release
            </span>
             
            </div>

            {/* Headline */}
            <h1 className="mt-8 max-w-[760px] text-[32px] font-semibold leading-[1.2] tracking-tight text-slate-900 sm:text-[38px]">
              QuantZen™ Announces Patent Pending Post Quantum Security
              Platform for API Driven Infrastructure
            </h1>
            <p className="mt-4 max-w-[680px] text-[17px] leading-relaxed text-slate-500">
              Company files an Indian patent application for a middleware
              approach that protects API communications against quantum era
              threats without replacing existing infrastructure.
            </p>

            {/* Body */}
            <div className="mt-10 space-y-5 text-[15.5px] leading-[1.75] text-slate-700">
              <p>
                QuantZen™ today announced the launch of its patent pending
                platform for post-quantum cryptographic protection of
                API driven digital communication networks, and confirmed the
                filing of an Indian patent application covering its core
                technology.
              </p>
              <p>
                As organizations across banking, payments, telecommunications,
                and government move critical operations onto API driven
                infrastructure, the cryptography securing those communications
                faces an approaching threat. Public key algorithms such as RSA
                and elliptic curve cryptography the foundation of
                today&rsquo;s transport security are vulnerable to future
                quantum computers. Adversaries are already understood to be
                conducting &ldquo;harvest now, decrypt later&rdquo;
                operations, capturing encrypted traffic today to decrypt once
                quantum capability matures.
              </p>

              {/* Pull quote */}
              <div className="my-8 rounded-r-lg border-l-[3px] border-indigo-500 bg-sky-50/70 py-5 pl-6 pr-5">
                <p className="text-[19px] font-medium italic leading-snug text-slate-800">
                  &ldquo;Securing the post quantum transition cannot require
                  every institution to rebuild its infrastructure. QuantZen
                  protects the API traffic organizations already run, today,
                  and gives them the agility to evolve as standards
                  advance.&rdquo;
                </p>
              </div>

              <p>
                The QuantZen platform operates as a middleware security layer
                at the API boundary. It intercepts API requests, applies
                NIST standardized post quantum key establishment and digital
                signatures, verifies authenticity and integrity before
                requests reach backend systems, and records a tamper evident
                audit trail all without modifying applications or API
                gateways.
              </p>
              <p>
                The company&rsquo;s patent pending approach emphasizes four
                capabilities its filing identifies as distinguishing:
                quantum aware threat detection, ephemeral key handling with no
                persistent storage, hybrid integration of post quantum
                cryptography with quantum key distribution, and immutable
                audit logging for regulated industries.
              </p>
              <p>
                QuantZen&rsquo;s mission is to secure the world&rsquo;s
                digital communications against quantum threats by making
                post quantum protection deployable without disruption 
                establishing a durable trust layer for the API driven systems
                that critical industries depend on.
              </p>
              <p>
                QuantZen is engaging with banks, telecom operators,
                enterprises, and technology partners on demonstrations and
                pilot programs. Organizations interested in participating can
                contact the company through its website.
              </p>
            </div>

            {/* Footer note */}
            <div className="mt-10 flex items-start gap-2.5 border-t border-slate-200 pt-5">
              <span className="mt-1 inline-flex shrink-0 items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-[10.5px] tracking-[0.05em] text-indigo-600">
                PATENT PENDING
              </span>
              <p className="font-mono text-[12px] leading-relaxed text-slate-400">
                Indian patent application filed. This release describes the
                company&rsquo;s technology and product direction.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>
    </>
  );
}