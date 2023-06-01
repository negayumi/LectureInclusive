console.log("Content script loaded");

function replaceDemonstrativeDeterminers(content) {
  content = content.replace(/\bcèx\b/gi, 'cet');
  content = content.replace(/\bcet·te·s\b/gi, 'ces');
  return content;
}

function replaceDemonstrativePronouns(content) {
  content = content.replace(/\bcelleux\b/gi, 'ceux');
  content = content.replace(/\bcille\b/gi, 'celle');
  content = content.replace(/\bceus\b/gi, 'ceux');
  content = content.replace(/\bcellui\b/gi, 'celui');
  return content;
}

function replaceSubjectPronouns(content) {
  content = content.replace(/\biel\b/gi, 'il');
  content = content.replace(/\biels\b/gi, 'ils');
  return content;
}

function replaceObjectPronouns(content) {
  content = content.replace(/\bille\b/gi, 'elle');
  content = content.replace(/\beuxes\b/gi, 'eux');
  content = content.replace(/\belleux\b/gi, 'elles');
  return content;
}


function replacePossessiveDeterminers(content) {
  content = content.replace(/\bmaon\b/gi, 'mon');
  content = content.replace(/\btaon\b/gi, 'ton');
  content = content.replace(/\bsaon\b/gi, 'son');
  return content;
}

function replaceOthers(content) {
  content = content.replace(/\btoustes\b/gi, 'tous');
  content = content.replace(/\btouxes\b/gi, 'tous');
  return content;
}

function replaceMidpointWords(content) {
  // Si le 's' est précédé d'un point médian, conserver le 's' pour le pluriel
  content = content.replace(/(\b\w*·)s\b/gi, '$1s');

  // Supprime tout ce qui se trouve après le premier point médian (sauf le 's' de pluriel déjà géré)
  content = content.replace(/(\b\w*·)[^s]*\b/gi, '$1');
  
  // Supprime tous les points médians restants
  content = content.replace(/·/gi, '');
  return content;
}



function replaceInclusiveWriting(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let content = node.textContent;

    content = replaceDemonstrativeDeterminers(content);
    content = replaceDemonstrativePronouns(content);
    content = replaceSubjectPronouns(content);
    content = replaceObjectPronouns(content);
    content = replacePossessiveDeterminers(content);
    content = replaceOthers(content);
    content = replaceMidpointWords(content);
    
    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceInclusiveWriting(node.childNodes[i]);
    }
  }
}

replaceInclusiveWriting(document.body);