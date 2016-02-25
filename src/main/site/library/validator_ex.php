<?php
class ValidatorEx extends Validator
{
    public function __construct()
    {
        self::$_messages['date'] = 'invalid date';
    }

    public function date($value, $options)
    {
        return $value === '' || strtotime($value) > 0;
    }

    /**
     * 動作が気に入らないのでoverride
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public function validate($data)
    {
        foreach ($this->_rules as $item => $rules) {
            foreach ($rules as $ruleInfo) {
                $rule = $ruleInfo['rule'];
                $method = NameManager::convertToCamel($rule);
                if (!method_exists($this, $method)) {
                    continue;
                }
                $message = '';
                if (isset($ruleInfo['error_message'])) {
                    $message = $ruleInfo['error_message'];
                } else if (isset(self::$_messages[$rule])) {
                    $message = self::$_messages[$rule];
                }
                if ($message == '') {
                    throw new Exception('Error message of rule "' . $rule . '" is not specified.');
                }
                // ▼--- modify ---▼
                $value = isset($data[$item]) ? $data[$item] : '';
                $res = $this->$method($value, $ruleInfo);
                //$res = $this->$method($data[$item], $ruleInfo);
                // ▲--- modify ---▲
                if ($res == false) {
                    foreach ($ruleInfo as $key => $val) {
                        $message = str_replace('%' . $key . '%', $val, $message);
                    }
                    $this->_errors[$item] = $message;
                    break;
                }
            }
        }
        if ($this->_errors) {
            return false;
        }
        return true;
    }
}