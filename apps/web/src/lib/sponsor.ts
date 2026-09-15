import { DodoPayments, CheckoutEvent } from 'dodopayments-checkout';

export const REICON_DODO_PRODUCT_ID = 'pdt_0NnNZFDJoDJ8zBvhtSXBu';
export const REICON_DODO_CHECKOUT_URL = `https://checkout.dodopayments.com/buy/${REICON_DODO_PRODUCT_ID}`;

let isInitialized = false;

export function initDodoPayments(onSuccess?: () => void) {
  if (isInitialized) return;
  try {
    DodoPayments.Initialize({
      mode: 'live',
      onEvent: (event: CheckoutEvent) => {
        if (
          event.event_type === 'checkout.redirect' ||
          event.event_type === 'checkout.status'
        ) {
          if (onSuccess) onSuccess();
        }
      },
    });
    isInitialized = true;
  } catch (err) {
    console.warn('Dodo Payments initialization warning:', err);
  }
}

export function openSponsorCheckout(onSuccess?: () => void) {
  initDodoPayments(onSuccess);

  try {
    if (typeof DodoPayments?.Checkout?.open === 'function') {
      DodoPayments.Checkout.open({
        checkoutUrl: REICON_DODO_CHECKOUT_URL,
      });
    } else {
      window.location.href = REICON_DODO_CHECKOUT_URL;
    }
  } catch {
    window.location.href = REICON_DODO_CHECKOUT_URL;
  }
}
