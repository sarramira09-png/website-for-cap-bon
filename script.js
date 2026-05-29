const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', scrollY > 60);
    }, { passive: true });

    // Hero parallax
    const heroBg = document.getElementById('heroBg');
    window.addEventListener('scroll', () => {
      if (scrollY < innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.28}px)`;
      }
    }, { passive: true });

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-up')
      .forEach(el => io.observe(el));

    // Drawer effect
    const drawerIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('open'), 50);
          drawerIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('[data-drawer]').forEach(d => drawerIo.observe(d));

    // Gallery drag
    const gallery = document.getElementById('gallery');
    let dragging = false, startX, scrollLeft;

    gallery.addEventListener('mousedown', e => {
      dragging = true;
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
      gallery.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      e.preventDefault();
      gallery.scrollLeft = scrollLeft - (e.pageX - gallery.offsetLeft - startX) * 1.4;
    });
    document.addEventListener('mouseup', () => {
      dragging = false;
      gallery.style.cursor = 'grab';
    });
    gallery.addEventListener('touchstart', e => {
      startX = e.touches[0].pageX;
      scrollLeft = gallery.scrollLeft;
    }, { passive: true });
    gallery.addEventListener('touchmove', e => {
      gallery.scrollLeft = scrollLeft - (e.touches[0].pageX - startX);
    }, { passive: true });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });