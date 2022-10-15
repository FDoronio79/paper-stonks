// Position Form to BUY and SELL 
// We need a way for the form to recognize and use: USERNAME, SYMBOL, NAME, and TYPE_OF


import { useEffect, useState } from 'react';


function FormParameters(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;
    return (
        <div className="col-lg-10 mb-3">
            <label htmlFor={id} className="example-form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
        </div> 
    )
}

export default function PositionForm({price, symbol}) {

    // const [username, setUsername] = useState('');
    // const [symbol, setSymbol] = useState('');
    // const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    // const [type_of, setType] = useState('');
    const username = localStorage.getItem('Username');


    return (
        <div className="container text-left border border-dark p-3 ">
        <form>
            <div className="row my-4">
                <div className="col">
                    <h4>Buy Order</h4>
                </div>
                <div className="col">
                    <h4>{symbol}</h4>
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h4>Shares</h4>
                </div>
                <div className="col">
                <FormParameters 
                id="quantity" 
                placeholder="quantity" 
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                type="quantity" />
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h4>Market Price:</h4>
                </div>
                <div className="col">
                    <h4>{price}</h4>
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h4>Estimated cost:</h4>
                </div>
                <div className="col">
                    <h4>{quantity * price}</h4>
                </div>
            </div>

        <button type="submit" className="sumbit col-12 p-3 mb-2 bg-dark text-white">BUY</button> 
        </form>
        </div>
        );      
}



