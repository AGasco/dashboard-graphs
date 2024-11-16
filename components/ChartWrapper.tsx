import { CHART_BAR, CHART_DOUGHNUT, CHART_LINE } from '@/consts';
import { AvailableChartTypes } from '@/types';
import { ChartData } from 'chart.js';
import { getChartOptions } from 'config';
import { useMemo } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

interface BaseChartProps<TType extends AvailableChartTypes> {
  title: string;
  type: TType;
  data: ChartData<TType>;
  currencySymbol?: string;
}

type Props =
  | BaseChartProps<typeof CHART_BAR>
  | BaseChartProps<typeof CHART_LINE>
  | BaseChartProps<typeof CHART_DOUGHNUT>;

const chartComponents: Record<AvailableChartTypes, React.FC<any>> = {
  [CHART_BAR]: Bar,
  [CHART_LINE]: Line,
  [CHART_DOUGHNUT]: Doughnut
};

const ChartWrapper = ({ title, type, data, currencySymbol = '' }: Props) => {
  const options = useMemo(
    () => getChartOptions(type, currencySymbol),
    [type, currencySymbol]
  );

  const ChartComponent = chartComponents[type];

  if (!ChartComponent) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-0 leading-5">{title}</h2>
      <div className="h-56">
        <ChartComponent data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartWrapper;
