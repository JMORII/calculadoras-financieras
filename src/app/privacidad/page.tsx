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
          los cálculos se realizan directamente en tu navegador, y ningún
          dato introducido en los formularios se envía a nuestros
          servidores.
        </p>
        <p>
          Esta web utiliza <strong>Google AdSense</strong> para mostrar
          publicidad. Este servicio puede recopilar y procesar datos de
          forma anónima (como tu dirección IP o el tipo de dispositivo)
          para mostrar anuncios relevantes y medir su rendimiento.
        </p>
        <p>
          Puedes gestionar tus preferencias de privacidad respecto a estos
          anuncios a través del aviso de cookies que aparece al visitar la
          web, o consultando directamente la política de privacidad de
          Google en policies.google.com.
        </p>
        <p>
          Si tienes cualquier duda sobre el tratamiento de tus datos,
          puedes contactar con nosotros a través del correo indicado en
          nuestro Aviso Legal.
        </p>
      </div>
    </main>
  );
}