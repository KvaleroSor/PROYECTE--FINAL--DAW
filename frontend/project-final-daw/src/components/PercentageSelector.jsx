import React from 'react';
import { TrendingDown, Coffee, TrendingUp, PiggyBank, Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

/**
 * @typedef {Object} BudgetPreset
 * @property {string} id - Identificador único del preset
 * @property {string} name - Nombre del preset
 * @property {string} description - Descripción del preset
 * @property {React.ReactNode} icon - Icono del preset
 * @property {Object} distribution - Distribución de porcentajes
 * @property {number} distribution.fixedExpenses - Porcentaje gastos fijos
 * @property {number} distribution.leisureExpenses - Porcentaje gastos ocio
 * @property {number} distribution.investment - Porcentaje inversión
 * @property {number} distribution.savings - Porcentaje ahorro
 */

/**
 * Presets predefinidos de distribución de presupuesto
 * @type {BudgetPreset[]}
 */
export const BUDGET_PRESETS = [
  {
    id: 'conservative',
    name: 'Conservador',
    description: 'Prioriza gastos fijos y ahorro',
    icon: <PiggyBank className="size-4" />,
    distribution: {
      fixedExpenses: 60,
      leisureExpenses: 10,
      investment: 10,
      savings: 20,
    },
  },
  {
    id: 'balanced',
    name: 'Equilibrado',
    description: 'Balance entre todas las categorías',
    icon: <Sparkles className="size-4" />,
    distribution: {
      fixedExpenses: 50,
      leisureExpenses: 20,
      investment: 15,
      savings: 15,
    },
  },
  {
    id: 'investor',
    name: 'Inversor',
    description: 'Enfocado en hacer crecer el dinero',
    icon: <TrendingUp className="size-4" />,
    distribution: {
      fixedExpenses: 45,
      leisureExpenses: 15,
      investment: 25,
      savings: 15,
    },
  },
  {
    id: 'saver',
    name: 'Ahorrador',
    description: 'Maximiza el ahorro mensual',
    icon: <PiggyBank className="size-4" />,
    distribution: {
      fixedExpenses: 45,
      leisureExpenses: 10,
      investment: 10,
      savings: 35,
    },
  },
];

/**
 * @param {Object} props - Props del componente
 * @param {string} [props.value] - Valor seleccionado actualmente
 * @param {function} [props.onChange] - Función callback cuando cambia la selección
 */
export function PercentageSelector({ value, onChange }) {
  const selectedPreset = BUDGET_PRESETS.find((p) => p.id === value);

  return (
    <div className="space-y-3 mb-6">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-gray-50 border-gray-200 h-12">
          <SelectValue placeholder="Selecciona un perfil de presupuesto" />
        </SelectTrigger>
        <SelectContent position="popper" sideOffset={4}>
          {BUDGET_PRESETS.map((preset) => (
            <SelectItem key={preset.id} value={preset.id} data={preset.distribution}>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="flex items-center justify-center size-8 rounded-lg">
                  {React.cloneElement(preset.icon, {
                    className: 'size-5 text-gray-700',
                  })}
                </div>
                <div className="flex flex-col">
                  <span className="flex text-sm text-gray-900 justify-start">{preset.name}</span>
                  <span className="text-xs text-gray-500">{preset.description}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Preview de la distribución seleccionada */}
      {selectedPreset && (
        <div className="bg-slate-50 to-purple-50 rounded-xl p-4 border border-slate-600">
          <p className="text-xs text-slate-900 mb-3">Vista previa de tu presupuesto:</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="size-3.5 text-rose-600" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-600">Gasto Fijo</span>
                <span className="text-sm text-gray-900">{selectedPreset.distribution.fixedExpenses}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="size-3.5 text-pink-600" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-600">Ocio</span>
                <span className="text-sm text-gray-900">{selectedPreset.distribution.leisureExpenses}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-3.5 text-indigo-600" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-600">Inversión</span>
                <span className="text-sm text-gray-900">{selectedPreset.distribution.investment}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PiggyBank className="size-3.5 text-emerald-600" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-600">Ahorro</span>
                <span className="text-sm text-gray-900">{selectedPreset.distribution.savings}%</span>
              </div>
            </div>
          </div>
          
          {/* Barra de progreso visual */}
          <div className="mt-3 h-2 bg-white rounded-full overflow-hidden flex">
            <div 
              className="bg-rose-500" 
              style={{ width: `${selectedPreset.distribution.fixedExpenses}%` }}
            />
            <div 
              className="bg-pink-500" 
              style={{ width: `${selectedPreset.distribution.leisureExpenses}%` }}
            />
            <div 
              className="bg-indigo-500" 
              style={{ width: `${selectedPreset.distribution.investment}%` }}
            />
            <div 
              className="bg-emerald-500" 
              style={{ width: `${selectedPreset.distribution.savings}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PercentageSelector;
