/**
 * RICARDO PRAZERES AUTOMAÇÕES - MAIN INTERACTIVE ENGINE
 * Lightweight, accessible, zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // 1. Navbar Scroll Effect & Mobile Drawer
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (menuToggle && navLinks) {
        const toggleMenu = (open) => {
            const isOpen = typeof open === 'boolean' ? open : !navLinks.classList.contains('active');
            navLinks.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Fechar menu ao clicar em links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Fechar no Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }

    // ==========================================================================
    // 2. Animated Stats Counter (Intersection Observer)
    // ==========================================================================
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        let hasAnimated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'), 10) || 50;
                        const duration = 1500;
                        const startTime = performance.now();

                        const updateCounter = (currentTime) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
                            const current = Math.floor(easeOutQuad * target);

                            counter.textContent = current;

                            if (progress < 1) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target;
                            }
                        };

                        requestAnimationFrame(updateCounter);
                    });
                }
            });
        }, { threshold: 0.2 });

        const heroMetrics = document.querySelector('.hero-metrics');
        if (heroMetrics) observer.observe(heroMetrics);
    }

    // ==========================================================================
    // 3. Solution Cards Category Filter
    // ==========================================================================
    const tabItems = document.querySelectorAll('.tab-item');
    const solutionCards = document.querySelectorAll('.solution-card');

    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            tabItems.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const filter = tab.getAttribute('data-filter');

            solutionCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================================================
    // 4. Interactive ROI Calculator with Dynamic Track Fill
    // ==========================================================================
    const leadRange = document.getElementById('leadRange');
    const ticketRange = document.getElementById('ticketRange');
    const leadValue = document.getElementById('leadValue');
    const ticketValue = document.getElementById('ticketValue');
    const calcRevenue = document.getElementById('calcRevenue');
    const calcLeads = document.getElementById('calcLeads');
    const calcHours = document.getElementById('calcHours');

    const updateSliderFill = (slider) => {
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const val = parseFloat(slider.value) || 0;
        const percentage = ((val - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #1e293b ${percentage}%, #1e293b 100%)`;
    };

    const calculateROI = () => {
        if (!leadRange || !ticketRange) return;

        const leads = parseInt(leadRange.value, 10);
        const ticket = parseInt(ticketRange.value, 10);

        leadValue.textContent = `${leads.toLocaleString('pt-BR')} leads`;
        ticketValue.textContent = `R$ ${ticket.toLocaleString('pt-BR')}`;

        updateSliderFill(leadRange);
        updateSliderFill(ticketRange);

        // Modelagem: ~3% de recuperação em conversão adicional
        const recoveredSales = Math.round(leads * 0.03);
        const totalExtra = recoveredSales * ticket;
        const savedHours = Math.round((leads / 1000) * 5.5);

        calcRevenue.textContent = totalExtra.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
        calcLeads.textContent = `${recoveredSales.toLocaleString('pt-BR')} vendas`;
        calcHours.textContent = `${savedHours} horas/mês`;
    };

    if (leadRange && ticketRange) {
        leadRange.addEventListener('input', calculateROI);
        ticketRange.addEventListener('input', calculateROI);
        calculateROI();
    }

    // ==========================================================================
    // 5. Interactive Smartphone Simulator
    // ==========================================================================
    const btnSimulate = document.getElementById('btnSimulate');
    const btnResetSimulate = document.getElementById('btnResetSimulate');
    const simSteps = [
        document.getElementById('node1'),
        document.getElementById('node2'),
        document.getElementById('node3'),
        document.getElementById('node4')
    ];
    const flowTitle = document.getElementById('flowInfoTitle');
    const flowDesc = document.getElementById('flowInfoDesc');
    const phoneAvatar = document.getElementById('phoneAvatar');
    const phoneAppName = document.getElementById('phoneAppName');
    const phoneAppStatus = document.getElementById('phoneAppStatus');
    const phoneChatBody = document.getElementById('phoneChatBody');

    const simulationData = [
        {
            title: "Passo 1: Gatilho & Captação",
            desc: "O lead comenta 'QUERO' na postagem de anúncio da Masterclass.",
            app: "Instagram Direct",
            avatar: "📸",
            messages: [
                { type: 'out', text: "Comentário: 'QUERO participar da Masterclass! 🔥'" }
            ]
        },
        {
            title: "Passo 2: Qualificação no ManyChat Direct",
            desc: "O chatbot envia mensagem instantânea solicitando o WhatsApp para liberar o ingresso VIP.",
            app: "Instagram Direct",
            avatar: "📸",
            messages: [
                { type: 'in', text: "Olá! 👋 Que ótimo ter você conosco! Digite seu WhatsApp com DDD para liberarmos seu ingresso VIP:" },
                { type: 'out', text: "(11) 94603-8180" }
            ]
        },
        {
            title: "Passo 3: Webhook Make.com & ActiveCampaign",
            desc: "Os dados são processados instantaneamente. O contato é salvo no CRM e recebe a tag #VIP-CONFIRMADO.",
            app: "Make.com Webhook",
            avatar: "⚡",
            messages: [
                { type: 'sys', text: "⚡ Lead sincronizado com CRM ActiveCampaign | Tag: #VIP-CONFIRMADO" }
            ]
        },
        {
            title: "Passo 4: Disparo WhatsApp API Oficial",
            desc: "Em segundos, o participante recebe seu ingresso personalizado e o link exclusivo do Grupo VIP.",
            app: "WhatsApp Oficial",
            avatar: "💬",
            messages: [
                { type: 'in', text: "Parabéns! 🎉 Seu ingresso VIP exclusivo para o evento foi gerado com sucesso." },
                { type: 'ticket', text: "🎫 INGRESSO VIP CONFIRMADO #RP-0941" },
                { type: 'in', text: "Acesse o Grupo VIP oficial para receber os materiais de apoio: chat.whatsapp.com/vip-masterclass" }
            ]
        }
    ];

    let currentStepIdx = 0;
    let simTimeouts = [];

    const clearSimTimeouts = () => {
        simTimeouts.forEach(t => clearTimeout(t));
        simTimeouts = [];
    };

    const appendMessage = (msg) => {
        if (!phoneChatBody) return;

        const el = document.createElement('div');
        if (msg.type === 'out') {
            el.className = 'chat-msg-out';
        } else if (msg.type === 'in') {
            el.className = 'chat-msg-in';
        } else if (msg.type === 'sys') {
            el.className = 'chat-msg-sys';
        } else if (msg.type === 'ticket') {
            el.className = 'chat-msg-ticket';
        }
        el.textContent = msg.text;
        phoneChatBody.appendChild(el);
        phoneChatBody.scrollTop = phoneChatBody.scrollHeight;
    };

    const runStep = () => {
        if (currentStepIdx < simulationData.length) {
            simSteps.forEach(s => s?.classList.remove('active'));
            if (simSteps[currentStepIdx]) {
                simSteps[currentStepIdx].classList.add('active');
            }

            const step = simulationData[currentStepIdx];
            if (flowTitle) flowTitle.textContent = step.title;
            if (flowDesc) flowDesc.textContent = step.desc;
            if (phoneAppName) phoneAppName.textContent = step.app;
            if (phoneAvatar) phoneAvatar.textContent = step.avatar;
            if (phoneAppStatus) phoneAppStatus.textContent = "Digitando...";

            step.messages.forEach((msg, i) => {
                const t = setTimeout(() => {
                    if (phoneAppStatus) phoneAppStatus.textContent = "Online agora";
                    appendMessage(msg);
                }, (i + 1) * 700);
                simTimeouts.push(t);
            });

            currentStepIdx++;
            const nextTimeout = setTimeout(runStep, 3200);
            simTimeouts.push(nextTimeout);
        } else {
            if (btnSimulate) btnSimulate.style.display = 'none';
            if (btnResetSimulate) btnResetSimulate.style.display = 'inline-flex';
            if (flowTitle) flowTitle.textContent = "Simulação Finalizada com Sucesso!";
            if (flowDesc) flowDesc.textContent = "Todo o ciclo de captação e entrega ocorreu em menos de 10 segundos, de forma 100% autônoma.";
        }
    };

    const startSim = () => {
        clearSimTimeouts();
        currentStepIdx = 0;
        if (btnSimulate) btnSimulate.disabled = true;
        if (phoneChatBody) phoneChatBody.innerHTML = '';
        runStep();
    };

    const resetSim = () => {
        clearSimTimeouts();
        currentStepIdx = 0;
        simSteps.forEach(s => s?.classList.remove('active'));
        if (phoneChatBody) {
            phoneChatBody.innerHTML = '<div class="chat-placeholder"><p>Pressione "Iniciar Simulação" para visualizar as mensagens.</p></div>';
        }
        if (phoneAppName) phoneAppName.textContent = "Instagram Direct";
        if (phoneAvatar) phoneAvatar.textContent = "📸";
        if (flowTitle) flowTitle.textContent = "Simulador em Espera";
        if (flowDesc) flowDesc.textContent = "Clique no botão 'Iniciar Simulação' para rodar a demonstração em tempo real.";
        if (btnSimulate) {
            btnSimulate.style.display = 'inline-flex';
            btnSimulate.disabled = false;
        }
        if (btnResetSimulate) btnResetSimulate.style.display = 'none';
    };

    if (btnSimulate) btnSimulate.addEventListener('click', startSim);
    if (btnResetSimulate) btnResetSimulate.addEventListener('click', resetSim);

    // ==========================================================================
    // 6. FAQ Accordion Toggle
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-accordion-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Fecha outros itens
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-btn');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // ==========================================================================
    // 7. Contact Form WhatsApp Mask & Direct Submission
    // ==========================================================================
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 11) val = val.substring(0, 11);

            if (val.length > 6) {
                e.target.value = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
            } else if (val.length > 2) {
                e.target.value = `(${val.substring(0, 2)}) ${val.substring(2)}`;
            } else if (val.length > 0) {
                e.target.value = `(${val}`;
            } else {
                e.target.value = '';
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const whatsapp = formData.get('whatsapp') || '';
            const message = formData.get('message') || '';

            const messageText = `Olá Ricardo!\n\nEnviei uma mensagem pelo seu site institucional:\n- *Nome:* ${name}\n- *E-mail:* ${email}\n- *WhatsApp:* ${whatsapp}\n\n*Detalhes do Lançamento:*\n${message}`;

            const waUrl = `https://wa.me/5511946038180?text=${encodeURIComponent(messageText)}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
            contactForm.reset();
        });
    }
});
