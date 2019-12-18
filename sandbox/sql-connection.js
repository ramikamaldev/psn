var Connection = require("tedious").Connection;
var config = {
    server: 'psndb.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'psnadmin',
            password: "@R/6vXL&=bjhIr^i`ePq9#;Te&-{<b|38q<%E;&DZ(vN'z3irD.:^6`Xh7V=q*m"
        },
        type:"default"
    }, options: {
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        },
        database: 'admin',
        encrypt: true // for Azure users
    }
};

async function awaitConnection() {
    new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            // If no error, then good to go...
            if (!err) {
                console.log("CONNECTED!")
                return resolve(1);
            }
            else
            {
                console.log(err);
                return reject(0);
            }
        });
        connection.on('debug', function (text) {
            //console.log(text);
        });

    })

}

awaitConnection().then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});