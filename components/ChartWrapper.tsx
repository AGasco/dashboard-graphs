import { CHART_BAR, CHART_DOUGHNUT, CHART_LINE } from '@/consts';
import { AvailableChartTypes } from '@/types';
import { ChartData } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

interface BaseChartProps<TType extends AvailableChartTypes> {
  title: string;
  type: TType;
  data: ChartData<TType>;
}

type Props =
  | BaseChartProps<typeof CHART_BAR>
  | BaseChartProps<typeof CHART_LINE>
  | BaseChartProps<typeof CHART_DOUGHNUT>;

const options = {
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
      mode: 'index' as const,
      intersect: false
    }
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false
  }
};

const ChartWrapper = ({ title, type, data }: Props) => {
  if (type === CHART_BAR) {
    return (
      <div className="mb-5 w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="h-64">
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  } else if (type === CHART_LINE) {
    return (
      <div className="mb-5 w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="h-64">
          <Line data={data} options={options} />
        </div>
      </div>
    );
  } else if (type === CHART_DOUGHNUT) {
    return (
      <div className="mb-5 w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="h-64">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ChartWrapper;
