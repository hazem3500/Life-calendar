import { Box, Button, Center, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import Header from '../components/Header/Header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    router.prefetch('/view')
  }, [router])

  function onSubmit(e) {
    e.preventDefault()
    const dob = e.target.elements.dob.value
    if (!dob) return
    setGenerating(true)
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

export default IndexPage
