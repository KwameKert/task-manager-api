
const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


const checkHealth = async (req, res) => {
    let seconds = process.uptime();	
	let d = Math.floor(seconds / (3600*24));
	let h = Math.floor(seconds % (3600*24) / 3600);
	let m = Math.floor(seconds % 3600 / 60);
	let s = Math.floor(seconds % 60);
	
	const healthcheck = {
		uptime: `${d} days, ${h} hours, ${m} minutes, ${s} seconds`,
		message: 'OK',
		timestamp: Date.now()
	};

	try {
        return responseApi(res, 200, healthcheck, 'Endpoint Ok');
	} catch (e) {
       
		res.status(503).send(e.message);
	}
}

module.exports = {
    checkHealth
}