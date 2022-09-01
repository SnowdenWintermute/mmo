import BTNode, { BTNodeState } from "./BTNode";

export default class BTSequence extends BTNode {
  children: BTNode[];
  constructor(children: BTNode[]) {
    super();
    this.children = children;
  }
  evaluate() {
    let isAnyChildRunning = false;
    this.children.forEach((child) => {
      switch (child.nodeState) {
        case BTNodeState.RUNNING:
          isAnyChildRunning = true;
          break;
        case BTNodeState.SUCCESS:
          break;
        case BTNodeState.FAILURE:
          this.nodeState = BTNodeState.FAILURE;
          return this.nodeState;
      }
    });
    this.nodeState = isAnyChildRunning ? BTNodeState.RUNNING : BTNodeState.SUCCESS;
    return this.nodeState;
  }
}
