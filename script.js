        let allPosts = [];
        let displayCount = 5;
        let selectedUser = {};

        window.addEventListener('DOMContentLoaded', loadUsers);

        async function loadUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Error al cargar usuarios');

                const users = await response.json();
                const select = document.getElementById('userSelect');

                users.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.name;
                    select.appendChild(option);
                });
            } catch (error) {
                showError('Error al cargar la lista de usuarios');
            }
        }

        async function getPosts() {
            const userId = document.getElementById('userSelect').value;
            if (!userId) {
                showError('Por favor selecciona un usuario');
                return;
            }

            try {
                document.getElementById('loading').style.display = 'block';
                document.getElementById('error').style.display = 'none';
                document.getElementById('postsGrid').innerHTML = '';

                const [userResponse, postsResponse] = await Promise.all([
                    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
                    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                ]);

                if (!userResponse.ok || !postsResponse.ok) throw new Error('Error al cargar datos');

                selectedUser = await userResponse.json();
                allPosts = await postsResponse.json();

                displayPosts();
            } catch (error) {
                showError('Error al cargar los datos');
            } finally {
                document.getElementById('loading').style.display = 'none';
            }
        }

        async function fetchComments(postId) {
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            if (!commentsResponse.ok) throw new Error('Error al cargar comentarios');
            const comments = await commentsResponse.json();
            return comments.length;
        }

        async function displayPosts() {
            const postsGrid = document.getElementById('postsGrid');
            postsGrid.innerHTML = '';

            const postsToDisplay = allPosts.slice(0, displayCount).reverse();
            for (let post of postsToDisplay) {
                const commentsCount = await fetchComments(post.id);

                const card = document.createElement('div');
                card.className = 'post-card';
                card.innerHTML = `
                    <div class="user-info">
                        <h3>${selectedUser.name}</h3>
                        <p>@${selectedUser.username}</p>
                        <p>${selectedUser.email}</p>
                        <p>${selectedUser.company.name}</p>
                    </div>
                    <span class="badge">Post #${post.id}</span>
                    <div class="post-title">${post.title}</div>
                    <button onclick="togglePostBody(this)">Ver más</button>
                    <p class="post-body" style="display: none;">${post.body}</p>
                   
                `;
                postsGrid.appendChild(card);
            }
        }

        function togglePostBody(button) {
            const body = button.nextElementSibling;
            if (body.style.display === 'none') {
                body.style.display = 'block';
                button.textContent = 'Ver menos';
            } else {
                body.style.display = 'none';
                button.textContent = 'Ver más';
            }
        }

        function loadMorePosts() {
            displayCount += 5;
            displayPosts();
        }

        function loadLessPosts() {
            if (displayCount > 5) {
                displayCount -= 5;
                displayPosts();
            }
        }

        function showError(message) {
            const errorDiv = document.getElementById('error');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            document.getElementById('postsGrid').innerHTML = '';
        }
