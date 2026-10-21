/** Independent educational example, not extracted from any client product. */
export function toCents(usd) {
  if (typeof usd !== 'string' || !/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(usd)) {
    throw new TypeError('Use a nonnegative USD amount with no more than two decimals');
  }
  const [dollars, cents = ''] = usd.split('.');
  const result = BigInt(dollars) * 100n + BigInt((cents + '00').slice(0, 2));
  if (result > BigInt(Number.MAX_SAFE_INTEGER)) throw new RangeError('Amount too large');
  return Number(result);
}

/** In-memory practice function. Persistent DB transactions require separate guarantees. */
export function recordPaymentOnce(store, { invoiceId, amount }) {
  if (!(store instanceof Map)) throw new TypeError('A Map is required');
  if (!Number.isSafeInteger(invoiceId) || invoiceId <= 0) throw new TypeError('Invalid invoice ID');
  const amountCents = toCents(amount);
  if (amountCents === 0) throw new RangeError('Payment must be positive');
  if (store.has(invoiceId)) return { created: false, record: store.get(invoiceId) };
  const record = Object.freeze({ invoiceId, amountCents });
  store.set(invoiceId, record);
  return { created: true, record };
}
