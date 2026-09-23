(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const boot = () => {
    if (!window.THREE) return;
    const THREE = window.THREE;

    let host = document.getElementById("world3d");
    if (!host) {
      host = document.createElement("div");
      host.id = "world3d";
      host.setAttribute("aria-hidden", "true");
      document.body.prepend(host);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
    camera.position.set(0, 0.2, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const R = 1.62;
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(R, 48, 36),
      new THREE.MeshBasicMaterial({ color: 0x0c1a24, transparent: true, opacity: 0.72 })
    );
    group.add(globe);

    group.add(new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.002, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc, wireframe: true, transparent: true, opacity: 0.16 })
    ));

    const latLon = (lat, lon, r) => {
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon + 90);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const sites = [
      { name: "Similipal", lat: 21.63, lon: 86.28, heat: 1 },
      { name: "Bandhavgarh", lat: 23.72, lon: 81.02, heat: 0.72 },
      { name: "Chamba", lat: 32.55, lon: 76.13, heat: 0.86 }
    ];

    const outline = [
      [8.1, 77.5], [10.0, 78.0], [11.5, 79.8], [13.1, 80.3], [15.3, 80.0],
      [16.5, 82.2], [17.7, 83.3], [19.1, 84.8], [20.3, 86.7], [21.5, 87.0],
      [22.0, 88.4], [21.7, 86.1], [22.6, 84.8], [23.7, 87.0], [25.3, 87.9],
      [26.2, 89.8], [27.2, 88.9], [26.7, 85.0], [27.5, 83.0], [28.6, 80.4],
      [30.4, 78.0], [32.5, 76.0], [34.1, 74.8], [32.0, 74.6], [29.5, 73.0],
      [26.6, 70.2], [24.6, 71.2], [23.0, 70.3], [22.4, 69.1], [21.1, 72.0],
      [20.0, 72.8], [18.9, 72.8], [16.0, 73.4], [14.5, 74.4], [12.9, 74.8],
      [11.3, 75.8], [8.9, 76.6], [8.1, 77.5]
    ];
    const indiaPts = outline.map(([lat, lon]) => latLon(lat, lon, R * 1.01));
    const indiaGeo = new THREE.BufferGeometry().setFromPoints(indiaPts);
    group.add(new THREE.Line(
      indiaGeo,
      new THREE.LineBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.95 })
    ));

    const fillPos = [];
    for (let i = 0; i < 280; i += 1) {
      const lat = 8 + Math.random() * 26;
      const lon = 69 + Math.random() * 20;
      const v = latLon(lat, lon, R * 1.008);
      fillPos.push(v.x, v.y, v.z);
    }
    const fillGeo = new THREE.BufferGeometry();
    fillGeo.setAttribute("position", new THREE.Float32BufferAttribute(fillPos, 3));
    group.add(new THREE.Points(
      fillGeo,
      new THREE.PointsMaterial({ color: 0x34d399, size: 0.028, transparent: true, opacity: 0.55 })
    ));

    sites.forEach((s) => {
      const p = latLon(s.lat, s.lon, R * 1.02);
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xff6b35 })
      );
      marker.position.copy(p);
      group.add(marker);
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xff9f1c, transparent: true, opacity: 0.28 })
      );
      glow.position.copy(p);
      group.add(glow);
    });

    const plumeN = 240;
    const plumePos = new Float32Array(plumeN * 3);
    const plumeCol = new Float32Array(plumeN * 3);
    const plumeMeta = [];
    for (let i = 0; i < plumeN; i += 1) {
      const site = sites[i % sites.length];
      plumeMeta.push({
        site,
        life: Math.random(),
        speed: 0.18 + Math.random() * 0.28 * site.heat,
        jitter: Math.random() * Math.PI * 2,
        spread: 0.04 + Math.random() * 0.08
      });
    }
    const plumeGeo = new THREE.BufferGeometry();
    plumeGeo.setAttribute("position", new THREE.BufferAttribute(plumePos, 3));
    plumeGeo.setAttribute("color", new THREE.BufferAttribute(plumeCol, 3));
    const plume = new THREE.Points(
      plumeGeo,
      new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false })
    );
    group.add(plume);

    const atmoN = 360;
    const atmoPos = new Float32Array(atmoN * 3);
    for (let i = 0; i < atmoN; i += 1) {
      const v = latLon((Math.random() - 0.5) * 160, Math.random() * 360 - 180, R + 0.25 + Math.random() * 1.6);
      atmoPos[i * 3] = v.x;
      atmoPos[i * 3 + 1] = v.y;
      atmoPos[i * 3 + 2] = v.z;
    }
    const atmoGeo = new THREE.BufferGeometry();
    atmoGeo.setAttribute("position", new THREE.Float32BufferAttribute(atmoPos, 3));
    group.add(new THREE.Points(
      atmoGeo,
      new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.02, transparent: true, opacity: 0.35 })
    ));

    const indiaLook = latLon(22, 78, 1).normalize();
    group.quaternion.setFromUnitVectors(indiaLook, new THREE.Vector3(0.35, 0.05, 1).normalize());

    const mouse = { x: 0, y: 0 };
    window.addEventListener("pointermove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", resize);
    resize();

    const up = new THREE.Vector3();
    const tick = () => {
      const t = performance.now() * 0.001;
      group.rotation.y = t * 0.08 + mouse.x * 0.22;
      group.rotation.x = 0.06 + mouse.y * 0.1;
      const scroll = Math.min(1, window.scrollY / 1600);
      group.position.set(1.45 - scroll * 0.55, 0.05 - scroll * 0.7, 0);

      const pos = plume.geometry.attributes.position.array;
      const col = plume.geometry.attributes.color.array;
      for (let i = 0; i < plumeN; i += 1) {
        const m = plumeMeta[i];
        m.life += m.speed * 0.016;
        if (m.life > 1) m.life -= 1;
        const base = latLon(m.site.lat, m.site.lon, R);
        up.copy(base).normalize();
        const h = m.life * (0.55 + m.site.heat * 0.55);
        const swirl = m.life * 2.2 + m.jitter;
        const rad = m.spread * (0.3 + m.life * 1.8);
        const side = new THREE.Vector3().crossVectors(up, new THREE.Vector3(0, 1, 0)).normalize();
        if (side.lengthSq() < 0.1) side.set(1, 0, 0);
        const bitan = new THREE.Vector3().crossVectors(up, side);
        const px = base.x + up.x * h + side.x * Math.cos(swirl) * rad + bitan.x * Math.sin(swirl) * rad;
        const py = base.y + up.y * h + side.y * Math.cos(swirl) * rad + bitan.y * Math.sin(swirl) * rad;
        const pz = base.z + up.z * h + side.z * Math.cos(swirl) * rad + bitan.z * Math.sin(swirl) * rad;
        pos[i * 3] = px;
        pos[i * 3 + 1] = py;
        pos[i * 3 + 2] = pz;
        const hot = 1 - m.life;
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.28 + hot * 0.45;
        col[i * 3 + 2] = 0.08 + m.life * 0.12;
      }
      plume.geometry.attributes.position.needsUpdate = true;
      plume.geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
  };

  if (window.THREE) {
    boot();
    return;
  }
  const s = document.createElement("script");
  s.src = "https://unpkg.com/three@0.160.0/build/three.min.js";
  s.onload = boot;
  document.head.appendChild(s);
})();
