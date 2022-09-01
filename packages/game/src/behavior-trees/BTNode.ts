export default abstract class BTNode {
  nodeState: BTNodeState = this.evaluate();
  evaluate(...args: any[]) {
    return this.nodeState;
  }
}

export enum BTNodeState {
  RUNNING,
  SUCCESS,
  FAILURE,
}
