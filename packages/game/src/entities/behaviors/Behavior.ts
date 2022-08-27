import Action from "../actions/Action";

export default interface Behavior {
  type: number;
  prerequisites: boolean[];
  cue: (props: any) => boolean;
  action: Action;
}

// behaviors determine what actions an entity will add to the queue each tick
//  priority - entity will exhibit all valid behaviors starting with the lowest priority
//  prerequisites - behavior will not be considered valid if prereqs aren't met (try next prioritized behavior)
//  cues - a specific prerequisite which determines if an entity wants to do the behaviour's associated action
//  actions
//    requirements - at any step of the action it will be cancelled if requirements aren't met
//    onCancelled - function that executes if an ongoing action is cancelled
//    onInitiated - function that executes when the action is added to entity's list of ongoing actions
//    steps: optional attribute
//      current: number - increments at each tick, effect in that tick is dependent on the step
//      total: number - action ends when number is reached
//    effect: function that executes on each tick while the action is ongoing

// Entity
//  Behaviors:[]
//  ActionsCurrentlyExecuting:[
//    Action:{
//      requirements: boolean
//      steps:{
//        current: number
//        total: number
//      }
//      effect: (props: any) => void
//    }
//  ]

// ex:
//  prerequisites: is hunting, attack cooldown is up, has balanced footing
//  cue: entity is near another entity
//  action:
//    requirements:
//      - must have enough stamina
//      - must have weapon equipped
//    effects: create line that arcs from entity center and moves left to right
