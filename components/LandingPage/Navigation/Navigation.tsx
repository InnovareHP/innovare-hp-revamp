import Image from "next/image";
import Link from "next/link";

interface NavigationProps {
  isFieldNotes?: boolean;
}

const Navigation = ({ isFieldNotes = false }: NavigationProps) => {
  return (
    <nav
      className={`${isFieldNotes ? "relative" : "absolute top-20 left-2 z-20 sm:left-14"} text-white flex items-center gap-2`}
    >
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Innovare HP"
          width={100}
          height={100}
          sizes="(max-width: 639px) 64px, (max-width: 767px) 80px, 96px"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        />
      </Link>

      <span
        className={`uppercase font-light text-lg font-signika tracking-[0.55em] sm:block hidden ${isFieldNotes ? "text-black" : "text-white"}`}
      >
        Innovare HP
      </span>
    </nav>
  );
};

export default Navigation;
