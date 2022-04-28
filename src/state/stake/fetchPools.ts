import masterchefAbi from 'config/abi/masterchef.json';
import autorvrsAbi from 'config/abi/autorvrs.json';
import multicall from 'utils/multicall';
import { getAutoRvrsAddress, getMasterChefAddress, getVeRvrsAddress } from 'utils/addressHelpers';
import veRrvsAbi from "config/abi/veRvrs.json";

// eslint-disable-next-line import/prefer-default-export
export const fetchPoolsTotalStaking = async () => {
  const calls = [
    {
      address: getMasterChefAddress(),
      name: 'userInfo',
      params: [0, getAutoRvrsAddress()]
    }
  ];
  const userInfo = await multicall(masterchefAbi, calls);

  const calls2 = [
    {
      address: getAutoRvrsAddress(),
      name: 'getPricePerFullShare',
      params: []
    }
  ];
  const pricePerFullShare = await multicall(autorvrsAbi, calls2);

  return { userInfo, pricePerFullShare };
};

// eslint-disable-next-line import/prefer-default-export
export const fetchPoolsVeRvrsData = async () => {
  const veRvrsAddress = getVeRvrsAddress()
  const calls = [
    {
      address: veRvrsAddress,
      name: 'totalStaked',
      params: []
    },
    {
      address: veRvrsAddress,
      name: 'totalSupply',
      params: []
    },
    {
      address: veRvrsAddress,
      name: 'generationRate',
      params: []
    },
    {
      address: veRvrsAddress,
      name: 'maxCap',
      params: []
    },
    {
      address: veRvrsAddress,
      name: 'withdrawFee',
      params: []
    },
    {
      address: veRvrsAddress,
      name: 'withdrawFeeTime',
      params: []
    }
  ];
  const response = await multicall(veRrvsAbi, calls);

  return response;
};
