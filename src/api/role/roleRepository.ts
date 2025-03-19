


import db from '@/config/db'


export class RoleRepository {
    async findAllAsync() {
        let query = db('roles').select('*') 
        return query
    }
}