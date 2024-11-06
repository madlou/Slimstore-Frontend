import { useEffect } from 'react'
import './FunctionButtons.css'

function FunctionButtons(props) {
    const fixedButtons = [];
    for (let i = 0; i < 8; i++) {
        fixedButtons[i + 1] = {
            label: "",
            position: i + 1,
        };
    }
    props.buttons.forEach(button => {
        fixedButtons[button.position] = button;
    });
    const doAction = (e) => {
        props.setAction(e.target.attributes.data.value)
    }
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"].includes(e.key)) {
                e.preventDefault();
                document.getElementById(e.key).focus();
                document.getElementById(e.key).click();
                doAction({ e: { target: document.getElementById(e.key) } });
            }
        }, false);
    }, []);
    return (
        <div id="function-buttons">
            {fixedButtons.map((button, i) => {
                return (
                    <button
                        key={"F" + i}
                        id={"F" + button.position}
                        className={'secondary' + (button.label ? '' : ' invisible')}
                        onClick={doAction}
                        data={button.action}
                    >
                        <div data={button.action}>{"F" + button.position}</div>
                        <div data={button.action}>{button.label}</div>
                    </button>
                )
            })}
        </div>
    )
}

export default FunctionButtons
