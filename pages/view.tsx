import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import calculateLife from '../utils/calculateLife'
import { useState } from 'react'
import YearsCounter from '../components/YearsCounter/YearsCounter'
import Footer from '../components/Footer/Footer'
import { parseCookies } from '../utils/cookies'

const ViewPage = ({ dob }) => {
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

export async function getServerSideProps({ req, query }) {
  const cookies = parseCookies(req)
  const dob = query?.dob || JSON.parse(cookies?.lifeInfo)?.dob
  if (!dob) {
    return {
      redirect: {
        destination: `/`,
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
