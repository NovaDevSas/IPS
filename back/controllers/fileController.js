const b2 = require('../config/blackblaze');

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        await b2.authorize();

        const fileName = `${Date.now()}-${req.file.originalname}`;
        console.log('File Name:', fileName);

        const uploadUrlResponse = await b2.getUploadUrl({
            bucketId: process.env.BACKBLAZE_BUCKET_ID,
        });

        console.log('Upload URL Response:', uploadUrlResponse);

        const uploadResponse = await b2.uploadFile({
            uploadUrl: uploadUrlResponse.data.uploadUrl,
            uploadAuthToken: uploadUrlResponse.data.authorizationToken,
            fileName: fileName,
            data: req.file.buffer,
        });

        console.log('Upload Response:', uploadResponse);

        if (uploadResponse.data && uploadResponse.data.fileId) {
            const fileUrl = `https://f000.backblazeb2.com/file/${process.env.BACKBLAZE_BUCKET_ID}/${fileName}`;
            console.log('File URL:', fileUrl);
            res.json({ message: 'File uploaded successfully', fileUrl: fileUrl });
        } else {
            throw new Error('Upload failed, no fileId returned');
        }
    } catch (err) {
        console.error('Error during file upload:', err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
};