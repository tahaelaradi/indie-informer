# Indie-Informer

Indie-Informer is an app for game developers to forcast sales for a game idea based on it's genre and themes. It uses historical data of games sold on steam store for a specific genera, to train a neural network. The neural network will then predict the potential number of copies sold based on the themes (tags) input by the user.

## How It Works

Lets, say we want to build a 2D RPG game with some action elements. We'd put 'RPG' as our genre of choice, and insert '2D' and 'Action' as our tags.

![Alt Text](https://github.com/tahaelaradi/indie-informer/blob/master/demo.gif)

The app will fetch from steamspy API the data of all games under that genre, in this case its 'RPG'. The app will take this data set (mainly associated tags for each game), deconstruct and rescale it, then feed it as input to train a neural network using Google's ML framework TensorFlow. Once the model is trained, the tags of our choice, in this case '2D' and 'Action', is passed as our prediction input to estimate the number of copies our game idea would sell.

Generally the more specific our input for tags, the more accurate the model will be able to predict.

### Installing

install all the npm packages
```
npm install
```

start the react server
```
npm start
```

start the express server
```
node index.js
```

open your browser
```
localhost:3000
```

## Data Processing & Training The Neural Network

Once the data for games under a specific genre is fetched. The top 5 associated tags for each games is passed to a mapper that determines if an attribute (tag) is true or false (1 or 0). This generates our first input for the neural network.

Additionally, the number of copies each game sales is normalized between 0 and 1; 0 being the least number a game has sold and 1 being the most. This will be our second input. Both inputs are passed to our model and trained.  

![Alt Text](https://github.com/tahaelaradi/indie-informer/blob/master/neural_network.png)

## Built With

* React
* [TensorFlow.js](https://github.com/tensorflow/tfjs) - Google's ML Framework
* [SteamSpy](http://steamspy.com/) - SteamSpy API, a game sales tracking database

## Remarks

* This app was inspired by a similar project in a course by Adam Geitgey titled 'Building and Deploying Deep Learning Applications with TensorFlow' on Lynda.com. While the implementation is slightly different, the methodology is highly motivated by the approaches discussed in this course.
* Due to limitations set by steamspy API, where a poll rate of only 4 requests per second is allowed, only 200 to 250 game records can be fetched per minute which is a very small set. This would naturally result in a less rigorous training for our model, and a less accurate prediction. But for the sake of demonstration, the number of samples set for our app is small. In case you wish to reach more accurate results, all you have to do is set the sampleRate in index.js to a higher number, but note that the higher the number the longer it will take to both fetch the data and train the model.
* The app uses TensorFlow.js as apposed to the node version. While the node version has a better performance benchmark, it requires further setup and additional requirements for the GPU. TensorFlow.js needs to run on the browser, which is why this app only provides client-side prediction. Ideally, the app would have been better if the training were to be handled server-side instead.
