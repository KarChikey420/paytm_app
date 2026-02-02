import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const JWT_SECRET = process.env.SECRET_KEY;

export default JWT_SECRET;