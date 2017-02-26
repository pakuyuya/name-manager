<?php
/**
 * Created by IntelliJ IDEA.
 * User: yu
 * Date: 2016/01/29
 * Time: 15:09
 */
class ErrorHandler extends ErrorHandlerStandard
{
    public function error()
    {
        // ↓正しくはこうなんだけど、効かない。。
        // $this->response->setHttpStatus(500);
        http_response_code(500);
        die('{ "error" : true }');
    }
}