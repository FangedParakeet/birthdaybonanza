<?php

if(isset($_GET["type"])){
	switch ($_GET["type"]) {
		case 1:
			if(isset($_GET["track"])){
				$track = intval($_GET["track"]);
				if($track >= 0 && $track < 10){
					$path = "audio/" . $track . ".mp3";

				} else {
					header('HTTP/1.0 403 Forbidden');
					die('Nuh uh uh!');     
				}
			} else {
				header('HTTP/1.0 403 Forbidden');
				die('Nuh uh uh!');     
			}
			break;
		case 2:
		default:
			$path = "audio/birthday.mp3";
			break;
	}

	$filename = basename($path);
	$finfo = new finfo(FILEINFO_MIME_TYPE);
	$mime = $finfo->file($path);
	$filesize = filesize($path);
	$file = fopen($path, "rb");

	header("Content-type: " . $mime);
	header("Content-Length: " . $filesize);
	header("Content-Disposition: attachment; filename=" . $filename);
	header('Content-Transfer-Encoding: binary');
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	fpassthru($file);
} else {
	header('HTTP/1.0 403 Forbidden');
	die('Nuh uh uh!');     
}