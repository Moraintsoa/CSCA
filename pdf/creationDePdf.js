const puppeteer = require("puppeteer");
const path = require("path")
const creationdepdf = async (req, res) => {
    // if (req.session.userId) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(`${req.protocol}://${req.get('host')}/topdf?id=${req.query.id}`, {
                waitUntil: "networkidle2"
            });
            await page.setViewport({ width: 1680, height: 1050, });

            // const todayDate = new Date();
            const lePdf = await page.pdf({
                path: `${path.join(__dirname, '../sortiePDF', `${req.query.id}-CSCA-${req.session.userEntite}.pdf`)}`,
                printBackground: true,
                format: "A4",
                margin:{
                    top:10,
                    bottom:10,
                    left:10,
                    right:10,
                },
                headerTemplate: '<div style="font-size: 12px;">En-tête</div>',
                footerTemplate: '<div style="font-size: 12px;">Pied de page</div>'

            })
            await browser.close();

            const pdfurl = path.join(__dirname, '../sortiePDF', `${req.query.id}-CSCA-${req.session.userEntite}.pdf`)

            res.set({
                "Content-Type": "application/pdf",
                "Content-Length": lePdf.length
            })
            res.sendFile(pdfurl)
        } catch (error) {
            console.log(error.message)
        }
    //}
    //{
    // res.redirect('/login');
    // }
}
module.exports = { creationdepdf }