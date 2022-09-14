import { createServer } from '@graphql-yoga/node';
import request from 'supertest';
import { schema } from '../schema';

const yoga = createServer({ schema });

const query = `
{  
  wallet(stakeAddress:"stake_test1ur4nu3k86e6hvuw6ck2etk3ssgv2y6dm4pr8s76m86kg6usappr74") {
    balance,
    txs {
      type,
      amount,
      fees,
      date,
      id
    }
  }
}
`;

describe('query wallet', function () {
  it('responds with json', async function () {
    const response = await request(yoga).post('/graphql').send({
      query,
    });

    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual({
      wallet: {
        balance: '11538668',
        txs: [
          {
            type: 'Outgoing',
            amount: '-2182221',
            fees: '182221',
            date: 1662685090,
            id: '6d8ab0f38c5748e6fd59e04ec162c098784b27cbaaca6d2d1ab702e01f29a97c',
          },
          {
            type: 'Incoming',
            amount: '10000000',
            fees: null,
            date: 1662685007,
            id: '378eac004bdec2421456d507b8549eedd69955182e29d469c3b2833f6473d5ce',
          },
          {
            type: 'Outgoing',
            amount: '-1279111',
            fees: '171441',
            date: 1662602880,
            id: '03bb413faf369b8990b95eb5c0f1ca08c0f8199ea32b31ea7501f70f3c60ba89',
          },
          {
            type: 'Incoming',
            amount: '5000000',
            fees: null,
            date: 1662601557,
            id: '7b94e19a39d437ea8ae8a836309b1c39f9b549f0cd02eefd271ee83975ac5893',
          },
          {
            type: 'Outgoing',
            amount: '-2000000',
            fees: '892330',
            date: 1662601462,
            id: '86b6173a53568e464bafce315ec6f61de0d5c180e144d9c2c57b86bb012fc0d2',
          },
          {
            type: 'Incoming',
            amount: '2000000',
            fees: null,
            date: 1662514094,
            id: '87eb5358c1480739beed120e99e43ffc7e2c4a518bfb0a07c268a47e1db08b5b',
          },
        ],
      },
    });
  });
});
