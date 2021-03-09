import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, asyncScheduler, throwError } from 'rxjs';

import {
  UserPaymentType,
  UserPaymentTypesOptions,
  UserPaymentTypesResponse,
} from './interfaces';
import { UserPaymentTypesEnum } from './constants';
import { delay, observeOn } from 'rxjs/operators';

@Injectable()
export class PaymentsApiService {
  getPayments(
    options: UserPaymentTypesOptions
  ): Observable<UserPaymentTypesResponse> {
    if (options.failRequest) {
      return throwError('Fake Error Response');
    }
    return of(this.fakePaymentsData(options || {})).pipe(
      observeOn(asyncScheduler, 1000)
    );
  }

  getUserLastPaymentType(): Observable<UserPaymentType> {
    return of({
      id: 2,
      type: UserPaymentTypesEnum.CASH,
      isEnabled: true,
    }).pipe(delay(1000));
  }

  private fakePaymentsData({
    withDisabled = false,
    isFull = true,
  }: UserPaymentTypesOptions): UserPaymentTypesResponse {
    switch (true) {
      case withDisabled:
        return {
          data: [
            {
              id: 1,
              type: UserPaymentTypesEnum.CARD,
              isEnabled: true,
            },
            {
              id: 2,
              type: UserPaymentTypesEnum.CASH,
              isEnabled: true,
            },
            {
              id: 3,
              type: UserPaymentTypesEnum.CREDIT,
              isEnabled: false,
            },
          ],
        };
      case isFull:
        return {
          data: [
            {
              id: 1,
              type: UserPaymentTypesEnum.CARD,
              isEnabled: false,
            },
            {
              id: 2,
              type: UserPaymentTypesEnum.CASH,
              isEnabled: true,
            },
            {
              id: 3,
              type: UserPaymentTypesEnum.CREDIT,
              isEnabled: true,
            },
            {
              id: 3,
              type: UserPaymentTypesEnum.GOOGLE_PAY,
              isEnabled: true,
            },
          ],
        };
    }
  }
}
