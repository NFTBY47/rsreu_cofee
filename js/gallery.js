// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.getElementById('modalClose');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });

    // Modal functionality
    const zoomBtns = document.querySelectorAll('.gallery-zoom');
    
    zoomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const image = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('h3').textContent;
            const description = galleryItem.querySelector('p').textContent;
            
            // Set modal content
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Show modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Lazy loading for gallery images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.gallery-image img').forEach(img => {
            // Add loading state
            if (!img.complete) {
                img.classList.add('loading');
                img.addEventListener('load', function() {
                    this.classList.remove('loading');
                });
            }
            
            imageObserver.observe(img);
        });
    }

    console.log('Галерея загружена успешно!');
});