const { authRole, authUser } = require('../middleware/auth');
const routes = require('express').Router();
const { spawn } = require('child_process')

routes.post('/', authUser, authRole, async (req, res, next) => {

    const ls = spawn('python3', ['./public/python_scripts/data_scrapper.py']);

    ls.stdout.on('data', (data) => {
        // let mdata = JSON.parse(data)
        console.log(`stdout: ${data}`);        
        
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    // const result = spawn('python3')
    console.log('ministries le called!')
})

module.exports = routes;