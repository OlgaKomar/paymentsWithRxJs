import { UserPaymentTypesEnum } from './constants';

export interface UserPaymentTypesResponse {
  data: UserPaymentType[];
}

export interface UserPaymentTypesOptions {
  withDisabled?: boolean;
  isFull?: boolean;
  failRequest?: boolean;
}

export interface UserPaymentType {
  id: number;
  type: UserPaymentTypesEnum;
  isEnabled: boolean;
}

export interface PaymentsState {
  lastPayment: {
    data: UserPaymentType;
    loading: boolean;
  };
  userPayments: {
    data: UserPaymentType[];
    loading: boolean;
  };
}
