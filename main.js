
const zooVocab = ["beautiful", "chirping", "brightly", "zoo", "numerous", "giraffes", "tigers", "lions", "penguins", "flamingos", "intriguing", "memorable"]
const campVocab = ["thunderstorm","fresh","clear","travel","campsite","vehicle","assigned","firewood","campfire","barbeque","supper","pitched","respective"]
const vocabulary = [zooVocab,campVocab]
const stories = ["zooStory", "campStory"]
const vocabularyString = ["zooVocab", "campVocab"]
var counter = 5
var vocabIndex = 0
var storyIndex = 0
var sec = 0
var min = 0
var t
var timer_is_on = false


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
	updateCount()
	updateVocab()
	resetTimer()
}

function Next() {
	storyIndex += 1
	document.getElementById(stories[storyIndex]).hidden = false
	document.getElementById(stories[storyIndex - 1]).hidden = true
	document.getElementById("enter").hidden = true
	document.getElementById("giveUp").hidden = true
	document.getElementById("restart").hidden = true
	document.getElementById("myInput").hidden = false
	refresh()
}

function Restart() {
	refresh()
	document.getElementById("restart").hidden = true
	document.getElementById("giveUp").hidden = true
	document.getElementById("myInput").hidden = false
}

function checkInputValue(inputElement) {
	return function() {
		startCount()
		if (counter < 2) {
			stopCount()
			document.getElementById("myInput").hidden = true
			document.getElementById("restart").hidden = false
			document.getElementById("giveUp").hidden = false
		}
		if (!vocabulary[storyIndex][vocabIndex].startsWith(inputElement.value)) {
			counter -= 1
			updateCount()
		} else if (inputElement.value === vocabulary[storyIndex][vocabIndex]) {
			unhide(String(vocabulary[storyIndex][vocabIndex]))
			if (inputElement.value === vocabulary[storyIndex][vocabulary[storyIndex].length - 1]) {
				stopCount()
				alert("Your score is: "+ min +" minutes "+ sec +" seconds. Press ok to close this popup. Click next story to continue.")
				document.getElementById("myInput").hidden = true
				document.getElementById("enter").hidden = false
			} else {
				vocabIndex += 1
				updateVocab()
			}
		}
	}
}







