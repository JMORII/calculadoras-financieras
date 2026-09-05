"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DatoAnual = {
  año: number;
  capitalInicial: number;
  aportacion: number;
  interesGanado: number;
  capitalFinal: number;
};

const REFERENCIAS_RENTABILIDAD = [
  { nombre: "Depósito bancario", tasa: 2, color: "#5C6670" },
  { nombre: "Inflación media", tasa: 2.5, color: "#5C6670" },
  { nombre: "MSCI World", tasa: 10, color: "#B8863F" },
  { nombre: "S&P 500", tasa: 10.6, color: "#B8863F" },
];

export default function CompoundInterestCalculator() {
  const [capital, setCapital] = useState("");
  const [mensual, setMensual] = useState("");
  const [tasa, setTasa] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [aportacionesExtra, setAportacionesExtra] = useState<number[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const c = parseFloat(capital);
  const m = parseFloat(mensual) || 0;
  const r = parseFloat(tasa) / 100;
  const t = parseFloat(tiempo);
  const aportacionAnualFija = m * 12;

  function calcular() {
    if (capital === "" || tasa === "" || tiempo === "") {
      setError("Por favor, rellena capital, tasa y tiempo.");
      setAportacionesExtra(null);
      return;
    }

    if (isNaN(c) || isNaN(r) || isNaN(t)) {
      setError("Introduce solo números válidos.");
      setAportacionesExtra(null);
      return;
    }

    if (c <= 0 || t <= 0) {
      setError("El capital y el tiempo deben ser mayores que cero.");
      setAportacionesExtra(null);
      return;
    }

    if (r < 0 || m < 0) {
      setError("La tasa y la aportación mensual no pueden ser negativas.");
      setAportacionesExtra(null);
      return;
    }

    if (t > 100) {
      setError("Introduce un número de años realista (máximo 100).");
      setAportacionesExtra(null);
      return;
    }

    setError(null);
    setAportacionesExtra(new Array(Math.floor(t)).fill(0));
  }

  function actualizarAportacionExtra(indice: number, valor: string) {
    if (!aportacionesExtra) return;
    const nuevoValor = parseFloat(valor);
    const copia = [...aportacionesExtra];
    copia[indice] = isNaN(nuevoValor) ? 0 : nuevoValor;
    setAportacionesExtra(copia);
  }

  let datos: DatoAnual[] | null = null;
  if (aportacionesExtra) {
    const filas: DatoAnual[] = [];
    let capitalActual = c;

    for (let i = 0; i < aportacionesExtra.length; i++) {
      const año = i + 1;
      const aportacion = aportacionAnualFija + aportacionesExtra[i];
      const capitalInicial = capitalActual + aportacion;
      const capitalFinal = capitalInicial * (1 + r);
      const interesGanado = capitalFinal - capitalInicial;

      filas.push({ año, capitalInicial, aportacion, interesGanado, capitalFinal });
      capitalActual = capitalFinal;
    }

    datos = filas;
  }

  const inversionInicial = c || 0;
  const totalAportacionFija = aportacionesExtra
    ? aportacionAnualFija * aportacionesExtra.length
    : 0;
  const totalExtra = aportacionesExtra
    ? aportacionesExtra.reduce((suma, v) => suma + v, 0)
    : 0;
  const totalInvertido = inversionInicial + totalAportacionFija + totalExtra;
  const montoFinal = datos ? datos[datos.length - 1].capitalFinal : 0;
  const beneficioTotal = montoFinal - totalInvertido;

  return (
    <div className="w-full max-w-md border border-piedra/20 bg-hueso p-8">
      <Campo
        etiqueta="Capital inicial (€)"
        valor={capital}
        onChange={setCapital}
        placeholder="1000"
      />
      <Campo
        etiqueta="Aportación mensual (€) — opcional"
        valor={mensual}
        onChange={setMensual}
        placeholder="50"
      />
      <Campo
        etiqueta="Tasa de interés anual (%)"
        valor={tasa}
        onChange={setTasa}
        placeholder="5"
      />
      
            <div className="mb-5 -mt-3">
        <p className="mb-2 text-xs text-piedra">
          Referencia histórica (haz clic para usar):
        </p>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={REFERENCIAS_RENTABILIDAD}>
            <XAxis
              dataKey="nombre"
              tick={{ fontSize: 10, fill: "#5C6670" }}
              axisLine={false}
              tickLine={false}
            />
                      <Tooltip
              formatter={(value) => [`${value}%`, "Rentabilidad media"]}
              contentStyle={{
                backgroundColor: "#0F1E2E",
                border: "none",
                borderRadius: 0,
                fontSize: 12,
              }}
              labelStyle={{ color: "#FAFAF7" }}
              itemStyle={{ color: "#FAFAF7" }}
            />
            <Bar
              dataKey="tasa"
              cursor="pointer"
                            onClick={(data) => setTasa(String(data.payload.tasa))}
            >
              {REFERENCIAS_RENTABILIDAD.map((entrada, indice) => (
                <Cell key={indice} fill={entrada.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-1 text-xs italic text-piedra/70">
          Datos históricos a largo plazo. Rentabilidades pasadas no
          garantizan resultados futuros.
        </p>
      </div>

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
              {montoFinal.toLocaleString("es-ES", { maximumFractionDigits: 2 })} €
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-piedra/20 pt-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Invertido
              </p>
              <p className="mt-1 font-semibold text-tinta">
                {totalInvertido.toLocaleString("es-ES", {
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
                {montoFinal.toLocaleString("es-ES", { maximumFractionDigits: 0 })}{" "}
                €
              </p>
            </div>
          </div>

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

          <div className="mt-6 max-h-72 overflow-y-auto border-t border-piedra/20 pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-piedra">
                  <th className="pb-2">Año</th>
                  <th className="pb-2 text-right">Extra puntual</th>
                  <th className="pb-2 text-right">Interés ganado</th>
                  <th className="pb-2 text-right">Capital final</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((fila, indice) => (
                  <tr
                    key={fila.año}
                    className="border-t border-piedra/10 text-tinta"
                  >
                    <td className="py-2">{fila.año}</td>
                    <td className="py-1 text-right">
                      <input
                        type="number"
                        value={
                          aportacionesExtra
                            ? aportacionesExtra[indice] || ""
                            : ""
                        }
                        onChange={(e) =>
                          actualizarAportacionExtra(indice, e.target.value)
                        }
                        placeholder="0"
                        className="w-20 border-b border-piedra/30 bg-transparent text-right outline-none focus:border-cobre"
                      />
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