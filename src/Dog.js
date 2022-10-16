export default class Dog{
    getDog(breed) {
        //https://dog.ceo/api/breed/${breed}/images/random
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                //show the dog on body background
                document.querySelector('#dog').style.backgroundImage = `url(${data.message})`;
            }
        )
    }
}