import React from 'react';
import {Table} from 'react-bootstrap';


const NormalTxn = props => {

    const {transactions} = props;

    return(
        
      <div>
        <Table className='table'>
          <thead>
            <tr className='tr'>
                <th>Txn Hash</th>
                <th>Block</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
                <th>Txn Fee</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((data, index) => (
              <tr className='trBody' key={index}>
                <td><a href={`https://etherscan.io/tx/${data.hash}`} target="_blank" rel="noreferrer">{data.hash}</a></td>
                <td><a href={`https://etherscan.io/block/${data.blockNumber}`} target="_blank" rel="noreferrer">{data.blockNumber}</a></td>
                <td><a href={`https://etherscan.io/address/${data.from}`} target="_blank" rel="noreferrer">{data.from}</a></td>
                <td><a href={`https://etherscan.io/address/${data.to}`} target="_blank" rel="noreferrer">{data.to}</a></td>
                <td>{window.web3.utils.fromWei(data.value, "ether")} ETH</td>
                <td>{(data.gasPrice * data.gasUsed)/10 ** 18}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
}
export default NormalTxn;