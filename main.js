
const zooVocab = ["beautiful", "chirping", "brightly", "zoo", "numerous", "giraffes", "tigers", "lions", "penguins", "flamingos", "intriguing", "memorable"]
const campVocab = ["thunderstorm","fresh","clear","travel","campsite","vehicle","assigned","firewood","campfire","barbeque","supper","pitched","respective"]
const poleVocab = ["competition","frightened","comfort","zone","attend","tournament","myriad","sculpted","greek","goddesses","starstruck","giddy","excitement","satisfied"]
const catVocab = ["morning","grooming","startled","servants","nerve","breakfast","consuming","intake","regular","massage","forget","remind","long","reminder","swipe","claws","parents","kitty"]

const vocabulary = [zooVocab,campVocab,poleVocab,catVocab]
const stories = ["zooStory", "campStory","poleStory","catStory"]
const vocabularyString = ["zooVocab", "campVocab","poleVocab","catVocab"]


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
}

function Next() {
	storyIndex += 1
	document.getElementById(stories[storyIndex]).hidden = false
	document.getElementById(stories[storyIndex - 1]).hidden = true
	document.getElementById("enter").hidden = true
	refresh()
}

function showScore() {
	var finalscore = score - ((min*60) + sec - 1) - ((5-counter)*5)
	document.getElementById("score").hidden = false
	document.getElementById("score").innerHTML = `Your Score is: ${finalscore}!`
}

function showMistakes() {
	document.getElementById("mistakes").hidden = false
	document.getElementById("mistakes").innerHTML = `Your typos were: ${mistakes}`
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
			if (textInput === vocabulary[storyIndex][vocabulary[storyIndex].length - 1]) {
				stopCount()
				document.getElementById("myInput").hidden = true 
				document.getElementById("enter").hidden = false 
				showScore()
				document.getElementById("oops").hidden = false
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
		}
	}
}







