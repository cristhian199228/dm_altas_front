<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitbf44ba6e845066f6872a2e66137a720c
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInitbf44ba6e845066f6872a2e66137a720c', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitbf44ba6e845066f6872a2e66137a720c', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitbf44ba6e845066f6872a2e66137a720c::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
