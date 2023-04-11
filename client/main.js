// const { getInspired } = require("../server/controller")

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("getFortuneButton")
const inspiredBtn = document.getElementById("getInspirationButton")
const addInspirationForm = document.getElementById("addInspiration")

const inspirationContainer = document.querySelector('#inspiration-container')

const errCallback = err => console.log(err)
const inspirationCallback = ({ data: inspirationArr }) => displayInspiration(inspirationArr)

const getCompliment = () => {
    axios.get("http://localhost:4005/compliment/")
    .then(res => {
        const data = res.data;
        alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4005/fortune/")
    .then(res => {
        const fortuneData = res.data;
        alert(fortuneData);
    });
};
const baseURL = "http://localhost:4005/feelgood"

const getinspired = () => axios.get(baseURL).then(inspirationCallback).catch(errCallback)
    
const createInspired = body => axios.post(baseURL, body).then(inspirationCallback).catch(errCallback)

const deleteInspired = id => axios.delete(`${baseURL}/${id}`).then(inspirationCallback).catch(errCallback)

const updateInspired = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(inspirationCallback).catch(errCallback)




const submitHandler = (e) => {
    // e.preventDefault()

    let text = document.querySelector('#addInspirationInput')

    let bodyObj = {
        text: text.value,
        status: "What do you think?"
    }

    createInspired(bodyObj)

    text.value = ''

    alert("Press get inspired again to see you're new inspiration!")
}

const createInspireCard = inspiration => {
    const inspireCard = document.createElement('div')
    inspireCard.classList.add('inspire-card')

    inspireCard.innerHTML = `<p>Inspiration: ${inspiration.text}</p>
    <div>
        <p>Rating: ${inspiration.status}</p>
        <button onclick="updateInspired(${inspiration.id}, 'bad')">Bad</button>
        <button onclick="updateInspired(${inspiration.id}, 'good')">Good</button>
    </div>
    <button onclick="deleteInspired(${inspiration.id})">Delete</button>
    `

    inspirationContainer.appendChild(inspireCard)
}

const displayInspiration = arr => {
    inspirationContainer.innerHTML = ``
    for (let i=0; i<arr.length; i++){
        createInspireCard(arr[i])
    }
}


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
inspiredBtn.addEventListener('click', getinspired)
addInspirationForm.addEventListener('submit', submitHandler)
