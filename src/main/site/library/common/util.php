<?php

function camel2snakeCase($str) {
    return preg_replace(
            '([A-Z])', '\\u$1',
            preg_replace('^([A-Z])', '\\u$1')
    );
}

function replace_each($str, ...$entries) {
    for($i = 0, $len = count($entries); $i<$len; $i++){
        $str = str_replace($entries[$i], $entries[$i+1], $str);
    }
    return $str;
}

function getnull($ary, $key) {
    return isset($ary[$key]) ? $ary[$key] : null;
}

function keysCamel2Sanake($ary) {
    $newary = [];
    foreach ($ary as $k => $v) {
        $newary[camel2snakecase($k)] = $v;
    }

    return $newary;
}

function escapeLike($str) {
    return replace_each($str,
        '\\', '\\\\',
        '%', '\\%',
        '_', '\\_'
    );
}