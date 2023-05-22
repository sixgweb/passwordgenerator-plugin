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
            'description' => 'No description provided yet...',
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
            if ($form->model->exists) {
                return;
            }
            $hasPasswordField = false;
            foreach ($form->getFields() as $field) {
                if ($field->type == 'password') {
                    if (isset($form->model->rules[$field->fieldName])) {
                        if (strpos('confirmed', $form->model->rules[$field->fieldName]) === false) {
                            $confirmField = $form->getField($field->fieldName . '_confirmation') ?? null;
                            if ($confirmField) {
                                $attributes = $field->attributes ?? [];
                                $attributes['data-password-generator'] = $confirmField->getName();
                                $field->attributes = $attributes;
                                $hasPasswordField = true;
                            }
                        }
                    }
                }
            }

            if ($hasPasswordField) {
                $form->getController()->addJs('/plugins/sixgweb/passwordgenerator/assets/js/passwordgenerator.js');
            }
        });
    }
}
