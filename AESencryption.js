const cryptoJS=require('crypto-js');
const fs=require('fs');



const generatesecretKey = ()=> {
    const keyLength=32;
    const buffer = new Uint32Array(keyLength);
    crypto.getRandomValues(buffer);
    return Array.from(buffer, (byte) =>
        byte.toString(16).padStart(2, '0')
    ).join('');
}

const encryptFile=(filePath,secretKey)=>{
    const fileData=fs.readFileSync(filePath,'utf8');
    try {
        const encryptedData = cryptoJS.AES.encrypt(fileData,secretKey).toString();
        const encryptedFleFath = filePath;
        fs.writeFileSync(encryptedFleFath,encryptedData);
        console.log("File ecrypted successfully!");
    } catch (error) {
        console.log("Error during encrytion of file",error);
    }
}

const decryptFile = (filePath, secretKey) => {
    try {
        const encryptedData = fs.readFileSync(filePath, 'utf8');
        const decryptedData = cryptoJS.AES.decrypt(encryptedData, secretKey).toString(cryptoJS.enc.Utf8);
        const decryptedFilePath =filePath;
        fs.writeFileSync(decryptedFilePath, decryptedData);
        console.log("File decrypted successfully!");
    } catch (error) {
        console.log("Error during decryption of file", error);
    }
};



const secretKey=generatesecretKey();
console.log(secretKey);

// decryptFile('../data.json',secretKey);
// encryptFile('../data.json',secretKey);