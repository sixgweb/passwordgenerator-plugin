(function () {

    let passwordGeneratorRender = () => {
        let passwordFields = document.querySelectorAll('[data-password-generator]');
        passwordFields.forEach(function (passwordField) {
            let generateLink = document.createElement('a');
            generateLink.href = '#';
            generateLink.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
            generateLink.addEventListener('click', (e) => {
                e.preventDefault();
                let password = passwordGenerator();
                passwordField.value = password;
                let confirmField = document.querySelector('[name="' + passwordField.dataset.passwordGenerator + '"]');
                confirmField.value = password;
                navigator.clipboard.writeText(password);
                $(passwordField).ocPopover({
                    content: '<p class="p-2">Copied</p>',
                    placement: 'top',
                });
            });
            passwordField.parentNode.querySelector('label').appendChild(generateLink);
        });
    };

    let passwordGenerator = (length = 12) => {
        let password = '';
        let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    };

    addEventListener('render', () => {
        passwordGeneratorRender()
    });
})();