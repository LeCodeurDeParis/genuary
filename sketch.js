let bot;
let userInput;
let outputDiv;

function preload() {
  bot = new RiveScript();

  bot.loadFile(["begin.rive", "dialogue.rive"]).then(botReady).catch(botError);
}

function setup() {
  noCanvas();
  userInput = select("#userInput");
  outputDiv = select("#chatbot-messages");
}

function botReady() {
  console.log("Bot prêt");
  bot.sortReplies();
}

function botError(err) {
  console.error("RiveScript error:", err);
}

function botChat() {
  let text = userInput.value();
  if (!text) return;

  createP("Vous : " + text)
    .class("user")
    .parent(outputDiv);

  bot.reply("local-user", text).then((reply) => {
    createP("Bot : " + reply)
      .class("bot")
      .parent(outputDiv);
    outputDiv.elt.scrollTop = outputDiv.elt.scrollHeight;
  });

  userInput.value("");
}
