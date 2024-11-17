import { Card } from '@/components';
import {
  CHART_BY_COST,
  CHART_BY_DATE,
  CHART_BY_STATUS,
  CHART_BY_TYPE
} from '@/consts';
import DashboardChart from '../DashboardChart';

const OverviewTab = () => {
  const cardClassName = 'min-h-[280px] min-w-[650px] pb-5';

  return (
    <div className="space-y-6 px-28 pt-0.5 3xl:max-w-3xl m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-auto w-max">
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
