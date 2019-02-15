packages = {};
simu = {
  'tick': 0, 'columns': [
    {'id': 'col1', 'name': 'To do', 'cap': 9, 'lt': 2, 'tDays': 0, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'cap': 2, 'lt': 12, 'tDays': 7, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'cap': 2, 'lt': 14, 'tDays': 7, 'wip': 2, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'cap': 2, 'lt': 0, 'tDays': 0, 'wip': 2, 'in': [], 'out': []}
  ],
  'refresh': {'tickMod': 100, 'size': 3, 'time': 0}
};

function setupSimulation() {
  for(i = 0; i < simu.columns.length; i++) {
    $('#' + simu.columns[i].id + ' .info').html('<span class="label">&nbsp;</span> cap <span class="cap" contenteditable="true">&nbsp;</span> lt <span class="lt" contenteditable="true">&nbsp;</span> wip (<span class="wip" contenteditable="true">&nbsp;</span>)');
    $('#' + simu.columns[i].id + ' .label').html(simu.columns[i].name);
    $('#' + simu.columns[i].id + ' .cap').html(simu.columns[i].cap);
    $('#' + simu.columns[i].id + ' .wip').html(simu.columns[i].wip);
    $('#' + simu.columns[i].id + ' .lt').html(simu.columns[i].lt);
  }
}

function resetSimulation() {
  // Empty columns
  simu.tick = 0;

  $('.postit').remove();
}

function startSimulation() {
  // Read all simulation values
  for(i = 0; i < simu.columns.length; i++) {
    simu.columns[i].wip = parseInt($('#' + simu.columns[i].id + ' .wip').html());
    simu.columns[i].lt = parseInt($('#' + simu.columns[i].id + ' .lt').html());
    simu.columns[i].cap = parseInt($('#' + simu.columns[i].id + ' .cap').html());
  }

  setTimeout(timer, 500);
}

function stopSimulation() {
  log("Stopped at " + simu.tick);
  simu.tick = -1;
}

function timer() {
  if(simu.tick != -1) {
    tickSimulation();
    if(!isSimuDone())
      setTimeout(timer, 500);
      else {
        log("Done");
      }
  }
  $('#count').html(simu.tick);
}

function tickSimulation() {
  if(simu.tick % simu.refresh.tickMod == 0) {
    // Time to refresh
    addPackages();
  }

  // Calculate progress in column
  for(i = 0; i < simu.columns.length; i++) {
    col = simu.columns[i];

    if(col.out.length > 0) {
      //Pull
      nextCol = (i + 1 <= simu.columns.length ? simu.columns[i + 1] : null);
      if(nextCol && nextCol.in.length < nextCol.wip) {
        t = col.out.pop();
        nextCol.in.push(nextCol.lt + (nextCol.in.length / 10 * nextCol.lt)); // TAX? + (nextCol.tDays * (nextCol.in.length / 10)));
        visuTransitionNote(col, nextCol);
      }
    }

    if(col.in.length > 0) {
      for(j = 0; j < Math.min(col.cap, col.in.length); j++) {
        col.in[j]--;
        visuWorkNote(col, j, col.in[j]);
      }
      for(j = col.in.length - 1; j >= 0; j--) {
        if(col.in[j] <= 0.0) {
          col.in.pop();
          col.out.push(0);
          visuBurnNote(col);
        }
      }
    }
  }

  simu.tick++;
}

function isSimuDone() {
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
  $($('#' + col.id + ' .in .postit')[idx]).html(val);
}
