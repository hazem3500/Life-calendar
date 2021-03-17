import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import { useRouter } from 'next/router'
import calculateLife from '../utils/calculateLife'
import { useEffect, useState } from 'react'
import YearsCounter from '../components/YearsCounter/YearsCounter'
import Footer from '../components/Footer/Footer'

const ViewPage = ({ dob }) => {
  const router = useRouter()

  const [lifeInfo] = useState<{
    livedWeeks: number
    totalWeeks: number
  } | null>(() => calculateLife({ dob }))
  const { livedWeeks = 0, totalWeeks = 0 } = lifeInfo || {}

  useEffect(
    function () {
      if (!dob) {
        router.replace('/')
      }
    },
    [router, dob]
  )
  return (
    <>
      <Head>
        <title>Life Calendar</title>
      </Head>
      <Box>
        <Box mt={20} mb={24}>
          <Header />
        </Box>
        <Box as="main" display="grid" justifyContent={{ '2xl': 'center' }} p={10} overflow="auto">
          <Calendar livedWeeks={livedWeeks} totalWeeks={totalWeeks} />
          <Box justifySelf="end" mt={4} pe={4} transform={{ xl: 'translateX(100%)' }}>
            <YearsCounter yearsLived={Math.floor(totalWeeks / 52)} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  )
}

ViewPage.getInitialProps = async ({ query }) => {
  return { dob: query?.dob }
}

export default ViewPage
