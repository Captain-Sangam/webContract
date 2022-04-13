/* Global Layout File */
import { React, useEffect, useState } from 'react'
import Head from 'next/head'
import { Flex, Icon, IconButton, Image, Link, Text, Tooltip, useColorMode, useToast } from '@chakra-ui/react'
import LOGO from '../public/logo_icon.png'
import { FaWallet } from 'react-icons/fa'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Layout = () => {
  const { colorMode, toggleColorMode } = useColorMode()

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
        sessionStorage.setItem('check', "check")
        sessionStorage.setItem('account', account)
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

  const handleAddress = () => {
    return currentAccount.slice(0, 6) + ("...")
  }

  return (
    <div>
      <Flex
        direction={'column'}
        align={'center'}
        justify={'space-between'}
        w={'100%'}
      >
        {
          <Head>
            <title>Iterflow</title>
            <meta name="description" content="Automtate your journey" />
            <link rel="shortcut icon" type="image/x-icon" href="logo_icon.png"></link>
          </Head>
        }

        <Flex
          align={'center'}
          justify={'space-between'}
          w={'100%'}
          p={5}
          px={20}
        >
          <Flex
            w={'50%'}
          >
            <Flex
              align={'center'}
              justify={'space-between'}
              marginRight={10}
            ><Link href="/">
                <Image
                  src={LOGO.src}
                  alt='logo iterflow'
                  w={7}
                  h={7}
                /></Link>
              <Text
                paddingLeft={5}
                fontSize={20}
                fontWeight={'bold'}
                letterSpacing={1}
              >Iterflow</Text>
            </Flex>


          </Flex>

          <Flex
            width={'50%'}
            flexDirection={'row'}
            justifyContent={'flex-end'}
            align={'center'}
          >
            <Text>
              {
                chainId == 1 || chainId == 2
                  ? chainId == 1
                    ? <Text color={'green.600'}>Connected to Rinkeby</Text>
                    : <Text color={'green.600'}>Connected to Mainnet</Text>
                  : <Text color={'red.600'}>Unsupported network detected</Text>
              }

            </Text>
          </Flex>

          <Text px={'5'}>|</Text>

          <Flex
            align={'center'}
            justify={'space-between'}
          >
            <Icon as={FaWallet} w={5} h={5} />
            <Text px={3}>{handleAddress()}</Text>
          </Flex>

          <Tooltip hasArrow label={'Change theme'} bg={'gray.900'} color={'white'}>
            <IconButton
              mx={5}
              _hover={{
                cursor: 'pointer',
                color: 'green.100'
              }}
              onClick={toggleColorMode}
              icon={
                colorMode === 'light'
                  ? <MoonIcon w={5} h={5} />
                  : <SunIcon w={5} h={5} />
              }
            />
          </Tooltip>
        </Flex>
      </Flex>
    </div>
  )
}

export default Layout