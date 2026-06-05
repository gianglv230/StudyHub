import { Component, inject, Input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { Pagination } from '../../../../../_shared/components/pagination/pagination';
import { GridActionCell } from '../../../../../_shared/components/grid-action-cell/grid-action-cell';
import { Router } from '@angular/router';
import {
  InvoiceMethodMap,
  InvoiceStatusMap,
  InvoiceTypeMap,
} from '../../../../../../utils/const/status.const';
import { DatePipe, DecimalPipe } from '@angular/common';

// Register all community features for AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-invoice-result',
  imports: [AgGridAngular, Pagination],
  templateUrl: './invoice-result.html',
  styleUrl: './invoice-result.css',
  providers: [DatePipe, DecimalPipe],
})
export class InvoiceResult implements OnInit {
  @Input() rowData: InvoiceCardResponse[] = [];

  // Giả sử bạn có biến quản lý phân trang (nếu không phân trang thì mặc định trang đầu = 0)
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 10; // Mỗi trang có 10 bản ghi
  @Input() totalPages: number = 0; // Lấy từ API trả về
  @Input() paginationModel?: PaginationModel;

  // Ép kiểu này giúp bạn gõ sai chữ 'make' thành 'makeee' là IDE báo lỗi ngay
  fields: (keyof InvoiceCardResponse)[] = [
    'invoiceId',
    'studentName',
    'className',
    'dueDate',
    'createdAt',
    'status',
    'createdByUser',
    'amount',
    'adjustments',
    'finalAmount',
    'orderCode',
    'paidAt',
    'method',
    'type',
  ];

  colDefs: ColDef[] = [];

  // ... (Trong Component của bạn)
  datePipe = inject(DatePipe); // Phải gọi ở tầng ngoài cùng của class/hàm khởi tạo
  decimalPipe = inject(DecimalPipe);

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // 1. Tính toán "Số đầu" (vị trí bắt đầu của trang hiện tại)
    const startNumber = this.currentPage * this.pageSize;

    // 2. Generate động và chèn thêm cột STT vào đầu mảng
    const dynamicCols: ColDef[] = this.fields.map((fieldName) => {
      switch (fieldName) {
        case 'invoiceId':
          return {
            field: fieldName,
            headerName: 'Mã hóa đơn',
            width: 120,
            cellClass: 'text-center',
          };
        case 'studentName':
          return {
            field: fieldName,
            headerName: 'Tên học viên',
            width: 180,
          };
        case 'className':
          return {
            field: fieldName,
            headerName: 'Tên lớp học',
            width: 320,
          };
        case 'dueDate':
          return {
            field: fieldName,
            headerName: 'Ngày đến hạn',
            valueFormatter: (params) => {
              if (!params.value) return '';
              const date = new Date(params.value);
              // Định dạng thủ công dd/MM/yyyy (hoặc dùng thư viện date-fns, moment nếu có)
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            },
          };
        case 'createdAt':
          return {
            field: fieldName,
            headerName: 'Ngày tạo',
            valueFormatter: (params) => {
              if (!params.value) return '';
              const date = new Date(params.value);
              // Định dạng thủ công dd/MM/yyyy (hoặc dùng thư viện date-fns, moment nếu có)
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            },
          };
        case 'status':
          return {
            field: fieldName,
            headerName: 'Trạng thái',
            valueFormatter: (params) => {
              if (!params.value) return '';
              return InvoiceStatusMap[params.value as InvoiceStatus];
            },
          };
        case 'createdByUser':
          return {
            field: fieldName,
            headerName: 'Người tạo',
          };

        case 'amount':
          return {
            field: fieldName,
            headerName: 'Sô tiền',
            valueFormatter: (params) => {
              if (!params.value) return '';
              // '1.0-3' nghĩa là: tối thiểu 1 chữ số phần nguyên, từ 0 đến tối đa 3 chữ số phần thập phân
              const formattedNumber = this.decimalPipe.transform(
                params.value,
                '1.0-3',
              );

              return formattedNumber ? `${formattedNumber} đ` : '';
            },
          };
        case 'adjustments':
          return {
            field: fieldName,
            headerName: 'Điều chỉnh',
            valueFormatter: (params) => {
              if (!params.value) return '0 đ';
              // '1.0-3' nghĩa là: tối thiểu 1 chữ số phần nguyên, từ 0 đến tối đa 3 chữ số phần thập phân
              const formattedNumber = this.decimalPipe.transform(
                params.value,
                '1.0-3',
              );

              return formattedNumber ? `${formattedNumber} đ` : '';
            },
          };
        case 'finalAmount':
          return {
            field: fieldName,
            headerName: 'Tổng tiền',
            valueFormatter: (params) => {
              if (!params.value) return '';
              // '1.0-3' nghĩa là: tối thiểu 1 chữ số phần nguyên, từ 0 đến tối đa 3 chữ số phần thập phân
              const formattedNumber = this.decimalPipe.transform(
                params.value,
                '1.0-3',
              );

              return formattedNumber ? `${formattedNumber} đ` : '';
            },
          };

        case 'orderCode':
          return {
            field: fieldName,
            headerName: 'Mã thanh toán',
            width: 150,
          };

        case 'paidAt':
          return {
            field: fieldName,
            headerName: 'Thời gian thanh toán',
            valueFormatter: (params) => {
              if (!params.value) return '';
              return (
                this.datePipe.transform(
                  params.value,
                  'dd/MM/yyyy - HH:mm:ss',
                ) || ''
              );
            },
          };

        case 'method':
          return {
            field: fieldName,
            headerName: 'Phương thức thanh toán',
            valueFormatter: (params) => {
              if (!params.value) return '';
              return InvoiceMethodMap[params.value as InvoiceMethod];
            },
          };
        case 'type':
          return {
            field: fieldName,
            headerName: 'Loại hóa đơn',
            valueFormatter: (params) => {
              if (!params.value) return '';
              return InvoiceTypeMap[params.value as InvoiceType];
            },
          };
        default:
          return { field: fieldName, headerName: fieldName };
      }
    });

