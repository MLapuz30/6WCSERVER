import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

var storage = multer.diskStorage({
    destination: (req, file, callback ) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).fields([{ name: 'file', maxCount: 1}]);;

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/pages/uploadForm.html'));
// });

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).send('Error uploading file');
        
        const username = req.body.username;

        const uploadedFile = req.files['file'][0];

        console.log(`Username: ${username}`);
        console.log(`File path: ${uploadedFile.path}`);
        res.end('File and form data uploaded successfully!');
    });
});


// const __dirname = import.meta.dirname;
// const app = express();

const urlEncoderParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));

//Page Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});
app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
});
app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html');
});


//API Routes
app.get('/getStudent', (req, res) => {
    var response = {
        studentId: req.query.studentId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section,
    }
    console.log("Response is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
});
app.post('/postAdmin', urlEncoderParser, (req, res) => {
    // var response = {
    //     adminId: req.body.adminId,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     department: req.body.department,
    // }
    // console.log("Response is: ", response);
    // res.end(`Received Data: ${JSON.stringify(response)}`);

    upload(req, res, (err) => {
        if (err) return res.status(400).send('Error uploading file');
        
        const adminId = req.body.adminId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const department = req.body.department;

        const uploadedFile = req.files['file'][0];

        console.log(`Admin Id: ${adminId}`);
        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Department: ${department}`);

        console.log(`File path: ${uploadedFile.path}`);
        res.end('File and form data uploaded successfully!');
    });
});


const server = app.listen(5000, () => {
    // const host = server.address().address;
    const port = server.address().port;
    // console.log ("Server running at http://%s:%s", host, port);
    // console.log ("Server running at http://"+ host+ ":" + port);
    // console.log (`Server running at http://${host}:${port}`);
    console.log (`Server running at http://localhost:${port}`);
})