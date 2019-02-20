simuDefault = {
  'tick': 0, 'status': 'stop', 'costDay': 10000, 'speed': 60, 'workflow': [
    {'id': 'col1', 'name': 'To do', 'wip': 2, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 7, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'lt': 14, 'wip': 7, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'wip': 2, 'in': [], 'out': []}
  ],
  'team': {'To do': 0, 'Done': 0, 'Dev': 2, 'Test': 1, 'Common': 2},
  'workFactor': {'sizeTax': 'loga', 'blockChance': 0.0, 'unblockChance': 0.0, 'taskVariation': 1},
  'refresh': {'tickMod': 15, 'size': 7, 'time': 200}
};

simuSet = {};
simuSet['large'] = $.extend(true, {}, simuDefault);
simuSet.large.desc = 'Large team with no WIP limit';
simuSet.large.workFactor.taskVariation = 2;
simuSet.large.team = {'Dev': 6, 'Test': 3, 'Common': 0};

simuSet['medium'] = $.extend(true, {}, simuDefault);
simuSet.medium.desc = 'Medium team with some WIP';
simuSet.medium.workFactor.taskVariation = 2;
simuSet.medium.team = {'Dev': 4, 'Test': 3, 'Common': 0};
simuSet.medium.workflow[1].wip = 3; //Dev
simuSet.medium.workflow[2].wip = 3; //Test

simuSet['single'] = $.extend(true, {}, simuDefault);
simuSet.single.desc = 'Single person kanban';
simuSet.single.workFactor.sizeTax = 'flat';
simuSet.single.workflow = [
  {'id': 'col1', 'name': 'To do', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 9, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'wip': 9, 'in': [], 'out': []}];
simuSet.single.team = {'Dev': 1};

simuSet['singlewip'] = $.extend(true, {}, simuDefault);
simuSet.singlewip.desc = 'Single person kanban WIPed';
simuSet.singlewip.workFactor.sizeTax = 'flat';
simuSet.singlewip.workflow = [
  {'id': 'col1', 'name': 'To do', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 1, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'wip': 9, 'in': [], 'out': []}];
simuSet.singlewip.team = {'Dev': 1};

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
