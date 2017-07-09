<?php

require_once 'slave.php';

class Curly extends Slave {

	protected function post($url, $args, $headers = false, $json = false){

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, 1);
		if(!empty($args)){
			$postfields = $json ? json_encode($args) : http_build_query($args);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
		}
		if(!empty($headers)){
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		}
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$response = curl_exec($ch);

		if($response === FALSE){
			throw new Exception(curl_error($ch));
		}

		return json_decode($response, true);

	}

	protected function get($url, $args, $headers = false){

		if(!empty($args)){
			$url .= "?" . http_build_query($args);
		}
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		if(!empty($headers)){
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		}
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$response = curl_exec($ch);

		if($response === FALSE){
			throw new Exception(curl_error($ch));
		}

		return json_decode($response, true);

	}

}
