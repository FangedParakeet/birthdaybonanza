<?php  

	require_once "youtube.php";

	$videos = array();
	$youtube = new Youtube();

	try {

		$videos = $youtube->getVideos();

	} catch(Exception $e){

		$videos = array("Message" => $e->getMessage());

	}

	header("Content-type:application/json");
	echo json_encode($videos);