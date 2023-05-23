<?php

namespace Sixgweb\PasswordGenerator;

use Event;
use Backend;
use System\Classes\PluginBase;

/**
 * Plugin Information File
 *
 * @link https://docs.octobercms.com/3.x/extend/system/plugins.html
 */
class Plugin extends PluginBase
{
    /**
     * pluginDetails about this plugin.
     */
    public function pluginDetails()
    {
        return [
            'name' => 'PasswordGenerator',
            'description' => 'Add a javascript password generator to password and password confirmation fields.',
            'author' => 'Sixgweb',
            'icon' => 'icon-leaf'
        ];
    }

    /**
     * boot method, called right before the request route.
     */
    public function boot()
    {
        $this->extendFormFields();
    }

    protected function extendFormFields()
    {
        Event::listen('backend.form.extendFields', function ($form) {
            $form->getController()->addJs('/plugins/sixgweb/passwordgenerator/assets/js/passwordgenerator.js');
        });
    }
}
