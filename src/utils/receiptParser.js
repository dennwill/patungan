// Indonesian receipt format: item name on one line, "qty x Rp.price" on next line
const P = {
  priceLine: /^[^a-zA-Z]*(\d+)\s*[xX]\s*[iI]?Rp\.?\s*([\d.,\s]+)/i,
  tax:       /^(ppn|tax|pajak|vat|pb1|pbjt)\b.+?([\d.,]+)\s*$/i,
  service:   /^(service\s*charge|servis|svc|layanan)\b.+?([\d.,]+)\s*$/i,
  discount:  /^(disc(ount)?|diskon|promo|potongan|voucher)\b.+?([\d.,]+)\s*$/i,
  pct:       /(\d+(?:[.,]\d+)?)\s*%/,
  skip:      /^(subtotal|total|tunai|cash|change|kembalian|kredit|debit|bayar|payment|grand|struk|nomor|kasir|kode\s+pesanan)/i,
  noise:     /^[-=*#_\s\\\/|.]{2,}$/,
  headerish: /^\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
}

function toNum(str) {
  return parseFloat(str.replace(/\s/g, '').replace(/\./g, '').replace(',', '.')) || 0
}

function feeResult(line, amountStr) {
  const pct = P.pct.exec(line)
  return pct
    ? { present: true, type: '%', amount: parseFloat(pct[1].replace(',', '.')) }
    : { present: true, type: 'nominal', amount: toNum(amountStr) }
}

function isJunkLine(line) {
  return !line || P.noise.test(line) || P.skip.test(line) || P.headerish.test(line) || line.length < 2
}

export function parseReceipt(rawText) {
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean)

  const result = {
    items: [],
    globalDiscount: { present: false },
    serviceCharge: { present: false },
    tax: { present: false },
  }

  let pendingName = null

  for (const line of lines) {
    let m

    if ((m = P.tax.exec(line))) {
      result.tax = feeResult(line, m[2])
      pendingName = null
      continue
    }

    if ((m = P.service.exec(line))) {
      result.serviceCharge = feeResult(line, m[2])
      pendingName = null
      continue
    }

    if ((m = P.discount.exec(line))) {
      result.globalDiscount = { present: true, type: 'nominal', amount: toNum(m[2]) }
      pendingName = null
      continue
    }

    if ((m = P.priceLine.exec(line))) {
      const qty = parseInt(m[1])
      const price = toNum(m[2])
      if (price > 0) {
        result.items.push({
          name: pendingName || 'Item',
          qty,
          price,
          discount: null,
        })
      }
      pendingName = null
      continue
    }

    if (!isJunkLine(line)) {
      pendingName = line
    }
  }

  return result
}
