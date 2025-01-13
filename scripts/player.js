import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
export class Player {
  maxSpeed = 10;
  velocity = new THREE.Vector3();
  input = new THREE.Vector3();
  radius = 0.5
  height = 1.75;

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  cameraHelper = new THREE.CameraHelper(this.camera);
  controls = new PointerLockControls(this.camera, document.body);
  
  constructor(scene) {
    this.position.set(32, 10, 32);
    scene.add(this.camera);
    scene.add(this.cameraHelper);
    // Add event listeners for keyboard/mouse events
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));

    this.boundsHelper = new THREE.Mesh(
      new THREE.CylinderGeometry(this.radius, this.radius, this.height, 16),
      new THREE.MeshBasicMaterial({wireframe: true})
    );
    scene.add(this.boundsHelper);
  }
  
  /**
   * Updates the state of the player
   * @param {Number} dt 
   */
  update(dt) {
    if (this.controls.isLocked === true) {
      this.velocity.x = this.input.x;
      this.velocity.z = this.input.z;
      this.controls.moveRight(this.velocity.x * dt);
      this.controls.moveForward(this.velocity.z * dt);
    }
    document.getElementById('info-player-position').innerHTML = this.toString();
    this.updateBoundsHelper();
  }

  updateBoundsHelper() {
    this.boundsHelper.position.copy(this.position);
    this.boundsHelper.position.y -= this.height / 2;
  }
  /**
   * Returns the current world position of the player
   * @returns {THREE.Vector3}
   */
  get position() {
    return this.camera.position;
  }
  /**
   * Event handler for 'keyup' event
   * @param {KeyboardEvent} event 
   */
  onKeyUp(event) {
    switch (event.code) {
      case 'Escape':
        if (event.repeat) break;
        if (this.controls.isLocked) {
          console.log('unlocking controls');
          this.controls.unlock();
        } else {
          console.log('locking controls');
          this.controls.lock();
        }
        break;
      case 'KeyW':
        this.input.z = 0;
        break;
      case 'KeyA':
        this.input.x = 0;
        break;
      case 'KeyS':
        this.input.z = 0;
        break;
      case 'KeyD':
        this.input.x = 0;
        break;
    }
  }
  /**
   * Event handler for 'keyup' event
   * @param {KeyboardEvent} event 
   */
  onKeyDown(event) {
    switch (event.code) {
      case 'KeyW':
        this.input.z = this.maxSpeed;
        break;
      case 'KeyA':
        this.input.x = -this.maxSpeed;
        break;
      case 'KeyS':
        this.input.z = -this.maxSpeed;
        break;
      case 'KeyD':
        this.input.x = this.maxSpeed;
        break;
      case 'KeyR':
        if (this.repeat) break;
        this.position.set(32, 10, 32);
        this.velocity.set(0, 0, 0);
        break;
    }
  }
  /**
   * Returns player position in a readable string form
   * @returns {string}
   */
  toString() {
    let str = '';
    str += `X: ${this.position.x.toFixed(3)} `;
    str += `Y: ${this.position.y.toFixed(3)} `;
    str += `Z: ${this.position.z.toFixed(3)}`;
    return str;
  }
}