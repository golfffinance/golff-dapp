import http from './http';

export const getPrice = (p) => http({
    method: 'GET',
    url: `/golff-server/market/price?symbols=gxc,eth,yfii,link,HT`
});
