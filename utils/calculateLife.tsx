type calculateLifeParams = {
  dob: string
  /** @default 90 */
  lifeExpectancy?: number
}

function calculateLife({ dob, lifeExpectancy = 90 }: calculateLifeParams) {
  const now = new Date()
  const birthDate = new Date(dob)
  const livedWeeks = Math.round((now.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
  const totalWeeks = Math.round(lifeExpectancy) * 52

  return { livedWeeks, totalWeeks }
}

export default calculateLife
