  
class MauGallery {
    constructor(element, options = {}) {
        this.element = element;
        this.defaults = {
            columns: 3,
            lightBox: true,
            lightboxId: 'galleryLightbox',
            showTags: true,
            tagsPosition: 'top',
            navigation: true
        };
        this.options = { ...this.defaults, ...options };
        this.tagsCollection = [];
        this.currentImageIndex = null;
        this.galleryItems = [];
        this.init();
    }

    init() {
        this.createRowWrapper();
        if (this.options.lightBox) {
            this.createLightBox(this.options.lightboxId, this.options.navigation);
        }
        this.listeners();

        const galleryItems = this.element.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            this.responsiveImageItem(item);
            this.moveItemInRowWrapper(item);
            this.wrapItemInColumn(item, this.options.columns);
            this.galleryItems.push(item);
            item.setAttribute('data-index', index); 
            const theTag = item.getAttribute('data-gallery-tag');
            if (this.options.showTags && theTag && !this.tagsCollection.includes(theTag)) {
                this.tagsCollection.push(theTag);
            }
        });

        if (this.options.showTags) {
            this.showItemTags(this.options.tagsPosition, this.tagsCollection);
        }

        this.element.style.display = 'block';
    }

    createRowWrapper() {
        if (!this.element.querySelector('.gallery-items-row')) {
            const rowWrapper = document.createElement('div');
            rowWrapper.className = 'gallery-items-row row';
            this.element.appendChild(rowWrapper);
        }
    }

    wrapItemInColumn(element, columns) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('item-column', 'mb-4');
        if (typeof columns === 'number') {
            colDiv.classList.add(`col-${Math.ceil(12 / columns)}`);
        } else if (typeof columns === 'object') {
            if (columns.xs) colDiv.classList.add(`col-${Math.ceil(12 / columns.xs)}`);
            if (columns.sm) colDiv.classList.add(`col-sm-${Math.ceil(12 / columns.sm)}`);
            if (columns.md) colDiv.classList.add(`col-md-${Math.ceil(12 / columns.md)}`);
            if (columns.lg) colDiv.classList.add(`col-lg-${Math.ceil(12 / columns.lg)}`);
            if (columns.xl) colDiv.classList.add(`col-xl-${Math.ceil(12 / columns.xl)}`);
        }
        element.parentNode.insertBefore(colDiv, element);
        colDiv.appendChild(element);
    }

    moveItemInRowWrapper(element) {
        const rowWrapper = this.element.querySelector('.gallery-items-row');
        rowWrapper.appendChild(element);
    }

    responsiveImageItem(element) {
        if (element.tagName === 'IMG') {
            element.classList.add('img-fluid');
        }
    }

    createLightBox(lightboxId, navigation) {
        const lightboxHtml = `
            <div class="modal fade" id="${lightboxId}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;">&#8249;</div>' : ''}
                            <img class="lightboxImage img-fluid" alt="Contenu de l\'image affichée dans la modale au clique"/>
                            ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">&#8250;</div>' : ''}
                        </div>
                    </div>
                </div>
            </div>`;
        this.element.insertAdjacentHTML('beforeend', lightboxHtml);
    }

    listeners() {
        const galleryItems = this.element.querySelectorAll('.gallery-item');
        galleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                if (this.options.lightBox && item.tagName === 'IMG') {
                    this.openLightBox(item);
                }
            });
        });

        const tags = this.element.querySelectorAll('.nav-link');
        tags.forEach((tag) => {
            tag.addEventListener('click', this.filterByTag.bind(this));
        });

        const prevButton = document.querySelector('.mg-prev');
        const nextButton = document.querySelector('.mg-next');
        if (prevButton) prevButton.addEventListener('click', this.prevImage.bind(this));
        if (nextButton) nextButton.addEventListener('click', this.nextImage.bind(this));
    }

    openLightBox(element) {
        const lightbox = document.getElementById(this.options.lightboxId);
        const lightboxImage = lightbox.querySelector('.lightboxImage');
        lightboxImage.src = element.src;
        this.currentImageIndex = parseInt(element.getAttribute('data-index'), 10);
        const modal = new bootstrap.Modal(lightbox);
        modal.show();
    }

    prevImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        } else {
            this.currentImageIndex = this.galleryItems.length - 1;
        }
        this.updateLightBoxImage();
    }

    nextImage() {
        if (this.currentImageIndex < this.galleryItems.length - 1) {
            this.currentImageIndex++;
        } else {
            this.currentImageIndex = 0;
        }
        this.updateLightBoxImage();
    }

    updateLightBoxImage() {
        const lightboxImage = document.querySelector('.lightboxImage');
        const newImage = this.galleryItems[this.currentImageIndex].src;
        lightboxImage.src = newImage;
    }

    showItemTags(position, tags) {
        let tagItems = '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>';
        tags.forEach((tag) => {
            tagItems += `<li class="nav-item"><span class="nav-link" data-images-toggle="${tag}">${tag}</span></li>`;
        });
        const tagsBar = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

        if (position === 'bottom') {
            this.element.insertAdjacentHTML('beforeend', tagsBar);
        } else if (position === 'top') {
            this.element.insertAdjacentHTML('afterbegin', tagsBar);
        }
    }

    filterByTag(event) {
        const target = event.target;
        if (target.classList.contains('active-tag')) {
            return;
        }
        const activeTag = this.element.querySelector('.active.active-tag');
        if (activeTag) activeTag.classList.remove('active', 'active-tag');
        target.classList.add('active-tag', 'active');

        const tag = target.getAttribute('data-images-toggle');
        const galleryItems = this.element.querySelectorAll('.gallery-item');

        galleryItems.forEach((item) => {
            const itemColumn = item.closest('.item-column');
            if (tag === 'all' || item.getAttribute('data-gallery-tag') === tag) {
                itemColumn.style.display = 'block';
            } else {
                itemColumn.style.display = 'none';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryElement = document.querySelector('.gallery');
    if (galleryElement) {
        new MauGallery(galleryElement);
    }
});
