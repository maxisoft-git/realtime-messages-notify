<?php
class actionMessagesAjax extends cmsAction
{

    public function run()
    {
        $method = $this->request->get('method');

        if (!$this->request->isAjax() || !$method) {
            cmsCore::error404();
        }

        $response = [
            'errors'=>true,
            'data'=>[],
            'messages'=>'',
        ];

        switch ($method) {
            case 'getCountNewMessages':

                $response = [
                    'errors'=>false,
                    'messages'=>'',
                    'data'=> [
                        'count'=>[
                            'messages'=> $this->model->getNewMessagesCount($this->cms_user->id),
                            'notify'=>$this->model->getNoticesCount($this->cms_user->id),
                        ]
                    ]
                ];



                break;

            default:

                cmsCore::error404();
        }

        $this->cms_template->renderJSON($response, true);
    }
}
