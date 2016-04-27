<?php
/**
 * Created by IntelliJ IDEA.
 * User: yu
 * Date: 2016/04/17
 * Time: 19:22
 */

Loader::loadService('SimpleRestService');

class EntrySendService extends SimpleRestService
{
    public function createModel()
    {
        return $this->model('EntrySend');
    }
}