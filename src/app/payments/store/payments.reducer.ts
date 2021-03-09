import { Action, createReducer, on } from '@ngrx/store';

import {
  PaymentsState,
  UserPaymentType,
  UserPaymentTypesResponse,
} from '../shared/interfaces';
import * as paymentsActions from './payments.actions';

export const storeFeatureKey = 'payment';

export const initialState: PaymentsState = {
  lastPayment: {
    data: null,
    loading: false,
  },
  userPayments: {
    data: null,
    loading: false,
  },
};

const paymentReducer = createReducer(
  initialState,
  on(
    paymentsActions.getUserPaymentTypes,
    (state): PaymentsState => ({
      ...state,
      userPayments: {
        ...state.userPayments,
        loading: true,
      },
    })
  ),
  on(
    paymentsActions.getUserPaymentTypesFail,
    (state: PaymentsState): PaymentsState => ({
      ...state,
      userPayments: {
        ...state.userPayments,
        loading: false,
      },
    })
  ),
  on(
    paymentsActions.getUserPaymentTypesSuccess,
    (
      state: PaymentsState,
      { data }: UserPaymentTypesResponse
    ): PaymentsState => {
      return {
        ...state,
        userPayments: {
          data,
          loading: false,
        },
      };
    }
  ),
  on(
    paymentsActions.getUserLastPaymentType,
    (state): PaymentsState => ({
      ...state,
      lastPayment: {
        ...state.lastPayment,
        loading: true,
      },
    })
  ),
  on(
    paymentsActions.getUserLastPaymentTypeFail,
    (state: PaymentsState): PaymentsState => ({
      ...state,
      lastPayment: {
        ...state.lastPayment,
        loading: false,
      },
    })
  ),
  on(
    paymentsActions.getUserLastPaymentTypeSuccess,
    (
      state: PaymentsState,
      { data }: { data: UserPaymentType }
    ): PaymentsState => {
      return {
        ...state,
        lastPayment: {
          data,
          loading: false,
        },
      };
    }
  ),
  on(
    paymentsActions.resetLastPaymentType,
    (state): PaymentsState => ({
      ...state,
      lastPayment: {
        ...state.lastPayment,
        data: null,
      },
    })
  )

  //   on(authActions.loginAuthSuccess, (state) => ({
  //     ...state,
  //     payment: {
  //       ...state.payment,
  //       lastPaymentTypeId: 0,
  //     },
  //   })),

  //   on(authActions.logoutSuccess, (state) => ({
  //     ...initialState,
  //   })),
);

export function reducer(state: PaymentsState | undefined, action: Action) {
  return paymentReducer(state, action);
}
