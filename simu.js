gGraph = null;
graphSetColor = ["#FE938C" ,"#9CAFB7", "#D6DBB2", "#E24E1B", "#DB995A", "#A5CBC3", "#85CB33", "#100B00"];

result = {'days': 0, 'tasks': 0, 'first': 0, 'team': 0, 'capacity': 0, 'utilization': 0, 'factor': 0, 'cost': 0, 'dayInProgress': []};

function Task(idx, size) {
  this.id = idx;
  this.type = 'task';
  this.style = '';
  this.label = '';
  this.log = new Array();
  this.daysLeft = size;
  this.totalWork = size;
  this.startDay = 0;
  this.colDone = new Array();
  this.addToLog = function(wf) {
    this.log.push(wf);
  };
  this.getStatus = function() {
    cx = "";
    last = this.colDone[this.colDone.length - 1];
    return "id:" + this.id + " begin:" + this.startDay + " leadtime:" + (last - this.startDay) + " worktime:" + this.totalWork + " flowEff:" + Math.round((this.totalWork / (last - this.startDay)) * 100) + "%";
  }
  this.setMoreWork = function(size) {
    this.daysLeft = size;
    this.totalWork += size;
  }
}

$(window).keypress(function(e) {
    if (e.which === 32) {
        if(simu.status == 'run')
          pauseSimulation();
        else if(simu.status == 'pause')
          startSimulation();
    }
});

function setupSimulation() {
  $('.columns').empty();

  // Show team setup
  $('#team').html('<img src="http://webxity.com/wp-content/uploads/2015/08/bootwise-icon-02.png" style="width:30px;vertical-align:middle;margin-right:4px" /><strong>Team</strong>&nbsp;&nbsp;&nbsp;');
  for(i in simu.team) {
    if(simu.team[i] > 0)
      $('#team').append('<span>' + i + ' ' + simu.team[i] + '</span>&nbsp;&nbsp;');
  }

  for(i = 0; i < simu.workflow.length; i++) {
    $('.columns').append('<div class="column ' + simu.style + '" id="' + simu.workflow[i].id  + '"><div class="info">&nbsp;</div><div class="in">&nbsp;</div><div class="out">&nbsp;</div><div class="wait">&nbsp;</div><div class="counter">&nbsp;</div></div>');

    if(simu.workflow[i].wip && simu.workflow[i].wip > 0) {
      $('#' + simu.workflow[i].id + ' .info').html('<strong>' + simu.workflow[i].name + '</strong> (<span class="wip" contenteditable="true">' + simu.workflow[i].wip + '</span>)');
    }
    else {
      simu.workflow[i].wip = 15;
      $('#' + simu.workflow[i].id + ' .info').html('<strong>' + simu.workflow[i].name + '</strong> <span class="wip" contenteditable="true">&nbsp;</span>');
    }
    //$('#' + simu.workflow[i].id + ' .info').html('<span class="label">&nbsp;</span> ppl <span class="cap" contenteditable="true">&nbsp;</span> lt <span class="lt" contenteditable="true">&nbsp;</span> wip (<span class="wip" contenteditable="true">&nbsp;</span>)');
    //$('#' + simu.workflow[i].id + ' .label').html(simu.workflow[i].name);
    //$('#' + simu.workflow[i].id + ' .cap').html(simu.workflow[i].cap);
    //$('#' + simu.workflow[i].id + ' .wip').html(simu.workflow[i].wip);
    //lt = (simu.workflow[i].lt > 0 ? simu.workflow[i].lt : 0);
    if(!(simu.workflow[i].lt > 0))
      simu.workflow[i].lt = 0;
    //$('#' + simu.workflow[i].id + ' .lt').html(lt);
    $('#' + simu.workflow[i].id + ' .counter').html('0');
    $('#' + simu.workflow[i].id + ' .wait').html('0%');

    //tm = 0;
    //if(simu.team[simu.workflow[i].name] > 0)
    //  tm = simu.team[simu.workflow[i].name];
    //$('#' + simu.workflow[i].id + ' .cap').html(tm);
  }
}

function resetSimulation() {
  // Empty columns
  simu.status = 'stop';
  simu.tick = 0;
  simu['newId'] = 0;

  resetQueues();
  resetResult();

  $('.postit').remove();
}

function startSimulation() {
  // Read all simulation values
  if(simu.status == 'stop') {
    resetSimulation();
  }
  simu.status = 'run';

  // TODO: see how we pick up values from gui (currently disabled)
  /*for(i = 0; i < simu.workflow.length; i++) {
    simu.workflow[i].wip = parseInt($('#' + simu.workflow[i].id + ' .wip').html());
    simu.workflow[i].lt = parseInt($('#' + simu.workflow[i].id + ' .lt').html());
    simu.workflow[i].cap = parseInt($('#' + simu.workflow[i].id + ' .cap').html());
  }*/

  setTimeout(timer, simu.speed);
}

function pauseSimulation() {
  simu.status = 'pause';
}

