// *isMobile
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

// Submenu
const menu = document.querySelector('.menu');
const menuItems = menu.querySelectorAll('.menu__item');
if (menuItems.length > 0) {
    for (let index = 0; index < menuItems.length; index++) {
        const menuItem = menuItems[index];
        if (menuItem.children[1]) {
            menuItem.classList.add('_effect')
            if (window.innerWidth < 1349.98 || isMobile.any()) {
                const menuLink = menuItem.querySelector('.menu__link');
                menuLink.addEventListener('click', function (e) {
                    const changed = document.querySelector('._change');
                    if (!e.target.closest('.menu__item').classList.contains('_change')) {
                        if (changed) {
                            changed.classList.remove('_change');
                        }
                        e.target.closest('.menu__item').classList.add('_change');
                    } else {
                        e.target.closest('.menu__item').classList.remove('_change')
                    }
                    e.preventDefault();
                });
            }
        } else {
            menuItem.classList.remove('_effect')
        }
    }
}
// Search-appear
const headerFormParent = document.querySelector('.header__form-parent');
if (headerFormParent) {
    headerFormParent.style.display = 'flex';
    const searchButton = headerFormParent.querySelector('.header__form-icon');
    searchButton.addEventListener('click', function () {
        if (!isMobile.any() && !headerFormParent.classList.contains('_show')) {
            headerFormParent.classList.add('_show');
        } else {
            if (headerFormParent.querySelector('input').value) {
                headerFormParent.querySelector('form').submit();
            } else {
                headerFormParent.classList.remove('_show');
            }
        }
    });
}

let menuBody = document.querySelector('.header__burger');
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function () {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    })
}

let langMenuSwitch = document.querySelector('.header__flag-current');
let langMenu = document.querySelector('.header__flags');
if (langMenuSwitch && langMenu && isMobile.any()) {
    langMenuSwitch.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        langMenu.classList.toggle('_open');
        return false;
    })
}

// Form search dynamic
const parent_original = document.querySelector('.header__body');
let parent = document.querySelector('.header__burger');
const item = document.querySelector('.header__form-parent');
function dinamicAdaptive(e) {
    if (e.matches) {
        if (!item.classList.contains('done')) {
            if (document.querySelector('.error')) {
                parent = document.querySelector('.error__content')
                item.classList.add('_show')
            }
            parent.insertBefore(item, parent.children[2])
            item.classList.add('done')
        }
    } else {
        if (item.classList.contains('done')) {
            parent_original.insertBefore(item, parent_original.children[2])
            item.classList.remove('done')
        }
    }
}
const mediaWidth = window.matchMedia('(max-width: 767.98px)');
mediaWidth.addListener(dinamicAdaptive)
dinamicAdaptive(mediaWidth);

const businessBody = document.querySelector('.business__body');
if (businessBody) {
    const businessMob = document.querySelector('.business__mob');
    const businessImage = document.querySelector('.business__image');
    function businessAdaptive(e) {
        if (e.matches) {
            if (!businessImage.classList.contains('done')) {
                businessMob.insertBefore(businessImage, businessMob.children[0])
                businessImage.classList.add('done')
            }
        } else {
            if (businessImage.classList.contains('done')) {
                businessBody.insertBefore(businessImage, businessBody.children[0])
                businessImage.classList.remove('done')
            }
        }
    }
    mediaWidth.addListener(businessAdaptive)
    businessAdaptive(mediaWidth);
}



// hover products
if (!isMobile.any()) {
    const productsContainer = document.querySelector('.products__columns');
    if (productsContainer) {
        const products = productsContainer.querySelectorAll('.products__column');
        if (products.length > 0) {
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                const content = product.querySelector('.products__column-content');
                const title = product.querySelector('.products__column-title');
                const text = product.querySelector('.products__column-text');
                title.style.marginBottom = `-${text.offsetHeight}px`;
                product.addEventListener('mouseover', function (e) {
                    content.style.marginTop = `-${text.offsetHeight}px`;
                    title.style.marginBottom = `0px`;
                });
                product.addEventListener('mouseout', function (e) {
                    content.style.marginTop = `0px`;
                    title.style.marginBottom = `-${text.offsetHeight}px`;
                });
            }
        }
    }
}

// *Lazy Load
window.onload = function () {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const options = {
            rootMargin: "0px 0px 500px 0px",
            threshold: 0
        };
        const imageObserver = new IntersectionObserver(lazyImages => {
            for (let index = 0; index < lazyImages.length; index++) {
                const lazyImage = lazyImages[index];
                if (lazyImage.isIntersecting) {
                    loadImage(lazyImage.target)
                    imageObserver.unobserve(lazyImage.target);
                } else {
                    return;
                }
            }
        }, options);

        function loadImage(image) {
            if (image.dataset.src) {
                image.src = image.dataset.src;
                image.removeAttribute('data-src');
            }
        }

        lazyImages.forEach(image => {
            if (image.getBoundingClientRect().top + pageYOffset > pageYOffset) {
                imageObserver.observe(image);
            } else {
                loadImage(image);
            }
        });
    }
}
