function CryptoInfo()
{
    return(
        <div>
        <h6 className="fw-bold text-center" 
        style={{
                color: "white"
            }}> 
            Top Crypto</h6>
        <div className="p-3 border rounded"
                style={{
                    background: "#292828",
                    borderRadius: "120px",
                    border: "#198754",
                        }}>
    <div className="px-4 py-1 my-2 text-center">
    <div>
    <table className="table table-striped"> 
            <tr>
            <td className="fw-bold text-center" 
                style={{
                color: "white"
                        }}>
                Test
            </td>
            <td className="align-bottom bg-success text-white"> % change box </td>
            <td className="text-white"> Current share price</td>
            </tr>
            <tr>
                <td className="text-secondary align-bottom align-left"> # Shares </td>
                <td className="text-secondary align-bottom align-center">|</td>
                <td className="text-secondary align-bottom align-left"> Assest Position</td>
            </tr>

            <tr>
            <td className="fw-bold text-center" 
                style={{
                color: "white"
                        }}>
                Test1
            </td>
            </tr>
            
            <tr>
            <td className="fw-bold text-center" 
                style={{
                color: "white"
                        }}>
                Test2
            </td>
            </tr>
            <tr>
            <td className="fw-bold text-center" 
                style={{
                color: "white"
                        }}>
                Test3
            </td>
            </tr>
            <tr>
            <td className="fw-bold text-left" 
                style={{
                color: "white"
                        }}>
                Test4
            </td>
            </tr>
            <tr>
            <td className="fw-bold text-left" 
                style={{
                color: "white"
                        }}>
                Test5
            </td>
            </tr>
    </table>
    </div>


    </div>
    </div> 
    </div>

    );
}

export default CryptoInfo;