
const numArray = new Uint8Array([ 39, 48, 4, 160, 0, 15, 147, 18, 160, 209, 51, 224, 3, 208, 0, 223, 0]);

class DocumentIdService {

    constructor () {

    }

    decodeArray(bytEncoded) {
        let index1 = 0;

        let num1 = 0;
        let num2 = bytEncoded.length - 1;
        let index2 = num1;

        while (index2 <= num2) {
            if (index1 == numArray.length)
                index1 = 0;
            bytEncoded[index2] = (bytEncoded[index2] ^ numArray[index1]);
            ++index1;
            ++index2;
        }

        return bytEncoded;
    }

    parseStringToByteArray(text) {
        let bytes = [];

        for (var i = 0; i < text.length; ++i) {
            bytes.push(text.charCodeAt(i));
        }

        return new Uint8Array(bytes);
    }

    parseByteArrayToString(array) {
        let result = '';

        for (let i = 0; i < array.length; i++) {
            result += String.fromCharCode(array[i]);
        }

        return result;
    }

    substractFromByteArray(array, startPos, lenght) {
        let result = [];
        
        for (let i = startPos; i < startPos + lenght; i++) {
            result.push(array[i]);
        }

        return this.parseByteArrayToString(new Uint8Array(result));
    }

    getDocumentObject(array) {
        return {
            documentId        : this.substractFromByteArray(array, 0,  9),
            lastname1         : this.substractFromByteArray(array, 9,  26).replace(/\u0000/g, ''),
            lastname2         : this.substractFromByteArray(array, 35, 26).replace(/\u0000/g, ''),
            firstName         : this.substractFromByteArray(array, 61, 30).replace(/\u0000/g, ''),
            gender            : this.substractFromByteArray(array, 91,  1),
            birthDate         : this.substractFromByteArray(array, 92,  8),
            expirationDate    : this.substractFromByteArray(array, 100, 8),
            firstFingerPrint  : this.substractFromByteArray(array, 116, 1),
            secondFingerPrint : this.substractFromByteArray(array, 117, 1),
        };
    }

    decodeDocumentID(encodedText){
        const decodedArray = this.decodeArray(this.parseStringToByteArray(encodedText));

        return this.getDocumentObject(decodedArray);
    }

    searchByDocumentId (documentId) {
        const MOCK_PERSON = {
            name       : 'Jorge Daniel',
            lastname_1 : 'Valverde',
            lastname_2 : 'Matarrita',
        },
        API = `http://10.28.6.37:8080/api/person/${documentId}`;

        return MOCK_PERSON;
        
        // fetch('https://jsonplaceholder.typicode.com/users')
        //         .then( response => MOCK_PERSON /*response.json()*/ )
        //         .catch( e => console.log(e) );
    }

}

export default new DocumentIdService();