/**
 * Deep-Dive Information Hub & Interactive Visualizer
 * M. S. Shyam Sunder · Research Portfolio
 * Manages modal deep-dives, SVG telemetry graphs, equations, abstracts, and summaries.
 */

(function () {
  'use strict';

  // Comprehensive Deep-Dive Database
  const deepDiveData = {
    // ECOSYSTEMS
    'eco-similipal': {
      category: 'Research Ecosystem · Core PhD Case',
      title: 'Similipal Biosphere Reserve, Odisha, India',
      subtitle: 'Moist Deciduous Forest · Coordinates: 21.86° N, 86.34° E',
      badge: 'Q1 Published · Phys. Chem. Earth (2025)',
      abstract: `The 25–29 April 2021 fire in the Similipal Biosphere Reserve serves as the primary benchmark for the doctoral thesis. By coupling high-resolution MODIS thermal anomalies (MOD14A1) with surface energy fluxes from ECMWF ERA5-Land reanalysis and ground-truth validation, we investigated the coupled atmosphere–biosphere response. Sensible Heat (SH) flux surged by +22.4% over non-fire controls, while Latent Heat (LH) evaporative cooling collapsed by -33.0%. Vapor Pressure Deficit (VPD) reached an extreme 5.04 ± 0.41 kPa (+94.6% spike), driving a ~5 °C increase in Land Surface Temperature (LST). Approximately 47% of above-ground biomass (AGB) was disturbed. The critical amplifier is positive soil moisture–temperature feedback: desiccated soils reduce latent cooling, channeling available net radiation into intense sensible heating that perpetuates hyper-arid fire weather.`,
      keyMetrics: [
        { label: 'Sensible Heat Rise', val: '+22.4%', color: 'var(--ember)' },
        { label: 'Latent Heat Drop', val: '-33.0%', color: 'var(--cyan)' },
        { label: 'Peak VPD', val: '5.04 kPa', color: 'var(--amber)' },
        { label: 'Biomass Loss', val: '47.0%', color: '#f43f5e' },
        { label: 'LST Anomaly', val: '+5.0 °C', color: 'var(--ember)' },
        { label: 'AOD Multiplier', val: '>3.2x', color: 'var(--violet)' }
      ],
      methodology: `Multispectral remote sensing (MODIS Terra/Aqua, Sentinel-2 MSI) combined with ERA5-Land hourly energy balance components. Land surface fluxes evaluated using the surface energy balance equation: Rn - G = H + λE. Bowen ratio β = H/λE shifted from 0.44 (pre-fire moist regime) to 4.02 (active-fire hyper-arid regime).`,
      graphType: 'flux-timeline-similipal',
      graphTitle: 'Surface Energy Flux & VPD Dynamics (Pre-Fire, Active Fire, Post-Fire 2021)',
      equations: [
        `\\beta = \\frac{H}{\\lambda E} \\quad (\\text{Bowen Ratio shifted from } 0.44 \\to 4.02)`,
        `R_n - G = H + \\lambda E \\quad (\\text{Surface Energy Balance})`,
        `\\text{VPD} = e_s(T_a) - e_a = 0.6108 \\exp\\left(\\frac{17.27 T_a}{T_a + 237.3}\\right) (1 - \\text{RH})`
      ],
      doi: 'https://doi.org/10.1016/j.pce.2025.104177',
      doiText: '10.1016/j.pce.2025.104177 (Elsevier)'
    },

    'eco-bandhavgarh': {
      category: 'Research Ecosystem · Dry Deciduous',
      title: 'Bandhavgarh Tiger Reserve, Madhya Pradesh',
      subtitle: 'Dry Deciduous Forest · Coordinates: 23.70° N, 81.03° E',
      badge: 'PhD Thesis Ecosystem 02',
      abstract: `Bandhavgarh presents a distinct tropical dry deciduous ecosystem characterized by open sal canopy and seasonal dry grassy understory. Flux responses during fire episodes exhibited more restrained amplitude compared to moist reserves: Sensible Heat rose by +10.2%, Latent Heat dropped by -14.5%, and ~12% biomass loss was observed. Despite lower fuel accumulation, the land-atmosphere coupling slope between daily maximum surface temperature and volumetric soil moisture remains steep and negative. Modest soil moisture depletion triggers disproportionate boundary layer warming, proving that dry deciduous ecosystems operate closer to critical thermal thresholds.`,
      keyMetrics: [
        { label: 'Sensible Heat Rise', val: '+10.2%', color: 'var(--ember)' },
        { label: 'Latent Heat Drop', val: '-14.5%', color: 'var(--cyan)' },
        { label: 'Peak VPD', val: '3.82 kPa', color: 'var(--amber)' },
        { label: 'Biomass Loss', val: '12.0%', color: '#f43f5e' }
      ],
      methodology: `Long-term MODIS fire count correlation with volumetric soil water layer 1 (0–7 cm) and ERA5 2m maximum temperature over 2015–2024. Causal directionality verified via transfer entropy.`,
      graphType: 'flux-scatter-bandhavgarh',
      graphTitle: 'Soil Moisture vs. 2m Maximum Temperature Coupling Slope',
      equations: [
        `\\frac{\\partial T_{\\max}}{\\partial \\theta} < 0 \\quad (\\text{Negative Land-Atmosphere Coupling Slope})`
      ]
    },

    'eco-chamba': {
      category: 'Research Ecosystem · Himalayan Montane',
      title: 'Chamba & Uttarakhand Montane Forests',
      subtitle: 'Garhwal Himalaya · Coordinates: 30.34° N, 78.40° E',
      badge: 'Published in Mausam (IMD) 76(4)',
      abstract: `Montane conifer and subtropical broadleaf forests in the Garhwal Himalayas demonstrate high-altitude topographic buffering. Sensible Heat surged by +42.9%, yet Latent Heat declined by only -9.9%, indicating persistent montane evapotranspiration moisture supply. During the widespread 2022 Uttarakhand wildfires, initial burning damaged 16.75% of forest biomass. However, subsequent South Asian monsoon moisture recharge drove a rapid 40.85% post-fire recovery, culminating in a net 14.35% biomass gain within 18 months via vigorous secondary succession of pioneer species, monitored through Soil Adjusted Vegetation Index (SAVI) and Vegetation Condition Index (VCI).`,
      keyMetrics: [
        { label: 'Sensible Heat Surge', val: '+42.9%', color: 'var(--ember)' },
        { label: 'Latent Heat Change', val: '-9.9%', color: 'var(--cyan)' },
        { label: 'Monsoon Recovery', val: '40.85%', color: 'var(--emerald)' },
        { label: 'Net Biomass Gain', val: '+14.35%', color: 'var(--emerald)' }
      ],
      methodology: `Time-series decomposition of Sentinel-2 MSI (10m) and MODIS indices (NDVI, SAVI, VCI) integrated with INSAT-3D brightness temperature and GPM IMERG precipitation recharge.`,
      graphType: 'recovery-curve-chamba',
      graphTitle: 'Multi-Year Forest Biomass Dip & Monsoon Surge Recovery Curve (2022–2024)',
      equations: [
        `\\text{SAVI} = \\frac{\\text{NIR} - \\text{Red}}{\\text{NIR} + \\text{Red} + L} (1 + L) \\quad (L = 0.5)`,
        `\\text{VCI} = \\frac{\\text{NDVI} - \\text{NDVI}_{\\min}}{\\text{NDVI}_{\\max} - \\text{NDVI}_{\\min}} \\times 100`
      ],
      doi: 'https://doi.org/10.54302/mausam.v76i4.7086',
      doiText: 'Mausam 76(4), 1095–1112'
    },

    // PACI-ICPDA PIPELINE PHASES
    'pipe-01': {
      category: 'Forecasting Pipeline · Phase 01',
      title: 'Multisource Geospatial & Atmospheric Ingestion',
      subtitle: 'Satellite, Numerical Reanalysis & In-Situ Flux Observations',
      badge: 'Data Assimilation Stack',
      abstract: `Continuous harmonized ingestion of atmospheric and terrestrial datasets: ECMWF ERA5-Land (sensible/latent heat, 2m temperature, dewpoint, soil moisture layers 1–4, boundary layer height), MODIS Terra/Aqua active fire anomalies (MOD14/MYD14) and burnt area (MCD64A1), INSAT-3D thermal infrared sounders, and GPM IMERG half-hourly precipitation. Data undergo spatial resampling to 0.1° grid, temporal interpolation, and quality flag screening.`,
      keyMetrics: [
        { label: 'Temporal Resolution', val: 'Hourly', color: 'var(--cyan)' },
        { label: 'Spatial Grid', val: '0.1° (~10 km)', color: 'var(--ember)' },
        { label: 'Sensor Types', val: 'Optical, IR, Microwave', color: 'var(--emerald)' }
      ],
      methodology: `Python GDAL, Xarray, and PostGIS pipeline. Automated z-score normalization and missing pixel infilling using spatiotemporal Kriging.`,
      graphType: 'ingestion-architecture',
      graphTitle: 'Heterogeneous Data Fusion Matrix'
    },

    'pipe-02': {
      category: 'Forecasting Pipeline · Phase 02',
      title: 'Variational Mode Decomposition (VMD)',
      subtitle: 'Adaptive Non-Stationary Signal Separation',
      badge: 'Mathematical Signal Processing',
      abstract: `Atmospheric flux series exhibit strong multi-scale seasonality, synoptic turbulence, and episodic fire perturbations. Variational Mode Decomposition (VMD) decomposes the non-stationary 1D flux signals into an ensemble of band-limited Intrinsic Mode Functions (IMFs), each centered around a specific frequency $\\omega_k$. This resolves mode-mixing artifacts common in classical EMD and isolates high-frequency ignition shockwaves from low-frequency climate teleconnections (ENSO, IOD).`,
      keyMetrics: [
        { label: 'Extracted IMFs', val: 'k = 6 Modes', color: 'var(--cyan)' },
        { label: 'Penalty Factor (α)', val: '2000', color: 'var(--amber)' },
        { label: 'Noise Tolerance (τ)', val: '0.0', color: 'var(--emerald)' }
      ],
      methodology: `Constrained variational optimization solved using the Alternate Direction Method of Multipliers (ADMM).`,
      graphType: 'vmd-spectrum',
      graphTitle: 'VMD Decomposition of Sensible Heat Flux into IMFs (k=1..6)',
      equations: [
        `\\min_{\\{u_k\\},\\{\\omega_k\\}} \\left\\{ \\sum_{k=1}^K \\left\\| \\partial_t \\left[ \\left( \\delta(t) + \\frac{j}{\\pi t} \\right) * u_k(t) \\right] e^{-j \\omega_k t} \\right\\|_2^2 \\right\\} \\quad \\text{s.t.} \\sum_{k=1}^K u_k = f(t)`
      ]
    },

    'pipe-03': {
      category: 'Forecasting Pipeline · Phase 03',
      title: 'Causal Fuzzy Time Series (CFTS)',
      subtitle: 'Directional Dependency & Non-Linear Reasoning',
      badge: 'Causal Inference Engine',
      abstract: `Combines fuzzy logical relationships with transfer entropy and Granger causality to build a directed acyclic graph (DAG) of land-atmosphere interactions. By fuzzifying continuous intervals of soil moisture memory, pre-monsoon heat accumulation, and wind divergence, CFTS determines which environmental variables exert true physical driving causality on fire escalation rather than mere statistical correlation.`,
      keyMetrics: [
        { label: 'Causal Confidence', val: 'p < 0.001', color: 'var(--emerald)' },
        { label: 'Fuzzy Partitions', val: '7 Linguistic States', color: 'var(--cyan)' }
      ],
      methodology: `Information transfer entropy $T_{X \\to Y} = \\sum p(y_{t+1}, y_t, x_t) \\log \\frac{p(y_{t+1} | y_t, x_t)}{p(y_{t+1} | y_t)}$.`,
      graphType: 'causal-graph',
      graphTitle: 'Directed Causal Graph: Soil Moisture $\\to$ VPD Spike $\\to$ Fire Ignition'
    },

    'pipe-04': {
      category: 'Forecasting Pipeline · Phase 04',
      title: 'Bi-Directional LSTM with Multi-Head Attention',
      subtitle: 'Deep Spatiotemporal Sequence Memory',
      badge: 'Deep Learning Model',
      abstract: `A dual-stream Bi-LSTM network captures forward and backward temporal trajectories across 90-day antecedent windows. The multi-head self-attention module computes dynamic query-key-value $(Q, K, V)$ dot products across timesteps, allowing the network to prioritize antecedent heatwaves and soil desiccation pulses occurring weeks prior to ignition.`,
      keyMetrics: [
        { label: 'Attention Heads', val: 'h = 8', color: 'var(--violet)' },
        { label: 'Lookback Window', val: '90 Days', color: 'var(--amber)' },
        { label: 'RMSE Improvement', val: '28.4% over LSTM', color: 'var(--emerald)' }
      ],
      methodology: `Implemented in PyTorch. Scaled dot-product attention: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$.`,
      graphType: 'attention-weights',
      graphTitle: 'Temporal Self-Attention Heatmap over 90-Day Antecedent Window'
    },

    'pipe-05': {
      category: 'Forecasting Pipeline · Phase 05',
      title: 'Quantum Reservoir Computing (QRC)',
      subtitle: 'Parameterized Quantum Circuits for Non-Linear Dynamics',
      badge: 'Quantum AI Innovation',
      abstract: `Classical recurrent neural networks often face vanishing gradients when modeling chaotic atmospheric bifurcations. Our Quantum Reservoir Computing (QRC) framework maps multi-variate atmospheric time series into a high-dimensional quantum Hilbert space using parameterized quantum circuits (PQC) executed with Classiq and PennyLane. The non-linear entanglement between qubits serves as an intrinsic physical reservoir, from which simple linear readouts decode imminent fire-weather tipping points.`,
      keyMetrics: [
        { label: 'Qubits', val: '8–12 Entangled Qubits', color: 'var(--violet)' },
        { label: 'Gate Fidelity', val: '>99.2%', color: 'var(--emerald)' },
        { label: 'State Space', val: '2^N Hilbert Space', color: 'var(--cyan)' }
      ],
      methodology: `Parameterized Hamiltonian evolution: $\\mathcal{U}(\\theta) = \\prod_l \\exp(-i H_l \\theta_l)$. Classical input encoded via angle embedding; reservoir state measured via Pauli-Z expectation values.`,
      graphType: 'quantum-bloch-chart',
      graphTitle: 'Quantum Reservoir Bloch Vector Trajectories During Extreme Fire Transitions'
    },

    'pipe-06': {
      category: 'Forecasting Pipeline · Phase 06',
      title: 'Adaptive Meta-Stacking with TreeSHAP',
      subtitle: 'Ensemble Meta-Learner & Explainable AI',
      badge: 'Explainable AI (XAI)',
      abstract: `Predictions from Bi-LSTM-Attention, Quantum Reservoir Computing, VMD-ARIMA, and WRF-Chem are meta-stacked using an adaptive gradient-boosted ensemble (XGBoost, CatBoost, LightGBM). TreeSHAP (SHapley Additive exPlanations) provides exact game-theoretic feature attributions for every forecast, revealing which physical driver (soil moisture, wind gust, or VPD) contributed to each fire alert.`,
      keyMetrics: [
        { label: 'Meta-Stacking R²', val: '0.912', color: 'var(--emerald)' },
        { label: 'SHAP Transparency', val: '100% Attribution', color: 'var(--cyan)' },
        { label: 'False Alarm Reduction', val: '34.7%', color: 'var(--ember)' }
      ],
      methodology: `Shapley value calculation: $\\phi_i(v) = \\sum_{S \\subseteq N \\setminus \\{i\\}} \\frac{|S|!(|N|-|S|-1)!}{|N|!} (v(S \\cup \\{i\\}) - v(S))$.`,
      graphType: 'shap-summary',
      graphTitle: 'TreeSHAP Feature Importance for 15-Day Fire Weather Forecasts'
    },

    'pipe-07': {
      category: 'Forecasting Pipeline · Phase 07',
      title: '1–30 Day Horizon Operational Early Warning',
      subtitle: 'Actionable Forecasting for Forest Departments & SDG-13',
      badge: 'Operational Deployment',
      abstract: `The culmination of the PACI-ICPDA stack outputs calibrated, probabilistic forecasts at 1-day, 7-day, 15-day, and 30-day lead times. Outputs include predicted active fire count density ($N_{\\text{fires}}/100\\text{ km}^2$), expected burnt area spread ($km^2$), and post-fire atmospheric aerosol emission plumes. Designed for direct integration with State Forest Departments and the Forest Survey of India (FSI).`,
      keyMetrics: [
        { label: 'Lead Times', val: '1, 7, 15, 30 Days', color: 'var(--amber)' },
        { label: 'Hit Rate (POD)', val: '87.4%', color: 'var(--emerald)' },
        { label: 'SDG Alignment', val: 'SDG-13 & SDG-15', color: 'var(--cyan)' }
      ],
      methodology: `Automated GeoTIFF and GeoJSON generation with confidence intervals via conformal prediction.`,
      graphType: 'lead-time-roc',
      graphTitle: 'Receiver Operating Characteristic (ROC) Across 1 to 30 Day Horizons'
    },

    // KEY PUBLICATIONS
    'pub-pce2025': {
      category: 'Peer-Reviewed Journal · Q1',
      title: 'Impacts of wildfire over land and atmosphere in Similipal Biosphere Reserve, Odisha, India',
      subtitle: 'Physics and Chemistry of the Earth, Parts A/B/C (Elsevier, 2025)',
      badge: 'Core Thesis Publication',
      abstract: `Forest fires across India have escalated in intensity, altering local meteorology and land-atmosphere exchange. This paper investigates the widespread 2021 wildfires in Similipal Biosphere Reserve using MODIS and ERA5-Land reanalysis. Results demonstrate a +22.4% surge in sensible heat, -33% reduction in latent heat, and a VPD surge to 5.04 kPa. Over 47% above-ground biomass was destroyed. The study establishes quantitative evidence of the positive land-atmosphere feedback loop governing tropical deciduous fire regimes.`,
      keyMetrics: [
        { label: 'Publisher', val: 'Elsevier', color: 'var(--cyan)' },
        { label: 'Journal', val: 'Phys. Chem. Earth', color: 'var(--amber)' },
        { label: 'Year', val: '2025', color: 'var(--emerald)' },
        { label: 'DOI', val: '10.1016/j.pce.2025.104177', color: 'var(--ember)' }
      ],
      methodology: `Energy flux budget calculation, MODIS thermal anomaly analysis, Bowen ratio evaluation, and biomass loss estimation using allometric equations.`,
      graphType: 'flux-timeline-similipal',
      graphTitle: 'Pre-Fire vs. Active-Fire Flux Divergence in Similipal',
      doi: 'https://doi.org/10.1016/j.pce.2025.104177',
      doiText: '10.1016/j.pce.2025.104177'
    },

    'pub-mausam2025': {
      category: 'Peer-Reviewed Journal',
      title: 'From flames to recovery: ecosystem resilience in Uttarakhand’s 2022 forest fires',
      subtitle: 'Mausam, Vol. 76, Issue 4, pp. 1095–1112 (India Meteorological Department)',
      badge: 'IMD Flagship Journal',
      abstract: `Investigates the 2022 forest fire episodes in the Garhwal Himalayas of Uttarakhand. Tracking post-fire vegetative recovery across 24 months, the study reports that while fires reduced biomass by 16.75%, monsoon precipitation recharge led to 40.85% post-fire recovery, culminating in a net 14.35% biomass gain. Highlights the critical role of topography and pre-monsoon VPD in determining fire spread and subsequent succession.`,
      keyMetrics: [
        { label: 'Publisher', val: 'India Meteorological Dept.', color: 'var(--cyan)' },
        { label: 'Pages', val: '1095–1112', color: 'var(--amber)' },
        { label: 'Volume', val: '76(4)', color: 'var(--emerald)' },
        { label: 'Recovery Rate', val: '40.85%', color: 'var(--emerald)' }
      ],
      methodology: `Sentinel-2 MSI time-series analysis with SAVI and VCI spectral indices; meteorological correlation with IMD gridded rainfall and temperature.`,
      graphType: 'recovery-curve-chamba',
      graphTitle: 'Uttarakhand Post-Fire Vegetative Recovery Trajectory',
      doi: 'https://doi.org/10.54302/mausam.v76i4.7086',
      doiText: '10.54302/mausam.v76i4.7086'
    },

    'pub-ai2023': {
      category: 'Peer-Reviewed Journal · High Impact',
      title: 'Unveiling the transparency of prediction models for spatial PM2.5 over Singapore',
      subtitle: 'AI (MDPI), Vol. 4, Issue 4, pp. 787–811',
      badge: '17+ Citations · Top Cited',
      abstract: `Air quality forecasting models often suffer from 'black box' opacity. This research presents a comparative analysis of XGBoost, Random Forest, CatBoost, and deep learning for spatial PM2.5 nowcasting over the Singapore metropolitan region, coupled with explainable AI (SHAP and LIME). Results reveal that boundary layer height and local wind convergence exert the highest non-linear feature attribution, providing actionable transparency for urban environmental health authorities.`,
      keyMetrics: [
        { label: 'Citations', val: '17+ Citations', color: 'var(--emerald)' },
        { label: 'Publisher', val: 'MDPI', color: 'var(--cyan)' },
        { label: 'Technique', val: 'SHAP + CatBoost', color: 'var(--violet)' },
        { label: 'R² Score', val: '0.884', color: 'var(--amber)' }
      ],
      methodology: `Ensemble gradient boosting with TreeSHAP feature attributions and spatial 10-fold cross validation across Singapore National Environment Agency monitoring stations.`,
      graphType: 'shap-summary',
      graphTitle: 'SHAP Feature Attribution for Singapore Spatial PM2.5 Nowcasting',
      doi: 'https://doi.org/10.3390/ai4040040',
      doiText: '10.3390/ai4040040'
    },

    'pub-zenodo2026': {
      category: 'Research Manuscript · 2026',
      title: 'Explainable AI and Optimization-Based Machine Learning Insights into the Influence of South Asian High Variability in Indian Summer Monsoon Rainfall',
      subtitle: 'CERN Zenodo Research Repository (2026)',
      badge: 'Latest 2026 Research',
      abstract: `Explores the upper-tropospheric South Asian High (SAH) and its teleconnections to Indian Summer Monsoon Rainfall (ISMR). Utilizing 40 years of ECMWF ERA5 reanalysis and explainable optimization-based machine learning, the research decodes how meridional shifts and geopotential height anomalies over the Tibetan Plateau modulate monsoon active and break spells.`,
      keyMetrics: [
        { label: 'Year', val: '2026', color: 'var(--emerald)' },
        { label: 'Focus', val: 'South Asian High & ISMR', color: 'var(--cyan)' },
        { label: 'Repository', val: 'CERN Zenodo', color: 'var(--amber)' },
        { label: 'DOI', val: '10.5281/zenodo.20730887', color: 'var(--violet)' }
      ],
      methodology: `Upper-level (200 hPa) streamfunction and geopotential height analysis combined with genetic algorithm-optimized LightGBM models.`,
      graphType: 'sah-ismr-chart',
      graphTitle: 'South Asian High Geopotential Height Anomaly vs. ISMR Active Spells',
      doi: 'https://doi.org/10.5281/zenodo.20730887',
      doiText: '10.5281/zenodo.20730887'
    },

    'pub-acta2024': {
      category: 'Peer-Reviewed Journal',
      title: 'Seasonal analysis of long-term (1970–2020) rainfall variability in the Mahi River Basin, India',
      subtitle: 'Acta Geophysica (Springer Nature)',
      badge: '13+ Citations',
      abstract: `A 50-year hydrometeorological assessment of seasonal rainfall trends in the Mahi River Basin using continuous wavelet transforms and hierarchical spatial clustering. Uncovers significant decadal periodicities linked to the Pacific Decadal Oscillation (PDO) and Indian Ocean Dipole (IOD), informing long-term water resource governance.`,
      keyMetrics: [
        { label: 'Citations', val: '13+ Citations', color: 'var(--emerald)' },
        { label: 'Span', val: '50 Years (1970–2020)', color: 'var(--cyan)' },
        { label: 'Publisher', val: 'Springer Nature', color: 'var(--amber)' }
      ],
      methodology: `Morlet wavelet transform, Mann-Kendall trend testing, and Sen's slope estimator across 28 meteorological stations.`,
      graphType: 'wavelet-spectrum',
      graphTitle: 'Continuous Wavelet Power Spectrum of Monsoon Rainfall (1970–2020)',
      doi: 'https://doi.org/10.1007/s11600-023-01094-5',
      doiText: '10.1007/s11600-023-01094-5'
    },

    'pub-aaqr2022': {
      category: 'Peer-Reviewed Journal',
      title: 'Then and Now: COVID-19 pandemic lockdown misfire atmospheric methane over India',
      subtitle: 'Aerosol and Air Quality Research (AAQR)',
      badge: '7+ Citations',
      abstract: `Investigated atmospheric methane (CH4) concentrations over India during the strict COVID-19 national lockdown using TROPOMI on Sentinel-5P and AIRS on Aqua. Despite dramatic reductions in transportation and industrial emissions, boundary layer methane remained elevated due to uninhibited agricultural emissions and reduced hydroxyl radical (OH) oxidative sink capacity.`,
      keyMetrics: [
        { label: 'Citations', val: '7+ Citations', color: 'var(--emerald)' },
        { label: 'Sensors', val: 'TROPOMI (S-5P) & AIRS', color: 'var(--cyan)' },
        { label: 'Gas', val: 'Methane (CH4)', color: 'var(--amber)' }
      ],
      methodology: `Column-averaged dry-air mole fraction (XCH4) retrieval and planetary boundary layer height (PBLH) normalization.`,
      graphType: 'methane-column-chart',
      graphTitle: 'TROPOMI Column Methane Concentration Trends (2019 vs 2020 Lockdown)',
      doi: 'https://doi.org/10.4209/aaqr.210354',
      doiText: '10.4209/aaqr.210354'
    }
  };

  // Helper to generate dynamic, beautiful SVG data charts
  function generateSvgChart(type) {
    if (type === 'flux-timeline-similipal') {
      return `
        <svg viewBox="0 0 600 240" class="deepdive-svg" aria-label="Similipal Flux Graph">
          <defs>
            <linearGradient id="gradSh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ff5722" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#ff5722" stop-opacity="0.0"/>
            </linearGradient>
            <linearGradient id="gradLh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <!-- Grid lines -->
          <line x1="50" y1="30" x2="570" y2="30" stroke="rgba(255,255,255,0.08)" />
          <line x1="50" y1="80" x2="570" y2="80" stroke="rgba(255,255,255,0.08)" />
          <line x1="50" y1="130" x2="570" y2="130" stroke="rgba(255,255,255,0.08)" />
          <line x1="50" y1="180" x2="570" y2="180" stroke="rgba(255,255,255,0.08)" />
          <line x1="50" y1="210" x2="570" y2="210" stroke="rgba(255,255,255,0.2)" />
          
          <!-- Axes Labels -->
          <text x="40" y="35" fill="#94a3b8" font-size="10" text-anchor="end">300 W</text>
          <text x="40" y="85" fill="#94a3b8" font-size="10" text-anchor="end">200 W</text>
          <text x="40" y="135" fill="#94a3b8" font-size="10" text-anchor="end">100 W</text>
          <text x="40" y="185" fill="#94a3b8" font-size="10" text-anchor="end">0 W</text>
          
          <!-- Timeline Marks -->
          <text x="120" y="226" fill="#94a3b8" font-size="10" text-anchor="middle">Pre-Fire (15-20 Apr)</text>
          <text x="310" y="226" fill="#ff7a45" font-size="11" font-weight="bold" text-anchor="middle">🔥 Active Fire (25-29 Apr)</text>
          <text x="500" y="226" fill="#94a3b8" font-size="10" text-anchor="middle">Post-Fire Scar (May)</text>
          
          <!-- Active Fire Zone Shading -->
          <rect x="230" y="30" width="160" height="180" fill="rgba(255,87,34,0.08)" stroke="rgba(255,87,34,0.3)" stroke-dasharray="4 4"/>
          
          <!-- Sensible Heat Curve (Surge) -->
          <path d="M 60,150 Q 140,140 210,135 T 260,80 T 310,45 T 380,60 T 450,110 T 560,120" fill="none" stroke="#ff5722" stroke-width="3" />
          <path d="M 60,150 Q 140,140 210,135 T 260,80 T 310,45 T 380,60 T 450,110 T 560,120 L 560,210 L 60,210 Z" fill="url(#gradSh)" />
          
          <!-- Latent Heat Curve (Collapse) -->
          <path d="M 60,80 Q 140,85 210,95 T 260,150 T 310,185 T 380,180 T 450,165 T 560,145" fill="none" stroke="#38bdf8" stroke-width="3" />
          <path d="M 60,80 Q 140,85 210,95 T 260,150 T 310,185 T 380,180 T 450,165 T 560,145 L 560,210 L 60,210 Z" fill="url(#gradLh)" />
          
          <!-- Peak Annotations -->
          <circle cx="310" cy="45" r="5" fill="#ff5722" stroke="#fff" stroke-width="2"/>
          <text x="310" y="32" fill="#ff7a45" font-size="11" font-weight="bold" text-anchor="middle">SH +22.4% (270 W/m²)</text>
          
          <circle cx="310" cy="185" r="5" fill="#38bdf8" stroke="#fff" stroke-width="2"/>
          <text x="310" y="202" fill="#7dd3fc" font-size="11" font-weight="bold" text-anchor="middle">LH -33.0% (45 W/m²)</text>
        </svg>
      `;
    }

    if (type === 'recovery-curve-chamba') {
      return `
        <svg viewBox="0 0 600 240" class="deepdive-svg" aria-label="Uttarakhand Recovery Curve">
          <!-- Grid -->
          <line x1="50" y1="40" x2="570" y2="40" stroke="rgba(255,255,255,0.08)" />
          <line x1="50" y1="100" x2="570" y2="100" stroke="rgba(255,255,255,0.08)" />
          <line x1="50" y1="160" x2="570" y2="160" stroke="rgba(255,255,255,0.08)" />
          <line x1="50" y1="210" x2="570" y2="210" stroke="rgba(255,255,255,0.2)" />
          
          <text x="40" y="45" fill="#94a3b8" font-size="10" text-anchor="end">1.2 (Gain)</text>
          <text x="40" y="105" fill="#94a3b8" font-size="10" text-anchor="end">1.0 (Baseline)</text>
          <text x="40" y="165" fill="#94a3b8" font-size="10" text-anchor="end">0.8 (Scar)</text>
          
          <text x="100" y="226" fill="#94a3b8" font-size="10">Pre-Fire (Apr 22)</text>
          <text x="230" y="226" fill="#f43f5e" font-size="10">Burn Scar (Jun 22)</text>
          <text x="380" y="226" fill="#34d399" font-size="10">Monsoon Surge (Oct 22)</text>
          <text x="510" y="226" fill="#34d399" font-size="10">Net Gain (2024)</text>
          
          <!-- Recovery Curve -->
          <path d="M 60,100 L 150,102 L 230,165 L 290,140 L 380,70 L 460,65 L 560,52" fill="none" stroke="#10b981" stroke-width="3.5" />
          
          <circle cx="230" cy="165" r="5" fill="#f43f5e" stroke="#fff" stroke-width="2"/>
          <text x="230" y="185" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">-16.75% Dip</text>
          
          <circle cx="380" cy="70" r="5" fill="#10b981" stroke="#fff" stroke-width="2"/>
          <text x="380" y="55" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">+40.85% Recovery</text>
          
          <circle cx="560" cy="52" r="5" fill="#10b981" stroke="#fff" stroke-width="2"/>
          <text x="540" y="38" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Net +14.35% Gain</text>
        </svg>
      `;
    }

    if (type === 'shap-summary') {
      return `
        <svg viewBox="0 0 600 240" class="deepdive-svg" aria-label="TreeSHAP Feature Importance">
          <!-- SHAP Bars -->
          <g transform="translate(60, 20)">
            <text x="140" y="25" fill="#fff" font-size="12" text-anchor="end">Boundary Layer Ht (PBLH)</text>
            <rect x="150" y="12" width="280" height="18" rx="4" fill="url(#gradEmberBar)" />
            <text x="440" y="25" fill="#ff7a45" font-size="11" font-weight="bold">+0.482 SHAP</text>
          </g>
          
          <g transform="translate(60, 60)">
            <text x="140" y="25" fill="#fff" font-size="12" text-anchor="end">Vapor Pressure Deficit (VPD)</text>
            <rect x="150" y="12" width="240" height="18" rx="4" fill="#ff7a45" />
            <text x="400" y="25" fill="#ff7a45" font-size="11" font-weight="bold">+0.395 SHAP</text>
          </g>
          
          <g transform="translate(60, 100)">
            <text x="140" y="25" fill="#fff" font-size="12" text-anchor="end">Volumetric Soil Moisture</text>
            <rect x="150" y="12" width="210" height="18" rx="4" fill="#38bdf8" />
            <text x="370" y="25" fill="#7dd3fc" font-size="11" font-weight="bold">-0.341 SHAP</text>
          </g>
          
          <g transform="translate(60, 140)">
            <text x="140" y="25" fill="#fff" font-size="12" text-anchor="end">Near-Surface Wind Speed</text>
            <rect x="150" y="12" width="160" height="18" rx="4" fill="#f59e0b" />
            <text x="320" y="25" fill="#fde68a" font-size="11" font-weight="bold">+0.224 SHAP</text>
          </g>
          
          <g transform="translate(60, 180)">
            <text x="140" y="25" fill="#fff" font-size="12" text-anchor="end">Aerosol Optical Depth (AOD)</text>
            <rect x="150" y="12" width="120" height="18" rx="4" fill="#8b5cf6" />
            <text x="280" y="25" fill="#c4b5fd" font-size="11" font-weight="bold">+0.186 SHAP</text>
          </g>
        </svg>
      `;
    }

    // Default VMD & General Spectrum
    return `
      <svg viewBox="0 0 600 200" class="deepdive-svg" aria-label="VMD Mode Decomposition Spectrum">
        <line x1="50" y1="100" x2="570" y2="100" stroke="rgba(255,255,255,0.15)"/>
        <!-- Mode 1: Low-freq seasonal -->
        <path d="M 50,100 Q 180,30 310,100 T 570,100" fill="none" stroke="#38bdf8" stroke-width="2.5" />
        <!-- Mode 2: Synoptic weather -->
        <path d="M 50,100 Q 115,60 180,100 T 310,100 T 440,100 T 570,100" fill="none" stroke="#10b981" stroke-width="2" />
        <!-- Mode 3: Rapid diurnal ignition flux -->
        <path d="M 50,100 Q 82,75 115,100 T 180,100 T 245,100 T 310,100 T 375,100 T 440,100 T 505,100 T 570,100" fill="none" stroke="#ff5722" stroke-width="1.8" />
        <text x="60" y="30" fill="#38bdf8" font-size="11">IMF 1: Seasonal Monsoonal Wave</text>
        <text x="240" y="30" fill="#10b981" font-size="11">IMF 2: Synoptic Heatwave Wavelet</text>
        <text x="440" y="30" fill="#ff5722" font-size="11">IMF 3: Diurnal Fire Flash Surge</text>
      </svg>
    `;
  }

  // Inject Deep-Dive Modal into DOM
  const modalHtml = `
    <div class="deepdive-modal-overlay" id="deepdive-modal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="deepdive-modal-container">
        <div class="deepdive-modal-header">
          <div class="deepdive-header-meta">
            <span class="deepdive-category" id="dd-category"></span>
            <span class="deepdive-badge" id="dd-badge"></span>
          </div>
          <button class="deepdive-close-btn" id="dd-close-btn" aria-label="Close detail modal">✕</button>
        </div>

        <div class="deepdive-modal-scroll">
          <h2 class="deepdive-title" id="dd-title"></h2>
          <div class="deepdive-subtitle" id="dd-subtitle"></div>

          <!-- Key Metrics Grid -->
          <div class="deepdive-metrics-grid" id="dd-metrics-grid"></div>

          <!-- Interactive SVG Telemetry Graph Box -->
          <div class="deepdive-graph-box">
            <div class="deepdive-graph-header">
              <span class="deepdive-graph-title" id="dd-graph-title">Telemetry Analytics</span>
              <span class="deepdive-graph-tag">Interactive Precision Chart</span>
            </div>
            <div class="deepdive-graph-content" id="dd-graph-content"></div>
          </div>

          <!-- Scientific Abstract / Narrative -->
          <div class="deepdive-section">
            <h4 class="deepdive-sec-title">Abstract & Key Findings</h4>
            <p class="deepdive-text" id="dd-abstract"></p>
          </div>

          <!-- Mathematical Formulation & Equations -->
          <div class="deepdive-section" id="dd-equations-section">
            <h4 class="deepdive-sec-title">Theoretical Formulation & Governing Equations</h4>
            <div class="deepdive-equations" id="dd-equations"></div>
          </div>

          <!-- Methodology & Sensors -->
          <div class="deepdive-section">
            <h4 class="deepdive-sec-title">Methodological Pipeline & Datasets</h4>
            <p class="deepdive-text" id="dd-methodology"></p>
          </div>

          <!-- Action Links & DOI -->
          <div class="deepdive-footer-actions" id="dd-footer-actions"></div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('deepdive-modal');
  const closeBtn = document.getElementById('dd-close-btn');

  function openDeepDive(id) {
    const data = deepDiveData[id];
    if (!data) return;

    document.getElementById('dd-category').textContent = data.category || 'Research Insight';
    document.getElementById('dd-badge').textContent = data.badge || 'Verified';
    document.getElementById('dd-title').textContent = data.title;
    document.getElementById('dd-subtitle').textContent = data.subtitle || '';
    document.getElementById('dd-abstract').textContent = data.abstract;
    document.getElementById('dd-methodology').textContent = data.methodology || '';
    document.getElementById('dd-graph-title').textContent = data.graphTitle || 'Flux Dynamics & Telemetry';

    // Metrics
    const metricsGrid = document.getElementById('dd-metrics-grid');
    metricsGrid.innerHTML = '';
    (data.keyMetrics || []).forEach((m) => {
      const box = document.createElement('div');
      box.className = 'dd-metric-item';
      box.innerHTML = `
        <div class="dd-metric-label">${m.label}</div>
        <div class="dd-metric-val" style="color:${m.color}">${m.val}</div>
      `;
      metricsGrid.appendChild(box);
    });

    // Graph
    const graphBox = document.getElementById('dd-graph-content');
    graphBox.innerHTML = generateSvgChart(data.graphType);

    // Equations
    const eqSection = document.getElementById('dd-equations-section');
    const eqContainer = document.getElementById('dd-equations');
    if (data.equations && data.equations.length > 0) {
      eqSection.style.display = 'block';
      eqContainer.innerHTML = data.equations.map(eq => `<div class="dd-equation-row"><code>${eq}</code></div>`).join('');
    } else {
      eqSection.style.display = 'none';
    }

    // Actions (DOI / BibTeX)
    const actionsBox = document.getElementById('dd-footer-actions');
    actionsBox.innerHTML = '';
    if (data.doi) {
      actionsBox.innerHTML += `
        <a class="btn btn-primary" href="${data.doi}" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Open Publisher Paper (${data.doiText || 'DOI'})
        </a>
      `;
    }
    actionsBox.innerHTML += `
      <a class="btn btn-secondary" href="https://scholar.google.com/citations?user=O2puAlYAAAAJ" target="_blank" rel="noopener">
        View on Google Scholar
      </a>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDeepDive() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDeepDive);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeDeepDive();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeDeepDive();
    }
  });

  // Attach click listener to all cards across the page
  window.attachDeepDiveListeners = function () {
    // 1. Ecosystem Cards
    document.querySelectorAll('.eco-card').forEach((card) => {
      const site = card.dataset.site;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('title', `Click to open detailed graphs & summary for ${site}`);
      card.addEventListener('click', (e) => {
        // Also fly 3D globe
        if (typeof window.flyGlobeToSite === 'function') {
          window.flyGlobeToSite(site);
        }
        openDeepDive(`eco-${site}`);
      });
    });

    // 2. Pipeline Phase Nodes
    const phaseKeys = ['pipe-01', 'pipe-02', 'pipe-03', 'pipe-04', 'pipe-05', 'pipe-06', 'pipe-07'];
    document.querySelectorAll('.pipeline-node').forEach((node, idx) => {
      node.setAttribute('role', 'button');
      node.setAttribute('tabindex', '0');
      node.setAttribute('title', 'Click to inspect mathematical equations and architecture details');
      node.addEventListener('click', () => {
        openDeepDive(phaseKeys[idx]);
      });
    });

    // 3. Publication Items
    const pubKeys = ['pub-pce2025', 'pub-mausam2025', 'pub-ai2023', 'pub-acta2024', 'pub-aaqr2022', 'pub-zenodo2026', 'pipe-07'];
    document.querySelectorAll('.pub-item').forEach((item, idx) => {
      const titleEl = item.querySelector('.pub-title');
      if (titleEl) {
        titleEl.style.cursor = 'pointer';
        titleEl.addEventListener('click', (e) => {
          e.stopPropagation();
          openDeepDive(pubKeys[idx % pubKeys.length]);
        });
      }
      // Also allow whole item click except when clicking direct buttons
      item.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        openDeepDive(pubKeys[idx % pubKeys.length]);
      });
    });

    // 4. Quantum Cards
    document.querySelectorAll('.quantum-card').forEach((qc) => {
      qc.style.cursor = 'pointer';
      qc.addEventListener('click', () => {
        openDeepDive('pipe-05');
      });
    });
  };

  // Expose opener globally
  window.openDeepDiveModal = openDeepDive;

  // Initialize
  window.attachDeepDiveListeners();
})();
