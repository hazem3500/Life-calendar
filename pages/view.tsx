import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import calculateLife from '../utils/calculateLife'
import { useState } from 'react'
import YearsCounter from '../components/YearsCounter/YearsCounter'
import Footer from '../components/Footer/Footer'
import type { GetServerSideProps } from 'next'
import { parseCookies, savedDob } from '../utils/cookies'

const ViewPage = ({ dob }: { dob: string }) => {
  const [lifeInfo] = useState<{
    livedWeeks: number
    totalWeeks: number
  } | null>(() => calculateLife({ dob }))
  const { livedWeeks = 0, totalWeeks = 0 } = lifeInfo || {}

  return (
    <>
      <Head>
        <title>Life Calendar</title>
      </Head>
      <Box>
        <Box mt={20} mb={24}>
          <Header />
        </Box>
        <Box as="main" display="grid" justifyContent={{ xl: 'center' }} p={10} overflow="auto">
          <Calendar livedWeeks={livedWeeks} totalWeeks={totalWeeks} />
          <Box justifySelf="end" mt={4} pe={4} transform={{ xl: 'translateX(100%)' }}>
            <YearsCounter yearsLived={Math.floor(totalWeeks / 52)} />
          </Box>
        </Box>
        <Box mt={6}>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const fromQuery = typeof query?.dob === 'string' ? query.dob : null
  const dob = fromQuery || savedDob(parseCookies(req))
  if (!dob) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      dob,
    },
  }
}

export default ViewPage
