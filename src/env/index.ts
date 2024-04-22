import 'dotenv/config'
require('dotenv').config()

class Env {
    static PORT = process.env.PORT || 3000;
    static REDIS_URL = process.env.REDIS_URL;
    static JWT_SECRET = process.env.JWT_SECRET;
}

export default Env