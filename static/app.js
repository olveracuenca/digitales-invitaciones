/**
 * Creador de Invitaciones Digitales V2
 * Arquitectura basada en estado (State-Driven)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. ESTADO GLOBAL
    let state = {
        title: 'Nuestra Boda',
        names: 'Ana & Carlos',
        phrase: 'Nos casamos y queremos compartirlo contigo.',
        date: '2026-10-15T16:00',
        
        showCeremony: true,
        ceremonyName: 'Parroquia San José',
        ceremonyAddress: 'Calle Principal 123',
        ceremonyTime: '16:00 hrs',
        ceremonyMap: '',
        
        showReception: true,
        receptionName: 'Salón Las Rosas',
        receptionAddress: 'Av. Central 456',
        receptionTime: '18:00 hrs',
        receptionMap: '',
        
        showGifts: true,
        showGift1: true,
        gift1Name: 'Liverpool',
        gift1Url: '',
        
        showGift2: false,
        gift2Name: 'Amazon',
        gift2Url: '',
        
        showGift3: false,
        gift3Bank: 'BBVA - Juan Pérez',
        gift3Clabe: '',
        
        showRsvp: true,
        whatsappRSVP: ''
    };

    // Sobrescribir con la configuración inicial guardada (inyectada en HTML)
    if (typeof INITIAL_CONFIG !== 'undefined' && Object.keys(INITIAL_CONFIG).length > 0) {
        state = { ...state, ...INITIAL_CONFIG };
    }

    // 2. ELEMENTOS DEL DOM (Panel Izquierdo)
    const inputs = document.querySelectorAll('input[data-key], textarea[data-key]');
    const toggledContents = document.querySelectorAll('[data-show-if]');
    const btnSave = document.getElementById('btn-save');

    // 3. ELEMENTOS DEL DOM (Panel Derecho - Iframe)
    const previewFrame = document.getElementById('preview-frame');
    const templateHTML = document.getElementById('invitation-template').innerHTML;

    // Escribir el template base en el iframe una sola vez
    previewFrame.srcdoc = templateHTML;

    // 4. FUNCIONES DE RENDERIZADO
    
    // Sincronizar el estado con los valores del formulario
    function syncFormWithState() {
        inputs.forEach(input => {
            const key = input.getAttribute('data-key');
            if (input.type === 'checkbox') {
                input.checked = state[key];
            } else {
                input.value = state[key] || '';
            }
        });

        // Mostrar/ocultar secciones dependientes
        toggledContents.forEach(container => {
            const dependencyKey = container.getAttribute('data-show-if');
            container.style.display = state[dependencyKey] ? 'block' : 'none';
        });
    }

    // Actualizar la vista previa (Iframe) basada en el estado
    function updatePreview() {
        const doc = previewFrame.contentDocument || previewFrame.contentWindow?.document;
        if (!doc || doc.readyState !== 'complete') {
            // Reintentar si el iframe aún no carga
            setTimeout(updatePreview, 100);
            return;
        }

        const setVal = (id, val, isLink = false) => {
            const el = doc.getElementById(id);
            if (el) {
                if (isLink) {
                    el.href = val || '#';
                    el.style.display = val ? 'inline-block' : 'none';
                } else {
                    el.innerText = val || '';
                }
            }
        };

        const setVisible = (id, isVisible) => {
            const el = doc.getElementById(id);
            if (el) el.style.display = isVisible ? 'block' : 'none';
        };

        // Textos principales
        setVal('p-title', state.title);
        setVal('p-names', state.names);
        setVal('p-phrase', state.phrase);
        
        if (state.date) {
            const dateObj = new Date(state.date);
            if (!isNaN(dateObj)) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                setVal('p-date', dateObj.toLocaleDateString('es-ES', options));
            } else {
                setVal('p-date', state.date);
            }
        }

        // Ceremonia
        setVisible('s-ceremony', state.showCeremony);
        if (state.showCeremony) {
            setVal('p-ceremonyName', state.ceremonyName);
            setVal('p-ceremonyAddress', state.ceremonyAddress);
            setVal('p-ceremonyTime', state.ceremonyTime);
            setVal('p-ceremonyMap', state.ceremonyMap, true);
        }

        // Recepción
        setVisible('s-reception', state.showReception);
        if (state.showReception) {
            setVal('p-receptionName', state.receptionName);
            setVal('p-receptionAddress', state.receptionAddress);
            setVal('p-receptionTime', state.receptionTime);
            setVal('p-receptionMap', state.receptionMap, true);
        }

        // Regalos
        setVisible('s-gifts', state.showGifts);
        if (state.showGifts) {
            setVisible('sg-1', state.showGift1);
            if (state.showGift1) {
                setVal('p-gift1Name', state.gift1Name);
                setVal('p-gift1Url', state.gift1Url, true);
            }

            setVisible('sg-2', state.showGift2);
            if (state.showGift2) {
                setVal('p-gift2Name', state.gift2Name);
                setVal('p-gift2Url', state.gift2Url, true);
            }

            setVisible('sg-3', state.showGift3);
            if (state.showGift3) {
                setVal('p-gift3Bank', state.gift3Bank);
                setVal('p-gift3Clabe', state.gift3Clabe);
            }
        }

        // RSVP
        setVisible('s-rsvp', state.showRsvp);
        if (state.showRsvp) {
            const wsLink = state.whatsappRSVP ? `https://wa.me/${state.whatsappRSVP}?text=¡Hola! Confirmo mi asistencia.` : '#';
            const wsBtn = doc.getElementById('p-whatsappRSVP');
            if (wsBtn) wsBtn.href = wsLink;
        }
    }

    // 5. EVENT LISTENERS
    
    // Escuchar cambios en los inputs para actualizar el estado
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const key = e.target.getAttribute('data-key');
            if (e.target.type === 'checkbox') {
                state[key] = e.target.checked;
                // Mostrar u ocultar secciones dependientes
                toggledContents.forEach(container => {
                    const dependencyKey = container.getAttribute('data-show-if');
                    if (dependencyKey === key) {
                        container.style.display = state[key] ? 'block' : 'none';
                    }
                });
            } else {
                state[key] = e.target.value;
            }
            
            // Re-renderizar la vista previa
            updatePreview();
        });
    });

    // Guardar en el backend
    btnSave.addEventListener('click', async () => {
        btnSave.innerText = 'Guardando...';
        btnSave.disabled = true;

        try {
            // PROJECT_ID es inyectado desde el template
            const response = await fetch(`/admin/save_config/${PROJECT_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            });

            if (response.ok) {
                btnSave.innerText = '¡Guardado!';
                setTimeout(() => {
                    btnSave.innerText = 'Guardar Cambios';
                    btnSave.disabled = false;
                }, 2000);
            } else {
                alert("Error al guardar");
                btnSave.innerText = 'Guardar Cambios';
                btnSave.disabled = false;
            }
        } catch (error) {
            console.error(error);
            alert("Error de red al guardar");
            btnSave.innerText = 'Guardar Cambios';
            btnSave.disabled = false;
        }
    });

    // 6. INICIALIZACIÓN
    previewFrame.onload = () => {
        syncFormWithState();
        updatePreview();
    };
});
