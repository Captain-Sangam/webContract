/* Global Layout File */
import React from 'react'
import { Flex, Icon, IconButton, Image, Link, Text, Tooltip, useColorMode } from '@chakra-ui/react'
import LOGO from '../public/logo_icon.png'
import { FaWallet } from 'react-icons/fa'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Layout = ({ contract, head, chain, address, children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const handleAddress = () => {
    return address.slice(0, 6) + ("...")
  }

  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'space-between'}
      w={'100%'}
    >
      {head}

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
          >
            <Image
              src={LOGO.src}
              alt='logo epic-nfts'
              w={7}
              h={7}
            />
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
              chain == 1 || chain == 2
                ? chain == 1 
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

      {children}

    </Flex>
  )
}

export default Layout