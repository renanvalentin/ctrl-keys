const dotenv = require('dotenv');
dotenv.config();

import { createServer as yogaServer } from '@graphql-yoga/node';
import { ReplaySubject } from 'rxjs';

import { schema } from './schema';
import { context } from './context';

import { pubSub } from './pub-sub';
import { PendingTxs, Tx } from './pending-txs';

export async function createServer() {
  const pendingTxs$ = new ReplaySubject<Tx>();
  const pendingTxs = new PendingTxs(pendingTxs$);

  pendingTxs$.subscribe(tx => {
    pubSub.publish('txs:pending:', tx, { hash: tx });
  });

  return yogaServer({ schema, context: context(pendingTxs) });
}
