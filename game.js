const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let player, baguettes, score = 0, scoreText;

function preload() {
  // Charger les assets
  this.load.image('background', 'https://raw.githubusercontent.com/Baguette-Inu/assets/main/paris_background.png'); // Change par ton image
  this.load.image('shibaguette', 'https://raw.githubusercontent.com/Baguette-Inu/assets/main/shibaguette.png'); // Change par ton image
  this.load.image('baguette', 'https://raw.githubusercontent.com/Baguette-Inu/assets/main/baguette.png'); // Change par ton image
}

function create() {
  // Ajouter l'arrière-plan
  this.add.image(400, 300, 'background');

  // Ajouter le joueur
  player = this.physics.add.sprite(100, 450, 'shibaguette');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Ajouter des baguettes
  baguettes = this.physics.add.group({
    key: 'baguette',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  // Ajouter un score
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  // Collecter les baguettes
  this.physics.add.collider(player, baguettes, collectBaguette, null, this);
}

function update() {
  // Contrôles du joueur
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function collectBaguette(player, baguette) {
  baguette.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);
}
