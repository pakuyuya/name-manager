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
        $subscriptions = isset($params['subscriptions']) ? json_decode($params['subscriptions']) : null;

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

        $id = $name['id'];

        $nameService->begin();
        $subscriptionService->begin();

        $nameService->update($id, $name);
        $subscriptionService->deleteByNameId($id);
        foreach ($subscriptions as $subs) {
            $subscriptions->create($subs);
        }

        $nameService->commit();
        $subscriptionService->commit();
    }
}