/**
 * Main Application Controller & Interactive Logic
 * M. S. Shyam Sunder · Research Portfolio
 */

(function () {
  'use strict';

  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // 2. Scroll Progress Tracker & Chapter Highlighting
  const progressBar = document.querySelector('.scroll-progress-bar');
  const sections = document.querySelectorAll('section[id], header[id]');
  const journeySteps = document.querySelectorAll('.journey-step');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function updateScrollState() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        
        journeySteps.forEach((step) => {
          step.classList.toggle('active', step.getAttribute('href') === `#${id}`);
        });

        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  // 3. 3D Perspective Card Tilt & Dynamic Glare Effect
  const tiltElements = document.querySelectorAll('.hero-hud-card, .eco-card, .glass-panel, .timeline-card, .pub-item, .skill-category, .quantum-card');
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!hasTouch) {
    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
      });
    });
  }

  // 4. Wildfire Ecosystems Data & Interactive Telemetry Sandbox
  const ecosystemsData = {
    similipal: {
      name: "Similipal Biosphere Reserve",
      region: "Mayurbhanj, Odisha · Moist Deciduous",
      coords: "21.86° N, 86.34° E",
      sh: 22.4, // % rise
      lh: -33.0, // % drop
      vpd: 5.04, // kPa
      aodMultiplier: 3.2,
      agbLoss: 47.0, // %
      narrative: "During the 25–29 April 2021 fire, sensible heat flux surged by +22.4% while latent heat collapsed by -33%. Vapor Pressure Deficit (VPD) reached an extreme 5.04 ± 0.41 kPa (+94.6% spike), elevating LST by ~5 °C. Over 47% of above-ground biomass was lost. Strong soil-moisture feedback acted as the primary driver turning burn scars into persistent hyper-arid heating zones."
    },
    bandhavgarh: {
      name: "Bandhavgarh Tiger Reserve",
      region: "Umaria, Madhya Pradesh · Dry Deciduous",
      coords: "23.70° N, 81.03° E",
      sh: 10.2,
      lh: -14.5,
      vpd: 3.82,
      aodMultiplier: 1.8,
      agbLoss: 12.0,
      narrative: "Characterized by open canopy and lower baseline fuel loads, producing a more restrained flux shift (SH +10.2%, LH -14.5%, ~12% biomass loss). Despite lower fuel density, the land-atmosphere coupling slope between daily maximum surface temperature and volumetric soil moisture remains steep and negative."
    },
    chamba: {
      name: "Chamba & Uttarakhand Forests",
      region: "Garhwal Himalaya · Montane Conifer & Broadleaf",
      coords: "30.34° N, 78.40° E",
      sh: 42.9,
      lh: -9.9,
      vpd: 3.15,
      aodMultiplier: 2.4,
      agbLoss: 16.75,
      narrative: "High-elevation montane buffering flips traditional patterns: sensible heat surged by +42.9% while latent heat experienced a milder -9.9% drop. The 2022 fires initially destroyed 16.75% biomass, but subsequent monsoon moisture recharge triggered a remarkable 40.85% post-fire recovery and a net 14.35% biomass gain via rapid secondary succession."
    }
  };

  const ecoCards = document.querySelectorAll('.eco-card');
  const flightBtns = document.querySelectorAll('.btn-flight');
  const inspectBox = document.getElementById('telemetry-inspect-box');

  function activateEcosystem(siteId) {
    const data = ecosystemsData[siteId];
    if (!data) return;

    // Highlight eco cards
    ecoCards.forEach((c) => c.classList.toggle('active-site', c.dataset.site === siteId));
    // Highlight flight buttons
    flightBtns.forEach((b) => b.classList.toggle('active', b.dataset.site === siteId));

    // Smoothly fly Three.js 3D Globe to target coordinate
    if (typeof window.flyGlobeToSite === 'function') {
      window.flyGlobeToSite(siteId);
    }

    // Update Telemetry Display
    if (inspectBox) {
      inspectBox.hidden = false;
      inspectBox.querySelector('.telemetry-name').textContent = data.name;
      inspectBox.querySelector('.telemetry-coords').textContent = `${data.region} · [${data.coords}]`;
      inspectBox.querySelector('.telemetry-narrative p').textContent = data.narrative;

      // Update Bar indicators
      const shFill = inspectBox.querySelector('.bar-fill-sh');
      const lhFill = inspectBox.querySelector('.bar-fill-lh');
      const vpdFill = inspectBox.querySelector('.bar-fill-vpd');
      const agbFill = inspectBox.querySelector('.bar-fill-agb');

      if (shFill) shFill.style.width = `${Math.min(100, data.sh * 2)}%`;
      if (lhFill) lhFill.style.width = `${Math.min(100, Math.abs(data.lh) * 2.5)}%`;
      if (vpdFill) vpdFill.style.width = `${Math.min(100, (data.vpd / 6) * 100)}%`;
      if (agbFill) agbFill.style.width = `${Math.min(100, data.agbLoss * 1.8)}%`;

      inspectBox.querySelector('.val-sh').textContent = `+${data.sh}%`;
      inspectBox.querySelector('.val-lh').textContent = `${data.lh}%`;
      inspectBox.querySelector('.val-vpd').textContent = `${data.vpd} kPa`;
      inspectBox.querySelector('.val-agb').textContent = `${data.agbLoss}%`;
    }
  }

  ecoCards.forEach((card) => {
    card.addEventListener('click', () => activateEcosystem(card.dataset.site));
  });

  flightBtns.forEach((btn) => {
    btn.addEventListener('click', () => activateEcosystem(btn.dataset.site));
  });

  // 5. Interactive PACI-ICPDA Architecture Explainer
  const pipelineNodes = document.querySelectorAll('.pipeline-node');
  pipelineNodes.forEach((node) => {
    node.addEventListener('click', () => {
      pipelineNodes.forEach((n) => n.classList.remove('active-node'));
      node.classList.add('active-node');
    });
  });

  // 6. Publications Filter & Search Hub
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubSearch = document.getElementById('pub-search');
  const pubItems = document.querySelectorAll('.pub-item');

  function applyPubFilters() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const query = (pubSearch?.value || '').toLowerCase().trim();

    pubItems.forEach((item) => {
      const kind = item.dataset.kind;
      const text = item.textContent.toLowerCase();

      const matchesFilter = (activeFilter === 'all' || kind === activeFilter);
      const matchesSearch = (!query || text.includes(query));

      if (matchesFilter && matchesSearch) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyPubFilters();
    });
  });

  if (pubSearch) {
    pubSearch.addEventListener('input', applyPubFilters);
  }

  // 7. BibTeX Citation Exporter Modal
  const bibtexDatabase = {
    pce2025: `@article{sunder2025similipal,
  title={Impacts of wildfire over land and atmosphere in Similipal Biosphere Reserve, Odisha, India},
  author={Sunder, M. S. Shyam and Kumar, M. and Tyagi, Bhishma},
  journal={Physics and Chemistry of the Earth, Parts A/B/C},
  pages={104177},
  year={2025},
  publisher={Elsevier},
  doi={10.1016/j.pce.2025.104177}
}`,
    mausam2025: `@article{sunder2025uttarakhand,
  title={From flames to recovery: ecosystem resilience in Uttarakhand’s 2022 forest fires},
  author={Sunder, M. S. Shyam and Mahto, S. S. and Tyagi, Bhishma},
  journal={Mausam},
  volume={76},
  number={4},
  pages={1095--1112},
  year={2025}
}`,
    ai2023: `@article{sunder2023pm25,
  title={Unveiling the transparency of prediction models for spatial PM2.5 over Singapore},
  author={Sunder, M. S. Shyam and Tikkiwal, V. A. and Kumar, A. and Tyagi, Bhishma},
  journal={AI},
  volume={4},
  number={4},
  pages={787--811},
  year={2023},
  publisher={MDPI},
  doi={10.3390/ai4040040}
}`,
    acta2024: `@article{sharma2024mahi,
  title={Seasonal analysis of long-term (1970–2020) rainfall variability in the Mahi River Basin, India},
  author={Sharma, A. and Sharma, D. and Panda, S. K. and Sunder, M. S. Shyam and Kumar Dubey, S.},
  journal={Acta Geophysica},
  year={2024},
  publisher={Springer}
}`,
    aaqr2022: `@article{hari2022methane,
  title={Then and Now: COVID-19 pandemic lockdown misfire atmospheric methane over India},
  author={Hari, M. and Sahu, R. K. and Sunder, M. S. Shyam and Tyagi, Bhishma},
  journal={Aerosol and Air Quality Research},
  volume={22},
  year={2022},
  doi={10.4209/aaqr.210354}
}`,
    springer2024: `@incollection{sunder2024nigeria,
  title={Aerosol variability over Nigeria with a focus on changes after the COVID-19 episode},
  author={Sunder, S. M. Shyam and Tharun, D. and Sahu, R. K. and Tyagi, Bhishma},
  booktitle={Atmospheric Chemistry and Aerosol Dynamics},
  publisher={Springer},
  year={2024}
}`,
    zenodo2026: `@article{sunder2026southasianhigh,
  title={Explainable AI and Optimization-Based Machine Learning Insights into the Influence of South Asian High Variability in Indian Summer Monsoon Rainfall},
  author={Sunder, M. S. Shyam and Tyagi, Bhishma},
  journal={CERN Zenodo},
  year={2026},
  doi={10.5281/zenodo.20730887}
}`
  };

  const modal = document.getElementById('bibtex-modal');
  const modalCode = document.getElementById('modal-bibtex-code');
  const modalClose = document.querySelector('.modal-close');
  const copyBibBtn = document.getElementById('btn-copy-bibtex');
  const toast = document.getElementById('toast-notice');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  document.querySelectorAll('.btn-bibtex').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const code = bibtexDatabase[key] || '% Citation record in preparation';
      if (modal && modalCode) {
        modalCode.textContent = code;
        modal.classList.add('active');
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  if (copyBibBtn && modalCode) {
    copyBibBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(modalCode.textContent).then(() => {
        showToast('✓ BibTeX Copied to Clipboard!');
      });
    });
  }

  // 8. Ambient Atmospheric Soundscape Synthesizer (Web Audio API)
  const audioBtn = document.getElementById('audio-toggle');
  let audioCtx = null;
  let isPlayingAudio = false;
  let masterGain = null;

  function initAudioSynthesizer() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Warm Low Atmospheric Drone (Sine 88 Hz & 132 Hz)
    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(88, audioCtx.currentTime);

    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(132, audioCtx.currentTime);

    // Filtered Atmospheric Pink Noise (Simulates gentle stratospheric winds)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.04;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.35, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);

    osc1.connect(masterGain);
    osc2.connect(masterGain);

    osc1.start();
    osc2.start();
    whiteNoise.start();
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!audioCtx) {
        initAudioSynthesizer();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (!isPlayingAudio) {
        masterGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 1.2);
        isPlayingAudio = true;
        audioBtn.classList.add('playing');
        audioBtn.querySelector('.audio-label').textContent = 'Atmosphere: On';
      } else {
        masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
        isPlayingAudio = false;
        audioBtn.classList.remove('playing');
        audioBtn.querySelector('.audio-label').textContent = 'Atmosphere: Muted';
      }
    });
  }

  // Initial trigger for Similipal ecosystem on page load
  activateEcosystem('similipal');
})();
