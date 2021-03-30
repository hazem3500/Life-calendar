import { Box, Button, Center, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import Header from '../components/Header/Header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { usePlausible } from 'next-plausible'
import { parseCookies } from '../utils/cookies'

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Life Calendar</title>
      </Head>
      <Box display="flex" flexDirection="column" minH="100vh">
        <Box position="fixed" top={20} left="0" right="0">
          <Header />
        </Box>
        <Center as="main" flex={1}>
          <UserInfoForm />
        </Center>
      </Box>
    </>
  )
}

function UserInfoForm() {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [, setCookie] = useCookies(['lifeInfo'])
  const plausible = usePlausible()

  useEffect(() => {
    router.prefetch('/view')
  }, [router])

  function onSubmit(e) {
    e.preventDefault()
    const dob = e.target.elements.dob.value
    if (!dob) return
    setGenerating(true)
    setCookie('lifeInfo', JSON.stringify({ dob }), {
      path: '/',
      sameSite: true,
      maxAge: 60 * 60 * 24 * 30 * 12 * 200,
    })
    plausible('life-calendar-generated', {
      props: {
        dob,
      },
    })
    router.replace({
      pathname: '/view',
      query: {
        dob,
      },
    })
  }
  return (
    <Stack as="form" spacing={4} onSubmit={onSubmit}>
      <FormControl>
        <FormLabel fontSize="x-large">Your birthday</FormLabel>
        <Input name="dob" size="lg" type="date" />
      </FormControl>
      <Button type="submit" size="lg" colorScheme="black" variant="solid" isLoading={generating}>
        GENERATE LIFE CALENDAR
      </Button>
    </Stack>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req)
  if (cookies?.lifeInfo) {
    const lifeInfo = JSON.parse(cookies.lifeInfo)
    return {
      redirect: {
        destination: `/view?dob=${lifeInfo.dob}`,
      },
    }
  }
  return { props: {} }
}

export default IndexPage
