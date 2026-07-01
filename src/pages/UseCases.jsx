import PageMeta from "../components/PageMeta";
import Eyebrow from "../components/Eyebrow";
import Wrap from "../components/Wrap";
import Section from "../components/Section";
import { useCases } from "../data/useCases";

export default function UseCases() {
  const isOdd = useCases.length % 2 !== 0;

  return (
    <>
      <PageMeta title="Use Cases" />

      <Section className="bg-white">
        <Wrap>
          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
              Where QuantZen applies
            </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] text-slate-900 max-[860px]:text-[27px]">
              Built for the{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(41, 43, 145, 0.42), rgba(67, 173, 230, 0.9))",
                }}
              >
                infrastructure
              </span>{" "}
              the economy depends on.
            </h2>
            <p className="mt-4.5 max-w-[680px] text-lg text-muted">
              Anywhere critical data crosses an API, QuantZen protects it
              against tampering today and quantum decryption tomorrow. Each
              environment, the same drop-in model.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
            {useCases.map((u, i) => {
              const isLastOdd = isOdd && i === useCases.length - 1;

              const card = (
                <div
                  className="group relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.42), rgba(186,230,253,0.9))",
                  }}
                >
                  <div className="relative h-full rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_12px_30px_-12px_rgba(99,102,241,0.35)]">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl opacity-60"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(186,230,253,0.35), rgba(255,255,255,0))",
                      }}
                    />

                    <div className="relative">
                      <h3 className="mb-4 flex items-center gap-2.5 text-lg font-semibold text-slate-900">
                        {u.title}
                        <span
                          className="rounded-[5px] px-[7px] py-0.5 font-mono text-[11px] font-medium"
                          style={{
                            color: "rgb(79,70,229)",
                            background: "rgba(99,102,241,0.08)",
                            border: "1px solid rgba(99,102,241,0.3)",
                          }}
                        >
                          {u.tag}
                        </span>
                      </h3>

                      <div className="flex flex-col gap-3.5">
                        <div>
                          <div className="mb-1 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                            The problem
                          </div>
                          <p className="text-[13.8px] leading-relaxed text-muted">
                            {u.problem}
                          </p>
                        </div>

                        <div>
                          <div className="mb-1 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                            Why quantum matters
                          </div>
                          <p className="text-[13.8px] leading-relaxed text-muted">
                            {u.whyQuantum}
                          </p>
                        </div>

                        <div
                          className="rounded-xl p-3.5"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(186,230,253,0.15))",
                            border: "1px solid rgba(99,102,241,0.15)",
                          }}
                        >
                          <div className="mb-1 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                            How QuantZen helps
                          </div>
                          <p className="text-[13.8px] leading-relaxed text-slate-700">
                            {u.howWeHelp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );

              if (isLastOdd) {
                return (
                  <div
                    key={u.title}
                    className="col-span-2 flex justify-center max-[860px]:col-span-1"
                  >
                    <div className="w-full max-w-[calc(50%-10px)] max-[860px]:max-w-full">
                      {card}
                    </div>
                  </div>
                );
              }

              return <div key={u.title}>{card}</div>;
            })}
          </div>
        </Wrap>
      </Section>
    </>
  );
}