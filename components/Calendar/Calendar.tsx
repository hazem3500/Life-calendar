import { Box, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import { iterate } from '../../utils/iterate'
import LabelWithArrow from '../LabelWithArrow/LabelWithArrow'
import Week from '../Week/Week'

type CalendarProps = {
  totalWeeks: number
  livedWeeks: number
}

function Calendar({ livedWeeks, totalWeeks }: CalendarProps) {
  return (
    <CalendarGrid>
      <WeeksOfYearLabel />
      <YearsOfYourLifeLabel />
      <WeeksWithLabels totalWeeks={totalWeeks} livedWeeks={livedWeeks} />
    </CalendarGrid>
  )
}

function CalendarGrid({ children }) {
  return (
    <Grid
      display="inline-grid"
      templateColumns="repeat(53, 20px)"
      gap={1}
      justifyItems="center"
      justifyContent="center"
      alignItems="center"
      position="relative"
      pe={{ base: 6, xl: 0 }}
    >
      {children}
    </Grid>
  )
}

function WeeksOfYearLabel() {
  return (
    <Box position="absolute" top="-4px" left={6} transform="translateY(-100%)">
      <LabelWithArrow>WEEKS OF THE YEAR</LabelWithArrow>
    </Box>
  )
}
function YearsOfYourLifeLabel() {
  return (
    <Box
      position="absolute"
      top="0"
      left="-4px"
      transform="translateX(-100%) rotate(-90deg)"
      transformOrigin="100% 100%"
    >
      <LabelWithArrow arrowDirection="start">YEARS OF YOUR LIFE</LabelWithArrow>
    </Box>
  )
}

function WeeksWithLabels({ totalWeeks, livedWeeks }) {
  return (
    <>
      <ColumnLabels />
      <WeeksWithRowLabels totalWeeks={totalWeeks} livedWeeks={livedWeeks} />
    </>
  )
}

function ColumnLabels() {
  return (
    <>
      {iterate(53, (i) => (
        <Text key={i} whiteSpace="nowrap" fontWeight="semibold">
          {i === 0 ? null : i}
        </Text>
      ))}
    </>
  )
}

function WeeksWithRowLabels({ totalWeeks, livedWeeks }) {
  return (
    <>
      {iterate(totalWeeks, (i) => (
        <React.Fragment key={i}>
          {i % 52 === 0 && (
            <p
              style={{
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {Math.floor(i / 52)}
            </p>
          )}
          <div title={`week ${i + 1}`}>
            <Week lived={i < livedWeeks} />
          </div>
        </React.Fragment>
      ))}
    </>
  )
}

export default Calendar
