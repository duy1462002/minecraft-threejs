export const blocks = {
  empty: {
    id: 0,
    name: "empty",
  },
  grass: {
    id: 1,
    name: "grass",
    color: 0x4caf50,
  },
  dirt: {
    id: 2,
    name: "dirt",
    color: 0x8b4513,
  },
  stone: {
    id: 3,
    name: "stone",
    color: 0x808080,
    scale: { x: 30, y: 30, z: 30 },
    scarcity: 0.5,
  },
  coalOre: {
    id: 4,
    name: "coalOre",
    color: 0x202020,
    scale: { x: 20, y: 20, z: 20 },
    scarcity: 0.8,
  },
  ironOre: {
    id: 5,
    name: "ironOre",
    color: 0x806060,
    scale: { x: 60, y: 60, z: 60 },
    scarcity: 0.9,
  },
};

export const resources = [
  blocks.stone,
  blocks.coalOre,
  blocks.ironOre,
]
