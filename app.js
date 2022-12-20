const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());
//connect HTML
// var http = require('http');
// var fs = require('fs');

// function onRequest(request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile('./sss.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             response.write('File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// }
//create API
const mysql = require("mysql2/promise");
const dbConn = mysql.createConnection({
    host: '34.87.51.133',
    user: 'gosoft_rookie',
    password: 'GosoftRookie',
    database: 'store-platform',
    port: 3306
});

app.get("/ads/list-ads-info", async (req, res) => {
    try {
        const connection = await dbConn
        const rows = await connection.query(`SELECT adsId, adsName, adsFliename, 
        case when ENABLE = 1 then 'ใช้งาน' ELSE 'ไม่ใช้งาน' 
        END AS enable FROM ads`)

        res.status(200).send({
            isSuccess: true,
            message: "ดึงข้อมูลสำเร็จ",
            result: rows[0]
        });
    } catch (error) {
        res.status(400).send({
            isSuccess: false,
            message: "ดึงข้อมูลไม่สำเร็จ",
            result: error.message
        });
    }

})

app.delete("/ads/delete/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await dbConn
    await connection.query('DELETE FROM ads WHERE adsId = ' + id)
    res.status(200).send('success');
})


app.listen(3000, () => {
    console.log("Server is running at port 3000")
})

