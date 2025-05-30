const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const User = require('./models/User.js');
const { cloudinary, uploadToCloudinary } = require('./cloudinary.js');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5001;
require('dotenv').config();
const session = require('express-session');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

const helmet = require('helmet');
app.use(helmet()); // Place near top
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:"], // if you use base64 images
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );
app.disable('x-powered-by'); // Optional redundancy

const secret = process.env.secretKey;
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
//     ssl: true,                   // Enables SSL/TLS
//   sslValidate: true  
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));


//Ensure the uploads directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save uploaded files to the 'public/uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});

const upload = multer({ storage: storage });



// const upload = multer({ dest: "uploads/" }); // temp folder

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Assuming you want to save files to the "uploads" directory
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);  // Retains original filename
//     }
//   });
//   const upload = multer({ storage });

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, 'uploads/');
//         },
//         filename: (req, file, cb) => {
//             cb(null, Date.now() + '-' + file.originalname);
//         }
//     }),
//     limits: { fileSize: 10 * 1024 * 1024 },  // 10 MB limit
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /pdf|jpeg|jpg|png/;
//         const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = fileTypes.test(file.mimetype);

//         if (extname && mimetype) {
//             return cb(null, true);
//         }
//         cb(new Error('Invalid file type. Only PDFs and images are allowed.'));
//     }
// });


// to verify the token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Received Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(403).json({ success: false, error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    console.log("Extracted Token:", token);

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.error("Token Verification Failed:", err);
            return res.status(403).json({ success: false, error: "Invalid Token" });
        }
        req.user = user;
        next();
    });
};
// Import the Preprint model
const Preprint = require('./models/Preprint');

// // Routes
// app.get('/search', async (req, res) => {
//     try {
//         const searchQuery = req.query.query || '';  // Fix the query parameter
//         console.log('Search Query:', searchQuery);

//         let preprints = await Preprint.find({
//             title: { $regex: searchQuery, $options: "i" }  // Efficient filtering in MongoDB
//         });

