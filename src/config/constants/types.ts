export enum QuoteToken {
  'UST' = 'UST',
  'WONE' = 'WONE',
  'ONEETH' = 'ONEETH',
  'ONE' = 'ONE',
  'JEWEL' = 'JEWEL',
  'RVRS' = 'RVRS',
  'ONERVRS' = 'ONE/RVRS',
  'USTRVRS' = 'UST/RVRS',
  'ETHRVRS' = 'ETH/RVRS',
  'USDCRVRS' = 'USDC/RVRS',
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
}

export interface Address {
  1666700000?: string
  1666600000: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isTokenOnly?: boolean
  isCommunity?: boolean
  version?: number
  risk: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface CoinPriceConfig {
  value?: number
}

export interface PoolConfig {
  sousId?: number
  image?: string
  tokenName: string
  quoteTokenSymbol: QuoteToken
  stakingTokenName: QuoteToken
  stakingTokenAddress?: string
  isFinished: boolean,
  tokenPoolAddress?: string
  quoteTokenPoolAddress?: string
  contractAddress: Address
  harvest?: boolean
  tokenDecimals: number
}

export interface Pool2Config {
  sousId?: number
  image?: string
  tokenName: string
  quoteTokenSymbol?: QuoteToken
  stakingTokenName?: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  tokenPoolAddress?: string
  quoteTokenPoolAddress?: string
  contractAddress?: Address
  projectLink?: string
  tokenPerBlock?: string
  startBlock?: number
  endBlock?: number
  sortOrder?: number
  isSingleAsset?: boolean
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  isDepositFinished?: boolean
  lockBlock?: number
  notFinished?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
}
