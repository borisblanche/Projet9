// class MauGallery {
//   constructor(options) {
//     this.options = Object.assign({
//       columns: 3,
//       lightBox: true,
//       lightboxId: null,
//       showTags: true,
//       tagsPosition: "bottom",
//       navigation: true
//     }, options);

//     this.tagsCollection = [];
//     this.init();
//   }

//   init() {
//     this.createRowWrapper();
//     if (this.options.lightBox) {
//       this.createLightBox(this.options.lightboxId, this.options.navigation);
//     }
//     this.addListeners();

//     document.querySelectorAll(".gallery-item").forEach((item, index) => {
//       this.responsiveImageItem(item);
//       this.moveItemInRowWrapper(item);
//       this.wrapItemInColumn(item, this.options.columns);
//       let theTag = item.getAttribute("data-gallery-tag");
//       if (this.options.showTags && theTag !== undefined && !this.tagsCollection.includes(theTag)) {
//         this.tagsCollection.push(theTag);
//       }
//     });

//     if (this.options.showTags) {
//       this.showItemTags(this.options.tagsPosition, this.tagsCollection);
//     }

//     document.querySelector(".gallery").style.display = "block";
//   }

//   createRowWrapper() {
//     const gallery = document.querySelector(".gallery");
//     if (!gallery.children[0].classList.contains("row")) {
//       gallery.insertAdjacentHTML('beforeend', '<div class="gallery-items-row row"></div>');
//     }
//   }

//   wrapItemInColumn(element, columns) {
//     let columnClasses = "";
//     if (typeof columns === "number") {
//       columnClasses = `col-${Math.ceil(12 / columns)}`;
//     } else if (typeof columns === "object") {
//       if (columns.xs) columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
//       if (columns.sm) columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
//       if (columns.md) columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
//       if (columns.lg) columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
//       if (columns.xl) columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
//     } else {
//       console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`);
//     }
//     element.outerHTML = `<div class='item-column mb-4 ${columnClasses}'>${element.outerHTML}</div>`;
//   }

//   moveItemInRowWrapper(element) {
//     document.querySelector(".gallery-items-row").appendChild(element.parentNode);
//   }

//   responsiveImageItem(element) {
//     if (element.tagName === "IMG") {
//       element.classList.add("img-fluid");
//     }
//   }

//   createLightBox(lightboxId, navigation) {
//     const gallery = document.querySelector(".gallery");
//     gallery.insertAdjacentHTML('beforeend', `
//       <div class="modal fade" id="${lightboxId ? lightboxId : "galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true">
//         <div class="modal-dialog" role="document">
//           <div class="modal-content">
//             <div class="modal-body">
//               ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : '<span style="display:none;" />'}
//               <img class="lightboxImage img-fluid" alt="Contenu de l\'image affichée dans la modale au clique"/>
//               ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">></div>' : '<span style="display:none;" />'}
//             </div>
//           </div>
//         </div>
//       </div>`);
//   }

//   addListeners() {
//     document.querySelectorAll(".gallery-item").forEach(item => {
//       item.addEventListener("click", () => {
//         if (this.options.lightBox && item.tagName === "IMG") {
//           this.openLightBox(item, this.options.lightboxId);
//         } else {
//           return;
//         }
//       });
//     });

//     document.querySelector(".gallery").addEventListener("click", (e) => {
//       if (e.target.classList.contains("nav-link")) {
//         this.filterByTag(e.target);
//       } else if (e.target.classList.contains("mg-prev")) {
//         this.prevImage();
//       } else if (e.target.classList.contains("mg-next")) {
//         this.nextImage();
//       }
//     });
//   }

//   openLightBox(element, lightboxId) {
//     document.querySelector(`#${lightboxId} .lightboxImage`).setAttribute("src", element.getAttribute("src"));
//     const lightbox = new bootstrap.Modal(document.getElementById(lightboxId));
//     lightbox.show();
//   }

//   prevImage() {
//     let activeImage = null;
//     document.querySelectorAll("img.gallery-item").forEach(img => {
//       if (img.getAttribute("src") === document.querySelector(".lightboxImage").getAttribute("src")) {
//         activeImage = img;
//       }
//     });

//     let activeTag = document.querySelector(".tags-bar span.active-tag").getAttribute("data-images-toggle");
//     let imagesCollection = [];

//     if (activeTag === "all") {
//       document.querySelectorAll(".item-column").forEach(item => {
//         if (item.querySelector("img")) {
//           imagesCollection.push(item.querySelector("img"));
//         }
//       });
//     } else {
//       document.querySelectorAll(".item-column").forEach(item => {
//         if (item.querySelector("img") && item.querySelector("img").getAttribute("data-gallery-tag") === activeTag) {
//           imagesCollection.push(item.querySelector("img"));
//         }
//       });
//     }

