<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";

const container = ref(null);
let renderer, scene, camera, clock, sphereGroup, lines;
let formulaSprites = [];

const textureCache = new Map();

function createTexture(txt, color = '#fff', size = 96) {
  const key = `${txt}_${color}_${size}`;

  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  ctx.font = `bold ${size}px 'Times New Roman', serif`;
  const metrics = ctx.measureText(txt);
  const w = Math.ceil(metrics.width + size * 0.5);
  const h = Math.ceil(size * 1.8);
  canvas.width = w;
  canvas.height = h;

  ctx.font = `bold ${size}px 'Times New Roman', serif`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(txt, w / 2, h / 2);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

// 🎨 PALETTE DE COULEURS OPTIMISÉE POUR FOND SOMBRE
const colors = {
  electricBlue: new THREE.Color('#00D4FF'),    // Bleu électrique très visible
  neonGreen: new THREE.Color('#39FF14'),       // Vert néon intense
  brightYellow: new THREE.Color('#FFEA00'),    // Jaune vif
  hotPink: new THREE.Color('#FF2D95'),         // Rose fluo
  cyan: new THREE.Color('#00FFFF'),            // Cyan brillant
  orange: new THREE.Color('#FF6B35'),          // Orange chaud
  purple: new THREE.Color('#B967FF'),          // Violet lumineux
  aqua: new THREE.Color('#7FFFD4')             // Aqua doux
};

// Liste étendue de formules complexes
const quantumFormulas = [
  'ψ(x,t)=∫dp·φ(p)e^{i(px-Et)/ℏ}',
  '[x̂,p̂]=iℏ',
  'E=½mv²+½kx²',
  '∇·E=ρ/ε₀',
  '∇×B=μ₀J+μ₀ε₀∂E/∂t',
  'F=G(m₁m₂)/r²',
  'S=-k∑pᵢln(pᵢ)',
  'H|ψ⟩=E|ψ⟩',
  'e^{iπ}+1=0',
  '∂²ψ/∂t²=c²∇²ψ',
  'F=ma',
  'E=mc²',
  'PV=nRT',
  'λ=h/p',
  'ΔxΔp≥ℏ/2',
  'τ=r×F',
  '∇²ψ+(2m/ℏ²)(E-V)ψ=0',
  'I=∫ρ(r)r²dV',
  'Φ=∫B·dA',
  '∑F=dp/dt'
];

const mathFormulas = [
  'f(z)=∮_C[f(ζ)/(ζ-z)]dζ',
  'e^x=lim_{n→∞}(1+x/n)^n',
  'Γ(z)=∫_0^∞ t^{z-1}e^{-t}dt',
  'ζ(s)=∑_{n=1}^∞ 1/n^s',
  'F=∫_a^b f(x)dx',
  '∇f=(∂f/∂x,∂f/∂y,∂f/∂z)',
  'A=πr²',
  'V=⅓πr²h',
  'sin²θ+cos²θ=1',
  'e^{iθ}=cosθ+isinθ',
  '∑_{k=1}^n k=n(n+1)/2',
  '∫e^x dx=e^x+C',
  '∇×F=0',
  'P(X=k)=C(n,k)p^k(1-p)^{n-k}',
  'L{f(t)}=∫_0^∞ e^{-st}f(t)dt'
];

const physicsFormulas = [
  'F=q(E+v×B)',
  '∂ρ/∂t+∇·J=0',
  'ΔS≥∫dQ/T',
  'λ_max=b/T',
  'n₁sinθ₁=n₂sinθ₂',
  '1/f=1/v-1/u',
  'E=½CV²',
  'B=μ₀I/(2πr)',
  'v=√(T/μ)',
  'P=IV',
  'R=ρL/A',
  'F=-kx',
  'ω=√(k/m)',
  'v=fλ',
  'E=hf'
];

// Combinaison de toutes les formules
const allFormulas = [...quantumFormulas, ...mathFormulas, ...physicsFormulas];

onMounted(() => {
  /* ---- SCENE ---- */
  scene = new THREE.Scene();
  // 🌑 FOND DE SCÈNE PLUS SOMBRE
  scene.background = new THREE.Color(0x000011); // Bleu nuit très foncé

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 35;

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false // 🔥 Désactivé pour utiliser le background de la scène
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000011, 1); // 🌑 Fond renderer sombre

  container.value.appendChild(renderer.domElement);

  /* ---- SPHÈRE AVEC LIGNES ---- */
  sphereGroup = new THREE.Group();
  scene.add(sphereGroup);

  const R = 15;
  const seg = 32;
  const geo = new THREE.SphereGeometry(R, seg, seg);

  /* Lignes du wireframe - COULEUR ADAPTÉE */
  lines = new THREE.LineSegments(
    geo,
    new THREE.LineBasicMaterial({
      color: colors.electricBlue, // 🔵 Bleu électrique visible sur fond sombre
      transparent: true,
      opacity: 0.25, // Légèrement réduit pour moins dominer
      linewidth: 1
    })
  );
  sphereGroup.add(lines);

  /* ---- SPHÈRE DE POINTS BINAIRES - COULEURS OPTIMISÉES ---- */
  const vertices = geo.attributes.position.array;
  const binaryMaterials = [
    new THREE.SpriteMaterial({
      map: createTexture("0", colors.neonGreen.getStyle(), 48), // 🟢 Vert néon
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.9 // Légèrement augmenté
    }),
    new THREE.SpriteMaterial({
      map: createTexture("1", colors.cyan.getStyle(), 48), // 🔵 Cyan
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.9
    })
  ];

  for (let i = 0; i < vertices.length; i += 3) {
    const s = new THREE.Sprite(binaryMaterials[(i / 3) % 2]);
    s.position.set(vertices[i], vertices[i + 1], vertices[i + 2]);
    s.scale.set(1.2, 1.2, 1.2);
    s.userData.home = s.position.clone();
    sphereGroup.add(s);
  }

  /* ---- FORMULES FLOTTANTES - COULEURS VIVES POUR MEILLEURE VISIBILITÉ ---- */
  const numFormulas = 12;

  // 🎨 Palette de couleurs optimisées pour fond sombre
  const formulaColors = [
    colors.brightYellow,  // 🟡 Très visible
    colors.hotPink,       // 🔴 Rose fluo
    colors.electricBlue,  // 🔵 Bleu électrique
    colors.orange,        // 🟠 Orange chaud
    colors.neonGreen,     // 🟢 Vert néon
    colors.purple         // 🟣 Violet lumineux
  ];

  for (let i = 0; i < numFormulas; i++) {
    const formula = allFormulas[Math.floor(Math.random() * allFormulas.length)];
    // 🎯 Couleurs alternées pour variété
    const colorChoice = formulaColors[i % formulaColors.length];

    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createTexture(formula, colorChoice.getStyle(), 76), // 📝 Taille légèrement augmentée
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthTest: true
      })
    );

    sprite.visible = false;
    scene.add(sprite);

    formulaSprites.push({
      sprite,
      life: 0,
      totalLife: 0,
      formula: formula,
      speed: Math.random() * 0.5 + 0.2,
      orbitRadius: R * (Math.random() * 1.5 + 1.2),
      angle: Math.random() * Math.PI * 2,
      initialDelay: Math.random() * 10,
      color: colorChoice // 🎨 Stocke la couleur pour référence
    });
  }

  /* ---- ANIMATION ---- */
  const cycleDuration = 12;
  let time = 0;

  function resetFormula(f) {
    // 🐌 APPARITION LENTE
    f.totalLife = Math.random() * 7 + 8;
    f.life = f.totalLife;
    f.sprite.visible = true;

    // Changement aléatoire de formule
    f.formula = allFormulas[Math.floor(Math.random() * allFormulas.length)];

    // 🎨 Changement occasionnel de couleur pour plus de variété
    if (Math.random() > 0.7) { // 30% de chance de changer de couleur
      f.color = formulaColors[Math.floor(Math.random() * formulaColors.length)];
    }

    f.sprite.material.map = createTexture(f.formula, f.color.getStyle(), 76);
    f.sprite.material.needsUpdate = true;

    f.orbitRadius = R * (Math.random() * 1.5 + 1.2);
    f.angle = Math.random() * Math.PI * 2;
    f.speed = Math.random() * 0.5 + 0.2;

    f.sprite.scale.set(3.8, 3.8, 3.8); // 📝 Légèrement plus grand
  }

  function updateFormulas(dt) {
    formulaSprites.forEach(f => {
      if (f.initialDelay > 0) {
        f.initialDelay -= dt;
        return;
      }

      f.life -= dt;

      if (f.life <= 0) {
        resetFormula(f);
      }

      if (f.sprite.visible) {
        const progress = 1 - f.life / f.totalLife;

        // 🎭 ANIMATION D'OPACITÉ OPTIMISÉE
        const easedProgress = easeInOutCubic(progress);
        // 💡 Opacité maximale augmentée pour meilleure visibilité
        f.sprite.material.opacity = Math.sin(easedProgress * Math.PI) * 0.95;

        // Mouvement orbital
        f.angle += f.speed * dt * 0.8;
        const x = Math.cos(f.angle) * f.orbitRadius;
        const z = Math.sin(f.angle) * f.orbitRadius;
        const y = Math.sin(f.angle * 1.5) * (f.orbitRadius * 0.2);

        f.sprite.position.set(x, y, z);

        // Rotation lente
        f.sprite.rotation.z = Math.sin(time * 0.5 + f.angle) * 0.1;

        // Pulsation de taille subtile
        const scalePulse = 1 + Math.sin(time * 1 + f.angle) * 0.15;
        f.sprite.scale.set(3.8 * scalePulse, 3.8 * scalePulse, 3.8 * scalePulse);
      }
    });
  }

  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  function updateSphere(dt) {
    time += dt;
    const t = (time % cycleDuration) / cycleDuration;
    const pulse = Math.sin(t * Math.PI * 1.5) * 0.5 + 0.5;

    // Animation des lignes subtile
    lines.material.opacity = 0.2 + pulse * 0.15;

    // 🌈 Changement de couleur très lent des lignes
    const hue = (time * 0.03) % 1; // Très lent
    lines.material.color.setHSL(hue, 0.8, 0.7);
  }

  function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();

    // 🐌 ROTATION LENTE
    sphereGroup.rotation.y += dt * 0.08;
    sphereGroup.rotation.x += dt * 0.04;

    updateSphere(dt);
    updateFormulas(dt);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

onBeforeUnmount(() => {
  if (renderer) {
    renderer.dispose();
  }
  textureCache.clear();
});
</script>

<template>
  <div ref="container" class="quantum-bg"></div>
</template>

<style scoped>
.quantum-bg {
  position: fixed;
  top: 80px; /* Ajusté pour le header */
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px); /* Ajusté pour la hauteur du header */
  z-index: -2; /* Derrière le contenu mais devant le fond */
  pointer-events: none;
  overflow: hidden;
}

/* 💫 EFFET DE BRUME TRÈS SUBTIL EN ARRIÈRE-PLAN */
.quantum-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(0, 50, 100, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(100, 0, 50, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 100, 50, 0.08) 0%, transparent 50%);
  pointer-events: none;
}
</style>