function stopSimulation() {
  // Calc results
  result.days = simu.tick;
  result.tasks = lastColumn().out.length;
  result.team = 0;

  for(i in simu.team)
    result.team += simu.team[i];

  result.utilization = (result.capacity / (result.team * result.days)).toFixed(2);
  result.factor = (result.factor / (result.team * result.days)).toFixed(2);
  result.cost = (simu.costDay * result.days * result.team).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  color = (isSimuDone() ? '#999' : 'red');

  simLog('<div style="clear:both">' + simu.desc + '</div><div style="color:' + color + '"">' + result.days + "</div><div>" + result.tasks +
         "</div><div>" + result.team + "</div><div>" + result.utilization + "</div><div>" +
         result.factor + "</div><div>" + result.cost + "</div>");
  //<div>" + result.first + "</div>

  renderGraph();

  resetResult();
  resetQueues();

  simu.tick = -1;
  simu.status = 'stop';
}

function getDoneAverages() {
  // Get avg leadtime and flow eff
  for(t in lastColumn().out) {
    //
  }
}

function timer() {
  if(simu.tick != -1 && simu.status == 'run') {
    tickSimulation();
    if(!isSimuDone())
      setTimeout(timer, simu.speed);
    else
      stopSimulation();
  }
  $('#count').html(simu.tick);
}

function tickSimulation() {
  if(simu.tick == simu.refresh.tickMod || simu.tick % simu.refresh.tickMod == 0) {
    // Time to refresh
    addTasks();
  }

  // Calculate progress in column
  for(i = simu.workflow.length - 1; i >= 0; i--) {
    col = simu.workflow[i];
    //console.log("Selected " + col + " " + i);
    visuShowCount(col, col.in.length + col.out.length);

    nextCol = (i + 1 < simu.workflow.length ? simu.workflow[i + 1] : false);
    moveLimit = 999; // No limit to number of tasks we transition in one tick

    while(moveLimit-- > 0 && col.out.length > 0 && nextCol && nextCol.in.length < nextCol.wip) {
      t = col.out.shift();
      if(Array.isArray(t)) console.log("A array");
      //console.log("out" + JSON.stringify(t));
      t.setMoreWork(nextCol.lt);// + (nextCol.in.length / 10 * nextCol.lt);

      if(simu.workFactor.taskVariation != 1) {
        modifier = Math.floor(Math.random() * t.daysLeft * simu.workFactor.taskVariation) - (t.daysLeft / 2 * simu.workFactor.taskVariation);
        //console.log(t.daysLeft + " " + modifier);
        t.daysLeft += modifier;
      }

      t.addToLog(col.name + " workload " + t.daysLeft);

      t.moveDay = simu.tick;
      t.colDone[i] = simu.tick;

      // TODO transition action
      if(simu.transition.action && simu.transition.action == "split") {
        // Find way to split task, assign a sub ID, a random common color?
        // Ensure not to infinitely split tasks (next tick)
        //
      }
      if(simu.transition.action && simu.transition.action == "merge") {
        // Find way to collect all with same family of ID and only when *all complete* merge into a new task, then transition
      }

      nextCol.in.push(t); // TAX? + (nextCol.tDays * (nextCol.in.length / 10)));
      visuTransitionNote(t, col, nextCol);
    }
    //if(!nextCol && result.first == 0) {
    //  console.log("First " + i + " " + simu.workflow.length + " " + nextCol);
    //  result.first = simu.tick;
    //}

    // TODO: refactor, we burn down based on total team, then within the columns
    // TODO: Implemented the shared team (common)
    // TODO: Add possibility to block and unblock

    if(col.in.length > 0) {
      // Number of work days capacity to deliver this day
      team = (simu.team[col.name] > 0 ? simu.team[col.name] : 0);
      wd = Math.min(Math.min(team, col.in.length), col.wip);
      result.capacity += wd;
      // Work factor, decreases as team size increases, 0-1.0 where 1.0 = 100% efficient
      wf = 1.0;
      if(simu.workFactor.sizeTax == 'loga')
        wf = (wd > 1 ? 1 / Math.log(wd + 1) : 1.0);
      //console.log(wd + ' ' + wf);

      visuShowWait(col, Math.round(100 * (1 - wf)));

      //console.log(col.id + " " + team + " " + wd);

      result.factor += (wd * wf);
      for(j = 0; j < wd; j++) {
        tx = Math.floor(Math.random() * Math.min(col.in.length, col.wip));
        t = col.in[tx];
        //if(Array.isArray(t)) console.log("B array");
        t.daysLeft -= wf;
        //console.log(JSON.stringify(t));

        visuWorkNote(t); //, tx, col.in[tx]);
      }
      for(j = col.in.length - 1; j >= 0; j--) {
        if(col.in[j].daysLeft <= 0.0) {
          t = col.in.splice(j, 1)[0];
          col.out.push(t);
          visuBurnNote(t, col);
        }
      }
    }
  }

  // Count everything in progress this days
  result.dayInProgress[simu.tick] = {x: simu.tick, y: getCountInProgress()};

  simu.tick++;
}

