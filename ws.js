var CACHE_NAME = 'v1';
var cacheFiles = [
                './',
                './index.html',
                './about.html',
                './contact.html',
                './gallery.html',
                './product.html',
                './service.html',
                './manifest.json',
                './css/style.min.css',
                './images/icons/icono1.png',
                './images/icons/icono2.png',
                './img/about.jpg',
                './img/carousel-1.jpg',
                './img/carousel-2.jpg',
                './img/header.jpg',
                './img/portfolio-1.jpg',
                './img/portfolio-2.jpg',
                './img/portfolio-3.jpg',
                './img/portfolio-4.jpg',
                './img/portfolio-5.jpg',
                './img/portfolio-6.jpg',
                './img/product-1.jpg',
                './img/product-2.jpg',
                './img/product-3.jpg',
                './img/product-4.jpg',
                './img/product-5.jpg',
                './img/promotion.jpg',
                './img/service-1.jpg',
                './img/service-2.jpg',
                './img/service-3.jpg',
                './img/service-4.jpg',
                './img/team-1.jpg',
                './img/team-2.jpg',
                './img/team-3.jpg',
                './img/team-4.jpg',
                './img/testimonial-1.jpg',
                './img/testimonial-2.jpg',
                './img/testimonial-3.jpg',
                './js/main.js',
                './css/style.css'
]


self.addEventListener('install', function(e) {
    console.log('Service Worker: Instalado');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Service Worker: Cache abierto');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activado');
    e.waitUntil()(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                   if(thisCacheName !== CACHE_NAME) {
                    console.log('Service Worker: Cache viejo eliminado', thisCacheName);
                    return caches.delete(thisCacheName);
                   }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone).then(function(response) {
                if(!response){
                    console.log('No se encontro respuesta');
                    return response;
                }
                var responseClone = response.clone();
                
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err){
                console.log('Error al hacer fetch', err);
            })
        })
    )
})