
const zooVocab = ["beautiful", "chirping", "brightly", "zoo", "numerous", "giraffes", "tigers", "lions", "penguins", "flamingos", "intriguing", "memorable"]
const campVocab = ["thunderstorm","fresh","clear","travel","campsite","vehicle","assigned","firewood","campfire","barbeque","supper","pitched","respective"]
const poleVocab = ["competition","frightened","comfort","zone","attend","tournament","myriad","sculpted","greek","goddesses","starstruck","giddy","excitement","satisfied"]
const catVocab = ["morning","grooming","startled","servants","nerve","breakfast","consuming","intake","regular","massage","forget","remind","long","reminder","swipe","claws","parents","kitty"]
const halloweenVocab = ["spooky","chilled","summon","courage","muster","somersault","haunted","mansion","bragging","actually","goosebumps","towards","nauseous","stumbled","backwards","coward","puking","shrugged","house","candies"]
const catTwoVocab = ["humans","ignored","irk","reaction","screaming","typically","tonight","mama","master","rummage","trashcan","blame","fail","apparently","asleep","executed","interrogate","contact","effective","suspicions","revenge"]
const cat3Vocab = ["constantly","kitten","nutrition","vitamins","shiny","energy","hunt","natural","predator","destined","retain",'nightly',"mice","designated","prey","tummy","rumbling","chow","gourmet","chef"]
const rollerVocab = ["adrenaline","veins","breath","throat","rammed","lungs","scream","oxygen","amusement","intestines","shakily","vowed","rollercoasters","peer","pressure"]


const vocabulary = [zooVocab,campVocab,poleVocab,catVocab,halloweenVocab,catTwoVocab,cat3Vocab,rollerVocab]
const stories = ["zooStory", "campStory","poleStory","catStory","halloweenStory","catStoryTwo","catStory3","rollerStory"]
const vocabularyString = ["zooVocab", "campVocab","poleVocab","catVocab","halloweenVocab","catTwoVocab","cat3Vocab","rollerVocab"]
const storyTitle = ["A day at the zoo","Camping Trip","Exploration of Pole Dancing","Meowy's Diary Page 1","Halloween Braggart","Meowy's Diary Page 2","Meowy's Diary Page 3","Horrifying loops, dips and turns"]


var counter = 5
var vocabIndex = 0
var storyIndex = 0
var sec = 0
var min = 0
var t
var timer_is_on = false
var score = 100
var mistakes = []


window.onload = function() {

	let counts = document.getElementById("counter")
	let vocabs = document.getElementById("Vocab")

	counts.innerHTML = `${counter} Strikes`
	vocabs.innerHTML = vocabulary[storyIndex][vocabIndex]
	showTime()
	document.getElementById("storyTitle").innerHTML = `Story ${storyIndex + 1}: ${storyTitle[storyIndex]}`

	hide(vocabulary[storyIndex])

	let myInput = document.getElementById("myInput")

	myInput.addEventListener("input", checkInputValue(myInput))

}

function unhide(id) {
	document.getElementById(id).innerHTML = id
}

function hide(vocab) {
	vocab.forEach(element => 
		document.getElementById(element).innerHTML = `&nbsp;`.repeat(element.length + 1))
}

function updateVocab() {
	document.getElementById("Vocab").innerHTML = vocabulary[storyIndex][vocabIndex]
	document.getElementById("myInput").value = ""
}

function updateCount() {
	document.getElementById("counter").innerHTML = `${counter} Strikes`
	document.getElementById("myInput").value = ""
}

function resetTimer() {
	sec = 0
	min = 0
	showTime()
}

function showTime() {
	document.getElementById("timer").innerHTML = `Timer: You're at ${min} minutes ${sec} seconds`
}

function timedCount() {
	if(sec === 60){
		min +=1
		sec = 0
	}
	showTime()
   	sec += 1;
  	t = setTimeout(timedCount, 1000);
}

function startCount() {
  if (!timer_is_on) {
    timer_is_on = true;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  timer_is_on = false;
}

function refresh() {
	hide(vocabulary[storyIndex])
	counter = 5
	vocabIndex = 0
	score = 100
	mistakes.length = 0
	updateCount()
	updateVocab()
	resetTimer()
	document.getElementById("giveUp").hidden = true
	document.getElementById("restart").hidden = true
	document.getElementById("myInput").hidden = false
	document.getElementById("score").hidden = true
	document.getElementById("oops").hidden = true
	document.getElementById("mistakes").hidden = true
	document.getElementById("storyTitle").innerHTML = `Story ${storyIndex + 1}: ${storyTitle[storyIndex]}`
	document.getElementById("goBack").hidden = true
	document.getElementById("goBackEnd").hidden = true
}

function next() {
	storyIndex += 1
	document.getElementById(stories[storyIndex]).hidden = false
	document.getElementById(stories[storyIndex - 1]).hidden = true
	document.getElementById("enter").hidden = true
	refresh()
}

function showScore() {
	var finalscore = score - Math.floor(((min*60) + sec - 1)/3) - ((5-counter)*5)
	document.getElementById("score").hidden = false
	document.getElementById("score").innerHTML = `Your Score is: ${finalscore}!`
}

function showMistakes() {
	document.getElementById("mistakes").hidden = false
	document.getElementById("mistakes").innerHTML = `Your typos were: ${mistakes}`
}

function firstPage() {
	document.getElementById(stories[storyIndex]).hidden = true
	document.getElementById(stories[0]).hidden = false
	storyIndex = 0
	refresh()
}

function checkInputValue(inputElement) {
	return function() {
		startCount()
		let textInput = inputElement.value
		if (!vocabulary[storyIndex][vocabIndex].startsWith(textInput) || textInput === " ") {
			counter -= 1
			updateCount()
			mistakes.push(textInput)
		}else if (textInput === vocabulary[storyIndex][vocabIndex]) {
			unhide(String(vocabulary[storyIndex][vocabIndex]))
			if (textInput === vocabulary[storyIndex][vocabulary[storyIndex].length - 1]) { //Finished Story
				stopCount()
				document.getElementById("myInput").hidden = true 
				document.getElementById("enter").hidden = false 
				showScore()
				if (counter < 5){
					document.getElementById("oops").hidden = false
				}
					if (storyIndex === stories.length - 1) {
					document.getElementById("goBackEnd").hidden = false 
					document.getElementById("giveUp").hidden = true 	
					document.getElementById("enter").hidden = true 
				}
			} else {
				vocabIndex += 1
				updateVocab()
			}
		}
		if (counter === 0) {
			stopCount()
			document.getElementById("myInput").hidden = true
			document.getElementById("restart").hidden = false
			document.getElementById("giveUp").hidden = false

			if (storyIndex === stories.length - 1) {
				document.getElementById("goBack").hidden = false 
				document.getElementById("giveUp").hidden = true 	
			}
		}
	}
}










