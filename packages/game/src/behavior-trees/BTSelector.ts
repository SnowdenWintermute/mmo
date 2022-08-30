import BTNode, { BTNodeState } from "./BTNode";

export default class BTSelector extends BTNode {
  children: BTNode[];
  constructor(children: BTNode[]) {
    const evaluate = () => {
      children.forEach((child) => {
        switch (child.nodeState) {
          case BTNodeState.RUNNING:
            this.nodeState = BTNodeState.RUNNING;
            return this.nodeState;
          case BTNodeState.SUCCESS:
            this.nodeState = BTNodeState.SUCCESS;
            return this.nodeState;
          case BTNodeState.FAILURE:
            this.nodeState = BTNodeState.FAILURE;
            break;
        }
      });
      this.nodeState = BTNodeState.FAILURE;
      return this.nodeState;
    };
    super(evaluate(), evaluate);
    this.children = children;
  }
}
