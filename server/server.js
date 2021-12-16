const express = require('express');
const app = express();
const fs = require('fs');
const port = 3001;
const bodyParser = require('body-parser');
const SummaryTool = require('@lyuboslavlyubenov/node-summary');

app.use(bodyParser.json({limit: 10000000}));
app.use(express.json({limit: 10000000}));

projectId = 'ocr_projet';
keyFilename = './Desktop/ocr_key.json';

async function google_vision(file) {
	  const vision = require('@google-cloud/vision');
	  const client = new vision.ImageAnnotatorClient({ projectId, keyFilename });
	  const request = {image: { content: file },};

	  const [result] = await client.textDetection(request);
	  const detections = result.textAnnotations;
	  let detect_result = [];
	  detections.forEach(text => {
			  detect_result.push(text.description);
			  })
	  return detect_result[0];
}

app.post('/ocr', (req, res) => {
		console.log('텍스트 추출 시작');
		detectText(`./ocr_image/${req.body.name}.png`).then(detected_res => {
				res.send({Res: detected_res[0]});
				})
		console.log('텍스트 추출 완료\n');
		});
app.post('/new_ocr', (req, res) => {
		google_vision(req.body.file_base64)
		.then(result =>{
				console.log(result);
				res.send({Res: result});
				})
		});
app.post('/summary', (req, res) => {
		let title = '';
		let final_res = '';

		SummaryTool.summarize(title, req.body.name, function(err, summary){
				if(err) throw err;
				final_res = summary;
				});
		res.send({Res: final_res});
		});

app.listen(port, ()=>{
		console.log(`express is running on ${port}`);
		})
