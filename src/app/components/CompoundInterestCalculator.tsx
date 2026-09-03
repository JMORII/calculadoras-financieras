'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualRate, setAnnualRate] = useState<number>(7);
  const [years, setYears] = useState<number>(10);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculation = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    let currentBalance = initialAmount;
    let totalInvested = initialAmount;

    const yearlyData = [
      {
        year: 0,
        balance: Math.round(initialAmount),
        invested: Math.round(initialAmount),
        interest: 0,
      }
    ];

    for (let month = 1; month <= totalMonths; month++) {
      currentBalance = currentBalance * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;

      if (month % 12 === 0) {
        const currentYear = month / 12;
        const totalInterest = currentBalance - totalInvested;

        yearlyData.push({
          year: currentYear,
          balance: Math.round(currentBalance),
          invested: Math.round(totalInvested),
          interest: Math.round(Math.max(0, totalInterest)),
        });
      }
    }

    const finalBalance = currentBalance;
    const totalInterest = finalBalance - totalInvested;

    return {
      finalBalance: Math.round(finalBalance),
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(Math.max(0, totalInterest)),
      yearlyData,
    };
  }, [initialAmount, monthlyContribution, annualRate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      {/* Controles de Entrada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inversión inicial (€)
          </label>
          <input
            type="number"
            min="0"
            value={initialAmount}
            onChange={(e) => setInitialAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aportación mensual (€)
          </label>
          <input
            type="number"
            min="0"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interés anual (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Años de inversión
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
          />
        </div>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <p className="text-sm font-medium text-blue-600">Monto Final Estimado</p>
          <p className="text-3xl font-bold text-blue-900 mt-1">
            {formatCurrency(calculation.finalBalance)}
          </p>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Invertido</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {formatCurrency(calculation.totalInvested)}
          </p>
        </div>

        <div className="bg-green-50 p-5 rounded-xl border border-green-100">
          <p className="text-sm font-medium text-green-600">Intereses Generados</p>
          <p className="text-2xl font-bold text-green-800 mt-1">
            {formatCurrency(calculation.totalInterest)}
          </p>
        </div>
      </div>

      {/* Gráfico Interactivo */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Crecimiento del Capital en el Tiempo
        </h3>
        <div className="h-72 w-full">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calculation.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" unit=" años" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), '']}
                  labelFormatter={(label) => `Año ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="invested"
                  name="Total Invertido"
                  stackId="1"
                  stroke="#9CA3AF"
                  fill="#E5E7EB"
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  name="Intereses Generados"
                  stackId="1"
                  stroke="#16A34A"
                  fill="#86EFAC"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Tabla Desglose Año a Año */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Desglose Año a Año
          </h3>
        </div>
        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase sticky top-0">
              <tr>
                <th className="py-3 px-4">Año</th>
                <th className="py-3 px-4">Invertido</th>
                <th className="py-3 px-4">Intereses</th>
                <th className="py-3 px-4">Balance Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {calculation.yearlyData.map((row) => (
                <tr key={row.year} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">Año {row.year}</td>
                  <td className="py-3 px-4">{formatCurrency(row.invested)}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">
                    {formatCurrency(row.interest)}
                  </td>
                  <td className="py-3 px-4 font-bold">
                    {formatCurrency(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}