/**
 * Earth 3D Biosphere & Atmosphere Simulation Engine
 * Three.js WebGL Interactive Globe with Wildfire Hotspots, Flux Plumes, and Satellites
 * Author: M. S. Shyam Sunder Portfolio Upgrade
 */

(function () {
  'use strict';

  // Check if WebGL is supported
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  const canvas = document.getElementById('atmosphere-canvas');
  if (!canvas || !isWebGLAvailable() || typeof THREE === 'undefined') {
    console.warn('WebGL/Three.js unavailable - 3D globe skipped gracefully.');
    return;
  }

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 360);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Group for the entire Earth system so we can rotate together
  const earthSystem = new THREE.Group();
  scene.add(earthSystem);

  const GLOBE_RADIUS = 110;

  // 1. Base Earth Core Sphere
  const coreGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
  const coreMat = new THREE.MeshPhongMaterial({
    color: 0x071126,
    emissive: 0x030814,
    specular: 0x1b3558,
    shininess: 25,
    transparent: true,
    opacity: 0.94
  });
  const earthCore = new THREE.Mesh(coreGeo, coreMat);
  earthSystem.add(earthCore);

  // 2. Continents / Geospatial Dot Matrix
  // Generate dot matrix covering Earth with density representing landmasses & India focus
  const dotCount = 5500;
  const dotGeo = new THREE.BufferGeometry();
  const dotPositions = new Float32Array(dotCount * 3);
  const dotColors = new Float32Array(dotCount * 3);

  // Geographic Lat/Lon to 3D Cartesian coordinates helper
  function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  // Simplified continental distribution test (dense over Asia/India, Africa, Europe, Americas)
  function isLikelyLand(lat, lon) {
    // High density focus over India & South Asia (Lat: 8-36N, Lon: 68-98E)
    if (lat >= 6 && lat <= 38 && lon >= 66 && lon <= 98) return true;
    // Central Asia / Europe
    if (lat >= 35 && lat <= 70 && lon >= -10 && lon <= 80) return true;
    // East Asia
    if (lat >= 10 && lat <= 60 && lon >= 95 && lon <= 145) return true;
    // Africa
    if (lat >= -35 && lat <= 35 && lon >= -18 && lon <= 50) return true;
    // North America
    if (lat >= 15 && lat <= 70 && lon >= -160 && lon <= -50) return true;
    // South America
    if (lat >= -55 && lat <= 12 && lon >= -82 && lon <= -34) return true;
    // Australia
    if (lat >= -44 && lat <= -10 && lon >= 112 && lon <= 154) return true;
    return false;
  }

  let index = 0;
  for (let i = 0; i < dotCount; i++) {
    // Generate random lat/lon
    let lat = (Math.random() - 0.5) * 160;
    let lon = (Math.random() - 0.5) * 360;

    // Bias toward land regions for authentic continental contours
    if (!isLikelyLand(lat, lon) && Math.random() > 0.12) {
      i--;
      continue;
    }

    const r = GLOBE_RADIUS + 0.6 + Math.random() * 0.4;
    const v = latLonToVector3(lat, lon, r);
    dotPositions[index * 3] = v.x;
    dotPositions[index * 3 + 1] = v.y;
    dotPositions[index * 3 + 2] = v.z;

    // Highlight Indian subcontinent with cyan & emerald bio-shades
    const isIndia = (lat >= 8 && lat <= 36 && lon >= 68 && lon <= 96);
    if (isIndia) {
      dotColors[index * 3] = 0.22;     // R
      dotColors[index * 3 + 1] = 0.88; // G
      dotColors[index * 3 + 2] = 0.95; // B
    } else {
      dotColors[index * 3] = 0.18;
      dotColors[index * 3 + 1] = 0.35;
      dotColors[index * 3 + 2] = 0.58;
    }
    index++;
  }

  dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
  dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

  const dotMat = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const dotPoints = new THREE.Points(dotGeo, dotMat);
  earthSystem.add(dotPoints);

  // 3. Atmospheric Outer Glow Shading
  const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 48, 48);
  const atmosphereMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.8);
        gl_FragColor = vec4(0.22, 0.74, 0.97, 1.0) * intensity * 1.6;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
  scene.add(atmosphere);

  // 4. Wildfire Hotspots Definition & Markers
  const hotspotsData = [
    {
      id: 'similipal',
      name: 'Similipal Biosphere Reserve',
      region: 'Odisha, India',
      lat: 21.86,
      lon: 86.34,
      color: 0xff5722, // Ember
      fluxIncrease: 'SH +22.4%, LH -33%, VPD 5.04 kPa',
      severity: 'Critical 2021 Major Fire'
    },
    {
      id: 'bandhavgarh',
      name: 'Bandhavgarh Tiger Reserve',
      region: 'Madhya Pradesh, India',
      lat: 23.70,
      lon: 81.03,
      color: 0xf59e0b, // Amber Gold
      fluxIncrease: 'SH +10.2%, LH -14.5%, ~12% AGB Loss',
      severity: 'Dry Deciduous Land-Air Coupling'
    },
    {
      id: 'chamba',
      name: 'Chamba / Uttarakhand Himalaya',
      region: 'Himalayan Ridge, India',
      lat: 30.34,
      lon: 78.40,
      color: 0x38bdf8, // Alpine Bio-Cyan
      fluxIncrease: 'SH +42.9%, Post-monsoon Net Gain +14.35%',
      severity: 'Montane 2022 Wildfires & Resilience'
    }
  ];

  const hotspotObjects = [];
  const hotspotGroup = new THREE.Group();
  earthSystem.add(hotspotGroup);

  // Create pulsing rings and rising flux particles for each hotspot
  hotspotsData.forEach((site) => {
    const pos = latLonToVector3(site.lat, site.lon, GLOBE_RADIUS + 1.2);

    // Center Beacon
    const beaconGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: site.color,
      blending: THREE.AdditiveBlending
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.copy(pos);
    hotspotGroup.add(beacon);

    // Concentric Pulse Ring
    const ringGeo = new THREE.RingGeometry(2.2, 3.8, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: site.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(pos);
    ring.lookAt(new THREE.Vector3(0, 0, 0));
    hotspotGroup.add(ring);

    // Rising Atmosphere Flux Particles (Plume simulation)
    const plumeCount = 45;
    const plumeGeo = new THREE.BufferGeometry();
    const plumePositions = new Float32Array(plumeCount * 3);
    const normal = pos.clone().normalize();

    for (let p = 0; p < plumeCount; p++) {
      const height = Math.random() * 22;
      const spread = (Math.random() - 0.5) * 4;
      const pt = pos.clone().add(normal.clone().multiplyScalar(height));
      pt.x += spread;
      pt.y += spread;
      pt.z += spread;

      plumePositions[p * 3] = pt.x;
      plumePositions[p * 3 + 1] = pt.y;
      plumePositions[p * 3 + 2] = pt.z;
    }
    plumeGeo.setAttribute('position', new THREE.BufferAttribute(plumePositions, 3));
    const plumeMat = new THREE.PointsMaterial({
      size: 1.6,
      color: site.color,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const plume = new THREE.Points(plumeGeo, plumeMat);
    hotspotGroup.add(plume);

    hotspotObjects.push({
      data: site,
      beacon,
      ring,
      plume,
      pos,
      baseRingScale: 1
    });
  });

  // 5. Satellites and Orbital Tracks (Sentinel-2, MODIS Terra, Aqua)
  const satellites = [
    { name: 'Sentinel-2 (ESA)', radius: GLOBE_RADIUS + 32, incl: 0.98, speed: 0.009, color: 0x38bdf8 },
    { name: 'MODIS Terra (NASA)', radius: GLOBE_RADIUS + 44, incl: -0.75, speed: 0.007, color: 0xff5722 },
    { name: 'Aqua / AVIRIS-NG', radius: GLOBE_RADIUS + 56, incl: 0.45, speed: 0.005, color: 0x10b981 }
  ];

  const satGroup = new THREE.Group();
  scene.add(satGroup);

  satellites.forEach((sat) => {
    // Orbit curve path
    const curvePoints = [];
    for (let theta = 0; theta <= Math.PI * 2; theta += 0.05) {
      const x = Math.cos(theta) * sat.radius;
      const z = Math.sin(theta) * sat.radius;
      const y = Math.sin(theta * 1.5) * (sat.radius * 0.35);
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const orbitCurve = new THREE.CatmullRomCurve3(curvePoints, true);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitCurve.getPoints(120));
    const orbitMat = new THREE.LineBasicMaterial({
      color: sat.color,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = sat.incl;
    satGroup.add(orbitLine);

    // Satellite body
    const satMesh = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(2.4, 1.4, 1.4);
    const bodyMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    satMesh.add(body);

    // Solar panels
    const panelGeo = new THREE.BoxGeometry(6.5, 0.2, 1.2);
    const panelMat = new THREE.MeshBasicMaterial({ color: sat.color });
    const panels = new THREE.Mesh(panelGeo, panelMat);
    satMesh.add(panels);

    satGroup.add(satMesh);
    sat.mesh = satMesh;
    sat.curve = orbitCurve;
    sat.progress = Math.random();
  });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xfffaed, 1.4);
  sunLight.position.set(300, 150, 200);
  scene.add(sunLight);

  // Initial positioning: rotate Earth so Indian subcontinent faces camera
  // India is approx Lat ~22 N, Lon ~82 E
  const targetInitialEuler = new THREE.Euler(0.2, -1.8, 0);
  earthSystem.rotation.copy(targetInitialEuler);

  // Smooth Camera Navigation / Flight interpolation
  let isTransitioning = false;
  let targetRotation = { x: targetInitialEuler.x, y: targetInitialEuler.y };

  window.flyGlobeToSite = function (siteId) {
    const siteObj = hotspotObjects.find((h) => h.data.id === siteId);
    if (!siteObj) return;

    // Compute Euler angles to center this site
    const latRad = siteObj.data.lat * (Math.PI / 180);
    const lonRad = siteObj.data.lon * (Math.PI / 180);

    // Desired Y rotation brings the longitude to front
    const targetY = -lonRad - Math.PI / 2;
    // Desired X rotation brings the latitude to center
    const targetX = latRad * 0.85;

    targetRotation = { x: targetX, y: targetY };
    isTransitioning = true;
  };

  // Mouse drag interaction to spin the Earth freely
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let autoRotate = true;
  let idleTimer = null;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    autoRotate = false;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, 4000);
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    earthSystem.rotation.y += deltaX * 0.005;
    earthSystem.rotation.x += deltaY * 0.005;

    // Limit pitch so it doesn't flip upside down
    earthSystem.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, earthSystem.rotation.x));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  // Touch Support for Mobile
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      autoRotate = false;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    earthSystem.rotation.y += deltaX * 0.007;
    earthSystem.rotation.x += deltaY * 0.007;
    earthSystem.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, earthSystem.rotation.x));

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    isDragging = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      autoRotate = true;
    }, 4000);
  });

  // Scroll Parallax Effect
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    lastScrollY = scrollY;

    // Subtle tilt & camera dolly as user journeys down chapters
    if (!isDragging) {
      earthSystem.rotation.y += scrollDelta * 0.0003;
      camera.position.z = 360 + Math.min(60, scrollY * 0.04);
    }
  }, { passive: true });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // 1. Gentle auto-rotation
    if (autoRotate && !isTransitioning) {
      earthSystem.rotation.y += 0.0018;
    }

    // 2. Camera / Flight Interpolation
    if (isTransitioning) {
      const step = 0.06;
      earthSystem.rotation.x += (targetRotation.x - earthSystem.rotation.x) * step;
      earthSystem.rotation.y += (targetRotation.y - earthSystem.rotation.y) * step;

      if (
        Math.abs(targetRotation.x - earthSystem.rotation.x) < 0.005 &&
        Math.abs(targetRotation.y - earthSystem.rotation.y) < 0.005
      ) {
        isTransitioning = false;
      }
    }

    // 3. Hotspot Pulse & Plumes
    hotspotObjects.forEach((h, i) => {
      const pulse = 1 + Math.sin(elapsedTime * 4 + i) * 0.35;
      h.ring.scale.set(pulse, pulse, pulse);
      h.ring.material.opacity = 0.85 - (pulse - 0.65) * 0.7;

      // Rotate plume particles slightly
      h.plume.rotation.y = elapsedTime * 0.2;
    });

    // 4. Update Satellite Positions
    satellites.forEach((sat) => {
      sat.progress = (sat.progress + sat.speed * 0.1) % 1;
      const point = sat.curve.getPoint(sat.progress);
      sat.mesh.position.copy(point);
      sat.mesh.rotation.y += 0.03;
      sat.mesh.rotation.z += 0.01;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
})();
