import { useEffect } from 'react'
import './Form.css'
import { imageApi } from '../api/imageApi.js'

function Form(props) {
    const numberOnly = (evt) => {
        if (evt.which > 57) {
            evt.preventDefault();
        }
    }
    const decimalOnly = (evt) => {
        if (evt.which > 57 && evt.which != 190) {
            evt.preventDefault();
        }
    }
    const focusChange = (i, target) => {
        if (target.id == props.inputFocused) {
            return false;
        }
        props.setInputFocused(target.id);
    }
    const quantityChange = (i, target) => {
        props.updateFormElements((draft) => {
            const value = draft[i].quantity + target.value * 1;
            if (value >= 0) {
                draft[i].quantity = value;
            }
        })
    }
    const change = (i, target) => {
        props.updateFormElements((draft) => {
            draft[i].value = target.value;
        })
    }
    const formButtonClick = (i) => {
        props.setRequestForm(props.formElements[i].button.form);
    }
    const submit = (evt) => {
        evt.preventDefault();
        props.setRequestForm({ ...props.response.view.form, elements: props.formElements });
    }
    useEffect(() => {
        if (!props.response.view.form.elements) {
            return;
        }
        const element = props.response.view.form.elements.find((element) => {
            return [
                "text",
                "email",
                "number",
                "decimal",
                "date",
                "password",
            ].includes(element.type.toLowerCase());
        })
        if (element) {
            const id = props.response.view.name + ':' + element.key;
            props.setInputFocused(id);
        }
    }, [props.response.view]);
    return (
        <div id='form' className='document container no-print'>
            {props.response.error ? <div className='error'>{props.response.error}</div> : ""}
            <div id='message' className='margin-below'>{props.response.view.message}</div>
            <form onSubmit={submit}>
                <table><tbody>
                    {props.formElements.map((element, i) => {
                        let key = props.response.view.name + ':' + element.key;
                        switch (element.type.toLowerCase()) {
                            case 'text':
                            case 'email':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        disabled={element.disabled}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        readOnly={props.showKeyboard}
                                        type='text'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'number':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        onKeyDown={numberOnly}
                                        readOnly={props.showKeyboard}
                                        type='text'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'decimal':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        onKeyDown={decimalOnly}
                                        readOnly={props.showKeyboard}
                                        type='text'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'date':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        type='date'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'password':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        readOnly={props.showKeyboard}
                                        type='password'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'submit':
                                return <tr key={key}>
                                    <td colSpan='3'><input
                                        className='primary'
                                        id={key}
                                        type='submit'
                                        value={element.value}
                                    /></td>
                                </tr>
                            case 'button':
                                return <tr key={key}>
                                    <td>{element.key}</td>
                                    <td>{element.value}</td>
                                    <td><button
                                        onClick={() => { formButtonClick(i) }}
                                        type='button'
                                    >
                                        {element.label}
                                    </button></td>
                                </tr>
                            case 'image':
                                if (element.image.substring(0, 5) == 'image') {
                                    element.image = imageApi().getUrl(element.image);
                                }
                                return <tr key={key}>
                                    <td><img src={element.image} /></td>
                                    <td>{element.key}</td>
                                    <td>{element.label}</td>
                                </tr>
                            case 'product':
                            case 'product_web':
                            case 'product_drink':
                                if (element.image.substring(0, 5) == 'image') {
                                    element.image = imageApi().getUrl(element.image);
                                }
                                return <tr key={key}>
                                    <td className='imageBackground' colSpan='2'>
                                        <img src={element.image} />
                                    </td>
                                    <td>
                                        <div>{element.key}: {element.label}</div>
                                        <div>£{element.price.toFixed(2)}</div>
                                        <button
                                            className='tertiary'
                                            name={element.key} value='-1'
                                            onClick={(evt) => { quantityChange(i, evt.target) }}
                                            type='button'
                                        >
                                            -
                                        </button>
                                        <span className='quantity'>{element.quantity}</span>
                                        <button
                                            className='tertiary'
                                            name={element.key}
                                            onClick={(evt) => { quantityChange(i, evt.target) }}
                                            type='button'
                                            value='1'
                                        >
                                            +
                                        </button>
                                    </td>
                                </tr>
                            case 'select':
                                return <tr key={key}>
                                    <td>{element.label}</td>
                                    <td colSpan='2'>
                                        <select
                                            id={key}
                                            name={element.key}
                                            onChange={(evt) => { change(i, evt.target) }}
                                            value={element.value}
                                        >
                                            {element.options.map((option, i) => {
                                                return <option key={key + ':' + i}> {option}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                        }
                    })}
                </tbody></table>
            </form>
        </div>
    )
}

export default Form
