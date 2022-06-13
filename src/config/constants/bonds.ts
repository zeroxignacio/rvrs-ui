import { QuoteToken, Pool2Config } from './types'

const UST_ADDRESS = '0x224e64ec1BDce3870a6a6c777eDd450454068FEC'
const JEWEL_ADDRESS = '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F'

const pools2: Pool2Config[] = [
  /*
    {
        sousId: 1,
        tokenName: 'UST',
        quoteTokenSymbol: QuoteToken.UST,
        stakingTokenName: QuoteToken.UST,
        stakingTokenAddress: '0x224e64ec1BDce3870a6a6c777eDd450454068FEC',
        quoteTokenPoolAddress: '0x224e64ec1BDce3870a6a6c777eDd450454068FEC',
        tokenPoolAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
        contractAddress: {
            1666700000: '0xA144063168d7d08B61D1870eC1AA1030Cb9fC4E8',
            1666600000: '0xA144063168d7d08B61D1870eC1AA1030Cb9fC4E8',
        },
        
        harvest: true,
        tokenPerBlock: '0.3',
        sortOrder: 115,
        isFinished: true,
        isSingleAsset: true,
        isDepositFinished: false,
        startBlock: 19401555,
        endBlock: 20004471,
        lockBlock: 20004471,
        tokenDecimals: 18,
    }, */
]

export default pools2
