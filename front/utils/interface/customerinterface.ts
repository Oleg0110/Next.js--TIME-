export interface ICustomer {
  id: string;
  name: string;
  surname: string;
  email: string;
  userRole: [];
  isActive: boolean;
}

export interface CustomerState {
  customer: ICustomer;
  customerSearch: ICustomer[];
  isLoading: boolean;
  error: string;
}
