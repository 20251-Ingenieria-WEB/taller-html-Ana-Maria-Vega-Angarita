function fetchPersonaje() {
    let nombrepersonaje = document.getElementById('searchInput').value.trim(); // Eliminar espacios en blanco

    // Validar que el usuario haya ingresado al menos 3 caracteres
    if (nombrepersonaje.length < 3) {
        document.getElementById('characterList').innerHTML = `
            <div class="error-container">
                <img src="images/Error.png" alt="Error" class="error-image" />
                <p class="error-message">Por favor, ingresa al menos 3 caracteres para realizar la búsqueda.</p>
            </div>
        `;
        return;
    }

    let url = `https://rickandmortyapi.com/api/character/?name=${nombrepersonaje}`;
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('No se encontró el personaje');
            }
        })
        .then((data) => {
            console.log(data);

            // Limpiar resultados anteriores
            let characterList = document.getElementById('characterList');
            characterList.innerHTML = '';

            const filteredResults = data.results.filter(character =>
                character.name.toLowerCase().includes(nombrepersonaje.toLowerCase())
            );

            // Mostrar los resultados filtrados
            if (filteredResults.length > 0) {
                characterList.innerHTML = filteredResults.map((character) => `
                    <div class="character-card" onclick="showModal('${character.name}', '${character.image}', '${character.status}', '${character.species}', '${character.gender}')">
                        <h2>${character.name}</h2>
                        <img src="${character.image}" alt="${character.name}" />
                        <p><strong>Nombre:</strong> ${character.name}</p>
                        <p><strong>Estado:</strong> ${character.status}</p>
                        <p><strong>Especie:</strong> ${character.species}</p>
                        <p><strong>Género:</strong> ${character.gender}</p>
                    </div>
                `).join('');
            } else {
                // Si no hay coincidencias, mostrar un mensaje
                characterList.innerHTML = `
                    <div class="error-container">
                        <img src="images/Error.png" alt="Error" class="error-image" />
                        <p class="error-message">No se encontraron personajes con el nombre "${nombrepersonaje}".</p>
                    </div>
                `;
            }
        })

        // Si ocurre un error en la solicitud, mostrar un mensaje de error
        .catch((err) => {
            console.log('Error :>> ', err);
            document.getElementById('characterList').innerHTML = `
                <div class="error-container">
                    <img src="images/Error.png" alt="Error" class="error-image" />
                    <p class="error-message">No se encontraron personajes, intenta con otro nombre.</p>
                </div>
            `;
        });
}

    // Función para mostrar el modal
    function showModal(name, image, status, species, gender) {
        const modal = document.getElementById('modal');
        const modalCharacter = document.getElementById('modalCharacter');

        modalCharacter.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}" style="width: 50%; border-radius: 10px;" />
            <p><strong>Estado:</strong> ${status}</p>
            <p><strong>Especie:</strong> ${species}</p>
            <p><strong>Género:</strong> ${gender}</p>
        `;

        modal.style.display = 'block';
    }

    // Cerrar el modal
    document.getElementById('closeModal').onclick = function () {
        document.getElementById('modal').style.display = 'none';
    };

    // Cerrar el modal al hacer clic fuera de él
    window.onclick = function (event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    function checkEnter(event) {
        if (event.key === 'Enter') {
            fetchPersonaje(); // Si se presiona Enter, se ejecuta la función de búsqueda
        }
}