import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Main directional light (key light)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-2, 4, 2);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  scene.add(directionalLight);

  // Fill light (softer, from the opposite side)
  const fillLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  fillLight.intensity = 0;
  fillLight.position.set(2, 2, 1);
  scene.add(fillLight);

  // Rim light (for character outline)
  const rimLight = new THREE.DirectionalLight(0xa87cff, 0);
  rimLight.intensity = 0;
  rimLight.position.set(0, 1, -3);
  scene.add(rimLight);

  // Ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0x404040, 0);
  scene.add(ambientLight);

  // Point light for interactive effects
  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 2);
  pointLight.position.set(0, 3, 2);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Load environment map for realistic reflections
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(0, Math.PI * 0.5, 0);
    });

  function setPointLight(screenLight: any) {
    // Enhanced point light behavior
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.5) {
      pointLight.intensity = Math.min(screenLight.material.emissiveIntensity * 15, 2);
    } else {
      pointLight.intensity = 0.5; // Subtle ambient point light
    }
  }

  const duration = 2.5;
  const ease = "power2.inOut";
  
  function turnOnLights() {
    // Animate environment
    gsap.to(scene, {
      environmentIntensity: 0.4,
      duration: duration,
      ease: ease,
    });
    
    // Animate main lights
    gsap.to(directionalLight, {
      intensity: 1.2,
      duration: duration,
      ease: ease,
    });
    
    gsap.to(fillLight, {
      intensity: 0.6,
      duration: duration,
      ease: ease,
      delay: 0.3,
    });
    
    gsap.to(rimLight, {
      intensity: 0.8,
      duration: duration,
      ease: ease,
      delay: 0.6,
    });
    
    gsap.to(ambientLight, {
      intensity: 0.3,
      duration: duration,
      ease: ease,
      delay: 0.2,
    });
    
    gsap.to(pointLight, {
      intensity: 0.5,
      duration: duration,
      ease: ease,
      delay: 0.4,
    });

    // Animate character rim effect
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 0.8,
      delay: 0.3,
      duration: 2.5,
      ease: ease,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;