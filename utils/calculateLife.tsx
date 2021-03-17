type calculateLifeParams = {
  dob: string
  /** @default 90 */
  lifeExpectancy?: number
}

function calculateLife({ dob, lifeExpectancy = 90 }: calculateLifeParams) {
  const now = new Date()
  const birthDate = new Date(dob)

  const diff = now.getTime() - birthDate.getTime()
  const daysLived = diff / 864e5
  const yearsLived = daysLived / 365.24
  const livedWeeks = Math.floor(yearsLived * 52)

  const totalWeeks = Math.round(lifeExpectancy) * 52

  return { livedWeeks, totalWeeks }
}

export default calculateLife
