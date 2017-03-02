<?php
/**
 * Created by IntelliJ IDEA.
 * User: yu
 * Date: 2016/04/17
 * Time: 19:22
 */

Loader::loadService('SimpleRestService');

class SubscriptionService extends SimpleRestService
{
    public function createModel()
    {
        return $this->model('EntrySubscription');
    }

    public function validate($fields)
    {
        // TODO:
        return [];
    }
}