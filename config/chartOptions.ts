import { prefixCurrency } from '@/utils';
import { TooltipItem } from 'chart.js';
import { CHART_DOUGHNUT, CHART_BAR, CHART_LINE } from 'consts/strings';
import { AvailableChartTypes } from 'types/incident';

export const getChartOptions = (
  type: AvailableChartTypes,
  currencySymbol: string
) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
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
        mode: type === CHART_DOUGHNUT ? 'index' : ('nearest' as const),
        intersect: false,
        callbacks: {
          label: function (
            context: TooltipItem<
              typeof CHART_BAR | typeof CHART_LINE | typeof CHART_DOUGHNUT
            >
          ) {
            let label = context.dataset.label || '';
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
              if (context.parsed.y !== null) {
                label += currencySymbol
                  ? prefixCurrency(context.parsed.y, currencySymbol)
                  : context.parsed.y.toLocaleString();
              }
            }

            return label;
          }
        }
      }
    },
    scales:
      type === CHART_DOUGHNUT
        ? {}
        : {
            y: {
              ticks: {
                callback: function (value: number) {
                  return currencySymbol
                    ? prefixCurrency(value, currencySymbol)
                    : value.toLocaleString();
                }
              }
            }
          },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };
};
