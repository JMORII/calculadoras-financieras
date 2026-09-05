import MortgageCalculator from "@/app/components/MortgageCalculator";

export const metadata = {
  title: "Calculadora de Hipoteca | CalculaFinanzas",
  description:
    "Calcula la cuota mensual de tu hipoteca, el total de intereses y compara tipos fijos y variables en España.",
};

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

      <article className="mt-16 w-full max-w-2xl text-piedra">
        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          ¿Cómo se calcula la cuota de una hipoteca?
        </h2>
        <p className="mb-4 leading-relaxed">
          La mayoría de hipotecas en España usan el sistema de{" "}
          <strong>cuota fija</strong> (también llamado sistema francés):
          pagas la misma cantidad cada mes durante toda la vida del
          préstamo, aunque la proporción entre intereses y capital
          amortizado cambia con el tiempo.
        </p>
        <p className="mb-8 leading-relaxed">
          Al principio, la mayor parte de tu cuota paga intereses; hacia el
          final del préstamo, la mayor parte amortiza capital real. Esta
          calculadora te muestra ese desglose año a año, tanto en la tabla
          como en el gráfico.
        </p>

        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          Hipoteca fija vs. variable
        </h2>
        <p className="mb-8 leading-relaxed">
          En una <strong>hipoteca fija</strong>, el tipo de interés no
          cambia durante toda la duración del préstamo: sabes exactamente
          cuánto pagarás cada mes desde el primer día. En una{" "}
          <strong>hipoteca variable</strong>, el tipo se revisa
          periódicamente (normalmente cada 6 o 12 meses) en función del
          Euríbor más un diferencial fijado por el banco, por lo que tu
          cuota puede subir o bajar con el tiempo.
        </p>

        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          Preguntas frecuentes
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Qué plazo de hipoteca es más recomendable?
            </h3>
            <p className="leading-relaxed">
              A mayor plazo, menor cuota mensual, pero mayor coste total en
              intereses pagados a lo largo de la vida del préstamo. A menor
              plazo, ocurre lo contrario: cuota más alta, pero menos
              intereses totales. Esta calculadora te permite comparar
              distintos plazos fácilmente.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Cuánto debería suponer la hipoteca de mis ingresos?
            </h3>
            <p className="leading-relaxed">
              La recomendación general es que la cuota mensual no supere el
              30-35% de tus ingresos netos mensuales, para mantener un
              margen financiero saludable.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}