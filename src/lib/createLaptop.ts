import * as THREE from "three";

type Disposable = { dispose: () => void };

export function createLaptopGroup(options?: {
  edgeColor?: number;
  accentColor?: number;
  fillColor?: number;
}) {
  const edgeColor = options?.edgeColor ?? 0xdc2626;
  const accentColor = options?.accentColor ?? 0xef4444;
  const fillColor = options?.fillColor ?? 0xf4f4f5;

  const disposables: Disposable[] = [];
  const knot = new THREE.Group();

  const edgeMat = new THREE.LineBasicMaterial({
    color: edgeColor,
    transparent: true,
    opacity: 0.85,
  });
  const fillMat = new THREE.MeshBasicMaterial({
    color: fillColor,
    transparent: true,
    opacity: 0.92,
  });
  disposables.push(edgeMat, fillMat);

  const makeBox = (w: number, h: number, d: number) => {
    const g = new THREE.BoxGeometry(w, h, d);
    const e = new THREE.EdgesGeometry(g, 1);
    disposables.push(g, e);
    const group = new THREE.Group();
    group.add(new THREE.Mesh(g, fillMat));
    group.add(new THREE.LineSegments(e, edgeMat));
    return group;
  };

  const monitor = makeBox(2.6, 1.6, 0.08);
  knot.add(monitor);

  const screenGeo = new THREE.PlaneGeometry(2.4, 1.4);
  const screenMat = new THREE.MeshBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.z = 0.045;
  knot.add(screen);
  disposables.push(screenGeo, screenMat);

  const codeMat = new THREE.LineBasicMaterial({
    color: edgeColor,
    transparent: true,
    opacity: 0.7,
  });
  disposables.push(codeMat);

  const lineWidths = [0.9, 1.4, 0.6, 1.1, 0.8, 1.3, 0.5];
  lineWidths.forEach((w, i) => {
    const startX = -1.05;
    const y = 0.5 - i * 0.16;
    const pts = [new THREE.Vector3(startX, y, 0.05), new THREE.Vector3(startX + w, y, 0.05)];
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    disposables.push(g);
    knot.add(new THREE.Line(g, codeMat));
  });

  const notchGeo = new THREE.CircleGeometry(0.025, 16);
  const notch = new THREE.Mesh(notchGeo, edgeMat);
  notch.position.set(0, 0.74, 0.046);
  knot.add(notch);
  disposables.push(notchGeo);

  const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 16);
  const hingeEdges = new THREE.EdgesGeometry(hingeGeo);
  const hinge = new THREE.LineSegments(hingeEdges, edgeMat);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.y = -0.83;
  knot.add(hinge);
  disposables.push(hingeGeo, hingeEdges);

  const kbBase = makeBox(2.8, 0.1, 1.6);
  kbBase.position.set(0, -0.88, 0.78);
  kbBase.rotation.x = -0.08;
  knot.add(kbBase);

  const trackGeo = new THREE.PlaneGeometry(0.9, 0.45);
  const trackMat = new THREE.MeshBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.14,
    side: THREE.DoubleSide,
  });
  const trackpad = new THREE.Mesh(trackGeo, trackMat);
  trackpad.rotation.x = -Math.PI / 2 - 0.08;
  trackpad.position.set(0, -0.83, 1.35);
  knot.add(trackpad);
  disposables.push(trackGeo, trackMat);

  const keyMat = new THREE.LineBasicMaterial({
    color: edgeColor,
    transparent: true,
    opacity: 0.45,
  });
  disposables.push(keyMat);

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 12; col++) {
      const kg = new THREE.PlaneGeometry(0.18, 0.18);
      const ke = new THREE.EdgesGeometry(kg);
      disposables.push(kg, ke);
      const key = new THREE.LineSegments(ke, keyMat);
      key.rotation.x = -Math.PI / 2 - 0.08;
      key.position.set(-1.18 + col * 0.215, -0.82 + row * 0.018, 0.4 + row * 0.22);
      knot.add(key);
    }
  }

  return { group: knot, screenMat, disposables };
}
