class creature{
    constructor(type, health, strength, gold, locN, locE, experience)
    {
        this.type = type;
        this.health = health;
        this.strength = strength;
        this.gold = gold;
        this.locN = locN;
        this.locE = locE;
        this.experience = experience;
    }
}


class monsters extends creature{
    constructor(type, health, strength, gold, locN, locE, experience){
        super(type, health, strength, gold, locN, locE, experience);
    }

}

class player extends creature{
        constructor(type, health, strength, gold, locN, locE, experience, currHealth, mana,currMana, vitality,dexterity,intelligence, currExp){
            super(type, health, strength, gold, locN, locE, experience);
            this.currHealth = currHealth;
            this.mana = mana;
            this.currMana = currMana;
            this.vitality = vitality;
            this.dexterity = dexterity;
            this.intelligence = intelligence;
            this.currExp = currExp;
        }
}

let warrior = new player('Warrior', '30', '15', '30', '0', '0', '20', '30', '10', '10', '12', '8', '5', '0');
let slime = new monsters ('Slime', '20', '10', '5', '1', '0', '10');
let rat = new monsters('Rat', '10', '5', '5', '2', '0', '10');

let a = [slime, rat]
console.log(a);





// let monsters = [{
//     type: "slime",
//     health: "20",
//     strength: "10",
//     experience: 10,
//     gold: "5",
//     locN: 1,
//     locE: 0,
// }, {
//     type: "rat",
//     health: "10",
//     strength: "5",
//     experience: "6",
//     gold: "5",
//     locN: 2,
//     locE: 0
// }]


// let warrior = {
// 	level: 1,
//     health: "30",
//     currHealth: "30",
//     mana: "10",
//     currMana: "10",
//     strength: "15",
//     vitality: "12",
//     dexterity: "8",
//     intelligence: "5",
//     experience: 20,
//     currExp: 0,
//     gold: "20",
//     locN: 0,
//     locE: 0
// }


let encounter = false;


//overal comments neerzetten.

/*function for adding text lines*/

//adds lines on every new line

window.onload = currentStats;



function currentStats()
{

	document.getElementById("level").innerHTML = "Level: " + warrior.level;
	document.getElementById("healthPool").innerHTML = "HP: " + warrior.currHealth + "/" + warrior.health;
	document.getElementById("manaPool").innerHTML = "MP: " + warrior.currMana + "/" + warrior.mana;
	document.getElementById("experienceBar").innerHTML = "EXP: " + warrior.currExp + "/" + warrior.experience ;
	document.getElementById("progressHP").max = warrior.health;
	document.getElementById("progressHP").value = warrior.currHealth;
	document.getElementById("progressMP").max = warrior.mana;
	document.getElementById("progressMP").value = warrior.currMana;

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
    for (let i = 0; i < a.length; i++) 
    {
        let monster = a[i];

        if (monster.locN ==  warrior.locN && monster.locE ==  warrior.locE ) 
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
                warriorAttack(monster);
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
            warrior.locN++;
            break;
        case "EAST":
            movementText = "You moved East";
            warrior.locE++;
            break
        case "SOUTH":
            movementText = "You moved South";
            warrior.locN--;
            break
        case "WEST":
            movementText = "You moved West";
            warrior.locE--;
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
     warrior.locN++;
    addLine(movementText);
}

function moveE(){
	movementText = "You moved East";
     warrior.locE++;
    addLine(movementText);
}

function moveS(){
	movementText = "You moved South";
     warrior.locN--;
    addLine(movementText);
}

function moveW(){
	movementText = "You moved West";
     warrior.locE--;
    addLine(movementText);
}


function warriorDamage(monster){
    damage = Math.floor(Math.random() * warrior.strength);
    monster.health -= damage;
    monster.health = Math.max(0, monster.health);
}

function monsterDamage(monster){
    damage = Math.floor(Math.random() * monster.strength);
    warrior.currHealth -= damage;
    warrior.currHealth = Math.max(0, warrior.currHealth);
    //document.getElementById("progress").value = warrior.currHealth;
}


function warriorAttack(monster)
{
    warriorDamage(monster);
    addLine("You deal " + damage + " damage") 
    addLine("The " + monster.type + " has " + monster.health + " HP left")

    if (monster.health == 0) {
    	    gainExperience();
            monsterDamage() = false;
            ;

    }

        document.getElementById("manaPool").innerHTML = "MP: " + warrior.currMana + "/" + warrior.mana;
        document.getElementById("progressMP").value = warrior.currMana;
}

function monsterAttack()
{
	let monster = monsterPresent();
	monsterDamage(monster);
    addLine("The " + monster.type + " dealt " + damage + " damage") 
    addLine("You have " + warrior.currHealth + " HP left")
    document.getElementById("healthPool").innerHTML = "HP: " + warrior.currHealth + "/" + warrior.health;
    document.getElementById("progressHP").value = warrior.currHealth;  
}


function levelUp()
{
    if (warrior.currExp >= warrior.experience) 
    {
        addLine("Congratulations you leveled up!")
        warrior.level = warrior.level + 1;
            document.getElementById("level").innerHTML = "Level: " + warrior.level;
        warrior.experience = warrior.experience + 100;
        warrior.health + 5;
    }

}

function gainExperience()
{
	let monster = monsterPresent();
	if (monster.health == 0) 
	{
		addLine("The " + monster.type + " has died, you gained " + monster.experience + " experience!") 
		encounter = false;
		warrior.currExp += monster.experience;
		levelUp();
        console.log(warrior.currExp);
        document.getElementById("experienceBar").innerHTML = "EXP: " + warrior.currExp + "/" + warrior.experience ;
	}
}




// function gameOver(){

// 	if (warrior.currHealth == "0") 
// 	{
// 		warrior.locN = 0;
// 		warrior.locE = 0;
// 		warrior.experience -= 50;
// 	}
// }


	console.log(warrior.currExp)

    console.log(warrior.locN, warrior.locE);
    console.log(encounter);



