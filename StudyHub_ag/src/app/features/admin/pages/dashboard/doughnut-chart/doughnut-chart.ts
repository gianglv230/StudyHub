import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ChartData,
  ChartType,
  Chart,
  registerables,
  ChartOptions,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-doughnut-chart',
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.css',
})
export class DoughnutChart implements OnChanges {
  @Input() data: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.doughnutChartData.datasets[0].data = this.data;
    }
  }

  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: this.data,
        backgroundColor: ['#05406E', '#f1f5f9'],
        borderWidth: 0,
      },
    ],
  };
  public doughnutChartType: 'doughnut' = 'doughnut';
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    cutout: '80%', // Điều chỉnh độ dày của vòng doughnut (giá trị càng lớn vòng càng mỏng)
    plugins: {
      legend: {
        display: false, // Ẩn legend mặc định của chart để dùng custom HTML legend bên dưới
      },
    },
  };
}
