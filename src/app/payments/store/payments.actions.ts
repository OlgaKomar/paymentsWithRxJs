import { createAction, props } from '@ngrx/store';
import {
  UserPaymentType,
  UserPaymentTypesOptions,
  UserPaymentTypesResponse,
} from '../shared/interfaces';

export const getUserPaymentTypes = createAction(
  '[Payments] Get User PaymentTypes',
  props<UserPaymentTypesOptions>()
);
export const getUserPaymentTypesFail = createAction(
  '[Payments] Get User PaymentTypes Fail'
);
export const getUserPaymentTypesSuccess = createAction(
  '[Payments] Get User PaymentTypes Success',
  props<UserPaymentTypesResponse>()
);

export const getUserLastPaymentType = createAction(
  '[Payments] Get User Last Payment Type'
);
export const getUserLastPaymentTypeFail = createAction(
  '[Payments] Get User Last Payment Type Fail'
);
export const getUserLastPaymentTypeSuccess = createAction(
  '[Payments] Get User Last Payment Type Success',
  props<{ data: UserPaymentType }>()
);

export const resetLastPaymentType = createAction(
  '[Payments] Reset Last User Payment Type'
);
