import CompoundInterestCalculator from "@/app/components/CompoundInterestCalculator";

export default function InteresCompuestoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">
        Calculadora de Interés Compuesto
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        Calcula cuánto crecerá tu dinero con el tiempo
      </p>

      <CompoundInterestCalculator />
    </main>
  );
}