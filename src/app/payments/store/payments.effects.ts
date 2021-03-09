import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, from } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  UserPaymentType,
  UserPaymentTypesOptions,
  UserPaymentTypesResponse,
} from '../shared/interfaces';
import { PaymentsApiService } from '../shared/payments.api.service';

import * as paymentsActions from './payments.actions';

@Injectable()
export class PaymentsEffects {
  getPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.getUserPaymentTypes),
      tap((payload) => {
        console.log(payload);
      }),
      switchMap((payload: UserPaymentTypesOptions & Action) => {
        const { type, ...options } = payload;
        return from(this.paymentsService.getPayments(options)).pipe(
          map((data: UserPaymentTypesResponse) =>
            paymentsActions.getUserPaymentTypesSuccess(data)
          ),
          catchError((e) => {
            console.log(e);
            return of(paymentsActions.getUserPaymentTypesFail());
          })
        );
      })
    )
  );

  // getPayments$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(paymentsActions.getUserPaymentTypes),
  //     tap((payload) => {
  //       console.log(payload);
  //     }),
  //     switchMap((payload: UserPaymentTypesOptions & Action) => {
  //       const { type, ...options } = payload;
  //       return from(this.paymentsService.getPayments(options));
  //     }),
  //     map((data: UserPaymentTypesResponse) =>
  //       paymentsActions.getUserPaymentTypesSuccess(data)
  //     ),
  //     wrong place to handle paymentsService.getPayments API errors
  //     catchError((e) => {
  //       console.log(e);
  //       return of(paymentsActions.getUserPaymentTypesFail());
  //     })
  //   )
  // );

  getLastPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.getUserLastPaymentType),
      switchMap(() => {
        return from(this.paymentsService.getUserLastPaymentType()).pipe(
          map((data: UserPaymentType) =>
            paymentsActions.getUserLastPaymentTypeSuccess({ data })
          ),
          catchError((e) => {
            return of(paymentsActions.getUserLastPaymentTypeFail());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private paymentsService: PaymentsApiService
  ) {}
}
