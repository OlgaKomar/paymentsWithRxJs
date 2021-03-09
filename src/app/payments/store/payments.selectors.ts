import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentsState, UserPaymentType } from '../shared/interfaces';
import { storeFeatureKey } from './payments.reducer';

export interface AppWithPaymentsState {
  [storeFeatureKey]: PaymentsState;
}

export const selectFeature = createFeatureSelector<
  AppWithPaymentsState,
  PaymentsState
>(storeFeatureKey);

export const selectPayments = createSelector(
  selectFeature,
  (state: PaymentsState): UserPaymentType[] => state.userPayments.data
);
export const selectPaymentsLoadingFlag = createSelector(
  selectFeature,
  (state: PaymentsState): boolean => state.userPayments.loading
);
export const selectLastPayment = createSelector(
  selectFeature,
  (state: PaymentsState): UserPaymentType => state.lastPayment.data
);