    this.colDefs = [
      {
        headerName: 'STT',
        valueGetter: (params) => {
          // params.node.rowIndex là chỉ số dòng của AG-Grid (bắt đầu từ 0)
          // if (params.node && params.node.rowIndex !== null) {
          //   return startNumber + params.node.rowIndex + 1;
          // }
          // return null;

          // Kiểm tra chắc chắn node và rowIndex có tồn tại
          if (
            params.node &&
            params.node.rowIndex !== null &&
            params.node.rowIndex !== undefined
          ) {
            // Giả định: currentPage bắt đầu từ 0 (Trang 1 là 0, Trang 2 là 1,...)
            const startIndex = this.currentPage * this.pageSize;

            // Nếu currentPage của bạn bắt đầu từ 1, hãy dùng dòng dưới này:
            // const startIndex = (this.currentPage - 1) * this.pageSize;

            return startIndex + params.node.rowIndex + 1;
          }
          return null;
        },
        width: 70, // Cho cột STT nhỏ lại nhìn cho đẹp
        sortable: false, // Thường STT không cần sort
        filter: false, // Thường STT không cần filter
      },
      // Rải các cột được generate động từ fields ra phía sau
      ...dynamicCols,

      // 3. Cột Action (Nút bấm) nằm ở cuối cùng
      {
        headerName: 'Hành động',
        cellRenderer: GridActionCell, // Chỉ định component làm giao diện cho ô
        cellRendererParams: {
          action: {
            onClick: (rowData: InvoiceCardResponse) => {
              // 1. Tạo ra đối tượng UrlTree từ cấu hình route của Angular
              const urlTree = this.router.createUrlTree([
                `/admin/quan-ly-lop-hoc/${rowData.classSlug}/chi-tiet`,
              ]);

              // 2. Chuyển đổi UrlTree đó thành một chuỗi URL thuần túy (VD: "/admin/quan-ly-hoc-vien/bieu-mau/123")
              const urlString = this.router.serializeUrl(urlTree);

              // 3. Sử dụng lệnh của trình duyệt để mở URL này ở một tab mới (`_blank`)
              window.open(urlString, '_blank');
            },
          },
          // Truyền hàm callback từ cha vào con để khi nhấn nút thì bên cha nhận được data
          // onViewDetail: (rowData: AdminUserAccountBasicResponse) =>
          //   this.openDetailModal(rowData),
        },
        width: 150,
        sortable: false,
        filter: false,
        cellClass: 'd-flex align-items-center justify-content-center',
      },
    ];
  }
}
