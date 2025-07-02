import * as THREE from "three";
import { GLTF } from "three-stdlib";

const setAnimations = (gltf: GLTF) => {
  let character = gltf.scene;
  let mixer = new THREE.AnimationMixer(character);
  
  // Check if the character has animations
  if (gltf.animations && gltf.animations.length > 0) {
    // Play available animations
    gltf.animations.forEach((clip, index) => {
      const action = mixer.clipAction(clip);
      if (index === 0) {
        // Play the first animation as the main idle animation
        action.play();
      }
    });
  } else {
    // Create a simple breathing animation for characters without animations
    const breathingAnimation = createBreathingAnimation(character);
    if (breathingAnimation) {
      const action = mixer.clipAction(breathingAnimation);
      action.play();
    }
  }

  function startIntro() {
    // Simple intro animation - scale up from 0
    const introTween = new THREE.Vector3(0, 0, 0);
    character.scale.copy(introTween);
    
    const animate = () => {
      introTween.lerp(new THREE.Vector3(2.2, 2.2, 2.2), 0.05);
      character.scale.copy(introTween);
      
      if (introTween.length() < 2.1) {
        requestAnimationFrame(animate);
      }
    };
    
    setTimeout(() => {
      animate();
    }, 1000);
  }

  function hover(gltf: GLTF, hoverDiv: HTMLDivElement) {
    let isHovering = false;
    
    const onHoverFace = () => {
      if (!isHovering) {
        isHovering = true;
        // Simple hover effect - slight scale increase
        character.scale.setScalar(2.3);
      }
    };

    const onLeaveFace = () => {
      if (isHovering) {
        isHovering = false;
        // Return to normal scale
        character.scale.setScalar(2.2);
      }
    };

    if (!hoverDiv) return;
    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);
    
    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

// Create a simple breathing animation for characters without built-in animations
const createBreathingAnimation = (character: THREE.Object3D): THREE.AnimationClip | null => {
  try {
    const tracks: THREE.KeyframeTrack[] = [];
    
    // Find the chest or main body part
    let targetBone: THREE.Object3D | null = null;
    character.traverse((child) => {
      if (child.name.toLowerCase().includes('chest') || 
          child.name.toLowerCase().includes('spine') ||
          child.name.toLowerCase().includes('body')) {
        targetBone = child;
      }
    });
    
    if (!targetBone) {
      targetBone = character; // Use the whole character if no specific bone found
    }
    
    // Create breathing animation keyframes
    const times = [0, 1, 2];
    const values = [
      1, 1, 1,     // Normal scale
      1.02, 1.02, 1.02, // Slightly larger (inhale)
      1, 1, 1      // Back to normal (exhale)
    ];
    
    const scaleTrack = new THREE.VectorKeyframeTrack(
      targetBone.name + '.scale',
      times,
      values
    );
    
    tracks.push(scaleTrack);
    
    return new THREE.AnimationClip('breathing', 2, tracks);
  } catch (error) {
    console.warn('Could not create breathing animation:', error);
    return null;
  }
};

export default setAnimations;