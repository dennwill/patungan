// Patterns for Indonesian + English receipt lines
const P = {
  itemQty:  /^(.+?)\s+(\d+)\s*[xX]\s*([\d.,]+)/,
  itemFlat: /^(.+?)\s{2,}([\d.,]+)\s*$/,
  tax:      /^(ppn|tax|pajak|vat|pb1|pbjt)\b.+?([\d.,]+)\s*$/i,
  service:  /^(service\s*charge|servis|svc|layanan)\b.+?([\d.,]+)\s*$/i,
  discount: /^(disc(ount)?|diskon|promo|potongan|voucher)\b.+?([\d.,]+)\s*$/i,
  pct:      /(\d+(?:[.,]\d+)?)\s*%/,
  skip:     /^(subtotal|total|tunai|cash|change|kembalian|kredit|debit|bayar|payment|grand|rp\.?\s*$)/i,
  noise:    /^[-=*#_\s]+$/,
}

function toNum(str) {
  return parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0
}

function feeResult(line, amountStr) {
  const pct = P.pct.exec(line)
  return pct
    ? { present: true, type: '%', amount: parseFloat(pct[1].replace(',', '.')) }
    : { present: true, type: 'nominal', amount: toNum(amountStr) }
}

export function parseReceipt(rawText) {
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean)

  const result = {
    items: [],
    globalDiscount: { present: false },
    serviceCharge: { present: false },
    tax: { present: false },
  }

  for (const line of lines) {
    if (P.skip.test(line) || P.noise.test(line)) continue

    let m

    if ((m = P.tax.exec(line))) {
      result.tax = feeResult(line, m[2])
    } else if ((m = P.service.exec(line))) {
      result.serviceCharge = feeResult(line, m[2])
    } else if ((m = P.discount.exec(line))) {
      result.globalDiscount = { present: true, type: 'nominal', amount: toNum(m[3]) }
    } else if ((m = P.itemQty.exec(line))) {
      result.items.push({ name: m[1].trim(), qty: parseInt(m[2]), price: toNum(m[3]), discount: null })
    } else if ((m = P.itemFlat.exec(line))) {
      const price = toNum(m[2])
      if (price > 0) {
        result.items.push({ name: m[1].trim(), qty: 1, price, discount: null })
      }
    }
  }

  return result
}
