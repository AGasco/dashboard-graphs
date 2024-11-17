'use client';
import { Tabs } from '@/components';
import { IncidentsTab, OverviewTab } from './tabs';

const DashboardContent = () => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <OverviewTab data-testid="overview-tab" />
    },
    {
      id: 'incidents',
      label: 'Incidents',
      content: <IncidentsTab data-testid="incidents-tab" />
    }
  ];

  return <Tabs tabs={tabs} className="flex-1" />;
};

export default DashboardContent;
