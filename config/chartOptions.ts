import { CHART_DOUGHNUT } from '@/consts';
import { AvailableChartTypes, ThemeColors } from '@/types';
import { prefixCurrency } from '@/utils';
import { ChartOptions, ChartType } from 'chart.js';

export const getChartOptions = (
  type: AvailableChartTypes,
  currencySymbol: string,
  colors: ThemeColors
): ChartOptions<ChartType> => {
  const baseOptions: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.foregroundAccent,
          font: {
            size: 14
          }
        }
      },
      title: {
        display: false,
        text: ''
      },
      tooltip: {
        enabled: true,
        mode: type === CHART_DOUGHNUT ? 'index' : 'nearest',
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = '';

            const dataset = context.dataset as { label?: string };
            label = dataset.label || '';
            if (label) {
              label += ': ';
            }

            if (type === CHART_DOUGHNUT) {
              const value = context.raw as number;
              if (currencySymbol) {
                label += prefixCurrency(value, currencySymbol);
              } else {
                label += value.toLocaleString();
              }
            } else {
              const parsed = context.parsed as { y: number };
              if (parsed.y !== null && parsed.y !== undefined) {
                label += currencySymbol
                  ? prefixCurrency(parsed.y, currencySymbol)
                  : parsed.y.toLocaleString();
              }
            }

            return label;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  if (type !== CHART_DOUGHNUT) {
    baseOptions.scales = {
      x: {
        ticks: {
          color: colors.foregroundAccent
        }
      },
      y: {
        ticks: {
          color: colors.foregroundAccent,
          callback: function (tickValue: string | number): string {
            const value =
              typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            return currencySymbol
              ? prefixCurrency(value, currencySymbol)
              : value.toLocaleString();
          }
        }
      }
    };
  }

  return baseOptions;
};
