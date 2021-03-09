import { UserPaymentTypesEnum } from '@payments/shared/constants';

export const UserPaymentTypesDetails = {
  [UserPaymentTypesEnum.CASH]: {
    title: 'With Cash',
    shortDescription: 'Pay after received',
  },
  [UserPaymentTypesEnum.CARD]: {
    title: 'By Card',
    shortDescription: 'Pay online by card',
  },
  [UserPaymentTypesEnum.CREDIT]: {
    title: 'Take loan',
    shortDescription: '',
  },
  [UserPaymentTypesEnum.GOOGLE_PAY]: {
    title: 'Google Pay',
    shortDescription: '',
  },
};
