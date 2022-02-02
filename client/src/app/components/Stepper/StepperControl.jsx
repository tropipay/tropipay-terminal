import { useEffect, useState } from "react";

function StepperControl() {
  const [index, setIndex] = useState(0);
  const state = {
    steps: [],
    event: null
  };

  const validNext = (pos = 1) => index + pos <= state.steps.length;
  const validBack = (pos = 1) => index - pos >= 0;

  const next = (pos = 1) => {
    if (validNext(pos)) {
      setIndex(index + pos);
      if (state.event instanceof Function) {
        state.event(index, pos);
      }
    }
  };

  const back = (pos = 1) => {
    if (validBack(pos)) {
      setIndex(index - pos);
      if (state.event instanceof Function) {
        state.event(index, pos * -1);
      }
    }
  };

  const go = (pos = 1) => {
    if (validNext(pos) && validBack(pos)) {
      setIndex(pos);
      if (state.event instanceof Function) {
        state.event(index, pos);
      }
    }
  }

  const subscribe = (callback) => state.event = callback;
  const render = () => state.steps[index] ? state.steps[index]() : null;
  const add = (com) => {
    if (com instanceof Array) {
      for (let i of com) {
        state.steps.push(i);
      }
    } else {
      state.steps.push(com);
    }
  };
  const del = (pos) => delete state.steps[pos];

  useEffect(() => {
    if (state.event instanceof Function) {
      state.event(index, 1);
    }
  });

  return {
    render,
    subscribe,
    add,
    del,
    next,
    back,
    go,
    index
  }
}

export default StepperControl;

export function StepperView(props) {
  const stepper = props.control || StepperControl();
  stepper.add(props.steps);
  return stepper.render();
}
