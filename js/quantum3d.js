/**
 * Quantum + AI 3D Neural Lattice & Bloch Sphere Engine
 * Three.js WebGL Interactive Visualizer for Quantum Reservoir Computing
 * Author: M. S. Shyam Sunder Portfolio Upgrade
 */

(function () {
  'use strict';

  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  const canvas = document.getElementById('quantum-canvas');
  if (!canvas || !isWebGLAvailable() || typeof THREE === 'undefined') {
    return;
  }

  const container = canvas.parentElement;
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 400;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, 75);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  const group = new THREE.Group();
  scene.add(group);

  // 1. Central Bloch Sphere Wireframe
  const blochGeo = new THREE.SphereGeometry(18, 24, 24);
  const blochMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const blochSphere = new THREE.Mesh(blochGeo, blochMat);
  group.add(blochSphere);

  // 2. Quantum Axes (X, Y, Z coordinates |0>, |1>, |+>, |->)
  const axesPoints = [
    new THREE.Vector3(-24, 0, 0), new THREE.Vector3(24, 0, 0),
    new THREE.Vector3(0, -24, 0), new THREE.Vector3(0, 24, 0),
    new THREE.Vector3(0, 0, -24), new THREE.Vector3(0, 0, 24)
  ];
  const axesGeo = new THREE.BufferGeometry().setFromPoints(axesPoints);
  const axesMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.4
  });
  const axesLines = new THREE.LineSegments(axesGeo, axesMat);
  group.add(axesLines);

  // 3. Entangled Qubit Nodes (Quantum Reservoir Network)
  const nodeCount = 38;
  const nodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.9, 12, 12);

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    const r = 16 + Math.random() * 10;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    const isEmber = Math.random() > 0.6;
    const nodeMat = new THREE.MeshBasicMaterial({
      color: isEmber ? 0xff5722 : 0x5eead4,
      blending: THREE.AdditiveBlending
    });
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
    nodeMesh.position.set(x, y, z);
    nodeMesh.userData = {
      basePos: new THREE.Vector3(x, y, z),
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03
    };

    group.add(nodeMesh);
    nodes.push(nodeMesh);
  }

  // 4. Dynamic Synaptic Connections between nodes
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xa78bfa,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending
  });

  const lineGeo = new THREE.BufferGeometry();
  const maxLines = 80;
  const linePositions = new Float32Array(maxLines * 6);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const connections = new THREE.LineSegments(lineGeo, lineMat);
  group.add(connections);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    targetRotationY = mouseX * 1.5;
    targetRotationX = mouseY * 1.5;
  });

  container.addEventListener('mouseleave', () => {
    targetRotationX = 0;
    targetRotationY = 0;
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Rotate overall structure
    group.rotation.y += 0.006;
    group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
    group.rotation.z += (targetRotationY - group.rotation.z) * 0.05;

    // Pulsate nodes in quantum superposition state
    nodes.forEach((n) => {
      const u = n.userData;
      u.phase += u.speed;
      const offset = Math.sin(u.phase) * 1.5;
      n.position.copy(u.basePos).normalize().multiplyScalar(u.basePos.length() + offset);
    });

    // Recompute nearest neighbor connections
    let lineIdx = 0;
    const positions = lineGeo.attributes.position.array;

    for (let i = 0; i < nodes.length && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < nodes.length && lineIdx < maxLines; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 12) {
          positions[lineIdx * 6] = nodes[i].position.x;
          positions[lineIdx * 6 + 1] = nodes[i].position.y;
          positions[lineIdx * 6 + 2] = nodes[i].position.z;

          positions[lineIdx * 6 + 3] = nodes[j].position.x;
          positions[lineIdx * 6 + 4] = nodes[j].position.y;
          positions[lineIdx * 6 + 5] = nodes[j].position.z;
          lineIdx++;
        }
      }
    }
    // Clear unused lines
    for (let k = lineIdx * 6; k < maxLines * 6; k++) {
      positions[k] = 0;
    }
    lineGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 400;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();
