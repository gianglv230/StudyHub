import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

// 1. Tạo một Interface mở rộng để định nghĩa rõ ràng cấu trúc dữ liệu truyền từ cha xuống
interface CustomCellRendererParams extends ICellRendererParams {
  action?: {
    className?: string;
    icon?: string;
    onClick?: (data: any) => void;
  };
  onViewDetail?: (data: any) => void;
}

@Component({
  selector: 'app-grid-action-cell',
  imports: [],
  templateUrl: './grid-action-cell.html',
  styleUrl: './grid-action-cell.css',
})
export class GridActionCell implements ICellRendererAngularComp {
  // 2. Đổi kiểu dữ liệu từ ICellRendererParams sang Interface tùy biến vừa tạo
  params!: CustomCellRendererParams;
  actionConfig: any;

  agInit(params: CustomCellRendererParams): void {
    this.params = params;

    // Giờ đây bạn có thể gọi trực tiếp params.action một cách an toàn mà không bị lỗi
    this.actionConfig = params.action;
  }

  refresh(params: CustomCellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onDetailClick() {
    const rowData = this.params.data;
    // Gọi an toàn không cần ép kiểu (as any) lằng nhằng nữa
    if (this.params.onViewDetail) {
      this.params.onViewDetail(rowData);
    }
  }

  onBtnClick() {
    if (this.actionConfig && typeof this.actionConfig.onClick === 'function') {
      this.actionConfig.onClick(this.params.data);
    }
  }
}
