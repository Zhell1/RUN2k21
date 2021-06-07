// example of use in another RUN class to make some super rare eggs!

var RandomValue = await run.load("c968fc2674921d07c39051fa735e6a5ebbb69cc0b8b90232e76ae87e3d72101a_o2")

class MysteriousEgg extends Jig {
	init(){
		this.randomValue = new RandomValue()
	}
	hatch(){
		let x = this.randomValue.value
        // rarity between 1-99 but we make it super rare to get one near 100
		this.rarity = parseInt(power(100,x*x*x), 10)
	}
}
MysteriousEgg.deps = { RandomValue, power }


// because we don't have Math.pow() in run contracts we need to reimplement it
function power(x,y){
    if(y===0){return 1}
    else if (y%2 ===0){
        return power(x,parseInt(y/2,10))*power(x,parseInt(y/2,10))
    }else{
        return x*power(x,parseInt(y/2))*power(x,parseInt(y/2))
    }

}

// TimestampRequest idea => make an egg that can only be hatched on full moon using https://gist.github.com/endel/dfe6bb2fbe679781948c