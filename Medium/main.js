
const hikeVocab = ["magical","waterfall","mountains","challenge","climb","witness","glory","nature","sweat","muscle","soreness","crisp","bask","satisfaction"]

const vocabulary = [hikeVocab]
const stories = ["hikeStory"]
const vocabularyString = ["hikeVocab"]
const storyTitle = ["A Rewarding Hike"]


var counter = 5
var vocabIndex = 0
var storyIndex = 0
var sec = 0
var min = 0
var t
var timer_is_on = false
var score = 100
var mistakes = []
var shuffledVocab = shuffle(vocabulary[storyIndex])


window.onload = function() {

	let counts = document.getElementById("counter")
	let vocabs = document.getElementById("Vocab")

	let vocabing = document.getElementById(String(stories[storyIndex])); 
	let specialWords = vocabing.getElementsByTagName('span');

	for (let specialWord of specialWords) {
  		specialWord.ondragover = function(){allowDrop(event)}
  		specialWord.ondrop = function(){drop(event)} 
  		specialWord.style.color = function(){return blue}
	}

	counts.innerHTML = `${counter} Strikes`
	vocabs.innerHTML = vocabulary[storyIndex][vocabIndex]


	showTime()
	document.getElementById("storyTitle").innerHTML = `Story ${storyIndex + 1}: ${storyTitle[storyIndex]}`

	hide(vocabulary[storyIndex])

	let myInput = document.getElementById("myInput")

	myInput.addEventListener("input", checkInputValue(myInput))


	test()
}

function test() {
	for (let vocab of hikeVocab) {
		addTo("wordBox", vocab, "div")
	}
	document.getElementById("wordBox").hidden = false
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

function check(){

}

function addTo(id, word, tagId) {
	var tag = document.createElement(tagId);
   	var text = document.createTextNode(word);
   	tag.appendChild(text);
   	tag.id = `draggable-${word}`
   	tag.draggable = true
   	tag.ondragstart = function(){drag(event)}
   	var element = document.getElementById(id)
   	element.appendChild(tag)
}

function allowDrop(ev) {
  	ev.preventDefault();
  	ev.target.style.color = "blue"
}

function drag(ev) {
  	ev.dataTransfer.setData("text", ev.target.id)
}

function drop(ev) {
  	ev.preventDefault()
 	var data = ev.dataTransfer.getData("text")
 	ev.target.parentNode.replaceChild(document.getElementById(data), ev.target)
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
	var finalscore = score - ((min*60) + sec - 1) - ((5-counter)*5)
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
			// unhide(String(vocabulary[storyIndex][vocabIndex]))
			addTo("wordBox",vocabulary[storyIndex][vocabIndex],"div")
			if (textInput === vocabulary[storyIndex][vocabulary[storyIndex].length - 1]) { //Finished Story
				document.getElementById("Vocab").hidden = true 
				document.getElementById("myInput").hidden = true 
				document.getElementById("enter").hidden = true 
				document.getElementById("wordBox").hidden = false
				counter = 5
				stopCount()
				if (counter < 5){
					document.getElementById("oops").hidden = false
				}
				if (storyIndex === stories.length - 1) {
					// document.getElementById("goBackEnd").hidden = false 
					document.getElementById("giveUp").hidden = true 	
					document.getElementById("enter").hidden = true 
				}
				// if(element){
					// document.getElementById("check").hidden = false
					// 	stopCount()
					// 	document.getElementById("enter").hidden = false
					// 	showScore()
				// }
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










