let monsters = [{
    type: "slime",
    health: "20",
    strength: "10",
    experience: "20",
    gold: "5",
    locN: 1,
    locE: 0,
}, {
    type: "rat",
    health: "10",
    strength: "5",
    experience: "6",
    gold: "5",
    locN: 2,
    locE: 0
}]


let player = {
	level: 1,
    health: "30",
    currHealth: "30",
    mana: "10",
    currMana: "10",
    strength: "15",
    vitality: "12",
    dexterity: "8",
    intelligence: "5",
    experience: 20,
    currExp: "0",
    gold: "20",
    locN: 0,
    locE: 0
}


let encounter = false;


//overal comments neerzetten.

/*function for adding text lines*/

//adds lines on every new line

window.onload = currentStats;



function currentStats()
{

	document.getElementById("level").innerHTML = "Level: " + player.level;
	document.getElementById("healthPool").innerHTML = "HP: " + player.currHealth + "/" + player.health;
	document.getElementById("manaPool").innerHTML = "MP: " + player.currMana + "/" + player.mana;
	document.getElementById("experienceBar").innerHTML = "EXP: " + player.currExp + "/" + player.experience ;
	document.getElementById("progressHP").max = player.health;
	document.getElementById("progressHP").value = player.currHealth;
	document.getElementById("progressMP").max = player.mana;
	document.getElementById("progressMP").value = player.currMana;

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

        if (monster.locN ==  player.locN && monster.locE ==  player.locE ) 
        {
            //addLine("You encounter a " + monster.type);
            encounter = true;
            return monster;
        }
    }
    return false;
}





//main function for our game.
document.getElementById("myBtn").addEventListener("click", action);
document.getElementById("moveN").addEventListener("click", moveN);
document.getElementById("moveE").addEventListener("click", moveE);
document.getElementById("moveS").addEventListener("click", moveS);
document.getElementById("moveW").addEventListener("click", moveW);

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
                document.getElementById("healthPool").innerHTML = "HP: " + player.currHealth + "/" + player.health;
                document.getElementById("progressHP").value = player.currHealth;
                document.getElementById("manaPool").innerHTML = "MP: " + player.currMana + "/" + player.mana;
                document.getElementById("progressMP").value = player.currMana;

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
            player.locN++;
            break;
        case "EAST":
            movementText = "You moved East";
            player.locE++;
            break
        case "SOUTH":
            movementText = "You moved South";
            player.locN--;
            break
        case "WEST":
            movementText = "You moved West";
            player.locE--;
            break;
        default:
            movementText = "Which direction do you want to go?"
    }
    
    addLine(movementText);

    let monster = monsterPresent();
    if (monster) 
    {
        addLine("You encounter a " + monster.type);
    }
 

}

function moveN(){
	movementText = "You moved North";
     player.locN++;
    addLine(movementText);
}

function moveE(){
	movementText = "You moved East";
     player.locE++;
    addLine(movementText);
}

function moveS(){
	movementText = "You moved South";
     player.locN--;
    addLine(movementText);
}

function moveW(){
	movementText = "You moved West";
     player.locE--;
    addLine(movementText);
}


function playerDamage(monster){
    damage = Math.floor(Math.random() * player.strength);
    monster.health -= damage;
    monster.health = Math.max(0, monster.health);
}

function monsterDamage(monster){
    damage = Math.floor(Math.random() * monster.strength);
    player.currHealth -= damage;
    player.currHealth = Math.max(0, player.currHealth);
    //document.getElementById("progress").value = player.currHealth;

}


function playerAttack(monster)
{
    playerDamage(monster);
    addLine("You deal " + damage + " damage") 
    addLine("The " + monster.type + " has " + monster.health + " HP left")

    if (monster.health == 0) {
    	    gainExperience();
  	   
    }


}

function monsterAttack()
{
	let monster = monsterPresent();
	monsterDamage(monster);
    addLine("The " + monster.type + " dealt " + damage + " damage") 
    addLine("You have " + player.currHealth + " HP left")   
}

function gainExperience()
{
	let monster = monsterPresent();
	if (monster.health == 0) 
	{
		addLine("The " + monster.type + " has died, you gained " + monster.experience + " experience!") 
		encounter = false;
		player.currExp =+ monster.experience;
		levelUp();
	}
}



function levelUp()
{
	if (player.currExp >= player.experience) 
	{
		addLine("Congratulations you leveled up!")
		player.level = player.level + 1;
		player.experience = player.experience + 100;
		player.health + 5;
	}

}


// function gameOver(){

// 	if (player.currHealth == "0") 
// 	{
// 		player.locN = 0;
// 		player.locE = 0;
// 		player.experience -= 50;
// 	}
// }


	console.log(player.experience)

    console.log(player.locN, player.locE);
    console.log(encounter);



