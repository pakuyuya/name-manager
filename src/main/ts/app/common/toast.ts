/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />

export module Toast {
    let _queue:string[] = [];
    let _$toast = null;

    let _timeout = null;

    let _config = {
        duration : 10000,
    };

    export function setConfig(config : any) {
        _config = $.extend(_config, config);
    }

    export function push(text:string) {
        _queue.push(text);

        if (!_$toast) {
            showToast();
            popMessage();
        }
        refleshNextCount();
    }

    export function popMessage() {
        if (_timeout) {
            clearTimeout(_timeout);
        }
        _timeout = null;

        if (_queue.length <= 0) {
            hideToast();
            return;
        }

        let head = _queue.shift();
        $('.c-toast__text', _$toast).html(head);

        refleshNextCount();
        setTimeout(popMessage, _config.duration);
    }

    export function refleshNextCount() {
        if (!_$toast) {
            return;
        }

        let $next = $('.c-toast__close', _$toast);
        if (_queue.length >= 1) {
            $next.text(_queue.length + 1);
        } else {
            $next.text('×');
        }
    }

    export function showToast() {
        if (_$toast) {
            return;
        }

        let $toast =  $('<div class="c-toast">' +
                            '<div class="c-toast__text"></div>' +
                            '<div class="c-toast__close"></div>' +
                       '</div>');

        $('.c-toast__close', $toast).bind('click', popMessage);

        $(document.body).append($toast);

        _$toast = $toast;
    }

    export function hideToast() {
        if (!_$toast) {
            return;
        }

        _$toast.remove();
    }
}