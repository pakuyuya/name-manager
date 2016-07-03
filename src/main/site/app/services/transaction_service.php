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
    public function start($param) {
        while(true) {
            $guid = com_create_guid();
            $session = new Session($guid);
            if (!$session->exists('used')) {
                break;
            }
        }
        $session->set('uses', true);
        $session->set('services', []);

        // 制約
        $constraints = [];
        if (isset($param['num'])) {
            $constraints['num'] = $param['num'];
        }
        if (isset($param['requireSequence']) && $param['requireSequence']) {
            $constraints['sequence'] = true;
        }

        $session->set('constraints',$constraints);

        return $guid;
    }

    /**
     * 実行するサービスを登録する
     *
     * @param $tranid
     * @param $index
     * @param $serviceName
     * @param $method
     * @param $param
     * @throws Exception
     */
    public function setExecute($tranid, $index, $serviceName, $method, $param) {
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
        $services[(int)$index] = $service;
        $session->set('services', $services);
    }

    /**
     * トランザクションの実行およびcommitを行う
     *
     * @param $tranid
     * @return result
     * @throws Exception
     */
    public function commit($tranid) {
        $session = new Session($tranid);
        if (!$session->exisits('used')) {
            throw new Exception('トランザクションがありません。id:'.$tranid);
        }

        $services = $session->get('services');

        $components = [];
        $results = [];
        try {
            foreach ($services as $service) {
                $component = Loader::loadService($service['name']);
                $method = $service['method'];
                $param = $service['param'];

                $classname = get_class($component);

                $component->begin();
                $result = (new ReflectionMethod($classname, $method))->invoke($component, $param);
                array_push($components, $component);
                array_push($results, $result);
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
     * @param $tarnid
     * @throws Exception
     */
    public function rollback($tranid) {
        $session = new Session($tranid);
        if (!$session->exisits('used')) {
            throw new Exception('トランザクションがありません。id:'.$tranid);
        }

        $session->clear();
        $session->closeWrite();
    }

    /**
     * トランザクションの検証
     * @param $tranid
     * @throws Exception
     */
    public function validateConstraints($tranid) {
        $session = new Session($tranid);
        if (!$session->exisits('used')) {
            throw new Exception('トランザクションがありません。id:'.$tranid);
        }

        $constraints = $session->get('constraints');

        if (isset($constraints['num'])) {
            $num = $session->get('num');
            $services = $session->get('services');
            if (count($services) !== (int)$num) {
                throw new Exception('トランザクション開始時に指定された操作の数と一致しません。');
            }
        }
        if (isset($constraints['sequence'])) {
            $services = $session->get('services');
            for ($i = 0,$len = count($services); $i < $len; $i++) {
                if (!isset($services[$i])) {
                    throw new Exception('トランザクション要求に不足があります。');
                }
            }
        }
    }
}