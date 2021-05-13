import path from 'path'
import { Pool } from 'pg'
import { migrate } from 'postgres-migrations'

const poolConfig = {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
}



const connect = {
    pool: new Pool(poolConfig),
    runMigrations: async function (): Promise<void> {
        const client = await this.pool.connect()
        try {
            await migrate( {client}, path.resolve(__dirname, 'migrations') )
        } catch (error) {
            console.log('migration failed', error)
        } finally {
            client.release()
        }
    }
}

export default connect