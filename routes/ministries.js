const { authRole, authUser } = require('../middleware/auth');
const routes = require('express').Router();
const { spawn } = require('child_process')
const database = require('../services/database')

routes.post('/', authUser, authRole, async (req, res, next) => {

    const script = spawn('python3', ['./public/python_scripts/data_scrapper.py']);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    script.stdout.on('data', async (data) => {
        req.session.success = [];
        let parsed_data = JSON.parse(data)
        await database.ministries.create({ministries:parsed_data}).catch((error) => {console.log(error)})
        req.session.success.push({ msg: 'Η επικαιροποίηση των Υπουργείων ολοκληρώθηκε επιτυχώς.' })
        console.log("parsed_data", parsed_data);
        res.sendStatus(200);
    });

    script.stderr.on('data', (data) => {
        req.session.errors = [];
        // console.error(`stderr: ${data}`);
        req.session.errors.push({ msg: 'Η επικαιροποίηση των Υπουργείων απέτυχε.' })
        res.sendStatus(502);
    });

    // script.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    // });
})

module.exports = routes;
