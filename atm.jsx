const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [history, setHistory] = React.useState("");
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      setDeposit(Number(event.target.value));
      if (event.target.value <= 0 || event.target.value == '') {
        setValidTransaction(false);   
      } else {
        if (!isDeposit && (event.target.value > totalState)) {
          setValidTransaction(false);
        } else {
          setValidTransaction(true);
        }
      }
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      
      let operation = "";
      if (isDeposit) {
        operation = "Deposit";
      } else {
        operation = "Cash Back";
      }

      setHistory(history + `Transaction: ${operation} $ ${deposit}  `);
      setTotalState(newTotal);
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      switch (event.target.value) {
        case 'Deposit':
          setAtmMode(event.target.value);
          setIsDeposit(true);
          break;
        case 'Cash Back':
          setAtmMode(event.target.value);
          setIsDeposit(false);
          break;
        default:
          setAtmMode(event.target.value);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue &nbsp;</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        <br />
        {atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>}
        <h2>History</h2>
        <div id="history">{history}</div>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  