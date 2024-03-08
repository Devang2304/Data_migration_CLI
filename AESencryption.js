import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';




export const generatesecretKey = ()=> {
    const keyLength=32;
    const buffer = new Uint32Array(keyLength);
    crypto.getRandomValues(buffer);
    return Array.from(buffer, (byte) =>
        byte.toString(16).padStart(2, '0')
    ).join('');
}

export const encryptFile = (filePath, secretKey) => {
    const fileData = fs.readFileSync(filePath);
    try {
        const encryptedData = CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(fileData), secretKey).toString();
        // const extension = path.extname(filePath);
        // const encryptedFilePath = filePath.replace(extension, '.encrypted');
        const encryptedFilePath = filePath;
        fs.writeFileSync(encryptedFilePath, encryptedData);
        console.log("File encrypted successfully!");
    } catch (error) {
        console.log("Error during encryption of file", error);
    }
}

export const decryptFile = (filePath, secretKey) => {
    try {
        const encryptedData = fs.readFileSync(filePath, 'utf8');
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Latin1);
        // const extension = path.extname(filePath);
        // const decryptedFilePath = filePath.replace( extension,'.encrypted');
        const decryptedFilePath = filePath;
        fs.writeFileSync(decryptedFilePath, decryptedData);
        console.log("File decrypted successfully!");
    } catch (error) {
        console.log("Error during decryption of file", error);
    }
};





// const secretKey=generatesecretKey();
// console.log(secretKey);

decryptFile('./backup.sql','d56d4a043edc26d19401805bbc3a022fcf6de4c49ae2d8ad491f3a97cb325a315e038923d259a9d1b9ff5dcc200c821f6a31d37aeae3aea4f2288eb7f8f4bcb4f9632e03fc57331fe0466aebe89b3fec73a284a6e782382973ca4aaa51709ca2ba286db5418199aeca2b4e33c13a41cd731b36271a16be6e3ad1cce0b398d');
// encryptFile('./backup.sql','d56d4a043edc26d19401805bbc3a022fcf6de4c49ae2d8ad491f3a97cb325a315e038923d259a9d1b9ff5dcc200c821f6a31d37aeae3aea4f2288eb7f8f4bcb4f9632e03fc57331fe0466aebe89b3fec73a284a6e782382973ca4aaa51709ca2ba286db5418199aeca2b4e33c13a41cd731b36271a16be6e3ad1cce0b398d');