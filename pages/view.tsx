import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import { useRouter } from 'next/router'
import calculateLife from '../utils/calculateLife'
import { useEffect } from 'react'
import YearsCounter from '../components/YearsCounter/YearsCounter'
import Footer from '../components/Footer/Footer'
import useLocalStorage from '../utils/useLocalStorage'

const ViewPage = () => {
  const router = useRouter()

  const [lifeInfo, setLifeInfo] = useLocalStorage<{
    livedWeeks: number
    totalWeeks: number
  } | null>('life-info', null)
  const { livedWeeks = 0, totalWeeks = 0 } = lifeInfo || {}

  useEffect(
    function () {
      if (router.isReady) {
        const dob = router?.query?.dob as string
        if (!dob) router.replace('/')
        setLifeInfo(calculateLife({ dob }))
      }
    },
    [router, setLifeInfo]
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
        <Box as="main" display="grid" justifyContent={{ xl: 'center' }} p={10} overflow="auto">
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

export default ViewPage
