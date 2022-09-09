import assignRandomDestinationToSelf from "../actions/assignRandomDestinationToSelf";
import moveSelfTowardDestination from "../actions/moveSelfTowardDestination";
import { BehavioralEntity } from "../entities/BehavioralEntity";
import { Zone } from "../Zone/Zone";

const { BehaviorTree, Selector, Sequence, Task, SUCCESS, FAILURE, RUNNING } = require("behaviortree");

type Blackboard = { entity: BehavioralEntity; zone: Zone };

// const selectNewDestination = new Task({
//   run: function (blackboard: Blackboard) {
//     const { entity } = blackboard;
//     const { destination } = entity;
//     if (destination) return FAILURE;
//     if (!destination) {
//       entity.currentAction = "choosing new destination";
//       assignRandomDestinationToSelf(entity);
//       return SUCCESS;
//     }
//   },
// });

const moveTowardDestination = new Task({
  run: function (blackboard: Blackboard) {
    const { entity } = blackboard;
    const { position } = entity.body;
    const { destination } = entity;
    const tolerance = entity.body.circleRadius || 10;
    if (!destination) return FAILURE;
    const entityReachedDestination =
      position.x <= destination.x + tolerance &&
      position.x >= destination.x - tolerance &&
      position.y <= destination.y + tolerance &&
      position.y >= destination.y - tolerance;
    if (entityReachedDestination) {
      entity.destination = null;
      entity.currentAction = "reached destination";
      return SUCCESS;
    } else {
      entity.currentAction = "moving";
      moveSelfTowardDestination(entity, blackboard.zone.timeOfLastUpdate);
      return RUNNING;
    }
  },
  end: function (blackboard: Blackboard) {
    const { entity } = blackboard;
    entity.currentAction = "choosing new destination";
    assignRandomDestinationToSelf(entity);
  },
});

const rootNode = new Sequence({
  nodes: [moveTowardDestination],
});

export function createDestinationSeekerBT(blackboard: Blackboard) {
  return new BehaviorTree({
    tree: rootNode,
    blackboard,
  });
}
