<?php

/**
 * Class TransactionService
 * トランザクションを遅延実行する２相コミットlikeなクラス
 */
class TransactionService extends Service {
    /**
     * トランザクションを開始する
     * @return mixed transaction id;
     */
    public function start() {
        while(true) {
            $guid = com_create_guid();
            $session = new Session($guid);
            if (!$session->exists('used')) {
                break;
            }
        }
        $session->set('uses', true);
        $session->set('services', []);
        return $guid;
    }

    /**
     * 実行するサービスを登録する
     *
     * @param $tranid
     * @param $serviceName
     * @param $method
     * @param $param
     */
    public function addExecute($tranid, $serviceName, $method, $param) {
        $session = new Session($tranid);
        if (!$session->exisits('used')) {
            throw new Exception('トランザクションがありません。id:'.$tranid);
        }

        $service = [
            'name' => $serviceName,
            'method' => $method,
            'param' => $param
        ];

        $services = $session->get('services');
        array_push($services, $service);
        $session->set('services', $services);
    }

    /**
     * トランザクションの実行およびcommitを行う
     *
     * @param $tranid
     * @param $serviceName
     * @param $method
     * @param $param
     */
    public function commit($tranid) {
        $session = new Session($tranid);
        if (!$session->exisits('used')) {
            throw new Exception('トランザクションがありません。id:'.$tranid);
        }

        $services = $session->get('services');

        $components = [];
        try {
            foreach ($services as $service) {
                $component = Loader::loadService($service['name']);
                $method = $service['method'];
                $param = $service['param'];

                $classname = get_class($component);

                $component->begin();
                (new ReflectionMethod($classname, $method))->invoke($component, $param);
                array_push($coponents);
            }

            foreach ($components as $component) {
                $component->commit();
            }
        } catch (Exception $ex) {
            foreach ($components as $component) {
                $component->rollback();
            }
            throw $ex;
        }

        $session->clear();
        $session->closeWrite();
    }

    /**
     * トランザクションのrollback
     */
    public function rollback($tranid) {
        $session = new Session($tranid);
        if (!$session->exisits('used')) {
            throw new Exception('トランザクションがありません。id:'.$tranid);
        }

        $session->clear();
        $session->closeWrite();
    }
}