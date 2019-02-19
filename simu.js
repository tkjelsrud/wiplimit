simuBig = {
  'name': 'l', 'tick': 0, 'status': 'stop', 'cost': 10000, 'speed': 60, 'columns': [
    {'id': 'col1', 'name': 'To do', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'cap': 6, 'lt': 12, 'tDays': 7, 'wip': 7, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'cap': 3, 'lt': 14, 'tDays': 7, 'wip': 7, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []}
  ],
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simuMed = {
  'name': 'm', 'tick': 0, 'status': 'stop', 'cost': 10000, 'speed': 60, 'columns': [
    {'id': 'col1', 'name': 'To do', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'cap': 4, 'lt': 12, 'tDays': 7, 'wip': 3, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'cap': 3, 'lt': 14, 'tDays': 7, 'wip': 3, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []}
  ],
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simuSmall = {
  'name': 'sm', 'tick': 0, 'status': 'stop', 'cost': 10000, 'speed': 60, 'columns': [
    {'id': 'col1', 'name': 'To do', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'cap': 3, 'lt': 12, 'tDays': 7, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'cap': 2, 'lt': 14, 'tDays': 7, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []}
  ],
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simuMassive = {
  'name': 'xl', 'tick': 0, 'status': 'stop', 'cost': 10000, 'speed': 60, 'columns': [
    {'id': 'col1', 'name': 'To do', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'cap': 12, 'lt': 12, 'tDays': 7, 'wip': 12, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'cap': 12, 'lt': 14, 'tDays': 7, 'wip': 12, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []}
  ],
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simuTiny= {
  'name': 'xs', 'tick': 0, 'status': 'stop', 'cost': 10000, 'speed': 60, 'columns': [
    {'id': 'col1', 'name': 'To do', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'cap': 2, 'lt': 12, 'tDays': 7, 'wip': 1, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'cap': 1, 'lt': 14, 'tDays': 7, 'wip': 1, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []}
  ],
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simuLargeWip= {
  'name': 'lwip', 'tick': 0, 'status': 'stop', 'cost': 10000, 'speed': 60, 'columns': [
    {'id': 'col1', 'name': 'To do', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'cap': 6, 'lt': 12, 'tDays': 7, 'wip': 3, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'cap': 3, 'lt': 14, 'tDays': 7, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'cap': 0, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []}
  ],
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simu = simuMassive;

result = {'days': 0, 'tasks': 0, 'first': 0, 'team': 0, 'capacity': 0, 'utilization': 0, 'factor': 0, 'cost': 0};

$(window).keypress(function(e) {
    if (e.which === 32) {
        if(simu.status == 'run')
          pauseSimulation();
        else if(simu.status == 'pause')
          startSimulation();
    }
});

function setupSimulation() {
  for(i = 0; i < simu.columns.length; i++) {
    $('#' + simu.columns[i].id + ' .info').html('<span class="label">&nbsp;</span> cap <span class="cap" contenteditable="true">&nbsp;</span> lt <span class="lt" contenteditable="true">&nbsp;</span> wip (<span class="wip" contenteditable="true">&nbsp;</span>)');
    $('#' + simu.columns[i].id + ' .label').html(simu.columns[i].name);
    $('#' + simu.columns[i].id + ' .cap').html(simu.columns[i].cap);
    $('#' + simu.columns[i].id + ' .wip').html(simu.columns[i].wip);
    $('#' + simu.columns[i].id + ' .lt').html(simu.columns[i].lt);
    $('#' + simu.columns[i].id + ' .counter').html('0');
    $('#' + simu.columns[i].id + ' .wait').html('0%');
  }
}

function resetSimulation() {
  // Empty columns
  simu.tick = 0;

  resetQueues();
  resetResult();

  $('.postit').remove();
}

function startSimulation() {
  // Read all simulation values
  simu.status = 'run';
  for(i = 0; i < simu.columns.length; i++) {
    simu.columns[i].wip = parseInt($('#' + simu.columns[i].id + ' .wip').html());
    simu.columns[i].lt = parseInt($('#' + simu.columns[i].id + ' .lt').html());
    simu.columns[i].cap = parseInt($('#' + simu.columns[i].id + ' .cap').html());
  }

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

  for(i = 0; i < simu.columns.length; i++)
    result.team += simu.columns[i].cap;

  result.utilization = (result.capacity / (result.team * result.days)).toFixed(2);
  result.factor = (result.factor / (result.team * result.days)).toFixed(2);
  result.cost = (simu.cost * result.days * result.team).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  color = (isSimuDone() ? '#999' : 'red');

  simLog('<div style="clear:both">' + simu.name + '</div><div style="color:' + color + '"">' + result.days + "</div><div>" + result.tasks +
         "</div><div>" + result.first + "</div><div>" + result.team + "</div><div>" + result.utilization + "</div><div>" +
         result.factor + "</div><div>" + result.cost + "</div>");

  resetResult();
  resetQueues();

  simu.tick = -1;
  simu.status = 'stop';
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
    addPackages();
  }

  // Calculate progress in column
  for(i = simu.columns.length - 1; i >= 0; i--) {
    col = simu.columns[i];
    visuShowCount(col, col.in.length + col.out.length);

    if(col.out.length > 0) {
      // Pull - factor in hand-over time?
      nextCol = (i + 1 <= simu.columns.length ? simu.columns[i + 1] : false);
      if(nextCol && nextCol.in.length < nextCol.wip) {
        t = col.out.pop();
        nextCol.in.push(nextCol.lt + (nextCol.in.length / 10 * nextCol.lt)); // TAX? + (nextCol.tDays * (nextCol.in.length / 10)));
        visuTransitionNote(col, nextCol);
      }
      if(!nextCol && !result.first) {
        result.first = simu.tick;
      }
    }

    if(col.in.length > 0) {
      // Number of work days capacity to deliver this day
      wd = Math.min(Math.min(col.cap, col.in.length), col.wip);
      result.capacity += wd;
      // Work factor, decreases as team size increases, 0-1.0 where 1.0 = 100% efficient
      wf = (wd > 1 ? 1 / Math.log(wd + 1) : 1.0);
      //console.log(wd + ' ' + wf);

      visuShowWait(col, Math.round(100 * (1 - wf)));

      result.factor += (wd * wf);
      for(j = 0; j < wd; j++) {
        tx = Math.floor(Math.random() * col.in.length);
        col.in[tx] -= wf;
        visuWorkNote(col, tx, col.in[tx]);
      }
      for(j = col.in.length - 1; j >= 0; j--) {
        if(col.in[j] <= 0.0) {
          col.in.splice(j, 1);
          col.out.push(0);
          visuBurnNote(col);
        }
      }
    }
  }

  simu.tick++;
}

function lastColumn() {
  return simu.columns[simu.columns.length - 1];
}

function resetResult() {
  for(x in result)
    result[x] = 0;
}

function resetQueues() {
  for(i = 0; i < simu.columns.length; i++) {
    simu.columns[i].in = new Array();
    simu.columns[i].out = new Array();
  }
}

function isSimuDone() {
  if(simu.tick >= simu.refresh.time)
    return true;
  num = 0;
  for(i = 0; i < simu.columns.length; i++) {
    num += simu.columns[i].in.length;
    if(i < simu.columns.length - 1)
      num += simu.columns[i].out.length;
  }
  return (num == 0);
}

function addPackages() {
  for(i = 0; i < simu.refresh.size; i++) {
    simu.columns[0].in.push(simu.columns[0].lt);
    visuNewNote(simu.columns[0]);
  }
}

function updateColumn(col) {
  //$('#' + col.id).html('in: ' + col.in.length + ' out:' + col.out.length);
}

function visuNewNote(col) {
  // Visualize a new note'
  $('#' + col.id + ' .in').append('<div class="postit">' + col.tDays + '</div>').fadeIn('slow');
}

function visuBurnNote(col) {
  $($('#' + col.id + ' .in .postit')[0]).remove();
  $('#' + col.id + ' .out').append('<div class="postit">' + col.tDays + '</div>').fadeIn('slow');
}

function visuTransitionNote(colA, colB) {
  $($('#' + colA.id + ' .out .postit')[0]).remove();
  $('#' + colB.id + ' .in').append('<div class="postit">' + colB.tDays + '</div>').fadeIn('slow');
}

function visuWorkNote(col, idx, val) {
  $($('#' + col.id + ' .in .postit')[idx]).html(Math.round(val));
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
