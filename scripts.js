var srcLang = "eng";
var destLang = "rat";


$(document).ready(function(){
  // Swap src/dest languages with swap button
  $("#swap-lang").click(function(){
    $(".lang").toggleClass("selected");
    let x = srcLang;
    srcLang = destLang;
    destLang = x;
  })

  $("#translate-button").click(function(){
    let text = $(".source-lang-input").val();
    let outBox = $(".dest-lang-output");
    output = translate(srcLang, destLang, text)
    outBox.text(output);
    outBox.removeClass("placeholder");
  })
  console.log("setup complete");
});

// this function does the translation
function translate(src, dest, text) {
  console.log("Translating " + text + " from " + src + " to " + dest);
  text = sanitize(text).toLowerCase();
  if(src == "eng") {
    //(inelegant but hey)
    // for each key in the map match and replace with regex
    for([key, val] of engToRatMap) {
      text = text.replaceAll(key, val);
    }
  } else if (src == "rat") {
    //(inelegant but hey)
    // for each key in the map match and replace with regex
    for([key, val] of ratToEngMap) {
      text = text.replaceAll(key, val);
    }
  }
  return text;
}

//sanitize text
function sanitize(input) {
  // split input string on whitespace, preserving and grouping whitespace and newlines
  let words = input.split(/([ \t\r\v]+)/);
  // reduce whitespace groups to single space
  words = words.map(word => /[ \t\r\v]+/.test(word) ? " " : word);
  input = words.join('');

  // remove leading and trailing whitespace
  input = input.trim();
  return input;
}

// this map holds the english -> rationalist word mappings
const engToRatMap = new Map([
  [/\.(  |$)/g, ", or something."],
  ["from my perspective", "on priors,"],
  ["I'd guess", "my prior is"],
  ["confidence", "credence"],
  ["credible signal", "costly signal"],
  ["go-getting", "agentic"],
  ["ten times", "an order of magnitude"],
  ["her", "my model of her"],
  ["him", "my model of him"],
  ["them", "my models of them"]
]);

// this map holds the rationalist -> english word mappings
const ratToEngMap = new Map([
  [/(, )?or something\.?/g, "."],
  ["are like, ", "say"],
  ["my model says", "I think"],
  [/my models? of/g, "my understanding of"],
  ["on priors", "from my perspective"],
  ["my prior is", "I'd guess"],
  ["credence", "confidence"],
  ["costly signal", "credible signal"],
  ["agentic", "go-getting"],
  ["an order of magnitude", "ten times"]
]);
