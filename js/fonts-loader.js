// Fonts loader - оптимизированная загрузка шрифтов
class FontsLoader {
    constructor() {
        this.fonts = [
            {
                name: 'Playfair Display',
                weights: ['400', '500', '600', '400italic']
            },
            {
                name: 'Inter',
                weights: ['300', '400', '500', '600']
            }
        ];
        
        this.init();
    }
    
    init() {
        // Добавляем класс для стайлинга до загрузки шрифтов
        document.documentElement.classList.add('fonts-loading');
        
        // Загружаем шрифты
        this.loadFonts().then(() => {
            this.onFontsLoaded();
        }).catch((error) => {
            console.warn('Шрифты не загрузились:', error);
            this.onFontsFailed();
        });
    }
    
    async loadFonts() {
        const loadPromises = [];
        
        this.fonts.forEach(font => {
            font.weights.forEach(weight => {
                const fontFace = new FontFace(
                    font.name,
                    `url('../assets/fonts/${font.name.replace(' ', '')}-${weight}.woff2') format('woff2')`,
                    this.getFontFaceOptions(weight)
                );
                
                loadPromises.push(fontFace.load().then(loadedFont => {
                    document.fonts.add(loadedFont);
                }));
            });
        });
        
        return Promise.all(loadPromises);
    }
    
    getFontFaceOptions(weight) {
        const options = {
            weight: weight.replace('italic', ''),
            style: weight.includes('italic') ? 'italic' : 'normal',
            display: 'swap'
        };
        
        return options;
    }
    
    onFontsLoaded() {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
        
        // Сохраняем в localStorage факт загрузки шрифтов
        localStorage.setItem('fonts-loaded', 'true');
        
        console.log('Все шрифты успешно загружены');
    }
    
    onFontsFailed() {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-failed');
        
        console.log('Используются fallback шрифты');
    }
    
    // Проверяем, были ли шрифты уже загружены ранее
    static wereFontsLoaded() {
        return localStorage.getItem('fonts-loaded') === 'true';
    }
}

// Инициализация загрузчика шрифтов
document.addEventListener('DOMContentLoaded', function() {
    // Если шрифты уже загружались ранее, сразу применяем стили
    if (FontsLoader.wereFontsLoaded()) {
        document.documentElement.classList.add('fonts-loaded');
    } else {
        new FontsLoader();
    }
});

// Preload критических шрифтов
function preloadCriticalFonts() {
    const criticalFonts = [
        '../assets/fonts/PlayfairDisplay-Regular.woff2',
        '../assets/fonts/Inter-Regular.woff2'
    ];
    
    criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = fontUrl;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Запускаем предзагрузку
preloadCriticalFonts();