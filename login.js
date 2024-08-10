document.addEventListener('DOMContentLoaded', () => {
    // Definir usuarios válidos en localStorage (esto es solo para simulación)
    const validUsers = {
        'karinaadames@gmail.com': 'password123'
    };

    // Guardar los usuarios válidos en localStorage (esto solo se hace una vez)
    localStorage.setItem('users', JSON.stringify(validUsers));

    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener valores del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Obtener los usuarios válidos desde localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users'));

        // Validar credenciales
        if (storedUsers[email] && storedUsers[email] === password) {
            // Mostrar alerta de éxito con SweetAlert2
            await Swal.fire({
                title: 'Éxito',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            // Mostrar alerta de error con SweetAlert2
            await Swal.fire({
                title: 'Error',
                text: 'Correo electrónico o contraseña incorrectos',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});
