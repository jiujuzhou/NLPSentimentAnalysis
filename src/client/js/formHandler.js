function handleSubmit(event) {
    var test_mode=0;
    event.preventDefault()

    // check what text was put into the form field
    const inputURL = document.getElementById('url').value
    //checkForName(formText)

    console.log("::: Form Submitted :::")


    const doAnalyze = async (url = "", data = {}) => {
        console.log('start to analyze....');
        const response = await fetch(url, 
        {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        );
        try {
            const resp = await response.json();
            //console.log('get response from server:', resp)
            return resp;
        } catch (error) {
            console.log('error', error);
        }
    }

    function updateUI(res, test_mode=0){
        if(test_mode){
            document.getElementById('results').innerHTML = res.message
            document.getElementById('polarity').style.visibility = "hidden";
            document.getElementById('agreement').style.visibility = "hidden";
            document.getElementById('subjectivity').style.visibility = "hidden";
            document.getElementById('confidence').style.visibility = "hidden";
            document.getElementById('irony').style.visibility = "hidden";
        }
        else {
            document.getElementById('polarity').innerHTML = `polarity: ${res.score_tag}`;
            document.getElementById("agreement").innerHTML = `agreement: ${res.agreement}`;
            document.getElementById("subjectivity").innerHTML = `subjectivity: ${res.subjectivity}`;
            document.getElementById("confidence").innerHTML = `confidence: ${res.confidence}`;
            document.getElementById("irony").innerHTML = `irony: ${res.irony}`;
            document.getElementById('results').style.visibility = "hidden";
        }
    }

    if(test_mode){
        // Here is to do a test
        fetch('http://localhost:8080/test')
        .then(res => res.json())
        .then(function(res) {
            updateUI(res, test_mode);    
        })
    }
    else {    
        doAnalyze('http://localhost:8080/nlp', {url: inputURL})
        .then(function(res) {
            updateUI(res, test_mode);     
        })
    }

}

export { handleSubmit }

