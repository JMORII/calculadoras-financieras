"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
type DatoAnual = {
  año: number;
  capitalInicial: number;
  interesGanado: number;
  capitalFinal: number;
};

export default function CompoundInterestCalculator() {
  const [capital, setCapital] = useState("");
  const [tasa, setTasa] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [datos, setDatos] = useState<DatoAnual[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calcular() {
    const c = parseFloat(capital);
    const r = parseFloat(tasa) / 100;
    const t = parseFloat(tiempo);

    if (capital === "" || tasa === "" || tiempo === "") {
      setError("Por favor, rellena todos los campos.");
      setDatos(null);
      return;
    }

    if (isNaN(c) || isNaN(r) || isNaN(t)) {
      setError("Introduce solo números válidos.");
      setDatos(null);
      return;
    }

    if (c <= 0 || t <= 0) {
      setError("El capital y el tiempo deben ser mayores que cero.");
      setDatos(null);
      return;
    }

    if (r < 0) {
      setError("La tasa de interés no puede ser negativa.");
      setDatos(null);
      return;
    }

    if (t > 100) {
      setError("Introduce un número de años realista (máximo 100).");
      setDatos(null);
      return;
    }

    setError(null);

    const filas: DatoAnual[] = [];
    let capitalActual = c;

    for (let año = 1; año <= Math.floor(t); año++) {
      const capitalInicial = capitalActual;
      const capitalFinal = capitalInicial * (1 + r);
      const interesGanado = capitalFinal - capitalInicial;

      filas.push({ año, capitalInicial, interesGanado, capitalFinal });
      capitalActual = capitalFinal;
    }

    setDatos(filas);
  }

  // Valores para el resumen final (solo se calculan si hay datos)
  const inversionInicial = datos ? datos[0].capitalInicial : 0;
  const montoFinal = datos ? datos[datos.length - 1].capitalFinal : 0;
  const beneficioTotal = montoFinal - inversionInicial;

  return (
    <div className="w-full max-w-md border border-piedra/20 bg-hueso p-8">
      <Campo
        etiqueta="Capital inicial (€)"
        valor={capital}
        onChange={setCapital}
        placeholder="1000"
      />
      <Campo
        etiqueta="Tasa de interés anual (%)"
        valor={tasa}
        onChange={setTasa}
        placeholder="5"
      />
      <Campo
        etiqueta="Tiempo (años)"
        valor={tiempo}
        onChange={setTiempo}
        placeholder="10"
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

      {datos && !error && (
        <>
          <div className="mt-6 border-t border-piedra/20 pt-4 text-center">
            <p className="text-sm text-piedra">Monto final estimado</p>
            <p className="font-serif text-4xl font-bold text-cobre">
              {montoFinal.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>

          {/* Resumen: inversión, beneficio y total */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-piedra/20 pt-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Invertido
              </p>
              <p className="mt-1 font-semibold text-tinta">
                {inversionInicial.toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Beneficio
              </p>
              <p className="mt-1 font-semibold text-cobre">
                +
                {beneficioTotal.toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Total
              </p>
              <p className="mt-1 font-semibold text-tinta">
                {montoFinal.toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
          </div>
          {/* Gráfico de evolución */}
          <div className="mt-6 border-t border-piedra/20 pt-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-piedra">
              Evolución del capital
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={datos}>
                <defs>
                  <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B8863F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B8863F" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#5C6670" strokeOpacity={0.15} />
                <XAxis
                  dataKey="año"
                  tick={{ fontSize: 12, fill: "#5C6670" }}
                  axisLine={{ stroke: "#5C6670", strokeOpacity: 0.2 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#5C6670" }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                  tickFormatter={(value) =>
                    value.toLocaleString("es-ES", { maximumFractionDigits: 0 })
                  }
                />
                                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString("es-ES", { maximumFractionDigits: 2 })} €`,
                    "Capital",
                  ]}
                  labelFormatter={(label) => `Año ${label}`}
                  contentStyle={{
                    backgroundColor: "#0F1E2E",
                    border: "none",
                    borderRadius: 0,
                    color: "#FAFAF7",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="capitalFinal"
                  stroke="#B8863F"
                  strokeWidth={2}
                  fill="url(#colorCapital)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Tabla año a año */}
          <div className="mt-6 max-h-64 overflow-y-auto border-t border-piedra/20 pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-piedra">
                  <th className="pb-2">Año</th>
                  <th className="pb-2 text-right">Capital inicial</th>
                  <th className="pb-2 text-right">Interés ganado</th>
                  <th className="pb-2 text-right">Capital final</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((fila) => (
                  <tr
                    key={fila.año}
                    className="border-t border-piedra/10 text-tinta"
                  >
                    <td className="py-2">{fila.año}</td>
                    <td className="py-2 text-right">
                      {fila.capitalInicial.toLocaleString("es-ES", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </td>
                    <td className="py-2 text-right text-cobre">
                      +
                      {fila.interesGanado.toLocaleString("es-ES", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </td>
                    <td className="py-2 text-right font-medium">
                      {fila.capitalFinal.toLocaleString("es-ES", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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