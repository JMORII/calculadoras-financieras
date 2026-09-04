import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cobre/20 bg-tinta">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 p-6 text-sm text-hueso/70">
        <nav className="flex gap-4">
          <Link href="/aviso-legal" className="hover:text-cobre">
            Aviso Legal
          </Link>
          <Link href="/privacidad" className="hover:text-cobre">
            Política de Privacidad
          </Link>
          <Link href="/cookies" className="hover:text-cobre">
            Política de Cookies
          </Link>
        </nav>
        <p>
          © {new Date().getFullYear()} CalculaFinanzas. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}