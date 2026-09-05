import SalaryCalculator from "@/app/components/SalaryCalculator";

export const metadata = {
  title: "Calculadora de Sueldo Bruto a Neto | CalculaFinanzas",
  description:
    "Calcula tu sueldo neto mensual descontando Seguridad Social e IRPF, con 12 o 14 pagas.",
};

export default function SueldoNetoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-pergamino px-6 py-16">
      <div className="mb-10 w-full max-w-md text-center">
        <p className="mb-3 text-sm font-medium text-piedra">
          Calculadora financiera
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-tinta">
          Sueldo Bruto a Neto
        </h1>
        <p className="text-piedra">
          Estima cuánto cobrarás realmente al mes, descontando Seguridad
          Social e IRPF.
        </p>
      </div>

      <SalaryCalculator />

      <article className="mt-16 w-full max-w-2xl text-piedra">
        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          ¿Por qué mi sueldo neto es menor que el bruto?
        </h2>
        <p className="mb-4 leading-relaxed">
          El salario bruto es la cantidad total que figura en tu contrato,
          antes de cualquier descuento. De ahí se restan dos conceptos
          principales: la <strong>cotización a la Seguridad Social</strong>{" "}
          (que financia tu futura pensión, sanidad y prestaciones), y la{" "}
          <strong>retención de IRPF</strong> (un adelanto del impuesto sobre
          la renta que pagarás ese año).
        </p>
        <p className="mb-8 leading-relaxed">
          Lo que queda después de estos descuentos es tu salario neto: el
          dinero que realmente ingresas en tu cuenta cada mes.
        </p>

        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          ¿Por qué el IRPF no es un porcentaje fijo?
        </h2>
        <p className="mb-8 leading-relaxed">
          El IRPF en España es <strong>progresivo</strong>: no se aplica un
          único porcentaje sobre todo tu sueldo, sino que tu salario se
          divide en tramos, y cada tramo tributa a un tipo distinto (más
          alto cuanto mayor es el tramo). Por eso, dos personas con sueldos
          parecidos pero no idénticos pueden tener una retención
          bastante distinta.
        </p>

        <h2 className="mb-4 font-serif text-2xl font-bold text-tinta">
          Preguntas frecuentes
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Qué diferencia hay entre 12 y 14 pagas?
            </h3>
            <p className="leading-relaxed">
              Con 12 pagas, tu salario anual se reparte en 12 meses iguales.
              Con 14 pagas, se reparte en 12 meses normales más dos "pagas
              extra" (normalmente en verano y en Navidad). El salario anual
              total es el mismo, pero el importe mensual varía.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-tinta">
              ¿Este resultado es exacto?
            </h3>
            <p className="leading-relaxed">
              Es una estimación orientativa. La retención real de IRPF
              depende también de tu comunidad autónoma, situación familiar,
              tipo de contrato y otras circunstancias personales que un
              cálculo genérico no puede tener en cuenta.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}