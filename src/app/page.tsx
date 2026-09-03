import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">
        Calculadoras Financieras
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        Elige una calculadora para empezar
      </p>

      <Link
        href="/calculadoras/interes-compuesto"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Interés Compuesto →
      </Link>
    </main>
  );
}