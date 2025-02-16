const declineVacancy = (num: number): string => {
  if (num % 10 === 1 && num % 100 !== 11) {
    return "вакансии"
  }

  if (num % 10 == 1 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return "вакансии"
  }

  return "вакансий"
}

export default declineVacancy
