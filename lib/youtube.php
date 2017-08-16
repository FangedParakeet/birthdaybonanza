<?php 

require_once 'curly.php';

class Youtube extends Curly {

	const BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems",
		PLAYLIST_ID = "PLyaYPxlwUdmqbZV9jZ1Ph_GP-xYYegRKh",
		LIMIT = 50;

	private $_key;

	public function __construct(){
		$ini = parse_ini_file("/etc/russki/credentials.ini", true);
		$credentials = $ini["google"];
		$this->_key = $credentials["api_key"];
	}


	public function getVideos(){
		$videos = array();
		$nextPageToken = false;
		$continue = true;

		while($continue){
			$results = $this->getResults($nextPageToken);
			$videos = $this->getVideosFromResults($videos, $results);

			$continue = isset($results["nextPageToken"]);

			if($continue){
				$nextPageToken = $results["nextPageToken"];
			} else {
				if(empty($videos)){
					throw new Exception("Could not find videos");
				} else {
					break;
				}
			}
		}

		return $videos;
	}


	private function getResults($nextPageToken = false){
		$url = self::BASE_URL;

		$args = array(
			"part" 		 => "snippet",
			"playlistId" => self::PLAYLIST_ID,
			"maxResults" => self::LIMIT,
			"key" 		 => $this->_key
		);
		if($nextPageToken){
			$args["pageToken"] = $nextPageToken;
		}

		$response = $this->get($url, $args);
		return $response;
	}

	private function getVideosFromResults($videos, $results){
		if(empty($results["items"]) && empty($videos)){
			throw new Exception("Could not find videos");
		}

		foreach ($results["items"] as $item) {
			if(isset($item["snippet"]["resourceId"])){
				$videos[] = $item["snippet"];
			}
		}

		return $videos;
	}

}