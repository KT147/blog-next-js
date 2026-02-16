const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");


/// if (phase === PHASE_DEVELOPMENT_SERVER) kontrollib,
/// kas oled development faasis või kuskil mujal
/// saab eraldi andmebaasi developmenti ja productioni panna

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "kevinkirjutabkoodi_db_user",
        mongodb_password: "VE8IVbg8BxuJOuTx",
        mongodb_clusterName: "cluster0",
        mongodb_database: "my-site-dev",
      },
    };
  }
  return {
    env: {
      mongodb_username: "kevinkirjutabkoodi_db_user",
      mongodb_password: "VE8IVbg8BxuJOuTx",
      mongodb_clusterName: "cluster0",
      mongodb_database: "my-site",
    },
  };

};

