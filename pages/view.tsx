import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Calendar from '../components/Calendar/Calendar'
import Header from '../components/Header/Header'
import { useRouter } from 'next/router'
import calculateLife from '../utils/calculateLife'
import { useEffect, useState } from 'react'

const ViewPage = () => {
  const router = useRouter()

  const [{ livedWeeks, totalWeeks }, setLifeInfo] = useState({ livedWeeks: 0, totalWeeks: 5000 })

  useEffect(
    function () {
      const dob = router.query?.dob as string
      if (!dob) router.replace('/')
      setLifeInfo(calculateLife({ dob }))
    },
    [router]
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
        <Box as="main" display="grid" justifyContent={{ md: 'center' }}>
          <Calendar livedWeeks={livedWeeks} totalWeeks={totalWeeks} />
        </Box>
      </Box>
    </>
  )
}

export default ViewPage
