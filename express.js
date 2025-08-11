import express from 'express';
const __dirname = import.meta.dirname;
const app = express();
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
app.get('/getAdmin', (req, res) => {
    var response = {
        adminId: req.query.adminId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department: req.query.department,
    }
    console.log("Response is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
});


const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    // console.log ("Server running at http://%s:%s", host, port);
    // console.log ("Server running at http://"+ host+ ":" + port);
    console.log (`Server running at http://${host}:${port}`);
    // console.log (`Server running at http://localhost:${port}`);
})