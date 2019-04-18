// Soldier
class Soldier {
  // El constructor recibe salud y fuerza para crear un soldado base.
  constructor(health, strength) {
    this.health = health; // Guardamos la salud inicial.
    this.strength = strength; // Guardamos la fuerza de ataque.
  }

  // Devuelve la fuerza del soldado; se usa para calcular el daño provocado.
  attack() {
    return this.strength;
  }

  // Resta el daño recibido de la salud del soldado.
  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  // Además de salud y fuerza, un vikingo tiene nombre.
  constructor(name, health, strength) {
    super(health, strength); // Reutilizamos el constructor de Soldier.
    this.name = name; // Guardamos el nombre del vikingo.
  }

  // Sobrescribimos receiveDamage para personalizar el mensaje de combate.
  receiveDamage(damage) {
    this.health -= damage; // Aplicamos el daño recibido.
    if (this.health > 0) {
      // Si sigue con vida, informamos de los puntos de daño.
      return `${this.name} has received ${damage} points of damage`;
    } else {
      // Si no queda salud, el vikingo ha muerto en combate.
      return `${this.name} has died in act of combat`;
    }
  }

  // Devuelve el grito de guerra vikingo.
  battleCry() {
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier {
  // Los sajones solo necesitan salud y fuerza.
  constructor(health, strength) {
    super(health, strength); // Llamamos al constructor de Soldier.
  }

  // Sobrescribimos receiveDamage para mensajes genéricos.
  receiveDamage(damage) {
    this.health -= damage; // Aplicamos el daño recibido.
    if (this.health > 0) {
      // Si el sajón sigue vivo, indicamos los puntos de daño.
      return `A Saxon has received ${damage} points of damage`;
    } else {
      // Si muere, devolvemos el mensaje de muerte en combate.
      return 'A Saxon has died in combat';
    }
  }
}

// War
class War {
  // Al crear la guerra iniciamos dos ejércitos vacíos.
  constructor() {
    this.vikingArmy = []; // Lista de vikingos disponibles.
    this.saxonArmy = []; // Lista de sajones disponibles.
  }

  // Añade un vikingo al ejército correspondiente.
  addViking(viking) {
    this.vikingArmy.push(viking);
  }

  // Añade un sajón al ejército correspondiente.
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  // Un vikingo al azar ataca a un sajón aleatorio.
  vikingAttack() {
    const randomViking =
      this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    const randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    const randomSaxon = this.saxonArmy[randomSaxonIndex];
    const result = randomSaxon.receiveDamage(randomViking.strength);

    // Si el sajón muere, lo retiramos del ejército.
    if (randomSaxon.health <= 0) {
      this.saxonArmy.splice(randomSaxonIndex, 1);
    }

    return result; // Devolvemos el mensaje resultante del combate.
  }

  // Un sajón al azar ataca a un vikingo aleatorio.
  saxonAttack() {
    const randomSaxon =
      this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    const randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    const randomViking = this.vikingArmy[randomVikingIndex];
    const result = randomViking.receiveDamage(randomSaxon.strength);

    // Si el vikingo muere, lo retiramos del ejército.
    if (randomViking.health <= 0) {
      this.vikingArmy.splice(randomVikingIndex, 1);
    }

    return result; // Devolvemos el mensaje del ataque.
  }

  // Muestra el estado actual de la guerra.
  showStatus() {
    if (this.saxonArmy.length === 0) {
      // No quedan sajones, los vikingos ganan.
      return 'Vikings have won the war of the century!';
    }
    if (this.vikingArmy.length === 0) {
      // No quedan vikingos, los sajones sobreviven.
      return 'Saxons have fought for their lives and survived another day...';
    }
    // Ambos ejércitos siguen luchando.
    return 'Vikings and Saxons are still in the thick of battle.';
  }
}

// Exportamos las clases y las exponemos globalmente para los tests en Node.
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
  global.Soldier = Soldier;
  global.Viking = Viking;
  global.Saxon = Saxon;
  global.War = War;
}