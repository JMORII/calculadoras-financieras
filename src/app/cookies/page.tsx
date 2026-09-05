export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-2xl bg-pergamino px-6 py-16">
      <p className="mb-3 text-sm font-medium text-piedra">Legal</p>
      <h1 className="mb-8 font-serif text-4xl font-bold text-tinta">
        Política de Cookies
      </h1>
      <div className="space-y-5 text-piedra">
        <p>
          Una cookie es un pequeño archivo que se guarda en tu navegador
          cuando visitas una web. Se utiliza para recordar información sobre
          tu visita.
        </p>
        <p>
          Actualmente, esta web no utiliza cookies propias. En el futuro,
          si integramos publicidad a través de Google AdSense, es posible
          que se utilicen cookies de terceros para mostrar anuncios
          relevantes y medir su rendimiento.
        </p>
        <p>
          Puedes configurar tu navegador para aceptar o rechazar cookies, o
          para que te avise cuando un sitio intente instalar una.
        </p>
      </div>
    </main>
  );
}