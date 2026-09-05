"use client";

import { useState } from "react";

export default function SavingsGoalCalculator() {
  const [meta, setMeta] = useState("");
  const [ahorroInicial, setAhorroInicial] = useState("");
  const [plazo, setPlazo] = useState("");
  const [tasa, setTasa] = useState("");
  const [resultado, setResultado] = useState<{
    aportacionMensual: number;
    totalAportado: number;
    interesesGanados: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calcular() {
    const g = parseFloat(meta);
    const inicial = parseFloat(ahorroInicial) || 0;
    const meses = Math.round((parseFloat(plazo) || 0) * 12);
    const rAnual = parseFloat(tasa) / 100;
    const rMensual = rAnual / 12;

    if (meta === "" || plazo === "" || tasa === "") {
      setError("Por favor, rellena objetivo, plazo y rentabilidad.");
      setResultado(null);
      return;
    }

    if (isNaN(g) || isNaN(meses) || isNaN(rAnual)) {
      setError("Introduce solo números válidos.");
      setResultado(null);
      return;
    }

    if (g <= 0 || meses <= 0) {
      setError("El objetivo y el plazo deben ser mayores que cero.");
      setResultado(null);
      return;
    }

    if (rAnual < 0) {
      setError("La rentabilidad no puede ser negativa.");
      setResultado(null);
      return;
    }

    setError(null);

    const valorFuturoInicial = inicial * Math.pow(1 + rMensual, meses);
    const restante = g - valorFuturoInicial;

    let aportacionMensual: number;
    if (restante <= 0) {
      aportacionMensual = 0;
    } else if (rMensual === 0) {
      aportacionMensual = restante / meses;
    } else {
      aportacionMensual =
        (restante * rMensual) / (Math.pow(1 + rMensual, meses) - 1);
    }

    const totalAportado = aportacionMensual * meses + inicial;
    const interesesGanados = g - totalAportado;

    setResultado({
      aportacionMensual,
      totalAportado,
      interesesGanados: Math.max(interesesGanados, 0),
    });
  }

  return (
    <div className="w-full max-w-md border border-piedra/20 bg-hueso p-8">
      <Campo
        etiqueta="Objetivo (€)"
        valor={meta}
        onChange={setMeta}
        placeholder="10000"
      />
      <Campo
        etiqueta="Ahorro inicial (€) — opcional"
        valor={ahorroInicial}
        onChange={setAhorroInicial}
        placeholder="0"
      />
      <Campo
        etiqueta="Plazo (años)"
        valor={plazo}
        onChange={setPlazo}
        placeholder="3"
      />
      <Campo
        etiqueta="Rentabilidad anual esperada (%)"
        valor={tasa}
        onChange={setTasa}
        placeholder="2"
      />

      <button
        onClick={calcular}
        className="mt-2 w-full border border-tinta bg-tinta py-3 font-semibold text-hueso transition hover:border-cobre hover:bg-cobre"
      >
        Calcular
      </button>

      {error && (
        <p className="mt-4 border-l-2 border-red-700 pl-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {resultado && !error && (
        <>
          <div className="mt-6 border-t border-piedra/20 pt-4 text-center">
            <p className="text-sm text-piedra">Necesitas ahorrar al mes</p>
            <p className="font-serif text-4xl font-bold text-cobre">
              {resultado.aportacionMensual.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 border-t border-piedra/20 pt-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Total aportado
              </p>
              <p className="mt-1 font-semibold text-tinta">
                {resultado.totalAportado.toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Intereses ganados
              </p>
              <p className="mt-1 font-semibold text-cobre">
                +
                {resultado.interesesGanados.toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Campo({
  etiqueta,
  valor,
  onChange,
  placeholder,
}: {
  etiqueta: string;
  valor: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="mb-5 border-b border-piedra/20 pb-1">
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-piedra">
        {etiqueta}
      </label>
      <input
        type="number"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent py-1 text-lg text-tinta outline-none placeholder:text-piedra/40"
        placeholder={placeholder}
      />
    </div>
  );
}