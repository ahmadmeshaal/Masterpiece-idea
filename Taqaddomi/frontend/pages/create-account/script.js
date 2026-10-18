
    // Use the same password toggle behavior for both password fields.
    document.querySelectorAll('.password-toggle').forEach((toggleBtn) => {
      const field = toggleBtn.parentElement.querySelector('input');
      const icon = toggleBtn.querySelector('.material-symbols-outlined');

      if (!field || !icon) return;

      toggleBtn.addEventListener('click', () => {
        const isPassword = field.type === 'password';
        field.type = isPassword ? 'text' : 'password';
        icon.textContent = isPassword ? 'visibility_off' : 'visibility';
        toggleBtn.setAttribute('aria-pressed', String(isPassword));
      });
    });

    // Submit Simulation
    window.handleSignupSubmit = function() {
      const submitBtn = document.getElementById('submit-cta');
      const successBanner = document.getElementById('signup-success-banner');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-90');
        submitBtn.innerHTML = `
          <span class="inline-block animate-spin material-symbols-outlined text-[18px]">autorenew</span>
          <span>Creating your account...</span>
        `;
      }

      setTimeout(() => {
        if (successBanner) {
          successBanner.classList.remove('hidden');
        }
        if (submitBtn) {
          submitBtn.innerHTML = `
            <span class="material-symbols-outlined text-[18px]">done</span>
            <span>Welcome aboard!</span>
          `;
        }
      }, 1000);
    };
  
