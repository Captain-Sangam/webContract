/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ethers } from 'ethers'
import { Button, Flex, Text, Spinner, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Link, Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel } from '@chakra-ui/react'
import myEpicNft from '../utils/MyEpicNFT.json'
import Layout from '../components/Layout'

// > Our contract address that we display.
const CONTRACT_ADDRESS = '0x9B5541B01f725c7518Eb8C1a9E80AfA0cC99b7d9'
// > Our contract opening
const contractABI = myEpicNft.abi

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [loader, setLoader] = useState(false)
  const [newTokenId, setNewTokenId] = useState(null)
  const [currentAccount, setCurrentAccount] = useState('') // Almacenamos la billetera pública de nuestro usuario.
  const [chainId, setChainId] = useState(0)

  const checkIfChainIsCorrect = async () => {
    try {
      const { ethereum } = window
      // > We check if we are on the main network
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      const rinkebyChainId = '0x4'
      const mainbyChainId = '0x1'
      if (chainId == rinkebyChainId) {
        setChainId(1)
        console.log(chainId)
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

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      // > make sure we have access to window.ethereum
      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      // > check if we are authorized to access the user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
        setupEventListener()
        checkIfChainIsCorrect()
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(new Error(error))
    }
  }

  const setupEventListener = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer)
        connectedContract.on('NewEpicNFTMinted', (from, tokenId) => {
          setNewTokenId(tokenId.toNumber())
          onOpen()
          getCurrentTotalEpicNFTs()
          console.log(from, tokenId.toNumber())
        })
        console.log('Setup event listener!')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
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
      // > I listen to events! case when a user enters our site and connects his wallet for the first time.
      setupEventListener()
      // > network check
      checkIfChainIsCorrect()
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
        contract={CONTRACT_ADDRESS}
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
      <Layout
        contract={CONTRACT_ADDRESS}
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
              {"Decentralize the web"}
            </Text>

            <Accordion w={'100%'} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Text
                        as={'h2'}
                        fontSize={30}
                        fontWeight={'bold'}>
                        Create a flex
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text fontSize={20}>Totally cool write up </Text>
                  <Text fontSize={20}>about fluxes and why we need them to be inserted here</Text>
                  <Text fontSize={20}>to be inserted here</Text>

                  <Box align={'center'} >
                    <Button
                      mt={5}
                      p={4}
                      w={'30%'}
                      align={'center'}
                      fontWeight={'bold'}
                      letterSpacing={1}
                      borderRadius={'md'}
                      bgGradient={'linear(to-r, green.300, green.500)'}
                      color={'white'}
                      boxShadow={'2xl'}
                      _hover={{
                        opacity: currentAccount ? '.9' : '.2',
                        cursor: currentAccount ? 'pointer' : 'not-allowed'
                      }}
                      disabled={!currentAccount || loader || !chainId}
                    >
                      Create a Flux
                    </Button>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Text
                        as={'h2'}
                        fontSize={30}
                        fontWeight={'bold'}>
                        Talk to a smart contract
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text fontSize={20}>Talk to smart contract</Text>
                  <Text fontSize={20}>more info to be added </Text>
                  <Text fontSize={20}>Use this for moonbrids for now</Text>

                  <Box align={'center'} >
                    <Button
                      mt={5}
                      p={4}
                      w={'30%'}
                      fontWeight={'bold'}
                      letterSpacing={1}
                      borderRadius={'md'}
                      bgGradient={'linear(to-r, green.300, green.500)'}
                      color={'white'}
                      boxShadow={'2xl'}
                      _hover={{
                        opacity: currentAccount ? '.9' : '.2'
                      }}

                    >
                      Take me to the contract
                    </Button>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
      </Layout>
    )
  }
}
