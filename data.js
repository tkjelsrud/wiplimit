simuDefault = {
  'tick': 0, 'status': 'stop', 'costDay': 10000, 'speed': 50, 'workflow': [
    {'id': 'col1', 'name': 'To do', 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 7, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'lt': 14, 'wip': 7, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'wip': 2, 'in': [], 'out': []}
  ],
  'team': {'To do': 0, 'Done': 0, 'Dev': 2, 'Test': 1, 'Common': 2},
  'workFactor': {'sizeTax': 'loga', 'blockChance': 0.0, 'unblockChance': 0.0, 'taskVariation': 1},
  'transition': {'action': 'none'},
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simuSet = {};
simuSet['large'] = $.extend(true, {}, simuDefault);
simuSet.large.desc = 'A1. Large team with no WIP limit';
simuSet.large.team = {'Dev': 6, 'Test': 3, 'Common': 0};

simuSet['largewip'] = $.extend(true, {}, simuDefault);
simuSet.largewip.desc = 'A2. Large team WIPed';
simuSet.largewip.workflow[1].wip = 3;
simuSet.largewip.workflow[2].wip = 3;
simuSet.largewip.team = {'Dev': 6, 'Test': 3, 'Common': 0};

simuSet['medium'] = $.extend(true, {}, simuDefault);
simuSet.medium.desc = 'A3. Medium team with some WIP';
simuSet.medium.team = {'Dev': 4, 'Test': 3, 'Common': 0};
simuSet.medium.workflow[1].wip = 3; //Dev
simuSet.medium.workflow[2].wip = 3; //Test

simuSet['small'] = $.extend(true, {}, simuDefault);
simuSet.small.desc = 'A4. Small team with some WIP';
simuSet.small.team = {'Dev': 2, 'Test': 1, 'Common': 0};
simuSet.small.workflow[1].wip = 2; //Dev
simuSet.small.workflow[2].wip = 1; //Test

simuSet['single'] = $.extend(true, {}, simuDefault);
simuSet.single.desc = 'B1. Single person kanban';
simuSet.single.workFactor.sizeTax = 'flat';
simuSet.single.workFactor.taskVariation = 2;
simuSet.single.workflow = [
  {'id': 'col1', 'name': 'To do', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 9, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'wip': 9, 'in': [], 'out': []}];
simuSet.single.team = {'Dev': 1};

simuSet['singlewip'] = $.extend(true, {}, simuDefault);
simuSet.singlewip.desc = 'B2. Single person kanban WIPed';
simuSet.singlewip.workFactor.sizeTax = 'flat';
simuSet.singlewip.workFactor.taskVariation = 2;
simuSet.singlewip.workflow = [
  {'id': 'col1', 'name': 'To do', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 1, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'wip': 9, 'in': [], 'out': []}];
simuSet.singlewip.team = {'Dev': 1};

simuSet['rand'] = $.extend(true, {}, simuDefault);
simuSet.rand.desc = 'C1. Random size tasks, no wip';
simuSet.rand.workFactor.taskVariation = 4;
simuSet.rand.workFactor.sizeTax = 'flat';
simuSet.rand.workflow = [
  {'id': 'col1', 'name': 'To do', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 9, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'wip': 9, 'in': [], 'out': []}];
simuSet.rand.team = {'Dev': 2};

simuSet['randwip'] = $.extend(true, {}, simuDefault);
simuSet.randwip.desc = 'C2. Random size tasks WIPed';
simuSet.randwip.workFactor.taskVariation = 4;
simuSet.randwip.workFactor.sizeTax = 'flat';
simuSet.randwip.workflow = [
  {'id': 'col1', 'name': 'To do', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 2, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'wip': 9, 'in': [], 'out': []}];
simuSet.randwip.team = {'Dev': 2};

/*
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
};*/
