interface CreatePaymentLinkRequestBody {
  productName: string;
  description: string;
  returnUrl: string;
  price: number; // Trong TS, cả int và double đều dùng chung kiểu 'number'
  cancelUrl: string;
  id?: number;   // Dùng '?' vì bên Java dùng 'Integer' (có thể null)
}