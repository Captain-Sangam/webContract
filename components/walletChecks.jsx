import { ethers } from 'ethers'
import { func } from 'prop-types'

const networkCheck = function(){
    let chainId = null
    async () => {
        try {
            const { ethereum } = window
            // > We check if we are on the main network
            chainId = await ethereum.request({ method: 'eth_chainId' })
            const rinkebyChainId = '0x4'
            const mainbyChainId = '0x1'
            if (chainId == rinkebyChainId) {
                chainId = 1
            } else if (chainId == mainbyChainId) {
                chainId = 2
            }
            else {
                chainId = 0
            }
        } catch (error) {
            console.log(new Error(error))
        }
    }
    return chainId
}

function WalletConnectionCheck() {
    async () => {
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
                networkCheck()
            } else {
                console.log('No authorized account found')
            }
        } catch (error) {
            console.log(new Error(error))
        }
    }
}

const WalletConnection = function(){
    async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                alert('Get MetaMask!')
                return
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            const chainID = networkCheck()
            console.log("Account ID - ", accounts)
            console.log("Chain ID - ", chainID)
            return [accounts[0], chainID]
        } catch (error) {
            console.log(new Error(error))
        }
    }
}

export default { WalletConnection }
