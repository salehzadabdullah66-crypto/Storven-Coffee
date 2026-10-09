/**
 * Storven Coffee - Main JavaScript Logic
 * التحكم الكامل في التفاعلية، اللغات، الثيم، القائمة، الستوريز والواتساب
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // الحالة العامة للتطبيق (State Management)
    // --------------------------------------------------------------------------
    let currentLang = localStorage.getItem('storven_lang') || 'ar';
    let currentTheme = localStorage.getItem('storven_theme') || 'light';
    let activeCategory = 'all';
    let searchQuery = '';
    
    // حالة مشغل الستوريز
    let activeStoryIndex = 0;
    let storyTimer = null;
    let storyProgressInterval = null;
    let storyStartTime = 0;
    let storyRemainingTime = 5000; // 5 ثوانٍ لكل ستوري
    let isStoryPaused = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // --------------------------------------------------------------------------
    // 1. شاشة التحميل (Preloader)
    // --------------------------------------------------------------------------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
            }
        }, 500);
    });

    // احتياط في حال تأخر التحميل
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 2000);

    // --------------------------------------------------------------------------
    // 2. إدارة المظهر الداكن/الفاتح (Theme Switcher)
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    function applyTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('storven_theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    // --------------------------------------------------------------------------
    // 3. إدارة اللغات (AR / EN) وتغيير الاتجاه (RTL / LTR)
    // --------------------------------------------------------------------------
    const langSwitchBtn = document.getElementById('lang-switch-btn');
    const langLabel = document.getElementById('lang-label');

    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('storven_lang', lang);

        if (langLabel) {
            langLabel.textContent = lang === 'ar' ? 'EN' : 'عربي';
        }

        // تحديث جميع النصوص التي تحمل السمة [data-i18n]
        const dict = translations[lang];
        if (dict) {
            document.title = dict.siteTitle;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    el.innerHTML = dict[key];
                }
            });

            // تحديث العناصر ذات النصوص النائبة (Placeholders)
            document.querySelectorAll('[data-i18n-ph]').forEach(el => {
                const key = el.getAttribute('data-i18n-ph');
                if (dict[key]) {
                    el.setAttribute('placeholder', dict[key]);
                }
            });
        }

        // إعادة تصيير الأقسام الديناميكية
        renderMomentsReel();
        renderCategoryFilters();
        renderMenuItems();
        renderSpecialOffers();
        renderGalleryGrid();
        if (typeof updateTypewriterLang === 'function') {
            updateTypewriterLang(lang);
        }
    }

    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'ar' ? 'en' : 'ar';
            applyLanguage(nextLang);
        });
    }

    // --------------------------------------------------------------------------
    // 4. الهيدر، التنقل السلس وقائمة الموبايل (Sticky Nav & Mobile Drawer)
    // --------------------------------------------------------------------------
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        // Scroll Spy لتفعيل الرابط النشط
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // إغلاق القائمة عند النقر على أي رابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    // --------------------------------------------------------------------------
    // 5. تصيير شريط لحظات ستورفين (Storven Moments Stories Reel)
    // --------------------------------------------------------------------------
    const momentsContainer = document.getElementById('moments-container');

    function renderMomentsReel() {
        if (!momentsContainer) return;
        momentsContainer.innerHTML = '';

        storvenMoments.forEach((moment, idx) => {
            const pill = document.createElement('button');
            pill.className = 'story-pill';
            pill.setAttribute('type', 'button');
            pill.setAttribute('aria-label', currentLang === 'ar' ? moment.titleAr : moment.titleEn);

            const title = currentLang === 'ar' ? moment.titleAr : moment.titleEn;

            pill.innerHTML = `
                <div class="story-ring">
                    <div class="story-ring-inner">
                        <img src="${moment.cover}" alt="${title}" loading="lazy" />
                    </div>
                </div>
                <span class="story-title">${title}</span>
            `;

            pill.addEventListener('click', () => {
                openStoryViewer(idx);
            });

            momentsContainer.appendChild(pill);
        });
    }

    // --------------------------------------------------------------------------
    // 6. مشغل الستوريز بملء الشاشة (Stories Vertical Modal Player)
    // --------------------------------------------------------------------------
    const storyModal = document.getElementById('story-modal');
    const storyProgressBars = document.getElementById('story-progress-bars');
    const storyMediaImg = document.getElementById('story-media-img');
    const storyAuthorName = document.getElementById('story-author-name');
    const storyCaptionText = document.getElementById('story-caption-text');
    const storyCloseBtn = document.getElementById('story-close-btn');
    const storyPrevBtn = document.getElementById('story-prev-btn');
    const storyNextBtn = document.getElementById('story-next-btn');
    const storyMediaView = document.getElementById('story-media-view');

    function openStoryViewer(index) {
        activeStoryIndex = index;
        if (!storyModal) return;

        storyModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        buildStoryProgressSegments();
        showCurrentStory();
    }

    function closeStoryViewer() {
        if (!storyModal) return;
        storyModal.classList.remove('active');
        document.body.style.overflow = '';
        clearTimeout(storyTimer);
        clearInterval(storyProgressInterval);
    }

    function buildStoryProgressSegments() {
        if (!storyProgressBars) return;
        storyProgressBars.innerHTML = '';

        storvenMoments.forEach((_, idx) => {
            const seg = document.createElement('div');
            seg.className = 'story-progress-segment';
            const fill = document.createElement('div');
            fill.className = 'story-progress-fill';
            fill.id = `story-fill-${idx}`;
            seg.appendChild(fill);
            storyProgressBars.appendChild(seg);
        });
    }

    function showCurrentStory() {
        clearTimeout(storyTimer);
        clearInterval(storyProgressInterval);

        const currentStory = storvenMoments[activeStoryIndex];
        if (!currentStory) return;

        // تحديث الوسائط والنصوص
        if (storyMediaImg) {
            storyMediaImg.src = currentStory.mediaUrl;
            storyMediaImg.alt = currentLang === 'ar' ? currentStory.titleAr : currentStory.titleEn;
        }

        if (storyAuthorName) {
            storyAuthorName.textContent = currentLang === 'ar' ? currentStory.titleAr : currentStory.titleEn;
        }

        if (storyCaptionText) {
            storyCaptionText.textContent = currentLang === 'ar' ? currentStory.captionAr : currentStory.captionEn;
        }

        // تحديث أشرطة التقدم
        storvenMoments.forEach((_, idx) => {
            const fill = document.getElementById(`story-fill-${idx}`);
            if (fill) {
                if (idx < activeStoryIndex) {
                    fill.style.width = '100%';
                    fill.style.transition = 'none';
                } else if (idx > activeStoryIndex) {
                    fill.style.width = '0%';
                    fill.style.transition = 'none';
                }
            }
        });

        const activeFill = document.getElementById(`story-fill-${activeStoryIndex}`);
        if (activeFill) {
            activeFill.style.width = '0%';
            activeFill.style.transition = 'width 5000ms linear';
            // إجبار إعادة الرسم
            void activeFill.offsetWidth;
            activeFill.style.width = '100%';
        }

        storyStartTime = Date.now();
        storyRemainingTime = 5000;

        storyTimer = setTimeout(() => {
            nextStory();
        }, 5000);
    }

    function nextStory() {
        if (activeStoryIndex < storvenMoments.length - 1) {
            activeStoryIndex++;
            showCurrentStory();
        } else {
            closeStoryViewer();
        }
    }

    function prevStory() {
        if (activeStoryIndex > 0) {
            activeStoryIndex--;
            showCurrentStory();
        } else {
            showCurrentStory();
        }
    }

    if (storyCloseBtn) storyCloseBtn.addEventListener('click', closeStoryViewer);
    if (storyNextBtn) storyNextBtn.addEventListener('click', nextStory);
    if (storyPrevBtn) storyPrevBtn.addEventListener('click', prevStory);

    // النقر على يمين أو يسار شاشة الستوري للتقديم والترجيع
    if (storyMediaView) {
        storyMediaView.addEventListener('click', (e) => {
            const rect = storyMediaView.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const isRtl = document.documentElement.dir === 'rtl';

            if (isRtl) {
                // في وضع RTL: النقر يساراً = التالي، يميناً = السابق
                if (clickX < rect.width / 2) {
                    nextStory();
                } else {
                    prevStory();
                }
            } else {
                if (clickX > rect.width / 2) {
                    nextStory();
                } else {
                    prevStory();
                }
            }
        });

        // دعم السحب والإيماءات باللمس (Swipe Touch Gestures)
        storyMediaView.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        storyMediaView.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleStorySwipe();
        }, { passive: true });
    }

    function handleStorySwipe() {
        const threshold = 45;
        const diff = touchEndX - touchStartX;
        const isRtl = document.documentElement.dir === 'rtl';

        if (Math.abs(diff) > threshold) {
            if (diff < 0) {
                // سحب لليسار
                isRtl ? prevStory() : nextStory();
            } else {
                // سحب لليمين
                isRtl ? nextStory() : prevStory();
            }
        }
    }

    // إغلاق الستوري بمفتاح Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeStoryViewer();
            closeLightboxModal();
        }
    });

    // --------------------------------------------------------------------------
    // 7. تصيير فلاتر القائمة والبحث (Menu Categories & Filtering)
    // --------------------------------------------------------------------------
    const capsulesTrack = document.getElementById('capsules-track');
    const scrollLeftBtn = document.getElementById('scroll-filter-left');
    const scrollRightBtn = document.getElementById('scroll-filter-right');
    const menuSearchInput = document.getElementById('menu-search-input');
    const menuGrid = document.getElementById('menu-grid');

    function renderCategoryFilters() {
        if (!capsulesTrack) return;
        capsulesTrack.innerHTML = '';

        menuCategories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `category-capsule ${cat.id === activeCategory ? 'active' : ''}`;
            btn.setAttribute('type', 'button');
            const name = currentLang === 'ar' ? cat.nameAr : cat.nameEn;

            btn.innerHTML = `
                <span class="capsule-icon">${cat.icon}</span>
                <span class="capsule-text">${name}</span>
            `;

            btn.addEventListener('click', () => {
                activeCategory = cat.id;
                document.querySelectorAll('.category-capsule').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                renderMenuItems();
            });

            capsulesTrack.appendChild(btn);
        });
    }

    // أزرار تمرير شريط الكبسولات أفقياً
    if (scrollLeftBtn && capsulesTrack) {
        scrollLeftBtn.addEventListener('click', () => {
            capsulesTrack.scrollBy({ left: -220, behavior: 'smooth' });
        });
    }
    if (scrollRightBtn && capsulesTrack) {
        scrollRightBtn.addEventListener('click', () => {
            capsulesTrack.scrollBy({ left: 220, behavior: 'smooth' });
        });
    }

    // شريط البحث المباشر
    if (menuSearchInput) {
        menuSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            renderMenuItems();
        });
    }

    // --------------------------------------------------------------------------
    // 8. تصيير منتجات القائمة وإنشاء روابط الطلب لواتساب (Menu Items & WhatsApp)
    // --------------------------------------------------------------------------
    function renderMenuItems() {
        if (!menuGrid) return;
        menuGrid.innerHTML = '';

        // تصفية العناصر حسب الفئة والبحث النصي
        const filtered = menuItems.filter(item => {
            const matchesCategory = (activeCategory === 'all' || item.category === activeCategory);
            const nameAr = item.nameAr.toLowerCase();
            const nameEn = item.nameEn.toLowerCase();
            const descAr = item.descAr.toLowerCase();
            const descEn = item.descEn.toLowerCase();

            const matchesSearch = !searchQuery || 
                nameAr.includes(searchQuery) || 
                nameEn.includes(searchQuery) ||
                descAr.includes(searchQuery) ||
                descEn.includes(searchQuery);

            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            const emptyMsg = translations[currentLang].menuEmptyResults;
            menuGrid.innerHTML = `
                <div class="no-results-msg">
                    <p>☕ ${emptyMsg}</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card reveal active';

            const name = currentLang === 'ar' ? item.nameAr : item.nameEn;
            const desc = currentLang === 'ar' ? item.descAr : item.descEn;
            const orderBtnText = translations[currentLang].menuOrderBtn;

            // نص الرسالة الجاهزة لواتساب
            const whatsappText = currentLang === 'ar' 
                ? `مرحباً ستورفين كوفي، أود طلب: ${item.nameAr} (${item.price})`
                : `Hello Storven Coffee, I would like to order: ${item.nameEn} (${item.price})`;
            
            const whatsappUrl = `https://wa.me/${StorvenConfig.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            card.innerHTML = `
                <div class="product-image-box">
                    <img class="product-img" src="${item.image}" alt="${name}" loading="lazy" />
                    ${item.badge ? `<span class="product-badge-overlay">${item.badge}</span>` : ''}
                    <span class="product-price-pill">${item.price}</span>
                </div>
                <div class="product-body">
                    <h3 class="product-name">${name}</h3>
                    <p class="product-desc">${desc}</p>
                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-order">
                        <span>💬</span>
                        <span>${orderBtnText}</span>
                    </a>
                </div>
            `;

            menuGrid.appendChild(card);
        });
    }

    // --------------------------------------------------------------------------
    // 9. تصيير العروض المميزة (Special Offers)
    // --------------------------------------------------------------------------
    const offersGrid = document.getElementById('offers-grid');

    function renderSpecialOffers() {
        if (!offersGrid) return;
        offersGrid.innerHTML = '';

        specialOffers.forEach(offer => {
            const card = document.createElement('div');
            card.className = 'offer-card reveal active';

            const title = currentLang === 'ar' ? offer.titleAr : offer.titleEn;
            const desc = currentLang === 'ar' ? offer.descAr : offer.descEn;
            const badge = currentLang === 'ar' ? offer.badgeAr : offer.badgeEn;
            const expiry = currentLang === 'ar' ? offer.expiryAr : offer.expiryEn;
            const orderBtnText = translations[currentLang].offerOrderNow;
            const validLabel = translations[currentLang].offerValidUntil;

            const whatsappText = currentLang === 'ar'
                ? `مرحباً ستورفين كوفي، أود الاستفادة من عرض: ${offer.titleAr} بسعر ${offer.newPrice}`
                : `Hello Storven Coffee, I would like to claim the offer: ${offer.titleEn} for ${offer.newPrice}`;

            const whatsappUrl = `https://wa.me/${StorvenConfig.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            card.innerHTML = `
                <div class="offer-img-box">
                    <img src="${offer.image}" alt="${title}" loading="lazy" />
                    <span class="offer-ribbon">${offer.discount}</span>
                </div>
                <div class="offer-body">
                    <span class="offer-badge">${badge}</span>
                    <h3 class="offer-title">${title}</h3>
                    <p class="offer-desc">${desc}</p>
                    <div class="offer-price-row">
                        <div class="pricing-box">
                            <span class="old-price">${offer.oldPrice}</span>
                            <span class="new-price">${offer.newPrice}</span>
                        </div>
                        <span class="offer-expiry">${validLabel} ${expiry}</span>
                    </div>
                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-order">
                        <span>🎁</span>
                        <span>${orderBtnText}</span>
                    </a>
                </div>
            `;

            offersGrid.appendChild(card);
        });
    }

    // --------------------------------------------------------------------------
    // 10. تصيير المعرض وعارض الصور المنبثق (Gallery & Lightbox Modal)
    // --------------------------------------------------------------------------
    const galleryGrid = document.getElementById('gallery-grid');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    function renderGalleryGrid() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        galleryItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-card reveal active';
            const caption = currentLang === 'ar' ? item.captionAr : item.captionEn;

            card.innerHTML = `
                <img src="${item.url}" alt="${caption}" loading="lazy" />
                <div class="gallery-overlay">
                    <p class="gallery-caption">${caption}</p>
                </div>
            `;

            card.addEventListener('click', () => {
                openLightbox(item.url, caption);
            });

            galleryGrid.appendChild(card);
        });
    }

    function openLightbox(url, caption) {
        if (!lightboxModal) return;
        lightboxImg.src = url;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightboxModal() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxModal);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightboxModal();
        });
    }

    // --------------------------------------------------------------------------
    // 11. نموذج التواصل السريع لواتساب (Quick Contact WhatsApp Form)
    // --------------------------------------------------------------------------
    const quickContactForm = document.getElementById('quick-contact-form');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name')?.value.trim();
            const topic = document.getElementById('contact-topic')?.value;
            const message = document.getElementById('contact-message')?.value.trim();

            const topicText = {
                general: currentLang === 'ar' ? 'استفسار عام' : 'General Inquiry',
                reservation: currentLang === 'ar' ? 'حجز طاولة' : 'Table Reservation',
                order: currentLang === 'ar' ? 'طلب مسبق' : 'Takeaway Pre-Order'
            }[topic] || topic;

            let compiledMessage = '';
            if (currentLang === 'ar') {
                compiledMessage = `مرحباً ستورفين كوفي،\nالاسم: ${name}\nالموضوع: ${topicText}\nالرسالة:\n${message}`;
            } else {
                compiledMessage = `Hello Storven Coffee,\nName: ${name}\nTopic: ${topicText}\nMessage:\n${message}`;
            }

            const waUrl = `https://wa.me/${StorvenConfig.whatsappNumber}?text=${encodeURIComponent(compiledMessage)}`;
            window.open(waUrl, '_blank');
        });
    }

    // تحديث رابط خرائط جوجل ورقم الهاتف في الأقسام
    const googleMapBtn = document.getElementById('google-map-btn');
    if (googleMapBtn) {
        googleMapBtn.href = StorvenConfig.googleMapsLink;
    }

    // تفاعليات خريطة الموقع المتقدمة (Interactive Location Map Controls)
    const mapWrapper = document.getElementById('map-wrapper');
    const mapInteractionToggle = document.getElementById('map-interaction-toggle');
    const mapLockIcon = document.getElementById('map-lock-icon');
    const mapLockLabel = document.getElementById('map-lock-label');

    if (mapInteractionToggle && mapWrapper) {
        mapInteractionToggle.addEventListener('click', () => {
            const isInteractive = mapWrapper.classList.toggle('interactive');
            if (isInteractive) {
                if (mapLockIcon) mapLockIcon.textContent = '🔓';
                if (mapLockLabel) mapLockLabel.textContent = currentLang === 'ar' ? 'الخريطة مفعلة (انقر للقفل)' : 'Map Active (Click to Lock)';
            } else {
                if (mapLockIcon) mapLockIcon.textContent = '🔒';
                if (mapLockLabel) mapLockLabel.textContent = currentLang === 'ar' ? 'انقر لتفعيل الخريطة' : 'Click to Interact with Map';
            }
        });
    }

    // زر نسخ العنوان مع إشعار بصري فوري
    const copyAddressBtn = document.getElementById('copy-address-btn');
    const copyAddressLabel = document.getElementById('copy-address-label');
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', () => {
            const addressText = document.getElementById('cafe-address-text')?.textContent || "سوريا، ريف إدلب - قرب أوتوستراد إدلب الدولي";
            navigator.clipboard.writeText(addressText).then(() => {
                if (copyAddressLabel) {
                    const originalText = copyAddressLabel.textContent;
                    copyAddressLabel.textContent = currentLang === 'ar' ? 'تم نسخ العنوان! ✓' : 'Address Copied! ✓';
                    setTimeout(() => {
                        copyAddressLabel.textContent = originalText;
                    }, 2500);
                }
            }).catch(() => {});
        });
    }

    // زر نسخ الإحداثيات
    const copyCoordsBtn = document.getElementById('copy-coords-btn');
    if (copyCoordsBtn) {
        copyCoordsBtn.addEventListener('click', () => {
            navigator.clipboard.writeText("35.9306, 36.6339").then(() => {
                const coordsTextEl = copyCoordsBtn.querySelector('.coords-text');
                if (coordsTextEl) {
                    const prev = coordsTextEl.textContent;
                    coordsTextEl.textContent = currentLang === 'ar' ? 'تم نسخ الإحداثيات! ✓' : 'Coords Copied! ✓';
                    setTimeout(() => {
                        coordsTextEl.textContent = prev;
                    }, 2500);
                }
            }).catch(() => {});
        });
    }

    const floatingWaBtn = document.getElementById('floating-whatsapp-btn');
    if (floatingWaBtn) {
        const welcomeText = currentLang === 'ar'
            ? 'مرحباً ستورفين كوفي، أود التواصل معكم.'
            : 'Hello Storven Coffee, I would like to get in touch.';
        floatingWaBtn.href = `https://wa.me/${StorvenConfig.whatsappNumber}?text=${encodeURIComponent(welcomeText)}`;
    }

    // --------------------------------------------------------------------------
    // حالة الطقس المباشرة لموقع المقهى (Live Cafe Weather Widget)
    // --------------------------------------------------------------------------
    async function initCafeWeather() {
        const weatherTemp = document.getElementById('weather-temp');
        const weatherCondition = document.getElementById('weather-condition');
        const weatherIcon = document.getElementById('weather-icon');
        const weatherHumidity = document.getElementById('weather-humidity');
        const weatherWind = document.getElementById('weather-wind');

        if (!weatherTemp) return;

        try {
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.9306&longitude=36.6339&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day');
            if (res.ok) {
                const data = await res.json();
                const curr = data.current;
                const temp = Math.round(curr.temperature_2m);
                const isDay = curr.is_day === 1;
                const code = curr.weather_code;

                weatherTemp.textContent = `${temp}°C`;
                if (weatherHumidity) weatherHumidity.textContent = `${Math.round(curr.relative_humidity_2m)}%`;
                if (weatherWind) weatherWind.textContent = `${Math.round(curr.wind_speed_10m)} كم/س`;

                let icon = isDay ? '☀️' : '🌙';
                let descAr = 'أجواء معتدلة وصافية';
                let descEn = 'Clear & Pleasant';

                if (code >= 1 && code <= 3) {
                    icon = isDay ? '🌤️' : '☁️';
                    descAr = 'غائم جزئياً ولطيف';
                    descEn = 'Partly Cloudy';
                } else if (code >= 45 && code <= 48) {
                    icon = '🌫️';
                    descAr = 'ضباب خفيف منعش';
                    descEn = 'Misty & Cool';
                } else if (code >= 51 && code <= 67) {
                    icon = '🌧️';
                    descAr = 'أمطار خفيفة منعشة';
                    descEn = 'Light Refreshing Rain';
                } else if (code >= 80) {
                    icon = '🌦️';
                    descAr = 'زخات مطر منعشة';
                    descEn = 'Rain Showers';
                }

                if (weatherIcon) weatherIcon.textContent = icon;
                if (weatherCondition) {
                    weatherCondition.textContent = currentLang === 'ar' ? descAr : descEn;
                }
            }
        } catch (e) {
            // الاحتفاظ بالقيم الافتراضية بسلاسة
        }
    }
    initCafeWeather();

    // --------------------------------------------------------------------------
    // حاسبة المسافة والوقت بالسيارة من موقع الزائر (Live Road Distance Calculator)
    // --------------------------------------------------------------------------
    const CAFE_LAT = 35.9306;
    const CAFE_LNG = 36.6339;

    function calcHaversineKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const toRad = deg => (deg * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1.25; // معامل تعرج الطريق الواقعي
    }

    function updateDistanceUI(km, minTime, routeNote, userLat, userLng) {
        const distKmEl = document.getElementById('user-dist-km');
        const distTimeEl = document.getElementById('user-dist-time');
        const distHighwayEl = document.getElementById('user-dist-highway');
        const googleBtn = document.getElementById('google-map-btn');

        if (distKmEl) distKmEl.textContent = `${km.toFixed(1)} كم`;
        if (distTimeEl) distTimeEl.textContent = `~${Math.max(1, Math.round(minTime))} دقائق`;
        if (distHighwayEl && routeNote) distHighwayEl.textContent = routeNote;

        if (googleBtn && userLat && userLng) {
            googleBtn.href = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${CAFE_LAT},${CAFE_LNG}`;
        }
    }

    const btnCalcGps = document.getElementById('btn-calc-gps');
    const btnCalcLabel = document.getElementById('btn-calc-label');

    if (btnCalcGps) {
        btnCalcGps.addEventListener('click', () => {
            if (!navigator.geolocation) {
                alert(currentLang === 'ar' ? 'المتصفح لا يدعم تحديد الموقع المباشر.' : 'Geolocation is not supported.');
                return;
            }

            if (btnCalcLabel) {
                btnCalcLabel.textContent = currentLang === 'ar' ? 'جارٍ تحديد موقعك... ⏳' : 'Locating GPS... ⏳';
            }

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const uLat = pos.coords.latitude;
                    const uLng = pos.coords.longitude;
                    const km = calcHaversineKm(uLat, uLng, CAFE_LAT, CAFE_LNG);
                    const minutes = (km / 45) * 60; // متوسط سرعة 45 كم/ساعة بالسيارة

                    updateDistanceUI(km, minutes, currentLang === 'ar' ? 'ملاحة مباشرة لموقعك' : 'Live GPS Route', uLat, uLng);

                    if (btnCalcLabel) {
                        btnCalcLabel.textContent = currentLang === 'ar' ? 'تم تحديث مسافتك! ✓' : 'Distance Updated! ✓';
                        setTimeout(() => {
                            btnCalcLabel.textContent = currentLang === 'ar' ? 'تحديث موقعي 📍' : 'Refresh My GPS 📍';
                        }, 3000);
                    }

                    document.querySelectorAll('.preset-city-btn').forEach(b => b.classList.remove('active'));
                },
                () => {
                    if (btnCalcLabel) {
                        btnCalcLabel.textContent = currentLang === 'ar' ? 'تعذر الوصول لموقعك ⚠️' : 'GPS Permission Denied ⚠️';
                        setTimeout(() => {
                            btnCalcLabel.textContent = currentLang === 'ar' ? 'تحديد مسافتي المباشرة 📍' : 'Locate My Distance 📍';
                        }, 3000);
                    }
                },
                { enableHighAccuracy: true, timeout: 8000 }
            );
        });
    }

    // أزرار المدن والمناطق القريبة التقديرية
    document.querySelectorAll('.preset-city-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.preset-city-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const km = parseFloat(btn.getAttribute('data-km')) || 3.8;
            const time = parseFloat(btn.getAttribute('data-time')) || 5;
            const lat = parseFloat(btn.getAttribute('data-lat')) || 35.9333;
            const lng = parseFloat(btn.getAttribute('data-lng')) || 36.6333;

            updateDistanceUI(km, time, currentLang === 'ar' ? 'طريق سلس وسريع' : 'Smooth Route', lat, lng);
        });
    });

    // --------------------------------------------------------------------------
    // 12. حركات الدخول عند التمرير (Intersection Observer for Reveal)
    // --------------------------------------------------------------------------
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ضمان فوري لظهور كافة الأقسام (من نحن، تواصل معنا وغيرها) وعدم بقاء أي قسم فارغاً
    function checkRevealVisibility() {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        document.querySelectorAll('.reveal:not(.active)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= vh * 1.1) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkRevealVisibility, { passive: true });
    window.addEventListener('resize', checkRevealVisibility, { passive: true });
    checkRevealVisibility();
    setTimeout(checkRevealVisibility, 200);
    setTimeout(checkRevealVisibility, 800);

    // --------------------------------------------------------------------------
    // 13. تأثير الآلة الكاتبة الاحترافي ودخان العنوان المتصاعد (Hero Title Typewriter & Coffee Steam)
    // --------------------------------------------------------------------------
    const heroTypewriterEl = document.getElementById('heroTypewriterText');
    const heroCursorEl = document.getElementById('heroTypewriterCursor');
    const heroSteamCanvas = document.getElementById('heroTitleSteamCanvas');

    const typewriterPhrases = {
        ar: [
            "Storven Coffee"
        ],
        en: [
            "Storven Coffee"
        ]
    };

    let typewriterState = {
        lang: currentLang,
        phraseIndex: 0,
        charIndex: 0,
        isDeleting: false,
        timeoutId: null
    };

    function isEnglishText(text) {
        return /[a-zA-Z]/.test(text);
    }

    // محرك البخار والدخان المتصاعد الواقعي باستخدام HTML5 Canvas
    let steamCtx = null;
    let steamParticles = [];
    let steamAnimFrame = null;
    let isSteamActive = true;

    function initTitleSteamEngine() {
        if (!heroSteamCanvas) return;
        steamCtx = heroSteamCanvas.getContext('2d');
        if (!steamCtx) return;

        function resizeSteamCanvas() {
            const rect = heroSteamCanvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            heroSteamCanvas.width = Math.max(rect.width * dpr, 200);
            heroSteamCanvas.height = Math.max(rect.height * dpr, 150);
            steamCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resizeSteamCanvas();
        window.addEventListener('resize', resizeSteamCanvas);

        function createSteamParticle(burstX, burstY) {
            const canvasRect = heroSteamCanvas.getBoundingClientRect();
            const w = canvasRect.width || 350;
            const h = canvasRect.height || 180;

            const startX = burstX !== undefined ? burstX : (w * 0.28 + Math.random() * (w * 0.44));
            const startY = burstY !== undefined ? burstY : (h - 22 - Math.random() * 10);
            const baseSize = 12 + Math.random() * 10;
            const growthRate = 0.20 + Math.random() * 0.20;

            return {
                x: startX,
                y: startY,
                vx: (Math.random() - 0.5) * 0.32,
                vy: -0.52 - Math.random() * 0.42,
                wobbleSpeed: 0.02 + Math.random() * 0.025,
                wobbleAmp: 0.75 + Math.random() * 0.75,
                wobbleOffset: Math.random() * Math.PI * 2,
                size: baseSize,
                growthRate: growthRate,
                maxSize: baseSize + 30 + Math.random() * 22,
                alpha: 0,
                maxAlpha: 0.22 + Math.random() * 0.08, // وضوح جميل مع وهج دافئ
                life: 0,
                maxLife: 95 + Math.random() * 50
            };
        }

        let spawnCounter = 0;
        function renderSteamLoop() {
            if (!isSteamActive) return;

            const canvasRect = heroSteamCanvas.getBoundingClientRect();
            const w = canvasRect.width || 350;
            const h = canvasRect.height || 180;

            steamCtx.clearRect(0, 0, w, h);

            spawnCounter++;
            // يبدأ الدخان بالظهور التدريجي عندما تبدأ الكلمة بالتشكل وتستمر بكثافة متوازنة
            const hasStartedTyping = typewriterState.charIndex >= 4;

            if (hasStartedTyping && (spawnCounter % 5 === 0) && steamParticles.length < 22) {
                let targetX = w * 0.42;
                if (heroTypewriterEl) {
                    const textRect = heroTypewriterEl.getBoundingClientRect();
                    const relativeLeft = textRect.left - canvasRect.left;
                    const relativeWidth = textRect.width;
                    if (relativeWidth > 20) {
                        targetX = relativeLeft + Math.random() * relativeWidth;
                    }
                }
                steamParticles.push(createSteamParticle(targetX, h - 25));
            }

            for (let i = steamParticles.length - 1; i >= 0; i--) {
                const p = steamParticles[i];
                p.life++;

                p.x += p.vx + Math.sin(p.life * p.wobbleSpeed + p.wobbleOffset) * (p.wobbleAmp * 0.25);
                p.y += p.vy;
                p.size = Math.min(p.size + p.growthRate, p.maxSize);

                const progress = p.life / p.maxLife;
                if (progress < 0.25) {
                    p.alpha = (progress / 0.25) * p.maxAlpha;
                } else {
                    p.alpha = (1 - (progress - 0.25) / 0.75) * p.maxAlpha;
                }

                if (p.life >= p.maxLife || p.y < -p.size || p.alpha <= 0.003) {
                    steamParticles.splice(i, 1);
                    continue;
                }

                const rad = p.size;
                const grad = steamCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
                grad.addColorStop(0, `rgba(255, 250, 240, ${p.alpha * 0.95})`);
                grad.addColorStop(0.28, `rgba(255, 230, 175, ${p.alpha * 0.65})`);
                grad.addColorStop(0.65, `rgba(201, 165, 92, ${p.alpha * 0.25})`);
                grad.addColorStop(1, 'rgba(15, 42, 29, 0)');

                steamCtx.save();
                // وهج دافئ ذهبي بسيط
                steamCtx.shadowBlur = 12;
                steamCtx.shadowColor = `rgba(223, 197, 135, ${p.alpha * 1.1})`;
                steamCtx.fillStyle = grad;
                steamCtx.beginPath();
                steamCtx.arc(p.x, p.y, rad, 0, Math.PI * 2);
                steamCtx.fill();
                steamCtx.restore();
            }

            steamAnimFrame = requestAnimationFrame(renderSteamLoop);
        }

        const heroSection = document.getElementById('hero');
        if (heroSection && 'IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    if (!isSteamActive) {
                        isSteamActive = true;
                        renderSteamLoop();
                    }
                } else {
                    isSteamActive = false;
                    cancelAnimationFrame(steamAnimFrame);
                }
            }, { threshold: 0.1 });
            obs.observe(heroSection);
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isSteamActive = false;
                cancelAnimationFrame(steamAnimFrame);
            } else {
                if (!isSteamActive) {
                    isSteamActive = true;
                    renderSteamLoop();
                }
            }
        });

        renderSteamLoop();
    }

    function typeStep() {
        if (!heroTypewriterEl) return;
        const phrases = typewriterPhrases[typewriterState.lang] || typewriterPhrases.ar;
        const currentPhrase = phrases[typewriterState.phraseIndex % phrases.length];

        if (heroCursorEl) {
            heroCursorEl.classList.add('typing');
        }

        if (!typewriterState.isDeleting) {
            typewriterState.charIndex++;
            const currentSubstr = currentPhrase.substring(0, typewriterState.charIndex);
            heroTypewriterEl.textContent = currentSubstr;

            if (isEnglishText(currentSubstr)) {
                heroTypewriterEl.classList.add('brand-en');
            } else {
                heroTypewriterEl.classList.remove('brand-en');
            }

            if (typewriterState.charIndex >= currentPhrase.length) {
                if (heroCursorEl) heroCursorEl.classList.remove('typing');
                typewriterState.isDeleting = true;
                const isBrand = currentPhrase.includes('Storven');
                typewriterState.timeoutId = setTimeout(typeStep, isBrand ? 3200 : 2200);
                return;
            }

            const typingDelay = 85 + Math.random() * 45;
            typewriterState.timeoutId = setTimeout(typeStep, typingDelay);
        } else {
            typewriterState.charIndex--;
            const currentSubstr = currentPhrase.substring(0, typewriterState.charIndex);
            heroTypewriterEl.textContent = currentSubstr;

            if (currentSubstr.length > 0) {
                if (isEnglishText(currentSubstr)) {
                    heroTypewriterEl.classList.add('brand-en');
                } else {
                    heroTypewriterEl.classList.remove('brand-en');
                }
            }

            if (typewriterState.charIndex <= 0) {
                if (heroCursorEl) heroCursorEl.classList.remove('typing');
                typewriterState.isDeleting = false;
                typewriterState.phraseIndex = (typewriterState.phraseIndex + 1) % phrases.length;
                typewriterState.timeoutId = setTimeout(typeStep, 450);
                return;
            }

            typewriterState.timeoutId = setTimeout(typeStep, 40);
        }
    }

    function updateTypewriterLang(newLang) {
        if (typewriterState.timeoutId) {
            clearTimeout(typewriterState.timeoutId);
        }
        typewriterState.lang = newLang;
        typewriterState.phraseIndex = 0;
        typewriterState.charIndex = 0;
        typewriterState.isDeleting = false;
        if (heroTypewriterEl) {
            heroTypewriterEl.textContent = '';
        }
        typeStep();
    }

    // تشغيل محرك البخار والآلة الكاتبة
    initTitleSteamEngine();
    typeStep();

    // --------------------------------------------------------------------------
    // تهيئة التطبيق باللغة المختارة
    // --------------------------------------------------------------------------
    applyLanguage(currentLang);
});
