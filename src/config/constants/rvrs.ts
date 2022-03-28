const masterChef = '0xeEA71889c062c135014Ec34825a1958c87A2Ac61'

// mainnet
const rvrsUstAddr = '0xfc417a0368263140c59b7aab646d4a270c37d8cb'
const rvrsBnbAddr = '0x60e0d939d4b0c71918088278bcf600470a6c8f26'
const rvrsUstAddrV2 = '0xfc417a0368263140c59b7aab646d4a270c37d8cb'
const rvrsBnbAddrV2 = '0x60e0d939d4b0c71918088278bcf600470a6c8f26'
const rvrsAddr = '0xAe0E6F11f0decc8a59B51bc56e52421970B552dF'

// testnet
const rvrsBusdAddrTestnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' 
const rvrsBnbAddrTestnet = '0x31222d37568bd54be95ece3749f0559c45a85634' 
const rvrsBusdAddrV2Testnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5'
const rvrsBnbAddrV2Testnet = '0x31222d37568bd54be95ece3749f0559c45a85634'
const rvrsAddrTestnet = '0xF2f587fD8A423880037F39828d593d4cE1961A98'
const masterChefTestnet = '0xa385399B4dE3B5f01a31b0E753f32E18e526db8f' 

const pidrvrsUst = 0
const pidrvrsBnb = 2
const pidrvrs = 10
const pidBnbBusd = 1

const countBack = false
const countLength = 2

const xPerBlock = "rewardPerSecond" 
const pendingX = "pendingReward"

const fetchAutomatic = false;
const fetchPriceCustom = false;

const busdPosition = 0
const tokenPosition = 1

const unlockWalletButton = false;

const isFullyConfigured = true;
const showFarmInfoModal = true;

const rvrs = {
    addr: {
        rvrsUstAddr,
        rvrsBnbAddr,
        rvrsUstAddrV2,
        rvrsBnbAddrV2,
        rvrsAddr,
        masterChef,
        rvrsBusdAddrTestnet,
        rvrsBnbAddrTestnet,
        rvrsBusdAddrV2Testnet,
        rvrsBnbAddrV2Testnet,
        rvrsAddrTestnet,
        masterChefTestnet,
    },
    pids: {
        pidrvrsBnb,
        pidrvrsUst, 
        pidrvrs,
        pidBnbBusd,
        pidList: [
            pidrvrsUst,
            pidBnbBusd,
            pidrvrsBnb,
        ],
    },
    strings: {
        xPerBlock,
        pendingX
    },
    fetch: {
        fetchAutomatic,
        fetchPriceCustom
    },
    queryPosition: {
        busd: busdPosition,
        token: tokenPosition
    },
    isLocked: {
        unlockWalletButton
    },
    isFullyConfigured,
    showFarmInfoModal
}
 
export default rvrs;
