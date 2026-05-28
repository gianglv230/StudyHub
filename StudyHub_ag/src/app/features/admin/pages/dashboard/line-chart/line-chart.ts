import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  imports: [BaseChartDirective],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart implements OnChanges {
  @Input() revenues?: RevenueStatisticsResponse[];

  labels: string[] = [];
  data: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['revenues']) {
      if (this.revenues) {
        this.labels = this.revenues.map((x) => 'Th' + x.month.toString());
        this.data = this.revenues.map((x) => x.revenue / 1000000);

        this.lineChartData.datasets[0].data = this.data;
        this.lineChartData.labels = this.labels;
      }
    }
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.data,
        label: 'Doanh thu',
        // backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#05406E',
        backgroundColor: 'rgba(224, 255, 255, 0.3)',

        pointBackgroundColor: '#FF7F50',
        pointBorderColor: '#FF7F50',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#05406E',

        pointRadius: 4, // size mặc định
        pointHoverRadius: 6, // khi hover
        pointHitRadius: 20, // vùng click/hover dễ hơn

        fill: 'origin',
      },
    ],
    labels: this.labels,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: 'Tháng',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },

      y: {
        position: 'left',

        title: {
          display: true,
          text: 'Đơn vị: triệu đồng',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },

    plugins: {
      legend: { display: false },
    },
  };

  public lineChartType: ChartType = 'line';
}
