let hero = {
    name: "Skeletor",
    health: 100,
    image: "https://static.wikia.nocookie.net/heman/images/7/77/FilmationSkeletorfullbody.webp",
    attacks: [
        {
            name: "Stab",
            damage: 5,
            quote: "Take this, you bandaged boob,",
            chance: 95,
        },
        {
            name: "Freeze Ray",
            damage: 10,
            quote: "Cool off, you decaying wimp,",
            chance: 80,
        },
        {
            name: "Havoc Staff",
            damage: 20,
            quote: "You'll need more bandages after this,",
            chance: 60,
        },
    ],
    attack(id) {
        let chosenAttack = this.attacks[id];
        let statusUpdate = `"${chosenAttack.quote}" said ${this.name} as he used his ${chosenAttack.name} attack.`;
        let attackChance = Math.ceil(Math.random() * 100);
        let attackDamage = (attackChance <= chosenAttack.chance) ? chosenAttack.damage : 1;
        return [attackDamage, statusUpdate];
    },
    die() {
        return `"NYAAAARRRRGGGGGHHHHHHH!!!!" roared Skeletor, as his ambiguous, lifeless body fell to the ground.`;
    },
};

let villain = {
    name: "Mumm-Ra",
    health: 100,
    image: "https://i.etsystatic.com/5743996/r/il/24fa6e/5782849067/il_fullxfull.5782849067_nmk1.jpg",
    attacks: [
        {
            name: "Energy Bolt",
            damage: 5,
            quote: "You are but an insect to the power of Mumm-Ra",
        },
        {
            name: "Summon Monster",
            damage: 10,
            quote: "I, Mumm-Ra, will make sure that you die!",
        },
        {
            name: "All-Powerful Form",
            damage: 20,
            quote: "I will destroy you, body and soul, once and for all!",
        },
    ],
    attack() {
        let randInt = Math.floor(Math.random() * this.attacks.length);
        let chosenAttack = this.attacks[randInt];
        let status = `"${chosenAttack.quote}" said ${this.name} as he used his ${chosenAttack.name} attack.`;
        return [chosenAttack.damage, status];
    },
    die() {
            return `"Curses! I'll get you next time," Mumm-Ra rasped as he temporarily died.`;
    },
};

const pageTitleElement = document.getElementById("page-title");
const heroImageElement = document.getElementById("hero-image");
const villainImageElement = document.getElementById("villain-image");
const heroNameElement = document.getElementById("hero-name");
const villainNameElement = document.getElementById("villain-name");
const heroHealthElement = document.getElementById("hero-health");
const villainHealthElement = document.getElementById("villain-health");
const statusAreaElement = document.getElementById("status-area");
const attackButtonAreaElement = document.getElementById("attack-button-area")

let playerTurn = true;

pageTitleElement.innerText = `${hero.name} vs ${villain.name}`;
heroImageElement.src = hero.image;
villainImageElement.src = villain.image;
heroNameElement.innerText = hero.name;
villainNameElement.innerText = villain.name;
displayHealth(true);
displayHealth(false);

for (let i = 0; i < hero.attacks.length; i++) {
    let htmlString = `<button type="button" class="btn btn-dark" data-attack-id="${i}">${hero.attacks[i].name}</button>\n`;
    attackButtonAreaElement.innerHTML += htmlString;
}

const attackButtons = document.getElementsByTagName("button");
for (let button of attackButtons) {
    button.addEventListener('click', function() {
        if (playerTurn) {
            let attackId = this.getAttribute('data-attack-id');
            let heroAttack = hero.attack(attackId);
            statusAreaElement.innerText = heroAttack[1];
            villain.health -= heroAttack[0];
            displayHealth(false);
            playerTurn = false;
            if (villain.health <= 0) {
                statusAreaElement.innerText = villain.die();
            }
            else {
                setTimeout(villainTurn, 3000);
            }
        }
    });
}

function villainTurn() {
    let villainAttack = villain.attack();
    statusAreaElement.innerText = villainAttack[1];
    hero.health -= villainAttack[0];
    displayHealth(true);
    if (hero.health <= 0) {
        statusAreaElement.innerText = hero.die();
    }
    else {
        playerTurn = true;
    }
}

function displayHealth(player) {
    if (player) {
        heroHealthElement.innerText = hero.health;
    }
    else {
        villainHealthElement.innerText = villain.health;
    }
}