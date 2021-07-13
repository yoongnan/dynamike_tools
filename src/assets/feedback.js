var common = {
    esp: null,
    feedback: (url) => {
        (function (a, b, c, d, e, f) {
        window[d] = window[d] || {};
        window[d]._q = window[d]._q || [];
        ['identify', 'page', 'track', 'metadata', 'locale'].forEach(function (t) {
            window[d][t] = function () {
            var e = Array.prototype.slice.call(arguments);
            e.unshift(t);
            window[d]._q.push(e);
            }
        });
        window[d]._url = c;
        window[d].init = window[d].init || function (p, q, r) {
            window[d]._clientId = p;
            window[d]._clientName = q;
            window[d]._configs = r || {};
            e = a.createElement(b);
            e.async = 1;
            e.src = c + '?client_id=' + p;
            f = a.getElementsByTagName(b)[0];
            f.parentNode.insertBefore(e, f);
        };
        })(document, 'script', url, 'esp');
        this.common.esp = esp;
        return esp;
    },
};
