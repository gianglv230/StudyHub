import { Component, OnInit } from '@angular/core';
import { DoughnutChart } from './doughnut-chart/doughnut-chart';
import { LineChart } from './line-chart/line-chart';
import { StatisticsService } from '../../../../_service/statistics/statistics.service';
import { initData } from '../../../../../utils/init-data';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [DoughnutChart, LineChart, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  statisticsBasic?: StatisticsBasicResponse;
  revenues?: RevenueStatisticsResponse[];

  doughnutData: number[] = [];
  totalAttendance?: number;
  presentRatio?: number;
  absentRatio?: number;

  constructor(private readonly statisticsService: StatisticsService) {}

  ngOnInit(): void {
    const today = new Date();
    this.initStatisticBasicData();
    this.initRevenues(today.getFullYear());
  }

  initStatisticBasicData() {
    initData<StatisticsBasicResponse>(
      this.statisticsService.getBasicStatistics(),
      (data) => {
        console.log(data);
        this.statisticsBasic = data;

        this.doughnutData = [
          this.statisticsBasic.numberOfPresent,
          this.statisticsBasic.numberOfAbsent,
        ];

        this.totalAttendance =
          this.statisticsBasic.numberOfPresent +
          this.statisticsBasic.numberOfAbsent;

        this.presentRatio = !this.totalAttendance
          ? 0
          : Math.round(
              (this.statisticsBasic.numberOfPresent / this.totalAttendance) *
                100,
            );

        this.absentRatio = 100 - this.presentRatio;
      },
    );
  }

  initRevenues(year: number) {
    console.log('??');
    initData<RevenueStatisticsResponse[]>(
      this.statisticsService.getRevenueStatisticsByYear(year),
      (data) => {
        console.log(data);
        this.revenues = data;
      },
    );
  }
}
