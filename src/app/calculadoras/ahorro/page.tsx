import SavingsGoalCalculator from "@/app/components/SavingsGoalCalculator";

export const metadata = {
  title: "Calculadora de Ahorro con Objetivo | CalculaFinanzas",
  description:
    "Calcula cuánto necesitas ahorrar cada mes para alcanzar tu meta financiera, teniendo en cuenta la rentabilidad esperada.",
};

export default function AhorroPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-pergamino px-6 py-16">
      <div className="mb-10 w-full max-w-md text-center">
        <p className="mb-3 text-sm font-medium text-piedra">
          Calculadora financiera
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-tinta">
          Ahorro con Objetivo
        </h1>
        <p className="text-piedra">
          Descubre cuánto necesitas ahorrar cada mes para alcanzar tu meta.
        </p>
      </div>

      <SavingsGoalCalculator />

      <article className="mt-16 w-full max-w-2xl text-piedra">
        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          ¿Cómo funciona esta calculadora?
        </h2>
        <p className="mb-8 leading-relaxed">
          Defines tu objetivo (por ejemplo, 10.000€ para una entrada de un
          coche), el plazo en el que quieres conseguirlo, y una rentabilidad
          esperada de tu ahorro. La calculadora invierte la fórmula del
          interés compuesto para decirte exactamente cuánto debes aportar
          cada mes, teniendo en cuenta que ese dinero también generará
          intereses mientras ahorras.
        </p>

        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          Preguntas frecuentes
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Qué pasa si ya tengo algo ahorrado?
            </h3>
            <p className="leading-relaxed">
              Indícalo en el campo "Ahorro inicial": la calculadora
              descuenta automáticamente ese capital (con su propio
              crecimiento) del total que necesitas seguir aportando cada
              mes.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Qué rentabilidad debería usar?
            </h3>
            <p className="leading-relaxed">
              Si vas a dejar el dinero en una cuenta o depósito, usa un 0-2%.
              Si lo vas a invertir en fondos indexados u otros productos con
              riesgo, revisa la calculadora de interés compuesto, que
              incluye referencias históricas de rentabilidad.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}