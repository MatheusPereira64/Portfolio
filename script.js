$(document).ready(function(){
    // Navbar scroll effect with smooth transitions
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script with animation
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Enhanced slide-up script with easing
    $('.scroll-up-btn').click(function(){
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutQuart');
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
        
        // Close mobile menu after clicking
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
    });

    // Enhanced toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script with improved settings
    var typed = new Typed(".typing", {
        strings: ["Desenvolvedor Fullstack", "Web Developer", "Software Developer", "Frontend Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Desenvolvedor Fullstack", "Web Developer", "Software Developer", "Frontend Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Enhanced owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: true
            }
        }
    });

    // Add smooth animations for cards on scroll
    function animateOnScroll() {
        $('.card, .bars').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate');
            }
        });
    }

    // Run animation on scroll
    $(window).scroll(animateOnScroll);
    // Run animation on page load
    animateOnScroll();

    // Add particle effect to home section
    function createParticle() {
        const particle = $('<div class="particle"></div>');
        $('.home').append(particle);
        
        const size = Math.random() * 5 + 2;
        const startX = Math.random() * $(window).width();
        const duration = Math.random() * 3000 + 2000;
        
        particle.css({
            left: startX,
            width: size,
            height: size,
            animationDuration: duration + 'ms'
        });
        
        setTimeout(() => {
            particle.remove();
        }, duration);
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Language switcher functionality
    const languageSelect = document.getElementById('language-select');
    const elements = document.querySelectorAll('[data-pt]');
    
    languageSelect.addEventListener('change', function() {
        const selectedLang = this.value;
        
        elements.forEach(element => {
            if (selectedLang === 'pt') {
                element.textContent = element.getAttribute('data-pt');
            } else if (selectedLang === 'en') {
                element.textContent = element.getAttribute('data-en');
            }
        });
        
        // Update typed.js strings
        if (selectedLang === 'en') {
            if (typed) typed.destroy();
            if (typed2) typed2.destroy();
            
            typed = new Typed(".typing", {
                strings: ["Web Designer", "Programmer", "Game Developer", "Software Developer"],
                typeSpeed: 100,
                backSpeed: 60,
                backDelay: 1000,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });

            typed2 = new Typed(".typing-2", {
                strings: ["Web Designer", "Programmer", "Game Developer", "Software Developer"],
                typeSpeed: 100,
                backSpeed: 60,
                backDelay: 1000,
                startDelay: 1000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        } else {
            if (typed) typed.destroy();
            if (typed2) typed2.destroy();
            
            typed = new Typed(".typing", {
                strings: ["Desenvolvedor Fullstack", "Web Developer", "Software Developer", "Frontend Developer"],
                typeSpeed: 100,
                backSpeed: 60,
                backDelay: 1000,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });

            typed2 = new Typed(".typing-2", {
                strings: ["Desenvolvedor Fullstack", "Web Developer", "Software Developer", "Frontend Developer"],
                typeSpeed: 100,
                backSpeed: 60,
                backDelay: 1000,
                startDelay: 1000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
        
        // Save language preference
        localStorage.setItem('preferred-language', selectedLang);
    });

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'pt';
    languageSelect.value = savedLang;
    if (savedLang === 'en') {
        languageSelect.dispatchEvent(new Event('change'));
    }

    // Initialize EmailJS
    emailjs.init("service_your_id"); // Você precisará criar uma conta no EmailJS e substituir por seu ID

    // Contact form functionality
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            from_name: $('input[name="from_name"]').val(),
            from_email: $('input[name="from_email"]').val(),
            subject: $('input[name="subject"]').val(),
            message: $('textarea[name="message"]').val(),
            to_email: 'matheuspereira6464@gmail.com'
        };

        // Simple mailto fallback for now
        const mailtoLink = `mailto:matheuspereira6464@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Nome: ${formData.from_name}\n` +
            `Email: ${formData.from_email}\n\n` +
            `Mensagem:\n${formData.message}`
        )}`;
        
        window.location.href = mailtoLink;
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Seu cliente de email foi aberto com a mensagem preenchida!');
    });
});
