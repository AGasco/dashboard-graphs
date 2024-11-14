import { Incident } from './incident';

export type NextResponse = {
  page: number;
  limit: string;
  total: number;
  data: Incident[];
};