//         console.log('Final Displayed Preprints:', preprints);
//         res.json(preprints);  // Send JSON response
//     } catch (err) {
//         console.error('Error fetching preprints:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.get('/search', async (req, res) => {
    try {
        const rawQuery = req.query.query;

        // Ensure it's a string
        const searchQuery = typeof rawQuery === 'string' ? rawQuery : '';

        // Validate query (only alphanumerics and spaces, max 50 chars)
        if (!/^[\w\s]{0,50}$/.test(searchQuery)) {
            return res.status(400).json({ error: 'Invalid search query. Use alphanumerics and spaces only (max 50 chars).' });
        }

        // Escape regex special characters
        function escapeRegex(input) {
            if (typeof input !== 'string') return ''; // Defensive check
            return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        const safeSearchQuery = escapeRegex(searchQuery);

        const preprints = await Preprint.find({
            title: { $regex: safeSearchQuery, $options: "i" }
        });

        res.json(preprints);
    } catch (err) {
        console.error('Error fetching preprints:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/search', async (req, res) => {
//     try {
//         const searchQuery = req.query.query || '';

//         // Validate query
//         if (!/^[\w\s]{0,50}$/.test(searchQuery)) {
//             return res.status(400).json({ error: 'Invalid search query. Use alphanumerics and spaces only (max 50 chars).' });
//         }

//         // Escape regex special characters
//         function escapeRegex(string) {
//             return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//         }
//         const safeSearchQuery = escapeRegex(searchQuery);

//         const preprints = await Preprint.find({
//             title: { $regex: safeSearchQuery, $options: "i" }
//         });

//         res.json(preprints);
//     } catch (err) {
//         console.error('Error fetching preprints:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });








app.get('/', (req, res) => {
    res.send('root');
});

/*
app.get('/submit', (req, res) => {
    res.render('submit');
});*/

// **Login Route**
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "30d" });

        //localStorage.setItem("token", token);
       // console.log("Stored Token:", localStorage.getItem("token")); // 🔍 Debugging
        
        res.json({ success: true, token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



// app.get('/preprints', async (req, res) => {
//     try {
//         const searchQuery = req.query.search || '';
//         let preprints = await Preprint.find();

//         if (searchQuery) {
//             preprints = preprints.filter(preprint =>
//                 new RegExp(searchQuery, 'i').test(preprint.title)
//             );
//         }

//         res.json({ success: true, preprints });
//     } catch (err) {
//         console.error('Error fetching preprints:', err);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// });

// Utility function to escape regex special characters
// function escapeRegex(string) {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }
function escapeRegex(string) {
    if (typeof string !== 'string') return '';
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

app.get('/preprints', async (req, res) => {
    try {
        const searchQuery = req.query.search || '';

        // ✅ Validate input type and length
        if (typeof searchQuery !== 'string' || searchQuery.length > 100) {
            return res.status(400).json({ success: false, error: 'Invalid or too long search query' });
        }

        let preprints = await Preprint.find();

        if (searchQuery) {
            let regex;
            try {
                const safeQuery = escapeRegex(searchQuery); // 🔐 Escape special characters
                regex = new RegExp(safeQuery, 'i');          // Now safe to use in RegExp
            } catch (e) {
                return res.status(400).json({ success: false, error: 'Invalid search pattern' });
            }

            preprints = preprints.filter(preprint =>
                regex.test(preprint.title)
            );
        }

        res.json({ success: true, preprints });
    } catch (err) {
        console.error('Error fetching preprints:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// app.get('/preprints', async (req, res) => {
//     try {
//         const searchQuery = req.query.search || '';

//         // ✅ Validate input type and length
//         if (typeof searchQuery !== 'string' || searchQuery.length > 100) {
//             return res.status(400).json({ success: false, error: 'Invalid or too long search query' });
//         }

//         let preprints = await Preprint.find();

//         if (searchQuery) {
//             let regex;
//             try {
//                 regex = new RegExp(searchQuery, 'i'); // i = case-insensitive
//             } catch (e) {
//                 return res.status(400).json({ success: false, error: 'Invalid search pattern' });
//             }

//             preprints = preprints.filter(preprint =>
//                 regex.test(preprint.title)
//             );
//         }

//         res.json({ success: true, preprints });
//     } catch (err) {
//         console.error('Error fetching preprints:', err);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// });



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


// Function to extract references dynamically
function extractReferences(text) {
    const match = text.match(/(References|Bibliography)[\s\S]+/i);
    if (!match) return [];

    const referenceText = match[0];
    const lines = referenceText.split("\n").filter(line => line.trim().length > 5);

    let references = [];
    lines.forEach(line => {
        // Match both DOI and full URLs
        const linkMatch = line.match(/(https?:\/\/[^\s]+|\b10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)/);
        const titleMatch = line.match(/^(.*?)(https?:\/\/[^\s]+|\b10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)/);

        if (titleMatch && linkMatch) {
            let link = linkMatch[0];

            // Convert DOI to a full URL if it's not already
            if (link.startsWith("10.")) {
                link = `https://doi.org/${link}`;
            }

            references.push({
                title: titleMatch[1].trim(), // Extract full title before the link
                link: link
            });
        }
    });

    console.log("Extracted References:", references);
    return references;
}


const pdfParse = require('pdf-parse');

const rateLimit = require('express-rate-limit');
const submitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 requests per IP during this window
    message: {
      success: false,
      error: "Too many submissions from this IP. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

// app.post(
//   '/submit',
//   submitLimiter,              // ✅ Rate limiter middleware
//   verifyToken,
//   upload.single('pdf'),
//   async (req, res) => {
//     try {
//         console.log("Received Data:", req.body);
//         console.log("Uploaded File:", req.file);

//         const { title, author, abstract } = req.body;
//         const userId = req.user.userId;

//         if (!req.file) {
//             return res.status(400).json({ success: false, error: "No PDF uploaded." });
//         }

//         const dataBuffer = fs.readFileSync(req.file.path);
//         const pdfText = (await pdfParse(dataBuffer)).text;
//         const references = extractReferences(pdfText);
//         const doi = generateDOI();

//         const newPreprint = new Preprint({
//             title, author, abstract,
//             pdf: req.file.filename,
//             references, doi,
//             user: userId,
//             status: "Submitted"
//         });

//         await newPreprint.save();

//         console.log("Preprint saved successfully with DOI:", doi);
//         res.json({ success: true, message: "Preprint submitted successfully!", doi });
//     } catch (err) {
//         console.error("Error processing PDF:", err);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// // });
// app.post(
//     '/submit',
//     verifyToken,
//     upload.single('pdf'),  // Upload the file
//     async (req, res) => {
//       try {
//         console.log("Received Data:", req.body);
//         console.log("Uploaded File:", req.file);
  
//         const { title, author, abstract } = req.body;
//         const userId = req.user.userId;  // Assuming userId is in the token
  
//         if (!req.file) {
//           return res.status(400).json({ success: false, error: "No PDF uploaded." });
//         }
  
//         // Read the PDF file locally
//         const dataBuffer = fs.readFileSync(req.file.path);
//         const pdfText = (await pdfParse(dataBuffer)).text;
  
//         // Upload the PDF to Cloudinary
//         const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
//           resource_type: 'raw', // Important for PDFs
//           folder: 'preprints',  // Optional folder in Cloudinary
//         });
  
//         const pdfUrl = cloudinaryResult.secure_url;  // URL of the uploaded PDF
//         console.log("Uploaded to Cloudinary:", pdfUrl);
  
//         // Clean up the local temp file after uploading (optional but recommended)
//         fs.unlinkSync(req.file.path);
  
//         // Extract references from the PDF text
//         const references = extractReferences(pdfText);
//         const doi = generateDOI();
  
//         // Create a new Preprint document
//         const newPreprint = new Preprint({
//           title,
//           author,
//           abstract,
//           pdf: pdfUrl,  // Save the Cloudinary URL, not the local filename
//           references,
//           doi,
//           user: userId,
//           status: "Submitted"
//         });
  
//         // Save the Preprint to the database
//         await newPreprint.save();
  
//         console.log("Preprint saved successfully with DOI:", doi);
//         res.json({ success: true, message: "Preprint submitted successfully!", doi });
  
//       } catch (err) {
//         console.error("Error processing PDF:", err);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//       }
//     }
//   );

// app.post(
//     '/submit',
//     verifyToken,
//     upload.single('pdf'),  // Upload the file
//     async (req, res) => {
//         try {
//             console.log("Received Data:", req.body);
//             console.log("Uploaded File:", req.file);

//             const { title, author, abstract } = req.body;
//             const userId = req.user.userId;  // Assuming userId is in the token

//             if (!req.file) {
//                 return res.status(400).json({ success: false, error: "No PDF uploaded." });
//             }

//             // Read the PDF file locally
//             const dataBuffer = fs.readFileSync(req.file.path);
//             const pdfText = (await pdfParse(dataBuffer)).text;

//             // Upload the PDF to Cloudinary (with resource_type 'raw' for PDFs)
//             const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
//                 resource_type: 'raw', // Important for PDFs
//                 folder: 'preprints',  // Optional folder in Cloudinary
//             });

//             const pdfUrl = cloudinaryResult.secure_url;  // URL of the uploaded PDF
//             console.log("Uploaded to Cloudinary:", pdfUrl);

//             // Clean up the local temp file after uploading (optional but recommended)
//             fs.unlinkSync(req.file.path);

//             // Extract references from the PDF text
//             const references = extractReferences(pdfText); // You need to implement this function
//             const doi = generateDOI(); // You need to implement this function

//             // Create a new Preprint document
//             const newPreprint = new Preprint({
//                 title,
//                 author,
//                 abstract,
//                 pdf: pdfUrl,  // Save the Cloudinary URL, not the local filename
//                 references,
//                 doi,
//                 user: userId,
//                 status: "Submitted"
//             });

//             // Save the Preprint to the database
//             await newPreprint.save();

//             console.log("Preprint saved successfully with DOI:", doi);
//             res.json({ success: true, message: "Preprint submitted successfully!", doi });

//         } catch (err) {
//             console.error("Error processing PDF:", err);
//             res.status(500).json({ success: false, error: "Internal Server Error" });
//         }
//     }
// );

  

app.post('/submit', verifyToken, upload.single('pdf'), async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Log request body
        console.log("Uploaded File:", req.file); // Log uploaded file details
       
        const { title, author, abstract } = req.body;
        const userId = req.user.userId;
        
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No PDF uploaded." });
        }
        
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfText = (await pdfParse(dataBuffer)).text;
        const references = extractReferences(pdfText);
        const doi = generateDOI();
        
        const newPreprint = new Preprint({
            title, author, abstract,
            pdf: req.file.filename,
            references, doi,
            user: userId,
            status: "Submitted"
        });
        await newPreprint.save();

        console.log("Preprint saved successfully with DOI:", doi);
        res.json({ success: true, message: "Preprint submitted successfully!", doi });
    } catch (err) {
        console.error("Error processing PDF:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


//signup route

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        // Directly use a secret key instead of process.env.JWT_SECRET
        // const secretKey = "mySuperSecretKey123"; // Replace with your own secure key
        
        
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.get('/preprint/:id', async (req, res) => {
    try {
        const preprint = await Preprint.findById(req.params.id);
        if (!preprint) {
            return res.status(404).json({ success: false, error: 'Preprint not found' });
        }

        res.json({ success: true, preprint });  // ✅ Send JSON response
    } catch (err) {
        console.error('Error fetching preprint:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.get("/latestpreprints", async (req, res) => {
    try {
      const preprints = await Preprint.find().sort({ _id: -1 }).limit(10); // Fetch latest 10 preprints
      res.json(preprints);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error"});
}
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});





// const videoSchema = new mongoose.Schema({
//     title: String,
//     abstract: String,
//     videoUrl: String
// });

// const Video = mongoose.model('Video', videoSchema);

// const ffmpeg = require('fluent-ffmpeg');
// const gTTS = require('gtts');

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

// app.post('/generate-video', async (req, res) => {
//     const { title, abstract } = req.body;

//     const audioFileName = `${Date.now()}.mp3`;
//     const videoFileName = `${Date.now()}.mp4`;
//     const audioPath = path.join(uploadsDir, audioFileName);
//     const videoPath = path.join(uploadsDir, videoFileName);
//     const imagePath = path.join(__dirname, 'uploads', 'static-image.jpg');  // Ensure static-image.jpg exists

//     const speech = new gTTS(abstract, 'en');

//     speech.save(audioPath, async (err) => {
//         if (err) {
//             console.error('Error generating speech:', err);
//             return res.status(500).send({ success: false, error: err.message });
//         }

//         ffmpeg()
//             .input(imagePath)
//             .input(audioPath)
//             .outputOptions('-c:v', 'libx264', '-tune', 'stillimage', '-shortest')
//             .save(videoPath)
//             .on('stderr', (stderrLine) => console.log(stderrLine))  // Debugging
//             .on('end', async () => {
//                 const newVideo = new Video({
//                     title,
//                     abstract,
//                     videoUrl: `/uploads/${videoFileName}`
//                 });
//                 await newVideo.save();
//                 res.send({ success: true, videoUrl: `http://localhost:${PORT}/uploads/${videoFileName}` });
//             })
//             .on('error', (err) => {
//                 console.error('Error generating video:', err);
//                 res.status(500).send({ success: false, error: err.message });
//             });
//     });
// });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
