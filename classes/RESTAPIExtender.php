<?php
class RESTAPIExtender extends WP_REST_Controller {
    const NAMESPACE = 'ng-theme/v1';

    function registerRoutes() {
        add_action('rest_api_init', array($this, 'registerSendEmailRoute'));
    }

    function registerSendEmailRoute() {
        register_rest_route(self::NAMESPACE, '/send-email', array(
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array($this, 'sendMail')
            )
        ));
    }

    /**
     * Sends an email
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    function sendMail($request)
    {
        $response = (object) array();

        if (isset($_POST['name']) && isset($_POST['recipientEmail']) && isset($_POST['message'])) {
            $emailData = (object) array();
            $emailData->name = sanitize_text_field($_POST['name']);
            $emailData->email = sanitize_email($_POST['recipientEmail']);
            $emailData->message = sanitize_text_field($_POST['message']);

            $to = get_option('admin_email');
            $subject = 'Message from contact form on site ' . bloginfo('site_url');
            $body = $this->getEmailTemplate($emailData);
            $headers = $this->getEmailHeaders();

            $isEmailSent = wp_mail($to, $subject, $body, $headers);
            if ($isEmailSent) {
                $response->message = 'E-mail was sent';
                return new WP_REST_Response($response, 200);
            } else {
                $response->message = 'E-mail was not sent';
                return new WP_REST_Response($response, 400);
            }
        }

        $response->message = 'Invalid entry fields';
        return new WP_REST_Response($response, 400);
    }

    private function getEmailTemplate($data) {
        return <<<HEREDOC
    Client name: $data->name <br>
    Client e-mail: $data->email <br>
    Message: $data->message <br><br>
HEREDOC;
    }

    private function getEmailHeaders() {
        return array('Content-Type: text/html; charset=UTF-8');
    }
}
