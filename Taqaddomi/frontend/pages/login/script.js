
  document.querySelectorAll('.password-toggle').forEach((toggleBtn) => {
    const field = toggleBtn.parentElement.querySelector('input');
    const icon = toggleBtn.querySelector('.material-symbols-outlined');

    if (!field || !icon) return;

    toggleBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const isPassword = field.type === 'password';
      field.type = isPassword ? 'text' : 'password';
      icon.textContent = isPassword ? 'visibility_off' : 'visibility';
      toggleBtn.setAttribute('aria-pressed', String(isPassword));
    });
  });

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!loginForm.reportValidity()) return;

    const email = String(new FormData(loginForm).get('email') || '').trim().toLowerCase();
    const username = (email.split('@')[0] || 'member').replace(/[^a-z0-9_]/g, '') || 'member';
    const name = username
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Taqaddomi Member';

    localStorage.setItem('taqaddomi-auth-session', JSON.stringify({ email, loggedIn: true }));
    if (!localStorage.getItem('taqaddomi-profile')) {
      localStorage.setItem('taqaddomi-profile', JSON.stringify({ name, username, bio: 'Building better habits, one day at a time.', avatar: '🌱' }));
    }
    window.location.href = '../dashboard/index.html';
  });

