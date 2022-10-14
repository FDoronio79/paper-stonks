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


function PositionForm(props) {

    // const [username, setUsername] = useState('');
    // const [symbol, setSymbol] = useState('');
    // const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    // const [type_of, setType] = useState('');

    useEffect(() => {
        async function getToken() {
            const url = `${process.env.REACT_APP_API_HOST}/token`;
            const response = fetch(url);
            if (response.ok) {
                const data = await response.json();
            }

        }
    }
    
    )

    useEffect(() => {
        async function getAccount() {
            const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;
            const response = fetch(url);
            if (response.ok) {
                const data = await response.json();
            }

        }
    }
    
    )



    return (
        <div className="container text-left col-5 mt-5 border border-dark p-3 ">
        <form>
            <div className="row my-4">
                <div className="col">
                    <h2>Buy Order</h2>
                </div>
                <div className="col">
                    <h2>symbol here</h2>
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h2>Shares</h2>
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
                    <h2>Market Price:</h2>
                </div>
                <div className="col">
                    <h2>$100.00</h2>
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h2>Estimated cost:</h2>
                </div>
                <div className="col">
                    <h2>----</h2>
                </div>
            </div>

        <button type="cancel" className="sumbit col-12 p-3 mb-2 bg-dark text-white">Review</button> 
        </form>
        </div>
        );      
}

export default PositionForm







//         <div className="mb-3">
//             <label htmlFor="price" className="example-form-label">price</label>
//             <input value={price} onChange={e => setPrice(e.target.value)} required type="price" className="form-control" id="price" placeholder="price" />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="type_of" className="example-form-label">type_of</label>
//             <input value={type_of} onChange={e => setType(e.target.value)} required type="type_of" className="form-control" id="type_of" placeholder="type_of" />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="quantity" className="example-form-label">quantity</label>
//             <input value={quantity} onChange={e => setQuantity(e.target.value)} required type="quantity" className="form-control" id="quantity" placeholder="quantity" />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="time_of_purchase" className="example-form-label">time_of_purchase</label>
//             <input value={time_of_purchase} onChange={e => setTime(e.target.value)} required type="time_of_purchase" className="form-control" id="time_of_purchase" placeholder="time_of_purchase" />
//         </div>
//         <button type="submit" className="sumbit">Submit</button> 

//         </form>
//     );
// }

// export default TransactionForm


