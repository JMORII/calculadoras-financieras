import CompoundInterestCalculator from "@/app/components/CompoundInterestCalculator";

export default function InteresCompuestoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-pergamino px-6 py-16">
      <div className="mb-10 w-full max-w-md text-center">
        <p className="mb-3 text-sm font-medium text-piedra">
          Calculadora financiera
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-tinta">
          Interés Compuesto
        </h1>
        <p className="text-piedra">
          Calcula cuánto crecerá tu dinero con el tiempo, reinvirtiendo los
          intereses generados.
        </p>
      </div>

      <CompoundInterestCalculator />
    </main>
  );
}