import { useState } from 'react';


function BoostrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
                <label htmlFor={id} className="form-label">{labelText}</label>
                <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
        </div>
    )
}


function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
        <form>
            <BoostrapInput 
                id="username" 
                placeholder="Your username here"
                labelText="User Name" 
                value={userName}
                onChange={e => setUserName(e.target.value)}
                type="text" />
            <BoostrapInput 
                id="password" 
                placeholder="Password" 
                labelText="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password" />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    )

}

export default Login;