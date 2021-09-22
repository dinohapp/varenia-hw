getData = () => {
	let price = Math.floor(Math.random() * 2000);
	let time = Math.random() * 2000;
	console.log('Loading item. Will wait ' + time.toFixed(0)+'ms. Price: ' + price);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
		resolve({price});
		}, time);
	});
};


//number of items we want to request from the server
let numberOfItems = 12;
promisesData = [];
//make the async calls to get the items from the server and push it to promisesData array. 
(getPromises = async () => {
	for (let i=0; i<numberOfItems; i++) {
		await getData().then((val => {
			promisesData.push(val);
		}))
		.catch(error => console.log(error)) //log the error, if there is one.
	}
	//once all promises were fetched, sort the promises array and log it to the console.
	await promisesData.sort((a,b) => {
		return a.price - b.price;
	});
	console.log(promisesData);
})()

//this code helped me a lot: https://gist.github.com/indiesquidge/5960274889e17102b5130e8bd2ce9002