function onlyAtoZ(sentence) {
  return sentence.toLowerCase().replace(/[^a-zA-Z0-9_]+/g, "");
}

module.exports = onlyAtoZ;
