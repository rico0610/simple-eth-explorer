import React from 'react';
import {Table} from 'react-bootstrap';


const Erc20TokenTxn = props => {

    const {ERC20Txn} = props

    return(
        
        <div>
            <Table className='table'>
                <thead>
                    <tr className='tr'>
                        <th>Txn Hash</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>Token</th>
                    </tr>
                </thead>
                <tbody>
                    {ERC20Txn.map((data, index) => (
                    <tr className='trBody' key={index}>
                        <td><a href={`https://etherscan.io/tx/${data.hash}`} target="_blank" rel="noreferrer">{data.hash}</a></td>
                        <td><a href={`https://etherscan.io/address/${data.from}`} target="_blank" rel="noreferrer">{data.from}</a></td>
                        <td><a href={`https://etherscan.io/address/${data.to}`} target="_blank" rel="noreferrer">{data.to}</a></td>
                        <td>{window.web3.utils.fromWei(data.value, "ether")}</td>
                        <td>{data.tokenSymbol}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default Erc20TokenTxn;