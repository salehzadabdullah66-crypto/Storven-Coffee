/**
 * Storven Coffee - Data & Configuration File
 * ملف بيانات مقهى ستورفين كوفي - سهل التعديل والإضافة
 */

const StorvenConfig = {
    // رقم الواتساب الخاص بالمقهى (مع الرمز الدولي بدون + أو أصفار إضافية)
    whatsappNumber: "963900000000", // يمكنك تغييره لرقم المقهى المعتمد
    phoneDisplay: "+963 900 000 000",
    email: "contact@storvencoffee.com",
    address: {
        ar: "سوريا، ريف إدلب - قرب أوتوستراد إدلب الدولي",
        en: "Syria, Idlib Countryside - Near Idlib Highway"
    },
    googleMapsLink: "https://maps.google.com/?q=35.9306,36.6339",
    workingHours: {
        ar: "يومياً من الساعة 7:00 صباحاً حتى 1:00 بعد منتصف الليل",
        en: "Daily from 7:00 AM to 1:00 AM"
    },
    socialLinks: {
        instagram: "https://instagram.com/storvencoffee",
        facebook: "https://facebook.com/storvencoffee",
        tiktok: "https://tiktok.com/@storvencoffee",
        twitter: "https://x.com/storvencoffee",
        telegram: "https://t.me/storvencoffee"
    }
};

