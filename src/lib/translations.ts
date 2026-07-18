export type LanguageCode = 'en' | 'es' | 'ar' | 'bn' | 'fr';

export interface LanguageDef {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageDef[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Tabs
    tab_content: 'Content',
    tab_design: 'Design & Style',
    tab_advanced: 'Advanced',
    tab_templates: 'My Presets',
    tab_batch: 'Batch Render',

    // Content Panel
    header_client: 'Client Details',
    label_client_name: 'Client Name',
    label_username: 'Username / Handle',
    label_designation: 'Designation / Role',
    label_company: 'Company Name',
    label_country: 'Country / Location',
    label_date: 'Review Date',
    label_rating: 'Rating Value (1-5)',
    label_verified: 'Verified Badge',
    label_show_avatar: 'Display Avatar',
    label_avatar_shape: 'Avatar Silhouette',
    label_avatar_url: 'Profile Picture URL',
    label_company_logo: 'Company Logo URL',
    
    header_review: 'Review Content',
    label_review_title: 'Review Headline',
    label_review_text: 'Review Message',
    placeholder_review_text: 'Enter client feedback here...',

    // Design Panel
    header_branding: 'Platform Branding',
    label_platform: 'Source Platform',
    label_custom_platform: 'Custom Platform Name',
    
    header_layout: 'Layout & Typography',
    label_theme: 'Color Theme Palette',
    label_font: 'Typography Family',
    label_quote: 'Quote Mark Style',
    label_card_style: 'Card Shell Aesthetic',
    label_bg_style: 'Outer Backdrop Pattern',
    
    header_colors: 'Accent Color Overrides',
    label_primary_color: 'Primary Brand Color',
    label_accent_color: 'Accent Highlighting',
    label_card_bg: 'Card Background',
    label_text_color: 'Main Body Text',

    // Advanced Panel
    header_canvas: 'Canvas Resolution & Quality',
    label_resolution: 'Target Dimensions (Ratio)',
    label_scale: 'Render Quality Matrix',
    label_transparent: 'Transparent Canvas Background',
    
    header_features: 'Special Canvas Features',
    label_watermark: 'Enable Creator Watermark',
    label_watermark_text: 'Watermark Footnote Text',
    label_qr_code: 'Include Trust QR Code',
    label_qr_url: 'QR Code Link Destination',
    label_custom_css: 'Tailwind / Custom CSS Injector',

    // Preset Templates
    header_templates: 'Saved Design Templates',
    label_template_name: 'Preset Name',
    btn_save_template: 'Save Current Design',
    no_templates: 'No custom templates saved yet.',
    placeholder_template_name: 'e.g., My Portfolio Upwork Card',

    // Batch Export
    header_batch: 'High-Volume Batch Rendering',
    batch_desc: 'Paste a JSON array of review objects to automatically generate and download multiple cards with the current design settings.',
    placeholder_batch: '[\n  {\n    "clientName": "John Doe",\n    "designation": "CEO",\n    "company": "SaaS Corp",\n    "reviewTitle": "Amazing Service",\n    "reviewText": "Exceptional delivery!"\n  }\n]',
    btn_batch_start: 'Initiate Batch Generation',

    // Global Controls / Buttons
    btn_random: 'Randomize Demo',
    btn_reset: 'Reset Defaults',
    btn_copy_text: 'Copy Feedback Text',
    btn_copy_image: 'Copy Card Image',
    btn_download_png: 'Download PNG Asset',
    btn_download_jpg: 'Download JPG Asset',
    btn_download_webp: 'Download WEBP Asset',
    btn_share: 'Share Card Link',
    btn_print: 'Print Review Card',
    
    // Additional Direction label
    label_text_dir: 'Content Layout Direction',
    opt_dir_auto: 'Auto (Based on Language)',
    opt_dir_ltr: 'Left-to-Right (LTR)',
    opt_dir_rtl: 'Right-to-Left (RTL)',
    
    // Quick Pre-fills for preview languages
    btn_prefill_lang_text: 'Load Selected Language Demo Text',

    // CSS Filters
    header_filters: 'Image Processing (CSS Filters)',
    label_filter_grayscale: 'Grayscale (Black & White)',
    label_filter_sepia: 'Sepia Vintage Warmth',
    label_filter_brightness: 'Contrast Brightness Level',
    label_filter_contrast: 'Visual Contrast Contrast',
    label_filter_blur: 'Backdrop Focus Softness',
    btn_reset_filters: 'Restore Original Filter Balance'
  },
  es: {
    tab_content: 'Contenido',
    tab_design: 'Diseño y Estilo',
    tab_advanced: 'Avanzado',
    tab_templates: 'Plantillas',
    tab_batch: 'Procesamiento en Lote',

    header_client: 'Detalles del Cliente',
    label_client_name: 'Nombre del Cliente',
    label_username: 'Nombre de Usuario / Handle',
    label_designation: 'Cargo / Rol',
    label_company: 'Nombre de la Empresa',
    label_country: 'País / Ubicación',
    label_date: 'Fecha de Reseña',
    label_rating: 'Calificación (1-5)',
    label_verified: 'Insignia de Verificación',
    label_show_avatar: 'Mostrar Foto de Perfil',
    label_avatar_shape: 'Silueta del Avatar',
    label_avatar_url: 'URL de la Foto de Perfil',
    label_company_logo: 'URL del Logotipo de la Empresa',
    
    header_review: 'Contenido de la Reseña',
    label_review_title: 'Título de la Reseña',
    label_review_text: 'Texto de la Reseña',
    placeholder_review_text: 'Escriba los comentarios del cliente aquí...',

    header_branding: 'Marca de la Plataforma',
    label_platform: 'Plataforma de Origen',
    label_custom_platform: 'Nombre de Plataforma Personalizada',
    
    header_layout: 'Diseño y Tipografía',
    label_theme: 'Paleta de Colores',
    label_font: 'Familia Tipográfica',
    label_quote: 'Estilo de Comillas',
    label_card_style: 'Estilo del Contenedor',
    label_bg_style: 'Patrón de Fondo Exterior',
    
    header_colors: 'Colores Personalizados',
    label_primary_color: 'Color Primario',
    label_accent_color: 'Color de Acento',
    label_card_bg: 'Fondo de la Tarjeta',
    label_text_color: 'Color del Texto Principal',

    header_canvas: 'Resolución y Calidad del Lienzo',
    label_resolution: 'Dimensiones Objetivo (Proporción)',
    label_scale: 'Matriz de Calidad de Exportación',
    label_transparent: 'Fondo del Lienzo Transparente',
    
    header_features: 'Características Especiales',
    label_watermark: 'Habilitar Marca de Agua',
    label_watermark_text: 'Texto de la Marca de Agua',
    label_qr_code: 'Incluir Código QR de Confianza',
    label_qr_url: 'Destino del Código QR',
    label_custom_css: 'Inyector CSS Personalizado / Tailwind',

    header_templates: 'Plantillas Guardadas',
    label_template_name: 'Nombre de la Plantilla',
    btn_save_template: 'Guardar Diseño Actual',
    no_templates: 'No hay plantillas guardadas todavía.',
    placeholder_template_name: 'Ej. Mi Tarjeta Upwork',

    header_batch: 'Procesamiento en Lote',
    batch_desc: 'Pegue una lista JSON de objetos de reseña para generar y descargar automáticamente múltiples tarjetas con la configuración de diseño actual.',
    placeholder_batch: '[\n  {\n    "clientName": "Juan Pérez",\n    "designation": "Director",\n    "company": "SaaS S.A.",\n    "reviewTitle": "Servicio Increíble",\n    "reviewText": "¡Entrega excepcional!"\n  }\n]',
    btn_batch_start: 'Iniciar Generación en Lote',

    btn_random: 'Aleatorio (Demo)',
    btn_reset: 'Restaurar Valores',
    btn_copy_text: 'Copiar Texto',
    btn_copy_image: 'Copiar como Imagen',
    btn_download_png: 'Descargar PNG',
    btn_download_jpg: 'Descargar JPG',
    btn_download_webp: 'Descargar WEBP',
    btn_share: 'Compartir Tarjeta',
    btn_print: 'Imprimir Tarjeta',
    
    label_text_dir: 'Dirección del Texto',
    opt_dir_auto: 'Auto (Basado en Idioma)',
    opt_dir_ltr: 'Izquierda a Derecha (LTR)',
    opt_dir_rtl: 'Derecha a Izquierda (RTL)',
    btn_prefill_lang_text: 'Cargar Texto de Demostración',

    // CSS Filters
    header_filters: 'Procesamiento de Imagen (Filtros)',
    label_filter_grayscale: 'Escala de grises (B y N)',
    label_filter_sepia: 'Calidez sepia vintage',
    label_filter_brightness: 'Nivel de brillo',
    label_filter_contrast: 'Contraste visual',
    label_filter_blur: 'Suavizado de fondo (Desfoque)',
    btn_reset_filters: 'Restablecer filtros de imagen'
  },
  ar: {
    tab_content: 'المحتوى',
    tab_design: 'التصميم والأسلوب',
    tab_advanced: 'متقدم',
    tab_templates: 'النماذج المحفوظة',
    tab_batch: 'تصدير جماعي',

    header_client: 'تفاصيل العميل',
    label_client_name: 'اسم العميل',
    label_username: 'اسم المستخدم / المعرف',
    label_designation: 'المسمى الوظيفي / الدور',
    label_company: 'اسم الشركة',
    label_country: 'البلد / الموقع',
    label_date: 'تاريخ التقييم',
    label_rating: 'التقييم (1-5)',
    label_verified: 'شارة التحقق',
    label_show_avatar: 'عرض الصورة الشخصية',
    label_avatar_shape: 'شكل الصورة الشخصية',
    label_avatar_url: 'رابط الصورة الشخصية',
    label_company_logo: 'رابط شعار الشركة',
    
    header_review: 'محتوى التقييم',
    label_review_title: 'عنوان التقييم',
    label_review_text: 'نص التقييم',
    placeholder_review_text: 'أدخل تعليقات العميل هنا...',

    header_branding: 'هوية المنصة',
    label_platform: 'منصة التقييم',
    label_custom_platform: 'اسم منصة مخصصة',
    
    header_layout: 'التخطيط والخطوط',
    label_theme: 'لوحة الألوان',
    label_font: 'نوع الخط',
    label_quote: 'نمط علامة الاقتباس',
    label_card_style: 'نمط البطاقة',
    label_bg_style: 'نمط الخلفية الخارجية',
    
    header_colors: 'ألوان مخصصة',
    label_primary_color: 'اللون الرئيسي',
    label_accent_color: 'لون الإبراز',
    label_card_bg: 'خلفية البطاقة',
    label_text_color: 'لون النص الرئيسي',

    header_canvas: 'دقة وجودة التصميم',
    label_resolution: 'أبعاد الصورة (النسبة)',
    label_scale: 'مقياس جودة التصدير',
    label_transparent: 'خلفية شفافة للتصميم',
    
    header_features: 'ميزات خاصة',
    label_watermark: 'تفعيل العلامة المائية',
    label_watermark_text: 'نص العلامة المائية',
    label_qr_code: 'تضمين رمز الاستجابة السريعة (QR)',
    label_qr_url: 'رابط رمز الاستجابة السريعة',
    label_custom_css: 'محرر CSS مخصص / Tailwind',

    header_templates: 'القوالب المحفوظة',
    label_template_name: 'اسم القالب',
    btn_save_template: 'حفظ التصميم الحالي',
    no_templates: 'لا توجد قوالب محفوظة بعد.',
    placeholder_template_name: 'مثال: بطاقة عملي على أب وورك',

    header_batch: 'التصدير الجماعي التلقائي',
    batch_desc: 'قم بلصق مصفوفة JSON تحتوي على كائنات التقييم لتوليد وتنزيل بطاقات متعددة بالتصميم الحالي تلقائيًا.',
    placeholder_batch: '[\n  {\n    "clientName": "أحمد علي",\n    "designation": "مدير تنفيذي",\n    "company": "شركة برمجيات",\n    "reviewTitle": "خدمة ممتازة",\n    "reviewText": "تسليم احترافي وسريع!"\n  }\n]',
    btn_batch_start: 'بدء التوليد الجماعي',

    btn_random: 'توليد عشوائي',
    btn_reset: 'إعادة ضبط الافتراضيات',
    btn_copy_text: 'نسخ نص التقييم',
    btn_copy_image: 'نسخ كصورة',
    btn_download_png: 'تحميل PNG',
    btn_download_jpg: 'تحميل JPG',
    btn_download_webp: 'تحميل WEBP',
    btn_share: 'مشاركة البطاقة',
    btn_print: 'طباعة البطاقة',
    
    label_text_dir: 'اتجاه تخطيط النص',
    opt_dir_auto: 'تلقائي (حسب اللغة)',
    opt_dir_ltr: 'من اليسار إلى اليمين (LTR)',
    opt_dir_rtl: 'من اليمين إلى اليسار (RTL)',
    btn_prefill_lang_text: 'تحميل نص تجريبي عربي',

    // CSS Filters
    header_filters: 'معالجة الصور (فلاتر CSS)',
    label_filter_grayscale: 'تدرج الرمادي (أبيض وأسود)',
    label_filter_sepia: 'تأثير سيبيا كلاسيكي دافئ',
    label_filter_brightness: 'مستوى سطوع الصورة',
    label_filter_contrast: 'مستوى التباين البصري',
    label_filter_blur: 'نعومة وضبابية الخلفية',
    btn_reset_filters: 'إعادة ضبط ألوان الفلاتر'
  },
  bn: {
    tab_content: 'কনটেন্ট',
    tab_design: 'ডিজাইন ও স্টাইল',
    tab_advanced: 'উন্নত অপশন',
    tab_templates: 'আমার প্রিসেট',
    tab_batch: 'ব্যাচ রেন্ডার',

    header_client: 'ক্লায়েন্ট বিবরণ',
    label_client_name: 'ক্লায়েন্টের নাম',
    label_username: 'ইউজারনেম / হ্যান্ডেল',
    label_designation: 'পদবি / ভূমিকা',
    label_company: 'কোম্পানির নাম',
    label_country: 'দেশ / অবস্থান',
    label_date: 'রিভিউয়ের তারিখ',
    label_rating: 'রেটিং মান (১-৫)',
    label_verified: 'ভেরিফায়েড ব্যাজ',
    label_show_avatar: 'প্রোফাইল ছবি দেখান',
    label_avatar_shape: 'প্রোফাইল ছবির আকৃতি',
    label_avatar_url: 'প্রোফাইল ছবির লিঙ্ক',
    label_company_logo: 'কোম্পানি লোগো লিঙ্ক',
    
    header_review: 'রিভিউ কনটেন্ট',
    label_review_title: 'রিভিউয়ের শিরোনাম',
    label_review_text: 'রিভিউয়ের বার্তা',
    placeholder_review_text: 'এখানে ক্লায়েন্টের মতামত লিখুন...',

    header_branding: 'প্ল্যাটফর্ম ব্র্যান্ডিং',
    label_platform: 'উৎস প্ল্যাটফর্ম',
    label_custom_platform: 'কাস্টম প্ল্যাটফর্মের নাম',
    
    header_layout: 'লেআউট এবং টাইপোগ্রাফি',
    label_theme: 'কালার থিম প্যালেট',
    label_font: 'টাইপোগ্রাফি ফন্ট',
    label_quote: 'উদ্ধৃতি চিহ্নের স্টাইল',
    label_card_style: 'কার্ডের আকার ও স্টাইল',
    label_bg_style: 'বাইরের ব্যাকগ্রাউন্ড প্যাটার্ন',
    
    header_colors: 'রঙ পরিবর্তন করুন',
    label_primary_color: 'প্রধান ব্র্যান্ডের রঙ',
    label_accent_color: 'অ্যাকসেন্ট হাইলাইট',
    label_card_bg: 'কার্ডের ব্যাকগ্রাউন্ড',
    label_text_color: 'মূল টেক্সটের রঙ',

    header_canvas: 'ক্যানভাস রেজোলিউশন ও গুণমান',
    label_resolution: 'টার্গেট ডাইমেনশন (অনুপাত)',
    label_scale: 'রেন্ডার গুণমান ম্যাট্রিক্স',
    label_transparent: 'স্বচ্ছ ক্যানভাস ব্যাকগ্রাউন্ড',
    
    header_features: 'বিশেষ ক্যানভাস ফিচার',
    label_watermark: 'ক্রিয়েটর ওয়াটারমার্ক সক্রিয় করুন',
    label_watermark_text: 'ওয়াটারমার্ক টেক্সট',
    label_qr_code: 'ট্রাস্ট কিউআর কোড যোগ করুন',
    label_qr_url: 'কিউআর কোড লিঙ্ক গন্তব্য',
    label_custom_css: 'কাস্টম CSS / টেইলউইন্ড ইনজেক্টর',

    header_templates: 'সংরক্ষিত ডিজাইন টেমপ্লেট',
    label_template_name: 'প্রিসেটের নাম',
    btn_save_template: 'বর্তমান ডিজাইন সংরক্ষণ করুন',
    no_templates: 'কোনো কাস্টম টেমপ্লেট এখনও সংরক্ষিত হয়নি।',
    placeholder_template_name: 'উদা: আমার আপওয়ার্ক রিভিউ কার্ড',

    header_batch: 'উচ্চ-ভলিউম ব্যাচ রেন্ডারিং',
    batch_desc: 'বর্তমান ডিজাইন সেটিংস সহ একসাথে একাধিক কার্ড জেনারেট এবং ডাউনলোড করতে একটি রিভিউ অবজেক্টের JSON অ্যারে পেস্ট করুন।',
    placeholder_batch: '[\n  {\n    "clientName": "রফিকুল ইসলাম",\n    "designation": "সিইও",\n    "company": "আইটি লিমিটেড",\n    "reviewTitle": "অসাধারণ কাজ",\n    "reviewText": "অত্যন্ত পেশাদারী এবং দ্রুত ডেলিভারি!"\n  }\n]',
    btn_batch_start: 'ব্যাচ জেনারেট শুরু করুন',

    btn_random: 'এলোমেলো ডেমো',
    btn_reset: 'রিসেট করুন',
    btn_copy_text: 'রিভিউ টেক্সট কপি করুন',
    btn_copy_image: 'কার্ড ইমেজ কপি করুন',
    btn_download_png: 'PNG ডাউনলোড করুন',
    btn_download_jpg: 'JPG ডাউনলোড করুন',
    btn_download_webp: 'WEBP ডাউনলোড করুন',
    btn_share: 'কার্ড শেয়ার করুন',
    btn_print: 'কার্ড প্রিন্ট করুন',
    
    label_text_dir: 'টেক্সট লেআউটের দিক',
    opt_dir_auto: 'স্বয়ংক্রিয় (ভাষার উপর ভিত্তি করে)',
    opt_dir_ltr: 'বাম থেকে ডানে (LTR)',
    opt_dir_rtl: 'ডান থেকে বামে (RTL)',
    btn_prefill_lang_text: 'বাংলা ডেমো টেক্সট লোড করুন',

    // CSS Filters
    header_filters: 'ইমেজ প্রসেসিং (ফিল্টার)',
    label_filter_grayscale: 'গ্রে-স্কেল (কালো ও সাদা)',
    label_filter_sepia: 'সেপিয়া ভিন্টেজ আবহ',
    label_filter_brightness: 'উজ্জ্বলতা লেভেল (Brightness)',
    label_filter_contrast: 'বৈপরীত্য লেভেল (Contrast)',
    label_filter_blur: 'ঝাপসা ভাব (Blur)',
    btn_reset_filters: 'ফিল্টার মান রিসেট করুন'
  },
  fr: {
    tab_content: 'Contenu',
    tab_design: 'Style & Design',
    tab_advanced: 'Options Avancées',
    tab_templates: 'Mes Modèles',
    tab_batch: 'Traitement Lot',

    header_client: 'Détails du Client',
    label_client_name: 'Nom du Client',
    label_username: 'Nom d\'utilisateur',
    label_designation: 'Poste / Rôle',
    label_company: 'Nom de l\'Entreprise',
    label_country: 'Pays / Emplacement',
    label_date: 'Date de l\'Évaluation',
    label_rating: 'Évaluation (1-5)',
    label_verified: 'Badge de Vérification',
    label_show_avatar: 'Afficher l\'Avatar',
    label_avatar_shape: 'Silhouette de l\'Avatar',
    label_avatar_url: 'URL de la Photo de Profil',
    label_company_logo: 'URL du Logo de l\'Entreprise',
    
    header_review: 'Contenu du Témoignage',
    label_review_title: 'Titre de l\'Évaluation',
    label_review_text: 'Message de l\'Évaluation',
    placeholder_review_text: 'Saisissez les commentaires du client ici...',

    header_branding: 'Image de Marque',
    label_platform: 'Plateforme Source',
    label_custom_platform: 'Nom de la Plateforme Personnalisée',
    
    header_layout: 'Disposition & Typographie',
    label_theme: 'Palette de Couleurs',
    label_font: 'Famille de Police',
    label_quote: 'Style des Guillemets',
    label_card_style: 'Style du Conteneur',
    label_bg_style: 'Motif d\'Arrière-plan',
    
    header_colors: 'Couleurs de l\'Accentuation',
    label_primary_color: 'Couleur Primaire',
    label_accent_color: 'Couleur d\'Accentuation',
    label_card_bg: 'Arrière-plan de la Carte',
    label_text_color: 'Couleur du Texte Principal',

    header_canvas: 'Résolution & Qualité',
    label_resolution: 'Dimensions Cibles (Ratio)',
    label_scale: 'Qualité du Rendu',
    label_transparent: 'Arrière-plan Transparent',
    
    header_features: 'Fonctionnalités Spéciales',
    label_watermark: 'Activer le Filigrane de Créateur',
    label_watermark_text: 'Texte du Filigrane',
    label_qr_code: 'Inclure un Code QR de Confiance',
    label_qr_url: 'Lien du Code QR',
    label_custom_css: 'Injecteur CSS Personnalisé / Tailwind',

    header_templates: 'Modèles de Design Enregistrés',
    label_template_name: 'Nom du Modèle',
    btn_save_template: 'Enregistrer le Design Actuel',
    no_templates: 'Aucun modèle enregistré pour le moment.',
    placeholder_template_name: 'Ex: Ma Carte de Témoignage Upwork',

    header_batch: 'Génération de Lot Haute Performance',
    batch_desc: 'Collez un tableau d\'objets de témoignage au format JSON pour générer et télécharger automatiquement plusieurs cartes avec les paramètres de conception actuels.',
    placeholder_batch: '[\n  {\n    "clientName": "Marie Dupont",\n    "designation": "Directrice",\n    "company": "SaaS SAS",\n    "reviewTitle": "Service Exceptionnel",\n    "reviewText": "Une livraison parfaite et ultra rapide!"\n  }\n]',
    btn_batch_start: 'Démarrer la Génération en Lot',

    btn_random: 'Aléatoire (Démo)',
    btn_reset: 'Réinitialiser',
    btn_copy_text: 'Copier le Texte de l\'Évaluation',
    btn_copy_image: 'Copiar la Carte en Image',
    btn_download_png: 'Télécharger PNG',
    btn_download_jpg: 'Télécharger JPG',
    btn_download_webp: 'Télécharger WEBP',
    btn_share: 'Partager la Carte',
    btn_print: 'Imprimer la Carte',
    
    label_text_dir: 'Direction de la Disposition du Contenu',
    opt_dir_auto: 'Auto (Basé sur la langue)',
    opt_dir_ltr: 'Gauche à Droite (LTR)',
    opt_dir_rtl: 'Droite à Gauche (RTL)',
    btn_prefill_lang_text: 'Charger un Texte de Démo',

    // CSS Filters
    header_filters: 'Traitement d\'Image (Filtres)',
    label_filter_grayscale: 'Échelle de gris (Noir & Blanc)',
    label_filter_sepia: 'Chaleur vintage sépia',
    label_filter_brightness: 'Niveau de luminosité',
    label_filter_contrast: 'Contraste visuel',
    label_filter_blur: 'Floutage de l\'arrière-plan',
    btn_reset_filters: 'Réinitialiser les filtres'
  }
};

