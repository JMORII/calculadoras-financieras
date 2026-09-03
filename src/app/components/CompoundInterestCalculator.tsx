"use client";

import { useState } from "react";

export default function CompoundInterestCalculator() {
  const [capital, setCapital] = useState("");
  const [tasa, setTasa] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calcular() {
    const c = parseFloat(capital);
    const r = parseFloat(tasa) / 100;
    const t = parseFloat(tiempo);

    // Validación: campos vacíos o no numéricos
    if (capital === "" || tasa === "" || tiempo === "") {
      setError("Por favor, rellena todos los campos.");
      setResultado(null);
      return;
    }

    if (isNaN(c) || isNaN(r) || isNaN(t)) {
      setError("Introduce solo números válidos.");
      setResultado(null);
      return;
    }

    // Validación: valores negativos no tienen sentido aquí
    if (c <= 0 || t <= 0) {
      setError("El capital y el tiempo deben ser mayores que cero.");
      setResultado(null);
      return;
    }

    if (r < 0) {
      setError("La tasa de interés no puede ser negativa.");
      setResultado(null);
      return;
    }

    // Todo correcto: calculamos
    setError(null);
    const montoFinal = c * Math.pow(1 + r, t);
    setResultado(montoFinal);
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Capital inicial (€)
        </label>
        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
          placeholder="1000"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Tasa de interés anual (%)
        </label>
        <input
          type="number"
          value={tasa}
          onChange={(e) => setTasa(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
          placeholder="5"
        />
      </div>

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Tiempo (años)
        </label>
        <input
          type="number"
          value={tiempo}
          onChange={(e) => setTiempo(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
          placeholder="10"
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Calcular
      </button>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {resultado !== null && !error && (
        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-sm text-gray-600">Monto final estimado</p>
          <p className="text-2xl font-bold text-blue-700">
            {resultado.toLocaleString("es-ES", {
              maximumFractionDigits: 2,
            })}{" "}
            €
          </p>
        </div>
      )}
    </div>
  );
}