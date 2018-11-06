let monsters = [{
    type: "slime",
    health: "20",
    strength: "5",
    experience: "6",
    locN: 1,
    locE: 0,
}, {
    type: "rat",
    health: "10",
    strength: "5",
    experience: "6",
    locN: 2,
    locE: 0
}]


let warrior = {
    health: "30",
    mana: "10",
    strength: "15",
    vitality: "12",
    dexterity: "8",
    intelligence: "5",
    locN: 0,
    locE: 0
}

let locN = 0,
    locE = 0;

let encounter = false;

//overal comments neerzetten.

/*function for adding text lines*/

//adds lines on every new line
function addLine(text)
{
   add(text + "\n");
}

//add lines next to eachother
function add(text) 
{
    document.getElementById("log").innerHTML += text;
}


/*Checks if monster is present on given locations*/
function monsterPresent() 
{
    for (let i = 0; i < monsters.length; i++) 
    {
        let monster = monsters[i];

        if (monster.locN == locN && monster.locE == locE ) 
        {
            //addLine("You encounter a " + monster.type);

            encounter = true;
            return monster;
        }

    }
    return false;
}


//window.onload = checkMonster();


//main function for our game.
document.getElementById("myBtn").addEventListener("click", action);

//Wat wil de gebruiker precies doen?
function action(){
    let monster = monsterPresent();
    let command = document.getElementById("commandprompt").value.toUpperCase();

    switch(command)
    {
        case "ATTACK":
            if (monster) 
            {
                //encounter = true;
                attack(monster);
            }
            else 
            {
                addLine("No monster present" + monster.type);
            }
        
        break;
        default: movement(command);
    }
}
                


/*movement*/
function movement(cardinalDir) 
{
    let movementText;
    let monster = monsterPresent();        
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
    addLine(movementText);



}

// function checkMonster(){
//         let abc = monsterPresent();
//         if (warrior.locN == "0" && warrior.locE == "0")
//         {   
//             monsterPresent();
//             addLine("You encounter a " + monster.type);
//         }

// }

function playerDamage(monster){
    damage = Math.floor(Math.random() * warrior.strength);
    monster.health -= damage;
    monster.health = Math.max(0, monster.health);
}


function attack(monster)
{
    playerDamage(monster);
    addLine("You deal " + damage + " damage") 
    addLine("The " + monster.type + " has " + monster.health + " HP left")
    console.log(monster.health)   
}


    console.log(locN, locE);
    console.log(encounter);
// function combat(monster) 
// {
// 	if (encounter = true) 
// 	{
// 	let battleText;
//     let battle = document.getElementById("commandprompt").value.toUpperCase();
//     if (battle = "ATTACK") 
//     {
//         damage = Math.floor(Math.random() * warrior.strength);
//         monster.health -= damage;
//         monster.health = Math.max(0, monster.health);
//         console.log(monster.health);
//         battleText = "You deal " + damage + " damage"
//         document.getElementById("log").innerHTML += battleText + "\n";
//         document.getElementById("log").innerHTML += "The " + monster.type + " has " + monster.health + " HP left" + "\n";

//         if (monster.health != "0") {
//         	       monster.health -= damage;
//        	document.getElementById("log").innerHTML += battleText + "\n";
//         document.getElementById("log").innerHTML += "The " + monster.type + " has " + monster.health + " HP left" + "\n";
//         }
// 	}
//         if (monster.health <= "0") {
//             document.getElementById("log").innerHTML += "Dead" + "\n";
//             encounter = false;
//         }
//         console.log("damage dealt " + damage);
//         console.log("monster health " + monster.health);
//         console.log(monster.health - damage);
//         console.log("hp left " + monster.health);

// 	}
    
    
// }



