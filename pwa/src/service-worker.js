const cacheName = 'sw-cache-1.0.0'
const cacheFiles = ['/','/style.css','/img/logo.png']
const cacheOrigin = 'http://10.6.5.152:8080'
self.addEventListener('install',async ev=>{
	console.log('install')
	const cache = await caches.open(cacheName)
	await cache.addAll(cacheFiles)
	await self.skipWaiting()
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
		const pathname = req.url.replace(req.referrer, '/')
		if(pathname.startsWith('/content')){
			const cache = await caches.open(cacheName)
			await cache.add(req.url)
		}
		const fresh = await fetch(req)
		return fresh
	}catch(ex){
		const cache = await caches.open(cacheName)
		return cache.match(req)
	}
}