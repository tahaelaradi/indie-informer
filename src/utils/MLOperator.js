import * as tf from "@tensorflow/tfjs";

export function testData(data, input){
  console.log(data.x);
  var test = [tagsSpecifier(input)]
  const model = tf.sequential();

  const config_hidden = {
    inputShape: [50],
    activation: "sigmoid",
    units: 2
  };
  const config_output = {
    units: 1,
    activation: "sigmoid"
  };

  const hidden = tf.layers.dense(config_hidden);
  const output = tf.layers.dense(config_output);

  model.add(hidden);
  model.add(output);

  const optimize = tf.train.sgd(0.1);

  const config = {
    optimizer: optimize,
    loss: "meanSquaredError"
  };

  //compiling the model
  model.compile(config);

  //Dummy training data
  const x_train = tf.tensor(data.x);
  const y_train = tf.tensor(data.y);

  //Dummy testing data
  const x_test = tf.tensor(test);

  return train_data().then(() => {
    return model.predict(x_test).dataSync()[0]
  })

  async function train_data() {
    for (let i = 0; i < 3; i++) {
      const res = await model.fit(x_train, y_train, { epochs: 10, batch_size: 10 });
      console.log(res.history.loss[0]);
    }
  }

  function tagsSpecifier(tagsArray) {
    const tags = ["Indie", "Action", "Adventure", "Casual", "Singleplayer", "Strategy", "Simulation",
            "RPG", "Multiplayer", "Great Soundtrack", "Atmospheric", "2D", "Puzzle", "Early Access",
            "Open World", "Story Rich", "Co-op", "Difficult", "Shooter", "Sci-fi", "First-Person",
            "Horror", "Anime", "Pixel Graphics", "VR", "Funny", "Platfromer", "Fantasy", "Free to Play",
            "Female Protagonist", "FPS", "Gore", "Survival", "Violent", "Sandbox", "Retro", "Arcade",
            "Comedy", "Classic", "Nudity", "Third Person", "Massively Multiplayer", "Exploration", "Point & Click",
            "Visual Novel", "Turn-Based", "Space", "Sports", "Rogue-like", "Racing"
            ]

    let res = tags.map(tag => {
      if (tagsArray.includes(tag)) return 1;
      else return 0;
    });
    return res;
  };
}
