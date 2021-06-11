
  function loadStorage(sid = "") {
    data = window.localStorage.getItem("nodes" + sid);
    if(data) {
      data = JSON.parse(data);
    }
    else {
      data = {'nodes': []};
    }
  }

  function saveStorage(sid = "") {
    window.localStorage.setItem("nodes" + sid, JSON.stringify(data));
  }

  function purgeStorage(sid) {
    data = {'nodes': []};
    saveStorage(sid);
  }

  function processInput() {
    json = null;
    try {
      json = JSON.parse($("#in").val());
    }
    catch(e) {
      log(e);
    }

    if(json) {
      item = {'id': json.key, 'created': json.fields.created, 'history': [], 'drop': false, 'type': json.fields.issuetype.name};
      //console.log(json.id);
      //console.log(json);
      for(i = 0; i < json.changelog.histories.length;i++) {
        cl = json.changelog.histories[i];
        console.log(cl);
        if(transitions.includes(cl.items[0].field)) {
          item['history'].push({'type': cl.items[0].field, 'date': cl.created, 'from': cl.items[0].fromString, 'to': cl.items[0].toString});
        }
      }
      c = addOrUpdateItem(item);
      saveStorage();
      log("Item " + json.key + " updated, " + chg + " changes");
      drawTable();
    }
  }

  function getItem(key) {
    for(i = 0; i < data.nodes.length; i++) {
      if(data.nodes[i].id == key)
        return data.nodes[i];
    }
    return null;
  }

  function deleteItem(key) {
    for(i = 0; i < data.nodes.length; i++) {
      if(data.nodes[i].id == key)
        data.nodes.splice(i, 1);
    }
  }

  function setItem(item) {
    for(i = 0; i < data.nodes.length; i++) {
      if(data.nodes[i].id == item.id) {
        data.nodes[i] = item;
        return true;
      }
    }
    data.nodes.push(item);
  }

  function historyMatch(item, hist) {
    for(i = 0; i < item['history'].length; i++) {
      if(item['history'][i].type == hist.type && item['history'][i].date == hist.date)
        return true;
    }
    return false;
  }

  function addOrUpdateItem(item) {
    chg = 0;
    exItem = getItem(item.id);
    if(exItem) {
      exItem['type'] = item.type;
      // Merge data
      //console.log("Old item found - merging")
      for(i = 0; i < item['history'].length; i++) {
        hist = item['history'][i];
        if(!historyMatch(exItem, hist)) {
          exItem['history'].push(hist);
          chg++;
        }
      }
      setItem(exItem);
    }
    else {
      data.nodes.push(item);
    }

    return chg;
  }

  function validItem(item, hist) {
    console.log(item);
    console.log(hist);
    // Refactor this (crap)
    //
    if('drop' in item && item.drop)
      return false;
    //if(!hist.committed)
    //  return false;
    //if(dateDiff(hist.committed, hist.delivered) < 5)
    //  return false;
    return true;
  }

  function drop(key) {
    i = getItem(key);
    i['drop'] = true;
    setItem(i);
  }

  // Following code will need configuration / cleanup
  function getHistoryPoints(item) {
    hist = {'upstream': null, 'committed': null, 'test': null, 'delivered': null, 'deployed': null};
    for(j = 0; j < item.history.length; j++) {
      h = item.history[j];
      if(h.to == "Analysis" || h.to == "Analysis & Design")
        hist.upstream = h.date;
      if(!hist.committed && (h.to == "In Progress" || h.to == "In development" || h.to == "Ready for development")) {
        hist.committed = h.date;
        if(!hist.upstream)
          hist.upstream = h.date;
      }
      if(h.to == "Ready for testing" || h.to == "SIT" || h.to == "UAT") {
        if(hist.test == null || Date.parse(hist.test) <= Date.parse(h.date))
          hist.test = h.date;
      }
      if(h.to == "Ready for production")
        hist.delivered = h.date;
      if(h.to == "Done")
          hist.deployed = h.date;
    }
    return hist;
  }
