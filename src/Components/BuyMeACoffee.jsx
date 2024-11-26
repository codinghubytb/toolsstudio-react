import "./BuyMeACoffee.css";

const BuyMeACoffee = () => {
    return (
    <a target="_blank" href="https://buymeacoffee.com/codinghubstudio">
        <div className="content-bmc">
            <div className="text-bmc">
                Like my content? Support with a coffee!
            </div>
            <div id="bmc-wbtn">
                <img src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg" alt="Buy Me A Coffee" 
                style=
                {{height: "36px",
                width: "36px",
                margin: 0,
                padding: 0, }} />
            </div>
        </div>
    </a>);
};

export default BuyMeACoffee;
