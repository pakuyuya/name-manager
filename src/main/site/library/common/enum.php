<?php

/**
 * Class Enum
 */
abstract class Enum
{
    private $scalar;

    function __construct($value)
    {
        $ref = new ReflectionObject($this);
        $consts = $ref->getConstants();
        if (!in_array($value, $consts, true)) {
            throw new invalidArgumentException;
        }

        $this->scalar = $value;
    }

    final static function __callStatic($label, $args)
    {
        $class = get_called_class();
        $const = constant("$class::$label");
        return new $class($const);
    }

    final function value()
    {
        return $this->scalar;
    }

    final function __toString()
    {
        return (string)$this->scalar;
    }
}