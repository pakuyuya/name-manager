<?php
Loader::loadController('JsonBaseController', 'common');
Loader::loadLibrary('util', 'common');
Loader::loadLibrary('ValidatorEx');

/**
 * 名簿登録API
 * @author pak
 */
class NameAddController extends JsonBaseController
{
    public function __construct() {
    }

    /**
     * POST request
     */
    public function post() {
        $params = $this->request->getPost();

        $name = isset($params['name']) ? json_decode($params['name']) : null;
        $subscriptions = isset($params['subscriptions']) ? json_decode($params['subscriptions']) : null;

        $nameService = $this->service('NameService');
        $subscriptionService = $this->service('SubscriptionService');

        // validates

        $errors = [];
        if (!$name) {
            array_push($errors, 'parameter `name` required.');
        }
        if ($name) {
            $errors += $nameService->validate($name);
        }

        if ($subscriptions !== null && !is_array($subscriptions)) {
            array_push($errors, 'parameter `subscriptions` is not an array.');
        }

        if (is_array($subscriptions)) {
            foreach ($subscriptions as $subs) {
                $errors += $subscriptionService->validate($subs);
            }
        }

        if (!empty($errors)) {
            $this->setErrorResponse(403, $errors);
            exit();
        }

        $nameService->beginTran();
        // $subscriptionService->beginTran(); コネクションは共通のためbegin不要

        $id = $nameService->create($name);
        foreach ($subscriptions as $subs) {
            $tmp = clone $subs;
            $tmp->entry_id = $id;
            $subscriptionService->create($subs);
        }

        $nameService->commitTran();
        // $subscriptionService->commitTran();

        $this->setJson(
            [
                'result' => true,
                'data' => [
                    'id' => $id
                ]
            ]
        );
    }
}