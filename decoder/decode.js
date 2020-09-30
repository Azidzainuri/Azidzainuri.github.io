/**
 * @name  de4js
 * @description  JavaScript Deobfuscator and Unpacker
 * @author  Zzbaivong <Zzbaivong@gmail.com> (https://lelinhtinh.github.io)
 * @version  1.3.2
 * @copyright  Zzbaivong 2017
 * @license  MIT
 */

/* globals AADecode, JJdecode, Urlencoded, P_A_C_K_E_R, JavascriptObfuscator, MyObfuscate */
/* eslint-disable no-console */

self.addEventListener('message', function (e) {
    var source = e.data.source,
        packer = e.data.packer;

    if (packer === 'evalencode') {
        self._eval = self.eval;
        self.eval = function (_evalsource) {
            source = _evalsource;
        };
        try {
            self._eval(source);
        } catch (err) {
            console.log(err);
        }
        self.eval = self._eval;
    } else if (packer === '_numberencode') {
        try {
            var patt = /_\d{4}\((_\d{4})\);\}/,
                _numbersource = source;

            if (patt.test(_numbersource)) {
                _numbersource = _numbersource.replace(/var\s/g, 'this.');
                _numbersource = _numbersource.replace(/function\s(_\d{4})\(/, 'this.$1=function(');
                _numbersource = _numbersource.replace(patt, 'self.sourceNumberEncodeZz=$1;};');

                _numbersource = '(function(){' + _numbersource + '})();';
                eval(_numbersource);

                source = self.sourceNumberEncodeZz;
            }
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'arrayencode') {
        try {
            var pattsplit = /(?:[^\\])"];/,
                lastchar = '';

            if (pattsplit.test(source)) {
                lastchar = source.match(pattsplit)[0].charAt(0);

                var _arraysource = source.split(pattsplit),
                    _var = _arraysource[0] + lastchar + '"]',
                    _name = _var.match(/var\s([\w\d_$]+)\s?=\s?\["/)[1].replace(/(\$)/g, '\\$1'),
                    _code = _arraysource.slice(0),

                    pattname = new RegExp('var\\s' + _name + '\\s?=\\s?\\["'),
                    pattkey = new RegExp(_name + '\\[(\\d+)\\]', 'g'),

                    escapable = /[\\\"\x00-\x1f\x7f-\uffff]/g, // eslint-disable-line
                    meta = {
                        '\b': '\\b',
                        '\t': '\\t',
                        '\n': '\\n',
                        '\f': '\\f',
                        '\r': '\\r',
                        '"': '\\"',
                        '\\': '\\\\'
                    },
                    quote = function (string) {
                        escapable.lastIndex = 0;
                        return escapable.test(string) ?
                            string.replace(escapable, function (a) {
                                var c = meta[a];
                                return typeof c === 'string' ? c :
                                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                            }) : string;
                    };

                _var = _var.replace(pattname, '["');
                _var = eval(_var);

                _code.shift();
                _code = _code.join('');
                _code.replace(pattkey, function (key, index) {
                    _code = _code.replace(key, '"' + quote(_var[index]) + '"');
                    return _code;
                });

                _code = _code.replace(/(\["([\w\d_$]+)"\])/gi, '.$2');
                source = _code;
            }
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'jsfuck') {
        try {
            source = /.+(?=\n})/.exec(eval(source.slice(0,-2)));
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'aaencode') {
        try {
            self.importScripts('aadecode.js');

            source = AADecode.decode(source);
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'jjencode') {
        try {
            self.importScripts('jjdecode.js');

            source = JJdecode.decode(source);
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'urlencode') {
        try {
            self.importScripts('urlencode_unpacker.js');

            if (Urlencoded.detect(source)) source = Urlencoded.unpack(source);
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'p_a_c_k_e_r') {
        try {
            self.importScripts('p_a_c_k_e_r_unpacker.js');

            if (P_A_C_K_E_R.detect(source)) source = P_A_C_K_E_R.unpack(source);
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'javascriptobfuscator') {
        try {
            self.importScripts('javascriptobfuscator_unpacker.js');

            if (JavascriptObfuscator.detect(source)) source = JavascriptObfuscator.unpack(source);
        } catch (err) {
            console.log(err);
        }
    } else if (packer === 'myobfuscate') {
        try {
            self.importScripts('myobfuscate_unpacker.js');

            if (MyObfuscate.detect(source)) source = MyObfuscate.unpack(source);
        } catch (err) {
            console.log(err);
        }
    }

    self.postMessage(source);
});

