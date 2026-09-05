"use client";

import { useState } from "react";

const TASA_SEGURIDAD_SOCIAL = 0.0647; // Contingencias comunes + desempleo + FP + MEI (2026)

// Tramos progresivos aproximados (escala combinada estatal + autonómica media)
const TRAMOS_IRPF = [
  { hasta: 12450, tipo: 0.19 },
  { hasta: 20200, tipo: 0.24 },
  { hasta: 35200, tipo: 0.3 },
  { hasta: 60000, tipo: 0.37 },
  { hasta: 300000, tipo: 0.45 },
  { hasta: Infinity, tipo: 0.47 },
];

function calcularIRPF(baseAnual: number): number {
  let impuesto = 0;
  let anterior = 0;

  for (const tramo of TRAMOS_IRPF) {
    if (baseAnual > anterior) {
      const tramoGravado = Math.min(baseAnual, tramo.hasta) - anterior;
      impuesto += tramoGravado * tramo.tipo;
      anterior = tramo.hasta;
    } else {
      break;
    }
  }

  return impuesto;
}

export default function SalaryCalculator() {
  const [brutoAnual, setBrutoAnual] = useState("");
  const [pagas, setPagas] = useState<12 | 14>(12);
  const [resultado, setResultado] = useState<{
    ss: number;
    irpf: number;
    netoAnual: number;
    netoMensual: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calcular() {
    const bruto = parseFloat(brutoAnual);

    if (brutoAnual === "") {
      setError("Por favor, introduce tu salario bruto anual.");
      setResultado(null);
      return;
    }

    if (isNaN(bruto)) {
      setError("Introduce solo un número válido.");
      setResultado(null);
      return;
    }

    if (bruto <= 0) {
      setError("El salario debe ser mayor que cero.");
      setResultado(null);
      return;
    }

    setError(null);

    const ss = bruto * TASA_SEGURIDAD_SOCIAL;
    const baseImponible = bruto - ss;
    const irpf = calcularIRPF(baseImponible);
    const netoAnual = bruto - ss - irpf;
    const netoMensual = netoAnual / pagas;

    setResultado({ ss, irpf, netoAnual, netoMensual });
  }

  return (
    <div className="w-full max-w-md border border-piedra/20 bg-hueso p-8">
      <Campo
        etiqueta="Salario bruto anual (€)"
        valor={brutoAnual}
        onChange={setBrutoAnual}
        placeholder="24000"
      />

      <div className="mb-5 border-b border-piedra/20 pb-3">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-piedra">
          Número de pagas
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setPagas(12)}
            className={`flex-1 border py-2 text-sm font-medium transition ${
              pagas === 12
                ? "border-tinta bg-tinta text-hueso"
                : "border-piedra/30 text-piedra hover:border-tinta"
            }`}
          >
            12 pagas
          </button>
          <button
            onClick={() => setPagas(14)}
            className={`flex-1 border py-2 text-sm font-medium transition ${
              pagas === 14
                ? "border-tinta bg-tinta text-hueso"
                : "border-piedra/30 text-piedra hover:border-tinta"
            }`}
          >
            14 pagas
          </button>
        </div>
      </div>

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
            <p className="text-sm text-piedra">Neto mensual estimado</p>
            <p className="font-serif text-4xl font-bold text-cobre">
              {resultado.netoMensual.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>

          <div className="mt-6 space-y-2 border-t border-piedra/20 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-piedra">Seguridad Social (6,47%)</span>
              <span className="font-medium text-tinta">
                -
                {resultado.ss.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })}{" "}
                €/año
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-piedra">Retención IRPF</span>
              <span className="font-medium text-tinta">
                -
                {resultado.irpf.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })}{" "}
                €/año
              </span>
            </div>
            <div className="flex justify-between border-t border-piedra/10 pt-2">
              <span className="text-piedra">Neto anual</span>
              <span className="font-semibold text-tinta">
                {resultado.netoAnual.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </span>
            </div>
          </div>

          <p className="mt-6 border-t border-piedra/20 pt-4 text-xs leading-relaxed text-piedra">
            ⚠️ Esta es una <strong>estimación orientativa</strong>. El
            resultado real puede variar según tu comunidad autónoma,
            situación personal y familiar, tipo de contrato u otras
            circunstancias específicas. No sustituye a un cálculo oficial de
            nómina.
          </p>
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