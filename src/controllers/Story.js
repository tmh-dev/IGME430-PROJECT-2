const models = require('../models');

const { Story } = models;

const makeStory = (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const storyData = {
    title: req.body.title,
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newStory = new Story.StoryModel(storyData);

  const storyPromise = newStory.save();

  storyPromise.then(() => res.json({ redirect: '/board' }));

  storyPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Story already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return storyPromise;
};

const getStories = (request, response) => {
  const req = request;
  const res = response;

  return Story.StoryModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ stories: docs });
  });
};

module.exports = {
  makeStory,
  getStories,
};
