<?php
Loader::loadController('JsonBaseController', 'common');
Loader::loadLibrary('util', 'common');
Loader::loadLibrary('ValidatorEx');

/**
 * 名簿更新API
 */
class NameUpdateController extends JsonBaseController
{
    public function __construct() {
    }

    /**
     * POST request
     */
    public function post() {
        $params = $this->request->getPost();

        $name = isset($params['name']) ? json_decode($params['name'], true) : null;
        $subscription = isset($params['subscription']) ? json_decode($params['subscription'], true) : null;

        $nameService = $this->service('NameService');
        $subscriptionService = $this->service('SubscriptionService');

        // validates

        $errors = [];
        if (!$name) {
            array_push($errors, 'parameter `name` required.');
        }
        if ($name && !isset($name['id'])) {
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
            return;
        }

        $id = $name['id'];

        $nameService->beginTran();
//        $subscriptionService->begin();

        $safeName = $nameService->field_json_encode($name);

        $nameService->update($id, $safeName);
        $subscriptionService->deleteByNameId($id);

        if ($subscription !== null) {
            $tmp = clone $subscription;
            $tmp->entry_id = $id;
            $subscriptionService->create($tmp);
        }

        $nameService->commitTran();
//        $subscriptionService->commit();

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