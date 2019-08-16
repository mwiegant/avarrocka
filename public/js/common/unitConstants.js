/*
  Dedicated location for constants, as defined in the book Strongholds & Followers
 */

var unitConstants = {};

unitConstants.ancestry = [
  // key: Ancestry, values: [Attack, Power, Defense, Toughness, Morale, [Traits]]
  { key: "Bugbear", values: [2, 0, 0, 0, 1, ["Martial"]] },
  { key: "Dragonborn", values: [2, 2, 1, 1, 1, ["Courageous"]] },
  { key: "Dwarf", values: [3, 1, 1, 1, 2, ["Stalwart"]] },
  { key: "Elf", values: [2, 0, 0, 0, 1, ["Eternal"]] },
  { key: "Elf Winged", values: [1, 1, 0, 0, 1, ["Eternal"]] },
  { key: "Ghoul", values: [-1, 0, 2, 2, 0, ["Undead", "Horrify", "Ravenous"]] },
  { key: "Gnoll", values: [2, 0, 0, 0, 1, ["Frenzy"]] },
  { key: "Gnome", values: [1, -1, 1, -1, 1, []] },
  { key: "Goblin", values: [-1, -1, 1, -1, 0, []] },
  { key: "Hobgoblin", values: [2, 0, 0, 0, 1, ["Bred_For_War", "Martial"]] },
  { key: "Human", values: [2, 0, 0, 0, 1, ["Courageous"]] },
  { key: "Kobold", values: [-1, -1, 1, -1, -1, []] },
  { key: "Lizardfolk", values: [2, 1, -1, 1, 1, ["Amphibious"]] },
  { key: "Ogre", values: [0, 2, 0, 2, 1, ["Brutal"]] },
  { key: "Orc", values: [2, 1, 1, 1, 2, ["Savage"]] },
  { key: "Skeleton", values: [-2, -1, 1, 1, 1, ["Undead", "Mindless"]] },
  { key: "Treant", values: [0, 2, 0, 2, 0, ["Regenerate"]] },
  { key: "Zombie", values: [-2, 0, 2, 2, 2, ["Undead", "Mindless"]] }
];

unitConstants.traits = [
  // lol. yeah I'll do this some other time.
];

unitConstants.experience = [
  // key: Experience, values: [Attack, Power, Defense, Toughness, Morale]
  { key: "Green", values: [0, 0, 0, 0, 0] },
  { key: "Regular", values: [1, 0, 0, 1, 1] },
  { key: "Seasoned", values: [1, 0, 0, 1, 2] },
  { key: "Veteran", values: [1, 0, 0, 1, 3] },
  { key: "Elite", values: [2, 0, 0, 2, 4] },
  { key: "Super Elite", values: [2, 0, 0, 2, 5] }
];

unitConstants.equipment = [
  // key: Equipment, values: [Attack, Power, Defense, Toughness, Morale]
  { key: "Light", values: [0, 1, 1, 0, 0] },
  { key: "Medium", values: [0, 2, 2, 0, 0] },
  { key: "Heavy", values: [0, 4, 4, 0, 0] },
  { key: "Super Heavy", values: [0, 6, 6, 0, 0] }
];

unitConstants.unitType = [
  // key: Type, values: [Attack, Power, Defense, Toughness, Morale, CostModifier]
  { key: "Flying", values: [0, 0, 0, 0, 3, 2.00] },
  { key: "Archers", values: [0, 1, 0, 0, 1, 1.75] },
  { key: "Cavalry", values: [1, 1, 0, 0, 2, 1.50] },
  { key: "Levies", values: [0, 0, 0, 0, -1, 0.75] },
  { key: "Infantry", values: [0, 0, 1, 1, 0, 1.00] },
  { key: "Siege Engine", values: [1, 1, 0, 1, 0, 1.50] }
];

unitConstants.size = [
  // This is the only set of constants that do not follow the book verbatim,
  // although I do honor the written Size-to-CostModifier values

  // key: Type, values: [Size, MinTroops, MaxTroops, CostModifier]
  { key: "Squad", values: [4, 1, 20, 0.66] },
  { key: "Company", values: [6, 21, 60, 1.00] },
  { key: "Batallion", values: [8, 61, 100, 1.33] },
  { key: "Division", values: [10, 101, 200, 1.66] },
  { key: "Army", values: [12, 201, 400, 2.00] }
];