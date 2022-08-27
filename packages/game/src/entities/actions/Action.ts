export default class Action {
  requirements: boolean[];
  effect: () => void;
  duration?: number;
  timeInitiated: number | null;
  onInitiated?: () => void;
  onCancelled?: () => void;
  onCompleted?: () => void;
  constructor(
    requirements: boolean[],
    effect: () => void,
    duration?: number,
    onInitiated?: () => void,
    onCancelled?: () => void,
    onCompleted?: () => void
  ) {
    this.requirements = requirements;
    this.effect = effect;
    this.duration = duration ? duration : undefined;
    this.timeInitiated = null;
    this.onInitiated = onInitiated;
    this.onCancelled = onCancelled;
    this.onCompleted = onCompleted;
  }
}
