import BTNode, { BTNodeState } from "./BTNode";

export default class BTInverter extends BTNode {
  node: BTNode;
  constructor(node: BTNode) {
    const evaluate = () => {
      switch (node.nodeState) {
        case BTNodeState.RUNNING:
          this.nodeState = BTNodeState.RUNNING;
          break;
        case BTNodeState.SUCCESS:
          this.nodeState = BTNodeState.FAILURE;
          return this.nodeState;
        case BTNodeState.FAILURE:
          this.nodeState = BTNodeState.SUCCESS;
          break;
      }
      return this.nodeState;
    };
    super(evaluate(), evaluate);
    this.node = node;
  }
}
