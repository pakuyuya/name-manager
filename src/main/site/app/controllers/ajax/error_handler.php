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
        $this->response->setHttpStatus(500);
        die('{ "error" : true }');
    }
}