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
        $subscription = isset($params['subscription']) ? json_decode($params['subscription']) : null;

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

        if ($subscription !== null) {
            $errors += $subscriptionService->validate($subscription);
        }

        if (!empty($errors)) {
            $this->setErrorResponse(403, $errors);
            exit();
        }

        $nameService->beginTran();
        // $subscriptionService->beginTran(); コネクションは共通のためbegin不要

        $id = $nameService->create($name);

        if ($subscription !== null) {
            $tmp = clone $subscription;
            $tmp->entry_id = $id;
            $subscriptionService->create($tmp);
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