import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HelpersModule } from '@helpers/helpers.module';
import { PaymentsApiService } from './shared/payments.api.service';
import { PaymentsListComponent } from './componets/payments-list/payments-list.component';
import * as fromPayments from './store/payments.reducer';
import { PaymentsEffects } from './store/payments.effects';
import { PaymentsRoutingModule } from './payments-routing.module';

@NgModule({
  declarations: [PaymentsListComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HelpersModule,
    StoreModule.forFeature(fromPayments.storeFeatureKey, fromPayments.reducer),
    EffectsModule.forFeature([PaymentsEffects]),
    PaymentsRoutingModule,
  ],
  exports: [],
  providers: [PaymentsApiService],
})
export class PaymentsModule {}
