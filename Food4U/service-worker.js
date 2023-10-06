const CACHE_NAME="static_cache"

const STATIC_ASSETS = [
    '/index.html',
    '/index.css',
    '/about.html',
    '/spcare.html',
    '/spcare.css',
    '/bg1.jpg',
    '/Screenshot 2022-11-19 153948.jpg',
    '/s1.jpg',
    '/endsem/websiteTemplate/images/top.png'
    
]

async function preCache(){
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)

}
self.addEventListener('install', event =>{
    console.log("[sw] installed");
    
    event.waitUntil(preCache())

})
async function cleanCache(){
    const keys=await caches.keys()
    const keysToDelete = keys.map(key =>{
        if (key !== CACHE_NAME){
            return caches.delete(key)
        }
    })
}
self.addEventListener('activate', event =>{
    console.log("[sw] activated");
})
async function fetchAssets(event){
    try{
        const response =await fetch(event.request)
        return response
    }catch (err){
        const cache = await caches.open(CACHE_NAME)
        return cache.match(event.request)

    }
}
self.addEventListener('fetch', event =>{
    console.log("[sw] fetched");
    event.respondWith(fetchAssets(event))
})