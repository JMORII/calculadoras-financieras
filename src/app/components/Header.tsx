import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          CalculaFinanzas
        </Link>
        <nav>
          <Link
            href="/calculadoras/interes-compuesto"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Interés Compuesto
          </Link>
        </nav>
      </div>
    </header>
  );
}