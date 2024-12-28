import DropdownProfile from "@/components/DropdownProfile/DropdownProfile";

export const Header = () => {
  return (
    <header className="flex items-center justify-end px-8 h-24">
      <DropdownProfile />
    </header>
  );
};
