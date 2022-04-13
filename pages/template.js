import { useEffect, useState } from 'react'

import { useRouter } from 'next/router';

import { Heading } from '@chakra-ui/react'

import Layout from '../components/Layout'
import WalletConnectionPrompter from '../components/connectWallet'

import styles from '../styles/Home.module.css'

function Template() {
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
                <Heading align="center">
                    Talk to a Smart Contract
                </Heading>
            </div >
        )
    }
}


export default Template
