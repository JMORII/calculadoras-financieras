import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-pergamino px-6 py-20">
      <div className="w-full max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium text-piedra">
          Herramientas de cálculo financiero
        </p>
        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-tinta">
          Entiende tu dinero antes de moverlo
        </h1>
        <p className="mb-12 text-lg text-piedra">
          Calculadoras claras y gratuitas para tomar mejores decisiones
          financieras, sin hojas de cálculo complicadas.
        </p>

        <Link
          href="/calculadoras/interes-compuesto"
          className="inline-block border-b-2 border-cobre px-1 pb-1 font-serif text-xl font-semibold text-tinta hover:text-cobre"
        >
          Calcular interés compuesto
        </Link>
      </div>
    </main>
  );
}