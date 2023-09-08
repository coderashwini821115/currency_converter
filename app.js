const express = require('express');
const axios = require('axios');
const app = express();
const port = 7850;

app.use(express.json());

app.post('/convert', async (req, res) => {
    const { source_currency, amount, target_currencies } = req.body;

    const convertedResults = {};
// console.log(target_currencies);
    for (const targetCurrency of target_currencies) {
        try {
            const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${source_currency}/${targetCurrency}.json`);
            const data = response.data;
console.log(data[targetCurrency]);
            const conversionRate = data[targetCurrency];
            const convertedAmount = amount * conversionRate;

            convertedResults[targetCurrency] = convertedAmount;
        } catch (error) {
            console.error(`Error converting ${source_currency} to ${targetCurrency}: ${error.message}`);
            convertedResults[targetCurrency] = null;
        }
    }

    res.json(convertedResults);
});

app.listen(port, () => {
    console.log(`Currency Converter API listening on port ${port}`);
});
