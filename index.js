let player1Pokemon = null;
let player2Pokemon = null;
let currentPlayer = 'player1'; // Player 1 starts first

const pokemonData = {
    gardevoir: { hp: 100, attack: 20, attacks: ['Psybeam', 'Moonblast', 'Psychic', 'Dream Eater'] },
    metagross: { hp: 120, attack: 25, attacks: ['Meteor Mash', 'Bullet Punch', 'Earthquake', 'Zen Headbutt'] },
    garchomp: { hp: 110, attack: 22, attacks: ['Dragon Claw', 'Earthquake', 'Fire Fang', 'Crunch'] },
    milotic: { hp: 90, attack: 18, attacks: ['Surf', 'Ice Beam', 'Hydro Pump', 'Aqua Tail'] }
};

function selectPokemon(pokemon, player) {
    if (player === 'player1') {
        player1Pokemon = pokemon;
        document.getElementById('player1-pokemon').src = `${pokemon.toLowerCase()}.gif`;
    } else if (player === 'player2') {
        player2Pokemon = pokemon;
        document.getElementById('player2-pokemon').src = `${pokemon.toLowerCase()}.gif`;
    }
    startBattle();
}

function startBattle() {
    if (player1Pokemon && player2Pokemon) {
        document.getElementById('battle-container').style.display = 'block';
        document.getElementById('player1-hp').innerText = `HP: ${pokemonData[player1Pokemon].hp}`;
        document.getElementById('player2-hp').innerText = `HP: ${pokemonData[player2Pokemon].hp}`;
        
        const player1AttackButtons = document.getElementById('player1-attacks');
        const player2AttackButtons = document.getElementById('player2-attacks');

        // Clear existing attack buttons
        player1AttackButtons.innerHTML = '';
        player2AttackButtons.innerHTML = '';

        // Generate attack buttons for Player 1
        pokemonData[player1Pokemon].attacks.forEach((attack, index) => {
            const button = document.createElement('button');
            button.textContent = attack;
            button.onclick = function() {
                attack('player1', index);
            };
            player1AttackButtons.appendChild(button);
        });

        // Generate attack buttons for Player 2
        pokemonData[player2Pokemon].attacks.forEach((attack, index) => {
            const button = document.createElement('button');
            button.textContent = attack;
            button.onclick = function() {
                attack('player2', index);
            };
            player2AttackButtons.appendChild(button);
        });

        document.getElementById('player-turn').innerText = 'Player 1\'s turn';
    }
}
function startBattle() {
    if (player1Pokemon && player2Pokemon) {
        document.getElementById('battle-container').style.display = 'block';
        document.getElementById('player1-hp').innerText = `HP: ${pokemonData[player1Pokemon].hp}`;
        document.getElementById('player2-hp').innerText = `HP: ${pokemonData[player2Pokemon].hp}`;
        document.getElementById('player-turn').innerText = 'Player 1\'s turn';
    }
}

function attack(player, attackIndex) {
    if (player !== currentPlayer) {
        document.getElementById('battle-status').innerText = `It's not your turn, ${player === 'player1' ? 'Player 1' : 'Player 2'}.`;
        return;
    }

    const attacker = player === 'player1' ? player1Pokemon : player2Pokemon;
    const defender = player === 'player1' ? player2Pokemon : player1Pokemon;
    const attackName = pokemonData[attacker].attacks[attackIndex];
    const attackValue = pokemonData[attacker].attack;
    const defenseValue = pokemonData[defender].hp;

    const damage = Math.floor(Math.random() * attackValue) + 1;
    pokemonData[defender].hp -= damage;
    if (pokemonData[defender].hp < 0) {
        pokemonData[defender].hp = 0;
    }
    document.getElementById(`${player === 'player1' ? 'player2' : 'player1'}-hp`).innerText = `HP: ${pokemonData[defender].hp}`;

    document.getElementById('battle-status').innerText = `Player's ${attacker} uses ${attackName} and deals ${damage} damage to ${defender}!`;

    if (pokemonData[defender].hp <= 0) {
        document.getElementById('battle-status').innerText += `\n${defender} fainted!`;
        // You can add further logic for end of battle or game here
    }

    currentPlayer = player === 'player1' ? 'player2' : 'player1';
    document.getElementById('player-turn').innerText = currentPlayer === 'player1' ? 'Player 1\'s turn' : 'Player 2\'s turn';
}

function checkWinner() {
    if (pokemonData[player1Pokemon].hp <= 0) {
        document.getElementById('battle-status').innerText = 'Player 2 wins!';
        disableButtons();
    } else if (pokemonData[player2Pokemon].hp <= 0) {
        document.getElementById('battle-status').innerText = 'Player 1 wins!';
        disableButtons();
    }
}

function disableButtons() {
    const player1Buttons = document.querySelectorAll('#player1-attacks button');
    const player2Buttons = document.querySelectorAll('#player2-attacks button');
    player1Buttons.forEach(button => button.disabled = true);
    player2Buttons.forEach(button => button.disabled = true);
}

function attack(player, attackIndex) {
    if (player !== currentPlayer) {
        document.getElementById('battle-status').innerText = `It's not your turn, ${player === 'player1' ? 'Player 1' : 'Player 2'}.`;
        return;
    }

    const attacker = player === 'player1' ? player1Pokemon : player2Pokemon;
    const defender = player === 'player1' ? player2Pokemon : player1Pokemon;
    const attackName = pokemonData[attacker].attacks[attackIndex];
    const attackValue = pokemonData[attacker].attack;
    const defenseValue = pokemonData[defender].hp;

    const damage = Math.floor(Math.random() * (attackValue / 2)) + (attackValue / 2); // Simulated damage calculation
    pokemonData[defender].hp -= damage;
    document.getElementById(`${player === 'player1' ? 'player2' : 'player1'}-hp`).innerText = `HP: ${pokemonData[defender].hp}`;
    document.getElementById('battle-status').innerText = `${player === 'player1' ? 'Player 1' : 'Player 2'} attacks with ${attackName} and deals ${damage} damage.`;

    checkWinner();
    currentPlayer = player === 'player1' ? 'player2' : 'player1';
    document.getElementById('player-turn').innerText = currentPlayer === 'player1' ? 'Player 1\'s turn' : 'Player 2\'s turn';
}

