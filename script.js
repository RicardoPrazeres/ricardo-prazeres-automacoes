document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .tool-card, .result-card, .process-step, .highlight').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCount = () => {
                        current += step;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    };

                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    const resultBars = document.querySelectorAll('.result-fill');
    let barsAnimated = false;

    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !barsAnimated) {
                barsAnimated = true;
                resultBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                });
            }
        });
    }, { threshold: 0.3 });

    const resultsSection = document.querySelector('.results-grid');
    if (resultsSection) {
        barsObserver.observe(resultsSection);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const whatsapp = formData.get('whatsapp');
            const message = formData.get('message');

            const whatsappMessage = encodeURIComponent(
                `Olá Ricardo!\n\nMe cadastrei no seu portfólio:\n*Nome:* ${name}\n*Email:* ${email}\n*WhatsApp:* ${whatsapp}\n\n*Mensagem:*\n${message}`
            );

            window.open(`https://wa.me/5511946038180?text=${whatsappMessage}`, '_blank');

            contactForm.reset();
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Automation Simulator
    const btnSimulate = document.getElementById('btnSimulate');
    const btnResetSimulate = document.getElementById('btnResetSimulate');
    const nodes = [
        document.getElementById('node1'),
        document.getElementById('node2'),
        document.getElementById('node3'),
        document.getElementById('node4')
    ];
    const connectors = [
        document.getElementById('connector1'),
        document.getElementById('connector2'),
        document.getElementById('connector3')
    ];
    const infoTitle = document.getElementById('flowInfoTitle');
    const infoDesc = document.getElementById('flowInfoDesc');

    const stepDetails = [
        {
            title: "1. Captura & Comentário no Instagram",
            desc: "O visitante comenta 'QUERO' em uma publicação ou envia um Direct. A automação identifica a palavra-chave imediatamente e inicia o atendimento personalizado 24 horas por dia."
        },
        {
            title: "2. Qualificação via ManyChat DM",
            desc: "O bot inicia uma conversa privada no Direct do Instagram, solicitando de forma amigável o e-mail e o número de WhatsApp para cadastrar o lead no evento."
        },
        {
            title: "3. Integração Make.com & CRM",
            desc: "O Make.com recebe os dados coletados instantaneamente, cadastra o lead na lista do ActiveCampaign, cria a oportunidade no CRM de vendas e agenda lembretes de envio."
        },
        {
            title: "4. Disparo do Link do Grupo VIP no WhatsApp",
            desc: "A API do WhatsApp envia uma mensagem personalizada contendo o link do grupo VIP e o ingresso do evento. O lead agora está integrado no canal de maior conversão do lançamento!"
        }
    ];

    let simulationInterval = null;
    let currentStep = 0;

    const runSimulation = () => {
        btnSimulate.disabled = true;
        btnSimulate.textContent = "Simulando...";
        
        const executeStep = () => {
            if (currentStep < nodes.length) {
                // Highlight current node
                nodes[currentStep].classList.add('active');
                infoTitle.textContent = stepDetails[currentStep].title;
                infoDesc.textContent = stepDetails[currentStep].desc;
                
                // If there's a next connector, animate it
                if (currentStep < connectors.length) {
                    setTimeout(() => {
                        connectors[currentStep].classList.add('completed');
                    }, 500);
                }
                
                currentStep++;
                simulationInterval = setTimeout(executeStep, 3500);
            } else {
                // Simulation complete
                btnSimulate.style.display = 'none';
                btnResetSimulate.style.display = 'inline-block';
                btnResetSimulate.disabled = false;
                infoTitle.textContent = "Simulação Concluída com Sucesso!";
                infoDesc.textContent = "Em menos de 10 segundos, o lead foi capturado, qualificado, salvo no CRM e inserido no WhatsApp. Essa estrutura maximiza a conversão do seu lançamento digital.";
            }
        };

        executeStep();
    };

    const resetSimulation = () => {
        clearTimeout(simulationInterval);
        currentStep = 0;
        
        nodes.forEach(node => {
            node.classList.remove('active', 'completed');
        });
        connectors.forEach(conn => {
            conn.classList.remove('completed');
        });
        
        btnSimulate.style.display = 'inline-block';
        btnSimulate.disabled = false;
        btnSimulate.textContent = "Iniciar Simulação";
        btnResetSimulate.style.display = 'none';
        
        infoTitle.textContent = "Simulador Pronto";
        infoDesc.textContent = "Clique em 'Iniciar Simulação' para rodar o fluxo completo de automação e entender as etapas.";
    };

    if (btnSimulate) {
        btnSimulate.addEventListener('click', runSimulation);
    }
    if (btnResetSimulate) {
        btnResetSimulate.addEventListener('click', resetSimulation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
