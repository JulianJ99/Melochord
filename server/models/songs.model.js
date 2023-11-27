module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("songs", {
      title: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      }
    });
  
    return Song;
  };