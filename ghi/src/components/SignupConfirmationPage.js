import { Link } from "react-router-dom";

export default function SignupConfirmationPage(props) {
    return (
        <div className="confirmation d-flex row justify-content-center text-center">
            <div className="d-flex justify-content-around row col-6">
                <h1 className="display-4 p-3">Success!</h1>
                <h4 className="display-6 p-3">Welcome {props.username}</h4>

                <h5 className="display-6 p-3">
                    Please
                    <Link
                        className=" d-inline nav-link"
                        to="/Login"
                    >
                        Login
                    </Link>
                    to begin trading
                </h5>
            </div>
        </div>
    );
}
