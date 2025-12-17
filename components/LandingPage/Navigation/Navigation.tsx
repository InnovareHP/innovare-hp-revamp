import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="absolute top-4 sm:top-20 left-2 sm:left-14 z-20 text-white flex items-center gap-2">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Innovare HP"
          width={100}
          height={100}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        />
      </Link>

      <span className="uppercase font-light text-sm sm:text-lg font-signika tracking-[0.55em] sm:block hidden">
        Innovare HP
      </span>
    </nav>
  );
};

export default Navigation;
