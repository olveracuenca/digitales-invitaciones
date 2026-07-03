document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // SELECCIÓN DE ELEMENTOS DEL DOM
    // ==========================================================================
    
    // Elementos del Editor
    const inputInternalName = document.getElementById('input-internal-name');
    const inputTitle = document.getElementById('input-title');
    const inputNames = document.getElementById('input-names');
    const inputPhrase = document.getElementById('input-phrase');
    const inputDate = document.getElementById('input-date');
    const inputParents = document.getElementById('input-parents');
    
    const inputCeremonyName = document.getElementById('input-ceremony-name');
    const inputCeremonyPlace = document.getElementById('input-ceremony-place');
    const inputCeremonyAddress = document.getElementById('input-ceremony-address');
    const inputCeremonyTime = document.getElementById('input-ceremony-time');
    const inputCeremonyMap = document.getElementById('input-ceremony-map');
    
    const inputReceptionName = document.getElementById('input-reception-name');
    const inputReceptionPlace = document.getElementById('input-reception-place');
    const inputReceptionAddress = document.getElementById('input-reception-address');
    const inputReceptionTime = document.getElementById('input-reception-time');
    const inputReceptionMap = document.getElementById('input-reception-map');
    
    const inputDressCode = document.getElementById('input-dress-code');
    const inputGiftTable = document.getElementById('input-gift-table');
    const inputBankAccount = document.getElementById('input-bank-account');
    
    const inputWhatsapp = document.getElementById('input-whatsapp');
    const inputMusicUrl = document.getElementById('input-music-url');
    
    // Selectores de Colores
    const inputColorPrimary = document.getElementById('input-color-primary');
    const inputColorText = document.getElementById('input-color-text');
    const inputColorBg1 = document.getElementById('input-color-bg1');
    const inputColorBg2 = document.getElementById('input-color-bg2');
    
    // Carga de Fotos e Imagen de Portada
    const inputBgUpload = document.getElementById('input-bg-upload');
    const uploadPreviewArea = document.getElementById('uploadPreviewArea');
    const previewFilename = document.getElementById('previewFilename');
    const btnRemoveUpload = document.getElementById('btn-remove-upload');
    const presetThumbImg = document.getElementById('preset-thumb-img');
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    // Controles de Galería / Carrusel (NUEVO)
    const inputShowGallery = document.getElementById('input-show-gallery');
    const galleryControlsContainer = document.getElementById('gallery-controls-container');
    const inputGalleryUpload = document.getElementById('input-gallery-upload');
    const editorGalleryThumbs = document.getElementById('editorGalleryThumbs');
    const invGallerySection = document.getElementById('invGallerySection');
    const previewGalleryTrack = document.getElementById('previewGalleryTrack');
    const btnCarouselPrev = document.getElementById('btn-carousel-prev');
    const btnCarouselNext = document.getElementById('btn-carousel-next');
    
    // Control de Mostrar/Ocultar Ceremonia (NUEVO)
    const inputShowCeremony = document.getElementById('input-show-ceremony');
    const invCeremonyCard = document.getElementById('invCeremonyCard');
    
    // Generador de Enlaces de Invitados (removido, ahora se descarga HTML)
    // Se mantienen variables en null para evitar errores
    const inputGuestName = document.getElementById('input-guest-name');
    const inputGuestPasses = document.getElementById('input-guest-passes');
    const btnGenerateLink = null;
    const generatedLinkArea = null;
    const inputGeneratedLink = null;
    const btnCopyLink = null;
    const btnShareWhatsapp = null;
    
    // Tarjeta de Bienvenida de Invitados
    const guestWelcomeCard = document.getElementById('guestWelcomeCard');
    const welcomeGuestName = document.getElementById('welcome-guest-name');
    const welcomeGuestPasses = document.getElementById('welcome-guest-passes');
    
    // Botones de Acción del Editor
    const btnExportConfig = document.getElementById('btn-export-config');
    const btnResetConfig = document.getElementById('btn-reset-config');
    
    // Selector de Plantillas
    const templateButtons = document.querySelectorAll('.template-btn');
    
    // Elementos del Simulador (Previsualización)
    const invitationContainer = document.getElementById('invitationContainer');
    const invHero = document.getElementById('invHero');
    const decorationsContainer = document.getElementById('decorationsContainer');
    
    const previewBadge = document.getElementById('preview-badge');
    const previewNames = document.getElementById('preview-names');
    const previewPhrase = document.getElementById('preview-phrase');
    const previewParents = document.getElementById('preview-parents');
    
    const previewCeremonyName = document.getElementById('preview-ceremony-name');
    const previewCeremonyPlace = document.getElementById('preview-ceremony-place');
    const previewCeremonyAddress = document.getElementById('preview-ceremony-address');
    const previewCeremonyTime = document.getElementById('preview-ceremony-time');
    const previewCeremonyMap = document.getElementById('preview-ceremony-map');
    
    const previewReceptionName = document.getElementById('preview-reception-name');
    const previewReceptionPlace = document.getElementById('preview-reception-place');
    const previewReceptionAddress = document.getElementById('preview-reception-address');
    const previewReceptionTime = document.getElementById('preview-reception-time');
    const previewReceptionMap = document.getElementById('preview-reception-map');
    
    const previewDressCode = document.getElementById('preview-dress-code');
    const previewGiftTable = document.getElementById('preview-gift-table');
    const previewBankAccount = document.getElementById('preview-bank-account');
    
    // Formulario RSVP de la Invitación
    const rsvpName = document.getElementById('rsvp-name');
    const rsvpForm = document.getElementById('rsvpForm');
    const btnSubmitRSVP = document.getElementById('btn-submit-rsvp');
    const rsvpCompanionsGroup = document.getElementById('rsvp-companions-group');
    const rsvpStatusRadio = document.getElementsByName('rsvp-status');
    const rsvpCompanionsSelect = document.getElementById('rsvp-companions');
    
    // Audio / Música
    const bgAudio = document.getElementById('bgAudio');
    const musicBtn = document.getElementById('musicBtn');
    
    // Toolbar de Previsualización
    const btnViewDesktop = document.getElementById('btn-view-desktop');
    const btnViewMobileOnly = document.getElementById('btn-view-mobile-only');
    const previewArea = document.querySelector('.preview-area');
    
    // Copia al portapapeles
    const btnCopyAccount = document.getElementById('btn-copy-account');
    const copyToast = document.getElementById('copyToast');
    
    // Cuenta Regresiva
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');
    
    
    // ==========================================================================
    // VARIABLES DE ESTADO Y PARÁMETROS URL
    // ==========================================================================
    let currentTemplateId = 'quinceanera';
    let currentConfig = {};
    let countdownInterval = null;
    let isMusicPlaying = false;
    
    // Foto cargada por el usuario
    let uploadedPhotoUrl = null;
    let currentPreset = 'photo'; // 'photo', 'minimalist', 'decorative'
    
    // Fotos activas del carrusel de la galería (NUEVO)
    let activeGalleryImages = [];
    let isGalleryVisible = true;
    let carouselInterval = null;
    let showCeremony = true;
    
    // Parámetros dinámicos del invitado leídos de la URL
    let urlGuestName = null;
    let urlGuestPasses = null;
    
    
    // ==========================================================================
    // LÓGICA DE INICIALIZACIÓN
    // ==========================================================================
    
    function init() {
        console.log("Iniciando aplicación Lirio Invitaciones v1.0.3...");
        
        // 1. Leer parámetros de la URL para invitado personalizado y plantilla
        const urlParams = new URLSearchParams(window.location.search);
        urlGuestName = urlParams.get('invitado') || urlParams.get('guest');
        urlGuestPasses = urlParams.get('pases') || urlParams.get('passes');
        const urlTheme = urlParams.get('theme') || urlParams.get('t');
        
        // 2. Determinar qué plantilla cargar
        const savedActiveTemplate = localStorage.getItem('inv_generator_active_template');
        if (urlTheme && defaultTemplates[urlTheme]) {
            currentTemplateId = urlTheme;
        } else if (savedActiveTemplate) {
            currentTemplateId = savedActiveTemplate;
        } else {
            currentTemplateId = 'quinceanera';
        }
        
        // 3. Cargar datos desde la base de datos (inyectados como INITIAL_CONFIG) o localStorage
        if (typeof INITIAL_CONFIG !== 'undefined') {
            currentConfig = INITIAL_CONFIG;
            console.log("Configuración cargada desde BD:", currentConfig);
        } else {
            const savedConfig = localStorage.getItem('inv_generator_config');
            if (savedConfig) {
                try {
                    const parsed = JSON.parse(savedConfig);
                    if (parsed && parsed.id === currentTemplateId) {
                        currentConfig = parsed;
                    } else {
                        currentConfig = loadDefaultTemplateConfig(currentTemplateId);
                    }
                } catch (e) {
                    currentConfig = loadDefaultTemplateConfig(currentTemplateId);
                }
            } else {
                currentConfig = loadDefaultTemplateConfig(currentTemplateId);
            }
        }
        
        // 4. Aplicar la configuración al UI
        applyTemplate(currentTemplateId, currentConfig);
        
        // 5. Configurar invitado personalizado si existe en la URL
        setupPersonalizedGuest();
        
        // 6. Configurar listeners de interacción
        setupEventListeners();
    }
    
    // Carga los datos base e inicia fecha futura
    function loadDefaultTemplateConfig(templateId) {
        const config = JSON.parse(JSON.stringify(defaultTemplates[templateId]));
        
        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() + 3);
        targetDate.setHours(18, 0, 0, 0);
        
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const hours = String(targetDate.getHours()).padStart(2, '0');
        const minutes = String(targetDate.getMinutes()).padStart(2, '0');
        
        config.date = `${year}-${month}-${day}T${hours}:${minutes}`;
        config.preset = 'photo';
        config.showGallery = true; // Por defecto mostrar
        return config;
    }
    
    // Configura la invitación para el invitado de la URL
    function setupPersonalizedGuest() {
        if (urlGuestName && urlGuestPasses) {
            const passes = parseInt(urlGuestPasses) || 1;
            
            // Mostrar la tarjeta de bienvenida
            guestWelcomeCard.style.display = 'block';
            welcomeGuestName.innerText = urlGuestName;
            welcomeGuestPasses.innerText = passes;
            
            // Pre-rellenar el formulario RSVP
            rsvpName.value = urlGuestName;
            
            // Adaptar opciones de pases en el select de RSVP
            rsvpCompanionsSelect.innerHTML = '';
            for (let i = 1; i <= passes; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.innerText = i === 1 ? '1 pase (Individual)' : i === 2 ? '2 pases (Pareja)' : `${i} pases`;
                if (i === passes) {
                    opt.selected = true;
                }
                rsvpCompanionsSelect.appendChild(opt);
            }
        } else {
            guestWelcomeCard.style.display = 'none';
            
            rsvpCompanionsSelect.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.innerText = i === 1 ? '1 pase (Individual)' : i === 2 ? '2 pases (Pareja)' : `${i} pases`;
                rsvpCompanionsSelect.appendChild(opt);
            }
        }
    }
    
    // Aplicar la plantilla y estilos a todo el sistema
    function applyTemplate(templateId, config) {
        currentTemplateId = templateId;
        
        // 1. Botones selector activo
        templateButtons.forEach(btn => {
            if (btn.dataset.template === templateId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 2. Rellenar inputs de textos
        inputTitle.value = config.title || '';
        inputNames.value = config.names || '';
        inputPhrase.value = config.phrase || '';
        inputDate.value = config.date || '';
        inputParents.value = config.parents || '';
        
        inputCeremonyName.value = config.ceremonyName || '';
        inputCeremonyPlace.value = config.ceremonyPlace || '';
        inputCeremonyAddress.value = config.ceremonyAddress || '';
        inputCeremonyTime.value = config.ceremonyTime || '';
        inputCeremonyMap.value = config.ceremonyMap || '';
        
        inputReceptionName.value = config.receptionName || '';
        inputReceptionPlace.value = config.receptionPlace || '';
        inputReceptionAddress.value = config.receptionAddress || '';
        inputReceptionTime.value = config.receptionTime || '';
        inputReceptionMap.value = config.receptionMap || '';
        
        inputDressCode.value = config.dressCode || '';
        inputGiftTable.value = config.giftTable || '';
        inputBankAccount.value = config.bankAccount || '';
        inputWhatsapp.value = config.whatsappRSVP || '';
        inputMusicUrl.value = config.musicUrl || '';
        
        // 3. Rellenar inputs de colores
        const defaultColors = getColorsForTheme(templateId);
        inputColorPrimary.value = config.colorPrimary || defaultColors.primary;
        inputColorText.value = config.colorText || defaultColors.text;
        inputColorBg1.value = config.colorBg1 || defaultColors.bg1;
        inputColorBg2.value = config.colorBg2 || defaultColors.bg2;
        
        // 4. Aplicar clase de tema e inicializar colores dinámicos
        invitationContainer.className = `invitation-container theme-${templateId}`;
        updateInvitationColors();
        
        // 5. Configurar preset de fondo guardado y miniatura de la plantilla
        currentPreset = config.preset || 'photo';
        presetThumbImg.style.backgroundImage = `url('${config.bgImage}')`;
        applyPreset(currentPreset);
        
        // 6. Configurar la visibilidad de la galería y fotos (NUEVO)
        isGalleryVisible = config.showGallery !== undefined ? config.showGallery : true;
        inputShowGallery.checked = isGalleryVisible;
        
        // Si la galería de la configuración tiene fotos guardadas (URLs), usarlas; si no, usar las por defecto de templates.js
        if (config.galleryImages && config.galleryImages.length > 0) {
            activeGalleryImages = [...config.galleryImages];
        } else {
            activeGalleryImages = [...defaultTemplates[templateId].galleryImages];
        }
        renderGallery();
        toggleGalleryVisibility(isGalleryVisible);
        
        // Configurar visibilidad de ceremonia (NUEVO)
        showCeremony = config.showCeremony !== undefined ? config.showCeremony : true;
        inputShowCeremony.checked = showCeremony;
        invCeremonyCard.style.display = showCeremony ? 'block' : 'none';
        
        // Detectar si la configuración trae una foto subida previamente
        if (config.bgImage && !config.bgImage.startsWith('assets/')) {
            uploadedPhotoUrl = config.bgImage;
        } else if (config.id !== currentConfig.id) {
            uploadedPhotoUrl = null;
        }

        if (uploadedPhotoUrl) {
            presetThumbImg.style.backgroundImage = `url('${uploadedPhotoUrl}')`;
            uploadPreviewArea.style.display = 'flex';
        } else {
            inputBgUpload.value = '';
            uploadPreviewArea.style.display = 'none';
        }
        
        // 7. Iniciar partículas
        generateParticles(templateId);
        
        // 8. Configurar música
        bgAudio.src = config.musicUrl || '';
        if (isMusicPlaying) {
            bgAudio.play().catch(err => console.log('Bloqueo reproducción automática:', err));
        }
        
        // 9. Sincronizar textos
        updatePreviewTexts();
        
        // 10. Arrancar contador
        startCountdown(config.date);
        
        // Ocultar sección de enlaces generados al cambiar de plantilla
        if (generatedLinkArea) {
            generatedLinkArea.style.display = 'none';
        }
        if (inputGuestName) {
            inputGuestName.value = '';
        }
    }
    
    // Obtener paleta por defecto
    function getColorsForTheme(templateId) {
        if (templateId === 'wedding') {
            return { primary: '#556b2f', text: '#2f3526', bg1: '#faf7f2', bg2: '#eae3d2' };
        } else if (templateId === 'babyshower') {
            return { primary: '#4a90e2', text: '#2b3a4a', bg1: '#eef7fc', bg2: '#bae6fd' };
        } else {
            return { primary: '#d4af37', text: '#403234', bg1: '#fff0f3', bg2: '#ffcbd5' };
        }
    }
    
    // HEX a RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '212, 175, 55';
    }
    
    // Aplicar los colores al simulador
    function updateInvitationColors() {
        const primary = inputColorPrimary.value;
        const text = inputColorText.value;
        const bg1 = inputColorBg1.value;
        const bg2 = inputColorBg2.value;
        
        invitationContainer.style.setProperty('--inv-primary', primary);
        invitationContainer.style.setProperty('--inv-primary-rgb', hexToRgb(primary));
        invitationContainer.style.setProperty('--inv-text-color', text);
        invitationContainer.style.setProperty('--inv-text-muted', `rgba(${hexToRgb(text)}, 0.7)`);
        invitationContainer.style.setProperty('--inv-bg-grad', `linear-gradient(to bottom, ${bg1} 0%, ${bg2} 100%)`);
        invitationContainer.style.setProperty('--inv-card-bg', `rgba(255, 255, 255, 0.88)`);
        invitationContainer.style.setProperty('--inv-card-border', `rgba(${hexToRgb(primary)}, 0.25)`);
    }
    
    // Sincronizar textos
    function updatePreviewTexts() {
        previewBadge.innerText = inputTitle.value;
        previewNames.innerText = inputNames.value;
        previewPhrase.innerText = inputPhrase.value ? `"${inputPhrase.value}"` : '';
        previewParents.innerHTML = (inputParents.value || '').replace(/\n/g, '<br>');
        
        previewCeremonyName.innerText = inputCeremonyName.value;
        previewCeremonyPlace.innerText = inputCeremonyPlace.value;
        previewCeremonyAddress.innerText = inputCeremonyAddress.value;
        previewCeremonyTime.innerText = inputCeremonyTime.value;
        previewCeremonyMap.href = inputCeremonyMap.value || '#';
        
        previewReceptionName.innerText = inputReceptionName.value;
        previewReceptionPlace.innerText = inputReceptionPlace.value;
        previewReceptionAddress.innerText = inputReceptionAddress.value;
        previewReceptionTime.innerText = inputReceptionTime.value;
        previewReceptionMap.href = inputReceptionMap.value || '#';
        
        previewDressCode.innerText = inputDressCode.value;
        previewGiftTable.innerText = inputGiftTable.value;
        previewBankAccount.innerText = inputBankAccount.value;
    }
    
    // Aplicar preset de portada
    function applyPreset(presetName) {
        currentPreset = presetName;
        
        presetButtons.forEach(btn => {
            if (btn.dataset.preset === presetName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        invHero.classList.remove('mode-minimalist', 'mode-decorative');
        
        if (presetName === 'photo') {
            const activeImage = uploadedPhotoUrl || `assets/${currentTemplateId}_bg.png`;
            invHero.style.backgroundImage = `url('${activeImage}')`;
        } else if (presetName === 'minimalist') {
            invHero.classList.add('mode-minimalist');
        } else if (presetName === 'decorative') {
            invHero.classList.add('mode-decorative');
        }
    }
    
    // Mostrar/ocultar galería carrusel (NUEVO)
    function toggleGalleryVisibility(show) {
        isGalleryVisible = show;
        if (show) {
            invGallerySection.style.display = 'block';
            galleryControlsContainer.style.display = 'block';
            startCarouselAutoSlide();
        } else {
            invGallerySection.style.display = 'none';
            galleryControlsContainer.style.display = 'none';
            stopCarouselAutoSlide();
        }
    }
    
    // Renderizar la Galería / Carrusel en el simulador y editor (NUEVO)
    function renderGallery() {
        // 1. Renderizar en el carrusel de la Invitación
        previewGalleryTrack.innerHTML = '';
        
        if (activeGalleryImages.length === 0) {
            // Si la galería está vacía, colocar un slide de aviso sutil
            const emptySlide = document.createElement('div');
            emptySlide.className = 'carousel-slide';
            emptySlide.style.backgroundColor = 'rgba(0,0,0,0.05)';
            emptySlide.style.display = 'flex';
            emptySlide.style.alignItems = 'center';
            emptySlide.style.justifyContent = 'center';
            emptySlide.innerHTML = `<span style="font-size: 12px; color: var(--inv-text-muted);">Sin fotos cargadas</span>`;
            previewGalleryTrack.appendChild(emptySlide);
        } else {
            activeGalleryImages.forEach(imgUrl => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.style.backgroundImage = `url('${imgUrl}')`;
                previewGalleryTrack.appendChild(slide);
            });
        }
        
        // 2. Renderizar en la lista de miniaturas del Editor
        editorGalleryThumbs.innerHTML = '';
        activeGalleryImages.forEach((imgUrl, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'gallery-thumb-wrapper';
            
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumb-img';
            thumb.style.backgroundImage = `url('${imgUrl}')`;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'gallery-thumb-remove';
            removeBtn.innerText = '✕';
            removeBtn.title = "Eliminar foto";
            removeBtn.addEventListener('click', () => {
                removeImageFromGallery(index);
            });
            
            wrapper.appendChild(thumb);
            wrapper.appendChild(removeBtn);
            editorGalleryThumbs.appendChild(wrapper);
        });
        
        // Iniciar auto deslizamiento al renderizar o actualizar la galería
        startCarouselAutoSlide();
    }
    
    // Eliminar una imagen de la galería carrusel (NUEVO)
    function removeImageFromGallery(index) {
        const removedUrl = activeGalleryImages[index];
        // Si es una URL blob temporal de ObjectURL, liberamos memoria
        if (removedUrl.startsWith('blob:')) {
            URL.revokeObjectURL(removedUrl);
        }
        
        activeGalleryImages.splice(index, 1);
        renderGallery();
    }

    // Funciones de deslizamiento automático del carrusel (NUEVO)
    function startCarouselAutoSlide() {
        stopCarouselAutoSlide();
        if (activeGalleryImages.length <= 1 || !isGalleryVisible) return;
        
        carouselInterval = setInterval(() => {
            const slideWidth = previewGalleryTrack.offsetWidth;
            const maxScrollLeft = previewGalleryTrack.scrollWidth - previewGalleryTrack.clientWidth;
            
            if (previewGalleryTrack.scrollLeft >= maxScrollLeft - 5) {
                previewGalleryTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                previewGalleryTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        }, 10000); // 10 segundos
    }

    function stopCarouselAutoSlide() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }
    
    
    // ==========================================================================
    // CUENTA REGRESIVA
    // ==========================================================================
    function startCountdown(dateString) {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        function updateTimer() {
            const targetTime = new Date(dateString).getTime();
            const now = new Date().getTime();
            const difference = targetTime - now;
            
            if (isNaN(targetTime) || difference <= 0) {
                cdDays.innerText = '00';
                cdHours.innerText = '00';
                cdMinutes.innerText = '00';
                cdSeconds.innerText = '00';
                clearInterval(countdownInterval);
                return;
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            cdDays.innerText = String(days).padStart(2, '0');
            cdHours.innerText = String(hours).padStart(2, '0');
            cdMinutes.innerText = String(minutes).padStart(2, '0');
            cdSeconds.innerText = String(seconds).padStart(2, '0');
        }
        
        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }
    
    
    // ==========================================================================
    // PARTÍCULAS
    // ==========================================================================
    function generateParticles(templateId) {
        decorationsContainer.innerHTML = '';
        const particleCount = 15;
        
        let colors = [];
        let shapes = [];
        
        if (templateId === 'quinceanera') {
            colors = [inputColorPrimary.value, '#fff', '#ffd700'];
            shapes = ['✨', '🌸', '✧', '◦'];
        } else if (templateId === 'wedding') {
            colors = [inputColorPrimary.value, '#fff', '#8fbc8f'];
            shapes = ['🍃', '🍂', '🤍', '✧'];
        } else if (templateId === 'babyshower') {
            colors = [inputColorPrimary.value, '#fff', '#fda4af'];
            shapes = ['☁️', '🎈', '⭐', '◦'];
        }
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.innerText = shape;
            particle.style.color = color;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.fontSize = `${Math.random() * 16 + 12}px`;
            
            const duration = Math.random() * 6 + 6;
            const delay = Math.random() * -12;
            const drift = Math.random() * 80 - 40;
            
            particle.style.setProperty('--p-duration', `${duration}s`);
            particle.style.setProperty('--p-drift', `${drift}px`);
            particle.style.animationDelay = `${delay}s`;
            
            decorationsContainer.appendChild(particle);
        }
    }
    
    
    // ==========================================================================
    // LISTENERS DE EVENTOS
    // ==========================================================================
    function setupEventListeners() {
        
        // 1. Cambios en inputs -> Sincronizar textos
        const textInputs = [
            { input: inputTitle, preview: previewBadge },
            { input: inputNames, preview: previewNames },
            { input: inputCeremonyName, preview: previewCeremonyName },
            { input: inputCeremonyPlace, preview: previewCeremonyPlace },
            { input: inputCeremonyAddress, preview: previewCeremonyAddress },
            { input: inputCeremonyTime, preview: previewCeremonyTime },
            { input: inputReceptionName, preview: previewReceptionName },
            { input: inputReceptionPlace, preview: previewReceptionPlace },
            { input: inputReceptionAddress, preview: previewReceptionAddress },
            { input: inputReceptionTime, preview: previewReceptionTime },
            { input: inputDressCode, preview: previewDressCode },
            { input: inputGiftTable, preview: previewGiftTable },
            { input: inputBankAccount, preview: previewBankAccount }
        ];
        
        textInputs.forEach(item => {
            if (item.input && item.preview) {
                item.input.addEventListener('input', () => {
                    item.preview.innerText = item.input.value;
                });
            }
        });
        
        inputPhrase.addEventListener('input', () => {
            previewPhrase.innerText = inputPhrase.value ? `"${inputPhrase.value}"` : '';
        });
        
        inputParents.addEventListener('input', () => {
            previewParents.innerHTML = inputParents.value.replace(/\n/g, '<br>');
        });
        
        inputDate.addEventListener('input', () => {
            startCountdown(inputDate.value);
        });
        
        inputCeremonyMap.addEventListener('input', () => {
            previewCeremonyMap.href = inputCeremonyMap.value || '#';
        });
        
        inputReceptionMap.addEventListener('input', () => {
            previewReceptionMap.href = inputReceptionMap.value || '#';
        });
        
        inputMusicUrl.addEventListener('input', () => {
            bgAudio.src = inputMusicUrl.value;
            if (isMusicPlaying) {
                bgAudio.play().catch(err => console.log(err));
            }
        });
        
        // 2. Colores cambiados en tiempo real
        [inputColorPrimary, inputColorText, inputColorBg1, inputColorBg2].forEach(colorInput => {
            if (colorInput) {
                colorInput.addEventListener('input', () => {
                    updateInvitationColors();
                    generateParticles(currentTemplateId);
                });
            }
        });
        
        // 3. Subida de foto de portada
        inputBgUpload.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                
                try {
                    const response = await fetch('/admin/upload_image', {
                        method: 'POST',
                        body: formData
                    });
                    if (!response.ok) {
                        throw new Error(`Error en la carga: ${response.status}`);
                    }
                    const data = await response.json();
                    
                    if (uploadedPhotoUrl && uploadedPhotoUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(uploadedPhotoUrl);
                    }
                    uploadedPhotoUrl = data.url;
                    
                    previewFilename.innerText = file.name;
                    uploadPreviewArea.style.display = 'flex';
                    
                    presetThumbImg.style.backgroundImage = `url('${uploadedPhotoUrl}')`;
                    applyPreset('photo');
                } catch (error) {
                    console.error('Error subiendo imagen:', error);
                    alert('Error subiendo la imagen de portada');
                }
            }
        });
        
        // Quitar foto de portada
        btnRemoveUpload.addEventListener('click', () => {
            if (uploadedPhotoUrl) {
                URL.revokeObjectURL(uploadedPhotoUrl);
                uploadedPhotoUrl = null;
            }
            inputBgUpload.value = '';
            uploadPreviewArea.style.display = 'none';
            
            const defaultImg = `assets/${currentTemplateId}_bg.png`;
            presetThumbImg.style.backgroundImage = `url('${defaultImg}')`;
            
            if (currentPreset === 'photo') {
                invHero.style.backgroundImage = `url('${defaultImg}')`;
            }
        });
        
        // Click en Presets
        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                applyPreset(btn.dataset.preset);
            });
        });
        
        // Mostrar/Ocultar Ceremonia (Checkbox) (NUEVO)
        inputShowCeremony.addEventListener('change', (event) => {
            showCeremony = event.target.checked;
            invCeremonyCard.style.display = showCeremony ? 'block' : 'none';
        });
        
        // 4. Mostrar/Ocultar Galería (Checkbox) (NUEVO)
        inputShowGallery.addEventListener('change', (event) => {
            toggleGalleryVisibility(event.target.checked);
        });
        
        // Subida Múltiple de Fotos para el Carrusel de la Galería (NUEVO)
        inputGalleryUpload.addEventListener('change', async (event) => {
            const files = event.target.files;
            if (files && files.length > 0) {
                // Agregar hasta un máximo razonable de fotos en la galería (ej: 12)
                const remainingSlots = 12 - activeGalleryImages.length;
                const uploadCount = Math.min(files.length, remainingSlots);
                
                if (files.length > remainingSlots) {
                    alert('Límite máximo de fotos en la galería alcanzado (12 fotos máximo).');
                }
                
                for (let i = 0; i < uploadCount; i++) {
                    const formData = new FormData();
                    formData.append('file', files[i]);
                    
                    try {
                        const response = await fetch('/admin/upload_image', {
                            method: 'POST',
                            body: formData
                        });
                        if (!response.ok) {
                            throw new Error(`Error en la carga: ${response.status}`);
                        }
                        const data = await response.json();
                        activeGalleryImages.push(data.url);
                    } catch (error) {
                        console.error('Error subiendo imagen de galería:', error);
                    }
                }
                
                renderGallery();
                inputGalleryUpload.value = ''; // limpiar input
            }
        });
        
        // Navegación del Carrusel con las flechas (NUEVO)
        btnCarouselNext.addEventListener('click', () => {
            const slideWidth = previewGalleryTrack.offsetWidth;
            const maxScrollLeft = previewGalleryTrack.scrollWidth - previewGalleryTrack.clientWidth;
            
            if (previewGalleryTrack.scrollLeft >= maxScrollLeft - 5) {
                previewGalleryTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                previewGalleryTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
            startCarouselAutoSlide(); // Reiniciar temporizador al hacer click manual
        });
        
        btnCarouselPrev.addEventListener('click', () => {
            const slideWidth = previewGalleryTrack.offsetWidth;
            const maxScrollLeft = previewGalleryTrack.scrollWidth - previewGalleryTrack.clientWidth;
            
            if (previewGalleryTrack.scrollLeft <= 5) {
                previewGalleryTrack.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
            } else {
                previewGalleryTrack.scrollBy({ left: -slideWidth, behavior: 'smooth' });
            }
            startCarouselAutoSlide(); // Reiniciar temporizador al hacer click manual
        });
        
        // 5. Generador de Enlaces de Invitados (Mantenemos por compatibilidad, aunque ya no se usan)
        if (btnGenerateLink) {
            btnGenerateLink.addEventListener('click', async () => {
                // Función removida en UI
            });
        }

        const btnGenerateGeneralLink = document.getElementById('btn-generate-general-link');
        if (btnGenerateGeneralLink) {
            btnGenerateGeneralLink.addEventListener('click', async () => {
                 // Función removida en UI
            });
        }
        
        // Copiar Enlace
        if (btnCopyLink) {
            btnCopyLink.addEventListener('click', () => {});
        }
        
        // Compartir por WhatsApp
        if (btnShareWhatsapp) {
            btnShareWhatsapp.addEventListener('click', () => {});
        }
        
        // 6. Cambiar de Plantilla
        templateButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const templateId = btn.dataset.template;
                
                // Guardar config temporal
                currentConfig = {
                    id: templateId,
                    themeClass: `theme-${templateId}`,
                    bgImage: uploadedPhotoUrl || `assets/${templateId}_bg.png`,
                    title: inputTitle.value,
                    names: inputNames.value,
                    phrase: inputPhrase.value,
                    date: inputDate.value,
                    parents: inputParents.value,
                    ceremonyName: inputCeremonyName.value,
                    ceremonyPlace: inputCeremonyPlace.value,
                    ceremonyAddress: inputCeremonyAddress.value,
                    ceremonyTime: inputCeremonyTime.value,
                    ceremonyMap: inputCeremonyMap.value,
                    receptionName: inputReceptionName.value,
                    receptionPlace: inputReceptionPlace.value,
                    receptionAddress: inputReceptionAddress.value,
                    receptionTime: inputReceptionTime.value,
                    receptionMap: inputReceptionMap.value,
                    dressCode: inputDressCode.value,
                    giftTable: inputGiftTable.value,
                    bankAccount: inputBankAccount.value,
                    whatsappRSVP: inputWhatsapp.value,
                    musicUrl: inputMusicUrl.value,
                    
                    // Colores modificados
                    colorPrimary: inputColorPrimary.value,
                    colorText: inputColorText.value,
                    colorBg1: inputColorBg1.value,
                    colorBg2: inputColorBg2.value,
                    
                    // Preset activo
                    preset: currentPreset,
                    
                    // Configuración de la galería
                    showGallery: isGalleryVisible,
                    galleryImages: [...activeGalleryImages],
                    
                    // Configuración de ceremonia
                    showCeremony: showCeremony
                };
                
                const targetConfig = defaultTemplates[templateId];
                const targetConfigCopy = JSON.parse(JSON.stringify(targetConfig));
                targetConfigCopy.date = inputDate.value; // mantener fecha
                
                applyTemplate(templateId, targetConfigCopy);
            });
        });
        
        // 7. Guardar Configuración (Exportar)
        async function saveConfigToServer(silent = false) {
            const finalConfig = {
                id: currentTemplateId,
                themeClass: `theme-${currentTemplateId}`,
                bgImage: uploadedPhotoUrl || `assets/${currentTemplateId}_bg.png`,
                internalName: inputInternalName ? inputInternalName.value : '',
                title: inputTitle.value,
                names: inputNames.value,
                phrase: inputPhrase.value,
                date: inputDate.value,
                parents: inputParents.value,
                ceremonyName: inputCeremonyName.value,
                ceremonyPlace: inputCeremonyPlace.value,
                ceremonyAddress: inputCeremonyAddress.value,
                ceremonyTime: inputCeremonyTime.value,
                ceremonyMap: inputCeremonyMap.value,
                receptionName: inputReceptionName.value,
                receptionPlace: inputReceptionPlace.value,
                receptionAddress: inputReceptionAddress.value,
                receptionTime: inputReceptionTime.value,
                receptionMap: inputReceptionMap.value,
                dressCode: inputDressCode.value,
                giftTable: inputGiftTable.value,
                bankAccount: inputBankAccount.value,
                whatsappRSVP: inputWhatsapp.value,
                musicUrl: inputMusicUrl.value,
                
                // Guardar colores personalizados
                colorPrimary: inputColorPrimary.value,
                colorText: inputColorText.value,
                colorBg1: inputColorBg1.value,
                colorBg2: inputColorBg2.value,
                
                // Guardar preset de fondo activo
                preset: currentPreset,
                
                // Guardar galería
                showGallery: isGalleryVisible,
                galleryImages: [...activeGalleryImages],
                
                // Guardar visibilidad de ceremonia
                showCeremony: showCeremony
            };
            
            localStorage.setItem('inv_generator_config', JSON.stringify(finalConfig));
            localStorage.setItem('inv_generator_active_template', currentTemplateId);
            
            try {
                const endpoint = typeof PROJECT_ID !== 'undefined' ? `/admin/save_config/${PROJECT_ID}` : '/admin/save_config/1';
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalConfig)
                });
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                if (!silent) {
                    alert('🎉 ¡Configuración guardada en el sistema! Ahora tus invitados verán los cambios (cuenta regresiva, colores, textos).');
                }
            } catch (err) {
                console.error(err);
                if (!silent) {
                    alert('Guardado localmente, pero hubo un error al guardar en el servidor.');
                }
            }
        }

        btnExportConfig.addEventListener('click', () => saveConfigToServer(false));
        
        // Restaurar Configuración de fábrica
        btnResetConfig.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas restaurar los colores, textos y carrusel por defecto de esta plantilla?')) {
                localStorage.removeItem('inv_generator_config');
                localStorage.removeItem('inv_generator_active_template');
                
                // Limpiar fotos subidas de portada
                if (uploadedPhotoUrl) {
                    URL.revokeObjectURL(uploadedPhotoUrl);
                    uploadedPhotoUrl = null;
                }
                inputBgUpload.value = '';
                uploadPreviewArea.style.display = 'none';
                
                // Limpiar fotos de galería
                activeGalleryImages.forEach(url => {
                    if (url.startsWith('blob:')) {
                        URL.revokeObjectURL(url);
                    }
                });
                
                const targetConfig = loadDefaultTemplateConfig(currentTemplateId);
                applyTemplate(currentTemplateId, targetConfig);
            }
        });
        
        // 8. Copiar Cuenta Bancaria
        btnCopyAccount.addEventListener('click', () => {
            const textToCopy = inputBankAccount.value;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyToast.classList.add('show');
                setTimeout(() => {
                    copyToast.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error(err);
                alert('No se pudo copiar automáticamente.');
            });
        });
        
        // 9. Música Reproductor
        musicBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgAudio.pause();
                musicBtn.classList.remove('playing');
                isMusicPlaying = false;
            } else {
                bgAudio.play()
                    .then(() => {
                        musicBtn.classList.add('playing');
                        isMusicPlaying = true;
                    })
                    .catch(err => {
                        console.error('Audio bloqueado:', err);
                        alert('No se pudo iniciar la música de fondo. Verifica que el navegador permita la reproducción o que el enlace MP3 sea válido.');
                    });
            }
        });
        
        // RSVP Esconder pases adicionales si no asiste
        for (let radio of rsvpStatusRadio) {
            radio.addEventListener('change', () => {
                if (radio.value === 'No podré asistir') {
                    rsvpCompanionsGroup.style.display = 'none';
                } else {
                    rsvpCompanionsGroup.style.display = 'block';
                }
            });
        }
        
        // 10. Confirmar RSVP vía WhatsApp
        btnSubmitRSVP.addEventListener('click', () => {
            const guestName = rsvpName.value.trim();
            const rsvpStatus = document.querySelector('input[name="rsvp-status"]:checked').value;
            const confirmedPasses = rsvpCompanionsSelect.value;
            const customMessage = document.getElementById('rsvp-msg').value.trim();
            const whatsappNumber = inputWhatsapp.value.trim();
            
            if (!guestName) {
                alert('Por favor ingresa tu nombre para confirmar.');
                rsvpName.focus();
                return;
            }
            
            if (!whatsappNumber) {
                alert('El organizador no ha configurado un número de WhatsApp para recibir confirmaciones.');
                return;
            }
            
            let text = `*Confirmación de Asistencia*\n`;
            text += `Evento: *${inputTitle.value} - ${inputNames.value}*\n\n`;
            text += `👤 *Invitado:* ${guestName}\n`;
            text += `💌 *Asistencia:* ${rsvpStatus === 'Si, asistiré' ? '✅ ¡Sí asistiré!' : '❌ No podré asistir'}\n`;
            
            if (rsvpStatus === 'Si, asistiré') {
                if (urlGuestPasses) {
                    text += `👥 *Pases Confirmados:* ${confirmedPasses} de ${urlGuestPasses} asignados\n`;
                } else {
                    text += `👥 *Pases Confirmados:* ${confirmedPasses}\n`;
                }
            }
            
            if (customMessage) {
                text += `💬 *Mensaje:* "${customMessage}"\n`;
            }
            
            text += `\n_Confirmado desde la invitación digital_ 🌸`;
            
            const cleanNumber = whatsappNumber.replace(/\D/g, '');
            let fullNumber = cleanNumber;
            if (cleanNumber.length === 10) {
                fullNumber = '52' + cleanNumber;
            }
            
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${fullNumber}&text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        });
        
        // 11. Controles del Toolbar (Cambiar Vistas)
        btnViewDesktop.addEventListener('click', () => {
            previewArea.classList.remove('mobile-only-mode');
            btnViewDesktop.classList.add('active');
            btnViewMobileOnly.classList.remove('active');
        });
        
        btnViewMobileOnly.addEventListener('click', () => {
            previewArea.classList.add('mobile-only-mode');
            btnViewMobileOnly.classList.add('active');
            btnViewDesktop.classList.remove('active');
        });
    }
    
    init();
});
