import { afterEach, describe, expect, it, vi } from 'vitest'
import calculateLife from './calculateLife'

describe('calculateLife', () => {
  afterEach(() => vi.useRealTimers())

  it('counts 90 years of 52 weeks by default', () => {
    expect(calculateLife({ dob: '2000-01-01' }).totalWeeks).toBe(90 * 52)
  })

  it('counts the weeks lived since the birthday', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2010-01-01T00:00:00Z'))
    // 10 years ≈ 520 weeks (365.24-day years, rounded down)
    expect(calculateLife({ dob: '2000-01-01' }).livedWeeks).toBe(520)
  })

  it('honours a custom life expectancy', () => {
    expect(calculateLife({ dob: '2000-01-01', lifeExpectancy: 80 }).totalWeeks).toBe(80 * 52)
  })
})
