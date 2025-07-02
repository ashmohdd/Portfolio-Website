import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        // Using a more suitable character model from a CDN
        const characterUrl = "https://models.readyplayer.me/64f7c5c8e1b4c5001a4c8b2a.glb";
        
        let character: THREE.Object3D;
        loader.load(
          characterUrl,
          async (gltf) => {
            character = gltf.scene;
            
            // Scale and position the character appropriately
            character.scale.setScalar(2.2);
            character.position.set(0, -2, 0);
            
            await renderer.compileAsync(character, camera, scene);
            
            // Apply materials and shadows
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
                
                // Enhance materials for better appearance
                if (child.material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => {
                      if (mat.map) mat.map.flipY = false;
                      mat.needsUpdate = true;
                    });
                  } else {
                    if (child.material.map) child.material.map.flipY = false;
                    child.material.needsUpdate = true;
                  }
                }
              }
            });
            
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            
            // Adjust foot positions if needed
            const footR = character.getObjectByName("RightFoot") || character.getObjectByName("footR");
            const footL = character.getObjectByName("LeftFoot") || character.getObjectByName("footL");
            if (footR) footR.position.y = 0;
            if (footL) footL.position.y = 0;
            
            dracoLoader.dispose();
          },
          (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
          },
          (error) => {
            console.error("Error loading character model:", error);
            // Fallback to a simpler character model
            loadFallbackCharacter();
          }
        );

        const loadFallbackCharacter = () => {
          // Create a simple geometric character as fallback
          const geometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
          const material = new THREE.MeshPhysicalMaterial({
            color: 0xE3A38A, // Indian fair skin tone
            roughness: 0.8,
            metalness: 0.1,
          });
          
          const characterMesh = new THREE.Mesh(geometry, material);
          characterMesh.position.set(0, 0, 0);
          characterMesh.castShadow = true;
          characterMesh.receiveShadow = true;
          
          // Create a simple head
          const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
          const headMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xE3A38A,
            roughness: 0.8,
            metalness: 0.1,
          });
          const head = new THREE.Mesh(headGeometry, headMaterial);
          head.position.set(0, 1.2, 0);
          head.castShadow = true;
          head.receiveShadow = true;
          
          // Add glasses
          const glassesGeometry = new THREE.TorusGeometry(0.15, 0.02, 8, 16);
          const glassesMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            roughness: 0.1,
            metalness: 0.8,
          });
          const glasses = new THREE.Mesh(glassesGeometry, glassesMaterial);
          glasses.position.set(0, 1.25, 0.25);
          glasses.rotation.x = Math.PI / 2;
          
          // Group everything together
          const characterGroup = new THREE.Group();
          characterGroup.add(characterMesh);
          characterGroup.add(head);
          characterGroup.add(glasses);
          characterGroup.name = "FallbackCharacter";
          
          // Create a mock GLTF object
          const mockGLTF: GLTF = {
            scene: characterGroup,
            scenes: [characterGroup],
            animations: [],
            cameras: [],
            asset: {},
            parser: {} as any,
            userData: {}
          };
          
          resolve(mockGLTF);
          setCharTimeline(characterGroup, camera);
          setAllTimeline();
        };

      } catch (err) {
        reject(err);
        console.error("Character loading error:", err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;