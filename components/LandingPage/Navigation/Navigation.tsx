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
