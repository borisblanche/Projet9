class MauGallery {
  constructor(element, options) {
      this.element = element;
      this.options = Object.assign(MauGallery.defaults, options);
      this.tagsCollection = [];
      this.init();
  }

  static defaults = {
      columns: 3,
      lightBox: true,
      lightboxId: null,
      showTags: true,
      tagsPosition: "bottom",
      navigation: true
  };

  init() {
      this.createRowWrapper();
      if (this.options.lightBox) {
          this.createLightBox();
      }
      this.listeners();

      const galleryItems = this.element.querySelectorAll(".gallery-item");
      galleryItems.forEach((item) => {
          this.responsiveImageItem(item);
          this.moveItemInRowWrapper(item);
          this.wrapItemInColumn(item, this.options.columns);
          const theTag = item.getAttribute("data-gallery-tag");
          if (this.options.showTags && theTag && !this.tagsCollection.includes(theTag)) {
              this.tagsCollection.push(theTag);
          }
      });

      if (this.options.showTags) {
          this.showItemTags();
      }

      this.element.style.display = 'block';
      this.element.style.opacity = 0;
      setTimeout(() => {
          this.element.style.transition = 'opacity 0.5s';
          this.element.style.opacity = 1;
      }, 0);
  }

  createRowWrapper() {
      if (!this.element.querySelector(".gallery-items-row")) {
          const rowWrapper = document.createElement('div');
          rowWrapper.classList.add('gallery-items-row', 'row');
          this.element.appendChild(rowWrapper);
      }
  }
  wrapItemInColumn(element, columns) {
    const columnClasses = this.getColumnClasses(columns);
    const itemColumn = document.createElement('div');
    itemColumn.classList.add('item-column', 'mb-4', ...columnClasses);

    // Déplacer l'élément dans le nouvel élément conteneur
    itemColumn.appendChild(element.cloneNode(true));
    element.parentNode.replaceChild(itemColumn, element);
}


  getColumnClasses(columns) {
      const classes = [];
      if (typeof columns === 'number') {
          classes.push(`col-${Math.ceil(12 / columns)}`);
      } else if (typeof columns === 'object') {
          if (columns.xs) classes.push(`col-${Math.ceil(12 / columns.xs)}`);
          if (columns.sm) classes.push(`col-sm-${Math.ceil(12 / columns.sm)}`);
          if (columns.md) classes.push(`col-md-${Math.ceil(12 / columns.md)}`);
          if (columns.lg) classes.push(`col-lg-${Math.ceil(12 / columns.lg)}`);
          if (columns.xl) classes.push(`col-xl-${Math.ceil(12 / columns.xl)}`);
      }
      return classes;
  }

  moveItemInRowWrapper(element) {
      const rowWrapper = this.element.querySelector(".gallery-items-row");
      rowWrapper.appendChild(element);
  }

  responsiveImageItem(element) {
      if (element.tagName === 'IMG') {
          element.classList.add('img-fluid');
      }
  }

  openLightBox(element) {
      const lightbox = document.getElementById(this.options.lightboxId || "galleryLightbox");
      const lightboxImage = lightbox.querySelector(".lightboxImage");
      lightboxImage.src = element.src;
      lightbox.classList.add('show');
      lightbox.style.display = 'block';
  }

  prevImage() {
      this.navigateImage(-1);
  }

  nextImage() {
      this.navigateImage(1);
  }

  navigateImage(direction) {
      const activeImageSrc = document.querySelector(".lightboxImage").src;
      const galleryItems = document.querySelectorAll("img.gallery-item");
      let activeIndex = [...galleryItems].findIndex(img => img.src === activeImageSrc);

      const filteredItems = [...galleryItems].filter(img => {
          const activeTag = document.querySelector(".tags-bar span.active-tag").dataset.imagesToggle;
          return activeTag === "all" || img.getAttribute("data-gallery-tag") === activeTag;
      });

      activeIndex = (activeIndex + direction + filteredItems.length) % filteredItems.length;
      document.querySelector(".lightboxImage").src = filteredItems[activeIndex].src;
  }

  createLightBox() {
      const lightboxId = this.options.lightboxId || "galleryLightbox";
      const lightbox = document.createElement('div');
      lightbox.classList.add('modal', 'fade');
      lightbox.id = lightboxId;
      lightbox.setAttribute('tabindex', '-1');
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.innerHTML = `
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-body">
                      ${this.options.navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : '<span style="display:none;" />'}
                      <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                      ${this.options.navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>' : '<span style="display:none;" />'}
                  </div>
              </div>
          </div>
      `;
      this.element.appendChild(lightbox);
  }

  showItemTags() {
      const tagItems = [
          '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>',
          ...this.tagsCollection.map(tag => `<li class="nav-item active"><span class="nav-link"  data-images-toggle="${tag}">${tag}</span></li>`)
      ].join('');

      const tagsRow = document.createElement('ul');
      tagsRow.classList.add('my-4', 'tags-bar', 'nav', 'nav-pills');
      tagsRow.innerHTML = tagItems;

      if (this.options.tagsPosition === "bottom") {
          this.element.appendChild(tagsRow);
      } else if (this.options.tagsPosition === "top") {
          this.element.insertBefore(tagsRow, this.element.firstChild);
      } else {
          console.error(`Unknown tags position: ${this.options.tagsPosition}`);
      }
  }

  filterByTag(event) {
      const activeTag = event.target.dataset.imagesToggle;

      document.querySelector(".active.active-tag").classList.remove("active", "active-tag");
      event.target.classList.add("active", "active-tag");

      document.querySelectorAll(".gallery-item").forEach(item => {
          const itemColumn = item.closest(".item-column");
          if (activeTag === "all" || item.getAttribute("data-gallery-tag") === activeTag) {
              itemColumn.style.display = "block";
              setTimeout(() => itemColumn.style.opacity = 1, 300);
          } else {
              itemColumn.style.opacity = 0;
              setTimeout(() => itemColumn.style.display = "none", 300);
          }
      });
  }

  listeners() {
      this.element.querySelectorAll(".gallery-item").forEach(item => {
          item.addEventListener("click", () => {
              if (this.options.lightBox && item.tagName === "IMG") {
                  this.openLightBox(item);
              }
          });
      });

      this.element.addEventListener("click", event => {
          if (event.target.classList.contains("nav-link")) {
              this.filterByTag(event);
          }
          if (event.target.classList.contains("mg-prev")) {
              this.prevImage();
          }
          if (event.target.classList.contains("mg-next")) {
              this.nextImage();
          }
      });
  }
}
window.MauGallery = MauGallery;
// Usage Example:


