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

    // owl carousel script with enhanced settings
    setTimeout(function() {
        $('.carousel').owlCarousel({
            margin: 20,
            loop: true,
            autoplay: true,
            autoplayTimeOut: 3000,
            autoplayHoverPause: true,
            smartSpeed: 800,
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
                    nav: false
                }
            }
        });
    }, 500);

    // Enhanced skills animation with easing
    function animateSkillBars() {
        $('.skills').each(function() {
            if ($(this).hasClass('animated')) return;
            
            $(this).find('.line').each(function() {
                var lineClass = $(this).attr('class').split(' ')[1];
                var percentage = getSkillPercentage(lineClass);
                
                $(this).animate({
                    width: percentage + '%'
                }, {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                });
            });
            
            $(this).addClass('animated');
        });
    }

    function getSkillPercentage(skillClass) {
        const skillPercentages = {
            'html': 95,
            'css': 95,
            'javascript': 95,
            'react': 95,
            'python': 85,
            'cpp': 80,
            'java': 75,
            'github': 85,
            'webdesign': 80,
            'bootstrap': 85,
            'database': 75,
            'sql': 80,
            'php': 65,
            'git': 85,
            'word': 90,
            'excel': 85
        };
        return skillPercentages[skillClass] || 50;
    }

    // Smooth animation on scroll
    function animateOnScroll() {
        $('.skills-content').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                animateSkillBars();
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
                const content = element.getAttribute('data-pt');
                // Check if content contains HTML tags
                if (content.includes('<') && content.includes('>')) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
            } else if (selectedLang === 'en') {
                const content = element.getAttribute('data-en');
                // Check if content contains HTML tags
                if (content.includes('<') && content.includes('>')) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
            }
        });
        
        // Save selected language to localStorage
        localStorage.setItem('selectedLanguage', selectedLang);
        
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
    });

    // Contact form functionality with mailto
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            from_name: $('input[name="from_name"]').val().trim(),
            from_email: $('input[name="from_email"]').val().trim(),
            subject: $('input[name="subject"]').val().trim(),
            message: $('textarea[name="message"]').val().trim()
        };

        // Reset all field styles
        $('.field input, .textarea textarea').removeClass('error success');

        let hasErrors = false;

        // Validate required fields
        if (!formData.from_name) {
            $('input[name="from_name"]').addClass('error');
            hasErrors = true;
        } else {
            $('input[name="from_name"]').addClass('success');
        }

        if (!formData.subject) {
            $('input[name="subject"]').addClass('error');
            hasErrors = true;
        } else {
            $('input[name="subject"]').addClass('success');
        }

        if (!formData.message) {
            $('textarea[name="message"]').addClass('error');
            hasErrors = true;
        } else {
            $('textarea[name="message"]').addClass('success');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.from_email || !emailRegex.test(formData.from_email)) {
            $('input[name="from_email"]').addClass('error');
            hasErrors = true;
        } else {
            $('input[name="from_email"]').addClass('success');
        }

        if (hasErrors) {
            const currentLang = $('#language-select').val();
            const errorMsg = currentLang === 'en' ? 
                'Please fill in all fields correctly.' : 
                'Por favor, preencha todos os campos corretamente.';
            alert(errorMsg);
            return;
        }

        // Create detailed email body
        const emailBody = `${formData.message}

---
Informações do contato:
Nome: ${formData.from_name}
Email: ${formData.from_email}

Enviado através do portfolio: https://matheuspereira.dev`;

        // Create mailto link with proper encoding
        const mailtoLink = `mailto:matheuspereira6464@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Try to open email client
        try {
            window.open(mailtoLink, '_self');
            
            // Reset form after successful submission
            setTimeout(() => {
                this.reset();
                $('.field input, .textarea textarea').removeClass('error success');
            }, 500);
            
            // Show success message
            const currentLang = $('#language-select').val();
            const successMsg = currentLang === 'en' ? 
                'Your email client has been opened with the message filled in! If it didn\'t open automatically, please check if you have a default email client configured.' : 
                'Seu cliente de email foi aberto com a mensagem preenchida! Se não abriu automaticamente, verifique se você tem um cliente de email padrão configurado.';
            
            setTimeout(() => {
                alert(successMsg);
            }, 1000);
            
        } catch (error) {
            // Fallback message if mailto fails
            const currentLang = $('#language-select').val();
            const fallbackMsg = currentLang === 'en' ? 
                'Unable to open email client automatically. Please send an email to: matheuspereira6464@gmail.com' : 
                'Não foi possível abrir o cliente de email automaticamente. Por favor, envie um email para: matheuspereira6464@gmail.com';
            alert(fallbackMsg);
        }
    });

    // Real-time validation feedback
    $('input[name="from_name"], input[name="subject"], textarea[name="message"]').on('input blur', function() {
        const $this = $(this);
        const value = $this.val().trim();
        
        $this.removeClass('error success');
        
        if (value.length > 0) {
            $this.addClass('success');
        }
    });

    $('input[name="from_email"]').on('input blur', function() {
        const $this = $(this);
        const value = $this.val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        $this.removeClass('error success');
        
        if (value.length > 0) {
            if (emailRegex.test(value)) {
                $this.addClass('success');
            } else {
                $this.addClass('error');
            }
        }
    });

    // Load saved language preference on page load
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt';
    languageSelect.value = savedLanguage;
    
    // Apply saved language
    if (savedLanguage !== 'pt') {
        languageSelect.dispatchEvent(new Event('change'));
    }
});
