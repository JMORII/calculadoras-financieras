import MortgageCalculator from "@/app/components/MortgatgeCalculator";

export default function HipotecaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-pergamino px-6 py-16">
      <div className="mb-10 w-full max-w-md text-center">
        <p className="mb-3 text-sm font-medium text-piedra">
          Calculadora financiera
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-tinta">
          Hipoteca
        </h1>
        <p className="text-piedra">
          Calcula la cuota mensual de tu hipoteca y el coste total del
          préstamo.
        </p>
      </div>

      <MortgageCalculator />
    </main>
  );
}