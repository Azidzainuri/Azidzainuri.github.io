/**
 * @name  de4js
 * @description  JavaScript Deobfuscator and Unpacker
 * @author  Zzbaivong <Zzbaivong@gmail.com> (https://lelinhtinh.github.io)
 * @version  1.3.2
 * @copyright  Zzbaivong 2017
 * @license  MIT
 */

self.addEventListener('message', function (e) {
    var source = e.data.source;

    if (e.data.beautify) {
        self._window = self.window;
        self.window = {};

        self.importScripts('beautify.min.js');

        source = self.window.js_beautify(source, {
            unescape_strings: true,
            jslint_happy: true
        });

        self.window = self._window;
    }

    self.importScripts('highlight.min.js');

    source = self.hljs.highlight('javascript', source).value;
    source = source.split('\n');
    source = source.join('</code><code>');
    source = '<code>' + source + '</code>';

    self.postMessage(source);
});
