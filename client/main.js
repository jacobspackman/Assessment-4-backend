// const { getInspired } = require("../server/controller")

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("getFortuneButton")
const inspiredBtn = document.getElementById("getInspirationButton")
const addInspirationForm = document.getElementById("addInspiration")

const inspirationContainer = document.querySelector('#inspiration-container')

const baseURL = "http://localhost:4000/api/inspiration"

const inspirationCallback = ({ data: inspirationArr }) => displayInspiration(inspirationArr)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
    .then(res => {
        const fortuneData = res.data;
        alert(fortuneData);
    });
};

const getinspired = () => axios.get(baseURL).then(inspirationCallback)
    
const createInspired = body => axios.post(baseURL, body).then(inspirationCallback)

const deleteIspired = id => axios.delete(`${baseURL}/${id}`).then(inspirationCallback)

const updateInspired = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(inspirationCallback)




const submitHandler = (e) => {
    e.preventDefault()

    let text = document.querySelector('#addInspirationInput')

    let bodyObj = {
        text: text.value,
        status: "What do you think?"
    }

    createInspiration(bodyObj)

    text.value = ''
}

const createInspireCard = inspiration => {
    const inspireCard = document.createElement('div')
    inspireCard.classList.add('inspire-card')

    inspireCard.innerHTML = `<p>Inspiration: ${inspiration.text}</p>
    <div>
        <p>Rating: ${inspiration.status}</p>
        <button onclick="updateInspiration(${inspiration.id}, 'bad')">Bad</button>
        <button onclick="updateInspiration(${inspiration.id}, 'good')">Good</button>
    </div>
    <button onclick="deleteInspiration(${inspiration.id})">Delete</button>
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
