chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    var allSuggestions = [];
    chrome.tabs.query({currentWindow: true}, function(tabs){
      if(text === ""){
        for(var i = 0; i < tabs.length; i++){
          allSuggestions.push({content: tabs[i].title, description: tabs[i].title});
        }
      }else{
        var tabTitles = tabs.map(function(t) { return t.title; });
        var filteredTitleResults = fuzzy.filter(text, tabTitles);
        for(var j = 0; j < filteredTitleResults.length; j++){
            allSuggestions.push(
              {
                content: filteredTitleResults[j].string,
                description: filteredTitleResults[j].string
              });
        }
      }
      suggest(allSuggestions);
    });
  }
);

chrome.omnibox.onInputEntered.addListener(
  function(text) {
    chrome.tabs.query({currentWindow: true}, function(tabs){
      for(var i = 0; i < tabs.length; i++){
        if(text == tabs[i].title){
          chrome.tabs.update(tabs[i].id, {active: true});
        }
      }
    });
  }
);
