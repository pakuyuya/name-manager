<?php

Loader::loadLibrary('util');

/**
 * Class MemberTypeService
 * 会員種別名のサービスです。
 */
class MemberTypeService extends Service {
    private $defines = [
        [ 'name' => '役員', 'value' => '1' ],
        [ 'name' => '団体会員', 'value' => '2' ],
        [ 'name' => '賛助会員', 'value' => '3' ],
        [ 'name' => '購読会員', 'value' => '4' ],
        [ 'name' => '大口配布', 'value' => '5' ],
        [ 'name' => '府市配布', 'value' => '6' ],
        [ 'name' => '寄贈配布', 'value' => '7' ],
    ];

    public function findAll() {
        return $this->defines;
    }
}
