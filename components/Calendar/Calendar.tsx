import { Box, Grid, Text, Tooltip } from '@chakra-ui/react'
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
  return iterate(53, (i) => (
    <Text key={i} fontWeight="semibold">
      {i === 0 ? null : i}
    </Text>
  ))
}

function WeeksWithRowLabels({ totalWeeks, livedWeeks }) {
  return iterate(totalWeeks, (i) => (
    <React.Fragment key={i}>
      {i % 52 === 0 && <Text fontWeight="semibold">{Math.floor(i / 52)}</Text>}
      <Tooltip label={`week ${i + 1}`} openDelay={500}>
        <Box>
          <Week lived={i < livedWeeks} />
        </Box>
      </Tooltip>
    </React.Fragment>
  ))
}

export default Calendar
