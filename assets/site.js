// 1) Initialize with your PUBLIC key (intended to be public)
emailjs.init({ publicKey: "BRr7yoM7ESVgvRgee" });


// 2) Hook up form behavior
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
  }
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form handler with EmailJS
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('contact-msg');
  if (form && msg) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear old state
      msg.textContent = '';
      msg.className = 'mt-2 text-xs'; // reset base classes

      // Honeypot check
      if (form.company && form.company.value) return;

      // Collect fields
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        msg.textContent = 'Please fill out all fields.';
        msg.classList.add('text-rose-600');
        setTimeout(() => (msg.textContent = ''), 4000);
        return;
      }

      // Disable button
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;

      try {
        await emailjs.send("service_phlcjpe", "template_bqohqhw", {
          name: name,
          email: email,
          message: message,
        });

        msg.textContent = 'Thanks! Your message has been sent.';
        msg.classList.add('text-emerald-600');
        setTimeout(() => (msg.textContent = ''), 4000);
        form.reset();
      } catch (err) {
        msg.textContent = 'Could not send. Please try again.';
        msg.classList.add('text-rose-600');
        setTimeout(() => (msg.textContent = ''), 4000);
      } finally {
        btn.disabled = false;
      }
    });
  }
});
