import Link from "next/link";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/planetes", label: "Planètes" },
  { href: "/picture-of-the-day", label: "Image du Jour" },
  { href: "/about", label: "À propos" },
];

export function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex flex-wrap justify-center mb-6">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-muted-foreground hover:text-primary transition-colors duration-200 mx-3 my-2 ${
                index !== navItems.length - 1
                  ? "sm:border-r sm:border-muted-foreground/30 sm:pr-6"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="text-center text-sm text-muted-foreground">
          © 2024 EpiSpace. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
