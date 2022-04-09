import { useEffect, useState } from 'react'

import Link from 'next/link'
import {useRouter} from 'next/router';

import { Textarea, InputGroup, InputLeftAddon, InputRightAddon, Input, Stack, Container, VStack, Center, Button, Flex, Text, useToast, Wrap, WrapItem, Grid, GridItem, AccordionButton, AccordionIcon, Box, AccordionPanel, SimpleGrid, Heading } from '@chakra-ui/react'

import Layout from '../components/Layout'
import WalletConnectionPrompter from '../components/connectWallet'

import styles from '../styles/Home.module.css'

function talkToSmartContracts() {
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
            <div className={styles.container}>
                <Layout route={router.pathname} />
                <Heading className={styles.main}>
                    Talk to a Smart Contract
                </Heading>

            </div >
        )
    }
}

export default talkToSmartContracts
