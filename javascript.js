let monsters = [{
    type: "slime",
    health: "20",
    strength: "5",
    experience: "6",
    locN: 1,
    locE: 0,
    //encounter: false
}, {
    type: "rat",
    health: "10",
    strength: "5",
    experience: "6",
    locN: 2,
    locE: 0
}]

let locN = 0,
    locE = 0;

let encounter = false;
let warrior = {
    health: "30",
    mana: "10",
    strength: "15",
    vitality: "12",
    dexterity: "8",
    intelligence: "5"
}
// let slime = {
// 	health:"5",
// 	strength:"5",
// 	experience: "6",
// }
document.getElementById("myBtn").addEventListener("click", movement);

function movement() {
    let movementText;
    let cardinalDir = document.getElementById("commandprompt").value.toUpperCase();
    // if (encounter === true) {
    // 	return false;
    // }
    switch (cardinalDir) {
        case "NORTH":
            movementText = "You moved North";
            locN++;
            break;
        case "EAST":
            movementText = "You moved East";
            locE++;
            break
        case "SOUTH":
            movementText = "You moved South";
            locN--;
            break
        case "WEST":
            movementText = "You moved West";
            locE--;
            break;
        default:
            movementText = "Which direction do you want to go?"
    }

    function monsterPresent() {
        for (let i = 0; i < monsters.length; i++) {
            let monster = monsters[i];
            if (monster.locN == locN && monster.locE == locE) {
                return monster;
            }
        }
        return false;
    }
    document.getElementById("log").innerHTML += movementText + "\n";
    let monster = monsterPresent();
    if (monster) {
        encounter = true;
        document.getElementById("log").innerHTML += "You encounter a " + monster.type + "\n";
        combat(monster);
    }
    console.log(locN, locE);
}


// function attack()
// {
//     let battleText;
//     let encounter = false;
//     let battle = document.getElementById("commandprompt").value.toUpperCase();
//     if (encounter = true) 
//     {
//     	    if (battle = "ATTACK")
//     	    {
//     			console.log("asa");
//     		}
//     }
// }

function combat(monster) 
{
	if (encounter = true) 
	{
	let battleText;
    let battle = document.getElementById("commandprompt").value.toUpperCase();
    if (battle = "ATTACK") 
    {
        damage = Math.floor(Math.random() * warrior.strength);
        hpLeft = monster.health - damage;
        hpLeft = Math.max(0, hpLeft);
                console.log(hpLeft);
        battleText = "You deal " + damage + " damage"
        document.getElementById("log").innerHTML += battleText + "\n";
        document.getElementById("log").innerHTML += "The " + monster.type + " has " + hpLeft + " HP left" + "\n";

        if (hpLeft != "0") {
        	hpLeft = hpLeft - damage;
       	document.getElementById("log").innerHTML += battleText + "\n";
        document.getElementById("log").innerHTML += "The " + monster.type + " has " + hpLeft + " HP left" + "\n";
        }
	}
        if (hpLeft <= "0") {
            document.getElementById("log").innerHTML += "Dead" + "\n";
            encounter = false;
        }
        console.log(monster.health);
        console.log(damage);
        console.log(monster.health - damage);
                        console.log(hpLeft);

	}
    
    
}
console.log(encounter)
movement();
//attack();
