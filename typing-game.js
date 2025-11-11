const words = [
    "firewall", "malware", "encryption", "phishing", "ransomware", "trojan", "botnet", "vulnerability",
    "threat", "patch", "authentication", "authorization", "backup", "forensics", "compliance", "cyberattack",
    "penetration", "intrusion", "payload", "exploit", "sandbox", "hashing", "decryption", "privilege",
    "breach", "keylogger", "protocol", "tokenization", "honeypot", "loganalysis", "incidentresponse",
    "networksegmentation", "endpointsecurity", "threatintelligence", "cyberdefense", "virus", "worm",
    "spyware", "adware", "intrusiondetection", "dataprotection", "firewalldefense", "securityaudit",
    "riskmanagement", "databreach", "cybersecurity", "cyberthreat", "accesscontrol", "vulnerabilityscan",
    "password", "cryptography", "digitalforensics", "cyberwarfare"
  ];
  
  
let currentWord = "";
let wordCount = 0;
let charCount = 0; // NEW
let startTime;
let gameDuration = 60; // default seconds

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const startBtn = document.getElementById("start-btn");
const resultDiv = document.getElementById("result");
const timeSelect = document.getElementById("time-select");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
  wordCount = 0;
  charCount = 0; // reset character count
  wordInput.value = "";
  resultDiv.textContent = "";
  startBtn.disabled = true;
  wordInput.disabled = false;
  wordInput.focus();

  gameDuration = parseInt(timeSelect.value);

  currentWord = getRandomWord();
  wordDisplay.textContent = currentWord;

  wordInput.addEventListener("input", checkInput);
  setTimeout(endGame, gameDuration * 1000);
}

function checkInput() {
  if (wordInput.value.trim() === currentWord) {
    wordCount++;
    charCount += currentWord.length; // add characters typed
    wordInput.value = "";
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
  }
}

function endGame() {
  wordInput.removeEventListener("input", checkInput);
  wordInput.disabled = true;
  startBtn.disabled = false;

  const minutes = gameDuration / 60;
  const wpm = Math.round(charCount / 5 / minutes);

  resultDiv.textContent = `Time's up! You typed ${wordCount} words correctly (${charCount} characters). WPM: ${wpm}`;
}

startBtn.addEventListener("click", startGame);
