export default abstract class BTNode {
  nodeState: BTNodeState;
  evaluate: () => BTNodeState;
  constructor(nodeState: BTNodeState, evaluate: () => BTNodeState) {
    this.nodeState = nodeState;
    this.evaluate = evaluate;
  }
}

export enum BTNodeState {
  RUNNING,
  SUCCESS,
  FAILURE,
}
