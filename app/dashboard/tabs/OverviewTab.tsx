import { Card } from '@/components';
import {
  CHART_BY_COST,
  CHART_BY_DATE,
  CHART_BY_STATUS,
  CHART_BY_TYPE
} from '@/consts';
import DashboardChart from '../DashboardChart';

const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <DashboardChart chartType={CHART_BY_TYPE} />
        </Card>
        <Card>
          <DashboardChart chartType={CHART_BY_DATE} />
        </Card>
        <Card>
          <DashboardChart chartType={CHART_BY_COST} />
        </Card>
        <Card>
          <DashboardChart chartType={CHART_BY_STATUS} />
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
