import Link from "next/link";

/** The brand-deep bar that closes every page. */
const FooterBar = () => (
  <div className="bg-brand-deep">
    <div className="hp-container flex flex-col items-center justify-center gap-2 py-6 text-center text-[13px] text-white sm:flex-row sm:gap-6 lg:h-[92px] lg:py-0">
      <p>&copy; {new Date().getFullYear()} Innovare HP. All rights reserved.</p>
      <nav aria-label="Footer links">
        <Link href="/privacy-policy" className="text-white hover:text-white/80">
          Privacy Policy
        </Link>
      </nav>
    </div>
  </div>
);

export default FooterBar;
