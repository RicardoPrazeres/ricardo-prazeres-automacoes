document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect & Mobile Toggle
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // 2. Stats Animated Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000;
                    const step = Math.max(1, Math.floor(target / (duration / 16)));
                    let current = 0;

                    const updateCount = () => {
                        current += step;
                        if (current < target) {
                            stat.textContent = current;
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    };

                    updateCount();
                });
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // 3. Result Bars Animation
    const resultBars = document.querySelectorAll('.result-fill');
    let barsAnimated = false;

    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !barsAnimated) {
                barsAnimated = true;
                resultBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const resultsSection = document.querySelector('.results-grid');
    if (resultsSection) {
        barsObserver.observe(resultsSection);
    }

    // 4. Services Tab Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-tab');

            serviceCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category') || '';
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // 5. Interactive ROI Calculator Logic
    const leadRange = document.getElementById('leadRange');
    const ticketRange = document.getElementById('ticketRange');
    const leadValue = document.getElementById('leadValue');
    const ticketValue = document.getElementById('ticketValue');
    const calcRevenue = document.getElementById('calcRevenue');
    const calcLeads = document.getElementById('calcLeads');
    const calcHours = document.getElementById('calcHours');

    const updateCalculator = () => {
        if (!leadRange || !ticketRange) return;

        const leads = parseInt(leadRange.value);
        const ticket = parseInt(ticketRange.value);

        leadValue.textContent = `${leads.toLocaleString('pt-BR')} leads`;
        ticketValue.textContent = `R$ ${ticket.toLocaleString('pt-BR')}`;

        // Formulas based on average launch conversion lift (+3% recovery rate)
        const recoveredLeads = Math.round(leads * 0.03);
        const extraRevenue = recoveredLeads * ticket;
        const savedHours = Math.round((leads / 1000) * 5.5);

        calcRevenue.textContent = extraRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        calcLeads.textContent = `${recoveredLeads.toLocaleString('pt-BR')} sales/leads`;
        calcHours.textContent = `${savedHours} horas/mês`;
    };

    if (leadRange && ticketRange) {
        leadRange.addEventListener('input', updateCalculator);
        ticketRange.addEventListener('input', updateCalculator);
        updateCalculator();
    }

    // 6. Live Simulator with Smartphone Mockup Preview Sync
    const btnSimulate = document.getElementById('btnSimulate');
    const btnResetSimulate = document.getElementById('btnResetSimulate');
    const nodes = [
        document.getElementById('node1'),
        document.getElementById('node2'),
        document.getElementById('node3'),
        document.getElementById('node4')
    ];
    const infoTitle = document.getElementById('flowInfoTitle');
    const infoDesc = document.getElementById('flowInfoDesc');
    const phoneAppName = document.getElementById('phoneAppName');
    const phoneChatBody = document.getElementById('phoneChatBody');

    const stepSimData = [
        {
            title: "Passo 1: Captura & Comentário no Instagram",
            desc: "O lead comenta 'QUERO' em uma publicação ou Direct. A automação aciona o gatilho imediatamente.",
            appName: "Instagram Direct",
            messages: [
                { type: 'user', text: "Comentário: 'QUERO participar da Masterclass! 🔥'" }
            ]
        },
        {
            title: "Passo 2: Qualificação via ManyChat Direct",
            desc: "O chatbot envia uma mensagem automática de qualificação no Instagram Direct pedindo o WhatsApp.",
            appName: "Instagram Direct",
            messages: [
                { type: 'bot', text: "Olá! 👋 Que ótimo te ver por aqui! Digite seu WhatsApp para eu liberar seu ingresso VIP exclusivo." },
                { type: 'user', text: "(11) 94603-8180 - Ricardo" }
            ]
        },
        {
            title: "Passo 3: Integração Make.com & ActiveCampaign",
            desc: "Os dados são processados instantaneamente. Criamos a oportunidade no CRM e aplicamos as tags de qualificação.",
            appName: "Make.com Webhook",
            messages: [
                { type: 'system', text: "⚡ Lead registrado no CRM ActiveCampaign | Tag: #VIP-MASTERCLASS" }
            ]
        },
        {
            title: "Passo 4: Disparo WhatsApp API Oficial",
            desc: "Em segundos, o lead recebe o ingresso personalizado e o link direto do Grupo VIP no WhatsApp.",
            appName: "WhatsApp API",
            messages: [
                { type: 'bot', text: "Parabéns Ricardo! 🎉 Seu ingresso VIP para a Masterclass está confirmado!" },
                { type: 'ticket', text: "🎫 INGRESSO VIP CONFIRMADO #0941" },
                { type: 'bot', text: "Clique aqui para entrar no Grupo VIP silencioso do WhatsApp: https://chat.whatsapp.com/vip" }
            ]
        }
    ];

    let currentStep = 0;
    let simTimeout = null;

    const appendPhoneMessage = (msg) => {
        if (!phoneChatBody) return;

        if (msg.type === 'system') {
            const div = document.createElement('div');
            div.className = 'chat-system-msg';
            div.textContent = msg.text;
            phoneChatBody.appendChild(div);
        } else if (msg.type === 'ticket') {
            const div = document.createElement('div');
            div.className = 'chat-ticket-card';
            div.textContent = msg.text;
            phoneChatBody.appendChild(div);
        } else if (msg.type === 'user') {
            const div = document.createElement('div');
            div.className = 'chat-bubble-out';
            div.textContent = msg.text;
            phoneChatBody.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.className = 'chat-bubble-in';
            div.textContent = msg.text;
            phoneChatBody.appendChild(div);
        }

        phoneChatBody.scrollTop = phoneChatBody.scrollHeight;
    };

    const runSimulationStep = () => {
        if (currentStep < nodes.length) {
            // Remove previous active node
            nodes.forEach(n => n.classList.remove('active'));
            nodes[currentStep].classList.add('active');

            const data = stepSimData[currentStep];
            infoTitle.textContent = data.title;
            infoDesc.textContent = data.desc;

            if (phoneAppName) phoneAppName.textContent = data.appName;

            data.messages.forEach((msg, idx) => {
                setTimeout(() => {
                    appendPhoneMessage(msg);
                }, idx * 600);
            });

            currentStep++;
            simTimeout = setTimeout(runSimulationStep, 3500);
        } else {
            btnSimulate.style.display = 'none';
            btnResetSimulate.style.display = 'inline-flex';
            infoTitle.textContent = "Simulação Concluída com Sucesso!";
            infoDesc.textContent = "Toda essa jornada durou menos de 10 segundos. É assim que garantimos conversões máximas para seu lançamento!";
        }
    };

    const startSimulation = () => {
        currentStep = 0;
        btnSimulate.disabled = true;
        if (phoneChatBody) phoneChatBody.innerHTML = '';
        runSimulationStep();
    };

    const resetSimulation = () => {
        clearTimeout(simTimeout);
        currentStep = 0;
        nodes.forEach(n => n.classList.remove('active'));
        if (phoneChatBody) phoneChatBody.innerHTML = '<div class="chat-system-msg">Aguardando simulação iniciar...</div>';
        if (phoneAppName) phoneAppName.textContent = "Instagram Direct";
        btnSimulate.style.display = 'inline-flex';
        btnSimulate.disabled = false;
        btnResetSimulate.style.display = 'none';
        infoTitle.textContent = "Simulador Pronto";
        infoDesc.textContent = "Pressione 'Iniciar Simulação' para rodar o ciclo completo em tempo real.";
    };

    if (btnSimulate) btnSimulate.addEventListener('click', startSimulation);
    if (btnResetSimulate) btnResetSimulate.addEventListener('click', resetSimulation);

    // 7. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(el => {
                    el.classList.remove('active');
                    const ans = el.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // 8. Contact Form Handler (Direct to WhatsApp)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const whatsapp = formData.get('whatsapp');
            const message = formData.get('message');

            const text = encodeURIComponent(
                `Olá Ricardo!\n\nMe enviei uma mensagem pelo seu site:\n*Nome:* ${name}\n*E-mail:* ${email}\n*WhatsApp:* ${whatsapp}\n\n*Detalhes do Lançamento:*\n${message}`
            );

            window.open(`https://wa.me/5511946038180?text=${text}`, '_blank');
            contactForm.reset();
        });
    }
});
