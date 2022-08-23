export default class Action {
  requirements: boolean[];
  effect: () => void;
  steps?: {
    current: number;
    total: number;
  };
  onInitiated?: () => void;
  onCancelled?: () => void;
  onCompleted?: () => void;
  constructor(
    requirements: boolean[],
    effect: () => void,
    steps?: number,
    onInitiated?: () => void,
    onCancelled?: () => void,
    onCompleted?: () => void
  ) {
    this.requirements = requirements;
    this.effect = effect;
    this.steps = steps
      ? {
          current: steps,
          total: steps,
        }
      : undefined;
    this.onInitiated = onInitiated;
    this.onCancelled = onCancelled;
    this.onCompleted = onCompleted;
  }
}
