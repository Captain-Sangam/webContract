import { useEffect, useState } from 'react'
import { Textarea, InputGroup, InputLeftAddon, InputRightAddon, Input, Stack, Container, VStack, Center, Button, Flex, Text, useToast, Wrap, WrapItem, Grid, GridItem, AccordionButton, AccordionIcon, Box, AccordionPanel, SimpleGrid, Heading } from '@chakra-ui/react'

function test(){

    const fetchAbiURL = async () => {

        const chainId = await ethereum.request({ method: 'eth_chainId' })

        const rinkebyChainId = '0x4'
        const mainbyChainId = '0x1'

        const rinkebyChainURL = "https://api-rinkeby.etherscan.io"
        const mainbyChainURL = "https://api.etherscan.io"

        const chainSuffix = "/api?module=contract&action=getabi&address="

        try {
            if (chainId == rinkebyChainId) {
                return (rinkebyChainURL + chainSuffix)
            } else if (chainId == mainbyChainId) {
                return (mainbyChainURL + chainSuffix)
            }
            else {
                toast({
                    title: 'Metamask network',
                    description: 'Not on a supported network. Please switch to Rinkbey or Ethereum Main Network',
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
                return null
            }
        } catch (error) {
            console.log(new Error(error))
            return null
        }
    }

    const fetchABI = async (contractAddress) => {

        //const API_KEY = process.env.ETHERSCAN_API_KEY
        const API_KEY = "ENY13TTYWK9C24EN7NYX1WM3C3B2AEK89A"
        const chainURL = await fetchAbiURL()
        const AbiURL = chainURL + contractAddress + "&apikey=" + API_KEY
        const response_ABI = await fetch(AbiURL)
        const abi = await response_ABI.json()
        return abi['result']
    }

    const handleClick = async (event) => {
        event.preventDefault();
        const contractAddress = '0xe9797E135Cf0811E7D33Cc5e53bd4B866BF3efC9'
        const abiResponse = await fetchABI(contractAddress)
        for (var key of Object.keys(abiResponse)) {
            console.log(key + " -> " + abiResponse[key])
        }
        console.log(abiResponse)
    };


    return(
        <div>
            <Button onClick={handleClick}>Test</Button>
        </div>
    )
}

export default test
