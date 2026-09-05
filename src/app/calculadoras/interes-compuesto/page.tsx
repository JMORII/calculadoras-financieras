import CompoundInterestCalculator from "@/app/components/CompoundInterestCalculator";

export const metadata = {
  title: "Calculadora de Interés Compuesto | CalculaFinanzas",
  description:
    "Calcula cuánto crecerá tu dinero con el interés compuesto. Incluye aportaciones mensuales, gráfico de evolución y tabla año a año.",
};

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

      <article className="mt-16 w-full max-w-2xl text-piedra">
        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          ¿Qué es el interés compuesto?
        </h2>
        <p className="mb-4 leading-relaxed">
          El interés compuesto es el proceso por el cual los intereses que
          genera tu dinero se suman al capital inicial, de modo que en el
          siguiente periodo también generan intereses. Es decir, ganas
          intereses sobre tus intereses, no solo sobre el dinero que
          invertiste al principio.
        </p>
        <p className="mb-8 leading-relaxed">
          Es la razón por la que Albert Einstein lo describió (según se
          cuenta) como la fuerza más poderosa del universo: cuanto más
          tiempo dejes crecer tu inversión, mayor es el efecto acumulativo,
          incluso con aportaciones modestas.
        </p>

        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          ¿Cómo se calcula?
        </h2>
        <p className="mb-4 leading-relaxed">
          La fórmula básica del interés compuesto es:
        </p>
        <p className="mb-8 border-l-2 border-cobre pl-4 font-serif text-lg text-tinta">
          Capital final = Capital inicial × (1 + tasa)ᵗ
        </p>
        <p className="mb-8 leading-relaxed">
          Donde la tasa es el tipo de interés anual expresado en decimal
          (por ejemplo, 5% sería 0,05), y t es el número de años. Si además
          añades aportaciones periódicas (como en esta calculadora), el
          cálculo se realiza año a año, sumando cada aportación antes de
          aplicar el interés correspondiente.
        </p>

        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          Preguntas frecuentes
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Qué rentabilidad puedo esperar realmente?
            </h3>
            <p className="leading-relaxed">
              Depende totalmente de dónde inviertas. Un depósito bancario
              suele rondar el 2%, mientras que índices bursátiles
              diversificados como el S&P 500 han promediado históricamente
              en torno al 10% anual a muy largo plazo (sin garantía de que
              se repita en el futuro).
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Es mejor invertir todo de golpe o poco a poco?
            </h3>
            <p className="leading-relaxed">
              Ambas estrategias son válidas. Invertir de golpe maximiza el
              tiempo en el mercado; invertir poco a poco (aportaciones
              periódicas) reduce el riesgo de invertir justo antes de una
              caída puntual. Esta calculadora te permite simular ambos
              escenarios combinando capital inicial y aportaciones
              mensuales.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}