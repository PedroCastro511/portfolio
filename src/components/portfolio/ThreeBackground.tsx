import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Particle field
    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // Stylized laptop: clean edge lines + glowing screen with code bars
    const knot = new THREE.Group();

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.9,
    });
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0x0b1220,
      transparent: true,
      opacity: 0.55,
    });

    const disposables: Array<{ dispose: () => void }> = [edgeMat, fillMat];
    const makeBox = (w: number, h: number, d: number, radius = 0.04) => {
      const g = new THREE.BoxGeometry(w, h, d);
      const e = new THREE.EdgesGeometry(g, 1);
      disposables.push(g, e);
      const group = new THREE.Group();
      group.add(new THREE.Mesh(g, fillMat));
      group.add(new THREE.LineSegments(e, edgeMat));
      return group;
      void radius;
    };

    // Monitor body (thin slab)
    const monitor = makeBox(2.6, 1.6, 0.08);
    knot.add(monitor);

    // Glowing screen surface
    const screenGeo = new THREE.PlaneGeometry(2.4, 1.4);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.045;
    knot.add(screen);
    disposables.push(screenGeo, screenMat);

    // Code lines on screen
    const codeMat = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.85,
    });
    disposables.push(codeMat);
    const codeLines: THREE.Line[] = [];
    const lineWidths = [0.9, 1.4, 0.6, 1.1, 0.8, 1.3, 0.5];
    lineWidths.forEach((w, i) => {
      const startX = -1.05;
      const y = 0.5 - i * 0.16;
      const pts = [
        new THREE.Vector3(startX, y, 0.05),
        new THREE.Vector3(startX + w, y, 0.05),
      ];
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      disposables.push(g);
      const line = new THREE.Line(g, codeMat);
      knot.add(line);
      codeLines.push(line);
    });

    // Camera notch
    const notchGeo = new THREE.CircleGeometry(0.025, 16);
    const notch = new THREE.Mesh(notchGeo, edgeMat);
    notch.position.set(0, 0.74, 0.046);
    knot.add(notch);
    disposables.push(notchGeo);

    // Hinge
    const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 16);
    const hingeEdges = new THREE.EdgesGeometry(hingeGeo);
    const hinge = new THREE.LineSegments(hingeEdges, edgeMat);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.y = -0.83;
    knot.add(hinge);
    disposables.push(hingeGeo, hingeEdges);

    // Keyboard base (laptop bottom)
    const kbBase = makeBox(2.8, 0.1, 1.6);
    kbBase.position.set(0, -0.88, 0.78);
    kbBase.rotation.x = -0.08;
    knot.add(kbBase);

    // Trackpad
    const trackGeo = new THREE.PlaneGeometry(0.9, 0.45);
    const trackMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const trackpad = new THREE.Mesh(trackGeo, trackMat);
    trackpad.rotation.x = -Math.PI / 2 - 0.08;
    trackpad.position.set(0, -0.83, 1.35);
    knot.add(trackpad);
    disposables.push(trackGeo, trackMat);

    // Key rows
    const keyMat = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.5,
    });
    disposables.push(keyMat);
    const keyW = 0.18;
    const keyD = 0.18;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 12; col++) {
        const kg = new THREE.PlaneGeometry(keyW, keyD);
        const ke = new THREE.EdgesGeometry(kg);
        disposables.push(kg, ke);
        const key = new THREE.LineSegments(ke, keyMat);
        key.rotation.x = -Math.PI / 2 - 0.08;
        key.position.set(
          -1.18 + col * 0.215,
          -0.82 + row * 0.018,
          0.4 + row * 0.22,
        );
        knot.add(key);
      }
    }

    knot.position.set(3.2, 0.2, -2);
    knot.scale.setScalar(1.4);
    knot.rotation.y = -0.35;
    scene.add(knot);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.05;
      points.rotation.x = t * 0.02;
      knot.rotation.y = -0.35 + Math.sin(t * 0.5) * 0.25;
      knot.rotation.x = Math.sin(t * 0.4) * 0.06;
      knot.position.y = 0.2 + Math.sin(t * 0.8) * 0.12;
      screenMat.opacity = 0.18 + Math.sin(t * 2.0) * 0.06;
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geom.dispose();
      mat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none opacity-50"
    />
  );
}
