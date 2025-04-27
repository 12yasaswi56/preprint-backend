const mongoose = require('mongoose');


// Function to generate a random DOI (6 letters + 6 numbers)
function generateDOI() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    let alphaPart = '';
    let numPart = '';

    // Generate 6 random letters
    for (let i = 0; i < 6; i++) {
        alphaPart += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generate 6 random numbers
    for (let i = 0; i < 6; i++) {
        numPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return `10.1234/${alphaPart}${numPart}`;
}


const PreprintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    abstract: { type: String, required: true },
    doi: { type: String, required : true, default: generateDOI},
    references: [
        {
            title: { type: String, required: false },
            link: { type: String, required: false }
        }
    ],
    pdf: { type: String, required: true },
    status: { type: String, default: 'Submitted' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});



module.exports = mongoose.model('Preprint', PreprintSchema);
