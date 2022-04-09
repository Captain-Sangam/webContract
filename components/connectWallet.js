import { React } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'

const WalletConnectionPrompter = ({connectWallet}) => {
    return (
        <div>
            <Flex align={'center'} justify={'flex-start'} direction={'column'} w={'100%'} py={100} >
                <Flex align={'center'} justify={'center'} direction={'column'} w={'50%'} >

                    <Text as='h3' my={5} fontSize={'5xl'} fontWeight={600} letterSpacing={'.5px'}>
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
                    <Button
                        mt={10}
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
                    >
                        {'Connect your Wallet'}
                    </Button>
                </Flex>
            </Flex>
        </div>
    )
}

export default WalletConnectionPrompter