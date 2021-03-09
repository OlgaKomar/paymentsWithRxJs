import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, take, takeUntil, tap } from 'rxjs/operators';

import {
  AppWithPaymentsState,
  selectLastPayment,
  selectPayments,
} from '@payments/store/payments.selectors';
import { UserPaymentType } from '@payments/shared/interfaces';
import { UserPaymentTypesDetails } from './constants';
import { getUserPaymentTypes } from '@payments/store/payments.actions';
import { getUserLastPaymentType } from '@payments/store/payments.actions';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsListComponent implements OnInit, OnDestroy {
  payments$: Observable<UserPaymentType[]>;
  payments: UserPaymentType[] = [];

  private subscriptions: Subscription[] = [];
  private onDestroy$: Subject<null> = new Subject();

  constructor(
    private cdr: ChangeDetectorRef,
    private store$: Store<AppWithPaymentsState>
  ) {}

  ngOnInit(): void {
    this.payments$ = combineLatest([
      this.store$.pipe(select(selectPayments)).pipe(
        tap((data: UserPaymentType[]) => {
          if (!!data) {
            return;
          }
          this.store$.dispatch(getUserPaymentTypes({}));
        }),
        filter(Boolean),
        map((data: UserPaymentType[]): UserPaymentType[] =>
          data.map((paymentType: UserPaymentType) => ({
            ...paymentType,
            ...UserPaymentTypesDetails[paymentType.type],
          }))
        )
      ),
      this.store$
        .pipe(select(selectLastPayment))
        .pipe(filter(Boolean), startWith({})),
    ]).pipe(
      map(([data, lastPaymentType]: [UserPaymentType[], UserPaymentType]) =>
        data.map((paymentType) =>
          paymentType.id === lastPaymentType.id
            ? { ...paymentType, isSelected: true }
            : paymentType
        )
      )
    );
  }

  refreshPaymentTypes(): void {
    this.store$.dispatch(
      getUserPaymentTypes({
        withDisabled: true,
        isFull: false,
        failRequest: false,
      })
    );
  }

  errorPaymentTypes(): void {
    this.store$.dispatch(
      getUserPaymentTypes({
        withDisabled: true,
        isFull: false,
        failRequest: true,
      })
    );
  }

  handleLogin(): void {
    this.store$.dispatch(getUserLastPaymentType());
  }

  handleLogout(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
