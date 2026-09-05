export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-2xl bg-pergamino px-6 py-16">
      <p className="mb-3 text-sm font-medium text-piedra">Legal</p>
      <h1 className="mb-8 font-serif text-4xl font-bold text-tinta">
        Política de Privacidad
      </h1>
      <div className="space-y-5 text-piedra">
        <p>
          En CalculaFinanzas respetamos tu privacidad. Esta web no solicita
          ni almacena datos personales a través de las calculadoras: todos
          los cálculos se realizan directamente en tu navegador.
        </p>
        <p>
          Es posible que en el futuro utilicemos cookies y servicios de
          terceros, como Google AdSense, para mostrar publicidad. Estos
          servicios pueden recopilar datos de forma anónima para
          personalizar los anuncios que ves.
        </p>
        <p>
          Puedes gestionar o desactivar las cookies en cualquier momento
          desde la configuración de tu navegador.
        </p>
      </div>
    </main>
  );
}