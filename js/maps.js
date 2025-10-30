// Яндекс Карты для кофейни "Лавандовая ветвь"

// Координаты кофейни (Рязань, ул. Прованская, 15 - примерные координаты)
const COFFEE_SHOP_COORDS = [54.6294, 39.7417];

let map;

// Инициализация карты
function initMap() {
    // Создаем карту
    map = new ymaps.Map('yandex-map', {
        center: COFFEE_SHOP_COORDS,
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем метку
    const coffeeShopPlacemark = new ymaps.Placemark(COFFEE_SHOP_COORDS, {
        balloonContent: `
            <div class="map-balloon">
                <h3>Лавандовая ветвь</h3>
                <p>Уютная кофейня с прованским шармом</p>
                <p><strong>Адрес:</strong> г. Рязань, ул. Прованская, 15</p>
                <p><strong>Телефон:</strong> +7 (4912) 123-45-67</p>
                <p><strong>Часы работы:</strong> Пн-Пт: 8:00-22:00, Сб-Вс: 9:00-23:00</p>
            </div>
        `,
        hintContent: 'Кофейня "Лавандовая ветвь"'
    }, {
        // Опции метки
        iconLayout: 'default#image',
        iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiM2YTRjOTMiIGZpbGwtb3BhY2l0eT0iMC45Ii8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEwIiBmaWxsPSIjZTZiMGFhIi8+CjxwYXRoIGQ9Ik0xNiAxNkwyNCAyNE0yNCAxNkwxNiAyNCIgc3Ryb2tlPSIjMmMxYTNkIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
    });

    // Добавляем метку на карту
    map.geoObjects.add(coffeeShopPlacemark);

    // Открываем балун при клике на метку
    coffeeShopPlacemark.events.add('click', function () {
        coffeeShopPlacemark.balloon.open();
    });

    // Адаптация карты под мобильные устройства
    if (window.innerWidth < 768) {
        map.behaviors.disable('drag');
    }

    console.log('Яндекс Карта успешно загружена');
}

// Функция для открытия в приложении Яндекс.Карты
function openInYandexMaps() {
    const url = `https://yandex.ru/maps/?pt=${COFFEE_SHOP_COORDS[1]},${COFFEE_SHOP_COORDS[0]}&z=16&l=map`;
    window.open(url, '_blank');
}

// Функция для построения маршрута
function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userCoords = [position.coords.latitude, position.coords.longitude];
            const url = `https://yandex.ru/maps/?rtext=${userCoords.join(',')}~${COFFEE_SHOP_COORDS.join(',')}&rtt=auto`;
            window.open(url, '_blank');
        }, function(error) {
            // Если геолокация недоступна, открываем карту с поиском маршрута
            const url = `https://yandex.ru/maps/?rtext=~${COFFEE_SHOP_COORDS.join(',')}&rtt=auto`;
            window.open(url, '_blank');
        });
    } else {
        // Fallback для браузеров без поддержки геолокации
        const url = `https://yandex.ru/maps/?rtext=~${COFFEE_SHOP_COORDS.join(',')}&rtt=auto`;
        window.open(url, '_blank');
    }
}

// Инициализация карты после загрузки API
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли элемент карты на странице
    const mapElement = document.getElementById('yandex-map');
    if (mapElement) {
        // Ждем загрузки API Яндекс.Карт
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(initMap);
        } else {
            console.warn('Яндекс.Карты не загрузились');
            showMapFallback();
        }
    }
});

// Fallback если карты не загрузились
function showMapFallback() {
    const mapContainer = document.getElementById('yandex-map');
    mapContainer.innerHTML = `
        <div class="map-fallback">
            <h4>Карта временно недоступна</h4>
            <p>Мы находимся по адресу: г. Рязань, ул. Прованская, 15</p>
            <button class="btn btn-primary" onclick="openInYandexMaps()">
                Открыть в Яндекс.Картах
            </button>
        </div>
    `;
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    if (map && window.innerWidth < 768) {
        map.behaviors.disable('drag');
    } else if (map) {
        map.behaviors.enable('drag');
    }
});