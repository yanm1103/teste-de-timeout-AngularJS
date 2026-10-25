// ===== Tema claro/escuro =====
// Sem escolha salva, o CSS segue prefers-color-scheme do navegador.
(function () {
    const STORAGE_KEY = 'theme';
    const root = document.documentElement;
    const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
        return root.dataset.theme || (mediaDark.matches ? 'dark' : 'light');
    }

    function renderButton(button) {
        const dark = currentTheme() === 'dark';
        button.textContent = dark ? '☀️ Tema claro' : '🌙 Tema escuro';
        button.setAttribute('aria-pressed', String(dark));
    }

    function applySaved() {
        let saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch {
            // armazenamento indisponível: segue o navegador
        }
        if (saved === 'dark' || saved === 'light') {
            root.dataset.theme = saved;
        }
    }

    applySaved();

    document.addEventListener('DOMContentLoaded', function () {
        const button = document.getElementById('theme-toggle');
        if (!button) {
            return;
        }
        renderButton(button);

        button.addEventListener('click', function () {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.dataset.theme = next;
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch {
                // ignora
            }
            renderButton(button);
        });

        mediaDark.addEventListener('change', function () {
            if (!root.dataset.theme) {
                renderButton(button);
            }
        });
    });
})();
