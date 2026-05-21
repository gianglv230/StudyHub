// export function initData(method: any, variable: any, defaultValue?: any): void {
//   method.subscribe({
//     next: (res: any) => {
//       if (res.code === 0) {
//         if (res.result && res.result.length > 0) {
//           variable = res.result;
//         } else {
//           if (defaultValue) {
//             variable = defaultValue;
//           }
//           console.warn('API không trả về dữ liệu, dùng dữ liệu mặc định.');
//         }
//       } else {
//         console.warn('API trả về code lỗi: ', res.code);
//       }
//     },
//     error: (err: any) => {
//       console.error('Lỗi API:', err);
//     },
//   });
// }

import { Observable } from "rxjs";

// utils/api-utils.ts

/**
 * Utility function to initialize data from an API call (Observable).
 * Subscribes to the Observable and sets the data via the provided setter callback.
 * If the API response code is not success or data is empty, it sets a default value if provided.
 * Also logs warnings or errors with an optional log prefix.
 *
 * @template T - The type of the expected data.
 * @param {Observable<any>} method - The Observable representing the API call.
 * @param {(data: T) => void} setter - Callback function to set the data.
 * @param {Object} [options] - Optional parameters.
 * @param {T} [options.defaultValue] - Default value to set if API data is missing or error occurs.
 * @param {string} [options.logPrefix] - Prefix string for console logs to identify the source.
 */
export function initData<T>(
  method: Observable<any>, 
  setter: (data: T) => void, 
  setMsg?: (msg: string) => void,
  options?: { 
    defaultValue?: T; 
    logPrefix?: string; 
  }
): void {
  method.subscribe({
    next: (res: ApiResponse<T>) => {
      setMsg?.(res?.message);
      // console.log(res);
      const prefix = options?.logPrefix ?? 'API';
      if (res.code === 0) {
        // console.log(res.result);
        // console.log(res.result.length);
        if (res.data) {
          // Successful response with data
          setter(res.data);
        } else {
          // Successful response but no data returned
          console.warn(`${prefix}: không trả về dữ liệu, dùng giá trị mặc định.`);
          if (options?.defaultValue !== undefined) setter(options.defaultValue);
        }
      } else {
        // API returned an error code
        console.warn(`${prefix}: trả về code lỗi:`, res.code);
        if (options?.defaultValue !== undefined) setter(options.defaultValue);
      }
    },
    error: (err) => {
      // Network or unexpected error occurred during API call
      console.error(`${options?.logPrefix ?? 'API'}: lỗi`, err);
      if (options?.defaultValue !== undefined) setter(options.defaultValue);
    },
  });
}

