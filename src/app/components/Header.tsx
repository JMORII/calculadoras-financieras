import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-cobre/20 bg-tinta">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-hueso"
        >
          CalculaFinanzas
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/calculadoras/interes-compuesto"
            className="text-sm font-medium text-hueso/80 hover:text-cobre"
          >
            Interés Compuesto
          </Link>
          <Link
            href="/calculadoras/hipoteca"
            className="text-sm font-medium text-hueso/80 hover:text-cobre"
          >
            Hipoteca
          </Link>
          <Link
            href="/calculadoras/sueldo-neto"
            className="text-sm font-medium text-hueso/80 hover:text-cobre"
          >
            Sueldo Neto
          </Link>
        </nav>
      </div>
    </header>
  );
}