// قاموس الترجمة الكامل بين العربية والإنجليزية
const translations = {
    ar: {
        siteTitle: "ستورفين كوفي | Storven Coffee - محطة القهوة المختصة قرب أوتوستراد إدلب",
        tagline: "قهوة تُحضَّر بشغف",
        navHome: "الرئيسية",
        navAbout: "من نحن",
        navMenu: "القائمة",
        navOffers: "العروض",
        navGallery: "المعرض",
        navLocation: "موقعنا",
        navContact: "تواصل معنا",
        
        // Hero
        heroBadge: "☕ قهوة مختصة، لحظات لا تُنسى",
        heroTitlePrefix: "مرحباً بكم في",
        heroTitleBrand: "ستورفين Coffee",
        heroSubtitle: "محطتك الدافئة على أوتوستراد إدلب. حبوب منتقاة بعناية، تحميص احترافي، وأجواء تأسر الحواس لتبدأ رحلتك بأفضل مذاق.",
        heroBtnMenu: "تصفح القائمة",
        heroBtnContact: "تواصل معنا عبر واتساب",
        heroStatDrinks: "+35 صنفاً مميزاً",
        heroStatOrigin: "بن مختص 100%",
        heroStatAmbiance: "أجواء عائلية ودافئة",

        // Stories
        momentsTitle: "لحظات ستورفين",
        momentsSubtitle: "شاهد كواليس تحضير مشروباتنا والأجواء اليومية الاستثنائية",

        // About / Our Story
        storyBadge: "قصتنا وأصل الشغف",
        storyTitle: "بيت القهوة الذي تحنّ إليه في كل طريق",
        storyP1: "انطلق مقهى «ستورفين كوفي» ليكون واحة الاستراحة الأولى ومحطة الاسترخاء الراقية للمسافرين وأهالي المنطقة بالقرب من أوتوستراد إدلب. نؤمن بأن فنجان القهوة ليس مجرد مشروب عابر، بل هو طقس من السعادة والإلهام.",
        storyP2: "نختار محاصيل البن الأثيوبي والكولومبي بعناية فائقة ونحمصها بأساليب دقيقة، مع تشكيلة عصرية واسعة تشمل الموهيتو المنعش، الميلك شيك، الحلويات الفاخرة والأراكيل الفاخرة.",
        badgeDailySpecial: "+10 مشروبات مبتكرة يومياً",
        feature1Title: "حبوب مختارة بعناية",
        feature1Desc: "سلالات بن نقية بدرجات تحميص متوازنة تبرز النوتات العطرية الفريدة.",
        feature2Title: "أجواء دافئة وفاخرة",
        feature2Desc: "تصميم مريح يجمع بين الطبيعة الخضراء ولمسات الخشب الذهبية الدافئة.",
        feature3Title: "خدمة سريعة للمسافرين",
        feature3Desc: "استلم طلبك سريعاً لتواصل رحلتك بنشاط وانتعاش.",
        feature4Title: "موقع استراتيجي مميز",
        feature4Desc: "على مقربة مباشرة من أوتوستراد إدلب مع مواقف مريحة وواسعة.",

        // Video Showcase
        videoShowcaseBadge: "🎬 تجربة ستورفين السينمائية",
        videoShowcaseTitle: "شغف وسحر القهوة في كل قطرة",
        videoShowcaseSubtitle: "شاهد كيف تبدأ رحلة النكهة الحقيقية مع تدفق الإسبريسو الفاخر وحبوب البن المنتقاة بعناية",
        videoShowcaseFeature1: "تحميص حرفي طازج",
        videoShowcaseFeature1Desc: "أفضل سلالات البن الأثيوبي والكولومبي",
        videoShowcaseFeature2: "استخلاص إسبريسو مثالي",
        videoShowcaseFeature2Desc: "قوام كريمي ونكهات عطرية غنية ومتوازنة",
        videoShowcaseFeature3: "نكهة تأسر الحواس",
        videoShowcaseFeature3Desc: "طقس يومي من السعادة مع كل رشفة",

        // Menu
        menuTitle: "تشكيلة Storven المميزة",
        menuSubtitle: "استكشف قائمتنا الغنية بالمشروبات المختصة والمأكولات الشهية",
        menuCurrencyBadge: "💵 الأسعار بالدولار الأمريكي ($) حسب القائمة المعتمدة في المقهى",
        menuSearchPlaceholder: "ابحث عن مشروبك أو حلاك المفضل...",
        menuOrderBtn: "اطلب عبر واتساب",
        menuEmptyResults: "عذراً، لم نجد أصنافاً مطابقة لبحثك.",
        filterAll: "الكل",
        menuViewAll: "عرض كل القائمة",
        menuViewLess: "عرض أقل",

        // Offers
        offersTitle: "عروض ستورفين الحصرية",
        offersSubtitle: "باقات مميزة ومذاقات لا تقاوم بأسعار استثنائية",
        offerValidUntil: "صالح حتى:",
        offerOrderNow: "احصل على العرض",

        // Gallery
        galleryTitle: "معرض الصور والأجواء",
        gallerySubtitle: "لقطات توثق تفاصيل المكان ورائحة البن المنعشة",

        // Location
        locationTitle: "موقعنا وساعات العمل",
        locationSubtitle: "نحن بانتظارك لتستمتع بأجمل الأوقات معنا على طريق أوتوستراد إدلب",
        locationAddressTitle: "العنوان:",
        locationHoursTitle: "ساعات العمل:",
        locationGetDirections: "الاتجاهات عبر خرائط جوجل",
        locationLiveOpen: "مفتوح الآن • نستقبلكم حتى 1:00 ص",
        locationLiveClosed: "مغلق الآن • يفتح الساعة 7:00 ص",
        locationCopyAddress: "نسخ العنوان 📋",
        locationAddressCopied: "تم نسخ العنوان بنجاح! ✓",
        locationShareWa: "إرسال الموقع لواتساب 📲",
        locationMapControlsToggle: "انقر لتفعيل الخريطة",
        locationMapControlsLocked: "الخريطة مؤمنة للتمرير",
        locationAmenitiesTitle: "مزايا وخدمات المحطة:",
        locationAmenityParking: "مواقف واسعة مجانية",
        locationAmenityWifi: "واي فاي سريع مجاناً",
        locationAmenityCharging: "شواحن للهواتف",
        locationAmenityLounge: "جلسات عائلية وتراس",
        locationAmenityDrive: "استلام سريع للسيارة",
        locationDistCity: "5 دقائق من وسط إدلب",
        locationDistHighway: "دقيقة واحدة من الأوتوستراد",
        weatherTitle: "طقس المقهى الآن",
        weatherCondition: "مشمس ومعتدل",
        weatherSubnote: "أجواء مهيأة للجلسات الخارجية والتراس 🌿",
        weatherHumidity: "رطوبة",
        weatherWind: "رياح",
        distanceCardTitle: "المسافة من موقعك إلى المقهى",
        distanceCardHint: "حدد موقعك المباشر أو اختر منطقتك لمعرفة المسافة ووقت الوصول",
        distanceBtnGps: "تحديد مسافتي المباشرة 📍",
        distanceCalculating: "جارٍ تحديد الموقع...",
        distanceLabel: "المسافة بالسيارة",
        distanceTimeLabel: "وقت القيادة التقديري",
        distanceRouteLabel: "طريق مباشر وسلس",
        distanceQuickPresets: "مسافات تقديرية سريعة:",

        // Contact
        contactTitle: "تواصل معنا مباشرة",
        contactSubtitle: "يسعدنا الرد على استفساراتك وحجز طاولتك أو استقبال طلبك الخارجي",
        contactFormTitle: "إرسال رسالة سريعة لواتساب",
        contactNameLabel: "الاسم الكريم",
        contactNamePlaceholder: "أدخل اسمك هنا...",
        contactTopicLabel: "نوع الطلب",
        contactTopicGeneral: "استفسار عام",
        contactTopicReserve: "حجز جلسة أو طاولة",
        contactTopicOrder: "طلب خارجي مسبق",
        contactMessageLabel: "الرسالة أو الطلب",
        contactMessagePlaceholder: "اكتب تفاصيل طلبك أو رسالتك...",
        contactSendBtn: "إرسال الرسالة إلى واتساب 💬",
        doodleTitle: "Let's Stay Connected!",
        doodleSubtitle: "تابعنا على منصات التواصل الاجتماعي ✏️",
        doodleFooter: "صُنع بشغف ☕ وإبداع ✏️",

        // Footer
        footerDesc: "وجهتكم الأولى للقهوة المختصة وأرقى المشروبات على طريق أوتوستراد إدلب. شغف متجدد في كل قطرة.",
        footerQuickLinks: "روابط سريعة",
        footerContactInfo: "معلومات الاتصال",
        footerRights: "جميع الحقوق محفوظة © 2025 مقهى ستورفين كوفي (Storven Coffee).",
        footerDesignNotice: "صُمم بحب وإتقان لرواد القهوة المختصة.",

        // Floating WhatsApp
        floatWhatsAppText: "تواصل معنا",

        // Story modal
        storyClose: "إغلاق",
        storyPrev: "السابق",
        storyNext: "التالي"
    },
    en: {
        siteTitle: "Storven Coffee | Specialty Coffee Stop near Idlib Highway",
        tagline: "Coffee Crafted with Passion",
        navHome: "Home",
        navAbout: "About Us",
        navMenu: "Menu",
        navOffers: "Offers",
        navGallery: "Gallery",
        navLocation: "Location",
        navContact: "Contact",

        // Hero
        heroBadge: "☕ Specialty Coffee, Unforgettable Moments",
        heroTitlePrefix: "Welcome to",
        heroTitleBrand: "Storven Coffee",
        heroSubtitle: "Your warm oasis right off the Idlib highway. Carefully selected beans, artisan brewing, and a cozy atmosphere crafted to fuel your journey.",
        heroBtnMenu: "Explore Menu",
        heroBtnContact: "Contact on WhatsApp",
        heroStatDrinks: "35+ Artisan Items",
        heroStatOrigin: "100% Specialty Beans",
        heroStatAmbiance: "Warm & Cozy Vibe",

        // Stories
        momentsTitle: "Storven Moments",
        momentsSubtitle: "Watch behind-the-scenes brewing and our daily cozy vibes",

        // About / Our Story
        storyBadge: "Our Heritage & Passion",
        storyTitle: "The Coffee Sanctuary You Yearn For on the Road",
        storyP1: "Storven Coffee was established to be the ultimate rest-stop and premier coffee haven for travelers and locals alike along the Idlib highway. We believe a cup of coffee is an intimate ritual of comfort and inspiration.",
        storyP2: "We source pristine Ethiopian, Colombian, and specialty origins, paired with a vibrant lineup of mojitos, creamy milkshakes, exquisite desserts, and premium shisha lounge offerings.",
        badgeDailySpecial: "10+ Daily Craft Specials",
        feature1Title: "Carefully Selected Beans",
        feature1Desc: "Pure origin lots masterfully roasted to accentuate vibrant aromatic notes.",
        feature2Title: "Warm & Luxurious Ambiance",
        feature2Desc: "Inviting interiors harmonizing natural greens and warm golden woods.",
        feature3Title: "Swift Highway Service",
        feature3Desc: "Quick turnaround so you can resume your travel energized.",
        feature4Title: "Prime Highway Location",
        feature4Desc: "Directly accessible near Idlib Highway with spacious parking.",

        // Video Showcase
        videoShowcaseBadge: "🎬 The Storven Experience",
        videoShowcaseTitle: "Coffee Passion in Every Drop",
        videoShowcaseSubtitle: "Watch the authentic flavor journey unfold with rich espresso flow and artisanal roasted beans",
        videoShowcaseFeature1: "Artisan Fresh Roast",
        videoShowcaseFeature1Desc: "Finest Ethiopian and Colombian specialty beans",
        videoShowcaseFeature2: "Flawless Extraction",
        videoShowcaseFeature2Desc: "Silky crema and rich, balanced aromatic notes",
        videoShowcaseFeature3: "Sensory Sensation",
        videoShowcaseFeature3Desc: "A daily ritual of inspiration with every sip",

        // Menu
        menuTitle: "The Storven Signature Menu",
        menuSubtitle: "Discover our handcrafted specialty coffees, refreshing cold crafts, and treats",
        menuCurrencyBadge: "💵 Prices in USD ($) based on the official in-house café menu",
        menuSearchPlaceholder: "Search for your favorite drink or sweet...",
        menuOrderBtn: "Order via WhatsApp",
        menuEmptyResults: "No menu items match your search.",
        filterAll: "All",
        menuViewAll: "View Full Menu",
        menuViewLess: "Show Less",

        // Offers
        offersTitle: "Exclusive Storven Offers",
        offersSubtitle: "Curated bundles and irresistible tastes at special values",
        offerValidUntil: "Valid until:",
        offerOrderNow: "Claim Offer",

        // Gallery
        galleryTitle: "Atmosphere & Gallery",
        gallerySubtitle: "Visual impressions of our cozy space and fresh aroma",

        // Location
        locationTitle: "Location & Hours",
        locationSubtitle: "We look forward to welcoming you for memorable moments near Idlib Highway",
        locationAddressTitle: "Address:",
        locationHoursTitle: "Opening Hours:",
        locationGetDirections: "Directions on Google Maps",
        locationLiveOpen: "Open Now • Welcoming you until 1:00 AM",
        locationLiveClosed: "Closed Now • Opens at 7:00 AM",
        locationCopyAddress: "Copy Address 📋",
        locationAddressCopied: "Address Copied! ✓",
        locationShareWa: "Share Location on WhatsApp 📲",
        locationMapControlsToggle: "Click to Interact with Map",
        locationMapControlsLocked: "Map Locked for Page Scrolling",
        locationAmenitiesTitle: "Highway Amenities & Services:",
        locationAmenityParking: "Free Spacious Parking",
        locationAmenityWifi: "Free High-Speed Wi-Fi",
        locationAmenityCharging: "Phone Charging Spots",
        locationAmenityLounge: "Family & Terrace Lounge",
        locationAmenityDrive: "Swift Highway Takeaway",
        locationDistCity: "5 mins from Idlib City Center",
        locationDistHighway: "1 min from Highway Exit",
        weatherTitle: "Current Cafe Weather",
        weatherCondition: "Sunny & Pleasant",
        weatherSubnote: "Perfect atmosphere for outdoor terrace seating 🌿",
        weatherHumidity: "Humidity",
        weatherWind: "Wind",
        distanceCardTitle: "Distance from You to Storven Coffee",
        distanceCardHint: "Use live GPS or select your area to check distance & ETA",
        distanceBtnGps: "Locate My Distance 📍",
        distanceCalculating: "Locating your GPS...",
        distanceLabel: "Driving Distance",
        distanceTimeLabel: "Estimated Drive Time",
        distanceRouteLabel: "Smooth Highway Route",
        distanceQuickPresets: "Quick Estimates:",

        // Contact
        contactTitle: "Get in Touch",
        contactSubtitle: "We are ready to assist with reservations, inquiries, or pre-orders",
        contactFormTitle: "Send a Direct WhatsApp Message",
        contactNameLabel: "Full Name",
        contactNamePlaceholder: "Enter your name...",
        contactTopicLabel: "Inquiry Type",
        contactTopicGeneral: "General Inquiry",
        contactTopicReserve: "Table Reservation",
        contactTopicOrder: "Takeaway Pre-Order",
        contactMessageLabel: "Message or Order Notes",
        contactMessagePlaceholder: "Write your inquiry or drink choices...",
        contactSendBtn: "Send to WhatsApp 💬",
        doodleTitle: "Let's Stay Connected!",
        doodleSubtitle: "Follow us on social media ✏️",
        doodleFooter: "Made with ☕ & creativity ✏️",

        // Footer
        footerDesc: "Your premier specialty coffee sanctuary along the Idlib Highway. A renewed passion in every drop.",
        footerQuickLinks: "Quick Links",
        footerContactInfo: "Contact Info",
        footerRights: "All Rights Reserved © 2025 Storven Coffee.",
        footerDesignNotice: "Crafted with passion for specialty coffee lovers.",

        // Floating WhatsApp
        floatWhatsAppText: "Chat with us",

        // Story modal
        storyClose: "Close",
        storyPrev: "Previous",
        storyNext: "Next"
    }
};

