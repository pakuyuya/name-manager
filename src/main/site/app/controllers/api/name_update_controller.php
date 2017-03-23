<?php
Loader::loadController('JsonBaseController', 'common');
Loader::loadLibrary('util', 'common');
Loader::loadLibrary('ValidatorEx');

/**
 * 名簿更新API
 * @author pak
 */
class NameAddController extends JsonBaseController
{
    public function __construct() {
    }

    /**
     * GET request
     */
    public function index() {
        $params = $this->request->getQuery();

        $name = isset($params['name']) ? json_decode($params['name']) : null;
        $subscription = isset($params['subscription']) ? json_decode($params['subscription']) : null;

        $nameService = $this->service('NameService');
        $subscriptionService = $this->service('SubscriptionService');

        // validates

        $errors = [];
        if (!$name) {
            array_push($errors, 'parameter `name` required.');
        }
        if ($name && isset($name['id'])) {
            array_push($errors, 'parameter `id` required.');
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

        $id = $name['id'];

        $nameService->begin();
//        $subscriptionService->begin();

        $nameService->update($id, $name);
        $subscriptionService->deleteByNameId($id);

        if ($subscription !== null) {
            $tmp = clone $subscription;
            $tmp->entry_id = $id;
            $subscriptionService->create($tmp);
        }

        $nameService->commit();
//        $subscriptionService->commit();
    }
}