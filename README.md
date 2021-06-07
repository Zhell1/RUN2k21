# front-end for RUN2k21 entry


this repo is deployed at http://run2k21.runcraft.io/

motivation: oracles need to establish trust
problem: this cannot be done with satoshi-priced oracles as crypto prices are very volatile, as bsv proved in past months
        if price does x10, your oracle price does too.
        if price does /10, your oracle might be losing money
idea: we need usd-priced oracles
hardship: we don't have a bsvusd price onchain as a run contract
          and if we did the contract would get updated a lot of quickly become slow to sync
          (at least until all apps have trusted cache servers, and we are still far from it today)

goal: we want an oracle that has those properties:
    - is priced in usd
    - can reliably be called despite price volatility
    - can update its usd price both downward & upward
    - doesn't have sync issues even if updating its price upward
    - can be profitable (doesn't waste money)

epic fails:
    - experimented with 3steps oracle (init, then fund, then getvalue), too complicated for user and doesn't really solves the problem
    - first proof of concept required to update all oracles' prices every single day at least, hard to remain profitable

BSVUSD doesn't have an onchain satoshi price (but a usd one)

the user must retrieve the usd price, calculate the nb of satoshis, and put it in the init
we accept a 20% margin below our own computed value for synchronization help
but to be sure we recommand you send at the exact computed price or to add 1-2% on top
in the future we may provide an API to get the exact value in satoshis but we want it to work without the need for one

all others work this same way, which is nice because it allows the user to check the price of the oracle in usd
if we happen to update it, he can set a max price to pay in usd and if the oracle service increases price too much he is safe

Also to remove the risk of an update to the price breaking your oracleRequest, if both happened at the same time,
we tolerate a window of time after any price update, where users can pay using the previous price.
So always make sure to sync() and use the latest price so it can work combined with our security window.


Architecture

Oracle

Each Oracle is itself an nft that can be transferred to another service
the usd price can be changed too.
it also allows you to update a message for users, and to deprecate it.

OracleRequest

this class must be extended
those are the instances that the users actually use
they all have an Oracle linked to their constructor that gives the latest usdprice for calls
	 * To use this usd-price OracleRequest:
	 * 		1) Compute the amount of satoshis to pay on your side:
	 * 			- based on the current bsv/usd price from APIs (we accept a -20% margin of error)
	 * 			- based on the usd price in the .oracle.priceUSD
	 * 			- pass that amount of satoshis in init() like: new RandomValue(1000)
	 * 		2) You then wait for the oracle to set() the .randomValue.value with a retry loop
	 * 			that periodically syncs your jig & tries to read the value

Extends from OracleRequest

example:
    export class RandomValueRequest extends OracleRequest_priceUSD {}
    RandomValueRequest.description="get a random value as a float between 0 and 1, same as Math.random() but for jigs."


other ideas that might improve the system if they happen to work:
    - accept the price paid based on any of the current or the last 24h average to reduce price volatility risk for users even more
    - provide an npm package as an easy way to use the oracles with their satoshi prices
    - provide an API to get the satoshi price of oracles (but we prefer onchain stuff as much as possible)
    - provide an API with a /{txid} endpoint to get the status of our tx when it failed to get set() by oracle
            ex "too low payment amount"
    - find a way to let users submit a recent preev tx in init() as the proof of bsvusd price they want to use
    - let users submit in init() any instance of one of our BSVUSDrequest onchain tx, the oracle will check its blockchain timestamp
        if it's below 24h, we can accept this price as the bsvusd price the user uses to pay
        con: more work for the user ? put it in a helper function in a lib ?
    - accept relayx-USDC tokens as payment instead of satoshi -> would make everything easier for price calculation

# build

depending on your build you must specify "homepage" property in package.json:

on local & on runcraft.io:

-  no homepage 

on github pages:

-  "homepage": "https://zhell1.github.io/RUN2k21/",
