
import { useDispatch } from "react-redux";
import { next, back, go, selectIndex } from "../services/StepperSlice";

const steps = [];

function Stepper() {

  const dispatch = useDispatch();
  const index = useSelector(selectIndex);
  const stepNext = () => dispatch(next());
  const stepBack = () => dispatch(back());
  const stepGo = (step) => dispatch(back(step));
  const render = () => steps[index] ? steps[index] : null;
  const add = (com) => steps.push(com);
  const del = (pos) => delete steps[pos];

  return {
    render,
    add,
    del,
    "next": stepNext,
    "back": stepBack,
    "go": stepGo
  }
}

export default Stepper;