function tickSimulationFeatureban() {
  // TODO: implement featureban simulator? - why?
  //simu.workflow
}
/*function getCapacity(team, task) {
  cap = 0;
  for(t in team) {
    cap += team[t];
  }
}*/

function lastColumn() {
  return simu.workflow[simu.workflow.length - 1];
}

function getCountInProgress() {
  cnt = 0;
  for(i = 1; i < (simu.workflow.length - 1); i++) {
    cnt += simu.workflow[i].in.length + simu.workflow[i].out.length;
  }
  return cnt;
}

function resetResult() {
  for(x in result)
    result[x] = 0;

  result.dayInProgress = new Array();
}

function resetQueues() {
  for(i = 0; i < simu.workflow.length; i++) {
    simu.workflow[i].in = new Array();
    simu.workflow[i].out = new Array();
  }
}

function isSimuDone() {
  if(simu.tick >= simu.refresh.time)
    return true;
  num = 0;
  for(i = 0; i < simu.workflow.length; i++) {
    num += simu.workflow[i].in.length;
    if(i < simu.workflow.length - 1)
      num += simu.workflow[i].out.length;
  }
  return (num == 0);
}

function addTasks() {
  for(i = 0; i < simu.refresh.size; i++) {
    t = new Task(simu.newId++, simu.workflow[0].lt);
    t.startDay = simu.tick;
    t.style = simu.style;
    if(i == 0)
      t.label = 'first';
    if(i == simu.refresh.size -1)
      t.label = 'last';
    simu.workflow[0].in.push(t);
    visuNewNote(t, simu.workflow[0], 'in');
  }
}

function updateColumn(col) {
  //$('#' + col.id).html('in: ' + col.in.length + ' out:' + col.out.length);
}

/*function propsToString(props) {
  st = "";
  for(p in props)
    if(!(typeof props[p] === "function"))
      st += p + ":" + props[p] + "\n";
  return st;
}*/

function visuNewNote(t, col, inout) {
  // Visualize a new note'
  $('#' + col.id + ' .' + inout).append('<div id="t' + t.id + '" class="postit ' + t.style + ' ' + t.label + '" title="' + t.getStatus() + '">' + Math.floor(t.daysLeft) + '</div>').fadeIn('slow');
}

function visuBurnNote(t, col) {
  $($('#t' + t.id)[0]).remove();
  visuNewNote(t, col, 'out');
}

function visuTransitionNote(t, colA, colB) {
  $('#t' + t.id).remove();
  visuNewNote(t, colB, 'in');
  //$('#' + colB.id + ' .in').append('<div class="postit">' + colB.tDays + '</div>').fadeIn('slow');
}

function visuWorkNote(t) {
  $('#t' + t.id).html(Math.round(t.daysLeft));
}

function visuShowCount(col, cnt) {
  $('#' + col.id + ' .counter').html(cnt);
}

function visuShowWait(col, wait) {
  //wt = Math.round((result.factor / result.capacity) * 100);
  $('#' + col.id + ' .wait').html(wait + '%');

}

function simLog(msg) {
  $('#simuout').append(msg);
}

function renderGraph() {
  arr = new Array();

  for(i = 0; i < lastColumn().out.length; i++) {
    t = lastColumn().out[i];
    start = 999;
    end = 0;
    for(c in t.colDone) {
      if(t.colDone[c] < start)
        start = t.colDone[c];
      if(t.colDone[c] > end)
        end = t.colDone[c];
    }
    arr.push(end - start);
  }
  arr.sort(sortNumber);

  data = new Array();
  min = arr[0];
  max = arr[arr.length - 1];
  div = Math.floor((max - min) / 10.0);

  for(i = 0; i < 10; i++) {
    mi = min + (div * i);
    ma = min + (div * i) + div;
    cn = 0;
    for(j = 0; j < arr.length; j++) {
      if(arr[j] >= mi && arr[j] <= ma)
        cn += 1;
    }
    data.push({x: mi, y: cn});
 }

 //graphcanvas
 $("#graph").show();
 var ctx = document.getElementById("graphcanvas").getContext('2d');
 if(gGraph == null) {
   gGraph = new Chart(ctx, {
      type: 'bubble',
      data: {
          datasets: [{
              label: simu.desc,
              data: data,
              backgroundColor: graphSetColor.pop()
          },
          {
              label: "In progress",
              data: result.dayInProgress,
              backgroundColor: "#DDDDDD",
              radius: 1
          },
        ]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }]
          }
      }
  });
}
else {
  // Update graphed
  gGraph.data.datasets.push({label: simu.desc, data: data, backgroundColor: graphSetColor.pop()});
  gGraph.data.datasets.push({label: "In progress (" + simu.desc + ")", data: result.dayInProgress, backgroundColor: "#CCCCCC", radius: 1});
  gGraph.update();
}

  //for(i = 0; i < group.length; i++) {
  //  $('#graph').append('<div class="bar" style="left:' + (i * 4) + 'px;height:' + (group[i] * 2) + 'px" />');
  //}
}

function sortNumber(a,b) {
  return a - b;
}
