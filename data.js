simuDefault = {
  'tick': 0, 'status': 'stop', 'costDay': 10000, 'speed': 50, 'workflow': [
    {'id': 'col1', 'name': 'To do', 'wip': 0, 'in': [], 'out': []},
    {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 0, 'in': [], 'out': []},
    {'id': 'col3', 'name': 'Test', 'lt': 14, 'wip': 0, 'in': [], 'out': []},
    {'id': 'col4', 'name': 'Done', 'wip': 0, 'in': [], 'out': []}
  ],
  'style': '',
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
simuSet.medium.desc = 'A3. Medium team WIPed';
simuSet.medium.team = {'Dev': 4, 'Test': 3, 'Common': 0};
simuSet.medium.workflow[1].wip = 2; //Dev
simuSet.medium.workflow[2].wip = 3; //Test

simuSet['small'] = $.extend(true, {}, simuDefault);
simuSet.small.desc = 'A4. Small team WIPed';
simuSet.small.team = {'Dev': 2, 'Test': 1, 'Common': 0};
simuSet.small.workflow[1].wip = 2; //Dev
simuSet.small.workflow[2].wip = 1; //Test

simuSet['single'] = $.extend(true, {}, simuDefault);
simuSet.single.desc = 'B1. Single person kanban';
simuSet.single.workFactor.sizeTax = 'flat';
simuSet.single.workFactor.taskVariation = 2;
simuSet.single.workflow = [
  {'id': 'col1', 'name': 'To do', 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 9, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'in': [], 'out': []}];
simuSet.single.team = {'Dev': 1};

simuSet['singlewip'] = $.extend(true, {}, simuDefault);
simuSet.singlewip.desc = 'B2. Single person kanban WIPed';
simuSet.singlewip.workFactor.sizeTax = 'flat';
simuSet.singlewip.workFactor.taskVariation = 2;
simuSet.singlewip.workflow = [
  {'id': 'col1', 'name': 'To do', 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 12, 'wip': 1, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'in': [], 'out': []}];
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

simuSet['stream'] = $.extend(true, {}, simuDefault);
simuSet.stream.desc = 'D1. Up and downstream';
simuSet.stream.style = "slim";
simuSet.stream.workflow = [
  {'id': 'col1', 'name': 'Capture', 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Synthesis', 'teams': ['Analysis'], 'lt': 12, 'wip': 2, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Analysis', 'teams': ['Analysis'], 'lt': 12, 'wip': 2, 'in': [], 'out': []},
  {'id': 'col4', 'name': 'Stories to do', 'lt': 12, 'wip': 2, 'in': [], 'out': []},
  {'id': 'col5', 'name': 'Development', 'teams': ['DevTest'], 'lt': 12, 'wip': 2, 'in': [], 'out': []},
  {'id': 'col6', 'name': 'Test', 'teams': ['DevTest'], 'lt': 12, 'wip': 2, 'in': [], 'out': []},
  {'id': 'col7', 'name': 'Ready', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col8', 'name': 'Deployment', 'teams': ['DevTest'], 'wip': 9, 'in': [], 'out': []},
  {'id': 'col9', 'name': 'Verified', 'wip': 9, 'in': [], 'out': []}];
simuSet.stream.team = {'Analysis': 2, 'DevTest': 8};
simuSet.stream.refresh = {'tickMod': 50, 'size': 3, 'time': 200};

/*simuSet['bieber'] = $.extend(true, {}, simuDefault);
simuSet.bieber.desc = 'XX. 1000 teenagers at Bieber concert';
simuSet.bieber.workFactor.taskVariation = 4;
simuSet.bieber.workFactor.sizeTax = 'flat';
simuSet.bieber.workflow = [
  {'id': 'col1', 'name': 'To do', 'wip': 9, 'in': [], 'out': []},
  {'id': 'col2', 'name': 'Dev', 'lt': 2, 'wip': 2, 'in': [], 'out': []},
  {'id': 'col3', 'name': 'Done', 'wip': 9, 'in': [], 'out': []}];
simuSet.bieber.team = {'Dev': 2};
simuSet.bieber.refresh = {'tickMod': 999, 'size': 1000, 'time': 200};*/
