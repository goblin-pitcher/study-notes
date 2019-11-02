const cacheName = 'sw-cache-1.0.0'
const cacheFiles = ['/','/style.css']
self.addEventListener('install',async ev=>{
	console.log('install')
	const cache = await caches.open(cacheName)
	await cache.addAll(cacheFiles)
	await self.skipWaiting()
	// const cacheHandle = caches.open(cacheName).then(cache=>cache.addAll(cacheFiles))
	// ev.waitUntil(cacheHandle.then(()=>{
 //        self.skipWaiting()
 //    }))
})
self.addEventListener('activate',async ev=>{
	console.log('Service Worker 状态： activate');
	const keys = await caches.keys()
	await Promise.all(keys.map(key=> {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
	await self.clients.claim()
})
self.addEventListener('fetch',ev=>{
	console.log('fetch:::', ev)
	ev.respondWith(netWorkFirst(ev.request))
})
async function netWorkFirst(req){
	try{
		const fresh = await fetch(req)
		return fresh
	}catch(ex){
		const cache = await caches.open(cacheName)
		return cache.match(req)
	}
}