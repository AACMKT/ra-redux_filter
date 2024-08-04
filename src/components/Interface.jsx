import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEFINE_PRICE, DEFINE_SERVICE,CLEAR_INPUT, SET_USER_VALUE, FILTER } from "../redux/actions";

export const Interface = () => {
    const [btnVisability, setBtnVisibility] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const { userValue } = useSelector((state) => state.service);
    const dispatch = useDispatch();

    const handleBtnVisibility = (text) => {
        if (text.length === 0) {
            setBtnVisibility(false)
        }
        else {
            setBtnVisibility(true)
        }
    }

    useEffect(() => {
        const input = Array.from(document.querySelectorAll('.input-field'));
        let trigger = false
        input.forEach((item) => {
            if (item.value.length > 0) {
                trigger = true
                setBtnVisibility(true)
            }
   
        })
        if (!trigger) {
            setBtnVisibility(false)
        }
    }, [userValue])
    const checkPrice = (price) => {
        if (price.length === 0) {
            return ''
        }
        if (!(/^[0-9]+$/.test(price))) {
            return ''
        }

        return price
    }
   
    return (
        <>
        <div className="controls">
            <div className="field-container">
                <h3 className="title">Service</h3>
                <input type="text" className="input-field" value={userValue.service}  onChange={(e) => {dispatch({type: DEFINE_SERVICE, payload: e.target.value}); handleBtnVisibility(e.target.value)}}/>
            </div>
            <div className="field-container-price">
                <h3 className="title price-field">Price</h3>
                <div className="price-container">
                    <input type="text" className="input-field price-field" value={userValue.price}  onChange={(e) => {dispatch({type: DEFINE_PRICE, payload: checkPrice(e.target.value)}); handleBtnVisibility(e.target.value)}}/>
                    <input type="button" className="button" value={ "Save" } onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: SET_USER_VALUE, payload: userValue});
                    dispatch({type: CLEAR_INPUT});
                    dispatch({type: FILTER, payload: filterValue});
                }}/>
                </div>
            </div>
            <input type="button" className={`button ${btnVisability ? "visible" : "hidden"}`} value={ "Cancel" } onClick={() => dispatch({type: CLEAR_INPUT})} />
        </div>
        <div className="field-container filter-field">
            <input type="text" className="input-field" placeholder="Enter text to filter data" value={filterValue} onChange={(e) => {setFilterValue(e.target.value); dispatch({type: FILTER, payload: e.target.value})}}/>
        </div>
        </>
    )
}