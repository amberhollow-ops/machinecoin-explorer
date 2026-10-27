// Fixed read-only RPC calls. No method or parameters come from the browser.
const Client = require('./node').Client;
const settings = require('./settings');
const Stats = require('../models/stats');
const rpc = new Client(settings.wallet);
const call = (method, ...args) => new Promise((resolve, reject) => rpc.cmd(method, ...args, (error, value) => error ? reject(error) : resolve(value)));
let cached, expires = 0;
module.exports = async function(req, res) {
  try {
    if (!cached || Date.now() > expires) {
      const [chain, peers, sync, stats] = await Promise.all([call('getblockchaininfo'),call('getconnectioncount'),call('mnsync','status'),Stats.findOne({coin:settings.coin.name}).lean()]);
      cached = {height:chain.blocks,bestblockhash:chain.bestblockhash,headers:chain.headers,initialBlockDownload:chain.initialblockdownload,peers,indexed:stats ? stats.last : 0,transactionsWithIndexedOutputs:stats ? stats.txes : 0,masternodeSyncComplete:sync.IsSynced,masternodeSync:sync.AssetName,checkedAt:new Date().toISOString()};
      expires=Date.now()+10000;
    }
    res.set('Cache-Control','no-store').json(cached);
  } catch (error) { res.status(503).json({error:'Local node or index database unavailable'}); }
};
