import Image from "next/image";
import NavLinks from "./nav-links";

function SideNav() {
  return (
    <nav className="h-full flex flex-col">
      <div className="bg-primary flex flex-col h-full text-primary-foreground p-2 pt-6 items-center">
        <Image
          src="/assets/vanine-logo.svg"
          alt="vanine logo"
          width={50}
          height={30}
          className="mb-12"
        />
        <NavLinks />
      </div>
    </nav>
  );
}

export default SideNav;
