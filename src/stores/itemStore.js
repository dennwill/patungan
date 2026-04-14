import { defineStore } from 'pinia'

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    itemsList: [
      {
        name: '',
        price: null,
        qty: 1,
        sharedBy: [],
        discount: null,
      },
    ],
    fees: {
      isSC: false,
      typeSC: '%',
      amountSC: 10,
      isPBJT: false,
      typePBJT: '%',
      amountPBJT: 11,
      isGlobalDiscount: false,
      typeGlobalDiscount: '%',
      amountGlobalDiscount: 0,
    },
  }),
  actions: {
    addNewRow() {
      this.itemsList.push({
        name: '',
        price: null,
        qty: 1,
        sharedBy: [],
        discount: null,
      })
    },
    removeRow(index) {
      this.itemsList.splice(index, 1)
    },
  },
  getters: {
    personSummary: (state) => {
      const summary = {}
      let grandSubtotal = 0

      // Step 1: Calculate discounted base food costs per person
      state.itemsList.forEach((item) => {
        const participantCount = item.sharedBy?.length || 0
        if (participantCount > 0) {
          const totalPrice = (item.price || 0) * (item.qty || 1)
          const discountAmount = item.discount || 0
          const baseCost = Math.max(0, totalPrice - discountAmount)

          grandSubtotal += baseCost
          const splitAmount = baseCost / participantCount

          item.sharedBy.forEach((person) => {
            if (!summary[person]) {
              summary[person] = {
                subtotal: 0,
                items: [],
                totalDiscount: 0,
                totalFees: 0,
                grandTotal: 0,
              }
            }
            summary[person].subtotal += splitAmount
            summary[person].items.push({ name: item.name || 'Unnamed', cost: splitAmount })
          })
        }
      })

      // Step 2: Calculate total Global Discount
      let totalGlobalDiscount = 0
      if (state.fees.isGlobalDiscount) {
        totalGlobalDiscount =
          state.fees.typeGlobalDiscount === '%'
            ? grandSubtotal * (state.fees.amountGlobalDiscount / 100)
            : state.fees.amountGlobalDiscount
      }

      // Calculate Total Service Charge
      let totalSC = 0
      if (state.fees.isSC) {
        totalSC =
          state.fees.typeSC === '%'
            ? grandSubtotal * (state.fees.amountSC / 100)
            : state.fees.amountSC
      }

      // Calculate Total Tax (applied to grandSubtotal + SC)
      let totalPBJT = 0
      if (state.fees.isPBJT) {
        const baseForTax = grandSubtotal + totalSC
        totalPBJT =
          state.fees.typePBJT === '%'
            ? baseForTax * (state.fees.amountPBJT / 100)
            : state.fees.amountPBJT
      }

      const totalCombinedFees = totalSC + totalPBJT

      // Step 3 & 4: Distribute Global Discount and Fees Proportionally
      for (const person in summary) {
        const personShareRatio = grandSubtotal > 0 ? summary[person].subtotal / grandSubtotal : 0

        summary[person].totalDiscount = personShareRatio * totalGlobalDiscount
        summary[person].totalFees = personShareRatio * totalCombinedFees

        // grandTotal = subtotal - proportional global discount + proportional fees
        summary[person].grandTotal =
          summary[person].subtotal - summary[person].totalDiscount + summary[person].totalFees
      }

      return summary
    },
  },
})
