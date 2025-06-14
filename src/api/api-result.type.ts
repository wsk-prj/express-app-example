export interface ApiResult<T = null> {
  success: boolean;
  status: number;
  message?: string;
  details?: any;
  instance?: string;
  data?: T;
}
