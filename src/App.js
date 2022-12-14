import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Form, FormControl, Button, Nav, Card, Spinner } from 'react-bootstrap';
import { configureWeb3 } from './blockchain-helper';
import NormalTxn from './components/NormalTxn';
import Erc20TokenTxn from './components/Erc20TokenTxn';
import Error from './pages/Error';

function App() {

//------Hooks----------

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [ERC20Txn, setERC20Txn] = useState([]);
  const [address, setAddress] = useState('');
  const [activeTab, setActiveTab] = useState('#tx');
  const [cardBody, setCardBody] = useState('');


  useEffect(() => {

    let timer = setTimeout(() => {

      if (activeTab === '#tx') {

        const tx = (<NormalTxn transactions={transactions}/>);
        setCardBody(tx);
      } else if (activeTab === '#erc20') {

        //refreshPage();

        const erc20 = (<Erc20TokenTxn ERC20={ERC20Txn}/>);
        setCardBody(erc20);
      }
    }, 1000);

    return() => clearTimeout(timer);
  });

//-------Functions----------

  // const testWeb3 = async () => {
  //   window.web3 = await configureWeb3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_AK}`);
  //   console.log(window.web3);
  // }

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  // function timeout(delay) {
  //   return new Promise( res => setTimeout(res, delay) );
  // }

  const fetchNormalTxs = async () => {

   // testWeb3();

   window.web3 = configureWeb3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_AK}`);
   console.log(window.web3);

    await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort="desc"&apikey=${process.env.REACT_APP_ETHERSCAN_AK}`)
    .then(res=>res.json())
    .then(result=>{

      console.log(result.result);
      setTransactions(result.result);
      setStatus(result.status);
      setLoading(false);
      setAddress('');
    })
    .catch(error=>{

      console.log(error);
    });
  }

  const fetchERC20Txs = async () => {

    await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=100&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_AK2}`)
    .then(res=>res.json())
    .then(result=>{

      console.log(result.result);
      setERC20Txn(result.result);
    })
    .catch(error=>{

      console.log(error);
    })
  }

//-------Loading Condition----------
  if (loading) return (

    <Container style={{ padding: "1rem 0" }}>
        <Spinner animation="grow" variant="primary" />
    </Container>
  )


  return(
    <Container>
      {status === '0' ?
      <Row>
        <Error/>
      </Row>
      :
      <>
      <Row className='header mt-2 mb-5'>
        <Col className='mb-4'>
          <img className="mt-5" style={{width: "15%"}} src='https://www.logo.wine/a/logo/Ethereum/Ethereum-Logo.wine.svg' alt="eth-logo"></img>
          <h1>Simple Ethereum Explorer</h1>
          </Col>
        <Form className="form d-flex">
            <FormControl
                type="search"
                placeholder="Search by Address..."
                className="search-bar me-2"
                aria-label="Search"
                onChange={e => setAddress(e.target.value)}
            />
            <Button 
              className="button" 
              onClick={()=> fetchERC20Txs() && setTimeout(fetchNormalTxs, 5000) && setLoading(true)}
              disabled={address === ''}
              >
              Search
            </Button>
        </Form>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
            <Card className="infobox mb-5">
                <Card.Header>
                    <Nav className="nav" variant="tabs" defaultActiveKey="#tx" onSelect={(selectedKey) => setActiveTab(selectedKey)} >
                        <Nav.Item>
                            <Nav.Link className="linkText" href="#tx">Transactions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="linkText" href="#erc20">ERC20 Token Txn</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="cardBody">
                    {cardBody}
                </Card.Body>
            </Card>
        </Col>
      </Row>
      </>
      }
    </Container>
  )

};

export default App;
