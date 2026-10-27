async function refreshLocalStatus() {
 const el=document.getElementById('local-chain-status');
 try { const r=await fetch('/local/status');if(!r.ok)throw Error();const s=await r.json();
 el.textContent=`Node height ${s.height.toLocaleString('en-US')} · Indexed ${s.indexed.toLocaleString('en-US')} / ${s.height.toLocaleString('en-US')} (${(100*s.indexed/Math.max(1,s.height)).toFixed(2)}%) · ${s.peers} peers · Masternode sync: ${s.masternodeSyncComplete?'complete':'pending'}`;
 } catch(e) {el.textContent='Local node or index unavailable. Displayed history may be stale.';}
}
refreshLocalStatus();setInterval(refreshLocalStatus,15000);
