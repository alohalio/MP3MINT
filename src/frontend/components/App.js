import {
  Link,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react'
import { ethers } from "ethers"
import MusicNFTMarketplaceAbi from '../contractsData/MusicNFTMarketplace.json'
import MusicNFTMarketplaceAddress from '../contractsData/MusicNFTMarketplace-address.json'
import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap'
import logo from './logo.png'
import Home from './Home.js'
import MyTokens from './MyTokens.js'
import MyResales from './MyResales.js'
import './App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    const signer = provider.getSigner()
    loadContract(signer)
  }
  const loadContract = async (signer) => {
    // Get deployed copy of music nft marketplace contract
    const contract = new ethers.Contract(MusicNFTMarketplaceAddress.address, MusicNFTMarketplaceAbi.abi, signer)
    setContract(contract)
    setLoading(false)
  }
  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navbar expand="lg">
            <Container>
              <Navbar.Brand
                href="/"
                style={{
                  fontWeight: '500',
                  color: 'black'}}
              >
                <img src={logo} width="100" height="100" className="" alt=""/>
                &nbsp; MP3 MINT
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/" style={{color: 'black'}}>Home</Nav.Link>
                  <Nav.Link as={Link} to="/my-tokens" style={{color: 'black'}}>My Tokens</Nav.Link>
                  <Nav.Link as={Link} to="/my-resales" style={{color: 'black'}}>My Resales</Nav.Link>
                </Nav>
                <Nav>
                  {account ? (
                    <Nav.Link
                      href={`https://etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm mx-4">
                      <Button
                        variant="outline-light"
                        style={{
                          borderColor: 'black',
                          color: 'black'}}
                      >
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </Button>

                    </Nav.Link>
                  ) : (
                    <Button
                      onClick={web3Handler}
                      variant="outline-light" 
                      style={{
                        borderColor: 'black',
                        color: 'black'}}
                    >Connect Wallet</Button>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home contract={contract} />
              } />
              <Route path="/my-tokens" element={
                <MyTokens contract={contract} />
              } />
              <Route path="/my-resales" element={
                <MyResales contract={contract} account={account} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;