export const DEMO_TEXTS: Record<LanguageCode, { reviewTitle: string; reviewText: string; clientName: string; designation: string; company: string; country: string; reviewDate: string }> = {
  en: {
    clientName: 'Alexander Mercer',
    designation: 'VP of Product',
    company: 'Aether Technologies',
    country: 'United States',
    reviewDate: 'July 14, 2026',
    reviewTitle: 'Outstanding Technical Architecture & Leadership',
    reviewText: 'ReviewCraft Pro delivered a world-class React application under extremely tight deadlines. The architecture is clean, highly scalable, and the UI/UX animations are masterfully executed. An absolute standard of engineering excellence. We are already planning our next project together.',
  },
  es: {
    clientName: 'Alejandro Rodríguez',
    designation: 'Director de Innovación',
    company: 'Vortex Soluciones',
    country: 'España',
    reviewDate: '15 de Mayo de 2026',
    reviewTitle: 'Arquitectura Técnica y Liderazgo Excepcionales',
    reviewText: 'ReviewCraft Pro entregó una aplicación React de clase mundial bajo plazos extremadamente ajustados. La arquitectura es limpia, altamente escalable y las animaciones de interfaz de usuario están ejecutadas con maestría. Un estándar absoluto de excelencia en ingeniería.',
  },
  ar: {
    clientName: 'زينب الشمري',
    designation: 'مديرة تطوير المنتجات',
    company: 'مسار التكنولوجية',
    country: 'المملكة العربية السعودية',
    reviewDate: '١٨ يوليو ٢٠٢٦',
    reviewTitle: 'هندسة تقنية مذهلة وإدارة استثنائية للمشاريع',
    reviewText: 'قدم فريق العمل تطبيق رياكت من الطراز العالمي ضمن مواعيد نهائية ضيقة للغاية. تتميز البنية البرمجية بالنقاء والقابلية العالية للتوسع، كما أن الرسوم المتحركة في واجهة المستخدم تم تنفيذها ببراعة هندسية فائقة. نوصي بشدة بالتعامل معهم ونخطط لمشاريع مستقبلية معًا.',
  },
  bn: {
    clientName: 'আরিফুল ইসলাম',
    designation: 'প্রোডাক্ট ডিরেক্টর',
    company: 'ঢাকা সফটওয়্যার গ্রুপ',
    country: 'বাংলাদেশ',
    reviewDate: '১০ জুন, ২০২৬',
    reviewTitle: 'অসাধারণ কারিগরি স্থাপত্য এবং অবিশ্বাস্য নেতৃত্ব',
    reviewText: 'রিভিউক্রাফট প্রো অত্যন্ত কম সময়ের মধ্যে একটি বিশ্বমানের রিয়্যাক্ট অ্যাপ্লিকেশন সরবরাহ করেছে। এর আর্কিটেকচার অত্যন্ত পরিচ্ছন্ন ও মাপযোগ্য, এবং ইউজার ইন্টারফেসের অ্যানিমেশনগুলো চমৎকারভাবে তৈরি করা হয়েছে। এটি প্রকৌশলগত উৎকর্ষতার একটি অনন্য উদাহরণ।',
  },
  fr: {
    clientName: 'Charlotte Dubois',
    designation: 'Directrice Produit',
    company: 'Synapse Tech',
    country: 'France',
    reviewDate: '12 Avril 2026',
    reviewTitle: 'Architecture Technique et Leadership de Premier Ordre',
    reviewText: 'ReviewCraft Pro a livré une application React de classe mondiale dans des délais extrêmement serrés. L\'architecture est propre, hautement évolutive et les animations UI/UX sont exécutées de main de maître. Un standard absolu d\'excellence en ingénierie.',
  },
};
