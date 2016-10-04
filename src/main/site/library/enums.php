<?php
Loader::loadLibrary('common/enum');

/**
 * 会員種別コード
 */
final class CdMebmerType extends Enum {
    /** 会員ではない */
    const NO_MEMBER = '0';
    /** 個人会員 */
    const ORD = '1';
    /** 団体会員 */
    const ORG = '2';
    /** 賛助会員 */
    const SUPPORT = '3';
}

/**
 * 役員種別
 * 使うかな？
 */
final class CdOfficerType extends Enum {
}