import DropdownProfile from "@/components/DropdownProfile/DropdownProfile";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 h-20 md:h-24 ">
      <div className="flex items-center">
        <div className="size-8 rounded-md bg-secondary/20 outline outline-1 outline-primary/5 flex items-center justify-center">
          <Image
            src="/escrita.svg"
            alt="Logo"
            width={24}
            height={24}
            className="rotate-12 invert dark:invert-0"
          />
        </div>
        <div className="ml-4 text-lg hidden md:block">Speechnotes</div>
      </div>
      <DropdownProfile />
    </header>
  );
};
