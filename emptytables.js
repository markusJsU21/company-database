const {PromisedDatabase} = require('promised-sqlite3')
const db = new PromisedDatabase()

async function emptyTables(){
    await db.open('company.db')
    await db.run(`
    DELETE FROM departments
    `)
    let check = await db.get(`
        SELECT * FROM departments
        `)
        console.log(check)
    await db.close()
}
emptyTables()