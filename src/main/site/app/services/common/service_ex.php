<?php

class ServiceEx extends Service {
    public function beginTran() {
        $this->begin();
    }
    public function commitTran() {
        $this->commit();
    }
    public function rollbackTran() {
        $this->rollback();
    }
}