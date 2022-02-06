import { exec } from '../../app/services/util';

function MovementItem(props) {
    return (
        <div onClick={()=>exec(props.onSelect, [props.data])}>
            <span> {props.data.id} </span>
        </div>
    )
}
export default MovementItem;