/**
 * QUEEN'S POD - CORE JAVASCRIPT CONTROLLER
 * SPA Routing, 360 Panorama Drag-to-Scroll, Ambient Audio, Dynamic Menu, Lightbox, & Bookings
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SPA ROUTING CONTROLLER
    // ==========================================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');

    function handleRouting() {
        const hash = window.location.hash || '#home';
        const targetSection = document.querySelector(hash);

        if (targetSection) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');

            // Deactivate all links and sections
            navLinks.forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Activate target section
            targetSection.classList.add('active');
            
            // Scroll window to top smoothly
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Initialize page-specific behaviors if needed
            if (hash === '#home') {
                centerPanorama();
            }
        }
    }

    window.addEventListener('hashchange', handleRouting);
    // Initial route check on page load
    handleRouting();

    // Mobile Hamburger Menu Toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });


    // ==========================================================================
    // 2. 360 PANORAMA VIEWER CONTROLLER
    // ==========================================================================
    const viewport = document.getElementById('panoramaViewport');
    const slider = document.getElementById('panoramaSlider');
    let isDragging = false;
    let startX = 0;
    let currentTranslateX = 0;
    let previousTranslateX = 0;
    const maxScrollLimit = 0; // Left end point
    let minScrollLimit = 0;   // Right end point

    function updatePanoramaLimit() {
        if (viewport && slider) {
            // slider width is typically 2400px, viewport width is container width (e.g. 1150px)
            // translation is negative, representing shifts to the left
            minScrollLimit = viewport.offsetWidth - slider.offsetWidth;
        }
    }

    function centerPanorama() {
        if (viewport && slider) {
            updatePanoramaLimit();
            // Start centered in the middle of the wide image
            const centerShift = (viewport.offsetWidth - slider.offsetWidth) / 2;
            currentTranslateX = centerShift;
            previousTranslateX = centerShift;
            slider.style.transform = `translateX(${currentTranslateX}px)`;
        }
    }

    // Initialize panorama metrics
    updatePanoramaLimit();
    window.addEventListener('resize', () => {
        updatePanoramaLimit();
        // Constrain current scroll to new bounds
        if (currentTranslateX < minScrollLimit) {
            currentTranslateX = minScrollLimit;
        }
        slider.style.transform = `translateX(${currentTranslateX}px)`;
    });

    // Mouse Drag events
    if (viewport && slider) {
        viewport.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - viewport.offsetLeft;
            previousTranslateX = currentTranslateX;
            slider.style.transition = 'none'; // Turn off transitions while dragging
        });

        viewport.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        viewport.addEventListener('mouseup', () => {
            isDragging = false;
            previousTranslateX = currentTranslateX;
        });

        viewport.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - viewport.offsetLeft;
            const walk = x - startX;
            
            let targetX = previousTranslateX + walk;
            // Boundaries check
            if (targetX > maxScrollLimit) targetX = maxScrollLimit;
            if (targetX < minScrollLimit) targetX = minScrollLimit;

            currentTranslateX = targetX;
            slider.style.transform = `translateX(${currentTranslateX}px)`;
        });

        // Touch Drag events for Mobile Support
        viewport.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - viewport.offsetLeft;
            previousTranslateX = currentTranslateX;
            slider.style.transition = 'none';
        });

        viewport.addEventListener('touchend', () => {
            isDragging = false;
            previousTranslateX = currentTranslateX;
        });

        viewport.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - viewport.offsetLeft;
            const walk = x - startX;
            
            let targetX = previousTranslateX + walk;
            if (targetX > maxScrollLimit) targetX = maxScrollLimit;
            if (targetX < minScrollLimit) targetX = minScrollLimit;

            currentTranslateX = targetX;
            slider.style.transform = `translateX(${currentTranslateX}px)`;
        });

        // Interactive Hotspot Taps (Mobile UX)
        const hotspots = document.querySelectorAll('.hotspot');
        hotspots.forEach(h => {
            const trigger = h.querySelector('.hotspot-trigger');
            trigger.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop click from propagating
                
                // Toggle active on current hotspot and close others
                const wasActive = h.classList.contains('active');
                hotspots.forEach(otherH => otherH.classList.remove('active'));
                
                if (!wasActive) {
                    h.classList.add('active');
                }
            });
        });

        // Click outside closes all hotspots
        document.addEventListener('click', () => {
            hotspots.forEach(h => h.classList.remove('active'));
        });
    }


    // ==========================================================================
    // 3. AMBIENT RIVER SOUND CONTROLLER
    // ==========================================================================
    const soundToggle = document.getElementById('soundToggle');
    const ambientAudio = document.getElementById('ambientAudio');
    let isAudioPlaying = false;

    if (soundToggle && ambientAudio) {
        // Lower volume slightly so it is ambient and pleasant
        ambientAudio.volume = 0.45;

        soundToggle.addEventListener('click', () => {
            if (!isAudioPlaying) {
                // Play audio
                ambientAudio.play().then(() => {
                    isAudioPlaying = true;
                    soundToggle.classList.add('playing');
                    soundToggle.querySelector('.sound-label').innerText = 'Mute River Sound';
                }).catch(err => {
                    console.log("Audio play failed, user interaction required first.", err);
                    alert("Click anywhere on the page first, then toggle sound!");
                });
            } else {
                // Pause audio
                ambientAudio.pause();
                isAudioPlaying = false;
                soundToggle.classList.remove('playing');
                soundToggle.querySelector('.sound-label').innerText = 'Play River Ambient';
            }
        });
    }


    // ==========================================================================
    // 4. MENU SECTION CONTROLS (TABS & DIET FILTERS)
    // ==========================================================================
    const tabNavButtons = document.querySelectorAll('.tab-nav-btn');
    const menuSectionBlocks = document.querySelectorAll('.menu-section-block');
    const dietBtns = document.querySelectorAll('.diet-btn');
    const menuItems = document.querySelectorAll('.menu-item-row, .pick-card');

    // Tab categories navigation
    tabNavButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.getAttribute('data-target');

            // Deactivate all tab buttons and blocks
            tabNavButtons.forEach(b => b.classList.remove('active'));
            menuSectionBlocks.forEach(block => block.classList.remove('active'));

            // Activate current
            btn.classList.add('active');
            const targetBlock = document.getElementById(`section-${targetCategory}`);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
            
            // Smoothly scroll down slightly to focus on the section block if menu-controls is sticky
            const menuControls = document.querySelector('.menu-controls-wrapper');
            const blockTop = targetBlock.offsetTop - menuControls.offsetHeight - 80;
            window.scrollTo({ top: blockTop, behavior: 'smooth' });
        });
    });

    // Diet Filter (Veg / Non-Veg / All)
    dietBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dietBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                // Determine item class
                const isVeg = item.classList.contains('veg');
                const isNonVeg = item.classList.contains('nonveg');

                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else if (filterValue === 'veg') {
                    if (isVeg) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                } else if (filterValue === 'nonveg') {
                    if (isNonVeg) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });


    // ==========================================================================
    // 5. EXPERIENCE PAGE LIGHTBOX GALLERY
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    // Filter gallery
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterCategory = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterCategory === 'all' || item.classList.contains(filterCategory)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox modal trigger
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            const caption = item.querySelector('h4').innerText;
            const category = item.querySelector('span').innerText;

            lightboxImg.src = imgSrc;
            lightboxImg.alt = caption;
            lightboxCaption.innerText = `${caption} (${category})`;
            lightboxModal.classList.add('active');
        });
    });

    // Close Lightbox
    if (lightboxClose && lightboxModal) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                lightboxModal.classList.remove('active');
            }
        });
    }


    // ==========================================================================
    // 6. TESTIMONIALS SLIDER AUTOMATION
    // ==========================================================================
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 6500); // Shift every 6.5s
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        // Initial start
        startSlideShow();

        // Manual controls on dots click
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(index);
                startSlideShow(); // restart interval
            });
        });
    }


    // ==========================================================================
    // 7. RESERVATION FORM AND WHATSAPP PREFILL
    // ==========================================================================
    const resForm = document.getElementById('reservationForm');
    const resSuccessOverlay = document.getElementById('reservationSuccess');
    const bookingRecap = document.getElementById('bookingRecap');
    const whatsAppDirectBtn = document.getElementById('whatsAppDirectBtn');
    const closeOverlayBtn = document.getElementById('closeOverlayBtn');
    const resDateInput = document.getElementById('resDate');

    // Restrict date input to today and onwards
    if (resDateInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        resDateInput.min = todayStr;
    }

    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve form values
            const name = document.getElementById('resName').value.trim();
            const phone = document.getElementById('resPhone').value.trim();
            const email = document.getElementById('resEmail').value.trim();
            const date = document.getElementById('resDate').value;
            const time = document.getElementById('resTime').value;
            const guests = document.getElementById('resGuests').value;
            const hasPet = document.getElementById('resPet').checked;
            const specialRequests = document.getElementById('resRequests').value.trim();

            // Basic HTML escaping to prevent XSS
            function escapeHTML(str) {
                if (!str) return '';
                return str.replace(/[&<>'"]/g, 
                    tag => ({
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        "'": '&#39;',
                        '"': '&quot;'
                    }[tag] || tag)
                );
            }

            // Structure Booking Receipt recap layout
            bookingRecap.innerHTML = `
                <p><strong>Guest Name:</strong> <span>${escapeHTML(name)}</span></p>
                <p><strong>Phone:</strong> <span>${escapeHTML(phone)}</span></p>
                <p><strong>Date & Time:</strong> <span>${escapeHTML(date)} @ ${escapeHTML(time)}</span></p>
                <p><strong>Party Size:</strong> <span>${escapeHTML(guests)} Guests</span></p>
                <p><strong>Bringing Pet:</strong> <span>${hasPet ? 'Yes, 🐾' : 'No'}</span></p>
                ${specialRequests ? `<p><strong>Requests:</strong> <span>${escapeHTML(specialRequests)}</span></p>` : ''}
            `;

            // Format WhatsApp prefilled message string
            const petEmoji = hasPet ? 'Yes 🐾' : 'No';
            const reqText = specialRequests ? `\n- Special Requests: ${specialRequests}` : '';
            
            const message = `Hi Queen's Pod, I would like to request a table reservation:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}
- Date: ${date}
- Time Slot: ${time}
- Guest Count: ${guests}
- Bringing Pet: ${petEmoji}${reqText}`;

            const encodedMessage = encodeURIComponent(message);
            // Link directly to business WhatsApp API
            whatsAppDirectBtn.href = `https://wa.me/918926413900?text=${encodedMessage}`;

            // Trigger visual feedback modal
            resSuccessOverlay.classList.add('active');

            // Trigger simulated Google Analytics Conversion Event
            if (window.gtag) {
                window.gtag('event', 'generate_lead', {
                    'event_category': 'Reservation',
                    'event_label': 'Submit Form'
                });
            }
            console.log("Reservation recorded in Google Analytics mock layer.");
        });
    }

    if (closeOverlayBtn && resSuccessOverlay && resForm) {
        closeOverlayBtn.addEventListener('click', () => {
            // Hide Overlay
            resSuccessOverlay.classList.remove('active');
            // Reset Form fields
            resForm.reset();
        });
    }

});