// فئات القائمة (Menu Categories)
const menuCategories = [
    { id: "all", nameAr: "الكل", nameEn: "All", icon: "✨" },
    { id: "hot", nameAr: "الساخن", nameEn: "Hot Coffee", icon: "☕" },
    { id: "cold", nameAr: "البارد", nameEn: "Cold Coffee", icon: "🧊" },
    { id: "latte", nameAr: "لاتيه", nameEn: "Latte Specials", icon: "🥛" },
    { id: "icetea", nameAr: "آيس تي", nameEn: "Iced Tea", icon: "🍃" },
    { id: "mojito", nameAr: "موهيتو", nameEn: "Mojito", icon: "🍋" },
    { id: "juices", nameAr: "عصائر طازجة", nameEn: "Fresh Juices", icon: "🍊" },
    { id: "smoothie", nameAr: "سموزي", nameEn: "Smoothies", icon: "🍓" },
    { id: "frappe", nameAr: "فرابيه", nameEn: "Frappe", icon: "🍫" },
    { id: "milkshake", nameAr: "ميلك شيك", nameEn: "Milkshake", icon: "🍨" },
    { id: "cocktail", nameAr: "كوكتيل", nameEn: "Cocktails", icon: "🍹" },
    { id: "emperor", nameAr: "إمبراطور", nameEn: "Emperor Blends", icon: "👑" },
    { id: "desserts", nameAr: "حلويات", nameEn: "Desserts", icon: "🍰" },
    { id: "hookah", nameAr: "أراكيل", nameEn: "Shisha & Hookah", icon: "💨" }
];

// عناصر القائمة (Menu Items) مع صور عالية الجودة وأسعار بالدولار
const menuItems = [
    // قهوة ساخنة
    {
        id: "hot-1",
        category: "hot",
        nameAr: "إسبريسو سينجل / دبل",
        nameEn: "Single / Double Espresso",
        descAr: "شوت إسبريسو غني مستخلص من حبوب بن مختصة مع كريمة ذهبية كثيفة.",
        descEn: "Rich shot extracted from premium specialty beans with dense golden crema.",
        price: "$1.50",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=700&q=80",
        badge: "أصلي"
    },
    {
        id: "hot-2",
        category: "hot",
        nameAr: "فلات وايت أسترالي",
        nameEn: "Australian Flat White",
        descAr: "توازن مثالي بين دبل ريستريتو وحليب ناعم مخملي الملمس.",
        descEn: "Harmonious double ristretto blended with velvety microfoam milk.",
        price: "$2.50",
        image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=700&q=80",
        badge: "الأكثر طلباً"
    },
    {
        id: "hot-3",
        category: "hot",
        nameAr: "كورتادو كلاسيك",
        nameEn: "Classic Cortado",
        descAr: "نسب متساوية بين الإسبريسو والحليب المبخر بلطف لتقليل الحموضة.",
        descEn: "Equal parts espresso and warm steamed milk to soften acidity.",
        price: "$2.25",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=80",
        badge: null
    },
    {
        id: "hot-4",
        category: "hot",
        nameAr: "قهوة مقطرة V60 إثيوبية",
        nameEn: "Ethiopian V60 Pourover",
        descAr: "ترشيح يدوي نقي يبرز إيحاءات الزهور والياسمين مع حمضية فاكهية خفيفة.",
        descEn: "Manual filter brew unlocking floral jasmine notes with bright fruit acidity.",
        price: "$3.00",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
        badge: "مختصة"
    },
    {
        id: "hot-5",
        category: "hot",
        nameAr: "قهوة تركية بالهيل الملكي",
        nameEn: "Royal Turkish Coffee with Cardamom",
        descAr: "تُغلى بروية على الرمل الساخن مع رشة هيل فاخر وقوام متماسك.",
        descEn: "Slowly brewed on hot sand with premium cardamom and thick foam.",
        price: "$1.75",
        image: "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // بارد
    {
        id: "cold-1",
        category: "cold",
        nameAr: "آيس سبانش لاتيه",
        nameEn: "Iced Spanish Latte",
        descAr: "مزيج منعش من الحليب المكثف المحلى مع الإسبريسو والثلج المكعب.",
        descEn: "Chilled sweetened condensed milk, signature espresso and crystal ice.",
        price: "$3.25",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80",
        badge: "الأكثر مبيعاً"
    },
    {
        id: "cold-2",
        category: "cold",
        nameAr: "كولد برو منقوع 24 ساعة",
        nameEn: "24h Steeped Cold Brew",
        descAr: "استخلاص بارد هادئ بنكهة الشوكولاتة الداكنة ونسبة حموضة منخفضة جداً.",
        descEn: "Slow 24-hour cold drip revealing smooth dark cocoa subtleties.",
        price: "$3.50",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=700&q=80",
        badge: "إصدار خاص"
    },
    {
        id: "cold-3",
        category: "cold",
        nameAr: "آيس أمريكانو كلاسيك",
        nameEn: "Iced Americano Classic",
        descAr: "شوت إسبريسو مزدوج ممزوج بالماء البارد ومكعبات الثلج لنشاط يدوم طويلاً.",
        descEn: "Double shot espresso poured over crisp filtered water and ice.",
        price: "$2.00",
        image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // لاتيه
    {
        id: "latte-1",
        category: "latte",
        nameAr: "سولتيد كراميل لاتيه",
        nameEn: "Salted Caramel Latte",
        descAr: "إسبريسو غني مع صوص الكراميل المملح ولمسة كريمة مخفوقة.",
        descEn: "Artisan espresso infused with salted gourmet caramel and whip.",
        price: "$3.50",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80",
        badge: "مميز"
    },
    {
        id: "latte-2",
        category: "latte",
        nameAr: "ستورفين بستاشيو لاتيه",
        nameEn: "Storven Pistachio Latte",
        descAr: "نكهة الفستق الحلبي الطبيعي الفاخر مع حليب مبخر وإسبريسو مختص.",
        descEn: "Natural premium pistachio paste with textured milk and specialty shot.",
        price: "$4.00",
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=700&q=80",
        badge: "توقيع ستورفين"
    },
    {
        id: "latte-3",
        category: "latte",
        nameAr: "فانيلا بين لاتيه",
        nameEn: "Vanilla Bean Latte",
        descAr: "شراب الفانيلا الطبيعي مع حليب طازج وإسبريسو دافئ.",
        descEn: "Madagascar vanilla bean syrup, fresh silky milk and warm espresso.",
        price: "$3.00",
        image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // آيس تي
    {
        id: "tea-1",
        category: "icetea",
        nameAr: "آيس تي دراق منعش",
        nameEn: "Peach Iced Tea",
        descAr: "شاي أسود منقوع طبيعياً مع نكهة الدراق وقطع الفاكهة وأوراق النعناع.",
        descEn: "Brewed black tea infused with sweet peach puree, mint, and fresh fruit slices.",
        price: "$2.25",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80",
        badge: "منعش"
    },
    {
        id: "tea-2",
        category: "icetea",
        nameAr: "آيس تي توت بري وليمون",
        nameEn: "Berry Lemon Iced Tea",
        descAr: "شاي أخضر مثلج مع عصير الليمون المنعش ومزيج التوت الأحمر البري.",
        descEn: "Iced green tea with zesty fresh lemon juice and wild forest berries.",
        price: "$2.50",
        image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // موهيتو
    {
        id: "mojito-1",
        category: "mojito",
        nameAr: "موهيتو بلو لاغون",
        nameEn: "Blue Lagoon Mojito",
        descAr: "سيروب كوراكاو الأزرق، صودا فوّارة، شرائح ليمون طازج وأوراق النعناع الأخضر.",
        descEn: "Vibrant blue curacao notes, sparkling soda, fresh lime and mint sprigs.",
        price: "$2.75",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
        badge: "شعبية عالية"
    },
    {
        id: "mojito-2",
        category: "mojito",
        nameAr: "موهيتو فراولة وباشن فروت",
        nameEn: "Strawberry Passion Fruit Mojito",
        descAr: "باشن فروت استوائي مع هريس الفراولة الطبيعية والصودا الباردة والثلج المسحوق.",
        descEn: "Tropical passion fruit, natural crushed strawberries, mint and ice.",
        price: "$3.00",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=700&q=80",
        badge: "صيفي"
    },
    {
        id: "mojito-3",
        category: "mojito",
        nameAr: "كلاسيك لايم موهيتو",
        nameEn: "Classic Lime & Mint Mojito",
        descAr: "الخلطة الكوبية الأصلية من الليمون والنعناع الطبيعي المهروس مع الصودا.",
        descEn: "Authentic blend of muddled key limes, fresh mint leaves and soda.",
        price: "$2.50",
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // عصائر
    {
        id: "juice-1",
        category: "juices",
        nameAr: "برتقال طبيعي معصور على البارد",
        nameEn: "Fresh Squeezed Orange Juice",
        descAr: "100% برتقال طازج يُعصر لحظياً بدون ماء أو سكر إضافي.",
        descEn: "Pure cold-pressed oranges with zero added sugars or preservatives.",
        price: "$2.00",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=80",
        badge: "طازج"
    },
    {
        id: "juice-2",
        category: "juices",
        nameAr: "رمان طبيعي معصور فريش",
        nameEn: "Pure Pomegranate Fresh Juice",
        descAr: "عصير رمان غني بمضادات الأكسدة بمذاق حلو وحامض استثنائي.",
        descEn: "Fresh ruby pomegranate juice brimming with natural antioxidants.",
        price: "$2.50",
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // سموزي
    {
        id: "smoothie-1",
        category: "smoothie",
        nameAr: "سموزي مانجو استوائي",
        nameEn: "Tropical Mango Smoothie",
        descAr: "قطع مانجو مثلجة مخفوقة مع لب الزبادي والعسل الطبيعي لملمس كريمي كثيف.",
        descEn: "Frozen mango chunks whipped with natural yogurt and pure honey.",
        price: "$3.00",
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80",
        badge: "كريمي"
    },
    {
        id: "smoothie-2",
        category: "smoothie",
        nameAr: "سموزي وايلد بيري الغابة",
        nameEn: "Wild Forest Berry Smoothie",
        descAr: "مزيج التوت الأزرق، التوت الأسود، والفراولة مع ثلج ناعم.",
        descEn: "Blueberry, blackberry, and raspberry blend with crushed ice.",
        price: "$3.25",
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // فرابيه
    {
        id: "frappe-1",
        category: "frappe",
        nameAr: "موكا فرابيه بالشوكولاتة البلجيكية",
        nameEn: "Belgian Chocolate Mocha Frappe",
        descAr: "إسبريسو مثلج مخفوق مع صوص الشوكولاتة الفاخر وكريمة غنية مع صوص الفدج.",
        descEn: "Blended ice espresso with decadent Belgian fudge and whipped swirl.",
        price: "$3.50",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
        badge: "شوكولاتة"
    },
    {
        id: "frappe-2",
        category: "frappe",
        nameAr: "كراميل كرانش فرابيه",
        nameEn: "Caramel Crunch Frappe",
        descAr: "فرابيه غني بنكهة التوفي والكراميل ومغطى بحبيبات السكر المقرمشة.",
        descEn: "Toffee-caramel frappe topped with fluffy whipped cream and caramel drizzle.",
        price: "$3.50",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // ميلك شيك
    {
        id: "shake-1",
        category: "milkshake",
        nameAr: "ميلك شيك لوتس كراميل",
        nameEn: "Lotus Biscoff Milkshake",
        descAr: "آيس كريم فانيلا مخفوق مع زبدة وبسكويت اللوتس المقرمش.",
        descEn: "Real vanilla ice cream blended with Lotus Biscoff spread and crumbs.",
        price: "$3.75",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80",
        badge: "فاخر"
    },
    {
        id: "shake-2",
        category: "milkshake",
        nameAr: "ميلك شيك أوريو دبل كاكاو",
        nameEn: "Double Oreo Milkshake",
        descAr: "حبيبات بسكويت الأوريو مع الحليب وآيس كريم الكريمة وصوص شوكولاتة هيرشي.",
        descEn: "Crushed Oreo biscuits, whole milk, and rich chocolate ganache.",
        price: "$3.50",
        image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=700&q=80",
        badge: null
    },

    // كوكتيل
    {
        id: "cocktail-1",
        category: "cocktail",
        nameAr: "كوكتيل طبقات ستورفين الملكي",
        nameEn: "Storven Royal Layered Cocktail",
        descAr: "طبقات متدرجة من الفراولة، المانجو، والأفوكادو مزينة بالعسل والمكسرات.",
        descEn: "Layered fresh strawberry, mango, and creamy avocado garnished with nuts and honey.",
        price: "$4.00",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=700&q=80",
        badge: "توقيع المقهى"
    },

    // إمبراطور
    {
        id: "emperor-1",
        category: "emperor",
        nameAr: "إمبراطور القشطة والمكسرات",
        nameEn: "Emperor Ashta & Honey Cream",
        descAr: "عصير أفوكادو طبيعي كثيف محشو بقطع القشطة البلدية الطازجة، لوز، كاجو، وعسل جبلي.",
        descEn: "Rich avocado blend crowned with fresh Syrian ashta cream, almonds, cashews, and wild honey.",
        price: "$4.50",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=700&q=80",
        badge: "طبق إمبراطوري"
    },

    // حلويات
    {
        id: "dessert-1",
        category: "desserts",
        nameAr: "سان سباستيان تشيز كيك مع الشوكولاتة الساخنة",
        nameEn: "San Sebastian Cheesecake with Melted Chocolate",
        descAr: "كيكة الجبن الباسكية الشهيرة المحروقة من الأعلى بقوام كريمي ذائب وصوص شوكولاتة بلجيكية.",
        descEn: "Creamy Basque burnt cheesecake drizzled tableside with rich warm Belgian chocolate.",
        price: "$4.25",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
        badge: "الأكثر مبيعاً"
    },
    {
        id: "dessert-2",
        category: "desserts",
        nameAr: "وافل بلجيكي مقرمش بالنوتيلا والفواكه",
        nameEn: "Belgian Nutella & Fresh Fruit Waffle",
        descAr: "قطعة وافل ذهبية مقرمشة غارقة بالنوتيلا مع قطع الفراولة والموز ورشة سكر بودرة.",
        descEn: "Golden waffle loaded with authentic Nutella, sliced strawberries, and bananas.",
        price: "$3.75",
        image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80",
        badge: null
    },
    {
        id: "dessert-3",
        category: "desserts",
        nameAr: "كوكيز شوكولاتة شيبس محشوة دافئة",
        nameEn: "Warm Stuffed Choco Chip Cookie",
        descAr: "كوكيز عملاقة مخبوزة طازجة محشوة بالشوكولاتة السائلة الذائبة عند أول قضمة.",
        descEn: "Giant oven-baked cookie with gooey melted chocolate center.",
        price: "$2.25",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
        badge: "طازج من الفرن"
    },

    // أراكيل
    {
        id: "hookah-1",
        category: "hookah",
        nameAr: "أركيلة تفاحتين فاخر (نخلة / مزايا)",
        nameEn: "Double Apple Premium Shisha",
        descAr: "تحضير خاص برأس فخاري متقن وفحم جوز هند طبيعي مشتعل بانتظام.",
        descEn: "Authentic double apple blend with clay bowl and natural coconut coals.",
        price: "$2.50",
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=700&q=80",
        badge: "كلاسيك"
    },
    {
        id: "hookah-2",
        category: "hookah",
        nameAr: "أركيلة ليمون ونعناع مثلج",
        nameEn: "Iced Lemon Mint Shisha",
        descAr: "نكهة منعشة بنقاء عالي مع خرطوم مثلج لتجربة تدخين هادئة وباردة.",
        descEn: "Crisp iced lemon and garden mint paired with a cooled ice hose.",
        price: "$2.75",
        image: "img/shisha-lemon-mint.jpg",
        badge: "بارد"
    },
    {
        id: "hookah-3",
        category: "hookah",
        nameAr: "خلطة ستورفين الخاصة (سبيشال بليند)",
        nameEn: "Storven Signature Shisha Blend",
        descAr: "مزيج حصري متناسق من فواكه الغابة الاستوائية مع لمسة انتعاش فريدة.",
        descEn: "Exclusive in-house secret mix of tropical fruits with cool undertones.",
        price: "$3.50",
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=700&q=80",
        badge: "حصري"
    }
];

// لحظات ستورفين (Stories)
const storvenMoments = [
    {
        id: "moment-1",
        titleAr: "أجواء ستورفين",
        titleEn: "Storven Vibe",
        cover: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80",
        mediaType: "image", // can simulate vertical video/image slide
        mediaUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
        captionAr: "الدفء والهدوء في قلب المقهى.. جلستك المفضلة بانتظارك دائماً.",
        captionEn: "Warmth & tranquility at the heart of Storven.. your favorite seat awaits."
    },
    {
        id: "moment-2",
        titleAr: "لحظات القهوة",
        titleEn: "Coffee Craft",
        cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
        captionAr: "استخلاص يدوي متقن لحبوب البن الإثيوبية الفاخرة بتقنية V60.",
        captionEn: "Artisanal manual extraction of premium Ethiopian beans via V60."
    },
    {
        id: "moment-3",
        titleAr: "مشروباتنا",
        titleEn: "Signature Drinks",
        cover: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
        captionAr: "آيس سبانش لاتيه مع ثلج نقي.. الانتعاش الحقيقي في كل رشفة.",
        captionEn: "Iced Spanish Latte over crystal ice.. pure revitalization in every sip."
    },
    {
        id: "moment-4",
        titleAr: "حلويات ستورفين",
        titleEn: "Sweet Bites",
        cover: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
        captionAr: "تشيز كيك سان سباستيان الطازجة مع تدفق الشوكولاتة البلجيكية الساخنة.",
        captionEn: "Fresh San Sebastian Basque cheesecake crowned with molten chocolate."
    },
    {
        id: "moment-5",
        titleAr: "خلف الكواليس",
        titleEn: "Behind the Bar",
        cover: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
        captionAr: "باريستا ستورفين يضعون الشغف والدقة في كل تفصيلة حتى وصول الكوب إليك.",
        captionEn: "Storven baristas pouring technique and heartfelt passion into every single cup."
    },
    {
        id: "moment-6",
        titleAr: "ليالي ستورفين",
        titleEn: "Night Ambiance",
        cover: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
        captionAr: "سهرات هادئة تحت الإضاءة الدافئة مع قهوتك المفضلة وأحاديث لا تنتهي.",
        captionEn: "Magical starry evenings under ambient warm lighting and serene conversations."
    }
];

// العروض المميزة (Special Offers)
const specialOffers = [
    {
        id: "offer-1",
        badgeAr: "عرض الترويقة الصباحية",
        badgeEn: "Morning Commute Combo",
        discount: "خصم 20%",
        titleAr: "كوب فلات وايت + كرواسون فرنسي طازج",
        titleEn: "Flat White + Fresh French Butter Croissant",
        descAr: "ابدأ صباحك على الأوتوستراد بنشاط لا مثيل له مع فلات وايت ساخن وكرواسون هش ومحمص.",
        descEn: "Kickstart your highway morning with a warm flat white and a flaky buttery croissant.",
        oldPrice: "$4.00",
        newPrice: "$3.20",
        expiryAr: "مستمر يومياً حتى 11:30 صباحاً",
        expiryEn: "Daily until 11:30 AM",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: "offer-2",
        badgeAr: "عرض الروقان المسائي",
        badgeEn: "Evening Chill Duo",
        discount: "توفير $1.50",
        titleAr: "أركيلة مميزة + مشروب ساخن أو بارد من اختيارك",
        titleEn: "Premium Shisha + Any Hot or Cold Craft Drink",
        descAr: "جلسة مسائية مريحة مع أركيلتك المفضلة ومشروبك المختار في صالتنا الدافئة.",
        descEn: "Relax in style with your favorite hookah flavor paired with any drink of your choice.",
        oldPrice: "$6.00",
        newPrice: "$4.50",
        expiryAr: "متاح طيلة أيام الأسبوع",
        expiryEn: "Available all week long",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: "offer-3",
        badgeAr: "باكج الحلا والقهوة",
        badgeEn: "Sweet & Sip Duo",
        discount: "الأكثر طلباً",
        titleAr: "تشيز كيك سان سباستيان + 2 قهوة مختصة V60",
        titleEn: "San Sebastian Cheesecake + 2x V60 Pourovers",
        descAr: "شارك اللحظة الحلوة مع من تحب وتذوق أروع تشيز كيك مع قهوة مقطرة طازجة.",
        descEn: "Share the delight with a signature Basque cheesecake and two origin pourover coffees.",
        oldPrice: "$10.25",
        newPrice: "$8.50",
        expiryAr: "عرض نهاية الأسبوع",
        expiryEn: "Weekend Special",
        image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=700&q=80"
    }
];

// معرض الصور (Gallery)
const galleryItems = [
    {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85",
        captionAr: "الركن الداخلي الدافئ في مقهى ستورفين",
        captionEn: "Warm indoor lounge corner at Storven Coffee"
    },
    {
        url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85",
        captionAr: "فن تحضير القهوة بلمسة الباريستا المحترف",
        captionEn: "Artisanal coffee brewing with professional touch"
    },
    {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85",
        captionAr: "جلسات مريحة وتصميم يجمع الفخامة والراحة",
        captionEn: "Comfortable seating combining luxury and leisure"
    },
    {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
        captionAr: "إضاءة ليلية ساحرة وأجواء لا تُنسى",
        captionEn: "Enchanting night lighting and unforgettable ambiance"
    },
    {
        url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=85",
        captionAr: "حلويات طازجة تُعد يومياً لإسعاد زوارنا",
        captionEn: "Fresh desserts crafted daily to delight our guests"
    },
    {
        url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=85",
        captionAr: "مشروبات منعشة باردة تلائم الأوقات الحارة",
        captionEn: "Refreshing iced craft drinks for sunny days"
    }
];
