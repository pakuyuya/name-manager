<?php

function forceArray($v) {
    return (is_array($v)) ? $v : [$v];
}

function camel2snakeCase($str) {
    return preg_replace(
            '([A-Z])', '\\u$1',
            preg_replace('^([A-Z])', '\\u$1')
    );
}

function replace_each($str, ...$entries) {
    for($i = 0, $len = count($entries); $i<$len; $i+=2){
        $str = str_replace($entries[$i], $entries[$i+1], $str);
    }
    return $str;
}

function emptyStr($str) {
    return $str === null || $str === '';
}

function getOr($ary, $key, $ifunset) {
    return isset($ary[$key]) ? $ary[$key] : $ifunset;
}

function whiteboxOr($value, $whiteboxlist, $ifnotexists) {
    foreach ($whiteboxlist as $v) {
        if ($value === $v) return $v;
    }
    return $ifnotexists;
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