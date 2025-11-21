function rupiahFormat(valuation) {
  return valuation.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

module.exports = rupiahFormat