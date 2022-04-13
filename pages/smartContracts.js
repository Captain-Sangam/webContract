import { useEffect, useState } from 'react'

import { useRouter } from 'next/router';

import { Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, InputGroup, InputLeftAddon, InputRightAddon, Input, Stack, Container, VStack, Center, Button, Flex, Text, useToast, Wrap, WrapItem, Grid, GridItem, Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, SimpleGrid, Heading } from '@chakra-ui/react'

import Layout from '../components/Layout'
import WalletConnectionPrompter from '../components/connectWallet'

import styles from '../styles/Home.module.css'
import { SettingsAccessibility } from '@mui/icons-material';

function talkToSmartContracts() {
    const router = useRouter()
    const [currentAccount, setCurrentAccount] = useState('')
    const [abi, setAbi] = useState('')
    const [showMe, setShowMe] = useState(false);
    const CheckLogin = async () => {
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        if (accounts.length !== 0) { setCurrentAccount(true) } else { setCurrentAccount(false) }
    }

    const [readFunctions, setReadFunctions] = useState([])
    const [writeFunctions, setWriteFunctions] = useState([])

    const connectWallet = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                alert('Get MetaMask!')
                return
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(new Error(error))
        }
    }

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

        const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
        const chainURL = await fetchAbiURL()
        const AbiURL = chainURL + contractAddress + "&apikey=" + API_KEY
        const response_ABI = await fetch(AbiURL)
        const abi = await response_ABI.json()
        setAbi(abi)
        return abi['result']
    }

    const processFunctions = async (abi) => {
        const abiResponse = JSON.parse(abi)
        for (var i = 0; i < abiResponse.length; i++) {
            const currentFunctions = abiResponse[i]
            if (currentFunctions['type'] == 'function') {
                if (currentFunctions['stateMutability'] == 'view') {
                    setReadFunctions(readFunctions => readFunctions.concat(JSON.stringify(currentFunctions)))
                }
                else {
                    if(currentFunctions['payable']){
                        currentFunctions['inputs']=[{'name': currentFunctions['name'], "type": "uint256"}]
                    }
                    setWriteFunctions(writeFunctions => writeFunctions.concat(JSON.stringify(currentFunctions)))
                }
            }
        }
    }

    const handleClick = async (event) => {
        setShowMe(false)
        event.preventDefault();
        const contractAddress = event.target.contract_address.value
        const abiResponse = await fetchABI(contractAddress)
        let abiTextArea = document.getElementById('abi_text_area');
        abiTextArea.value = abiResponse
        processFunctions(abiResponse)
        setShowMe(true)
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
                <Heading align="center">
                    Talk to a Smart Contract
                </Heading>
                <form className="flex flex-col" onSubmit={handleClick}>
                    <Box mt={8}>
                        <InputGroup>
                            <InputLeftAddon children='Contact Address' />
                            <Input placeholder='Enter the address of smart contract here' id='contract_address' />
                        </InputGroup>
                    </Box>
                    <Box align="right" mt={2} >
                        <Button type="submit" >Load Contract
                        </Button>
                    </Box>
                </form>
                <div id="contract_functions" style={{ display: showMe ? "block" : "none" }}>
                    <Box mt={2} color='gray.500'>
                        <InputGroup>
                            <Textarea id="abi_text_area" >
                            </Textarea>
                        </InputGroup>
                    </Box>
                    <Tabs isFitted variant='enclosed' w={'100%'} mt={5} >
                        <TabList mb='1em'>
                            <Tab>Read Contract</Tab>
                            <Tab>Write Contract</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Accordion allowToggle>
                                    {
                                        readFunctions.map((functions) => {
                                            return (
                                                <AccordionItem>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'>
                                                                {JSON.parse(functions).name}
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
                                                        <form>
                                                            <Box mt={8}>
                                                                <InputGroup>
                                                                    <Input placeholder={JSON.parse(functions).name} id={JSON.parse(functions).name} />
                                                                </InputGroup>
                                                            </Box>
                                                            <Box align="right" mt={2} >
                                                                <Button type="submit" >Get Details
                                                                </Button>
                                                            </Box>
                                                        </form>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            )
                                        })
                                    }
                                </Accordion>
                            </TabPanel>
                            <TabPanel>
                                <Accordion allowToggle>
                                    {
                                        writeFunctions.map((functions) => {
                                            return (
                                                <AccordionItem>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'>
                                                                {JSON.parse(functions).name}
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
                                                        <form>
                                                            <Box mt={8}>
                                                                {JSON.parse(functions).inputs.map((inputs) => {
                                                                    return (
                                                                        <InputGroup mt={2} >
                                                                            <InputLeftAddon children={inputs.name} />
                                                                            <Input placeholder={inputs.type} />
                                                                        </InputGroup>
                                                                    )
                                                                })}
                                                            </Box>
                                                            <Box align="right" mt={2} >
                                                                <Button type="submit" >Get Details
                                                                </Button>
                                                            </Box>
                                                        </form>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            )
                                        })
                                    }
                                </Accordion>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div >
        )
    }
}


export default talkToSmartContracts
