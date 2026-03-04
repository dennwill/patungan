import { defineStore } from 'pinia'

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    itemsList: [
      {
        name: '',
        price: null,
        qty: 1,
        sharedBy: [],
      },
    ],
    fees: {
      isSC: false,
      typeSC: '%',
      amountSC: 10,
      isPBJT: false,
      typePBJT: '%',
      amountPBJT: 11,
    },
  }),
  actions: {
    addNewRow() {
      this.itemsList.push({
        name: '',
        price: null,
        qty: 1,
        sharedBy: [],
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

      // 1. Calculate the base food costs per person
      state.itemsList.forEach((item) => {
        const participantCount = item.sharedBy?.length || 0
        if (participantCount > 0) {
          const totalCost = (item.price || 0) * (item.qty || 1)
          grandSubtotal += totalCost
          const splitAmount = totalCost / participantCount

          item.sharedBy.forEach((person) => {
            if (!summary[person]) {
              summary[person] = { subtotal: 0, items: [], totalFees: 0, grandTotal: 0 }
            }
            summary[person].subtotal += splitAmount
            summary[person].items.push({ name: item.name || 'Unnamed', cost: splitAmount })
          })
        }
      })

      // 2. Calculate Total Global Fees
      let totalSC = 0
      if (state.fees.isSC) {
        totalSC =
          state.fees.typeSC === '%'
            ? grandSubtotal * (state.fees.amountSC / 100)
            : state.fees.amountSC
      }

      let totalPBJT = 0
      if (state.fees.isPBJT) {
        // Standard Indo Tax: Applied to (Subtotal + Service Charge)
        const baseForTax = grandSubtotal + totalSC
        totalPBJT =
          state.fees.typePBJT === '%'
            ? baseForTax * (state.fees.amountPBJT / 100)
            : state.fees.amountPBJT
      }

      const totalCombinedFees = totalSC + totalPBJT

      // 3. Distribute Fees Proportionally
      for (const person in summary) {
        const personShareRatio = grandSubtotal > 0 ? summary[person].subtotal / grandSubtotal : 0

        summary[person].totalFees = personShareRatio * totalCombinedFees
        summary[person].grandTotal = summary[person].subtotal + summary[person].totalFees
      }

      return summary
    },
  },
})
