// $(document).ready((function(){$(".gallery").mauGallery({columns:{xs:1,sm:2,md:3,lg:3,xl:3},lightBox:!0,lightboxId:"myAwesomeLightbox",showTags:!0,tagsPosition:"top"})}));
document.addEventListener("DOMContentLoaded", function() {
    const galleries = document.querySelectorAll(".gallery");
    galleries.forEach(function(gallery) {
        new MauGallery(gallery, {
            columns: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3
            },
            lightBox: true,
            lightboxId: "myAwesomeLightbox",
            showTags: true,
            tagsPosition: "top"
        });
    });
});
