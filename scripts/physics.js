import * as THREE from "three";
import { blocks } from "./blocks";
import { Player } from "./player";
import { World } from "./world";

const collisionMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.2
  });
  const collisionGeometry = new THREE.BoxGeometry(1.001, 1.001, 1.001);
  const contactMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00 });
  const contactGeometry = new THREE.SphereGeometry(0.05, 6, 6);

export class Physics {
  constructor(scene) {
    this.helpers = new THREE.Group();
    scene.add(this.helpers);
  }

  /**
   * @param {number} dt
   * @param {Player} player
   * @param {World} world
   */

  update(dt, player, world) {
    this.detectCollisions(player, world);
  }

  /**
   * @param {Player} player
   * @param {World} world
   */

  detectCollisions(player, world) {
    const candidates = this.broadPhase(player, world);
    // const collisions = this.narrowPhase(candidates, player);

    // if (collisions.length > 0) {
    //   this.resolveCollisions(collisions);
    // }
  }

  /**
   * @param {Player} player
   * @param {World} world
   * @returns {[]}
   */
  broadPhase(player, world) {
    const candidates = [];

    const extents = {
      x: {
        min: Math.floor(player.position.x - player.radius),
        max: Math.ceil(player.position.x + player.radius),
      },
      y: {
        min: Math.floor(player.position.y - player.height),
        max: Math.ceil(player.position.y),
      },
      z: {
        min: Math.floor(player.position.z - player.radius),
        max: Math.ceil(player.position.z + player.radius),
      },
    };

    for (let x = extents.x.min; x <= extents.x.max; x++) {
      for (let y = extents.y.min; y <= extents.y.max; y++) {
        for (let z = extents.z.min; z <= extents.z.max; z++) {
          const block = world.getBlock(x, y, z);
          if(block && block.id !== blocks.empty.id) {
            const blockPos = {x, y, z};
            candidates.push(blockPos);
            this.addCollisionHelper(blockPos);
          }
        }
      }
    }
    
    return candidates;
  }

  narrowPhase() {

  }

  /**
   * Visualizes the block the player is colliding with
   * @param {THREE.Object3D} block 
   */
  addCollisionHelper(block) {
    const blockMesh = new THREE.Mesh(collisionGeometry, collisionMaterial);
    blockMesh.position.copy(block);
    this.helpers.add(blockMesh);
  }
}
