// Возвращает строку в виде: ?<Валюта> или <Число><Валюта>
const formatCurrency = (amount: number | null, currency: string): string => {
  if (!amount) {
    return `?${currency}`
  }
  const formattedAmount = new Intl.NumberFormat("ru-RU").format(amount)
  return `${formattedAmount}${currency}`
}

// Возвращает зарплату в виде: Неизвестно или <От><Валюта> - <До><Валюта>
const getSalary = (
  currency: string | null,
  salaryFrom: number | null,
  salaryTo: number | null
): string => {
  if (!currency) {
    return "Неизвестно"
  }

  const formattedSalaryFrom = formatCurrency(salaryFrom, currency)
  const formattedSalaryTo = formatCurrency(salaryTo, currency)

  return `${formattedSalaryFrom} - ${formattedSalaryTo}`
}

export default getSalary
