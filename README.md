# Machinecoin Block Explorer

**Tested locally on an Apple Silicon MacBook Pro. Intel Linux / Ubuntu Server deployment has not yet been verified.**

This is the working local Machinecoin (MAC) explorer adapted from [eIquidus](https://github.com/team-exor/eiquidus), based on commit `c87cb904a88c4ea64cbe7d25e56ad2b608ebdd65` (1.103.0). It is a source snapshot for experimentation and further development, not a ready-to-deploy public service.

Linux installation, service management and public hosting will be developed and tested in this same repository. A public live URL will be added once that deployment is ready.

## Included

- Blocks, transactions, addresses, and search by height, block hash, transaction hash or address.
- Live local node/index status: peer count, chain height, indexed height and masternode synchronization state.
- Loopback-only HTTP binding and a local Host-header allowlist.
- Local copies of browser assets used by the adapted interface, and RPC HTTP keep-alive.
- A Machinecoin example configuration and the dependency lockfile from the local build.

Rich-list, market, network and masternode pages are disabled in the example configuration. Historical masternode entries must not be interpreted as currently active nodes. A synchronized local index is not proof of agreement with every network participant.

## Recorded test environment

The October 2026 local setup used Apple Silicon, Node.js 24.22.0, MongoDB 8.0.34 and a separate wallet-disabled Machinecoin Core node. Historical checks covered full index coverage through height 2,041,450, transaction samples against node RPC, search, address totals, and start/stop/restart. These are dated local results, not a current network snapshot or a Linux compatibility claim.

## Publication checks (27 October 2026)

Dependency installation from the lockfile (`npm ci --ignore-scripts`) and syntax checks of the adapted JavaScript passed. The upstream Jasmine run completed with **20 specs, 2 failures**, both in external market-data tests (DexTrade and Dexomy). Market pages are disabled in this local configuration. This is not an entirely passing test suite or a fresh end-to-end deployment test.

## Local setup outline

1. Install Node.js 24, MongoDB 8 and a compatible Machinecoin Core node. The node and database are separate services and are not bundled here.
2. Enable transaction indexing (`txindex=1`) on the dedicated node, synchronize it, and configure authenticated RPC on `127.0.0.1:40442`. Keep RPC private. A wallet-disabled node is preferred for explorer use.
3. Configure authenticated MongoDB on `127.0.0.1:27027`. Create the `machinecoin_explorer` database user with `readWrite` access to that database.
4. Copy `settings.machinecoin.example.json` to `settings.json`, enter your own database/RPC credentials, and restrict file permissions (`chmod 600 settings.json`). The actual settings file is ignored by Git.
5. Run `npm ci`, then `npm start`. Open `http://127.0.0.1:3001/`.
6. Run `npm run sync-blocks` to index blocks. Repeat it after new blocks arrive; this snapshot does not install a background scheduler. Do not run concurrent index updates.

This is an installation outline, not an automated clean-machine installer. The development-machine launchers, service paths and database/bootstrap scripts are intentionally not part of the portable source snapshot. See [upstream documentation](README.upstream.md) for the underlying project's configuration and commands; its general platform claims are not validation of this adaptation.

## Public deployment is pending

The current code deliberately accepts only `localhost:3001` and `127.0.0.1:3001` as HTTP Host headers and binds to loopback. Public hosting will require deliberate proxy/Host configuration, service supervision, backups and deployment testing. Do not expose MongoDB or Core RPC to the internet. Cloudflare Tunnel and Ubuntu service configuration have not been shipped or tested in this snapshot.

No wallet, private keys, production credentials, tunnel tokens, chain files or database dump is included. The legacy Core and this adaptation have not received a comprehensive security audit.

## Attribution

This is a community Machinecoin adaptation of eIquidus, not an official Machinecoin release. Upstream history and license notices are retained; see [LICENSE](LICENSE) and the upstream README. Vendored frontend assets retain their embedded notices and original licenses.
