'use strict';

const request = require('request');
const cheerio = require('cheerio');
const url = 'http://www.html.it/autore/gabroman/';
const fs = require('fs');

const getPage = ( cb ) => {
    request(url, {
        timeout: 3000
    }, (error, response, body) => {
        if(!error) {
            cb(body);
        }
    });
};

const savePage = ( data ) => {
    let contents = "'use strict';" + '\n\n';
        contents += 'const HTMLItArticles = ';
        contents += JSON.stringify( data ) + ';\n\n';
        contents += 'module.exports = HTMLItArticles;';

        fs.writeFileSync(__dirname + '/articles.js', contents);
};

const parsePage = ( data ) => {
    const $ = cheerio.load(data);
    let output = [];
    $( ".author-article" ).each( (i, elem ) => {
        let $a = $(elem).find( 'a' );
        let datum = {
            title: $a.text(),
            url: $a.attr( 'href' )
        };
        output.push(datum);
    });
    return output;
};

getPage( (html) => {
    let data = parsePage( html );
    savePage(data);
});