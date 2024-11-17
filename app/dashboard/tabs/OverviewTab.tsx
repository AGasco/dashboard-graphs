import { Card } from '@/components';
import {
  CHART_BY_COST,
  CHART_BY_DATE,
  CHART_BY_STATUS,
  CHART_BY_TYPE
} from '@/consts';
import DashboardChart from '../DashboardChart';

const OverviewTab = () => {
  const cardClassName = 'min-h-[280px] max-w-full 2xl:min-w-[650px] pb-5';

  return (
    <div className="space-y-6 pt-0.5 pb-4 m-auto 2xl:px-28 3xl:max-w-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-auto 2xl:w-max">
        <Card className={cardClassName}>
          <DashboardChart chartType={CHART_BY_TYPE} />
        </Card>
        <Card className={cardClassName}>
          <DashboardChart chartType={CHART_BY_DATE} />
        </Card>
        <Card className={cardClassName}>
          <DashboardChart chartType={CHART_BY_COST} />
        </Card>
        <Card className={cardClassName}>
          <DashboardChart chartType={CHART_BY_STATUS} />
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