//     let index = 0;
//     imagesCollection.forEach((img, i) => {
//       if (img.getAttribute("src") === activeImage.getAttribute("src")) {
//         index = i - 1;
//       }
//     });

//     const next = imagesCollection[index] || imagesCollection[imagesCollection.length - 1];
//     document.querySelector(".lightboxImage").setAttribute("src", next.getAttribute("src"));
//   }

//   nextImage() {
//     let activeImage = null;
//     document.querySelectorAll("img.gallery-item").forEach(img => {
//       if (img.getAttribute("src") === document.querySelector(".lightboxImage").getAttribute("src")) {
//         activeImage = img;
//       }
//     });

//     let activeTag = document.querySelector(".tags-bar span.active-tag").getAttribute("data-images-toggle");
//     let imagesCollection = [];

//     if (activeTag === "all") {
//       document.querySelectorAll(".item-column").forEach(item => {
//         if (item.querySelector("img")) {
//           imagesCollection.push(item.querySelector("img"));
//         }
//       });
//     } else {
//       document.querySelectorAll(".item-column").forEach(item => {
//         if (item.querySelector("img") && item.querySelector("img").getAttribute("data-gallery-tag") === activeTag) {
//           imagesCollection.push(item.querySelector("img"));
//         }
//       });
//     }

//     let index = 0;
//     imagesCollection.forEach((img, i) => {
//       if (img.getAttribute("src") === activeImage.getAttribute("src")) {
//         index = i + 1;
//       }
//     });

//     const next = imagesCollection[index] || imagesCollection[0];
//     document.querySelector(".lightboxImage").setAttribute("src", next.getAttribute("src"));
//   }

//   showItemTags(position, tags) {
//     let tagItems = '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>';
//     tags.forEach(tag => {
//       tagItems += `<li class="nav-item"><span class="nav-link" data-images-toggle="${tag}">${tag}</span></li>`;
//     });

//     const tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

//     const gallery = document.querySelector(".gallery");
//     if (position === "bottom") {
//       gallery.insertAdjacentHTML('beforeend', tagsRow);
//     } else if (position === "top") {
//       gallery.insertAdjacentHTML('afterbegin', tagsRow);
//     } else {
//       console.error(`Unknown tags position: ${position}`);
//     }
//   }

//   filterByTag(target) {
//     if (target.classList.contains("active-tag")) {
//       return;
//     }

//     document.querySelector(".active.active-tag").classList.remove("active", "active-tag");
//     target.classList.add("active-tag", "active");

//     const tag = target.getAttribute("data-images-toggle");

//     document.querySelectorAll(".gallery-item").forEach(item => {
//       const parentColumn = item.closest(".item-column");
//       parentColumn.style.display = "none";

//       if (tag === "all" || item.getAttribute("data-gallery-tag") === tag) {
//         parentColumn.style.display = "block";
//       }
//     });
//   }
// }

// // Usage
// document.addEventListener("DOMContentLoaded", function() {
//   new MauGallery({
//     columns: 4,
//     lightBox: true,
//     lightboxId: 'myLightbox',
//     showTags: true,
//     tagsPosition: 'top',
//     navigation: true
//   });
// });

class MauGallery {
    constructor(element, options = {}) {
        this.element = element;
        this.defaults = {
            columns: 3,
            lightBox: true,
            lightboxId: 'galleryLightbox',
            showTags: true,
            tagsPosition: 'bottom',
            navigation: true
        };
        this.options = { ...this.defaults, ...options };
        this.tagsCollection = [];
        this.init();
    }
  
    init() {
        this.createRowWrapper();
        if (this.options.lightBox) {
            this.createLightBox(this.options.lightboxId, this.options.navigation);
        }
        this.listeners();
  
        const galleryItems = this.element.querySelectorAll('.gallery-item');
        galleryItems.forEach((item) => {
            this.responsiveImageItem(item);
            this.moveItemInRowWrapper(item);
            this.wrapItemInColumn(item, this.options.columns);
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
                            ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : ''}
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>' : ''}
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
  
        const prevButton = this.element.querySelector('.mg-prev');
        const nextButton = this.element.querySelector('.mg-next');
        if (prevButton) prevButton.addEventListener('click', this.prevImage.bind(this));
        if (nextButton) nextButton.addEventListener('click', this.nextImage.bind(this));
    }
  
    openLightBox(element) {
        const lightbox = document.getElementById(this.options.lightboxId);
        const lightboxImage = lightbox.querySelector('.lightboxImage');
        lightboxImage.src = element.src;
        const modal = new bootstrap.Modal(lightbox);
        modal.show();
    }
  
    prevImage() {
        // Implement the logic for the previous image button
    }
  
    nextImage() {
        // Implement the logic for the next image button
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
  
  