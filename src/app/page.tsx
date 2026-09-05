import Link from "next/link";

const calculadoras = [
  {
    nombre: "Interés Compuesto",
    descripcion: "Calcula cuánto crecerá tu dinero con el tiempo.",
    href: "/calculadoras/interes-compuesto",
  },
  {
    nombre: "Hipoteca",
    descripcion: "Calcula la cuota mensual y el coste total de tu hipoteca.",
    href: "/calculadoras/hipoteca",
  },
  {
    nombre: "Sueldo Bruto a Neto",
    descripcion: "Estima tu sueldo neto mensual descontando SS e IRPF.",
    href: "/calculadoras/sueldo-neto",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-pergamino px-6 py-20">
      <div className="mb-16 w-full max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium text-piedra">
          Herramientas de cálculo financiero
        </p>
        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-tinta">
          Entiende tu dinero antes de moverlo
        </h1>
        <p className="text-lg text-piedra">
          Calculadoras claras y gratuitas para tomar mejores decisiones
          financieras, sin hojas de cálculo complicadas.
        </p>
      </div>

      <div className="w-full max-w-2xl divide-y divide-piedra/20 border-t border-piedra/20">
        {calculadoras.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group flex items-center justify-between py-6"
          >
            <div>
              <h2 className="font-serif text-2xl font-semibold text-tinta group-hover:text-cobre">
                {calc.nombre}
              </h2>
              <p className="mt-1 text-piedra">{calc.descripcion}</p>
            </div>
            <span className="font-serif text-2xl text-cobre">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}