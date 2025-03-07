import express from "express";
import sharp from "sharp";

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.listen(port, () => {
    console.log(port, "서버로 구동중.");
});

app.post('/resize', async (req, res, next) => {
    try {
        await sharp('./test.jpg')
        .resize(1920, 1080, { fit : 'cover' })
        .withMetadata()
        .toFormat('jpeg', { quality : 100 })
        .toFile('resize_image.jpg', (err, info) => {
            console.log(`리사이징 이미지 info : ${JSON.stringify(info, null, 2)}`);
        })
        .toBuffer();

        return res.status(200).json({ message : "이미지 변환 성공!" });
    } catch (err){
        console.error(err);
        return res.status(500).json({ message : "이미지 리사이즈 실패!" });
    }
});