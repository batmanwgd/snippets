const { compileSassAndSaveMultiple } = require('compile-sass'); // CommonJS
const { open, close, appendFile } = require('fs');


(async () => {
    try {
        var sass = require('node-sass');
        console.log(sass.info);

        const compileSass = require('compile-sass');
        app.use('/css/:cssName', compileSass.setup());

        await compileSassAndSaveMultiple({
            sassPath: path.join(__dirname, 'src/scss/'),
            cssPath: path.join(__dirname, 'pub/css/'),
            files: ['libs.scss']
          });

          fs.appendFile('./myfile.txt', '\nMONKEY', function (err) {
            if (err) throw err;
            console.log('The "MONKEY" was appended to file!');
          });
          

    } catch (e) {
        // this should catch all exceptions
    }
})();
