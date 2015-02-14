function updateCanvas() {
	var i, fps = 20, canvas = document.getElementById('starmap'), C = canvas.getContext("2d");
	C.fillRect("#000", 0, 0, canvas.width, canvas.height);
	if (canvas_play === true) {
		window.setTimeout("updateCanvas()", 1000 / fps);
	}
}