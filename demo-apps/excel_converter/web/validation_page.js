//import css_file from 'css_file.css'
const cssfile = require('fs').readFileSync(__dirname + '/css_file.css')
const page = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
            <title>FFL Validator </title>
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    </head>
    
    <style type="text/css" media="screen">${ cssfile }</style> 
    <body translate="no">
    <nav class="social-header" style="float: right;">
        <div class="buttons">
            <button class="facebook"><i class="fa fa-facebook"></i></button>
            <button class="twitter"><i class="fa fa-twitter"></i></button>
              <button class="google"><i class="fa fa-google-plus"></i></button>
            <!-- <a class="btn btn-block btn-social btn-facebook fa fa-facebook" href="/auth/facebook"> </a>
                <a class="btn btn-block btn-social btn-github fa fa-github" href="/auth/github"></a>
                <a class="btn btn-block btn-social btn-google fa fa-google" href="/auth/google"></a>
                <a class="btn btn-block btn-social btn-linkedin fa fa-linkedin" href="/auth/linkedin"></a>
                <a class="btn btn-block btn-social btn-twitter fa fa-twitter" href="/auth/twitter"></a>-->
        </div>
    </nav>
    <div class="content">
       
      
        <div class="build-wrap"></div>
        <section id="editor-section" class="grid">
            <div id="left_editor" class="left"></div>
            <div id="right_top_editor" class="right"></div>
        </section>
        <script src="validator.js"></script>
    </div>
    <link rel="icon" href="http://yousenditcc.s3.amazonaws.com/FX_w.svg.png" async="true">
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/themes/black/pace-theme-big-counter.min.css"
              async="true">
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                  async="true">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js" async="true"></script>
    </body>
    </html>`
exports.page = page