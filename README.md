# wiplimit
Visualization of the impact of reducing parallell work in teams by introducing "WIP Limits".

Select a data set, representing a team. The columns show number of team members (ppl), time to deliver a unit in column (lead time/lt) and work-in-progress limit (WIP).

Start to run a simulation on 200 days. New items (7) are added to backlog every 15 day (configurable). Column darker area represents items waiting to be pulled (can indicate queuing). Column metric shows total tasks completed and red percentage is time lost in waiting (delays, dependencies, meetings, etc). Reset between runs.

Space can be used to pause and unpause simulation during execution
#
The simulation is "fair" in that it does not give any bonuses or changes to teams that use a wip limit, nor does it assume everyone can pitch in on all work. It simply shows that teams that do less in parallell can be more efficient and get more done.
#
https://tkjelsrud.github.io/wiplimit/simu.html
