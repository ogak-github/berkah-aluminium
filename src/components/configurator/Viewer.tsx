import { createEffect, on, onCleanup, onMount } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildProduct, type ProductDef, type Values } from "~/lib/configurator";
import type { Builder } from "~/lib/configurator/builder";

type Props = {
  product: ProductDef;
  values: Values;
  // Bump this number to re-frame the camera
  resetKey?: number;
};

export default function Viewer(props: Props) {
  let container!: HTMLDivElement;

  onMount(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe6e2da);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(3, 6, 4);
    scene.add(sun, new THREE.HemisphereLight(0xffffff, 0xb0b4b8, 0.6));

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(20, 64),
      new THREE.MeshStandardMaterial({ color: 0xd9d4ca, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.001;
    scene.add(ground);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.05, 100);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 0.3;
    controls.maxDistance = 25;

    const render = () => renderer.render(scene, camera);
    controls.addEventListener("change", render);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      render();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let current: Builder | undefined;

    const frame = () => {
      if (!current) return;
      const box = new THREE.Box3().setFromObject(current.root);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const radius = Math.max(size.x, size.y, size.z);
      controls.target.copy(center);
      camera.position.set(center.x + radius * 0.9, center.y + radius * 0.5, center.z + radius * 1.6);
      controls.update();
    };

    // Rebuild the model whenever any parameter changes
    createEffect(() => {
      const next = buildProduct(props.product, { ...props.values }, true);
      if (current) {
        scene.remove(current.root);
        current.dispose();
      }
      current = next;
      scene.add(next.root);
      render();
    });

    // Re-frame the camera only when switching product or on explicit reset
    createEffect(on(() => [props.product.id, props.resetKey], () => {
      frame();
      render();
    }));

    resize();

    onCleanup(() => {
      ro.disconnect();
      controls.dispose();
      current?.dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    });
  });

  return <div ref={container} class="h-full w-full touch-none" />;
}
