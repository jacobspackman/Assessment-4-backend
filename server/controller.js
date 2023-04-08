const inspirationArr = require("./db.json")
const newInspirationId = 4;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["Watch your back, danger approaches", "Good luck is coming your way", "It's a good time to finish up old tasks", "A pleasant suprise is waiting for you", "A person is never too old to learn", "A faithful friend is a strong defence"]

        let randomFortuneIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomFortuneIndex];

        res.status(200).send(randomFortune);
    },

    getInspiration: (req, res) => {
        res.status(200).send(inspirationArr)
    },

    addInspiration: (req, res) => {
        req.body.id = newInspirationId
        inspirationArr.push(req.body)
        res.status(200).send('Inspiration added!')
    },

    deleteInspiration: (req, res) => {
        const { id } = req.params;
        const idx = inspirationArr.findIndex(inspiration => inspiration.id === +id)
        if(idx >= 0){
            inspirationArr.splice(idx, 1)
            res.status(200).send(inspirationArr)
        }else {
            res.sendStatus(400)
        }
    },

    updateInspiration: (req, res) => {
        const { id } = req.params;
        const{ type } = req.body;
        const idx = inspirationArr.findIndex(inspiration => inspiration.id === +id)
        if(type === 'good'){
            inspirationArr[idx].status = "This is inspiring!"
            res.status(200).send(inspirationArr)
        }else {
            inspirationArr[idx].status = "This did not inspire me."
            res.status(200).send(inspirationArr)
        }
    }

}