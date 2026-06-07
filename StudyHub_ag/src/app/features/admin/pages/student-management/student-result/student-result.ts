import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  PaginationChangedEvent,
} from 'ag-grid-community';
import { GridActionCell } from '../../../../../_shared/components/grid-action-cell/grid-action-cell';
import { mapGender } from '../../../../../../utils/account-map';
import { Router } from '@angular/router';
import { Empty } from '../../../../../_shared/empty/empty';
import { Pagination } from '../../../../../_shared/components/pagination/pagination';

// Register all community features for AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-student-result',
  imports: [AgGridAngular, Empty, Pagination],
  templateUrl: './student-result.html',
  styleUrl: './student-result.css',
})
export class StudentResult implements OnInit {
  // Row Data: The data to be displayed.
  // rowData = [
  //   { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  //   { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  //   { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  // ];

  // Column Definitions: Defines the columns to be displayed.
  // colDefs: ColDef[] = [
  //   { field: 'make' },
  //   { field: 'model' },
  //   { field: 'price' },
  //   { field: 'electric' },
  // ];

  @Input() rowData: AdminUserAccountBasicResponse[] = [];

  // Giả sử bạn có biến quản lý phân trang (nếu không phân trang thì mặc định trang đầu = 0)
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 10; // Mỗi trang có 10 bản ghi
  @Input() totalPages: number = 0; // Lấy từ API trả về
  @Input() paginationModel?: PaginationModel;

  @Input() isStudent: boolean = false;

  // Ép kiểu này giúp bạn gõ sai chữ 'make' thành 'makeee' là IDE báo lỗi ngay
  fields: (keyof AdminUserAccountBasicResponse)[] = [
    'id',
    'firstName',
    'lastName',
    'gender',
    'dateOfBirth',
    'status',
    'email',
    'phone',
    'hometown',
    'address',
  ];

  colDefs: ColDef[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // 1. Tính toán "Số đầu" (vị trí bắt đầu của trang hiện tại)
    const startNumber = this.currentPage * this.pageSize;

    // 2. Generate động và chèn thêm cột STT vào đầu mảng
    const dynamicCols: ColDef[] = this.fields.map((fieldName) => {
      switch (fieldName) {
        case 'id':
          return { field: fieldName, headerName: 'ID' };
        case 'firstName':
          return { field: fieldName, headerName: 'Họ và họ đệm' };
        case 'lastName':
          return { field: fieldName, headerName: 'Tên' };
        case 'gender':
          return {
            field: fieldName,
            headerName: 'Giới tính',
            cellRenderer: 'agTextCellRenderer', // <--- Ép AG-Grid hiển thị dạng text thuần
            valueFormatter: (params) => {
              // Lưu ý: Hàm mapGender của bạn đang là: true ? 'Nam' : 'Nữ'
              return params.value !== undefined ? mapGender(params.value) : '';
            },
          };
        case 'dateOfBirth':
          return {
            field: fieldName,
            headerName: 'Ngày sinh',
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
              if (params.value === 'ACTIVE') return 'Hoạt động';
              if (params.value === 'INACTIVE') return 'Bị khóa';
              return params.value;
            },
          };
        case 'email':
          return { field: fieldName, headerName: 'Email' };
        case 'phone':
          return { field: fieldName, headerName: 'Số điện thoại' };
        case 'hometown':
          return { field: fieldName, headerName: 'Quê quán' };
        case 'address':
          return { field: fieldName, headerName: 'Địa chỉ' };
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
            onClick: (rowData: AdminUserAccountBasicResponse) => {
              // 1. Tạo ra đối tượng UrlTree từ cấu hình route của Angular
              const urlTree = this.router.createUrlTree([
                this.isStudent
                  ? '/admin/quan-ly-hoc-vien/bieu-mau'
                  : '/admin/quan-ly-giao-vien/bieu-mau',
                rowData.id,
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

  // Hàm hứng dữ liệu khi người dùng click xem chi tiết
  // openDetailModal(user: AdminUserAccountBasicResponse) {
  //   // 1. Tạo ra đối tượng UrlTree từ cấu hình route của Angular
  //   const urlTree = this.router.createUrlTree([
  //     '/admin/quan-ly-hoc-vien/bieu-mau',
  //     user.id,
  //   ]);

  //   // 2. Chuyển đổi UrlTree đó thành một chuỗi URL thuần túy (VD: "/admin/quan-ly-hoc-vien/bieu-mau/123")
  //   const urlString = this.router.serializeUrl(urlTree);

  //   // 3. Sử dụng lệnh của trình duyệt để mở URL này ở một tab mới (`_blank`)
  //   window.open(urlString, '_blank');
  // }
}
