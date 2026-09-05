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
          Esta web utiliza <strong>Google AdSense</strong> para mostrar
          publicidad. Google y sus socios publicitarios pueden instalar
          cookies propias y de terceros para personalizar los anuncios,
          medir su rendimiento, y prevenir el fraude publicitario.
        </p>
        <p>
          Al visitar esta web por primera vez desde el Espacio Económico
          Europeo, el Reino Unido o Suiza, se te mostrará un aviso de
          consentimiento donde puedes aceptar, rechazar o gestionar tus
          opciones respecto al uso de estas cookies, en cumplimiento del
          RGPD (Reglamento General de Protección de Datos).
        </p>
        <p>
          Puedes cambiar tu decisión en cualquier momento volviendo a abrir
          ese aviso, o configurando tu navegador para bloquear cookies de
          terceros.
        </p>
        <p>
          Para más información sobre cómo Google utiliza los datos,
          consulta la política de socios de Google en policies.google.com.
        </p>
      </div>
    </main>
  );
}