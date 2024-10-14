import { MongoClient } from "mongodb"

const Page = async () => {
    const DB_NAME = 'db1'
    const DB_HOST = 'rc1b-h87tfblewylztkk2.mdb.yandexcloud.net:27018'
    const DB_USER = 'user1'
    const DB_PASS = '2515187Jeka'

    const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/?replicaSet=rs01&authSource=${DB_NAME}&ssl=true`

    try {
        const client = new MongoClient(url)
        await client.connect()
        const db = client.db(DB_NAME)
        console.log(db.databaseName)
        await client.close()
    } catch (error) {
        console.error("MongoDB connection error:", error)
    }

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default Page
