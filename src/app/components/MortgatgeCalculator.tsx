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
  capitalPendienteInicial: number;
  interesPagado: number;
  capitalAmortizado: number;
  capitalPendienteFinal: number;
};

const REFERENCIAS_TIPOS = [
  { nombre: "Hipoteca fija", tasa: 2.3, color: "#B8863F" },
  { nombre: "Hipoteca variable", tasa: 2.9, color: "#5C6670" },
  { nombre: "Media general (INE)", tasa: 3.0, color: "#5C6670" },
];

export default function MortgageCalculator() {
  const [importe, setImporte] = useState("");
  const [tasa, setTasa] = useState("");
  const [plazo, setPlazo] = useState("");
  const [datos, setDatos] = useState<DatoAnual[] | null>(null);
  const [cuotaMensual, setCuotaMensual] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calcular() {
    const p = parseFloat(importe);
    const rAnual = parseFloat(tasa) / 100;
    const años = parseFloat(plazo);

    if (importe === "" || tasa === "" || plazo === "") {
      setError("Por favor, rellena todos los campos.");
      setDatos(null);
      return;
    }

    if (isNaN(p) || isNaN(rAnual) || isNaN(años)) {
      setError("Introduce solo números válidos.");
      setDatos(null);
      return;
    }

    if (p <= 0 || años <= 0) {
      setError("El importe y el plazo deben ser mayores que cero.");
      setDatos(null);
      return;
    }

    if (rAnual < 0) {
      setError("El tipo de interés no puede ser negativo.");
      setDatos(null);
      return;
    }

    if (años > 50) {
      setError("Introduce un plazo realista (máximo 50 años).");
      setDatos(null);
      return;
    }

    setError(null);

    const rMensual = rAnual / 12;
    const numCuotas = Math.round(años * 12);

    let cuota: number;
    if (rMensual === 0) {
      cuota = p / numCuotas;
    } else {
      cuota =
        (p * rMensual * Math.pow(1 + rMensual, numCuotas)) /
        (Math.pow(1 + rMensual, numCuotas) - 1);
    }

    setCuotaMensual(cuota);

    const filas: DatoAnual[] = [];
    let pendiente = p;

    for (let año = 1; año <= Math.floor(años); año++) {
      const pendienteInicial = pendiente;
      let interesAnual = 0;
      let amortizadoAnual = 0;

      for (let mes = 1; mes <= 12; mes++) {
        if (pendiente <= 0) break;
        const interesMes = pendiente * rMensual;
        const amortizadoMes = cuota - interesMes;
        pendiente -= amortizadoMes;
        interesAnual += interesMes;
        amortizadoAnual += amortizadoMes;
      }

      filas.push({
        año,
        capitalPendienteInicial: pendienteInicial,
        interesPagado: interesAnual,
        capitalAmortizado: amortizadoAnual,
        capitalPendienteFinal: Math.max(pendiente, 0),
      });
    }

    setDatos(filas);
  }

  const importeTotal = datos
    ? cuotaMensual !== null
      ? cuotaMensual * Math.round((parseFloat(plazo) || 0) * 12)
      : 0
    : 0;
  const totalIntereses = datos
    ? datos.reduce((suma, fila) => suma + fila.interesPagado, 0)
    : 0;

  return (
    <div className="w-full max-w-md border border-piedra/20 bg-hueso p-8">
      <Campo
        etiqueta="Importe del préstamo (€)"
        valor={importe}
        onChange={setImporte}
        placeholder="150000"
      />
      <Campo
        etiqueta="Tipo de interés anual (%)"
        valor={tasa}
        onChange={setTasa}
        placeholder="3.5"
      />

            <div className="mb-5 -mt-3">
        <p className="mb-2 text-xs text-piedra">
          Tipos medios en España (haz clic para usar):
        </p>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={REFERENCIAS_TIPOS}>
            <XAxis
              dataKey="nombre"
              tick={{ fontSize: 10, fill: "#5C6670" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Tipo medio"]}
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
              {REFERENCIAS_TIPOS.map((entrada, indice) => (
                <Cell key={indice} fill={entrada.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-1 text-xs italic text-piedra/70">
          Datos orientativos de 2026. Los tipos varían según el banco, el
          perfil del cliente y las condiciones del préstamo.
        </p>
      </div>
  
      <Campo
        etiqueta="Plazo (años)"
        valor={plazo}
        onChange={setPlazo}
        placeholder="25"
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

      {datos && cuotaMensual !== null && !error && (
        <>
          <div className="mt-6 border-t border-piedra/20 pt-4 text-center">
            <p className="text-sm text-piedra">Cuota mensual estimada</p>
            <p className="font-serif text-4xl font-bold text-cobre">
              {cuotaMensual.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-piedra/20 pt-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Prestado
              </p>
              <p className="mt-1 font-semibold text-tinta">
                {parseFloat(importe).toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Intereses
              </p>
              <p className="mt-1 font-semibold text-cobre">
                +
                {totalIntereses.toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-piedra">
                Total pagado
              </p>
              <p className="mt-1 font-semibold text-tinta">
                {importeTotal.toLocaleString("es-ES", {
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-piedra/20 pt-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-piedra">
              Capital pendiente por año
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={datos}>
                <defs>
                  <linearGradient id="colorPendiente" x1="0" y1="0" x2="0" y2="1">
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
                    "Pendiente",
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
                  dataKey="capitalPendienteFinal"
                  stroke="#B8863F"
                  strokeWidth={2}
                  fill="url(#colorPendiente)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 max-h-72 overflow-y-auto border-t border-piedra/20 pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-piedra">
                  <th className="pb-2">Año</th>
                  <th className="pb-2 text-right">Interés pagado</th>
                  <th className="pb-2 text-right">Capital amortizado</th>
                  <th className="pb-2 text-right">Pendiente</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((fila) => (
                  <tr
                    key={fila.año}
                    className="border-t border-piedra/10 text-tinta"
                  >
                    <td className="py-2">{fila.año}</td>
                    <td className="py-2 text-right text-cobre">
                      {fila.interesPagado.toLocaleString("es-ES", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </td>
                    <td className="py-2 text-right">
                      {fila.capitalAmortizado.toLocaleString("es-ES", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </td>
                    <td className="py-2 text-right font-medium">
                      {fila.capitalPendienteFinal.toLocaleString("es-ES", {
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