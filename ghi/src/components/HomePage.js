import React from "react";
import ps_logo from "../ghi/src/ps_logo.png"
console.log(ps_logo)


function HomePage() {
    return (<>
        <div>
            <h5> Welcome to Paper STONKS</h5>

            <div className="col-lg-6 mx-auto ">
                <p className="d-inline-flex p-2 row lead mb-4">
                Paper stonks is a new paper trading app still in development!
                </p>
            </div>

            <img src={ps_logo} alt="Logo" />;

        </div>
    </>
    );
}




export default HomePage;