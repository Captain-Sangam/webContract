import { useEffect, useState } from 'react'

import Link from 'next/link'
import {useRouter} from 'next/router';

import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Flex, Text, Box } from '@chakra-ui/react'

import Layout from '../components/Layout'
import WalletConnectionPrompter from '../components/connectWallet'


export default function Home() {

  const router = useRouter()
  const [currentAccount, setCurrentAccount] = useState('')

  const CheckLogin = async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length !== 0) { setCurrentAccount(true) } else { setCurrentAccount(false) }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
      checkIfChainIsCorrect()
      reRoute()
    } catch (error) {
      console.log(new Error(error))
    }
  }

  useEffect(() => {
    CheckLogin()
  }, [])

  if (!currentAccount) {
    return (
      <div>
        <Layout route={router.pathname} />
        <WalletConnectionPrompter connectWallet={connectWallet} />
      </div>
    )
  }
  else {
    return (
      <div>
        <Layout route={router.pathname} />
        <Flex align={'center'} justify={'flex-start'} direction={'column'} w={'100%'} py={100} >
          <Flex align={'center'} justify={'center'} direction={'column'} w={'50%'} >

            <Text as='h3' my={5} fontSize={'5xl'} fontWeight={600} letterSpacing={'.5px'}>
              Stratergize and Automate
            </Text>

            <Text id='top' as='h1' fontSize={'3xl'} fontWeight={900} letterSpacing={'1px'}>
              Decentralize the web
            </Text>

            <Tabs isFitted variant='enclosed' w={'100%'} mt={5}>
              <TabList mb='1em'>
                <Tab>Create a flex</Tab>
                <Tab>Talk to a smart contract</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text fontSize={20}>Totally cool write up </Text>
                  <Text fontSize={20}>about WebContracts and why we need them to be inserted here</Text>
                  <Text fontSize={20}>to be inserted here</Text>

                  <Box align={'center'} >
                    <Button mt={5} p={4} w={'30%'}
                      align={'center'} fontWeight={'bold'} letterSpacing={1} borderRadius={'md'} bgGradient={'linear(to-r, green.300, green.500)'}
                      color={'white'} boxShadow={'2xl'}
                      _hover={{
                        opacity: currentAccount ? '.9' : '.2',
                        cursor: currentAccount ? 'pointer' : 'not-allowed'
                      }}
                      disabled={true}>
                      Create a WebContract
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Text fontSize={20}>Talk to smart contract</Text>
                  <Text fontSize={20}>more info to be added </Text>
                  <Text fontSize={20}>Use this for moonbrids for now</Text>
                  <Box align={'center'} >
                    <Link passHref href="/smartContracts">
                      <Button mt={5} p={4} w={'30%'}
                        fontWeight={'bold'} letterSpacing={1} borderRadius={'md'} bgGradient={'linear(to-r, green.300, green.500)'}
                        color={'white'} boxShadow={'2xl'}
                        _hover={{
                          opacity: currentAccount ? '.9' : '.2'
                        }}
                        disabled={false}>
                        Take me to the contract
                      </Button>
                    </Link>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </div>
    )
  }
}
