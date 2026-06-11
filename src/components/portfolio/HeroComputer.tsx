import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createLaptopGroup } from "@/lib/createLaptop";

export function HeroComputer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 8.7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const { group: laptop, screenMat, disposables } = createLaptopGroup();
    laptop.scale.setScalar(1.38);
    laptop.rotation.y = -0.45;
    scene.add(laptop);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      laptop.rotation.y = -0.45 + Math.sin(t * 0.45) * 0.1;
      laptop.rotation.x = Math.sin(t * 0.35) * 0.03;
      laptop.position.y = Math.sin(t * 0.7) * 0.04;
      screenMat.opacity = 0.14 + Math.sin(t * 1.8) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="relative h-full w-full opacity-60 md:opacity-70"
    />
  );
}
