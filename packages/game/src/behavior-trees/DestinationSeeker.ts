import assignRandomDestinationToSelf from "../actions/assignRandomDestinationToSelf";
import moveSelfTowardDestination from "../actions/moveSelfTowardDestination";
import { BehavioralEntity } from "../entities/BehavioralEntity";
import { Zone } from "../Zone/Zone";

const { BehaviorTree, Selector, Task, SUCCESS, FAILURE, RUNNING } = require("behaviortree");

type Blackboard = { entity: BehavioralEntity; zone: Zone };

const selectNewDestination = new Task({
  run: function (blackboard: Blackboard) {
    const { entity } = blackboard;
    const { destination } = entity;
    if (destination) return FAILURE;
    if (!destination) {
      assignRandomDestinationToSelf(entity);
      return SUCCESS;
    }
  },
});

const moveTowardDestination = new Task({
  run: function (blackboard: Blackboard) {
    const { entity } = blackboard;
    const { position } = entity.body;
    const { destination } = entity;
    const tolerance = 5;
    if (!destination) return FAILURE;
    const entityReachedDestination =
      Math.abs(position.x - destination.x) <= tolerance && Math.abs(position.y - destination.y) <= tolerance;
    if (entityReachedDestination) {
      entity.destination = null;
      return SUCCESS;
    } else moveSelfTowardDestination(entity);
    return RUNNING;
  },
});

const rootNode = new Selector({
  nodes: [selectNewDestination, moveTowardDestination],
});

export function createDestinationSeekerBT(blackboard: Blackboard) {
  return new BehaviorTree({
    tree: rootNode,
    blackboard,
  });
}