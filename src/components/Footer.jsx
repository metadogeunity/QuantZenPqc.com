import { Link } from "react-router-dom";
import Wrap from "./Wrap";
import QDayCountdownSection from "./QDayCountdownSection";
import AtomDivider from "./AtomDivider";

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.26 10.99H16.17l-5.214-6.817L4.99 21.5H1.68l7.73-8.835L1.5 2.25h6.51l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.3V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.3 2.37 4.3 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM3.55 20.45h3.57V9H3.55v11.45Z" />
    </svg>
  );
}

const footerLinkClass =
  "block cursor-pointer py-1 text-sm text-slate-600 hover:text-blue transition-colors";

const footerHeadingClass =
  "mb-3 font-mono text-[11px] tracking-[0.12em] text-slate-400 uppercase";

const ctaButtonClass =
  "inline-flex items-center px-[18px] py-[9px] rounded-[9px] bg-gradient-to-br from-sky-500 to-indigo-500 !text-white text-[13.5px] font-semibold no-underline whitespace-nowrap border-none cursor-pointer shadow-[0_4px_18px_rgba(99,102,241,0.30),inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,box-shadow] duration-[180ms] ease-out hover:shadow-[0_6px_22px_rgba(99,102,241,0.38),inset_0_1px_0_rgba(255,255,255,0.14)]";

const platformLinks = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/product" },
  { label: "Security", to: "/security" },
  { label: "Deployment", to: "/deployment" },
];

const companyLinks = [
  { label: "Use Cases", to: "/use-cases" },
  { label: "Press Releases", to: "/press" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacypolicy" },
  { label: "Terms of Use", to: "/termsofuse" },
  { label: "Cookie Policy", to: "/cookie" },
  { label: "Responsible Disclosure", to: "/responsibledisclosurepolicy" },
  { label: "Export Control Notice", to: "/exportcontrol" },
];

export default function Footer() {
  return (
    <footer className="bg-white pb-10">
      <QDayCountdownSection />

      <AtomDivider from="#ffffff" to="#ffffff" />

      <Wrap>
        <div className="flex flex-wrap items-start justify-between gap-7.5 pt-[54px]">
          <div>
            <div className="flex items-center gap-[11px] cursor-pointer font-disp text-[19px] font-semibold tracking-[-0.01em] text-slate-900">
              <img src="../../Logo.png" alt="QuantZen logo" className="h-[26px] w-auto object-contain" />
              <span>
                QuantZen<span className="align-super text-[10px] text-slate-400">™</span>
              </span>
            </div>
            <p className="mt-3.5 max-w-[320px] text-[13px] text-slate-500">
              Patent filed application no : 202641078837 Post quantum cybersecurity platform that enables banks, telecom operators, and fintechs to adopt quantum safe cryptography without replacing their existing infrastructure.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              <a href="https://x.com/quant_zen" target="_blank" rel="noopener noreferrer" aria-label="QuantZen on X" className="grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-slate-200 text-slate-500 transition-colors hover:border-blue hover:text-blue">
                <XIcon />
              </a>
              <a href="https://www.linkedin.com/company/quantix09/" target="_blank" rel="noopener noreferrer" aria-label="QuantZen on LinkedIn" className="grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-slate-200 text-slate-500 transition-colors hover:border-blue hover:text-blue">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-[50px]">
            <div>
              <h5 className={footerHeadingClass}>Platform</h5>
              {platformLinks.map((link) => (
                <Link key={link.label} className={footerLinkClass} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <h5 className={footerHeadingClass}>Company</h5>
              {companyLinks.map((link) => (
                <Link key={link.label} className={footerLinkClass} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <h5 className={footerHeadingClass}>Legal</h5>
              {legalLinks.map((link) => (
                <Link key={link.label} className={footerLinkClass} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <h5 className={footerHeadingClass}>Engage</h5>
              <div className="flex flex-col gap-2.5">
                <Link className={ctaButtonClass} to="/contact">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-slate-200 pt-5.5 font-mono text-[12.5px] text-slate-500">
          <span>© 2025 Zenith Studio LLC. All Rights Reserved. QuantZen™ developed by Zenith Studio LLC are registered trademarks licensed under the Government of Ras Al Khaimah, United Arab Emirates. All content, including but not limited to text, code, software, graphics, trademarks, visual identity, SDK , Logo documentation, and digital assets, is the exclusive intellectual property of Zenith Studio LLC. Unauthorised reproduction, distribution, modification, reverse engineering, or republication, in whole or in part, without prior written permission, is strictly prohibited and may result in legal action under applicable UAE Federal Copyright Law No. 7 of 2002 (as amended) and relevant international treaties.</span>
          <span> Patent filed application no : 202641078837</span>
        </div>
      </Wrap>
    </footer>
  );
}