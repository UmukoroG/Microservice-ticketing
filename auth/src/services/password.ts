import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt); //promisify is a function that takes a function that uses callbacks and returns a promise version of that function

export class Password{
    //static methods are methods that can be called without creating an instance of the class   
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = await scryptAsync(password, salt, 64) as Buffer;//scrypt returns a buffer 
        
        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = await scryptAsync(suppliedPassword, salt, 64) as Buffer;
        return buf.toString('hex') === hashedPassword;
    }
}