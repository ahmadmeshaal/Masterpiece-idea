
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

