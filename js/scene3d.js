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
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0.15, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 3),
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc, wireframe: true, transparent: true, opacity: 0.28 })
    );
    globe.add(wire);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.42, 2),
      new THREE.MeshBasicMaterial({ color: 0x0b1a16, transparent: true, opacity: 0.55 })
    );
    globe.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.018, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.7 })
    );
    ring.rotation.x = Math.PI / 2.6;
    globe.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.55, 0.012, 8, 140),
      new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.35 })
    );
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = 0.4;
    globe.add(ring2);

    const pCount = 420;
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i += 1) {
      const r = 1.7 + Math.random() * 2.8;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(p) * Math.cos(t);
      positions[i * 3 + 1] = r * Math.cos(p) * 0.7;
      positions[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
      const ember = Math.random() > 0.62;
      colors[i * 3] = ember ? 1 : 0.49;
      colors[i * 3 + 1] = ember ? 0.42 : 0.83;
      colors[i * 3 + 2] = ember ? 0.21 : 0.99;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.85 })
    );
    scene.add(points);

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

    const tick = () => {
      const t = performance.now() * 0.001;
      globe.rotation.y = t * 0.12 + mouse.x * 0.25;
      globe.rotation.x = 0.18 + mouse.y * 0.12;
      ring.rotation.z = t * 0.35;
      ring2.rotation.z = -t * 0.22;
      points.rotation.y = t * 0.05;
      const scroll = Math.min(1, window.scrollY / 1400);
      globe.position.y = -scroll * 0.8;
      globe.position.x = 1.35 - scroll * 0.4;
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
