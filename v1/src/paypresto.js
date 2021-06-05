const { Presto, embed } = Paypresto;

function presto(){

    const payment = Presto.create({
    key: "Kx2p4o7FYJYjEwufdYJLXjPtu2vaSpQ8mB7mjMJnaHnPSrGQ1nQk",
    description: "My test payment",
    outputs: [
        { to: "1CBTGrChDDGsewF1eAV6FQyxRaSXRvUT7o", satoshis: 5000 },
        { data: [Buffer.from("Hello world!")] }
    ]
    });

    payment
    .mount(embed("#widget"))
    .on("funded", (payment) => payment.pushTx())
    .on("success", (txid) => console.log("TX sent", txid));

}