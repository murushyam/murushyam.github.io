# M. S. Shyam Sunder · Research Portfolio & 3D Planetary Webpage

Doctoral Portfolio of **Murugesan Sellammal Shyam Sunder**, PhD Candidate in Earth and Atmospheric Sciences at National Institute of Technology Rourkela.

## Highlights
- **Interactive 3D Earth Biosphere & Atmosphere Simulation** (`js/earth3d.js` powered by Three.js)
  - Realistic continental dot-matrix geospatial mapping focusing on South Asia and heterogeneous forest ecosystems.
  - Interactive Wildfire Hotspots at Similipal, Bandhavgarh, and Chamba with rising atmospheric flux plumes.
  - Orbital Satellites (Sentinel-2, MODIS Terra, Aqua) traveling along orbital planes.
  - Smooth camera flight interpolation on coordinate selection.
- **Interactive 3D Quantum Reservoir Network** (`js/quantum3d.js`)
  - Bloch Sphere wireframe with entangled qubit nodes in quantum superposition state.
- **Interactive Research Telemetry Sandbox**
  - Real-time gauge metrics for Sensible Heat (SH), Latent Heat (LH), Vapor Pressure Deficit (VPD), and Biomass recovery.
- **PACI-ICPDA Architecture Flow**
  - 7-Phase predictive pipeline visualizer for extreme fire-weather and 1–30 day early warnings.
- **Publications Center**
  - Live instantaneous search filtering and categorization (Journals, Chapters, Pipeline) with one-click BibTeX copy modal.
- **Atmospheric Ambient Audio Synthesizer**
  - Calming, high-altitude ambient soundscape generated directly in the browser via the Web Audio API.

## Local Preview
Run any local static HTTP server:
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080/`.

## Deployment to GitHub Pages
To update `https://murushyam.github.io/`:
```bash
git add .
git commit -m "Upgrade portfolio with 3D Earth WebGL, Quantum AI lattice, and interactive telemetry"
git branch -M main
git remote add origin https://github.com/murushyam/murushyam.github.io.git
git push -u origin main --force
```
