import { useRef, useEffect } from 'react'
import './Basket.css'

function Basket(props) {
    let total = 0;
    let lines = 0;
    let items = 0;
    let tenders = 0;
    let difference = null;
    props.basket.map((line, i) => {
        total += line.quantity * line.unitValue * (line.type == 'RETURN' ? -1 : 1);
        items += line.quantity;
        lines++;
    })
    props.tender.map((line, i) => {
        tenders += line.value;
    })
    if (tenders != 0) {
        difference = tenders - total;
    }
    const basketBottomRef = useRef(null);
    const scrollToBottom = () => {
        if (basketBottomRef.current) {
            basketBottomRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    useEffect(() => {
        setTimeout(() => {
            scrollToBottom()
        }, 100)
    }, [props.basket]);
    return (
        <div id='basket' className='document container'>
            {props.basket.map((line, i) => {
                return (
                    <div key={i} className='space-below'>
                        <div>{line.code} {line.name}</div>
                        <div className='total'>£{(line.quantity * (line.type == 'RETURN' ? -1 : 1) * line.unitValue).toFixed(2)}</div>
                        <div className='unit'>{line.quantity * (line.type == 'RETURN' ? -1 : 1)} @ £{line.unitValue.toFixed(2)}</div>
                    </div>
                );
            })}
            {props.basket.length < 1 ? "" : (
                <div className='space-below'>
                    <div>Sub Total: £{total.toFixed(2)}</div>
                    <div>Transaction Lines: {lines}</div>
                    <div>Items: {items}</div>
                </div>
            )}
            {props.tender.map((line, i) => {
                return <div key={i} className='tender'>
                    <div>{line.label} £{(line.value).toFixed(2)}</div>
                </div>
            })}
            {tenders == 0 ? "" : (
                <div className='space-below space-above'>
                    <div>Tender Total: £{tenders.toFixed(2)}</div>
                </div>
            )}
            {tenders == 0 || difference == null ? "" : (
                <div>
                    <div>Difference: £{difference.toFixed(2)}</div>
                </div>
            )}
            <div ref={basketBottomRef}></div>
            {props.name == 'LOGIN' ? (
                <div>
                    <p>{props.uiTranslations.devmessage1}</p>
                    <p>{props.uiTranslations.devmessage2}</p>
                    <table className="table-with-borders"><tbody>
                        <tr><td>{props.uiTranslations.user}</td><td>{props.uiTranslations.password}</td><td>{props.uiTranslations.role}</td></tr>
                        <tr><td>1111</td><td>1234</td><td>{props.uiTranslations.user}</td></tr>
                        <tr><td>2222</td><td>1234</td><td>{props.uiTranslations.user}</td></tr>
                        <tr><td>3333</td><td>1234</td><td>{props.uiTranslations.user}</td></tr>
                        <tr><td>admin</td><td>4321</td><td>{props.uiTranslations.administrator}*</td></tr>
                    </tbody></table>
                    <p><i>*{props.uiTranslations.devmessage3}</i></p>
                </div>
            ) : ""}
            {props.name == 'REGISTER_CHANGE' ? (
                <div>
                    <p>This is a personal development project.</p>
                    <p>Please feel free to have a play, you can use the following for testing purposes:</p>
                    <table className="table-with-borders"><tbody>
                        <tr><td>Store</td><td>Register</td></tr>
                        <tr><td>423</td><td>1</td></tr>
                        <tr><td>423</td><td>2</td></tr>
                        <tr><td>423</td><td>3</td></tr>
                    </tbody></table>
                </div>
            ) : ""}
        </div>
    )
}

export default Basket
