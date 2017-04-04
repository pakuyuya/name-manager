<?php
Loader::loadController('JsonBaseController', 'common');
Loader::loadLibrary('util', 'common');
Loader::loadLibrary('ValidatorEx');

/**
 * 名簿登録API
 * @author pak
 */
class ReceiptLastController extends JsonBaseController
{
    public function __construct() {
    }

    /**
     * GET request
     */
    public function index() {
        $params = $this->request->getQuery();

        $entry_id = isset($params['entry_id']) ? json_decode($params['entry_id'], true) : null;
        // validates

        $errors = [];
        if (!$entry_id) {
            array_push($errors, 'parameter `entry_id` required.');
        }

        if (!empty($errors)) {
            $this->setErrorResponse(403, $errors);
            return;
        }

        $receiptService = $this->service('receiptService');

        $receipts = $receiptService->findLastByNameId($entry_id);

        $this->setJson(
            [
                'result' => true,
                'data' => [
                    'id' => $receipts
                ]
            ]
        );
    }
}