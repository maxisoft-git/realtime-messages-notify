<?php

class onMessagesEngineStart extends cmsAction {

    public function run(): void {

        $controller = $this->cms_core->uri_controller_before_remap ?: $this->cms_core->uri_controller;

        if ($controller!='admin') {
            $this->cms_template->addControllerJSFromContext('realtime_counts','messages');

        }
    }
}
