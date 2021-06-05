const Run = require('run-sdk')

import {Presto, embed} from 'paypresto.js'

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = "hello" //

    console.log("Run = ",Run)
  
    return element;
}
document.body.appendChild(component());

function test_run(){
  var run = new Run()

  console.log("run = ",run)
}
window.test_run=test_run

function pay(){
  const payment = Presto.create({
    key: 'Kx2p4o7FYJYjEwufdYJLXjPtu2vaSpQ8mB7mjMJnaHnPSrGQ1nQk',
    description: 'My test payment',
    outputs: [
      { to: '1CBTGrChDDGsewF1eAV6FQyxRaSXRvUT7o', satoshis: 5000 },
      { data: [Buffer.from("Hello world!")] }
    ]
  })
  
  payment
    .mount(embed('#widget'))
    .on('funded', payment => payment.pushTx())
    .on('success', txid => console.log('TX sent', txid))
}
window.pay=pay