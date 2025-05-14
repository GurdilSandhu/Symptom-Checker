import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const symptoms = req.body.symptoms;   // Get symptoms from the frontend
        const flaskAPI = 'http://127.0.0.1:5000/api/predict';  // Flask API endpoint

        // Send POST request to Flask API
        const response = await axios.post(flaskAPI, { symptoms });

        // Send the AI prediction result back to the frontend
        res.json({
            success: true,
            prediction: response.data.prediction
        });
    } catch (error) {
        console.error('Error connecting to Flask API:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to connect to the AI model'
        });
    }
});

export default router;
