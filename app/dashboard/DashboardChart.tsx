import { ChartWrapper } from '@/components';
import { CHART_BAR, CHART_DOUGHNUT, CHART_LINE } from '@/consts';
import { useIncidentStats } from '@/hooks';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDashboardCharts from './useDashboardCharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const { stats, error, isLoading } = useIncidentStats();
  const { incidentsByTypeData, incidentsByDateData, incidentsByStatusData } =
    useDashboardCharts(stats);

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart: {error.message}</div>;
  if (!stats) return null;

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
    >
      <SwiperSlide>
        <ChartWrapper
          title="Incidents by Type"
          type={CHART_BAR}
          data={incidentsByTypeData}
        />
      </SwiperSlide>

      <SwiperSlide>
        <ChartWrapper
          title="Incidents Over Time"
          type={CHART_LINE}
          data={incidentsByDateData}
        />
      </SwiperSlide>

      <SwiperSlide>
        <ChartWrapper
          title="Incidents by Status"
          type={CHART_DOUGHNUT}
          data={incidentsByStatusData}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default DashboardChart;
