document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const successMessage = params.get('success');

  if (successMessage === '1') {
    const alertWrapper = document.getElementById('contact-success-alert');
    if (alertWrapper) {
      alertWrapper.classList.remove('d-none');
      alertWrapper.textContent = 'Thanks for your message! I have received it and will reply as soon as possible.';
    }
  }
});
