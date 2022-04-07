import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Textarea, InputGroup, InputLeftAddon, InputRightAddon, Input, Stack, Container, VStack, Center, Button, Flex, Text, useToast, Wrap, WrapItem, Grid, GridItem, AccordionButton, AccordionIcon, Box, AccordionPanel, SimpleGrid, Heading } from '@chakra-ui/react'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

function talkToSmartContracts() {
    const [currentAccount, setCurrentAccount] = useState('')
    const [chainId, setChainId] = useState(0)
    const toast = useToast()

    const checkIfChainIsCorrect = async () => {
        try {
            const { ethereum } = window
            const chainId = await ethereum.request({ method: 'eth_chainId' })
            const rinkebyChainId = '0x4'
            const mainbyChainId = '0x1'
            if (chainId == rinkebyChainId) {
                setChainId(1)
            } else if (chainId == mainbyChainId) {
                setChainId(2)
            }
            else {
                setChainId(0)
                toast({
                    title: 'Metamask network',
                    description: 'Not on a supported network. Please switch to Rinkbey or Ethereum Main Network',
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            }
        } catch (error) {
            console.log(new Error(error))
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                alert('Get MetaMask!')
                return
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            console.log('Connected', accounts[0])
            setCurrentAccount(accounts[0])
            checkIfChainIsCorrect()
        } catch (error) {
            console.log(new Error(error))
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                console.log('Make sure you have metamask!')
                return
            } else {
                console.log('We have the ethereum object', ethereum)
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' })

            if (accounts.length !== 0) {
                const account = accounts[0]
                console.log('Found an authorized account:', account)
                setCurrentAccount(account)
                checkIfChainIsCorrect()
            } else {
                console.log('No authorized account found')
            }
        } catch (error) {
            console.log(new Error(error))
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    if (!currentAccount) {
        return (
            <Layout
                chain={chainId}
                address={currentAccount}
                head={
                    <Head>
                        <title>Iterflow</title>
                        <meta name="description" content="Testing opensea-js" />
                        <link rel="shortcut icon" type="image/x-icon" href="logo_icon.png"></link>
                    </Head>
                }
            >
                <Flex
                    align={'center'}
                    justify={'flex-start'}
                    direction={'column'}
                    w={'100%'}
                    py={100}
                >

                    <Flex
                        align={'center'}
                        justify={'center'}
                        direction={'column'}
                        w={'50%'}
                    >

                        <Text
                            as='h3'
                            my={5}
                            fontSize={'5xl'}
                            fontWeight={600}
                            letterSpacing={'.5px'}
                        >
                            Stratergize and Automate
                        </Text>

                        <Text
                            id='top'
                            as='h1'
                            fontSize={'3xl'}
                            fontWeight={900}
                            letterSpacing={'1px'}
                        >
                            {"Connect your metamask to unlock awesomeness"}
                        </Text>
                        <Text
                            id='top'
                            as='h1'
                            fontSize={'xl'}
                            fontWeight={900}
                            letterSpacing={'1px'}
                        >
                            {"We currently support Rinkbey and Ethereum Main net"}
                        </Text>

                        {/* Connect wallet */}
                        {!currentAccount && (
                            <Button
                                mt={10}
                                w={'30%'}
                                letterSpacing={1}
                                borderRadius={'md'}
                                bg={'gray.600'}
                                color={'white'}
                                boxShadow={'2xl'}
                                _hover={{
                                    opacity: '.9',
                                    cursor: 'pointer'
                                }}
                                onClick={connectWallet}
                                disabled={currentAccount}
                            >
                                {'Connect your Wallet'}
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </Layout>
        )

    }
    else {
        return (
            <div className={styles.container}>
                <Layout
                    chain={chainId}
                    address={currentAccount}
                    head={
                        <Head>
                            <title>Iterflow</title>
                            <meta name="description" content="Testing opensea-js" />
                            <link rel="shortcut icon" type="image/x-icon" href="logo_icon.png"></link>
                        </Head>
                    }
                ></Layout>
                <Heading className={styles.main}>
                    Talk to a Smart Contract
                </Heading>

            </div >
        )
    }
}

export default talkToSmartContracts
