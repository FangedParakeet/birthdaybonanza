<?php 

require_once 'curly.php';

class Youtube extends Curly {

	const API_KEY = "AIzaSyD5MD3BJ2Hjc7NA-foHnh0WKxGVctuSTfk",
		BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems",
		PLAYLIST_ID = "PLyaYPxlwUdmqbZV9jZ1Ph_GP-xYYegRKh",
		LIMIT = 50;

	private $_query;

	public function __construct(){
		list($this->_query) = $this->checkGet(array("query"));
		$this->checkEmpty(array($this->_query));
	}

	public function getVideos(){
		$videos = array();
		$nextPageToken = false;

		while(count($videos) < self::LIMIT){
			$results = $this->getResults($nextPageToken);
			$videos = $this->getVideosFromResults($videos, $results);

			if(!$results["nextPageToken"]){
				if(empty($videos)){
					throw new Exception("Could not find videos");
				} else {
					break;
				}
			}
			$nextPageToken = $results["nextPageToken"];
		}

		return $videos;
	}


	private function getResults($nextPageToken = false){
		$url = self::BASE_URL;

		$args = array(
			"part" 		 => "snippet",
			"playlistId" => self::PLAYLIST_ID,
			"maxResults" => 50,
			"key" 		 => self::API_KEY
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

		foreach ($results["items"] as $video) {
			if(isset($video["id"]["videoId"])){
				$videos[] = $video;
				if(count($videos) == self::LIMIT){
					break;
				}
			}
		}

		return $videos;
	}

}