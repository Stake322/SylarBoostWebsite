const path = require('path');
const fs = require('fs');

const getScoresFunc = () => path.join(__dirname, "./scores.json")

const getScores = (req, res) => {
    res.sendFile(getScoresFunc())
}

const newScore = (req, res) => {
    console.log('Smb is trying to add a new score:', req.body);
    const newScore = req.body
    const filepath = './routes/scores.json'

    fs.readFile(filepath, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log('error on readFileCallback:', err);
        } else {
            obj = JSON.parse(data); //now it an object
            var isChanged = false;
            var replacementIndex = -1;

            const sortOurArr = () => obj.array.sort((a, b) => b.score - a.score)

            if (obj.array.length >= 5) {
                sortOurArr()
                console.log(obj.array);
                // Check new obj is bigger
                obj.array.forEach((result, index) => {
                    if (result.score < newScore.score) {
                        replacementIndex = index
                        return
                    }
                });

                if (replacementIndex !== -1) {
                    isChanged = true
                    obj.array[replacementIndex] = newScore
                    sortOurArr()
                    console.log('SS:', obj.array);
                }
            } else {
                obj.array.push(req.body)
                isChanged = true
            }

            if (isChanged) {
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile(filepath, json, 'utf8', (err) => console.error('err on fs write:', err));
                res.json(json)
            } else {
                res.send('Not a leader')
            }
        }
    });
    
}



module.exports = {
    getScores: getScores,
    newScore: newScore
}