if (window.self !== window.top) {
    window.top.location.href = window.location.href;
  }

window.addEventListener('load', detectAdBlock);

function detectAdBlock() {
    const testUrl ="https://accommodateyours.com/f33973cc1ea74d67167f3d43d54129dd/invoke.js";
    const timeoutMs = 500;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        if (!document.getElementById('adblock-popup')) {
            showAdBlockPopup();
        }
    }, timeoutMs);

    fetch(testUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
        cache: 'no-store'
    })
    .then(() => {
        clearTimeout(timeoutId);
        removeAdBlockPopup();
    })
    .catch(() => {
        clearTimeout(timeoutId);
        if (!document.getElementById('adblock-popup')) {
            showAdBlockPopup();
        }
    });
}

function showAdBlockPopup() {
    if (document.getElementById('adblock-popup')) return;

    const popupHTML = `
    <div id="adblock-popup" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    ">
        <div style="
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            text-align: center;
        ">
            <h2 style="margin-top: 0;">Bloqueador detectado</h2>
            <p>Este website se mantiene exclusivamente de la publicidad</p>
            <p>Si deshabilitas el bloqueador, nos comprometemos a que solo soportes la publicidad mínima y justa para la rentabliidad del proyecto</p>
            <p><b><span style="color:red;">Refresca la página cuando hayas deshabiliado el bloqueador</span></b></p> 
            <p>GRACIAS POR LA COMPRENSIÓN</p>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);
}


function removeAdBlockPopup() {
    const popup = document.getElementById('adblock-popup');
    if (popup) popup.remove();
}