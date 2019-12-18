import { Connection, TYPES } from "tedious"

/**
 * Connects to SQL.
 */
export async function connectToPSNSQL() {
    var config = {
        server: 'psndb.database.windows.net',
        authentication: {
            options: {
                userName: 'psnadmin',
                password: "@R/6vXL&=bjhIr^i`ePq9#;Te&-{<b|38q<%E;&DZ(vN'z3irD.:^6`Xh7V=q*m"
            },
            type: "default"
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

    let connection = new Connection(config);

    connection.on('connect', function (err) {

    });
    connection.on('debug', function (text) {

    })
    return connection;
}

export function loadBulkData(connection, table) {
    var option = { keepNulls: true }; // option to honor null
    var bulkLoad = connection.newBulkLoad(table, option, function (err, rowCont) {
        if (err) {
            throw err;
        }
        console.log('rows inserted :', rowCont);
        connection.close();
    });
    // setup columns
    bulkLoad.addColumn('c1', TYPES.Int, { nullable: true });
    bulkLoad.addColumn('c2', TYPES.NVarChar, { length: 50, nullable: true });

    // add rows
    for (let i = 0; i < arr.length; i++) {
        bulkLoad.addRow({ c2: 'hello' });
    }
    // perform bulk insert
    connection.execBulkLoad(bulkLoad);
}