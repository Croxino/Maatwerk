let monsters = [{
    type: "slime",
    health: "20",
    strength: "5",
    experience: "20",
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


let player = {
	level: 1,
    health: "30",
    mana: "10",
    strength: "15",
    vitality: "12",
    dexterity: "8",
    intelligence: "5",
    experience:"20",
    currExp: "0",
    locN: 0,
    locE: 0
}

let locN = 0,
    locE = 0;

let encounter = false;


//overal comments neerzetten.

/*function for adding text lines*/

//adds lines on every new line

window.onload = currentStats;


function currentStats()
{

	document.getElementById("level").innerHTML = "Level: " + player.level;
	document.getElementById("healthPool").innerHTML = "HP: " + player.health;
	document.getElementById("manaPool").innerHTML = "MP: " + player.mana;
	document.getElementById("experienceBar").innerHTML = "EXP: " + player.currExp + "/" + player.experience ;
}

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
            addLine("You encounter a " + monster.type);
            encounter = true;
            return monster;
        }
    }
    return false;
}





//main function for our game.
document.getElementById("myBtn").addEventListener("click", action);

//Wat wil de gebruiker precies doen?
function action(){

    let command = document.getElementById("commandprompt").value.toUpperCase();
    let monster = monsterPresent();
    switch(command)
    {
        case "ATTACK":
            if (monster) 
            {
                playerAttack(monster);
                monsterAttack();
            }
            else 
            {
                addLine("No monster present");
            }
        
        break;
        default: movement(command);
    }
}
                


/*movement*/
function movement(cardinalDir) 
{
    let movementText;       
    switch (cardinalDir) 
    {
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
//         if (player.locN == "0" && player.locE == "0")
//         {   
//             monsterPresent();
//             addLine("You encounter a " + monster.type);
//         }

// }

function playerDamage(monster){
    damage = Math.floor(Math.random() * player.strength);
    monster.health -= damage;
    monster.health = Math.max(0, monster.health);
}

function monsterDamage(monster){
    damage = Math.floor(Math.random() * monster.strength);
    player.health -= damage;
    player.health = Math.max(0, player.health);

}


function playerAttack(monster)
{
    playerDamage(monster);
    addLine("You deal " + damage + " damage") 
    addLine("The " + monster.type + " has " + monster.health + " HP left")
    console.log(monster.health)
    gainExperience();
    currentStats(); 
}

function monsterAttack()
{
	let monster = monsterPresent();
	monsterDamage(monster);
    addLine("The " + monster.type + " dealt " + damage + " damage") 
    addLine("You have " + player.health + " HP left")
    console.log(monster.health)   
}

function gainExperience()
{
	let monster = monsterPresent();
	if (monster.health == 0) 
	{
		encounter = false;
		player.currExp =+ monster.experience;
		levelUp();
	}
}

function levelUp()
{
	if (player.currExp >= player.experience) 
	{
		player.level = player.level + 1;
	}
}


// function gameOver(){

// 	if (player.health == "0") 
// 	{
// 		player.locN = 0;
// 		player.locE = 0;
// 		player.experience -= 50;
// 	}
// }


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
//         damage = Math.floor(Math.random() * player.strength);
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



