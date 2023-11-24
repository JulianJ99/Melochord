module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("songs", {
      name: {
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