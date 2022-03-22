const {PromisedDatabase} = require('promised-sqlite3')
const db = new PromisedDatabase()
const express = require('express')
const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('home')
})

async function createTable(){
        await db.open('company.db')
        
        db.exec(`
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS "departments" (
            "name"	TEXT NOT NULL,
            "contact_email"	TEXT NOT NULL,
            "floor"	INTEGER NOT NULL,
            "department_id"	INTEGER NOT NULL,
            PRIMARY KEY("department_id" AUTOINCREMENT)
            );
        CREATE TABLE IF NOT EXISTS "messages" (
            "email"	TEXT NOT NULL,
            "department_id"	INTEGER NOT NULL,
            "message_id" INTEGER NOT NULL,
            "title" TEXT NOT NULL,
            "body" TEXT NOT NULL,
            PRIMARY KEY("message_id" AUTOINCREMENT)
            FOREIGN KEY("department_id")
            REFERENCES departments (department_id)
            );
            `)
            await db.close()
        }
        
        async function fillTable(){
            await db.open('company.db')
            let departments = [
                {name: 'IT',
                contact_email: 'it@company.com',
                floor: '1',
                },
                {name: 'Finance',
                contact_email: 'finance@company.com',
                floor: '2',
            },
            {name: 'Human Resources',
            contact_email: 'HR@company.com',
            floor: '3',
        },
                {name: 'Marketing',
                contact_email: 'marketing@company.com',
                floor: '4',
            },
            {name: 'Production',
                contact_email: 'production@company.com',
                floor: '5',
                },
                {name: 'Research',
                contact_email: 'research@company.com',
                floor: '6',
            }
        ]
        // await db.open('company.db')
        let check = await db.get(`
        SELECT * FROM departments
        `)
        console.log('checken säger: '+check)
            // await db.close()
            if(check[0].name == undefined){
                for(let department of departments){
                    // await db.open('company.db')
                  let loopen = await db.run(`
                    INSERT INTO departments (name, contact_email, floor)
                    VALUES ("${department.name}", "${department.contact_email}", "${department.floor}")
                    `)
                    console.log('loopen säger: '+loopen)
                    // await db.close()
                }
                // let test = await db.all(`
                //     SELECT * FROM departments
                // `)
            }
            await db.close()
    }
    
    createTable()
    fillTable()

    

    app.listen(8000)


