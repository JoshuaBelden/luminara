export default {
  id: 'cabinInTheWoods',
  title: 'Cabin in the Woods',
  synopsis:
    'A secluded cabin in the middle of an eerie forest. The air is thick with mystery, and danger lurks in the shadows.',
  tags: ['mystery', 'horror', 'exploration'],
  startingScene: {
    id: 'root',
    title: 'The Forest Clearing',
    tags: ['outdoors', 'forest', 'intro'],
    narrative:
      'You stand in a small clearing surrounded by dense, foreboding trees. In front of you is a rickety old cabin with a porch that has seen better days. The wind howls softly, carrying the scent of damp wood and moss. Shadows move unnaturally between the trees.',
    npcs: [],
    pointsOfInterest: [
      {
        id: 'porch',
        description: 'A rickety old porch',
        narrative:
          'The porch is in disrepair, the wood is rotting, and the nails are rusted. It creaks loudly under even the lightest step.',
      },
      {
        id: 'tree-line',
        description: 'The edge of the forest',
        narrative:
          'The trees loom ominously, their branches twisted and gnarled. The faint sound of whispering seems to emanate from within.',
      },
      {
        id: 'stone-well',
        description: 'An old stone well near the cabin',
        narrative:
          'The well is covered in moss and vines, with a faint smell of damp earth wafting up from its depths. A rusty bucket hangs precariously from a broken pulley system.',
      },
    ],
    interactables: [
      {
        id: 'cabin-door',
        description: 'A door to the cabin',
        narrative:
          'The door to the cabin is locked, its heavy wooden surface marked by deep scratches and faint carvings.',
      },
      {
        id: 'well-bucket',
        description: 'A rusty bucket on the stone well',
        narrative:
          'The bucket swings slightly in the breeze, its chains rattling softly. It looks just strong enough to hold a small item.',
        interactions: ['inspect', 'pull'],
      },
      {
        id: 'tree-markings',
        description: 'Strange markings on the trees',
        narrative:
          'Carved deep into the bark are cryptic symbols that glow faintly in the darkness. They seem to form a pattern, but its meaning is unclear.',
        interactions: ['examine', 'trace'],
      },
    ],
    items: [
      {
        id: 'cabin-door-key',
        location: 'porch',
        description: 'A rusty old key',
        hidden: true,
        narrative:
          'Laying in the dirt beneath the rickety old porch is a key, its surface flaking with rust. It looks fragile but functional.',
      },
      {
        id: 'strange-note',
        location: 'well-bucket',
        description: 'A damp, tattered note',
        hidden: true,
        narrative:
          'Retrieving the bucket reveals a crumpled piece of paper scrawled with unsettling phrases: "Beware the trees. They watch, they listen."',
      },
      {
        id: 'shiny-pebble',
        location: 'tree-line',
        description: 'A smooth, shiny pebble',
        hidden: true,
        narrative:
          'Partially buried at the base of the tree is a small pebble, polished smooth and oddly warm to the touch.',
      },
    ],
    connectedScenes: [
      {
        id: 'cabin-salon',
        trigger: {
          itemId: 'cabin-door-key',
        },
      },
      {
        id: 'forest-path',
        trigger: {
          interaction: 'trace',
          itemId: 'tree-markings',
        },
      },
    ],
  },
};
