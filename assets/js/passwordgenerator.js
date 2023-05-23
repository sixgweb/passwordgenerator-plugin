(function () {

    const createPasswordLink = () => {
        let link = document.createElement('a');
        link.title = 'Generate Password';
        link.href = '#';
        link.classList.add('generate-password', 'me-1');
        link.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
        return link;

    };

    const createCopyLink = () => {
        let link = document.createElement('a');
        link.title = 'Copy Password';
        link.href = '#';
        link.classList.add('copy-password', 'me-1');
        link.innerHTML = '<i class="bi bi-clipboard"></i>';
        return link;
    };

    const passwordGeneratorRender = () => {

        let passwordFields = document.querySelectorAll('input[type="password"]');

        passwordFields.forEach(function (passwordField) {

            if (passwordField.parentElement.querySelector('.generate-password')) {
                return;
            }

            let fieldName = passwordField.parentElement.dataset.fieldName;
            if (fieldName.indexOf('_confirmation') == -1) {
                let confirmationName = passwordField.name.replace(fieldName, fieldName + '_confirmation');
                let passwordLink = createPasswordLink();
                let copyPasswordLink = createCopyLink();
                let label = passwordField.parentElement.querySelector('label');
                let generateIcon = passwordLink.querySelector('i');
                let copyIcon = copyPasswordLink.querySelector('i');

                passwordLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    let password = passwordGenerator();
                    let confirmField = document.querySelector('[name="' + confirmationName + '"]');
                    if (confirmField) {
                        confirmField.value = password;
                    }
                    passwordField.value = password;
                    label.appendChild(copyPasswordLink);
                    generateIcon.classList.remove('bi-arrow-repeat');
                    generateIcon.classList.add('bi-check2-circle');
                    setTimeout(() => {
                        generateIcon.classList.remove('bi-check2-circle');
                        generateIcon.classList.add('bi-arrow-repeat');
                    }, 1000)
                });

                copyPasswordLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(passwordField.value);
                    copyIcon.classList.remove('bi-clipboard');
                    copyIcon.classList.add('bi-clipboard-check');
                    setTimeout(() => {
                        copyIcon.classList.remove('bi-clipboard-check');
                        copyIcon.classList.add('bi-clipboard');
                    }, 1000)
                });

                label.appendChild(passwordLink);
            }
        });
    };

    const passwordGenerator = (length = 12) => {
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